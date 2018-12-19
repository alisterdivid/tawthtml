Tawk.LASchedulerController = Ember.Controller.extend({
	propertiesSchedule: null, checkInterval: null, isGlobalEnabled: null, init: function () {
		this.set("propertiesSchedule", [])
	}, setupProperties: function (a) {
		var c = [], d = main.storageSettings.laScheduler || {};
		if (Tawk.userController.user.isHiredAgent) {
			for (var b =
				0; b < a.length; b++) {
				var e, f = a[b], g = {};
				e = moment().diff(f.settings.expiry);
				e = Ember.Object.create({
					timezone: f.settings.settings.tz,
					isFulltime: 168 === f.settings.entitlements.hours,
					hasExpired: !f.settings.expiry || 0 < e,
					noSchedule: !(f.settings.settings.tz || 168 === f.settings.entitlements.hours),
					property: f.property,
					toggleName: f.property.id + "t",
					forceDisable: !!this.isGlobalEnabled,
					autoSchedule: d[f.property.id] ? !1 : !0,
					forceOn: f.property.isStatusEnabled,
					isEnabled: f.settings.settings.enabled,
					hoursPurchased: f.settings.entitlements.hours
				});
				f.settings.settings.schedule && f.settings.settings.schedule.forEach(function (a) {
					var b, c, d, e;
					g[a.day] || (g[a.day] = []);
					0 === a.start ? c = b = 0 : (b = moment.duration(a.start, "minutes").hours(), c = moment.duration(a.start, "minutes").minutes());
					1440 === a.end ? (d = 24, e = 0) : (d = moment.duration(a.end, "minutes").hours(), e = moment.duration(a.end, "minutes").minutes());
					g[a.day].push({startHour: b, startMinute: c, endHour: d, endMinute: e})
				});
				e.set("schedule", g);
				c.pushObject(e)
			}
			this.propertiesSchedule.pushObjects(sortList(c, "property.propertyName"));
			null === this.isGlobalEnabled && (d && d.notifyAll ? this.set("isGlobalEnabled", "on" === d.notifyAll ? !0 : !1) : this.set("isGlobalEnabled", !0));
			this.setupScheduleTimer()
		}
	}, setupScheduleTimer: function () {
		var a = this, c = new Date,
			c = new Date(c.getFullYear(), c.getMonth(), c.getDate(), c.getHours(), c.getMinutes() - c.getMinutes() % 15 + 15, 3, 0) - c;
		Tawk.userController.user.isHiredAgent && (this.calculateSchedule(), clearTimeout(this.checkInterval), this.isGlobalEnabled && this.set("checkInterval", setTimeout(function () {
				a.setupScheduleTimer()
			},
			c)))
	}, calculateSchedule: function () {
		var a = this, c = 0, d = function () {
			c++
		};
		Tawk.userController.user.isHiredAgent && this.propertiesSchedule.forEach(function (b) {
			var e, f = moment.tz(b.timezone);
			e = f.day();
			clientCurrentHour = f.hours();
			clientCurrentMinutes = f.minutes();
			shouldAnswer = !1;
			if (!1 === a.isGlobalEnabled && b.autoSchedule) b.set("toBeAnswered", !1), b.property.isStatusEnabled && Tawk.webProperties.changePageStatus(b.property.id, !1, d.bind(a)); else if (!b.isEnabled || b.hasExpired || b.noSchedule && !b.isFulltime) b.set("toBeAnswered",
				!1), b.property.isStatusEnabled ? Tawk.webProperties.changePageStatus(b.property.id, !1, d.bind(a)) : c++; else {
				if (b.autoSchedule) {
					if (0 === Object.keys(b.schedule).length && b.isFulltime) {
						b.set("toBeAnswered", !0);
						b.property.isStatusEnabled ? c++ : Tawk.webProperties.changePageStatus(b.property.id, !0, d.bind(a));
						return
					}
					(e = b.schedule[e]) && e.forEach(function (a) {
						var b = 60 * clientCurrentHour + clientCurrentMinutes, c = 60 * a.endHour + a.endMinute;
						b >= 60 * a.startHour + a.startMinute && b < c && (shouldAnswer = !0)
					})
				} else shouldAnswer = b.forceOn;
				shouldAnswer && !b.property.isStatusEnabled ? (b.set("toBeAnswered", shouldAnswer), Tawk.webProperties.changePageStatus(b.property.id, shouldAnswer, d.bind(a))) : !shouldAnswer && b.property.isStatusEnabled ? Tawk.leftPanelController.agentHasOngoingChatsForProperty(b.property.id) ? checkAndSetConfirmView(!1, function (c) {
						c && (b.set("toBeAnswered", shouldAnswer), Tawk.webProperties.changePageStatus(b.property.id, shouldAnswer, d.bind(a)))
					}, "It's time to stop answering chats for " + b.property.propertyName + ". However you have ongoing chats for this property. Do you want to proceed to turn off this property? If you turn it off, you will be pushed out of the chat. If you don't want to turn off now, the scheduler will try turn it off again in the next quarter.",
					null, "Property Turn Off", "Yes, turn it off") : (b.set("toBeAnswered", shouldAnswer), Tawk.webProperties.changePageStatus(b.property.id, shouldAnswer, d.bind(a))) : (b.set("toBeAnswered", shouldAnswer), c++)
			}
		})
	}, toggleGlobalAnswerStatus: function (a) {
		if (Tawk.userController.user.isHiredAgent) {
			var c = main.storageSettings.laScheduler || {};
			this.set("isGlobalEnabled", a);
			c.notifyAll = a ? "on" : "off";
			main.updateStorageSettings("laScheduler", c);
			this.setupScheduleTimer()
		}
	}, changePropertyAnswerStatus: function (a, c) {
		var d = this.propertiesSchedule.findProperty("property.id",
			c), b = main.storageSettings.laScheduler || {};
		Tawk.userController.user.isHiredAgent && d && (a ? ("auto" === a ? (d.setProperties({
			autoSchedule: !0,
			forceOn: !1
		}), delete b[c]) : ("yes" === a ? d.set("forceOn", !0) : "no" === a && d.set("forceOn", !1), b[c] = "no-auto"), main.updateStorageSettings("laScheduler", b), this.setupScheduleTimer()) : d.setProperties({
			autoSchedule: !1,
			forceOn: !!d.toBeAnswered
		}))
	}, updateSchedule: function (a) {
		var c = {}, d = this.propertiesSchedule.findProperty("property.id", a.propertyId);
		Tawk.userController.user.isHiredAgent &&
		d && (d.setProperties({
			timezone: a.settings.tz,
			isFulltime: 168 === a.entitlements.hours,
			noSchedule: !(a.settings.tz || 168 === a.entitlements.hours),
			isEnabled: a.settings.enabled,
			hoursPurchased: a.entitlements.hours
		}), a.settings.schedule && a.settings.schedule.forEach(function (a) {
			var d, f, g, h;
			c[a.day] || (c[a.day] = []);
			0 === a.start ? f = d = 0 : (d = moment.duration(a.start, "minutes").hours(), f = moment.duration(a.start, "minutes").minutes());
			1440 === a.end ? (g = 24, h = 0) : (g = moment.duration(a.end, "minutes").hours(), h = moment.duration(a.end,
				"minutes").minutes());
			c[a.day].push({startHour: d, startMinute: f, endHour: g, endMinute: h})
		}), d.set("schedule", c), this.setupScheduleTimer())
	}, addProperty: function (a, c) {
		var d, b = {};
		d = moment().diff(c.expiry);
		Tawk.userController.user.isHiredAgent && (d = Ember.Object.create({
			timezone: c.settings.tz,
			isFulltime: 168 === c.entitlements.hours,
			hasExpired: !c.expiry || 0 < d,
			noSchedule: !(c.settings.tz || 168 === c.entitlements.hours),
			property: a,
			toggleName: a.id + "t",
			forceDisable: !!this.isGlobalEnabled,
			autoSchedule: !0,
			forceOn: a.isStatusEnabled,
			isEnabled: c.settings.enabled,
			hoursPurchased: c.entitlements.hours
		}), c.settings.schedule && c.settings.schedule.forEach(function (a) {
			var c, d, h, k;
			b[a.day] || (b[a.day] = []);
			0 === a.start ? d = c = 0 : (c = moment.duration(a.start, "minutes").hours(), d = moment.duration(a.start, "minutes").minutes());
			1440 === a.end ? (h = 24, k = 0) : (h = moment.duration(a.end, "minutes").hours(), k = moment.duration(a.end, "minutes").minutes());
			b[a.day].push({startHour: c, startMinute: d, endHour: h, endMinute: k})
		}), d.set("schedule", b), this.propertiesSchedule.pushObject(d),
			this.setupScheduleTimer())
	}
});
Tawk.laScheduler = Tawk.LASchedulerController.create();
Tawk.WebProperties = Ember.Controller.extend({
	personalPage: null,
	pages: null,
	sites: null,
	attachedDepartments: null,
	colorCodes: null,
	updatedData: null,
	reorderList: !1,
	loadProperties: function (a) {
		var c = this, d = [], b = [], e = [], f = [], g = Tawk.userController.user.id;
		this.set("sites", []);
		this.set("pages", []);
		this.set("colorCodes", []);
		this.set("attachedDepartments", []);
		this.set("processed", !1);
		a.forEach(function (a) {
			var k;
			a.dptst && a.dptst.length &&
			a.dptst.forEach(function (b) {
				a.dpts && a.dpts[b.did] && (a.dpts[b.did].st = b.st)
			});
			k = Ember.Object.create({
				id: a._id,
				propertyName: a.pgn,
				tawkId: a.twid,
				departments: a.dpts,
				type: a.t,
				enabled: a.en,
				currentAgents: a.a || [],
				statusVersion: a.asver,
				departmentVersion: a.dptsver || 0,
				propertyType: a.pt,
				createdInWizard: a.cw,
				createdBy: a.cb,
				propertyUrl: a.dmn,
				widgetVersion: a.wdgtv || 0,
				tabSettings: [],
				kbCategories: [],
				isKbCategoriesLoaded: !1,
				kbContent: [],
				isKbContentLoaded: !1,
				isClientProperty: !1,
				webrtcActivated: !1,
				webrtcEnabled: !1
			});
			"profile" === a.t && (k.set("profilePageLink", GLOBAL_TAWK_URL + "/" + a.twid), k.set("propertyName", Tawk.userController.user.fullName), k.set("alias", {
				aliasId: "ac355b50-c86b-11e2-9572-db036bbd95f2",
				positionTitle: a.pst,
				aliasImage: a.ai,
				displayName: Tawk.userController.user.fullName
			}), c.set("personalPage", k));
			a.a.every(function (a) {
				return a.aid === g ? (k.set("isAdmin", "admin" === a.rl), k.set("isStatusEnabled", a.pen), k.set("isClientProperty", !!a.ha), a.ha && Tawk.userController.user.set("isHiredAgent", !0), !1) : !0
			});
			a.addons &&
			(Tawk.userController.bannerClosed || Tawk.userController.closeBanner(!0), a.addons.webrtc && (0 < moment(a.addons.webrtc.expiry || 0).diff(moment()) && k.set("webrtcActivated", !0), a.addons.webrtc.settings && (k.set("webrtcEnabled", !!a.addons.webrtc.settings.enabled), k.set("webrtcVideoEnabled", a.addons.webrtc.settings.video ? a.addons.webrtc.settings.video : !0), k.set("webrtcScreenEnabled", a.addons.webrtc.settings.screen ? a.addons.webrtc.settings.screen : !0))), a.addons.liveAnswering && k.isClientProperty && f.push({
				property: k,
				settings: a.addons.liveAnswering
			}));
			"page" === k.propertyType ? e.pushObject(k) : b.pushObject(k);
			a.dpts && Object.keys(a.dpts).forEach(function (b) {
				a.dpts[b].dltd || a.dpts[b].a.contains(g) && c.attachedDepartments.push(b)
			});
			if (a.wdgts && Object.keys(a.wdgts).length) {
				var l = [];
				Object.keys(a.wdgts).forEach(function (b) {
					a.wdgts[b] ? l.push({id: b, name: a.wdgts[b]}) : l.push({id: b, name: b})
				});
				k.set("widgets", l)
			}
			c.getAlert(k.id);
			d.push(a._id)
		});
		this.sites.pushObjects(sortList(b, "propertyName"));
		this.pages.pushObjects(sortList(e,
			"propertyName"));
		this.loadTabSettings(d);
		this.set("processed", !0);
		Tawk.userController.user.isHiredAgent && Tawk.laScheduler.setupProperties(f);
		Tawk.agentsController.processAgents()
	},
	loadTabSettings: function (a) {
		var c = this;
		socketConnector.getAllPropertiesTabSettings(a, function (a, b) {
			b && b.forEach(function (a) {
				c.updateTabSettings(a)
			})
		})
	},
	loadKBCategory: function (a, c) {
		var d = this.getProperty(a);
		if (!d) return c(!0);
		d.isKbCategoriesLoaded ? c(null, d.kbCategories) : socketConnector.getKBCategories(a, function (a, e) {
			var f =
				[];
			if (a) return c(a);
			e.forEach(function (a) {
				a = Ember.Object.create({id: a.categoryId, isDeleted: a.deleted, name: a.name});
				f.pushObject(a)
			});
			d.kbCategories.clear();
			d.kbCategories.pushObjects(sortList(f, "name"));
			d.set("isKbCategoriesLoaded", !0);
			f = null;
			c(null, d.kbCategories)
		})
	},
	updateKBCategory: function (a, c) {
		var d, b = this.getProperty(a.propertyId);
		b && ((d = b.kbCategories.findProperty("id", a.categoryId)) ? c ? d.set("isDeleted", !0) : d.set("name", a.name) : (d = Ember.Object.create({
			id: a.categoryId,
			isDeleted: !1,
			name: a.name
		}),
			b.kbCategories.pushObject(d)), d = b.kbCategories.toArray(), b.kbCategories.clear(), b.kbCategories.pushObjects(sortList(d, "name")))
	},
	getKbContent: function (a, c) {
		var d = [], b = this.getProperty(a);
		if (!b) return null;
		b.isKbContentLoaded ? c(b.kbContent) : socketConnector.getKBList(a, {
			status: "published",
			size: 10
		}, function (a, f) {
			a || (f.hits.forEach(function (a) {
				d.pushObject({
					id: a.contentId,
					title: encodeStr(a.title),
					snippet: markdownConverter.makeHtml(encodeStr(a.snippet) + "..."),
					createdOn: moment(a.createdOn).format("MMM Do"),
					categoryName: b.kbCategories.findProperty("id", a.categories[0]).name
				})
			}), b.kbContent.pushObjects(d));
			b.set("isKbContentLoaded", !0);
			c(b.kbContent)
		})
	},
	getTabSettings: function (a) {
		return (a = this.getProperty(a)) ? a.tabSettings : null
	},
	updateTabSettings: function (a) {
		var c = this.getProperty(a.propertyId), d = [];
		!c || (c.tabVersion && c.tabVersion >= a.tabsv || !a.tabs) || (a.tabs.forEach(function (a) {
			a.enabled && ("internal" === a.tabType || "integration" === a.tabType ? (a.isInternal = !0, a.title = languageParser.translate("admin", a.label),
				a.isMenu = !1, a.isURL = !1, a.isText = !1, a.fontClass = tabsIconClass[a.label]) : (a.isURL = "url" === a.tabType, a.isMenu = "menu" === a.tabType, a.isText = "text" === a.tabType, "menu" === a.tabType && (a.items = [], a.content.forEach(function (c) {
				c.enabled && a.items.push({
					id: "i" + a.items.length,
					label: c.label,
					title: "internal" === c.tabType ? languageParser.translate("admin", c.label) : c.label,
					isText: "text" === c.tabType,
					isInternal: "internal" === c.tabType,
					isMenu: !1,
					isURL: "url" === c.tabType,
					content: c.content,
					beautifiedText: "text" === c.tabType ?
						markdownConverter.makeHtml(encodeStr(c.content)) : "",
					fontClass: "internal" === c.tabType ? tabsIconClass[c.label] : ""
				})
			})), a.isText && (a.beautifiedText = markdownConverter.makeHtml(encodeStr(a.content))), a.isInternal = !1, a.title = a.label), a.id = "t" + d.length, d.pushObject(a))
		}), c.isClientProperty && d.pushObject({
			title: "Client Data",
			isText: !0,
			isInternal: !1,
			isMenu: !1,
			isURL: !1,
			label: "client_data",
			id: "t" + d.length
		}), c.set("tabSettings", d), c.set("tabVersion", a.tabsv))
	},
	getProperty: function (a) {
		return this.get("allProperties").findProperty("id",
			a)
	},
	allProperties: function () {
		return this.sites || this.pages ? this.sites.concat(this.pages) : []
	}.property("sites.@each", "pages.@each"),
	isAgentActive: function (a) {
		var c = !1;
		this.get("allProperties").every(function (d) {
			if (!d.currentAgents) return !0;
			d = d.currentAgents.filterProperty("aid", a);
			return d.length && d.findProperty("en", !0) ? (c = !0, !1) : !0
		});
		return c
	},
	getPropertyName: function (a) {
		return (a = this.get("allProperties").findProperty("id", a)) ? a.propertyName : ""
	},
	updateDepartmentStatus: function (a) {
		a.dptst && a.dptst.length &&
		this.get("allProperties").forEach(function (c) {
			!c.departments || c.statusVersion >= a.asver || (a.dptst.forEach(function (a) {
				c.departments[a.did] && (c.departments[a.did].st = a.st)
			}), c.set("statusVersion", a.asver))
		})
	},
	isAgentAttachedToDepartment: function (a) {
		return -1 !== this.attachedDepartments.indexOf(a)
	},
	isDepartmentOffline: function (a, c) {
		var d = this.getProperty(a);
		return d && d.departments[c] && "offline" !== d.departments[c].st ? !1 : !0
	},
	getDepartmentName: function (a, c) {
		var d = this.getProperty(a);
		return d ? d.departments[c] ?
			d.departments[c].n : null : null
	},
	addProperty: function (a, c, d) {
		var b, e = !1, f = this, g = this.getProperty(a.pgid), h = Tawk.userController.user.id;
		d = d || function () {
		};
		if (g) return d();
		g = Ember.Object.create({
			id: a._id || a.pgid,
			propertyName: a.pgn,
			tawkId: a.twid,
			departments: a.dpts,
			type: a.t,
			enabled: a.en,
			currentAgents: a.a || [],
			statusVersion: a.asver,
			departmentVersion: a.dptsver || 0,
			propertyType: a.pt,
			createdInWizard: a.cw,
			createdBy: a.cb,
			propertyUrl: a.dmn,
			widgetVersion: a.wdgtv || 0,
			tabSettings: [],
			kbCategories: [],
			isKbCategoriesLoaded: !1,
			kbContent: [],
			isKbContentLoaded: !1,
			isClientProperty: !1,
			webrtcActivated: !1,
			webrtcEnabled: !1
		});
		a.rl && g.set("isAdmin", "admin" === a.rl);
		a.addons && (a.addons.webrtc && (0 < moment(a.addons.webrtc.expiry || 0).diff(moment()) && g.set("webrtcActivated", !0), a.addons.webrtc.settings && (g.set("webrtcEnabled", !!a.addons.webrtc.settings.enabled), g.set("webrtcVideoEnabled", a.addons.webrtc.settings.video ? a.addons.webrtc.settings.video : !0), g.set("webrtcScreenEnabled", a.addons.webrtc.settings.screen ? a.addons.webrtc.settings.screen :
			!0))), a.addons.liveAnswering && (g.isClientProperty && Tawk.userController.user.isHiredAgent) && Tawk.laScheduler.addProperty(g, a.addons.liveAnswering));
		b = "page" === g.propertyType ? "pages" : "sites";
		for (var k = 0; k < this[b].length; k++) if (this[b].objectAt(k).propertyName.toLowerCase() > g.propertyName.toLowerCase()) {
			this[b].insertAt(k, g);
			e = !0;
			break
		}
		e || this[b].pushObject(g);
		a.dpts && Object.keys(a.dpts).forEach(function (b) {
			a.dpts[b].dltd || a.dpts[b].a.contains(h) && f.attachedDepartments.push(b)
		});
		if (a.wdgts && Object.keys(a.wdgts).length) {
			var l =
				[];
			Object.keys(a.wdgts).forEach(function (b) {
				a.wdgts[b] ? l.push({id: b, name: a.wdgts[b]}) : l.push({id: b, name: b})
			});
			g.set("widgets", l)
		}
		a.a.forEach(function (a) {
			a.aid === h ? (g.set("isAdmin", "admin" === a.rl), g.set("isStatusEnabled", a.pen), g.set("isClientProperty", !!a.ha), a.ha && Tawk.userController.user.set("isHiredAgent", !0)) : Tawk.agentsController.addAgent(a)
		});
		c && (this.notifyUpdate(g), SHOW_WIZARD = null);
		Tawk.liveMonitoringController.addProperty(g);
		Tawk.shortcutsController.initializeShortcuts();
		this.loadTabSettings([g.id]);
		return d(g)
	},
	updatePropertyData: function (a, c, d) {
		var b = !1, e = this, f = !1, g = this.getProperty(a.pgid);
		d = d || function () {
		};
		if (!g) return socketConnector.getPropertyInformation(a.pgid, function (a, b) {
			a || e.addProperty(b, c, d)
		});
		a.pgn && (a.pgn.toLowerCase() !== g.propertyName.toLowerCase() && (f = !0), g.set("propertyName", a.pgn), Tawk.liveMonitoringController.updatePropertyName(g.id, g.propertyType, g.propertyName));
		a.twid && g.set("tawkId", a.twid);
		"profile" === g.type && g.set("profilePageLink", GLOBAL_TAWK_URL + "/" + a.twid);
		if (f) {
			this.set("reorderList",
				!1);
			a = "page" === g.propertyType ? "pages" : "sites";
			this[a].removeObject(g);
			for (f = 0; f < this[a].length; f++) if (this[a].objectAt(f).propertyName.toLowerCase() > g.propertyName.toLowerCase()) {
				this[a].insertAt(f, g);
				b = !0;
				break
			}
			b || this[a].pushObject(g);
			this.set("updatedData", {
				type: "propertyName",
				id: g.id,
				name: g.propertyName,
				propertyType: g.propertyType
			});
			this.set("reorderList", !0)
		}
		c && this.notifyUpdate(g);
		return d(g)
	},
	notifyUpdate: function (a) {
		this.set("updatedProperty", null);
		"admin" === Tawk.routeManager.get("currentState.name") &&
		("site" === a.propertyType && (a.isSite = !0), this.set("updatedProperty", a))
	},
	removeAgentAccess: function (a, c) {
		var d, b = this.getProperty(a.pgid);
		if (b) {
			if (a.aid === Tawk.userController.user.id) this.pages.removeObject(b), Tawk.shortcutsController.removeShortcutsForProperty(a.pgid), b.currentAgents.forEach(function (a) {
				Tawk.agentsController.removeAgent(a)
			}), b.set("toBeDeleted", !0); else {
				d = b.currentAgents.findProperty("aid", a.aid);
				if (!d) return;
				b.currentAgents.removeObject(d);
				Tawk.agentsController.removeAgent(a)
			}
			c &&
			(this.set("updatedData", {
				type: "agent",
				ids: a.aid,
				pgid: a.pgid,
				operation: "remove"
			}), this.notifyUpdate(b))
		}
	},
	removeProperty: function (a, c) {
		var d = this.getProperty(a);
		d && ("site" === d.propertyType ? this.sites.removeObject(d) : this.pages.removeObject(d), d.currentAgents.forEach(function (a) {
			Tawk.agentsController.removeAgent(a)
		}), Tawk.shortcutsController.removeShortcutsForProperty(a), Tawk.liveMonitoringController.removeProperty(a, d.propertyType), c && this.notifyUpdate(d))
	},
	updateDepartment: function (a, c) {
		var d, b = this.getProperty(a.pgid);
		!b || (!a.dptsver || b.departmentVersion >= a.dptsver) || (b.departments || (b.departments = {}), b.departments[a.did] = a, d = this.attachedDepartments.indexOf(a.did), a.a.contains(Tawk.userController.user.id) || -1 === d ? -1 === d && a.a.contains(Tawk.userController.user.id) && this.attachedDepartments.push(a.did) : this.attachedDepartments.splice(d, 1), b.set("departmentVersion", a.dptsver), c && (this.set("updatedData", {
			type: "department",
			ids: [a.did],
			operation: "update"
		}), this.notifyUpdate(b)))
	},
	removeDepartment: function (a, c) {
		var d =
			this, b = this.getProperty(a.pgid);
		!b || (!a.dptsver || b.departmentVersion >= a.dptsver) || (a.dids.forEach(function (a) {
			var c = d.attachedDepartments.indexOf(a);
			b.departments[a].dltd = !0;
			b.departments[a].en = !1;
			-1 !== c && d.attachedDepartments.splice(c, 1)
		}), b.set("departmentVersion", a.dptsver), c && (this.set("updatedData", {
			type: "department",
			ids: a.dids,
			operation: "remove"
		}), this.notifyUpdate(b)))
	},
	getDepartmentsByProperty: function (a) {
		return (a = this.getProperty(a)) ? a.departments : null
	},
	changePageStatus: function (a, c, d) {
		var b =
			this;
		socketConnector.changePageStatus(a, c, function (e, f) {
			var g;
			if (e) return d(!0);
			(g = b.getProperty(a)) && g.set("isStatusEnabled", c);
			Tawk.liveMonitoringController.changePageStatus(g, c, f);
			d()
		})
	},
	updatePropertyStatus: function (a, c) {
		var d = this.getProperty(a);
		d && (d.set("isStatusEnabled", c), Tawk.liveMonitoringController.changePageStatus(d, c))
	},
	disableProperty: function (a, c) {
		var d;
		c = c || function () {
		};
		d = this.getProperty(a);
		if (!d || !d.isAdmin) return c(!0);
		socketConnector.disableProperty(d.id, function (a) {
			if (a) return c(a);
			"profile" === d.type ? Tawk.intercomController.execute("trackEvent", {eventType: "disabled-profile-page"}) : "site" === d.pageType ? Tawk.intercomController.execute("trackEvent", {eventType: "disabled-site"}) : Tawk.intercomController.execute("trackEvent", {eventType: "disabled-page"});
			d.set("enabled", !1);
			return c()
		})
	},
	enableProperty: function (a, c) {
		var d;
		c = c || function () {
		};
		d = this.getProperty(a);
		if (!d || !d.isAdmin) return c(!0);
		socketConnector.enableProperty(d.id, function (a) {
			if (a) return c(a);
			"profile" === d.type ? Tawk.intercomController.execute("trackEvent",
				{eventType: "enabled-profile-page"}) : "site" === d.pageType ? Tawk.intercomController.execute("trackEvent", {eventType: "enabled-site"}) : Tawk.intercomController.execute("trackEvent", {eventType: "enabled-page"});
			d.set("enabled", !0);
			return c()
		})
	},
	getPropertyInformation: function (a, c) {
		var d = this.getProperty(a);
		c = c || function () {
		};
		if (!d) return c(!0);
		socketConnector.getPropertyDetails(d.id, function (a, d) {
			if (a) return c(a);
			c(null, d)
		})
	},
	propertyDisabled: function (a, c) {
		var d = this.getProperty(a);
		d && (d.set("enabled", !1),
		c && this.notifyUpdate(d), Tawk.liveMonitoringController.changePageStatus(d, !1))
	},
	propertyEnabled: function (a, c) {
		var d = this.getProperty(a);
		d && (d.set("enabled", !0), c && this.notifyUpdate(d), Tawk.liveMonitoringController.changePageStatus(d, !0))
	},
	addAgent: function (a, c) {
		var d = this.getProperty(a.pgid);
		d && (d.currentAgents.findProperty("aid", a.aid) || (d.currentAgents.pushObject({
			aid: a.aid,
			en: !0,
			pen: !0,
			rl: a.rl,
			ha: a.ha
		}), a.aid === Tawk.userController.user.id && (d.set("isAdmin", "admin" === a.rl), d.set("isStatusEnabled",
			!0)), Tawk.agentsController.addAgent(a)), c && (this.set("updatedData", {
			type: "agent",
			operation: "add",
			item: a
		}), this.notifyUpdate(d)))
	},
	updateAgentAccess: function (a, c) {
		var d = this, b = this.getProperty(a.pgid);
		if (b || a.en) {
			if (!b && a.en) return socketConnector.getPropertyInformation(a.pgid, function (b, f) {
				b || (f.pgid = a.pgid, f.rl = a.rl, d.addProperty(f, c))
			});
			a.aid === Tawk.userController.user.id && (a.en ? b.set("isAdmin", "admin" === a.rl) : (this.removeProperty(a.pgid), b.set("toBeDeleted", !0)));
			b.currentAgents.forEach(function (c,
			                                  d) {
				c.aid === a.aid && (b.set("currentAgents." + d + ".en", a.en), b.set("currentAgents." + d + ".rl", a.rl));
				Tawk.agentsController.addAgent(c)
			});
			c && this.notifyUpdate(b)
		}
	},
	getColorCode: function (a) {
		var c = this.getProperty(a);
		if (!c) return "";
		a = c.colorCode;
		if (!a) {
			for (a = generateLightColors(); -1 !== this.colorCodes.indexOf(a);) a = generateLightColors();
			c.set("colorCode", a);
			this.colorCodes.push(a)
		}
		return a || ""
	},
	updateWidgetData: function (a) {
		var c = this.getProperty(a.pgid);
		if (!c || c.widgetVersion >= a.wdgtv) return "";
		c.widgets.clear();
		a.wdgts && Object.keys(a.wdgts).length && (Object.keys(a.wdgts).forEach(function (d) {
			a.wdgts[d] ? c.widgets.pushObject({id: d, name: a.wdgts[d]}) : c.widgets.pushObject({id: d, name: d})
		}), Tawk.liveMonitoringController.updateWidgetsForProperty(c.id, c.propertyType, c.widgets))
	},
	getAlert: function (a, c) {
		var d = this.getProperty(a);
		c = c || function () {
		};
		if (!d) return c();
		d.alertVersion ? c(d.alertContent) : socketConnector.getAlert(d.id, function (a, e) {
			a || (d.set("alertContent", e.alert), d.set("alertVersion", e.alertV), c(d.alertContent))
		})
	},
	updateAlert: function (a) {
		var c = this.getProperty(a.propertyId);
		c && (!c.alertVersion || c.alertVersion < a.alertV) && (c.set("alertContent", a.alert), c.set("alertVersion", a.alertV), this.set("updateAlertInView", {
			propertyId: a.propertyId,
			alertContent: a.alert,
			alertVersion: a.alertv
		}), c.alertContent && Tawk.visitorChatController.notifyAlertInChat(c.id, c.alertContent))
	},
	isOnlyHiredAgent: function (a) {
		var c = !0;
		this.get("allProperties").every(function (d) {
			return d.currentAgents && 1 !== d.currentAgents.length ? (agent = d.currentAgents.findProperty("aid",
				a)) && !agent.ha ? c = !1 : !0 : !0
		});
		return c
	},
	isOnlyClientAgent: function (a) {
		var c = !0;
		this.get("allProperties").every(function (d) {
			var b;
			if (d.currentAgents) return (b = d.currentAgents.findProperty("aid", a)) && !d.isClientProperty ? c = !1 : !0
		});
		return c
	},
	isClientProperty: function (a) {
		return (a = this.sites.findProperty("id", a)) ? a.isClientProperty : !1
	},
	getHiredAgentsIds: function (a) {
		var c = [];
		a ? (a = this.sites.findProperty("id", a)) && (c = c.concat(a.currentAgents.filterProperty("ha", !0).filterProperty("en", !0).getEach("aid"))) : this.sites.forEach(function (a) {
			c =
				c.concat(a.currentAgents.filterProperty("ha", !0).filterProperty("en", !0).getEach("aid"))
		});
		return c.uniq()
	},
	loadHiredAgentContent: function (a, c) {
		var d = this.sites.findProperty("id", a);
		if (!d) return c(null);
		if (d.hiredContent) return c(d.hiredContent);
		socketConnector.getHiredAgentContent(a, function (a, e) {
			if (a) return c(null);
			e.hiredAgent.objectives && e.hiredAgent.objectives.forEach(function (a) {
				"predefined" === a.type && (a.content = languageParser.translate("admin", a.content))
			});
			d.set("hiredContent", Ember.Object.create(e.hiredAgent));
			d.set("hiredContentV", e.hiredAgentv);
			c(d.hiredContent)
		})
	},
	updateHiredAgentContent: function (a) {
		var c = this.sites.findProperty("id", a.propertyId);
		!c || (!c.hiredContentV || c.hiredContentV >= a.hiredAgentv) || socketConnector.getHiredAgentContent(a.propertyId, function (a, b) {
			a || (b.hiredAgent.objectives && b.hiredAgent.objectives.forEach(function (a) {
				"predefined" === a.type && (a.content = languageParser.translate("admin", a.content))
			}), c.set("hiredContent", Ember.Object.create(b.hiredAgent)), c.set("hiredContentV", b.hiredAgentv))
		})
	},
	addonSettingsUpdate: function (a) {
		var c = this.sites.findProperty("id", a.propertyId);
		c && ("webrtc" === a.addonId ? (c.set("webrtcEnabled", !!a.settings.enabled), c.set("webrtcVideoEnabled", !!a.settings.video), c.set("webrtcScreenEnabled", !!a.settings.screen)) : "live-answering" === a.addonId && Tawk.laScheduler.updateSchedule(a))
	},
	addonActivated: function (a) {
		var c = this.sites.findProperty("id", a.propertyId);
		c && "webrtc" === a.addonId && (0 < moment(a.expiry || 0).diff(moment()) ? c.set("webrtcActivated", !0) : c.set("webrtcActivated",
			!1), socketConnector.getAddOnDetail(a.propertyId, a.addonId, function (a, b) {
			a || (c.set("webrtcEnabled", !!b.settings.enabled), c.set("webrtcVideoEnabled", !!b.settings.video), c.set("webrtcScreenEnabled", !!b.settings.screen))
		}))
	},
	isWebRTCActivated: function (a) {
		var c = !1;
		a === this.personalPage.id ? c = !!this.personalPage.webrtcActivated : (a = this.sites.findProperty("id", a), c = !!a.webrtcActivated);
		return c
	},
	isWebRTCEnabled: function (a) {
		var c = !1;
		a === this.personalPage.id ? c = !!this.personalPage.webrtcEnabled : (a = this.sites.findProperty("id",
			a), c = !!a.webrtcEnabled);
		return c
	},
	getAllMembers: function () {
		var a = [];
		this.get("allProperties").forEach(function (c) {
			c.enabled && !c.personalPage && c.currentAgents.forEach(function (d) {
				if (d.en && d.aid !== Tawk.userController.user.id) {
					var b = a.findProperty("id", d.aid);
					b && -1 === b.properties.indexOf(c.id) ? b.properties.pushObject(c.id) : b || (b = Tawk.agentsController.getAgent(d.aid)) && a.pushObject(Ember.Object.create({
						id: d.aid,
						name: b.name,
						selected: !1,
						properties: [c.id],
						status: b.get("status"),
						isOwn: !1
					}))
				}
			})
		});
		return a
	},
	getShopifySettings: function (a, c) {
		var d = this.sites.findProperty("id", a);
		if (!d) return c(!0);
		d.shopifySettings ? c(null, d.shopifySettings) : socketConnector.getShopifyConfig(a, function (a, e) {
			if (a) return c(a);
			e && e.data && d.set("shopifySettings", {
				customerSettings: e.data.config.customer,
				orderSettings: e.data.config.order,
				configVersion: e.data.version
			});
			c(null, d.shopifySettings)
		})
	},
	updateIntegrationConfig: function (a) {
		var c = this.sites.findProperty("id", a.propertyId);
		c && ("shopify" !== a.integrationId || c.shopifySettings &&
			c.shopifySettings.configVersion >= a.version || c.set("shopifySettings", {
				customerSettings: a.config.customer,
				orderSettings: a.config.order,
				configVersion: a.version
			}))
	},
	saveShopifyConfig: function (a, c, d) {
		var b = this, e = this.sites.findProperty("id", a);
		if (!e || !e.isAdmin) return d(!0);
		socketConnector.saveShopifyConfig(a, c, function (e, g) {
			if (e) return d(e);
			b.updateIntegrationConfig({propertyId: a, version: g.data.version, config: c});
			d(null, g.data.version)
		})
	}
});
Tawk.webProperties = Tawk.WebProperties.create();
Tawk.AgentsController =
	Ember.Controller.extend({
		agentsList: {},
		initAgentsTimeout: null,
		agentDropDownList: [],
		agents: [],
		groups: [],
		userAgent: null,
		initAgents: function () {
			var a = this;
			clearTimeout(this.initAgentsTimeout);
			this.set("initAgentsTimeout", setTimeout(function () {
				socketConnector.getAgents(function (c, d) {
					c ? a.initAgents() : a.loadAgents(d)
				})
			}, 0))
		},
		loadAgents: function (a) {
			this.set("agentsList", {});
			this.set("agentDropDownList", []);
			this.set("agentsPending", a);
			Tawk.webProperties.processed && this.processAgents()
		},
		processAgents: function () {
			var a,
				c = Tawk.userController.user.id, d = this, b = [];
			this.agentsPending && (this.set("agentsProcessed", !1), a = this.agentsPending, this.set("agentsPending", null), a.forEach(function (a) {
				var f = {}, g, h, k = Tawk.webProperties.isAgentActive(a._id);
				a._id !== c && (g = Tawk.webProperties.isOnlyHiredAgent(a._id), h = Tawk.webProperties.isOnlyClientAgent(a._id));
				d.agentDropDownList.pushObject(Ember.Object.create({
					id: a._id,
					name: a.n,
					isActive: k,
					isHiredOnly: g
				}));
				a.isHiredOnly = g;
				k && c !== a._id ? b.pushObject(Tawk.AgentModel.create({
					id: a._id,
					name: a.n,
					tawkId: a.twid,
					sessions: a.sessions ? a.sessions : null,
					lastKnown: a.lk,
					aliasImage: a.ai ? GLOBAL_AWS_PI_URL + "/" + a.ai : null,
					isOwn: !1,
					isHiredOnly: g,
					isClientOnly: h
				})) : c === a._id && d.set("userAgent", Tawk.AgentModel.create({
					id: a._id,
					name: a.n,
					tawkId: a.twid,
					sessions: a.sessions ? a.sessions : null,
					lastKnown: a.lk,
					aliasImage: a.ai ? GLOBAL_AWS_PI_URL + "/" + a.ai : null,
					isOwn: !0
				}));
				a.sessions && a.sessions.forEach(function (a) {
					f[a.rsc] = a
				});
				a._id === c && a.sessions.length && (g = f[Tawk.userController.user.resourceId], window.userLogData = {
					agentId: a._id,
					name: a.n, resourceId: g.rsc, ip: g.ip, city: g.cy, countryCode: g.cc, os: g.os, browser: g.bw
				});
				d.agentsList[a._id] = a;
				d.agentsList[a._id].sessions = f
			}), this.set("agents", sortList(b, "name")), this.set("agentsProcessed", !0))
		},
		processGroups: function () {
			var a = [], c = this;
			socketConnector.getChatGroups(function (d, b) {
				b.forEach(function (b) {
					var d, g = [], h = [];
					"agent" !== b.t && ((d = c.groups.findProperty("groupId", b._id)) || (d = Tawk.AgentGroupModel.create()), d.set("groupId", b._id), g.pushObject(Tawk.agentsController.userAgent), 1 !== b.p.length &&
					(b.p.forEach(function (a) {
						var b;
						a !== Tawk.userController.user.id && ((b = Tawk.agentsController.getAgent(a)) ? g.pushObject(b) : h.push(a))
					}), h.length ? socketConnector.getAgentNames(h, function (a, b) {
						a || (b.forEach(function (a) {
							g.pushObject(Ember.Object.create({id: a._id, name: a.n, status: "invisible"}))
						}), d.set("participants", sortList(g, "name")))
					}) : d.set("participants", sortList(g, "name")), a.pushObject(d)))
				});
				c.set("groups", a)
			})
		},
		getName: function (a) {
			return a === Tawk.userController.user.id ? Tawk.userController.user.fullName :
				(a = this.agentDropDownList.findProperty("id", a)) ? a.isHiredOnly && !Tawk.userController.user.isHiredAgent ? "Hired Agent" : a.name : ""
		},
		getAgentsName: function (a) {
			var c = [], d = this;
			a && (Array.isArray(a) || (a = [a]), a.forEach(function (a, e) {
				var f = d.getName(a);
				f && c.push(f)
			}));
			return c
		},
		getAgentNameForMessage: function (a) {
			var c, d, b;
			c = "";
			if (a.uid === Tawk.userController.user.id) return decodeStr(a.md && a.md.ao ? a.n : a.n + " (" + languageParser.translate("generic", "me") + ")");
			c = this.agentsList[a.uid];
			(d = Tawk.liveMonitoringController.getSubscribedVisitor(a.vsk)) &&
			(b = d.agentPrensence ? d.agentPrensence[a.uid + a.md.rsc] : null);
			c = c.isHiredOnly ? a.md.ao ? b ? b.displayName : "Hired Agent" : a.n || (b ? b.displayName : "Hired Agent") : a.n ? a.n + (a.md.ao ? "" : " (" + c.n + ")") : c.n;
			return decodeStr(c)
		},
		getAgent: function (a) {
			return this.agents.findProperty("id", a)
		},
		sessionStart: function (a) {
			var c = this.agents.findProperty("id", a.aid);
			this.agentsList[a.aid] && c && (this.agentsList[a.aid].sessions || (this.agentsList[a.aid].sessions = {}), this.agentsList[a.aid].sessions[a.rsc] = a, c.sessions || c.set("sessions",
				[]), c.sessions.findProperty("rsc", a.rsc) || (c.sessions.pushObject(a), c.id === Tawk.userController.user.id && (window.userLogData = {
				agentId: c.id,
				name: c.name,
				resourceId: a.rsc,
				ip: a.ip,
				city: a.cy,
				countryCode: a.cc,
				os: a.os,
				browser: a.bw
			})))
		},
		sessionEnd: function (a) {
			var c, d = this.agents.findProperty("id", a.aid);
			this.agentsList[a.aid] && (this.agentsList[a.aid].sessions && d && d.sessions) && ((c = d.sessions.findProperty("rsc", a.rsc)) && d.sessions.removeObject(c), d.sessions.length || d.set("sessions", null), delete this.agentsList[a.aid].sessions[a.rsc])
		},
		removeAgent: function (a) {
			var c = this.agents.findProperty("id", a.aid);
			c && !Tawk.webProperties.isAgentActive(a.aid) && (delete this.agentsList[a.aid].twid, this.agents.removeObject(c), Tawk.liveMonitoringController.removeAgent(a.aid))
		},
		updateAgentName: function (a) {
			var c = this.agentDropDownList.findProperty("id", a.aid);
			(agent = this.getAgent(a.aid)) && agent.set("name", a.n);
			this.agentsList[a.aid] && (this.agentsList[a.aid].n = a.n);
			c && c.set("name", a.n);
			Tawk.liveMonitoringController.updateAgentName(a.aid, a.n)
		},
		addAgent: function (a) {
			var c =
				this;
			this.agentsList[a.aid] && this.agentsList[a.aid].twid ? this.updateAgentList(a) : socketConnector.getAgentsInformations([a.aid], function (d, b) {
				var e = {};
				!d && b.length && (b = b[0], b.aid = a.aid, b.isHiredOnly = Tawk.webProperties.isOnlyHiredAgent(b.aid), b.isClientOnly = Tawk.webProperties.isOnlyClientAgent(b.aid), b.sessions && b.sessions.forEach(function (a) {
					e[a.rsc] = a
				}), c.updateAgentList(b), c.agentsList[b.aid] = b, c.agentsList[b.aid].sessions = e)
			})
		},
		updateAgentList: function (a) {
			var c = this.getAgent(a.aid), d = Tawk.webProperties.isOnlyHiredAgent(a.aid),
				b = Tawk.webProperties.isOnlyClientAgent(a.aid);
			a.aid !== Tawk.userController.user.id && (c && !Tawk.webProperties.isAgentActive(a.aid) ? (delete this.agentsList[a.aid].twid, this.agents.removeObject(c), Tawk.liveMonitoringController.removeAgent(a.aid)) : c ? c.setProperties({
				isHiredOnly: d,
				isClientOnly: b
			}) : (c = Tawk.AgentModel.create({
				id: a.aid,
				name: a.n,
				tawkId: a.twid,
				sessions: a.sessions ? a.sessions : null,
				lastKnown: a.lk,
				isHiredOnly: d,
				isClientOnly: b
			}), this.agents.pushObject(c), this.agentDropDownList.pushObject(Ember.Object.create({
				id: a.aid,
				name: a.n, isActive: Tawk.webProperties.isAgentActive(a.aid), isHiredOnly: d
			})), Tawk.liveMonitoringController.addAgent(c)))
		},
		updateAgentStatus: function (a) {
			var c = this.getAgent(a.aid);
			this.agentsList[a.aid] && (this.agentsList[a.aid].sessions && c && c.sessions) && ((session = c.sessions.findProperty("rsc", a.rsc)) && c.set("sessions." + c.sessions.indexOf(session) + ".st", a.st), this.agentsList[a.aid].sessions[a.rsc] || (this.agentsList[a.aid].sessions[a.rsc].st = a.st))
		},
		nonHiredAgents: function () {
			return this.agents.filterProperty("isHiredOnly",
				!1).filterProperty("isClientOnly", !1)
		}.property("agents.@each.isHiredOnly")
	});
Tawk.agentsController = Tawk.AgentsController.create();
var statusOptions = {online: "o", away: "a", invisible: "i"};
Tawk.UserController = Ember.Controller.extend({
	sessionKey: null,
	socketServer: null,
	user: Ember.Object.create({
		id: null,
		fullName: null,
		firstName: null,
		lastName: null,
		email: null,
		role: null,
		resourceId: null,
		status: null
	}),
	alias: [],
	localeCode: null,
	defaultAlias: null,
	soundSettings: Ember.Object.create({
		icr: {name: null, volume: 0, loop: 0},
		im: {name: null, volume: 0},
		iv: {name: null, volume: 0},
		dc: {name: null, volume: 0},
		acm: {name: null, volume: 0}
	}),
	desktopNotificationEnabled: !1,
	soundNotificationEnabled: !1,
	visitorDetailsHoverEnabled: !1,
	sidebarChatListAll: !0,
	sidebarIncomingRequests: !0,
	groupIncomingRequests: !1,
	existingSessions: Ember.Object.create({list: [], status: "EMPTY"}),
	isNotificationOptionHidden: !1,
	existingCards: [],
	isAddOnSeen: !1,
	newAddonSeen: !1,
	initialize: function (a) {
		var c, d = [], b = {};
		this.user.setProperties({
			id: a.aid, fullName: a.n, firstName: a.fn,
			lastName: a.ln, email: a.e, role: a.rl, resourceId: a.rsc, status: a.st
		});
		desktopConnector.send("agentStatusChanged", a.st);
		this.user.reopen({
			decodedName: function () {
				return this.fullName ? decodeStr(this.fullName) : null
			}.property("fullName")
		});
		a.sg && (this.set("localeCode", a.sg.lc), Object.keys(a.sg.sd).forEach(function (c) {
			b[c] = {name: a.sg.sd[c].n, volume: a.sg.sd[c].vl, loop: a.sg.sd[c].loop};
			11 === a.sg.sd[c].loop && (a.sg.sd[c].loop = "infinity");
			notificationController.audioPlayer.add(c, a.sg.sd[c])
		}), b.acm || (b.acm = {
			name: "sound8",
			volume: 100
		}, notificationController.audioPlayer.add("acm", {
			n: "sound8",
			vl: 100
		})), a.sg.cwc && Tawk.chatController.setTotalColumns(a.sg.cwc), this.soundSettings.setProperties(b), a.sg.ac && (a.sg.ac.agentView && Tawk.agentChatController.set("inlineDirectMessage", "max" === a.sg.ac.agentView), a.sg.ac.groupView && Tawk.agentChatController.set("inlineGroupChat", "max" === a.sg.ac.groupView)), this.set("canCreateApiKey", !(!a.sg.flg || !a.sg.flg.api)));
		notificationController.audioPlayer.add("webrtc-call", {
			n: "webrtc-call", vl: 100,
			loop: "infinity"
		});
		a.als.forEach(function (b) {
			var f = Tawk.CopyableModel.create({
				aliasId: b.alsid,
				displayName: b.dn,
				aliasImage: b.ai,
				enabled: b.en,
				positionTitle: b.pst,
				isDefault: !1
			});
			d.push(f);
			b.alsid === a.dals && (f.set("isDefault", !0), c = f)
		});
		this.set("aliases", d);
		this.set("defaultAlias", c);
		main.extractStorageSettings();
		this.set("desktopNotificationEnabled", "on" === main.storageSettings.notification || !main.storageSettings && desktopConnector.enabled());
		this.set("soundNotificationEnabled", "off" !== main.storageSettings.sound);
		this.set("visitorDetailsHoverEnabled", "off" !== main.storageSettings.leftSideBarHover);
		this.set("sidebarChatListAll", "off" !== main.storageSettings.chatlistAll);
		this.set("sidebarIncomingRequests", "off" !== main.storageSettings.incomingRequests);
		this.set("isAddOnSeen", this.isNewFeatureSeen("add-on"));
		this.set("groupIncomingRequests", main.storageSettings.groupIncomingRequests && "off" !== main.storageSettings.groupIncomingRequests);
		this.set("newAddonSeen", !!main.storageSettings.newAddonSeen);
		this.set("webrtcAddonSeen",
			!!main.storageSettings.webrtcAddonSeen);
		this.set("bannerClosed", !!main.storageSettings.bannerClosed);
		this.soundNotificationEnabled ? notificationController.audioPlayer.turnOnSound() : notificationController.audioPlayer.turnOffSound();
		notificationController.hasDesktopNotificationFeature() && !notificationController.checkNotificationPermission() && notificationController.enableDesktopNotification()
	},
	setSocketServer: function (a) {
		this.set("socketServer", a)
	},
	setSessionKey: function (a) {
		this.set("sessionKey", a)
	},
	changeStatus: function (a, c) {
		var d = this;
		statusOptions[a] && (a = statusOptions[a]);
		return a === this.user.status ? c() : socketConnector.changeStatus(a, function (b) {
			if (b) return c(!0);
			desktopConnector.send("agentStatusChanged", a);
			d.user.set("status", a);
			c()
		})
	},
	toggleDesktopNotificationFinalStep: function (a) {
		this.set("desktopNotificationEnabled", a);
		a ? notificationController.enableDesktopNotification() : notificationController.disableDesktopNotification()
	},
	toggleDesktopNotification: function (a, c) {
		var d = this, b = function (a) {
			c.checked =
				a;
			d.toggleDesktopNotificationFinalStep(a)
		};
		a && notificationController.checkNotificationPermissionIsDefault() ? notificationController.enableDesktopNotification(b) : a && !notificationController.checkNotificationPermission() ? (checkAndSetAlertBoxView(languageParser.translate("action_messages", "attention"), languageParser.translate("action_messages", "notification_desktop_warning")), c.checked = !1) : (this.toggleDesktopNotificationFinalStep(a), c.checked = a)
	},
	toggleSidebarChatlist: function (a) {
		this.set("sidebarChatListAll",
			a);
		a ? main.updateStorageSettings("chatlistAll", "on") : main.updateStorageSettings("chatlistAll", "off")
	},
	toggleGroupIncomingList: function (a) {
		this.set("groupIncomingRequests", a);
		a ? main.updateStorageSettings("groupIncomingRequests", "on") : main.updateStorageSettings("groupIncomingRequests", "off")
	},
	toggleVisitorDetailsHover: function (a) {
		this.set("visitorDetailsHoverEnabled", a);
		a ? main.updateStorageSettings("leftSideBarHover", "on") : main.updateStorageSettings("leftSideBarHover", "off")
	},
	isNewFeatureSeen: function (a) {
		return !(!main.storageSettings.newFeatureSeen ||
			-1 === main.storageSettings.newFeatureSeen.indexOf(a))
	},
	setNewFeatureSeen: function (a) {
		var c = main.storageSettings.newFeatureSeen || [];
		-1 === c.indexOf(a) && (c.push(a), main.updateStorageSettings("newFeatureSeen", c), "add-on" === a && (this.set("isAddOnSeen", !0), this.setNewAddonSeen()))
	},
	closeBanner: function (a) {
		this.set("bannerClosed", a);
		main.updateStorageSettings("bannerClosed", a)
	},
	setNewAddonSeen: function () {
		main.updateStorageSettings("newAddonSeen", !0);
		this.set("newAddonSeen", !0)
	},
	toggleSoundNotification: function (a) {
		this.set("soundNotificationEnabled",
			a);
		a ? (notificationController.audioPlayer.turnOnSound(), main.updateStorageSettings("sound", "on"), Tawk.intercomController.execute("trackEvent", {eventType: "turned-on-sound-"})) : (notificationController.audioPlayer.turnOffSound(), main.updateStorageSettings("sound", "off"), Tawk.intercomController.execute("trackEvent", {eventType: "turned-off-sound"}))
	},
	saveSoundSettings: function (a, c, d) {
		var b = this, e = {
			ivn: a.iv.name,
			ivvl: parseInt(a.iv.volume, 10),
			icrn: a.icr.name,
			icrvl: parseInt(a.icr.volume, 10),
			icrloop: parseInt(a.icr.loop,
				10),
			imn: a.im.name,
			imvl: parseInt(a.im.volume, 10),
			dcn: a.dc.name,
			dcvl: parseInt(a.dc.volume, 10),
			acmn: a.acm.name,
			acmvl: parseInt(a.acm.volume, 10)
		};
		socketConnector.saveSoundSettings(e, function (a) {
			a || (b.updateSoundSettings(e, c), Tawk.intercomController.execute("trackEvent", {eventType: "updated-sound-settings"}));
			d(a)
		})
	},
	updateSoundSettings: function (a, c) {
		var d = this, b = {};
		["iv", "icr", "im", "dc", "acm"].forEach(function (c) {
			b[c] = {name: a[c + "n"], volume: a[c + "vl"], loop: a[c + "loop"]};
			"none" === b[c].name ? notificationController.audioPlayer.remove(c) :
				(d.soundSettings.setProperties(b), notificationController.audioPlayer.update(c, {
					n: b[c].name,
					vl: b[c].volume,
					loop: 11 === b[c].loop ? "infinity" : b[c].loop
				}))
		});
		a.origin || d.soundNotificationEnabled === c || this.toggleSoundNotification(c)
	},
	userTawkId: function () {
		return Tawk.webProperties.personalPage.tawkId
	}.property("Tawk.webProperties.personalPage.tawkId"),
	saveUserSettings: function (a, c) {
		var d = this;
		a.pageId = Tawk.webProperties.personalPage.id;
		a.password && (a.password = decodeStr(a.password));
		a.tawkId !== this.get("tawkId") ?
			a.tawkId = decodeStr(a.tawkId) : a.tawkId = null;
		a.email = a.email !== this.user.email ? decodeStr(a.email) : null;
		socketConnector.saveProfileSettings(a, function (b) {
			if (b) return c(b);
			Tawk.intercomController.execute("trackEvent", {eventType: "edit-profile"});
			d.user.set("fullName", encodeStr(a.name));
			a.email && d.user.set("email", a.email);
			Tawk.webProperties.updatePropertyData({pgid: a.pageId, pgn: encodeStr(a.name), twid: a.tawkId});
			Tawk.agentsController.updateAgentName({aid: d.user.id, n: encodeStr(a.name)});
			c()
		})
	},
	loadBrowserAppSessions: function () {
		var a =
			this;
		this.set("existingSessions.status", "LOADING");
		socketConnector.getBrowserAppSessions(function (c, d) {
			var b = [];
			if (c) return a.set("existingSessions.status", "ERROR");
			d.forEach(function (a) {
				var c = {id: a._id, ip: a.ip, country: a.cc, removing: !1, errorRemoving: !1};
				a.cc && (c.countryFlag = "flag flag-" + a.cc.toLowerCase());
				a.bw && (c.browser = a.bw + "-browser sprite-background");
				a.os && (c.operatingSystem = a.os + "-os sprite-background");
				b.pushObject(Ember.Object.create(c))
			});
			a.set("existingSessions.list", b);
			a.set("existingSessions.status",
				"LOADED")
		})
	},
	clearBrowserAppSessions: function () {
		this.set("existingSessions.list", []);
		this.set("existingSessions.status", "EMPTY")
	},
	signOutSession: function (a) {
		var c = this, d = c.existingSessions.list.findProperty("id", a);
		d && (d.set("removing", !0), d.set("errorRemoving", !1));
		socketConnector.signOutOtherSession(a, function (b) {
			var d = c.existingSessions.list.findProperty("id", a);
			b ? d && (d.set("removing", !1), d.set("errorRemoving", !0)) : (d && c.existingSessions.list.removeObject(d), Tawk.intercomController.execute("trackEvent",
				{eventType: "ended-existing-sessions"}))
		})
	},
	deleteAliases: function (a) {
		var c = this;
		a.alsids.forEach(function (a) {
			(a = c.aliases.findProperty("aliasId", a)) && c.aliases.removeObject(a)
		});
		Tawk.visitorChatController.deleteAliases(a)
	},
	updateAlias: function (a) {
		var c = this.aliases.findProperty("aliasId", a.alsid);
		c ? (c.set("displayName", a.dn), a.ai && c.set("aliasImage", a.ai), c.set("enabled", a.en), c.set("positionTitle", a.pst)) : (c = Tawk.CopyableModel.create({
			aliasId: a.alsid, displayName: a.dn, aliasImage: a.ai, enabled: a.en,
			positionTitle: a.pst
		}), this.aliases.pushObject(c));
		a.dals && (this.aliases.setEach("isDefault", !1), c.set("isDefault", !0), this.set("defaultAlias", c));
		Tawk.visitorChatController.updateAlias(c)
	},
	updateUserData: function (a) {
		a.pgid = Tawk.webProperties.personalPage.id;
		a.n && (this.user.set("fullName", a.n), Tawk.agentsController.updateAgentName({aid: this.user.id, n: a.n}));
		a.e && this.user.set("email", a.e);
		Tawk.webProperties.updatePropertyData(a, !0);
		a.lc && (getLocaleCookie() && getLocaleCookie() !== a.lc) && (setLocaleCookie(a.lc),
			window.location = "/")
	},
	changeLanguage: function (a, c) {
		socketConnector.saveProfileSettings({locale: a}, function (d) {
			if (d) return c(d);
			Tawk.intercomController.execute("trackEvent", {eventType: "changed-language", metaData: {language: a}});
			c()
		})
	},
	saveLastSubView: function () {
	},
	closeView: function () {
		return !0
	},
	getExistingCCCards: function (a, c) {
		var d = this, b = [];
		c = c || function () {
		};
		if (this.existingCards.length && !a) return c();
		this.existingCards.clear();
		socketConnector.getExistingCard(function (a, f) {
			if (a) return c();
			f.forEach(function (a,
			                    c) {
				0 === c && (a.selected = !0);
				a.cardBrand = a.cardBrand.capitalize().replace("-", " ");
				a.pretifyNumber = "x-" + a.cardNumber;
				b.push(a)
			});
			d.existingCards.pushObjects(b);
			c()
		})
	}
});
Tawk.userController = Tawk.UserController.create();
Tawk.DashboardController = Ember.Controller.extend({
	analytics: null, history: null, feeds: null, init: function () {
		this.set("analytics", Tawk.DashboardAnalyticsController.create());
		this.set("history", Tawk.conversationsController);
		this.set("feeds", Tawk.DashboardFeedsController.create())
	}
});
Tawk.DashboardAnalyticsController =
	Ember.Controller.extend({
		realtime: Ember.Object.create({
			status: "EMPTY",
			visitsCount: {total: 0, maxEntry: 200, graphData: [], graphListener: null, fillerTimeout: null}
		}), recent: Ember.Object.create({
			status: "EMPTY",
			today: {
				summary: {
					chats: 0,
					missedChats: 0,
					positiveSentiment: 0,
					visitors: 0,
					returnVisitors: 0,
					visits: 0,
					onlineTime: 0,
					availabilityTime: 0
				}
			},
			series: {
				visitors: {
					values: [0, 0, 0, 0, 0, 0, 0],
					summary: {current: 0, growth: 0, highest: 0, lowest: 0, sum: 0, average: 0, l24h: 0}
				},
				visits: {
					values: [0, 0, 0, 0, 0, 0, 0], summary: {
						current: 0, growth: 0,
						highest: 0, lowest: 0, sum: 0, average: 0, l24h: 0
					}
				},
				pageViews: {
					values: [0, 0, 0, 0, 0, 0, 0],
					summary: {current: 0, growth: 0, highest: 0, lowest: 0, sum: 0, average: 0, l24h: 0}
				},
				chats: {
					values: [0, 0, 0, 0, 0, 0, 0],
					summary: {current: 0, growth: 0, highest: 0, lowest: 0, sum: 0, average: 0, l24h: 0}
				}
			}
		}), historical: Ember.Object.create({from: null, to: null, status: "EMPTY", data: []}), init: function () {
			var a = new Date, a = new Date(a.getFullYear(), a.getMonth(), a.getDate() - 1),
				c = new Date(a.getFullYear(), a.getMonth(), a.getDate() - 6);
			this.set("historical.from", c);
			this.set("historical.to", a)
		}, loadVisitorCount: function () {
			var a = this;
			this.set("realtime.status", "LOADING");
			this.set("realtime.visitsCount.graphListener", function (c) {
				isNaN(parseInt(c.t, 10)) || (a.set("realtime.visitsCount.total", c.t), a.set("realtime.status", "LOADED"), a.generateGraphData())
			});
			this.realtime.visitsCount.graphListener({t: Tawk.liveMonitoringController.totalVisitorsCount});
			socketConnector.socket.on("tvc", this.realtime.visitsCount.graphListener)
		}, unSubscribeVisitorCount: function () {
			this.stopVisitorCountFiller();
			"function" === typeof this.realtime.visitsCount.graphListener && socketConnector.socket.removeListener("tvc", this.realtime.visitsCount.graphListener);
			this.set("realtime.visitsCount.graphListener", null)
		}, generateGraphData: function () {
			this.stopVisitorCountFiller();
			0 < this.realtime.visitsCount.graphData.length && this.realtime.visitsCount.graphData.length > this.realtime.visitsCount.maxEntry && this.realtime.visitsCount.graphData.removeAt(0);
			if (0 === this.realtime.visitsCount.graphData.length) for (var a = 0; a < this.realtime.visitsCount.maxEntry; a++) this.realtime.visitsCount.graphData.pushObject(this.realtime.visitsCount.total);
			else this.realtime.visitsCount.graphData.pushObject(this.realtime.visitsCount.total);
			this.startVisitorCountFiller()
		}, startVisitorCountFiller: function () {
			this.set("realtime.visitsCount.fillerTimeout", setTimeout(this.generateGraphData.bind(this), 1E3))
		}, stopVisitorCountFiller: function () {
			clearTimeout(this.realtime.visitsCount.fillerTimeout);
			this.set("realtime.visitsCount.fillerTimeout", null)
		}, loadRecentAnalytics: function () {
			var a = this, c = new Date, d = new Date(c.getFullYear(), c.getMonth(), c.getDate() - 6), c =
				new Date(c.getFullYear(), c.getMonth(), c.getDate(), 24);
			this.set("recent.status", "LOADING");
			socketConnector.getHourlyStats({
				from: d.getTime(),
				to: c.getTime(),
				count: 168,
				merge: !0
			}, function (b, c) {
				if (b) return a.set("recent.status", "ERROR");
				var d = 0, g = 0, h = 0, k = 0, l = [0, 0, 0, 0, 0, 0, 0], m = [0, 0, 0, 0, 0, 0, 0],
					n = [0, 0, 0, 0, 0, 0, 0], p = [0, 0, 0, 0, 0, 0, 0], q = [0, 0, 0, 0, 0, 0, 0],
					r = [0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0, 0, 0, 0], u = [0, 0, 0, 0, 0, 0, 0],
					v = [0, 0, 0, 0, 0, 0, 0], w = 0, t = 0, y = new Date,
					z = new Date(y.getFullYear(), y.getMonth(), y.getDate(), y.getHours(), 59, 59,
						999), A = new Date(y.getFullYear(), y.getMonth(), y.getDate(), y.getHours() - 24, 0, 0, 0);
				c.forEach(function (a) {
					var b = new Date(a.tm);
					l[t] += a.cs + a.msc;
					m[t] += a.msc;
					n[t] += (a.rts + a.rtc) / 2;
					p[t] += a.uv;
					q[t] += a.rv;
					r[t] += a.v;
					s[t] += a.onlt;
					u[t] += a.onlt + a.awt + a.oflt;
					v[t] += a.pv;
					b > A && b < z && (d += a.uv, g += a.v, h += a.pv, k += a.cs + a.msc);
					w++;
					24 === w && (w = 0, t++)
				});
				a.recent.set("today.summary", Ember.Object.create({
					chats: l[6],
					missedChats: m[6],
					positiveSentiment: n[6],
					visitors: p[6],
					returnVisitors: q[6],
					visits: r[6],
					onlineTime: s[6],
					availabilityTime: u[6]
				}));
				a.recent.set("series.visitors.values", p);
				a.recent.set("series.visitors.summary", Ember.Object.create(a.summarize(p, d)));
				a.recent.set("series.visits.values", r);
				a.recent.set("series.visits.summary", Ember.Object.create(a.summarize(r, g)));
				a.recent.set("series.pageViews.values", v);
				a.recent.set("series.pageViews.summary", Ember.Object.create(a.summarize(v, h)));
				a.recent.set("series.chats.values", l);
				a.recent.set("series.chats.summary", Ember.Object.create(a.summarize(l, k)));
				a.set("recent.status", "LOADED")
			})
		},
		summarize: function (a, c) {
			var d = a[6], b = 0, e = 0, f = 0, g = Number.NEGATIVE_INFINITY, h = Number.POSITIVE_INFINITY;
			a.forEach(function (a, c) {
				a > g && (g = a);
				a < h && (h = a);
				b += a
			});
			b -= c;
			e = b / 6;
			f = 0 === e && 0 === c ? 0 : 0 === e ? 100 : Math.round(100 * ((c - e) / e));
			return {
				current: d,
				growth: f,
				highest: g === Number.NEGATIVE_INFINITY ? 0 : g,
				lowest: h === Number.POSITIVE_INFINITY ? 0 : h,
				sum: b,
				average: e,
				l24h: c
			}
		}, loadHistorialData: function (a, c) {
			var d, b, e = this;
			a && this.set("historical.from", a);
			c && this.set("historical.to", c);
			this.set("historical.status", "LOADING");
			d = Date.UTC(this.historical.from.getFullYear(), this.historical.from.getMonth(), this.historical.from.getDate());
			b = Date.UTC(this.historical.to.getFullYear(), this.historical.to.getMonth(), this.historical.to.getDate());
			socketConnector.getDailyStats({from: d, to: b, count: 365, merge: !0}, function (a, b) {
				var c = [], d = [], l = [], m = [], n = [], p = [];
				if (a) return e.set("historical.status", "ERROR");
				b.forEach(function (a, b) {
					-1 === c.indexOf(a.tm) && (c.push(a.tm), d[b] = 0, l[b] = 0, m[b] = 0, n[b] = 0);
					d[b] += a.cs + a.msc;
					l[b] += a.pv;
					m[b] += a.v;
					n[b] +=
						a.uv
				});
				for (var q = 0, r = c.length; q < r; q++) p.push([new Date(c[q]), d[q], l[q], m[q], n[q]]);
				e.set("historical.data", p);
				e.set("historical.status", "LOADED")
			})
		}
	});
Tawk.DashboardFeedsController = Ember.Controller.extend({
	feedsList: [], errorOnLoad: !1, loadFeeds: function () {
		var a = this;
		this.set("feedsList", []);
		a.set("errorOnLoad", !1);
		$.ajax({
			url: "https://proxy.tawk.to/feed", dataType: "json", success: function (c) {
				c ? c.forEach(function (c) {
					a.feedsList.pushObject({title: c.title[0], link: c.link[0]})
				}) : a.set("errorOnLoad", !0)
			}
		})
	},
	clearList: function () {
		this.feedsList.clear()
	}
});
Tawk.HistoryInterface = Ember.Mixin.create({
	getCopyFormat: function (a) {
		var c;
		a && (c = conversationProcess.convertTransciptToCopyFormat(a.c, a.n, a.startedOn), a.set("copyFormat", c))
	}, printTranscript: function (a) {
		a && (a = conversationProcess.convertTransciptToPrintFormat(a.c, a.n, a.startedOn), Tawk.intercomController.execute("trackEvent", {eventType: "printed-chat-history"}), printChatTranscript(a))
	}, emailTranscript: function (a, c, d) {
		var b = null;
		c && (c.isAgentChat && (b = moment().zone()),
			socketConnector.emailTranscript(a, c.pgid, c.chatId, b, d))
	}, loadTranscript: function (a, c, d) {
		socketConnector.getChat(c, a, function (b, e) {
			var f, g = {};
			if (b || !e || !e.c) return d(null);
			Tawk.intercomController.execute("trackEvent", {eventType: "viewed-history"});
			g = e;
			g.startedOn = moment(e.so || e.cso).format("dddd, MMMM D YYYY, HH:mm");
			g.countryFlag = e.cc ? "flag flag-" + e.cc.toLowerCase() : "";
			g.browser = e.bw ? e.bw + "-browser sprite-background" : "";
			g.operatingSystem = e.os ? e.os + "-os sprite-background" : "";
			g.enteredTime = e.so ? languageParser.translate("visitors",
				"entered_time", {enteredTime: moment(e.so).format("HH:mm:ss")}) : null;
			g.chatId = a;
			g.isAgentChat = "agent" === e.t;
			e.rf && (g.referrer = languageParser.translate("history", "navigated_from", {url: '<a href="' + e.rf + '" title="' + e.rf + '" target="_blank">' + encodeStr(e.rf) + "</a>"}));
			"v" === e.t && (g.departmentName = Tawk.C.pages.getDepartmentName(c, e.dpt));
			g.isAgentChat ? (f = conversationProcess.processAgentHistory(e), g.conversationEndedTime = e.ceo, g.hasOlder = !0, g.hasNewer = !0) : (f = conversationProcess.processHistory(e.c, e.n, !1, e.ceo),
			e.attr && (g.customAttributes = [], Object.keys(e.attr).forEach(function (a) {
				null !== e.attr[a] && g.customAttributes.pushObject({
					key: beautifyAPIKey(a),
					value: beautifyAPIValue(e.attr[a])
				})
			})), e.tags && (g.customTags = decodeStr(e.tags.join(", "))));
			g.messages = f.transcriptData;
			g.timeline = f.timeline;
			d(g)
		})
	}, banVisitor: function (a, c, d, b) {
		var e = 0, f = 1, g = function (a) {
			if (a) return b(a);
			e++;
			if (e === f) return b()
		};
		c && (f = 2, socketConnector.banVisitorByIp(d.pgid, d.ip, a, g));
		socketConnector.banVisitor(d.pgid, d.nvid || d.vid, a, g)
	}
});
Tawk.HistoryController = Ember.Controller.extend(Tawk.HistoryInterface, {
	historyList: null,
	modalTranscriptData: null,
	newHistoryList: null,
	totalHistory: 0,
	currentTotal: 0,
	confirmation: !1,
	initialize: function () {
		var a = this;
		this.set("listenOnNewHistory", function (c) {
			a.storeNewHistory(c)
		});
		socketConnector.socket.on("newHistoryEntry", this.listenOnNewHistory);
		this.set("totalHistory", 0);
		this.set("currentTotal", 0);
		this.set("historyList", []);
		this.set("queryData", {
			pageId: "", agentId: "", limit: 50, visitorName: "", messageCount: "",
			conversionFacet: !1
		});
		this.set("historyList", []);
		this.set("modalTranscriptData", null);
		this.set("newHistoryList", []);
		this.set("isLoading", !0)
	},
	loadList: function (a, c) {
		var d, b = this;
		a = a || function () {
		};
		if (0 < this.totalHistory && this.totalHistory === this.currentTotal) return this.set("isLoading", !1), a();
		this.set("queryData.from", this.currentTotal);
		c && this.set("queryData.limit", c);
		d = moment();
		socketConnector.loadVisitorChatHistory(this.queryData, function (c, f) {
			if (c) return b.set("isLoading", !1), a(c);
			f.hits.forEach(function (a) {
				var c =
					Tawk.webProperties.getProperty(a.pgid), e = moment(a.ceo);
				e.isSame(d, "day") ? a.time = e.format("HH:mm") : e.isSame(d, "year") ? a.time = e.format("DD/MMM") : a.time = e.format("DD/MMM/YYYY");
				a.cd = moment.duration(1E3 * a.cd).humanize();
				a.agentsName = Tawk.agentsController.getAgentsName(a.a).join(", ");
				a.propertyName = c ? c.propertyName : "";
				a.countryFlag = a.cc && "ukn" !== a.cc ? "flag flag-" + a.cc.toLowerCase() : "flag-ukn";
				a.canBeDeleted = c ? c.isAdmin : !1;
				b.historyList.pushObject(Ember.Object.createWithMixins(a))
			});
			b.set("totalHistory",
				f.total);
			b.set("currentTotal", b.historyList.length);
			b.set("isLoading", !1);
			a()
		})
	},
	loadVisitor: function (a, c, d) {
		if (this.modalTranscriptData && this.modalTranscriptData.visitor && this.modalTranscriptData.vid === a) return d(this.modalTranscriptData.visitor);
		socketConnector.getVisitorInfo(a, c, function (a, c) {
			if (a) return d(null);
			c.lastVisitDate = c.lvd ? languageParser.translate("visitors", "last_visit", {lastVisitDate: moment(c.lvd).fromNow()}) : null;
			c.lastChatAgent = c.lci && c.lci.aid.length ? decodeStr(Tawk.agentsController.getName(c.lci.aid[0])) :
				null;
			c.lastChatDate = c.lci && c.lastChatAgent ? moment(c.lci.tm).fromNow() : null;
			c.notesUpdatedOn = c.ldub ? moment(c.ldub.uo).format("D MMM YYYY") : null;
			c.notesUpdatedBy = c.ldub ? decodeStr(Tawk.agentsController.getName(c.ldub.aid)) : null;
			c.n = decodeStr(c.n);
			c.ns = decodeStr(c.ns);
			return d(c)
		})
	},
	getCopyFormat: function () {
		this._super(this.modalTranscriptData)
	},
	printTranscript: function () {
		this._super(this.modalTranscriptData)
	},
	getTranscriptData: function (a, c) {
		var d, b = this;
		if (this.modalTranscriptData && this.modalTranscriptData.chatId ===
			a) return c();
		d = this.historyList.findProperty("_id", a);
		this.loadTranscript(a, d.pgid, function (a) {
			if (!a) return c(!0);
			if (a.isAgentChat) b.loadAgentChatDetails(a, function (d) {
				a.visitor = d;
				b.set("modalTranscriptData", Ember.Object.create(a));
				return c()
			}); else {
				d.vid = a.vid;
				if (null === d.nvid) return logger({
					message: "History nvid is null",
					stack: JSON.stringify(d)
				}), c(!0);
				b.loadVisitor(d.nvid, d.pgid, function (d) {
					a.visitor = d;
					socketConnector.getGeoLocation([a.ip], function (d, f) {
						!d && f.length && (a.latitude = f[0].latitude,
							a.longitude = f[0].longitude);
						b.set("modalTranscriptData", Ember.Object.create(a));
						return c()
					})
				})
			}
		})
	},
	emailTranscript: function (a, c) {
		this._super(a, this.modalTranscriptData, c)
	},
	banVisitor: function (a, c, d) {
		var b = this;
		this._super(a, c, this.modalTranscriptData, function (a) {
			a || b.set("modalTranscriptData.visitor.b", !0);
			d(a)
		})
	},
	loadOlder: function (a) {
		var c, d = this,
			b = {before: this.modalTranscriptData.olderConversationEndedTime ? this.modalTranscriptData.olderConversationEndedTime : this.modalTranscriptData.conversationEndedTime};
		if (!this.modalTranscriptData.hasOlder) return a();
		socketConnector.getAgentConversationHistory(this.modalTranscriptData.pgid, this.modalTranscriptData.cah, b, function (b, f) {
			if (b || !f) return d.set("modalTranscriptData.hasOlder", !1), a();
			c = conversationProcess.processAgentHistory(f);
			d.set("modalTranscriptData.olderConversationEndedTime", f[0].ceo);
			d.set("modalTranscriptData.messages", c.modalTranscriptData.concat(d.modalTranscriptData.messages));
			a()
		})
	},
	loadNewer: function (a) {
		var c, d = this, b = {
			after: this.modalTranscriptData.newerConversationEndedTime ?
				this.modalTranscriptData.newerConversationEndedTime : this.modalTranscriptData.conversationEndedTime
		};
		if (!this.modalTranscriptData.hasNewer) return a();
		socketConnector.getAgentConversationHistory(this.modalTranscriptData.pgid, this.modalTranscriptData.cah, b, function (b, f) {
			if (b || !f) return d.set("modalTranscriptData.hasNewer", !1), a();
			c = conversationProcess.processAgentHistory(f);
			d.set("modalTranscriptData.newerConversationEndedTime", f[f.length - 1].ceo);
			d.set("modalTranscriptData.messages", d.modalTranscriptData.messages.concat(c.modalTranscriptData));
			a()
		})
	},
	searchHistory: function (a, c) {
		var d, b = this, e = [];
		a.from = 0;
		this.set("queryData", a);
		this.set("totalHistory", 0);
		this.set("currentTotal", 0);
		this.set("historyList", []);
		this.set("modalTranscriptData", null);
		this.set("isSearchResults", !0);
		d = moment();
		socketConnector.searchVisitorChatHistory(this.queryData, function (a, g) {
			if (a) return c();
			Tawk.intercomController.execute("trackEvent", {eventType: "searched-history"});
			g.hits.forEach(function (a) {
				var b = Tawk.webProperties.getProperty(a.pgid), c = moment(a.ceo);
				c.isSame(d,
					"day") ? a.time = c.format("HH:mm") : c.isSame(d, "year") ? a.time = c.format("DD/MMM") : a.time = c.format("DD/MMM/YYYY");
				a.cd = moment.duration(1E3 * a.cd).humanize();
				a.agentsName = Tawk.agentsController.getAgentsName(a.a).join(", ");
				a.propertyName = b ? b.propertyName : "";
				a.canBeDeleted = b ? b.isAdmin : !1;
				a.countryFlag = a.cc && "ukn" !== a.cc ? "flag flag-" + a.cc.toLowerCase() : "flag-ukn";
				e.pushObject(Ember.Object.createWithMixins(a))
			});
			b.set("historyList", e);
			b.set("totalHistory", g.total);
			b.set("currentTotal", e.length);
			c()
		})
	},
	storeNewHistory: function (a) {
		this.isSearchResults ?
			this.queryData.queryString || (this.queryData.pageId === a.pgid || -1 !== a.a.indexOf(this.queryData.agentId) || this.queryData.conversionKey === a.ck || this.queryData.messageCount <= a.cmc) && this.newHistoryList.pushObject(a) : this.newHistoryList.pushObject(a)
	},
	retrieveNewHistory: function () {
		var a = this, c = moment();
		this.newHistoryList.forEach(function (d) {
			var b = Tawk.webProperties.getProperty(d.pgid), e = moment(d.ceo);
			e.isSame(c, "day") ? d.time = e.format("HH:mm") : e.isSame(c, "year") ? d.time = e.format("DD/MMM") : d.time = e.format("DD/MMM/YYYY");
			d.cd = moment.duration(1E3 * d.cd).humanize();
			d.agentsName = Tawk.agentsController.getAgentsName(d.a).join(", ");
			d.propertyName = b ? b.propertyName : "";
			d.countryFlag = d.cc && "ukn" !== d.cc ? "flag flag-" + d.cc.toLowerCase() : "flag-ukn";
			d.canBeDeleted = b ? b.isAdmin : !1;
			a.historyList.insertAt(0, Ember.Object.create(d))
		});
		this.newHistoryList.clear()
	},
	removeEvent: function () {
		"function" === typeof this.listenOnNewHistory && socketConnector.socket.removeListener("newHistoryEntry", this.listenOnNewHistory);
		socketConnector.unsubscribeVisitorChatHistory()
	},
	hasHistoryToDelete: function () {
		var a = this.get("historyList");
		return a ? a.filterProperty("toBeDeleted", !0).get("length") : !1
	}.property("historyList.@each.toBeDeleted"),
	toggleDelete: function (a) {
		(a = this.historyList.findProperty("_id", a)) && (a.toBeDeleted ? a.set("toBeDeleted", !1) : a.set("toBeDeleted", !0))
	},
	setListPropertyToValue: function (a, c) {
		this.historyList.setEach(a, c)
	},
	deleteSingleItem: function (a) {
		var c, d = this;
		if (!this.modalTranscriptData) return a(!0);
		this.setListPropertyToValue("toBeDeleted", !1);
		c = this.historyList.findProperty("_id",
			this.modalTranscriptData.chatId);
		c.set("toBeDeleted", !0);
		this.deleteItems(function (b) {
			d.modalTranscriptData || (b = !1);
			b && c.set("toBeDeleted", !1);
			Tawk.confirmDeleteView.checkBeforeClose(b);
			return a(b)
		})
	},
	deleteItems: function (a) {
		var c = this, d = [], b = this.historyList.filterProperty("toBeDeleted", !0);
		a = a || function () {
		};
		if (0 === b.length) return a(!0);
		b.forEach(function (a) {
			d.push({pageId: a.pgid, conversationId: a._id})
		});
		socketConnector.deleteHistory(d, function (b, d) {
			var g;
			if (b) return a(!0);
			Tawk.intercomController.execute("trackEvent",
				{eventType: "deleted-chat-history"});
			d.forEach(function (b) {
				g = c.historyList.findProperty("_id", b.conversationId);
				if (!g) return a(!0);
				c.historyList.removeObject(g);
				c.modalTranscriptData && g._id === c.modalTranscriptData.chatId && c.set("modalTranscriptData", null)
			});
			return a()
		})
	},
	getMonthWithGoodFormat: function () {
		return "function" === typeof Language.momentjs.monthsShort ? Language.momentjs.monthsShortWithoutDots : Language.momentjs.monthsShort
	},
	clearList: function () {
		this.historyList.clear();
		this.newHistoryList.clear();
		this.set("modalTranscriptData", null)
	}
});