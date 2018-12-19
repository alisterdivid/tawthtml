Tawk.AgentInterface = Ember.Mixin.create({
	cver: 0,
	noToday: !0,
	invitedAgents: null,
	isProcessingHistory: !1,
	conversationStartedOn: null,
	previousConversation: null,
	conversationBlock: null,
	conversationEndedTime: null,
	hasOlder: !1,
	newChat: !1,
	conversationQueue: null,
	isAgentChat: !0,
	inView: !1,
	currentOngoing: null,
	init: function () {
		this.set("invitedAgents", []);
		this.set("conversationBlock", []);
		this.set("previousConversation", []);
		this.set("currentOngoing", []);
		this.set("conversationQueue", []);
		this.set("c", [])
	},
	processHistory: function (a) {
		this.currentOngoing.clear();
		this.previousConversation.clear();
		this.processOlderHistory(a);
		this.set("isProcessingHistory", !1);
		this.set("previousConversationUpdated", !0)
	},
	processOlderHistory: function (a, c) {
		a.chunks.length ? (c || this.set("lastCorrectVersion", {
			conversationId: a.chunks[0].cid,
			cver: a.chunks[0].c[a.chunks[0].c.length - 1].cv,
			co: new Date(a.chunks[0].c[a.chunks[0].c.length - 1].co)
		}), this.set("conversationEndedTime", a.chunks[a.chunks.length - 1].cso), this.set("hasMoreUnseen", conversationProcess.processPreviousConversation(this.previousConversation,
			a.chunks, a.lastSeenId, c)), this.set("hasOlder", !0)) : this.set("hasOlder", !1);
		this.previousConversation.length && 0 === this.previousConversation[this.previousConversation.length - 1].dayDiff ? this.set("noToday", !1) : this.set("noToday", !0);
		this.set("previousConversationUpdated", !0)
	},
	incomingMessage: function (a) {
		"c" === a.mt && a.uid !== Tawk.userController.user.id && this.isOpen && (this.set("newMessage", !0), notificationController.notifyAgentChatMessage(a.n, a.m, "s" === a.ctyp ? a.uid : this.groupId));
		a.ut = "a";
		this.addToMessageBlock(a)
	},
	updateChatMessages: function (a) {
		this.get("c") || this.set("c", []);
		this.get("c").push(a);
		(!this.lastCorrectVersion || a.co > this.lastCorrectVersion.co) && this.set("lastCorrectVersion", {
			cver: a.cver,
			conversationId: a.cid,
			co: a.co
		})
	},
	addToMessageBlock: function (a) {
		var c, d = this.lastBlock;
		this.previousConversation.length && this.noToday && (this.set("newBlock", '<div class="date-container"><div class="line"></div><div class="date">' + languageParser.translate("generic", "today") + "</div></div>"), this.set("noToday", !1));
		c =
			conversationProcess.addToAgentMesssageBlock(a, d);
		this.set("newBlock", null);
		this.set("newRow", null);
		this.conversationStartedOn || this.set("conversationStartedOn", moment(a.co).format("dddd, MMMM D YYYY, HH:mm"));
		if (c.newBlock) c.newBlock.first().append(c.newRow), d = c.lastBlock, this.conversationBlock.pushObject(c.newBlock), this.set("newBlock", c.newBlock); else if (!c.newBlock && d && d.id === a.uid) {
			if (a = this.conversationBlock.get("lastObject")) this.conversationBlock.popObject(), this.conversationBlock.pushObject(d.block);
			this.set("newRow", {block: d.block.first(), row: c.newRow})
		}
		-1 === this.currentOngoing.indexOf(d) && this.currentOngoing.pushObject(d);
		this.set("lastBlock", d);
		return c.newRow
	},
	clearConversations: function () {
		this.set("previousConversationUpdated", !1);
		this.set("conversationUpdated", !1);
		this.set("lastBlock", null);
		this.set("conversationEndedTime", null);
		this.c.clear();
		this.previousConversation.clear();
		this.conversationBlock.clear();
		this.currentOngoing.clear()
	},
	fileId: function () {
		return "file-" + this.groupId
	}.property("groupId"),
	clearUnseen: function () {
	}
});
Tawk.AgentModel = Ember.Object.extend(Tawk.AgentInterface, {
	status: function () {
		var a = [];
		if (!this.sessions || !this.sessions.length) return "offline";
		a = this.sessions.getEach("st");
		return -1 !== a.indexOf("o") ? "online" : -1 !== a.indexOf("a") ? "away" : "invisible"
	}.property("sessions.length", "sessions.@each.st"), userCard: function () {
		return "<div class='usr-card'>" + (this.aliasImage ? "<img src='" + this.aliasImage + "' alt='" + this.name + "' />" : "<em class='badge padding-5 no-border-radius bg-color-blueLight txt-color-white'><i class='fa fa-user fa-fw fa-2x'></i></em>") +
			"<div class='usr-card-content'><h3>" + this.name + "</h3><span class='label label-" + this.get("status") + "'>" + languageParser.translate("generic", this.get("status")) + "</label></div></div>"
	}.property("name", "status"), countryFlag: function () {
		return this.get("lastKnown") && this.get("lastKnown.cc") ? "flag flag-" + this.get("lastKnown.cc").toLowerCase() : "flag-ukn"
	}.property("cc")
});
Tawk.AgentGroupModel = Ember.Object.extend(Tawk.AgentInterface, {
	isGroup: !0, status: "online", groupName: function () {
		return this.name ? decodeStr(this.name) :
			this.get("participants") ? this.get("participants").filterProperty("isOwn", !1).length ? decodeStr(this.get("participants").filterProperty("isOwn", !1).getEach("name").join(", ")) : decodeStr(Tawk.userController.user.fullName) : ""
	}.property("participants.@each.name", "name")
});
Tawk.VisitorModel = Ember.Object.extend({
	isVisitorPresent: !0,
	messagePreview: null,
	isOpen: !1,
	cr: !1,
	ha: !1,
	participatingAgents: null,
	isNewMessage: !1,
	lastSeenChat: null,
	isOwn: !1,
	ignore: !1,
	customAttributes: null,
	customTags: null,
	timeline: null,
	incomingWebRTCTimeout: null,
	callData: null,
	callStatusData: null,
	init: function () {
		this.set("agentProfiles", []);
		this.set("conversationBlock", []);
		this.set("agentProfileIds", []);
		this.set("typingAgents", []);
		this.set("profiles", {});
		this.set("conversationQueue", []);
		this.set("lastSeenChat", this.cver);
		this.set("isClientProperty", Tawk.webProperties.isClientProperty(this.pgid));
		this.set("agentPrensence", {});
		this.set("callData", {});
		this.set("callStatusData", {});
		if (this.cr && (!this.ha && this.dpt) && !Tawk.webProperties.isAgentAttachedToDepartment(this.dpt)) return this.set("anotherDepartment",
			!0);
		this.updateParticipatingAgents();
		this.set("customAttributes", {version: 0, data: []});
		this.set("customTags", {version: 0, data: null});
		this.set("timeline", []);
		this.updateDuration()
	},
	updateDuration: function () {
		var a;
		a = moment().diff(this.so, "seconds", !0);
		var c = moment.duration(a, "seconds");
		this.isVisitorPresent && (0 > a ? this.set("formattedDuration", "00:00:00") : (a = Math.floor(c.asHours()), 10 > a && (a = "0" + a), this.set("formattedDuration", a + moment.utc(c.asMilliseconds()).format(":mm:ss"))))
	},
	updateVisitorLocalTime: function () {
		var a;
		this.isVisitorPresent && (a = moment().utcOffset(-1 * this.tzo), this.set("visitorLocalTime", a.format("LT")))
	},
	departmentName: function () {
		return Tawk.webProperties.getDepartmentName(this.pgid, this.dpt)
	}.property("dpt"),
	isInactiveChanged: function () {
		this.isInactive || this.set("activeTimestamp", Date.now())
	}.observes("isInactive"),
	isInactive: function () {
		return !this.cr && !this.ha && !this.open
	}.property("cr", "ha", "open"),
	highlightColor: function () {
		return this.ignore ? "ignored" : this.incomingCall && !this.ha ? "waiting unseen" :
			this.cr && !this.ha ? this.anotherDepartment ? "department-chat-request" : "waiting unseen" : "max" === this.cw ? "clicked" : ""
	}.property("cr", "cw", "ignore", "incomingCall", "ha"),
	countryFlag: function () {
		return this.get("cc") ? "flag flag-" + this.get("cc").toLowerCase() : "flag-ukn"
	}.property("cc"),
	browser: function () {
		return this.get("bw") ? "sprite-background " + this.get("bw") + "-browser" : ""
	}.property("bw"),
	operatingSystem: function () {
		return this.get("os") ? "sprite-background " + this.get("os") + "-os" : ""
	}.property("os"),
	lastVisitDate: function () {
		return this.lvd ?
			moment(this.lvd).fromNow() : null
	}.property("lvd"),
	lastChatAgent: function () {
		return this.lci && this.lci.aid.length ? decodeStr(Tawk.agentsController.getName(this.lci.aid[0])) : null
	}.property("lci"),
	lastChatDate: function () {
		return this.lci && this.get("lastChatAgent") ? moment(this.lci.tm).fromNow() : null
	}.property("lci"),
	enteredTime: function () {
		return this.so ? moment(this.so).fromNow() : null
	}.property("so"),
	changePageUrl: function (a) {
		this.cver > a.cver || (!a.md.pu || -1 !== a.md.pu.indexOf("static.tawk")) || (this.set("pu",
			decodeStr(a.md.pu)), this.set("pt", decodeStr(a.md.pt)))
	},
	chatEnded: function (a) {
		this.set("hasJoinedConversation", !1);
		this.set("ha", !1);
		this.set("agentPrensence", {});
		this.set("conversationStarted", !1);
		this.set("messagePreview", null);
		void 0 !== a && (this.set("chatEndVersion", a.cev), this.chids ? this.chids.push(a.nchid) : this.set("chids", [a.pchid, a.nchid]))
	},
	windowStateChanged: function (a, c) {
		a !== this.cw && (this.set("cw", a), c && this.addToMessageBlock({
			t: "n",
			ut: "v",
			m: a,
			co: new Date
		}, this.n))
	},
	popoutStateChanged: function (a) {
		a =
			a ? "pop" : "pop_in";
		this.set("cw", a);
		this.addToMessageBlock({t: "n", ut: "v", m: a, co: new Date}, this.n)
	},
	participatingAgentsNames: function () {
		return Tawk.agentsController.getAgentsName(this.participatingAgents).join(", ")
	}.property("participatingAgents"),
	participatingAgentsNamesArr: function () {
		return Tawk.agentsController.getAgentsName(this.participatingAgents)
	}.property("participatingAgents"),
	processHistory: function (a) {
		var c = this, d = [];
		this.c && (a = conversationProcess.processHistory(this.c, this.n, !0), this.set("c",
			this.c), this.set("conversationBlock", a.transcriptData), this.set("lastBlock", a.lastBlock), this.set("agentPrensence", a.agentPrensence), this.set("agents", a.agents), this.set("profiles", a.profiles), this.set("cver", this.cver), this.set("lastSeenChat", this.cver), this.set("conversationUpdated", !0), this.set("timeline", a.timeline), this.set("conversationStarted", a.chatStarted && !a.chatEnded), this.set("chatEndVersion", a.chatEndVersion), a.callInfo.length && (this.set("syncCallData", !0), a.callInfo.forEach(function (a) {
			conversationProcess.processWebRTCCallBlock(a.callId,
				c.pgid, a.callView, !0, function (d, f) {
					f && c.set("callData." + a.callId, f)
				})
		})));
		this.attr && this.attrv > this.customAttributes.version && (Object.keys(this.attr).forEach(function (a) {
			null !== c.attr[a] && d.pushObject({key: beautifyAPIKey(a), value: beautifyAPIValue(c.attr[a])})
		}), this.set("customAttributes.data", d), this.set("customAttributes.version", this.attrv));
		this.set("isProcessingHistory", !1);
		this.autoJoinConversation();
		this.clearConversationQueue()
	},
	autoJoinConversation: function () {
		var a;
		!this.hasJoinedConversation &&
		(0 !== Object.keys(this.profiles).length && 0 !== Object.keys(this.agentPrensence).length) && (a = Tawk.userController.user.id + Tawk.userController.user.resourceId, a = this.agentPrensence[a], void 0 !== a && (a = a.aliasId)) && (a = this.profiles[a], void 0 !== a && (this.set("_conversationProfile", a), this.set("_agentName", a.displayName), this.set("hasJoinedConversation", !0)))
	},
	clearConversationQueue: function () {
		var a = this;
		this.conversationQueue.length && this.conversationQueue.sort(function (a, d) {
			if (a.cver < d.cver) return -1;
			if (a.cver >
				d.cver) return 1
		}).forEach(function (c) {
			c.cver < a.cver || (a.addToMessageBlock(c), a.set("cver", c.cver), a.set("lastSeenChat", c.cver))
		})
	},
	clearConversations: function () {
		if (null !== this.conversationBlock) for (var a = 0, c = this.conversationBlock.length; a < c; a++) this.conversationBlock.popObject().remove();
		this.set("conversationUpdated", !1);
		this.set("conversationBlock", null);
		this.set("newRow", null);
		this.set("newBlock", null);
		this.set("lastBlock", null);
		this.set("agentPrensence", {});
		this.set("copyFormat", null)
	},
	incomingMessage: function (a) {
		var c;
		if (a) if (this.isProcessingHistory) this.conversationQueue.pushObject(a); else if (this.isOpen) {
			c = this.get("n");
			this.set("isNewMessage", !1);
			this.set("cver", a.cver);
			this.set("isOwn", !1);
			"n" === a.t && "a" === a.ut ? "AGENT_JOIN_CONVERSATION" === a.m && a.uid === Tawk.userController.user.id && a.md.rsc === Tawk.userController.user.resourceId && this.set("hasJoinedConversation", !0) : "n" === a.t && "v" === a.ut && "VISITOR_RATING" === a.m && (a.m = 0 === a.md.rt ? "VISITOR_REMOVED_RATING" : 1 === a.md.rt ? "VISITOR_POSITIVE_RATING" : "VISITOR_NEGATIVE_RATING");
			"c" === a.t && "v" === a.ut && (this.messagePreview && this.set("messagePreview", null), this.isOpen && this.ha && (notificationController.notifyNewMessage(c, a.m, a.vsk), this.set("isNewMessage", !0)));
			if ("c" === a.t && "a" === a.ut) {
				var d = this.typingAgents.findProperty("agentId", a.uid);
				d && this.typingAgents.removeObject(d);
				a.uid !== Tawk.userController.user.id ? this.set("isNewMessage", !0) : (this.set("isOwn", !0), this.set("showFlash", !1))
			}
			this.isNewMessage || this.set("lastSeenChat", a.cver);
			this.addToMessageBlock(a, c)
		} else this.c ||
		this.set("c", []), this.c.push(a)
	},
	addToMessageBlock: function (a, c) {
		var d, b, e;
		if (this.conversationBlock && (e = this.lastBlock, b = conversationProcess.addToMesssageBlock(a, e, c))) {
			this.set("newBlock", null);
			this.set("newRow", null);
			this.timeline || this.set("timeline", []);
			this.conversationStarted || ("c" !== a.t || "s" === a.ut) || (this.set("conversationStarted", !0), this.timeline.insertAt(0, {
				title: languageParser.translate("visitors", "chat_started"),
				time: moment(a.co).format("HH:mm")
			}));
			if ("n" === a.t) this.conversationBlock.pushObject(b.newBlock),
				e = null, this.set("newBlock", b.newBlock), "v" === a.ut && ("EVENT" === a.m ? this.timeline.insertAt(0, {
				title: a.md.event,
				time: moment(a.co).format("HH:mm"),
				data: conversationProcess.parseEventData(a.md.eventData)
			}) : "CHAT_ENDED" === a.m || "VISITOR_LEFT" === a.m ? this.timeline.insertAt(0, {
				title: languageParser.translate("visitors", "chat_end"),
				time: moment(a.co).format("HH:mm")
			}) : "VISITOR_NAVIGATION" === a.m ? this.timeline.insertAt(0, {
				title: languageParser.translate("visitors", a.m, {
					url: conversationProcess.parseUrlWithTitle(a.md.pu,
						a.md.pt)
				}), time: moment(new Date).format("HH:mm")
			}) : this.timeline.insertAt(0, {
				title: languageParser.translate("visitors", a.m),
				time: moment(new Date).format("HH:mm")
			})); else if (b.newBlock) b.newBlock.first().append(b.newRow), e = b.lastBlock, this.conversationBlock.pushObject(b.newBlock), this.set("newBlock", b.newBlock); else if (!b.newBlock && e && e.id === a.uid && ("a" === a.ut || a.md && a.md.rsc && b.lastBlock.rsc === a.md.rsc || "v" === a.ut) && e.ut === a.ut) {
				if (d = this.conversationBlock.get("lastObject")) this.conversationBlock.popObject(),
					this.conversationBlock.pushObject(e.block);
				this.set("newRow", {block: e.block.first(), row: b.newRow})
			}
			this.set("lastBlock", e);
			this.get("c") && a.co && this.get("c").push(a);
			return b.newRow
		}
	},
	updateParticipatingAgents: function () {
		var a = [];
		this.al && this.al.length && this.al.forEach(function (c) {
			c = c.split("-");
			-1 === a.indexOf(c[0]) && a.push(c[0])
		});
		this.set("participatingAgents", a)
	}.observes("al"),
	updateAgentList: function () {
		this.get("ha") || this.set("participatingAgents", [])
	}.observes("ha"),
	propertyName: function () {
		return decodeStr(Tawk.webProperties.getPropertyName(this.pgid))
	}.property("pgid"),
	visitorName: function () {
		return decodeStr(this.n)
	}.property("n"),
	displayName: function () {
		return /^V[0-9]{16}$/.test(this.n) && this.ip ? this.ip : decodeStr(this.n)
	}.property("n"),
	ring: function () {
		var a = !1;
		if (this.ignore) return this.incomingCall && notificationController.stopIncomingCall(), !1;
		if (this.incomingCall || !this.cr) return !1;
		this.dpt && (a = Tawk.webProperties.isAgentAttachedToDepartment(this.dpt), a || (this.set("anotherDepartment", !0), a = Tawk.webProperties.isDepartmentOffline(this.pgid, this.dpt)));
		if ((!this.dpt ||
				a) && !this.ha) return !0
	}.property("cr", "ha", "ignore"),
	clearUnseen: function () {
		this.set("showFlash", !1);
		this.set("lastSeenChat", this.cver)
	},
	fileId: function () {
		return "file-" + this._id
	}.property("_id"),
	notesValueChanged: function () {
		this.ns ? this.set("notesValue", decodeStr(this.ns)) : this.set("notesValue", "")
	}.observes("ns"),
	propertyShortName: function () {
		return this.get("propertyName").charAt(0)
	}.property("propertyName"),
	propertyColor: function () {
		return "background : " + Tawk.webProperties.getColorCode(this.pgid)
	}.property("propertyName"),
	visitorDetails: function () {
		return "Name : " + this.n
	}.property("n", "e", "ns"),
	locationDetails: function () {
		return this.cy ? this.cy + ", " + this.cn : this.cn
	}.property("cy", "cn"),
	joinedFromOtherResource: function () {
		var a = 0;
		this.al.forEach(function (c) {
			-1 !== c.indexOf(Tawk.userController.user.id) && a++
		});
		return a
	}.property("al"),
	decodedReferrer: function () {
		return decodeStr(this.rf)
	}.property("rf"),
	notesUpdated: function () {
		this.ldub && (this.set("notesUpdatedBy", decodeStr(Tawk.agentsController.getName(this.ldub.aid))), this.set("notesUpdatedOn",
			moment(this.ldub.uo).format("D MMM YYYY")))
	}.observes("ldub"),
	latestChatId: function () {
		return 1 === this.chids.length ? this.chids[0] : this.conversationStarted ? this.chids[this.chids.length - 1] : this.chids[this.chids.length - 2]
	}.property("chids", "conversationStarted"),
	incomingCallChanged: function () {
		!1 === this.incomingCall && (clearTimeout(this.incomingWebRTCTimeout), notificationController.stopIncomingCall())
	}.observes("incomingCall"),
	tagsChanged: function () {
		if (this.tags && this.tagsv > this.customTags.version) {
			var a =
				[];
			this.tags.forEach(function (c) {
				a.pushObject(decodeStr(c))
			});
			this.set("tags", a);
			this.set("customTags.data", this.tags.join(", "));
			this.set("customTags.version", this.tagsv)
		}
	}.observes("tagsv"),
	startIncomingCallNotification: function (a, c) {
		var d = this, b = (new Date).getTime(), e = (new Date(c)).getTime(), b = a - (b - e);
		notificationController.notifyIncomingCall();
		clearTimeout(this.incomingWebRTCTimeout);
		this.incomingWebRTCTimeout = setTimeout(function () {
			d.setProperties({incomingCall: !1, ongoingCall: !1})
		}, b)
	}
});
Tawk.ShortcutModel =
	Ember.Object.extend(Ember.Copyable, {
		copy: function () {
			var a = this, c = new this.constructor;
			Object.keys(this).forEach(function (d) {
				"_" !== d.charAt("0") && "toString" !== d && (a.get(d) instanceof Array ? c.set(d, a.get(d).slice()) : c.set(d, a.get(d)))
			});
			return c
		}, isPublicAccess: function () {
			return "public" === this.dataType
		}.property("dataType"), isPersonalAccess: function () {
			return "personal" === this.dataType
		}.property("dataType"), isMessageType: function () {
			return "message" === this.shortcutType
		}.property("shortcutType"), isSurveyType: function () {
			return "survey" ===
				this.shortcutType
		}.property("shortcutType")
	});
Tawk.PropertyModel = Ember.Object.extend({
	id: null,
	name: null,
	tawkId: null,
	siteLink: null,
	isAdmin: null,
	sortable: null,
	enabled: null,
	isSite: null,
	hasAgents: null,
	canBeDeleted: null,
	hasDepartments: null,
	agentList: null,
	departmentList: null,
	triggerList: null,
	settings: null,
	isProcessed: null,
	invitedList: null,
	addOnList: null,
	initialize: function (a, c) {
		this.setProperties({
			id: a.id,
			name: decodeStr(a.propertyName),
			tawkId: decodeStr(a.tawkId),
			isAdmin: a.isAdmin,
			sortable: decodeStr(a.propertyName).toLowerCase(),
			enabled: a.enabled,
			isSite: c,
			hasAgents: a.currentAgents && 1 < a.currentAgents.length,
			canBeDeleted: a.isAdmin,
			isProcessed: !1,
			agentList: [],
			invitedList: [],
			triggerList: [],
			departmentList: [],
			widgetList: [],
			settings: {},
			agentAccess: a.currentAgents,
			hasDepartments: a.departments && Object.keys(a.departments).length,
			type: a.type,
			propertyType: a.propertyType
		})
	},
	loadSettings: function (a) {
		this.set("settings.domain", a.dmn);
		this.set("settings.apiKey", a.apik);
		this.set("settings.forwardingEmail", a.efwd + GLOBAL_TICKETS_DOMAIN);
		this.set("agentAccess",
			a.a);
		this.loadDepartments(a.dpts);
		this.isSite ? (delete a.wdgts.page, this.set("settings.secureJSAPI", a.secureJSAPI)) : (this.set("settings.categoryId", a.cat), this.set("settings.subCategoryId", a.scat));
		this.loadWidgets(a.wdgts);
		this.loadCustomization(a);
		this.loadEmailSettings(a.transcript)
	},
	loadAgents: function (a) {
		var c = this, d = [];
		this.set("agentList", []);
		a && (a.forEach(function (a) {
			var e = c.agentAccess.findProperty("aid", a.aid);
			e && !e.ha && d.pushObject(Ember.Object.create({
				id: a.aid,
				name: decodeStr(a.n),
				role: e.rl,
				enabled: e.en ? "enabled" : "disabled",
				isEnabled: e.en,
				isDisabled: !e.en,
				isAdmin: "admin" === e.rl,
				isAgent: "agent" === e.rl,
				isCurrentAgent: a.aid === Tawk.userController.user.id,
				country: a.lk ? "flag flag-" + a.lk.cc.toLowerCase() : "",
				canBeDeleted: a.aid !== Tawk.userController.user.id && c.isAdmin,
				toBeDeleted: !1
			}))
		}), this.set("agentList", sortList(d, "name")))
	},
	loadInvitedAgents: function (a) {
		var c = [], d = this;
		a.forEach(function (a) {
			c.pushObject(Ember.Object.create({
				id: a._id,
				email: a.e,
				tawkId: a.twid,
				isInvitation: !0,
				isExisting: a.aid,
				role: a.rl,
				isAdmin: "admin" === a.rl,
				isAgent: "agent" === a.rl,
				isEnabled: !0,
				canBeDeleted: d.isAdmin,
				toBeDeleted: !1
			}))
		});
		this.set("invitedList", c)
	},
	loadDepartments: function (a) {
		var c = [], d = this;
		this.set("departmentList", []);
		a && (Object.keys(a).forEach(function (b) {
			b = a[b];
			var e = [];
			b.dltd || (b.a.forEach(function (a) {
				var b = d.agentAccess.findProperty("aid", a);
				b && b.en && e.pushObject(Ember.Object.create({aid: a, name: Tawk.agentsController.getName(a)}))
			}), c.pushObject(Ember.Object.create({
				id: b.did,
				name: decodeStr(b.n),
				description: decodeStr(b.dsc),
				enabled: b.en ? "enabled" : "disabled",
				isEnabled: b.en,
				agents: b.a || [],
				assignedAgents: e,
				agentNames: e.length ? "<p>" + e.getEach("name").join("</p><p>") + "</p>" : null,
				canBeDeleted: d.isAdmin,
				totalAssignedText: languageParser.translate("admin", "member_total", {num: e.length})
			})))
		}), this.set("departmentList", sortList(c, "name")), this.set("hasDepartments", c.length))
	},
	updateAgentAccess: function (a, c, d) {
		a = this.agentAccess.findProperty("aid", a);
		a.rl = c;
		a.en = d
	},
	loadWidgets: function (a) {
		var c = this, d = [];
		Object.keys(a).forEach(function (b) {
			if (a[b].vis ||
				"page" === b) b = extractWidgetSettings(a[b], b), b.siteId = c.id, c.isAdmin && (b.canBeDeleted = !0), d.pushObject(Tawk.WidgetModel.create(b))
		});
		this.set("widgetList", d)
	},
	getPageWidget: function () {
		return this.isSite || !this.widgetList.length ? null : this.widgetList[0]
	},
	loadCustomization: function (a) {
		var c, d, b = this;
		this.isSite || (a.scat ? (d = languageParser.translate("site_subcategories_" + a.cat, a.scat), this.set("categoryName", d), this.set("subCategoryName", d)) : a.cat && this.set("categoryName", languageParser.translate("site_categories",
			a.cat)), c = {
			description: decodeStr(a.dsc),
			logo: a.lg ? GLOBAL_AWS_LG_URL + "/" + a.lg + "?=" + randomString(5, !0) : null,
			profileImage: Tawk.webProperties.personalPage.alias.aliasImage,
			header: a.bnnr ? GLOBAL_AWS_BN_URL + "/" + a.bnnr + "?=" + randomString(5, !0) : null,
			slogan: a.slg ? decodeStr(a.slg) : "",
			summary: a.smry ? decodeStr(a.smry) : "",
			tagList: a.tags,
			tags: a.tags ? decodeStr(a.tags.join(", ")) : "",
			links: []
		}, a.loc && (c.location = Tawk.CopyableModel.create({
			country: a.loc.cc,
			city: a.loc.cy ? decodeStr(a.loc.cy) : null,
			state: a.loc.sta ? decodeStr(a.loc.sta) :
				null,
			locationId: a.loc.locid,
			locationInfo: null
		}), a.loc.cy && (d = decodeStr(a.loc.cy) + (a.loc.sta ? "," + decodeStr(a.loc.sta) : ""), c.location.set("locationInfo", d)), c.location.set("countryName", getCountryByCode(a.loc.cc) || ""), b.set("countryCode", a.loc.cc)), a.scls && a.scls.forEach(function (a) {
			c[a.t] || (c[a.t] = []);
			linkData = {value: a.lnk, type: a.t, index: b.id + a.t + Date.now()};
			c[a.t].pushObject(linkData);
			c.links.pushObject(linkData)
		}), a.lnks && (c.otherLinks = [], a.lnks.forEach(function (a) {
			linkData = {
				value: a.lnk, type: "other",
				index: b.id + "other" + Date.now()
			};
			c.otherLinks.pushObject(linkData);
			c.links.pushObject(linkData)
		})), this.set("customization", Tawk.CustomizationModel.create(c)))
	},
	loadEmailSettings: function (a) {
		var c = {};
		c.all = Tawk.CopyableModel.create({selected: !1});
		c.chat = Tawk.CopyableModel.create({selected: !1});
		c.offline = Tawk.CopyableModel.create({selected: !1});
		a ? a.all ? (c.all.setProperties(a.all), c.all.set("selected", !0), c.chat.set("selected", !0), c.offline.set("selected", !0)) : (a.chat && (c.chat.setProperties(a.chat), c.chat.set("selected",
			!0)), a.offline && (c.offline.setProperties(a.offline), c.offline.set("selected", !0))) : c.offline.setProperties({
			selected: !0,
			group: "all"
		});
		c.enabled = c.all.selected || c.chat.selected || c.offline.selected ? !0 : !1;
		this.set("emailSettings", Tawk.CopyableModel.create(c))
	},
	siteLink: function () {
		return GLOBAL_TAWK_URL + "/" + decodeStr(this.tawkId)
	}.property("tawkId")
});
Tawk.CopyableMixin = Ember.Mixin.create({
	copy: function () {
		var a = this, c = new this.constructor;
		Object.keys(this).forEach(function (d) {
			"_" !== d.charAt("0") && "toString" !==
			d && (a.get(d) instanceof Array ? c.set(d, a.get(d).map(function (a) {
				return Ember.copy(a, !0)
			})) : a.get(d) instanceof Ember.Object ? c.set(d, a.get(d).copy()) : c.set(d, a.get(d)))
		});
		return c
	}
});
Tawk.CopyableModel = Ember.Object.extend(Ember.Copyable, Tawk.CopyableMixin);
Tawk.BubbleModel = Ember.Object.extend(Ember.Copyable, Tawk.CopyableMixin, {
	isDefaultBubble: function () {
		return this.bubbleName && "default" !== this.bubbleName ? !1 : !0
	}.property("bubbleName"), uploadedBubbleImage: function () {
		return "upload" !== this.bubbleType ? "" :
			GLOBAL_FILE_STORAGE_URL + "/" + this.bubbleName
	}.property("bubbleName"), galleryBubbleImage: function () {
		return "gallery" !== this.bubbleType || this.get("isDefaultBubble") ? "" : GLOBAL_STATIC_URL + "/images/bubbles/" + this.bubbleName.replace("bubble-", "") + ".png"
	}.property("bubbleName")
});
Tawk.FormField = Ember.Object.extend(Ember.Copyable, Tawk.CopyableMixin, {
	selections: null, init: function () {
		var a = [];
		this.set("id", "id" + randomString(10, !0));
		this.set("name", "name" + randomString(10, !0));
		this.tempSelections && (this.tempSelections.forEach(function (c) {
			a.pushObject({text: c})
		}),
			this.set("selections", a))
	}, canAddSelection: function () {
		return 20 >= this.selections.length
	}.property("selections.length"), addSelection: function () {
		this.selections.pushObject({text: "Lorem ipsum"})
	}
});
Tawk.FormFields = Ember.Object.extend(Ember.Copyable, Tawk.CopyableMixin, {
	fields: null, parsedFields: null, init: function () {
		var a = this, c = [];
		Array.isArray(this.fields) && this.fields.forEach(function (d) {
			var b = {
				label: decodeStr(d.label),
				isRequired: !!d.isRequired,
				type: d.type,
				isName: "name" === d.type,
				isEmail: "email" === d.type,
				isMessage: "message" === d.type,
				isInputText: "inputText" === d.type,
				isTextArea: "textArea" === d.type,
				isMultiChoice: "choice" === d.type,
				isOptions: "option" === d.type,
				isPhone: "phone" === d.type,
				isDepartment: "department" === d.type,
				canBeDeleted: !0,
				allowRequiredToggle: !0
			};
			if (b.isMultiChoice || b.isOptions) b.tempSelections = d.selections;
			"offline" === a.formType && (b.isName || b.isEmail || b.isMessage) && (b.canBeDeleted = !1, b.allowRequiredToggle = !1);
			c.pushObject(Tawk.FormField.create(b))
		});
		this.set("parsedFields", c)
	}, canAddFields: function () {
		return 10 >
			this.parsedFields.length
	}.property("parsedFields.length"), isNameAvailable: function () {
		return !this.parsedFields.findProperty("isName", !0)
	}.property("parsedFields.@each.isName"), isEmailAvailable: function () {
		return !this.parsedFields.findProperty("isEmail", !0)
	}.property("parsedFields.@each.isEmail"), isDepartmentAvailable: function () {
		return !this.parsedFields.findProperty("isDepartment", !0)
	}.property("parsedFields.@each.isDepartment"), isPhoneNumberAvailable: function () {
		return !this.parsedFields.findProperty("isPhone",
			!0)
	}.property("parsedFields.@each.isPhone"), addPhoneNumber: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-phone"),
			isRequired: !1,
			type: "phone",
			isPhone: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0
		}))
	}, addInputTextQuestion: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-question"),
			isRequired: !1,
			type: "inputText",
			isInputText: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0
		}))
	},
	addTextAreaQuestion: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-question"),
			isRequired: !1,
			type: "textArea",
			isTextArea: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0
		}))
	}, addDepartment: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-department"),
			isRequired: !1,
			type: "department",
			isDepartment: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0
		}))
	}, addName: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation",
				a + "-name"), isRequired: !1, type: "name", isName: !0, canBeDeleted: !0, allowRequiredToggle: !0
		}))
	}, addEmail: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-email"),
			isRequired: !1,
			type: "email",
			isEmail: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0
		}))
	}, addMultiChoice: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-question"),
			isRequired: !1,
			type: "choice",
			isMultiChoice: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0,
			selections: [{text: "Lorem ipsum"}, {text: "Lorem ipsum"}]
		}))
	}, addOptions: function (a) {
		this.parsedFields.pushObject(Tawk.FormField.create({
			label: languageParser.translate("widget_preview_translation", a + "-question"),
			isRequired: !1,
			type: "option",
			isOptions: !0,
			canBeDeleted: !0,
			allowRequiredToggle: !0,
			selections: [{text: "Lorem ipsum"}, {text: "Lorem ipsum"}]
		}))
	}, addSelection: function (a) {
		(a = this.parsedFields.findProperty("id", a)) && a.addSelection()
	}, removeSelection: function (a,
	                              c) {
		var d = this.parsedFields.findProperty("id", a);
		d && (d.selections && d.selections.length && !(0 > c || c > d.selections.length)) && d.selections.removeAt(c)
	}, removeField: function (a) {
		a = this.parsedFields.findProperty("id", a);
		!a || "offline" === a.formType && (a.isName || a.isEmail || formType.isMessage) || this.parsedFields.removeObject(a)
	}, moveField: function (a, c) {
		var d, b = this.parsedFields.findProperty("id", a);
		d = this.parsedFields.findProperty("id", c);
		b && (this.parsedFields.removeObject(b), d = d ? this.parsedFields.indexOf(d) : this.parsedFields.length,
			this.parsedFields.insertAt(d, b))
	}, toggleRequired: function (a) {
		a = this.parsedFields.findProperty("id", a);
		"offline" === a.formType && (a.isName || a.isEmail || formType.isMessage) || (a.isRequired ? a.set("isRequired", !1) : a.set("isRequired", !0))
	}, fieldHasEmptySelections: function (a) {
		return 0 === this.parsedFields.findProperty("id", a).selections.length
	}
});
Tawk.WidgetModel = Ember.Object.extend(Ember.Copyable, Tawk.CopyableMixin, {
	widgetCode: function () {
		return this.isInline ? inlineWidgetCode.replace("__SITE_ID__", this.siteId).replace("__WIDGET_ID__",
			this.id) : embedWidgetCode.replace(/__EMBED_ID__/gm, "tawk_" + this.siteId).replace("__SITE_ID__", this.siteId).replace("__WIDGET_ID__", this.id)
	}.property("id"), whiteList: function () {
		var a = [], c = this;
		Object.keys(this.domainWhiteList).length && this.domainWhiteList.stdom.forEach(function (d) {
			a.pushObject({value: d, id: c.id + randomString("5", !0)})
		});
		return Tawk.CopyableModel.create({domains: a})
	}.property("domainWhiteList")
});
Tawk.BanEntryModel = Ember.Object.extend({
	id: null,
	type: null,
	propertyId: null,
	property: null,
	entry: null,
	displayText: null,
	country: null,
	city: null,
	reason: null,
	bannedBy: null,
	createdOn: null,
	toBeDeleted: !1,
	transcript: null,
	init: function () {
		null === this.transcript && this.set("transcript", Ember.Object.create({
			isLoaded: !1,
			isError: !1,
			content: null
		}))
	},
	isVisitor: function () {
		return "id" === this.type
	}.property("type"),
	propertyName: function () {
		return this.property ? this.property.get("propertyName") : null
	}.property("property"),
	isAdmin: function () {
		return this.property ? this.property.get("isAdmin") : !1
	}.property("property"),
	clone: function () {
		return Tawk.BanEntryModel.create({
			id: this.get("id"),
			type: this.get("type"),
			propertyId: this.get("propertyId"),
			property: this.get("property"),
			entry: this.get("entry"),
			displayText: this.get("displayText"),
			country: this.get("country"),
			city: this.get("city"),
			reason: this.get("reason"),
			bannedBy: this.get("bannedBy"),
			createdOn: this.get("createdOn"),
			transcript: this.get("transcript")
		})
	}
});
Tawk.createBanEntryFromJSON = function (a) {
	var c = Tawk.webProperties.getProperty(a.pgid), d = "trigger" === a.bannedBy ?
		languageParser.translate("ban_list", "trigger_display_name") : Tawk.agentsController.getName(a.bannedBy);
	return c ? Tawk.BanEntryModel.create({
		id: a.opid,
		type: a.valueType,
		propertyId: a.pgid,
		property: c,
		entry: a.value,
		displayText: a.valueDisplay,
		reason: decodeStr(a.reason),
		bannedBy: d,
		createdOn: moment(a.createdOn).format("DD/MMM/YYYY"),
		co: a.createdOn,
		country: a.lastKnown && a.lastKnown.cc ? "flag flag-" + a.lastKnown.cc.toLowerCase() : null,
		city: a.lastKnown ? a.lastKnown.cy : null
	}) : null
};
Tawk.CustomizationModel = Ember.Object.extend(Ember.Copyable,
	Tawk.CopyableMixin, {
		description: null,
		summary: null,
		logo: null,
		profileImage: null,
		header: null,
		logoHash: null,
		bannerHash: null,
		profileImageHash: null,
		tags: null,
		tagList: null,
		facebook: null,
		flickr: null,
		instagram: null,
		twitter: null,
		youtube: null,
		vimeo: null,
		linkedin: null,
		gplus: null,
		otherLinks: null,
		widgetSetting: null,
		location: null,
		positionTitle: null,
		countryName: null,
		init: function () {
			this.location || this.set("location", Tawk.CopyableModel.create({
				country: null,
				city: null,
				state: null,
				locationId: null,
				locationInfo: null,
				countryName: null
			}));
			this.tagList || this.set("tagList", []);
			this.facebook || this.set("facebook", []);
			this.flickr || this.set("flickr", []);
			this.instagram || this.set("instagram", []);
			this.twitter || this.set("twitter", []);
			this.youtube || this.set("youtube", []);
			this.vimeo || this.set("vimeo", []);
			this.linkedin || this.set("linkedin", []);
			this.gplus || this.set("gplus", []);
			this.otherLinks || this.set("otherLinks", [])
		},
		getAllLinksValue: function () {
			var a = [], a = a.concat(this.facebook.getEach("value")), a = a.concat(this.flickr.getEach("value")),
				a = a.concat(this.instagram.getEach("value")),
				a = a.concat(this.twitter.getEach("value")), a = a.concat(this.youtube.getEach("value")),
				a = a.concat(this.vimeo.getEach("value")), a = a.concat(this.linkedin.getEach("value")),
				a = a.concat(this.gplus.getEach("value"));
			return a = a.concat(this.otherLinks.getEach("value"))
		},
		getAllLinks: function () {
			var a = [], a = a.concat(this.facebook), a = a.concat(this.flickr), a = a.concat(this.instagram),
				a = a.concat(this.twitter), a = a.concat(this.youtube), a = a.concat(this.vimeo),
				a = a.concat(this.linkedin), a = a.concat(this.gplus);
			return a = a.concat(this.otherLinks)
		},
		logoBackgroundStyle: function () {
			return this.logo ? "background-image: url('" + this.logo + "')" : ""
		}.property("logo"),
		headerBackgroundStyle: function () {
			return this.header ? "background-image: url('" + this.header + "')" : ""
		}.property("header")
	});
Tawk.PagingListModel = Ember.Object.extend({
	currentData: null,
	perpage: null,
	totalItems: null,
	currentHead: null,
	from: null,
	to: null,
	pendingData: null,
	init: function () {
		this.set("currentData", []);
		this.set("pendingData", []);
		this.set("currentHead", 0)
	},
	setList: function (a) {
		this.currentData.pushObjects(a);
		this.to > this.totalItems && this.set("to", this.totalItems)
	},
	startList: function () {
		this.set("from", 1);
		this.set("to", this.perpage);
		this.set("currentHead", 0);
		this.currentData.clear();
		this.pendingData.clear()
	},
	nextList: function () {
		this.set("from", this.from + this.perpage);
		this.to + this.perpage > this.totalItems ? this.set("to", this.totalItems) : this.set("to", this.to + this.perpage);
		this.set("currentHead", this.currentHead + this.perpage)
	},
	previousList: function () {
		0 < this.from - this.perpage ? (this.set("from", this.from - this.perpage),
			this.set("to", this.from + this.perpage - 1)) : (this.set("from", 1), this.set("to", this.perpage));
		this.set("currentHead", this.currentHead - this.perpage)
	},
	hasNext: function () {
		return this.currentHead + this.perpage < this.totalItems
	}.property("currentHead", "totalItems", "currentData.length"),
	hasPrevious: function () {
		return 0 < this.currentHead
	}.property("currentHead", "totalItems", "currentData.length"),
	setTotal: function (a) {
		this.set("totalItems", a)
	},
	isLastPage: function () {
		return 0 < this.currentData.length && this.to >= this.totalItems
	},
	reset: function () {
		this.currentData.clear();
		this.set("currentHead", 0);
		this.set("from", 0);
		this.set("to", 0)
	},
	getItem: function (a) {
		return this.currentData.findProperty("_id", a) || this.currentData.findProperty("id", a)
	},
	removeItem: function (a) {
		this.currentData.removeObject(a);
		this.set("totalItems", this.totalItems - 1);
		this.refreshPaging()
	},
	refreshPaging: function () {
		this.to > this.totalItems && this.set("to", this.totalItems)
	},
	addPendingData: function (a) {
		this.pendingData.pushObject(a)
	},
	clearPendingData: function () {
		var a =
			this;
		this.pendingData.forEach(function (c) {
			a.currentData.insertAt(0, c)
		});
		this.pendingData.clear()
	}
});
Tawk.BaseController = Ember.Mixin.create({
	range: null, perpage: null, currentPage: null, nextDisabled: null, previousDisabled: null, init: function () {
		this.set("currentPage", 0);
		this.set("perpage", 10);
		this.set("range", {startRange: 1, endRange: this.perpage});
		this.set("previousDisabled", !0);
		this.set("nextDisabled", !1)
	}, updateRange: function () {
		var a, c = {};
		this.get("list").length ? (a = Math.floor(this.get("list").length / this.perpage),
			a <= this.currentPage ? (a < this.currentPage && this.set("currentPage", a), c.startRange = 0 === a ? 1 : this.get("list").length - this.perpage + 1, c.endRange = this.get("list").length) : 0 === this.currentPage ? (c.startRange = this.perpage * this.currentPage + 1, c.endRange = this.perpage) : (c.startRange = this.perpage * (this.currentPage - 1) + 1, c.endRange = this.perpage * this.currentPage)) : (c.startRange = 0, c.endRange = 0);
		this.set("range", c);
		this.allowPageMove()
	}.observes("perpage", "list.length"), allowPageMove: function () {
		1 >= this.range.startRange ?
			this.set("previousDisabled", !0) : this.set("previousDisabled", !1);
		this.range.endRange >= this.get("list").length ? this.set("nextDisabled", !0) : this.set("nextDisabled", !1)
	}, changePage: function (a) {
		var c = {};
		this.set("currentPage", this.currentPage + a);
		a = (this.currentPage + 1) * this.perpage;
		this.get("list").length ? c.startRange = this.currentPage * this.perpage + 1 : c.startRange = 0;
		a >= this.get("list").length ? c.endRange = this.get("list").length : c.endRange = a;
		this.set("range", c);
		this.allowPageMove()
	}, toggleDelete: function (a) {
		(a =
			this.get("list").findProperty("id", a)) && (a.toBeDeleted ? a.set("toBeDeleted", !1) : a.set("toBeDeleted", !0))
	}, hasItemsToDelete: function () {
		return this.get("list").filterProperty("toBeDeleted", !0).get("length")
	}.property("list.@each.toBeDeleted"), actions: {
		nextPage: function () {
			this.changePage(1)
		}, previousPage: function () {
			this.changePage(-1)
		}
	}
});
Tawk.IntercomController = Ember.Controller.extend({
	stack: [], isBooted: !1, bootLoadedCheck: null, boot: function (a) {
	}, execute: function (a, c) {
	}, addToStack: function (a, c) {
	}, clearStack: function () {
	},
	update: function (a) {
	}, trackEvent: function (a) {
	}
});
Tawk.intercomController = Tawk.IntercomController.create();