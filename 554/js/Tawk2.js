Tawk.LiveMonitoringController = Ember.Controller.extend({
	initInitialTimeout: null,
	isSubscribed: !1,
	subscribedList: [],
	allUnansweredList: [],
	allServedList: [],
	urlMessageQueue: [],
	sitesList: [],
	pagesList: [],
	agentsList: [],
	countriesList: [],
	tagsList: [],
	totalChatRequest: 0,
	durationInterval: null,
	waitingSessions: [],
	filters: null,
	isLoading: !1,
	allCountriesIncluded: !0,
	allSitesIncluded: !0,
	allPagesIncluded: !0,
	allPropertiesIncluded: !0,
	allAgentsIncluded: !0,
	allTagsIncluded: !0,
	countriesDirectory: [],
	activeVisitors: [],
	hasActiveVisitors: !1,
	idleVisitors: [],
	hasIdleVisitors: !1,
	currentPage: 1,
	perpage: 50,
	currentList: [],
	maxListSize: 50,
	totalVisitorsCount: 0,
	servedList: [],
	unansweredList: [],
	pageCount: [],
	removeBucket1: [],
	removeBucket2: [],
	bucket1Processing: !1,
	bucket2Processing: !1,
	removeVisitorTimeout: null,
	initialListLoaded: null,
	callStatusWaitList: [],
	syncCallList: !1,
	init: function () {
		this.set("filters", {pages: null, countries: null, status: null, tags: null, agents: null});
		this.set("formattedFilter", null)
	},
	actions: {
		toggleCountrySelection: function (a) {
			if (a = this.countriesList.findProperty("id", a)) a.isSelected ? a.set("isSelected", !1) : a.set("isSelected", !0), this.isAllCountriesIncluded()
		},
		toggleAllCountries: function () {
			this.allCountriesIncluded ? (this.set("allCountriesIncluded", !1), this.countriesList.setEach("isSelected", !1)) : (this.set("allCountriesIncluded", !0), this.countriesList.setEach("isSelected", !0))
		}, toggleSiteSelection: function (a) {
			if (a = this.sitesList.findProperty("id", a)) a.isSelected ? a.set("isSelected", !1) : a.set("isSelected", !0), this.isAllSitesIncluded()
		}, togglePageSelection: function (a) {
			if (a = this.pagesList.findProperty("id", a)) a.isSelected ? a.set("isSelected", !1) : a.set("isSelected",
				!0), this.isAllPagesIncluded()
		}, toggleAllSites: function () {
			this.allSitesIncluded ? (this.set("allSitesIncluded", !1), this.sitesList.setEach("isSelected", !1)) : (this.set("allSitesIncluded", !0), this.sitesList.setEach("isSelected", !0))
		}, toggleAllPages: function (a) {
			this.allPagesIncluded ? (this.set("allPagesIncluded", !1), this.pagesList.setEach("isSelected", !1)) : (this.set("allPagesIncluded", !0), this.pagesList.setEach("isSelected", !0))
		}, toggleAllProperties: function () {
			this.allPropertiesIncluded ? (this.set("allPropertiesIncluded",
				!1), this.set("allSitesIncluded", !1), this.set("allPagesIncluded", !1), this.sitesList.setEach("isSelected", !1), this.pagesList.setEach("isSelected", !1)) : (this.set("allPropertiesIncluded", !0), this.set("allSitesIncluded", !0), this.set("allPagesIncluded", !0), this.sitesList.setEach("isSelected", !0), this.pagesList.setEach("isSelected", !0))
		}, toggleAllWidgetForSite: function (a) {
			if (a = this.sitesList.findProperty("id", a)) a.isAllWidgetSelected ? (a.set("isAllWidgetSelected", !1), a.widgetsList.setEach("isSelected", !1)) :
				(a.set("isAllWidgetSelected", !0), a.widgetsList.setEach("isSelected", !0))
		}, toggleWidgetSelectionForSite: function (a, c) {
			var d, b = this.sitesList.findProperty("id", c);
			b && b.widgetsList.length && (d = b.widgetsList.findProperty("id", a)) && (d.isSelected ? d.set("isSelected", !1) : d.set("isSelected", !0), b.widgetsList.isEvery("isSelected", !0) && b.set("isAllWidgetSelected", !0))
		}, toggleAllDepartment: function (a, c) {
			var d;
			if (d = "site" === c ? this.sitesList.findProperty("id", a) : this.pagesList.findProperty("id", a)) d.isAllDepartmentSelected ?
				(d.set("isAllDepartmentSelected", !1), d.departmentsList.setEach("isSelected", !1)) : (d.set("isAllDepartmentSelected", !0), d.departmentsList.setEach("isSelected", !0))
		}, toggleDepartmentSelection: function (a, c, d) {
			(c = "site" === d ? this.sitesList.findProperty("id", c) : this.pagesList.findProperty("id", c)) && c.departmentsList.length && (a = c.departmentsList.findProperty("id", a)) && (a.isSelected ? a.set("isSelected", !1) : a.set("isSelected", !0), c.departmentsList.isEvery("isSelected", !0) && c.set("isAllDepartmentSelected", !0))
		},
		toggleAllAgents: function () {
			this.allAgentsIncluded ? (this.set("allAgentsIncluded", !1), this.agentsList.setEach("isSelected", !1)) : (this.set("allAgentsIncluded", !0), this.agentsList.setEach("isSelected", !0))
		}, toggleAgentSelection: function (a) {
			if (a = this.agentsList.findProperty("id", a)) a.isSelected ? a.set("isSelected", !1) : a.set("isSelected", !0), this.agentsList.isEvery("isSelected") ? this.set("allAgentsIncluded", !0) : this.set("allAgentsIncluded", !1)
		}, toggleAllTags: function () {
			this.allTagsIncluded ? (this.set("allTagsIncluded",
				!1), this.tagsList.setEach("isSelected", !1)) : (this.set("allTagsIncluded", !0), this.tagsList.setEach("isSelected", !0))
		}, toggleTagSelection: function (a) {
			if (a = this.tagsList.findProperty("id", a)) a.isSelected ? a.set("isSelected", !1) : a.set("isSelected", !0), this.tagsList.isEvery("isSelected", !0) ? this.set("allTagsIncluded", !0) : this.set("allTagsIncluded", !1)
		}, nextPage: function () {
			this.set("currentPage", this.currentPage + 1)
		}, previousPage: function () {
			this.set("currentPage", this.currentPage - 1)
		}, ignoreChat: function (a) {
			this.ignoreChat(a)
		}
	},
	loadProperties: function () {
		var a = [], c = [];
		Tawk.webProperties.sites.forEach(function (c) {
			var b, e = [], f = [];
			c.enabled && (c.widgets.length && c.isStatusEnabled) && (b = Ember.Object.create({
				id: c.id,
				name: decodeStr(c.propertyName),
				isSelected: !0,
				isAllWidgetSelected: !0,
				isAllDepartmentSelected: !0
			}), c.widgets.forEach(function (a) {
				f.pushObject(Ember.Object.create({id: a.id, name: decodeStr(a.name), isSelected: !0}))
			}), c.departments && Object.keys(c.departments).forEach(function (a) {
				c.departments[a].en && !c.departments[a].dltd &&
				e.pushObject(Ember.Object.create({id: a, name: decodeStr(c.departments[a].n), isSelected: !0}))
			}), b.set("widgetsList", sortList(f, "name")), b.set("departmentsList", sortList(e, "name")), a.pushObject(b))
		});
		Tawk.webProperties.pages.forEach(function (a) {
			var b, e = [];
			a.enabled && a.isStatusEnabled && (b = Ember.Object.create({
				id: a.id,
				name: decodeStr(a.propertyName),
				isSelected: !0,
				isAllDepartmentSelected: !0
			}), a.departments && Object.keys(a.departments).forEach(function (b) {
				a.departments[b].en && !a.departments[b].dltd && e.pushObject(Ember.Object.create({
					id: b,
					name: decodeStr(a.departments[b].n), isSelected: !0
				}))
			}), b.set("departmentsList", sortList(e, "name")), c.pushObject(b))
		});
		this.set("sitesList", sortList(a, "name"));
		this.set("pagesList", sortList(c, "name"))
	},
	loadAgents: function () {
		var a = [], c = !1, d = Tawk.userController.user.isHiredAgent;
		a.pushObject(Ember.Object.create({
			id: Tawk.userController.user.id,
			name: decodeStr(Tawk.userController.user.fullName),
			isSelected: !0
		}));
		Tawk.agentsController.agents.forEach(function (b) {
			b.isHiredOnly && !d ? c = !0 : a.pushObject(Ember.Object.create({
				id: b.id,
				name: decodeStr(b.name), isSelected: !0
			}))
		});
		c && a.pushObject(Ember.Object.create({id: "hired_agent", name: "Hired Agents", isSelected: !0}));
		this.set("agentsList", sortList(a, "name"))
	},
	loadCountries: function () {
		var a = [], c = [], d = {};
		countryList2.forEach(function (b) {
			var c, f = b.value.charAt(0);
			c = Ember.Object.create({id: b.id, name: b.value, isSelected: !0});
			d[f] || (b = Ember.Object.create({label: f, countries: []}), b.reopen({
				isViewable: function () {
					return this.countries.isAny("isHighlighted", !0) || this.countries.isEvery("isNotHighlighted",
						void 0)
				}.property("countries.@each.isHighlighted", "countries.@each.isNotHighlighted")
			}), d[f] = b);
			d[f].countries.pushObject(c);
			a.pushObject(c)
		});
		Object.keys(d).forEach(function (a) {
			c.pushObject(d[a])
		});
		this.set("countriesDirectory", c);
		this.set("countriesList", a)
	},
	loadTags: function () {
		var a = this, c = [];
		socketConnector.getAllTags(function (d, b) {
			d || (b.forEach(function (a) {
				c.pushObject(Ember.Object.create({id: decodeStr(a), name: decodeStr(a), isSelected: !0}))
			}), a.set("tagsList", sortList(c, "name")))
		})
	},
	loadFilters: function () {
		this.agentsList.length ||
		this.loadAgents();
		this.countriesList.length || this.loadCountries();
		this.sitesList.length || this.pagesList.length || this.loadProperties();
		this.loadTags()
	},
	isAllCountriesIncluded: function () {
		this.countriesList.length && (this.countriesList.isEvery("isSelected", !0) ? this.set("allCountriesIncluded", !0) : this.set("allCountriesIncluded", !1))
	},
	isAllSitesIncluded: function () {
		this.sitesList.length && (this.sitesList.isEvery("isSelected", !0) ? this.set("allSitesIncluded", !0) : this.set("allSitesIncluded", !1))
	},
	isAllPagesIncluded: function () {
		this.sitesList.length &&
		(this.pagesList.isEvery("isSelected", !0) ? this.set("allPagesIncluded", !0) : this.set("allPagesIncluded", !1))
	},
	isAllPropertiesIncluded: function () {
		this.allPagesIncluded && this.allSitesIncluded ? this.set("allPropertiesIncluded", !0) : this.set("allPropertiesIncluded", !1)
	}.observes("allPagesIncluded", "allSitesIncluded"),
	visitorsStatusDidChange: function () {
		var a, c, d = this, b = this.get("currentList").filterProperty("st", "away"),
			e = this.get("currentList").filterProperty("st", "online");
		a = e.filter(function (a) {
			if (d.activeVisitors.contains(a)) return !1;
			e.indexOf(a) < d.activeVisitors.length - 1 ? d.activeVisitors.insertAt(e.indexOf(a), a) : d.activeVisitors.pushObject(a);
			return !0
		});
		this.activeVisitors.removeObjects(this.activeVisitors.filter(function (a) {
			return e.contains(a) ? !1 : !0
		}));
		c = b.filter(function (a) {
			if (d.idleVisitors.contains(a)) return !1;
			b.indexOf(a) < d.idleVisitors.length ? d.idleVisitors.insertAt(b.indexOf(a), a) : d.idleVisitors.pushObject(a);
			return !0
		});
		this.idleVisitors.removeObjects(this.idleVisitors.filter(function (a) {
			return b.contains(a) ? !1 : !0
		}));
		this.activeVisitors.removeObjects(c);
		this.idleVisitors.removeObjects(a);
		this.updateTotalInactiveCounts();
		0 < this.activeVisitors.length ? this.set("hasActiveVisitors", !0) : this.set("hasActiveVisitors", !1);
		0 < this.idleVisitors.length ? this.set("hasIdleVisitors", !0) : this.set("hasIdleVisitors", !1)
	}.observes("currentList.@each.st", "currentList.@each.isInactive"),
	getOngoingConversations: function (a) {
		socketConnector.getOngoingConvesations(function (c, d) {
			a(c, d)
		})
	},
	initInitialVisitors: function (a) {
		var c = this;
		clearTimeout(this.initInitialTimeout);
		a = a || function () {
		};
		this.set("isSubscribed", !1);
		this.set("initialListLoaded", !1);
		this.allUnansweredList.clear();
		this.allServedList.clear();
		this.subscribedList.clear();
		this.waitingSessions.clear();
		Tawk.chatController.chatList.clear();
		this.set("initInitialTimeout", setTimeout(function () {
			c.getOngoingConversations(function (d, b) {
				d ? c.initInitialVisitors(a) : (c.loadInitialList(b), a())
			})
		}, 0))
	},
	loadInitialList: function (a) {
		var c, d = this, b = [], e = [], f = [], g = [];
		moment();
		var h = function () {
			d.set("syncCallList", !0);
			socketConnector.getCallList(function (a,
			                                      b) {
				!a && b.data.calls && (b.data.calls.forEach(function (a) {
					d.callStatusUpdate(a)
				}), d.set("initialListLoaded", !0), d.startDurationInterval(), d.clearMessageUrl(), d.clearCallWaitingList(), d.startRemoveVisitorTimeout())
			})
		};
		clearTimeout(this.initInitialTimeout);
		a.forEach(function (a) {
			c = d.waitingSessions.findProperty("vsk", a._id) || d.waitingSessions.findProperty("_id", a._id);
			c || (c = Tawk.VisitorModel.create(a), d.waitingSessions.pushObject(c), b.push({
				vsk: a._id,
				pgid: a.pgid
			}))
		});
		b.length ? this.subscribeVisitorSession(b,
			function (a, b) {
				a || (Object.keys(b).forEach(function (a) {
					var h = b[a];
					if (c = d.waitingSessions.findProperty("_id", a)) d.waitingSessions.removeObject(c), h && (Tawk.visitorChatController.getChatByVisitor(h.vid) && (c = Tawk.visitorChatController.getChatByVisitor(h.vid), Tawk.visitorChatController.restartChat(c), c.setProperties(h)), c.setProperties(h), c.set("isSubscribed", !0), c.cr ? f.pushObject(c) : c.ha && (0 <= c.al.indexOf(Tawk.userController.user.id) && g.pushObject(c._id), e.pushObject(c)))
				}), d.allServedList.pushObjects(e),
					d.allUnansweredList.pushObjects(f), g.forEach(function (a) {
					d.openChat(a)
				}), h())
			}) : h()
	},
	getVisitor: function (a) {
		var c = null;
		if (!1 === this.isSubscribed) return c;
		for (var d = 0, b = this.subscribedList.length; d < b; d++) if (this.subscribedList[d]._id === a) {
			c = this.subscribedList[d];
			break
		}
		return c
	},
	getSubscribedVisitor: function (a) {
		for (var c, d = 0, b = this.allServedList.length; d < b; d++) if (this.allServedList[d]._id === a) {
			c = this.allServedList[d];
			break
		}
		if (!c) for (d = 0, b = this.allUnansweredList.length; d < b; d++) if (this.allUnansweredList[d]._id ===
			a) {
			c = this.allUnansweredList[d];
			break
		}
		return c
	},
	subscribeVisitorSession: function (a, c) {
		Array.isArray(a) || (a = [a]);
		socketConnector.subscribeVisitorSessions(a, function (a, b) {
			c(a, b)
		})
	},
	unsubscribeVisitorSession: function (a) {
		socketConnector.unsubscribeVisitorSessions([{vsk: a._id, pgid: a.pgid}], function (c) {
			c || (a.set("isSubscribed", !1), a.set("isMessageSubscribed", !1))
		})
	},
	performSubscribe: function () {
		var a = this;
		socketConnector.subscribeVisitorList(this.filters, function (c, d) {
			a.set("isLoading", !1);
			c || (clearTimeout(a.removeVisitorTimeout),
				a.performVisitorRemove(), a.subscribedList.pushObjects(sortList(a.processVisitors(d), "_id", !0)), a.set("isSubscribed", !0))
		})
	},
	loadSubscribedList: function () {
		this.isSubscribed || (this.set("isLoading", !0), this.loadFilters(), this.subscribedList.clear(), this.currentList.clear(), this.performSubscribe())
	},
	startRemoveVisitorTimeout: function () {
		var a = this;
		this.set("removeVisitorTimeout", setTimeout(function () {
			a.performVisitorRemove()
		}, 1E3))
	},
	addVisitor: function (a) {
		if (this.isSubscribed && a.length) if (a = this.processVisitors(a),
			0 === this.subscribedList.length) this.subscribedList.pushObjects(sortList(a, "_id", !0)); else {
			for (var c = 0, d = a.length; c < d; c++) {
				for (var b = !1, e = a[c], f = 0, g = this.subscribedList.length; f < g; f++) if (this.subscribedList[f]._id < e._id) {
					this.subscribedList.insertAt(f, e);
					b = !0;
					break
				} else if (this.subscribedList[f]._id === e._id) {
					b = !0;
					break
				}
				b || this.subscribedList.pushObject(e)
			}
			a.clear()
		}
	},
	removeVisitor: function (a, c) {
		this.bucket1Processing ? this.removeBucket2.push({
			visitorId: a,
			stillHasSession: c
		}) : this.removeBucket1.push({
			visitorId: a,
			stillHasSession: c
		})
	},
	performVisitorRemove: function () {
		var a = this;
		this.set("bucket1Processing", !0);
		this.removeBucket1.length && (this.removeBucket1.forEach(function (c) {
			a.executeRemove(c)
		}), this.removeBucket1.clear());
		this.set("bucket1Processing", !1);
		this.set("bucket2Processing", !0);
		this.removeBucket2.length && (this.removeBucket2.forEach(function (c) {
			a.executeRemove(c)
		}), this.removeBucket2.clear());
		this.set("bucket2Processing", !1);
		this.startRemoveVisitorTimeout()
	},
	executeRemove: function (a) {
		var c = this.getSubscribedVisitor(a.visitorId) ||
			this.getVisitor(a.visitorId);
		c && (this.subscribedList.removeObject(c), a.stillHasSession || (this.allServedList.removeObject(c), this.allUnansweredList.removeObject(c), c.isOpen && (c.chatEnded(), c.setProperties({
			isVisitorPresent: !1,
			messagePreview: null,
			isSubscribed: !1,
			al: [],
			alv: 0,
			ha: !1,
			cr: !1,
			ignore: !1,
			hasJoinedConversation: !1,
			isMessageSubscribed: !1
		}), c.incomingMessage({
			vsk: a.visitorId,
			m: "VISITOR_LEFT",
			co: Date.now(),
			t: "n",
			ut: "v"
		}))), c.setProperties({incomingCall: !1, ongoingCall: !1}), delete c)
	},
	unloadSubscribedList: function () {
		var a =
			this;
		this.set("maxListSize", 50);
		socketConnector.unsubscribeVisitorList(function (c) {
			a.set("isSubscribed", !1);
			clearTimeout(a.removeVisitorTimeout);
			a.performVisitorRemove();
			a.subscribedList.clear();
			a.unansweredList.clear();
			a.servedList.clear()
		})
	},
	processVisitors: function (a) {
		var c, d = [], b = this;
		a.forEach(function (a) {
			(c = Tawk.visitorChatController.getChatByVisitor(a.vid)) && !b.subscribedList.contains(c) ? (c.setProperties(a), d.pushObject(c), b.allServedList.contains(c) || b.allUnansweredList.contains(c) || (Tawk.visitorChatController.restartChat(c),
				b.allServedList.pushObject(c))) : (c = b.getSubscribedVisitor(a._id)) ? (c.setProperties(a), d.pushObject(c)) : (c = b.getVisitor(a._id)) ? c.setProperties(a) : (c = Tawk.VisitorModel.create(a), c.ha ? b.allServedList.pushObject(c) : c.cr ? b.allUnansweredList.pushObject(c) : d.pushObject(c))
		});
		return d
	},
	updateVisitorStatus: function (a, c) {
		var d = this.getVisitor(a.vsk) || this.getSubscribedVisitor(a.vsk);
		d && d.set("st", c)
	},
	queueMessageUrl: function (a) {
		var c;
		this.isClearingUrl ? setTimeout(function () {
			self.queueMessageUrl(a)
		}) : ((c = this.urlMessageQueue.findProperty("vsk",
			a.vsk)) && c.cver < a.cver && this.urlMessageQueue.removeObject(c), this.urlMessageQueue.pushObject(a))
	},
	clearMessageUrl: function () {
		var a;
		self = this;
		setTimeout(function () {
			self.set("isClearingUrl", !0);
			self.urlMessageQueue.forEach(function (c) {
				a = self.getVisitor(c.vsk) || self.getSubscribedVisitor(c.vsk);
				!a || c.cver < a.cver || a.changePageUrl(c)
			});
			self.urlMessageQueue.clear();
			self.set("isClearingUrl", !1);
			self.clearMessageUrl()
		}, 1E3)
	},
	newChatRequest: function (a) {
		var c, d = this, b = "WEBRTC_SESSION_REQUESTED" === a.m;
		visitor =
			this.waitingSessions.findProperty("vsk", a.vsk) || this.waitingSessions.findProperty("_id", a.vsk);
		this.initialListLoaded && !visitor && ((visitor = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk)) || (visitor = Tawk.VisitorModel.create(a)), b ? (visitor.set("incomingCall", !0), c = languageParser.translate("visitors", "VISITOR_WEBRTC_SESSION_REQUESTED")) : c = a.m, visitor.isSubscribed ? (visitor.set("cr", !0), this.allServedList.removeObject(visitor), this.subscribedList.removeObject(visitor), this.allUnansweredList.contains(visitor) ||
		this.allUnansweredList.pushObject(visitor), visitor.get("ring") && notificationController.showMessageNotification(a.n, a.m, a.vsk)) : (this.waitingSessions.pushObject(visitor), this.subscribeVisitorSession({
			vsk: a.vsk,
			pgid: a.pgid
		}, function (b, f) {
			var g = f[a.vsk];
			if (!b && g && (Tawk.visitorChatController.getChatByVisitor(g.vid) ? (visitor = Tawk.visitorChatController.getChatByVisitor(g.vid), Tawk.visitorChatController.restartChat(visitor)) : visitor = d.waitingSessions.findProperty("vsk", a.vsk) || d.waitingSessions.findProperty("_id",
					a.vsk), visitor)) {
				d.waitingSessions.removeObject(visitor);
				if (!visitor.alv || visitor.alv && visitor.alv <= g.alv) visitor.setProperties(g), visitor.set("isSubscribed", !0), visitor.isOpen && visitor.processHistory(), visitor.cr && !visitor.ha && (d.allServedList.removeObject(visitor), d.subscribedList.removeObject(visitor), d.allUnansweredList.findProperty("vsk", a.vsk) || d.allUnansweredList.pushObject(visitor));
				visitor.isOpen && !visitor.isMessageSubscribed && socketConnector.subscribeVisitorMessage({
					vsk: visitor._id, pgid: visitor.pgid,
					from: 0
				}, function (a, b) {
					!a && (b.c && b.c.length) && (visitor.set("isMessageSubscribed", !0), b.c.forEach(function (a) {
						visitor.incomingMessage(a)
					}))
				});
				visitor.get("ring") && notificationController.showMessageNotification(a.n, c, a.vsk)
			}
		})))
	},
	updateChatServed: function (a) {
		if (a = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk)) a.set("cr", !1), a.anotherDepartment && a.set("anotherDepartment", !1), notificationController.updateTotalForChatServed()
	},
	updateAgentJoined: function (a) {
		var c = this, d = this.getSubscribedVisitor(a.vsk) ||
			this.getVisitor(a.vsk);
		d || (d = this.waitingSessions.findProperty("vsk", a.vsk));
		d || (d = Tawk.VisitorModel.create(a));
		d.setProperties({al: a.al, alv: a.alv, ha: !0, cr: !1});
		d.isSubscribed ? (this.allServedList.contains(d) || this.allServedList.pushObject(d), this.allUnansweredList.removeObject(d)) : this.subscribeVisitorSession({
			vsk: a.vsk,
			pgid: a.pgid
		}, function (b, e) {
			var f = e[a.vsk];
			!b && f && (!d.alv || d.alv && d.alv <= f.alv) && (c.waitingSessions.removeObject(d), d.set("isSubscribed", !0), d.setProperties(f), c.allServedList.findProperty("vsk",
				a.vsk) || c.allServedList.pushObject(d), c.allUnansweredList.removeObject(d))
		})
	},
	updateAgentLeft: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		c && (c.set("al", a.al), c.set("alv", a.alv), c.set("ha", !1), c.set("ongoingCall", !1), c.isOpen ? c.set("hasJoinedConversation", !1) : this.allServedList.removeObject(c))
	},
	updateAgentList: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		c && (c.set("al", a.al), c.set("alv", a.alv))
	},
	resetVisitorStatus: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) ||
			this.getVisitor(a.vsk);
		c && (c.set("al", a.al), c.set("alv", a.alv), c.set("cr", !1), c.set("ha", !1), c.set("ignore", !1), this.allUnansweredList.removeObject(c), c.isOpen || this.allServedList.removeObject(c))
	},
	visitorDataUpdate: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		c && (c.setProperties(a), a.ns || c.set("ns", ""), a.n && c.isOpen && Tawk.visitorChatContainerView.updateVisitorName(a.vsk, a.n))
	},
	chatWindowResized: function (a) {
		(a = this.getSubscribedVisitor(a.vsk)) && a.isOpen && a.addToMessageBlock({
			t: "n",
			ut: "v", m: "resize", co: new Date
		})
	},
	updateChatWindowState: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		c && c.windowStateChanged(a.cw, !0)
	},
	updatePopoutState: function (a) {
		var c = this.getSubscribedVisitor(a.vsk);
		c && c.isOpen && c.popoutStateChanged(a.hpt)
	},
	removeFromServed: function (a) {
		(a = this.allServedList.findProperty("_id", a)) && !a.ha && (this.allServedList.removeObject(a), this.unsubscribeVisitorSession(a))
	},
	openChat: function (a) {
		var c = this, d = this.getSubscribedVisitor(a) || this.getVisitor(a),
			b = function () {
				socketConnector.subscribeVisitorMessage({vsk: d._id, pgid: d.pgid, from: 0}, function (a, b) {
					a ? logger({
						message: "subscribeVisitorMessage returned error",
						stack: JSON.stringify({vsk: d._id, pgid: d.pgid, from: 0})
					}) : b ? (d.setProperties(b), d.set("isMessageSubscribed", !0)) : (d.setProperties({
						isVisitorPresent: !1,
						messagePreview: null,
						isSubscribed: !1,
						al: [],
						alv: 0,
						ha: !1,
						cr: !1,
						ignore: !1,
						isMessageSubscribed: !1
					}), d.incomingMessage({vsk: d._id, m: "VISITOR_LEFT", co: Date.now(), t: "n", ut: "v"}));
					c.allServedList.contains(d) ||
					c.allUnansweredList.contains(d) || c.allServedList.pushObject(d);
					Tawk.visitorChatController.openChat(d)
				})
			};
		d && (d.isSubscribed ? b() : this.subscribeVisitorSession({vsk: d._id, pgid: d.pgid}, function (a, c) {
			!a && c[d._id] && (d.setProperties(c[d._id]), d.set("isSubscribed", !0), b())
		}))
	},
	openOldestChat: function () {
		var a = this.allUnansweredList.filterProperty("ignore", !1).get("firstObject");
		a && this.openChat(a._id)
	},
	ignoreChat: function (a) {
		(a = this.getSubscribedVisitor(a) || this.getVisitor(a)) && (a.ignore ? a.set("ignore", !1) :
			a.set("ignore", !0))
	},
	handleChatRequests: function () {
		var a = this.allUnansweredList.filterProperty("ring", !0).length;
		0 !== a ? a > this.totalChatRequest && notificationController.notifyNewChatRequest() : notificationController.stopNewChatRequest();
		this.set("totalChatRequest", a)
	}.observes("allUnansweredList.@each.ring"),
	updateTags: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		!c || c.customTags.version > a.tagsv || c.setProperties({tags: a.tags, tagsv: a.tagsv})
	},
	startDurationInterval: function () {
		var a,
			c, d = this;
		this.stopDurationInterval();
		this.set("durationInterval", setTimeout(function () {
			if (d.isSubscribed) for (a = 0, c = d.currentList.length; a < c; a++) d.currentList[a].updateDuration();
			a = 0;
			for (c = d.allUnansweredList.length; a < c; a++) d.allUnansweredList[a].updateDuration();
			a = 0;
			for (c = d.allServedList.length; a < c; a++) d.allServedList[a].updateDuration();
			d.startDurationInterval()
		}, 1E3))
	},
	stopDurationInterval: function () {
		clearTimeout(this.durationInterval);
		this.set("durationInterval", null)
	},
	banVisitor: function (a, c,
	                      d, b) {
		var e = this;
		banVisitor(c, d, a, function (c) {
			if (c) return b(c);
			a.set("b", !0);
			a.set("hasJoinedConversation", !1);
			a.set("isVisitorPresent", !1);
			a.set("messagePreview", null);
			e.removeVisitor(a._id);
			b()
		})
	},
	updateWidgetsForProperty: function (a, c, d) {
		var b, e = [];
		(b = "site" === c ? this.sitesList.findProperty("id", a) : this.pagesList.findProperty("id", a)) && d.forEach(function (a) {
			var c = b.widgetsList.findProperty("id", a.id);
			c ? c.set("name", decodeStr(a.name)) : (c = Ember.Object.create({
				id: a.id,
				name: decodeStr(a.name)
			}), b.isAllWidgetSelected &&
			c.set("isSelected", !0), e.pushObject(c))
		})
	},
	updatePropertyName: function (a, c, d) {
		(a = "site" === c ? this.sitesList.findProperty("id", a) : this.pagesList.findProperty("id", a)) && a.set("name", decodeStr(d))
	},
	addProperty: function (a) {
		var c, d, b, e = !1, f = [], g = [], h = this;
		a.departments && Object.keys(a.departments).forEach(function (b) {
			a.departments[b].en && !a.departments[b].dltd && f.pushObject(Ember.Object.create({
				id: b,
				name: decodeStr(a.departments[b].n),
				isSelected: !0
			}))
		});
		c = Ember.Object.create({
			id: a.id, name: decodeStr(a.propertyName),
			isAllDepartmentSelected: !0, departmentsList: f
		});
		if ("site" === a.propertyType) {
			a.widgets.forEach(function (a) {
				g.pushObject(Ember.Object.create({id: a.id, name: decodeStr(a.name), isSelected: !0}))
			});
			c.setProperties({isAllWidgetSelected: !0, widgetsList: sortList(g, "name")});
			this.allPropertiesIncluded || this.allSitesIncluded ? c.set("isSelected", !0) : c.set("isSelected", !1);
			d = 0;
			for (b = this.sitesList.length; d < b; d++) if (this.sitesList[d].name > c.name) {
				this.sitesList.insertAt(d, c);
				e = !0;
				break
			}
			e || this.sitesList.pushObject(c)
		} else {
			this.allPropertiesIncluded ||
			this.allPagesIncluded ? c.set("isSelected", !0) : c.set("isSelected", !1);
			d = 0;
			for (b = this.pagesList.length; d < b; d++) if (this.pagesList[d].name > c.name) {
				this.pagesList.insertAt(d, c);
				e = !0;
				break
			}
			e || this.pagesList.pushObject(c)
		}
		this.isSubscribed ? this.performSubscribe() : this.getOngoingConversations(function (b, c) {
			b || h.loadInitialList(c.filterProperty("pgid", a.id))
		})
	},
	removeProperty: function (a, c) {
		var d;
		"site" === c ? (d = this.sitesList.findProperty("id", a)) && this.sitesList.removeObject(d) : (d = this.pagesList.findProperty("id",
			a)) && this.pagesList.removeObject(d);
		this.isSubscribed && this.performFilter(this.filters.status)
	},
	updateAgentName: function (a, c) {
		var d = this.agentsList.findProperty("id", a);
		d && d.set("name", decodeStr(c))
	},
	removeAgent: function (a) {
		var c = this.agentsList.findProperty("id", a);
		Tawk.webProperties.isOnlyHiredAgent(a) && 0 === Tawk.webProperties.getHiredAgentsIds().length && (c = this.agentsList.findProperty("id", "hired_agent"));
		c && this.agentsList.removeObject(c);
		c && c.isSelected && this.performFilter(this.filters.status)
	},
	addAgent: function (a) {
		var c, d = !1, b = this.agentsList.findProperty("id", a.id);
		if (!b) {
			b = Ember.Object.create({id: a.id, name: decodeStr(a.name)});
			this.allAgentsIncluded ? b.set("isSelected", !0) : b.set("isSelected", !1);
			a = 0;
			for (c = this.agentsList.length; a < c; a++) if (this.agentsList[a].name > b.name) {
				this.agentsList.insertAt(a, b);
				d = !0;
				break
			}
			d || this.agentsList.pushObject(b)
		}
	},
	performFilter: function (a) {
		var c, d, b, e = [], f = [], g = [], h = [], k = [], l = [], m = [], n = [], p = [], q = {};
		this.set("isLoading", !0);
		if (!1 === this.allPropertiesIncluded ||
			this.pagesList.findProperty("isAllDepartmentSelected", !1) || this.pagesList.findProperty("isAllWidgetSelected", !1) || this.sitesList.findProperty("isAllDepartmentSelected", !1) || this.sitesList.findProperty("isAllWidgetSelected", !1)) {
			c = 0;
			for (d = this.pagesList.length; c < d; c++) {
				var r = this.pagesList[c];
				b = {};
				r.isSelected && (b.pgid = r.id, b.wgid = null, b.dpt = null, m.push(r.id), r.departmentsList && !1 === r.isAllDepartmentSelected && (b.dpt = r.departmentsList.filterProperty("isSelected", !0).getEach("id"), 0 === b.dpt.length &&
				(b.dpt = [""])), e.push(b))
			}
			c = 0;
			for (d = this.sitesList.length; c < d; c++) m = this.sitesList[c], b = {}, m.isSelected && (b.pgid = m.id, b.wgid = null, b.dpt = null, k.push(m.name), m.widgetsList && !1 === m.isAllWidgetSelected && (b.wgid = m.widgetsList.filterProperty("isSelected", !0).getEach("id"), 0 === b.wgid.length && (b.wgid = null)), m.departmentsList && !1 === m.isAllDepartmentSelected && (b.dpt = m.departmentsList.filterProperty("isSelected", !0).getEach("id"), 0 === b.dpt.length && (b.dpt = [""])), e.push(b))
		}
		k.length && (q.filterByProperties = {values: k.join(", ")},
		5 < k.length && (q.filterByProperties.shortValues = k.slice(0, 5).join(", ")));
		if (!1 === this.allCountriesIncluded) {
			c = 0;
			for (d = this.countriesList.length; c < d; c++) b = this.countriesList[c], b.isSelected && (f.push(b.id), l.push(b.name));
			l.length && (q.filterByCountries = {values: l.join(", ")}, 5 < l.length && (q.filterByCountries.shortValues = l.slice(0, 5).join(", ")))
		}
		if (!1 === this.allAgentsIncluded) {
			c = 0;
			for (d = this.agentsList.length; c < d; c++) l = this.agentsList[c], l.isSelected && ("hired_agent" === l.id ? (g = g.concat(Tawk.webProperties.getHiredAgentsIds()),
				n.push("Hired Agents")) : (g.push(l.id), n.push(l.name)));
			n.length && (q.filterByAgentsInclude = {values: n.join(", ")}, 5 < n.length && (q.filterByAgentsInclude.shortValues = n.slice(0, 5).join(", ")))
		}
		if (!1 === this.allTagsIncluded) {
			c = 0;
			for (d = this.tagsList.length; c < d; c++) n = this.tagsList[c], n.isSelected && (h.push(n.id), p.push(n.id));
			p.length && (q.filterByTagsInclude = {values: p.join(", ")}, 5 < p.length && (q.filterByTagsInclude.shortValues = p.slice(0, 5).join(", ")))
		}
		a && (q.filterByStatus = {
			values: languageParser.translate("status_types",
				a)
		});
		0 === Object.keys(q).length && (q = null);
		this.set("filters", {
			pages: e.length ? e : null,
			countries: f.length ? f : null,
			agents: g.length ? g : null,
			tags: h.length ? h : null,
			status: a ? a : null
		});
		this.set("formattedFilter", q);
		this.subscribedList.clear();
		this.performSubscribe()
	},
	setCurrentFilterList: function () {
		var a, c = this;
		a = (this.currentPage - 1) * this.perpage;
		var d = this.currentPage * this.perpage, b = this.subscribedList.filterProperty("isInactive", !0);
		b.length ? (b.sort(function (a, b) {
			if ("online" === a.st && "online" === b.st || "away" ===
				a.st && "away" === b.st) return a.so < b.so ? 1 : a.so > b.so ? -1 : 0;
			if ("online" === a.st && "away" === b.st) return -1;
			if ("away" === a.st && "online" === b.st) return 1
		}), b = b.slice(a, d), 0 === b.length ? this.currentList.clear() : (a = this.currentList.filter(function (a) {
			return b.contains(a) ? !1 : !0
		}), this.currentList.removeObjects(a), b.forEach(function (a) {
			c.currentList.contains(a) || (b.indexOf(a) < c.currentList.length - 1 ? c.currentList.insertAt(b.indexOf(a), a) : c.currentList.pushObject(a))
		})), 0 === this.currentList.length && this.get("hasPreviousPage") &&
		this.send("previousPage")) : this.currentList.clear()
	}.observes("currentPage", "subscribedList.@each.isInactive"),
	updateTotalInactiveCounts: function () {
		for (var a = 0, c = 0, d = 0, b = this.subscribedList.length; d < b; d++) {
			var e = this.subscribedList[d];
			e.get("isInactive") && ("online" === e.st ? a++ : c++)
		}
		this.set("totalActiveVisitors", a);
		this.set("totalIdleVisitors", c)
	},
	totalPages: function () {
		return Math.ceil(this.subscribedList.length / this.perpage)
	}.property("subscribedList.length"),
	hasNextPage: function () {
		return this.currentPage <
			this.get("totalPages")
	}.property("currentPage", "totalPages"),
	hasPreviousPage: function () {
		return 1 < this.currentPage
	}.property("currentPage", "totalPages"),
	extendMonitoringSubscription: function () {
		var a = this;
		socketConnector.extendMonitoringList(function (c, d) {
			c || a.set("maxListSize", d)
		})
	},
	isNextListAvailable: function () {
		this.get("hasNextPage") || this.currentList.length <= this.perpage && (this.subscribedList.length === this.maxListSize && this.subscribedList.length < this.totalVisitorsCount) && this.extendMonitoringSubscription()
	}.observes("hasNextPage"),
	removeSingleFilter: function (a) {
		var c = this.formattedFilter;
		this.set("isLoading", !0);
		"properties" === a && (this.set("allPropertiesIncluded", !0), this.set("allPagesIncluded", !0), this.set("allSitesIncluded", !0), Tawk.liveMonitoringController.pagesList.setEach("isSelected", !0), Tawk.liveMonitoringController.pagesList.setEach("isAllDepartmentSelected", !0), Tawk.liveMonitoringController.sitesList.setEach("isSelected", !0), Tawk.liveMonitoringController.sitesList.setEach("isAllWidgetSelected", !0), Tawk.liveMonitoringController.sitesList.setEach("isAllDepartmentSelected",
			!0), c && c.filterByProperties && delete c.filterByProperties);
		"countries" === a && (this.set("allCountriesIncluded", !0), Tawk.liveMonitoringController.countriesList.setEach("isSelected", !0), c && c.filterByCountries && delete c.filterByCountries);
		"agents-include" === a && (Tawk.liveMonitoringController.agentsList.setEach("isSelected", !0), this.set("allAgentsIncluded", !0), c && c.filterByAgentsInclude && delete c.filterByAgentsInclude);
		"tags-include" === a && (Tawk.liveMonitoringController.tagsList.setEach("isSelected", !0), this.set("allTagsIncluded",
			!0), c && c.filterByTagsInclude && delete c.filterByTagsInclude);
		"status" === a && (c && c.filterByStatus) && (delete c.filterByStatus, this.set("filters.status", null));
		0 === Object.keys(c).length && (c = null);
		this.set("formattedFilter", null);
		this.set("formattedFilter", c);
		this.performFilter(this.filters.status)
	},
	clearFilters: function () {
		this.set("isLoading", !0);
		this.set("allPropertiesIncluded", !0);
		this.set("allPagesIncluded", !0);
		this.set("allSitesIncluded", !0);
		this.set("allCountriesIncluded", !0);
		this.set("allAgentsIncluded",
			!0);
		this.set("allTagsIncluded", !0);
		Tawk.liveMonitoringController.pagesList.setEach("isSelected", !0);
		Tawk.liveMonitoringController.sitesList.setEach("isSelected", !0);
		Tawk.liveMonitoringController.sitesList.setEach("isAllWidgetSelected", !0);
		Tawk.liveMonitoringController.sitesList.setEach("isAllDepartmentSelected", !0);
		Tawk.liveMonitoringController.pagesList.setEach("isAllDepartmentSelected", !0);
		Tawk.liveMonitoringController.countriesList.setEach("isSelected", !0);
		Tawk.liveMonitoringController.agentsList.setEach("isSelected",
			!0);
		Tawk.liveMonitoringController.tagsList.setEach("isSelected", !0);
		this.set("formattedFilter", null);
		this.performFilter()
	},
	visitorCountUpdate: function (a) {
		a && (1 === a.n && notificationController.notifyNewVisitor(), isNaN(parseInt(a.t, 10)) || this.set("totalVisitorsCount", 1E3 > a.t ? a.t : "999+"))
	},
	filterServedList: function () {
		var a, c, d = [], b = this;
		this.isSubscribed && (d = this.filters ? this.allServedList.filter(function (d) {
			var f = !0;
			if (!d.ha) return !1;
			if (null !== b.filters.pages) {
				a = 0;
				for (c = b.filters.pages.length; a < c; a++) {
					var g =
						b.filters.pages[a];
					if (g.pgid !== d.pgid) {
						f = !1;
						break
					}
					if (null !== g.wgid && !g.wgid.contains(d.wgid)) {
						f = !1;
						break
					}
					if (null !== g.dpt && !g.dpt.contains(d.dpt)) {
						f = !1;
						break
					}
				}
				if (!f) return !1
			}
			if (null !== b.filters.countries && !b.filters.countries.contains(d.cc) || null !== b.filters.status && b.filters.status !== d.st) return !1;
			if (null !== b.filters.agents) {
				a = 0;
				for (c = d.al.length; a < c; a++) {
					if (b.filters.agents.contains(d.al[a])) {
						f = !0;
						break
					}
					f = !1
				}
				if (!f) return !1
			}
			if (null !== b.filters.tags) {
				if (!d.tags || !d.tags.length) return !1;
				a = 0;
				for (c = d.tags.length; a <
				c; a++) {
					f = decodeStr(d.tags[a]);
					if (b.filters.tags.contains(f)) {
						f = !0;
						break
					}
					f = !1
				}
				if (!f) return !1
			}
			return !0
		}) : this.allServedList.filterProperty("ha", !0), d.length ? (d.forEach(function (a, c) {
			!b.servedList.contains(a) && a.ha && (c < b.servedList.length - 1 ? b.servedList.insertAt(c, a) : b.servedList.pushObject(a))
		}), this.servedList.removeObjects(this.servedList.filter(function (a) {
			return d.contains(a) ? !1 : !0
		}))) : this.servedList.clear())
	}.observes("filters", "allServedList.length", "isSubscribed"),
	filterUnansweredList: function () {
		var a,
			c, d = [], b = this;
		if (this.isSubscribed) {
			if (this.filters) {
				if (null !== this.filters.agents) {
					this.unansweredList.clear();
					return
				}
				d = this.allUnansweredList.filter(function (d) {
					var f = !0;
					if (null !== b.filters.pages) {
						a = 0;
						for (c = b.filters.pages.length; a < c; a++) {
							var g = b.filters.pages[a];
							if (g.pgid !== d.pgid) {
								f = !1;
								break
							}
							if (null !== g.wgid && !g.wgid.contains(d.wgid)) {
								f = !1;
								break
							}
							if (null !== g.dpt && !g.dpt.contains(d.dpt)) {
								f = !1;
								break
							}
						}
						if (!f) return !1
					}
					if (null !== b.filters.countries && !b.filters.countries.contains(d.cc) || null !== b.filters.status &&
						b.filters.status !== d.st) return !1;
					if (null !== b.filters.tags) {
						if (!d.tags || !d.tags.length) return !1;
						a = 0;
						for (c = d.tags.length; a < c; a++) {
							f = decodeStr(d.tags[a]);
							if (b.filters.tags.contains(f)) {
								f = !0;
								break
							}
							f = !1
						}
						if (!f) return !1
					}
					return !0
				})
			} else d = this.allUnansweredList;
			d.length ? (d.forEach(function (a, c) {
				b.unansweredList.contains(a) || (c < b.unansweredList.length - 1 ? b.unansweredList.insertAt(c, a) : b.unansweredList.pushObject(a))
			}), this.unansweredList.removeObjects(this.unansweredList.filter(function (a) {
				return d.contains(a) ?
					!1 : !0
			}))) : this.unansweredList.clear()
		}
	}.observes("filters", "allUnansweredList.length", "isSubscribed"),
	allUnansweredCount: function () {
		return 1E3 > this.allUnansweredList.length ? this.allUnansweredList.length : "999+"
	}.property("allUnansweredList.length"),
	allServedCount: function () {
		return 1E3 > this.allServedList.length ? this.allServedList.length : "999+"
	}.property("allServedList.length"),
	hasNoFilteredVisitors: function () {
		return 0 === this.allServedList.length && 0 == this.allUnansweredList.length && 0 === this.currentList.length &&
			null !== this.formattedFilter
	}.property("allServedList.length", "allUnansweredList.length", "currentList.length", "formattedFilter"),
	hasNoVisitors: function () {
		return 0 === this.allServedList.length && 0 === this.allUnansweredList.length && 0 === this.currentList.length && null === this.formattedFilter && !1 === this.isLoading
	}.property("currentList.length", "allServedList.length", "allUnansweredList.length", "formattedFilter", "isLoading"),
	changePageStatus: function (a, c, d) {
		var b, e = this;
		b = "site" === a.propertyType ? this.sitesList.findProperty("id",
			a.id) : this.pagesList.findProperty("id", a.id);
		if (c) this.getOngoingConversations(function (c, d) {
			c || e.loadInitialList(d.filterProperty("pgid", a.id));
			!b && e.isSubscribed && e.addProperty(a)
		}); else if (Array.isArray(d) && (d[0] && Array.isArray(d[0])) && d[0].forEach(function (a) {
				e.updateAgentLeft(a)
			}), b && this.isSubscribed) return this.removeProperty(a.id, a.propertyType)
	},
	saveMonitoringTimeout: function (a) {
		socketConnector.saveMonitoringTimeout(a, function (a) {
		})
	},
	stopAllIncomingWebRTCCall: function () {
		var a = this.allUnansweredList.filterProperty("incomingCall",
			!0).concat(this.allServedList.filterProperty("incomingCall", !0));
		a.length && a.setEach("incomingCall", !1)
	},
	openFirstICRByProperty: function (a) {
		var c = this;
		a = this.allUnansweredList.filterProperty("pgid", a);
		a.length && a.every(function (a) {
			return a.isOpen ? !0 : (c.openChat(a._id), !1)
		})
	},
	clearCallWaitingList: function () {
		var a = this;
		this.set("syncCallList", !1);
		this.callStatusWaitList.forEach(function (c) {
			a.callStatusUpdate(c)
		});
		this.callStatusWaitList.clear()
	},
	callStatusUpdate: function (a) {
		var c, d = this, b = function () {
			c =
				visitor.callStatusData[a.clid];
			c && c.ver >= a.ver || (visitor.set("callStatusData." + a.clid, a), visitor.set("incomingCallId", a.clid), "ringing" === a.stts && "v" === a.cllr.t ? (visitor.setProperties({
				incomingCall: !0,
				ongoingCall: !0
			}), visitor.startIncomingCallNotification(a.rt, a.so), visitor.ha || (visitor.isOpen || -1 !== d.allUnansweredList.indexOf(visitor)) || (d.allUnansweredList.pushObject(visitor), d.allServedList.removeObject(visitor), d.subscribedList.removeObject(visitor)), notificationController.showMessageNotification(visitor.n,
				"Incoming Call", a.vsk)) : "in-progress" === a.stts ? visitor.setProperties({
				incomingCall: !1,
				ongoingCall: !0
			}) : "completed" === a.stts && (visitor.setProperties({
				incomingCall: !1,
				ongoingCall: !1
			}), visitor.cr || (d.allUnansweredList.removeObject(visitor), visitor.isOpen && !d.allServedList.contains(visitor) ? d.allServedList.pushObject(visitor) : d.subscribedList.contains(visitor) || d.subscribedList.pushObject(visitor))))
		};
		this.syncCallList ? this.callStatusWaitList.push(a) : a.ignr ? this.callIgnored(a) : ((visitor = this.getSubscribedVisitor(a.vsk) ||
			this.getVisitor(a.vsk)) || (visitor = this.waitingSessions.findProperty("vsk", a.vsk)), visitor ? b() : (visitor = Tawk.VisitorModel.create(), this.waitingSessions.pushObject(visitor), this.subscribeVisitorSession({
			vsk: a.vsk,
			pgid: a.pgid
		}, function (c, f) {
			!c && f[a.vsk] && (visitor.setProperties(f[a.vsk]), visitor.set("isSubscribed", !0), d.waitingSessions.removeObject(visitor), b())
		})))
	},
	callIgnored: function (a) {
		var c = this.getSubscribedVisitor(a.vsk) || this.getVisitor(a.vsk);
		c || (c = this.waitingSessions.findProperty("vsk", a.vsk));
		c && (c.setProperties({
			incomingCall: !1,
			ongoingCall: !1
		}), c.cr || (self.allUnansweredList.removeObject(c), c.isOpen && !self.allServedList.contains(c) ? self.allServedList.pushObject(c) : self.subscribedList.contains(c) || self.subscribedList.pushObject(c)), Tawk.visitorChatController.webRTCCAllIgnored(a))
	}
});
Tawk.liveMonitoringController = Tawk.LiveMonitoringController.create();
Tawk.ChatController = Ember.Controller.extend({
	chatList: [], totalColumns: 1, detailsClosed: null, setTotalColumns: function (a) {
		this.totalColumns !==
		a && this.set("totalColumns", a)
	}, changeColumn: function (a) {
		var c = this, d = parseInt(a, 10);
		if (1 > d || 4 < d) return callback();
		socketConnector.updateWindowCount(d, function (a) {
			a || c.set("totalColumns", d)
		})
	}, getChat: function (a) {
		for (var c = null, d = 0; d < this.chatList.length; d++) if (this.chatList[d]._id === a) {
			c = this.chatList[d];
			break
		}
		return c
	}, getChatByVisitor: function (a) {
		for (var c = null, d = 0; d < this.chatList.length; d++) if (this.chatList[d].vid === a) {
			c = this.chatList[d];
			break
		}
		return c
	}, updateDetailsDisplay: function (a) {
		"undefined" !==
		typeof a ? this.set("detailsClosed", a) : this.set("detailsClosed", !1)
	}, toggleDetailsClosed: function (a) {
		this.set("detailsClosed", a);
		main.updateStorageSettings("closeDetails", a)
	}, chatFocused: function (a, c) {
		if (Tawk.liveMonitoringController.allServedList || this.chatList.length) a ? (this.chatList.setEach("inView", !1), a.set("inView", !0), a.clearUnseen()) : "undefined" !== typeof c && this.chatList.length && (c >= this.chatList.length ? this.chatList.objectAt(c - 1).set("inView", !0) : this.chatList.objectAt(c).set("inView", !0))
	},
	focusNextChat: function () {
		var a, c = this.chatList.findProperty("inView", !0);
		c && 1 !== this.chatList.length && (a = this.chatList.indexOf(c), a = a === this.chatList.length - 1 ? 0 : a + 1, c.set("inView", !1), this.chatList.objectAt(a).setProperties({
			inView: !0,
			show: !0,
			autoFocus: !0
		}))
	}
});
Tawk.chatController = Tawk.ChatController.create();
Tawk.AgentChatController = Ember.Controller.extend({
	chatListBinding: "Tawk.chatController.chatList",
	popoutChatList: [],
	agentChatQueue: [],
	hiddenChatList: [],
	groupMessagesList: [],
	directMessagesListBinding: "Tawk.agentsController.nonHiredAgents",
	inlineGroupChat: !1,
	inlineDirectMessage: !1,
	latestDirectMessagesList: [],
	latestGroupMessagesList: [],
	isProcessing: !0,
	agentsProcessed: function () {
		Tawk.agentsController.agentsProcessed && (this.latestDirectMessagesList.clear(), this.latestGroupMessagesList.clear(), this.groupMessagesList.clear(), this.getGroupsList())
	}.observes("Tawk.agentsController.agentsProcessed"),
	getGroupsList: function () {
		var a, c, d = [], b = this, e = !1, f = moment(), g = [], h = [], k = [], l = [];
		this.set("isProcessing", !0);
		socketConnector.getGroups(function (m,
		                                    n) {
			if (!m) {
				a = n.groups;
				c = n.unseen;
				for (var p = 0; p < a.length; p++) {
					var q, r = a[p], s = [], u = [];
					if ("agent" === r.t) {
						if (2 !== r.p.length) continue;
						q = r.p[0] === Tawk.userController.user.id ? b.directMessagesList.findProperty("id", r.p[1]) : b.directMessagesList.findProperty("id", r.p[0]);
						if (!q) continue;
						q.setProperties({groupId: r.ch, pin: r.pin});
						r.pin ? l.pushObject(q) : r.lmt && 10 >= f.diff(moment(r.lmt), "days") && h.pushObject(q)
					} else {
						(q = b.groupMessagesList.findProperty("groupId", r.ch)) || (q = Tawk.AgentGroupModel.create({
							name: r.n,
							groupId: r.ch
						}));
						q.set("pin", r.pin);
						s.pushObject(Tawk.agentsController.userAgent);
						for (var v = 0; v < r.p.length; v++) {
							var w;
							r.p[v] !== Tawk.userController.user.id && ((w = Tawk.agentsController.getAgent(r.p[v])) ? s.pushObject(w) : u.push(r.p[v]))
						}
						u.length ? b.getUnknownAgentNames(q, u, s) : q.set("participants", sortList(s, "name"));
						d.pushObject(q);
						r.pin ? k.pushObject(q) : r.lmt && 10 >= f.diff(moment(r.lmt), "days") && g.pushObject(q)
					}
					-1 !== c.indexOf(q.groupId) && (q.isGroup && !k.findProperty("groupId", q.groupId) ? (k.pushObject(q), -1 !== g.indexOf(q) &&
					g.removeObject(q)) : q.isGroup || l.findProperty("groupId", q.groupId) || (l.pushObject(q), -1 !== h.indexOf(q) && h.removeObject(q)), q.setProperties({
						newChat: !0,
						unSeen: !0
					}), e = !0)
				}
				e && notificationController.notifyAgentChatMessage();
				10 > k.length && k.pushObjects(g.slice(0, 10 - k.length));
				10 > l.length && l.pushObjects(h.slice(0, 10 - l.length));
				b.latestGroupMessagesList.pushObjects(sortList(k, "groupName"));
				b.latestDirectMessagesList.pushObjects(sortList(l, "name"));
				b.groupMessagesList.pushObjects(d)
			}
			b.set("isProcessing", !1);
			b.clearChatQueue()
		})
	},
	getUnknownAgentNames: function (a, c, d) {
		socketConnector.getAgentNames(c, function (b, c) {
			b || (c.forEach(function (a) {
				d.pushObject(Ember.Object.create({id: a._id, name: a.n, status: "invisible", isOwn: !1}))
			}), a.set("participants", sortList(d, "name")))
		})
	},
	moveChatToFront: function (a) {
		var c = this.popoutChatList.findProperty("groupId", a);
		c && (this.popoutChatList.removeObject(c), this.popoutChatList.pushObject(c), this.showChat(a))
	},
	hideChat: function (a) {
		var c = this.popoutChatList.findProperty("groupId",
			a);
		c && this.hiddenChatList.pushObject(Ember.Object.create({
			groupId: a,
			name: c.isGroup ? c.get("groupName") : c.name
		}))
	},
	showChat: function (a) {
		(a = this.hiddenChatList.findProperty("groupId", a)) && this.hiddenChatList.removeObject(a)
	},
	closeHiddenChat: function (a) {
		var c = this.hiddenChatList.findProperty("groupId", a);
		(a = this.popoutChatList.findProperty("groupId", a)) && c && (this.hiddenChatList.removeObject(c), this.closeChat(a))
	},
	openGroupChat: function (a) {
		var c, d = this;
		if (c = this.groupMessagesList.findProperty("groupId",
				a)) c.setProperties({
			showFlash: !1,
			show: !1,
			focus: !1
		}), Tawk.leftPanel.closeMembersMessageList(!0), c.isOpen ? c.isInline ? (Tawk.chatController.chatFocused(c), c.set("show", !0), window.location.hash = "/chat") : c.set("focus", !0) : (c.setProperties({
			isOpen: !0,
			previousConversationUpdated: !1,
			isProcessingHistory: !0
		}), this.inlineGroupChat ? (c.set("isInline", !0), this.chatList.pushObject(c), Tawk.chatController.chatFocused(c), window.location.hash = "/chat") : (this.set("isInline", !1), this.popoutChatList.pushObject(c)), this.addGroupToLatest(c),
			socketConnector.loadGroupChatHistory({groupId: c.groupId}, function (a, e) {
				a ? (c.set("loadError", !0), c.set("isProcessingHistory", !1)) : (c.processHistory(e), c.lastCorrectVersion && c.lastCorrectVersion.conversationId && c.lastCorrectVersion.cver && !c.hasMoreUnseen ? d.acknowledgeSeen(c) : c.invited && c.setProperties({
					unSeen: !1,
					newChat: !1,
					hasMoreUnseen: !1
				}))
			}))
	},
	openChat: function (a) {
		var c, d = this;
		if (c = this.directMessagesList.findProperty("id", a)) c.setProperties({
			showFlash: !1,
			show: !1,
			focus: !1
		}), Tawk.leftPanel.closeMembersMessageList(!0),
			c.isOpen ? c.isInline ? (Tawk.chatController.chatFocused(c), c.set("show", !0), window.location.hash = "/chat") : c.set("focus", !0) : (c.setProperties({
				isOpen: !0,
				previousConversationUpdated: !1,
				isProcessingHistory: !0
			}), this.inlineDirectMessage ? (c.set("isInline", !0), this.chatList.pushObject(c), Tawk.chatController.chatFocused(c), window.location.hash = "/chat") : (c.set("isInline", !1), this.popoutChatList.pushObject(c)), this.addAgentToLatest(c), socketConnector.loadAgentChatHistory({receiverId: c.id}, function (a, e) {
				a ? (c.set("loadError",
					!0), c.set("isProcessingHistory", !1)) : (c.set("loadError", !1), c.processHistory(e), c.lastCorrectVersion && (c.lastCorrectVersion.conversationId && c.lastCorrectVersion.cver && !c.hasMoreUnseen) && d.acknowledgeSeen(c))
			}))
	},
	closeChat: function (a) {
		var c;
		a.isInline ? (a.inView && (c = this.chatList.indexOf(a)), this.chatList.removeObject(a), Tawk.chatController.chatFocused(null, c)) : this.popoutChatList.removeObject(a);
		a.setProperties({isOpen: !1, inView: !1, newMessage: !1, showFlash: !1, show: !1, isInline: !1});
		a.draftText ? a.set("hasDraft",
			!0) : a.set("hasDraft", !1);
		a.clearConversations()
	},
	popInChat: function (a) {
		a.set("isInline", !0);
		this.popoutChatList.removeObject(a);
		Tawk.chatController.chatFocused(a);
		this.chatList.pushObject(a);
		"chat" !== Tawk.routeManager.get("currentState.name") && (window.location.hash = "/chat")
	},
	popOutChat: function (a) {
		var c;
		a.inView && (c = this.chatList.indexOf(a));
		a.setProperties({isInline: !1, inView: !1});
		this.popoutChatList.pushObject(a);
		this.chatList.removeObject(a);
		Tawk.chatController.chatFocused(null, c)
	},
	loadAgentChatHistory: function (a,
	                                c, d) {
		var b = {}, e = this, f = this.chatList.findProperty("groupId", a);
		done = function (a, b) {
			if (a) return f.set("loadError", !0), f.set("isProcessingHistory", !1), d();
			f.set("loadError", !1);
			f.processOlderHistory(b, !0);
			f.hasMoreUnseen || e.acknowledgeSeen(f);
			return d()
		};
		d = d || function () {
		};
		f || (f = this.popoutChatList.findProperty("groupId", a));
		if (!f || !f.hasOlder && !f.loadError) return d();
		f.set("previousConversationUpdated", !1);
		c && (b.before = c);
		f.isGroup ? (b.groupId = a, socketConnector.loadGroupChatHistory(b, done)) : (b.receiverId =
			f.id, socketConnector.loadAgentChatHistory(b, done))
	},
	getAgentList: function (a) {
		var c = [];
		this.directMessagesList.forEach(function (d) {
			d.id === a || d.isHiredOnly || c.pushObject(Ember.Object.create({
				id: d.id,
				name: d.name,
				isSelected: !1,
				isShown: !0,
				status: d.get("status")
			}))
		});
		return c
	},
	updateAgentChatMessages: function (a, c, d, b) {
		var e, f = this;
		e = c.cver;
		b = b || function () {
		};
		if (this.isSyncingAgentChat) return this.agentChatQueue.push({chat: a, messageData: c}), b();
		if (!a && (a = "s" === c.ctyp ? this.directMessagesList.findProperty("groupId",
				c.ch) : this.groupMessagesList.findProperty("groupId", c.ch), !a)) return b();
		if (!a.isOpen && d) return a.setProperties({newChat: !0, unSeen: !0}), b();
		"string" === typeof c.co && (c.co = new Date(c.co));
		if (a.lastCorrectVersion && a.lastCorrectVersion.conversationId === c.cid && a.lastCorrectVersion.cver === e) return b();
		if (!a.lastCorrectVersion || a.lastCorrectVersion.co <= c.co && (a.lastCorrectVersion.conversationId !== c.cid || a.lastCorrectVersion.conversationId === c.cid && a.lastCorrectVersion.cver === e - 1)) return d && (a.set("newMessage",
			!0), a.incomingMessage(c)), a.updateChatMessages(c), b();
		f.set("isSyncingAgentChat", !0);
		e = {
			chunkId: a.lastCorrectVersion.conversationId,
			version: a.lastCorrectVersion.cver,
			lastMsgTime: a.lastCorrectVersion.co
		};
		a.isGroup ? e.groupId = a.groupId : e.receiverId = a.id;
		socketConnector.syncAgentChat(a.isGroup, e, function (e, h) {
			if (e || !h || !h.chunks) return b();
			h.chunks = h.chunks.reverse();
			for (var k = 0; k < h.chunks.length; k++) for (var l = h.chunks[k], m = 0; m < l.c.length; m++) {
				var n = l.c[m];
				if (l.cid !== c.cid || n.cv !== c.cver) a.updateChatMessages(n),
					a.incomingMessage(n)
			}
			d && (a.set("newMessage", !0), a.incomingMessage(c));
			a.updateChatMessages(c);
			f.set("isSyncingAgentChat", !1);
			f.clearChatQueue();
			b()
		})
	},
	clearChatQueue: function () {
		var a;
		0 !== this.agentChatQueue.length && (a = this.agentChatQueue.shift(), this.updateAgentChatMessages(a.chat, a.messageData, !0))
	},
	sendMessage: function (a, c) {
		var d, b = null, e = this, f = function (c, f) {
			var k;
			if (c) return b.first().html('<i class="fa fa-warning txt-color-red"></i>');
			d.cver = f.cver;
			d.cid = f._id;
			d.groupId = f.ch;
			d.co = new Date;
			e.updateAgentChatMessages(a,
				d);
			k = moment(Date.now()).format("HH:mm");
			a.lastBlock && (!a.lastBlock.timeVal || a.lastBlock.timeVal && a.lastBlock.timeVal !== k) ? (b.first().html(k), a.lastBlock.timeVal = k) : b.first().html("")
		};
		c && (d = {
			uid: Tawk.userController.user.id,
			ut: "a",
			t: "c",
			n: languageParser.translate("generic", "me"),
			m: encodeStr(c),
			md: {rsc: Tawk.userController.user.resourceId}
		}, b = a.addToMessageBlock(d), a.set("invited", !1), b && (a.isGroup ? socketConnector.sendGroupChatMessage(a.groupId, c, f) : socketConnector.sendAgentMessage(a.id, c, f)))
	},
	incomingAgentMessage: function (a) {
		var c,
			d = this;
		if (this.isProcessing) this.agentChatQueue.push({messageData: a}); else {
			if ("s" === a.ctyp) {
				c = this.directMessagesList.findProperty("id", a.uid);
				if (!c) return;
				this.addAgentToLatest(c)
			} else {
				c = this.groupMessagesList.findProperty("groupId", a.ch);
				if (!c) return this.restartAgentGroupChat(a.ch);
				this.addGroupToLatest(c)
			}
			c.set("groupId", a.ch);
			c.set("invited", !1);
			a.uid === Tawk.userController.user.id ? c.isOpen && (a.n = languageParser.translate("generic", "me"), d.updateAgentChatMessages(c, a, !0)) : c.isOpen ? c.hasMoreUnseen ?
				d.updateAgentChatMessages(c, a, !0) : d.updateAgentChatMessages(c, a, !0, function () {
					d.acknowledgeSeen(c)
				}) : (notificationController.notifyAgentChatMessage(a.n, a.m, "s" === a.ctyp ? a.uid : c.groupId), c.set("newChat", !0), c.set("unSeen", !0), Tawk.leftPanel && Tawk.leftPanel.$() && Tawk.leftPanel.$().trigger("unseen-messages"))
		}
	},
	addGroup: function (a) {
		this.groupMessagesList.findProperty("groupId", a.groupId) || this.groupMessagesList.pushObject(a)
	},
	startGroupChat: function (a, c, d) {
		var b, e = this;
		d = d || function () {
		};
		socketConnector.startGroupChat({
			receiverIds: c.getEach("id"),
			name: a
		}, function (f, g) {
			if (f) return d(f);
			b = Tawk.AgentGroupModel.create({name: a, participants: c, groupId: g.ch, groupVersion: g.cver});
			e.addGroup(b);
			e.openGroupChat(b.groupId);
			d()
		})
	},
	removeInvitedAgents: function (a, c) {
		var d = c.getEach("id"), b = [];
		a.forEach(function (a) {
			d.contains(a.id) || b.pushObject(a)
		});
		return b
	},
	addAgentsToExistingGroup: function (a, c, d) {
		var b = this.chatList.findProperty("groupId", a) || this.popoutChatList.findProperty("groupId", a);
		d = d || function () {
		};
		if (!b) return d(!0);
		c.setEach("isOwn", !1);
		socketConnector.inviteAgentGroupChat(a,
			c.getEach("id"), function (a) {
				if (a) return d(a);
				b.participants.pushObjects(c);
				return d()
			})
	},
	addAgentToExistingGroups: function (a, c, d) {
		var b = this.groupMessagesList.findProperty("groupId", a);
		d = d || function () {
		};
		if (!b) return d(!0);
		socketConnector.inviteAgentGroupChat(a, [c.id], function (a) {
			if (a) return d(a);
			b.participants.pushObject(c);
			return d()
		})
	},
	restartAgentGroupChat: function (a) {
		var c = this;
		socketConnector.getAgentGroupChatDetails([a], function (d, b) {
			!d && (b && b.length) && (b[0].ch = a, c.groupChatInvitation(b[0]))
		})
	},
	addGroupToLatest: function (a) {
		var c = this, d = !1;
		-1 === this.latestGroupMessagesList.indexOf(a) && (this.latestGroupMessagesList.every(function (b, e) {
			return a.get("groupName").toLowerCase() < b.get("groupName").toLowerCase() ? (c.latestGroupMessagesList.insertAt(e, a), d = !0, !1) : !0
		}), d || this.latestGroupMessagesList.pushObject(a))
	},
	addAgentToLatest: function (a) {
		var c = this, d = !1;
		-1 === this.latestDirectMessagesList.indexOf(a) && (this.latestDirectMessagesList.every(function (b, e) {
			return a.name.toLowerCase() < b.name.toLowerCase() ?
				(c.latestDirectMessagesList.insertAt(e, a), d = !0, !1) : !0
		}), d || this.latestDirectMessagesList.pushObject(a))
	},
	groupChatInvitation: function (a) {
		var c, d = [], b = [], e = this, f = function () {
			c = e.groupMessagesList.findProperty("groupId", a.ch);
			c || (c = Tawk.AgentGroupModel.create({
				name: a.n,
				participants: d,
				groupId: a.ch,
				invited: !0
			}), e.addGroup(c));
			c.set("newChat", !0);
			e.addGroupToLatest(c);
			notificationController.notifyAgentChatMessage(c.get("groupName"), languageParser.translate("agent_chat", "invited_group"), a.ch)
		};
		d.push({
			id: Tawk.userController.user.id,
			name: Tawk.userController.user.fullName, status: "online", isOwn: !0
		});
		a.p.forEach(function (a) {
			var c;
			a !== Tawk.userController.user.id && ((c = Tawk.agentsController.getAgent(a)) ? d.push({
				id: c.id,
				name: c.name,
				status: c.get("status"),
				isOwn: !1
			}) : b.push(a))
		});
		if (!b.length) return f();
		socketConnector.getAgentNames(b, function (a, b) {
			a || (b.forEach(function (a) {
				d.pushObject({id: a._id, name: a.n, status: "invisible", isOwn: !1})
			}), f())
		})
	},
	leaveGroup: function (a) {
		var c = this, d = this.groupMessagesList.findProperty("groupId", a);
		d && socketConnector.leaveAgentGroupChatPermanent(a,
			function (a) {
				a || (c.groupMessagesList.removeObject(d), c.latestGroupMessagesList.removeObject(d), d.isInline ? c.chatList.removeObject(d) : c.popoutChatList.removeObject(d))
			})
	},
	updateGroupInformation: function (a) {
		var c = this.groupMessagesList.findProperty("groupId", a.ch), d = [], b = [], e = function () {
			b.length && c.set("participants", sortList(b, "name"))
		};
		if (c && !(c.groupVersion > a.cver)) {
			c.set("groupVersion", a.cver);
			a.n && c.set("name", a.n);
			b.pushObject(Tawk.agentsController.userAgent);
			a.p.forEach(function (a) {
				var c = Tawk.agentsController.getAgent(a);
				a !== Tawk.userController.user.id && (c ? b.pushObject(c) : d.push(a))
			});
			if (!d.length) return e();
			socketConnector.getAgentNames(d, function (a, c) {
				a || (c.forEach(function (a) {
					b.pushObject({id: a._id, name: a.n, status: "invisible", isOwn: !1})
				}), e())
			})
		}
	},
	hiddenNewMessage: function (a) {
		(a = this.hiddenChatList.findProperty("groupId", a)) && a.set("newMessage", !0)
	},
	actions: {
		showHiddenChat: function (a) {
			var c = this.hiddenChatList.findProperty("groupId", a);
			a = this.popoutChatList.findProperty("groupId", a);
			c && a && (a.isGroup ? this.openGroupChat(a.id) :
				this.openChat(a.id))
		}
	},
	saveGroupChatName: function (a, c, d) {
		var b = this, e = this.groupMessagesList.findProperty("groupId", a);
		if (!e) return d(!0);
		socketConnector.saveGroupChatName({name: c, groupId: a}, function (a) {
			if (a) return d(!0);
			e.set("name", c);
			b.addGroupToLatest(e);
			d()
		})
	},
	saveChatViewSettings: function (a, c) {
		var d = {}, b = this;
		d[a] = c ? "max" : "min";
		socketConnector.saveAgentChatSettings(d, function (d) {
			d || ("groupView" === a ? b.set("inlineGroupChat", c) : b.set("inlineDirectMessage", c))
		})
	},
	acknowledgeSeen: function (a, c) {
		c =
			c || function () {
			};
		socketConnector.acknowledgeAgentMessage(a.groupId, a.lastCorrectVersion.conversationId, a.lastCorrectVersion.cver, function () {
			a.setProperties({unSeen: !1, newChat: !1, hasMoreUnseen: !1});
			c()
		})
	},
	pinChatToSidebar: function (a, c) {
		var d = this, b = this.groupMessagesList.findProperty("groupId", a), e = function () {
			b.set("pin", !0);
			b.isGroup ? d.addGroupToLatest(b) : d.addAgentToLatest(b)
		};
		if (b) {
			if (c) return e();
			socketConnector.pinGroupChat({groupId: a}, function (a) {
				a || e()
			})
		} else if (b = this.directMessagesList.findProperty("id",
				a)) {
			if (c) return e();
			socketConnector.pinDMChat({receiverId: a}, function (a) {
				a || e()
			})
		}
	},
	unpinChatToSidebar: function (a, c) {
		var d = this.groupMessagesList.findProperty("groupId", a), b = function () {
			d.set("pin", !1)
		};
		if (d) {
			if (c) return b();
			socketConnector.unpinGroupChat({groupId: a}, function (a) {
				a || b()
			})
		} else if (d = this.directMessagesList.findProperty("id", a)) {
			if (c) return b();
			socketConnector.unpinDMChat({receiverId: a}, function (a) {
				a || b()
			})
		}
	}
});
Tawk.agentChatController = Tawk.AgentChatController.create();
Tawk.VisitorChatController =
	Ember.Controller.extend(Tawk.HistoryInterface, {
		chatListBinding: "Tawk.chatController.chatList",
		totalColumns: 1,
		uploadHandles: {},
		detailsClosed: null,
		detailsClosedTriggered: null,
		visitorTimeInterval: null,
		syncCallUpdate: {},
		getChat: function (a) {
			for (var c = null, d = 0; d < this.chatList.length; d++) if (this.chatList[d]._id === a) {
				c = this.chatList[d];
				break
			}
			return c
		},
		getChatByVisitor: function (a) {
			for (var c = null, d = 0; d < this.chatList.length; d++) if (this.chatList[d].vid === a) {
				c = this.chatList[d];
				break
			}
			return c
		},
		hasJoinedConversation: function () {
			return 0 <
				this.chatList.filterProperty("hasJoinedConversation", !0).length
		},
		openChat: function (a) {
			var c;
			a.setProperties({showFlash: !1, isNewMessage: !1, show: !1, unSeen: !1});
			Tawk.leftPanel.closeMembersMessageList(!0);
			Tawk.chatController.chatFocused(a);
			if (this.getChat(a._id)) a.set("show", !0), window.location.hash = "/chat"; else {
				this.chatList.pushObject(a);
				a.set("isOpen", !0);
				a.set("messagePreview", null);
				a.set("isProcessingHistory", !0);
				a.processHistory();
				a.updateVisitorLocalTime();
				Tawk.webProperties.getAlert(a.pgid, function (c) {
					a.set("newAlertContent",
						c)
				});
				for (c in a.profiles) -1 === a.agentProfileIds.indexOf(c) && (a.agentProfiles.pushObject(a.profiles[c]), a.agentProfileIds.push(c));
				a.pgid === Tawk.webProperties.personalPage.id ? a.set("isPersonalPage", !0) : (c = Tawk.userController.defaultAlias, a.set("isPersonalPage", !1), Tawk.userController.aliases.forEach(function (c) {
					-1 === a.agentProfileIds.indexOf(c.aliasId) && c.enabled && (a.agentProfiles.pushObject(c), a.agentProfileIds.push(c.aliasId))
				}), a.agentProfiles.removeObject(c), a.agentProfiles.insertAt(0, c));
				"chat" !==
				Tawk.routeManager.get("currentState.name") && (window.location.hash = "/chat");
				null === this.visitorTimeInterval && this.startVisitorTimeInterval()
			}
		},
		closeChat: function (a) {
			var c;
			if (a = this.getChat(a)) a.inView && (c = this.chatList.indexOf(a)), this.chatList.removeObject(a), a.setProperties({
				isOpen: !1,
				inView: !1,
				show: !1,
				unSeen: !1,
				showFlash: !1,
				isNewMessage: !1
			}), Tawk.chatController.chatFocused(null, c), a.hasJoinedConversation ? this.leaveChat(a) : this.unsubscribeChat(a), 0 === this.chatList.length && (this.stopVisitorTimeInterval(),
				Tawk.routeManager.goToPreviousView())
		},
		restartChat: function (a, c) {
			if (-1 !== this.chatList.indexOf(a) && (a.set("hasJoinedConversation", !1), a.set("isVisitorPresent", !0), a.set("messagePreview", null), a.set("conversationUpdated", !1), !a.isPersonalPage)) {
				var d = Tawk.userController.defaultAlias;
				-1 === a.agentProfileIds.indexOf(d.aliasId) && (d.set("isDefault", !0), a.agentProfiles.insertAt(0, d), a.agentProfileIds.push(d.aliasId));
				Tawk.userController.aliases.forEach(function (b) {
					-1 === a.agentProfileIds.indexOf(b.aliasId) &&
					b.enabled && (a.agentProfiles.pushObject(b), a.agentProfileIds.push(b.aliasId))
				})
			}
		},
		leaveChat: function (a) {
			var c;
			if (a && a.hasJoinedConversation) return a.set("hasJoinedConversation", !1), c = {
				sessionKey: a._id,
				pageId: a.pgid,
				agentDisplayName: a.get("_agentName")
			}, 1 < a.get("joinedFromOtherResource") ? c.subscribe = !1 : c.subscribe = !0, a.ongoingCall && (a.set("ongoingCall", !1), endWebRTCCall()), socketConnector.leaveConversation(c, function (c, b) {
				Tawk.liveMonitoringController.unsubscribeVisitorSession(a)
			})
		},
		unsubscribeChat: function (a) {
			!a ||
			a.hasJoinedConversation || 0 < a.get("joinedFromOtherResource") || a.cr || (a.ha ? socketConnector.unsubscribeVisitorMessage(a._id, a.pgid, function (a) {
			}) : Tawk.liveMonitoringController.removeFromServed(a._id))
		},
		joinChat: function (a, c, d, b) {
			var e = null, e = {}, e = c ? c : Tawk.userController.defaultAlias;
			if (!e) return b(!0);
			a.set("_agentName", e.displayName);
			e = {
				sessionKey: a._id,
				pageId: a.pgid,
				agentProfileId: e.aliasId,
				agentDisplayName: decodeStr(e.displayName),
				agentProfileImage: e.aliasImage,
				agentPosition: null !== e.positionTitle ?
					decodeStr(e.positionTitle) : "",
				forceJoin: d
			};
			return socketConnector.joinConversation(e, function (c, d) {
				if (c) return b(c);
				void 0 === c && void 0 === d && a.set("hasJoinedConversation", !0);
				a.set("ignore", !1);
				b();
				if (d) return a.incomingMessage(d)
			})
		},
		sendMessage: function (a, c, d) {
			var b, e = null, f = null;
			c && (e = this.getChat(a)) && (b = d ? encodeStr(Tawk.userController.user.fullName) : e._agentName, f = e.addToMessageBlock({
				uid: Tawk.userController.user.id,
				ut: "a",
				t: "c",
				n: b,
				m: encodeStr(c),
				md: {rsc: Tawk.userController.user.resourceId, ao: d},
				vsk: a
			}), e.set("isOwn", !0), f && socketConnector.sendVisitorMessage({
				sessionKey: e._id,
				pageId: e.pgid,
				aliasName: decodeStr(b),
				message: c,
				agentOnly: d
			}, function (a, b) {
				var c, d = f.first();
				if (a) return e = null, d.html('<i class="fa fa-warning txt-color-red"></i>');
				e.get("c") ? e.get("c").push(b) : e.set("c", [b]);
				e.set("cver", b.cver);
				e.set("lastSeenChat", b.cver);
				c = moment(b.co).format("HH:mm");
				e.lastBlock && (!e.lastBlock.timeVal || e.lastBlock.timeVal && e.lastBlock.timeVal !== c) ? (d.html(c), e.lastBlock.timeVal = c) : d.html("");
				e =
					null
			}))
		},
		incomingMessage: function (a) {
			var c = this.getChat(a.vsk);
			if ("WEBRTC_CALL" === a.m && a.md && a.md.webrtc) return this.webRTCIncomingCall(c, a);
			if ("VISITOR_NAVIGATION" === a.m) c ? c.changePageUrl(a) : Tawk.liveMonitoringController.queueMessageUrl(a); else if ("CHAT_ENDED" === a.m) {
				if (!c) return;
				c.chatEnded(a.md)
			}
			c || (c = Tawk.liveMonitoringController.getSubscribedVisitor(a.vsk) || Tawk.liveMonitoringController.getVisitor(a.vsk));
			c && c.incomingMessage(a)
		},
		showMessagePreview: function (a) {
			var c = this.getChat(a.vsk);
			c && c.set("messagePreview",
				emojione.toImage(a.msg))
		},
		agentIsTyping: function (a) {
			var c, d = this.getChat(a.vsk);
			d && (c = d.typingAgents.findProperty("agentId", a.aid), c || (c = {
				uid: a.aid,
				md: {rsc: a.rsc, ao: !!a.ao},
				vsk: a.vsk
			}, c = encodeStr(decodeStr(Tawk.agentsController.getAgentNameForMessage(c))), d.typingAgents.pushObject(Ember.Object.create({
				agentId: a.aid,
				message: a.ao ? languageParser.translate("visitors", "agent_whispering", {name: c}) : languageParser.translate("visitors", "agent_typing", {name: c})
			}))))
		},
		agentStoppedTyping: function (a) {
			var c = this.getChat(a.vsk);
			c && (a = c.typingAgents.findProperty("agentId", a.aid)) && c.typingAgents.removeObject(a)
		},
		updateAgentPresence: function (a) {
			var c, d = this.getChat(a.vsk) || Tawk.liveMonitoringController.getSubscribedVisitor(a.vsk);
			d && (d.incomingMessage(a), a.md.pid && (conversationProcess.processAgentPresence(a, d.agentPrensence, d.agents, d.profiles), c = {
				aliasId: a.md.pid,
				displayName: a.n,
				positionTitle: a.md.pst,
				aliasImage: a.md.pi
			}, -1 === d.agentProfileIds.indexOf(c.aliasId) && (d.agentProfiles.pushObject(c), d.agentProfileIds.push(c.aliasId)),
			a.md.rsc === Tawk.userController.user.resourceId && d.set("_agentName", a.n)))
		},
		banVisitor: function (a, c, d, b) {
			Tawk.liveMonitoringController.banVisitor(a, c, d, function (c) {
				if (c) return b(c);
				a.set("b", !0);
				a.set("hasJoinedConversation", !1);
				a.set("isVisitorPresent", !1);
				a.set("messagePreview", null);
				b()
			})
		},
		showTranscript: function (a, c, d, b) {
			var e = this.getChat(a);
			if (!e) return b(!0);
			a = e.historyList.getItem(c);
			if (!d && !a) return b(!0);
			loadTranscript(c, e.pgid, function (a) {
				if (!a) return b(!0);
				b(null, a)
			})
		},
		printTranscript: function (a) {
			printTranscript(a)
		},
		getCopyFormat: function (a) {
			getCopyFormat(a)
		},
		changeColumn: function (a) {
			var c = this, d = parseInt(a, 10);
			if (1 > d || 4 < d) return callback();
			socketConnector.updateWindowCount(d, function (a) {
				a || c.set("totalColumns", d)
			})
		},
		updateAlias: function (a) {
			for (var c, d, b = this.chatList.filterProperty("isPersonalPage", !1), e = 0; e < b.length; e++) d = b[e], c = d.agentProfiles.findProperty("aliasId", a.aliasId), a.enabled ? (a.isDefault ? (d.agentProfiles.setEach("isDefault", !1), d.agentProfiles.removeObject(c), d.agentProfiles.insertAt(0, a)) : d.agentProfiles.pushObject(a),
			-1 === d.agentProfileIds.indexOf(a.aliasId) && d.agentProfileIds.push(a.aliasId)) : c && (d.agentProfiles.removeObject(c), d.agentProfileIds.removeAt(d.agentProfileIds.indexOf(c.aliasId)))
		},
		deleteAliases: function (a) {
			for (var c, d, b = this.chatList.filterProperty("isPersonalPage", !1), e = 0; e < b.length; e++) {
				c = b[e];
				for (var f = 0; f < a.alsids.length; f++) if (d = a.alsids[f], d = c.agentProfiles.findProperty("aliasId", d)) c.agentProfiles.removeObject(d), c.agentProfileIds.removeAt(c.agentProfileIds.indexOf(d.aliasId))
			}
		},
		addHandle: function (a,
		                     c) {
			this.getChat(c) && this.set("uploadHandles." + a, c)
		},
		uploadComplete: function (a) {
			var c, d = this, b = this.uploadHandles[a.handle];
			b && (c = this.getChat(b)) && (delete this.uploadHandles[a.handle], socketConnector.sendFileUpload(b, c.pgid, c._agentName, {
				fileName: a.filename,
				name: a.name,
				type: a.extension,
				mimeType: a.mimeType,
				size: a.size
			}, function (b, c) {
				b || (Tawk.visitorChatContainerView.uploadComplete(a.handle), d.incomingMessage(c))
			}))
		},
		updateAttribute: function (a) {
			var c = [], d = this.getChat(a.vsk);
			!d || d.customAttributes.version >
			a.attrv || (Object.keys(a.attr).forEach(function (b) {
				null !== a.attr[b] && c.pushObject({key: beautifyAPIKey(b), value: beautifyAPIValue(a.attr[b])})
			}), d.set("customAttributes.data", c), d.set("customAttributes.version", a.attrv))
		},
		getTagListForChat: function (a, c) {
			var d = [], b = this.getChat(a);
			if (!b) return c(!0);
			socketConnector.getChatTagsByProperty(b.pgid, function (a, b) {
				if (a) return c(a);
				b.forEach(function (a) {
					d.push(decodeStr(a))
				});
				return c(null, d)
			})
		},
		updateChatTags: function (a, c, d) {
			var b = this.getChat(a), e = [], f = [];
			if (!b) return d(!0);
			b.tags && b.tags.length ? (c.forEach(function (a) {
				-1 === b.tags.indexOf(a) && e.push(a)
			}), b.tags.forEach(function (a) {
				-1 === c.indexOf(a) && f.push(a)
			})) : e = c;
			if (0 === e.length && 0 === f.length) return d();
			socketConnector.updateOpenedChatTags(a, b.pgid, e, f, function (a, c) {
				var e = [];
				a || (c.tags.forEach(function (a) {
					e.push(decodeStr(a))
				}), b.setProperties({tags: c.tags, tagsv: c.tagsv}));
				return d(a)
			})
		},
		createTicket: function (a, c, d) {
			socketConnector.createTicket(a.propertyId, a, function (b, c) {
				if (b) return d(!0);
				socketConnector.getTicket(a.propertyId,
					c.ticketId, function (a, b) {
						if (a) return d(null);
						d(null, b.hId)
					})
			})
		},
		getTicketTagListForProperty: function (a, c) {
			var d = [];
			socketConnector.getTags(a, function (a, e) {
				!a && e.tags.length && e.tags.forEach(function (a) {
					d.push(decodeStr(a))
				});
				c(a, d.sort())
			})
		},
		notifyAlertInChat: function (a, c) {
			var d = this.chatList.filterProperty("pgid", a);
			d.length && d.forEach(function (a) {
				a.set("newAlertContent", c)
			})
		},
		disconnectWebRTC: function () {
			this.webrtcWin && this.webrtcWin.close()
		},
		declineCall: function (a, c) {
			var d = {propertyId: a.pgid, callId: a.incomingCallId};
			c = c || function () {
			};
			a.setProperties({incomingCall: !1, incomingCallId: null});
			socketConnector.rejectCall(d, function (a, d) {
				if (a) return c(!0);
				c()
			})
		},
		loadPropertyHistory: function (a, c, d) {
			var b = [];
			d = d || function () {
			};
			c.includeTickets = !1;
			c.includeChats = !0;
			c.sort = sortType.UPDATE_DESC;
			c.assigneeId && (c.assignees = "0" === c.assigneeId ? [] : "hired_agent" === c.assigneeId ? Tawk.webProperties.getHiredAgentsIds(a) : [c.assigneeId], delete c.assigneeId);
			socketConnector.getConversationsList(a, c, function (a, c) {
				if (a) return d(!0);
				c.hits.forEach(function (a) {
					a.time =
						formatDate(a.updatedOn);
					a.agentsName = Tawk.agentsController.getAgentsName(a.agents).join(", ");
					b.pushObject(Ember.Object.createWithMixins(a))
				});
				d(null, {list: b, total: c.total})
			})
		},
		getPropertyAgents: function (a) {
			var c = [], d = !1, b = Tawk.webProperties.getProperty(a);
			b && (b.currentAgents.forEach(function (a) {
				a.en && (!b.isClientProperty && a.ha ? d = !0 : c.pushObject(Ember.Object.create({
					id: a.aid,
					name: decodeStr(Tawk.agentsController.getName(a.aid))
				})))
			}), d && c.pushObject(Ember.Object.create({id: "hired_agent", name: "Hired Agents"})));
			return sortList(c, "name")
		},
		addAttachment: function (a, c, d, b, e, f) {
			var g;
			f && (b ? g = "new-ticket" : e(!0), fileUploader.uploadAttachment(a, c, f, g, d, function (a, b) {
				a && e(!0, b);
				e()
			}))
		},
		startVisitorTimeInterval: function () {
			var a, c, d = this, b = new Date, b = 6E4 - 1E3 * b.getSeconds() + b.getMilliseconds();
			this.stopVisitorTimeInterval();
			this.set("visitorTimeInterval", setTimeout(function () {
				a = 0;
				for (c = d.chatList.length; a < c; a++) d.chatList[a].isAgentChat || d.chatList[a].updateVisitorLocalTime();
				d.startVisitorTimeInterval()
			}, b))
		},
		stopVisitorTimeInterval: function () {
			clearTimeout(this.visitorTimeInterval);
			this.set("visitorTimeInterval", null)
		},
		webRTCIncomingCall: function (a, c) {
			var d = $(HandlebarsTemplates.callDetailsView({callId: c.md.clid}));
			a.set("syncCallData", !0);
			a.set("newBlock", d);
			conversationProcess.processWebRTCCallBlock(c.md.clid, a.pgid, d, !0, function (b, d) {
				a.set("syncCallData", !1);
				d && a.set("callData." + c.md.clid, d)
			})
		},
		webRTCCallUpdate: function (a) {
			var c, d, b = !1, e = this, f = this.getChat(a.vsk);
			f || (Tawk.conversationsController.conversationData && Tawk.conversationsController.conversationData.sk === a.vsk ?
				(f = Tawk.conversationsController.conversationData, b = !0) : Tawk.conversationsController.modalTranscriptData && Tawk.conversationsController.modalTranscriptData.sk === a.vsk && (f = Tawk.conversationsController.modalTranscriptData, b = !0));
			if (f) {
				c = f.callData[a.clid];
				callView = $("#" + a.clid);
				if (f.syncCallData) {
					if ((d = this.syncCallUpdate[a.clid]) && d.ver >= a.ver) return;
					this.syncCallUpdate[a.clid] = a
				}
				if (!c || c.ver !== a.ver - 1) return f.set("syncCallData", !0), conversationProcess.processWebRTCCallBlock(a.clid, f.pgid, callView,
					b ? !1 : !0, function (a, b) {
						f.set("syncCallData", !1);
						if (d = e.syncCallUpdate[b.clid]) delete e.syncCallUpdate[b.clid], e.webRTCCallUpdate(d);
						calllData && f.set("callData." + b.clid, calllData)
					});
				f.set("callData." + a.clid + ".ver", a.ver);
				conversationProcess.displayCallInformation(a.event, c, callView)
			}
		},
		webRTCCAllIgnored: function (a) {
			var c;
			if (c = this.getChat(a.vsk)) if (c = c.callData[a.clid]) a = $("#" + a.clid), a.length && a.find(".webrtc-join-container").removeClass("hidden")
		}
	});
Tawk.visitorChatController = Tawk.VisitorChatController.create();
Tawk.VisitorProperty = Ember.Object.extend({
	id: null, name: null, list: null, init: function () {
		this.set("list", [])
	}, firstCharName: function () {
		return this.name && this.name.length ? this.name.charAt(0) : ""
	}.property("name")
});
Tawk.LeftPanelController = Ember.Controller.extend({
	chatsListBinding: Ember.Binding.oneWay("Tawk.liveMonitoringController.allServedList"),
	chatsListByProperty: [],
	myChatsListByProperty: [],
	chatsList: [],
	urlMessageQueue: [],
	myChatsList: [],
	init: function () {
		this.chatsList.addArrayObserver(this, {
			willChange: this.chatsListWillChange,
			didChange: this.chatsListDidChange
		});
		this.myChatsList.addArrayObserver(this, {
			willChange: this.myChatsListWillChange,
			didChange: this.myChatsListDidChange
		})
	},
	chatsListWillChange: function (a, c, d, b) {
		d = c + d;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) {
			b = a[c];
			var e = this.chatsListByProperty.findProperty("id", b.pgid);
			if (!e) break;
			e.list.removeObject(b)
		}
	},
	chatsListDidChange: function (a, c, d, b) {
		d = c + b;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) {
			b = a[c];
			var e = this.chatsListByProperty.findProperty("id",
				b.pgid);
			e || (e = Tawk.VisitorProperty.create({
				id: b.pgid,
				name: decodeStr(Tawk.webProperties.getPropertyName(b.pgid)),
				isOpen: !0
			}), this.chatsListByProperty.pushObject(e), this.set("chatsListByProperty", sortList(this.chatsListByProperty, "name")));
			e.list.pushObject(b)
		}
	},
	myChatsListWillChange: function (a, c, d, b) {
		d = c + d;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) {
			b = a[c];
			var e = this.myChatsListByProperty.findProperty("id", b.pgid);
			if (!e) break;
			e.list.removeObject(b)
		}
	},
	myChatsListDidChange: function (a, c, d,
	                                b) {
		d = c + b;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) {
			b = a[c];
			var e = this.myChatsListByProperty.findProperty("id", b.pgid);
			e || (e = Tawk.VisitorProperty.create({
				id: b.pgid,
				name: decodeStr(Tawk.webProperties.getPropertyName(b.pgid)),
				isOpen: !0
			}), this.myChatsListByProperty.pushObject(e), this.set("myChatsListByProperty", sortList(this.myChatsListByProperty, "name")));
			e.list.pushObject(b)
		}
	},
	agentHasOngoingChatsForProperty: function (a) {
		return (a = this.myChatsListByProperty.findProperty("id", a)) ? 0 < a.list.length ?
			!0 : !1 : !1
	},
	updatePropertyIsOpen: function (a, c) {
		var d = this.chatsListByProperty.findProperty("id", a);
		d && d.set("isOpen", c)
	},
	totalNewAgentChat: function () {
		return Tawk.agentsController.agents.filterProperty("newChat", !0).length
	}.property("Tawk.agentsController.agents.@each.newChat"),
	totalNewGroupChat: function () {
		return Tawk.agentsController.groups.filterProperty("newChat", !0).length
	}.property("Tawk.agentsController.groups.@each.newChat"),
	allChats: function () {
		return this.chatsList.sortBy("activeTimestamp").reverse()
	}.property("chatsList.@each.activeTimestamp"),
	myChats: function () {
		return this.myChatsList.sortBy("activeTimestamp").reverse()
	}.property("myChatsList.@each.activeTimestamp"),
	participatingAgentChanged: function () {
		var a, c = this;
		a = this.chatsList.filter(function (a) {
			return a.get("participatingAgents").contains(Tawk.userController.user.id) || a.isOpen ? !0 : !1
		});
		a.forEach(function (a) {
			c.myChatsList.contains(a) || c.myChatsList.pushObject(a)
		});
		this.myChatsList.removeObjects(this.myChatsList.filter(function (c) {
			return a.contains(c) ? !1 : !0
		}))
	}.observes("chatsList.@each.participatingAgents.length",
		"chatsList.@each.isOpen"),
	unAnsweredCount: function () {
		return {num: Tawk.liveMonitoringController.allUnansweredList.filterProperty("ignore", !1).length}
	}.property("Tawk.liveMonitoringController.allUnansweredList.@each.ignore"),
	unAnsweredIgnoredCount: function () {
		return {num: Tawk.liveMonitoringController.allUnansweredList.filterProperty("ignore", !0).length}
	}.property("Tawk.liveMonitoringController.allUnansweredList.@each.ignore"),
	hasMoreICR: function () {
		return 1 < Tawk.liveMonitoringController.allUnansweredList.length
	}.property("Tawk.liveMonitoringController.allUnansweredList.length"),
	compressICR: function () {
		var a = [];
		Tawk.liveMonitoringController.allUnansweredList.forEach(function (c) {
			var d = a.findProperty("propertyId", c.pgid);
			d || (d = {
				propertyId: c.pgid,
				propertyName: c.pgn,
				chatsTotal: 0,
				isClientProperty: !!c.isClientProperty
			}, a.pushObject(d));
			d.chatsTotal += 1
		});
		return a
	}.property("Tawk.liveMonitoringController.allUnansweredList.length")
});
Tawk.leftPanelController = Tawk.LeftPanelController.create();
Tawk.IAdminSubViewController = Ember.Mixin.create({
	lastViews: null, getLastViews: function () {
		var a =
			null, c = main.storageSettings["admin-view"];
		if (c) try {
			a = JSON.parse(c)
		} catch (d) {
			a = null
		}
		null === a ? this.set("lastViews", {}) : this.set("lastViews", a)
	}, saveLastSubView: function (a) {
		var c = this.lastViews;
		Tawk.routing.getPath();
		for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
		c.view = "admin";
		main.updateStorageSettings("admin-view", JSON.stringify(c));
		this.set("lastViews", c)
	}
});
Tawk.ShortcutsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	shortcutsList: [],
	filteredList: [],
	pagedList: null,
	activeShortcut: null,
	activeProperty: null,
	currentVersion: 7,
	isReset: !0,
	storedShortcuts: null,
	isGlobalShortcut: null,
	showAddoptionButton: !1,
	optionListChanged: function () {
		this.set("showAddoptionButton", this.activeShortcut && 4 > this.activeShortcut.options.length)
	}.observes("activeShortcut.options.length"),
	init: function () {
		this._super();
		this.resetData()
	},
	initializeShortcuts: function () {
		this.getShortcuts()
	},
	getShortcuts: function (a) {
		var c, d = this, b = [],
			e = main.storageSettings && null !== main.storageSettings.shortcuts ? JSON.parse(main.storageSettings.shortcuts) :
				null;
		a = a || function () {
		};
		if (e) {
			if (!e.currentVersion || e.currentVersion < this.currentVersion) e = {};
			for (var f in e) e[f].public && b.push({
				pgid: f,
				aid: e[f].public.aid,
				scver: e[f].public.scver
			}), e[f].personal && b.push({pgid: f, aid: e[f].personal.aid, scver: e[f].personal.scver})
		} else e = {};
		socketConnector.getShortcutsChanges(b, function (b, f) {
			if (b) setTimeout(function () {
				d.getShortcuts(a)
			}, 0); else {
				if (f.shortcuts && 0 < f.shortcuts.length) for (c = 0; c < f.shortcuts.length; c++) {
					var k = f.shortcuts[c];
					e[k.pgid] || (e[k.pgid] = {});
					"global" ===
					k.pgid ? e[k.pgid].personal = k : e[k.pgid][k.t] = k
				}
				if (f.deactivated && 0 < f.deactivated.length) for (c = 0; c < f.deactivated.length; c++) delete e[f.deactivated[c].pgid];
				e.currentVersion = d.currentVersion;
				main.updateStorageSettings("shortcuts", JSON.stringify(e));
				d.set("storedShortcuts", e);
				a(f)
			}
		})
	},
	openProperty: function (a, c, d) {
		var b = Tawk.routing.getPath();
		this.resetData();
		this.set("isLoading", !0);
		d ? (this.set("isGlobalShortcut", !0), this.set("activeProperty", null)) : (this.set("isGlobalShortcut", !1), this.set("activeProperty",
			a));
		this.set("activeShortcut", null);
		this.set("pagedList", Tawk.PagingListModel.create({perpage: c}));
		this.loadList();
		this.getLastViews();
		Tawk.routing.titlePath.subviewName = languageParser.translate("shortcuts", "view_title");
		Tawk.routing.setTitle();
		this.isGlobalShortcut ? this.saveLastSubView({itemId: null}) : b.itemId ? this.openItem(b.itemId) : this.lastViews && "shortcuts" === this.lastViews.subView && this.lastViews.itemId ? this.openItem(this.lastViews.itemId) : this.saveLastSubView({itemId: null})
	},
	resetData: function () {
		this.set("isReset",
			!0);
		this.set("searchQuery", null);
		this.shortcutsList.clear();
		this.filteredList.clear();
		this.set("activeShortcut", null);
		this.set("activeProperty", null);
		this.set("pagedList", null);
		this.set("isGlobalShortcut", null)
	},
	loadList: function () {
		var a, c, d;
		a = this.storedShortcuts;
		var b = [];
		if (this.activeProperty || this.isGlobalShortcut) {
			this.set("isReset", !1);
			this.pagedList.reset();
			this.pagedList.startList();
			this.shortcutsList.clear();
			d = this.isGlobalShortcut ? "global" : this.activeProperty.id;
			if (c = a[d]) for (var e in c) {
				var f =
					0, g = c[e];
				a = {
					shortcutId: g._id,
					propertyId: d,
					dataType: e,
					dataTypeText: languageParser.translate("shortcuts", e),
					toBeDeleted: !1,
					isGlobal: this.isGlobalShortcut,
					isProfile: this.activeProperty && this.activeProperty.isPersonal
				};
				for (var h in g.scs) if (g.scs[h].sck) {
					a.key = decodeStr(g.scs[h].sck);
					a.shortcutType = "m" === g.scs[h].t ? "message" : "survey";
					a.shortcutTypeText = languageParser.translate("shortcuts", a.shortcutType);
					a.type = g.scs[h].t;
					a.message = decodeStr(g.scs[h].m);
					a.index = f;
					a.options = [];
					a.id = g._id + "-" + a.key;
					if (Array.isArray(g.scs[h].o)) for (var k =
						0; k < g.scs[h].o.length; k++) a.options.pushObject({
						val: decodeStr(g.scs[h].o[k]),
						id: Date.now()
					});
					a.showOptions = a.options.length;
					b.pushObject(Tawk.ShortcutModel.create(a));
					f++
				}
			}
			this.shortcutsList.pushObjects(sortList(b, "key"));
			this.pagedList.setTotal(this.shortcutsList.length);
			this.pagedList.setList(this.getList())
		}
		this.set("isLoading", !1)
	},
	loadNextList: function (a) {
		a = a || function () {
		};
		if (this.pagedList.isLastPage()) return a(null, !1);
		this.set("isLoading", !0);
		this.pagedList.nextList();
		this.pagedList.setList(this.getList());
		this.set("isLoading", !1);
		return a(null, !0)
	},
	getList: function () {
		var a = [];
		return a = this.searchQuery ? this.filteredList.slice(this.pagedList.currentHead, this.pagedList.to) : this.shortcutsList.slice(this.pagedList.currentHead, this.pagedList.to)
	},
	searchList: function (a) {
		var c = !1, d = null, b = null;
		this.set("isLoading", !0);
		this.set("searchQuery", a);
		this.filteredList.clear();
		a.queryString && "/" === a.queryString.charAt(0) ? (c = !0, a.queryString = a.queryString.substring(1, a.queryString.length), b = RegExp("^" + a.queryString,
			"gi")) : b = RegExp(a.queryString, "gi");
		d = this.shortcutsList.filter(function (d) {
			if ((a.isPublic && "public" === d.dataType || a.isPersonal && "personal" === d.dataType) && (a.isSurvey && "s" === d.type || a.isMessage && "m" === d.type)) {
				if (!a.queryString) return !0;
				if (c) return !!d.key.match(b);
				if (d.message.match(b) || d.key.match(b)) return !0
			}
		});
		this.filteredList.pushObjects(d);
		this.pagedList.startList();
		this.pagedList.setList(this.getList());
		this.set("isLoading", !1)
	},
	resetSearch: function () {
		this.set("searchQuery", null);
		this.filteredList.clear();
		this.pagedList.startList();
		this.pagedList.setList(this.getList())
	},
	toggleAllMark: function (a) {
		this.pagedList && (this.activeProperty || this.isGlobalShortcut) && this.pagedList.currentData.setEach("isMarked", a)
	},
	toggleMark: function (a, c) {
		var d = this.pagedList.getItem(a);
		(this.activeProperty || this.isGlobalShortcut) && d && d.set("isMarked", c)
	},
	openItem: function (a) {
		this.shortcutsList && (this.pagedList.currentData.setEach("isMarked", !1), (a = a ? this.shortcutsList.findProperty("id", a) : Tawk.ShortcutModel.create({
			dataType: "public",
			shortcutType: "message",
			options: [],
			isGlobal: this.isGlobalShortcut,
			isProfile: this.activeProperty && this.activeProperty.isPersonal
		})) ? (this.set("activeShortcut", a.copy()), this.activeShortcut.id && this.saveLastSubView({itemId: this.activeShortcut.id}), this.isGlobalShortcut || (this.activeShortcut.id ? (this.saveLastSubView({itemId: this.activeShortcut.id}), Tawk.routing.titlePath.itemName = this.activeShortcut.key) : Tawk.routing.titlePath.itemName = "Add Shortcut", "profile" === this.activeProperty.type ? Tawk.routing.changeRoute({
			view: "account",
			subView: "shortcuts", itemId: this.activeShortcut.id || null
		}) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "shortcuts",
			itemId: this.activeShortcut.id || null,
			widgetId: null
		}), Tawk.routing.setTitle())) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "shortcuts",
			itemId: null,
			widgetId: null
		}))
	},
	closeView: function () {
		if (this.activeShortcut) return this.closeItem(), !1;
		this.resetData();
		return !0
	},
	closeItem: function (a) {
		this.pagedList.currentData.setEach("isMarked",
			!1);
		this.set("activeShortcut", null);
		this.saveLastSubView({itemId: null})
	},
	changeShortcutType: function (a) {
		this.activeShortcut && ("s" === a ? (this.activeShortcut.options.length || this.addOption(), this.activeShortcut.set("showOptions", !0)) : this.activeShortcut.set("showOptions", !1))
	},
	addOption: function () {
		this.activeShortcut && this.activeShortcut.options.pushObject({val: "", id: Date.now()})
	},
	removeOption: function (a) {
		this.activeShortcut && this.activeShortcut.options.removeAt(a)
	},
	saveShortcutFromVisitorChat: function (a,
	                                       c) {
		this.submitShortcutSave(a, c)
	},
	saveShortcut: function (a, c) {
		var d, b;
		this.set("isLoading", !0);
		if (!this.activeProperty && !this.isGlobalShortcut) return this.set("isLoading", !1), c(!0);
		b = this.activeShortcut;
		a.pageId = this.isGlobalShortcut ? "global" : this.activeProperty.id;
		a.shortcutId = b.shortcutId;
		"global" === a.pageId && (a.dataType = "personal");
		b.id && (d = this.shortcutsList.findProperty("id", b.id));
		!d || a.pageId === d.propertyId && a.key === d.key && a.dataType === d.dataType || (a.previousValues = {
			pageId: d.propertyId, dataType: d.dataType,
			key: d.key
		});
		this.submitShortcutSave(a, c)
	},
	submitShortcutSave: function (a, c) {
		var d = this, b = !1, e = this.storedShortcuts[a.pageId];
		if (!a.shortcutId || a.previousValues && a.dataType !== a.previousValues.dataType) b = !0;
		if (b && e && e[a.dataType] && e[a.dataType].scs[a.key]) return this.set("isLoading", !1), c("DUPLICATE_SHORTCUT_KEY");
		socketConnector.saveShortcut(a, function (b, e) {
			if (b) return d.set("isLoading", !1), c(b);
			d.updateShorcutData(e, a.previousValues, c)
		})
	},
	updateShorcutData: function (a, c, d) {
		var b, e, f, g = this.activeShortcut,
			h = this.storedShortcuts, k = !1, l = Tawk.routing.getPath(), m = function (a) {
				e.setProperties({
					id: f,
					key: decodeStr(a.sck),
					shortcutType: "m" === a.t ? "message" : "survey",
					type: a.t,
					message: decodeStr(a.m),
					options: [],
					dataType: a.dt,
					dataTypeText: languageParser.translate("shortcuts", a.dt)
				});
				if (Array.isArray(a.o)) for (var b = 0; b < a.o.length; b++) e.options.pushObject({
					val: decodeStr(a.o[b]),
					id: Date.now()
				});
				e.set("showOptions", e.options.length);
				e.set("shortcutTypeText", languageParser.translate("shortcuts", e.shortcutType))
			};
		d = d ||
			function () {
			};
		f = a._id + "-" + decodeStr(a.sck);
		if (!h) return this.reloadShortcutUpdate(d, a);
		(b = h[a.pgid]) ? b = b[a.dt] : (h[a.pgid] = {}, h[a.pgid][a.dt] = {});
		b || (b = {scs: {}});
		if (b.scver && 1 !== a.scver - b.scver) return this.reloadShortcutUpdate(d, a);
		b.scs[a.sck] || (k = !0);
		b._id = a._id;
		b.pgid = a.pgid;
		b.aid = a.aid;
		b.t = a.dt;
		b.scver = a.scver;
		if (c) {
			if (g) {
				var n = this.shortcutsList.findProperty("id", g.id);
				n && this.shortcutsList.removeObject(n)
			}
			h[c.pageId] && h[c.pageId][c.dataType] && (h[c.pageId][c.dataType].scver++, delete h[c.pageId][c.dataType].scs[encodeStr(c.key)])
		}
		b.scs[a.sck] =
			{sck: a.sck, m: a.m, t: a.t, o: a.o};
		h[a.pgid][a.dt] = b;
		main.updateStorageSettings("shortcuts", JSON.stringify(h));
		this.set("storedShortcuts", h);
		if (this.activeProperty || this.isGlobalShortcut) {
			if (a.otherOrigin) g && f === g.id ? (e = this.shortcutsList.findProperty("id", g.id), m(a)) : this.loadList(), this.set("isLoading", !1); else {
				k ? e = Tawk.ShortcutModel.create({
					id: f,
					shortcutId: a._id,
					toBeDeleted: !1,
					isGlobal: this.isGlobalShortcut,
					isProfile: this.activeProperty && this.activeProperty.isPersonal,
					propertyId: a.pgid
				}) : g && g.id && (e =
					this.shortcutsList.findProperty("id", g.id));
				if (!e) return d();
				m(a);
				k && this.shortcutsList.pushObject(e);
				g && g.id !== e.id && this.reSortList()
			}
			l && ("shortcuts" === l.subView && g && (g.id === f || !a.otherOrigin && k)) && this.openItem(e.id)
		}
		this.set("isLoading", !1);
		d(null, a._id)
	},
	deleteSingle: function (a) {
		var c;
		a = a || function () {
		};
		if (!this.activeShortcut) return a(!0);
		c = this.pagedList.getItem(this.activeShortcut.id);
		if (!c) return a(!0);
		c.set("isMarked", !0);
		this.bulkDelete(function (d) {
			c.set("isMarked", !1);
			a(d)
		})
	},
	bulkDelete: function (a) {
		var c,
			d = this, b = [];
		a = a || function () {
		};
		if (!this.activeProperty && !this.isGlobalShortcut) return a(!0);
		c = this.pagedList.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		checkAndSetConfirmView(!1, function (e) {
			if (!e) return a(!0);
			for (e = 0; e < c.length; e++) b.push({
				pageId: c[e].propertyId,
				dataType: c[e].dataType,
				key: c[e].key
			});
			socketConnector.deleteShortcuts(b, function (b, c) {
				b || d.removeShortcutData(c, a)
			})
		})
	},
	removeShortcutData: function (a, c) {
		var d, b = this.storedShortcuts, e = [];
		c = c || function () {
		};
		Array.isArray(a) ||
		(a = [a]);
		this.set("hasBeenUpdated", !1);
		for (d = 0; d < a.length; d++) {
			var f = a[d];
			this.activeShortcut && this.activeShortcut.id === f._id + "-" + f.sck && (this.set("previousName", this.activeShortcut.key), this.set("activeShortcut", null), this.set("hasBeenUpdated", !0));
			b && (b[f.pgid] && b[f.pgid][f.dt] && b[f.pgid][f.dt].scs[f.sck]) && (delete b[f.pgid][f.dt].scs[f.sck], b[f.pgid][f.dt].scver = f.scver, e.pushObject(this.shortcutsList.findProperty("id", decodeStr(f._id + "-" + f.sck))))
		}
		main.updateStorageSettings("shortcuts", JSON.stringify(b));
		this.set("storedShortcuts", b);
		this.shortcutsList.removeObjects(e);
		(this.activeProperty || this.isGlobalShortcut) && this.reSortList();
		this.set("isLoading", !1);
		c()
	},
	removeShortcutsForProperty: function (a) {
		var c = this.storedShortcuts;
		delete c[a];
		main.updateStorageSettings("shortcuts", JSON.stringify(c));
		this.set("storedShortcuts", c)
	},
	getPropertyShortcuts: function (a) {
		var c, d;
		d = this.storedShortcuts;
		c = [];
		var b = {};
		if (a = d[a]) a.personal && this.formatPropertyShortcuts(a.personal, b), a.public && this.formatPropertyShortcuts(a.public,
			b);
		d.global && d.global.personal && this.formatPropertyShortcuts(d.global.personal, b, !0);
		d = Object.keys(b);
		if (d.length) for (d = d.sort(), a = 0; a < d.length; a++) c.push(b[d[a]]);
		return c
	},
	formatPropertyShortcuts: function (a, c, d) {
		if (!a.scs) return c;
		for (var b in a.scs) {
			var e = a.scs[b], f = b.toLowerCase(), g = "";
			if (!c[f]) {
				if ("s" === e.t && Array.isArray(e.o)) for (var h = 0; h < e.o.length; h++) g += "[option] " + decodeStr(e.o[h]) + "\n";
				c[f] = {m: decodeStr(e.m), o: g, dataType: a.t, key: b, id: a._id, isGlobal: d}
			}
		}
	},
	reloadShortcutUpdate: function (a,
	                                c) {
		var d = this;
		a = a || function () {
		};
		this.getShortcuts(function (b) {
			d.loadList();
			d.reSortList();
			c ? (d.openItem(c._id + "-" + c.sck), a(null, c._id)) : a()
		})
	},
	saveLastSubView: function (a) {
		this.isGlobalShortcut || this._super(a)
	},
	reSortList: function () {
		var a = Ember.copy(this.shortcutsList);
		this.shortcutsList.clear();
		this.shortcutsList.pushObjects(sortList(a, "key"));
		this.searchQuery && this.searchList(this.searchQuery);
		this.pagedList && (this.pagedList.reset(), this.pagedList.startList(), this.pagedList.setTotal(this.shortcutsList.length),
			this.pagedList.setList(this.getList()))
	},
	hasShortcuts: function (a) {
		return (a = this.storedShortcuts[a]) && (a.public || a.personal)
	},
	bulkAddShortcuts: function (a, c, d) {
		var b = {};
		d = d || function () {
		};
		if (this.activeProperty) b.propertyId = this.activeProperty.id; else return d(!0);
		b.type = c;
		b.shortcuts = a;
		socketConnector.bulkAddShortcuts(b, function (a, b) {
			d(a, b)
		})
	}
});
Tawk.shortcutsController = Tawk.ShortcutsController.create();
Tawk.AgentsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null,
	agentList: null,
	agentPagedList: null,
	invitedList: null,
	invitedPagedList: null,
	currentView: null,
	openProperty: function (a, c) {
		this.set("activeProperty", a);
		this.set("agentPagedList", Tawk.PagingListModel.create({perpage: c}));
		this.set("invitedPagedList", Tawk.PagingListModel.create({perpage: c}));
		this.set("currentView", "accepted");
		this.set("activeAgent", null);
		this.getLastViews();
		this.getAgents();
		Tawk.routing.titlePath.subviewName = languageParser.translate("admin", "members");
		Tawk.routing.setTitle()
	},
	getAgents: function (a) {
		var c =
			this, d = Tawk.routing.getPath(), b = 0, e = function () {
			b++;
			2 === b && (c.set("isLoading", !1), d.itemId ? c.openItem(d.itemId) : c.lastViews && "members" === c.lastViews.subView && c.lastViews.itemId ? c.openItem(c.lastViews.itemId) : c.saveLastSubView({itemId: null}), a())
		};
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		this.set("isLoading", !0);
		this.agentPagedList.startList();
		this.invitedPagedList.startList();
		socketConnector.getPropertyInfo(this.activeProperty.id, {agents: "full"}, function (a, b) {
			if (a) return e();
			b && (b.data &&
				b.data.a) && (c.activeProperty.loadAgents(b.data.a), c.set("agentList", c.activeProperty.agentList), c.agentPagedList.setTotal(c.agentList.length), c.loadAgentList());
			e()
		});
		socketConnector.getInvitationList({propertyId: this.activeProperty.id}, function (a, b) {
			if (a) return e();
			b && b.data && (c.activeProperty.loadInvitedAgents(b.data), c.set("invitedList", c.activeProperty.invitedList), c.invitedPagedList.setTotal(c.invitedList.length), c.loadInvitedList());
			e()
		})
	},
	loadAgentList: function (a) {
		var c, d;
		a ? (c = this.agentList.filter(function (b) {
			return b.name.match(a) ?
				!0 : !1
		}), d = c.length, c = c.slice(this.agentPagedList.currentHead, this.agentPagedList.to)) : (d = this.agentList.length, c = this.agentList.slice(this.agentPagedList.currentHead, this.agentPagedList.to));
		this.agentPagedList.setTotal(d);
		this.agentPagedList.setList(c)
	},
	loadInvitedList: function (a) {
		var c, d;
		a ? (c = this.invitedList.filter(function (b) {
			return b.tawkId && b.tawkId.match(a) || b.email && b.email.match(a) ? !0 : !1
		}), d = c.length, c = c.slice(this.invitedPagedList.currentHead, this.invitedPagedList.to)) : (d = this.invitedList.length,
			c = this.invitedList.slice(this.invitedPagedList.currentHead, this.invitedPagedList.to));
		this.invitedPagedList.setTotal(d);
		this.invitedPagedList.setList(c)
	},
	searchList: function (a) {
		a = RegExp(a, "gi");
		this.set("isLoading", !0);
		this.agentPagedList.reset();
		this.agentPagedList.startList();
		this.invitedPagedList.reset();
		this.invitedPagedList.startList();
		this.loadAgentList(a);
		this.loadInvitedList(a);
		this.set("isLoading", !1)
	},
	loadNextList: function (a) {
		a = a || function () {
		};
		if ("accepted" === this.currentView) {
			if (this.agentPagedList.isLastPage()) return a(null,
				!1);
			this.agentPagedList.nextList();
			this.loadAgentList()
		} else {
			if (this.invitedPagedList.isLastPage()) return a(null, !1);
			this.invitedPagedList.nextList();
			this.loadInvitedList()
		}
		return a(null, !0)
	},
	toggleAllMark: function (a) {
		"accepted" === this.currentView ? this.agentPagedList.currentData.filterProperty("canBeDeleted").setEach("isMarked", a) : this.invitedPagedList.currentData.setEach("isMarked", a)
	},
	toggleMark: function (a, c) {
		var d;
		d = "accepted" === this.currentView ? this.agentPagedList.getItem(a) : this.invitedPagedList.getItem(a);
		this.activeProperty.isAdmin && d && d.set("isMarked", c)
	},
	inviteAgents: function (a, c) {
		var d, b = 0, e = [], f = [], g = this, h = function (a, h, m, n) {
			b++;
			a ? f.push({index: h, error: m}) : e.push({index: h, email: n});
			b === d && (g.invitedPagedList.reset(), g.invitedPagedList.startList(), g.invitedPagedList.setTotal(g.invitedList.length), g.loadInvitedList(), g.set("isLoading", !1), c(f, e))
		};
		if (!this.activeProperty || !this.activeProperty.isAdmin) return c(!0);
		this.set("isLoading", !0);
		d = a.length;
		a.forEach(function (a, b) {
			socketConnector.inviteAgentByEmail({
				propertyId: g.activeProperty.id,
				email: a.email, role: a.role
			}, function (c, d) {
				var e;
				d && (d.warnings && d.warnings.length) && (c = d.warnings[0]);
				if (c) return errorMessage = languageParser.translate("admin", "invitation_fail"), c.code ? "InternalServerError" === c.code ? errorMessage = languageParser.translate("generic", "internal_server_error") : "UnauthorizedError" === c.code ? errorMessage = languageParser.translate("generic", "unauthorized_error") : "InvalidArgument" === c.code ? errorMessage = "email" === c.message ? languageParser.translate("form_validation_messages", "invalid_email") :
					"role" === c.message ? languageParser.translate("admin", "invalid_role") : languageParser.translate("generic", "invalid_property") : "TooManyRequestsError" === c.code && "over-quota" === c.message && (errorMessage = languageParser.translate("admin", "overexceeded_pending_invites")) : "existing-member" === c ? errorMessage = languageParser.translate("form_validation_messages", "AGENT_ALREADY_EXIST") : "invite-exists" === c ? errorMessage = languageParser.translate("form_validation_messages", "AGENT_ALREADY_INVITED") : "send-email-failed" ===
					c && (errorMessage = languageParser.translate("admin", "invitation_email_fail")), h(!0, b, errorMessage);
				e = Ember.Object.create({
					id: d.data.id,
					email: a.email,
					isInvitation: !0,
					role: a.rl,
					isAdmin: "admin" === a.role,
					isEnabled: !0,
					canBeDeleted: !0
				});
				g.invitedList.pushObject(e);
				h(!1, b, null, a.email)
			})
		})
	},
	getAgent: function (a) {
		return this.agentList.findProperty("id", a)
	},
	getInvitation: function (a) {
		return this.invitedList.findProperty("id", a)
	},
	openItem: function (a) {
		(a = this.agentPagedList.getItem(a)) ? (this.set("activeAgent", a),
			this.activeAgent.id ? (this.saveLastSubView({itemId: this.activeAgent.id}), Tawk.routing.titlePath.itemName = this.activeAgent.name) : Tawk.routing.titlePath.itemName = languageParser.translate("buttons", "invite_agent"), Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "members",
			itemId: this.activeAgent.id || null,
			widgetId: null
		}), Tawk.routing.setTitle()) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "members",
			itemId: null,
			widgetId: null
		})
	},
	openInvitation: function (a) {
		(a =
			this.invitedPagedList.getItem(a)) && this.set("activeAgent", a)
	},
	editAccess: function (a, c, d) {
		var b = this;
		d = d || function () {
		};
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.activeAgent) return d(!0);
		this.activeAgent.isInvitation ? socketConnector.editInvitationAccess({
			propertyId: this.activeProperty.id,
			inviteId: this.activeAgent.id,
			role: c
		}, function (a) {
			if (a) {
				if (a.code) {
					if ("InternalServerError" === a.code) return d(!0, languageParser.translate("generic", "internal_server_error"));
					if ("UnauthorizedError" ===
						a.code) return d(!0, languageParser.translate("generic", "unauthorized_error"));
					if ("InvalidArgument" === a.code) {
						if ("propertyId" === a.message) return d(!0, languageParser.translate("generic", "invalid_property"));
						if ("role" === a.message) return d(!0, languageParser.translate("admin", "invalid_role"));
						if ("inviteId" === a.message) return d(!0, languageParser.translate("admin", "invalid_invitation"))
					}
				}
				return d(!0)
			}
			b.activeAgent.set("role", c);
			b.activeAgent.set("isAdmin", "admin" === c);
			b.activeAgent.set("isAgent", "agent" ===
				c);
			return d()
		}) : socketConnector.editAgentAccess({
			propertyId: this.activeProperty.id,
			agentId: this.activeAgent.id,
			role: c,
			enabled: a
		}, function (e) {
			if (e) {
				if (e.code) {
					if ("InternalServerError" === e.code) return d(!0, languageParser.translate("generic", "internal_server_error"));
					if ("UnauthorizedError" === e.code) return d(!0, languageParser.translate("generic", "unauthorized_error"));
					if ("InvalidArgument" === e.code) {
						if ("propertyId" === e.message) return d(!0, languageParser.translate("generic", "invalid_property"));
						if ("role" ===
							e.message) return d(!0, languageParser.translate("admin", "invalid_role"));
						if ("agentId" === e.message) return d(!0, languageParser.translate("generic", "invalid_agent"));
						if ("enabled" === e.message) return d(!0, languageParser.translate("admin", "invalid_status"))
					}
					if ("ConflictError" === e.code) {
						if ("modifying_self" === e.message) return d(!0, languageParser.translate("admin", "modifying_self"));
						if ("has_active_subscriptions" === e.message) return d(!0, languageParser.translate("admin", "agent_has_subscription_error"));
						if ("not_member" ===
							e.message) return d(!0, languageParser.translate("admin", "not_member"))
					}
				}
				return d(!0)
			}
			b.activeAgent.set("role", c);
			b.activeAgent.set("isAdmin", "admin" === c);
			b.activeAgent.set("isAgent", "agent" === c);
			b.activeAgent.set("isEnabled", a);
			b.activeAgent.set("isDisabled", !a);
			b.activeAgent.set("enabled", a ? "enabled" : "disabled");
			b.activeProperty.updateAgentAccess(b.activeAgent.id, c, a);
			return d()
		})
	},
	resendInvitation: function (a) {
		if (!this.activeProperty || !this.activeAgent || !this.activeProperty.isAdmin) return a(!0);
		socketConnector.resendInvitation({
			propertyId: this.activeProperty.id,
			inviteId: this.activeAgent.id
		}, function (c) {
			if (c) {
				if (c.code) {
					if ("InternalServerError" === c.code) return a(!0, languageParser.translate("generic", "internal_server_error"));
					if ("UnauthorizedError" === c.code) return a(!0, languageParser.translate("generic", "unauthorized_error"));
					if ("NotFoundError" === c.code) return a(!0, languageParser.translate("generic", "invitation_not_found"));
					if ("InvalidArgument" === c.code) {
						if ("propertyId" === c.message) return a(!0, languageParser.translate("generic", "invalid_property"));
						if ("inviteId" ===
							c.message) return a(!0, languageParser.translate("admin", "invalid_invitation"))
					}
					if ("ConflictError" === c.code && "existing_agent" === c.message) return a(!0, languageParser.translate("admin", "resend_existing_agent"))
				}
				return a(!0)
			}
			return a()
		})
	},
	closeView: function () {
		if (this.activeAgent) return this.closeItem(), !1;
		this.resetData();
		return !0
	},
	resetData: function () {
		this.set("activeAgent", null)
	},
	closeItem: function () {
		this.set("activeAgent", null);
		this.saveLastSubView({itemId: null})
	},
	bulkDelete: function (a) {
		var c, d = [],
			b = [], e = this, f = "", g = 0, h = function (b, d) {
				g++;
				b ? b.code && ("InternalServerError" === b.code && (f += languageParser.translate("generic", "internal_server_error")), "UnauthorizedError" === b.code && (f += languageParser.translate("generic", "unauthorized_error")), "NotFoundError" === b.code && (f += languageParser.translate("generic", "invitation_not_found")), "InvalidArgument" === b.code && ("propertyId" === b.message && (f += languageParser.translate("generic", "invalid_property")), "agentId" === b.message && (f += languageParser.translate("generic",
					"invalid_agent")), "inviteId" === b.message && (f += languageParser.translate("admin", "invalid_invitation"))), "ConflictError" === b.code && ("modifying_self" === b.message && (f += languageParser.translate("admin", "modifying_self")), "has_active_subscriptions" === b.message && (f += languageParser.translate("admin", "agent_has_subscription_error")), "not_member" === b.message && (f += languageParser.translate("admin", "not_member")))) : d && Tawk.webProperties.removeAgentAccess({
					pgid: e.activeProperty.id,
					aid: d
				});
				g === c && e.getAgents(function () {
					e.set("isUpdating",
						!1);
					e.set("isUpdated", !0);
					return a(!!f, f)
				})
			};
		a = a || function () {
		};
		this.set("isUpdated", !1);
		this.set("isUpdating", !1);
		if (!this.activeProperty || !this.activeProperty.isAdmin) return a(!0);
		d = this.agentPagedList.currentData.filterProperty("isMarked", !0);
		b = this.invitedPagedList.currentData.filterProperty("isMarked", !0);
		if (0 === d.length && 0 === b.length) return a(!0);
		checkAndSetConfirmView(!1, function (f) {
			if (!f) return a(!0);
			e.set("isUpdating", !0);
			d.length ? (c = d.length, d.forEach(function (a) {
				socketConnector.removeAgentAccess({
					propertyId: e.activeProperty.id,
					agentId: a.id
				}, function (b) {
					h(b, a.id)
				})
			})) : b.length && (c = b.length, b.forEach(function (a) {
				socketConnector.removeInvitation({propertyId: e.activeProperty.id, inviteId: a.id}, h)
			}))
		})
	},
	propertyUpdated: function () {
		var a = Tawk.webProperties.updatedProperty, c = Tawk.webProperties.updatedData;
		c && (a && this.activeProperty && "agent" === c.type) && (this.set("hasBeenUpdated", !1), this.activeAgent && (c.ids === this.activeAgent.id && "remove" === c.operation) && (this.set("previousName", this.activeAgent.name), this.set("activeAgent", null),
			this.set("hasBeenUpdated", !0)), Tawk.webProperties.set("updatedData", null))
	}
});
Tawk.DepartmentsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null,
	departmentList: null,
	pagedList: null,
	activeDepartment: null,
	openProperty: function (a, c) {
		var d = Tawk.routing.getPath();
		this.set("activeProperty", a);
		this.set("departmentList", a.departmentList);
		this.set("pagedList", Tawk.PagingListModel.create({perpage: c}));
		this.pagedList.startList();
		this.loadList();
		this.getLastViews();
		Tawk.routing.titlePath.subviewName =
			languageParser.translate("sites", "departments");
		Tawk.routing.setTitle();
		d.itemId && this.openItem(d.itemId)
	},
	loadList: function (a) {
		var c;
		a ? (searchRegex = RegExp(a, "gi"), c = this.departmentList.filter(function (a) {
			return a.name.match(searchRegex) ? !0 : !1
		}), a = c.length, c = c.slice(this.pagedList.currentHead, this.pagedList.to)) : (a = this.departmentList.length, c = this.departmentList.slice(this.pagedList.currentHead, this.pagedList.to));
		this.pagedList.setTotal(a);
		this.pagedList.setList(c)
	},
	searchList: function (a) {
		this.pagedList.reset();
		this.pagedList.startList();
		this.loadList(a)
	},
	loadNextList: function (a) {
		a = a || function () {
		};
		if (this.pagedList.isLastPage()) return a(null, !1);
		this.pagedList.nextList();
		this.loadList();
		return a(null, !0)
	},
	openItem: function (a) {
		this.activeProperty && (this.activeProperty.isAdmin && this.departmentList) && ((a = a ? this.departmentList.findProperty("id", a) : Ember.Object.create({agents: []})) ? (this.set("activeDepartment", a), this.loadDepartmentAgents(), this.activeDepartment.id ? (this.saveLastSubView({itemId: this.activeDepartment.id}),
			Tawk.routing.titlePath.itemName = a.name) : Tawk.routing.titlePath.itemName = "New Department", Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "department",
			itemId: this.activeDepartment.id || null,
			widgetId: null
		}), Tawk.routing.setTitle()) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "department",
			itemId: null,
			widgetId: null
		}))
	},
	loadDepartmentAgents: function () {
		var a = this, c = [];
		this.activeDepartment && (this.activeProperty.agentAccess.filterProperty("en",
			!0).forEach(function (d) {
			d.name = decodeStr(Tawk.agentsController.getName(d.aid));
			a.activeDepartment.agents.contains(d.aid) ? d.isSelected = !0 : d.isSelected = !1;
			c.pushObject(Ember.Object.create(d))
		}), this.activeDepartment.set("agentList", sortList(c, "name")))
	},
	assignAgentToDepartment: function (a) {
		this.activeDepartment && (a = this.activeDepartment.unassignedAgents.findProperty("aid", a)) && (this.activeDepartment.unassignedAgents.removeObject(a), this.activeDepartment.assignedAgents.pushObject(a))
	},
	unassignAgentFromDepartment: function (a) {
		this.activeDepartment &&
		(a = this.activeDepartment.assignedAgents.findProperty("aid", a)) && (this.activeDepartment.assignedAgents.removeObject(a), this.activeDepartment.unassignedAgents.pushObject(a), this.activeDepartment.set("unassignedAgents", sortList(this.activeDepartment.unassignedAgents, "n")))
	},
	saveDepartment: function (a, c) {
		var d = this;
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.activeDepartment) return c(!0);
		this.activeDepartment.id && (a.departmentId = this.activeDepartment.id);
		socketConnector.saveDepartment(this.activeProperty.id,
			a, function (b, e) {
				if (b) return c(b);
				Tawk.webProperties.updateDepartment({
					pgid: d.activeProperty.id,
					did: a.departmentId ? a.departmentId : e.did,
					n: a.name,
					dsc: a.description,
					en: void 0 !== a.isEnabled ? a.isEnabled : !0,
					a: a.agents ? a.agents : [],
					dptsver: e.dptsver ? e.dptsver : e
				});
				d.activeProperty.loadDepartments(Tawk.webProperties.getDepartmentsByProperty(d.activeProperty.id));
				d.set("departmentList", d.activeProperty.departmentList);
				d.pagedList.startList();
				d.loadList();
				d.openItem(a.departmentId || e.did);
				return c()
			})
	},
	deleteSingle: function (a) {
		var c;
		if (!this.activeProperty || !this.activeDepartment || !this.activeProperty.isAdmin) return a(!0);
		c = this.activeDepartment;
		c.set("isMarked", !0);
		this.bulkDelete(function (d) {
			d && c.set("isMarked", !1);
			return a(d)
		})
	},
	bulkDelete: function (a) {
		var c, d = this;
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		c = this.pagedList.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		checkAndSetConfirmView(!1, function (b) {
			if (!b) return a(!0);
			socketConnector.deleteDepartments(d.activeProperty.id, c.getEach("id"),
				function (b) {
					if (b) return a(b);
					Tawk.webProperties.removeDepartment({
						pgid: d.activeProperty.id,
						dids: c.getEach("id"),
						dptsver: Tawk.webProperties.getProperty(d.activeProperty.id).departmentVersion + 1
					}, !1);
					d.activeProperty.departmentList.removeObjects(c);
					d.set("departmentList", d.activeProperty.departmentList);
					d.pagedList.startList();
					d.loadList();
					a()
				})
		})
	},
	closeView: function () {
		if (this.activeDepartment) return this.closeItem(), !1;
		this.resetData();
		return !0
	},
	resetData: function () {
		this.set("departmentList", null);
		this.set("pagedList", null);
		this.set("activeDepartment", null)
	},
	closeItem: function () {
		this.set("activeDepartment", null);
		this.saveLastSubView({itemId: null})
	},
	toggleAllMark: function (a) {
		this.activeProperty.isAdmin && this.pagedList && this.pagedList.currentData.setEach("isMarked", a)
	},
	toggleMark: function (a, c) {
		var d = this.pagedList.getItem(a);
		this.activeProperty.isAdmin && d && d.set("isMarked", c)
	},
	propertyUpdated: function () {
		var a = Tawk.webProperties.updatedProperty, c = Tawk.webProperties.updatedData;
		c && (c.ids && a && this.activeProperty &&
			"department" === c.type && this.activeProperty.id === a.id) && (this.set("hasBeenUpdated", !1), this.activeDepartment && ("remove" === c.operation && -1 < c.ids.indexOf(this.activeDepartment.id)) && (this.set("previousName", this.activeDepartment.name), this.set("activeDepartment", null), this.set("hasBeenUpdated", !0)), Tawk.webProperties.set("updatedData", null))
	}
});
Tawk.TriggersController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null, pagedList: null, activeTrigger: null, canAddTrigger: !1, openProperty: function (a) {
		this.set("activeProperty",
			a);
		this.set("pagedList", Tawk.PagingListModel.create({perpage: 20}));
		this.getLastViews();
		this.getTriggers();
		Tawk.routing.titlePath.subviewName = languageParser.translate("sites", "triggers");
		Tawk.routing.setTitle()
	}, getTriggers: function (a) {
		var c = this, d = [], b = Tawk.routing.getPath();
		a = a || function () {
		};
		if (!this.activeProperty || this.activeProperty.triggerList.length) return a(!0);
		this.set("isLoading", !0);
		this.pagedList.reset();
		this.pagedList.startList();
		socketConnector.getTriggers(this.activeProperty.id, function (e,
		                                                              f) {
			e ? (c.set("isLoading", !1), a(!0)) : (f.forEach(function (a) {
				var b, e, f = "", m = Tawk.CopyableModel.create({
					id: a.id,
					_id: a.id,
					name: decodeStr(a.n),
					description: decodeStr(a.dsc),
					execute: a.exec,
					isEnabled: a.en,
					type: a.t,
					typeName: languageParser.translate("triggers", a.t),
					canBeDeleted: c.activeProperty.isAdmin
				});
				"advanced" === a.t ? (a.tgr && (b = "send_message" !== a.tgr ? languageParser.translate("triggers", a.tgr) : languageParser.translate("triggers", "chat_sent")), m.setProperties({
					isAdvanced: !0, match: a.mch, trigger: a.tgr, triggerRun: b,
					conditions: [], actions: []
				}), a.cdns.forEach(function (a) {
					m.conditions.pushObject(Tawk.CopyableModel.create({
						field: a.fld,
						operation: a.op,
						value: a.val,
						fieldId: "field" + randomString(10, !0),
						operationId: "operation" + randomString(10, !0),
						valueId: "value" + randomString(10, !0)
					}))
				}), m.set("conditionsLimit", 10 === a.cdns.length), a.acns.forEach(function (a) {
					m.actions.pushObject(Tawk.CopyableModel.create({
						action: a.acn,
						actionId: "action" + randomString(10, !0),
						value: a.val,
						valueId: "value" + randomString(10, !0)
					}))
				}), m.set("actionsLimit",
					5 === a.acns.length)) : (m.setProperties({
					isAdvanced: !1,
					senderName: a.acns.length ? decodeStr(a.acns[0].val[0]) : null,
					message: a.acns.length ? decodeStr(a.acns[0].val[1]) : null
				}), a.cdns.length && (a.cdns.forEach(function (b) {
					if ("still_on_page" === b.fld || "still_on_site" === b.fld) e = b.val;
					"basic_page" === a.t && "page_url" === b.fld && (f = b.val)
				}), m.set("delay", e)), "basic_page" === a.t ? (m.set("pageUrl", f), m.set("isPageTrigger", !0)) : "basic_site" === a.t && c.set("disableBasicSite", !0));
				d.pushObject(m)
			}), c.pagedList.setTotal(d.length),
				c.pagedList.setList(d), 20 > d.length ? c.set("canAddTrigger", !0) : c.set("canAddTrigger", !1), c.set("isLoading", !1), b.itemId ? c.openItem(b.itemId) : c.lastViews && ("triggers" === c.lastViews.subView && c.lastViews.itemId) && c.openItem(c.lastViews.itemId), a())
		})
	}, toggleAllMark: function (a) {
		this.activeProperty.isAdmin && this.pagedList.currentData.setEach("isMarked", a)
	}, toggleMark: function (a, c) {
		var d = this.pagedList.getItem(a);
		this.activeProperty.isAdmin && d && d.set("isMarked", c)
	}, openItem: function (a) {
		this.activeProperty &&
		this.activeProperty.isAdmin && (this.pagedList.currentData.setEach("isMarked", !1), (a = a ? this.pagedList.getItem(a) : Tawk.CopyableModel.create({
			isPageTrigger: !0,
			canBeDeleted: !0,
			type: "basic_page",
			typeName: languageParser.translate("triggers", "basic_page")
		})) ? (this.set("activeTrigger", a.copy()), this.pagedList.currentData.findProperty("type", "basic_site") ? this.set("disableBasicSite", !0) : this.set("disableBasicSite", !1), "advanced" === this.activeTrigger.type && (this.activeTrigger.conditions && this.activeTrigger.conditions.length ||
		(this.activeTrigger.set("conditions", []), this.addTriggerCondition()), this.activeTrigger.actions && this.activeTrigger.actions.length || (this.activeTrigger.set("actions", []), this.addTriggerAction())), this.activeTrigger.id ? (this.saveLastSubView({itemId: this.activeTrigger.id}), Tawk.routing.titlePath.itemName = this.activeTrigger.name) : Tawk.routing.titlePath.itemName = "Add Trigger", Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "triggers",
			itemId: this.activeTrigger.id || null,
			widgetId: null
		}), Tawk.routing.setTitle()) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "triggers",
			itemId: null,
			widgetId: null
		}))
	}, closeView: function () {
		if (this.activeTrigger) return this.closeItem(), !1;
		this.resetData();
		return !0
	}, closeItem: function () {
		this.pagedList.currentData.setEach("isMarked", !1);
		this.set("activeTrigger", null);
		this.saveLastSubView({itemId: null})
	}, resetData: function () {
		this.set("activeTrigger", null);
		this.set("pagedList", null)
	}, changeAddFormType: function (a) {
		this.activeProperty &&
		(this.activeTrigger && !this.activeTrigger.id) && (this.activeTrigger.set("type", a), this.activeTrigger.set("typeName", languageParser.translate("triggers", a)), "advanced" === a ? (this.activeTrigger.setProperties({
			isPageTrigger: !1,
			isAdvanced: !0,
			conditions: [],
			actions: []
		}), this.addTriggerCondition(), this.addTriggerAction()) : (this.activeTrigger.set("isAdvanced", !1), "basic_page" === a ? this.activeTrigger.set("isPageTrigger", !0) : this.activeTrigger.set("isPageTrigger", !1)))
	}, addTriggerCondition: function () {
		this.activeProperty &&
		(this.activeTrigger && 10 !== this.activeTrigger.conditions.length) && (this.activeTrigger.conditions.pushObject(Tawk.CopyableModel.create({
			fieldId: "field" + randomString(10, !0),
			field: null,
			operation: null,
			operationId: "operation" + randomString(10, !0),
			value: null,
			valueId: "value" + randomString(10, !0)
		})), 10 === this.activeTrigger.conditions.length && this.activeTrigger.set("conditionsLimit", !0))
	}, addTriggerAction: function () {
		this.activeProperty && (this.activeTrigger && 5 !== this.activeTrigger.actions.length) && (this.activeTrigger.actions.pushObject(Tawk.CopyableModel.create({
			action: null,
			actionId: "action" + randomString(10, !0), value: null, valueId: "value" + randomString(10, !0)
		})), 5 === this.activeTrigger.actions.length && this.activeTrigger.set("actionsLimit", !0))
	}, removeCondition: function (a) {
		this.activeProperty && (this.activeTrigger && !(1 >= this.activeTrigger.conditions.length)) && (a = this.activeTrigger.conditions.findProperty("valueId", a)) && (this.activeTrigger.conditions.removeObject(a), 10 > this.activeTrigger.conditions.length && this.activeTrigger.set("conditionsLimit", !1))
	}, removeAction: function (a) {
		this.activeProperty &&
		(this.activeTrigger && !(1 >= this.activeTrigger.actions.length)) && (a = this.activeTrigger.actions.findProperty("valueId", a)) && (this.activeTrigger.actions.removeObject(a), 5 > this.activeTrigger.actions.length && this.activeTrigger.set("actionsLimit", !1))
	}, saveBasicTrigger: function (a, c) {
		var d = {};
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.activeTrigger) return c(!0);
		this.activeTrigger.id && this.pagedList.getItem(this.activeTrigger.id);
		"basic_chat_rescue" === this.activeTrigger.type ? d = basicChatTemplate :
			"basic_site" === this.activeTrigger.type ? d = basicSiteTemplate : (d = basicPageTemplate, d.conditions[1].value = a.pageUrl);
		d.id = this.activeTrigger.id;
		d.enabled = void 0 !== a.enabled ? a.enabled : !0;
		d.conditions[0].value = parseInt(a.delay, 10);
		d.actions[0].value = [a.sender, a.message];
		d.name = a.name;
		this.saveTrigger(d, c)
	}, saveTrigger: function (a, c) {
		var d, b = this;
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.activeTrigger) return c(!0);
		d = this.activeTrigger.id ? this.pagedList.getItem(this.activeTrigger.id) : this.activeTrigger;
		a.id = d.id;
		a.type = d.type;
		void 0 === a.enabled && (a.enabled = !0);
		socketConnector.saveTrigger(this.activeProperty.id, a, function (a, d) {
			if (a) return c(!0);
			b.getTriggers(function (a) {
				if (a) return c(a);
				b.openItem(d.id);
				c()
			})
		})
	}, deleteSingle: function (a) {
		var c;
		if (!this.activeProperty || !this.activeTrigger || !this.activeProperty.isAdmin) return a(!0);
		this.toggleAllMark(!1);
		c = this.pagedList.getItem(this.activeTrigger.id);
		if (!c) return a(!0);
		c.set("isMarked", !0);
		this.bulkDelete(function (d) {
			c.set("isMarked", !1);
			return a(d)
		})
	},
	bulkDelete: function (a) {
		var c, d = this;
		a = a || function () {
		};
		if (!this.activeProperty || !this.activeProperty.isAdmin) return a(!0);
		c = this.pagedList.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		checkAndSetConfirmView(!1, function (b) {
			if (!b) return a(!0);
			socketConnector.deleteTriggers(d.activeProperty.id, c.getEach("id"), function (b) {
				if (b) return a(b);
				d.getTriggers(a)
			})
		})
	}
});
Tawk.WhitelabelAddOnController = Ember.Controller.extend({
	propertyId: null, whitelabelAddOn: null, originalData: null, currentView: null,
	loadWhitelabelData: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.propertyId) return a(!1);
		this.set("canUsePaypal", desktopConnector.canUsePaypal());
		socketConnector.getAddOnDetail(this.propertyId, "whitelabel", function (d, b) {
			if (d) return a(!0);
			c.set("whitelabelAddOn", null);
			c.set("originalData", b);
			c.resetSettings(a)
		})
	}, saveWhitelabelSettings: function (a, c) {
		var d = this;
		socketConnector.saveWhitelabelSettings(this.propertyId, a, function (b, e) {
			if (b) return c(b);
			d.set("originalData.settings", a);
			d.whitelabelAddOn.set("settings.email",
				a.email);
			d.whitelabelAddOn.set("settings.whitelabel", a.whitelabel);
			d.whitelabelAddOn.set("settings.enabled", a.enabled);
			return c()
		})
	}, handlePayment: function (a, c, d) {
		var b = this, e = function (e, g) {
			var h = function () {
				e ? d(e, g) : (ga("send", "event", "Whitelabel Purchase", b.currentView, "Add-on purchased location tracking"), b.set("originalData.hasSubscription", !0), b.set("originalData.expiry", new Date), b.whitelabelAddOn.set("isSubscribed", !0), b.whitelabelAddOn.set("isActive", !0), b.whitelabelAddOn.set("subscriptionId",
					g), d())
			};
			"cc" === a && "new-card" === c.customerId ? Tawk.userController.getExistingCCCards(!0, h.bind(b)) : h()
		};
		d = d || function () {
		};
		c.addOnId = "whitelabel";
		c.propertyId = this.propertyId;
		c.subscriptionId = this.whitelabelAddOn.subscriptionId;
		c.action = "create";
		"cc" === a ? handleCCPayment(c, e) : handlePaypalPayment(c, e)
	}, resetSettings: function (a) {
		var c, d, b = [];
		a = a || function () {
		};
		if (!this.propertyId || !this.originalData) return a();
		c = this.originalData;
		this.whitelabelAddOn ? d = this.whitelabelAddOn : (d = Ember.Object.create(), c.plans.forEach(function (a) {
			a =
				Ember.Object.create({
					id: a.planId,
					price: a.price,
					pricePretify: languageParser.translate("admin", a.planId),
					stripeId: a.stripeId,
					cycle: a.cycle
				});
			b.pushObject(a)
		}), d.set("plans", b.sortBy("price").reverse()), d.set("settings", Ember.Object.create()), c.hasSubscription ? (d.set("isSubscribed", !0), d.set("isActive", !0)) : (d.set("isSubscribed", !1), 0 > moment().diff(this.originalData.expiry) && d.set("isActive", !0)));
		d.isActive || (c.settings.widget = {
			label: "Powered by *tawk.to*",
			url: "https://www.tawk.to",
			textColor: "#000000"
		},
			c.settings.email = {
				label: "No tawk.to live chat account? Create one for free here",
				url: "https://www.tawk.to"
			});
		d.settings.setProperties(c.settings);
		this.whitelabelAddOn || this.set("whitelabelAddOn", d);
		a()
	}
});
Tawk.WidgetsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null,
	activeWidget: null,
	previouslySaved: !0,
	unusedUploadedBubbleList: [],
	whitelabelController: Tawk.WhitelabelAddOnController.create(),
	hasMoreWidgets: function () {
		return this.activeProperty && 1 < this.activeProperty.widgetList.length
	}.property("activeProperty.widgetList.length"),
	popoutWidgetCode: function () {
		return this.activeProperty && this.activeProperty.tawkId && this.activeWidget ? GLOBAL_TAWK_URL + "/chat/" + decodeStr(this.activeProperty.id) + "/" + this.activeWidget.id + "/?$_tawk_popout=true" : ""
	}.property("activeWidget.id", "activeProperty"),
	openProperty: function (a, c) {
		this.set("activeProperty", a);
		this.getLastViews();
		void 0 !== c ? this.openWidget(c) : this.openWidget(this.activeProperty.widgetList[0].id)
	},
	getWidget: function (a) {
		return this.activeProperty && this.activeProperty.widgetList ? this.activeProperty.widgetList.findProperty("id",
			a) : null
	},
	openWidget: function (a) {
		this.activeProperty && (void 0 === a || void 0 !== a && !this.getWidget(a) ? this.set("activeWidget", Tawk.WidgetModel.create({
			isDefault: !0,
			canBeDeleted: !1
		})) : this.resetWidget(a), this.activeWidget && (this.activeWidget.id && "profile" !== this.activeProperty.type) && this.saveLastSubView({widgetId: this.activeWidget.id}))
	},
	resetWidget: function (a, c) {
		var d = null;
		c = c || function () {
		};
		d = this.getWidget(a);
		this.set("activeWidget", null);
		this.set("onlineGreetings", null);
		this.set("onlineGreetingsPreview",
			null);
		this.set("awayGreetingsPreview", null);
		this.set("prechatFormPreview", null);
		this.set("domainWhiteList", null);
		this.set("prechatFormPreview", null);
		this.set("offlineFormPreview", null);
		this.set("scheduler", null);
		d && (d.bubbleSettings && d.bubbleSettings.bubbleName) && this.set("bubblePreview", null);
		if (!d) return c();
		this.set("activeWidget", d.copy());
		this.set("onlineGreetingsPreview", d.onlineGreetings.copy());
		this.set("awayGreetingsPreview", d.awayGreetings.copy());
		this.set("prechatFormPreview", d.prechatForm.copy());
		this.set("offlineFormPreview", d.offlineForm.copy());
		this.set("prechatFormPreview", d.prechatForm.copy());
		this.set("domainWhiteList", d.get("whiteList").copy());
		this.set("scheduler", Tawk.CopyableModel.create(d.get("scheduler")));
		d.bubbleSettings.bubbleName && this.set("bubblePreview", d.bubbleSettings.copy());
		20 <= this.domainWhiteList.domains.length ? this.domainWhiteList.set("disableAdd", !0) : this.domainWhiteList.set("disableAdd", !1);
		c()
	},
	saveBehavior: function (a, c) {
		var d;
		if (!(this.activeProperty && this.activeProperty.isAdmin &&
				this.activeWidget && this.activeWidget.id)) return c(!0);
		d = this.getWidget(this.activeWidget.id);
		a.type = this.activeWidget.isInline ? "inline" : "embed";
		socketConnector.saveBehavior(this.activeProperty.id, this.activeWidget.id, a, function (b) {
			if (b) return c(!0);
			d.setProperties({
				disableSound: a.disableSoundNotification,
				hideEstimatedWaitTime: a.hideEstimatedWaitTime,
				hideOffline: a.hideWidgetWhenOffline,
				onClick: a.onClick,
				hideOnload: a.hideWidgetOnload,
				hideOnMobile: a.hideWidgetOnMobile
			});
			return c()
		})
	},
	closeView: function () {
		this.closeItem();
		return !0
	},
	resetData: function () {
		if (this.activeWidget) {
			var a = this.getWidget(this.activeWidget.id);
			a ? this.resetWidget(a.id) : this.openWidget(this.activeProperty.widgetList[0].id)
		}
	},
	closeItem: function () {
		var a = this.getWidget(this.activeWidget.id);
		a ? this.resetWidget(a.id) : this.openWidget(this.activeProperty.widgetList[0].id);
		this.saveLastSubView({itemId: null})
	},
	isRTL: function () {
		return this.activeWidget && 0 <= rtlLanguages.indexOf(this.activeWidget.languageCode) ? !0 : !1
	}.property("activeWidget.languageCode"),
	optionsText: function () {
		return this.activeWidget ? languageParser.translate("widget_preview_translation", this.activeWidget.languageCode + "-options") : null
	}.property("activeWidget.languageCode"),
	checkAndAddOldBubble: function () {
		"upload" === this.bubblePreview.bubbleType && this.unusedUploadedBubbleList.push(this.bubblePreview.bubbleName)
	},
	checkAndRemoveOldBubble: function () {
		var a = this;
		"upload" === this.bubblePreview.bubbleType && this.unusedUploadedBubbleList.forEach(function (c, d) {
			c === a.bubblePreview.bubbleName &&
			a.unusedUploadedBubbleList.splice(d, 1)
		})
	},
	deleteAllUnusedUploadedBubble: function () {
		var a = this;
		this.unusedUploadedBubbleList.forEach(function (c) {
			fileUploader.removeBubbleFile(c, a.activeProperty.id, function () {
			})
		});
		this.unusedUploadedBubbleList = []
	},
	addNewidget: function (a, c, d) {
		var b, e = this;
		a = {type: c, name: a};
		if (!this.activeProperty || !this.activeProperty.isAdmin || this.activeWidget.id) return d(!0);
		a.propertyId = this.activeProperty.id;
		a.language = Tawk.userController.localeCode;
		socketConnector.addWidget(a, function (a,
		                                       c) {
			var h, k;
			if (a) return d(a);
			k = c.data.id;
			h = extractWidgetSettings(c.data, k);
			h.siteId = e.activeProperty.id;
			h.canBeDeleted = !0;
			b = Tawk.WidgetModel.create(h);
			e.activeProperty.widgetList.pushObject(b);
			e.openWidget(k);
			Tawk.routing.changeRoute({
				view: "admin",
				propertyId: e.activeProperty.id,
				subView: "widget-settings",
				itemId: null,
				widgetId: k
			});
			return d()
		})
	},
	saveAppearance: function (a) {
		var c, d, b = this;
		if (!(this.activeProperty && this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id && this.bubblePreview)) return a(!0);
		this.previouslySaved = !0;
		d = {};
		d.width = parseInt(this.activeWidget.width, 10);
		d.height = parseInt(this.activeWidget.height, 10);
		d.widgetHeaderBackgroundColor = this.activeWidget.backgroundColor;
		d.widgetHeaderTextColor = this.activeWidget.textColor;
		d.type = this.activeWidget.isInline ? "inline" : "embed";
		d.agentTextBackgroundColor = this.activeWidget.agentBubbleBg;
		d.agentTextColor = this.activeWidget.agentBubbleTxt;
		d.visitorTextBackgroundColor = this.activeWidget.visitorBubbleBg;
		d.visitorTextColor = this.activeWidget.visitorBubbleTxt;
		d.topCornerSize = parseInt(this.activeWidget.topCorner, 10);
		d.bottomCornerSize = parseInt(this.activeWidget.bottomCorner, 10);
		d.mobileWidget = this.activeWidget.mobileWidget;
		d.desktopWidget = this.activeWidget.desktopWidget;
		this.activeWidget.isInline ? (d.position = this.activeWidget.position, d.minimizedHeight = parseInt(this.activeWidget.minimizedHeight, 10), d.minimizedWidth = parseInt(this.activeWidget.minimizedWidth, 10), 320 === d.width && 400 === d.height && (d.width = 0, d.height = 0), 40 === d.minimizedHeight && 320 === d.minimizedWidth &&
		(d.minimizedHeight = 0, d.minimizedWidth = 0)) : 450 === d.width && 600 === d.height && (d.width = 0, d.height = 0);
		d.hideChatBubble = "min" === d.desktopWidget || !this.bubblePreview.enabled || !this.bubblePreview.bubbleName;
		d.hideChatBubble || (d.chatBubble = {
			text: this.bubblePreview.bubbleText,
			backgroundColor: this.bubblePreview.bubbleBgColor,
			foregroundColor: this.bubblePreview.bubbleTxColor,
			name: this.bubblePreview.bubbleName,
			width: parseInt(this.bubblePreview.bubbleWidth, 10),
			height: parseInt(this.bubblePreview.bubbleHeight, 10),
			zIndex: this.bubblePreview.bubbleInFront ? 1 : 0,
			rightOffset: parseInt(this.bubblePreview.bubbleRightOffset, 10),
			bottomOffset: parseInt(this.bubblePreview.bubbleBottomOffset, 10),
			leftOffset: parseInt(this.bubblePreview.bubbleLeftOffset, 10),
			topOffset: parseInt(this.bubblePreview.bubbleTopOffset, 10),
			type: this.bubblePreview.bubbleType,
			rotate: parseInt(this.bubblePreview.bubbleRotation, 10)
		});
		socketConnector.saveAppearance(this.activeProperty.id, this.activeWidget.id, d, function (e) {
			if (e) return a(!0);
			c = b.getWidget(b.activeWidget.id);
			c.setProperties({
				position: d.position,
				width: b.activeWidget.width,
				height: b.activeWidget.height,
				minimizedHeight: b.activeWidget.minimizedHeight,
				minimizedWidth: b.activeWidget.minimizedWidth,
				backgroundColor: b.activeWidget.backgroundColor,
				textColor: b.activeWidget.textColor,
				agentBubbleBg: b.activeWidget.agentBubbleBg,
				agentBubbleTxt: b.activeWidget.agentBubbleTxt,
				visitorBubbleBg: b.activeWidget.visitorBubbleBg,
				visitorBubbleTxt: b.activeWidget.visitorBubbleTxt,
				topCorner: b.activeWidget.topCorner,
				bottomCorner: b.activeWidget.bottomCorner,
				mobileWidget: b.activeWidget.mobileWidget,
				desktopWidget: b.activeWidget.desktopWidget,
				isRectangleMobile: "rectangle" === b.activeWidget.mobileWidget,
				isRoundMobile: "round" === b.activeWidget.mobileWidget,
				isRectangleDesktop: "full" === b.activeWidget.desktopWidget,
				isRoundDesktop: "min" === b.activeWidget.desktopWidget
			});
			d.hideChatBubble ? c.set("bubbleSettings", Tawk.BubbleModel.create({
				enabled: !1,
				bubbleName: "default",
				bubbleText: languageParser.translate("widgets", "chat_live_agent"),
				bubbleBgColor: "#7fb06f",
				bubbleTxColor: "#ffffff",
				bubbleWidth: 0,
				bubbleHeight: 0,
				bubbleBottomOffset: 0,
				bubbleRightOffset: 0,
				bubbleTopOffset: 0,
				bubbleLeftOffset: 0,
				bubbleInFront: !1,
				bubbleType: "default",
				bubbleRotation: 0
			})) : c.bubbleSettings.setProperties({
				enabled: b.bubblePreview.enabled,
				bubbleText: b.bubblePreview.bubbleText,
				bubbleBgColor: b.bubblePreview.bubbleBgColor,
				bubbleTxColor: b.bubblePreview.bubbleTxColor,
				bubbleName: b.bubblePreview.bubbleName,
				bubbleWidth: d.chatBubble.width,
				bubbleHeight: d.chatBubble.height,
				bubbleBottomOffset: d.chatBubble.bottomOffset,
				bubbleRightOffset: d.chatBubble.rightOffset,
				bubbleLeftOffset: d.chatBubble.leftOffset,
				bubbleTopOffset: d.chatBubble.topOffset,
				bubbleInFront: b.bubblePreview.bubbleInFront,
				bubbleType: d.chatBubble.type,
				bubbleRotation: d.chatBubble.rotate
			});
			b.resetWidget(c.id);
			a()
		})
	},
	actions: {
		resetHeaderBgColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) && this.activeWidget.set("backgroundColor", a.backgroundColor)
		}, resetHeaderTxtColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) &&
			this.activeWidget.set("textColor", a.textColor)
		}, resetAgentBgColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) && this.activeWidget.set("agentBubbleBg", a.agentBubbleBg)
		}, resetAgentTxtColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) && this.activeWidget.set("agentBubbleTxt", a.agentBubbleTxt)
		}, resetVisitorBgColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) && this.activeWidget.set("visitorBubbleBg", a.visitorBubbleBg)
		},
		resetVisitorTxtColor: function () {
			var a;
			this.activeWidget && (a = this.getWidget(this.activeWidget.id)) && this.activeWidget.set("visitorBubbleTxt", a.visitorBubbleTxt)
		}, resetMaxWidth: function () {
			this.activeWidget && (this.activeWidget.isInline ? this.activeWidget.set("width", 320) : this.activeWidget.set("width", 450))
		}, resetMaxHeight: function () {
			this.activeWidget && (this.activeWidget.isInline ? this.activeWidget.set("height", 400) : this.activeWidget.set("height", 600))
		}, resetMinWidth: function () {
			this.activeWidget && this.activeWidget.isInline &&
			this.activeWidget.set("minimizedWidth", 320)
		}, resetMinHeight: function () {
			this.activeWidget && this.activeWidget.isInline && this.activeWidget.set("minimizedHeight", 40)
		}, resetPosition: function () {
			this.activeWidget && this.activeWidget.set("position", "br")
		}, resetBubbleSettings: function () {
			this.activeWidget && this.set("bubblePreview", this.activeWidget.bubbleSettings.copy())
		}
	},
	saveSettings: function (a, c, d, b) {
		var e, f = {}, g = this, h = 0, k = !1, l = function (a, c) {
			h++;
			a && (k = !0);
			2 === h && (g.resetWidget(g.activeWidget.id), b(k))
		};
		if (!(this.activeProperty && this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id)) return b(!0);
		f.enabled = null !== a ? a : this.activeWidget.isEnabled;
		f.whitelistDomains = this.domainWhiteList.domains.getEach("value");
		f.shareSessions = null === c ? this.activeWidget.sessionsShared : c;
		f.type = this.activeWidget.isInline ? "inline" : "embed";
		f.name = this.activeWidget.name;
		this.activeProperty.isSite ? socketConnector.saveWidgetSettings(this.activeProperty.id, this.activeWidget.id, f, function (a) {
			if (a) return l(!0,
				"settings");
			e = g.getWidget(g.activeWidget.id);
			e.set("isEnabled", f.enabled);
			e.set("name", f.name);
			e.set("sessionsShared", c);
			e.set("domainWhiteList", {stdom: f.whitelistDomains});
			return l()
		}) : l();
		d ? this.saveBehavior(d, function (a) {
			l(a, "behavior")
		}) : l()
	},
	deleteSingle: function (a) {
		var c, d = this;
		if (!this.activeProperty || !this.activeWidget || !this.activeProperty.isAdmin) return a(!0);
		c = this.getWidget(this.activeWidget.id);
		if (!c) return a(!0);
		checkAndSetConfirmView(!1, function (b) {
			if (!b) return a(!0);
			socketConnector.deleteWidgets(d.activeProperty.id,
				[c.id], function (b) {
					if (b) return a(b);
					d.activeProperty.widgetList.removeObject(c);
					a()
				})
		})
	},
	saveScheduler: function (a, c) {
		var d, b = this, e = {};
		if (!(this.activeProperty && this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id)) return c(!0);
		(d = this.scheduler.enabled) ? (e.cityName = this.scheduler.settings.city, e.googlePlaceId = this.scheduler.settings.gpid, e.schedule = a) : (e.cityName = null, e.googlePlaceId = null, e.schedule = null);
		socketConnector.editWidgetScheduler(this.activeProperty.id, this.activeWidget.id,
			d, e, function (f) {
				if (f) return c(!0);
				widget = b.getWidget(b.activeWidget.id);
				widget.set("scheduler.settings.sch", a);
				widget.set("scheduler.settings.city", e.cityName);
				widget.set("scheduler.settings.gpid", e.googlePlaceId);
				widget.set("scheduler.enabled", d);
				b.resetWidget(b.activeWidget.id);
				return c()
			})
	},
	changeGreetingsForLanguage: function (a, c) {
		var d, b, e = [];
		this.activeProperty && (this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id) && (this.prechatFormPreview && this.prechatFormPreview.enabled &&
		(this.activeProperty.isPersonal && this.prechatFormPreview.text === languageParser.translate("widget_preview_translation", c + "-prechat_title_profile") ? d = languageParser.translate("widget_preview_translation", a + "-prechat_title_profile") : this.prechatFormPreview.text === languageParser.translate("widget_preview_translation", c + "-prechat_title") && (d = languageParser.translate("widget_preview_translation", a + "-prechat_title")), d && (b = [], this.prechatFormPreview.fieldsData.parsedFields.every(function (d, e) {
			if (("inputText" ===
					d.type || "textArea" === d.type || "choice" === d.type || "option" === d.type) && d.label === languageParser.translate("widget_preview_translation", c + "-question")) return d.label = languageParser.translate("widget_preview_translation", a + "-question"), b.pushObject(d), !0;
			if (d.label === languageParser.translate("widget_preview_translation", c + "-" + d.type)) return d.label = languageParser.translate("widget_preview_translation", a + "-" + d.type), b.pushObject(d), !0;
			b = null;
			return !1
		}), this.prechatFormPreview.set("text", d), b && 0 < b.length &&
		(this.prechatFormPreview.set("languageUpdated", !0), this.prechatFormPreview.fieldsData.set("parsedFields", b)))), !this.offlineFormPreview || (this.offlineFormPreview.shortGreeting !== languageParser.translate("widget_preview_translation", c + "-offline") && this.offlineFormPreview.shortGreeting !== languageParser.translate("widget_preview_translation", c + "-status_message") + " - " + languageParser.translate("widget_preview_translation", c + "-offline") || this.offlineFormPreview.text !== languageParser.translate("widget_preview_translation",
			c + "-offline_title")) || (this.offlineFormPreview.fieldsData.parsedFields.every(function (b, d) {
			if (("inputText" === b.type || "textArea" === b.type || "choice" === b.type || "option" === b.type) && b.label === languageParser.translate("widget_preview_translation", c + "-question")) return b.label = languageParser.translate("widget_preview_translation", a + "-question"), e.pushObject(b), !0;
			if (b.label === languageParser.translate("widget_preview_translation", c + "-" + b.type)) return b.label = languageParser.translate("widget_preview_translation",
				a + "-" + b.type), e.pushObject(b), !0;
			e = null;
			return !1
		}), e && 0 < e.length && (this.offlineFormPreview.set("shortGreeting", languageParser.translate("widget_preview_translation", a + "-offline")), this.offlineFormPreview.set("text", languageParser.translate("widget_preview_translation", a + "-offline_title")), this.offlineFormPreview.set("fieldsData", Tawk.FormFields.create({
			fields: e,
			formType: "offline"
		})), this.offlineFormPreview.set("languageUpdated", !0))), !this.onlineGreetingsPreview || (this.onlineGreetingsPreview.actionMessage !==
			languageParser.translate("widget_preview_translation", c + "-say_something") || this.onlineGreetingsPreview.shortGreeting !== languageParser.translate("widget_preview_translation", c + "-online") && this.onlineGreetingsPreview.shortGreeting !== languageParser.translate("widget_preview_translation", c + "-status_message") + " - " + languageParser.translate("widget_preview_translation", c + "-online") || this.onlineGreetingsPreview.longGreeting !== languageParser.translate("widget_preview_translation", c + "-live_ready")) || this.set("onlineGreetingsPreview",
			{
				actionMessage: languageParser.translate("widget_preview_translation", a + "-say_something"),
				shortGreeting: languageParser.translate("widget_preview_translation", a + "-online"),
				longGreeting: languageParser.translate("widget_preview_translation", a + "-live_ready"),
				languageUpdated: !0
			}), !this.awayGreetingsPreview || (this.awayGreetingsPreview.shortGreeting !== languageParser.translate("widget_preview_translation", c + "-away") && this.awayGreetingsPreview.shortGreeting !== languageParser.translate("widget_preview_translation",
			c + "-status_message") + " - " + languageParser.translate("widget_preview_translation", c + "-away") || "" !== this.awayGreetingsPreview.longGreeting) || this.set("awayGreetingsPreview", {
			shortGreeting: languageParser.translate("widget_preview_translation", a + "-away"),
			longGreeting: "",
			languageUpdated: !0
		}))
	},
	updateAllContent: function (a, c) {
		var d = this, b = {};
		this.activeProperty && (this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id) && (b.onlineGreetings = this.onlineGreetingsPreview, b.awayGreetings = this.awayGreetingsPreview,
			this.prechatFormPreview.enabled ? (b.prechatForm = {
				prechatFormText: this.prechatFormPreview.text,
				questions: []
			}, this.prechatFormPreview.fieldsData.parsedFields.forEach(function (a) {
				b.prechatForm.questions.push({
					label: a.label,
					isRequired: a.isRequired,
					type: a.type,
					selections: a.selections && a.selections.length ? a.selections.getEach("text") : null
				})
			}), b.prechatForm.questions.length || (b.prechatForm = {
				prechatFormText: null,
				questions: null
			})) : b.prechatForm = {prechatFormText: null, questions: null}, b.offlineForm = {
			shortGreeting: decodeStr(this.offlineFormPreview.shortGreeting),
			offlineFormText: decodeStr(this.offlineFormPreview.text), questions: []
		}, this.offlineFormPreview.fieldsData.parsedFields.forEach(function (a) {
			b.offlineForm.questions.push({
				label: a.label,
				isRequired: a.isRequired,
				type: a.type,
				selections: a.selections && a.selections.length ? a.selections.getEach("text") : null
			})
		}), b.offlineForm.questions.length && !this.validateOfflineForm(b.offlineForm) && (b.offlineForm = null), b.offlineForm.questions.length || (b.offlineForm = null), b.languageCode = a, b.onlineGreetings.actionMessage = decodeStr(b.onlineGreetings.actionMessage),
			b.onlineGreetings.longGreeting = decodeStr(b.onlineGreetings.longGreeting), b.onlineGreetings.shortGreeting = decodeStr(b.onlineGreetings.shortGreeting), b.awayGreetings.longGreeting = decodeStr(b.awayGreetings.longGreeting), b.awayGreetings.shortGreeting = decodeStr(b.awayGreetings.shortGreeting), null !== b.prechatForm.prechatFormText && (b.prechatForm.prechatFormText = decodeStr(b.prechatForm.prechatFormText)), socketConnector.saveWidgetContent(this.activeProperty.id, this.activeWidget.id, b, function (e) {
			if (e) return c(!0);
			widget = d.getWidget(d.activeWidget.id);
			widget.set("languageCode", a);
			null === b.prechatForm.prechatFormText && null === b.prechatForm.questions ? (widget.prechatForm.set("enabled", !1), widget.prechatForm.set("text", ""), widget.prechatForm.set("fieldsData", Tawk.FormFields.create({
				fields: [],
				formType: "prechat"
			}))) : (widget.prechatForm.set("enabled", !0), widget.prechatForm.set("text", b.prechatForm.prechatFormText), widget.prechatForm.set("fieldsData", Tawk.FormFields.create({
				fields: b.prechatForm.questions,
				formType: "prechat"
			})));
			b.offlineForm && (widget.offlineForm.set("shortGreeting", b.offlineForm.shortGreeting), widget.offlineForm.set("text", b.offlineForm.offlineFormText), widget.offlineForm.set("fieldsData", Tawk.FormFields.create({
				fields: b.offlineForm.questions,
				formType: "offline"
			})));
			b.onlineGreetings && widget.set("onlineGreetings", Tawk.CopyableModel.create(b.onlineGreetings));
			b.awayGreetings && widget.set("awayGreetings", Tawk.CopyableModel.create(b.awayGreetings));
			d.resetWidget(d.activeWidget.id);
			return c()
		}))
	},
	updateLanguage: function (a,
	                          c) {
		var d = this;
		this.activeProperty && (this.activeProperty.isAdmin && this.activeWidget && this.activeWidget.id) && socketConnector.saveWidgetLanguage(this.activeProperty.id, this.activeWidget.id, a, function (b) {
			if (b) return c(!0);
			widget = d.getWidget(d.activeWidget.id);
			widget.set("languageCode", a);
			return c()
		})
	},
	validateOfflineForm: function (a) {
		var c = !0;
		a.questions.forEach(function (a) {
			if ("name" === a.type && !a.isRequired || "email" === a.type && !a.isRequired || "message" === a.type && !a.isRequired) a.isRequired = !0
		});
		a = a.questions.getEach("type");
		if (-1 === a.indexOf("name") || -1 === a.indexOf("email") || -1 === a.indexOf("message")) c = !1;
		return c
	},
	loadWhitelabelAddon: function (a, c) {
		var d = 0, b = function () {
			d++;
			2 === d && c(!0)
		};
		this.activeProperty.isSite ? (this.activeProperty.id !== this.whitelabelController.propertyId ? (this.whitelabelController.set("propertyId", this.activeProperty.id), this.whitelabelController.loadWhitelabelData(b)) : this.whitelabelController.resetSettings(b), this.whitelabelController.set("currentView", a)) : (this.whitelabelController.setProperties({
			whitelabelAddOn: null,
			originalData: null, propertyId: null, widgetView: null
		}), c(!1));
		Tawk.userController.getExistingCCCards(!1, b)
	}
});
Tawk.BanController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null, pagedList: null, searchQuery: null, openProperty: function (a, c) {
		this.set("activeProperty", a);
		this.set("pagedList", Tawk.PagingListModel.create({perpage: c}));
		this.set("searchQuery", {query: null, pageId: a.id, time: null, forward: null, limit: c});
		this.pagedList.reset();
		this.pagedList.startList();
		this.getLastViews();
		this.getList();
		Tawk.routing.titlePath.subviewName = languageParser.translate("ban_list", "view_title");
		Tawk.routing.setTitle()
	}, getList: function (a) {
		var c = this, d = Tawk.routing.getPath();
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		this.set("isLoading", !0);
		socketConnector.getBanList(this.searchQuery, function (b, e) {
			var f = [];
			if (b) return c.set("isLoading", !1), a(b);
			e.forEach(function (a) {
				a.createdOn !== c.searchQuery.time && (a = Tawk.createBanEntryFromJSON(a)) && f.pushObject(a)
			});
			c.pagedList.setList(f);
			f.length ?
				c.pagedList.setTotal(c.pagedList.currentData.length + 1) : c.pagedList.setTotal(c.pagedList.currentData.length);
			c.set("isLoading", !1);
			d.itemId ? c.openItem(d.itemId) : c.lastViews && ("ban-list" === c.lastViews.subView && c.lastViews.itemId) && c.openItem(c.lastViews.itemId);
			return a(null, f.length)
		})
	}, loadNextList: function (a) {
		a = a || function () {
		};
		if (this.pagedList.isLastPage()) return a(null, !1);
		this.set("searchQuery.forward", !1);
		this.set("searchQuery.time", this.pagedList.currentData.objectAt(this.pagedList.currentData.length -
			1).co);
		this.pagedList.nextList();
		this.getList(a)
	}, searchList: function (a) {
		a ? this.set("searchQuery.query", a) : this.set("searchQuery.query", null);
		this.set("searchQuery.forward", null);
		this.set("searchQuery.time", null);
		this.pagedList.reset();
		this.pagedList.startList();
		this.getList()
	}, toggleAllMark: function (a) {
		this.activeProperty.isAdmin && this.pagedList.currentData.setEach("isMarked", a)
	}, toggleMark: function (a, c) {
		var d = this.pagedList.getItem(a);
		this.activeProperty.isAdmin && d && d.set("isMarked", c)
	}, openItem: function (a) {
		this.activeProperty &&
		(this.pagedList.currentData.setEach("isMarked", !1), (a = a ? this.pagedList.getItem(a) : Tawk.BanEntryModel.create()) ? (this.set("activeBan", a.clone()), this.loadHistory(), this.activeBan.id ? (this.saveLastSubView({itemId: this.activeBan.id}), Tawk.routing.titlePath.itemName = this.activeBan.valueDisplay) : Tawk.routing.titlePath.itemName = "Add Ban", Tawk.routing.setTitle(), Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "ban-list",
			itemId: this.activeBan.id || null,
			widgetId: null
		})) : Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id, subView: "ban-list", itemId: null, widgetId: null
		}))
	}, closeView: function () {
		if (this.activeBan) return this.closeItem(), !1;
		this.resetData();
		return !0
	}, closeItem: function () {
		this.pagedList.currentData.setEach("isMarked", !1);
		this.set("activeBan", null);
		this.saveLastSubView({itemId: null})
	}, resetData: function () {
		this.set("activeBan", null);
		this.set("pagedList", null)
	}, loadHistory: function () {
		var a, c, d, b, e = this;
		this.activeBan && (this.activeBan.id && !this.activeBan.transcript.isLoaded) &&
		(a = this.activeBan.id, c = this.activeBan.entry, d = this.activeProperty.id, b = this.get("activeBan.isVisitor") ? "getHistoryByBannedVisitorId" : "getHistoryByBannedIp", this.activeBan.set("transcript.isError", !1), socketConnector[b](d, c, function (b, c) {
			e.processHistory(b, a, c)
		}))
	}, processHistory: function (a, c, d) {
		if (this.activeBan) {
			if (a) return this.activeBan.set("transcript.isError", !0);
			d && (a = conversationProcess.processHistory(d.c, d.n)) && this.activeBan.set("transcript.content", a.transcriptData);
			this.activeBan.set("transcript.isLoaded",
				!0)
		}
	}, deleteSingle: function (a) {
		var c;
		a = a || function () {
		};
		if (!this.activeBan) return a(!0);
		c = this.pagedList.getItem(this.activeBan.id);
		if (!c) return a(!0);
		c.set("isMarked", !0);
		this.bulkDelete(function (d) {
			c.set("isMarked", !1);
			if (d) return a(d);
			a()
		})
	}, bulkDelete: function (a) {
		var c, d = this, b = [], e = [];
		a = a || function () {
		};
		if (!this.pagedList || !this.pagedList.currentData.length || !this.activeProperty.isAdmin) return a();
		c = this.pagedList.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a();
		checkAndSetConfirmView(!1,
			function (f) {
				if (!f) return a(!0);
				c.forEach(function (a) {
					"ip" === a.type ? b.push({banValue: a.entry, pageId: a.propertyId}) : e.push({
						banValue: a.entry,
						pageId: a.propertyId
					})
				});
				socketConnector.unBanVisitors(e, b, function (b, c) {
					if (b) return a(!0);
					d.pagedList.reset();
					d.pagedList.startList();
					d.getList(a)
				})
			})
	}, submitBan: function (a, c, d) {
		var b, e = this;
		if (!this.activeBan) return d(!0);
		b = this.pagedList.getItem(this.activeBan.id);
		if (this.activeBan.id && !b) return d(!0);
		if (this.activeBan.id) return socketConnector.editBanReason(this.activeProperty.id,
			this.activeBan.entry, c, function (a) {
				if (a) return d(!0);
				b.set("reason", c);
				e.openItem(b.id);
				d()
			});
		this.banByIp(a, c, d)
	}, banByIp: function (a, c, d) {
		var b = this;
		if (!this.activeProperty) return d(!0);
		socketConnector.banVisitorByIp(this.activeProperty.id, a, c, function (a) {
			if (a) return d(!0);
			b.pagedList.reset();
			b.pagedList.startList();
			b.getList(function () {
				b.set("activeBan", null)
			})
		})
	}
});
Tawk.PageContentController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	imageData: null, showCamera: !1, actions: {
		addLink: function () {
			this.customization.links.pushObject({
				value: "",
				type: null, index: Date.now()
			})
		}
	}, openPersonalPage: function (a) {
		var c, d = this, b = Tawk.webProperties.pages.findProperty("type", "profile");
		a = a || function () {
		};
		b && (c = Tawk.PropertyModel.create(), c.initialize(b), Tawk.webProperties.getPropertyInformation(b.id, function (b, f) {
			if (b) return a(b);
			c.loadSettings(f);
			c.set("isPersonal", !0);
			c.set("personalInfo", Tawk.userController.user);
			c.set("shareFbLink", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(c.siteLink));
			c.set("shareTwLink", "https://twitter.com/share?url=" +
				encodeURIComponent(c.siteLink));
			d.set("activeProperty", c);
			a()
		}))
	}, openProperty: function (a) {
		this.activeProperty && this.activeProperty.id === a.id || (this.set("activeProperty", a), this.set("customization", this.activeProperty.customization.copy()), this.set("countryCode", this.customization.location.country), this.set("cityList", []), this.set("imageData", null), this.getLastViews(), Tawk.routing.titlePath.subviewName = languageParser.translate("admin", "page_content"), Tawk.routing.setTitle())
	}, executeSave: function (a,
	                          c) {
		this.activeProperty.isPersonal ? socketConnector.saveProfilePageCustomization(this.activeProperty.id, a, c) : socketConnector.saveBusinessPageCustomization(this.activeProperty.id, a, c)
	}, removeExternalLink: function (a) {
		this.customization.links.removeAt(a);
		this.updateLinks()
	}, uploadPhoto: function (a, c, d, b) {
		this.set("imageData", {file: a, cropDimensions: c, imageDimensions: d, type: b, dataType: "file"})
	}, applyImage: function (a) {
		var c = this;
		this.imageData && ("page-profile" === this.imageData.type ? (this.customization.set("logo",
			a), this.customization.set("removeLogo", !1), resizeForChat(a, this.imageData.imageDimensions, {
			width: 75,
			height: 79
		}, function (a) {
			c.customization.set("profileImage", a)
		})) : (this.customization.set("header", a), this.customization.set("removeHeader", !1)), this.set("imageData", null))
	}, openCamera: function () {
		this.set("imageData", {
			cropDimensions: {width: 200, height: 200},
			imageDimensions: {width: 137, height: 137},
			type: "page-profile",
			dataType: "video"
		})
	}, updateCountryCode: function (a) {
		a ? this.set("countryCode", a) : this.set("countryCode",
			null);
		this.set("cityList", []);
		this.customization.location.set("city", null);
		this.customization.location.set("state", null);
		this.customization.location.set("locationId", null);
		this.customization.location.set("locationInfo", null)
	}, updatePageLocationDetails: function (a) {
		a = this.cityList[a];
		this.customization && a && (this.customization.location.set("country", this.countryCode.toUpperCase()), this.customization.location.set("city", a.city), this.customization.location.set("state", a.state), this.customization.location.set("locationId",
			a.id), this.customization.location.set("locationInfo", a.city + (a.state ? ", " + a.state : "")))
	}, searchCities: function (a, c) {
		var d = this;
		this.set("cityList", []);
		if (!a) return c();
		getCities(a, this.countryCode, function (a) {
			a && d.set("cityList", a);
			c()
		})
	}, extractUrl: function (a, c) {
		var d, b = this.customization.links[a];
		if (b) {
			d = -1 !== c.indexOf("facebook.com") ? "facebook" : -1 !== c.indexOf("flickr.com") ? "flickr" : -1 !== c.indexOf("instagram.com") ? "instagram" : -1 !== c.indexOf("twitter.com") ? "twitter" : -1 !== c.indexOf("youtube.com") ?
				"youtube" : -1 !== c.indexOf("vimeo.com") ? "vimeo" : -1 !== c.indexOf("linkedin.com") ? "linkedin" : -1 !== c.indexOf("plus.google.com") ? "gplus" : "other";
			var e = this.customization.links.findProperty("type", d);
			b.type = null !== e && b !== e && "other" !== d ? "other" : d;
			b.value = c;
			b.index = this.activeProperty.id + b.type + Date.now()
		}
		this.updateLinks()
	}, updateLinks: function () {
		this.customization.set("facebook", this.customization.links.filterProperty("type", "facebook"));
		this.customization.set("flickr", this.customization.links.filterProperty("type",
			"flickr"));
		this.customization.set("instagram", this.customization.links.filterProperty("type", "instagram"));
		this.customization.set("twitter", this.customization.links.filterProperty("type", "twitter"));
		this.customization.set("youtube", this.customization.links.filterProperty("type", "youtube"));
		this.customization.set("vimeo", this.customization.links.filterProperty("type", "vimeo"));
		this.customization.set("linkedin", this.customization.links.filterProperty("type", "linkedin"));
		this.customization.set("gplus",
			this.customization.links.filterProperty("type", "gplus"));
		this.customization.set("otherLinks", this.customization.links.filterProperty("type", "other"))
	}, savePageCustomization: function (a, c, d) {
		var b, e = this;
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.customization) return d(!0);
		b = {};
		b.logo = this.customization.logo !== this.activeProperty.customization.logo ? this.customization.logo : null;
		b.profileImage = this.customization.profileImage !== this.activeProperty.customization.profileImage ? this.customization.profileImage :
			null;
		b.banner = this.customization.header !== this.activeProperty.customization.header ? this.customization.header : null;
		b.slogan = this.customization.slogan;
		b.summary = this.customization.summary;
		b.description = this.customization.description;
		b.tags = decodeStr(this.customization.tagList.join(","));
		b.links = this.customization.getAllLinksValue();
		b.country = this.customization.location.country;
		b.city = this.customization.location.city;
		b.state = this.customization.location.state;
		b.locationId = this.customization.location.locationId;
		this.customization.removeLogo && (b.removeLogo = !0, Tawk.webProperties.personalPage.set("alias.aliasImage", null));
		this.customization.removeHeader && (b.removeBanner = !0);
		this.activeProperty.isPersonal && ("undefined" !== typeof c && this.activeProperty.tawkId !== c && (b.tawkId = c), "undefined" !== typeof a && this.activeProperty.enabled !== a && (a ? this.enablePage() : this.disablePage()));
		this.executeSave(b, function (a, c) {
			if (a) return d(!0);
			e.activeProperty.set("customization", e.customization.copy());
			c.logoHash && e.activeProperty.customization.set("logo",
				GLOBAL_AWS_LG_URL + "/" + c.logoHash + "?=" + randomString(5, !0));
			c.profileImageHash && (e.activeProperty.customization.set("profileImage", c.profileImageHash), Tawk.webProperties.personalPage.set("alias.aliasImage", c.profileImageHash + ("?_t" + Date.now())));
			c.bannerHash && e.activeProperty.customization.set("header", GLOBAL_AWS_BN_URL + "/" + c.bannerHash + "?=" + randomString(5, !0));
			b.tawkId && e.activeProperty.isPersonal ? Tawk.webProperties.updatePropertyData({
				pgid: e.activeProperty.id,
				twid: b.tawkId
			}, !1, function (a) {
				e.activeProperty.set("tawkId",
					b.tawkId);
				d()
			}) : d()
		})
	}, removeLogo: function () {
		this.activeProperty && (-1 !== this.customization.logo.indexOf("data:image/jpeg;base64") ? this.customization.set("logo", this.activeProperty.customization.logo) : (this.customization.set("removeLogo", !0), this.customization.set("logo", null), this.customization.set("profileImage", null)))
	}, removeHeader: function () {
		this.activeProperty && (-1 !== this.customization.header.indexOf("data:image/jpeg;base64") ? this.customization.set("header", this.activeProperty.customization.header) :
			(this.customization.set("removeHeader", !0), this.customization.set("header", null)))
	}, disablePage: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		Tawk.webProperties.disableProperty(this.activeProperty.id, function (d) {
			if (d) return a(d);
			c.activeProperty.set("enabled", !1);
			return a()
		})
	}, enablePage: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		Tawk.webProperties.enableProperty(this.activeProperty.id, function (d) {
			if (d) return a(d);
			c.activeProperty.set("enabled",
				!0);
			return a()
		})
	}, checkTawkId: function (a, c) {
		if (!this.activeProperty || !this.activeProperty.id) return socketConnector.checkTawkIdVacancy(a, null, c);
		if (this.activeProperty.tawkId === a) return c(null);
		socketConnector.checkTawkIdVacancy(a, this.activeProperty.id, c)
	}, closeView: function () {
		this.resetData();
		return !0
	}, resetData: function () {
		this.set("customization", this.activeProperty.customization.copy());
		this.set("countryCode", this.customization.location.country);
		this.set("cityList", []);
		this.set("imageData", null)
	}
});
var handleCCPayment = function (a, c) {
	var d = {}, b = {};
	Stripe.setPublishableKey(STRIPE_KEY);
	b.addonId = a.addOnId;
	b.planId = a.planId;
	b.paymentMethod = "stripe";
	b.action = a.action;
	a.subscriptionId && (b.currentSubscriptionId = a.subscriptionId);
	"new-card" === a.customerId ? (d.name = a["cardholder-name"], d.number = a["card-number"], d.cvc = a["card-cvc"], d.address_zip = a["zip-code"], d.exp = a["card-expiry"], Stripe.card.createToken(d, function (d, f) {
		if (f.error) return c(!0, f.error.message);
		socketConnector.createStripePayment(f.id, function (d,
		                                                    e) {
			if (d) return c(!0, languageParser.translate("admin", "payment_process_fail"), e ? e.customerId : null);
			b.source = e.customerId;
			createSubscription(a.propertyId, b, c)
		})
	})) : (b.source = a.customerId, createSubscription(a.propertyId, b, c))
}, handlePaypalPayment = function (a, c) {
	var d, b, e, f, g, h, k, l = {}, m = {}, n = window.addEventListener ? "addEventListener" : "attachEvent",
		p = window.addEventListener ? "removeEventListener" : "detachEvent",
		q = "attachEvent" === n ? "onmessage" : "message", r = !1;
	if (desktopConnector.enabled() && !desktopConnector.canUsePaypal()) return c(!0,
		languageParser.translate("admin", "paypal_unsupported"));
	delete localStorage.paypal;
	window.paypalWindow && !window.paypalWindow.closed ? window.paypalWindow.focus() : (a.subscriptionId && (m.currentSubscriptionId = a.subscriptionId), m.addonId = a.addOnId, m.planId = a.planId, m.paymentMethod = "paypal", m.action = a.action, l.planId = a.planId, l.pageId = a.propertyId, l.addonId = a.addOnId, k = function () {
		clearTimeout(g);
		delete localStorage.paypal;
		$(window).off("storage.payPal");
		$(window).unbind("focus.payPal");
		window[p](q, d);
		window.paypalWindow &&
		"function" === typeof window.paypalWindow.close && (window.paypalWindow.close(), window.paypalWindow = null)
	}, e = function () {
		k();
		desktopConnector.enabled() && desktopConnector.canUsePaypal() && desktopConnector.send("closePayPalWindow");
		return createSubscription(a.propertyId, m, c)
	}, f = function () {
		k();
		desktopConnector.enabled() && desktopConnector.canUsePaypal() && desktopConnector.send("closePayPalWindow");
		return c(!0, languageParser.translate("admin", "paypal_cancel"))
	}, b = function (a) {
		r || (window.paypalWindow && window.paypalWindow.closed ?
			(r = !0, e()) : localStorage.paypal && "return" === localStorage.paypal ? (r = !0, e()) : localStorage.paypal && "cancel" === localStorage.paypal && (r = !0, f()))
	}, d = function (a) {
		if (!r) if ("return" === a.data) r = !0, e(); else if ("cancel" === a.data) r = !0, f(); else {
			try {
				data = JSON.parse(a.data)
			} catch (b) {
				return
			}
			data.cmd && "paypalWindowClosed" === data.cmd && (localStorage.paypal && "return" === localStorage.paypal ? (r = !0, e()) : (r = !0, f()))
		}
	}, h = function (a) {
		a.originalEvent && !r && "paypal" === a.originalEvent.key && ("return" === a.originalEvent.newValue ? (r =
			!0, e()) : "cancel" === a.originalEvent.newValue && (r = !0, f()))
	}, k(), desktopConnector.enabled() || (window.paypalWindow = window.open("", "", "resizable=yes, toolbar=no, location=no, menubar=no, personalbar=no")), socketConnector.createPaypalPayment(l, function (a, e) {
		if (a || !e.url) return window.paypalWindow && "function" === typeof window.paypalWindow.close && (window.paypalWindow.close(), window.paypalWindow = null), c(!0, languageParser.translate("admin", "paypal_no_connection"));
		m.source = e.token;
		window[n](q, d);
		$(window).bind("focus.payPal",
			b);
		$(window).on("storage.payPal", h);
		g = setTimeout(function () {
			k();
			return c(!0, languageParser.translate("admin", "paypal_token_expiration"))
		}, 36E5);
		desktopConnector.enabled() ? desktopConnector.send("paypal", e.url) : (window.paypalWindow.location.href = e.url, window.paypalWindow.focus())
	}))
}, createSubscription = function (a, c, d) {
	socketConnector.createSubscription(a, c, function (a, c) {
		var f = languageParser.translate("admin", "payment_process_fail");
		return a ? (a.message ? f = "MEMBERSHIP_CHANGE" === a.message || "PROPERTY_REMOVAL" ===
		a.message ? languageParser.translate("admin", "no_access_addon") : languageParser.translate("admin", a.message) : "UnauthorizedError" === a.code ? f = languageParser.translate("admin", "no_access_addon") : "InternalServerError" === a.code && (f = languageParser.translate("form_validation_messages", "SERVER_ERROR")), d(!0, f)) : d(null, c.subcriptionId)
	})
};
Tawk.AddOnsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null, activeAddOn: null, existingCards: [], addOnList: [], openProperty: function (a, c) {
		var d =
			this, b = Tawk.routing.getPath(), e = 0, f = function () {
			e++;
			2 === e && d.set("isLoading", !1)
		};
		this.set("isLoading", !0);
		this.set("activeProperty", a);
		this.hasAccess() && this.set("canUsePaypal", desktopConnector.canUsePaypal());
		this.getLastViews();
		Tawk.userController.getExistingCCCards(!1, f);
		this.getAddOnList(function () {
			b.itemId ? -1 !== b.itemId.indexOf("-settings") ? (d.saveLastSubView({viewType: "settings"}), d.openSettings(b.itemId.replace("-settings", ""))) : d.openItem(b.itemId) : d.saveLastSubView({itemId: null});
			f()
		});
		Tawk.routing.titlePath.subviewName =
			languageParser.translate("admin", "add_on_title");
		Tawk.routing.setTitle()
	}, hasAccess: function () {
		return this.activeProperty && this.activeProperty.isAdmin && this.activeProperty.isSite
	}, getAddOnList: function (a) {
		var c = this, d = [];
		this.addOnList.clear();
		Object.keys(addOnList).forEach(function (a) {
			d.pushObject(Ember.Object.create(addOnList[a]))
		});
		socketConnector.getAddOns(this.activeProperty.id, function (b, f) {
			var g;
			if (b) return a();
			f.forEach(function (a) {
				var b = [];
				if (g = d.findProperty("id", a.addonId)) a.hasSubscription ?
					(g.set("isSubscribed", !0), g.set("isActive", !0)) : (g.set("isSubscribed", !1), 0 > moment().diff(a.expiry) && g.set("isActive", !0)), a.plans.forEach(function (a) {
					a = Ember.Object.create({
						id: a.planId,
						price: a.price,
						pricePretify: languageParser.translate("admin", a.planId),
						stripeId: a.stripeId,
						cycle: a.cycle
					});
					b.pushObject(a)
				}), g.set("mainPrice", languageParser.translate("admin", a.addonId + "-main-price")), g.set("plans", b.sortBy("price").reverse())
			});
			c.set("addOnList", d);
			a()
		});
		if (!this.activeProperty.isAdmin) {
			var b = [];
			this.activeProperty.agentAccess.forEach(function (a) {
				"admin" === a.rl && a.en && b.push({id: a.aid, name: Tawk.agentsController.getName(a.aid)})
			});
			this.set("contactAdmins", b)
		}
	}, openItem: function (a, c, d) {
		var b, e = this;
		c = c || function () {
		};
		b = this.addOnList.findProperty("id", a);
		if (!b) return c(!0);
		d || (this.set("activeAddOn", b), this.saveLastSubView({itemId: a}), this.set("isLoading", !0));
		socketConnector.getAddOnDetail(this.activeProperty.id, b.id, function (f, g) {
			if (f) return d || e.set("isLoading", !1), c(!0);
			"whitelabel" === a &&
			(g.hasSubcription ? g.settings.address && (g.settings.address = e.createAddressData(g.settings.address), g.settings.candidate = {address: g.settings.address.address}) : (g.settings.widget = {
				label: "Powered by *tawk.to*",
				url: "https://www.tawk.to"
			}, g.settings.email = {
				label: "No tawk.to live chat account? Create one for free here",
				url: "https://www.tawk.to"
			}));
			g.subscription && b.set("subscriptionId", g.subscription.subscriptionId);
			b.set("settings", Ember.Object.create(g.settings));
			"live-answering" === a && b.isActive && (b.settings.set("entitlements",
				g.entitlements), 168 === g.entitlements.hours && b.settings.set("fulltime", !0), e.extractLiveAnsweringScheduler(g.settings, b));
			d || e.set("isLoading", !1);
			g.hasSubcription || (e.lastViews.viewType = null, e.saveLastSubView());
			Tawk.routing.titlePath.itemName = b.name;
			Tawk.routing.setTitle();
			return c()
		})
	}, openSettings: function (a, c) {
		var d, b = this;
		c = c || function () {
		};
		if (!this.hasAccess()) return c();
		addOn = this.addOnList.findProperty("id", a);
		if (!addOn) return c();
		this.set("isLoading", !0);
		d = function (d) {
			if (d) return b.set("isLoading",
				!1), c();
			b.saveLastSubView({itemId: a, viewType: "settings"});
			b.set("activeAddOn", addOn);
			"live-answering" === a ? b.getHiredAgentContent(function () {
				b.set("isLoading", !1);
				return c()
			}) : (b.set("isLoading", !1), c())
		};
		addOn.settings ? (d(), this.set("activeAddOn", addOn), this.saveLastSubView({
			itemId: a,
			viewType: "settings"
		})) : this.openItem(a, d.bind(this), !0)
	}, closeView: function () {
		if (this.activeAddOn) return this.closeItem(), !1;
		this.resetData();
		return !0
	}, closeItem: function () {
		this.set("activeAddOn", null);
		this.saveLastSubView({itemId: null})
	},
	resetData: function () {
		this.set("activeAddOn", null)
	}, saveWhitelabelSettings: function (a, c) {
		var d, b = this;
		this.hasAccess() && this.activeAddOn && socketConnector.saveWhitelabelSettings(this.activeProperty.id, a, function (e, f) {
			if (e) return c(e);
			d = b.addOnList.findProperty("id", "whitelabel");
			d.set("settings.email", a.email);
			d.set("settings.whitelabel", a.whitelabel);
			d.set("settings.enabled", a.enabled);
			b.openItem("whitelabel");
			return c()
		})
	}, handlePayment: function (a, c, d) {
		var b, e = this, f = function (f, h) {
			var k = function () {
				f ?
					d(f, h) : (b.set("subscriptionId", h), b.set("isSubscribed", !0), b.set("isActive", !0), b.set("settings", Ember.Object.create({
						enabled: !0,
						email: {label: "", url: ""},
						widget: {label: "", url: ""}
					})), e.openItem(b.id), d())
			};
			"cc" === a && "new-card" === c.customerId ? Tawk.userController.getExistingCCCards(!0, k.bind(e)) : k()
		};
		d = d || function () {
		};
		if (!this.hasAccess() || !this.activeAddOn) return d(!0);
		b = this.addOnList.findProperty("id", this.activeAddOn.id);
		if (!b) return d(!0);
		c.addOnId = b.id;
		c.propertyId = this.activeProperty.id;
		c.action =
			"create";
		"cc" === a ? handleCCPayment(c, f) : handlePaypalPayment(c, f)
	}, setupForwarding: function (a, c) {
		var d, b, e = this;
		if (!this.hasAccess() || !this.activeAddOn) return c(!0);
		b = this.addOnList.findProperty("id", "whitelabel");
		failedTimeout = setTimeout(function () {
			c(!0)
		}, 12E4);
		d = function (a) {
			clearTimeout(failedTimeout);
			b.set("settings.address", e.createAddressData(a));
			e.openItem("whitelabel");
			c()
		};
		socketConnector.socket.on("forwarderUpdate", d);
		socketConnector.setupForwarder(this.activeProperty.id, {email: a}, function (a,
		                                                                             e) {
			if (a) return socketConnector.socket.removeListener("forwarderUpdate", d), clearTimeout(failedTimeout), c(!0);
			b.set("candidate", e)
		})
	}, verifyForwarding: function (a) {
		var c, d = this;
		if (!this.hasAccess() || !this.activeAddOn || !this.activeAddOn.settings.address) return a(!0);
		c = this.addOnList.findProperty("id", "whitelabel");
		failedTimeout = setTimeout(function () {
			a(!0)
		}, 12E4);
		socketConnector.socket.on("forwarderUpdate", function (b) {
			clearTimeout(failedTimeout);
			c.set("settings.address", d.createAddressData(b));
			d.openItem("whitelabel");
			a()
		});
		socketConnector.verifyForwarding(this.activeProperty.id, {email: this.activeAddOn.settings.address.address}, function (b) {
			if (b) return a(!0)
		})
	}, verifySPF: function (a) {
		var c, d = this;
		if (!this.hasAccess() || !this.activeAddOn || !this.activeAddOn.settings.address) return a(!0);
		c = this.addOnList.findProperty("id", "whitelabel");
		socketConnector.verifySPF(this.activeProperty.id, {email: this.activeAddOn.settings.address.address}, function (b, e) {
			if (b) return a(!0);
			c.set("settings.address", d.createAddressData(e.address));
			d.openItem("whitelabel");
			a()
		})
	}, verifyDKIM: function (a) {
		var c, d = this;
		if (!this.hasAccess() || !this.activeAddOn || !this.activeAddOn.settings.address) return a(!0);
		c = this.addOnList.findProperty("id", "whitelabel");
		socketConnector.verifyDKIM(this.activeProperty.id, {email: this.activeAddOn.settings.address.address}, function (b, e) {
			if (b) return a(!0);
			c.set("settings.address", d.createAddressData(e.address));
			d.openItem("whitelabel");
			a()
		})
	}, createAddressData: function (a) {
		var c = a.address.split("@");
		a.dkim1 = "tawk1._domainkey." +
			c[1];
		a.dkim2 = "tawk1._domainkey.mta.tawk.to";
		a.dkim3 = "tawk2._domainkey." + c[1];
		a.dkim4 = "tawk2._domainkey.mta.tawk.to";
		a.fwdVerified && (a.fwdLastVerified = moment(a.fwdVerified).format("DD/MMM/YYYY"));
		a.spfVerified && (a.spfLastVerified = moment(a.spfVerified).format("DD/MMM/YYYY"));
		a.dkimVerified && (a.dkimLastVerified = moment(a.dkimVerified).format("DD/MMM/YYYY"));
		null === a.fwdVerifyRqst ? a.newFwdVerified = !0 : 12 < moment().diff(moment(a.fwdVerifyRqst), "hours") ? a.newFwdVerified = !1 : a.pendingFwdVerified = !0;
		return a
	},
	saveForwarderName: function (a, c) {
		var d, b = this;
		if (!this.hasAccess() || !this.activeAddOn || !this.activeAddOn.settings.address) return c(!0);
		d = this.addOnList.findProperty("id", "whitelabel");
		socketConnector.saveForwarderName(this.activeProperty.id, {name: a}, function (a, f) {
			if (a) return c(!0);
			d.set("settings.address", b.createAddressData(f.address));
			b.openItem("whitelabel");
			c()
		})
	}, removeForwarder: function (a) {
		var c, d = this;
		if (!this.hasAccess() || !this.activeAddOn || !this.activeAddOn.settings.address) return a(!0);
		c =
			this.addOnList.findProperty("id", "whitelabel");
		socketConnector.removeForwarder(this.activeProperty.id, function (b, e) {
			if (b) return a(!0);
			e.success && (c.set("settings.address", null), c.set("settings.candidate", null));
			d.openItem("whitelabel");
			a()
		})
	}, getHiredAgentContent: function (a) {
		var c = this, d = 0, b = function () {
			d++;
			3 === d && a()
		};
		if (!this.hasAccess() || !this.activeAddOn) return a(!0);
		socketConnector.getHiredAgentContent(this.activeProperty.id, function (a, d) {
			d && d.hiredAgent && (c.activeAddOn.settings.set("business",
				d.hiredAgent.business ? Ember.Object.create(d.hiredAgent.business) : null), c.activeAddOn.settings.set("offering", d.hiredAgent.offering), c.activeAddOn.settings.set("culture", d.hiredAgent.culture), c.activeAddOn.settings.set("faqs", []), c.activeAddOn.settings.set("emergency", []), c.activeAddOn.settings.set("objectives", d.hiredAgent.objectives || []), c.activeAddOn.settings.set("reputation", []), c.activeAddOn.settings.set("hiredContent", Ember.Object.create(d.hiredAgent)), d.hiredAgent.faqs ? d.hiredAgent.faqs.forEach(function (a) {
				a.id =
					"faq-" + (new Date).getTime();
				a.qId = "faqq-" + (new Date).getTime();
				a.aId = "faqa-" + (new Date).getTime();
				a.canDelete = !0;
				c.activeAddOn.settings.faqs.pushObject(Ember.Object.create(a))
			}) : (c.activeAddOn.settings.faqs.pushObject(Ember.Object.create({
				id: "faq-" + (new Date).getTime(),
				qId: "faqq-" + (new Date).getTime(),
				aId: "faqa-" + (new Date).getTime(),
				canDelete: !0
			})), c.activeAddOn.settings.faqs.pushObject(Ember.Object.create({
				id: "faq-" + (new Date).getTime(),
				qId: "faqq-" + (new Date).getTime(),
				aId: "faqa-" + (new Date).getTime(),
				canDelete: !0
			}))), 1 === c.activeAddOn.settings.faqs.length && c.activeAddOn.settings.faqs[0].set("canDelete", !1), d.hiredAgent.emergency ? d.hiredAgent.emergency.forEach(function (a) {
				a.id = "econtact-" + (new Date).getTime();
				a.nId = "econtactN-" + (new Date).getTime();
				a.eId = "econtactE-" + (new Date).getTime();
				a.pId = "pcontactE-" + (new Date).getTime();
				a.canDelete = !0;
				c.activeAddOn.settings.emergency.pushObject(Ember.Object.create(a))
			}) : c.activeAddOn.settings.emergency.pushObject(Ember.Object.create({
				id: "econtact-" + (new Date).getTime(),
				nId: "econtactN-" + (new Date).getTime(),
				eId: "econtactE-" + (new Date).getTime(),
				pId: "pcontactE-" + (new Date).getTime(),
				canDelete: !1
			})), 1 === c.activeAddOn.settings.emergency.length && c.activeAddOn.settings.emergency[0].set("canDelete", !1), d.hiredAgent.reputation ? d.hiredAgent.reputation.forEach(function (a, b) {
				a.id = "rep-" + (new Date).getTime() + b;
				a.qId = "repq-" + (new Date).getTime() + b;
				a.aId = "repa-" + (new Date).getTime() + b;
				a.canDelete = !0;
				c.activeAddOn.settings.reputation.pushObject(Ember.Object.create(a))
			}) : (c.activeAddOn.settings.reputation.pushObject(Ember.Object.create({
				id: "rep-" +
				(new Date).getTime() + 0,
				qId: "repq-" + (new Date).getTime() + 0,
				aId: "repa-" + (new Date).getTime() + 0,
				canDelete: !0
			})), c.activeAddOn.settings.reputation.pushObject(Ember.Object.create({
				id: "rep-" + (new Date).getTime() + 1,
				qId: "repq-" + (new Date).getTime() + 1,
				aId: "repa-" + (new Date).getTime() + 1,
				canDelete: !0
			}))), 1 === c.activeAddOn.settings.reputation.length && c.activeAddOn.settings.reputation[0].set("canDelete", !1), c.activeAddOn.settings.set("canAddFAQ", 50 > c.activeAddOn.settings.faqs.length), c.activeAddOn.settings.set("canAddEContact",
				3 > c.activeAddOn.settings.emergency.length), c.activeAddOn.settings.set("canAddReputation", 10 > c.activeAddOn.settings.faqs.length), c.activeAddOn.settings.set("isWizardSetup", d.hiredAgent.business && d.hiredAgent.offering && d.hiredAgent.culture && d.hiredAgent.faqs && d.hiredAgent.emergency && d.hiredAgent.objectives && d.hiredAgent.reputation), c.activeAddOn.settings.set("isShortcutsSetup", Tawk.shortcutsController.hasShortcuts(c.activeProperty.id)));
			b()
		});
		socketConnector.getAlert(this.activeProperty.id, function (a,
		                                                           d) {
			!a && d.alertv && c.activeAddOn.settings.set("isAlertSetup", !0);
			b()
		});
		socketConnector.getKBList(this.activeProperty.id, {
			query: void 0,
			status: void 0,
			size: 1,
			category: void 0
		}, function (a, d) {
			!a && d.hits.length && c.activeAddOn.settings.set("isKBSetup", !0);
			b()
		})
	}, extractLiveAnsweringScheduler: function (a, c) {
		var d = [{day: 0, time: []}, {day: 1, time: []}, {day: 2, time: []}, {day: 3, time: []}, {
			day: 4,
			time: []
		}, {day: 5, time: []}, {day: 6, time: []}];
		c.settings.set("isSchedulerSetup", !1);
		a && (c.settings.fulltime && !a.schedule ? (c.settings.set("isSchedulerSetup",
			!0), d = [{day: 0, time: [{start: 0, end: 1440}]}, {day: 1, time: [{start: 0, end: 1440}]}, {
			day: 2,
			time: [{start: 0, end: 1440}]
		}, {day: 3, time: [{start: 0, end: 1440}]}, {day: 4, time: [{start: 0, end: 1440}]}, {
			day: 5,
			time: [{start: 0, end: 1440}]
		}, {day: 6, time: [{start: 0, end: 1440}]}], c.settings.setProperties({
			isSchedulerSetup: !0,
			city: "Royal Borough of Greenwich, United Kingdom",
			lat: "51.483462",
			lng: "0.0586198",
			placeId: "ChIJJc-4yymo2EcRwqZo5HwjGEk"
		})) : a.schedule && a.schedule.length && (a.schedule.forEach(function (a) {
			d.findProperty("day", a.day).time.push({
				start: a.start,
				end: a.end
			})
		}), c.settings.set("isSchedulerSetup", !0)));
		c.settings.set("scheduler", d)
	}, saveHiredAgentContent: function (a, c) {
		var d = this;
		if (!this.hasAccess() || !this.activeAddOn) return c(!0);
		socketConnector.saveHiredAgentContent(this.activeProperty.id, a, function (b) {
			if (b) return c(!0);
			a.business && d.activeAddOn.settings.set("business", Ember.Object.create(a.business));
			a.offering && d.activeAddOn.settings.set("offering", a.offering);
			a.culture && d.activeAddOn.settings.set("culture", a.culture);
			a.objectives && d.activeAddOn.settings.set("objectives",
				a.objectives);
			a.faqs && (d.activeAddOn.settings.faqs.clear(), a.faqs.forEach(function (a) {
				a.id = "faq-" + (new Date).getTime();
				a.qId = "faqq-" + (new Date).getTime();
				a.aId = "faqa-" + (new Date).getTime();
				a.canDelete = !0;
				d.activeAddOn.settings.faqs.pushObject(Ember.Object.create(a))
			}), 1 === d.activeAddOn.settings.faqs.length && d.activeAddOn.settings.faqs[0].set("canDelete", !1), d.activeAddOn.settings.set("canAddFAQ", 50 > d.activeAddOn.settings.faqs.length));
			a.emergency && (d.activeAddOn.settings.emergency.clear(), a.emergency.forEach(function (a) {
				a.id =
					"econtact-" + (new Date).getTime();
				a.nId = "econtactN-" + (new Date).getTime();
				a.eId = "econtactE-" + (new Date).getTime();
				a.pId = "pcontactE-" + (new Date).getTime();
				a.canDelete = !0;
				d.activeAddOn.settings.emergency.pushObject(Ember.Object.create(a))
			}), 1 === d.activeAddOn.settings.emergency.length && d.activeAddOn.settings.emergency[0].set("canDelete", !1), d.activeAddOn.settings.set("canAddEContact", 3 > d.activeAddOn.settings.emergency.length));
			a.reputation && (d.activeAddOn.settings.reputation.clear(), a.reputation.forEach(function (a,
			                                                                                           b) {
				a.id = "rep-" + (new Date).getTime() + b;
				a.qId = "repq-" + (new Date).getTime() + b;
				a.aId = "repa-" + (new Date).getTime() + b;
				a.canDelete = !0;
				d.activeAddOn.settings.reputation.pushObject(Ember.Object.create(a))
			}), 1 === d.activeAddOn.settings.reputation.length && d.activeAddOn.settings.reputation[0].set("canDelete", !1), d.activeAddOn.settings.set("canAddReputation", 10 > d.activeAddOn.settings.faqs.length));
			d.activeAddOn.settings.hiredContent.setProperties(a);
			c()
		})
	}, addFAQQuestion: function () {
		this.hasAccess() && (this.activeAddOn &&
			this.activeAddOn.settings && 50 !== this.activeAddOn.settings.faqs.length) && (this.activeAddOn.settings.faqs.pushObject(Ember.Object.create({
			q: "",
			a: "",
			id: "faq-" + (new Date).getTime(),
			qId: "faqq-" + (new Date).getTime(),
			aId: "faqa-" + (new Date).getTime(),
			canDelete: !0
		})), this.activeAddOn.settings.faqs[0].set("canDelete", !0), this.activeAddOn.settings.set("canAddFAQ", 50 > this.activeAddOn.settings.faqs.length))
	}, removeFAQQuestion: function (a) {
		this.hasAccess() && (this.activeAddOn && this.activeAddOn.settings && 0 !== this.activeAddOn.settings.faqs.length) &&
		(a = this.activeAddOn.settings.faqs.findProperty("id", a)) && (this.activeAddOn.settings.faqs.removeObject(a), 1 === this.activeAddOn.settings.faqs.length && this.activeAddOn.settings.faqs[0].set("canDelete", !1), this.activeAddOn.settings.set("canAddFAQ", 50 > this.activeAddOn.settings.faqs.length))
	}, addEmergencyContact: function () {
		this.hasAccess() && (this.activeAddOn && this.activeAddOn.settings && 3 !== this.activeAddOn.settings.emergency.length) && (this.activeAddOn.settings.emergency.pushObject(Ember.Object.create({
			id: "econtact-" +
			(new Date).getTime(),
			nId: "econtactN-" + (new Date).getTime(),
			eId: "econtactE-" + (new Date).getTime(),
			pId: "pcontactE-" + (new Date).getTime(),
			canDelete: !0
		})), this.activeAddOn.settings.emergency[0].set("canDelete", !0), this.activeAddOn.settings.set("canAddEContact", 3 > this.activeAddOn.settings.emergency.length))
	}, removeEmergencyContact: function (a) {
		this.hasAccess() && (this.activeAddOn && this.activeAddOn.settings && 0 !== this.activeAddOn.settings.emergency.length) && (a = this.activeAddOn.settings.emergency.findProperty("id",
			a)) && (this.activeAddOn.settings.emergency.removeObject(a), 1 === this.activeAddOn.settings.emergency.length && this.activeAddOn.settings.emergency[0].set("canDelete", !1), this.activeAddOn.settings.set("canAddEContact", 3 > this.activeAddOn.settings.emergency.length))
	}, addReputationQuestion: function () {
		this.hasAccess() && (this.activeAddOn && this.activeAddOn.settings && 10 !== this.activeAddOn.settings.reputation.length) && (this.activeAddOn.settings.reputation.pushObject(Ember.Object.create({
			q: "", a: "", id: "rep-" + (new Date).getTime(),
			qId: "repq-" + (new Date).getTime(), aId: "repa-" + (new Date).getTime(), canDelete: !0
		})), this.activeAddOn.settings.reputation[0].set("canDelete", !0), this.activeAddOn.settings.set("canAddReputation", 10 > this.activeAddOn.settings.reputation.length))
	}, removeReputationQuestion: function (a) {
		this.hasAccess() && (this.activeAddOn && this.activeAddOn.settings && 0 !== this.activeAddOn.settings.reputation.length) && (a = this.activeAddOn.settings.reputation.findProperty("id", a)) && (this.activeAddOn.settings.reputation.removeObject(a),
		1 === this.activeAddOn.settings.reputation.length && this.activeAddOn.settings.reputation[0].set("canDelete", !1), this.activeAddOn.settings.set("canAddReputation", 10 > this.activeAddOn.settings.reputation.length))
	}, saveLiveAnsweringSettings: function (a, c) {
		var d = {}, b = this;
		if (!this.hasAccess() || !this.activeAddOn) return c(!0);
		this.set("isLoading", !0);
		a ? (d.city = this.activeAddOn.settings.city, d.placeId = this.activeAddOn.settings.placeId, d.enabled = this.activeAddOn.settings.enabled, d.schedule = [], a.forEach(function (a) {
			a.time.forEach(function (b) {
				d.schedule.push({
					day: a.day,
					start: b.startTime, end: b.endTime
				})
			})
		})) : d.enabled = this.activeAddOn.settings.enabled;
		socketConnector.saveLiveAnswerSettings(this.activeProperty.id, d, function (a, d) {
			b.set("isLoading", !1);
			!a && d.schedule && b.extractLiveAnsweringScheduler(d, b.activeAddOn);
			c(a)
		})
	}, saveWebRTCSettings: function (a, c) {
		var d = this;
		if (!this.hasAccess() || !this.activeAddOn) return c(!0);
		this.set("isLoading", !0);
		socketConnector.saveWebRTCSettings(this.activeProperty.id, a, function (b, e) {
			d.set("isLoading", !1);
			if (b) return c(b);
			addOnObj = d.addOnList.findProperty("id",
				"webrtc");
			addOnObj.set("settings.enabled", a.enabled);
			addOnObj.set("settings.video", a.video);
			addOnObj.set("settings.screen", a.screen);
			d.openItem("webrtc");
			return c()
		})
	}
});
Tawk.BillingController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null, subscriptionList: null, isLoading: !0, existingCards: [], openProperty: function (a, c) {
		var d = this, b = 0, e = function () {
			b++;
			2 === b && d.set("isLoading", !1)
		};
		this.set("isLoading", !0);
		this.set("activeProperty", a);
		this.set("canUsePaypal", desktopConnector.canUsePaypal());
		this.getLastViews();
		Tawk.userController.getExistingCCCards(!1, e);
		this.getSubscriptionList(e);
		Tawk.routing.titlePath.subviewName = languageParser.translate("admin", "billing");
		Tawk.routing.setTitle()
	}, hasAccess: function () {
		return this.activeProperty && this.activeProperty.isAdmin && this.activeProperty.isSite
	}, getSubscriptionList: function (a) {
		var c = this, d = [], b = 0, e = 0, f = function () {
			e++;
			e === b && (c.set("subscriptionList", d), a())
		};
		if (!this.hasAccess()) return a();
		this.subscriptionList ? this.subscriptionList.clear() :
			this.set("subscriptionList", []);
		socketConnector.getSubscriptions(this.activeProperty.id, function (e, h) {
			if (!e && h.length) b = h.length, h.forEach(function (a) {
				var b;
				if ("FAILED" === a.status) return f();
				b = addOnList[a.addonId];
				if (!b) return f();
				c.createSubscriptionObject(a, function (a) {
					subscriptionObj = Ember.Object.create(a);
					subscriptionObj.setProperties({
						addOnName: b.name,
						addOnShortDescription: b.shortDescription,
						addOnLogo: b.addOnLogo
					});
					d.pushObject(subscriptionObj);
					f()
				})
			}); else return a()
		})
	}, createSubscriptionObject: function (a,
	                                       c) {
		var d;
		c = c || function () {
		};
		a.plan.pricePretify = a.plan.price / a.plan.cycle / 100 + languageParser.translate("admin", "per_month");
		a.plan.subscriptionType = 1 === a.plan.cycle ? languageParser.translate("admin", "monthly_subscription") : languageParser.translate("admin", "yearly_subscription");
		d = {
			id: a.subscriptionId,
			addOnId: a.addonId,
			billingEmailEnabled: !!a.billingEmailEnabled,
			billingEmailAddress: a.billingEmailAddress,
			purchasedDate: moment(a.createdOn).format("DD/MMM/YYYY"),
			nextBillingDate: moment(a.nextBillingDate).format("DD/MMM/YYYY"),
			expiryDate: moment(a.expiresOn).format("DD/MMM/YYYY"),
			plan: a.plan,
			subscribedBy: Tawk.agentsController.getName(a.agentId),
			isAvailable: !0,
			isCanceled: !1,
			isEnabled: !0,
			isSubscribedByMe: a.agentId === Tawk.userController.user.id,
			billingAddress: a.billingAddress ? a.billingAddress : null,
			billingAddressRich: a.billingAddress ? a.billingAddress.replace(/\n/g, "<br/>") : null
		};
		if ("stripe" === a.paymentMethod) {
			var b = a.sourceId.split(":");
			2 === b.length && (d.source = "x-" + b[0], d.paymentMethod = b[1].replace("-", ""))
		} else d.source = a.sourceId,
			d.paymentMethod = "paypal";
		"CANCELED" === a.status && (d.isCanceled = !0, d.isAvailable = !1, d.isEnabled = !1);
		this.getPaymentReceipts(a.addonId, 0, function (a, b) {
			d.hasMore = a;
			d.paymentReceipts = b;
			c(d)
		})
	}, closeView: function () {
		this.set("subscriptionList", null);
		return !0
	}, cancelSubscription: function (a, c) {
		var d = this;
		c = c || function () {
		};
		if (!this.hasAccess()) return c(!0);
		subscription = this.subscriptionList.findProperty("id", a);
		if (!subscription) return c(!0);
		checkAndSetConfirmView(!1, function (b) {
			if (!b) return c(!0);
			socketConnector.cancelSubscription(d.activeProperty.id,
				a, {addonId: subscription.addOnId}, function (a) {
					if (a) return c(!0);
					subscription.set("isCanceled", !0);
					subscription.set("isAvailable", !1);
					subscription.set("expiryDate", subscription.nextBillingDate);
					c()
				})
		}, "Are you sure you want to stop subscribing to the '" + subscription.addOnName + "' add-on?", null, "Cancel Subscription", "Yes, cancel subscription")
	}, getPaymentReceipts: function (a, c, d) {
		var b = !1, e = this;
		if (!this.hasAccess()) return d(!1, []);
		socketConnector.getPayments(this.activeProperty.id, {addonId: a, from: c, size: 7},
			function (a, c) {
				var h = [];
				if (a) return d(b, []);
				7 === c.length && (b = !0, c.pop());
				c.forEach(function (a) {
					a.amountPretify = a.amount / 100;
					a.transactionDate = moment(a.paymentDate).format("DD/MMM/YYYY");
					a.downloadLink = ORIGIN + "/receipts?property=" + e.activeProperty.id + "&payment=" + a.paymentId;
					h.push(a)
				});
				return d(b, h)
			})
	}, updateEmailSettings: function (a, c, d) {
		var b;
		if (!this.hasAccess()) return d(!0);
		b = this.subscriptionList.findProperty("id", a);
		if (!b) return d(!0);
		c.addonId = b.addOnId;
		socketConnector.saveBillingEmail(this.activeProperty.id,
			a, c, function (a, f) {
				if (a) return d(!0);
				b.set("billingEmailEnabled", !!c.billingEmailEnabled);
				c.billingEmailAddress ? b.set("billingEmailAddress", c.billingEmailAddress) : b.set("billingEmailAddress", null);
				d()
			})
	}, changePaymentMethod: function (a, c, d) {
		var b, e = this, f = function (a, c) {
			a ? d(a, c) : socketConnector.getSubscription(e.activeProperty.id, {addonId: b.addOnId}, function (a, c) {
				if (a) return d();
				Array.isArray(c) && e.createSubscriptionObject(c[0], function (a) {
					b.setProperties(a)
				});
				d()
			})
		};
		d = d || function () {
		};
		if (!this.hasAccess()) return d(!0);
		b = this.subscriptionList.findProperty("id", c.subscriptionId);
		if (!b) return d(!0);
		c.addOnId = b.addOnId;
		c.propertyId = this.activeProperty.id;
		c.planId || (c.planId = b.plan.planId);
		c.action = b.isCanceled ? "create" : "modify";
		"cc" === a ? handleCCPayment(c, f) : handlePaypalPayment(c, f)
	}, updateBillingAddress: function (a, c, d) {
		var b;
		if (!this.hasAccess()) return d(!0);
		b = this.subscriptionList.findProperty("id", a);
		if (!b) return d(!0);
		c.addonId = b.addOnId;
		socketConnector.saveBillingAddress(this.activeProperty.id, a, c, function (a, f) {
			if (a) return d(!0);
			c.billingAddress ? (b.set("billingAddressRich", c.billingAddress.replace(/\n/g, "<br/>")), b.set("billingAddress", c.billingAddress)) : (b.set("billingAddress", null), b.set("billingAddressRich", null));
			d()
		})
	}, getAddOnPlans: function (a, c) {
		var d = [], b = this.subscriptionList.findProperty("id", a);
		if (!b) return c(!0);
		socketConnector.getAddOnDetail(this.activeProperty.id, b.addOnId, function (a, f) {
			if (a) return c(!0);
			f.plans.forEach(function (a) {
				a = Ember.Object.create({
					id: a.planId, price: a.price, pricePretify: languageParser.translate("admin",
						a.planId), stripeId: a.stripeId, cycle: a.cycle, selected: a.planId === b.plan.planId
				});
				d.pushObject(a)
			});
			b.set("plans", d.sortBy("price").reverse());
			c()
		})
	}
});
Tawk.TabsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	tabList: null, previewList: null, canAddTabs: !0, previewImages: {
		chat_details: GLOBAL_STATIC_URL + "/images/tab-info.png",
		knowledge_base: GLOBAL_STATIC_URL + "/images/tab-kb.png",
		shortcuts: GLOBAL_STATIC_URL + "/images/tab-shortcut.png",
		history: GLOBAL_STATIC_URL + "/images/tab-history.png",
		shopify: GLOBAL_STATIC_URL +
		"/images/tab-shopify.png"
	}, newTab: null, openProperty: function (a, c) {
		var d = this, b = [];
		this.set("isLoading", !0);
		this.set("activeProperty", a);
		this.set("tabList", []);
		this.set("previewList", []);
		this.getLastViews();
		Tawk.routing.titlePath.subviewName = "Tabs";
		Tawk.routing.setTitle();
		socketConnector.getPropertyTabSettings(a.id, function (a, c) {
			!a && (c && c.tabs) && (c.tabs.forEach(function (a) {
				var c;
				a.id = "" + Date.now() + b.length;
				"internal" === a.tabType || "integration" === a.tabType ? (a.isInternal = !0, a.title = languageParser.translate("admin",
					a.label), a.isMenu = !1, a.isURL = !1, a.isText = !1, a.previewImage = d.previewImages[a.label], a.fontClass = tabsIconClass[a.label], a.canDelete = !1, a.isIntegration = "integration" === a.tabType) : (a.isURL = "url" === a.tabType, a.isMenu = "menu" === a.tabType, a.isText = "text" === a.tabType, a.canDelete = !0, a.items = [], "menu" === a.tabType && (a.content.forEach(function (b) {
					var c = Date.now() + "" + a.items.length;
					a.items.push(Ember.Object.create({
						id: Date.now() + "" + a.items.length,
						title: "internal" === b.tabType ? languageParser.translate("admin", b.label) :
							b.label,
						label: b.label,
						enabled: b.enabled,
						isText: "text" === b.tabType,
						isInternal: "internal" === b.tabType,
						isMenu: !1,
						isURL: "url" === b.tabType,
						noMenu: !0,
						content: b.content,
						tabType: b.tabType,
						titleId: "name-" + c,
						urlId: "url-" + c,
						textId: "text-" + c,
						fontClass: tabsIconClass[b.label] || "",
						previewImage: d.previewImages[b.label] || ""
					}))
				}), a.canAddItems = 5 > a.items.length), a.isInternal = !1, a.title = a.label, a.titleId = "name-" + a.id, a.urlId = "url-" + a.id, a.textId = "text-" + a.id);
				c = Ember.Object.create(a);
				b.pushObject(c)
			}), d.tabList.pushObjects(b),
				d.set("canAddTabs", 10 > d.tabList.length), d.set("isLoading", !1))
		})
	}, addTab: function () {
		var a = Ember.Object.create({
			id: "" + Date.now() + this.tabList.length,
			title: "Title",
			enabled: !0,
			isInternal: !1,
			isMenu: !1,
			isURL: !0,
			isText: !1,
			content: "",
			items: [],
			canAddItems: !0,
			tabType: "url",
			canDelete: !0
		});
		a.setProperties({titleId: "name-" + a.id, urlId: "url-" + a.id, textId: "text-" + a.id});
		this.tabList.pushObject(a);
		this.set("newTab", a);
		this.set("canAddTabs", 10 > this.tabList.length)
	}, removeTab: function (a) {
		var c = [];
		(a = this.tabList.findProperty("id",
			a)) && !a.isInternal && (a.items && a.items.length && (a.items.forEach(function (a) {
			a.isInternal && c.push(a)
		}), c.length && this.tabList.pushObjects(c)), this.tabList.removeObject(a), this.set("canAddTabs", 10 > this.tabList.length))
	}, addMenuItem: function (a) {
		var c = this.tabList.findProperty("id", a);
		c && (a = Ember.Object.create({
			id: "" + Date.now() + c.items.length,
			title: "Item",
			type: "",
			enabled: !0,
			isText: !1,
			isInternal: !1,
			isMenu: !1,
			isURL: !0,
			noMenu: !0,
			content: "",
			tabType: "url"
		}), a.setProperties({
			titleId: "name-" + a.id, urlId: "url-" +
			a.id, textId: "text-" + a.id
		}), c.items.length ? (c.items.setEach("canDelete", !0), a.set("canDelete", !0)) : a.set("canDelete", !1), c.items.pushObject(a), c.set("newItem", a), c.set("canAddItems", 5 > c.items.length))
	}, removeMenuItem: function (a, c) {
		var d, b = this.tabList.findProperty("id", c);
		b && ((d = b.items.findProperty("id", a)) && b.items.removeObject(d), b.set("canAddItems", 5 > b.items.length), 1 === b.items.length && b.items[0].set("canDelete", !1))
	}, changeTabType: function (a, c, d) {
		c ? (c = this.tabList.findProperty("id", c), c.items &&
		(c = c.items.findProperty("id", a))) : c = this.tabList.findProperty("id", a);
		c && c.setProperties({tabType: d, isMenu: "menu" === d, isURL: "url" === d, isText: "text" === d})
	}, moveToList: function (a, c, d, b, e) {
		var f = null;
		c = c ? (c = this.tabList.findProperty("id", c)) ? c.items : [] : this.tabList;
		if (a = c.findProperty("id", a)) {
			if (e) {
				if (e = (e = this.tabList.findProperty("id", e)) ? e.items : [], 5 === e.length) return
			} else if (e = this.tabList, 10 === e.length) return;
			c.removeObject(a);
			d ? (nextTab = e.findProperty("id", d)) && (f = e.indexOf(nextTab)) : (prevTab =
				e.findProperty("id", b)) && (f = e.indexOf(prevTab) + 1);
			null === f && (f = e.length);
			e.insertAt(f, a)
		}
	}, saveTabSettings: function (a) {
		var c = [];
		this.activeProperty && (this.activeProperty.id && this.activeProperty.isAdmin) && (this.tabList.forEach(function (a) {
			var b = {tabType: a.tabType, enabled: a.enabled, label: a.isInternal ? a.label : a.title};
			a.isMenu && (b.content = [], a.items.forEach(function (a) {
				b.content.push({
					tabType: a.tabType,
					enabled: a.enabled,
					label: a.isInternal ? a.label : a.title,
					content: a.content
				})
			}));
			if (a.isURL || a.isText) b.content =
				a.content;
			c.push(b)
		}), socketConnector.saveTabSettings(this.activeProperty.id, c, function (c) {
			a(c)
		}))
	}, closeView: function () {
		this.set("tabList", null);
		this.set("previewList", null);
		this.set("newTab", null);
		return !0
	}
});
Tawk.AlertsController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null, isLoading: !0, openProperty: function (a, c) {
		var d = this;
		this.set("activeProperty", a);
		this.getLastViews();
		socketConnector.getAlert(this.activeProperty.id, function (a, c) {
			a || (d.set("alert", c.alert), d.set("alertV",
				c.alertV))
		});
		Tawk.routing.titlePath.subviewName = languageParser.translate("admin", "alerts");
		Tawk.routing.setTitle()
	}, closeView: function () {
		this.set("alert", null);
		this.set("alertV", null);
		return !0
	}, saveAlert: function (a, c) {
		var d = this;
		c = c || function () {
		};
		if (!this.activeProperty) return c(!0);
		this.set("isAdding", !0);
		socketConnector.saveAlert(this.activeProperty.id, {alert: a}, function (b, e) {
			if (b) return d.set("isAdding", !1), c(b);
			d.set("alert", a);
			d.set("alertV", e.alertV);
			d.set("isAdding", !1);
			return c(null)
		})
	}, hasUpdate: function () {
		!this.activeProperty ||
		(this.isAdding || !Tawk.webProperties.updateAlertInView || Tawk.webProperties.updateAlertInView.propertyId !== this.activeProperty.id || Tawk.webProperties.updateAlertInView.alertVersion < this.alertV) || (this.set("alert", Tawk.webProperties.updateAlertInView.alertContent), this.set("alertV", Tawk.webProperties.updateAlertInView.alertVersion))
	}.observes("Tawk.webProperties.updateAlertInView", "isAdding")
});
Tawk.KnowledgebaseController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null,
	knowledgebaseList: null,
	activeKnowledgebase: null,
	pagedList: null,
	kbCategories: [],
	autoSavedDraft: null,
	loadingError: null,
	openProperty: function (a, c) {
		var d, b = this, e = Tawk.routing.getPath();
		this.set("isLoading", !0);
		this.set("activeProperty", a);
		this.set("pagedList", Tawk.PagingListModel.create({perpage: c}));
		this.set("queryData", {query: void 0, status: void 0, size: c, category: void 0});
		this.pagedList.startList();
		this.getLastViews();
		Tawk.routing.titlePath.subviewName = languageParser.translate("header", "knowledgebase");
		Tawk.routing.setTitle();
		d = function () {
			e.itemId ? b.openItem(e.itemId) : b.lastViews && ("knowledgebase" === b.lastViews.subView && b.lastViews.itemId) && b.openItem(b.lastViews.itemId)
		};
		this.kbCategories.clear();
		Tawk.webProperties.loadKBCategory(this.activeProperty.id, function (a, c) {
			a || b.kbCategories.pushObjects(c);
			b.loadList(d)
		})
	},
	resetCurrentList: function () {
		this.activeProperty && this.pagedList && this.pagedList.startList()
	},
	loadList: function (a) {
		var c = this, d = [];
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		this.set("isLoading",
			!0);
		this.set("queryData.from", this.pagedList.currentHead);
		socketConnector.getKBList(this.activeProperty.id, this.queryData, function (b, e) {
			c.set("isLoading", !1);
			if (b) return c.set("loadingError", !0), a(!0);
			e.hits.forEach(function (a) {
				var b, e = Ember.Object.create({
					id: a.contentId,
					categoryId: a.categories[0],
					createdOnStr: moment(a.createdOn).format("DD/MMM/YYYY"),
					snippet: a.snippet,
					title: a.title
				});
				a.categories && a.categories.length && (b = c.kbCategories.findProperty("id", a.categories[0]));
				b && !b.isDeleted ? e.set("categoryName",
					b.name) : e.set("categoryName", "Uncategorized");
				d.pushObject(e)
			});
			c.pagedList.setList(d);
			c.pagedList.setTotal(e.total);
			c.set("isLoading", !1);
			c.set("loadingError", !1);
			a()
		})
	},
	loadNextList: function (a) {
		a = a || function () {
		};
		if (!this.activeProperty || this.pagedList.isLastPage()) return a(null, !1);
		this.pagedList.nextList();
		this.loadList(a)
	},
	openItem: function (a, c) {
		var d, b = this;
		c = c || function () {
		};
		if (!this.activeProperty) return c();
		this.pagedList.currentData.setEach("isMarked", !1);
		d = a ? this.pagedList.getItem(a) : Ember.Object.create({content: ""});
		if (!d) return Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.activeProperty.id,
			subView: "knowledgebase",
			itemId: null,
			widgetId: null
		}), c();
		if (a && !d.content) socketConnector.getKBContent(this.activeProperty.id, d.id, function (a, f) {
			if (a) return c();
			d.set("content", f.content);
			d.set("status", f.status);
			b.set("activeKnowledgebase", d);
			b.saveLastSubView({itemId: d.id});
			Tawk.routing.titlePath.itemName = d.title;
			Tawk.routing.changeRoute({
				view: "admin", propertyId: b.activeProperty.id, subView: "knowledgebase", itemId: d.id ||
				null, widgetId: null
			});
			Tawk.routing.setTitle();
			return c()
		}); else return this.set("activeKnowledgebase", d), d.id ? (this.saveLastSubView({itemId: d.id}), Tawk.routing.titlePath.itemName = d.title) : (this.saveLastSubView({itemId: null}), Tawk.routing.titlePath.itemName = "New Content"), Tawk.routing.changeRoute({
			view: "admin",
			propertyId: b.activeProperty.id,
			subView: "knowledgebase",
			itemId: d.id || null,
			widgetId: null
		}), Tawk.routing.setTitle(), c()
	},
	closeView: function () {
		if (this.activeKnowledgebase) return this.closeItem(),
			!1;
		this.resetData();
		return !0
	},
	closeItem: function () {
		this.set("activeKnowledgebase", null)
	},
	resetData: function () {
		this.set("activeKnowledgebase", null);
		this.set("pagedList", null);
		this.set("queryData", null);
		this.kbCategories.clear()
	},
	saveKBContent: function (a, c) {
		var d, b, e, f, g = {}, h = this;
		this.activeProperty && this.activeProperty.isAdmin && (this.activeKnowledgebase.id && (e = this.activeKnowledgebase.id, f = this.pagedList.getItem(e)), d = socketConnector.saveKB.bind(socketConnector), b = function (b, d) {
			if (b) return b.message &&
			"updating" === b.message ? c(!0, "Unable to process your request. The service is being updated. Please try again in 5 minutes.") : c(!0, "Unable to save content");
			f ? (f.setProperties({
				categoryId: a.categoryId,
				categoryName: a.categoryId ? h.kbCategories.findProperty("id", a.categoryId).name : null,
				content: g.content,
				title: g.title
			}), h.autoSavedDraft = null, c()) : (h.pagedList.startList(), h.loadList(function (a) {
				a ? (h.autoSavedDraft = null, c(x)) : (h.openItem(d.contentId), h.autoSavedDraft = d.contentId, c())
			}))
		}, g.categories = a.isAutoSaved ?
			a.categoryId ? [a.categoryId] : [] : [a.categoryId], g.title = a.title, g.content = a.content, g.status = a.status, a.categoryId || a.isAutoSaved ? d(this.activeProperty.id, e, g, b) : this.addCategory(a.newCategory, function (f, l) {
			f ? c(f, l) : (g.categories = [l], a.categoryId = l, d(h.activeProperty.id, e, g, b))
		}))
	},
	addCategory: function (a, c) {
		var d = [], b = !1, e = this;
		if (this.activeProperty && this.activeProperty.isAdmin) {
			this.kbCategories.every(function (c) {
				return c.name.toLowerCase() === a.toLowerCase() && !1 === c.isDeleted ? (b = !0, !1) : !0
			});
			if (b) return c(!0,
				"Duplicate category is not allowed.");
			socketConnector.addKBCategory(this.activeProperty.id, {name: a}, function (b, g) {
				b ? c(b, "Unable to add category") : (d = e.kbCategories.toArray(), d.pushObject(Ember.Object.create({
					id: g.categoryId,
					isDeleted: !1,
					name: a
				})), e.kbCategories.clear(), e.kbCategories.pushObjects(sortList(d, "name")), c(null, g.categoryId))
			})
		}
	},
	updateCategory: function (a, c, d) {
		var b = this, e, f;
		if (!this.activeProperty || !this.activeProperty.isAdmin) return d(!0, "You do not have permission to perform this action.");
		f = this.kbCategories.findProperty("id", a);
		if (!f) return d(!0, "Invalid category selected.");
		this.set("isLoading", !1);
		socketConnector.updateKBCategory(this.activeProperty.id, a, {name: c}, function (a, h) {
			b.set("isLoading", !1);
			a ? d(a, "Unable to edit category") : (f.set("name", c), e = b.kbCategories.toArray(), b.kbCategories.clear(), b.kbCategories.pushObjects(sortList(e, "name")), d(null))
		})
	},
	deleteCategory: function (a, c) {
		var d = this, b;
		if (!this.activeProperty || !this.activeProperty.isAdmin) return c(!0, "You do not have permission to perform this action.");
		b = this.kbCategories.findProperty("id", a);
		if (!b) return c(!0, "Invalid category selected.");
		socketConnector.deleteKBCategory(this.activeProperty.id, a, function (a) {
			a ? c(!0) : (d.kbCategories.removeObject(b), c())
		})
	},
	filteredCategoryList: function () {
		var a = this;
		return this.categorySearchText ? this.kbCategories.filter(function (c) {
			return c.isDeleted ? !1 : -1 !== c.name.toLowerCase().indexOf(a.categorySearchText) ? !0 : !1
		}) : this.kbCategories.filterProperty("isDeleted", !1)
	}.property("kbCategories.@each.isDeleted", "categorySearchText"),
	deleteSingle: function (a) {
		var c = this;
		if (!this.activeProperty || !this.activeKnowledgebase || !this.activeProperty.isAdmin) return a(!0);
		this.deleteContent(this.activeKnowledgebase.id, function (d) {
			if (d) return a(d);
			c.set("activeKnowledgebase", null);
			a()
		})
	},
	deleteContent: function (a, c) {
		var d, b = this;
		if (!this.activeProperty || !this.activeProperty.isAdmin || !this.pagedList) return c(!0);
		d = this.pagedList.getItem(a);
		if (!d) return c(!0);
		this.set("isLoading", !0);
		socketConnector.deleteKBContent(this.activeProperty.id, a,
			function (a) {
				b.set("isLoading", !1);
				if (a) return a.message && "updating" === a.message ? c(!0, "Unable to process your request. The service is being updated. Please try again in 5 minutes.") : c(a);
				b.pagedList.removeItem(d);
				c()
			})
	},
	searchList: function (a, c) {
		if (!this.activeProperty) return c(!0);
		this.set("queryData", a);
		this.set("activeKnowledgebase", null);
		this.resetCurrentList();
		this.loadList(c)
	}
});
var addOnList = {
	whitelabel: {
		id: "whitelabel",
		name: languageParser.translate("admin", "rebrand_main_title"),
		shortDescription: languageParser.translate("admin",
			"rebrand_shortDescription"),
		previewImage: GLOBAL_STATIC_URL + "/images/rebrand-main.png",
		isAvailable: !0,
		addOnLogo: GLOBAL_STATIC_URL + "/images/rebrand-logo.png",
		isWhitelabel: !0
	},
	"live-answering": {
		id: "live-answering",
		name: languageParser.translate("admin", "liveAnswer_main_title"),
		shortDescription: languageParser.translate("admin", "liveAnswer_shortDescription", {
			strongStart: "<b>",
			strongEnd: "</b>"
		}),
		previewImage: GLOBAL_STATIC_URL + "/images/hireagent-main.png",
		isAvailable: !0,
		addOnLogo: GLOBAL_STATIC_URL + "/images/hireagent-logo.png",
		betaCodeLink: "https://www.tawk.to/hire-chat-agents-1hr/",
		oldBetaCode: ["la-KuB9uMtrhM", "la-cQDrvaRvdj", "la-cByzu1WmEW"],
		betaCode: "1408195zep",
		checkTerm: !0,
		needBetaCode: !0,
		isLiveAnswering: !0
	},
	webrtc: {
		id: "webrtc",
		name: languageParser.translate("admin", "webrtc_title"),
		shortDescription: languageParser.translate("header", "notification_video_screensharing_description"),
		previewImage: GLOBAL_STATIC_URL + "/images/video-chat-main.png",
		isAvailable: !0,
		addOnLogo: GLOBAL_STATIC_URL + "/images/video-chat-logo.png",
		betaCode: "wc-BKDEa119pd",
		needBetaCode: !1,
		betaCodeLink: "https://www.tawk.to/updates/join-the-video-chat-beta/"
	},
	translation: {
		id: "translation",
		name: languageParser.translate("admin", "translation_main_title"),
		shortDescription: languageParser.translate("admin", "translation_shortDescription"),
		previewImage: GLOBAL_STATIC_URL + "/images/translation-main.png",
		isAvailable: !1
	},
	shoppingCart: {
		id: "shoppingCart",
		name: languageParser.translate("admin", "shoppingCart_main_title"),
		shortDescription: languageParser.translate("admin", "shoppingCart_shortDescription"),
		previewImage: GLOBAL_STATIC_URL + "/images/shopping-c-main.png",
		isAvailable: !1
	},
	inChatPayment: {
		id: "inChatPayment",
		name: languageParser.translate("admin", "inChatPayment_main_title"),
		shortDescription: languageParser.translate("admin", "inChatPayment_shortDescription"),
		previewImage: GLOBAL_STATIC_URL + "/images/in-chat-main.png",
		isAvailable: !1
	},
	smsIntegration: {
		id: "smsIntegration",
		name: languageParser.translate("admin", "smsIntegration_main_title"),
		shortDescription: languageParser.translate("admin", "smsIntegration_shortDescription"),
		previewImage: GLOBAL_STATIC_URL + "/images/sms-main.png",
		isAvailable: !1
	}
};
Tawk.PropertiesController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	activeProperty: null,
	siteList: null,
	pageList: null,
	emailSettings: null,
	isLoading: !1,
	limit: 16,
	previousPropertyName: null,
	isReloadingList: !1,
	requestProperty: !1,
	requestWidget: !1,
	subViews: "settings members shortcuts triggers ban-list department mail-settings addon-store billing tabs alerts knowledgebase".split(" "),
	widgetSubViews: ["widget-settings", "widget-appearance",
		"widget-content", "widget-domains", "widget-scheduler"],
	init: function () {
		this.set("siteList", []);
		this.set("pageList", []);
		this.set("agentsController", Tawk.AgentsController.create());
		this.set("widgetsController", Tawk.WidgetsController.create());
		this.set("shortcutsController", Tawk.shortcutsController);
		this.set("triggersController", Tawk.TriggersController.create());
		this.set("banController", Tawk.BanController.create());
		this.set("departmentController", Tawk.DepartmentsController.create());
		this.set("pageContentController",
			Tawk.PageContentController.create());
		this.set("addOnsController", Tawk.AddOnsController.create());
		this.set("billingController", Tawk.BillingController.create());
		this.set("tabsController", Tawk.TabsController.create());
		this.set("alertsController", Tawk.AlertsController.create());
		this.set("knowledgebaseController", Tawk.KnowledgebaseController.create())
	},
	saveLastView: function (a) {
		var c = this.lastViews;
		this.activeProperty && this.activeProperty.id ? (c.propertyId = this.activeProperty.id, c.type = this.activeProperty.propertyType,
		a && void 0 !== a && (c.subView = null, c.itemId = null, "site" === this.activeProperty.propertyType ? c.widgetId = "default" : "page" === this.activeProperty.propertyType && (c.widgetId = "page")), c.view = "admin", this.set("lastViews", c), main.updateStorageSettings("admin-view", JSON.stringify(c))) : (this.set("lastViews", {}), main.updateStorageSettings("admin-view", null))
	},
	noProperties: function () {
		return 0 === this.siteList.length && 0 === this.pageList.length
	}.property("siteList.length", "pageList.length"),
	hasMoreProperties: function () {
		return 1 <
			this.siteList.length + this.pageList.length
	}.property("siteList.length", "pageList.length"),
	loadList: function () {
		var a = [], c = [];
		this.siteList.clear();
		this.pageList.clear();
		Tawk.webProperties.sites.forEach(function (c) {
			var b = Tawk.PropertyModel.create();
			b.initialize(c, !0);
			a.pushObject(b)
		});
		Tawk.webProperties.pages.forEach(function (a) {
			var b;
			"profile" !== a.type && (b = Tawk.PropertyModel.create(), b.initialize(a, !1), c.pushObject(b))
		});
		this.siteList.pushObjects(sortList(a, "name"));
		this.pageList.pushObjects(sortList(c,
			"name"))
	},
	reorderList: function () {
		var a, c, d = !1;
		if (Tawk.webProperties.reorderList && (Tawk.webProperties.updatedData && "propertyName" === Tawk.webProperties.updatedData.type) && (c = "page" === Tawk.webProperties.updatedData.propertyType ? "pageList" : "siteList", a = this[c].findProperty("id", Tawk.webProperties.updatedData.id))) {
			this[c].removeObject(a);
			a.set("name", decodeStr(Tawk.webProperties.updatedData.name));
			for (var b = 0; b < this[c].length; b++) if (this[c].objectAt(b).name.toLowerCase() > a.name.toLowerCase()) {
				this[c].insertAt(b,
					a);
				d = !0;
				break
			}
			d || this[c].pushObject(a)
		}
	}.observes("Tawk.webProperties.reorderList"),
	intializeView: function (a) {
		a = a || function () {
		};
		this.set("activeProperty", null);
		this.loadList();
		this.reloadPath(a)
	},
	reloadPath: function (a) {
		var c, d = null, b = Tawk.routing.getPath();
		a = a || function () {
		};
		this.getLastViews();
		if ("new-property" === b.subView) this.openProperty(null, d, a, !1); else {
			!b.propertyId || this.activeProperty && this.activeProperty.id === c || (c = b.propertyId);
			if (b.subView) {
				if (!c) {
					if (0 === this.siteList.length && "addon-store" ===
						b.subView) return a();
					-1 !== this.widgetSubViews.indexOf(b.subView) && this.set("requestWidget", !0);
					if (1 === this.siteList.length && 0 === this.pageList.length) c = this.siteList[0].id; else if (1 === this.pageList.length && 0 === this.siteList.length) c = this.pageList[0].id; else return this.set("requestProperty", !0), this.set("isLoading", !0), a()
				}
				this.lastViews.subView = this.siteList.length || this.pageList.length ? b.subView : null
			}
			this.set("requestProperty", !1);
			this.set("requestWidget", !1);
			this.set("isLoading", !1);
			this.set("subView",
				this.lastViews.subView);
			this.lastViews.itemId = b.itemId || null;
			this.lastViews.widgetId = b.widgetId || this.lastViews.widgetId;
			if (this.activeProperty && b.propertyId === this.activeProperty.id) return a();
			c || (this.lastViews && this.lastViews.propertyId && ("site" === this.lastViews.type && this.siteList.findProperty("id", this.lastViews.propertyId) || "page" === this.lastViews.type && this.pageList.findProperty("id", this.lastViews.propertyId)) ? c = this.lastViews.propertyId : this.siteList.length ? (c = this.siteList[0].id, d = "site") :
				this.pageList.length && (c = this.pageList[0].id, d = "page"));
			c ? (this.lastViews.propertyId !== c && (this.lastViews.widgetId = "default"), this.openProperty(c, d, a, !1)) : (this.saveLastView(!0), a())
		}
	},
	openProperty: function (a, c, d, b) {
		var e, f = this;
		d = d || function () {
		};
		Tawk.routing.titlePath.subviewName = null;
		Tawk.routing.titlePath.itemName = null;
		Tawk.routing.titlePath.widgetName = null;
		if (!a) return e = Tawk.PropertyModel.create(), this.set("activeProperty", e), f.activeProperty.set("isLoaded", !0), Tawk.routing.titlePath.propertyName =
			languageParser.translate("admin", "create_property"), Tawk.routing.setTitle(), d();
		(e = null === c ? this.siteList.findProperty("id", a) || this.pageList.findProperty("id", a) : "site" === c ? this.siteList.findProperty("id", a) : this.pageList.findProperty("id", a)) ? (this.lastViews.widgetId = e.isSite ? this.lastViews.widgetId && "page" === this.lastViews.widgetId ? "default" : this.lastViews.widgetId : "page", this.activeProperty && this.activeProperty.set("isSelected", !1), this.set("activeProperty", e), this.activeProperty.set("isSelected",
			!0), this.set("requestProperty", !1), this.set("requestWidget", !1), Tawk.routing.titlePath.propertyName = this.activeProperty.name, Tawk.routing.setTitle(), e.isAdmin ? (this.set("isLoading", !0), Tawk.webProperties.getPropertyInformation(a, function (a, c) {
			if (a) return d(a);
			e.loadSettings(c);
			f.set("emailSettings", e.emailSettings.copy());
			f.saveLastView(b);
			widgetId = f.lastViews ? f.lastViews.widgetId : null;
			f.widgetsController.openProperty(e, widgetId);
			f.activeProperty.set("isLoaded", !0);
			f.set("isLoading", !1);
			e.isSite ||
			f.openPage();
			d()
		})) : (this.lastViews && "addon-store" !== this.lastViews.subView && "knowledgebase" !== this.lastViews.subView && "ban-list" !== this.lastViews.subView && "shortcuts" !== this.lastViews.subView ? this.saveLastView(!0) : this.saveLastView(), this.activeProperty.set("isLoaded", !0), d())) : this.set("requestProperty", !0)
	},
	openAgentList: function (a) {
		this.activeProperty && (a = a || this.limit, this.agentsController.openProperty(this.activeProperty, a))
	},
	openDepartmentList: function (a) {
		this.activeProperty && (a = a || this.limit,
			this.departmentController.openProperty(this.activeProperty, a))
	},
	openShortcutsList: function (a) {
		this.activeProperty && (a = a || this.limit, this.shortcutsController.openProperty(this.activeProperty, a))
	},
	openTriggersList: function (a) {
		this.activeProperty && (a = a || this.limit, this.triggersController.openProperty(this.activeProperty, a))
	},
	openBanList: function (a) {
		this.activeProperty && (a = a || this.limit, this.banController.openProperty(this.activeProperty, a))
	},
	openPage: function () {
		this.activeProperty && this.pageContentController.openProperty(this.activeProperty)
	},
	openAddOnsStore: function () {
		this.activeProperty && this.addOnsController.openProperty(this.activeProperty)
	},
	openBilling: function () {
		this.activeProperty && this.billingController.openProperty(this.activeProperty)
	},
	openTabs: function () {
		this.activeProperty && this.tabsController.openProperty(this.activeProperty)
	},
	openAlerts: function () {
		this.activeProperty && this.alertsController.openProperty(this.activeProperty)
	},
	openKnowledgebase: function (a) {
		this.activeProperty && (a = a || this.limit, this.knowledgebaseController.openProperty(this.activeProperty,
			a))
	},
	resetData: function () {
		this.activeProperty && this.activeProperty.id ? this.set("emailSettings", this.activeProperty.emailSettings.copy()) : this.siteList.length ? this.openProperty(this.siteList[0].id, "site") : this.pageList.length && this.openProperty(this.pageList[0].id, "page");
		this.saveLastView()
	},
	closeItem: function () {
		this.set("emailSettings", this.activeProperty.emailSettings ? this.activeProperty.emailSettings.copy() : null);
		this.saveLastView()
	},
	closeView: function () {
		this.activeProperty && this.activeProperty.id &&
		this.emailSettings ? this.closeItem() : this.resetData();
		return !0
	},
	getEmailSettings: function (a) {
		var c = this;
		if (!this.activeProperty) return a(!0);
		a = a || function () {
		};
		socketConnector.getEmailSettings(this.activeProperty.id, function (d, b) {
			if (d) return a(d);
			c.set("emailSettings", b);
			return a()
		})
	},
	saveEmailSettings: function (a, c) {
		if (!this.activeProperty) return c(!0);
		socketConnector.saveEmailSettings(this.activeProperty.id, a, function (a) {
			return a ? c(a) : c()
		})
	},
	saveProperty: function (a, c, d) {
		var b, e = this, f = function (b) {
			b ?
				d(b) : c || e.activeProperty.enabled === a.isEnabled ? d() : a.isEnabled ? e.enableProperty(d) : e.disableProperty(d)
		};
		if (!c && this.activeProperty.id && !this.activeProperty.isAdmin) return d(!0);
		this.set("isLoading", !0);
		c ? b = a.propertyType : (b = this.activeProperty.propertyType, a.pageId = this.activeProperty.id);
		"page" !== b || !c && this.activeProperty.tawkId === a.pageTawkId || (a.tawkId = a.pageTawkId);
		socketConnector["page" === b ? "savePageSettings" : "saveSiteSettings"](a, function (d, h) {
			if (d) return f(d);
			Tawk.webProperties.updatePropertyData({
				pgid: a.pageId ||
				h.pgid || h,
				pgn: encodeStr(a.pageName),
				twid: void 0 !== a.tawkId ? a.tawkId : e.activeProperty.tawkId
			}, !1, function (d) {
				c ? (e.loadList(), e.openProperty(d.id, b, f)) : ("page" === b ? (e.activeProperty.set("tawkId", a.pageTawkId), e.activeProperty.set("settings.categoryId", a.category), e.activeProperty.set("settings.subCategoryId", a.subcategory)) : (e.activeProperty.set("settings.domain", a.domain), e.activeProperty.set("settings.secureJSAPI", !!a.secureJSAPI)), f());
				e.set("isLoading", !1)
			})
		})
	},
	deleteSingle: function (a) {
		var c, d,
			b = this;
		a = a || function () {
		};
		if (!this.activeProperty || !this.activeProperty.id || !this.activeProperty.isAdmin) return a(!0);
		this.activeProperty.isSite ? (c = "DELETE THIS SITE", d = languageParser.translate("generic", "confirm_delete_site", {
			text: c,
			lineBreak: "<br />"
		})) : (c = "DELETE THIS PAGE", d = languageParser.translate("generic", "confirm_delete_page", {
			text: c,
			lineBreak: "<br />"
		}));
		checkAndSetConfirmView(!0, function (c) {
			if (!c) return a(!0);
			socketConnector.removeProperty(b.activeProperty.id, function (c) {
				if (c) return a(c);
				Tawk.webProperties.removeProperty(b.activeProperty.id);
				b.set("activeProperty", null);
				b.saveLastView(!0);
				Tawk.routing.changeRoute({view: "admin"});
				b.intializeView(a)
			})
		}, d, c)
	},
	disableProperty: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		Tawk.webProperties.disableProperty(this.activeProperty.id, function (d) {
			if (d) return a(d);
			c.activeProperty.set("enabled", !1);
			return a()
		})
	},
	enableProperty: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		Tawk.webProperties.enableProperty(this.activeProperty.id,
			function (d) {
				if (d) return a(d);
				c.activeProperty.set("enabled", !0);
				return a()
			})
	},
	accountAccessCheck: function () {
		var a = Tawk.webProperties.updatedProperty, c = Tawk.webProperties.updatedData, d = this;
		if (!c || !a || !this.activeProperty || "agent" !== c.type) return !1;
		if ("remove" === c.operation && c.ids === Tawk.userController.user.id) {
			var b = this.activeProperty.name;
			Tawk.webProperties.removeProperty(a.id);
			this.activeProperty.id === a.id ? this.intializeView(function () {
				Tawk.webProperties.set("updatedData", null);
				d.set("previousPropertyName",
					b)
			}) : (this.loadList(), Tawk.webProperties.set("updatedData", null), this.set("propertyListToReset", !0));
			return !0
		}
		return !1
	},
	propertyUpdatedMain: function () {
		var a, c = this, d = Tawk.webProperties.updatedData, b = Tawk.webProperties.updatedProperty;
		b && ((this.siteList || this.pageList) && !this.accountAccessCheck()) && (this.getLastViews(), a = this.get("noProperties"), this.loadList(), this.set("propertyListToReset", !0), a ? this.intializeView() : this.activeProperty && (!b.toBeDelete && this.activeProperty.id === b.id) && (this.set("isUpdating",
			!0), this.openProperty(this.activeProperty.id, this.activeProperty.propertyType, function () {
			d && "department" === d.type && "department" === c.lastViews.subView ? (c.departmentController.propertyUpdated(), c.openDepartmentList(), c.set("isUpdating", !1)) : d && "agent" === d.type && "members" === c.lastViews.subView ? c.agentsController.isUpdating || c.agentsController.isUpdated ? c.agentsController.isUpdated && c.agentsController.set("isUpdated", !1) : (c.agentsController.propertyUpdated(), c.openAgentList(), c.set("isUpdating", !1)) :
				c.set("isUpdating", !1)
		})))
	}.observes("Tawk.webProperties.updatedProperty")
});
Tawk.InvitationsController = Ember.Controller.extend({
	invitations: [], initInvitations: function () {
		var a = this;
		socketConnector.getAgentInvites(function (c, d) {
			c ? a.initInvitations() : a.process(d)
		})
	}, loadInvitations: function (a) {
		var c = this;
		this.set("invitations", []);
		a.forEach(function (a) {
			c.invitations.pushObject(Ember.Object.create({
				id: a._id,
				propertyId: a.pgid,
				propertyName: a.pgn,
				inviterName: decodeStr(a.ivan)
			}))
		})
	}, getInvitation: function (a,
	                            c) {
		var d = this;
		socketConnector.getAgentInvite(a, function (b, e) {
			return b ? d.getInvitation(a, c) : c(e)
		})
	}, removeInvitation: function (a) {
		(a = this.invitations.findProperty("id", a)) && this.invitations.removeObject(a)
	}, addInvitation: function (a) {
		var c = this;
		this.invitations.findProperty("id", a.invid) || this.getInvitation(a.invid, function (a) {
			a && c.invitations.pushObject(Ember.Object.create({
				id: a._id,
				propertyId: a.pgid,
				propertyName: a.pgn,
				inviterName: decodeStr(a.ivan)
			}))
		})
	}, acceptInvitation: function (a, c) {
		var d = this, b =
			this.invitations.findProperty("id", a);
		b && socketConnector.acceptInvitation(a, function (a) {
			if (a) return c(!0);
			d.invitations.removeObject(b);
			c()
		})
	}, rejectInvitation: function (a, c) {
		var d = this, b = this.invitations.findProperty("id", a);
		b && socketConnector.rejectInvitation(a, function (a) {
			if (a) return c(!0);
			d.invitations.removeObject(b);
			c()
		})
	}
});
Tawk.invitationsController = Tawk.InvitationsController.create();
Tawk.AliasesController = Ember.Controller.extend({
	activeAlias: null, pagedList: null, loadList: function () {
		var a =
			[];
		this.set("pagedList", Tawk.PagingListModel.create({perpage: 30}));
		this.pagedList.startList();
		Tawk.userController.aliases.forEach(function (c) {
			c = c.copy();
			c.set("displayName", decodeStr(c.displayName));
			c.set("positionTitle", decodeStr(c.positionTitle));
			a.pushObject(c)
		});
		this.pagedList.setTotal(a.length);
		this.pagedList.setList(sortList(a, "displayName"))
	}, toggleDefaultAlias: function (a) {
		this.pagedList.currentData.findProperty("isDefault", !1).set("isMarked", a)
	}, toggleAllMark: function (a) {
		this.pagedList && this.pagedList.currentData.setEach("isMarked",
			a)
	}, toggleMark: function (a, c) {
		var d = this.pagedList.currentData.findProperty("aliasId", a);
		d && d.set("isMarked", c)
	}, deleteSingle: function (a) {
		var c;
		a = a || function () {
		};
		if (!this.activeAlias) return a(!0);
		c = this.pagedList.currentData.findProperty("aliasId", this.activeAlias.aliasId);
		if (!c) return a(!0);
		c.set("isMarked", !0);
		this.bulkDelete(function (d) {
			c.set("isMarked", !1);
			return a(d)
		})
	}, bulkDelete: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.pagedList.currentData.length) return a(!0);
		deleteList = this.pagedList.currentData.filterProperty("isMarked",
			!0);
		if (!deleteList.length) return a(!0);
		checkAndSetConfirmView(!1, function (d) {
			if (!d) return a(!0);
			socketConnector.deleteAliases(deleteList.getEach("aliasId"), function (b) {
				if (b) return a(b);
				Tawk.userController.deleteAliases({alsids: deleteList.getEach("aliasId")});
				c.pagedList.currentData.removeObjects(deleteList);
				a()
			})
		})
	}, openItem: function (a) {
		a = a ? this.pagedList.currentData.findProperty("aliasId", a) : Tawk.CopyableModel.create({
			isNew: !0,
			enabled: !0
		});
		a.aliasImage && !a.imagePreview && a.set("imagePreview", GLOBAL_AWS_PI_URL +
			"/" + a.aliasImage + "?v=" + Date.now());
		this.toggleAllMark(!1);
		this.set("activeAlias", a.copy())
	}, uploadPhoto: function (a, c, d) {
		this.set("imageData", {
			file: a,
			cropDimensions: {width: 200, height: 200},
			imageDimensions: {width: 75, height: 79},
			dataType: "file"
		})
	}, applyImage: function (a) {
		this.imageData && this.activeAlias && (this.activeAlias.set("imagePreview", a), this.set("imageData", null))
	}, openCamera: function () {
		this.set("imageData", {
			cropDimensions: {width: 200, height: 200},
			imageDimensions: {width: 75, height: 79},
			dataType: "video"
		})
	},
	removeAliasImage: function () {
		this.activeAlias && (-1 !== this.activeAlias.imagePreview.indexOf("data:image/jpeg;base64") ? this.activeAlias.set("imagePreview", this.activeAlias.aliasImage ? GLOBAL_AWS_PI_URL + "/" + this.activeAlias.aliasImage + "?v=" + Date.now() : null) : (this.activeAlias.set("removeImage", !0), this.activeAlias.set("imagePreview", null)))
	}, saveAlias: function (a, c, d) {
		var b, e = this;
		this.activeAlias && (b = {
			displayName: this.activeAlias.displayName,
			positionTitle: this.activeAlias.positionTitle,
			encodedAliasImage: this.activeAlias.imagePreview &&
			-1 !== this.activeAlias.imagePreview.indexOf("data:image/jpeg;base64") ? this.activeAlias.imagePreview : null,
			isEnabled: !0
		}, this.activeAlias.aliasId && (b.aliasId = this.activeAlias.aliasId, b.isEnabled = this.activeAlias.enabled, b.removeAliasImage = this.activeAlias.removeImage, b.imageFileName = this.activeAlias.aliasImage), null !== c && (b.isEnabled = c), null !== a && (b.isDefaultAlias = a), socketConnector.saveAlias(b, function (a, c) {
			var h, k;
			if (a) return d(a);
			h = e.pagedList.currentData.findProperty("aliasId", c.alsid);
			Tawk.userController.updateAlias({
				alsid: c.alsid,
				dn: c.dn, ai: c.ai ? c.ai : null, en: c.en, pst: c.pst, dals: !!c.dals
			});
			h ? (h.set("displayName", decodeStr(c.dn)), h.set("positionTitle", decodeStr(c.pst)), h.set("enabled", c.en)) : (h = Tawk.CopyableModel.create({
				aliasId: c.alsid,
				displayName: decodeStr(c.dn),
				positionTitle: decodeStr(c.pst),
				enabled: c.en
			}), e.pagedList.currentData.pushObject(h));
			c.ai && (h.set("aliasImage", c.ai), h.set("imagePreview", c.ai ? GLOBAL_AWS_PI_URL + "/" + c.ai + "?v=" + Date.now() : null));
			b.removeAliasImage && (h.set("aliasImage", null), h.set("imagePreview", null));
			c.dals ? (e.pagedList.currentData.setEach("isDefault", !1), h.set("isDefault", !0)) : h.set("isDefault", !1);
			k = sortList(e.pagedList.currentData, "displayName");
			e.pagedList.currentData.clear();
			e.pagedList.setTotal(k.length);
			e.pagedList.setList(k);
			e.set("activeAlias", h.copy());
			return d(null)
		}))
	}, closeView: function () {
		if (this.activeAlias) return this.closeItem(), !1;
		this.resetData();
		return !0
	}, closeItem: function () {
		this.imageData ? this.set("imageData", null) : this.set("activeAlias", null)
	}, resetData: function () {
		this.closeItem()
	},
	saveLastSubView: function () {
	}
});
Tawk.WizardController = Ember.Controller.extend({
	siteCreateDone: !1,
	inviteAgentDone: !1,
	site: null,
	decodedSiteName: null,
	invitedList: [],
	isLoading: !1,
	loadData: function () {
		var a = [], c = this, d = 0, b = function () {
			d++;
			3 === d && c.set("isLoading", !1)
		};
		this.set("isLoading", !0);
		this.set("invitedList", []);
		this.set("canUsePaypal", desktopConnector.canUsePaypal());
		Tawk.userController.getExistingCCCards(!1, b);
		Tawk.webProperties.sites.every(function (a) {
			return a.createdInWizard && a.createdBy === Tawk.userController.user.id ?
				(c.set("site", a), c.set("decodedSiteName", decodeStr(c.site.propertyName)), c.set("siteCreateDone", !0), !1) : !0
		});
		this.site ? (socketConnector.getInvitationList({propertyId: this.site.id}, function (d, f) {
			if (d) return b();
			c.set("inviteAgentDone", !0);
			f && f.data && (f.data.forEach(function (b) {
				a.pushObject(Ember.Object.create({
					agentEmail: b.e,
					role: b.rl,
					actualRole: b.rl,
					id: b._id,
					toBeDeleted: !1
				}))
			}), c.set("invitedList", a));
			b()
		}), this.loadWhitelabelData(b)) : this.set("isLoading", !1)
	},
	addInvitation: function () {
		this.invitedList.pushObject(Ember.Object.create({
			agentEmail: "",
			id: "" + Date.now(), toBeDeleted: !1
		}))
	},
	removeInvitation: function (a) {
		(a = this.invitedList.findProperty("id", a)) && (a.agentEmail ? a.set("toBeDeleted", !0) : this.invitedList.removeObject(a))
	},
	invitationChanged: function () {
		0 === this.invitedList.filterProperty("toBeDeleted", !1).length && (this.addInvitation(), this.addInvitation(), this.addInvitation())
	}.observes("invitedList.@each.toBeDeleted"),
	widgetCode: function () {
		return this.site ? inlineWidgetCode.replace("__SITE_ID__", this.site.id).replace("__WIDGET_ID__", "default") :
			""
	}.property("site"),
	saveSite: function (a, c, d) {
		var b = this, e = {domain: c, pageName: a};
		if (this.site) {
			if (e.pageName === this.decodedSiteName && e.domain === this.site.propertyUrl) return d();
			e.pageId = this.site.id
		} else e.createdByWizard = !0, e.languageCode = Tawk.userController.localeCode;
		e.domain || delete e.domain;
		socketConnector.saveSiteSettings(e, function (a, c) {
			if (a) return d(a);
			Tawk.webProperties.updatePropertyData({
				pgid: c && c.pgid || e.pageId,
				pgn: encodeStr(e.pageName)
			}, !0, function (a) {
				b.set("site", a);
				b.set("decodedSiteName",
					decodeStr(b.site.propertyName));
				b.loadWhitelabelData(d)
			})
		})
	},
	inviteAgents: function (a, c) {
		var d = 0, b = [], e = [], f = this, g = this.invitedList.filterProperty("toBeDeleted", !0),
			h = function (a, e, f) {
				d++;
				a && (a = languageParser.translate("admin", "invitation_fail"), e.code ? "InternalServerError" === e.code ? a = languageParser.translate("generic", "internal_server_error") : "UnauthorizedError" === e.code ? a = languageParser.translate("generic", "unauthorized_error") : "InvalidArgument" === e.code ? a = "email" === e.message ? languageParser.translate("form_validation_messages",
					"invalid_email") : "role" === e.message ? languageParser.translate("admin", "invalid_role") : "inviteId" === e.message ? languageParser.translate("admin", "invalid_invitation") : "agentId" === e.message ? languageParser.translate("generic", "invalid_agent") : languageParser.translate("generic", "invalid_property") : "TooManyRequestsError" === e.code && "over-quota" === e.message ? a = languageParser.translate("admin", "overexceeded_pending_invites") : "ConflictError" === e.code && ("modifying_self" === e.message ? a = languageParser.translate("admin",
					"modifying_self") : "has_active_subscriptions" === e.message ? a = languageParser.translate("admin", "agent_has_subscription_error") : "not_member" === e.message && (a = languageParser.translate("admin", "not_member"))) : "existing-member" === e ? a = languageParser.translate("form_validation_messages", "AGENT_ALREADY_EXIST") : "invite-exists" === e ? a = languageParser.translate("form_validation_messages", "AGENT_ALREADY_INVITED") : "send-email-failed" === e && (a = languageParser.translate("admin", "invitation_email_fail")), b.pushObject({
					id: f,
					message: a
				}));
				d === toBeDone && c(b)
			};
		if (!this.site || !this.site.id) return c(!0);
		this.invitedList.forEach(function (b) {
			var c;
			b.agentEmail && (c = a.findProperty("id", b.id)) && (a.removeObject(c), b.agentEmail && (b.role && c.role !== b.actualRole) && e.pushObject({
				id: c.id,
				role: c.role
			}))
		});
		toBeDone = e.length + a.length + g.length;
		if (0 === toBeDone) return c([]);
		g.length && g.forEach(function (a) {
			socketConnector.removeInvitation({propertyId: f.site.id, inviteId: a.id}, function (b) {
				if (b) return h(!0, b, a.id);
				f.invitedList.removeObjects(g);
				h()
			})
		});
		e.length && e.forEach(function (a) {
			socketConnector.editInvitationAccess({
				propertyId: f.site.id,
				inviteId: a.id,
				role: a.role
			}, function (b) {
				if (b) return h(!0, b, a.id);
				f.invitedList.findProperty("id", a.id).set("role", a.role).set("actualRole", a.role);
				h()
			})
		});
		a.length && a.forEach(function (a) {
			socketConnector.inviteAgentByEmail({
				propertyId: f.site.id,
				email: a.email,
				role: a.role
			}, function (b, c) {
				c && (c.warnings && c.warnings.length) && (b = c.warnings[0]);
				if (b) return h(!0, b, a.id);
				f.invitedList.findProperty("id", a.id).setProperties({
					id: c.data.id,
					agentEmail: a.email, role: a.role, actualRole: a.role
				});
				h()
			})
		})
	},
	emailDeveloper: function (a, c) {
		if (!this.site) return c(!0);
		socketConnector.sendInstallInstructions({
			propertyId: this.site.id,
			widgetId: "default",
			recipients: a
		}, function (a) {
			if (a) return c(a);
			c()
		})
	},
	resetData: function () {
		this.set("siteCreateDone", !1);
		this.set("inviteAgentDone", !1);
		this.set("site", null);
		this.set("decodedSiteName", null);
		this.set("invitedList", [])
	},
	loadWhitelabelData: function (a) {
		var c, d, b = this;
		a = a || function () {
		};
		if (!this.site) return a();
		c = Ember.Object.create();
		d = [];
		socketConnector.getAddOnDetail(this.site.id, "whitelabel", function (e, f) {
			if (e) return a(!0);
			f.plans.forEach(function (a) {
				a = Ember.Object.create({
					id: a.planId,
					price: a.price,
					pricePretify: languageParser.translate("admin", a.planId),
					stripeId: a.stripeId,
					cycle: a.cycle
				});
				d.pushObject(a)
			});
			c.set("plans", d.sortBy("price").reverse());
			c.set("settings", Ember.Object.create(f.settings));
			b.set("activeAddOn", c);
			return a()
		})
	},
	saveWhitelabelSettings: function (a, c) {
		socketConnector.saveWhitelabelSettings(this.site.id,
			a, function (a, b) {
				return a ? c(a) : c()
			})
	},
	handlePayment: function (a, c, d) {
		var b = this, e = function (e, g) {
			var h = function () {
				e ? d(e, g) : (ga("send", "event", "Whitelabel Purchase", "first-time-wizard", "Add-on purchased location tracking"), b.activeAddOn.set("isSubscribed", !0), b.activeAddOn.set("subscriptionId", g), d())
			};
			"cc" === a && "new-card" === c.customerId ? Tawk.userController.getExistingCCCards(!0, h.bind(b)) : h()
		};
		d = d || function () {
		};
		c.addOnId = "whitelabel";
		c.propertyId = this.site.id;
		c.subscriptionId = this.activeAddOn.subscriptionId;
		c.action = "create";
		"cc" === a ? handleCCPayment(c, e) : handlePaypalPayment(c, e)
	},
	delaySetup: function (a) {
		socketConnector.doWizardLater(a)
	}
});
var listType = {
		ALL: "all",
		MY_TICKETS: "my-tickets",
		SPAM: "spam",
		TRASH: "trash",
		CONTACTS: "contacts",
		ONLY_CHATS: "chats",
		UNASSIGNED_OPEN: "new-conversation"
	}, sortType = {
		CREATE_DESC: "co-new-old",
		CREATE_ASC: "co-old-new",
		UPDATE_DESC: "uo-new-old",
		UPDATE_ASC: "uo-old-new",
		PRIORITY_DESC: "p-high-low",
		PRIORITY_ASC: "p-low-high",
		STATUS_DESC: "st-open-closed",
		STATUS_ASC: "st-closed-open"
	},
	priorityType = {
		1E3: languageParser.translate("conversations", "priority_highest"),
		2E3: languageParser.translate("conversations", "priority_high"),
		3E3: languageParser.translate("conversations", "priority_medium"),
		4E3: languageParser.translate("conversations", "priority_low"),
		5E3: languageParser.translate("conversations", "priority_lowest")
	}, statusType = {
		1E3: languageParser.translate("conversations", "status_open"),
		2E3: languageParser.translate("conversations", "status_awaiting"),
		3E3: languageParser.translate("conversations",
			"status_close")
	};
Tawk.ConversationsController = Ember.Controller.extend(Tawk.HistoryInterface, {
	propertiesList: [],
	activeProperty: null,
	conversationData: null,
	queryData: null,
	isLoading: !1,
	limit: 20,
	listType: null,
	sortType: null,
	statusType: null,
	isContactsList: !1,
	contactsQuery: null,
	showList: !0,
	autoOpenTicket: null,
	totalOpen: 0,
	hasToReload: !1,
	includeTickets: null,
	includeChats: null,
	draftReplies: null,
	assigneeIds: null,
	lastViews: null,
	ticketHasChanged: !1,
	isTicket: null,
	previousAssignee: "",
	previousStatus: null,
	defaultQuery: {
		assignees: "",
		deleted: !1, from: 0, includeChats: !0, includeTickets: !0, size: 20, sort: "uo-new-old", spam: !1
	},
	isFilter: !1,
	initialize: function () {
		var a = [], c = this;
		this.propertiesList.clear();
		Tawk.webProperties.get("allProperties").forEach(function (d) {
			a.pushObject(Ember.Object.create({
				id: d.id,
				propertyName: d.propertyName,
				isEnabled: d.enabled,
				isAdmin: d.isAdmin,
				isSelected: !1,
				list: Tawk.PagingListModel.create({perpage: c.limit}),
				tabSettings: d.tabSettings
			}))
		});
		a.length && this.propertiesList.pushObjects(sortList(a, "propertyName"));
		this.set("activeProperty",
			null);
		this.set("conversationData", null);
		this.set("contactData", null);
		this.set("isContactsList", !1);
		this.set("sortType", sortType.UPDATE_DESC);
		this.set("statusType", void 0);
		this.set("includeTickets", !0);
		this.set("includeChats", !0);
		this.set("contactsQuery", "");
		this.set("showList", !0);
		this.set("draftReplies", {});
		this.set("assigneeIds", "");
		this.set("queryData", {
			query: void 0,
			assignees: void 0,
			size: this.limit,
			status: void 0,
			tags: void 0,
			startData: void 0,
			endData: void 0,
			sort: void 0,
			messageCount: void 0
		});
		this.set("listenOnNewTranscript",
			function (a) {
				a.isChat = !0;
				c.storeNewConversation(a)
			});
		this.set("ticketListener", function (a) {
			c.displayTicketListener(a)
		});
		socketConnector.socket.on("newVisitorChatTranscript", this.listenOnNewTranscript);
		socketConnector.socket.on("ticketReplyListUpdate", this.ticketListener);
		this.autoOpenTicket && (this.openProperty(this.autoOpenTicket.propertyId), this.changeList(listType.ALL, function (a) {
			a || c.getTicketDetails(c.autoOpenTicket.ticketId, null, !0)
		}));
		lastViews = main.storageSettings["messaging-view"];
		lastDashboardHistoryData =
			main.storageSettings["dashboard-view"];
		lastViews ? (lastViews = JSON.parse(lastViews), this.set("lastViews", lastViews), this.previousStatus = this.lastViews.previousStatus) : this.set("lastViews", {});
		lastDashboardHistoryData ? (lastDashboardHistoryData = JSON.parse(lastDashboardHistoryData), this.set("lastDashboardHistoryData", lastDashboardHistoryData)) : this.set("lastDashboardHistoryData", {})
	},
	reorderList: function () {
		var a, c = !1;
		if (Tawk.webProperties.reorderList && (Tawk.webProperties.updatedData && "propertyName" ===
				Tawk.webProperties.updatedData.type) && (a = this.propertiesList.findProperty("id", Tawk.webProperties.updatedData.id))) {
			this.propertiesList.removeObject(a);
			a.set("propertyName", Tawk.webProperties.updatedData.name);
			for (var d = 0; d < this.propertiesList.length; d++) if (this.propertiesList.objectAt(d).propertyName.toLowerCase() > a.propertyName.toLowerCase()) {
				this.propertiesList.insertAt(d, a);
				c = !0;
				break
			}
			c || this.propertiesList.pushObject(a)
		}
	}.observes("Tawk.webProperties.reorderList"),
	limitChanged: function () {
		var a =
			this;
		this.listType && (!this.isLoading && this.limit) && (this.propertiesList.forEach(function (c) {
			c.list.set("perpage", a.limit)
		}), this.queryData.size = this.limit, "contacts" === this.listType ? this.loadContactsList() : this.reloadList())
	}.observes("this.limit"),
	loadAggregation: function () {
		var a = 0, c = this;
		socketConnector.getAggregation(function (d, b) {
			d || (c.propertiesList.setEach("aggregate", null), Object.keys(b).forEach(function (d) {
				var f = c.propertiesList.findProperty("id", d);
				a += b[d].all;
				f && f.set("aggregate", b[d])
			}),
				c.set("totalOpen", a))
		})
	},
	clearData: function (a) {
		this.clearConversationData(a);
		this.propertiesList.clear();
		this.set("activeProperty", null);
		this.set("queryData", {});
		this.set("autoOpenTicket", null);
		this.set("listType", null);
		this.set("statusType", null);
		this.set("assigneeIds", "")
	},
	openProperty: function (a, c) {
		var d, b, e = !1, f = !1, g = this;
		void 0 === a && (f = !0, this.lastViews.propertyId ? a = this.lastViews.propertyId : (e = !0, a = this.propertiesList[0].id));
		this.lastViews.propertyId !== a && (e = f = !0);
		d = this.lastViews[a];
		(b = this.propertiesList.findProperty("id",
			a)) || (b = this.propertiesList[0]);
		this.activeProperty && this.activeProperty.list.reset();
		d && (e = !1);
		this.activeProperty && this.activeProperty.id === a && (e = f = !0);
		this.propertiesList.setEach("isSelected", !1);
		b.set("isSelected", !0);
		this.set("activeProperty", b);
		c || this.loadAvailableTags();
		e || c || (this.lastViews.draftReplies && this.set("draftReplies", JSON.parse(this.lastViews.draftReplies)), d && void 0 !== d.detailsId && (b = function (a) {
			a && g.set("showList", !0)
		}, this.set("showList", !1), "chat" === d.detailsType ? g.openChatTranscript(d.detailsId,
			null, b) : "ticket" === d.detailsType ? g.getTicketDetails(d.detailsId, null, !1, b) : "contact" === d.detailsType && g.getContactDetails(d.detailsId, null, b)), this.lastViews.isContactsList ? g.loadContactsList() : (void 0 !== this.lastViews.includeTickets && this.set("includeTickets", this.lastViews.includeTickets), void 0 !== this.lastViews.includeChats && this.set("includeChats", this.lastViews.includeChats), void 0 === this.lastViews.statusType ? this.set("statusType", void 0) : this.set("statusType", parseInt(this.lastViews.statusType,
			10)), g.changeList(this.lastViews.listType)));
		f && (e && !c) && (this.changeList(listType.ALL), this.set("conversationData", null), this.set("contactData", null), this.set("showList", !0))
	},
	loadAvailableTags: function () {
		var a = this, c = [];
		this.activeProperty && socketConnector.getTags(this.activeProperty.id, function (d, b) {
			a.activeProperty && (!d && b.tags.length) && (b.tags.forEach(function (a) {
				c.push(decodeStr(a))
			}), a.activeProperty.set("availableTags", c.sort()))
		})
	},
	changeList: function (a, c) {
		c = c || function () {
		};
		a === listType.MY_TICKETS &&
		this.changeAssignee([Tawk.userController.user.id].concat(Tawk.webProperties.attachedDepartments));
		this.listType === listType.MY_TICKETS && this.changeAssignee("0");
		this.set("listType", a);
		this.set("sortType", sortType.UPDATE_DESC);
		this.reloadList(c)
	},
	resetCurrentList: function () {
		var a = this.activeProperty;
		a && a.list.startList()
	},
	loadList: function (a, c) {
		var d = this.activeProperty;
		a = a || function () {
		};
		this.set("isLoading", !0);
		c || this.loadAggregation();
		this.set("isContactsList", !1);
		if (!d) return this.set("isLoading",
			!1), a(!0);
		this.set("queryData.from", d.list.currentHead);
		this.set("queryData.sort", this.sortType);
		this.set("queryData.includeTickets", this.includeTickets);
		this.set("queryData.includeChats", this.includeChats);
		this.set("queryData.assignees", void 0);
		this.set("queryData.spam", !1);
		this.set("queryData.deleted", !1);
		this.set("queryData.status", this.statusType ? [this.statusType] : this.statusType);
		this.set("queryData.assignees", this.assigneeIds);
		d.list.pendingData.clear();
		this.listType === listType.SPAM ? this.set("queryData.spam",
			!0) : this.listType === listType.TRASH && this.set("queryData.deleted", !0);
		this.queryData.from !== this.defaultQuery.from || this.queryData.sort !== this.defaultQuery.sort || this.queryData.includeTickets !== this.defaultQuery.includeTickets || this.queryData.includeChats !== this.defaultQuery.includeChats || this.queryData.assignees !== this.defaultQuery.assignees || this.queryData.spam !== this.defaultQuery.spam || this.queryData.deleted !== this.defaultQuery.deleted || this.queryData.status !== this.defaultQuery.status || this.queryData.assigneeId &&
		"0" !== this.queryData.assigneeId || this.queryData.endDate || this.queryData.startDate || this.queryData.messageCount || this.queryData.query || this.queryData.statusSearch && "0" !== this.queryData.statusSearch || this.queryData.tags ? this.set("isFilter", !0) : (this.set("isFilter", !1), d.forwardingEmail || socketConnector.getPropertyInfo(d.id, {settings: !0}, function (a, c) {
			a || c.data && c.data.efwd && d.set("forwardingEmail", c.data.efwd + GLOBAL_TICKETS_DOMAIN)
		}));
		this.loadConversationList(d.id, a, this.handleCallback.bind(this))
	},
	searchList: function (a, c) {
		if (!this.checkChangeAllowed()) return c();
		(0 !== a.statusSearch && void 0 === this.statusType || this.statusType !== a.statusSearch || 0 === a.statusSearch && void 0 !== this.statusType) && this.changeStatus(a.statusSearch);
		(this.listType === listType.MY_TICKETS && "0" !== a.assigneeId || this.listType === listType.MY_TICKETS && "0" === a.assigneeId && this.assigneeIds[0] || this.listType !== listType.MY_TICKETS && ("0" === a.assigneeId && "" !== this.assigneeIds || "1" === a.assigneeId && "assigned" !== this.assigneeIds || "-1" ===
			a.assigneeId && null !== this.assigneeIds || a.assigneeId !== this.assigneeIds[0])) && this.changeAssignee(a.assigneeId);
		this.set("queryData", a);
		this.set("conversationData", null);
		this.toggleList(!0);
		this.resetCurrentList();
		this.loadList(c)
	},
	loadConversationList: function (a, c, d) {
		this.set("isContactsList", !1);
		socketConnector.getConversationsList(a, this.queryData, function (a, e) {
			d(a, e, c)
		})
	},
	loadContactsList: function (a, c) {
		var d = [], b = this, e = this.activeProperty;
		c = c || function () {
		};
		this.set("isLoading", !0);
		if (!e) return b.set("isLoading",
			!1), c(!0);
		a || (this.set("listType", listType.CONTACTS), this.clearConversationData(), this.resetCurrentList());
		this.isContactsList || (this.set("isContactsList", !0), this.resetCurrentList(), this.saveLastView());
		socketConnector.getContacts(e.id, {
			query: this.contactsQuery,
			from: e.list.currentHead,
			size: this.queryData.size
		}, function (a, g) {
			if (a) return b.set("isLoading", !1), c(a);
			g.hits.forEach(function (a) {
				a.lastActive = formatDate(a.lastEventOn);
				a.firstVisit = formatDate(a.firstEventOn);
				a.countryFlag = a.lastKnown && a.lastKnown.cc &&
				"ukn" !== a.lastKnown.cc ? "flag flag-" + a.lastKnown.cc.toLowerCase() : "flag flag-ukn";
				d.pushObject(Tawk.CopyableModel.create(a))
			});
			e.list.setTotal(g.total);
			e.list.setList(d);
			e.set("isSelected", !0);
			b.set("isLoading", !1);
			c()
		})
	},
	handleCallback: function (a, c, d) {
		var b = [], e = this, f = this.activeProperty;
		d = d || function () {
		};
		if (!f) return e.set("isLoading", !1), d(!0);
		if (a) return e.set("isLoading", !1), d(a);
		c.hits.forEach(function (a) {
			a = e.parseConversationData(a);
			e.draftReplies[a._id] && (a.hasDraft = !0);
			b.pushObject(Ember.Object.createWithMixins(a))
		});
		f.list.setTotal(c.total);
		f.list.setList(b);
		f.set("isSelected", !0);
		this.set("isLoading", !1);
		d(null, !!b.length)
	},
	changeSort: function (a) {
		a !== this.sortType && (this.set("sortType", a), this.reloadList())
	},
	changeStatus: function (a, c) {
		a !== this.statusType && (this.previousStatus = this.statusType, 0 === a ? this.set("statusType", void 0) : this.set("statusType", a), c && this.reloadList())
	},
	changeAssignee: function (a, c) {
		var d = !1;
		this.previousAssignee = this.assigneeIds;
		if (!("0" === a && "" === this.assigneeIds || "1" === a && "assigned" ===
				this.assigneeIds || "-1" === a && null === this.assigneeIds || JSON.stringify(this.assigneeIds) === JSON.stringify([a]))) {
			if (a === Tawk.userController.user.id) return this.changeList(listType.MY_TICKETS);
			this.listType === listType.MY_TICKETS && a !== Tawk.userController.user.id && (d = !0);
			"0" === a ? this.set("assigneeIds", "") : "1" === a ? this.set("assigneeIds", "assigned") : "-1" === a ? this.set("assigneeIds", null) : "hired_agent" === a ? this.set("assigneeIds", Tawk.webProperties.getHiredAgentsIds(this.activeProperty.id)) : (Array.isArray(a) ||
			(a = [a]), this.set("assigneeIds", a));
			d && this.set("listType", listType.ALL);
			c && this.reloadList()
		}
	},
	reloadList: function (a) {
		a = a || function () {
		};
		this.resetCurrentList();
		this.clearConversationData();
		this.saveLastView();
		this.loadList(a)
	},
	nextConversationsList: function (a) {
		if (!this.activeProperty || this.activeProperty.list.isLastPage()) return a();
		this.activeProperty.list.nextList();
		this.loadList(a)
	},
	nextContactsList: function (a) {
		if (!this.activeProperty || this.activeProperty.list.isLastPage()) return a();
		this.activeProperty.list.nextList();
		this.loadContactsList(!0, a)
	},
	openConversation: function (a, c) {
		var d, b = this.activeProperty;
		c = c || function () {
		};
		this.set("isLoading", !0);
		if (!b) return this.set("isLoading", !1), c();
		d = b.list.currentData.findProperty("_id", a);
		b.list.currentData.setEach("isMarked", !1);
		if (!d) return this.set("isLoading", !1), c();
		if ("chat" === d.type) {
			if (this.conversationData && this.conversationData._id === a) return this.set("isLoading", !1), c();
			this.openChatTranscript(a, d, c)
		} else {
			if (this.conversationData && this.conversationData.id ===
				a) return this.set("isLoading", !1), c();
			this.getTicketDetails(a, d, !1, c)
		}
	},
	openChatTranscript: function (a, c, d) {
		var b = this, e = this.activeProperty;
		d = d || function () {
		};
		loadTranscript(a, e.id, function (f) {
			if (!f) return b.set("isLoading", !1), d(!0);
			f.startDateTime = moment(f.cso).format("LLL");
			f.chatWith = languageParser.translate("conversations", "chat_with", {name: f.n});
			f.isChat = !0;
			f.isClosed = 3E3 === f.s;
			f.visitorName = decodeStr(f.n);
			f.isHistory = !0;
			null !== c && (f.indexNum = e.list.currentData.indexOf(c) + 1 + e.list.currentHead);
			b.set("conversationData", Ember.Object.create(f));
			b.loadVisitor(f.nvid, e.id, function (a) {
				a && (f.visitorName = decodeStr(a.n), f.visitor = a, f.notesUpdatedOn = a.ldub ? moment(a.ldub.uo).format("dddd, MMMM D YYYY, HH:mm") : null, f.notesUpdatedBy = a.ldub ? decodeStr(Tawk.agentsController.getName(a.ldub.aid)) : null, f.ns = a.ns, f.notesValue = decodeStr(a.ns), f.e = a.e);
				b.set("conversationData", Ember.Object.create(f));
				b.set("isLoading", !1);
				c && c.set("isRead", !0);
				f.callInfo.length && (b.conversationData.set("syncCallData", !0), b.conversationData.set("callData",
					{}), setTimeout(function () {
					f.callInfo.forEach(function (a) {
						conversationProcess.processWebRTCCallBlock(a.callId, e.id, a.callView, !1, function (c, d) {
							b.conversationData.set("syncCallData", !1);
							d && b.conversationData.set("callData." + a.callId, d)
						})
					})
				}, 1E3));
				b.saveLastView();
				return d()
			});
			socketConnector.markConversationRead(e.id, a, {type: "chat", eventOrderId: 0, messageEventOrderId: 0})
		})
	},
	openHistoryTranscript: function (a, c, d) {
		loadTranscript(a, c, function (a) {
			if (!a) return d(!0);
			d(null, a)
		})
	},
	loadVisitor: function (a, c, d) {
		if (this.conversationData &&
			this.conversationData.visitor && this.conversationData.vid === a) return d(this.conversationData.visitor);
		socketConnector.getVisitorInfo(a, c, function (a, c) {
			if (a) return d(null);
			c.lastVisitDate = c.lvd ? languageParser.translate("visitors", "last_visit", {lastVisitDate: moment(c.lvd).fromNow()}) : null;
			c.lastChatAgent = c.lci && c.lci.aid.length ? decodeStr(Tawk.agentsController.getName(c.lci.aid[0])) : null;
			c.lastChatDate = c.lci && c.lastChatAgent ? moment(c.lci.tm).fromNow() : null;
			c.countryFlag = c.lk && c.lk.cc ? "flag flag-" + c.lk.cc.toLowerCase() :
				"flag-ukn";
			return d(c)
		})
	},
	loadVisitorHistory: function (a, c) {
		var d = [], b = this;
		c = c || function () {
		};
		a.historyList || (a.set("historyList", Tawk.PagingListModel.create({perpage: 15})), a.historyList.startList());
		historyQuery = {
			visitorId: a.vid,
			size: 15,
			from: a.historyList.currentHead,
			includeTickets: !1,
			includeChats: !0,
			sort: sortType.UPDATE_DESC
		};
		socketConnector.getConversationsList(a.pgid, historyQuery, function (e, f) {
			if (e) return c();
			f.hits.forEach(function (a) {
				b.conversationData && a._id === b.conversationData._id || (a.time =
					formatDate(a.updatedOn), a.agentsName = Tawk.agentsController.getAgentsName(a.agents).join(", "), d.pushObject(Ember.Object.createWithMixins(a)))
			});
			a.historyList.setTotal(a.isHistory ? f.total - 1 : f.total);
			a.historyList.setList(d);
			c()
		})
	},
	clearConversationData: function (a) {
		this.set("conversationData", null);
		this.set("contactData", null)
	},
	openNextConversation: function () {
		var a, c, d = this;
		a = this.conversationData;
		var b = this.activeProperty;
		a && b && (this.set("isLoading", !0), a = a.indexNum - b.list.currentHead, (c = b.list.currentData.objectAt(a)) ||
		a !== b.list.currentData.length ? this.openConversation(c._id) : d.nextConversationsList(function (a) {
			a || d.openConversation(b.list.currentData[0]._id)
		}))
	},
	openPreviousConversation: function () {
		var a, c = this, d = this.conversationData, b = this.activeProperty;
		!d || (!b || 1 >= d.indexNum) || (this.set("isLoading", !0), a = d.indexNum - b.list.currentHead, a = b.list.currentData.objectAt(a - 2), !a && 1 < d.indexNum ? c.previousConversationsList(function (a) {
			a || c.openConversation(b.list.currentData.get("lastObject")._id)
		}) : c.openConversation(a._id))
	},
	openNextContact: function () {
		var a, c, d = this;
		a = this.contactData;
		var b = this.activeProperty;
		a && b && (this.set("isLoading", !0), a = a.indexNum - b.list.currentHead, (c = b.list.currentData.objectAt(a)) || a !== b.list.currentData.length ? this.openContact(c._id) : d.nextContactsList(function (a) {
			a || d.openContact(b.list.currentData[0]._id)
		}))
	},
	openPreviousContact: function () {
		var a, c = this, d = this.contactData, b = this.activeProperty;
		!d || (!b || 1 >= d.indexNum) || (this.set("isLoading", !0), a = d.indexNum - b.list.currentHead, a = b.list.currentData.objectAt(a -
			2), !a && 1 < d.indexNum ? c.previousConversationsList(function (a) {
			a || c.openContact(b.list.currentData.get("lastObject")._id)
		}) : c.openContact(a._id))
	},
	actions: {
		nextConversation: function () {
			this.checkChangeAllowed() && this.openNextConversation()
		}, previousConversation: function () {
			this.checkChangeAllowed() && this.openPreviousConversation()
		}, nextContact: function () {
			this.openNextContact()
		}, previousContact: function () {
			this.openPreviousContact()
		}
	},
	getModalTranscriptData: function (a, c, d) {
		var b = this.activeProperty, e = this;
		d = d || function () {
		};
		if (!b) return d(!0);
		loadTranscript(a, b.id, function (a) {
			if (!a) return d(!0);
			a.visitorName = decodeStr(a.n);
			a.isPopover = !1;
			a.isHistory = !0;
			e.loadVisitor(a.nvid, a.pgid, function (b) {
				b && (a.visitorName = decodeStr(b.n), a.visitor = b, a.notesUpdatedOn = b.ldub ? moment(b.ldub.uo).format("dddd, MMMM D YYYY, HH:mm") : null, a.notesUpdatedBy = b.ldub ? decodeStr(Tawk.agentsController.getName(b.ldub.aid)) : null, a.ns = b.ns, a.notesValue = decodeStr(b.ns), a.e = b.e);
				socketConnector.getGeoLocation([a.ip], function (b, g) {
					!b &&
					g.length && (a.latitude = g[0].latitude, a.longitude = g[0].longitude);
					c && (a.isConversationInView = !0);
					e.set("modalTranscriptData", Ember.Object.create(a));
					d()
				})
			})
		})
	},
	getCopyFormat: function () {
		getCopyFormat(this.conversationData)
	},
	printTranscript: function () {
		printTranscript(this.conversationData)
	},
	emailTranscript: function (a, c) {
		emailTranscript(a, this.conversationData, c)
	},
	toggleMark: function (a, c) {
		var d = this.activeProperty.list.getItem(a);
		d && d.set("isMarked", c)
	},
	assigneeList: function () {
		var a, c = !1, d = [], b = [], e = {
			departments: [],
			agents: []
		};
		if (!this.activeProperty) return null;
		a = Tawk.webProperties.getProperty(this.activeProperty.id);
		if (!a) return null;
		a.departments && Object.keys(a.departments).forEach(function (c) {
			var d = a.departments[c];
			d.en && d.a.length && b.pushObject(Ember.Object.create({id: c, name: d.n}))
		});
		a.currentAgents.forEach(function (b) {
			var e;
			b.en && b.aid !== Tawk.userController.user.id && (b.ha && !Tawk.userController.user.isHiredAgent ? c = !0 : (e = Tawk.agentsController.getAgent(b.aid)) && d.pushObject(Ember.Object.create({
				id: b.aid, name: e.name,
				isPropertyClient: Tawk.userController.user.isHiredAgent && !b.ha && a.isClientProperty
			})))
		});
		c && d.pushObject(Ember.Object.create({
			id: "hired_agent",
			name: "Hired Agents",
			isSelected: !0,
			disabled: !0
		}));
		e.departments = sortList(b, "name");
		e.agents = sortList(d, "name");
		d = b = null;
		return e
	}.property("activeProperty"),
	getActiveListAll: function () {
		return this.activeProperty.aggregate && this.activeProperty.aggregate.all ? this.activeProperty.aggregate.all : !1
	}.property("activeProperty"),
	getAssigneeType: function (a) {
		return this.get("assigneeList").departments.findProperty("id",
			a) ? "department" : "agent"
	},
	addAttachment: function (a, c, d, b, e) {
		var f, g = this.activeProperty;
		if (!g) return e(!0);
		b ? f = "new-ticket" : this.conversationData && !this.conversationData.isChat ? f = this.conversationData.id : e(!0);
		fileUploader.uploadAttachment(a, c, g.id, f, d, function (a, b) {
			a && e(!0, b);
			e()
		})
	},
	createTicket: function (a, c, d) {
		var b = this, e = this.activeProperty;
		if (!e) return d(!0);
		if (c) {
			if (!this.conversationData || !this.conversationData.isChat) return d(!0);
			a.chatId = this.conversationData.chatId
		}
		(this.get("isStatusPending") ||
			this.get("isStatusClosed")) && this.changeStatus(0);
		socketConnector.createTicket(e.id, a, function (a, c) {
			if (a) return d(!0);
			setTimeout(function () {
				b.loadAggregation()
			});
			b.toggleList(!1);
			b.reloadList(function (a) {
				a = e.list.getItem(c.ticketId);
				b.getTicketDetails(c.ticketId, a, !1, d)
			})
		})
	},
	getTicketDetails: function (a, c, d, b) {
		var e = this, f = this.activeProperty, g = 0;
		b = b || function () {
		};
		if (!f) return b(!0);
		socketConnector.getTicket(f.id, a, function (h, k) {
			var l = [];
			if (h) return b(!0);
			k.id = a;
			k.wroteTime = formatDate(k.cso);
			k.startDateTime =
				moment(k.cso).format("MMMM D YYYY, HH:mm");
			k.watchersString = Tawk.agentsController.getAgentsName(k.wtch).join(", ");
			k.messages = ticketProcess.processEvents(k.e, k.pgid, k.read, {
				message: k.msg,
				attachments: k.attch,
				wroteTime: formatDate(k.cso),
				creator: k.crtrN,
				creatorType: k.crtrT
			});
			k.tags && k.tags.forEach(function (a) {
				l.push(decodeStr(a))
			});
			k.tags = l;
			k.customTags = {data: l.join(", "), version: 1};
			if (void 0 !== e.draftReplies[a]) try {
				k.draftedText = JSON.parse(e.draftReplies[a])
			} catch (m) {
				k.draftedText = {message: decodeStr(e.draftReplies[a])}
			}
			k.isClosed =
				3E3 === k.s;
			d || (k.indexNum = f.list.currentData.indexOf(c) + 1 + f.list.currentHead);
			k.e && (k.e.length && k.e[k.e.length - 1]) && (g = k.e[k.e.length - 1].order);
			socketConnector.markConversationRead(f.id, a, {type: "ticket", eventOrderId: g});
			e.set("conversationData", Ember.Object.create(k));
			k.rplyLst.list.length && e.displayTicketListener({list: k.rplyLst.list, pgid: f.id, tId: a});
			c && c.set("isRead", !0);
			e.set("isLoading", !1);
			e.toggleList(!1);
			e.saveLastView();
			b()
		})
	},
	isAll: function () {
		return this.listType === listType.ALL
	}.property("listType"),
	isTickets: function () {
		return this.listType === listType.MY_TICKETS
	}.property("listType"),
	isMyTickets: function () {
		return this.listType === listType.MY_TICKETS
	}.property("listType"),
	isNewConversation: function () {
		return this.listType === listType.UNASSIGNED_OPEN
	}.property("listType"),
	isSpam: function () {
		return this.listType === listType.SPAM
	}.property("listType"),
	isTrash: function () {
		return this.listType === listType.TRASH
	}.property("listType"),
	isContacts: function () {
		return this.listType === listType.CONTACTS
	}.property("listType"),
	isCreatedOnSort: function () {
		return this.sortType === sortType.CREATE_DESC || this.sortType === sortType.CREATE_ASC
	}.property("sortType"),
	isUpdatedOnSort: function () {
		return this.sortType === sortType.UPDATE_DESC || this.sortType === sortType.UPDATE_ASC
	}.property("sortType"),
	isPrioritySort: function () {
		return this.sortType === sortType.PRIORITY_DESC || this.sortType === sortType.PRIORITY_ASC
	}.property("sortType"),
	isStatusSort: function () {
		return this.sortType === sortType.STATUS_DESC || this.sortType === sortType.STATUS_ASC
	}.property("sortType"),
	statusFilterTitle: function () {
		var a, c;
		1E3 === this.statusType ? c = this.previousStatus : this.previousStatus = c = this.statusType;
		c && void 0 !== c ? 1E3 === c ? a = languageParser.translate("conversations", "status_open") : 2E3 === c ? a = languageParser.translate("conversations", "status_awaiting") : 3E3 === c && (a = languageParser.translate("conversations", "status_close")) : a = languageParser.translate("generic", "any");
		return a
	}.property("statusType"),
	isStatusAll: function () {
		return void 0 === this.statusType
	}.property("statusType"),
	isStatusOpen: function () {
		return 1E3 ===
			this.statusType
	}.property("statusType"),
	isStatusPending: function () {
		return 2E3 === this.statusType
	}.property("statusType"),
	isStatusClosed: function () {
		return 3E3 === this.statusType
	}.property("statusType"),
	isMyMessageList: function () {
		return "assigned" !== this.assigneeIds && this.assigneeIds && this.assigneeIds[0] === Tawk.userController.user.id && "" !== this.assigneeIds
	}.property("assigneeIds"),
	isAssignedMessageList: function () {
		return "assigned" === this.assigneeIds
	}.property("assigneeIds"),
	isAllMessageList: function () {
		return null !==
			this.assigneeIds && "" === this.assigneeIds
	}.property("assigneeIds"),
	displayAllMessageListNumber: function () {
		return null !== this.assigneeIds && "" === this.assigneeIds || "assigned" !== this.assigneeIds && this.assigneeIds && this.assigneeIds[0] === Tawk.userController.user.id && "" !== this.assigneeIds && null !== this.previousAssignee && "" === this.previousAssignee
	}.property("assigneeIds"),
	isUnassignedMessageList: function () {
		return null === this.assigneeIds
	}.property("assigneeIds"),
	assigneeFilterTitle: function () {
		var a;
		"assigned" !==
		this.assigneeIds && this.assigneeIds && this.assigneeIds[0] === Tawk.userController.user.id && "" !== this.assigneeIds ? a = this.previousAssignee : this.previousAssignee = a = this.assigneeIds;
		return "assigned" === a ? languageParser.translate("conversations", "assigned_text") : null !== a && "" === a || "assigned" !== a && a && a[0] === Tawk.userController.user.id && "" !== a ? languageParser.translate("generic", "all_text") : null === a ? languageParser.translate("conversations", "unassigned") : Tawk.agentsController.getAgent(a[0]) ? Tawk.agentsController.getAgent(a[0]).name :
			Tawk.webProperties.getDepartmentName(this.activeProperty.id, a[0])
	}.property("assigneeIds"),
	isAscending: function () {
		return this.sortType === sortType.CREATE_ASC || this.sortType === sortType.UPDATE_ASC || this.sortType === sortType.PRIORITY_ASC || this.sortType === sortType.STATUS_ASC
	}.property("sortType"),
	parseConversationData: function (a) {
		var c = this.activeProperty;
		"chat" === a.type ? (a.duration = moment.duration(1E3 * a.chatDuration).humanize(), a.agentsNameList = Tawk.agentsController.getAgentsName(a.agents) || Tawk.webProperties.getDepartmentName(c.id,
			a.department), a.agentsName = a.agentsNameList.join(", "), !a.agentsNameList.length && a.department && a.agentsNameList.push(Tawk.webProperties.getDepartmentName(c.id, a.department)), a.countryFlag = a.countryCode && "ukn" !== a.countryCode ? "flag flag-" + a.countryCode.toLowerCase() : "flag flag-ukn", a.totalMessages = languageParser.translate("history", "total_message", {num: a.messageCount}), a.isChat = !0, a.visitorName = decodeStr(a.visitorName)) : (a.requester.name = decodeStr(a.requester.name), a.assigneeId && (a.assignee = "agent" ===
		a.assigneeType ? Tawk.agentsController.getAgentsName(a.assigneeId).join(", ") : Tawk.webProperties.getDepartmentName(c.id, a.assigneeId)));
		this.get("isCreatedOnSort") ? a.sorted = formatDate(a.createdOn) : this.get("isUpdatedOnSort") ? a.sorted = formatDate(a.updatedOn) : this.get("isPrioritySort") ? a.sorted = priorityType[a.priority] : this.get("isStatusSort") && (a.sorted = statusType[a.status]);
		a.currentStatus = statusType[a.status];
		a.statusLabel = "status-" + a.status;
		"ticket" === a.type && (a.requester.firstLetterName = a.requester.name[0]);
		3E3 === a.status ? a.isClosed = !0 : (a.isRead = a.read, !a.isRead && (a.assigneeId && a.assigneeId !== Tawk.userController.user.id) && (a.isRead = !0));
		a.hasAdminAccess = c ? c.isAdmin : !1;
		a.isMarked = !1;
		return a
	},
	sendTicketReply: function (a, c) {
		var d = this, b = [];
		c = c || function () {
		};
		if (!this.activeProperty || !this.conversationData) return c(!0);
		socketConnector.replyTicket(this.activeProperty.id, this.conversationData.id, a, function (e) {
			e ? c(e) : (b.push({
				event: {
					crtrN: Tawk.userController.user.fullName,
					cbe: !1,
					hAttch: a.attachments.length,
					co: (new Date).getTime(),
					op: "ticket-reply",
					crtrT: "agent",
					crtrId: Tawk.userController.user.id,
					data: {msg: a.message, msgP: a.plainMessage, "private": a.private},
					attch: a.attachments
				}
			}), a.status && (d.conversationData.set("st", a.status), b.push({
				event: {
					crtrN: Tawk.userController.user.fullName,
					cbe: !1,
					co: (new Date).getTime(),
					op: "ticket-change-status",
					crtrT: "agent",
					crtrId: Tawk.userController.user.id,
					data: {s: a.status}
				}
			})), a.status && 3E3 === a.status ? d.conversationData.set("isClosed", !0) : d.conversationData.set("isClosed",
				!1), d.set("draftReplies." + d.conversationData.id, void 0), d.conversationData.messages.pushObjects(ticketProcess.processEvents(b)), d.storeDraft(null), d.ticketHasChanged = !0, d.loadList(c))
		})
	},
	updateTicketPriority: function (a, c) {
		var d = this;
		c = c || function () {
		};
		if (!this.activeProperty || !this.conversationData || !priorityType[a]) return c(!0);
		socketConnector.changePriority(this.activeProperty.id, this.conversationData.id, {priority: a}, function (b) {
			if (b) return c(b);
			b = ticketProcess.processEvents([{
				event: {
					crtrN: Tawk.userController.user.fullName,
					co: (new Date).getTime(), op: "ticket-change-priority", data: {p: a}
				}
			}]);
			d.conversationData.messages.pushObjects(b);
			d.conversationData.set("p", a);
			c()
		})
	},
	updateTags: function (a, c) {
		var d = this, b = {tagsAdded: [], tagsRemoved: []};
		c = c || function () {
		};
		if (!this.activeProperty || !this.conversationData) return c(!0);
		this.conversationData.tags && this.conversationData.tags.length ? (this.conversationData.tags.forEach(function (c) {
			-1 === a.indexOf(c) && b.tagsRemoved.push(c)
		}), a.forEach(function (a) {
			-1 === d.conversationData.tags.indexOf(a) &&
			b.tagsAdded.push(a)
		})) : b.tagsAdded = a;
		if (0 === b.tagsAdded.length && 0 === b.tagsRemoved.length) return c();
		socketConnector[this.conversationData.isHistory ? "updateChatTags" : "updateTicketTags"](this.activeProperty.id, this.conversationData.isHistory ? this.conversationData.chatId : this.conversationData.id, b, function (a, b) {
			var g = [];
			if (a) return c(!0, a);
			d.conversationData.tags && d.conversationData.tags.length ? d.conversationData.tags.clear() : d.conversationData.set("tags", []);
			b.tags.forEach(function (a) {
				g.push(decodeStr(a))
			});
			d.conversationData.tags.pushObjects(g);
			d.conversationData.set("tagsv", 1);
			d.conversationData.set("customTags", {data: g.join(", "), version: 1});
			d.loadAvailableTags();
			c()
		})
	},
	updateTicketAssignee: function (a, c, d) {
		var b, e = this;
		d = d || function () {
		};
		if (!this.activeProperty || !this.conversationData) return d(!0);
		b = this.activeProperty.list.getItem(this.conversationData.id);
		if (!b) return d(!0);
		"0" === a ? socketConnector.unassignTicket(this.activeProperty.id, this.conversationData.id, function (a) {
			if (a) return d(a);
			a = ticketProcess.processEvents([{
				event: {
					crtrN: Tawk.userController.user.fullName,
					co: (new Date).getTime(), op: "ticket-unassigned"
				}
			}]);
			e.conversationData.messages.pushObjects(a);
			b.setProperties({assignee: null, assigneeId: null, assigneeType: null});
			e.conversationData.setProperties({assignee: null, assigneeId: null, assigneeType: null});
			setTimeout(function () {
				e.loadAggregation()
			});
			d()
		}) : socketConnector.updateAssignee(this.activeProperty.id, this.conversationData.id, {
			assigneeId: a,
			assigneeType: c
		}, function (f) {
			if (f) return d(f);
			f = "agent" === c ? Tawk.agentsController.getAgentsName(a).join(", ") : Tawk.webProperties.getDepartmentName(e.activeProperty.id,
				a);
			var g = ticketProcess.processEvents([{
				event: {
					crtrN: Tawk.userController.user.fullName,
					co: (new Date).getTime(),
					op: "ticket-assigned",
					data: {assgnId: a, assgnN: f, assgnT: c}
				}
			}]);
			e.conversationData.messages.pushObjects(g);
			b.setProperties({assignee: f, assigneeId: a, assigneeType: c});
			e.conversationData.setProperties({assignee: f, assigneeId: a, assigneeType: c});
			setTimeout(function () {
				e.loadAggregation()
			});
			d()
		})
	},
	markTicketAsSpam: function (a) {
		var c, d = this;
		if (!this.activeProperty || !this.conversationData) return a(!0);
		c =
			this.activeProperty.list.getItem(this.conversationData.id);
		socketConnector.bulkSpamUpdate(this.activeProperty.id, {spam: !0, tickets: [c._id]}, function (b) {
			if (b) return a(b);
			setTimeout(function () {
				d.loadAggregation()
			});
			d.clearConversationData();
			d.activeProperty.list.removeItem(c);
			a()
		})
	},
	removeTicketFromSpam: function (a) {
		var c, d = this;
		if (!this.activeProperty || !this.conversationData) return a(!0);
		c = this.activeProperty.list.getItem(this.conversationData.id);
		socketConnector.bulkSpamUpdate(this.activeProperty.id,
			{spam: !1, tickets: [c._id]}, function (b) {
				b && a(b);
				setTimeout(function () {
					d.loadAggregation()
				});
				d.clearConversationData();
				d.activeProperty.list.removeItem(c);
				a()
			})
	},
	deleteSingleItem: function (a) {
		this.isTicket ? this.deleteTicket(a) : this.deleteSingleHistory(a)
	},
	deleteSingleHistory: function (a) {
		var c, d;
		a = a || function () {
		};
		if (this.modalTranscriptData) return this.deleteModalHistory(a);
		if (this.conversationData) d = this.conversationData.chatId; else return a(!0);
		c = this.activeProperty.list.getItem(d);
		if (!c) return a(!0);
		c.set("isMarked", !0);
		this.bulkDeleteConversations(function (b) {
			c.set("isMarked", !1);
			a(b)
		})
	},
	deleteModalHistory: function (a) {
		var c, d = this;
		if (!(this.activeProperty && this.activeProperty.isAdmin && this.modalTranscriptData && this.modalTranscriptData._id)) return a(!0);
		this.conversationData && d.conversationData.historyList ? c = this.conversationData.historyList.getItem(this.modalTranscriptData._id) : this.activeProperty.list && (c = this.activeProperty.list.getItem(this.modalTranscriptData._id));
		if (!c) return a(!0);
		checkAndSetConfirmView(!1,
			function (b) {
				if (!b) return a(!0);
				socketConnector.deleteConversations(d.activeProperty.id, {
					chats: [d.modalTranscriptData._id],
					tickets: []
				}, function (b, f) {
					if (b || f.chats.errorsInItems) return a(!0);
					d.conversationData && d.conversationData.historyList && d.conversationData.historyList.currentData.removeObject(c);
					d.activeProperty.list && d.activeProperty.list.currentData.removeObject(c);
					d.set("modalTranscriptData", null);
					a()
				})
			})
	},
	deleteTicket: function (a) {
		var c;
		if (!this.activeProperty || !this.conversationData) return a(!0);
		c = this.activeProperty.list.getItem(this.conversationData.id);
		c.set("isMarked", !0);
		this.bulkDeleteConversations(function (d) {
			c.set("isMarked", !1);
			a(d)
		})
	},
	restoreTicket: function (a) {
		if (!this.activeProperty || !this.conversationData) return a(!0);
		this.activeProperty.list.getItem(this.conversationData.id).set("isMarked", !0);
		this.bulkConversationsRestore(a)
	},
	storeNewConversation: function (a) {
		!this.activeProperty || (a.pgid !== this.activeProperty.id || !this.listType || this.listType === listType.SPAM || this.listType ===
			listType.TRASH || this.listType === listType.CONTACTS || !this.get("isStatusAll") && a.s !== this.statusType || !this.includeTickets && !a.isChat || !this.includeChats && a.isChat) || (this.listType !== listType.MY_TICKETS || a.assgnId === Tawk.userController.user.id && -1 !== a.a.indexOf(Tawk.userController.user.id)) && this.activeProperty.list.addPendingData(Ember.Object.createWithMixins(a))
	},
	retrieveNewHistory: function () {
		this.activeProperty && (this.activeProperty.list.startList(), this.loadList())
	},
	removeEvent: function () {
		"function" ===
		typeof this.listenOnNewTranscript && socketConnector.socket.removeListener("newVisitorChatTranscript", this.listenOnNewTranscript)
	},
	changeTicketStatus: function (a, c) {
		var d, b = this;
		if (!this.activeProperty || !this.conversationData || !statusType[a]) return c(!0);
		d = this.activeProperty.list.getItem(this.conversationData.id);
		if (!d) return c(!0);
		socketConnector.updateTicketStatus(this.activeProperty.id, this.conversationData.id, {status: a}, function (e) {
			if (e) return c(e);
			e = ticketProcess.processEvents([{
				event: {
					crtrN: Tawk.userController.user.fullName,
					co: (new Date).getTime(), op: "ticket-change-status", data: {s: a}
				}
			}]);
			setTimeout(function () {
				b.loadAggregation()
			});
			3E3 === a ? d.set("isClosed", !0) : d.set("isClosed", !1);
			b.conversationData.messages.pushObjects(e);
			b.conversationData.set("s", a);
			b.ticketHasChanged = !0;
			b.loadList(c)
		})
	},
	closeTicket: function (a) {
		this.changeTicketStatus(3E3, a)
	},
	setListPropertyToValue: function (a, c) {
		this.activeProperty.list.currentData.setEach(a, c)
	},
	bulkDeleteConversations: function (a) {
		var c, d = this, b = {chats: [], tickets: []};
		a = a || function () {
		};
		if (!this.activeProperty || !this.activeProperty.isAdmin) return a(!0);
		c = this.activeProperty.list.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		checkAndSetConfirmView(!1, function (e) {
			if (!e) return a(!0);
			c.forEach(function (a) {
				a.isChat ? b.chats.push(a._id) : b.tickets.push(a._id)
			});
			socketConnector.deleteConversations(d.activeProperty.id, b, function (b, e) {
				if (b || e.chats.errorsInItems || e.tickets.errorsInItems) return a(!0);
				setTimeout(function () {
					d.loadAggregation()
				});
				d.activeProperty.list.currentData.removeObjects(c);
				d.set("conversationData", null);
				a()
			})
		})
	},
	bulkConversationsRestore: function (a) {
		var c, d = this, b = {chats: [], tickets: []};
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		c = this.activeProperty.list.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		c.forEach(function (a) {
			a.isChat ? b.chats.push(a._id) : b.tickets.push(a._id)
		});
		socketConnector.bulkRestore(this.activeProperty.id, b, function (b, f) {
			if (b || f.chats.errorsInItems || f.tickets.errorsInItems) return a(!0);
			setTimeout(function () {
				d.loadAggregation()
			});
			d.activeProperty.list.currentData.removeObjects(c);
			d.set("conversationData", null);
			a()
		})
	},
	bulkConversationsPurge: function (a) {
		var c, d = this, b = {chats: [], tickets: []};
		a = a || function () {
		};
		if (!this.activeProperty) return a(!0);
		c = this.activeProperty.list.currentData.filterProperty("isMarked", !0);
		if (0 === c.length) return a(!0);
		c.forEach(function (a) {
			a.isChat ? b.chats.push(a._id) : b.tickets.push(a._id)
		});
		socketConnector.bulkPurge(this.activeProperty.id, b, function (b, c) {
			if (b || c.chats.errorsInItems || c.tickets.errorsInItems) return a(!0);
			d.activeProperty.list.startList();
			setTimeout(function () {
				d.loadAggregation()
			});
			d.loadList(a)
		})
	},
	bulkUnspam: function (a) {
		var c = this, d = [];
		if (!this.activeProperty) return a(!0);
		d = this.activeProperty.list.currentData.filterProperty("isMarked", !0).getEach("_id");
		socketConnector.bulkSpamUpdate(this.activeProperty.id, {spam: !1, tickets: d}, function (b) {
			b && a(b);
			c.activeProperty.list.startList();
			setTimeout(function () {
				c.loadAggregation()
			});
			c.loadList(a)
		})
	},
	openContact: function (a, c) {
		var d, b;
		b = this.activeProperty;
		c =
			c || function () {
			};
		this.set("isLoading", !0);
		if (!b) return this.set("isLoading", !1), c(!0);
		b.list.currentData.setEach("isMarked", !1);
		d = b.list.currentData.findProperty("_id", a);
		if (!d) return this.set("isLoading", !1), c(!0);
		b = b.list.currentData.indexOf(d) + 1 + b.list.currentHead;
		this.getContactDetails(d.email, b, c)
	},
	getContactDetails: function (a, c, d) {
		var b = this;
		d = d || function () {
		};
		socketConnector.getContactDetails(this.activeProperty.id, a, function (a, f) {
			b.set("isLoading", !1);
			a && d(!0);
			b.set("contactData", f.contact);
			b.set("contactData.ticketCount", f.ticketCount);
			b.set("contactData.visitCount", f.visitCount);
			b.set("contactData.chatCount", f.chatCount);
			b.set("contactData.timeline", b.parseContactTimeline(f.events, f.contact.name));
			c && b.set("contactData.indexNum", c);
			20 > b.contactData.timeline.length && b.set("contactData.timelineEnded", !0);
			b.set("conversationData", null);
			b.saveLastView();
			d()
		})
	},
	parseContactTimeline: function (a, c) {
		var d = [];
		a.forEach(function (a) {
			var e = {};
			e.id = a.event_id;
			e.time = formatDate(a.event_on);
			if ("visit" ===
				a.event_type) e.title = "Visited site", e.isVisit = !0; else if ("ticket" === a.event_type) e.title = "Ticket Created : #" + a.event_info.hId + " " + a.event_info.subj, e.messages = [a.event_info.msg], e.isTicket = !0; else if ("chat" === a.event_type) e.title = a.event_info.uc ? "Unanswered conversation" : "Conversation with " + Tawk.agentsController.getAgentsName(a.event_info.a).join(", "), e.messages = conversationProcess.processHistory(a.event_info.m, c).transcriptData, e.isChat = !0; else return;
			d.push(e)
		});
		return d.reverse()
	},
	toggleList: function (a) {
		this.set("showList",
			a)
	},
	notifyStartReply: function (a) {
		if (!this.activeProperty || !this.conversationData || !this.conversationData.id) return a(!0);
		socketConnector.emitStartReply(this.activeProperty.id, this.conversationData.id, function (c) {
			if (c) return a(!0);
			a()
		})
	},
	notifyStopReply: function (a) {
		if (!this.activeProperty || !this.conversationData || !this.conversationData.id) return a(!0);
		socketConnector.emitStopReply(this.activeProperty.id, this.conversationData.id, function (c) {
			if (c) return a(!0);
			a()
		})
	},
	displayTicketListener: function (a) {
		var c,
			d = [];
		this.activeProperty && this.activeProperty.id === a.pgid && (a.list.forEach(function (a) {
			a !== Tawk.userController.user.id && d.push(a)
		}), c = d.length ? 1 === d.length ? languageParser.translate("conversations", "one_agent_reply", {agentName: Tawk.agentsController.getName(d[0])}) : 2 === d.length ? languageParser.translate("conversations", "two_agent_reply", {
			agentName1: Tawk.agentsController.getName(d[0]),
			agentName2: Tawk.agentsController.getName(d[1])
		}) : languageParser.translate("conversations", "many_agent_reply") : null, this.conversationData &&
		this.conversationData.id === a.tId && this.conversationData.set("repliersText", c))
	},
	loadContactEvents: function (a) {
		var c, d = this;
		a = a || function () {
		};
		if (!this.activeProperty || !this.contactData) return a(!0);
		this.set("isLoading", !0);
		socketConnector.getContactEvents(this.activeProperty.id, this.contactData.email, {offset: this.contactData.timeline[0].id}, function (b, e) {
			d.set("isLoading", !1);
			if (b) return a(!0);
			c = d.parseContactTimeline(e);
			d.contactData.set("timeline", c.concat(d.contactData.timeline));
			20 > e.length && d.contactData.set("timelineEnded",
				!0);
			a()
		})
	},
	closeChat: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty || !this.conversationData) return a(!0);
		this.set("isLoading", !0);
		socketConnector.closeChat(this.activeProperty.id, this.conversationData.chatId, {status: 3E3}, function (d) {
			c.set("isLoading", !1);
			d || (c.activeProperty.list.removeItem(c.conversationData), setTimeout(function () {
				c.loadAggregation()
			}), c.set("conversationData", null), c.toggleList(!0), c.reloadList(a))
		})
	},
	newTicketCreation: function (a) {
		var c = this;
		a.crtrId !== Tawk.userController.user.id &&
		(notificationController.notifyTicketEvent(a, !0), setTimeout(function () {
			c.loadAggregation()
		}), this.activeProperty && this.activeProperty.id === a.pgid && this.storeNewConversation(a))
	},
	openTicketDirect: function (a, c) {
		var d = this;
		"messaging" !== Tawk.routeManager.get("currentState.name") ? (this.set("autoOpenTicket", {
			propertyId: a,
			ticketId: c
		}), window.location.hash = "/messaging") : (this.openProperty(a), this.changeList(listType.ALL, function (a) {
			a || d.getTicketDetails(c, null, !0)
		}))
	},
	getModalTicketData: function (a, c) {
		var d =
			this, b = this.activeProperty;
		c = c || function () {
		};
		if (!b || !this.contactData) return c(!0);
		socketConnector.getTicket(this.contactData.pgid, a, function (b, f) {
			if (b) return c(!0);
			f.id = a;
			f.startDateTime = moment(f.cso).format("MMMM D YYYY, HH:mm");
			f.tagString = f.tags && f.tags.length ? f.tags.join(",") : "";
			f.watchersString = Tawk.agentsController.getAgentsName(f.wtch).join(", ");
			f.messages = ticketProcess.processEvents(f.e, f.pgid, f.read, {
				message: f.msg,
				attachments: f.attch,
				created: formatDate(f.cso),
				creator: f.crtrN
			});
			d.set("modalTicketData",
				Ember.Object.create(f));
			c()
		})
	},
	incomingTicketEvents: function (a) {
		var c, d = this;
		if (a.event && a.event.crtrId !== Tawk.userController.user.id) {
			if ("conversations" !== Tawk.routeManager.get("currentState.name")) "ticket-reply" === a.event.op && socketConnector.getTicket(a.pgid, a.tId, function (b, c) {
				b || c.assgnId !== Tawk.userController.user.id && -1 === c.wtch.indexOf(Tawk.userController.user.id) || notificationController.notifyTicketEvent(a)
			}); else {
				if (this.activeProperty.id !== a.pgid) return;
				if (!this.conversationData || a.tId !==
					this.conversationData.id) {
					this.activeProperty.list.startList();
					this.loadList();
					return
				}
				c = this.activeProperty.list.currentData.findProperty("_id", a.tId);
				this.getTicketDetails(this.conversationData.id, c, !0)
			}
			setTimeout(function () {
				d.loadAggregation()
			})
		}
	},
	conversationPurged: function (a) {
		this.listType && (this.listType === listType.TRASH && a.prgdBy !== Tawk.userController.user.id) && (this.conversationData && (this.conversationData.id === a.itemId || this.conversationData.isChat && this.conversationData.chatId === a.itemId) &&
		this.conversationData.set("isPurged", !0), this.resetCurrentList(), this.loadList())
	},
	toggleAllMark: function (a) {
		this.activeProperty && (this.activeProperty.list && this.activeProperty.list.currentData) && (a ? this.activeProperty.list.currentData.setEach("isMarked", !0) : this.activeProperty.list.currentData.setEach("isMarked", !1))
	},
	saveLastView: function () {
		var a;
		lastViewData = this.lastViews;
		this.activeProperty && (lastViewData.propertyId = this.activeProperty.id, lastViewData.listType = this.listType, lastViewData.statusType =
			this.statusType, lastViewData.includeTickets = this.includeTickets, lastViewData.includeChats = this.includeChats, lastViewData.isContactsList = this.isContactsList, lastViewData.previousStatus = this.previousStatus, this.isContactsList ? (lastViewData.listType = "contacts", this.contactData && (a = {
			detailsId: this.contactData.email,
			detailsType: "contact"
		})) : this.conversationData && (a = {
			detailsId: this.conversationData.id || this.conversationData.chatId,
			detailsType: this.conversationData.isChat ? "chat" : "ticket"
		}), lastViewData.draftReplies =
			JSON.stringify(this.draftReplies), a ? lastViewData[this.activeProperty.id] = a : delete lastViewData[this.activeProperty.id], this.set("lastViews", lastViewData), main.updateStorageSettings("messaging-view", JSON.stringify(lastViewData)))
	},
	saveLastDashbaordHistory: function () {
		var a = this.lastDashboardHistoryData;
		this.activeProperty && (a.propertyId = this.activeProperty.id, this.set("lastDashboardHistoryData", a), main.updateStorageSettings("dashboard-view", JSON.stringify(a)))
	},
	getDashboardHistory: function (a, c) {
		!a &&
		this.lastDashboardHistoryData && (a = this.lastDashboardHistoryData.propertyId);
		a || (a = this.propertiesList[0].id);
		this.set("includeTickets", !1);
		this.set("includeChats", !0);
		this.set("statusType", void 0);
		this.set("sortType", sortType.UPDATE_DESC);
		this.set("listType", listType.ALL);
		this.openProperty(a, !0);
		this.resetCurrentList();
		this.clearConversationData(!0);
		this.loadList(c, !0);
		this.saveLastDashbaordHistory()
	},
	storeDraft: function (a) {
		var c;
		this.conversationData && (this.conversationData.id && !this.conversationData.isChat) &&
		(c = this.activeProperty.list.getItem(this.conversationData.id), null === a ? (this.set("draftReplies." + this.conversationData.id, void 0), c && c.set("hasDraft", !1)) : (this.set("draftReplies." + this.conversationData.id, JSON.stringify(a)), c && c.set("hasDraft", !0)), this.saveLastView())
	},
	convertChatToTicket: function () {
		this.activeProperty && (this.conversationData && this.conversationData.isChat) && this.conversationData.setProperties({
			subj: "RE : " + this.conversationData.chatWith,
			isChat: !1,
			isNewConvert: !0,
			isHistory: !1
		})
	},
	discardTicketConvert: function () {
		this.activeProperty && this.conversationData && (this.clearConversationData(), this.toggleList(!0))
	},
	checkChangeAllowed: function () {
		return this.conversationData && this.conversationData.isNewConvert ? (this.set("conversationData.savePrompt", !0), !1) : !0
	},
	getVisitorShopifyData: function (a, c, d, b) {
		socketConnector.searchShopifyData({propertyId: a, query: c, includeConfig: d}, function (a, c) {
			b(a, c)
		})
	}
});
Tawk.conversationsController = Tawk.ConversationsController.create();
var TicketProcess = function () {
	this.tagRegex =
		/@\[([a-z0-9]){24,24}(:)(.+?)\]/g;
	this.firstMessageBlock = Handlebars.compile('<div class="ticket-block first-message"><div class="ticket-header"><i class="fa fa-ticket"></i><span class="time">{{wroteTime}}</span>{{#if attachments.length}}<span class="has-attachment pull-right"><i class="fa fa-paperclip"></i></span>{{/if}}&nbsp;<span>{{creator}}</span></div><p class="ticket-body">{{{message}}}</p>{{#if attachments.length}}<div class="attachment-display-container"><span class="title">' + languageParser.translate("conversations",
		"attachments") + '</span><ul>{{{attachments}}}</ul></div>{{/if}}{{#if seenAgents}}<p class="ticket-seen"><i class="fa fa-circle"></i>Seen by {{seenAgents}}</p>{{/if}}</div>');
	this.agentBlockTemplate = Handlebars.compile('<div class="ticket-block {{#if isPrivate}}ticket-note-block{{/if}}"><div class="ticket-header"><i class="fa {{#if isPrivate}} fa-thumb-tack {{else}} fa-reply {{/if}}"></i><span class="time">{{time}}</span>{{#if attachments.length}}<span class="has-attachment pull-right"><i class="fa fa-paperclip"></i></span>{{/if}}<span>{{{name}}}</span></div><p class="ticket-body">{{{message}}}</p>{{#if attachments.length}}<div class="attachment-display-container"><span class="title">' +
		languageParser.translate("conversations", "attachments") + '</span><ul>{{{attachments}}}</ul></div>{{/if}}{{#if seenAgents}}<p class="ticket-seen"><i class="fa fa-circle"></i>Seen by {{seenAgents}}</p>{{/if}}<div class="clearfix"></div></div>');
	this.visitorBlockTemplate = Handlebars.compile('<div class="ticket-block"><div class="ticket-header">{{#if isEmail}}<i class="fa fa-envelope-o"></i>{{/if}}<span class="time">{{time}}</span>{{#if attachments.length}}<span class="has-attachment pull-right"><i class="fa fa-paperclip"></i></span>{{/if}}<span>{{{name}}}</span></div><p class="ticket-body">{{{message}}}</p>{{#if attachments.length}}<div class="attachment-display-container"><span class="title">' +
		languageParser.translate("conversations", "attachments") + '</span><ul>{{{attachments}}}</ul></div>{{/if}}{{#if seenAgents}}<p class="ticket-seen"><i class="fa fa-circle"></i>Seen by {{seenAgents}}</p>{{/if}}<div class="clearfix"></div></div>');
	this.notificationBlockTemplate = Handlebars.compile('<div class="ticket-block ticket-notification"><p class="ticket-body"><span class="time">{{time}}</span><span class="italic">{{{message}}}</span></p>{{#if seenAgents}}<p class="ticket-seen"><i class="fa fa-circle"></i>Seen by {{seenAgents}}</p>{{/if}}</div>');
	this.imageAttachmentBlock = Handlebars.compile('<li class="attachment-image-content"><div class="attachment-preview"><img class="uploaded-image" src="{{downloadUrl}}" /></div><p><a class="download-file" href="{{downloadUrl}}" title="' + languageParser.translate("generic", "download_file") + '" target="_blank">{{fName}}</a>{{formattedFileSize}}&nbsp;<span style="text-transform: uppercase">{{type}}</span></p></li>');
	this.audioAttachmentBlock = Handlebars.compile('<li class="attachment-other-content"><div><audio controls><source src="{{downloadUrl}}" type="{{mime}}"></source></audio><p><a class="download-file" href="{{downloadUrl}}" title="' +
		languageParser.translate("generic", "download_file") + '" target="_blank">{{fName}}</a>{{formattedFileSize}}&nbsp;<span style="text-transform: uppercase">{{type}}</span></a></div></li>');
	this.videoAttachmentBlock = Handlebars.compile('<li class="attachment-other-content"><div><video controls><source src="{{downloadUrl}}" type="{{mime}}"></source></video><p><a class="download-file" href="{{downloadUrl}}" title="' + languageParser.translate("generic", "download_file") + '" target="_blank">{{fName}}</a>{{formattedFileSize}}&nbsp;<span style="text-transform: uppercase">{{type}}</span></p></li>');
	this.otherAttachmentBlock = Handlebars.compile('<li class="attachment-other-content"><i class="fa fa-file-text-o"></i>&nbsp;<p><a class="download-file" href="{{downloadUrl}}" title="' + languageParser.translate("generic", "download_file") + '" target="_blank">{{fName}}</a>{{formattedFileSize}}&nbsp;<span style="text-transform: uppercase">{{type}}</span></p></li>')
};
TicketProcess.prototype.processEvents = function (a, c, d, b) {
	var e, f, g, h = this, k = [], l = [], m = {}, n = 0;
	d && d.length && d.forEach(function (a) {
		a.aId !== Tawk.userController.user.id &&
		(m[a.eoId] || (m[a.eoId] = []), m[a.eoId].push(a.aId))
	});
	k = a.filterProperty("event.op", "ticket-reply");
	e = k[k.length - 1];
	f = k[k.length - 2];
	n = k.length;
	if (b && b.message) {
		d = conversationProcess.parseText(encodeStr(b.message));
		var k = this.processAttachments(b.attachments || []), p;
		"agent" === b.creatorType && (d = this.highlightName(d));
		if (m[0]) {
			var q = Tawk.agentsController.getAgentsName(m[0]);
			q && 1 < q.length ? (p = q.slice(0, q.length - 1).join(", "), p += " & " + q[q.length - 1]) : p = q[0];
			p = decodeStr(p)
		}
		block = $(h.firstMessageBlock({
			message: d,
			wroteTime: b.wroteTime, creator: b.creator, attachments: k, seenAgents: p
		}));
		0 < n && block.addClass("single-line");
		l.pushObject(block[0].outerHTML)
	}
	a && a.length && a.forEach(function (a, b) {
		var d, k, p = "", q = h.processAttachments(a.event.attch || []);
		d = formatDate(a.event.co);
		m[a.order] && ((p = Tawk.agentsController.getAgentsName(m[a.order])) && 1 < p.length ? (k = p.slice(0, p.length - 1).join(", "), k += " & " + p[p.length - 1]) : k = p[0], k = decodeStr(k));
		if ("ticket-reply" === a.event.op) p = conversationProcess.parseText(encodeStr(a.event.data.msg)),
			"agent" === a.event.crtrT ? (p = h.highlightName(p), d = $(h.agentBlockTemplate({
				message: p,
				time: d,
				name: Tawk.agentsController.getName(a.event.crtrId),
				attachments: q,
				isPrivate: a.event.data.private,
				seenAgents: k
			}))) : d = $(h.visitorBlockTemplate({
				message: p,
				time: d,
				name: a.event.crtrN,
				isEmail: a.event.cbe,
				attachments: q,
				seenAgents: k
			})); else {
			p = h.processUpdateEvent(a.event, c);
			if (!p) return;
			d = $(h.notificationBlockTemplate({message: p, time: d, seenAgents: k}))
		}
		0 < n && a !== e && (4 >= n ? d.addClass("single-line") : a === f ? (d.addClass("single-line"),
			g = !0, l.pushObject('<div class="ticket-block single-line hidden-messages"><div class="line"></div><div class="line"></div><p>' + (n - 2) + " older messages</p></div>")) : g || d.addClass("no-line"));
		l.pushObject(d[0].outerHTML)
	});
	return l
};
TicketProcess.prototype.processUpdateEvent = function (a, c) {
	var d, b;
	b = "agent" === a.crtrT ? Tawk.agentsController.getName(a.crtrId) : a.crtrN;
	"ticket-deleted" === a.op ? d = languageParser.translate("conversations", "deleted_ticket", {name: b}) : "ticket-change-spam" === a.op ? d = a.data.spam ? languageParser.translate("conversations",
		"spammed_ticket", {name: b}) : languageParser.translate("conversations", "unspam_ticket", {name: b}) : "ticket-assigned" === a.op ? (d = "agent" === a.data.assgnT ? Tawk.agentsController.getName(a.data.assgnId) : a.data.assgnN, d = languageParser.translate("conversations", "assigned_ticket", {
		name: b,
		assignee: d
	})) : "ticket-change-priority" === a.op ? d = languageParser.translate("conversations", "changed_priority", {
		name: b,
		priority: priorityType[a.data.p]
	}) : "ticket-change-status" === a.op ? d = languageParser.translate("conversations", "changed_status",
		{
			name: b,
			status: statusType[a.data.s]
		}) : "ticket-restored" === a.op ? d = languageParser.translate("conversations", "restored_ticket", {name: b}) : "ticket-unassigned" === a.op && (d = "system" === a.crtrT ? languageParser.translate("conversations", "system_unassign") : languageParser.translate("conversations", "unassigned_ticket", {name: b}));
	return d
};
TicketProcess.prototype.highlightName = function (a) {
	var c = a.match(this.tagRegex);
	null !== c && c.forEach(function (c) {
		var b = c.substring(2, c.length - 1).split(":");
		a = a.replace(c, '<span class="highlight">' +
			b[1] + "</span>")
	});
	return a
};
TicketProcess.prototype.processAttachments = function (a) {
	var c = this, d = [], b = [], e = [], f = [];
	a.forEach(function (a) {
		a.formattedFileSize = formatFileSize(a.size);
		a.downloadUrl = GLOBAL_FILE_STORAGE_URL + "/" + a.name;
		-1 !== ["jpeg", "png", "gif", "jpg"].indexOf(a.type) && 2E6 >= a.size ? d.push(c.imageAttachmentBlock(a)) : -1 !== ["video/mp4", "video/ogg", "video/webm"].indexOf(a.mime) ? e.push(c.videoAttachmentBlock(a)) : -1 !== ["audio/mp3", "audio/ogg"].indexOf(a.mime) ? b.push(c.audioAttachmentBlock(a)) : f.push(c.otherAttachmentBlock(a))
	});
	return d.join("") + b.join("") + e.join("") + f.join("")
};
var ticketProcess = new TicketProcess;
Tawk.RestApiKeysController = Ember.Controller.extend(Tawk.IAdminSubViewController, {
	keyList: null, list: null, loadList: function () {
		var a = this;
		this.set("list", []);
		Tawk.routing.titlePath.subviewName = "Rest API Keys";
		Tawk.routing.setTitle();
		socketConnector.getRestApiKeyList(function (c, d) {
			if (!c) {
				for (var b = 0; b < d.data.length; b++) d.data[b].formattedDate = moment(d.data[b].created).format("DD/MMM/YYYY");
				a.set("list", d.data)
			}
		})
	},
	createKey: function (a) {
		var c = this;
		a = a || function () {
		};
		socketConnector.createRestApiKey(function (d, b) {
			if (d || !b.ok) return a(!0);
			c.list.pushObject({key: b.data.key, formattedDate: moment().format("DD/MMM/YYYY")});
			a()
		})
	}, revokeKey: function (a, c) {
		var d, b = this;
		c = c || function () {
		};
		d = this.list.findProperty("key", a);
		if (!d) return c(!0, "Unable to find api key.");
		socketConnector.revokeRestApiKey(a, function (a, f) {
			if (a || !f.ok) return c(!0);
			if (!f.found) return c(!0, "Unable to find api key.");
			b.list.removeObject(d);
			c()
		})
	}, closeView: function () {
		return !0
	},
	saveLastSubView: function () {
	}
});
Tawk.AccountController = Ember.Controller.extend({
	activeProperty: null, isLoading: null, init: function () {
		this.set("aliasController", Tawk.AliasesController.create());
		this.set("shortcutsController", Tawk.shortcutsController);
		this.set("banController", Tawk.BanController.create());
		this.set("pageContentController", Tawk.PageContentController.create());
		this.set("widgetsController", Tawk.WidgetsController.create());
		this.set("tabsController", Tawk.TabsController.create());
		this.set("restApiKeysController",
			Tawk.RestApiKeysController.create())
	}, openProperty: function (a) {
		var c, d = this, b = Tawk.webProperties.pages.findProperty("type", "profile");
		a = a || function () {
		};
		this.set("isLoading", !0);
		b && (c = Tawk.PropertyModel.create(), c.initialize(b), Tawk.webProperties.getPropertyInformation(b.id, function (b, f) {
			if (b) return a(b);
			c.loadSettings(f);
			c.set("isPersonal", !0);
			c.set("personalInfo", Tawk.userController.user);
			c.set("shareFbLink", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(c.siteLink));
			c.set("shareTwLink",
				"https://twitter.com/share?url=" + encodeURIComponent(c.siteLink));
			d.set("activeProperty", c);
			d.widgetsController.openProperty(c);
			d.openPage();
			d.set("isLoading", !1);
			a()
		}))
	}, openShortcutsList: function (a, c) {
		this.activeProperty && this.shortcutsController.openProperty(this.activeProperty, a, c)
	}, openBanList: function (a) {
		this.activeProperty && this.banController.openProperty(this.activeProperty, a)
	}, openPage: function () {
		this.activeProperty && this.pageContentController.openProperty(this.activeProperty)
	}, openTabs: function () {
		this.activeProperty &&
		this.tabsController.openProperty(this.activeProperty)
	}, openApiList: function () {
		Tawk.userController.canCreateApiKey && this.restApiKeysController.loadList()
	}, closeView: function () {
	}
});
Tawk.ReportingController = Ember.Controller.extend({
	activeProperty: null,
	siteListBinding: Ember.Binding.oneWay("Tawk.webProperties.sites"),
	pageListBinding: Ember.Binding.oneWay("Tawk.webProperties.pages"),
	isLoading: null,
	graphData: null,
	propertyTags: null,
	propertyAgents: null,
	propertyDepartments: null,
	currentAnalytics: null,
	currentAnalyticsError: null,
	filters: null,
	graphLoaded: null,
	label: null,
	tableData: null,
	timeFrame: null,
	showFrameTimeTool: !1,
	showMonthSelector: !1,
	timeFrameDataList: null,
	timeZone: (new Date).getTimezoneOffset(),
	initializeView: function () {
		var a = new Date, c = new Date(a.getFullYear(), a.getMonth(), a.getDate() - 6);
		this.set("propertyTags", []);
		this.set("propertyAgents", []);
		this.set("propertyDepartments", []);
		this.set("timeFrameDataList", []);
		for (var d = 0; 12 > d; d++) this.timeFrameDataList.pushObject(Ember.Object.create({
			id: d, text: moment(new Date(a.getFullYear(),
				d, 1)).format("MMMM"), enabled: !1
		}));
		this.resetTimeFrameData();
		this.set("label", "chat_volume");
		this.set("timeFrame", "custom");
		this.set("graphData", Ember.Object.create());
		this.set("filters", Ember.Object.create({
			agentId: null,
			departmentId: null,
			tag: null,
			startDate: c,
			endDate: a
		}));
		this.set("currentAnalytics", "getChatVolume");
		this.siteList.length ? this.openProperty(this.siteList[0].id, "site") : this.pageList.length && this.openProperty(this.pageList[0].id, "page")
	},
	resetTimeFrameData: function () {
		var a = new Date;
		this.timeFrameDataList.forEach(function (c) {
			a <
			new Date(a.getFullYear(), c.id + 1, 0) ? c.set("enabled", !1) : c.set("enabled", !0)
		});
		this.timeFrameDataList[a.getMonth()].enabled = !0
	},
	clearData: function () {
		this.set("propertyTags", null);
		this.set("propertyAgents", null);
		this.set("propertyDepartments", null);
		this.set("currentAnalytics", null);
		this.set("graphData", null);
		this.set("filters", null)
	},
	loadAvailableTags: function (a) {
		var c = this, d = [];
		a = a || function () {
		};
		if (!this.activeProperty) return a();
		this.propertyTags.clear();
		socketConnector.getTags(this.activeProperty.id,
			function (b, e) {
				if (b) return a();
				e.tags.length && (e.tags.forEach(function (a) {
					d.pushObject(decodeStr(a))
				}), c.set("propertyTags", d.sort()));
				a()
			})
	},
	openProperty: function (a, c, d) {
		var b, e = this, f = [], g = [], h = !1, k = !1;
		d = function () {
			e.getData()
		};
		"site" === c ? b = this.siteList.findProperty("id", a) : "page" === c && (b = this.pageList.findProperty("id", a));
		b && (Tawk.userController.user.isHiredAgent && (h = !0), this.set("isLoading", !0), this.propertyAgents.clear(), this.propertyDepartments.clear(), this.set("activeProperty", b), this.filters.setProperties({
			agentId: null,
			departmentId: null, tag: null
		}), b.currentAgents.forEach(function (a) {
			a.en && (!h && a.ha ? k = !0 : f.pushObject(Ember.Object.create({
				id: a.aid,
				name: decodeStr(Tawk.agentsController.getName(a.aid))
			})))
		}), k && f.pushObject(Ember.Object.create({
			id: "hired_agent",
			name: "Hired Agents"
		})), b.departments && Object.keys(b.departments).forEach(function (a) {
			a = b.departments[a];
			a.en && g.pushObject(Ember.Object.create({id: a.did, name: decodeStr(a.n)}))
		}), this.propertyAgents.pushObjects(sortList(f, "name")), this.propertyDepartments.pushObjects(sortList(g,
			"name")), this.loadAvailableTags(d))
	},
	getAnalyticsData: function (a, c) {
		var d = 36E5 * (this.timeZone / 60),
			b = Date.UTC(this.filters.startDate.getFullYear(), this.filters.startDate.getMonth(), this.filters.startDate.getDate()) + d,
			d = "day" === this.timeFrame ? b + 864E5 : Date.UTC(this.filters.endDate.getFullYear(), this.filters.endDate.getMonth(), this.filters.endDate.getDate()) + (864E5 - 1) + d,
			b = {
				agents: this.filters.agentId,
				departments: this.filters.departmentId,
				tags: this.filters.tag,
				startTime: new Date(b),
				endTime: new Date(d),
				bucketSize: "day" === this.timeFrame ? "hour" : null,
				timezone: -1 * this.timeZone
			};
		if (!this.activeProperty) return c(!0);
		this.set("currentAnalyticsError", !1);
		this.set("graphLoaded", !1);
		socketConnector[a](this.activeProperty.id, b, c)
	},
	changeCurrentAnalytics: function (a) {
		var c = function () {
		};
		a && (this.set("currentAnalytics", a), this.getData(c))
	},
	timeFrameChanged: function () {
		this.timeFrame && ("custom" === this.timeFrame ? this.set("showFrameTimeTool", !1) : this.set("showFrameTimeTool", !0), "month" === this.timeFrame ? this.set("showMonthSelector",
			!0) : this.set("showMonthSelector", !1))
	}.observes("timeFrame"),
	getData: function (a) {
		var c = this;
		a = a || function () {
		};
		if (!this.activeProperty || !this.currentAnalytics) return a(!0);
		c.set("isLoading", !0);
		this.getAnalyticsData(c.currentAnalytics, function (d, b) {
			c.set("isLoading", !1);
			if (d) return c.set("currentAnalyticsError", !0), a(!0);
			if (c.timeZone) for (var e = 0; e < b.length; e++) b[e].key += 6E4 * -c.timeZone;
			c.parseData(b);
			a()
		})
	},
	parseData: function (a) {
		var c = [], d = [], b = [];
		if ("getChatVolume" === this.currentAnalytics || "getTicketVolume" ===
			this.currentAnalytics || "getSolvedTickets" === this.currentAnalytics) "getChatVolume" === this.currentAnalytics ? (c = languageParser.translate("reporting", "chat_volume"), d = languageParser.translate("reporting", "chat_volume_tooltip", {
			date: "<strong>%x</strong>",
			value: "<strong>%y</strong>",
			lineBreak: "<br />"
		})) : "getTicketVolume" === this.currentAnalytics ? (c = languageParser.translate("reporting", "volume_new_tickets"), d = languageParser.translate("reporting", "ticket_volume_tooltip", {
			date: "<strong>%x</strong>", value: "<strong>%y</strong>",
			lineBreak: "<br />"
		})) : (c = languageParser.translate("reporting", "solved_tickets"), d = languageParser.translate("reporting", "solved_tickets_tooltip", {
			date: "<strong>%x</strong>",
			value: "<strong>%y</strong>",
			lineBreak: "<br />",
			strongStart: "<strong>",
			strongEnd: "</strong>"
		})), b = this.orderData(a, null, ["doc_count"]), d = c = [{
			data: b,
			label: c,
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			color: "#71a06a",
			points: {exists: !0, show: !0},
			tooltipContent: d,
			idx: 0
		}]; else if ("getMissedChatVolume" === this.currentAnalytics) {
			b = {
				missed: this.orderData(a,
					null, ["doc_count"]), offline: this.orderData(a, "offline", ["doc_count"]).doc_count
			};
			for (a = 0; a < b.missed.length; a++) b.missed[a][1] -= b.offline[a][1];
			d = c = [{
				data: b.missed,
				label: languageParser.translate("analytics", "missed_chats"),
				lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
				points: {exists: !0, show: !0},
				tooltipContent: languageParser.translate("reporting", "missed_chat_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />"
				}),
				idx: 0
			}, {
				data: b.offline,
				label: languageParser.translate("analytics",
					"offline_messages"),
				lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
				points: {exists: !0, show: !0},
				tooltipContent: languageParser.translate("reporting", "offline_message_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />"
				}),
				idx: 1
			}]
		} else "getChatDuration" === this.currentAnalytics ? (b = this.orderData(a, "stats", ["avg", "max", "min", "sum"]), c = [{
			data: this.getValueToMinutes(b.min),
			label: languageParser.translate("generic", "shortest"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {
				exists: !0,
				show: !0
			},
			tooltipContent: languageParser.translate("reporting", "min_duration_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 0
		}, {
			data: this.getValueToMinutes(b.avg),
			label: languageParser.translate("reporting", "average"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "average_duration_tooltip", {
				date: "<strong>%x</strong>", value: "<strong>%y</strong>",
				lineBreak: "<br />", strongStart: "<strong>", strongEnd: "</strong>"
			}),
			idx: 1
		}, {
			data: this.getValueToMinutes(b.max),
			label: languageParser.translate("generic", "longest"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "max_duration_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 2
		}], d = [{
			data: this.formatTimeData(b.min), label: languageParser.translate("generic",
				"shortest")
		}, {
			data: this.formatTimeData(b.avg),
			label: languageParser.translate("reporting", "average")
		}, {
			data: this.formatTimeData(b.max),
			label: languageParser.translate("generic", "longest")
		}, {
			data: this.formatTimeData(b.sum),
			label: languageParser.translate("reporting", "sum")
		}]) : "getChatWaitTime" === this.currentAnalytics || "getTicketFirstTimeResponse" === this.currentAnalytics ? (b = this.orderData(a, "stats", ["avg", "max", "min"]), c = [{
			data: this.getValueToMinutes(b.min),
			label: languageParser.translate("generic", "shortest"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "min_wait_time_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 0
		}, {
			data: this.getValueToMinutes(b.avg),
			label: languageParser.translate("reporting", "average"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "average_wait_time_tooltip",
				{
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />",
					strongStart: "<strong>",
					strongEnd: "</strong>"
				}),
			idx: 1
		}, {
			data: this.getValueToMinutes(b.max),
			label: languageParser.translate("generic", "longest"),
			lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "max_wait_time_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 2
		}], d = [{
			data: this.formatTimeData(b.min),
			label: languageParser.translate("generic", "shortest")
		}, {
			data: this.formatTimeData(b.avg),
			label: languageParser.translate("reporting", "average")
		}, {
			data: this.formatTimeData(b.max),
			label: languageParser.translate("generic", "longest")
		}]) : "getChatSatisfaction" === this.currentAnalytics ? (b = this.orderData(a, "satisfaction", ["positive", "negative", "neutral"]), c = [{
			data: b.negative,
			label: languageParser.translate("reporting", "negative"),
			bars: {exists: !0, show: !0, barWidth: 258E5, fill: !0, lineWidth: 2, order: 1},
			color: "#931313",
			tooltipContent: languageParser.translate("reporting", "negative_satisfaction_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 0
		}, {
			data: b.positive,
			label: languageParser.translate("reporting", "positive"),
			bars: {exists: !0, show: !0, barWidth: 258E5, fill: !0, lineWidth: 2, order: 2},
			color: "#71a06a",
			tooltipContent: languageParser.translate("reporting", "positive_satisfaction_tooltip", {
				date: "<strong>%x</strong>", value: "<strong>%y</strong>",
				lineBreak: "<br />", strongStart: "<strong>", strongEnd: "</strong>"
			}),
			idx: 1
		}], d = [{data: b.negative, label: languageParser.translate("reporting", "negative")}, {
			data: b.neutral,
			label: languageParser.translate("reporting", "neutral")
		}, {
			data: b.positive,
			label: languageParser.translate("reporting", "positive")
		}]) : "getTicketSource" === this.currentAnalytics ? (b = this.orderData(a, "source", ["chat", "email", "agent"]), d = c = [{
			data: b.chat,
			label: languageParser.translate("generic", "chat"),
			lines: {exists: !0, show: !0, lineWidth: 2},
			points: {
				exists: !0,
				show: !0
			},
			tooltipContent: languageParser.translate("reporting", "ticket_source_chat_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 0
		}, {
			data: b.email,
			label: languageParser.translate("generic", "email"),
			lines: {exists: !0, show: !0, lineWidth: 2},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "ticket_source_email_tooltip", {
				date: "<strong>%x</strong>", value: "<strong>%y</strong>", lineBreak: "<br />",
				strongStart: "<strong>", strongEnd: "</strong>"
			}),
			idx: 1
		}, {
			data: b.agent,
			label: languageParser.translate("generic", "agent"),
			lines: {exists: !0, show: !0, lineWidth: 2},
			points: {exists: !0, show: !0},
			tooltipContent: languageParser.translate("reporting", "ticket_source_agent_tooltip", {
				date: "<strong>%x</strong>",
				value: "<strong>%y</strong>",
				lineBreak: "<br />",
				strongStart: "<strong>",
				strongEnd: "</strong>"
			}),
			idx: 2
		}]) : "getTicketResolutionTime" === this.currentAnalytics ? (b = this.orderData(a, "stats", ["min", "avg", "max", "sum"]),
			c = [{
				data: this.getValueToMinutes(b.min),
				label: languageParser.translate("generic", "shortest"),
				lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
				points: {exists: !0, show: !0},
				tooltipContent: languageParser.translate("reporting", "ticket_resolution_min_time_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />",
					strongStart: "<strong>",
					strongEnd: "</strong>"
				}),
				idx: 0
			}, {
				data: this.getValueToMinutes(b.avg),
				label: languageParser.translate("reporting", "average"),
				lines: {
					exists: !0, show: !0, lineWidth: 2,
					fill: !0
				},
				points: {exists: !0, show: !0},
				tooltipContent: languageParser.translate("reporting", "ticket_resolution_average_time_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />",
					strongStart: "<strong>",
					strongEnd: "</strong>"
				}),
				idx: 1
			}, {
				data: this.getValueToMinutes(b.max),
				label: languageParser.translate("generic", "longest"),
				lines: {exists: !0, show: !0, lineWidth: 2, fill: !0},
				points: {exists: !0, show: !0},
				tooltipContent: languageParser.translate("reporting", "ticket_resolution_max_time_tooltip",
					{
						date: "<strong>%x</strong>",
						value: "<strong>%y</strong>",
						lineBreak: "<br />",
						strongStart: "<strong>",
						strongEnd: "</strong>"
					}),
				idx: 2
			}], d = [{
			data: this.formatTimeData(b.min),
			label: languageParser.translate("generic", "shortest")
		}, {
			data: this.formatTimeData(b.avg),
			label: languageParser.translate("reporting", "average")
		}, {
			data: this.formatTimeData(b.max),
			label: languageParser.translate("generic", "longest")
		}, {
			data: this.formatTimeData(b.sum),
			label: languageParser.translate("reporting", "sum")
		}]) : "getTicketReopened" ===
			this.currentAnalytics && (b = this.orderData(a, "reopenedBy", ["agent", "user"]), d = c = [{
				data: b.agent,
				label: languageParser.translate("reporting", "by_agent"),
				bars: {exists: !0, show: !0, barWidth: 258E5, fill: !0, lineWidth: 2, order: 1},
				tooltipContent: languageParser.translate("reporting", "ticket_reopened_agent_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />",
					strongStart: "<strong>",
					strongEnd: "</strong>"
				}),
				idx: 0
			}, {
				data: b.user,
				label: languageParser.translate("reporting", "by_user"),
				bars: {
					exists: !0,
					show: !0, barWidth: 258E5, fill: !0, lineWidth: 2, order: 2
				},
				tooltipContent: languageParser.translate("reporting", "ticket_reopened_user_tooltip", {
					date: "<strong>%x</strong>",
					value: "<strong>%y</strong>",
					lineBreak: "<br />",
					strongStart: "<strong>",
					strongEnd: "</strong>"
				}),
				idx: 1
			}]);
		this.graphData && (this.graphData.set("data", c), this.formatTableData(d));
		this.set("graphLoaded", !0)
	},
	getValueToMinutes: function (a) {
		var c = [];
		a.forEach(function (a) {
			c.push([a[0], a[1] / 60])
		});
		return c
	},
	formatTimeData: function (a) {
		var c = [], d = null,
			b = "getTicketFirstTimeResponse" === this.currentAnalytics || "getTicketResolutionTime" === this.currentAnalytics,
			e, f;
		a.forEach(function (a) {
			a[1] ? (e = moment.duration(a[1], "seconds"), f = Math.floor(e.asHours()), d = 10 > f ? "0" + f + moment.utc(e.asMilliseconds()).format(":mm:ss") : 24 > f && 10 <= f ? f + moment.utc(e.asMilliseconds()).format(":mm:ss") : b ? languageParser.translate("reporting", "days", {num: Math.floor(f / 24)}) : f + moment.utc(e.asMilliseconds()).format(":mm:ss")) : d = "-";
			c.pushObject([a[0], d])
		});
		return c
	},
	orderData: function (a,
	                     c, d) {
		var b = {};
		c ? a.forEach(function (a) {
			d.forEach(function (d) {
				void 0 === b[d] && (b[d] = []);
				b[d].pushObject([a.key, a[c][d]])
			})
		}) : (b = [], a.forEach(function (a) {
			d.forEach(function (c) {
				b.pushObject([a.key, a[c]])
			})
		}));
		return b
	},
	applyFilters: function (a, c) {
		this.filters.setProperties({
			agentId: a.agentId,
			departmentId: a.departmentId,
			tag: a.tagId,
			startDate: a.startDate,
			endDate: a.endDate
		});
		"hired_agent" === a.agentId ? this.filters.set("agentId", Tawk.webProperties.getHiredAgentsIds(this.activeProperty.id)) : this.filters.set("agentId",
			a.agentId);
		this.getData(c)
	},
	resetFilters: function (a) {
		var c = new Date, c = new Date(c.getFullYear(), c.getMonth(), c.getDate() - 1),
			d = new Date(c.getFullYear(), c.getMonth(), c.getDate() - 6);
		this.filters.setProperties({agentId: null, departmentId: null, tag: null, startDate: d, endDate: c});
		this.set("timeFrame", "custom");
		this.getData(a)
	},
	formatTableData: function (a) {
		var c = {header: [], values: []}, d = [];
		for (i = 0; i < a[0].data.length; i++) {
			if (!i) for (c.header.push(languageParser.translate("placeholders", "dates")), j = 0; j < a.length; j++) c.header.push(a[j].label);
			d = [];
			for (j = 0; j < a.length; j++) j || (date = new Date(a[j].data[i][0] + 6E4 * this.timeZone), "day" === this.timeFrame ? d.push(moment(date).format("D/MMM/YYYY - ha")) : d.push(moment(date).format("D/MMM/YYYY"))), d.push(a[j].data[i][1] || "-");
			c.values.push(d)
		}
		this.set("tableData", c)
	},
	isSelectAgentDisabled: function () {
		return "getMissedChatVolume" === this.currentAnalytics || "getTicketVolume" === this.currentAnalytics ? !0 : !1
	}.property("currentAnalytics")
});
Tawk.LeaderboardController = Ember.Controller.extend({
	tableData: null, filters: null,
	isLoading: null, isReversed: null, isTableDataEmpty: null, clientProperties: function () {
		return Tawk.webProperties.sites.filterProperty("isClientProperty", !0)
	}.property("Tawk.webProperties.sites.@each"), getAgentStatistics: function (a) {
		var c = this;
		this.set("isLoading", !0);
		this.set("isTableDataEmpty", !1);
		null === this.filters && this.set("filters", {
			propertyId: void 0,
			startTime: moment.utc().startOf("day").subtract(6, "days"),
			endTime: moment.utc()
		});
		socketConnector.agentStatistics(this.get("filters"), function (d, b) {
			var e,
				f, g, h;
			c.set("isReversed", !1);
			c.set("tableData", null);
			if (d) {
				c.set("isLoading", !1);
				switch (d.code) {
					case "InternalServerError":
						e = languageParser.translate("generic", "internal_server_error");
						break;
					case "UnauthorizedError":
						e = languageParser.translate("generic", "unauthorized_error");
						break;
					case "InvalidArgument":
						e = "INVALID_PROPERTY_ID" === d.message ? languageParser.translate("leaderboard", "invalid_argument_property") : languageParser.translate("leaderboard", "invalid_argument_date");
						break;
					default:
						e = "Unable to retrieve list. Please try again."
				}
				return a(!0,
					e)
			}
			f = function () {
				g++;
				g >= h && (c.set("isLoading", !1), c.set("tableData", b.data));
				return a(null)
			};
			b && b.data && (h = b.data.length, g = 0, c.set("isTableDataEmpty", !b.data.length), b.data.length ? b.data.forEach(function (a, b) {
				a.chatsPerHour = (a.chats / Math.ceil(a.hours)).toFixed(2);
				a.agentName = Tawk.agentsController.getName(a.agentId);
				a.index = b + 1;
				0 == b && (a.isFirst = !0);
				a.agentName ? f() : socketConnector.getAgentName({id: a.agentId}, function (b, c) {
					a.agentName = b ? "-" : c.name;
					f()
				})
			}) : f())
		})
	}, applyFilters: function (a, c) {
		this.set("filters",
			{propertyId: a.propertyId, startTime: a.startTime, endTime: a.endTime});
		this.getAgentStatistics(c)
	}, toggleSort: function () {
		var a = this.get("tableData");
		a && (a = a.reverse().slice());
		this.set("tableData", a);
		this.set("isReversed", this.isReversed ? !1 : !0)
	}, clearData: function () {
		this.set("filters", null)
	}
});
Tawk.ViewBase = Ember.Mixin.create({
	heightPerRow: 35, disablePrevious: function () {
		"inDOM" === this._state && this.$("#prev-page").length && (this.controller.previousDisabled ? this.$("#prev-page").addClass("disabled") : this.$("#prev-page").removeClass("disabled"))
	}.observes("controller.previousDisabled"),
	disableNext: function () {
		"inDOM" === this._state && this.$("#next-page").length && (this.controller.nextDisabled ? this.$("#next-page").addClass("disabled") : this.$("#next-page").removeClass("disabled"))
	}.observes("controller.nextDisabled"), setMaxPerpage: function () {
		var a = this.$("thead").height(),
			a = this.$(".innerContent").height() - this.$(".jarviswidget header").height() - (a ? a : 34) - 47;
		this.controller.set("perpage", Math.floor(a / this.heightPerRow))
	}, willDestroyElement: function () {
		this.$(".innerContent").unbind("scroll.viewscroll")
	},
	didInsertElement: function () {
		var a = this;
		this.disablePrevious();
		this.disableNext();
		this.setMaxPerpage();
		addPlaceholderSupport(this.$());
		this.$(".innerContent").bind("scroll.viewscroll", function () {
			0 !== $(this).scrollTop() ? $("#back-top").hasClass("hidden") && $("#back-top").removeClass("hidden") : $("#back-top").addClass("hidden")
		});
		$(window).resize(function () {
			"inDOM" === a._state && a.setMaxPerpage()
		})
	}
});
Tawk.ModalViewBase = Ember.Mixin.create({
	classNames: ["modal"],
	attributeBindings: ["tabindex:tabindex", "role:role",
		"labelledby:aria-labelledby", "ariahidden:aria-hidden"],
	tabindex: "-1",
	role: "dialog",
	ariahidden: "true",
	maxBodyHeight: 0,
	modalPadding: 60,
	didInsertElement: function () {
		var a = this;
		addPlaceholderSupport(this.$());
		this.$().on("shown.bs.modal", function (c) {
			a.resizeView()
		});
		this.$().on("hidden.bs.modal", function (c) {
			a.validator && a.validator.resetForm();
			a.$(".alert").remove();
			a.$(".state-error").removeClass("state-error");
			a.$(".state-success").removeClass("state-success")
		});
		$(window).bind("resize.Model", function () {
			a.resizeView()
		});
		this.openView()
	},
	willDestroyElement: function () {
		var a = $("#unsaved-alert");
		a.length && a.remove();
		$(window).unbind("resize.Model")
	},
	resizeView: function () {
		var a, c;
		this.$() && (a = this.$().height(), c = this.$(".modal-dialog"), "none" !== c.css("max-height") && (a = c.height()), this.set("maxBodyHeight", a - this.$(".modal-header").outerHeight(!0) - this.$(".modal-footer").outerHeight(!0) - this.modalPadding), this.$(".modal-body").css("max-height", this.maxBodyHeight), c.css({
			"margin-top": -c.outerHeight() / 2 + "px", "margin-left": -c.outerWidth() /
			2 + "px"
		}))
	},
	openView: function () {
		"inDOM" === this._state && this.$().modal({backdrop: "static"})
	},
	saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), this.$(".modal-footer").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' + c + '"></i>' + d + "</div>"))
	},
	saveError: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a))
	},
	saveSuccess: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a))
	},
	clearSaveMessages: function () {
		"inDOM" === this._state && this.$(".alert").remove()
	}
});
Tawk.WidgetTabBaseView = Ember.Mixin.create({
	classNames: ["tab-pane fade in"],
	attributeBindings: ["role:role"],
	role: "tabpanel",
	validator: null,
	resetView: function () {
		this.$(".alert").remove();
		this.$(".state-error").removeClass("state-error");
		this.$(".state-success").removeClass("state-success");
		this.controller.resetWidget()
	},
	didInsertElement: function () {
		var a = this;
		addPlaceholderSupport(this.$());
		this.$().on("resetTab", function (c) {
			a.resetView();
			return !1
		})
	}
});
Tawk.ScheduledPropertiesHeaderView = Ember.View.extend({
	elementId: "scheduled-properties-list",
	tagName: "li",
	classNames: ["dropdown-submenu"],
	template: Ember.TEMPLATES.headerScheduledProperties,
	controller: Tawk.laScheduler,
	didInsertElement: function () {
		var a = this;
		$("body").bind("click.statusDropDown", function (c) {
			(a.$("#client-properties-container").is(c.target) ||
				0 < a.$("#client-properties-container").has(c.target).length) && c.stopPropagation()
		});
		this.$("#global-answer-status").change(function () {
			var c = $(this).is(":checked");
			a.controller.toggleGlobalAnswerStatus(c)
		});
		this.$().delegate(".notification-status", "change", function () {
			var c = $(this).attr("data-id"), d = $(this).is(":checked");
			a.controller.changePropertyAnswerStatus(d ? "auto" : "", c)
		});
		this.$().delegate(".property-status", "change", function () {
			var c = $(this).attr("data-id"), d = $(this).is(":checked");
			a.controller.changePropertyAnswerStatus(d ?
				"yes" : "no", c)
		})
	},
	willDestroyElement: function () {
		$("body").unbind("click.statusDropDown")
	}
});
Ember.Handlebars.helper("ScheduledPropertiesHeaderView", Tawk.ScheduledPropertiesHeaderView);
Tawk.SchedulerPropertiesView = Ember.View.extend({
	elementId: "schedules-properties-list",
	template: Ember.TEMPLATES.schedulesProperties,
	controller: Tawk.laScheduler,
	prettifiedSchedule: null,
	didInsertElement: function () {
		var a = this;
		this.getPrettifiedSchedule();
		this.$("#schedule-property-select").change(function () {
			var c;
			c = $(this).val();
			if ("0" === c) a.prettifiedSchedule.setEach("isSelected", !0), a.$("#my-schedule").addClass("hidden"), a.$("#properties-schedule").removeClass("hidden"); else if ("mine" === c) a.$("#my-schedule").removeClass("hidden"), a.$("#properties-schedule").addClass("hidden"); else if ("247" === c) a.$("#my-schedule").addClass("hidden"), a.$("#properties-schedule").removeClass("hidden"), a.prettifiedSchedule.setEach("isSelected", !1), a.prettifiedSchedule.filterProperty("isFullTime", !0).setEach("isSelected", !0); else if ("not-fulltime" ===
				c) a.$("#my-schedule").addClass("hidden"), a.$("#properties-schedule").removeClass("hidden"), a.prettifiedSchedule.setEach("isSelected", !1), a.prettifiedSchedule.filterProperty("isFullTime", !1).setEach("isSelected", !0); else {
				if (c = a.prettifiedSchedule.findProperty("propertyId", c)) a.prettifiedSchedule.setEach("isSelected", !1), c.set("isSelected", !0);
				a.$("#my-schedule").addClass("hidden");
				a.$("#properties-schedule").removeClass("hidden")
			}
		});
		this.$().delegate(".refresh-property-time", "click", function () {
			a.setClockTime()
		})
	},
	getPrettifiedSchedule: function () {
		for (var a = [], c = moment.tz.guess(), d = [], b = {}, e = 0; 25 > e; e++) for (var f = 0; 46 > f;) b[60 * e + f] = {
			label: (10 > e ? "0" : "") + e + ":" + (10 > f ? "0" : "") + f,
			data: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}
		}, f = 24 === e && 0 === f ? 46 : f + 15;
		for (e = 0; e < this.controller.propertiesSchedule.length; e++) {
			var g = this.controller.propertiesSchedule[e], f = moment.tz(g.timezone), h = Ember.Object.create({
				propertyName: g.property.propertyName,
				timezone: g.timezone,
				formattedTimezone: g.timezone + " " + f.format("Z z"),
				propertyTime: g.timezone ?
					f.format("HH:mm") : "-",
				propertyDay: g.timezone ? f.format("dddd") : "-",
				schedule: [],
				isFullTime: g.isFulltime,
				propertyId: g.property.id,
				isSelected: !0,
				isEnabled: g.isEnabled,
				purchasedHours: g.hoursPurchased
			});
			if (g.isFulltime && !Object.keys(g.schedule).length) for (var k in b) b[k].data["0"].push(g.property.propertyName), b[k].data["1"].push(g.property.propertyName), b[k].data["2"].push(g.property.propertyName), b[k].data["3"].push(g.property.propertyName), b[k].data["4"].push(g.property.propertyName), b[k].data["5"].push(g.property.propertyName),
				b[k].data["6"].push(g.property.propertyName); else for (var l in g.schedule) {
				var m = moment().locale("en").weekday(l).format("dddd"), n = g.schedule[l],
					p = {dayName: m, slots: [], isSelected: f.day() === parseInt(l, 10)};
				n.forEach(function (a) {
					p.slots.push((10 > a.startHour ? "0" : "") + a.startHour + ":" + (10 > a.startMinute ? "0" : "") + a.startMinute + " - " + ((10 > a.endHour ? "0" : "") + a.endHour + ":" + (10 > a.endMinute ? "0" : "") + a.endMinute));
					var d = moment.tz(g.timezone).days(l).hours(a.startHour).minutes(a.startMinute).seconds(0).milliseconds(0);
					a = moment.tz(g.timezone).days(l).hours(a.endHour).minutes(a.endMinute).seconds(0).milliseconds(0);
					d = d.clone().tz(c);
					a = a.clone().tz(c);
					d = 60 * d.hours() + d.minutes();
					a = 60 * a.hours() + a.minutes();
					for (d; d <= a;) b[d].data[l].push(g.property.propertyName), d += 15
				});
				h.schedule.pushObject(p)
			}
			a.pushObject(h)
		}
		for (l in b) d.push(b[l]);
		this.set("prettifiedSchedule", a);
		this.set("mySchedule", d);
		this.set("todayHighlight", "day-" + moment().days())
	}.observes("controller.propertiesSchedule.@each.schedule"),
	setClockTime: function () {
		for (var a =
			0; a < this.prettifiedSchedule.length; a++) {
			var c = this.prettifiedSchedule[a];
			c.timezone && c.set("propertyTime", moment.tz(c.timezone).format("HH:mm"))
		}
	}
});
Tawk.CustomSelectInterface = Ember.Mixin.create({
	tagName: "label", classNames: ["select", "custom-select"], originalSelection: null, setSelected: function () {
		var a;
		if (a = this.$("select")) a = a.find(":selected"), a.length && this.$(".selected-value").html(a.html())
	}, selectedValueChanged: function () {
		var a;
		"inDOM" === this._state && this.get("selectedValue") && ((a = this.$("select")) &&
		this.get("selectedValue") !== a.val() && a.val(this.get("selectedValue")), this.setSelected())
	}.observes("selectedValue", "options"), didInsertElement: function () {
		var a = this;
		this.set("originalSelection", this.get("selectedValue"));
		this.customClass && this.$().addClass(this.customClass);
		this.$("select").change(function () {
			a.set("selectedValue", $(this).val())
		});
		this.$().on("reset", this.setSelected.bind(this));
		setTimeout(function () {
			a.selectedValueChanged()
		}, 0)
	}, willDestroyElement: function () {
		this.$().off();
		this.$().html("");
		this.$().remove()
	}
});
Tawk.GenericSelection = Ember.View.extend(Tawk.CustomSelectInterface, {template: Ember.TEMPLATES.genericSelect});
Tawk.WebPropertySelection = Ember.View.extend(Tawk.CustomSelectInterface, {
	classNames: ["select", "custom-select", "property-select"],
	template: Ember.TEMPLATES.webPropertySelect,
	sites: function () {
		return Tawk.webProperties.sites ? this.get("adminOnly") ? sortList(Tawk.webProperties.sites.filterProperty("enabled", !0).filterProperty("isAdmin", !0), "propertyName") : sortList(Tawk.webProperties.sites.filterProperty("enabled",
			!0), "propertyName") : []
	}.property("Tawk.webProperties.sites.@each"),
	pages: function () {
		return Tawk.webProperties.pages ? this.get("adminOnly") ? sortList(Tawk.webProperties.pages.filterProperty("enabled", !0).filterProperty("isAdmin", !0), "propertyName") : sortList(Tawk.webProperties.pages.filterProperty("enabled", !0), "propertyName") : []
	}.property("Tawk.webProperties.pages.@each")
});
Tawk.AgentSelection = Ember.View.extend(Tawk.CustomSelectInterface, {
	classNames: ["select", "custom-select", "agent-select"],
	template: Ember.TEMPLATES.agentSelect
});
Tawk.CountrySelection = Ember.View.extend(Tawk.CustomSelectInterface, {
	classNames: ["select", "custom-select", "country-select"],
	template: Ember.TEMPLATES.countrySelect,
	list: countryList
});
Ember.Handlebars.helper("webPropertySelect", Tawk.WebPropertySelection);
Ember.Handlebars.helper("agentSelect", Tawk.AgentSelection);
Ember.Handlebars.helper("countrySelect", Tawk.CountrySelection);
Ember.Handlebars.helper("GenericSelect", Tawk.GenericSelection);
Tawk.Header = Ember.View.extend({
	template: Ember.TEMPLATES.header,
	elementId: "header",
	tagName: "header",
	enabledLanguages: JSON.parse('[{"code":"bg","title":"\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438","flagClass":"flag flag-bg"},{"code":"cat","title":"catal\u00e0","flagClass":"flag flag-cat"},{"code":"cs","title":"\u010de\u0161tina","flagClass":"flag flag-cs"},{"code":"de","title":"Deutsch","flagClass":"flag flag-de"},{"code":"en","title":"english","flagClass":"flag flag-en"},{"code":"es","title":"espa\u00f1ol","flagClass":"flag flag-es"},{"code":"fr","title":"fran\u00e7ais","flagClass":"flag flag-fr"},{"code":"hi","title":"\u0939\u093f\u0902\u0926\u0940","flagClass":"flag flag-hi"},{"code":"it","title":"italiano","flagClass":"flag flag-it"},{"code":"hu","title":"magyar","flagClass":"flag flag-hu"},{"code":"ko","title":"\ud55c\uad6d\uc5b4","flagClass":"flag flag-ko"},{"code":"nl","title":"Nederlands","flagClass":"flag flag-nl"},{"code":"pl","title":"polski","flagClass":"flag flag-pl"},{"code":"pt_br","title":"portugu\u00eas (Brasil)","flagClass":"flag flag-pt_br"},{"code":"ro","title":"rom\u00e2n\u0103","flagClass":"flag flag-ro"},{"code":"ru","title":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439","flagClass":"flag flag-ru"},{"code":"sk","title":"sloven\u010dina","flagClass":"flag flag-sk"},{"code":"sv","title":"svenska","flagClass":"flag flag-sv_se"},{"code":"tr","title":"T\u00fcrk\u00e7e","flagClass":"flag flag-tr"},{"code":"vi","title":"Ti\u1ebfng Vi\u1ec7t","flagClass":"flag flag-vi"},{"code":"zh_tw","title":"\u4e2d\u6587","flagClass":"flag flag-zh_tw"}]'),
	logoutUrl: BASEPATH + "/logout",
	popoutReference: null,
	controller: Tawk.userController,
	notificationText: null,
	updateNotificationHeader: function () {
		var a = this;
		this.notificationText && setTimeout(function () {
			a.notificationText && a.set("notificationText", null)
		}, 5E3)
	}.observes("notificationText"),
	didInsertElement: function () {
		var a = this, c = this.$('button[data-target="#main-navigation"]');
		this.profileChanged();
		this.$("#headerNotification button.close").click(function () {
			a.set("notificationText", null)
		});
		this.$().delegate(".navigate-view",
			"click", function () {
				var a = $(this).attr("id");
				a && (a = a.replace("-select", ""), Tawk.routeManager.get("currentState.name") === a ? Tawk.routeManager.send("reopenView") : Tawk.routing.changeRoute({view: a}), c.hasClass("collapsed") || c.trigger("click"))
			});
		this.$().delegate(".navbar-nav .toggle", "click", function (a) {
			a.stopPropagation()
		});
		this.$().delegate(".edit-profile", "click", function (a) {
			var b, c = Tawk.PageContentController.create();
			c.openPersonalPage(function () {
				b = Tawk.ManagePageContentView.create({
					controller: c, closeCallback: function () {
						null !==
						b && b.destroy()
					}
				});
				b.append()
			})
		});
		this.$().delegate(".edit-account", "click", function (a) {
			var b;
			b = Tawk.EditAccountFormView.create({
				closeCallback: function () {
					null !== b && b.destroy()
				}
			});
			b.append()
		});
		this.$().delegate(".support-popout", "click", function (c) {
			null === a.popoutReference || a.popoutReference.closed ? a.popoutReference = window.open(GLOBAL_TAWK_URL + "/" + TAWK_ID + "/popout/default/?$_tawk_popout=true", "", "width=450, height=500") : a.popoutReference.focus();
			Tawk.intercomController.execute("trackEvent", {eventType: "started-support-chat"})
		});
		this.$().delegate(".desktop-notification-switch", "change", function (c) {
			a.controller.toggleDesktopNotification($(this).is(":checked"), this)
		});
		this.$().delegate(".sound-notification-switch", "change", function (c) {
			a.controller.toggleSoundNotification($(this).is(":checked"))
		});
		this.$().delegate(".manage-sounds", "click", function (a) {
			var b;
			b = Tawk.SoundSettingView.create({
				closeCallback: function () {
					b && "function" === typeof b.destroy && b.destroy()
				}
			});
			b.append()
		});
		this.$().delegate(".manage-sessions", "click", function (a) {
			var b;
			b = Tawk.BrowserAppSessionsView.create({
				closeCallback: function () {
					b && "function" === typeof b.destroy && b.destroy()
				}
			});
			b.append()
		});
		this.$().delegate(".change-language", "click", function (c) {
			var b = $(this).attr("id");
			a.controller.get("localeCode") !== b && null !== a.enabledLanguages.findProperty("code", b) && a.controller.changeLanguage(b, function (a) {
				a || (setLocaleCookie(b), window.location = "/")
			})
		});
		this.$(".menu-tooltip").tooltip()
	},
	profileChanged: function () {
		"inDOM" === this.state && Tawk.webProperties.personalPage && Tawk.webProperties.personalPage.alias &&
		(Tawk.webProperties.personalPage.alias.aliasImage ? this.$("#profile-image").css("background-image", 'url("' + GLOBAL_AWS_PI_URL + "/" + Tawk.webProperties.personalPage.alias.aliasImage + '")') : this.$("#profile-image").css("background-image", "none"))
	}.observes("Tawk.webProperties.personalPage.alias.aliasImage"),
	hasDesktopNotificationFeature: function () {
		return notificationController.hasDesktopNotificationFeature()
	}.property(),
	desktopNotificationIsEnabled: function () {
		return Tawk.userController.desktopNotificationEnabled
	}.property("controller.desktopNotificationEnabled"),
	soundNotificationIsEnabled: function () {
		return Tawk.userController.soundNotificationEnabled
	}.property("controller.soundNotificationEnabled"),
	selectedLanguage: function () {
		return this.enabledLanguages.findProperty("code", this.controller.get("localeCode"))
	}.property("controller.localeCode"),
	clientProperties: function () {
		return Tawk.webProperties.sites ? Tawk.webProperties.sites.filterProperty("enabled", !0).filterProperty("isClientProperty", !0) : []
	}.property("Tawk.webProperties.sites.@each")
});
Tawk.HeaderStatusDropDown =
	Ember.View.extend({
		elementId: "status",
		tagName: "li",
		classNames: ["header-dropdown-list"],
		template: Ember.TEMPLATES.headerStatusDropDown,
		controller: Tawk.userController,
		status: null,
		statusSelectClass: "status-select",
		previousStatus: null,
		willInsertElement: function () {
			this.set("statusLabel", languageParser.translate("header", "status"));
			this.set("statusOptions", [{
				value: "online",
				text: languageParser.translate("status_types", "online")
			}, {value: "away", text: languageParser.translate("status_types", "away")}, {
				value: "invisible",
				text: languageParser.translate("status_types", "invisible")
			}])
		},
		didInsertElement: function () {
			var a = this;
			this.statusChanged();
			$("body").bind("click.statusDropDown", function (c) {
				(a.$("#status-container").is(c.target) || 0 < a.$("#status-container").has(c.target).length) && c.stopPropagation()
			});
			this.$(".status-select").change(function () {
				var c = $(this), d = c.val();
				"invisible" !== d && (a.previousStatus = d);
				if (Tawk.visitorChatController.hasJoinedConversation() && "invisible" === d) return checkAndSetAlertBoxView(languageParser.translate("action_messages",
					"attention"), languageParser.translate("action_messages", "status_invisible_in_chat")), "invisible" !== a.previousStatus ? (a.controller.user.status = a.previousStatus[0], a.statusChanged(), a.resetStatusDropDown(), c.trigger("change")) : a.resetStatusDropDown();
				a.disableStatusDropDown();
				a.controller.changeStatus(d, function (b) {
					b && a.resetStatusDropDown();
					a.enableStatusDropDown()
				})
			});
			this.$().delegate(".toggle input", "change", function (a) {
				var d = $(this), b = d.parent(), e = $('<span class="small-transparent-spinner"></span>'),
					f = d.data("property-id");
				b.find(".fa-warning").remove();
				b.addClass("state-disabled").append(e);
				d.prop("disabled", !0);
				Tawk.webProperties.changePageStatus(f, d.prop("checked"), function (a) {
					var c = $('<span class="fa fa-warning" data-placement="bottom" data-original-title="' + languageParser.translate("tooltip", "status_update_fail") + '"></span>');
					e.remove();
					a && ((a = Tawk.webProperties.getProperty(f)) && d.prop("checked", a.get("isStatusEnabled")), b.append(c), c.tooltip());
					d.prop("disabled", !1);
					d.parent().removeClass("state-disabled")
				})
			})
		},
		willDestroyElement: function () {
			$("body").unbind("click.statusDropDown")
		},
		resetStatusDropDown: function () {
			this.$(".status-select").val(this.status);
			this.$(".status-select").parent().trigger("reset")
		},
		disableStatusDropDown: function () {
			this.$(".status-select").attr("disabled", !0);
			this.$(".status-select").parent().addClass("state-disabled")
		},
		enableStatusDropDown: function () {
			this.$(".status-select").attr("disabled", !1);
			this.$(".status-select").parent().removeClass("state-disabled")
		},
		sites: function () {
			return Tawk.webProperties.sites ?
				Tawk.webProperties.sites.filterProperty("enabled", !0).filterProperty("isClientProperty", !1) : []
		}.property("Tawk.webProperties.sites.@each"),
		pages: function () {
			return Tawk.webProperties.pages ? Tawk.webProperties.pages.filterProperty("enabled", !0) : []
		}.property("Tawk.webProperties.pages.@each"),
		statusChanged: function () {
			if ("inDOM" === this._state) {
				switch (this.controller.user.status) {
					case "o":
						this.set("status", "online");
						break;
					case "a":
						this.set("status", "away");
						break;
					case "i":
						this.set("status", "invisible")
				}
				this.status &&
				(this.previousStatus = this.status)
			}
		}.observes("controller.user.status"),
		statusDisplayText: function () {
			return null === this.status ? "" : languageParser.translate("status_types", this.status)
		}.property("status"),
		statusClassName: function () {
			return null === this.status ? "" : "status-" + this.status
		}.property("status")
	});
Ember.Handlebars.helper("HeaderStatusDropDown", Tawk.HeaderStatusDropDown);
Tawk.HeaderNotification = Ember.View.extend({
	template: Ember.TEMPLATES.headerNotification,
	controller: Tawk.invitationsController,
	elementId: "logo-group",
	totalNotifications: 0,
	hasNotifications: function () {
		var a = 0, c = moment(new Date(ACC_CREATED_ON)), d = moment();
		if (!Tawk.webProperties || !Tawk.webProperties.sites) return !1;
		this.controller.invitations.length && (a += this.controller.invitations.length);
		!Tawk.userController.isAddOnSeen && (0 < Tawk.webProperties.sites.length && 3 < d.diff(c, "days")) && a++;
		Tawk.userController.isAddOnSeen && !Tawk.userController.newAddonSeen && a++;
		Tawk.userController.isAddOnSeen && !Tawk.userController.webrtcAddonSeen && a++;
		this.set("totalNotifications", a);
		return 0 !== a
	}.property("controller.invitations.length", "Tawk.userController.isAddOnSeen", "Tawk.webProperties.sites.length", "Tawk.userController.newAddonSeen", "Tawk.userController.webrtcAddonSeen"),
	didInsertElement: function () {
		var a = this;
		this.$().delegate(".accept", "click", function (c) {
			var d = $(this);
			c = d.data("invite-id");
			d.prop("disabled", !0);
			a.controller.acceptInvitation(c, function (a) {
				a && d.prop("disabled", !1)
			})
		});
		this.$().delegate(".reject", "click", function (c) {
			var d =
				$(this);
			c = d.data("invite-id");
			d.prop("disabled", !0);
			a.controller.rejectInvitation(c, function (a) {
				a && d.prop("disabled", !1)
			})
		});
		this.$().delegate("#activity", "click", function (a) {
			var d = $(this);
			d.next(".ajax-dropdown").is(":visible") ? (d.next(".ajax-dropdown").fadeOut(150), d.removeClass("active")) : (d.next(".ajax-dropdown").fadeIn(150), d.addClass("active"));
			theUrlVal = null;
			a.preventDefault()
		});
		this.$().delegate(".view-add-on", "click", function () {
			var c = main.storageSettings["admin-view"] ? JSON.parse(main.storageSettings["admin-view"]) :
				{};
			if (0 !== Tawk.webProperties.sites.length) {
				if (c.propertyId && "page" === c.type || !c.propertyId) c.propertyId = Tawk.webProperties.sites[0].id, c.type = "site";
				c.subView = "addon-store";
				c.itemId = "whitelabel";
				main.updateStorageSettings("admin-view", JSON.stringify(c));
				a.$("#activity").trigger("click");
				window.location.hash = "/admin/addon-store/whitelabel"
			}
		});
		this.$().delegate(".dismiss-add-on", "click", function () {
			a.$("#activity").trigger("click");
			Tawk.userController.setNewFeatureSeen("add-on")
		});
		this.$().delegate(".view-hire-agent",
			"click", function () {
				Tawk.userController.setNewAddonSeen();
				var c = main.storageSettings["admin-view"] ? JSON.parse(main.storageSettings["admin-view"]) : {};
				if (0 !== Tawk.webProperties.sites.length) {
					if (c.propertyId && "page" === c.type || !c.propertyId) c.propertyId = Tawk.webProperties.sites[0].id, c.type = "site";
					c.subView = "addon-store";
					c.itemId = "live-answering";
					main.updateStorageSettings("admin-view", JSON.stringify(c));
					a.$("#activity").trigger("click");
					window.location.hash = "/admin/addon-store/live-answering"
				}
			});
		this.$().delegate(".dismiss-hire-agent",
			"click", function () {
				a.$("#activity").trigger("click");
				Tawk.userController.setNewAddonSeen()
			});
		this.$().delegate(".view-webrtc", "click", function () {
			Tawk.userController.set("webrtcAddonSeen", !0);
			main.updateStorageSettings("webrtcAddonSeen", !0);
			var c = main.storageSettings["admin-view"] ? JSON.parse(main.storageSettings["admin-view"]) : {};
			if (0 !== Tawk.webProperties.sites.length) {
				if (c.propertyId && "page" === c.type || !c.propertyId) c.propertyId = Tawk.webProperties.sites[0].id, c.type = "site";
				c.subView = "addon-store";
				c.itemId = "webrtc";
				main.updateStorageSettings("admin-view", JSON.stringify(c));
				a.$("#activity").trigger("click");
				window.location.hash = "/admin/addon-store/webrtc"
			}
		});
		this.$().delegate(".dismiss-webrtc", "click", function () {
			a.$("#activity").trigger("click");
			Tawk.userController.set("webrtcAddonSeen", !0);
			main.updateStorageSettings("webrtcAddonSeen", !0)
		});
		this.$().delegate("#group-icr", "click", function (a) {
			var d = $(this).hasClass("selected");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleGroupIncomingList(d ?
				!1 : !0)
		});
		this.$().delegate("#visitor-details-toggle", "click", function (a) {
			var d = $(this).hasClass("selected");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleVisitorDetailsHover(d ? !1 : !0)
		});
		this.$().delegate("#list-view-toggle", "click", function (a) {
			var d = $(this).hasClass("selected");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleSidebarChatlist(d ? !1 : !0)
		});
		this.$().delegate("#group-icr-min", "change", function (a) {
			var d = $(this).prop("checked");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleGroupIncomingList(d ? !1 : !0)
		});
		this.$().delegate("#visitor-details-toggle-min", "change", function (a) {
			var d = $(this).prop("checked");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleVisitorDetailsHover(d ? !1 : !0)
		});
		this.$().delegate("#list-view-toggle-min", "change", function (a) {
			var d = $(this).prop("checked");
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleSidebarChatlist(d ? !1 : !0)
		});
		this.groupIncomingRequests();
		this.visitorDetailsHoverIsEnabled();
		this.showAllChats();
		this.$(".sidebar-visitors-action").tooltip()
	},
	visitorDetailsHoverIsEnabled: function () {
		Tawk.userController.visitorDetailsHoverEnabled ? this.$("#visitor-details-toggle").attr("data-original-title", languageParser.translate("tooltip", "disable_visitor_hover")) : this.$("#visitor-details-toggle").attr("data-original-title", languageParser.translate("tooltip", "enable_visitor_hover"))
	}.observes("Tawk.userController.visitorDetailsHoverEnabled"),
	showAllChats: function () {
		Tawk.userController.sidebarChatListAll ? this.$("#list-view-toggle").attr("data-original-title",
			languageParser.translate("header", "show_my_chats")) : this.$("#list-view-toggle").attr("data-original-title", languageParser.translate("tooltip", "show_all_chats"))
	}.observes("Tawk.userController.sidebarChatListAll"),
	groupIncomingRequests: function () {
		Tawk.userController.groupIncomingRequests ? this.$("#group-icr").attr("data-original-title", languageParser.translate("tooltip", "ungroup_icr")) : this.$("#group-icr").attr("data-original-title", languageParser.translate("tooltip", "group_icr"))
	}.observes("Tawk.userController.groupIncomingRequests")
});
Ember.Handlebars.helper("HeaderNotification", Tawk.HeaderNotification);
Tawk.HeaderProfileMenu = Ember.View.extend({
	tagName: "li",
	classNames: ["header-dropdown-list"],
	template: Ember.TEMPLATES.headerProfileMenu
});
Ember.Handlebars.helper("HeaderProfileMenu", Tawk.HeaderProfileMenu);
Tawk.HeaderSettingsMenu = Ember.View.extend({
	tagName: "li",
	classNames: ["header-dropdown-list"],
	template: Ember.TEMPLATES.headerSettingsMenu,
	didInsertElement: function () {
		var a = this;
		$("body").bind("click.settingsMenu", function (c) {
			(a.$("#desktop-notification-container").is(c.target) ||
				0 < a.$("#desktop-notification-container").has(c.target).length || a.$("#sound-notification-container").is(c.target) || 0 < a.$("#sound-notification-container").has(c.target).length) && c.stopPropagation()
		})
	},
	willDestroyElement: function () {
		$("body").unbind("click.settingsMenu")
	}
});
Ember.Handlebars.helper("HeaderSettingsMenu", Tawk.HeaderSettingsMenu);
Tawk.MainNav = Ember.View.extend({
	template: Ember.TEMPLATES.mainNav,
	elementId: "main-nav",
	enabledLanguages: JSON.parse('[{"code":"bg","title":"\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438","flagClass":"flag flag-bg"},{"code":"cat","title":"catal\u00e0","flagClass":"flag flag-cat"},{"code":"cs","title":"\u010de\u0161tina","flagClass":"flag flag-cs"},{"code":"de","title":"Deutsch","flagClass":"flag flag-de"},{"code":"en","title":"english","flagClass":"flag flag-en"},{"code":"es","title":"espa\u00f1ol","flagClass":"flag flag-es"},{"code":"fr","title":"fran\u00e7ais","flagClass":"flag flag-fr"},{"code":"hi","title":"\u0939\u093f\u0902\u0926\u0940","flagClass":"flag flag-hi"},{"code":"it","title":"italiano","flagClass":"flag flag-it"},{"code":"hu","title":"magyar","flagClass":"flag flag-hu"},{"code":"ko","title":"\ud55c\uad6d\uc5b4","flagClass":"flag flag-ko"},{"code":"nl","title":"Nederlands","flagClass":"flag flag-nl"},{"code":"pl","title":"polski","flagClass":"flag flag-pl"},{"code":"pt_br","title":"portugu\u00eas (Brasil)","flagClass":"flag flag-pt_br"},{"code":"ro","title":"rom\u00e2n\u0103","flagClass":"flag flag-ro"},{"code":"ru","title":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439","flagClass":"flag flag-ru"},{"code":"sk","title":"sloven\u010dina","flagClass":"flag flag-sk"},{"code":"sv","title":"svenska","flagClass":"flag flag-sv_se"},{"code":"tr","title":"T\u00fcrk\u00e7e","flagClass":"flag flag-tr"},{"code":"vi","title":"Ti\u1ebfng Vi\u1ec7t","flagClass":"flag flag-vi"},{"code":"zh_tw","title":"\u4e2d\u6587","flagClass":"flag flag-zh_tw"}]'),
	popoutReference: null,
	logoutUrl: BASEPATH + "/logout",
	didInsertElement: function () {
		var a = this;
		this.profileChanged();
		this.statusChanged();
		this.$(".menu-tooltip").tooltip();
		$("body").bind("click.accountMenu", function (c) {
			(0 < a.$("#status-container").has(c.target).length || 0 < a.$("#property-status-toggle").has(c.target).length || 0 < a.$("#desktop-notification-container").has(c.target).length || 0 < a.$("#sound-notification-container").has(c.target).length) && c.stopPropagation()
		});
		this.$().delegate(".navigate-view", "click",
			function () {
				var a = $(this).attr("id"), d = Tawk.routing.getPath();
				a && (a = a.replace("-select", ""), "addon" === a ? ($(".navigate-view").removeClass("active"), $(this).addClass("active"), "admin" === d.view && "addon-store" === d.subView || Tawk.routing.changeRoute({
					view: "admin",
					subView: "addon-store",
					propertyId: d.propertyId || null
				})) : Tawk.routeManager.get("currentState.name") === a ? "admin" === a && "addon-store" === d.subView ? ($(".navigate-view").removeClass("active"), $(this).addClass("active"), Tawk.routing.changeRoute({
					view: "admin",
					subView: null, propertyId: null
				})) : Tawk.routeManager.send("reopenView") : Tawk.routing.changeRoute({view: a}))
			});
		this.$(".status-select").click(function () {
			var c = $(this).attr("id");
			"invisible" !== c && (a.previousStatus = c);
			Tawk.visitorChatController.hasJoinedConversation() && "invisible" === c && (checkAndSetAlertBoxView(languageParser.translate("action_messages", "attention"), languageParser.translate("action_messages", "status_invisible_in_chat")), "invisible" !== a.previousStatus && (Tawk.userController.user.status = a.previousStatus[0],
				a.statusChanged()));
			a.disableStatusDropDown();
			Tawk.userController.changeStatus(c, function (c) {
				c || a.enableStatusDropDown()
			})
		});
		this.$().delegate("#property-status-toggle .toggle input", "change", function (c) {
			var d = $(this), b = d.parent(), e = $('<span class="small-transparent-spinner"></span>'),
				f = d.data("property-id");
			b.find(".fa-warning").remove();
			b.addClass("state-disabled").append(e);
			d.prop("disabled", !0);
			a.disableStatusDropDown();
			Tawk.webProperties.changePageStatus(f, d.prop("checked"), function (c) {
				var h =
					$('<span class="fa fa-warning" data-placement="bottom" data-original-title="' + languageParser.translate("tooltip", "status_update_fail") + '"></span>');
				e.remove();
				c && ((c = Tawk.webProperties.getProperty(f)) && d.prop("checked", c.get("isStatusEnabled")), b.append(h), h.tooltip());
				d.prop("disabled", !1);
				d.parent().removeClass("state-disabled");
				a.enableStatusDropDown()
			})
		});
		this.$().delegate(".change-language", "click", function (c) {
			var d = $(this).attr("id");
			Tawk.userController.get("localeCode") !== d && null !== a.enabledLanguages.findProperty("code",
				d) && Tawk.userController.changeLanguage(d, function (a) {
				a || (setLocaleCookie(d), window.location = "/")
			})
		});
		this.$().delegate(".desktop-notification-switch", "change", function (a) {
			Tawk.userController.toggleDesktopNotification($(this).is(":checked"), this)
		});
		this.$().delegate(".sound-notification-switch", "change", function (a) {
			Tawk.userController.toggleSoundNotification($(this).is(":checked"))
		});
		this.$().delegate(".manage-sounds", "click", function (a) {
			var d;
			d = Tawk.SoundSettingView.create({
				closeCallback: function () {
					d &&
					"function" === typeof d.destroy && d.destroy()
				}
			});
			d.append()
		});
		this.$().delegate(".manage-sessions", "click", function (a) {
			var d;
			d = Tawk.BrowserAppSessionsView.create({
				closeCallback: function () {
					d && "function" === typeof d.destroy && d.destroy()
				}
			});
			d.append()
		});
		this.$().delegate(".support-popout", "click", function (c) {
			null === a.popoutReference || a.popoutReference.closed ? a.popoutReference = window.open(GLOBAL_TAWK_URL + "/" + TAWK_ID + "/popout/default/?$_tawk_popout=true", "", "width=450, height=500") : a.popoutReference.focus();
			Tawk.intercomController.execute("trackEvent", {eventType: "started-support-chat"})
		})
	},
	profileChanged: function () {
		"inDOM" === this.state && Tawk.webProperties.personalPage && Tawk.webProperties.personalPage.alias && (Tawk.webProperties.personalPage.alias.aliasImage ? this.$("#profile-image").css("background-image", 'url("' + GLOBAL_AWS_PI_URL + "/" + Tawk.webProperties.personalPage.alias.aliasImage + '")') : this.$("#profile-image").css("background-image", "none"))
	}.observes("Tawk.webProperties.personalPage.alias.aliasImage"),
	statusChanged: function () {
		if ("inDOM" === this._state) {
			switch (Tawk.userController.user.status) {
				case "o":
					this.set("status", "online");
					break;
				case "a":
					this.set("status", "away");
					break;
				case "i":
					this.set("status", "invisible")
			}
			this.status && (this.previousStatus = this.status)
		}
	}.observes("Tawk.userController.user.status"),
	statusDisplayText: function () {
		return this.status ? languageParser.translate("status_types", this.status) : ""
	}.property("status"),
	statusClassName: function () {
		return null === this.status ? "" : "status-" + this.status
	}.property("status"),
	disableStatusDropDown: function () {
		this.$("#account-menu-container").addClass("disabled")
	},
	enableStatusDropDown: function () {
		this.$("#account-menu-container").removeClass("disabled")
	},
	hasDesktopNotificationFeature: function () {
		return notificationController.hasDesktopNotificationFeature()
	}.property(),
	desktopNotificationIsEnabled: function () {
		return Tawk.userController.desktopNotificationEnabled
	}.property("controller.desktopNotificationEnabled"),
	soundNotificationIsEnabled: function () {
		return Tawk.userController.soundNotificationEnabled
	}.property("controller.soundNotificationEnabled"),
	selectedLanguage: function () {
		return this.enabledLanguages.findProperty("code", Tawk.userController.get("localeCode"))
	}.property("Tawk.userController.localeCode"),
	sites: function () {
		return Tawk.webProperties.sites ? Tawk.webProperties.sites.filterProperty("enabled", !0).filterProperty("isClientProperty", !1) : []
	}.property("Tawk.webProperties.sites.@each"),
	pages: function () {
		return Tawk.webProperties.pages ? Tawk.webProperties.pages.filterProperty("enabled", !0) : []
	}.property("Tawk.webProperties.pages.@each")
});
Tawk.VisitorBan =
	Ember.Mixin.create({
		didInsertElement: function () {
			var a, c = this;
			a = this.$(".ban-form form").validate({
				errorPlacement: function (a, b) {
					a.insertAfter(b.parent())
				}, submitHandler: function (a) {
					var b = $(a).find(".banReason").val(), e = $(a).find(".banIp").is(":checked");
					Tawk.liveMonitoringController.banVisitor(c.content, b, e, function (b) {
						b ? errorSave(a, languageParser.translate("form_validation_messages", "error_ban")) : (e ? Tawk.intercomController.execute("trackEvent", {eventType: "banned-ip-on-hover"}) : Tawk.intercomController.execute("trackEvent",
							{eventType: "banned-visitor-on-hover"}), c.get("parentView").clearHoverContent())
					});
					return !1
				}
			});
			this.$(".ban-visitor").click(function (a) {
				a.stopPropagation();
				c.$(".ban-form").css("display", "block");
				c.$(".visitor-details").css("display", "none")
			});
			this.$().delegate(".ignore-visitor", "click", function (a) {
				a.stopPropagation();
				Tawk.liveMonitoringController.ignoreChat(c.content._id)
			});
			this.$(".ban-form").click(function (a) {
				a.stopPropagation()
			});
			this.$(".close-ban-form").click(function (d) {
				c.$(".visitor-details").css("display",
					"block");
				c.$(".ban-form").css("display", "none");
				a.resetForm();
				c.$(".state-error").removeClass("state-error");
				c.$(".state-success").removeClass("state-success")
			})
		}
	});
Tawk.VisitorItem = Ember.View.extend(Tawk.VisitorBan, {
	template: Ember.TEMPLATES.visitorItem, tagName: "li", hasChatRequest: function () {
		this.content.cr ? this.content.set("unSeen", !0) : this.content.set("unSeen", !1);
		Tawk.leftPanel.$().trigger("unseen-messages")
	}.observes("content.cr"), willDestroyElement: function () {
		this.$("a").unbind("mouseover.focus");
		this.$().remove()
	}, didInsertElement: function () {
		var a = this;
		this._super();
		this.$().attr("class", this.content.get("highlightColor"));
		this.hasChatRequest();
		this.$().click(function (c) {
			$(c.target).hasClass("toggle-details") || ($(c.target).parents(".toggle-details").length || $(c.target).hasClass("ignore-visitor")) || (a.get("parentView").clearHoverContent(), Tawk.liveMonitoringController.openChat(a.content._id))
		});
		this.$("a").bind("mouseover.focus", function () {
			var c = $(this), d = $(this).offset();
			"inDOM" === a._state &&
			(a.set("parentView.hoverContent", a.content), setTimeout(function () {
				"inDOM" === a._state && ($("#left-panel").outerHeight() - d.top - 50 < $("#hoverView").outerHeight() && (d.top -= $("#hoverView").outerHeight() - c.outerHeight()), 50 > d.top && (d.top = 51), $("body").hasClass("minified") ? $("#hoverView").css({
					top: d.top,
					left: "115px"
				}) : $("#hoverView").css({
					top: d.top,
					left: c.outerWidth() + d.left
				}), a.set("parentView.hoverContentVisible", !0))
			}, 0))
		});
		this.$(".ignore-visitor").tooltip()
	}, showFlash: function () {
		"inDOM" === this._state &&
		(this.content.showFlash ? (this.content.set("unSeen", !0), this.$("a.visitor-name").addClass("flash-new-message")) : (this.content.set("unSeen", !1), this.$("a.visitor-name").removeClass("flash-new-message")), Tawk.leftPanel.$().trigger("unseen-messages"))
	}.observes("content.showFlash"), totalUnseen: function () {
		return this.content.cver - this.content.lastSeenChat
	}.property("content.cver", "content.lastSeenChat")
});
Ember.Handlebars.helper("VisitorItem", Tawk.VisitorItem);
Tawk.HoverView = Ember.View.extend(Tawk.VisitorBan,
	{
		template: Ember.TEMPLATES.visitorDetails,
		elementId: "hoverView",
		content: null,
		contentChanged: function () {
			"inDOM" === this._state && this.$(".close-ban-form").trigger("click")
		}.observes("content._id")
	});
Ember.Handlebars.helper("HoverView", Tawk.HoverView);
Tawk.LeftPanel = Ember.View.extend({
	template: Ember.TEMPLATES.leftPanel,
	elementId: "left-panel",
	tagName: "aside",
	controller: Tawk.leftPanelController,
	topUnseen: 0,
	bottomUnseen: 0,
	hoverContent: null,
	hoverContentVisible: !1,
	membersMessageList: null,
	triggerTimeout: null,
	groupSearch: [],
	dmSearch: [],
	visitorDetailsHoverIsEnabled: function () {
		return Tawk.userController.visitorDetailsHoverEnabled
	}.property("Tawk.userController.visitorDetailsHoverEnabled"),
	showAllChats: function () {
		return Tawk.userController.sidebarChatListAll
	}.property("Tawk.userController.sidebarChatListAll"),
	willDestroyElement: function () {
		this.$().unbind("mouseleave.unfocus");
		this.$("nav#visitors").unbind("mouseout.paneunfocus")
	},
	triggerUnseen: function () {
		var a, c, d, b, e, f = this;
		clearTimeout(this.triggerTimeout);
		this.set("triggerTimeout", setTimeout(function () {
			"inDOM" === f._state && (a = f.$().find(".unseen").first(), c = f.$().find(".unseen").last(), a.length || c.length ? (d = f.$("#visitorsScrollContainer").scrollTop(), a.length ? (b = a.offset().top, b = 0 > b ? 0 : b, f.$("#unseen-top").removeClass("hidden"), f.$("#unseen-top").unbind("click.showtop"), 0 === b && 0 !== d ? f.$("#unseen-top").bind("click.showtop", function () {
					f.$("#visitorsScrollContainer").scrollTop(b)
				}) : (f.$("#unseen-top").addClass("hidden"), f.$("#unseen-top").unbind("click.showtop"))) :
				(f.$("#unseen-top").addClass("hidden"), f.$("#unseen-top").unbind("click.showtop")), a !== c && c.length ? (e = c.offset().top, e > d + f.$("#visitorsScrollContainer").height() && e > f.$("#visitorsScrollContainer").height() ? (f.$("#unseen-bottom").removeClass("hidden"), f.$("#unseen-bottom").unbind("click.showbottom"), f.$("#unseen-bottom").bind("click.showbottom", function () {
					f.$("#visitorsScrollContainer").scrollTop(e + 30)
				})) : (f.$("#unseen-bottom").addClass("hidden"), f.$("#unseen-bottom").unbind("click.showbottom"))) :
				(f.$("#unseen-bottom").addClass("hidden"), f.$("#unseen-bottom").unbind("click.showbottom"))) : (f.$("#unseen-top").addClass("hidden"), f.$("#unseen-top").unbind("click.showtop"), f.$("#unseen-bottom").addClass("hidden"), f.$("#unseen-bottom").unbind("click.showbottom")))
		}, 0))
	},
	didInsertElement: function () {
		var a = this;
		this.$().debounce("unseen-messages", function () {
			a.triggerUnseen()
		}, 50);
		this.$("#channelList, #agentList, .list-section").debounce("resize", function () {
			a.triggerUnseen()
		}, 50);
		this.$().delegate(".toggle-details",
			"click", function (c) {
				var d = $(this).parent().parent().find("ul");
				c.stopPropagation();
				d.is(":visible") ? d.slideUp("fast", function () {
					$(this).parent("li").removeClass("open")
				}) : (a.$(".chat-users.open a.toggleAgentList").trigger("click"), d.slideDown("fast", function () {
					$(this).parent("li").addClass("open")
				}))
			});
		this.$().delegate('.nonVisitorsList a[data-toggle="popover"]', "mouseover", function () {
			$(this).popover({trigger: "hover"});
			$(this).popover("show")
		});
		this.$('[data-action="minifyMenu"]').click(function (c) {
			a.$(".chat-users.open a.toggleAgentList").trigger("click");
			a.$(".visitor-list .open").removeClass("open");
			a.$(".visitor-list .ban-form").css("display", "none");
			a.$(".visitor-list .visitor-details").css("display", "none")
		});
		this.$().delegate(".list-name-container", "click", function (c) {
			var d = $(this).attr("data-id"), b = $(this).parent().find("ul.visitor-list");
			c.stopPropagation();
			b.is(":visible") ? b.slideUp("fast", function () {
				$(this).parent("li").removeClass("open");
				a.controller.updatePropertyIsOpen(d, !1)
			}) : (a.controller.updatePropertyIsOpen(d, !0), b.slideDown("fast",
				function () {
					$(this).parent("li").addClass("open")
				}))
		});
		this.$().bind("mouseleave.unfocus", function () {
			a.set("hoverContentVisible", !1)
		});
		this.$("nav#visitors").bind("mouseout.paneunfocus", function (c) {
			$(c.relatedTarget).parents(".visitor-list").length || $(c.relatedTarget).parents("#hoverView").length || a.set("hoverContentVisible", !1)
		});
		this.$("#hoverView").on("mouseleave", function () {
			a.set("hoverContentVisible", !1)
		});
		this.$().delegate(".chat-open.agent-chat", "click", function () {
			var a = $(this).parent().attr("data-chat-id");
			Tawk.agentChatController.openChat(a)
		});
		this.$().delegate(".chat-open.group-chat", "click", function () {
			var a = $(this).parent().attr("data-chat-id");
			Tawk.agentChatController.openGroupChat(a)
		});
		this.$().delegate(".pin-chat", "click", function () {
			var a = $(this).parent().attr("data-chat-id");
			Tawk.agentChatController.pinChatToSidebar(a)
		});
		this.$().delegate(".unpin-chat", "click", function () {
			var a = $(this).parent().attr("data-chat-id");
			Tawk.agentChatController.unpinChatToSidebar(a)
		});
		this.$().delegate("#active-chats-title .active-chats",
			"click", function (c) {
				a.membersMessageList && a.membersMessageList.closeView();
				window.location.hash = "/chat"
			});
		this.$().delegate("ul.dropdown-menu li", "click", function (a) {
			a.stopPropagation()
		});
		this.$(".sidebar-tooltip").tooltip({placement: "right"});
		this.$().delegate(".dropdown-toggle", "click", function () {
			var a = $(this).parent().find(".dropdown-menu");
			a && a.css("top", $(this).offset().top + 22 + "px")
		});
		this.$("#visitorsScrollContainer").debounce("scroll", function (c) {
				"inDOM" === a._state && a.$().trigger("unseen-messages")
			},
			50);
		this.$().delegate(".add-tooltip", "mouseover", function () {
			$(this).tooltip("show")
		});
		this.$().delegate(".open-dm-list", "click", function () {
			null !== a.membersMessageList ? $("#direct-message-view").is(":visible") ? a.membersMessageList.openView("dm") : $("#direct-message-view").show() : (a.set("membersMessageList", Tawk.MembersMessageListView.create({
				listType: "dm",
				closeForm: a.closeMembersMessageList.bind(a)
			})), a.membersMessageList.append())
		});
		this.$().delegate(".open-group-list", "click", function () {
			null !== a.membersMessageList ?
				$("#direct-message-view").is(":visible") ? a.membersMessageList.openView("group") : $("#direct-message-view").show() : (a.set("membersMessageList", Tawk.MembersMessageListView.create({
					listType: "group",
					closeForm: a.closeMembersMessageList.bind(a)
				})), a.membersMessageList.append())
		});
		this.$().delegate(".new-group", "click", function (c) {
			c.stopPropagation();
			null !== a.membersMessageList ? $("#direct-message-view").is(":visible") ? a.membersMessageList.openAddGroup() : $("#direct-message-view").show() : (a.set("membersMessageList",
				Tawk.MembersMessageListView.create({
					isNewGroupView: !0,
					closeForm: a.closeMembersMessageList.bind(a)
				})), a.membersMessageList.append())
		});
		this.$().delegate("#group-icr", "change", function (a) {
			a.preventDefault();
			a.stopPropagation();
			Tawk.userController.toggleGroupIncomingList($(this).is(":checked"))
		});
		this.$().delegate("#open-oldest", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			Tawk.liveMonitoringController.openOldestChat()
		});
		this.$().delegate("#toggle-inline-group-chat", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			Tawk.agentChatController.saveChatViewSettings("groupView", !$(this).hasClass("active"))
		});
		this.$().delegate("#toggle-inline-dm-chat", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			Tawk.agentChatController.saveChatViewSettings("agentView", !$(this).hasClass("active"))
		});
		this.$().delegate("#group-chat-view", "change", function (a) {
			a.preventDefault();
			a.stopPropagation();
			Tawk.agentChatController.saveChatViewSettings("groupView", $(this).is(":checked"))
		});
		this.$().delegate("#dm-chat-view",
			"change", function (a) {
				a.preventDefault();
				a.stopPropagation();
				Tawk.agentChatController.saveChatViewSettings("agentView", $(this).is(":checked"))
			});
		this.$().delegate(".open-next-icr", "click", function () {
			var a = $(this).attr("data-id");
			Tawk.liveMonitoringController.openFirstICRByProperty(a)
		});
		this.$("#search-group").debounce("keyup", function () {
			var c = $(this).val().trim().toLowerCase();
			c.length ? ($(this).parent().find(".fa-search").addClass("hidden"), a.$(".clear-group-search").removeClass("hidden")) : ($(this).parent().find(".fa-search").removeClass("hidden"),
				a.$(".clear-group-search").addClass("hidden"));
			a.searchGroupList(c)
		}, 16);
		this.$("#search-dm").debounce("keyup", function () {
			var c = $(this).val().trim().toLowerCase();
			c.length ? ($(this).parent().find(".fa-search").addClass("hidden"), a.$(".clear-dm-search").removeClass("hidden")) : ($(this).parent().find(".fa-search").removeClass("hidden"), a.$(".clear-dm-search").addClass("hidden"));
			a.searchDMList(c)
		}, 16);
		this.$().delegate(".clear-group-search", "click", function () {
			a.$("#search-group").val("").trigger("keyup")
		});
		this.$().delegate(".clear-dm-search", "click", function () {
			a.$("#search-dm").val("").trigger("keyup")
		})
	},
	closeMembersMessageList: function (a) {
		this.membersMessageList && (a ? $("#direct-message-view").hide() : (this.membersMessageList.remove(), this.set("membersMessageList", null)))
	},
	clearHoverContent: function () {
		this.set("hoverContent", null);
		this.set("hoverContentVisible", !1)
	},
	inlineGroupTooltip: function () {
		return Tawk.agentChatController.inlineGroupChat ? languageParser.translate("sidebar", "open_group_pop") : languageParser.translate("sidebar",
			"open_group_inline")
	}.property("Tawk.agentChatController.inlineGroupChat"),
	inlineDMTooltip: function () {
		return Tawk.agentChatController.inlineDirectMessage ? languageParser.translate("sidebar", "open_dm_pop") : languageParser.translate("sidebar", "open_dm_inline")
	}.property("Tawk.agentChatController.inlineDirectMessage"),
	searchGroupList: function (a) {
		var c = [], d = RegExp(a, "gi");
		this.groupSearch.clear();
		a.length ? (Tawk.agentChatController.groupMessagesList.forEach(function (b) {
			-1 !== b.get("groupName").toLowerCase().indexOf(a) &&
			(b.highLighted = b.get("groupName").replace(d, function (a) {
				return '<span class="highlight">' + a + "</span>"
			}), c.push(b))
		}), this.set("hasGroupSearch", !0), this.groupSearch.pushObjects(sortList(c, "groupName"))) : this.set("hasGroupSearch", !1)
	},
	searchDMList: function (a) {
		var c = [], d = RegExp(a, "gi");
		this.dmSearch.clear();
		a.length ? (Tawk.agentChatController.directMessagesList.forEach(function (b) {
			-1 !== decodeStr(b.name).toLowerCase().indexOf(a) && (b.highLighted = encodeStr(decodeStr(b.name).replace(d, function (a) {
				return "%%matchStart%%" +
					a + "%%matchEnd%%"
			})), b.highLighted = b.highLighted.replace(/%%matchStart%%/g, '<span class="highlight">').replace(/%%matchEnd%%/g, "</span>"), c.push(b))
		}), this.set("hasDMSearch", !0), this.dmSearch.pushObjects(sortList(c, "name"))) : this.set("hasDMSearch", !1)
	},
	groupSearchPlaceholder: function () {
		return languageParser.translate("sidebar", "groups_text", {num: Tawk.agentChatController.groupMessagesList.length})
	}.property("Tawk.agentChatController.groupMessagesList.length"),
	dmSearchPlaceholder: function () {
		return languageParser.translate("sidebar",
			"dm_text", {num: Tawk.agentChatController.directMessagesList.length})
	}.property("Tawk.agentChatController.directMessagesList.length")
});
Tawk.leftPanel = Tawk.LeftPanel.create();
Tawk.MessageSidebar = Ember.Mixin.create({
	banView: null, setupSidebarEvents: function () {
		var a = this,
			c = this.controller && this.controller.activeProperty ? this.controller.activeProperty : Tawk.webProperties.getProperty(this.content.pgid);
		this.$().delegate(".open-view", "click", function (d) {
			var b, e, f, g = $(this).attr("data-id");
			f = c.tabSettings;
			if (a.previousTabSelected !== g || a.floatingView) a.previousTabSelected = g, a.chatDetailsManuallyClosed = !1, $(this).hasClass("inner-item") && (b = $(this).parents(".dropdown-submenu").attr("data-id") || $(this).parents(".dropdown").attr("data-id")), b ? (f = f.findProperty("id", b)) && f.items && (e = f.items.findProperty("id", g)) : e = f.findProperty("id", g), e && (a.set("tabSettingTitle", e.title), a.showTabView(e, !!b, d), a.$(".minimized-tab").removeClass("open"), a.$(".dropdown").removeClass("open"))
		});
		this.$().delegate(".print-select",
			"click", function () {
				printTranscript(a.content)
			});
		this.$().delegate(".ban-visitor", "click", function () {
			null !== a.banView ? a.banView.openView() : (a.set("banView", Tawk.VisitorBanHoverView.create({
				elementId: null,
				classNames: ["modal", "ban-form-modal"]
			})), a.banView.appendTo(a.$()));
			a.banView.set("content", a.content)
		});
		this.$().delegate(".ticket-create", "click", function (c) {
			a.handleCreateTicket()
		});
		this.$().delegate(".open-ticket-transcript", "click", function () {
			var c = $(this).attr("data-id");
			$(this).attr("data-id");
			a.controller.set("modalTranscriptData", null);
			a.modalTranscriptView ? a.modalTranscriptView.openView() : (a.set("modalTranscriptView", Tawk.TranscriptView.create({controller: a.controller})), a.modalTranscriptView.append());
			a.controller.getModalTranscriptData(c, !0, function (a) {
			})
		});
		this.$().delegate(".tag-transcript", "click", function () {
			var c = !a.content.isHistory && !a.content.hId;
			a.floatingView && a.floatingView instanceof Tawk.MessageTagView || (a.floatingView && (a.floatingView.remove(), a.set("floatingView", null)),
				a.set("floatingView", Tawk.MessageTagView.create({
					closeFunction: function () {
						a.removeFloatingView(!0)
					}
				})));
			a.floatingView.setProperties({
				propertyId: a.content.pgid,
				currentTags: a.content.tags || [],
				customTags: a.customTags,
				isLiveChat: c,
				sessionId: c ? a.content._id : null
			});
			a.showFloatingView(!0)
		});
		this.$().delegate(".copy-select", "click", function () {
			a.floatingView && a.floatingView instanceof Tawk.TranscriptCopyView || (a.floatingView && (a.floatingView.remove(), a.set("floatingView", null)), a.set("floatingView", Tawk.TranscriptCopyView.create({
				closeFunction: function () {
					a.removeFloatingView(!0)
				}
			})));
			getCopyFormat(a.content);
			a.floatingView.set("copyContent", a.content.copyFormat);
			a.showFloatingView(!0)
		});
		this.$().delegate(".email-transcript", "click", function () {
			a.floatingView && a.floatingView instanceof Tawk.TranscriptEmailView || (a.floatingView && (a.floatingView.remove(), a.set("floatingView", null)), a.set("floatingView", Tawk.TranscriptEmailView.create({
				closeFunction: function () {
					a.removeFloatingView(!0)
				}
			})));
			a.floatingView.set("content", a.content);
			a.showFloatingView(!0)
		});
		this.$().delegate(".add-note",
			"click", function () {
				a.floatingView && a.floatingView instanceof Tawk.VisitorNotesView || (a.floatingView && (a.floatingView.remove(), a.set("floatingView", null)), a.set("floatingView", Tawk.VisitorNotesView.create({
					closeFunction: function () {
						a.removeFloatingView(!0)
					}
				})));
				a.floatingView.set("content", a.content);
				a.showFloatingView(!0)
			});
		this.$().delegate(".back-to-chat", "click", function () {
			a.$(".open-view").removeClass("active");
			a.$(".chat-details-container").addClass("hidden");
			a.$().addClass("no-sidebar");
			a.set("previousTabSelected",
				null)
		})
	}, showTabView: function (a, c, d) {
		var b = this;
		this.hasSwitchedTab = !0;
		d.stopPropagation();
		this.$(".open-view").removeClass("active");
		this.$(".dropdown").removeClass("active");
		this.$(".menu-content").addClass("hidden").show();
		this.$(".new-ticket-view").addClass("hidden");
		this.$(".chat-details-container").show();
		this.$(".chat-details-container").removeClass("hidden");
		this.$().removeClass("no-sidebar");
		this.removeSidebarViews(!0);
		c ? (c = $(d.currentTarget).parents(".dropdown"), c.addClass("active"), c.removeClass("open"),
			a.isInternal ? c.find(".menu-title").html('<i class="fa ' + a.fontClass + '"></i>') : c.find(".menu-title").html(a.title)) : $(d.currentTarget).addClass("active");
		if ("chat_details" === a.label) this.detailsView && this.detailsView.isDetached ? this.$(".details-view").append(this.detailsView.$()) : (this.content.hId || this.content.isNewConvert ? this.set("detailsView", Tawk.TicketDetailsView.create({
			content: b.controller.conversationData,
			controller: this.controller,
			showSavingOverlay: b.showSavingOverlay.bind(b),
			hideSavingOverlay: b.hideSavingOverlay.bind(b),
			showError: b.showError.bind(b)
		})) : this.set("detailsView", Tawk.VisitorDetailsView.create({content: b.content})), this.detailsView.appendTo(this.$(".details-view"))), this.updateSubView(this.$(".details-view")); else if ("history" === a.label) this.set("historyView", Tawk.VisitorHistoryListView.create({content: b.content})), this.historyView.appendTo(b.$(".history-view")), this.updateSubView(b.$(".history-view")); else if ("shortcuts" === a.label) this.shortcutsView && this.shortcutsView.isDetached ? this.$(".shortcuts-view").append(this.shortcutsView.$()) :
			(this.set("shortcutsView", Tawk.VisitorShortcutsListView.create({
				propertyId: b.content.pgid, autoPopulateInput: function (a) {
					(b.content.isHistory || b.content.hId || b.content.isNewConvert || b.content.hasJoinedConversation) && !b.content.isHistory && (b.content.hId || b.content.isNewConvert ? (b.$("#reply-ticket-message").focus(), b.$("#reply-ticket-message").html(b.$("#reply-ticket-message").html() + a)) : (b.$(".message-input").val(b.$(".message-input").val() + a), b.$(".message-input")[0].scrollTop = b.$(".message-input").height(),
						b.$(".message-input").focus()))
				}
			})), this.shortcutsView.appendTo(b.$(".shortcuts-view"))), this.updateSubView(this.$(".shortcuts-view")); else if ("knowledge_base" === a.label) this.set("kbView", Tawk.VisitorKBListView.create({propertyId: b.content.pgid})), this.kbView.appendTo(b.$(".knowledgebase-view")), this.updateSubView(this.$(".knowledgebase-view")); else if ("client_data" === a.label) this.set("clientDataView", Tawk.ClientDataView.create({propertyId: b.content.pgid})), this.clientDataView.appendTo(this.$(".client-data-view")),
			this.updateSubView(this.$(".client-data-view")); else if ("shopify" === a.label) this.set("shopifyView", Tawk.ShopifyDataView.create({
			propertyId: b.content.pgid,
			email: this.content.hId ? b.content.req.email : b.content.e
		})), this.shopifyView.appendTo(b.$(".shopify-data-view")), this.updateSubView(b.$(".shopify-data-view")); else {
			if (this.$(".custom-view").attr("data-id") === a.id) return this.updateSubView(this.$(".custom-view"));
			this.$(".custom-view .custom-element-container:not(.hidden)").addClass("hidden");
			var e =
				this.$(".custom-view #" + a.id);
			e.length ? e.removeClass("hidden") : (e = $(HandlebarsTemplates.visitorCustomMenuView({
				title: a.label,
				id: a.id
			})), a.isURL ? (c = $('<iframe width="100%" height="99%" frameborder="0" allowtransparency="false" class="hidden"></iframe>'), c.attr("src", a.content), c.on("load", function () {
				e.find(".iframe-loading").addClass("hidden");
				$(this).removeClass("hidden")
			}), e.find(".iframe-loading").length ? e.find(".iframe-loading").removeClass("hidden") : e.find(".section-content").append('<div class="iframe-loading text-center"><img src="' +
				GLOBAL_STATIC_URL + '/images/ajax-loader-big.gif"/></div>'), e.find(".section-content").append(c)) : e.find(".section-content").append('<div class="padding-10">' + a.beautifiedText + "</div>"), this.$(".custom-view").append(e));
			this.$(".custom-view").attr("data-id", a.id);
			this.updateSubView(this.$(".custom-view"))
		}
	}, updateSubView: function (a) {
		a.removeClass("hidden")
	}, removeSidebarViews: function (a) {
		this.banView && this.banView.destroy();
		this.historyView && (this.historyView.remove(), this.set("historyView", null));
		this.shortcutsView && (a ? (this.shortcutsView.$().detach(), this.shortcutsView.set("isDetached", !0)) : (this.shortcutsView.remove(), this.set("shortcutsView", null)));
		this.kbView && (this.kbView.remove(), this.set("kbView", null));
		this.detailsView && (a ? (this.detailsView.$().detach(), this.detailsView.set("isDetached", !0)) : (this.detailsView.remove(), this.set("detailsView", null)));
		this.clientDataView && (this.clientDataView.remove(), this.set("clientDataView", null));
		a ? this.$(".floating-view").addClass("hidden") : this.removeFloatingView();
		this.shopifyView && (this.shopifyView.remove(), this.set("shopifyView", null));
		a || this.$("iframe").each(function (a, d) {
			$(d).remove()
		});
		this.modalTranscriptView && (this.modalTranscriptView.remove(), this.set("modalTranscriptView", null));
		this.set("banView", null)
	}, handleCreateTicket: function () {
		var a = this;
		this.floatingView && this.floatingView instanceof Tawk.NewTicketView ? this.floatingView.setProperties({
			recipientName: decodeStr(this.content.n),
			recipientEmail: this.content.e
		}) : (this.floatingView && (this.floatingView.remove(),
			this.set("floatingView", null)), this.set("floatingView", Tawk.NewTicketView.create({
			controller: Tawk.visitorChatController,
			fromChat: !0,
			recipientName: decodeStr(this.content.n),
			recipientEmail: this.content.e,
			chatId: this.content.get("latestChatId"),
			currentProperty: this.content.pgid,
			sessionId: this.content._id,
			isNotModal: !0,
			closeFunction: function () {
				a.removeFloatingView(!0)
			}
		})));
		this.showFloatingView(!0)
	}, showFloatingView: function (a) {
		this.floatingView && ("inDOM" !== this.floatingView._state && this.floatingView.appendTo(this.$(".floating-view")),
			this.$(".floating-view").removeClass("hidden"), this.$(".chat-details-container").show().removeClass("hidden"), this.$(".minimized-tab").removeClass("open"), this.$().removeClass("no-sidebar"), a && (this.$(".menu-content").hide(), this.$(".open-view").removeClass("active")), this.isMinimized && Tawk.visitorChatContainerView.get("isChatDetailsHidden") && this.set("previousTabSelected", null))
	}, removeFloatingView: function (a) {
		this.floatingView && (this.previousTabSelected && (this.$('.open-view[data-id="' + this.previousTabSelected +
			'"]').addClass("active"), this.$(".menu-content").show()), this.$(".floating-view").addClass("hidden"), this.floatingView.remove(), this.set("floatingView", null), this.isMinimized && Tawk.visitorChatContainerView.get("isChatDetailsHidden") && this.$(".chat-details-container").hide())
	}
});
Tawk.TranscriptCopyView = Ember.View.extend({
	template: Ember.TEMPLATES.transcriptCopyView,
	classNames: "floating-view-container",
	didInsertElement: function () {
		var a = this;
		this.$(".close-copy-form").click(function () {
			a.closeFunction()
		});
		this.$(".copy-transcript").click(function () {
			$(this).select()
		});
		this.$(".copy-clipboard").click(function () {
			a.$(".copy-transcript").select();
			document.execCommand("copy");
			$.smallBox({
				title: "Copied",
				content: "<i class='fa fa-copy'></i> <i>Transcript copied to clipboard</i>",
				color: "#95CB8D",
				iconSmall: "fa fa-thumbs-up bounce animated",
				timeout: 4E3
			})
		})
	}
});
Tawk.TranscriptEmailView = Ember.View.extend({
	template: Ember.TEMPLATES.transcriptEmailView,
	classNames: "floating-view-container",
	didInsertElement: function () {
		var a =
			this;
		this.$(".close-email-form").click(function () {
			a.closeFunction()
		});
		this.$(".emailTranscript").validate({
			rules: {emails: {required: !0, multiemail: 10}},
			messages: {emails: {multiemail: languageParser.translate("form_validation_messages", "email") + "(" + languageParser.translate("form_validation_messages", "total_recipients") + ")"}},
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			},
			submitHandler: function (c) {
				var d = $("#emails").val().split(",");
				emailTranscript($.map(d, $.trim), a.content, function (a) {
					if (a) return errorSave($(c).find("footer"),
						languageParser.translate("form_validation_messages", "error_email_transcript"));
					successSave($(c).find("footer"), languageParser.translate("form_validation_messages", "success_email_transcript"))
				});
				return !1
			}
		})
	}
});
Tawk.VisitorDetailsView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorDetailsView,
	classNames: ["visitor-details-view"],
	didInsertElement: function () {
		var a = this;
		this.$(".visitor-attributes").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				visitorUtils.saveVisitorData(a,
					c);
				return !1
			}
		});
		this.$().delegate(".save-visitor-attributes", "click", function () {
			a.$(".visitor-attributes").submit();
			return !1
		})
	},
	minifiedVisit: function () {
		var a;
		return this.content ? (a = this.content.lvd || (this.content.visitor ? this.content.visitor.lvd : null)) ? visitorUtils.calculateMinifiedVisit(a) : null : null
	}.property("content"),
	chatDuration: function () {
		var a;
		if (!this.content || !this.content.isHistory) return null;
		a = moment.duration({seconds: this.content.cd});
		return 0 < a.years() ? a.years() + "Y" : 0 < a.months() ? a.months() +
			"M" : 0 < a.days() ? a.days() + "d" : 0 < a.hours() ? a.hours() + "h" : 0 < a.minutes() ? a.minutes() + "m" : a.seconds() + "s"
	}.property("content.cd"),
	clearSaveMessages: function () {
		"inDOM" === this._state && (this.alertTimeout && clearTimeout(this.alertTimeout), this.$(".alert").remove())
	},
	notesUpdatedBy: function () {
		return this.content.notesUpdatedBy ? languageParser.translate("visitors", "last_note_update", {
			notesUpdatedBy: this.content.notesUpdatedBy,
			notesUpdatedOn: this.content.notesUpdatedOn
		}) : ""
	}.property("content.notesUpdatedBy"),
	hasCustomData: function () {
		return this.content ?
			this.content.customAttributes && this.content.customAttributes.data.length && 0 < this.content.customAttributes.version || this.content.customTags && this.content.customTags.data && 0 < this.content.customTags.version : !1
	}.property("content.customAttributes.version", "content.customTags.version")
});
Tawk.VisitorInnerTranscriptView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorInnerTranscriptView,
	classNames: "transcript-view",
	didInsertElement: function () {
		var a = this;
		this.$().delegate(".close-transcript", "click",
			function () {
				a.set("transcriptData", null);
				a.closeFunction()
			});
		this.transcriptDataChanged()
	},
	transcriptDataChanged: function () {
		var a = this;
		"inDOM" === this._state && this.transcriptData && setTimeout(function () {
			a.transcriptData.callInfo.length && !a.transcriptData.syncCallData && (a.transcriptData.syncCallData = !0, a.transcriptData.callData = {}, a.transcriptData.callInfo.forEach(function (c) {
				conversationProcess.processWebRTCCallBlock(c.callId, a.transcriptData.pgid, c.callView, !1, function (d, b) {
					a.transcriptData.syncCallData =
						!1;
					b && (a.transcriptData.callData[c.callId] = b)
				})
			}))
		}, 1E3)
	}.observes("transcriptData")
});
Tawk.VisitorNotesView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorNotesView,
	classNames: "floating-view-container",
	didInsertElement: function () {
		var a = this;
		this.$(".close-notes-form").click(function () {
			a.closeFunction()
		});
		this.$(".visitor-notes").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				a.$(".alert").remove();
				visitorUtils.saveVisitorData(a, c);
				return !1
			}
		})
	}
});
Tawk.VisitorHistoryListView =
	Ember.View.extend({
		template: Ember.TEMPLATES.visitorHistoryListView,
		classNames: ["visitor-chat-history-list"],
		isLoading: null,
		propertyHistory: null,
		didInsertElement: function () {
			var a = this, c = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local: []
			});
			this.set("isLoading", !0);
			this.content.hId ? (this.$().addClass("no-visitor"), a.$(".property-history").removeClass("hidden"), a.loadPropertyHistory()) : Tawk.conversationsController.loadVisitorHistory(this.content,
				function () {
					a.set("isLoading", !1)
				});
			this.set("agentList", Tawk.visitorChatController.getPropertyAgents(this.content.pgid));
			this.$().delegate(".assignee", "change", function () {
				var a = $(":selected", this);
				a.parents(".custom-select").find(".selected-value").html(encodeStr(a.text()))
			});
			this.$().delegate(".open-transcript", "click", function () {
				var c = $(this).attr("id");
				a.handleOpenTranscript(c)
			});
			this.$().delegate(".open-property-transcript", "click", function () {
				var c = $(this).attr("id");
				a.handleOpenTranscript(c,
					!0)
			});
			this.$().delegate(".next-visitor-history-list", "click.nextHistory", function () {
				var c = $(this);
				a.set("isLoading", !0);
				c.addClass("loading disabled");
				a.content.historyList.nextList();
				Tawk.conversationsController.loadVisitorHistory(a.content, function () {
					c.removeClass("loading disabled");
					a.set("isLoading", !1)
				})
			});
			this.$().delegate(".prev-visitor-history-list", "click.prevHistory", function () {
				var c = $(this);
				a.set("isLoading", !0);
				c.addClass("loading disabled");
				a.content.historyList.previousList();
				Tawk.conversationsController.loadVisitorHistory(a.content,
					function () {
						c.removeClass("loading disabled");
						a.set("isLoading", !1)
					})
			});
			this.$().delegate(".next-property-history-list", "click.nextHistory", function () {
				var c = $(this);
				a.set("isLoading", !0);
				c.addClass("loading disabled");
				a.propertyHistory.nextList();
				a.loadPropertyHistory(null, function () {
					c.removeClass("loading disabled")
				})
			});
			this.$().delegate(".prev-property-history-list", "click.nextHistory", function () {
				var c = $(this);
				a.set("isLoading", !0);
				c.addClass("loading disabled");
				a.propertyHistory.previousList();
				a.loadPropertyHistory(null, function () {
					c.removeClass("loading disabled")
				})
			});
			this.$(".view-visitor-history").click(function () {
				a.$(".view-property-history").removeClass("active");
				a.$(".property-history").addClass("hidden");
				$(this).addClass("active");
				a.$(".visitor-history").removeClass("hidden")
			});
			this.$(".view-property-history").click(function () {
				a.$(".view-visitor-history").removeClass("active");
				a.$(".visitor-history").addClass("hidden");
				$(this).addClass("active");
				a.$(".property-history").removeClass("hidden");
				a.loadPropertyHistory()
			});
			this.$().delegate(".openPropertyHistoryFilter", "click", function (a) {
				$(this).parent().toggleClass("open")
			});
			this.$().delegate(".search-text", "focus", function (c) {
				a.$("#property-selected-name").addClass("focus")
			});
			this.$().delegate(".search-text", "blur", function (c) {
				a.$("#property-selected-name").removeClass("focus")
			});
			this.$(".tags").tagsinput({
				typeaheadjs: {
					source: c, highlight: !0, displayText: function (a) {
						return a || ""
					}
				}, freeInput: !0, maxChars: 255
			});
			this.$(".tags").tagsinput("input").on("blur",
				function () {
					a.$(".tags").tagsinput("add", $(this).val());
					$(this).val("")
				});
			this.$(".tags").tagsinput("input").on("keydown", function (c) {
				if (13 === c.keyCode) return a.$(".tags").tagsinput("add", $(this).val()), $(this).val(""), !1
			});
			this.$(".from-date").datepicker({
				dateFormat: "dd/mm/yy",
				prevText: '<i class="fa fa-chevron-left"></i>',
				nextText: '<i class="fa fa-chevron-right"></i>',
				onSelect: function (c) {
					a.$(".to-date").datepicker("option", "minDate", c)
				}
			});
			this.$(".to-date").datepicker({
				dateFormat: "dd/mm/yy", prevText: '<i class="fa fa-chevron-left"></i>',
				nextText: '<i class="fa fa-chevron-right"></i>', onSelect: function (c) {
					a.$(".from-date").datepicker("option", "maxDate", c)
				}
			});
			this.$(".closePropertyHistoryFilter").click(function (c) {
				c.stopPropagation();
				a.manualCloseFilter();
				return !1
			});
			this.$(".resetPropertyHistoryFilter").click(function () {
				a.$(".search-text").val("");
				a.$(".assignee").val("0");
				a.$(".from-date").val("");
				a.$(".to-date").val("");
				a.$(".min-messages").val("");
				a.$(".search").trigger("click");
				return !1
			});
			this.$(".search").click(function () {
				var c,
					b = {
						query: a.$(".search-text").val() || "",
						startDate: a.$(".from-date").val() || "",
						endDate: a.$(".to-date").val() || "",
						messageCount: a.$(".min-messages").val() || "",
						tags: a.$(".tags").tagsinput("items")
					};
				b.tags.length || (b.tags = "");
				c = a.$(".assignee option:selected");
				b.assigneeId = c.val();
				a.set("propertyHistoryQuery", b);
				a.propertyHistory.startList();
				a.loadPropertyHistory(b, function () {
					a.manualCloseFilter()
				});
				return !1
			});
			this.$().delegate(".open-subview", "click", function () {
				a.$().addClass("in-sub-view")
			})
		},
		handleOpenTranscript: function (a,
		                                c) {
			var d = this;
			this.$(".history-list").addClass("hidden");
			this.$(".transcript-view-container").removeClass("hidden");
			this.transcriptView ? this.transcriptView.set("isLoading", !0) : (this.set("transcriptView", Tawk.VisitorInnerTranscriptView.create({
				isLoading: !0,
				closeFunction: function () {
					d.$(".history-list").removeClass("hidden");
					d.$(".transcript-view-container").addClass("hidden")
				}
			})), this.transcriptView.appendTo(this.$(".transcript-view-container")));
			Tawk.conversationsController.openHistoryTranscript(a,
				this.content.pgid, function (a, c) {
					d.transcriptView.set("isLoading", !1);
					a ? d.transcriptView.set("transcriptError", !0) : d.transcriptView.setProperties({
						transcriptError: !1,
						transcriptData: c
					})
				})
		},
		currentPropertyHistoryList: function () {
			return null === this.propertyHistory ? [] : this.propertyHistory.currentData.slice(this.propertyHistory.currentHead, this.propertyHistory.to)
		}.property("propertyHistory.currentData.length"),
		loadPropertyHistory: function (a, c) {
			var d = this, b = {};
			c = c || function () {
			};
			this.propertyHistoryQuery &&
			(b = {
				query: this.propertyHistoryQuery.query,
				startDate: this.propertyHistoryQuery.startDate,
				endDate: this.propertyHistoryQuery.endDate,
				messageCount: this.propertyHistoryQuery.messageCount,
				tags: this.propertyHistoryQuery.tags,
				assigneeId: this.propertyHistoryQuery.assigneeId
			});
			b.size = 15;
			b.from = this.propertyHistory ? this.propertyHistory.currentHead : 0;
			null === this.propertyHistory ? (this.set("isLoading", !0), this.set("propertyHistory", Tawk.PagingListModel.create({perpage: 15})), this.propertyHistory.startList(), Tawk.visitorChatController.loadPropertyHistory(this.content.pgid,
				b, function (a, b) {
					d.set("isLoading", !1);
					a || (d.propertyHistory.setTotal(b.total), d.propertyHistory.setList(b.list));
					c()
				})) : Tawk.visitorChatController.loadPropertyHistory(this.content.pgid, b, function (a, b) {
				d.set("isLoading", !1);
				a || (d.propertyHistory.setTotal(b.total), d.propertyHistory.setList(b.list));
				c()
			})
		},
		manualCloseFilter: function () {
			this.$(".dropdown-menu-container").removeClass("open")
		},
		currentHistoryList: function () {
			return this.content.historyList && this.content.historyList.currentData.length ? this.content.historyList.currentData.slice(this.content.historyList.currentHead,
				this.content.historyList.to) : []
		}.property("content.historyList.currentData.length"),
		willDestroyElement: function () {
			this.transcriptView && (this.transcriptView.remove(), this.set("transcriptView", null))
		}
	});
Tawk.VisitorShortcutsListView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorShortcutsListView,
	classNames: ["chat-shortcuts-list"],
	isLoading: null,
	propertyShortcuts: null,
	shortcutFormOptions: [],
	isShortcutFormLoading: !1,
	activeShortcut: null,
	shortcuts: null,
	didInsertElement: function () {
		var a = this;
		this.getAllShortcutsForProperty("");
		this.resizeShortcutSearchbar();
		this.$().delegate(".clean-filter-shortcuts", "click", function () {
			a.$(".filter-shortcuts").val("");
			a.getAllShortcutsForProperty("")
		});
		this.$().delegate(".filter-shortcuts", "keyup", throttle(function (c) {
			var d = $(this).val(), b = 8 === c.keyCode || 46 === c.keyCode;
			(1 === c.key.length || b) && a.getAllShortcutsForProperty(d.trim())
		}, 50));
		this.$().delegate(".next-shortcut", "click", function () {
			a.propertyShortcuts && a.propertyShortcuts.get("hasNext") && a.propertyShortcuts.nextList()
		});
		this.$().delegate(".prev-shortcut",
			"click", function () {
				a.propertyShortcuts && a.propertyShortcuts.get("hasPrevious") && a.propertyShortcuts.previousList()
			});
		this.$().delegate(".tab-select-shortcut", "click", function () {
			var c = $(this).attr("data-id");
			(c = a.propertyShortcuts.getItem(c)) && a.autoPopulateInput(c.plainText + "\n" + c.options)
		});
		this.$().delegate(".edit-shortcut", "click", function (c) {
			var d = $(this).attr("data-id");
			if (d = a.propertyShortcuts.getItem(d)) {
				c.stopPropagation();
				c.preventDefault();
				c = d.options.split("[option] ");
				d.shortcutType = d.options.length ?
					"s" : "m";
				d.optionsList = [];
				d.isPublicShortcut = "public" === d.dataType;
				d.isPersonalShortcut = "personal" === d.dataType;
				d.isMessageShortcut = "m" === d.shortcutType;
				d.isSurveyShortcut = "s" === d.shortcutType;
				for (var b = 0; b < d.options; b++) c[b].length && d.optionsList.pushObject({
					id: Date.now(),
					val: c[b].replace(/[\n\r]+/g, "")
				});
				a.set("activeShortcut", d);
				a.$(".shortcut-list-container").addClass("hidden");
				a.$(".shortcut-form").removeClass("hidden")
			}
		});
		this.$().delegate(".show-shortcut-form button", "click", function () {
			var c =
				Tawk.ShortcutModel.create({options: [], isPublicShortcut: !0, isMessageShortcut: !0});
			a.set("activeShortcut", c);
			a.$(".details-container.shortcuts-view").toggleClass("show-form")
		});
		this.$().delegate("#cancel-form, .back-to-main-view", "click", function () {
			a.$(".details-container.shortcuts-view").toggleClass("show-form");
			a.resetShortcutForm();
			a.feedShortcutTooltips()
		});
		this.$().delegate('input[name="access-type"], #shortcutKey', "change", function () {
			a.$("#shortcutKey").removeClass("shortcut_exist")
		});
		this.$().delegate('input[name="shortcut-type"]',
			"change", function () {
				"s" !== $(this).val() || a.activeShortcut.optionsList.length || a.activeShortcut.optionsList.pushObject({
					val: "",
					id: Date.now()
				})
			});
		this.$().delegate("#add-shortcut-option", "click", function () {
			a.activeShortcut.optionsList.pushObject({val: "", id: Date.now()})
		});
		this.$().delegate(".delete-option", "click", function () {
			var c = $("input.shortcut-option").index($(this).nextAll("input"));
			0 > c || 3 < c || a.activeShortcut.optionsList.removeAt(c)
		});
		this.$(".shortcut-form").validate({
			errorPlacement: function (a,
			                          d) {
				a.insertAfter(d.parent())
			}, submitHandler: function () {
				var c = {
					key: a.$("#shortcutKey").val(),
					message: a.$("#message").val(),
					dataType: a.$('input[name ="access-type"]:checked').val(),
					options: [],
					pageId: a.propertyId,
					shortcutId: a.activeShortcut.shortcutId || null,
					previousValues: null
				};
				a.set("isShortcutFormLoading", !0);
				a.$("input.shortcut-option").each(function () {
					var a = $(this).val().trim();
					a && c.options.push(a)
				});
				c.type = 0 < c.options.length ? "s" : "m";
				!c.shortcutId || a.activeShortcut.dataType === c.dataType && a.activeShortcut.keyPlaintext ===
				c.key || (c.previousValues = {
					pageId: a.propertyId,
					dataType: a.activeShortcut.dataType,
					key: a.activeShortcut.keyPlaintext
				});
				Tawk.shortcutsController.submitShortcutSave(c, function (d, b) {
					d ? "DUPLICATE_SHORTCUT_KEY" === d ? ($.validator.messages.shortcut_exist = $.validator.format(languageParser.translate("form_validation_messages", "shortcut_exist", {
						siteName: Tawk.webProperties.getProperty(a.propertyId).propertyName,
						access: c.dataType
					})), a.$("#shortcutKey").addClass("shortcut_exist"), a.$(".shortcut-form").valid(), a.set("isShortcutFormLoading",
						!1)) : (a.set("isShortcutFormLoading", !1), errorSave(a.$(".shortcut-form"))) : (a.activeShortcut.setProperties({
						shortcutId: b,
						dataType: c.dataType,
						keyPlaintext: c.key
					}), a.getAllShortcutsForProperty(a.$(".filter-shortcuts").val().trim(), !0), successSave(a.$(".shortcut-form")), a.set("isShortcutFormLoading", !1))
				});
				return !1
			}
		});
		this.$(".open-shortcut-form").click(function () {
			a.$(".shortcut-list-container").addClass("hidden");
			a.$(".shortcut-form").removeClass("hidden")
		});
		this.$().delegate(".back-to-main-view", "click",
			function () {
				a.$(".shortcut-list-container").removeClass("hidden");
				a.$(".shortcut-form").addClass("hidden")
			});
		this.$().resize(function (c) {
			a.resizeShortcutSearchbar()
		});
		this.$().delegate(".expand-message", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			$(this).parent().siblings(".hidden").removeClass("hidden");
			$(this).parent().addClass("hidden")
		});
		this.$().delegate(".compress-message", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			$(this).parent().siblings(".hidden").removeClass("hidden");
			$(this).parent().addClass("hidden")
		})
	},
	willDestroyElement: function () {
		this.activeShortcut && this.activeShortcut.destroy()
	},
	getAllShortcutsForProperty: function (a, c) {
		var d = [];
		this.propertyShortcuts ? this.propertyShortcuts.reset() : this.set("propertyShortcuts", Tawk.PagingListModel.create({perpage: 20}));
		(null === this.shortcuts || c) && this.set("shortcuts", visitorUtils.getShortcuts(this.propertyId));
		this.shortcuts.length && (d = a ? visitorUtils.filterShortcutsSuggestions(this.shortcuts, a, !0, !0) : this.shortcuts);
		this.propertyShortcuts.startList();
		this.propertyShortcuts.setTotal(d.length);
		this.propertyShortcuts.setList(d)
	},
	pagedShortcutsList: function () {
		return this.propertyShortcuts ? this.propertyShortcuts.currentData.slice(this.propertyShortcuts.currentHead, this.propertyShortcuts.to) : []
	}.property("propertyShortcuts.currentData", "propertyShortcuts.to"),
	feedShortcutTooltips: function () {
		var a = this;
		setTimeout(function () {
			a.$(".tab-select-shortcut:last .expand-message").length && 2 < a.$(".tab-select-shortcut .tooltip-hover").length && a.$(".tab-select-shortcut:last .tooltip-hover").tooltip();
			a.$(".tab-select-shortcut .tooltip-hover").tooltip({placement: "bottom"})
		}, 0)
	}.observes("propertyShortcuts"),
	resetShortcutForm: function () {
		this.set("isShortcutFormLoading", !1);
		this.set("activeShortcut", null);
		this.$(".shortcut-form")[0].reset()
	},
	resizeShortcutSearchbar: function () {
		var a = this.$(".search-shortcuts-container label.input"), c = this.$();
		a.css("width", c.width() - 113 + "px")
	}
});
Tawk.VisitorKBListView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorKBListView, classNames: ["chat-kb-list"], isLoading: null,
	didInsertElement: function () {
		var a = this;
		this.set("isLoading", !0);
		visitorUtils.loadKBData(this, this.propertyId, function () {
			a.set("isLoading", !1)
		});
		this.$().delegate(".view-kb", "click", function () {
			var c = $(this).attr("data-id");
			socketConnector.getKBContent(a.propertyId, c, function (c, b) {
				c || (b.content = markdownConverter.makeHtml(encodeStr(b.content)), a.$(".chat-details-container .details-container.knowledgebase-view:not(.in-sub-view)").addClass("in-sub-view"), a.$(".chat-details-container:not(.in-sub-view)").addClass("in-sub-view"),
					a.set("kbContent", b), a.$(".kb-list").addClass("hidden"), a.$(".kb-view").removeClass("hidden"), a.$(".section-header").show())
			})
		});
		this.$().delegate(" .back-to-main-view", "click", function () {
			a.set("kbContent", null);
			a.$(".kb-list").removeClass("hidden");
			a.$(".kb-view").addClass("hidden");
			a.$(".section-header").hide()
		});
		this.$().delegate(".clean-filter-kb", "click", function () {
			visitorUtils.loadKBList(a, a.propertyId, null, !0, function (c) {
				c || a.$(".search-kb-text").val("")
			});
			return !1
		});
		this.$().delegate(".search-kb",
			"submit", function () {
				visitorUtils.loadKBList(a, a.propertyId, null, !1);
				return !1
			});
		this.$().delegate(".search-kb-category", "change", function () {
			visitorUtils.loadKBList(a, a.propertyId, null, !1);
			return !1
		});
		this.$().delegate(".next-kb", "click", function () {
			visitorUtils.loadKBList(a, a.propertyId, 1, !1)
		});
		this.$().delegate(".prev-kb", "click", function () {
			visitorUtils.loadKBList(a, a.propertyId, -1, !1)
		})
	}
});
Tawk.ShopifyInnerDataView = Ember.View.extend({template: Ember.TEMPLATES.visitorShopifyInnerDataView});
Ember.Handlebars.helper("ShopifyInnerDataView",
	Tawk.ShopifyInnerDataView);
Tawk.ShopifyEditSettingsView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorShopifySettingEdit, classNames: "inner-list", didInsertElement: function () {
		var a = this;
		this.$().hide();
		this.$().delegate(".field-selection", "change", function () {
			var c, d = $(this).is(":checked"), b = $(this).attr("data-id");
			if (c = a.content.fields.findProperty("label", b)) c.enabled = d, c.fields && c.fields.length && (c = $(this).parents("#" + b), c.length && (d ? (c.find(".inner-list .input").removeClass("disabled"), c.find(".inner-list .checkbox").removeClass("disabled"),
				c.find(".inner-list .field-selection").removeAttr("disabled"), c.find(".inner-list .field-header").removeAttr("readonly"), c.find(".sortable-list").sortable("enable")) : (c.find(".inner-list .input").addClass("disabled"), c.find(".inner-list .checkbox").addClass("disabled"), c.find(".inner-list .field-selection").attr("disabled", "disabled"), c.find(".inner-list .field-header").attr("readonly", "readonly"), c.find(".sortable-list").sortable("disable"))))
		})
	}
});
Ember.Handlebars.helper("ShopifyEditSettingsView",
	Tawk.ShopifyEditSettingsView);
Tawk.RefundOrder = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.refundOrder, classNames: ["modal", "refund-modal"], didInsertElement: function () {
		var a, c = this, d = [];
		this._super();
		this.order.line_items.forEach(function (a) {
			d.pushObject({
				id: a.id,
				quantity: a.quantity,
				name: a.name,
				price: a.price,
				refundAmount: "0.00",
				selectedQuantity: 0
			})
		});
		this.set("lineItems", d);
		this.order.refunds.forEach(function (a) {
			a.refund_line_items.forEach(function (a) {
				if (a = c.lineItems.findProperty("id",
						a.line_item_id)) a.isRefunded = !0
			})
		});
		setTimeout(function () {
			c.resizeView();
			c.$(".spinner").spinner({
				stop: function (a, d) {
					var f = parseInt($(this).attr("id"), 10);
					if (f = c.lineItems.findProperty("id", f)) f.selectedQuantity = parseInt($(this).spinner("value"));
					c.getRefundCalculation()
				}
			})
		});
		this.getRefundCalculation();
		this.$().delegate(".shipping-refund", "keydown", function () {
			a = $(this).val()
		});
		this.$().delegate(".shipping-refund", "keyup", throttle(function () {
				a !== $(this).val() && (a = $(this).val(), c.getRefundCalculation())
			},
			50));
		this.$().delegate(".refund-amount", "keyup", throttle(function () {
			var a = parseFloat($(this).val()).toFixed(2);
			a !== c.calculatedAmount ? c.set("hasDiscrepancy", !0) : c.set("hasDiscrepancy", !1);
			0 === parseInt(c.calculatedAmount, 10) && 0 === parseInt(a, 10) ? c.$(".proceed-refund").attr("disabled", "disabled") : c.$(".proceed-refund").removeAttr("disabled")
		}, 50));
		this.$().delegate(".proceed-refund", "click", function () {
			var a = {
				propertyId: c.propertyId,
				orderId: c.order.id,
				restock: !1,
				shipping: {amount: 0},
				refundLineItems: [],
				transactions: []
			};
			c.$(".restock-items").length && (a.restock = c.$(".restock-items").is(":checked"));
			c.$(".discrepancy-reason").length && (a.discrepancyReason = c.$(".discrepancy-reason").val());
			a.notify = c.$(".notify-customer").is(":checked");
			a.note = c.$(".refund-reason").text();
			c.$(".shipping-refund").length && (a.shipping.amount = parseFloat(c.$(".shipping-refund").val()));
			c.lineItems.forEach(function (c) {
				0 !== c.selectedQuantity && a.refundLineItems.push({lineItemId: c.id, quantity: c.selectedQuantity})
			});
			c.gateways.forEach(function (c) {
				a.transactions.push({
					parentId: c.parentId,
					gateway: c.type, amount: parseFloat(c.amount)
				})
			});
			socketConnector.refundOrder(a, function (a) {
				a ? (a = "NotFound" === a.code && "integration" === a.message ? languageParser.translate("conversations", "shopify_not_available") : "InternalServerError" === a.code ? languageParser.translate("generic", "internal_server_error") : "UnauthorizedError" === a.code ? languageParser.translate("generic", "unauthorized_error") : languageParser.translate("conversations", "refund_order_error"), errorSave(c.$(".modal-footer"), a)) : c.closeCallback(languageParser.translate("conversations",
					"refund_order_success", {orderName: c.order.name}))
			})
		})
	}, getRefundCalculation: function () {
		var a = 0, c = this,
			d = {propertyId: this.propertyId, orderId: this.order.id, shipping: {amount: 0}, refundLineItems: []};
		if (this.$(".shipping-refund").length && (d.shipping.amount = parseFloat(this.$(".shipping-refund").val()), d.shipping.amount > parseFloat(c.shippingRefund))) {
			errorSave(c.$(".modal-footer"), "The specified shipping amount is greater than the allowed value.");
			return
		}
		this.lineItems.forEach(function (a) {
			0 !== a.selectedQuantity &&
			d.refundLineItems.push({lineItemId: a.id, quantity: a.selectedQuantity});
			a.refundAmount = "0.00"
		});
		this.set("isCalculating", !0);
		socketConnector.calculateOrderRefund(d, function (b, d) {
			var f = 0, g = 0, h = 0, k = 0, l = [];
			c.set("isCalculating", !1);
			d.data.refund.transactions.forEach(function (a) {
				f += parseFloat(a.maximum_refundable);
				l.pushObject({
					type: a.gateway,
					maximumAmount: a.maximum_refundable,
					amount: a.amount,
					parentId: a.parent_id
				});
				g += parseFloat(a.amount)
			});
			d.data.refund.refund_line_items.forEach(function (b) {
				var d = c.lineItems.findProperty("id",
					b.line_item_id);
				d && (d.refundAmount = parseFloat(b.subtotal), k += d.refundAmount, h += parseFloat(b.total_tax));
				a += b.quantity
			});
			d.data.refund.shipping && "0.00" !== d.data.refund.shipping.maximum_refundable && c.set("shippingRefund", d.data.refund.shipping.maximum_refundable);
			c.set("totalRefundValue", f.toFixed(2));
			c.set("subTotal", k.toFixed(2));
			c.set("totalTax", h.toFixed(2));
			c.set("gateways", l);
			c.set("calculatedAmount", g.toFixed(2));
			c.set("hasDiscrepancy", !1);
			c.set("refundQuantity", a);
			0 === g ? c.$(".proceed-refund").attr("disabled",
				"disabled") : c.$(".proceed-refund").removeAttr("disabled")
		})
	}, refundQuantityText: function () {
		return languageParser.translate("visitors", "restock_items", {num: this.refundQuantity})
	}.property("refundQuantity")
});
Tawk.CancelOrder = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.cancelOrder, classNames: ["modal", "refund-modal"], didInsertElement: function () {
		var a, c = this, d = [];
		this._super();
		this.order.line_items.forEach(function (a) {
			d.pushObject({
				id: a.id, quantity: a.quantity, name: a.name, price: a.price,
				refundAmount: "0.00", selectedQuantity: a.quantity
			})
		});
		this.set("lineItems", d);
		this.order.refunds.forEach(function (a) {
			a.refund_line_items.forEach(function (a) {
				if (a = c.lineItems.findProperty("id", a.line_item_id)) a.isRefunded = !0
			})
		});
		setTimeout(function () {
			c.resizeView();
			c.$(".spinner").spinner({
				stop: function (a, d) {
					var f = parseInt($(this).attr("id"), 10);
					if (f = c.lineItems.findProperty("id", f)) f.selectedQuantity = parseInt($(this).spinner("value"));
					c.getRefundCalculation()
				}
			})
		});
		this.getRefundCalculation();
		this.$().delegate(".shipping-refund",
			"keydown", function () {
				a = $(this).val()
			});
		this.$().delegate(".shipping-refund", "keyup", throttle(function () {
			a !== $(this).val() && (a = $(this).val(), c.getRefundCalculation())
		}, 50));
		this.$().delegate(".refund-amount", "keyup", throttle(function () {
				var a = parseFloat($(this).val()).toFixed(2);
				a !== c.calculatedAmount ? c.set("hasDiscrepancy", !0) : c.set("hasDiscrepancy", !1);
				0 === parseInt(c.calculatedAmount, 10) && 0 === parseInt(a, 10) ? c.$(".proceed-refund").attr("disabled", "disabled") : c.$(".proceed-refund").removeAttr("disabled")
			},
			50));
		this.$().delegate(".proceed-cancel", "click", function () {
			var a = {
				propertyId: c.propertyId,
				orderId: c.order.id,
				restock: !1,
				refund: {shipping: {amount: 0}, refundLineItems: [], transactions: [], restock: !1}
			};
			c.$(".restock-items").length && (a.refund.restock = c.$(".restock-items").is(":checked"), a.restock = a.refund.restock);
			c.$(".discrepancy-reason").length && (a.refund.discrepancyReason = c.$(".discrepancy-reason").val());
			a.email = c.$(".notify-customer").is(":checked");
			a.reason = c.$(".cancel-reason").val();
			a.refund.notify =
				a.email;
			c.$(".shipping-refund").length && (a.refund.shipping.amount = parseFloat(c.$(".shipping-refund").val()));
			c.lineItems.forEach(function (c) {
				0 !== c.selectedQuantity && a.refund.refundLineItems.push({
					lineItemId: c.id,
					quantity: c.selectedQuantity
				})
			});
			c.gateways.forEach(function (c) {
				a.refund.transactions.push({parentId: c.parentId, gateway: c.type, amount: parseFloat(c.amount)})
			});
			socketConnector.cancelOrder(a, function (a) {
				a ? (a = "NotFound" === a.code && "integration" === a.message ? "Shopify integration is not available for this property." :
					"InternalServerError" === a.code ? "Server is unavailable. Please try again." : "UnauthorizedError" === a.code ? "You do not have access to perform this action." : "Unable to cancel this order. Please try again", errorSave(c.$(".modal-footer"), a)) : c.closeCallback("Successfully canceled order " + c.order.name)
			})
		})
	}, getRefundCalculation: function () {
		var a = 0, c = this,
			d = {propertyId: this.propertyId, orderId: this.order.id, shipping: {amount: 0}, refundLineItems: []};
		if (this.$(".shipping-refund").length && (d.shipping.amount = parseFloat(this.$(".shipping-refund").val()),
			d.shipping.amount > parseFloat(c.shippingRefund))) {
			errorSave(c.$(".modal-footer"), "The specified shipping amount is greater than the allowed value.");
			return
		}
		this.lineItems.forEach(function (a) {
			0 !== a.selectedQuantity && d.refundLineItems.push({lineItemId: a.id, quantity: a.selectedQuantity});
			a.refundAmount = "0.00"
		});
		this.set("isCalculating", !0);
		socketConnector.calculateOrderRefund(d, function (b, d) {
			var f = 0, g = 0, h = 0, k = 0, l = [];
			c.set("isCalculating", !1);
			d.data.refund.transactions.forEach(function (a) {
				f += parseFloat(a.maximum_refundable);
				l.pushObject({
					type: a.gateway,
					maximumAmount: a.maximum_refundable,
					amount: a.amount,
					parentId: a.parent_id
				});
				g += parseFloat(a.amount)
			});
			d.data.refund.refund_line_items.forEach(function (b) {
				var d = c.lineItems.findProperty("id", b.line_item_id);
				d && (d.refundAmount = parseFloat(b.subtotal), k += d.refundAmount, h += parseFloat(b.total_tax));
				a += b.quantity
			});
			d.data.refund.shipping && "0.00" !== d.data.refund.shipping.maximum_refundable && c.set("shippingRefund", d.data.refund.shipping.maximum_refundable);
			c.set("totalRefundValue",
				f.toFixed(2));
			c.set("subTotal", k.toFixed(2));
			c.set("totalTax", h.toFixed(2));
			c.set("gateways", l);
			c.set("calculatedAmount", g.toFixed(2));
			c.set("hasDiscrepancy", !1);
			c.set("refundQuantity", a);
			0 === g ? c.$(".proceed-refund").attr("disabled", "disabled") : c.$(".proceed-refund").removeAttr("disabled")
		})
	}, refundQuantityText: function () {
		return languageParser.translate("visitors", "restock_items", {num: this.refundQuantity})
	}.property("refundQuantity")
});
Tawk.DuplicateOrder = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.duplicateOrder,
	classNames: ["modal"], didInsertElement: function () {
		var a = this;
		this._super();
		this.$().delegate(".submit-form", "click", function () {
			var c = {
				propertyId: a.propertyId,
				orderId: a.id,
				receipt: a.$(".send-receipt").is(":checked"),
				fufillmentReceipt: a.$(".send-fullfillment").is(":checked"),
				status: "same" === a.$(".payment-status").val() ? void 0 : a.$(".payment-status").val(),
				inventory: a.$(".inventory-status").val()
			};
			socketConnector.duplicateOrder(c, function (c, b) {
				var e;
				c ? (e = "NotFound" === c.code && "integration" === c.message ?
					languageParser.translate("conversations", "shopify_not_available") : "NotFound" === c.code && "order" === c.message ? "Specified order to be duplicated was not found." : "Unable to duplicate order. Please try again", errorSave(a.$(".modal-footer"), e)) : a.closeCallback("Successfully created a new order : " + b.data.order.name)
			});
			return !1
		})
	}
});
Tawk.ShopifyDataView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorShopifyView,
	classNames: ["visitor-shopify-view"],
	isLoading: null,
	isEdit: !1,
	currentOrderCount: 0,
	orderValues: null,
	ordersRaw: null,
	didInsertElement: function () {
		var a = this, c = Tawk.webProperties.getProperty(this.propertyId);
		c && c.isAdmin ? this.set("isAdminAgent", !0) : this.set("isAdminAgent", !1);
		this.loadSettings();
		this.$().delegate(".edit-fields", "click", function () {
			a.formatEditFields();
			a.initSortable();
			a.set("isEdit", !0);
			return !1
		});
		this.$().delegate(".customer-select", "change", function () {
			var c = $(this).is(":checked");
			a.customerSettings.set("enabled", c);
			a.$(".sortable-list").sortable({containment: "parent", placeholder: "tab-sort-placeholder"})
		});
		this.$().delegate(".order-select", "change", function () {
			var c = $(this).is(":checked");
			a.orderSettings.set("enabled", c);
			a.$(".sortable-list").sortable({containment: "parent", placeholder: "tab-sort-placeholder"})
		});
		this.$().delegate(".cancel-edit", "click", function () {
			a.set("isEdit", !1);
			a.set("customerSettings", null);
			a.set("orderSettings", null)
		});
		this.$().delegate(".expand-list", "click", function () {
			var a = $(this).attr("data-id");
			(parent = $(this).parents("#" + a)) && parent.find(".inner-list").first().show();
			$(this).addClass("collapse-list").removeClass("expand-list");
			$(this).html('<i class="fa fa-lg fa-chevron-circle-up"></i>')
		});
		this.$().delegate(".collapse-list", "click", function () {
			var a = $(this).attr("data-id");
			(parent = $(this).parents("#" + a)) && parent.find(".inner-list").first().hide();
			$(this).addClass("expand-list").removeClass("collapse-list");
			$(this).html('<i class="fa fa-lg fa-chevron-circle-down"></i>')
		});
		a.$(".search-shopify").submit(function () {
			a.loadVisitorData();
			return !1
		});
		this.$().delegate(".clean-search-shopify", "click", function () {
			a.$(".search-query").val("");
			a.loadVisitorData(!0);
			return !1
		});
		this.$(".search-query").on("keyup", function () {
			$(this).val() ? a.$(".clean-search-shopify").removeClass("hidden") : a.$(".clean-search-shopify").addClass("hidden")
		});
		this.$().delegate(".refund_order", "click", function () {
			var c, b, e = $(this).attr("data-id");
			(e = a.orderValues.findProperty("mainId", e)) ? c = a.ordersRaw.findProperty("id", e.id) : errorSave(a.$(), languageParser.translate("conversations", "order_not_found"));
			c ? (b = Tawk.RefundOrder.create({
				order: c, propertyId: a.propertyId,
				closeCallback: function (c) {
					b.remove();
					c && (successSave(a.$(), c), a.loadVisitorData())
				}
			}), b.append()) : errorSave(a.$(), "Unable to find order")
		});
		this.$().delegate(".duplicate_order", "click", function () {
			var c = $(this).attr("data-id"), c = a.orderValues.findProperty("mainId", c),
				b = Tawk.DuplicateOrder.create({
					order_number: c.order_number,
					id: c.id,
					propertyId: a.propertyId,
					closeCallback: function (c) {
						b.remove();
						c && (successSave(a.$(), c), a.loadVisitorData())
					}
				});
			b.append()
		});
		this.$().delegate(".cancel_order", "click", function () {
			var c,
				b, e = $(this).attr("data-id");
			(e = a.orderValues.findProperty("mainId", e)) ? c = a.ordersRaw.findProperty("id", e.id) : errorSave(a.$(), languageParser.translate("conversations", "order_not_found"));
			c ? (b = Tawk.CancelOrder.create({
				order: c, propertyId: a.propertyId, closeCallback: function (c) {
					b.remove();
					c && (successSave(a.$(), c), a.loadVisitorData())
				}
			}), b.append()) : errorSave(a.$(), languageParser.translate("conversations", "order_not_found"))
		});
		this.$().delegate(".save-edit", "click", function () {
			var c = {};
			c.customer = a.settings.customerSettings;
			c.order = a.settings.orderSettings;
			c.customer.enabled = a.customerSettings.enabled;
			c.order.enabled = a.orderSettings.enabled;
			a.set("isLoading", !0);
			Tawk.webProperties.saveShopifyConfig(a.propertyId, c, function (b, e) {
				b ? (errorSave(a.$(".form-footer")), a.set("isLoading", !1)) : (successSave(a.$(".form-footer")), a.set("settings", {
					customerSettings: c.customer,
					orderSettings: c.order,
					version: e
				}), a.loadVisitorData())
			})
		});
		this.$().delegate(".field-header", "change", function () {
			var c = $(this).attr("name");
			"order" === c ? a.set("settings.orderSettings.header",
				$(this).val()) : "customer" === c && a.set("settings.customerSettings.header", $(this).val())
		});
		this.$().delegate(".load-orders", "click", function () {
			var c = $(this);
			c.attr("disabled", "disabled").html('<i class="fa fa-refresh fa-spin"></i>');
			a.loadMoreOrders(function () {
				c.removeAttr("disabled").html(languageParser.translate("conversations", "load_orders"))
			})
		});
		this.$().delegate(".edit-shipping-address", "click", function () {
			a.$(".edit-view").removeClass("hidden");
			a.$(".content-view").addClass("hidden");
			$(this).prev().hasClass("collapsed") &&
			$(this).prev().click()
		});
		this.$().delegate(".cancel-address-edit", "click", function () {
			a.$(".edit-view").addClass("hidden");
			a.$(".content-view").removeClass("hidden");
			return !1
		})
	},
	loadSettings: function () {
		var a = this;
		this.set("isLoading", !0);
		Tawk.webProperties.getShopifySettings(this.propertyId, function (c, d) {
			c ? a.set("isLoading", !1) : (a.set("settings", {
				customerSettings: d.customerSettings,
				orderSettings: d.orderSettings,
				version: d.configVersion
			}), a.loadVisitorData())
		})
	},
	loadVisitorData: function () {
		var a = this,
			c = this.$(".search-query").val();
		this.set("isLoading", !0);
		if (!c && !this.email) return this.orderValues ? this.orderValues.clear() : this.set("orderValues", []), this.set("customerValues", null), this.set("emptyResults", !1), this.set("showImage", !0), this.set("isLoading", !1);
		Tawk.conversationsController.getVisitorShopifyData(this.propertyId, c || this.email, !1, function (d, b) {
			a.set("isLoading", !1);
			!d && b.data && (null === b.data.customer && 0 === b.data.orders.length ? (c && a.set("emptyResults", !0), a.set("showImage", !0)) : (a.set("emptyResults",
				!1), a.set("showImage", !1)), b.data.shop && a.set("shopName", b.data.shop), b.data.customer && (a.settings.customerSettings.enabled ? a.setCustomerValues(b.data.customer) : a.set("customerValues", null), a.set("totalOrders", b.data.customer.orders_count), a.set("customerId", b.data.customer.id)), a.set("currentPage", 1), a.orderValues ? a.orderValues.clear() : a.set("orderValues", []), b.data.orders && a.settings.orderSettings.enabled && a.setOrderValues(b.data.orders), a.set("ordersRaw", b.data.orders), setTimeout(function () {
				a.$(".shipping-address-form").validate({
					errorPlacement: function (a,
					                          b) {
						a.insertAfter(b.parent())
					}, submitHandler: function (b) {
						var c, d, h, k = {propertyId: a.propertyId}, l = $(b).parents(".main-tab").attr("id");
						d = $(b).parents(".inner-tab").attr("id");
						if (c = a.orderValues.findProperty("mainId", l)) return k.orderId = c.id, k.address1 = $(b).find(".address1").val(), k.address2 = $(b).find(".address2").val(), k.city = $(b).find(".city").val(), k.zip = $(b).find(".zip").val(), socketConnector.changeShippingAddress(k, function (k, l) {
							var p;
							if (k) p = "NotFound" === k.code && "integration" === k.message ? languageParser.translate("conversations",
								"shopify_not_available") : "InternalServerError" === k.code ? languageParser.translate("generic", "internal_server_error") : "UnauthorizedError" === k.code ? languageParser.translate("generic", "unauthorized_error") : languageParser.translate("conversations", "shipping_address_error"), errorSave($(b), p); else {
								p = c.fields.findProperty("id", d);
								p = c.fields.indexOf(p);
								var q = a.settings.orderSettings.fields.findProperty("label", "shipping_address");
								if (q) {
									var r = [];
									q.fields.forEach(function (a) {
										var b = l.data.order.shipping_address[a.label];
										a.enabled && void 0 !== b && r.pushObject({
											title: beautifyAPIKey(a.label),
											value: b
										})
									});
									h = a.orderValues.indexOf(c);
									a.orderValues.set(h + ".fields." + p + ".fields", r)
								}
								successSave($(b), languageParser.translate("conversations", "shipping_address_changed"))
							}
						}), !1;
						errorSave($(b), languageParser.translate("conversations", "order_not_found"))
					}
				})
			}))
		})
	},
	setCustomerValues: function (a) {
		var c, d = 0, b = this, e = [], f = Ember.Object.create(),
			g = Handlebars.compile("<span>" + this.settings.customerSettings.header + "</span>"),
			h = (new Date).getTime();
		this.settings.customerSettings.fields.forEach(function (f) {
			var g;
			f.enabled && (g = a[f.label], void 0 !== g && ("id" === f.label && (c = g), d++, Array.isArray(g) ? g.forEach(function (a, c) {
				e = b.processObjectData(f.label, a, h + d + "" + c, f, e)
			}) : e = b.processObjectData(f.label, g, h + d + "", f, e)))
		});
		f.set("fields", e);
		f.set("header", $(g(a)).html());
		f.set("mainId", h);
		f.set("mainIdHref", "#" + h);
		this.set("customerValues", f);
		this.set("customerUrl", "http://" + this.shopName + ".myshopify.com/admin/customers/" + c)
	},
	setOrderValues: function (a) {
		var c =
			this, d = [];
		a.forEach(function (a) {
			var e, f = "", g = 0, h = Ember.Object.create({fields: []}), k = (new Date).getTime(), l = !0, m = !0;
			c.settings.orderSettings.header && (e = c.settings.orderSettings.header, e = Handlebars.compile("<span>" + e + "</span>"));
			c.settings.orderSettings.fields.forEach(function (d) {
				var e;
				e = a[d.label];
				if ("id" === d.label) h.set(d.label, e); else if ("order_number" === d.label) h.set(d.label, e); else if ("financial_status" === d.label) {
					if (f = "paid" === e ? f + ('<span class="label label-success">' + beautifyAPIKey(e) + "</span>") :
							f + ('<span class="label label-warning">' + beautifyAPIKey(e) + "</span>"), "pending" === e || "refunded" === e) m = !1
				} else "gateway" !== d.label || e ? "cancelled_at" === d.label && null !== e && (l = !1, f += '<span class="label label-danger">Cancelled</span>') : m = !1;
				d.enabled && void 0 !== e && (g++, Array.isArray(e) ? 0 !== e.length && ("object" === typeof e[0] ? e.forEach(function (a, b) {
					h.fields = c.processObjectData(d.label, a, k + "" + g + "" + b, d, h.fields)
				}) : h.fields = c.processObjectData(d.label, e.join(", "), k + "" + g, d, h.fields)) : h.fields = c.processObjectData(d.label,
					e, k + "" + g, d, h.fields))
			});
			h.set("header", $(e(a)).html());
			h.set("orderUrl", "http://" + c.shopName + ".myshopify.com/admin/orders/" + h.id);
			h.set("mainId", "" + k);
			h.set("mainIdHref", "#" + k);
			h.set("canRefund", m);
			h.set("canCancel", l);
			f && h.fields.insertAt(0, {
				title: languageParser.translate("header", "status"),
				value: f,
				id: k + "-1"
			});
			d.pushObject(h)
		});
		this.orderValues.pushObjects(d);
		this.set("currentOrderCount", this.orderValues.length);
		setTimeout(function () {
			c.$(".tooltip-button").tooltip()
		})
	},
	processObjectData: function (a,
	                             c, d, b, e) {
		var f, g = {}, h = this;
		if (b && !b.enabled || void 0 === c) return e;
		if (b.fields) {
			if (Array.isArray(c)) return 0 === c.length ? e : "object" === typeof c[0] ? (c.forEach(function (c, k) {
				g = {id: d + k + a, fields: []};
				g.href = "#" + g.id;
				g.isInner = !0;
				b.header && (f = Handlebars.compile("<span>" + b.header + "</span>"), g.header = $(f(c)).html());
				for (var l = 0; l < b.fields.length; l++) {
					var q = b.fields[l];
					q.enabled && (g.fields = h.processObjectData(q.label, c[q.label], k + "" + l, q, g.fields))
				}
				e.push(g)
			}), e) : e = this.processObjectData(a, c.join(", "), d, b, e);
			g = {id: d + a, fields: []};
			g.href = "#" + g.id;
			g.isInner = !0;
			b.header && (f = Handlebars.compile("<span>" + b.header + "</span>"), g.header = $(f(c)).html());
			"shipping_address" === a && (g.isShippingAddress = !0);
			for (var k = 0; k < b.fields.length; k++) {
				var l = b.fields[k];
				l.enabled && (g.fields = this.processObjectData(l.label, c[l.label], k, l, g.fields))
			}
		} else g.title = beautifyAPIKey(a), g.value = this.parseValue(c);
		e.pushObject(g);
		return e
	},
	parseValue: function (a) {
		return a && moment(a, [moment.ISO_8601], !0).isValid() ? moment(a).format("DD/MMM/YYYY HH:mm") :
			a && "string" === typeof a ? conversationProcess.createUrl([a]) : null === a ? "-" : a
	},
	formatEditFields: function () {
		var a = this;
		this.set("customerSettings", Ember.Object.create({fields: []}));
		this.set("orderSettings", Ember.Object.create({fields: []}));
		this.settings.customerSettings.fields.forEach(function (c) {
			a.customerSettings.fields.pushObject(c)
		});
		this.settings.orderSettings.fields.forEach(function (c) {
			a.orderSettings.fields.pushObject(c)
		});
		this.customerSettings.set("header", this.settings.customerSettings.header);
		this.customerSettings.set("enabled", this.settings.customerSettings.enabled);
		this.customerSettings.set("label", this.settings.customerSettings.label);
		this.orderSettings.set("header", this.settings.orderSettings.header);
		this.orderSettings.set("enabled", this.settings.orderSettings.enabled);
		this.orderSettings.set("label", this.settings.orderSettings.label)
	},
	initSortable: function () {
		var a = this;
		setTimeout(function () {
			a.$(".sortable-list").sortable({
				containment: "parent", placeholder: "tab-sort-placeholder", cancel: "label",
				stop: function (c, d) {
					var b, e;
					e = $(d.item);
					itemId = e.attr("id");
					list = e.parent();
					currentPosition = list.children("li.field").index(e);
					ancestors = e.parents(".field");
					configType = $(e.parents(".config-type"));
					e = "customer-select" === configType.attr("id") ? a.settings.customerSettings : a.settings.orderSettings;
					if (ancestors.length) for (b = ancestors.length - 1; 0 <= b; b--) {
						var f = $(ancestors[b]).attr("id");
						e = e.fields.findProperty("label", f)
					}
					if (b = e.fields.findProperty("label", itemId)) e.fields.removeObject(b), e.fields.insertAt(currentPosition,
						b), a.initSortable()
				}
			})
		})
	},
	hasMoreOrders: function () {
		var a, c = !1, d = /^[#]{0,1}[0-9]{1,50}$/;
		if ("inDOM" === this._state) return (a = this.$(".search-query").val()) && d.test(a) && (c = !0), this.settings && this.settings.orderSettings.enabled && this.totalOrders > this.currentOrderCount && !c
	}.property("settings", "currentOrderCount", "totalOrders"),
	loadMoreOrders: function (a) {
		var c = this;
		socketConnector.loadOrders({
			propertyId: this.propertyId,
			page: this.currentPage + 1,
			limit: 3,
			customerId: this.customerId
		}, function (d, b) {
			if (d) return errorSave(c.$(),
				languageParser.translate("conversations", "unable_load_shopify")), a();
			c.setOrderValues(b.data.orders);
			c.ordersRaw.pushObjects(b.data.orders);
			c.set("currentPage", c.currentPage + 1);
			a()
		})
	}
});
Tawk.ClientDataView = Ember.View.extend({
	template: Ember.TEMPLATES.clientDataView,
	classNames: "visitor-client-data-view",
	didInsertElement: function () {
		var a = this;
		this.set("isLoading", !0);
		visitorUtils.loadClientData(this, function () {
			a.set("isLoading", !1)
		});
		this.$().delegate("#client-data-select", "change", function () {
			var c =
				$(this).val();
			a.$(".client-data").addClass("hidden");
			a.$("#" + c + "-view").removeClass("hidden")
		})
	}
});
var visitorUtils = {
	commonEvents: function (a) {
		a.$(".chat-header").resize(function (c) {
			visitorUtils.headerResize(a)
		})
	}, headerResize: function (a) {
		"inDOM" === a._state && a.$(".emoji-container").length && a.$(".emoji-container").remove()
	}, scrollToBottomChat: function (a) {
		clearTimeout(a.scrollTimeout);
		a.set("scrollTimeout", null);
		a.set("scrollTimeout", setTimeout(function () {
			"inDOM" === a._state && a.$(".chat-body").length &&
			a.$(".chat-body").scrollTop(99999999)
		}, 10))
	}, shortcutMatchHighlight: function (a) {
		return '<span class="select2-match">' + a + "</span>"
	}, getShortcuts: function (a) {
		var c = Tawk.shortcutsController.getPropertyShortcuts(a), d = [];
		if (0 === c.length) return d;
		for (a = 0; a < c.length; a++) {
			var b = c[a], e = b.m, f = 150 < e.length ? e.replace(/\n/g, "").substring(0, 150) + "..." : null;
			d.pushObject(Tawk.CopyableModel.create({
				shortcutId: b.id,
				key: b.key,
				keyPlaintext: b.key,
				shortMessage: f,
				options: b.o,
				fullMessage: e,
				dataType: b.dataType,
				plainText: b.m,
				id: b.key + a,
				isGlobal: b.isGlobal
			}))
		}
		d.length && (d[0].selected = !0);
		return d
	}, filterShortcutsSuggestions: function (a, c, d, b) {
		var e = !1, f = [];
		c = c.replace("/", "").toLowerCase();
		replaceWith = function (a) {
			return '<span class="select2-match">' + a + "</span>"
		};
		"?" === c.charAt(0) ? (c = c.substring(1, c.length), e = !0) : b && (e = !0);
		b = RegExp(c, "gi");
		for (var g = 0; g < a.length; g++) {
			var h = a[g].copy(), k = h.key;
			if (!h.isGlobal || !d) if (0 === k.toLowerCase().indexOf(c) || e && (h.fullMessage.match(b) || k.match(b))) h.key = k.replace(b, replaceWith), e && (h.fullMessage =
				h.fullMessage.replace(b, replaceWith), h.shortMessage = h.shortMessage ? h.shortMessage.replace(b, replaceWith) : null), f.pushObject(h)
		}
		return f
	}, joinChat: function (a, c, d) {
		var b;
		a.content.isPersonalPage ? b = Tawk.webProperties.personalPage.alias : (b = a.$(".profile-id").val(), b = a.content.agentProfiles.findProperty("aliasId", b));
		if (!b) return d(!0);
		if ("i" === Tawk.userController.user.status) return checkAndSetAlertBoxView(languageParser.translate("action_messages", "attention"), languageParser.translate("action_messages",
			"status_invisible_join", {lineBreak: "<br />"})), d();
		a.content.set("_conversationProfile", b);
		Tawk.visitorChatController.joinChat(a.content, b, c, function (b) {
			if (b) return "ALREADY_HAS_AGENT" !== b || a.requireConfirmation || a.set("requireConfirmation", !0), d();
			setTimeout(function () {
				a.$(".message-input").length && a.$(".message-input").textcomplete(emojiTextComplete.strategies, emojiTextComplete.options)
			}, 50);
			d()
		})
	}, loadKBData: function (a, c, d) {
		var b = function () {
			a.set("kbContentList", Tawk.PagingListModel.create({perpage: 10}));
			visitorUtils.loadKBList(a, c, !1, !0, d)
		};
		d = d || function () {
		};
		if (a.kbContentList || a.kbContentList && a.isLoading) return d();
		a.kbCategories ? b() : Tawk.webProperties.loadKBCategory(c, function (c, d) {
			if (c) return b();
			a.set("kbCategories", d);
			b()
		})
	}, loadKBList: function (a, c, d, b, e) {
		var f = {};
		"inDOM" === a._state && (e = e || function () {
		}, f.query = b ? void 0 : a.$(".search-kb-text").val().trim() || void 0, 1 === d && a.kbContentList.get("hasNext") ? a.kbContentList.nextList() : -1 === d && a.kbContentList.get("hasPrevious") ? a.kbContentList.previousList() :
			(a.kbContentList.reset(), a.kbContentList.startList()), f.category = a.$(".search-kb-category").val() || void 0, f.size = 10, f.status = "published", f.from = a.kbContentList.currentHead, a.set("isLoading", !0), a.kbContentList.currentData.clear(), socketConnector.getKBList(c, f, function (b, c) {
			var d = [];
			a.set("isLoading", !1);
			if (b) return e(!0);
			c.hits.forEach(function (b) {
				var c, e = {
					id: b.contentId,
					createdOn: moment(b.createdOn).format("MMM Do"),
					categoryName: a.kbCategories.findProperty("id", b.categories[0]).name
				};
				b.categories &&
				b.categories.length && (c = a.kbCategories.findProperty("id", b.categories[0]));
				e.categoryName = c && !c.isDeleted ? c.name : "Uncategorized";
				b.highlight && (b.highlight.plainContent && (e.snippet = markdownConverter.makeHtml(encodeStr(b.highlight.plainContent[0]) + "..."), e.snippet = e.snippet.replace(/\[em\]/g, '<span class="highlight-search">'), e.snippet = e.snippet.replace(/\[\/em\]/g, "</span>")), b.highlight.title && (e.title = encodeStr(b.highlight.title[0]), e.title = e.title.replace(/\[em\]/g, '<span class="highlight-search">'),
					e.title = e.title.replace(/\[\/em\]/g, "</span>")));
				e.title || (e.title = encodeStr(b.title));
				e.snippet || (e.snippet = markdownConverter.makeHtml(encodeStr(b.snippet) + "..."));
				d.pushObject(e)
			});
			a.kbContentList.setList(d);
			a.kbContentList.setTotal(c.total);
			e()
		}))
	}, loadClientData: function (a, c) {
		Tawk.webProperties.loadHiredAgentContent(a.propertyId, function (d) {
			if (null === d) return c();
			a.set("content", d);
			c()
		})
	}, checkWebRTCSettings: function (a) {
		var c;
		"inDOM" === a._state && (c = Tawk.webProperties.getProperty(a.content.pgid),
			c.webrtcActivated ? c.webrtcEnabled ? (c.webrtcVideoEnabled ? a.$(".video-call-visitor").show() : a.$(".video-call-visitor").hide(), c.webrtcScreenEnabled ? a.$(".screen-share-visitor").show() : a.$(".screen-share-visitor").hide(), a.$(".phone-call-visitor").show()) : (a.$(".video-call-visitor").hide(), a.$(".phone-call-visitor").hide(), a.$(".screen-share-visitor").hide()) : (a.$(".video-call-visitor").hide(), a.$(".phone-call-visitor").hide(), a.$(".screen-share-visitor").hide()), a.$(".input-tooltip").tooltip())
	}, startUpload: function (a,
	                          c, d, b) {
		var e, f = toScrollBottom(a.$(".chat-body"));
		b = b || function () {
		};
		fileUploader.getUploadHandler(function (g, h) {
			var k, l;
			if (g) return visitorUtils.handleUploadError(a, c, l, k, d), b();
			k = h.handle;
			l = d ? $(c).find(".file-input").val().replace(/^.*\\/, "") : c.name || c.fileName;
			e = $('<div id="upload-' + k + '" class="upload-data"></div>');
			Tawk.visitorChatController.addHandle(k, a.content._id);
			e.append('<span><i class="fa fa-upload"></i>' + encodeStr(l) + "</span>");
			e.append('<div class="progress progress-sm progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0.5%"></div></div>');
			e.on("progressUpdate", function (a, b) {
				$(this).find(".progress-bar").css("width", b + "%")
			});
			e.on("uploadComplete", function (a, b) {
				$(this).remove();
				Tawk.visitorChatController.uploadComplete(b)
			});
			a.$(".chat-content").append(e);
			f && visitorUtils.scrollToBottomChat(a);
			fileUploader.uploadFile(k, c, a.content.pgid, d, function (e, f) {
				e && visitorUtils.handleUploadError(a, c, l, k, d, f);
				b()
			})
		})
	}, handleUploadError: function (a, c, d, b, e, f) {
		var g, h = $('<a href="javascript:void(0);">' + languageParser.translate("visitors", "retry") + "</a>"),
			k = toScrollBottom(a.$(".chat-body"));
		d = d ? ' "' + encodeStr(d) + '"' : "";
		f = f || "upload_file_error";
		g = $('<div class="upload-error"><i class="fa fa-exclamation-triangle txt-color-red"></i>' + languageParser.translate("visitors", f, {fileName: d}) + "</div>");
		if (b) {
			d = a.$().find("#upload-" + b);
			if (!d.length) return;
			d.remove();
			!c || (e || f && "upload_file_error" !== f) || (g.append(h), h.click(function () {
				g.remove();
				a.startUpload(a, c, e)
			}))
		}
		a.$(".chat-content").append(g);
		k && visitorUtils.scrollToBottomChat(a)
	}, addNewMessageAtBottom: function (a) {
		var c,
			d = a.$().find(".new-message-container");
		!a.$(".chat-body").find(".unseen-message-container").length && d.length && (c = $('<div class="unseen-message-container"><span class="text">' + languageParser.translate("visitors", "new_messages") + '</span><i class="fa fa-arrow-down"></i></div>'), c.insertAfter(a.$(".chat-body")), a.$(".chat-body").on("scroll", function (b) {
			b = a.$(".chat-body").scrollTop();
			var e = b + a.$(".chat-body").height(), f = $(d)[0].offsetTop;
			f + $(d).height() <= e && f >= b && (c.off(), c.remove())
		}), c.click(function () {
			a.$(".chat-body")[0].scrollTop =
				$(d)[0].offsetTop;
			setTimeout(function () {
				d.remove()
			}, 1E3)
		}))
	}, hasNewMessage: function (a, c) {
		var d;
		if ("inDOM" === a._state && !a.content.showFlash && !a.content.isOwn) {
			d = !document.hasFocus() || 1 !== a.$().has($(document.activeElement)).length;
			if (!a.content.isNewMessage) return a.content.clearUnseen();
			d && !a.$().find(".new-message-container").length && $('<div class="new-message-container"><div class="left-border"><div class="border"></div></div><div class="text">' + languageParser.translate("visitors", "new_messages") +
				'</div><div class="right-border"><div class="border"></div></div></div>').insertBefore($(c)[0]);
			d ? a.content.set("showFlash", !0) : a.content.clearUnseen()
		}
	}, initCall: function (a, c, d) {
		a.$(".incoming-call").remove();
		visitorUtils.joinWebRTCCall(a, {video: c, screen: d})
	}, joinWebRTCCall: function (a, c, d) {
		var b;
		joinWebRTCCall(a.content, c, d, function (d, f) {
			d && (b = f ? languageParser.translate("visitors", f.message) : c ? c.screen ? languageParser.translate("visitors", "webrtc_screenshare_error") : languageParser.translate("visitors",
				"webrtc_call_error") : languageParser.translate("visitors", "join_call_error"), a.content.set("incomingCall", !1), a.content.lastBlock = null, errorSave(a.$(".chat-body"), b), visitorUtils.scrollToBottomChat(a))
		})
	}, calculateMinifiedVisit: function (a) {
		a = moment.duration(moment().diff(a));
		return 0 < a.years() ? a.years() + "Y" : 0 < a.months() ? a.months() + "M" : 0 < a.days() ? a.days() + "d" : 0 < a.hours() ? a.hours() + "h" : 0 < a.minutes() ? a.minutes() + "m" : a.seconds() + "s"
	}, saveVisitorData: function (a, c) {
		var d = {};
		a.content.isHistory ? (d.sessionKey =
			null, d.visitorId = a.content.nvid) : (d.sessionKey = a.content._id, d.visitorId = a.content.vid);
		d.propertyId = a.content.pgid;
		a.$(".visitor-note").length ? d.notes = a.$(".visitor-note").val().trim() : d.notes = "";
		a.$(".visitor-name-input").length ? d.name = a.$(".visitor-name-input").val().trim() : d.name = decodeStr(a.content.n);
		a.$(".visitor-email-input").length ? d.email = a.$(".visitor-email-input").val().trim() : d.email = a.content.e;
		a.clearSaveMessages && "function" === typeof a.clearSaveMessages && a.clearSaveMessages();
		updateVisitorDetails(d,
			a.content, function (a, d) {
				a ? errorSave(c) : successSave(c)
			})
	}, openFirstTab: function (a) {
		a && a.length && (a = a.find("li").first(), a.hasClass("dropdown") ? a.find(".inner-item").first().trigger("click") : a.trigger("click"))
	}, updateResizeMenuAndSidebar: function (a) {
		var c, d;
		"inDOM" === a._state && (a.$(".menu").removeClass("hidden"), c = a.$(".jarviswidget").width(), d = 600 > c ? 0.7 : 0.75, d = a.$(".menu").width() + 30 > a.$(".header-list").width() * d, 500 > c ? (a.$(".chat-details-container").addClass("full"), a.$(".chat-content-container").css({
			right: 0,
			width: "auto"
		})) : (a.$(".chat-details-container").removeClass("full"), a.$(".chat-content-container").css({
			right: a.$(".chat-details-container").width() + 2,
			width: "auto"
		})), 500 > c || d ? (a.$(".menu").addClass("hidden"), a.$(".minimized-tab").removeClass("hidden"), a.$(".minimized-dropdown").dropdown(), a.set("isMinimized", !0), visitorUtils.removeResizableSidebar(a), d ? a.set("menuFits", !1) : a.set("menuFits", !0)) : (a.$(".menu").removeClass("hidden"), a.$(".minimized-tab").addClass("hidden"), a.set("isMinimized", !1), a.set("menuFits",
			!0), visitorUtils.initResizableSidebar(a), (!Tawk.visitorChatContainerView.get("isChatDetailsHidden") || a.content.isHistory || a.content.hId) && a.openSidebar()), a.$(".name-text-container").width(a.$(".header-list").width() - a.$(".menu-container").width() - 8))
	}, initResizableSidebar: function (a) {
		a.isResizableInit ? a.$(".chat-details-container").resizable("option", "maxWidth", a.$(".jarviswidget").width() - 270) : (a.set("isResizableInit", !0), a.$(".chat-details-container").resizable({
			handles: "w", minWidth: 200, maxWidth: a.$(".jarviswidget").width() -
			270, resize: function (c, d) {
				a.$(".chat-content-container").css("right", d.size.width + 1 + "px")
			}
		}))
	}, removeResizableSidebar: function (a) {
		a.isResizableInit && ("inDOM" === a._state && a.$(".chat-details-container").is(".ui-resizable")) && (a.set("isResizableInit", !1), a.$(".chat-details-container").resizable("destroy"))
	}
};
Tawk.InlineChatView = Ember.Mixin.create({
	previousTabSelected: null, willDestroyElement: function () {
		this.$(".message-input").textcomplete("destroy");
		this.$(".whisper-input").textcomplete("destroy")
	}, scrollToView: function () {
		"inDOM" ===
		this._state && this.content.show && (Tawk.visitorChatContainerView.scrollToEl(this.elementId), this.set("content.show", !1))
	}.observes("content.show"), columnStyleChanged: function () {
		var a = this;
		"inDOM" === this._state && setTimeout(function () {
			"inDOM" === a._state && (a.$(".chat-content-container").removeAttr("style"), a.$(".chat-details-container").removeAttr("style"), a.$(".chat-content-container").css({
				right: a.$(".chat-details-container").width() + 2,
				width: "auto"
			}))
		})
	}.observes("Tawk.visitorChatContainerView.columnStyle"),
	detailsClosed: function () {
		"inDOM" === this._state && (Tawk.visitorChatContainerView.get("isChatDetailsHidden") ? this.closeSidebar() : (visitorUtils.updateResizeMenuAndSidebar(this), this.openSidebar()))
	}.observes("Tawk.visitorChatContainerView.isChatDetailsHidden"), hideAndResizeHeader: function () {
		var a = this.$(".jarviswidget.focus-chat").width() || this.$(".jarviswidget").width();
		500 < a && this.$(".minimized-tab").addClass("hidden");
		this.$().hasClass("agent-chat-container") ? 500 < a ? this.$(".menu-container .nav.nav-tabs").addClass("hidden") :
			500 >= a && this.$(".menu-container .nav.nav-tabs").removeClass("hidden") : (this.$(".menu-container .menu.nav.nav-tabs").addClass("hidden"), this.$(".name-text-container").width(this.$(".header-list").width() - this.$(".menu-container").width() - 2))
	}, inViewChanged: function () {
		var a = this;
		"inDOM" === this.state && this.content.inView && setTimeout(function () {
			a.$(".chat-input").focus()
		})
	}.observes("content.inView"), didInsertElement: function () {
		var a, c = this;
		this.content.set("autoFocus", !1);
		this.$(".chat-header").debounce("resize",
			function () {
				"inDOM" === c._state && (a && (c.$(".open-emoji").removeClass("selected"), a.remove(), a = null), visitorUtils.updateResizeMenuAndSidebar(c), visitorUtils.initResizableSidebar(c), c.checkAndResizeFooterForm())
			});
		c.$(".tab").tooltip({placement: "bottom"});
		setTimeout(function () {
			c.$(".chat-header").resize();
			c.detailsClosed();
			c.$(".message-input").length && c.$(".message-input").textcomplete(emojiTextComplete.strategies, emojiTextComplete.options);
			c.$(".whisper-input").length && c.$(".whisper-input").textcomplete(emojiTextComplete.strategies,
				emojiTextComplete.options)
		});
		this.$().delegate(".open-emoji", "click", function (d) {
			a || (d.stopPropagation(), $(this).addClass("selected"), a = getEmojiView($(this).parents(".textarea-div"), $(this).parent().find(".chat-input")), d = c.$().position().left + c.$(".chat-content-container").width(), d + a.width() >= $(window).width() ? a.css("right", "10px") : a.css("left", c.$().position().left + c.$(".chat-content-container").width()))
		});
		this.$().click(function (d) {
			0 === $(d.target).parents(".emoji-container").length && a && (d.stopPropagation(),
				c.$(".open-emoji").removeClass("selected"), a.remove(), a = null)
		});
		this.$().delegate(".chat-input", "focus", function () {
			a && (c.$(".open-emoji").removeClass("selected"), a.remove(), a = null)
		});
		this.$().delegate(".chat-input", "paste cut focus keydown change", function (a) {
			var b = $(this).val(), e = $(this)[0].scrollHeight, f = toScrollBottom(c.$(".chat-body")),
				g = c.$(".chat-footer").outerHeight(!0), h = c.content.isAgentChat ? 65 : 105;
			if (a.shiftKey || 13 !== a.keyCode) 9 === a.keyCode ? c.suggestions && c.suggestions.length || (a.preventDefault(),
				Tawk.chatController.focusNextChat()) : (b ? e + 65 > g && 200 < e && (e = 200) : e = 40, 40 > e && (e = 40), e && ($(this).css("height", e + "px"), c.$(".chat-footer").css("height", e + 65 + "px"), c.$(".chat-body").css("bottom", e + h + "px"), f && visitorUtils.scrollToBottomChat(c)))
		});
		this.$().delegate(".typearea", "click", function () {
			$(this).find(".chat-input").focus()
		});
		this.$().bind("sidebarClosed", this.closeSidebar.bind(this));
		this.$().bind("sidebarOpened", this.openSidebar.bind(this))
	}, checkAndResizeFooterForm: function () {
		var a = this;
		setTimeout(function () {
			a.$(".confirmation-requested").length &&
			(a.$(".confirmation-requested.multi-line").removeClass("multi-line"), 28 < a.$(".confirmation-requested .warning").outerHeight() && a.$(".confirmation-requested").addClass("multi-line"))
		})
	}, autoFocusChanged: function () {
		var a = this;
		"inDOM" === this._state && this.content.autoFocus && setTimeout(function () {
			a.$(".chat-input").focus();
			a.content.set("autoFocus", !1)
		})
	}.observes("content.autoFocus"), openSidebar: function () {
		if (!this.content.isAgentChat || this.content.isGroup) this.$().removeClass("no-sidebar"), this.previousTabSelected ?
			this.$(".open-view[data-id=" + this.previousTabSelected + "]").click().addClass("active") : visitorUtils.openFirstTab(this.$(".menu"))
	}, closeSidebar: function () {
		this.$().addClass("no-sidebar");
		this.set("previousTabSelected", null)
	}
});
var timelineRow = '<li class="parent_li"><div class="timeline-label"><span class="label">{{time}}</span>&nbsp;</div><div class="timeline-data">{{{title}}}{{#each data}}<p class="no-margin">{{key}} : {{{value}}}</p>{{/each}}</div></li>';
Tawk.VisitorChatView = Ember.View.extend(Tawk.InlineChatView,
	Tawk.MessageSidebar, {
		template: Ember.TEMPLATES.visitorChat,
		tagName: "article",
		classNames: ["visitor-chat-container chat-container"],
		previewModal: null,
		hasSwitchedTab: !1,
		shortcuts: null,
		checkTagFormAndHide: function () {
			if ("inDOM" === this._state && !this.content.isVisitorPresent) {
				var a = this.$(".tag-form");
				a.length && !a.hasClass("hidden") && this.$(".close-tag-form").click()
			}
		}.observes("content.isVisitorPresent"),
		messagePreviewUpdate: function () {
			"inDOM" === this._state && toScrollBottom(this.$(".chat-body")) && visitorUtils.scrollToBottomChat(this)
		}.observes("content.messagePreview",
			"content.typingAgents.@each"),
		conversationBlockUpdated: function () {
			var a = this;
			"inDOM" === this._state && this.content.conversationUpdated && (this.content.conversationBlock.forEach(function (c) {
				a.$(".chat-content").append(c)
			}), visitorUtils.scrollToBottomChat(this))
		}.observes("content.conversationUpdated"),
		hasNewRow: function () {
			var a;
			"inDOM" === this._state && this.content.newRow && (a = toScrollBottom(this.$(".chat-body")), $(this.content.newRow.block).append(this.content.newRow.row), visitorUtils.hasNewMessage(this,
				this.content.newRow.row), a ? visitorUtils.scrollToBottomChat(this) : visitorUtils.addNewMessageAtBottom(this))
		}.observes("content.newRow"),
		hasNewBlock: function () {
			var a;
			"inDOM" === this._state && this.content.newBlock && (a = toScrollBottom(this.$(".chat-body")), this.$(".chat-content").append(this.content.newBlock), visitorUtils.hasNewMessage(this, this.content.newBlock), a ? visitorUtils.scrollToBottomChat(this) : this.content.lastBlock && visitorUtils.addNewMessageAtBottom(this))
		}.observes("content.newBlock"),
		nameChanged: function () {
			"inDOM" ===
			this._state && this.$(".visitor-name").html(encodeStr(decodeStr(this.content.n)))
		}.observes("content.n"),
		getSuggestions: function (a) {
			this.active = 0;
			this.clearSuggestions();
			null === this.shortcuts && this.set("shortcuts", visitorUtils.getShortcuts(this.content.pgid));
			this.shortcuts.length && (this.suggestions.pushObjects(visitorUtils.filterShortcutsSuggestions(this.shortcuts, a)), this.suggestions.length && (this.suggestions[0].selected = !0))
		},
		toggleSuggestions: function () {
			"inDOM" === this._state && (this.content.hasJoinedConversation &&
			this.suggestions && this.suggestions.length ? (this.$(".select2-results").css("max-height", this.$().height() - this.$(".chat-footer").outerHeight() - this.$("header").outerHeight() - 10), this.$(".select2-drop").removeClass("hidden")) : this.$(".select2-drop").addClass("hidden"))
		}.observes("suggestions.length", "content.hasJoinedConversation"),
		navigateShortcutList: function (a) {
			var c;
			c = 38 === a ? -1 : 1;
			a = this.$(".select2-results");
			if (list = $("li", a)) list.removeClass("select2-highlighted"), this.active += c, 0 > this.active ?
				this.active = list.size() - 1 : this.active >= list.size() && (this.active = 0), c = list.slice(this.active, this.active + 1).addClass("select2-highlighted"), a[0].scrollTop = c[0].offsetTop
		},
		clearSuggestions: function () {
			this.suggestions ? this.suggestions.clear() : this.set("suggestions", [])
		},
		didInsertElement: function () {
			var a = this, c = !0, d = Tawk.webProperties.getProperty(this.content.pgid);
			this._super();
			this.setupSidebarEvents();
			this.$(".back-to-chat").tooltip({placement: "bottom"});
			this.hasNewAlertContent();
			this.clearSuggestions();
			this.conversationBlockUpdated();
			this.hasIncomingCall();
			d && this.set("isSite", "site" === d.propertyType);
			this.$(".end-chat").click(function () {
				a.set("isTyping", !1);
				socketConnector.agentStoppedTyping(a.content._id);
				Tawk.visitorChatController.closeChat(a.content._id)
			});
			this.$().delegate(".join-chat", "click", function () {
				var b = $('<span class="join-small-transparent-spinner"></span>'),
					c = a.$(".join-container .profile-select .btn, .join-container .profile-select label.select");
				joinButton = $(this);
				if (a.requireConfirmation) return b.insertAfter(a.$(".join-container .profile-select .warning")),
					c.addClass("hidden"), visitorUtils.joinChat(a, !0, function () {
					b.remove();
					a.set("requireConfirmation", !1);
					c.removeClass("hidden")
				});
				b.insertAfter(joinButton);
				joinButton.hide();
				visitorUtils.joinChat(a, !1, function () {
					b.remove();
					joinButton.show();
					a.checkAndResizeFooterForm()
				})
			});
			this.$().delegate(".cancel-join-chat", "click", function () {
				a.set("requireConfirmation", !1)
			});
			this.$().delegate(".ignore-current-chat", "click", function (b) {
				b.stopPropagation();
				Tawk.visitorChatController.closeChat(a.content._id);
				Tawk.liveMonitoringController.ignoreChat(a.content._id)
			});
			this.$().delegate(".message-input", "keydown", function (b) {
				if (!b.shiftKey) if (9 === b.keyCode && a.suggestions.length) b.preventDefault(), b.stopPropagation(), a.navigateShortcutList(40); else {
					if (33 === b.keyCode || 34 === b.keyCode) return b.preventDefault();
					if (13 === b.keyCode) b.preventDefault(), a.suggestions.length ? a.$(".select2-highlighted").trigger("click") : (b = $(this).val().trim(), Ember.isEmpty(b) || (Tawk.visitorChatController.sendMessage(a.content._id, b), a.set("isTyping", !1), $(this).val("")), $(this).css("height",
						"40px"), a.$(".chat-footer").css("height", "105px"), a.$(".chat-body").css("bottom", "145px")); else {
						if ((38 === b.keyCode || 40 === b.keyCode) && a.suggestions.length) return b.preventDefault(), a.navigateShortcutList(b.keyCode);
						a.clearSuggestions()
					}
				}
			});
			this.$().delegate(".message-input", "keyup", function (b) {
				if (9 !== b.keyCode) {
					if (a.suggestions.length || "/" === $(this).val().charAt(0)) {
						if (38 === b.keyCode || 40 === b.keyCode || 13 === b.keyCode) return;
						a.getSuggestions($(this).val())
					} else a.clearSuggestions();
					!a.isTyping && 0 < $(this).val().trim().length ?
						(a.set("isTyping", !0), socketConnector.agentIsTyping(a.content._id)) : a.isTyping && 0 === $(this).val().trim().length && (a.set("isTyping", !1), socketConnector.agentStoppedTyping(a.content._id))
				}
			});
			this.$().delegate(".chat-input", "focus", function (b) {
				a.$(".textarea-div").addClass("text-focus");
				a.content.set("currentFocus", !0);
				a.content.clearUnseen()
			});
			this.$().delegate(".chat-input", "blur", function (b) {
				a.content.set("currentFocus", !1);
				a.$(".textarea-div").removeClass("text-focus");
				setTimeout(function () {
						a.clearSuggestions()
					},
					250)
			});
			this.$().delegate(".select2-result", "mouseover", function (b) {
				a.$(".select2-result").removeClass("select2-highlighted");
				$(this).addClass("select2-highlighted")
			});
			this.$().delegate(".select2-result", "click", function (b) {
				var c, d = $(this).attr("data-id");
				a.suggestions.every(function (a) {
					return a.id === d ? (c = a, !1) : !0
				});
				c && (a.$(".message-input").val(c.plainText + "\n" + c.options), a.$(".message-input")[0].scrollTop = a.$(".message-input").height(), a.$(".message-input").focus(), a.clearSuggestions())
			});
			this.$().delegate(".copy-transcript",
				"click", function () {
					$(this).select()
				});
			$(window).resize(function () {
				"inDOM" === a._state && (a.toggleSuggestions(), c && visitorUtils.scrollToBottomChat(a))
			});
			this.$(".chat-body").on("scrollstop", function (a) {
				c = toScrollBottom($(this))
			});
			this.$().click(function () {
				a.content.inView || Tawk.chatController.chatFocused(a.content);
				a.content.clearUnseen()
			});
			this.$().delegate(".file-input", "change", function (b) {
				var c, d = 0, g = 0;
				c = $(this)[0];
				b = function () {
					g++;
					g === d && a.$(".file-input").val("")
				};
				if (a.content.hasJoinedConversation) if (void 0 ===
					window.FormData) a.$(".file-input")[0].value && (d = 1, visitorUtils.startUpload(a, a.$(".upload-form")[0], !0, b)); else if ((c = c.files) && c.length) for (var d = c.length, h = 0; h < c.length; h++) visitorUtils.startUpload(a, c[h], null, b)
			});
			Modernizr.draganddrop && (this.$().on("dragover", function (b) {
				b.preventDefault();
				b.stopPropagation();
				a.content.hasJoinedConversation && !a.onWhisperContainer && a.$(".textarea-div").addClass("drag-over")
			}), this.$().on("dragleave", function (b) {
				b.preventDefault();
				b.stopPropagation();
				a.$(".textarea-div").removeClass("drag-over")
			}),
				this.$().on("dragend", function (b) {
					b.preventDefault();
					b.stopPropagation();
					a.$(".textarea-div").removeClass("drag-over")
				}), this.$().on("drop", function (b) {
				b.preventDefault();
				b.stopPropagation();
				if (a.content.hasJoinedConversation && !a.onWhisperContainer) {
					b = b.target.files || b.dataTransfer.files;
					var c = 0, d = 0, g = function () {
						d++;
						d === c && a.$(".file-input").val("")
					};
					a.$(".textarea-div").removeClass("drag-over");
					if (b && 0 !== b.length) for (var c = b.length, h = 0; h < b.length; h++) visitorUtils.startUpload(a, b[h], null, g)
				}
			}));
			this.$().on("image-file-ready",
				function (b, c) {
					var d = toScrollBottom(a.$(".chat-body"));
					c.imageTag.insertAfter(c.newRow.find(".uploaded-file-name"));
					c.newRow.find(".loader").remove();
					d && visitorUtils.scrollToBottomChat(a)
				});
			"function" === typeof this.$(".hover-location").popover && this.$(".hover-location").popover({html: !0});
			"function" === typeof this.$(".device-detail").popover && this.$(".device-detail").popover({viewport: this.$()});
			this.$(".open-tab-pane").click(function () {
				var b = $(this).attr("data-id");
				a.onWhisperContainer = $(this).hasClass("whisper-tab") ?
					!0 : !1;
				a.$(".open-tab-pane").removeClass("active");
				a.$(".tab-pane").removeClass("active");
				a.$("." + b).addClass("active");
				$(this).addClass("active");
				a.$("." + b).find(".chat-input").focus()
			});
			this.$().delegate(".whisper-input", "keydown", function (b) {
				b.shiftKey || 13 !== b.keyCode || (b.preventDefault(), b = $(this).val().trim(), Ember.isEmpty(b) || (Tawk.visitorChatController.sendMessage(a.content._id, b, !0), $(this).val("")), $(this).css("height", "40px"), a.$(".chat-footer").css("height", "105px"), a.$(".chat-body").css("bottom",
					"145px"))
			});
			this.$().delegate(".whisper-input", "keyup", function (b) {
				!a.isTyping && 0 < $(this).val().trim().length ? (a.set("isTyping", !0), socketConnector.agentIsTyping(a.content._id, !0)) : a.isTyping && 0 === $(this).val().trim().length && (a.set("isTyping", !1), socketConnector.agentStoppedTyping(a.content._id, !0))
			});
			this.$().delegate(".uploaded-image", "click", function () {
				var b = $(this).attr("src");
				null !== a.previewModal ? (a.previewModal.set("imageSrc", b), a.previewModal.openView()) : (a.set("previewModal", Tawk.ImagePreview.create({imageSrc: b})),
					a.previewModal.append())
			});
			this.$().delegate(".message-input", "paste", function (b) {
				var c, d = !1, g = null;
				if (c = (b.originalEvent || b).clipboardData) {
					if ((c = c.items) && c.length) for (var h = 0; h < c.length; h++) {
						if ("text/plain" === c[h].type) {
							d = !0;
							break
						}
						if (-1 !== c[h].type.indexOf("image")) {
							var k = c[h].getAsFile();
							null !== k && (g = k, g.name = languageParser.translate("generic", "pasted_image_title", {dateTime: moment().format("DD-MMM-YYYY hh:mmA")}))
						}
					}
					g && !d && (b.preventDefault(), visitorUtils.startUpload(a, g, null))
				}
			});
			setTimeout(function () {
				a.$(".main-menu").dropdown();
				a.$(".button-icon").tooltip();
				a.$(".tab").tooltip();
				visitorUtils.checkWebRTCSettings(a)
			});
			this.$().delegate(".video-call-visitor", "click", function () {
				visitorUtils.initCall(a, !0, !1)
			});
			this.$().delegate(".phone-call-visitor", "click", function () {
				visitorUtils.initCall(a, !1, !1)
			});
			this.$().delegate(".screen-share-visitor", "click", function () {
				visitorUtils.initCall(a, !1, !0)
			});
			this.$().delegate(".answer-call", "click", function () {
				visitorUtils.initCall(a, !1, !1)
			});
			this.$().delegate(".join-call", "click", function () {
				var b =
					$(this).parents(".webrtc-call").attr("id");
				visitorUtils.joinWebRTCCall(a, null, b)
			});
			this.$().delegate(".decline-call", "click", function () {
				var b = $(this).attr("data-id");
				declineWebRTCCall(b, a.content.pgid, function (b) {
					b ? (a.content.lastBlock = null, a.saveError("Unable to ignore call. Please try again.", ".chat-content-container"), visitorUtils.scrollToBottomChat(a)) : (a.$(".incoming-call").remove(), a.content.setProperties({
						incomingCall: !1,
						incomingCallId: null
					}))
				})
			});
			this.$().delegate(".retry-load", "click", function () {
				var b =
					$(this).parents(".webrtc-call").attr("id");
				conversationProcess.processWebRTCCallBlock(b, a.content.pgid, null, !1, function () {
					calllData && a.content.set("callData." + b, calllData)
				})
			})
		},
		clearSaveMessages: function () {
			"inDOM" === this._state && (this.alertTimeout && clearTimeout(this.alertTimeout), $(".alert").remove())
		},
		saveComplete: function (a, c, d, b) {
			"inDOM" === this._state && (this.clearSaveMessages(), this.$(b).append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' +
				c + '"></i>' + d + "</div>"))
		},
		saveError: function (a, c) {
			"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a, c))
		},
		saveSuccess: function (a, c) {
			var d = this;
			"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a, c), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
				d.clearSaveMessages()
			}, 3E3)))
		},
		willDestroyElement: function () {
			this._super();
			this.previewModal && this.previewModal.destroy();
			this.removeSidebarViews();
			this.set("scrollTimeout", null);
			this.set("previewModal", null);
			this.content.clearConversations();
			this.$().html("");
			this.$().remove()
		},
		showFlash: function () {
			"inDOM" === this._state && (this.content.showFlash ? this.$("header").addClass("flash-new-message") : this.$("header").removeClass("flash-new-message"))
		}.observes("content.showFlash"),
		ownMessage: function () {
			var a, c;
			"inDOM" === this.state && this.content.isOwn && (a = this.$().find(".new-message-container"),
				c = this.$().find(".unseen-message-container"), a.length && a.remove(), c.length && (c.off(), c.remove()), this.content.clearUnseen())
		}.observes("content.isOwn"),
		willInsertElement: function () {
			var a = Tawk.webProperties.getProperty(this.content.pgid);
			a && a.tabSettings && this.set("tabSettings", a.tabSettings)
		},
		hasNewAlertContent: function () {
			"inDOM" === this._state && this.content.newAlertContent && (this.content.lastBlock = null, this.$(".chat-content").append('<div class="conversation-block property-alert"><p>System</p><div class="conversation-content">' +
				this.content.newAlertContent + "</div></div>"), visitorUtils.scrollToBottomChat(this))
		}.observes("content.newAlertContent"),
		hasIncomingCall: function () {
			var a;
			"inDOM" === this._state && (this.content.incomingCall ? (a = $(HandlebarsTemplates.incomingConnectionView({callId: this.content.incomingCallId})), a.insertBefore(this.$(".chat-footer"))) : (a = this.$(".incoming-call"), a.remove()))
		}.observes("content.incomingCall"),
		callViewUpdated: function () {
			var a;
			"inDOM" === this._state && this.content.callViewUpdate && (a = this.content.callViewUpdate,
				this.content.set("callViewUpdate", null), this.$("#" + a.callId).html(a.el))
		}.observes("content.callViewUpdate"),
		hasJoinedConversationChanged: function () {
			var a = this;
			"inDOM" === this._state && this.content.hasJoinedConversation && setTimeout(function () {
				visitorUtils.checkWebRTCSettings(a)
			})
		}.observes("content.hasJoinedConversation")
	});
Ember.Handlebars.helper("visitorChat", Tawk.VisitorChatView);
Tawk.VisitorChatContainerView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorChatContainer,
	elementId: "visitor-chat-view",
	controller: Tawk.chatController,
	maxColumns: 4,
	chatsListBinding: Ember.Binding.oneWay("Tawk.chatController.chatList"),
	chatListView: [],
	currentPosition: 0,
	tempCloseChatDetails: !1,
	willInsertElement: function () {
		this.chatsList.addArrayObserver(this, {
			willChange: this.chatsListWillChange,
			didChange: this.chatsListDidChange
		})
	},
	chatsListWillChange: function (a, c, d, b) {
		d = c + d;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) {
			var e;
			b = a[c];
			if (b = b.isAgentChat ? b.isGroup ? this.chatListView.findProperty("elementId", b.groupId) :
					this.chatListView.findProperty("elementId", b.id) : this.chatListView.findProperty("elementId", b.vid)) e = this.chatListView.indexOf(b), e === this.endIndex && e === this.chatListView.length - 1 ? (this.set("endIndex", e - 1), this.set("startIndex", this.endIndex - this.controller.totalColumns + 1)) : e === this.startIndex && 0 !== e && (this.set("startIndex", e - 1), this.set("endIndex", this.startIndex + this.controller.totalColumns - 1)), b.$().remove(), this.chatListView.removeObject(b), b.destroy(), this.endIndex >= this.chatListView.length -
			1 && (this.set("endIndex", this.chatListView.length - 1), this.set("startIndex", this.endIndex - this.controller.totalColumns + 1)), 0 > this.startIndex && this.set("startIndex", 0), 0 > this.endIndex && this.set("endIndex", 0), this.openChatView()
		}
	},
	chatsListDidChange: function (a, c, d, b) {
		d = c + b;
		if (!(c >= a.length)) for (d > a.length && (d = a.length); c < d; c++) b = a[c], b = b.isAgentChat ? b.isGroup ? Tawk.AgentChatView.create({
			content: b,
			elementId: b.groupId,
			isDetached: !0
		}) : Tawk.AgentChatView.create({
			content: b,
			elementId: b.id,
			isDetached: !0
		}) : Tawk.VisitorChatView.create({
			content: b,
			elementId: b.vid, isDetached: !0
		}), this.chatListView.pushObject(b), this.scrollToEl(b.elementId)
	},
	updateVisitorName: function (a, c) {
		this.$(".chat-" + a).find(".visitor .visitor-name").html(c)
	},
	updateTooltip: function (a) {
		var c = parseInt(this.slider.slider("option", "max"), 10),
			d = parseInt(this.slider.slider("option", "min"), 10);
		a = a ? parseInt(a, 10) : parseInt(this.slider.slider("value"), 10);
		this.tooltip.find(".tooltip-inner").html("View / " + a);
		this.tooltip[0].style.left = (c !== d ? 100 * ((a - d) / (c - d)) : 0) + "%"
	},
	columnStyleChange: function () {
		var a,
			c, d;
		"inDOM" === this._state && this.controller && (a = this.controller.totalColumns, this.maxColumns < this.controller.totalColumns && (a = this.maxColumns), d = this.chatListView.length, a > d && (a = 0 < this.chatListView.length ? this.chatListView.length % a : 1), c = "col-" + a, a = a > d ? d : a, a = this.$("#inner-content").innerWidth() / a, this.$(".chat-container").length && a && (500 >= a ? this.set("tempCloseChatDetails", !0) : this.set("tempCloseChatDetails", !1)), this.set("columnStyle", c))
	}.observes("controller.totalColumns", "chatListView.length"),
	detailsClosedDefault: function () {
		"inDOM" === this._state && (Tawk.chatController.detailsClosed ? $(".chat-container").trigger("sidebarClosed") : $(".chat-container").trigger("sidebarOpened"))
	}.observes("Tawk.chatController.detailsClosed"),
	columnChanged: function () {
		"inDOM" === this.state && (this.$(".change-column").removeClass("active"), this.$("#column-" + this.controller.totalColumns).addClass("active"), this.$("#slider").slider("value") !== this.controller.totalColumns && (this.$("#slider").slider("option", "value",
			this.controller.totalColumns), this.updateTooltip()), this.openChatView())
	}.observes("controller.totalColumns"),
	visibilityChanged: function () {
		"inDOM" === this._state && (this.isShown ? this.$().css("visibility", "visible") : this.$().css("visibility", "hidden"))
	}.observes("isShown"),
	scrollToEl: function (a) {
		"inDOM" === this._state && (a = this.chatListView.findProperty("elementId", a), a.isDetached && (a = this.chatListView.indexOf(a), 0 === a ? (this.set("startIndex", 0), this.set("endIndex", this.controller.totalColumns - 1)) : this.chatListView.length >
		this.controller.totalColumns ? (this.set("startIndex", a - this.controller.totalColumns + 1), this.set("endIndex", a)) : (this.set("startIndex", 0), this.set("endIndex", this.controller.totalColumns)), this.openChatView()))
	},
	openChatView: function () {
		var a;
		if ("inDOM" === this._state && void 0 !== this.startIndex && void 0 !== this.endIndex) {
			this.isShown ? this.$().css("visibility", "visible") : this.$().css("visibility", "hidden");
			0 > this.startIndex && this.set("startIndex", 0);
			this.endIndex > this.chatListView.length - 1 && this.set("endIndex",
				this.chatListView.length - 1);
			for (var c = 0; c < this.chatListView.length; c++) a = this.chatListView[c], c < this.startIndex || c > this.endIndex ? (a.set("isDetached", !0), "preRender" === a._state ? (a.set("autoHide", !0), a.isInserted || (a.set("isInserted", !0), a.appendTo(this.$("#chat-scroller")))) : a.$().hide()) : ("preRender" === a._state ? a.isInserted || (a.set("isInserted", !0), a.appendTo(this.$("#chat-scroller"))) : a.$().show(), a.set("isDetached", !1), visitorUtils.scrollToBottomChat(a));
			0 === this.startIndex && (0 === this.endIndex &&
				1 < this.chatListView.length) && (a = this.chatListView[0], "preRender" === a._state ? a.isInserted || (a.set("isInserted", !0), a.appendTo(this.$("#chat-scroller"))) : a.$().show(), a.set("isDetached", !1), visitorUtils.scrollToBottomChat(a));
			this.endIndex < this.chatListView.length - 1 && this.chatListView.length > this.controller.totalColumns ? this.$("#next-chat").removeClass("disabled") : this.$("#next-chat").addClass("disabled");
			0 < this.startIndex ? this.$("#prev-chat").removeClass("disabled") : this.$("#prev-chat").addClass("disabled")
		}
	},
	didInsertElement: function () {
		var a = null, c = this;
		this.set("startIndex", 0);
		this.set("endIndex", 0);
		this.$(".change-column").tooltip();
		this.$(".btn-circle").tooltip();
		this.$("#column-" + this.controller.totalColumns).addClass("active");
		this.set("tooltip", this.$(".tooltip"));
		this.set("slider", this.$("#slider"));
		this.$("#button-details-toggle").tooltip();
		this.slider.slider({
			min: 1, max: 4, value: c.controller.totalColumns, slide: function (a, b) {
				0 === c.endIndex ? c.set("endIndex", b.value - 1) : b.value > c.controller.totalColumns &&
					(b.value >= c.chatListView.length - 1 ? c.set("endIndex", c.chatListView.length - 1) : c.set("endIndex", c.endIndex + b.value - c.controller.totalColumns - 1));
				c.set("startIndex", c.endIndex - b.value + 1);
				c.controller.changeColumn(b.value);
				c.updateTooltip(b.value)
			}
		});
		this.updateTooltip();
		this.slider.on({
			mouseenter: $.proxy(function () {
				c.tooltip.addClass("in")
			}, this), mouseleave: $.proxy(function () {
				c.tooltip.removeClass("in")
			}, this)
		});
		this.$().delegate("#next-chat", "click", function () {
			c.set("endIndex", c.endIndex + c.controller.totalColumns);
			c.endIndex > c.chatListView.length - 1 && c.set("endIndex", c.chatListView.length - 1);
			c.set("startIndex", c.endIndex - c.controller.totalColumns + 1);
			c.openChatView()
		});
		this.$().delegate("#prev-chat", "click", function () {
			var a;
			a = c.startIndex - c.controller.totalColumns;
			0 > a && (a = 0);
			c.set("startIndex", a);
			a = a + c.controller.totalColumns - 1;
			a > c.chatListView.length - 1 && (a = c.chatListView.length - 1);
			c.set("endIndex", a);
			c.openChatView()
		});
		this.$().delegate("#view-sites", "click", function () {
			window.location.hash = "/admin"
		});
		this.$().delegate("#view-pages",
			"click", function () {
				window.location.hash = "/admin"
			});
		this.$().delegate("#simulate-chat", "click", function () {
			var c = "default",
				b = Tawk.webProperties.sites.filterProperty("enabled", !0).findProperty("isAdmin", !0);
			b || (b = Tawk.webProperties.personalPage, c = "page");
			b.enabled || (b = Tawk.webProperties.pages.filterProperty("enabled", !0).findProperty("isAdmin", !0), c = "page");
			if (!b) return alert(languageParser.translate("visitors", "simulate_error"));
			null === a || a.closed ? a = window.open(GLOBAL_TAWK_URL + "/" + b.tawkId + "/popout/" +
				c + "/?$_tawk_popout=true", "", "width=450, height=500") : a.focus()
		});
		this.$().delegate("#button-details-toggle", "click", function () {
			$(this).toggleClass("active");
			Tawk.chatController.toggleDetailsClosed(!$(this).hasClass("active"))
		});
		$("body").bind("click.chatView", function (a) {
			$(a.target).parents(".tag").length || ($(a.target).hasClass("tt-suggestion") || c.$(".search-text").is(a.target) || c.$(".openFilter").is(a.target) || 0 !== c.$(".open").has(a.target).length || $(a.target).hasClass("select2-result-label") || $(a.target).hasClass("close-selection") ||
				$(a.target).parents(".ui-datepicker-header").length) || c.$(".closePropertyHistoryFilter").trigger("click")
		});
		this.$().delegate(".hover-location", "mouseover", function () {
			"function" === typeof $(this).popover && $(this).popover("show")
		});
		this.$().delegate(".hover-location", "mouseout", function () {
			"function" === typeof $(this).popover && $(this).popover("hide")
		});
		this.$().delegate(".device-detail", "mouseenter", function () {
			"function" === typeof $(this).popover && $(this).popover("show")
		});
		this.$().delegate(".device-detail",
			"mouseleave", function () {
				"function" === typeof $(this).popover && $(this).popover("hide")
			});
		this.$().debounce("resize", function () {
			c.columnStyleChange()
		}, 250)
	},
	updateUploadProgress: function (a) {
		var c = this.$("#upload-" + a.handle);
		c.length && c.find(".progress-bar").css("width", a.progress + "%")
	},
	uploadComplete: function (a) {
		a = this.$("#upload-" + a);
		a.length && a.remove()
	},
	isChatDetailsHidden: function () {
		return Tawk.chatController.detailsClosed || this.tempCloseChatDetails
	}.property("Tawk.chatController.detailsClosed",
		"tempCloseChatDetails"),
	sidebarToggleTooltip: function () {
		return this.get("isChatDetailsHidden") ? languageParser.translate("tooltip", "toggle_on_all_chat_details") : languageParser.translate("tooltip", "toggle_off_all_chat_details")
	}.property("isChatDetailsHidden")
});
Tawk.visitorChatContainerView = Tawk.VisitorChatContainerView.create();
Tawk.VisitorMonitoringContainerView = Ember.View.extend({
	template: Ember.TEMPLATES.visitorMonitoringContainer,
	elementId: "visitor-monitoring-view",
	controller: Tawk.liveMonitoringController,
	banView: null,
	inactiveInterval: null,
	hasActivity: null,
	lastExtend: null,
	inactiveTimeoutValue: null,
	monitoringTimeoutOptions: null,
	willInsertElement: function () {
		var a = [];
		this.controller.loadSubscribedList();
		"undefined" !== typeof main.storageSettings.monitoringTimeout ? this.set("inactiveTimeoutValue", parseInt(main.storageSettings.monitoringTimeout), 10) : (this.set("inactiveTimeoutValue", 10), main.updateStorageSettings("monitoringTimeout", 10));
		a.push({
			value: 10, text: moment.duration(10, "minutes").humanize(), isSelected: 10 ===
			this.inactiveTimeoutValue
		});
		a.push({
			value: 30,
			text: moment.duration(30, "minutes").humanize(),
			isSelected: 30 === this.inactiveTimeoutValue
		});
		a.push({
			value: 60,
			text: moment.duration(60, "minutes").humanize(),
			isSelected: 60 === this.inactiveTimeoutValue
		});
		a.push({
			value: 120,
			text: moment.duration(120, "minutes").humanize(),
			isSelected: 120 === this.inactiveTimeoutValue
		});
		a.push({
			value: -1,
			text: languageParser.translate("monitoring", "disable_sleep"),
			isSelected: -1 === this.inactiveTimeoutValue
		});
		this.set("monitoringTimeoutOptions",
			a)
	},
	statusSelectView: Ember.View.extend(Tawk.CustomSelectInterface, {
		template: Ember.TEMPLATES.genericSelect,
		label: languageParser.translate("header", "status"),
		selectedValue: "all",
		selectClass: "monitoring-status-select",
		options: [{value: "all", text: languageParser.translate("generic", "all_text")}, {
			value: "online",
			text: languageParser.translate("status_types", "online")
		}, {value: "away", text: languageParser.translate("status_types", "away")}]
	}),
	willDestroyElement: function () {
		this.controller.unloadSubscribedList();
		$("body").unbind("click.monitoringView");
		$("body").unbind("mousemove.monitoring click.monitoring keydown.monitoring");
		$(window).unbind("focus.monitoring");
		clearTimeout(this.inactiveTimeout);
		clearTimeout(this.endTimer);
		this.set("inactiveTimeout", null);
		this.set("endTimer", null);
		this.$().html("");
		this.$().remove()
	},
	didInsertElement: function () {
		var a = null, c = this;
		this.$().delegate(".select-country-index", "click", function () {
			var a = $(this).attr("data-id");
			c.$(".list-content").scrollTop(c.$("#" + a)[0].offsetTop);
			c.$(".select-country-index").removeClass("active");
			$(this).addClass("active")
		});
		this.$(".tooltip-hover").tooltip();
		this.$("#set-timeout").popover({trigger: "hover"});
		this.set("lastExtend", (new Date).getTime());
		this.startInactiveTimeout();
		this.controller.isLoading ? ($("#list-block").removeClass("hidden"), this.$("#openFilter").attr("disabled", !0)) : ($("#list-block").addClass("hidden"), this.$("#openFilter").removeAttr("disabled", !0));
		$("body").bind("click.monitoringView", function (a) {
			c.$("#filter-text").is(a.target) ||
			(c.$("#openFilter").is(a.target) || 0 !== c.$(".open").has(a.target).length || $(a.target).hasClass("select2-result-label") || $(a.target).hasClass("close-selection") || c.alertIsActive) || (c.$("#openFilter").parent().removeClass("open"), c.$(".selection-main-container").removeClass("open"), c.controller.isLoading || $("#list-block").addClass("hidden"))
		});
		$("body").bind("mousemove.monitoring click.monitoring keydown.monitoring", throttle(function () {
			c.resetTimeout()
		}, 6E4));
		$(window).bind("focus.monitoring", throttle(function () {
				c.resetTimeout()
			},
			6E4));
		this.$("#search-country-input").keyup(function () {
			c.searchField(Tawk.liveMonitoringController.countriesList, $(this).val().trim(), c.$("#countries-list-container .list-content"))
		});
		this.$("#search-agent-input").keyup(function () {
			c.searchField(Tawk.liveMonitoringController.agentsList, $(this).val().trim(), c.$("#agents-list-container .list-content"))
		});
		this.$("#search-property-input").keyup(function () {
			c.searchField(Tawk.liveMonitoringController.sitesList, $(this).val().trim(), c.$("#sites-selection-container"));
			c.searchField(Tawk.liveMonitoringController.pagesList, $(this).val().trim(), c.$("#pages-selection-container"))
		});
		this.$("#search-tag-input").keyup(function () {
			c.searchField(Tawk.liveMonitoringController.tagsList, $(this).val().trim(), c.$("#tags-list-container .list-content"))
		});
		this.$("#openFilter").on("click", function (a) {
			$(this).parent().toggleClass("open")
		});
		this.$("#closeFilter").click(function () {
			c.manualCloseFilter();
			return !1
		});
		this.$(".search").click(function () {
			var a = c.$(".monitoring-status-select").val();
			"all" === a && (a = null);
			c.controller.performFilter(a);
			c.manualCloseFilter();
			return !1
		});
		this.$("#resetFilter").click(function () {
			c.$(".monitoring-status-select").val("all");
			c.$(".monitoring-status-select").parent().trigger("reset");
			c.controller.clearFilters();
			c.manualCloseFilter();
			return !1
		});
		this.$().delegate(".open-selection", "click", function () {
			var a = $(this).attr("id");
			$("#list-block").removeClass("hidden");
			c.$(".selection-main-container").removeClass("open");
			c.$("#" + a + "-list-container").addClass("open")
		});
		this.$().delegate(".close-selection", "click", function () {
			$("#list-block").addClass("hidden");
			$(this).parents(".selection-main-container").removeClass("open")
		});
		this.$().delegate(".list-title", "click", function (a) {
			a = $(this).next();
			a.is(":visible") ? ($(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up"), a.slideUp("fast")) : ($(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down"), a.slideDown("fast"))
		});
		this.$().delegate(".ban-visitor", "click", function () {
			var a = $(this).attr("data-id");
			if (a = Tawk.liveMonitoringController.getSubscribedVisitor(a) || Tawk.liveMonitoringController.getVisitor(a)) c.banView || (c.set("banView", Tawk.VisitorBanHoverView.create()), c.banView.append()), c.banView.set("content", a), c.banView.openView()
		});
		this.$().delegate(".filters-popover", "mouseover", function () {
			$(this).popover();
			popover("show")
		});
		this.$().delegate(".filters-popover", "mouseout", function () {
			popover("destroy")
		});
		this.$().delegate(".remove-filter", "click", function () {
			var a = $(this).attr("data-type");
			a &&
			(c.controller.removeSingleFilter(a), "status" === a && ($(".monitoring-status-select").val("all"), $(".monitoring-status-select").parent().trigger("reset")))
		});
		this.$().delegate("#resubscribe-monitor", "click", function () {
			c.resubscribe()
		});
		this.$().delegate("#monitoring-view-sites", "click", function () {
			window.location.hash = "/admin"
		});
		this.$().delegate("#monitoring-view-pages", "click", function () {
			window.location.hash = "/admin"
		});
		this.$().delegate("#simulate-visitor", "click", function () {
			var c = "default", b = Tawk.webProperties.sites.filterProperty("enabled",
				!0).findProperty("isAdmin", !0);
			b || (b = Tawk.webProperties.personalPage, c = "page");
			b.enabled || (b = Tawk.webProperties.pages.filterProperty("enabled", !0).findProperty("isAdmin", !0), c = "page");
			if (!b) return alert(languageParser.translate("visitors", "simulate_error"));
			null === a || a.closed ? a = window.open(GLOBAL_TAWK_URL + "/" + b.tawkId + "/popout/" + c + "/?$_tawk_popout=true", "", "width=450, height=500") : a.focus()
		});
		this.$().delegate(".select-timeout", "click", function () {
			var a = parseInt($(this).attr("id"), 10);
			c.monitoringTimeoutOptions.setEach("isSelected",
				!1);
			c.monitoringTimeoutOptions.forEach(function (b, e) {
				b.value !== a || b.isSelected ? c.set("monitoringTimeoutOptions." + e + ".isSelected", !1) : (c.controller.saveMonitoringTimeout(10 === a ? 0 : a), c.set("monitoringTimeoutOptions." + e + ".isSelected", !0), c.set("inactiveTimeoutValue", a), main.updateStorageSettings("monitoringTimeout", a), c.resetTimeout())
			})
		});
		this.$().delegate("#continue-monitor", "click", function () {
			c.set("alertIsActive", !1);
			c.set("hasTimedOut", !1);
			c.resetTimeout();
			c.$("#timeout-notification-timer").addClass("hidden");
			c.$("#list-block").addClass("hidden")
		})
	},
	visibilityChanged: function () {
		"inDOM" === this._state && (this.isShown ? this.$().css("visibility", "visible") : (this.$().css("visibility", "hidden"), this.banView && (this.banView.remove(), this.set("banView", null))))
	}.observes("isShown"),
	manualCloseFilter: function () {
		this.$(".input-group-btn").removeClass("open");
		this.$(".selection-main-container").removeClass("open")
	},
	isListLoading: function () {
		"inDOM" === this._state && (this.controller.isLoading ? ($("#list-block").removeClass("hidden"),
			this.$("#openFilter").attr("disabled", !0)) : ($("#list-block").addClass("hidden"), this.$("#openFilter").removeAttr("disabled", !0)))
	}.observes("controller.isLoading"),
	searchField: function (a, c, d) {
		var b = [];
		a.setEach("isHighlighted", !1);
		a.setEach("isNotHighlighted", !1);
		!c || 2 > c.length ? a.setEach("isNotHighlighted", void 0) : (a.setEach("isNotHighlighted", !0), c = c.toLowerCase(), a.forEach(function (a) {
			-1 !== a.name.toLowerCase().indexOf(c) && b.push(a)
		}), b && b.length && (a = b[0], b.setEach("isHighlighted", !0), b.setEach("isNotHighlighted",
			!1), this.$("#" + a.id)[0] && d.scrollTop(this.$("#" + a.id)[0].offsetTop)))
	},
	startInactiveTimeout: function () {
		var a = this, c = 60, d = this.$("#timeout-notification-timer"), b = function () {
			a.set("endTimer", setTimeout(function () {
				0 === c ? (clearTimeout(a.inactiveTimeout), clearTimeout(a.endTimer), a.controller.unloadSubscribedList(), d.addClass("hidden"), a.$("#subscription-ended-container").removeClass("hidden"), a.$("#list-block").addClass("hidden"), a.set("hasTimedOut", !0), a.set("alertIsActive", !1)) : (d.find(".timer-update").html(c),
					c--, b())
			}, 1E3))
		};
		clearTimeout(this.inactiveTimeout);
		clearTimeout(this.endTimer);
		this.set("inactiveTimeout", null);
		this.set("endTimer", null);
		-1 !== this.inactiveTimeoutValue && this.set("inactiveTimeout", setTimeout(function () {
			a.manualCloseFilter();
			a.set("alertIsActive", !0);
			d.find(".timer-update").html(c);
			d.removeClass("hidden");
			b();
			notificationController.notifyMonitoringTimeout();
			a.$("#list-block").removeClass("hidden")
		}, 6E4 * this.inactiveTimeoutValue))
	},
	isMonitoringSubscribed: function () {
		"inDOM" === this._state &&
		(this.controller.isSubscribed ? this.$("#openFilter").removeAttr("disabled", !0) : this.$("#openFilter").attr("disabled", !0))
	}.observes("controller.isSubscribed"),
	resetTimeout: function () {
		this.alertIsActive || (-1 === this.inactiveTimeoutValue ? (clearTimeout(this.inactiveTimeout), clearTimeout(this.endTimer), this.set("inactiveTimeout", null), this.set("endTimer", null)) : this.hasTimedOut ? this.resubscribe() : (clearTimeout(this.inactiveTimeout), clearTimeout(this.endTimer), this.set("inactiveTimeout", null), this.set("endTimer",
			null), this.set("lastExtend", (new Date).getTime()), this.startInactiveTimeout()))
	},
	resubscribe: function () {
		this.set("hasTimedOut", !1);
		this.$("#subscription-ended-container").addClass("hidden");
		this.controller.loadSubscribedList();
		this.set("lastExtend", (new Date).getTime());
		this.startInactiveTimeout()
	}
});
Tawk.VisitorBanHoverView = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.hoverBan, elementId: "monitoring-ban", didInsertElement: function () {
		var a = this;
		this._super();
		this.visitorChanged();
		this.$(".ban-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = $(c).find(".banReason").val(), b = $(c).find(".banIp").is(":checked");
				Tawk.liveMonitoringController.banVisitor(a.content, d, b, function (d) {
					d ? errorSave(c, languageParser.translate("form_validation_messages", "error_ban")) : (b ? Tawk.intercomController.execute("trackEvent", {eventType: "banned-ip-on-hover"}) : Tawk.intercomController.execute("trackEvent", {eventType: "banned-visitor-on-hover"}), a.$().modal("hide"))
				});
				return !1
			}
		});
		this.$().delegate(".submit-ban-form", "click", function () {
			a.$(".ban-form").submit();
			return !1
		});
		this.$().on("hidden.bs.modal", function (c) {
			a.$(".banReason").val("");
			a.$(".banIp").attr("checked", !1);
			a.set("visitor", null)
		})
	}, visitorChanged: function () {
		"inDOM" === this._state && this.content && this.set("ban_question", languageParser.translate("monitoring", "ban_question_with_name", {name: this.content.n}))
	}.observes("content._id")
});
Tawk.LiveListView = Ember.View.extend({
	template: Ember.TEMPLATES.liveListContainer,
	tagName: "table", classNames: ["table", "live-list"], didInsertElement: function () {
		this.$().delegate(".detail-hover", "mouseover", function () {
			$(this).popover({trigger: "hover"});
			$(this).popover("show")
		});
		this.$().delegate("tr", "click", function (a) {
			a = $(a.target);
			var c = $(this).attr("id");
			a.hasClass("btn") || (a.parents("button").length || "A" === a[0].tagName) || Tawk.liveMonitoringController.openChat(c)
		})
	}, willDestroyElement: function () {
		this.$(".detail-hover").each(function () {
			$(this).data("bs.popover") && $(this).popover("destroy")
		});
		this.$().html("");
		this.$().remove()
	}
});
Ember.Handlebars.helper("LiveListView", Tawk.LiveListView);
Tawk.DynamicView = Ember.ContainerView.extend({currentView: null, classNames: ["dynamic-view"]});
Tawk.dynamicView = Tawk.DynamicView.create();
Tawk.mainPanel = Ember.ContainerView.create({
	elementId: "main",
	childViews: ["dynamicView", "visitorChatView"],
	dynamicView: Tawk.dynamicView,
	visitorChatView: Tawk.visitorChatContainerView
});
Tawk.DashboardView = Ember.View.extend(Tawk.ViewBase, {
	elementId: "dashboard", template: Ember.TEMPLATES.dashboardView,
	controller: Tawk.DashboardController.create(), feedsView: Ember.View.extend({
		elementId: "feeds-section", template: Ember.TEMPLATES.dashboardFeeds, didInsertElement: function () {
			this._parentView.controller.feeds.loadFeeds()
		}, errorOnLoadChange: function () {
			"inDOM" === this._state && this._parentView.controller.feeds.errorOnLoad && (this.$("#feed-content").addClass("error"), errorSave(this.$("#feed-content"), languageParser.translate("generic", "unable_to_load_feed")))
		}.observes("this._parentView.controller.feeds.errorOnLoad"),
		willDestroyElement: function () {
			this._parentView.controller.feeds.clearList();
			this.$().remove()
		}
	}), bannerView: Ember.View.extend({
		elementId: "banner-section",
		template: Ember.TEMPLATES.dashboardBanner,
		iconClassName: "fa fa-puzzle-piece",
		bannerTitle: languageParser.translate("dashboard", "banner_addon_title"),
		bannerSubtitle: languageParser.translate("dashboard", "addon_banner_subtitle"),
		bannerButton: languageParser.translate("dashboard", "browse_addons"),
		didInsertElement: function () {
			this.$().delegate(".close-banner",
				"click", function () {
					Tawk.userController.closeBanner(!0);
					ga("send", {
						hitType: "event",
						eventCategory: "Add-on banner",
						eventAction: "close",
						eventLabel: "Add-on banner tracking"
					})
				});
			this.$().delegate(".button-container a.btn", "click", function () {
				ga("send", {
					hitType: "event",
					eventCategory: "Add-on banner",
					eventAction: "view",
					eventLabel: "Add-on banner tracking"
				})
			})
		},
		willDestroyElement: function () {
			this.$().remove()
		}
	}), analyticsView: Ember.View.extend({
		elementId: "analytics-section", template: Ember.TEMPLATES.dashboardAnalytics,
		activeTab: "#today", didInsertElement: function () {
			var a = this;
			this.$('a[data-toggle="tab"]').on("shown.bs.tab", function (c) {
				a.set("activeTab", a.$(c.target).attr("href"))
			});
			this._parentView.controller.analytics.loadVisitorCount();
			this._parentView.controller.analytics.loadRecentAnalytics()
		}, willDestroyElement: function () {
			this._parentView.controller.analytics.unSubscribeVisitorCount();
			this.$().remove()
		}
	}), historyView: Ember.View.extend({
		elementId: "history-section", template: Ember.TEMPLATES.dashboardHistory,
		transcriptView: null, classNames: ["view-section"], willInsertElement: function () {
			this._parentView.controller.history.initialize()
		}, willDestroyElement: function () {
			this._parentView.controller.history.removeEvent();
			this._parentView.controller.history.clearData(!0);
			this.$().remove();
			this.transcriptView && this.transcriptView.destroy();
			this.set("transcriptView", null)
		}, handleOpenTranscript: function (a) {
			this.transcriptView ? this.transcriptView.openView() : (this.set("transcriptView", Tawk.TranscriptView.create({controller: this._parentView.controller.history})),
				this.transcriptView.append());
			this._parentView.controller.history.getModalTranscriptData(a, !1, function (c) {
				$(".open-transcript#" + a).removeClass("loading")
			})
		}, copyChanged: function () {
			"inDOM" === this._state && this.transcriptView && (this._parentView.controller.history.modalTranscriptData && this._parentView.controller.history.modalTranscriptData.copyFormat) && $(".copy-transcript").val(this._parentView.controller.history.modalTranscriptData.copyFormat)
		}.observes("_parentView.controller.history.modalTranscriptData.copyFormat"),
		newHistoryListChanged: function () {
			var a, c = this.$("#new-history");
			"inDOM" === this._state && (this._parentView.controller.history.newHistoryList.length ? (a = languageParser.translate("history", "new_history_message", {num: this._parentView.controller.history.newHistoryList.length}), c.length || (c = $('<div class="alert alert-info in text-center" style="position: absolute; width: 100%;" id="new-history"><button class="close" data-dismiss="alert" data-target="new-history">\ufffd</button><a id="retrieveHistory" href="javascript:void(0);" style="text-decoration:underline"><h4 class="alert-heading message"></h4></a></div>')),
				c.find(".message").html(a), this.$('div[role="content"]').prepend(c)) : this.$("#new-history .close").trigger("click"))
		}.observes("_parentView.controller.history.newHistoryList.length"), didInsertElement: function () {
			var a = this;
			this._parentView.controller.history.getDashboardHistory();
			this.$().delegate(".change-history-list", "click", function () {
				var c = $(this).attr("id");
				a._parentView.controller.history.getDashboardHistory(c)
			});
			this.$().delegate(".next", "click.nextHistory", function () {
				var c = $(this);
				c.addClass("loading disabled");
				a._parentView.controller.history.nextConversationsList(function () {
					c.removeClass("loading disabled")
				})
			});
			this.$().delegate(".prev", "click.prevHistory", function () {
				var c = $(this);
				c.addClass("loading disabled");
				a._parentView.controller.history.previousConversationsList(function () {
					c.removeClass("loading disabled")
				})
			});
			this.$().delegate(".open-transcript", "click.openTranscript", function () {
				var c = $(this).attr("id");
				$(this).hasClass("loading") || ($(this).addClass("loading"), a.handleOpenTranscript(c))
			});
			this.$().delegate("#retrieveHistory",
				"click.retrieveHistory", function () {
					a._parentView.controller.history.retrieveNewHistory();
					return !1
				})
		}
	}), willDestroyElement: function () {
		this.$().remove();
		this.controller.history.clearData()
	}, didInsertElement: function () {
		"minimal" === SHOW_WIZARD ? this.set("showResumeWizard", !0) : this.set("showResumeWizard", !1);
		this.$().delegate("#resume-wizard", "click", function () {
			main.showWizard()
		})
	}
});
Tawk.HeaderSpark = Ember.View.extend({
	tagName: "li", classNames: ["sparks-info"], template: Ember.TEMPLATES.dashboardHeaderSpark,
	didInsertElement: function () {
		this.$("h5").tooltip();
		this.renderSparkline()
	}, labelText: function () {
		return languageParser.translate("analytics", this.get("label"))
	}.property("label"), showAsPercentage: function () {
		return "percentage" === this.get("segmentFormat")
	}.property("segmentFormat"), isPostiveGrowth: function () {
		return 0 < this.get("data.summary.growth")
	}.property("data.summary.growth"), isNegativeGrowth: function () {
		return 0 > this.get("data.summary.growth")
	}.property("data.summary.growth"), iconClass: function () {
		return this.get("icon") ?
			"fa " + this.get("icon") : null
	}.property("icon"), tooltipText: function () {
		return languageParser.translate("tooltip", this.get("tooltip"))
	}.property("tooltip"), renderSparkline: function () {
		"inDOM" === this._state && this.$(".sparkline").sparkline(this.get("data.values"), {
			type: "bar",
			barColor: this.get("sparkColor"),
			height: "26px",
			barWidth: 5,
			barSpacing: 2,
			stackedBarColor: "#A90329 #0099c6 #98AA56 #da532c #4490B1 #6E9461 #990099 #B4CAD3".split(" "),
			negBarColor: "#A90329",
			zeroAxis: "false",
			tooltipOffsetX: -30,
			tooltipOffsetY: 20
		})
	}.observes("data.values",
		"data.values.@each"), willDestroyElement: function () {
		this.$().remove()
	}
});
Ember.Handlebars.helper("HeaderSpark", Tawk.HeaderSpark);
Tawk.AnalyticsTodayTabView = Ember.View.extend({
	elementId: "latest",
	classNames: ["tab-pane fade active in padding-10 no-padding-bottom"],
	template: Ember.TEMPLATES.dashboardAnalyticsTodayTab,
	graph: null,
	loaded: !1,
	error: !1,
	liveGraphEl: null,
	graphListeners: {
		willChange: function () {
		}, didChange: function (a, c, d, b) {
			0 < b && this.renderGraph()
		}
	},
	didInsertElement: function () {
		var a = this;
		this.set("liveGraphEl",
			this.$("#live-graph"));
		this.$().delegate(".reload-view", "click", function () {
			a.controller.loadVisitorCount();
			a.controller.loadRecentAnalytics()
		});
		this.controller.realtime.visitsCount.graphData.addArrayObserver(this, this.graphListeners);
		this.renderGraph()
	},
	willDestroyElement: function () {
		this.controller.realtime.visitsCount.graphData.removeArrayObserver(this, this.graphListeners);
		null !== this.graph && this.graph.destroy();
		this.liveGraphEl.unbind("resize-special-event");
		null !== this.liveGraphEl && (this.liveGraphEl.html(""),
			this.liveGraphEl.remove());
		this.set("graph", null);
		this.set("template", null);
		this.set("loaded", null);
		this.set("error", null);
		this.set("liveGraphEl", null);
		this.$().html("");
		this.$().remove()
	},
	renderGraph: function () {
		var a, c = 0, d = 0, b = [];
		this.loaded && (null !== this.liveGraphEl && 0 !== this.liveGraphEl.length) && (this.controller.realtime.visitsCount.graphData.forEach(function (a) {
			b.push([c++, a]);
			a > d && (d = a)
		}), d = 10 * Math.ceil((d + 1) / 10), null === this.graph && "function" === typeof $.plot ? (a = this.liveGraphEl.find(".alert-danger"),
		a.length && a.remove(), this.liveGraphEl.removeClass("error"), this.set("graph", $.plot(this.liveGraphEl, [{data: b}], {
			yaxis: {
				min: 0,
				max: d
			},
			xaxis: {
				tickFormatter: function () {
					return ""
				}
			},
			colors: [this.liveGraphEl.css("color")],
			series: {
				lines: {
					lineWidth: 1,
					fill: !0,
					fillColor: {colors: [{opacity: 0.4}, {opacity: 0}]},
					steps: !1
				}
			},
			grid: {margin: 10}
		}))) : null !== this.graph ? (this.graph.getOptions().yaxes[0].max = d, this.graph.setData([{data: b}]), this.graph.setupGrid(), this.graph.draw()) : (this.set("graph", null), this.$("#live-graph-container .alert-danger").length ||
		(this.$("#live-graph-container").addClass("error"), errorSave(this.$("#live-graph-container"), languageParser.translate("pages", "graph_unavailable")))), b = a = null)
	},
	onLoadStatusChange: function () {
		"inDOM" === this._state && ("LOADED" === this.controller.realtime.status && "LOADED" === this.controller.recent.status ? this.set("loaded", !0) : this.set("loaded", !1), "ERROR" === this.controller.realtime.status || "ERROR" === this.controller.recent.status ? this.set("error", !0) : this.set("error", !1))
	}.observes("controller.realtime.status",
		"controller.recent.status")
});
Ember.Handlebars.helper("AnalyticsTodayTabView", Tawk.AnalyticsTodayTabView);
Tawk.AnalyticsBarView = Ember.View.extend({
	classNames: ["col-xs-6 col-sm-6 col-md-12 col-lg-12"],
	template: Ember.TEMPLATES.dashboardAnalyticsBar,
	didInsertElement: function () {
		this.$(".progress-bar").addClass(this.get("barColor"))
	},
	labelText: function () {
		return languageParser.translate("analytics", this.get("label"))
	}.property("label"),
	percentage: function () {
		return 0 === this.get("total") || 0 === this.get("segment") ?
			"0%" : Math.round(100 * (this.get("segment") / this.get("total"))) + "%"
	}.property("segment", "total"),
	barWidth: function () {
		return "width: " + this.get("percentage")
	}.property("percentage"),
	showAsPercentage: function () {
		return "percentage" === this.get("segmentFormat")
	}.property("segmentFormat"),
	willDestroyElement: function () {
		this.$().remove()
	}
});
Ember.Handlebars.helper("AnalyticsBarView", Tawk.AnalyticsBarView);
Tawk.AnalyticsMicroChartView = Ember.View.extend({
	classNames: ["col-xs-12 col-sm-3 col-md-3 col-lg-3"], template: Ember.TEMPLATES.dashboardAnalyticsMicroChart,
	sparkline: null, tooltipFormat: null, didInsertElement: function () {
		this.$(".easy-pie-chart").easyPieChart({
			barColor: this.get("circleColor"),
			trackColor: "rgba(0,0,0,0.04)",
			scaleColor: !1,
			lineCap: "butt",
			lineWidth: parseInt(50 / 8.5, 10),
			animate: 1500,
			rotate: -90,
			size: 50,
			onStep: function (a, c, d) {
				$(this.el).find(".percent").text(Math.round(d))
			}
		});
		this.$(".easy-pie-chart").tooltip();
		this.$("span.label").tooltip();
		this.renderSparkline();
		this.setGrowthTrend()
	}, labelText: function () {
		return languageParser.translate("analytics",
			this.get("label"))
	}.property("label"), tooltipText: function () {
		return languageParser.translate("tooltip", this.get("tooltip"))
	}.property("tooltip"), tooltipHighestText: function () {
		return languageParser.translate("tooltip", this.get("tooltipHighest"))
	}.property("tooltipHighest"), tooltipLowestText: function () {
		return languageParser.translate("tooltip", this.get("tooltipLowest"))
	}.property("tooltipLowest"), renderSparkline: function () {
		"inDOM" === this._state && "LOADED" === this.get("loaded") && (this.set("tooltipFormat",
			$.spformat('<span style="color: ' + this.get("sparkColor") + '">&#9679;</span> {{prefix}}{{y}}{{suffix}}')), this.set("sparkline", this.$(".sparkline").sparkline(this.get("data.values"), {
			type: "line",
			width: "70px",
			height: "33px",
			lineWidth: 1,
			lineColor: this.get("sparkColor"),
			fillColor: "transparent",
			spotColor: "#f08000",
			minSpotColor: "#ed1c24",
			maxSpotColor: "#f08000",
			highlightSpotColor: "#50f050",
			highlightLineColor: "f02020",
			spotRadius: 1.5,
			normalRangeColor: "#c0c0c0",
			drawNormalOnTop: !1,
			tooltipFormat: this.tooltipFormat
		})))
	}.observes("data.values",
		"loaded"), setGrowthTrend: function () {
		"inDOM" === this._state && (this.$(".segment-trend").removeClass("icon-color-good icon-color-bad fa-caret-up fa-caret-down"), 0 < this.get("data.summary.growth") ? this.$(".segment-trend").addClass("icon-color-good fa-caret-up") : 0 > this.get("data.summary.growth") && this.$(".segment-trend").addClass("icon-color-bad fa-caret-down"), this.$(".easy-pie-chart").data("easyPieChart").update(this.get("data.summary.growth")))
	}.observes("data.summary.growth"), willDestroyElement: function () {
		null !==
		this.sparkline && (this.sparkline.html(""), this.sparkline.remove(), this.set("sparkline", null));
		this.$(".easy-pie-chart").tooltip("destroy");
		this.$("span.label").tooltip("destroy");
		this.set("labelText", null);
		this.set("tooltipText", null);
		this.set("tooltipHighestText", null);
		this.set("tooltipLowestText", null);
		this.set("tooltipFormat", null);
		this.$().html("");
		this.$().remove()
	}
});
Ember.Handlebars.helper("AnalyticsMicroChartView", Tawk.AnalyticsMicroChartView);
Tawk.AnalyticsHistoricalTabView = Ember.View.extend({
	elementId: "historical",
	classNames: ["tab-pane fade"],
	template: Ember.TEMPLATES.dashboardAnalyticsHistoricalTab,
	graph: null,
	labels: null,
	data: null,
	willInsertElement: function () {
		this.set("labels", ["Date", languageParser.translate("analytics", "chats"), languageParser.translate("analytics", "page_views"), languageParser.translate("analytics", "visits"), languageParser.translate("analytics", "visitors")]);
		this.controller.set("historical.status", "EMPTY")
	},
	didInsertElement: function () {
		var a = this, c = this.controller.historical.from, d = this.controller.historical.to;
		this.set("data", this.controller.historical.data);
		this.$().delegate(".reload-view", "click", function () {
			a.controller.loadHistorialData()
		});
		$("body").bind("click.historicalDateRangeForm", function (b) {
			a.$("#applyFilter").is(b.target) || (a.$("#closeFilter").is(b.target) || !(a.$("#date-range-form").is(b.target) || 0 < a.$("#date-range-form").has(b.target).length || $(".ui-datepicker-header").is(b.target) || 0 < $(b.target).parents(".ui-datepicker-header").length || 0 < $(b.target).parents("#ui-datepicker-div").length)) ||
			(b.stopPropagation(), b.preventDefault())
		});
		this.$("#historical-from").val(c.getDate() + "." + (c.getMonth() + 1) + "." + c.getFullYear());
		this.$("#historical-from").datepicker({
			defaultDate: c,
			changeMonth: !0,
			numberOfMonths: 3,
			minDate: "-365D",
			maxDate: "-1d",
			dateFormat: "dd.mm.yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			constrainInput: !0,
			onClose: function (b) {
				a.$("#historical-to").datepicker("option", "minDate", b)
			}
		});
		this.$("#historical-to").val(d.getDate() + "." + (d.getMonth() +
			1) + "." + d.getFullYear());
		this.$("#historical-to").datepicker({
			defaultDate: d,
			changeMonth: !0,
			numberOfMonths: 3,
			minDate: "-365D",
			maxDate: "-1d",
			dateFormat: "dd.mm.yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			constrainInput: !0,
			onClose: function (b) {
				a.$("#historical-from").datepicker("option", "maxDate", b)
			}
		});
		this.$().delegate(".icon-append", "click", function () {
			var a = $(this).next();
			0 !== a.length && a.datepicker("show")
		});
		this.$(".graph-filters").change(function () {
			switch ($(this).data("segment")) {
				case "chats":
					segment =
						0;
					break;
				case "pageViews":
					segment = 1;
					break;
				case "visits":
					segment = 2;
					break;
				case "visitors":
					segment = 3
			}
			a.graph && void 0 !== segment && a.graph.setVisibility(segment, $(this).is(":checked"))
		});
		this.$("#applyFilter").click(function () {
			a.controller.loadHistorialData(a.$("#historical-from").datepicker("getDate"), a.$("#historical-to").datepicker("getDate"))
		})
	},
	willDestroyElement: function () {
		this.graph && this.graph.destroy();
		$("body").unbind("click.historicalDateRangeForm");
		this.$().remove()
	},
	getHistorialTimeRange: function () {
		return moment(this.controller.historical.from).format("MMM Do[,] YYYY") +
			" - " + moment(this.controller.historical.to).format("MMM Do[,] YYYY")
	}.property("controller.historical.from", "controller.historical.to"),
	renderGraph: function () {
		null === this.data || Array.isArray(this.data) && 0 === this.data.length || (null === this.graph ? this.set("graph", new Dygraph(this.$("#historical-graph").get(0), this.data, {
			labels: this.labels,
			legend: "always",
			labelsDiv: this.$("#legends").get(0),
			labelsDivStyles: {textAlign: "right"},
			showRangeSelector: !0,
			colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d"],
			valueFormatter: function (a,
			                          c, d) {
				return "Date" === d ? moment(a).format("MMM Do YYYY") : a
			}
		})) : this.graph.updateOptions({file: this.data}))
	},
	onDataLoad: function () {
		"inDOM" === this._state && ("LOADED" === this.controller.historical.status ? (this.$("#historical-graph-container").removeClass("hidden"), this.$(".reload-view").addClass("hidden"), this.$(".loading-view").addClass("hidden"), this.set("data", this.controller.historical.data), "#historical" === this.activeTab && this.renderGraph()) : (this.$("#historical-graph-container").addClass("hidden"),
			"ERROR" === this.controller.historical.status ? (this.$(".reload-view").removeClass("hidden"), this.$(".loading-view").addClass("hidden")) : (this.$(".reload-view").addClass("hidden"), this.$(".loading-view").removeClass("hidden"))))
	}.observes("controller.historical.status"),
	onTabLoad: function () {
		"inDOM" === this._state && "#historical" === this.activeTab && ("LOADING" !== this.controller.historical.status && "LOADED" !== this.controller.historical.status ? this.controller.loadHistorialData() : "LOADED" === this.controller.historical.status &&
			this.renderGraph())
	}.observes("activeTab")
});
Ember.Handlebars.helper("AnalyticsHistoricalTabView", Tawk.AnalyticsHistoricalTabView);
Tawk.AgentChatCommon = Ember.Mixin.create({
	isScrollingToBottom: null, scrollToBottom: function () {
		var a = this;
		this.set("isScrollingToBottom", !0);
		setTimeout(function () {
			"inDOM" === a._state && a.$(".scrollable-view").length && a.$(".scrollable-view").scrollTop(99999999);
			a.set("isScrollingToBottom", !1)
		}, 10)
	}, hasNewRow: function () {
		var a;
		"inDOM" === this._state && this.content.newRow && (a = this.isScrollingToBottom ?
			!0 : toScrollBottom(this.$(".scrollable-view")), $(this.content.newRow.block).append(this.content.newRow.row), this.hasNewMessage(this.content.newRow.row), a ? this.scrollToBottom() : this.addNewMessageAtBottom())
	}.observes("content.newRow"), hasNewBlock: function () {
		var a;
		"inDOM" === this._state && this.content.newBlock && (a = this.isScrollingToBottom ? !0 : toScrollBottom(this.$(".scrollable-view")), this.$(".chat-content").append(this.content.newBlock), this.hasNewMessage(this.content.newBlock), a ? this.scrollToBottom() :
			this.addNewMessageAtBottom())
	}.observes("content.newBlock"), clearUnseen: function () {
		this.content.hasMoreUnseen || this.content.set("unSeen", !1);
		this.content.set("showFlash", !1);
		Tawk.leftPanel.$().trigger("unseen-messages")
	}, loadOlder: function () {
		var a, c = this;
		"inDOM" !== this._state || this.isLoadingHistory || (scrollPane = this.$(".scrollable-view")[0], scrollPercentage = 100 * ((scrollPane.clientHeight + scrollPane.scrollTop) / scrollPane.scrollHeight), 0 === scrollPane.scrollTop && (a = this.$(".conversation-content").first(),
			this.set("isLoadingHistory", !0), Tawk.agentChatController.loadAgentChatHistory(c.content.groupId, c.content.conversationEndedTime, function () {
			c.set("isLoadingHistory", !1);
			setTimeout(function () {
				c.$(".scrollable-view").scrollTop(a[0].offsetTop - 100)
			})
		})))
	}, historyProcessingChanged: function () {
		var a = this;
		"inDOM" === this._state && (this.content.isProcessingHistory ? this.set("isLoadingHistory", !0) : (this.set("isLoadingHistory", !1), setTimeout(function () {
			a.hasNewMessage();
			a.$(".mark-read").tooltip();
			a.$().find(".new-message-container").length ?
				a.$(".scrollable-view").scrollTop(a.$().find(".new-message-container")[0].offsetTop - 50) : a.scrollToBottom()
		})))
	}.observes("content.isProcessingHistory"), addNewMessageAtBottom: function () {
		var a, c = this.$().find(".new-message-container"), d = this;
		!this.$().find(".unseen-message-container").length && c.length && (a = $('<div class="unseen-message-container"><span class="text">' + languageParser.translate("visitors", "new_messages") + '</span><i class="fa fa-arrow-down"></i><a class="mark-read" href="javascript:void(0);" style="position: absolute;right: 8px;color: #fff;border-left: 1px solid #fff;padding-left: 8px;top: 0;bottom: 0;"><i class="fa fa-close"></i></a></div>'),
			a.insertAfter(this.$(".scrollable-view")), "0px" !== this.$(".scrollable-view").css("bottom") && a.css("bottom", this.$(".scrollable-view").css("bottom")), this.$(".scrollable-view").debounce("scroll", function (b) {
			b = d.$(".scrollable-view").scrollTop();
			var e = b + d.$(".scrollable-view").height(), f = $(c)[0].offsetTop;
			f + $(c).height() <= e && f >= b && (a.off(), a.remove())
		}, 50), a.click(function () {
			d.$(".scrollable-view")[0].scrollTop = $(c)[0].offsetTop;
			setTimeout(function () {
				c.remove()
			}, 1E3)
		}))
	}, updateAgentList: function () {
		var a;
		a = [];
		"inDOM" === this._state && this.content.isGroup && (this.set("agentList", Tawk.agentChatController.removeInvitedAgents(this.propertyMembers, this.content.participants)), (a = this.$(".filter-agent").val().trim()) && a.length && (this.agentList.setEach("isShown", !1), a = filterList(this.agentList, "name", a), a.setEach("isShown", !0), this.set("filterMatch", a.length)))
	}.observes("propertyMembers"), agentTooltip: function () {
		return this.content.isGroup ? languageParser.translate("tooltip", "view_details") : languageParser.translate("tooltip",
			"add_agent")
	}.property("content.isGroup"), setupListeners: function () {
		var a = this, c = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
		this.$(".scrollable-view").debounce(c, function (c) {
			a.isLoadingHistory || (c = c.originalEvent ? c.originalEvent : c, c = c.detail ? -40 * c.detail : c.wheelDelta, 0 < c && a.loadOlder())
		}, 100);
		this.$().delegate("#property-id", "change", function () {
			var c = $(this).val(), b = [];
			"0" === c ? b = a.members : a.members.forEach(function (a) {
				-1 !== a.properties.indexOf(c) && b.pushObject(a)
			});
			a.set("propertyMembers",
				b)
		});
		this.$().delegate(".leave-group", "click", function (c) {
			a.content.isGroup && (c.stopPropagation(), checkAndSetConfirmView(!1, function (b) {
				b && Tawk.agentChatController.leaveGroup(a.content.groupId)
			}, languageParser.translate("agent_chat", "leave_group_confirm"), null, languageParser.translate("agent_chat", "leave_group_title", {groupName: a.content.get("groupName")}), languageParser.translate("agent_chat", "leave_group_yes"), !0))
		});
		this.set("filterMatch", !0);
		this.historyProcessingChanged();
		this.$().delegate(".reload-message",
			"click", function () {
				a.set("isLoadingHistory", !0);
				Tawk.agentChatController.loadAgentChatHistory(a.content.groupId, a.content.conversationEndedTime, function () {
					a.set("isLoadingHistory", !1)
				})
			});
		this.$().delegate(".mark-read", "click", function () {
			Tawk.agentChatController.acknowledgeSeen(a.content)
		});
		this.$().delegate(".invite-groups", "click", function () {
			a.showAvailableGroups()
		});
		this.$().delegate(".close-groups-list", "click", function () {
			a.availableGroups && a.set("availableGroups", null);
			a.$().addClass("no-sidebar");
			a.$(".group-invitation-list").addClass("hidden").hide()
		});
		this.$().delegate(".select-groups", "click", function () {
			var c, b, e = [], f = [], g = 0, h = a.$(".group-participants:checked").length;
			0 === h ? errorSave(a.$(".message-container"), "Please select at least 1 group") : ($(this).attr("disabled", "disabled"), a.$(".close-groups-list").attr("disabled", "disabled"), a.$(".group-participants:checked").each(function (k, l) {
				var m = $(l).val(), n = $(l).attr("data-id");
				Tawk.agentChatController.addAgentToExistingGroups(m, a.content,
					function (k) {
						k ? e.push(n) : f.push(n);
						g++;
						g === h && (e.length && (c = "Failed to invite agents to the following groups : <br/>", c += e.join(", "), errorSave(a.$(".message-container"), c)), f.length && (b = "Successfully invited agents to the following groups : <br/>", b += f.join(", "), successSave(a.$(".message-container"), b)), a.$(".select-groups").removeAttr("disabled"), a.$(".close-groups-list").removeAttr("disabled"), a.$(".all-groups").prop("checked", !1), a.showAvailableGroups())
					})
			}))
		});
		this.$().delegate(".all-groups",
			"change", function () {
				var c = $(this).is(":checked");
				a.$(".group-participants").prop("checked", c).change()
			})
	}, showAvailableGroups: function () {
		var a = [], c = this;
		Tawk.agentChatController.groupMessagesList.forEach(function (d) {
			d.participants.findProperty("id", c.content.id) || a.pushObject(d)
		});
		this.set("availableGroups", sortList(a, "groupName"));
		this.$().removeClass("no-sidebar");
		this.$(".group-invitation-list").removeClass("hidden").show()
	}
});
Tawk.AgentChatView = Ember.View.extend(Tawk.AgentChatCommon, Tawk.InlineChatView,
	{
		template: Ember.TEMPLATES.agentChat,
		tagName: "article",
		classNames: ["agent-chat-container", "chat-container"],
		agentList: [],
		members: [],
		filterMatch: null,
		hasNewMessage: function (a) {
			var c;
			"inDOM" === this._state && (c = !document.hasFocus() || 1 !== this.$().has($(document.activeElement)).length, this.content.newMessage && !this.content.hasMoreUnseen && (c && (a && !this.$().find(".new-message-container").length) && $('<div class="new-message-container"><div class="left-border"><div class="border"></div></div><div class="text">' +
				languageParser.translate("visitors", "new_messages") + '</div><div class="right-border"><div class="border"></div></div></div>').insertBefore($(a)[0]), c ? (this.content.set("unSeen", !0), this.content.set("showFlash", !0), Tawk.leftPanel.$().trigger("unseen-messages")) : this.clearUnseen()))
		},
		showFlash: function () {
			"inDOM" === this._state && (this.content.showFlash ? this.$("header").addClass("flash-new-message") : this.$("header").removeClass("flash-new-message"))
		}.observes("content.showFlash"),
		didInsertElement: function () {
			var a =
				this;
			this._super();
			this.setupListeners();
			this.set("members", sortList(Tawk.webProperties.getAllMembers(), "name"));
			this.members.setEach("isShown", !0);
			this.set("propertyMembers", this.members);
			this.content.draftText && this.$(".chat-input").val(this.content.draftText);
			this.content.currentOngoing.length && this.content.currentOngoing.forEach(function (c) {
				a.$(".chat-content").append(c.block)
			});
			this.content.isGroup || this.$().addClass("no-sidebar");
			setTimeout(function () {
				a.$(".group-name-form").length && a.$(".group-name-form").validate({
					errorPlacement: function (a,
					                          d) {
						a.insertAfter(d.parent())
					}, submitHandler: function (c) {
						var d = $(".group-name", c).val();
						$(c).find(".alert").remove();
						Tawk.agentChatController.saveGroupChatName(a.content.groupId, d, function (b) {
							b ? errorSave(c) : a.$(".cancel-name-edit").click()
						});
						return !1
					}
				});
				a.$(".chat-input").focus();
				a.$(".button-icon").tooltip();
				a.$(".back-to-chat").tooltip({placement: "bottom"})
			});
			this.$().delegate(".back-to-chat", "click", function () {
				a.$(".open-view").removeClass("active");
				a.$(".chat-details-container").addClass("hidden");
				a.$().addClass("no-sidebar");
				a.set("previousTabSelected", null)
			});
			this.$().click(function (c) {
				a.clearUnseen();
				a.content.inView || Tawk.chatController.chatFocused(a.content)
			});
			this.$(".end-chat").click(function (c) {
				c.stopPropagation();
				Tawk.agentChatController.closeChat(a.content)
			});
			this.$().delegate(".close-agent-list", "click", function () {
				a.set("agentList", []);
				a.content.isGroup && a.$(".group-participants").css("display", "none");
				a.$(".agents-list").addClass("hidden");
				a.$(".group-members-container").removeClass("hidden");
				a.$(".group-name-form-container").addClass("hidden");
				a.isMinimized && a.$(".back-to-chat").click()
			});
			this.$().delegate(".chat-input", "keydown", function (c) {
				var d;
				if (!c.shiftKey) {
					if (33 === c.keyCode || 34 === c.keyCode) return c.preventDefault();
					13 === c.keyCode && (c.preventDefault(), c = $(this).val().trim(), Ember.isEmpty(c) || (Tawk.agentChatController.sendMessage(a.content, c), $(this).val(""), c = a.$().find(".new-message-container"), d = a.$().find(".unseen-message-container"), c.length && c.remove(), d.length && (d.off(), d.remove())),
						$(this).css("height", "40px"), a.$(".chat-footer").css("height", "105px"), a.$(".chat-body").css("bottom", "105px"), a.content.set("draftText", null), a.content.set("hasDraft", !1))
				}
			});
			this.$(".chat-body:focus").on("click", function () {
				this.blur();
				this.focus();
				a.content.set("newMessage", !1);
				a.clearUnseen()
			});
			this.$().delegate(".chat-input", "focus", function (c) {
				a.$(".textarea-div").addClass("text-focus");
				a.content.set("newMessage", !1);
				a.clearUnseen()
			});
			this.$().delegate(".chat-input", "blur", function (c) {
				a.content.set("draftText",
					$(this).val().trim());
				a.$(".textarea-div").removeClass("text-focus")
			});
			this.$().delegate(".agent-select", "click", function () {
				var c = $(this).val();
				a.agentList.findProperty("id", c).set("isSelected", $(this).is(":checked"))
			});
			this.$().delegate(".filter-agent", "keyup", function (c) {
				var d = $(this).val().trim(), b = [];
				!d || 40 !== c.keyCode && 38 !== c.keyCode && 13 !== c.keyCode ? (a.agentList.setEach("isShown", !1), b = filterList(a.agentList, "name", d), b.setEach("isShown", !0), a.set("filterMatch", b.length)) : (c.preventDefault(),
					c.stopPropagation())
			});
			this.$().delegate(".invite-member", "click", function (c) {
				a.set("agentList", Tawk.agentChatController.removeInvitedAgents(a.members, a.content.participants));
				a.$(".agents-list").removeClass("hidden");
				a.$(".group-members-container").addClass("hidden");
				a.$(".group-name-form-container").addClass("hidden");
				a.$(".open-group-details").click();
				a.set("sectionHeader", "Add member")
			});
			this.$().delegate(".select-agents", "click", function (c) {
				var d = [];
				c.stopPropagation();
				d = a.agentList.filterProperty("isSelected",
					!0);
				d.setEach("isOwn", !1);
				a.set("agentList", []);
				a.$(".agents-list").addClass("hidden");
				a.$(".group-members-container").removeClass("hidden");
				a.$(".group-name-form-container").addClass("hidden");
				a.content.isGroup && Tawk.agentChatController.addAgentsToExistingGroup(a.content.groupId, d, function (b) {
					b || (a.set("agentList", []), a.$(".group-participants").css("display", "none"))
				})
			});
			this.$().delegate(".chat-participants", "click", function () {
				a.$().removeClass("no-sidebar")
			});
			this.$().delegate(".open-group-details",
				"click", function (c) {
					$(this).addClass("active");
					a.$(".chat-details-container").show();
					a.$(".chat-details-container").removeClass("hidden");
					a.$().removeClass("no-sidebar");
					a.set("sectionHeader", "Group Details")
				});
			this.$(".popout-chat").click(function (c) {
				c.stopPropagation();
				Tawk.agentChatController.popOutChat(a.content)
			});
			this.$().delegate(".edit-group-name", "click", function () {
				a.$(".group-members-container").addClass("hidden");
				a.$(".agents-list").addClass("hidden");
				a.$(".group-name-form-container").removeClass("hidden");
				a.$(".open-group-details").click();
				a.set("sectionHeader", "Edit group name")
			});
			this.$().delegate(".cancel-name-edit", "click", function () {
				a.$(".group-members-container").removeClass("hidden");
				a.$(".agents-list").addClass("hidden");
				a.$(".group-name-form-container").addClass("hidden");
				a.isMinimized && a.$(".back-to-chat").click();
				return !1
			});
			this.$().delegate(".typearea", "click", function () {
				$(this).find(".chat-input").focus()
			})
		}
	});
Ember.Handlebars.helper("agentChat", Tawk.AgentChatView);
Tawk.PopoutAgentChatView =
	Ember.View.extend(Tawk.AgentChatCommon, {
		template: Ember.TEMPLATES.popoutAgentChat,
		classNames: ["agent-chat-panel"],
		agentList: [],
		filterMatch: null,
		moveFrontTrigger: function () {
			"inDOM" === this.state && this.content.focus && (this.$().is(":visible") ? this.$("textarea").focus() : Tawk.agentChatController.moveChatToFront(this.content.groupId), this.content.set("focus", !1))
		}.observes("content.focus"),
		focusMaximize: function () {
			this.content.focus && (this.content.isOpen && !this.content.isInline) && this.$(".ui-chatbox-content").show()
		}.observes("content.focus"),
		hasNewMessage: function (a) {
			var c;
			"inDOM" === this._state && this.content.newMessage && ((c = !document.hasFocus() || 1 !== this.$().has($(document.activeElement)).length || !this.$(".ui-chatbox-content").is(":visible")) ? (this.content.set("showFlash", !0), this.content.set("unSeen", !0), this.$().addClass("flash-new"), $("#hiddenList").find('li[data-groupid="' + this.content.groupId + '"]').addClass("new-message"), Tawk.leftPanel.$().trigger("unseen-messages")) : this.clearUnseen(), c && (a && !this.$().find(".new-message-container").length) &&
			$('<div class="new-message-container"><div class="left-border"><div class="border"></div></div><div class="text">' + languageParser.translate("visitors", "new_messages") + '</div><div class="right-border"><div class="border"></div></div></div>').insertBefore($(a)[0]), Tawk.agentChatController.hiddenNewMessage(this.content.groupId))
		},
		willDestroyElement: function () {
			this.$(".ui-chatbox-input-box").textcomplete("destroy");
			setTimeout(function () {
				Tawk.agentChatContainerView.resizeChatView()
			})
		},
		didInsertElement: function () {
			var a,
				c = this;
			this.setupListeners();
			this.set("members", sortList(Tawk.webProperties.getAllMembers(), "name"));
			this.members.setEach("isShown", !0);
			this.set("propertyMembers", this.members);
			this.$(".ui-chatbox-icon").tooltip();
			this.$(".control").tooltip();
			this.$("textarea").focus();
			this.content.draftText && this.$(".ui-chatbox-input-box").val(this.content.draftText);
			Tawk.agentChatContainerView.resizeChatView();
			this.content.currentOngoing.length && this.content.currentOngoing.forEach(function (a) {
				c.$(".chat-content").append(a.block)
			});
			this.$(".close-chat").click(function (a) {
				a.stopPropagation();
				Tawk.agentChatController.closeChat(c.content)
			});
			this.$(".minimize-chat, .ui-widget-header").click(function (a) {
				a.stopPropagation();
				c.$().toggleClass("minimized");
				c.clearUnseen()
			});
			this.$(".invite-agents").click(function () {
				c.content.isGroup ? c.$(".group-participants").css("display", "block") : c.set("agentList", Tawk.agentChatController.getAgentList(c.content.id))
			});
			this.$().delegate(".close-agent-list", "click", function () {
				c.content.isGroup && (c.$(".agents-list.show").length ?
					c.$(".agents-list.show").removeClass("show") : c.$(".group-participants").css("display", "none"));
				c.set("agentList", [])
			});
			this.$().delegate(".ui-chatbox-input-box", "keydown", function (a) {
				var b;
				if (!a.shiftKey) {
					if (33 === a.keyCode || 34 === a.keyCode) return a.preventDefault();
					13 === a.keyCode && (a.preventDefault(), a = $(this).val().trim(), Ember.isEmpty(a) || (Tawk.agentChatController.sendMessage(c.content, a), $(this).val(""), a = c.$().find(".new-message-container"), b = c.$().find(".unseen-message-container"), a.length && a.remove(),
					b.length && (b.off(), b.remove())), c.content.set("draftText", null), c.content.set("hasDraft", !1))
				}
			});
			this.$(".ui-chatbox-input-box:focus").on("click", function () {
				this.blur();
				this.focus()
			});
			this.$(".ui-chatbox-input-box").on("focus", function () {
				c.content.set("newMessage", !1);
				c.$().removeClass("flash-new");
				c.clearUnseen()
			});
			this.$(".ui-chatbox-input-box").on("blur", function () {
				c.content.set("draftText", $(this).val().trim())
			});
			this.$().delegate(".agent-select", "click", function () {
				var a = $(this).val();
				c.agentList.findProperty("id",
					a).set("isSelected", $(this).is(":checked"))
			});
			this.$().delegate(".ui-widget.ui-chatbox", "keydown", function (a) {
				27 === a.keyCode && (a.preventDefault(), a.stopPropagation(), nextSibling = c.$().prev(".agent-chat-panel"), 0 === nextSibling.length && (nextSibling = c.$().next(".agent-chat-panel")), 1 === nextSibling.length && nextSibling.find(".ui-chatbox-input-box").focus(), Tawk.agentChatController.closeChat(c.content))
			});
			this.$().delegate(".filter-agent", "keyup", function (a) {
				var b = $(this).val().trim(), e = [];
				!b || 40 !== a.keyCode &&
				38 !== a.keyCode && 13 !== a.keyCode ? (c.agentList.setEach("isShown", !1), e = filterList(c.agentList, "name", b), e.setEach("isShown", !0), c.set("filterMatch", e)) : (a.preventDefault(), a.stopPropagation())
			});
			this.$().delegate(".add-agents", "click", function (a) {
				a.stopPropagation();
				c.$('.agents-list:not(".show")').addClass("show");
				c.set("agentList", Tawk.agentChatController.removeInvitedAgents(c.members, c.content.participants))
			});
			this.$().delegate(".select-agents", "click", function (a) {
				var b = [];
				a.stopPropagation();
				b = c.agentList.filterProperty("isSelected",
					!0);
				b.setEach("isOwn", !1);
				c.set("agentList", []);
				c.$(".agents-list.show").removeClass("show");
				c.content.isGroup && Tawk.agentChatController.addAgentsToExistingGroup(c.content.groupId, b)
			});
			this.$(".popin-chat").click(function (a) {
				a.stopPropagation();
				Tawk.agentChatController.popInChat(c.content)
			});
			this.$().delegate(".edit-group", "click", function () {
				c.$(".group-name-container").show()
			});
			this.$().delegate(".close-group-form", "click", function () {
				c.$(".group-name-container").hide();
				c.$(".alert").remove();
				return !1
			});
			setTimeout(function () {
				c.$(".group-name-form").length && c.$(".group-name-form").validate({
					errorPlacement: function (a, b) {
						a.insertAfter(b.parent())
					}, submitHandler: function (a) {
						var b = $(".group-name", a).val();
						$(a).find(".alert").remove();
						Tawk.agentChatController.saveGroupChatName(c.content.groupId, b, function (b) {
							b ? errorSave(a) : successSave(a)
						});
						return !1
					}
				})
			});
			this.$(".ui-chatbox-input-box").textcomplete(emojiTextComplete.strategies, emojiTextComplete.options);
			this.$().delegate(".open-emoji", "click", function (d) {
				a ||
				(d.stopPropagation(), $(this).addClass("selected"), a = getEmojiView($(this).parents(".ui-chatbox-input"), $(this).parent().find(".ui-chatbox-input-box")), a.css("left", c.$().offset().left - c.$().width() / 2))
			});
			this.$().click(function (d) {
				0 === $(d.target).parents(".emoji-container").length && a && (d.stopPropagation(), c.$(".open-emoji").removeClass("selected"), a.remove(), a = null)
			});
			this.$(".ui-chatbox-input-box").on("focus", function () {
				a && (c.$(".open-emoji").removeClass("selected"), a.remove(), a = null)
			})
		}
	});
Ember.Handlebars.helper("popoutAgentChat",
	Tawk.PopoutAgentChatView);
Tawk.AgentChatContainerView = Ember.View.extend({
	elementId: "agent-chat-container",
	controller: Tawk.agentChatController,
	maxChatSize: 0,
	chatWidth: 234,
	viewWidth: 0,
	hiddenListWidth: 160,
	template: Ember.TEMPLATES.agentChatContainer,
	hiddenListChanged: function () {
		var a;
		"inDOM" === this.state && (a = this.$("#hiddenChatListContainer"), this.controller.hiddenChatList.length && a.hasClass("hidden") ? (a.removeClass("hidden"), this.$("#hiddenChatListContainer").css("right", this.$(".agent-chat-panel:visible").length *
			this.chatWidth)) : this.controller.hiddenChatList.length || a.addClass("hidden"))
	}.observes("controller.hiddenChatList.length"),
	resizeChatView: function () {
		var a, c = this;
		this.$(".agent-chat-panel:visible").length * this.chatWidth > this.viewWidth ? (a = this.$(".agent-chat-panel:visible").length - Math.floor(this.viewWidth / this.chatWidth), this.$(".agent-chat-panel:visible").splice(0, a).forEach(function (a) {
			$(a).css("display", "none");
			c.controller.hideChat($(a).attr("id"))
		})) : this.$(".agent-chat-panel:visible").length *
			this.chatWidth < this.viewWidth && 0 < this.$(".agent-chat-panel:hidden").length && (a = Math.floor(this.viewWidth / this.chatWidth) - this.$(".agent-chat-panel:visible").length, this.$(".agent-chat-panel:hidden").splice(this.$(".agent-chat-panel:hidden").length - a, a).reverse().forEach(function (a) {
				$(a).css("display", "block");
				c.controller.showChat($(a).attr("id"))
			}))
	},
	hasChatViews: function () {
		"inDOM" === this.state && (this.controller.popoutChatList.length ? $("body").addClass("agent-chat-active") : $("body").removeClass("agent-chat-active"))
	}.observes("controller.popoutChatList.length"),
	hiddenHasNewMessage: function () {
		"inDOM" === this.state && (this.controller.hiddenChatList.filterProperty("newMessage", !0).length ? this.$("#hiddenChatListContainer").addClass("flash-new") : this.$("#hiddenChatListContainer").removeClass("flash-new"))
	}.observes("controller.hiddenChatList.@each.newMessage"),
	didInsertElement: function () {
		var a = this;
		this.$().resize(function () {
			clearTimeout(a.resizeTimeout);
			a.set("resizeTimeout", setTimeout(function () {
				a.set("viewWidth", a.$().width() - a.hiddenListWidth);
				a.resizeChatView();
				a.$("#hiddenChatListContainer").css("right", a.$(".agent-chat-panel:visible").length * a.chatWidth)
			}, 1E3 / 66))
		});
		this.set("viewWidth", this.$().width() - this.hiddenListWidth);
		this.$().delegate(".agent-chat-panel", "focus", function () {
			$(this).find(".ui-widget-header").addClass("ui-state-focus");
			$(this).removeClass("flash-new")
		});
		this.$().delegate(".agent-chat-panel", "blur", function () {
			$(this).find(".ui-widget-header").removeClass("ui-state-focus")
		});
		this.$().delegate(".close-hidden-chat", "click", function (c) {
			var d =
				c.target;
			c.stopPropagation();
			a.controller.closeHiddenChat($(d).parents("li").attr("data-groupid"))
		})
	}
});
Tawk.agentChatContainerView = Tawk.AgentChatContainerView.create();
Tawk.MembersMessageListView = Ember.View.extend({
	template: Ember.TEMPLATES.membersMessageList,
	elementId: "direct-message-view",
	controller: Tawk.agentChatController,
	classNames: "overlay-form",
	searchText: null,
	list: null,
	listType: null,
	isNewGroupView: !1,
	showBack: !1,
	selectedMembers: [],
	isDM: function () {
		return "dm" === this.listType
	}.property("listType"),
	loadList: function (a) {
		var c = [], c = this.get("isDM") ? this.controller.directMessagesList : this.controller.groupMessagesList;
		a && (c = c.filter(function (c) {
			return c.name && c.name.match(a) || c.get("groupName") && c.get("groupName").match(a) ? !0 : !1
		}));
		this.get("isDM") || (c = sortList(c, "groupName"));
		this.set("list", c)
	},
	willInsertElement: function () {
		this.loadList()
	},
	didInsertElement: function () {
		var a = this;
		!this.get("isDM") && this.isNewGroupView && this.openAddGroup();
		this.$("#close-view").click(function () {
			a.closeView()
		});
		$("body").bind("keydown.directMessageCloseView",
			function (c) {
				if (27 === c.keyCode) return c.stopPropagation(), a.closeView(), !1
			});
		this.$().delegate("#property-id", "change", function () {
			var c = $(this).val(), d = [];
			"0" === c ? d = a.members : a.members.forEach(function (a) {
				-1 !== a.properties.indexOf(c) && d.pushObject(a)
			});
			a.set("propertyMembers", d)
		});
		this.$().delegate(".agent-entry", "click", function () {
			var c = $(this).attr("id");
			a.closeView();
			$(this).hasClass("group-chat") ? Tawk.agentChatController.openGroupChat(c) : Tawk.agentChatController.openChat(c)
		});
		this.$("#search").keyup(function () {
			var c =
				$(this).val().trim();
			a.loadList(RegExp(c, "gi"))
		});
		this.$("#group-chat-form").validate({
			rules: {"group-participants[]": {required: !0, maxlength: 49}},
			messages: {
				"group-participants[]": {
					required: "Each group must have at least 2 participants, including you.",
					maxlength: "You can only select up to 50 members at a time."
				}
			},
			errorPlacement: function (c, d) {
				d.hasClass("group-participants") ? a.$("#error-container").html(c).removeClass("hidden") : c.insertAfter(d.parent())
			},
			submitHandler: function () {
				var c = a.$("#group-name").val(),
					d = [];
				a.$("#error-container").addClass("hidden");
				d.pushObject(Ember.Object.create({
					id: Tawk.userController.user.id,
					name: Tawk.userController.user.fullName,
					isOwn: !0,
					status: "online"
				}));
				a.members.forEach(function (a) {
					a.selected && d.pushObject(a)
				});
				Tawk.agentChatController.startGroupChat(c, d, function (b) {
					b ? a.$("#error-container").removeClass("hidden").html("Unable to create group.") : a.closeView()
				});
				return !1
			}
		});
		this.$().delegate("#create-group", "click", function () {
			a.set("showBack", !0);
			a.openAddGroup()
		});
		this.$().delegate("#cancel",
			"click", function () {
				a.showBack ? (a.set("showBack", !1), a.set("isNewGroupView", !1)) : a.closeView()
			});
		this.$().delegate("#back-view", "click", function (c) {
			c.preventDefault();
			a.set("showBack", !1);
			a.set("isNewGroupView", !1);
			return !1
		});
		this.$().delegate(".group-participants", "change", function () {
			var c;
			c = $(this).attr("id");
			var d = $(this).is(":checked");
			(c = a.members.findProperty("id", c)) && (d ? c.set("selected", !0) : c.set("selected", !1))
		});
		this.$().delegate(".pin-chat", "click", function (a) {
			var d = $(this).parent().attr("id");
			a.stopPropagation();
			Tawk.agentChatController.pinChatToSidebar(d)
		});
		this.$().delegate(".unpin-chat", "click", function (a) {
			var d = $(this).parent().attr("id");
			a.stopPropagation();
			Tawk.agentChatController.unpinChatToSidebar(d)
		})
	},
	willDestroyElement: function () {
		$("body").unbind("keydown.directMessageCloseView")
	},
	openView: function (a) {
		this.set("isVisible", !0);
		this.set("isNewGroupView", !1);
		this.set("listType", a);
		this.loadList()
	},
	closeView: function () {
		this.remove();
		this.closeForm()
	},
	openAddGroup: function () {
		var a =
			this, c = [];
		Tawk.webProperties.get("allProperties").forEach(function (a) {
			a.enabled && !a.personalPage && a.currentAgents.forEach(function (b) {
				if (b.en && b.aid !== Tawk.userController.user.id) {
					var e = c.findProperty("id", b.aid);
					e && -1 === e.properties.indexOf(a.id) ? e.properties.pushObject(a.id) : e || (e = Tawk.agentsController.getAgent(b.aid)) && c.pushObject(Ember.Object.create({
						id: b.aid,
						name: e.name,
						selected: !1,
						properties: [a.id],
						status: e.get("status"),
						isOwn: !1
					}))
				}
			})
		});
		this.set("members", sortList(c, "name"));
		this.set("isVisible",
			!0);
		this.set("isNewGroupView", !0);
		setTimeout(function () {
			a.$("#property-id").trigger("change")
		})
	}
});
Tawk.ImageCropView = Ember.View.extend({
	template: Ember.TEMPLATES.imageCropView,
	elementId: "image-crop-view",
	videoMedia: null,
	hasUserMedia: null,
	readImageFile: function () {
		var a = this;
		this.controller && this.controller.imageData && (this.$("#error-container").addClass("hidden"), readImageFile(this.controller.imageData.file, this.controller.imageData.cropDimensions.width, this.controller.imageData.cropDimensions.height,
			this.$("#source-image")[0], function (c, d, b) {
				c ? (errorSave(a.$().parent(), d), a.controller.set("imageData", null)) : a.editImage(b)
			}))
	},
	editImage: function (a) {
		var c = this;
		this.$("#image-camera-view").addClass("hidden");
		this.$("#image-crop").removeClass("hidden");
		this.$("#cropper").css({
			width: this.controller.imageData.cropDimensions.width,
			height: this.controller.imageData.cropDimensions.height
		});
		scaleImage(a, c.$("#moveable-image")[0], c.$("#static-image")[0], 1, function () {
			c.$(".jcrop-holder").css({
				width: c.$("#moveable-image")[0].width,
				height: c.$("#moveable-image")[0].height
			})
		})
	},
	getCameraImage: function () {
		var a = this.$("#source-image")[0], c = this, d = this.$("video");
		this.hasUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		this.hasUserMedia || (d = $('<div id="camera" />'), this.$("#camera-container").append(d));
		this.$("#image-camera-view").removeClass("hidden");
		this.$("#image-crop").addClass("hidden");
		d.removeClass("hidden");
		loadCamera(d, function (b, e) {
			if (b) errorSave(c.$().parent(),
				e), c.controller.set("imageData", null); else {
				c.videoMedia = e;
				a.setAttribute("width", 320);
				a.setAttribute("height", 240);
				ctx = a.getContext("2d");
				c.$("#image-camera-view").find(".button-container").removeClass("hidden");
				if (c.hasUserMedia) d[0].setAttribute("src", window.URL.createObjectURL(c.videoMedia)), d[0].play(), c.$("#capture-image").click(function () {
					ctx.drawImage(d[0], 0, 0, a.width, a.height);
					c.stopAllTracks(c.videoMedia);
					c.editImage(a)
				}); else {
					var f = c.videoMedia, g = $('<select id="camera-names" />');
					f.getCameraList().forEach(function (a,
					                                    b) {
						g.append($("<option></option>").val(b).html(a))
					});
					g.val(d);
					g.change(function () {
						f.setCamera($(this).val())
					});
					c.$("#camera-container").append(g);
					g.val("0");
					f.setCamera("0");
					c.$("#capture-image").click(function () {
						var b = f.save();
						if (b && b.length) {
							var e = new Image;
							e.onload = function () {
								d.remove();
								g.remove();
								ctx.drawImage(this, 0, 0, a.width, a.height);
								c.editImage(a)
							};
							e.src = "data:image/jpeg;base64," + b
						} else errorSave(c.$().parent(), languageParser.translate("pages", "camera_no_capture")), c.controller.set("imageData",
							null)
					})
				}
				c.$(".cancel").click(function () {
					c.stopAllTracks(c.videoMedia);
					c.controller.set("imageData", null)
				});
				c.$().on("hideTriggered", function () {
					c.stopAllTracks(c.videoMedia);
					c.controller.set("imageData", null)
				})
			}
		})
	},
	stopAllTracks: function (a) {
		this.hasUserMedia && a.getTracks().forEach(function (a) {
			a.stop()
		})
	},
	willDestroyElement: function () {
		this.videoMedia && (this.stopAllTracks(this.videoMedia), this.controller.set("imageData", null))
	},
	didInsertElement: function () {
		var a = this;
		"file" === this.controller.imageData.dataType ?
			this.readImageFile() : this.getCameraImage();
		this.$("#cropper").draggable({containment: "parent"});
		this.$("#cropper").on("drag", function (c, d) {
			a.$("#moveable-image").css({left: -1 * d.position.left, top: -1 * d.position.top})
		});
		$("#range-slider-3").ionRangeSlider({
			min: 1, from: 1, max: 2, type: "single", step: 0.1, prettify: !0, onChange: function (c) {
				scaleImage(a.$("#source-image")[0], a.$("#moveable-image")[0], a.$("#static-image")[0], c.from, function () {
					var c = parseInt(a.$("#cropper").css("top").replace("px", ""), 10),
						b = parseInt(a.$("#cropper").css("left").replace("px",
							""), 10), e = a.$("#cropper").parent(), f = a.$("#cropper").offset(), g = e.offset(),
						h = a.controller.imageData.width, k = a.controller.imageData.height;
					a.$(".jcrop-holder").css({
						width: a.$("#moveable-image")[0].width,
						height: a.$("#moveable-image")[0].height
					});
					f.top + k > g.top + e.height() && (c -= f.top + k - (g.top + e.height()), a.$("#cropper").css("top", c), a.$("#moveable-image").css("top", -1 * c));
					f.left + h > g.left + e.width() && (b -= f.left + h - (g.left + e.width()), a.$("#cropper").css("left", b), a.$("#moveable-image").css("left", -1 * b))
				})
			}
		});
		this.$("#apply-crop").click(function () {
			var c = parseInt(a.$("#cropper").css("top").replace("px", ""), 10),
				d = parseInt(a.$("#cropper").css("left").replace("px", ""), 10);
			cropImage(a.$("#static-image")[0], d, c, a.controller.imageData.imageDimensions.width, a.controller.imageData.imageDimensions.height, a.controller.imageData.cropDimensions.width, a.controller.imageData.cropDimensions.height, function (b) {
				a.controller.applyImage(b)
			})
		});
		this.$(".cancel").click(function () {
			a.controller.set("imageData", null)
		})
	}
});
Ember.Handlebars.helper("ImageCropView",
	Tawk.ImageCropView);
Tawk.SoundSettingView = Ember.View.extend(Tawk.ModalViewBase, {
	elementId: "sound-settings",
	template: Ember.TEMPLATES.soundSettings,
	controller: Tawk.userController,
	newChatSelectClass: "sound-files icr-select",
	repeatSelectClass: "icr-loop-select",
	newVisitorSelectClass: "sound-files iv-select",
	newMessageSelectClass: "sound-files im-select",
	agentDisconnectSelectClass: "sound-files dc-select",
	agentChatSelectClass: "sound-files acm-select",
	soundSettings: Ember.Object.create({
		icr: {
			name: null, volume: 0,
			loop: 0
		},
		im: {name: null, volume: 0},
		iv: {name: null, volume: 0},
		dc: {name: null, volume: 0},
		acm: {name: null, volume: 0}
	}),
	willInsertElement: function () {
		notificationController.audioPlayer.preloadSounds();
		this.set("soundSettings.icr.name", this.controller.soundSettings.icr.name);
		this.set("soundSettings.icr.volume", this.controller.soundSettings.icr.volume);
		this.set("soundSettings.icr.loop", this.controller.soundSettings.icr.loop);
		this.set("soundSettings.im.name", this.controller.soundSettings.im.name);
		this.set("soundSettings.im.volume",
			this.controller.soundSettings.im.volume);
		this.set("soundSettings.iv.name", this.controller.soundSettings.iv.name);
		this.set("soundSettings.iv.volume", this.controller.soundSettings.iv.volume);
		this.set("soundSettings.dc.name", this.controller.soundSettings.dc.name);
		this.set("soundSettings.dc.volume", this.controller.soundSettings.dc.volume);
		this.set("soundSettings.acm.name", this.controller.soundSettings.acm.name);
		this.set("soundSettings.acm.volume", this.controller.soundSettings.acm.volume);
		this.set("newChatLabel",
			languageParser.translate("sound_settings", "new_chat"));
		this.set("repeatLabel", languageParser.translate("sound_settings", "repeat"));
		this.set("newVisitorLabel", languageParser.translate("sound_settings", "new_visitor"));
		this.set("newMessageLabel", languageParser.translate("sound_settings", "new_message"));
		this.set("agentDisconnectLabel", languageParser.translate("sound_settings", "agent_disconnect"));
		this.set("agentChatLabel", languageParser.translate("sound_settings", "agent_chat"));
		this.set("soundOptions",
			[{
				value: "none",
				text: languageParser.translate("sound_settings", "none")
			}].concat(notificationController.audioPlayer.playableFiles));
		for (var a = [], c = 1; 11 > c; c++) a.push({
			value: c,
			text: languageParser.translate("sound_settings", "times", {num: c})
		});
		a.push({value: 11, text: languageParser.translate("sound_settings", "forever")});
		this.set("repeatOptions", a)
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		this.$().on("hidden.bs.modal", function () {
			"function" === typeof a.closeCallback && a.closeCallback()
		});
		this.$(".sound-files").change(function () {
			var c =
				$(this).parent().parent().data("event-name"), d = a.$("#" + c + "-slider").slider("value");
			a.set("soundSettings." + c + ".name", $(this).val());
			"none" === $(this).val() ? (a.$("#" + c + "-slider").slider("value", 100), $("#" + c + "-control").addClass("hidden")) : (notificationController.playAudio($(this).val(), d), $("#" + c + "-control").removeClass("hidden"))
		});
		this.$(".volume-slider").slider({
			min: 0, max: 100, range: "min", animate: !0, create: function () {
				var c = $(this).data("event-name");
				$(this).slider("value", a.controller.soundSettings[c].volume)
			},
			change: function (c, d) {
				var b = $(this).data("event-name"), e = a.$("." + b + "-select").val();
				e && (notificationController.playAudio(e, d.value), a.set("soundSettings." + b + ".volume", d.value))
			}
		});
		this.$(".icr-loop-select").change(function () {
			a.set("soundSettings.icr.loop", $(this).val())
		});
		Object.keys(this.soundSettings).forEach(function (c) {
			"none" === a.soundSettings[c].name ? $("#" + c + "-control").addClass("hidden") : $("#" + c + "-control").removeClass("hidden")
		});
		this.$("#sound-settings-form").validate({
			errorPlacement: function (a,
			                          d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				a.controller.saveSoundSettings(a.soundSettings, a.$("#status-enabled").is(":checked"), function (c) {
					c ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		});
		this.$("#submit").click(function () {
			a.$("form").submit()
		})
	},
	newChatSound: function () {
		return this.soundSettings.icr.name
	}.property("soundSettings.icr.name"),
	newChatRepeat: function () {
		return this.soundSettings.icr.loop
	}.property("soundSettings.icr.loop"),
	newMessageSound: function () {
		return this.soundSettings.im.name
	}.property("soundSettings.im.name"),
	newVisitorSound: function () {
		return this.soundSettings.iv.name
	}.property("soundSettings.iv.name"),
	agentDisconnectSound: function () {
		return this.soundSettings.dc.name
	}.property("soundSettings.dc.name"),
	agentChatSound: function () {
		return this.soundSettings.acm.name
	}.property("soundSettings.acm.name"),
	soundNotificationIsEnabled: function () {
		return Tawk.userController.soundNotificationEnabled
	}.property("Tawk.userController.soundNotificationEnabled")
});
Tawk.BrowserAppSessionsView = Ember.View.extend(Tawk.ModalViewBase,
	{
		elementId: "browser-app-sessions",
		template: Ember.TEMPLATES.browserAppSessions,
		controller: Tawk.userController,
		willInsertElement: function () {
			this.controller.loadBrowserAppSessions()
		},
		didInsertElement: function () {
			var a = this;
			this._super();
			this.$().on("hidden.bs.modal", function () {
				"function" === typeof a.closeCallback && a.closeCallback()
			});
			this.$().delegate(".end-session", "click", function (c) {
				a.controller.signOutSession($(this).data("id"));
				Tawk.intercomController.execute("trackEvent", {eventType: "ended-existing-sessions"})
			});
			this.$().delegate(".reload-view", "click", function () {
				a.controller.loadBrowserAppSessions()
			});
			Tawk.intercomController.execute("trackEvent", {eventType: "viewed-existing-sessions"})
		},
		willDestroyElement: function () {
			this.controller.clearBrowserAppSessions()
		},
		loaded: function () {
			return "LOADED" === this.controller.existingSessions.status
		}.property("controller.existingSessions.status"),
		error: function () {
			return "ERROR" === this.controller.existingSessions.status
		}.property("controller.existingSessions.status")
	});
Tawk.ConfirmDeleteView =
	Ember.View.extend(Tawk.ModalViewBase, {
		template: Ember.TEMPLATES.confirmSimpleDelete,
		elementId: "confirmSimpleDelete",
		classNames: ["modal"],
		callback: null,
		needInput: !1,
		success: !1,
		confirmationAnswer: null,
		confirmationQuestion: languageParser.translate("action_messages", "confirm_delete"),
		confirmationHeader: languageParser.translate("action_messages", "title_confirm_delete"),
		confirmationProceedText: languageParser.translate("buttons", "delete_text"),
		positiveProceeed: !1,
		didInsertElement: function () {
			var a = this;
			this._super();
			this.$().delegate("#close", "click", function () {
				a.closeView()
			});
			this.$().delegate("#submit", "click", function () {
				a.$("#confirmation").submit()
			});
			this.set("validator", this.$("#confirmation").validate({
				submitHandler: function () {
					a.needInput ? a.$("#check").val().trim() === a.confirmationAnswer ? a.set("success", !0) : a.set("success", !1) : a.set("success", !0);
					a.closeView()
				}
			}))
		},
		closeView: function () {
			this.callback(this.success);
			this.resetAttributes();
			this.$().modal("hide")
		},
		resetAttributes: function () {
			this.set("success",
				!1);
			this.set("confirmationAnswer", null);
			this.set("needInput", !1);
			this.set("confirmationQuestion", null);
			this.set("confirmationHeader", null);
			this.set("confirmationYesText", null)
		},
		openView: function () {
			this._super();
			this.$().show()
		}
	});
Tawk.confirmDeleteView = Tawk.ConfirmDeleteView.create({});
Tawk.PropertySelectView = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.propertySelect,
	elementId: "propertySelect",
	classNames: ["modal"],
	widgetList: null,
	didInsertElement: function () {
		var a = this, c = Tawk.routing.getPath();
		this._super();
		this.set("showPageList", !c.subView || "widget-scheduler" !== c.subView && "widget-domains" !== c.subView ? !0 : !1);
		this.set("hideSiteList", c.subView && "page-content" === c.subView);
		this.$("#select").click(function () {
			var d = a.$("#property-path-select").find(":selected");
			c.propertyId = d.val();
			a.controller.requestWidget && (c.widgetId = a.$("#widget-path-select").val());
			Tawk.routing.changeRoute(c);
			a.closeView()
		});
		this.controller.requestWidget ? (this.constructWidgetList(), this.$("#property-path-select").change(function () {
				a.constructWidgetList()
			})) :
			this.$("#widget-selection-container").addClass("hidden")
	},
	constructWidgetList: function () {
		var a;
		a = this.$("#property-path-select").find(":selected").val();
		(a = Tawk.webProperties.getProperty(a)) ? (this.set("widgetList", a.widgets), this.$("#widget-selection-container").removeClass("hidden")) : (this.set("widgetList", null), this.$("#widget-selection-container").addClass("hidden"))
	},
	closeView: function () {
		this.$().modal("hide")
	},
	openView: function () {
		this._super();
		this.$().show()
	}
});
Ember.Handlebars.helper("PropertySelectView",
	Tawk.PropertySelectView);
Tawk.AlertBox = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.alertBox,
	elementId: "alertBox",
	classNames: ["modal"],
	message: null,
	title: null,
	message: function () {
		return this.message
	}.property("message"),
	message: function () {
		return this.title
	}.property("title"),
	willDestroyElement: function () {
		this._super()
	},
	didInsertElement: function () {
		var a = this;
		a._super();
		a.$().delegate("#cancel", "click", function () {
			a.$().hide()
		})
	}
});
Tawk.alertBox = Tawk.AlertBox.create();
Tawk.WizardView =
	Ember.View.extend(Tawk.ModalViewBase, {
		elementId: "wizard-container",
		template: Ember.TEMPLATES.wizard,
		controller: Tawk.WizardController.create(),
		emails: null,
		cmsLinks: [{
			value: "drupal",
			text: "Drupal",
			link: "http://storage.googleapis.com/tawk-plugins/tawk-drupal-1.0.zip"
		}, {
			value: "joomla",
			text: "Joomla",
			link: "http://extensions.joomla.org/extensions/extension/communication/live-support-hosted/tawk"
		}, {
			value: "magento",
			text: "Magento",
			link: "http://storage.googleapis.com/tawk-plugins/TawkTo-1.0.1.tgz"
		}, {
			value: "opencart1",
			text: "Opencart 1.x", link: "http://storage.googleapis.com/tawk-plugins/tawk-opencart-1.0.zip"
		}, {
			value: "opencart2",
			text: "Opencart 2.x",
			link: "http://storage.googleapis.com/tawk-plugins/tawk-opencart2-1.0.1.zip"
		}, {
			value: "pretashop",
			text: "Pretashop",
			link: "http://storage.googleapis.com/tawk-plugins/tawkto-prestashop.zip"
		}, {value: "shopify", text: "Shopify", link: "https://apps.shopify.com/tawk-to"}, {
			value: "whmcs",
			text: "WHMCS",
			link: "http://storage.googleapis.com/tawk-plugins/tawk-whmcs-1.1.zip"
		}, {
			value: "wordpress",
			text: "Wordpress", link: "https://wordpress.org/plugins/tawkto-live-chat/"
		}, {
			value: "zencart",
			text: "ZenCart",
			link: "http://storage.googleapis.com/tawk-plugins/tawk-zencart-1.0.zip"
		}],
		bootstrapWizard: null,
		willDestroyElement: function () {
			this.controller.resetData()
		},
		willInsertElement: function () {
			this.set("modalPadding", 0);
			this.set("roleSelectLabel", languageParser.translate("sites", "role"));
			this.set("roleSelectOptions", [{value: "admin", text: languageParser.translate("generic", "admin")}, {
				value: "agent", text: languageParser.translate("generic",
					"agent")
			}]);
			this.set("roleSelectClass", "agent-role-select");
			this.set("roleSelectValue", "admin");
			this.controller.loadData()
		},
		didInsertElement: function () {
			var a = this;
			this._super();
			this.$("#download-link").attr("href", this.cmsLinks[0].link);
			this.$("#cms-change").change(function () {
				var c = $(this).find("option:selected");
				a.$("#download-link").attr("href", c.attr("data-link"))
			});
			this.$().on("hidden.bs.modal", function () {
				"function" === typeof a.closeCallback && a.closeCallback()
			});
			this.$().bootstrapWizard({
				tabClass: "form-wizard",
				previousSelector: "#previous-step", onTabShow: function (c, d, b) {
					a.$("#wizard-done").addClass("hidden");
					a.$("#next-step").removeClass("hidden");
					a.$("#previous-step").removeClass("hidden");
					a.$("#skip-step").addClass("hidden");
					0 === b ? a.$("#previous-step").addClass("hidden") : 1 === b ? (c = a.$("#wizard-agent-intro").height(), a.$("#wizard-agent-form").css("max-height", 500 - c), a.$("#skip-step").removeClass("hidden")) : 2 === b && (a.$("#wizard-done").removeClass("hidden"), a.$("#next-step").addClass("hidden"));
					a.resizeView()
				}
			});
			this.set("bootstrapWizard", this.$().data("bootstrapWizard"));
			this.$("#add-another-email").click(function (c) {
				c.preventDefault();
				a.controller.addInvitation();
				return !1
			});
			this.$().delegate("#next-step", "click", function (c) {
				c = a.bootstrapWizard.currentIndex();
				0 === c ? a.$("#wizard-site-form").submit() : 1 === c && a.$("#wizard-agent-form").submit();
				return !1
			});
			this.$("#skip-step").click(function () {
				a.bootstrapWizard.next()
			});
			this.$("#widget-code").click(function () {
				$(this).select()
			});
			this.$("#wizard-site-form").validate({
				errorPlacement: function (a,
				                          d) {
					a.insertAfter(d.parent())
				}, submitHandler: function (c) {
					var d = !0, b = a.$("#site-name").val().trim(), e = a.$("#site-domain").val().trim();
					e.length && (-1 === e.indexOf("http://") && -1 === e.indexOf("https://")) && (e = "http://" + e);
					a.controller.site && (d = !1);
					a.controller.saveSite(b, e, function (b) {
						b ? errorSave(c, d ? languageParser.translate("form_validation_messages", "site_add_error") : null) : a.markStepComplete(a.$("li.active"))
					});
					return !1
				}
			});
			this.$("#wizard-agent-form").validate({
				errorPlacement: function (a, d) {
					a.insertAfter(d.parent())
				},
				submitHandler: function (c) {
					var d = [];
					a.controller.invitedList.forEach(function (b) {
						var c, f = a.$('section[data-emailId="' + b.id + '"]');
						f.length && (c = f.find(".email").val(), c.length && d.push({
							email: f.find(".email").val(),
							role: f.find("select").val(),
							id: b.id
						}))
					});
					a.controller.inviteAgents(d, function (b) {
						b.length ? b.forEach(function (b) {
							a.$('section[data-emailId="' + b.id + '"]').append('<p class="wizard-error">' + languageParser.translate("form_validation_messages", b.errorKey) + "</p>")
						}) : a.markStepComplete(a.$("li.active"))
					});
					return !1
				}
			});
			this.$().delegate(".delete-email", "click", function () {
				var c = $(this).next().find("input").attr("id");
				a.controller.removeInvitation(c)
			});
			this.$(".change-tab").click(function (a) {
				a.stopPropagation();
				return !1
			});
			this.$("#skip-wizard, #wizard-done").click(function () {
				a.$().modal("hide");
				a.closeCallback()
			});
			this.controller.siteCreateDone && this.markStepComplete(this.$('li[data-target="#step1"]'));
			this.$("#email-instructions").click(function () {
				a.$("#download-plugin-container").addClass("hidden");
				a.$("#email-container").removeClass("hidden")
			});
			this.$("#cancel-email").click(function (c) {
				c.preventDefault();
				a.$("#download-plugin-container").removeClass("hidden");
				a.$("#email-container").addClass("hidden")
			});
			this.$("#send-email").click(function () {
				a.$("#wizard-email-instructions-form").submit()
			});
			this.$("#wizard-email-instructions-form").validate({
				rules: {emails: {required: !0, multiemail: 10}}, messages: {
					emails: {
						multiemail: languageParser.translate("form_validation_messages", "email") + "(" + languageParser.translate("form_validation_messages",
							"total_recipients") + ")"
					}
				}, errorPlacement: function (a, d) {
					a.insertAfter(d.parent())
				}, submitHandler: function (c) {
					c = $("#emails").val().split(",");
					a.controller.emailDeveloper($.map(c, $.trim), function (c) {
						if (c) return a.saveError(languageParser.translate("form_validation_messages", "email_developer_error"));
						a.saveSuccess(languageParser.translate("form_validation_messages", "email_developer_success"))
					});
					return !1
				}
			})
		},
		openView: function () {
			this.$().modal({backdrop: "static", keyboard: !1})
		},
		markStepComplete: function (a) {
			a.addClass("complete").find(".step").html('<i class="fa fa-check"></i>');
			this.bootstrapWizard.next()
		},
		inviteAgentDoneChanged: function () {
			"inDOM" === this._state && this.controller.inviteAgentDone && this.markStepComplete(this.$('li[data-target="#step2"]'))
		}.observes("controller.inviteAgentDone")
	});
Tawk.ImagePreview = Ember.View.extend({
	elementId: "image-preview",
	template: Ember.TEMPLATES.imagePreview,
	classNames: "overlay-form",
	didInsertElement: function () {
		var a = this;
		this.$("#close-view").click(function () {
			a.closeView()
		});
		$("body").bind("keydown.image-previewcloseView", function (c) {
			if (27 ===
				c.keyCode) return c.stopPropagation(), a.closeView(), !1
		});
		this.$().delegate(".zoomed-out", "click", function () {
			$(this).addClass("zoomed-in").removeClass("zoomed-out")
		});
		this.$().delegate(".zoomed-in", "click", function () {
			$(this).addClass("zoomed-out").removeClass("zoomed-in")
		});
		this.openView()
	},
	willDestroyElement: function () {
		$("body").unbind("keydown.image-previewcloseView")
	},
	openView: function () {
		this.set("isVisible", !0);
		this.loadImage()
	},
	closeView: function () {
		this.set("isVisible", !1);
		this.$("#preview").attr("src",
			"").removeClass("zoomed-out zoomed-in");
		this.$("#preview").off();
		this.parentCloseAck && this.parentCloseAck()
	},
	loadImage: function () {
		var a, c, d = this;
		imageEl = this.$("#preview");
		this.set("isLoading", !0);
		setTimeout(function () {
			a = d.$("#image-container").width();
			c = d.$("#image-container").height();
			imageEl.on("load", function (b) {
				d.set("isLoading", !1);
				(this.width > a || this.height > c) && imageEl.addClass("zoomed-out")
			}).on("error", function () {
				d.set("isLoading", !1)
			}).attr("src", d.get("imageSrc"))
		})
	}
});
Tawk.MessageTagView =
	Ember.View.extend({
		template: Ember.TEMPLATES.tagMessageView,
		classNames: "floating-view-container",
		didInsertElement: function () {
			var a, c = this;
			this.set("isLoading", !0);
			socketConnector.getChatTagsByProperty(this.propertyId, function (d, b) {
				var e = [];
				d || b.forEach(function (a) {
					e.push(decodeStr(a))
				});
				a = new Bloodhound({
					datumTokenizer: Bloodhound.tokenizers.whitespace,
					queryTokenizer: Bloodhound.tokenizers.whitespace,
					local: e
				});
				c.set("isLoading", !1);
				a.initialize();
				c.set("tags", a);
				c.setupTagsInput()
			});
			this.$().delegate(".close-tag-form",
				"click", function () {
					c.closeFunction()
				});
			this.$(".smart-form").validate({
				errorPlacement: function (a, b) {
					a.insertAfter(b.parent())
				}, submitHandler: function (a) {
					var b = c.$(".message-tags").tagsinput("items");
					c.$(".alert").remove();
					c.isLiveChat ? Tawk.visitorChatController.updateChatTags(c.sessionId, b, function (b) {
						b ? errorSave(a, languageParser.translate("form_validation_messages", b)) : successSave(a)
					}) : Tawk.conversationsController.updateTags(b, function (b, c) {
						b ? errorSave(a, c ? languageParser.translate("form_validation_messages",
							c) : null) : successSave(a)
					});
					return !1
				}
			})
		},
		setupTagsInput: function () {
			var a = this;
			this.$(".message-tags").tagsinput({
				typeaheadjs: {
					source: this.tags,
					highlight: !0,
					displayText: function (a) {
						return a || ""
					}
				}, freeInput: !0, maxChars: 255, maxTags: 10
			});
			this.$(".message-tags").tagsinput("input").on("keydown", function (c) {
				if (13 === c.keyCode) return a.$(".message-tags").tagsinput("add", $(this).val()), $(this).val(""), !1
			});
			this.$(".message-tags").tagsinput("input").on("blur", function () {
				a.$(".message-tags").tagsinput("add", $(this).val());
				$(this).val("")
			});
			this.$(".message-tags").on("beforeItemAdd", function (c) {
				c.item && 255 < c.item.length && (c.cancel = !0, a.$(".message-tags").tagsinput("input").val(""), errorSave(a.$(".tag-form form"), languageParser.translate("form_validation_messages", "tag_length_exceed")))
			});
			this.$(".message-tags").on("itemAdded", function () {
				var c, d = a.$(".bootstrap-tagsinput").width() - 55, b = 0;
				a.$(".tag").each(function (a, c) {
					b += $(c).outerWidth(!0);
					$(c).css("max-width", d)
				});
				c = d - b;
				100 > c && (c = 100);
				a.$(".tt-input")[0].style.cssText +=
					"min-width : " + c + "px !important";
				a.$(".message-tags").tagsinput("input").typeahead("val", "")
			});
			this.$(".message-tags").tagsinput("removeAll");
			this.currentTags.length && this.currentTags.forEach(function (c) {
				a.$(".message-tags").tagsinput("add", decodeStr(c))
			});
			this.customTags && this.customTags.data && this.customTags.data.length || (this.$(".tt-input")[0].style.cssText += "min-width : " + (this.$(".bootstrap-tagsinput").width() - 55) + "px !important")
		}
	});
Tawk.TicketDetailsView = Ember.View.extend({
	template: Ember.TEMPLATES.ticketDetailsView,
	classNames: ["ticket-details-view"], didInsertElement: function () {
		var a = this;
		this.priorityChanged();
		this.assigneeChanged();
		this.statusChanged();
		if (this.controller.conversationData.isNewConvert) {
			var c = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local: this.controller.activeProperty.availableTags
			});
			this.$("#ticket-tags").tagsinput({
				typeaheadjs: {
					source: c, highlight: !0, displayText: function (a) {
						return a || ""
					}
				}, freeInput: !0, maxChars: 255
			});
			this.$("#ticket-tags").tagsinput("input").on("blur",
				function () {
					a.$("#ticket-tags").tagsinput("add", $(this).val());
					$(this).val("")
				});
			this.$("#ticket-tags").on("itemAdded", function () {
				a.$("#ticket-tags").tagsinput("input").typeahead("val", "")
			})
		} else this.$("#current-ticket-priority").change(function () {
			var c = $(this).val(), c = parseInt(c, 10);
			c !== a.content.p && (a.showSavingOverlay(), a.controller.updateTicketPriority(c, function (b) {
				a.hideSavingOverlay();
				b ? a.showError("Unable to update ticket priority") : a.showError(null)
			}))
		}), this.$("#current-ticket-status").change(function () {
			var c =
				$(this).val(), c = parseInt(c, 10);
			c !== a.content.s && (a.showSavingOverlay(), a.controller.changeTicketStatus(c, function (b) {
				a.hideSavingOverlay();
				b ? a.showError("Unable to update ticket status") : (a.showError(null), 2E3 !== c && 3E3 !== c || $("#close-conversation").click())
			}))
		}), this.$().delegate("#current-ticket-assignee", "change", function () {
			var c = $(this).val(), b = a.controller.getAssigneeType(c);
			if (c !== a.content.assigneeId || b !== a.content.assigneeType) a.showSavingOverlay(), a.controller.updateTicketAssignee(c, b, function (b) {
				a.hideSavingOverlay();
				b ? a.showError("Unable to change ticket assignment") : a.showError(null)
			})
		})
	}, priorityChanged: function () {
		"inDOM" === this._state && this.content && this.$("#current-ticket-priority").val(this.content.p)
	}.observes("content.p"), assigneeChanged: function () {
		"inDOM" === this._state && this.content && (this.controller.conversationData.assgnId ? this.$("#current-ticket-assignee").val(this.content.assgnId) : this.$("#current-ticket-assignee").val("0"))
	}.observes("content.assgnId"), statusChanged: function () {
		"inDOM" === this._state &&
		this.content && this.$("#current-ticket-status").val(this.content.s)
	}.observes("content.s")
});
Tawk.ConversationsPropertiesView = Ember.View.extend({
	elementId: "conversations-properties",
	template: Ember.TEMPLATES.conversationsProperties,
	propertiesLoaded: function () {
		this.controller && (this.controller.propertiesList && this.controller.propertiesList.length && !this.controller.autoOpenTicket && "inDOM" === this._state) && this.controller.openProperty()
	}.observes("controller.propertiesList"),
	didInsertElement: function () {
		var a =
			this;
		this.$().delegate(".get-conversations", "click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.controller.checkChangeAllowed() && a.controller.changeList(listType.ALL)
		});
		this.$().delegate(".get-tickets", "click", function (c) {
			var d = $(this).attr("id");
			c.preventDefault();
			c.stopPropagation();
			a.controller.checkChangeAllowed() && (a.controller.openProperty(d), a.controller.toggleList(!0))
		});
		this.$().delegate(".get-my-tickets", "click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.controller.checkChangeAllowed() &&
			(a.controller.toggleList(!0), a.controller.changeList(listType.MY_TICKETS))
		});
		this.$().delegate(".get-spam", "click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.controller.checkChangeAllowed() && (a.controller.changeList(listType.SPAM), a.controller.toggleList(!0))
		});
		this.$().delegate(".get-trash", "click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.controller.checkChangeAllowed() && (a.controller.changeList(listType.TRASH), a.controller.toggleList(!0))
		});
		this.$().delegate(".get-contacts",
			"click", function (c) {
				c.preventDefault();
				c.stopPropagation();
				a.controller.checkChangeAllowed() && (a.controller.loadContactsList(), a.controller.toggleList(!0))
			});
		setTimeout(function () {
			a.propertiesLoaded();
			$("#close-properties-list").hide();
			$("#list-opacity-block").hide();
			a.scrollToPreviouslyOpenProperty()
		}, 0)
	},
	scrollToPreviouslyOpenProperty: function () {
		var a;
		this.controller && (this.controller.lastViews && this.controller.lastViews.propertyId && "inDOM" === this._state) && (a = this.$("ul.properties-list li#" + this.controller.lastViews.propertyId),
			this.$("ul.properties-list").scrollTop(a.offset().top + a.outerHeight() - this.$("ul.properties-list").offset().top))
	}
});
Ember.Handlebars.helper("ConversationsPropertiesView", Tawk.ConversationsPropertiesView);
Tawk.ConversationsView = Ember.View.extend({
	elementId: "conversations",
	template: Ember.TEMPLATES.conversationsView,
	controller: Tawk.conversationsController,
	currentWidth: window.innerWidth,
	tagsList: null,
	calculateAndSetLimit: function () {
		var a;
		this.controller.isLoading || (this.$() && this.$(".view-section").length ?
			a = this.$(".view-section").height() : (a = this.$(".view-header") && this.$(".view-header").height() ? this.$(".view-header").height() : 767 <= $(window).width() ? 45 : 70, a = $(window).innerHeight() - ($("#header").innerHeight() + a + 41)), a = Math.ceil(a / 42), a > this.controller.limit && this.controller.set("limit", a))
	},
	willInsertElement: function () {
		var a = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: []
		});
		this.calculateAndSetLimit();
		this.controller.initialize();
		this.set("tagsList", a);
		this.tagsList.initialize()
	},
	willDestroyElement: function () {
		$("body").unbind("click.messagingView");
		$(window).unbind("resize.conversationView");
		this.controller.saveLastView();
		this.controller.removeEvent();
		this.controller.clearData()
	},
	activePropertyChanged: function () {
		if ("inDOM" === this._state && this.controller && this.controller.activeProperty) {
			var a = this.controller.get("assigneeList");
			this.set("departments", a.departments);
			this.set("agents", a.agents)
		}
	}.observes("controller.activeProperty.id"),
	isLoading: function () {
		"inDOM" === this._state && (this.controller.isLoading ? this.$("#list-loading").show() : this.$("#list-loading").hide())
	}.observes("controller.isLoading"),
	availableTagsChanged: function () {
		var a;
		"inDOM" === this._state && (this.controller && this.controller.activeProperty && this.controller.activeProperty.availableTags && this.tagsList) && (a = this.controller.activeProperty.get("availableTags"), this.tagsList.local.clear(), this.set("tagsList.local", a), this.tagsList.initialize(!0))
	}.observes("controller.activeProperty.availableTags"),
	didInsertElement: function () {
		var a = this;
		this.$().delegate("#create-ticket", "click", function () {
			a.handleCreateTicket()
		});
		$(window).bind("resize.conversationView", function () {
			var c = window.innerWidth;
			if (767 >= a.currentWidth && 768 <= c || 767 >= c && 768 <= a.currentWidth || 979 >= a.currentWidth && 980 <= c || 979 >= c && 980 <= a.currentWidth || 1049 >= a.currentWidth && 1050 <= c || 1049 >= c && 1050 <= a.currentWidth) a.$("#conversation-details-container").removeAttr("style"), a.$("#open-details-view").removeAttr("style"), a.$("#message-opacity-block").removeAttr("style"),
				a.$("#close-details-view").removeAttr("style"); else if (678 >= a.currentWidth && 679 <= c || 678 >= c && 679 <= a.currentWidth) a.$("#conversations-properties").removeAttr("style"), a.$("#close-properties-list").removeAttr("style"), a.$("#open-properties-list").removeAttr("style"), a.$("#list-opacity-block").removeAttr("style");
			a.currentWidth = c
		});
		$(window).debounce("resize", function () {
			a.calculateAndSetLimit()
		}, 250);
		this.$("#closeFilter").click(function () {
			a.manualCloseFilter();
			return !1
		});
		this.$().delegate("#openFilter",
			"click", function (a) {
				$(this).parent().toggleClass("open")
			});
		this.$().delegate("#search-text", "focus", function (c) {
			a.$("#property-selected-name").addClass("focus")
		});
		this.$().delegate("#search-text", "blur", function (c) {
			a.$("#property-selected-name").removeClass("focus")
		});
		this.$("#resetFilter").click(function () {
			a.$("#search-text").val("");
			a.$("#assignee").val("0");
			a.$("#status").val("0");
			a.$("#from-date").val("");
			a.$("#to-date").val("");
			a.$("#min-messages").val("");
			a.$(".search").trigger("click");
			return !1
		});
		this.$().delegate("#assignee, #search-status", "change", function () {
			var a = $(":selected", this);
			a.parents(".custom-select").find(".selected-value").html(encodeStr(a.text()))
		});
		this.$(".search").click(function () {
			var c, d = {
				query: a.$("#search-text").val() || "",
				statusSearch: a.$("#search-status").val() || "",
				startDate: a.$("#from-date").val() || "",
				endDate: a.$("#to-date").val() || "",
				messageCount: a.$("#min-messages").val() || "",
				tags: a.$("#tags").tagsinput("items")
			};
			d.tags.length || (d.tags = "");
			d.statusSearch = parseInt(d.statusSearch,
				10);
			c = a.$("#assignee option:selected");
			d.assigneeId = c.val();
			a.controller.searchList(d, function () {
				a.manualCloseFilter()
			});
			return !1
		});
		this.$("#contacts-search").on("submit", function (c) {
			c.stopPropagation();
			c = a.$("#contact-query").val().trim();
			a.controller.isContactsList && a.controller.set("contactsQuery", c);
			a.controller.loadContactsList();
			a.controller.toggleList(!0);
			return !1
		});
		this.$("#from-date").datepicker({
			dateFormat: "dd/mm/yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			onSelect: function (a) {
				$("#to-date").datepicker("option", "minDate", a)
			}
		});
		this.$("#to-date").datepicker({
			dateFormat: "dd/mm/yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			onSelect: function (a) {
				$("#from-date").datepicker("option", "maxDate", a)
			}
		});
		this.$().delegate("#open-properties-list", "click", function () {
			$(this).hide();
			a.$("#list-opacity-block").show();
			a.$("#conversations-properties").animate({left: "0"}, function () {
				a.$("#close-properties-list").show();
				679 >
				window.innerWidth && $("#conversations-properties").show()
			})
		});
		this.$().delegate("#close-properties-list", "click", function () {
			$(this).hide();
			a.$("#conversations-properties").animate({left: "-100%"}, function () {
				a.$("#open-properties-list").show();
				a.$("#list-opacity-block").hide();
				679 > window.innerWidth && $("#conversations-properties").removeAttr("style")
			})
		});
		this.$().delegate("#open-details-view", "click", function () {
			$(this).hide();
			a.$("#message-opacity-block").show();
			a.$("#conversation-details-container").animate({
				left: "50px",
				"border-left-width": "1px"
			}, function () {
				a.$("#close-details-view").show()
			})
		});
		this.$().delegate("#close-details-view", "click", function () {
			$(this).hide();
			a.$("#conversation-details-container").animate({left: "100%", "border-left-width": "0px"}, function () {
				a.$("#open-details-view").show();
				a.$("#message-opacity-block").hide()
			})
		});
		this.$().delegate("#close-conversation", "click", function (c) {
			a.controller.hasToReload ? (a.controller.changeList("trash"), a.controller.hasToReload = !1) : a.controller.ticketHasChanged &&
				(a.controller.reloadList(), a.controller.ticketHasChanged = !1);
			a.controller.toggleList(!0);
			a.controller.clearConversationData();
			a.controller.saveLastView()
		});
		this.$().delegate("#conversation-purged-notification .close", "click", function (a) {
			$("#conversation-purged-notification").hide()
		});
		$("body").bind("click.messagingView", function (c) {
			$(c.target).parents(".tag").length || ($(c.target).hasClass("tt-suggestion") || a.$("#search-text").is(c.target) || a.$("#openFilter").is(c.target) || 0 !== a.$(".open").has(c.target).length ||
				$(c.target).hasClass("select2-result-label") || $(c.target).hasClass("close-selection") || $(c.target).parents(".ui-datepicker-header").length || a.alertIsActive) || a.manualCloseFilter()
		});
		this.$().delegate("#retrieveHistory", "click", function () {
			a.controller.retrieveNewHistory()
		});
		this.$("#tags").tagsinput({
			typeaheadjs: {
				source: a.tagsList, highlight: !0, displayText: function (a) {
					return a || ""
				}
			}, freeInput: !0, maxChars: 255
		});
		this.$("#tags").tagsinput("input").on("blur", function () {
			a.$("#tags").tagsinput("add", $(this).val());
			$(this).val("")
		});
		this.$("#tags").tagsinput("input").on("keydown", function (c) {
			if (13 === c.keyCode) return a.$("#tags").tagsinput("add", $(this).val()), $(this).val(""), !1
		});
		this.$("#tags").on("beforeItemAdd", function (c) {
			10 === a.$("#tags").tagsinput("items").length ? (c.cancel = !0, a.$("#tags").tagsinput("input").val(""), errorSave(a.$("#history-filter"), languageParser.translate("form_validation_messages", "ADD_TAG_LIMIT_EXCEEDED"))) : c.item && 255 < c.item.length && (c.cancel = !0, a.$("#tags").tagsinput("input").val(""),
				errorSave(a.$("#history-filter"), languageParser.translate("form_validation_messages", "tag_length_exceed")))
		});
		this.$("#tags").on("itemAdded", function () {
			inputWidth = 80;
			a.$(".tt-input")[0].style.cssText += "min-width : " + inputWidth + "px !important";
			a.$("#tags").tagsinput("input").typeahead("val", "")
		});
		this.$().delegate(".sub-filter", "click", function () {
			var c = $(this).attr("id").replace("select-", "");
			a.$(".sub-filter").removeClass("active");
			$(this).addClass("active");
			a.controller.changeStatus(parseInt(c, 10),
				!0)
		});
		this.$().delegate("#only-chats", "change", function () {
			$(this).is(":checked") ? a.controller.set("includeChats", !0) : a.controller.set("includeChats", !1);
			a.controller.reloadList()
		});
		this.$().delegate("#only-tickets", "change", function () {
			$(this).is(":checked") ? a.controller.set("includeTickets", !0) : a.controller.set("includeTickets", !1);
			a.controller.reloadList()
		})
	},
	handleCreateTicket: function (a) {
		this.set("ticketFormView", Tawk.NewTicketViewModal.create({controller: this.controller, fromHistory: a}));
		this.ticketFormView.append()
	},
	manualCloseFilter: function () {
		this.$("#conversations-search .input-group-btn").removeClass("open")
	},
	listLengthChange: function () {
		"inDOM" === this._state && (this.controller && this.controller.activeProperty && this.controller.activeProperty.list) && (0 !== this.controller.activeProperty.list.currentData.length || this.controller.isLoading || this.$("#youtube-container").show())
	}.observes("controller.activeProperty.list.currentData.length", "controller.isLoading")
});
Tawk.ContactsListView = Ember.View.extend({
	elementId: "contacts-list",
	template: Ember.TEMPLATES.contactsListView, classNames: "hidden", transcriptDataChanged: function () {
		"inDOM" === this._state && (this.controller.showList ? this.$().removeClass("hidden") : this.$().addClass("hidden"))
	}.observes("controller.showList"), didInsertElement: function () {
		var a = !1, c = this;
		this.transcriptDataChanged();
		this.$(".btn").tooltip();
		this.$().delegate(".open-contact", "click", function (a) {
			var b = $(this).attr("id");
			$(a.target).hasClass("create-ticket-contact") || $(a.target.parentNode).hasClass("create-ticket-contact") ?
				a.stopPropagation() : c.controller.openContact(b, function (a) {
					a || c.controller.toggleList(!1)
				})
		});
		this.$().delegate(".create-ticket-contact", "click", function (a) {
			var b = $(this).attr("data-id"), b = c.controller.activeProperty.list.getItem(b);
			a.stopPropagation();
			b && (c.set("ticketFormView", Tawk.NewTicketViewModal.create({
				controller: c.controller,
				recipientName: decodeStr(b.name),
				recipientEmail: b.email
			})), c.ticketFormView.append())
		});
		this.$("#contacts").bind("scroll.contactsList", function (d) {
			!a && c.controller.activeProperty.list.currentData.length &&
			$(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight - 100 && (a = !0, c.controller.nextContactsList(function () {
				a = !1
			}))
		})
	}
});
Ember.Handlebars.helper("ContactsListView", Tawk.ContactsListView);
Tawk.ConversationsListView = Ember.View.extend({
	elementId: "conversations-list",
	template: Ember.TEMPLATES.conversationListView,
	classNames: "hidden",
	transcriptDataChanged: function () {
		"inDOM" === this._state && (this.controller.showList ? this.$().removeClass("hidden") : this.$().addClass("hidden"))
	}.observes("controller.showList"),
	didInsertElement: function () {
		var a = !1, c = this;
		this.transcriptDataChanged();
		this.$(".btn").tooltip();
		this.$().delegate(".open-conversation", "click", function (a) {
			var b = $(this).attr("id");
			$(a.target).hasClass("bulk-check") || $(a.target).hasClass("mark-select") ? a.stopPropagation() : c.controller.openConversation(b, function (a) {
				a || c.controller.toggleList(!1)
			})
		});
		this.$().delegate(".bulk-check", "change", function () {
			var a = $(this).parents(".open-conversation").attr("id"), b = $(this).is(":checked");
			c.controller.toggleMark(a,
				b)
		});
		this.$("#bulk-conversations-delete").click(function () {
			c.controller.bulkDeleteConversations()
		});
		this.$("#bulk-conversations-unspam").on("click", function () {
			c.controller.bulkUnspam(function (a) {
				a ? c.showError("Unable to unspam tickets") : (c.showError(null), c.$(".bulk-check").prop("checked", !1))
			})
		});
		this.$("#bulk-conversations-restore").on("click", function () {
			c.controller.bulkConversationsRestore(function (a) {
				a ? c.showError("Unable to restore messages") : (c.showError(null), c.$(".bulk-check").prop("checked",
					!1))
			})
		});
		this.$("#bulk-conversations-purge").on("click", function () {
			c.controller.bulkConversationsPurge(function (a) {
				a ? c.showError("Unable to purge messages") : (c.showError(null), c.$(".bulk-check").prop("checked", !1))
			})
		});
		this.$().delegate("#sort-container li a", "click", function (a) {
			this.id ? c.controller.changeSort(this.id) : (a.preventDefault(), a.stopPropagation())
		});
		this.$("#conversation-list").bind("scroll.conversationList", function (d) {
			!a && c.controller.activeProperty.list.currentData.length && $(this).scrollTop() +
			$(this).height() >= $(this)[0].scrollHeight - 100 && (a = !0, c.controller.nextConversationsList(function (b, d) {
				a = !1;
				!b && d && c.$(".all-bulk-check").prop("checked", !1)
			}))
		});
		this.$().delegate(".all-bulk-check", "change", function () {
			var a = $(this).prop("checked");
			c.controller.toggleAllMark(a);
			c.$(".bulk-check").prop("checked", a)
		});
		this.$().delegate("#clear-bulk-selection", "click", function () {
			c.controller.toggleAllMark(!1)
		});
		0 !== this.$("#list-wrapper").outerHeight(!0) && this.$("#list-wrapper").css("top", this.$("#filter-header").outerHeight(!0));
		this.$("#filter-header").resize(function () {
			0 !== $(this).outerHeight(!0) && c.$("#list-wrapper") && c.$("#list-wrapper").length && c.$("#list-wrapper").css("top", $(this).outerHeight(!0))
		});
		this.$().delegate("#select-open-status", "click", function () {
			c.controller.changeStatus(1E3, !0)
		});
		this.$().delegate("#status-container li", "click", function () {
			c.controller.changeStatus(parseInt(this.id, 10), !0)
		});
		this.$().delegate("#status-container a.inactive", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			c.controller.changeStatus(c.controller.previousStatus,
				!0)
		});
		this.$().delegate("#select-my-message.inactive", "click", function () {
			c.controller.changeAssignee(Tawk.userController.user.id, !0)
		});
		this.$().delegate("#filter-assignee li", "click", function (a) {
			this.id ? (c.controller.changeAssignee(this.id, !0), c.$("#filter-assignee").removeClass("open")) : (a.preventDefault(), a.stopPropagation())
		});
		this.$().delegate("#filter-assignee .inactive", "click", function (a) {
			a.preventDefault();
			a.stopPropagation();
			"" === c.controller.previousAssignee ? c.controller.changeAssignee("0",
				!0) : null === c.controller.previousAssignee ? c.controller.changeAssignee("-1", !0) : "assigned" === c.controller.previousAssignee ? c.controller.changeAssignee("1", !0) : Array.isArray(c.controller.previousAssignee) && c.controller.changeAssignee(c.controller.previousAssignee, !0)
		});
		this.$().delegate("#filter-assignee", "change", function () {
			var a = $(":selected", this);
			a.parents(".custom-select").find(".selected-value").html(encodeStr(a.text()));
			c.controller.changeAssignee(a.val(), !0)
		})
	},
	showError: function (a) {
		"inDOM" ===
		this._state && (this.$("#action-error").remove(), a && this.$().append('<div id="action-error" class="alert alert-danger fade in"><button class="close" data-dismiss="alert">\u00d7</button>' + a + "</div>"))
	},
	willDestroyElement: function () {
		this.$("#conversation-list").unbind("scroll.conversationList")
	},
	bulkMarkedChanged: function () {
		var a;
		"inDOM" === this._state && (this.controller && this.controller.activeProperty && this.controller.activeProperty.list && this.controller.activeProperty.list.currentData) && (a = this.controller.activeProperty.list.currentData.filterProperty("isMarked",
			!0).length, 0 < a ? this.set("bulkMarkedTotal", languageParser.translate("conversations", "bulk_message_selected", {num: a})) : (this.set("bulkMarkedTotal", null), this.$(".all-bulk-check").prop("checked", !1), this.$(".bulk-check").prop("checked", !1)))
	}.observes("controller.activeProperty.list.currentData.@each.isMarked"),
	defaultGreeting: function () {
		return languageParser.translate("conversations", "default_greeting", {
			lineStart: "<p>",
			lineEnd: "</p>",
			name: Tawk.userController.user.fullName
		})
	}.property()
});
Ember.Handlebars.helper("ConversationsListView",
	Tawk.ConversationsListView);
Tawk.ConversationBase = Ember.Mixin.create({
	draw: !0, previewModal: null, currentIndexChanged: function () {
		"inDOM" === this._state && this.controller.conversationData && (this.controller.conversationData.indexNum ? (1 < this.controller.conversationData.indexNum ? this.$("#prev-conversation").removeClass("disabled") : this.$("#prev-conversation").addClass("disabled"), this.controller.conversationData.indexNum === this.controller.activeProperty.list.totalItems ? this.$("#next-conversation").addClass("disabled") :
			this.$("#next-conversation").removeClass("disabled")) : (this.$("#prev-conversation").addClass("disabled"), this.$("#next-conversation").addClass("disabled")))
	}.observes("controller.conversationData.indexNum"), conversationDataChanged: function () {
		"inDOM" === this._state && (this.controller.conversationData || this.controller.contactData ? (this.set("draw", !0), this.$().removeClass("hidden")) : this.$().addClass("hidden"))
	}.observes("controller.conversationData", "controller.contactData"), didInsertElement: function () {
		var a =
			this;
		this.conversationDataChanged();
		this.currentIndexChanged();
		this.$(".btn, .tab, .button-icon").tooltip();
		this.$().delegate(".uploaded-image", "click", function () {
			var c = $(this).attr("src");
			null !== a.previewModal ? (a.previewModal.set("imageSrc", c), a.previewModal.openView()) : (a.set("previewModal", Tawk.ImagePreview.create({imageSrc: c})), a.previewModal.append())
		})
	}, isPurgedChanged: function () {
		"inDOM" === this.state && this.controller && this.controller.conversationData && this.controller.conversationData.isPurged &&
		this.$().addClass("purged")
	}.observes("controller.conversationData.isPurged"), willDestroyElement: function () {
		this.previewModal && this.previewModal.remove();
		this.set("previewModal", null)
	}
});
Tawk.ConversationsTranscriptView = Ember.View.extend(Tawk.ConversationBase, Tawk.MessageSidebar, {
	elementId: "visitor-conversation-transcript",
	tagName: "article",
	classNames: ["visitor-chat-container chat-container conversation-transcript"],
	template: Ember.TEMPLATES.visitorTranscriptView,
	banView: null,
	didInsertElement: function () {
		var a =
			this;
		this._super();
		this.setupSidebarEvents();
		this.$(".chat-header").debounce("resize", function () {
			"inDOM" === a._state && (visitorUtils.updateResizeMenuAndSidebar(a), visitorUtils.initResizableSidebar(a))
		});
		this.$(".chat-header").resize();
		"function" === typeof this.$(".hover-location").popover && this.$(".hover-location").popover({html: !0});
		"function" === typeof this.$(".device-detail").popover && this.$(".device-detail").popover({viewport: this.$()});
		this.$().delegate(".hover-location", "mouseover", function () {
			"function" ===
			typeof $(this).popover && $(this).popover("show")
		});
		this.$().delegate(".hover-location", "mouseout", function () {
			"function" === typeof $(this).popover && $(this).popover("hide")
		});
		this.$().delegate(".device-detail", "mouseenter", function () {
			"function" === typeof $(this).popover && $(this).popover("show")
		});
		this.$().delegate(".device-detail", "mouseleave", function () {
			"function" === typeof $(this).popover && $(this).popover("hide")
		});
		this.$(".print-transcript").click(function () {
			a.$(".popover-details").addClass("hidden");
			a.controller.printTranscript()
		});
		this.$(".single-conversation-delete").click(function () {
			a.controller.deleteSingleHistory(function (c) {
				c ? errorSave(a.$(), "Unable to delete") : a.controller.toggleList(!0)
			});
			return !1
		});
		this.$().delegate("#open-past-conversations", "click", function () {
			a.controller.loadVisitorHistory()
		});
		this.$().delegate("#submit-notes", "click", function () {
			a.$("#notesForm").submit();
			return !1
		});
		this.$().delegate(".close-history", "click", function () {
			a.controller.closeChat()
		});
		this.$().delegate(".create-ticket-history",
			"click", function () {
				a.controller.convertChatToTicket()
			});
		this.$().delegate(".retry-load", "click", function () {
			var c = $(this).parents(".webrtc-call").attr("id");
			conversationProcess.processWebRTCCallBlock(c, a.controller.conversationData.pgid, null, !1, function (d, b) {
				b && a.controller.conversationData.set("calllData." + c, b)
			})
		});
		this.$().delegate(".join-call", "click", function () {
			var c = $(this).parents(".webrtc-call").attr("id");
			visitorUtils.joinWebRTCCall(a, null, c)
		})
	},
	tagsChanged: function () {
		var a = this;
		"inDOM" ===
		this._state && (this.controller.conversationData && this.controller.conversationData.tags) && (this.$(".transcript-tags").tagsinput("removeAll"), this.controller.conversationData.tags.forEach(function (c) {
			a.$(".transcript-tags").tagsinput("add", decodeStr(c))
		}))
	}.observes("controller.conversationData.tags"),
	willDestroyElement: function () {
		this.removeSidebarViews()
	},
	openSidebar: function () {
		this.$().removeClass("no-sidebar");
		this.previousTabSelected ? this.$(".open-view[data-id=" + this.previousTabSelected + "]").click().addClass("active") :
			visitorUtils.openFirstTab(this.$(".menu"))
	},
	closeSidebar: function () {
		this.$().addClass("no-sidebar");
		this.set("previousTabSelected", null)
	}
});
Ember.Handlebars.helper("ConversationsTranscriptView", Tawk.ConversationsTranscriptView);
Tawk.TicketConversationsView = Ember.View.extend(Tawk.ConversationBase, Tawk.MessageSidebar, {
	elementId: "ticket-conversations",
	tagName: "article",
	template: Ember.TEMPLATES.ticketConversationsView,
	classNames: ["ticket-container chat-container conversation-transcript"],
	noteAttachedFiles: [],
	ticketAttachedFiles: [],
	messageTag: null,
	noteTag: null,
	convertDetails: {},
	willDestroyElement: function () {
		this.lastReplyStart && this.controller.notifyStopReply(function (a) {
		})
	},
	priorityChanged: function () {
		"inDOM" === this._state && this.controller.conversationData && this.$("#current-ticket-priority").val(this.controller.conversationData.p)
	}.observes("controller.conversationData.p"),
	assigneeChanged: function () {
		"inDOM" === this._state && this.controller.conversationData && (this.controller.conversationData.assgnId ? this.$("#current-ticket-assignee").val(this.controller.conversationData.assgnId) :
			this.$("#current-ticket-assignee").val("0"))
	}.observes("controller.conversationData.assgnId"),
	statusChanged: function () {
		"inDOM" === this._state && this.controller.conversationData && this.$("#current-ticket-status").val(this.controller.conversationData.s)
	}.observes("controller.conversationData.s"),
	replyTicketContainerEvent: function (a) {
		var c = $(a).text();
		1 === c.length && this.$("#reply-container").hasClass("state-error") && (this.$("#reply-container").removeClass("state-error"), this.$(".conversation-input-container #error-submit").addClass("hidden"));
		if (0 !== c.length && 0 === $(a).find(".placeholder").length) {
			if (this.controller.storeDraft(this.handleReply(null, !0)), !this.lastReplyStart || this.lastReplyStart + 45E3 < (new Date).getTime()) this.set("lastReplyStart", (new Date).getTime()), this.controller.notifyStartReply(function (a) {
			})
		} else this.set("lastReplyStart", null), this.controller.notifyStopReply(function (a) {
		}), this.controller.storeDraft(null)
	},
	pasteEventFunction: function (a) {
		var c, d = !1, b = null;
		if (c = (a.originalEvent || a).clipboardData) {
			if ((c = c.items) && c.length) for (var e =
				0; e < c.length; e++) {
				if ("text/plain" === c[e].type) {
					d = !0;
					break
				}
				if (-1 !== c[e].type.indexOf("image")) {
					var f = c[e].getAsFile();
					null !== f && (b = f, b.name = languageParser.translate("generic", "pasted_image_title", {dateTime: moment().format("DD-MMM-YYYY hh:mmA")}))
				}
			}
			if (b && !d) return a.preventDefault(), a.stopImmediatePropagation(), this.startUpload(b, null), !1
		}
	},
	didInsertElement: function () {
		var a = this, c = Tawk.shortcutsController.getPropertyShortcuts(a.controller.activeProperty.id),
			d = this.isNote ? this.noteAttachedFiles : this.ticketAttachedFiles,
			b = this.controller.get("assigneeList");
		this._super();
		this.setupSidebarEvents();
		0 === this.controller.activeProperty.tabSettings.length && (this.set("detailsView", Tawk.TicketDetailsView.create({
			content: this.controller.conversationData,
			controller: this.controller,
			showSavingOverlay: this.showSavingOverlay.bind(this),
			hideSavingOverlay: this.hideSavingOverlay.bind(this),
			showError: this.showError.bind(this)
		})), this.detailsView.appendTo(this.$(".details-view")), this.updateSubView(this.$(".details-view")));
		this.$(".chat-header").debounce("resize",
			function () {
				"inDOM" === a._state && (visitorUtils.updateResizeMenuAndSidebar(a), visitorUtils.initResizableSidebar(a))
			});
		this.$(".chat-header").resize();
		this.$().delegate("#close-conversation", "click", function (b) {
			a.controller.checkChangeAllowed() || b.stopPropagation();
			a.controller.notifyStopReply(function (a) {
			})
		});
		this.$("#open-reply").on("click", function () {
			a.set("isNote", !1)
		});
		this.$("#open-note").on("click", function () {
			a.set("isNote", !0)
		});
		this.$().delegate("#convert-name, #convert-email", "change", function () {
			a.$("#details-form").valid()
		});
		this.$().delegate(".hidden-messages", "click", function () {
			a.$(".no-line").removeClass("no-line").addClass("single-line");
			$(this).remove()
		});
		this.$().delegate(".single-line", "click", function () {
			$(this).removeClass("single-line").addClass("expand-line")
		});
		this.$().delegate(".expand-line .ticket-header", "click", function () {
			$(this).parent().removeClass("expand-line").addClass("single-line")
		});
		this.$("#reply-ticket-message").on("paste", function (b) {
			return a.pasteEventFunction(b)
		});
		this.$("#reply-note-message").on("paste",
			function (b) {
				return a.pasteEventFunction(b)
			});
		this.$().delegate("#single-ticket-spam", "click", function () {
			a.$(".overlay").show();
			a.controller.markTicketAsSpam(function (b) {
				a.$(".overlay").hide();
				b ? a.showError("Unable to mark ticket as spam") : (a.showError(null), a.controller.toggleList(!0))
			})
		});
		this.$().delegate("#single-ticket-not-spam", "click", function () {
			a.$(".overlay").show();
			a.controller.removeTicketFromSpam(function (b) {
				a.$(".overlay").hide();
				b ? a.showError("Unable to remove ticket from spam") : (a.showError(null),
					a.controller.toggleList(!0))
			})
		});
		this.$().delegate("#single-ticket-delete", "click", function () {
			a.controller.deleteTicket(function (b) {
				b ? a.showError("Unable to delete ticket") : (a.showError(null), a.controller.toggleList(!0))
			})
		});
		this.$().delegate("#single-ticket-restore", "click", function () {
			a.$(".overlay").show();
			a.controller.restoreTicket(function (b) {
				a.$(".overlay").hide();
				b ? a.showError("Unable to restore ticket") : (a.showError(null), a.controller.toggleList(!0))
			})
		});
		this.$().delegate("#single-ticket-close",
			"click", function () {
				a.$(".overlay").show();
				a.controller.closeTicket(function (b) {
					"inDOM" === a._state && (a.$(".overlay").hide(), b ? a.showError("Unable to close ticket") : a.$("#close-conversation").click())
				})
			});
		this.set("messageTag", new TagAgent(b.agents, c, this.$("#reply-ticket-watchers"), this.$("#reply-ticket-shortcuts"), this.$("#reply-ticket-message"), languageParser.translate("placeholders", "type_here")));
		this.set("noteTag", new TagAgent(b.agents, c, this.$("#reply-note-watchers"), this.$("#reply-note-shortcuts"),
			this.$("#reply-note-message"), languageParser.translate("placeholders", "add_private_note")));
		this.$(".inner-reply-container").resize(function () {
			var b;
			b = $(this).outerHeight(!0);
			"inDOM" === a._state && (38 < b ? (b += 70, b > a.$(".chat-body").height() - 150 && (b = a.$(".chat-body").height() - 150), a.$(".conversation-input-container").css("height", b + "px"), a.$(".message-container").css("bottom", b + 45 + "px")) : (a.$(".conversation-input-container").css("height", "120px"), a.$(".message-container").css("bottom", "165px")))
		});
		setTimeout(function () {
			if (a.controller.conversationData &&
				a.controller.conversationData.draftedText) {
				var b = [], b = /@\[([a-z0-9]){24,24}(:)(.+?)\]/g, c = /MSIE/.test(navigator.userAgent),
					g = a.controller.conversationData.draftedText.message,
					h = a.controller.conversationData.draftedText.attachments;
				a.controller.conversationData.draftedText.private && (a.set("isNote", !0), a.$("#open-note").trigger("click"));
				h && h.length && h.forEach(function (a) {
					d.pushObject({
						handle: a.handle,
						fileName: a.fName,
						fileSize: formatFileSize(a.size),
						name: a.name,
						downloadUrl: GLOBAL_FILE_STORAGE_URL + "/" +
						a.name,
						originalSize: a.size,
						mimeType: a.mime,
						type: a.type
					})
				});
				g && (b = g.match(b), null !== b && b.forEach(function (a) {
					var b = a.substring(2, a.length - 1).split(":");
					g = g.replace(a, '<span class="highlight" contentEditable="' + (c ? "true" : "false") + '" data-id="' + b[0] + '">&nbsp;' + encodeStr(b[1]) + "&nbsp;</span>")
				}), a.isNote ? a.$("#reply-note-message").html(g) : a.$("#reply-ticket-message").html(g))
			}
		});
		this.$("#reply-ticket-attachment").on("change", function () {
			var b, c = 0, d = 0;
			b = $(this)[0];
			var h = function () {
				d++;
				d === c && a.$("#reply-ticket-attachment").val("")
			};
			if (void 0 === window.FormData) a.$("#reply-ticket-attachment")[0].value && (c = 1, a.startUpload(a.$("#reply-upload-form")[0], !0, h)); else if ((b = b.files) && b.length) for (var k = 0; k < b.length; k++) a.startUpload(b[k], null, h)
		});
		Modernizr.draganddrop && (this.$().bind("dragenter", function (a) {
			a.preventDefault();
			a.stopPropagation()
		}), this.$().bind("dragover", function (b) {
			b.preventDefault();
			b.stopPropagation();
			a.controller.conversationData.isNewConvert || a.$("#reply-container").addClass("drag-over")
		}), this.$().bind("dragleave",
			function (b) {
				b.preventDefault();
				b.stopPropagation();
				a.controller.conversationData.isNewConvert || $(b.target).parents("#reply-container").length || a.$("#reply-container").removeClass("drag-over")
			}), this.$().bind("dragend", function (b) {
			b.preventDefault();
			b.stopPropagation();
			a.controller.conversationData.isNewConvert || a.$("#reply-container").removeClass("drag-over")
		}), this.$().bind("drop", function (b) {
			b.preventDefault();
			b.stopPropagation();
			if (!a.controller.conversationData.isNewConvert) {
				b = b.target.files ||
					b.dataTransfer.files;
				var c = 0, d = 0, h = function () {
					d++;
					d === c && a.$("#reply-ticket-attachment").val("")
				};
				a.$("#reply-container").removeClass("drag-over");
				if (b && 0 !== b.length) for (var c = b.length, k = 0; k < b.length; k++) a.startUpload(b[k], null, h)
			}
		}));
		this.$().delegate(".delete-attachment", "click", function () {
			var b = $(this).attr("id"), c = a.isNote ? a.noteAttachedFiles : a.ticketAttachedFiles;
			(b = c.findProperty("handle", b)) && c.removeObject(b)
		});
		this.$().delegate(".submit-reply", "click", function () {
			var b = $(this).attr("data-id");
			b && (b = parseInt(b, 10));
			a.set("lastReplyStart", null);
			a.controller.notifyStopReply(function (a) {
			});
			a.handleReply(b)
		});
		this.$().delegate("#reply-container", "click", function () {
			a.isNote ? a.$("#reply-note-message").focus() : a.$("#reply-ticket-message").focus()
		});
		this.$("#reply-ticket-message").on("keyup paste blur", function () {
			a.replyTicketContainerEvent(this)
		});
		this.$("#reply-note-message").on("keyup paste blur", function () {
			a.replyTicketContainerEvent(this)
		});
		this.$().delegate("#discard-convert", "click", function () {
			a.controller.discardTicketConvert()
		});
		this.controller.conversationData && this.controller.conversationData.isNewConvert ? this.set("convertDetails", {
			priority: a.controller.conversationData.p,
			assigneeId: a.controller.conversationData.assgnId || "0",
			name: a.content.visitor.n,
			email: a.content.visitor.e,
			tags: []
		}) : this.set("convertDetails", {});
		this.$().delegate("#current-ticket-priority", "change", function () {
			a.controller.conversationData.isNewConvert && a.set("convertDetails.priority", parseInt($(this).val(), 10))
		});
		this.$().delegate("#current-ticket-assignee",
			"change", function () {
				a.controller.conversationData.isNewConvert && a.set("convertDetails.assigneeId", $(this).val())
			});
		this.$().delegate("#convert-name", "change", function () {
			a.controller.conversationData.isNewConvert && a.set("convertDetails.name", $(this).val())
		});
		this.$().delegate("#convert-email", "change", function () {
			a.controller.conversationData.isNewConvert && a.set("convertDetails.email", $(this).val())
		});
		this.$().delegate("#ticket-tags", "change", function () {
			a.controller.conversationData.isNewConvert && a.set("convertDetails.tags",
				$(this).val().split(","))
		});
		this.$("#ticket-action-error .close").click(function (b) {
			b.stopPropagation();
			a.$("#ticket-action-error").addClass("hidden")
		})
	},
	showError: function (a) {
		"inDOM" === this._state && (a ? (this.$(".error-message").html(a), this.$("#ticket-action-error").removeClass("hidden")) : (this.$(".error-message").html(""), this.$("#ticket-action-error").addClass("hidden")))
	},
	messagesChanged: function () {
		var a = this;
		setTimeout(function () {
			"inDOM" === a._state && a.controller && a.controller.conversationData &&
			a.controller.conversationData && (a.controller.conversationData.messages && a.$(".message-container").length) && a.$(".message-container").scrollTop(9999999999)
		}, 10)
	}.observes("controller.conversationData.messages.length"),
	startUpload: function (a, c, d) {
		var b, e = this, f = this.isNote ? this.noteAttachedFiles : this.ticketAttachedFiles;
		d = d || function () {
		};
		fileUploader.getUploadHandler(function (g, h) {
			var k, l;
			if (g) return e.handleUploadError(a, l, k, c), d();
			k = h.handle;
			l = c ? $(a).find(".file-input").val().replace(/^.*\\/, "") :
				a.name || a.fileName;
			b = $('<div id="upload-' + k + '" class="upload-data"></div>');
			b.append("<span>" + encodeStr(l) + "</span>");
			b.append('<div class="progress progress-sm progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0.5%"></div></div>');
			b.on("progressUpdate", function (a, b) {
				$(this).find(".progress-bar").css("width", b + "%")
			});
			b.on("uploadComplete", function (a, b) {
				f.pushObject({
					handle: b.handle,
					fileName: b.filename,
					fileSize: formatFileSize(b.size),
					name: b.name,
					downloadUrl: GLOBAL_FILE_STORAGE_URL +
					"/" + b.name,
					originalSize: b.size,
					mimeType: b.mimeType,
					type: b.extension
				});
				$(this).remove();
				e.$("#reply-container").scrollTop(9999999)
			});
			e.$("#reply-attachments-container").append(b);
			e.$("#reply-container").scrollTop(9999999);
			e.controller.addAttachment(k, a, c, !1, function (b, f) {
				b && e.handleUploadError(a, l, k, c, f);
				d()
			})
		})
	},
	handleUploadError: function (a, c, d, b, e) {
		c = c ? ' "' + encodeStr(c) + '"' : "";
		e = e || "upload_file_error";
		if (d) {
			a = this.$().find("#upload-" + d);
			if (!a.length) return;
			a.remove()
		}
		this.showError(languageParser.translate("visitors",
			e, {fileName: c}))
	},
	handleReply: function (a, c) {
		var d = this, b = {}, e = this.isNote ? this.noteTag : this.messageTag,
			f = this.isNote ? this.noteAttachedFiles : this.ticketAttachedFiles;
		e.parseContentDiv();
		b.watchers = e.getAgentsList();
		b.plainMessage = e.getPlainText();
		if (b.plainMessage.length) {
			a && (b.status = a);
			b.message = e.richMessage;
			b.private = this.isNote;
			b.attachments = f.map(function (a) {
				return {
					name: a.name,
					fName: a.fileName,
					mime: a.mimeType,
					type: a.type,
					size: a.originalSize,
					handle: a.handle
				}
			});
			if (c) return b.message = encodeStr(b.message),
				b;
			if (this.controller.conversationData.isNewConvert) {
				var g = this.convertDetails.assigneeId;
				this.$("#details-form").length && !this.$("#details-form").valid() ? this.showError("Please make sure all the details are correct in the details section.") : (b.tags = this.convertDetails.tags, b.priority = this.convertDetails.priority, b.requester = {
					name: this.convertDetails.name,
					email: this.convertDetails.email
				}, "0" === g ? (b.assigneeId = null, b.assigneeType = null) : (b.assigneeId = g, b.assigneeType = this.controller.getAssigneeType(g)),
					b.private = !1, b.subject = this.controller.conversationData.subj, b.chatId = this.controller.conversationData.chatId, this.controller.createTicket(b, !1, function (a) {
					a ? d.showError("Unable to create ticket") : (f.clear(), e.clearInputText())
				}))
			} else this.controller.sendTicketReply(b, function (a) {
				a ? d.showError("Unable to send reply") : (f.clear(), d.$("#close-conversation").click())
			})
		} else e.showEmptyError()
	},
	savePromptChanged: function () {
		var a;
		"inDOM" === this._state && (a = this.isNote ? this.noteTag : this.messageTag, this.controller.conversationData &&
		this.controller.conversationData.savePrompt && (a.parseContentDiv(), a.getPlainText().length ? this.$().append('<div class="alert alert-danger fade in"><button class="close" data-dismiss="alert">\ufffd</button><i class="fa-fw fa fa-ban"></i>This ticket hasn\'t been created, click \'Send\' to complete this or the \'Discard\' button below to cancel the ticket creation.</div>') : this.handleReply(), this.controller.set("conversationData.savePrompt", !1)))
	}.observes("controller.conversationData.savePrompt"),
	showSavingOverlay: function () {
		this.$(".overlay").show()
	},
	hideSavingOverlay: function () {
		this.$(".overlay").hide()
	},
	openSidebar: function () {
		this.$().removeClass("no-sidebar");
		this.previousTabSelected ? this.$(".open-view[data-id=" + this.previousTabSelected + "]").click().addClass("active") : visitorUtils.openFirstTab(this.$(".menu"))
	},
	closeSidebar: function () {
		this.$().addClass("no-sidebar");
		this.set("previousTabSelected", null)
	}
});
Ember.Handlebars.helper("TicketConversationsView", Tawk.TicketConversationsView);
Tawk.NewTicketView = Ember.View.extend({
	template: Ember.TEMPLATES.newTicketView,
	attachedFiles: null,
	fromHistory: null,
	currentProperty: null,
	tagsList: null,
	classNames: ["new-ticket-form-view"],
	willInsertElement: function () {
		var a, c, d, b = this, e = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: []
		});
		this.set("attachedFiles", []);
		this.set("tagsList", e);
		this.tagsList.initialize();
		this.fromChat && (a = Tawk.webProperties.getProperty(this.currentProperty)) && (c = [], d = [], a.departments && Object.keys(a.departments).forEach(function (b) {
			var c =
				a.departments[b];
			c.en && c.a.length && d.pushObject(Ember.Object.create({id: b, name: c.n}))
		}), a.currentAgents.forEach(function (b) {
			var d;
			!b.en || b.aid === Tawk.userController.user.id || b.ha && !Tawk.userController.user.isHiredAgent || (d = Tawk.agentsController.getAgent(b.aid)) && c.pushObject(Ember.Object.create({
				id: b.aid,
				name: d.name,
				isPropertyClient: Tawk.userController.user.isHiredAgent && !b.ha && a.isClientProperty
			}))
		}), this.set("departments", sortList(d, "name")), this.set("agents", sortList(c, "name")), d = c = null, this.controller.getTicketTagListForProperty(this.currentProperty,
			function (a, c) {
				a || (b.tagsList.local.clear(), b.set("tagsList.local", c), b.tagsList.initialize(!0))
			}))
	},
	activePropertyChanged: function () {
		var a;
		"inDOM" === this._state && (!this.fromChat && this.controller && this.controller.activeProperty) && (a = this.controller.get("assigneeList"), this.set("currentProperty", this.controller.activeProperty.id), this.set("departments", a.departments), this.set("agents", a.agents))
	}.observes("controller.activeProperty.id"),
	availableTagsChanged: function () {
		var a;
		"inDOM" === this._state && (this.controller &&
			this.controller.activeProperty && this.controller.activeProperty.availableTags && this.tagsList) && (a = this.controller.activeProperty.get("availableTags"), this.tagsList.local.clear(), this.set("tagsList.local", a), this.tagsList.initialize(!0))
	}.observes("controller.activeProperty.availableTags"),
	didInsertElement: function () {
		var a, c = this, d = (new Date).getTime();
		this.$(".attach-files-list").attr("id", d);
		this.$(".attach-trigger-label").attr("for", d);
		this.activePropertyChanged();
		this.availableTagsChanged();
		a = this.fromChat ?
			[] : Tawk.shortcutsController.getPropertyShortcuts(this.controller.activeProperty.id);
		this.$(".ticket-message").on("paste", function (a) {
			var b, d = !1, h = null;
			if (b = (a.originalEvent || a).clipboardData) {
				if ((b = b.items) && b.length) for (var k = 0; k < b.length; k++) {
					if ("text/plain" === b[k].type) {
						d = !0;
						break
					}
					if (-1 !== b[k].type.indexOf("image")) {
						var l = b[k].getAsFile();
						null !== l && (h = l, h.name = languageParser.translate("generic", "pasted_image_title", {dateTime: moment().format("DD-MMM-YYYY hh:mmA")}))
					}
				}
				if (h && !d) return a.preventDefault(),
					a.stopImmediatePropagation(), c.startUpload(h, null), !1
			}
		});
		this.$(".new-ticket-tags").tagsinput({
			typeaheadjs: {
				source: c.tagsList,
				highlight: !0,
				displayText: function (a) {
					return a || ""
				}
			}, freeInput: !0, maxChars: 255
		});
		this.$(".new-ticket-tags").tagsinput("input").on("blur", function () {
			c.$(".new-ticket-tags").tagsinput("add", $(this).val());
			$(this).val("")
		});
		this.$(".new-ticket-tags").tagsinput("input").on("keydown", function (a) {
			if (13 === a.keyCode) return c.$(".new-ticket-tags").tagsinput("add", $(this).val()), $(this).val(""),
				!1
		});
		this.$(".new-ticket-tags").on("beforeItemAdd", function (a) {
			10 === c.$(".new-ticket-tags").tagsinput("items").length ? (a.cancel = !0, c.$(".new-ticket-tags").tagsinput("input").val(""), errorSave(c.$(".tag-form form"), languageParser.translate("form_validation_messages", "ADD_TAG_LIMIT_EXCEEDED"))) : a.item && 255 < a.item.length && (a.cancel = !0, c.$(".new-ticket-tags").tagsinput("input").val(""), errorSave(c.$(".tag-form form"), languageParser.translate("form_validation_messages", "tag_length_exceed")))
		});
		this.$(".new-ticket-tags").on("itemAdded",
			function () {
				var a, b = c.$(".bootstrap-tagsinput").width() - 55, d = 0;
				c.$(".tag").each(function (a, c) {
					d += $(c).outerWidth(!0);
					$(c).css("max-width", b)
				});
				a = b - d;
				100 > a && (a = 100);
				c.$(".tt-input")[0].style.cssText += "min-width : " + a + "px !important";
				c.$(".new-ticket-tags").tagsinput("input").typeahead("val", "")
			});
		var b = new TagAgent(this.agents, a, this.$(".ticket-watchers"), this.$(".ticket-shortcuts"), this.$(".ticket-message"));
		this.$().delegate(".submit", "click", function () {
			c.$(".ticket-form").submit();
			return !1
		});
		this.$(".ticket-form").validate({
			errorPlacement: function (a,
			                          b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (a) {
				a = {
					attachments: [],
					watchers: [],
					requester: {
						name: c.$(".requester-name").val(),
						email: c.$(".requester-email").val(),
						firstNameLetter: c.$(".requester-name").val()[0]
					},
					subject: c.$(".ticket-subject").val(),
					message: "",
					tags: c.$(".new-ticket-tags").tagsinput("items"),
					priority: c.$(".ticket-priority").val(),
					assigneeId: c.$(".ticket-assignee").val()
				};
				b.parseContentDiv();
				a.watchers = b.getAgentsList();
				a.plainMessage = b.getPlainText();
				if (a.plainMessage.length) return a.message =
					b.richMessage, a.priority = parseInt(a.priority, 10), a.attachments = c.attachedFiles.map(function (a) {
					return {name: a.name, fName: a.fileName, mime: a.mimeType, type: a.type, size: a.originalSize}
				}), "0" === a.assigneeId ? (a.assigneeId = null, a.assigneeType = null) : c.departments.findProperty("id", a.assigneeId) ? a.assigneeType = "department" : a.assigneeType = "agent", c.chatId && (a.chatId = c.chatId), c.fromChat && (a.propertyId = c.currentProperty), c.controller.createTicket(a, c.fromHistory, function (a, b) {
					if (a) return errorSave(c.$(), languageParser.translate("form_validation_messages",
						"error_ticket_create"));
					c.resetForm();
					c.parentView ? c.parentView.$().modal("hide") : successSave(c.$(), languageParser.translate("form_validation_messages", "success_ticket_create") + (b ? "<br/>" + languageParser.translate("form_validation_messages", "ticket_create_id") + b : ""))
				}), !1;
				b.showEmptyError()
			}
		});
		this.$().on("hide.bs.modal", function (a) {
			c.$().remove()
		});
		this.$("#" + d).on("change", function (a) {
			var b, d = 0, h = 0;
			b = $(this)[0];
			var k = function () {
				h++;
				h === d && c.$("#reply-ticket-attachment").val("")
			};
			if (void 0 === window.FormData) $(this)[0].value &&
			(d = 1, c.startUpload(c.$(".new-upload-form")[0], !0, k)); else {
				b = b.files;
				if (!b || !b.length) return;
				for (var l = 0; l < b.length; l++) c.startUpload(b[l], null, k)
			}
			a.preventDefault();
			a.stopImmediatePropagation()
		});
		this.$().delegate(".delete-attachment", "click", function () {
			var a = $(this).attr("id");
			(a = c.attachedFiles.findProperty("handle", a)) && c.attachedFiles.removeObject(a)
		});
		this.$().delegate("#property-id", "change", function () {
			var a = $(this).val();
			c.controller.openProperty(a)
		});
		this.$().delegate(".cancel-ticket-form",
			"click", function () {
				"function" === typeof c.closeFunction && c.closeFunction()
			})
	},
	startUpload: function (a, c, d) {
		var b, e = this;
		d = d || function () {
		};
		fileUploader.getUploadHandler(function (f, g) {
			var h, k;
			if (f) return e.handleUploadError(a, k, h, c), d();
			h = g.handle;
			k = c ? $(a).find(".file-input").val().replace(/^.*\\/, "") : a.name || a.fileName;
			b = $('<div id="upload-' + h + '" class="upload-data"></div>');
			b.append("<span>" + encodeStr(k) + "</span>");
			b.append('<div class="progress progress-sm progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0.5%"></div></div>');
			b.on("progressUpdate", function (a, b) {
				$(this).find(".progress-bar").css("width", b + "%")
			});
			b.on("uploadComplete", function (a, b) {
				e.attachedFiles.pushObject({
					handle: b.handle,
					fileName: b.filename,
					fileSize: formatFileSize(b.size),
					name: b.name,
					downloadUrl: GLOBAL_FILE_STORAGE_URL + "/" + b.name,
					originalSize: b.size,
					mimeType: b.mimeType,
					type: b.extension
				});
				$(this).remove();
				e.$(".modal-body").scrollTop(9999999)
			});
			e.$(".upload-attachment-container").append(b);
			e.$(".modal-body").scrollTop(9999999);
			e.controller.addAttachment(h,
				a, c, !0, function (b, f) {
					b && e.handleUploadError(a, k, h, c, f);
					d()
				}, e.isNotModal ? e.currentProperty : null)
		})
	},
	handleUploadError: function (a, c, d, b, e) {
		c = c ? ' "' + encodeStr(c) + '"' : "";
		e = e || "upload_file_error";
		if (d) {
			a = this.$().find("#upload-" + d);
			if (!a.length) return;
			a.remove()
		}
		this.saveError(languageParser.translate("visitors", e, {fileName: c}))
	},
	resetForm: function () {
		this.$(".ticket-subject").val("");
		this.$(".ticket-message").html('<p class="placeholder">' + languageParser.translate("placeholders", "enter_message") + "</p>");
		this.$(".ticket-assignee").val(Tawk.userController.user.id);
		this.$(".ticket-priority").val("3000");
		this.$(".new-ticket-tags").tagsinput("removeAll");
		this.attachedFiles.clear()
	}
});
Ember.Handlebars.helper("NewTicketView", Tawk.NewTicketView);
Tawk.NewTicketViewModal = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.newTicketViewModal,
	elementId: "new-ticket",
	classNames: ["modal"],
	openView: function () {
		this.$().modal({backdrop: "static", keyboard: !1})
	}
});
Tawk.ContactView = Ember.View.extend(Tawk.ConversationBase,
	{
		elementId: "contact-container",
		classNames: "conversation-transcript",
		template: Ember.TEMPLATES.contactView,
		timelineChanged: function () {
			var a = this;
			"inDOM" === this._state && (this.controller && this.controller.contactData) && setTimeout(function () {
				a.$(".message-container")[0].scrollTop = 9999999
			}, 0)
		}.observes("controller.contactData.timeline"),
		didInsertElement: function () {
			var a = this;
			this._super();
			this.timelineChanged();
			this.$().delegate(".view-transcript", "click", function () {
				var c = $(this).attr("data-id");
				a.controller.set("modalTranscriptData",
					null);
				a.transcriptView ? a.transcriptView.openView() : (a.set("transcriptView", Tawk.TranscriptView.create({controller: a.controller})), a.transcriptView.append());
				a.controller.getModalTranscriptData(c, !0, function (a) {
				})
			});
			this.$().delegate(".view-ticket", "click", function () {
				var c = $(this).attr("data-id");
				a.controller.getModalTicketData(c, function (c) {
					c || (a.ticketView ? a.ticketView.openView() : (a.set("ticketView", Tawk.TicketView.create({controller: a.controller})), a.ticketView.append()))
				})
			});
			this.$().delegate("#loader-contact-timeline",
				"click", function () {
					a.controller.loadContactEvents()
				})
		},
		willDestroyElement: function () {
			this.ticketView && this.ticketView.destroy();
			this.transcriptView && this.transcriptView.destroy()
		},
		currentIndexChanged: function () {
			this.controller.contactData && (this.controller.contactData.indexNum ? (1 < this.controller.contactData.indexNum ? this.$("#prev-conversation").removeClass("disabled") : this.$("#prev-conversation").addClass("disabled"), this.controller.contactData.indexNum === this.controller.activeProperty.list.totalItems ?
				this.$("#next-conversation").addClass("disabled") : this.$("#next-conversation").removeClass("disabled")) : (this.$("#prev-conversation").addClass("disabled"), this.$("#next-conversation").addClass("disabled")))
		}.observes("controller.contactData.indexNum")
	});
Ember.Handlebars.helper("ContactView", Tawk.ContactView);
Tawk.TranscriptView = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.transcript,
	classNames: ["modal", "transcript-view"],
	controller: null,
	draw: !0,
	mapError: !1,
	previewModal: null,
	didInsertElement: function () {
		var a =
			this;
		this.$().on("hidden.bs.modal", function (c) {
			a.$().find('a[data-target="#transcript"]').trigger("click")
		});
		this.$().delegate(".transcript-btn", "click", function () {
			var c = $(this), d = $(this).attr("data-target");
			a.clearSaveMessages();
			if ("#print" === d) return printTranscript(a.controller.modalTranscriptData), !1;
			if ("#delete" === d) return a.controller.deleteSingleHistory(function (b) {
				b ? a.saveError(languageParser.translate("form_validation_messages", "delete_history_error")) : a.$().modal("hide")
			}), !1;
			a.$(".transcript-btn").removeClass("active");
			c.addClass("active");
			a.$(".transcript-pane").addClass("hidden");
			$(d).removeClass("hidden");
			a.$(".other-btn").addClass("hidden");
			"#email" === d ? a.$("#sendEmail").removeClass("hidden") : "#notes" === d ? a.$("#submit-notes").removeClass("hidden") : "#ban" === d ? a.$("#submitBan").removeClass("hidden") : "#copy" === d ? getCopyFormat(a.controller.modalTranscriptData) : "#details" === d && a.locationChanged();
			return !1
		});
		this.$().delegate(".copy-transcript", "click", function () {
			$(this).select()
		});
		this.$().delegate("#sendEmail",
			"click", function () {
				a.$("#emailTranscript").submit();
				return !1
			});
		this.$().delegate("#submit-notes", "click", function () {
			a.$("#notesForm").submit();
			return !1
		});
		this.$().delegate("#submitBan", "click", function () {
			a.$("#banVisitor").submit();
			return !1
		});
		this.$().delegate(".uploaded-image", "click", function () {
			var c = $(this).attr("src");
			null !== a.previewModal ? (a.previewModal.set("imageSrc", c), a.previewModal.openView()) : (a.set("previewModal", Tawk.ImagePreview.create({imageSrc: c})), a.previewModal.append())
		});
		this.$().delegate(".join-call",
			"click", function () {
				var c = $(this).parents(".webrtc-call").attr("id");
				joinWebRTCCall(a.controller.modalTranscriptData, null, c, function (c, b) {
					c && (errorMessage = b ? languageParser.translate("visitors", b.message) : feature ? feature.screen ? languageParser.translate("visitors", "webrtc_screenshare_error") : languageParser.translate("visitors", "webrtc_call_error") : languageParser.translate("visitors", "join_call_error"), a.saveError(errorMessage))
				})
			});
		this.$().delegate(".retry-load", "click", function () {
			var c = $(this).parents(".webrtc-call").attr("id");
			conversationProcess.processWebRTCCallBlock(c, a.controller.modalTranscriptData.pgid, null, !1, function () {
				calllData && a.controller.modalTranscriptData.set("callData." + c, calllData)
			})
		});
		this._super();
		this.transcriptChanged()
	},
	resizeView: function () {
		"inDOM" === this._state && (this._super(), this.$(".copy-transcript").css("height", this.maxBodyHeight - 56))
	},
	onModalShown: function () {
		var a = this;
		this.$(".transcript-btn").tooltip();
		this.$("#emailTranscript").validate({
			rules: {emails: {required: !0, multiemail: 10}}, messages: {
				emails: {
					multiemail: languageParser.translate("form_validation_messages",
						"email") + "(" + languageParser.translate("form_validation_messages", "total_recipients") + ")"
				}
			}, errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				c = $("#transcript-modal-emails").val().split(",");
				emailTranscript($.map(c, $.trim), a.controller.modalTranscriptData, function (c) {
					if (c) return a.saveError(languageParser.translate("form_validation_messages", "error_email_transcript"));
					a.saveSuccess(languageParser.translate("form_validation_messages", "success_email_transcript"))
				});
				return !1
			}
		});
		this.$("#banVisitor").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				c = $("#banReason").val();
				var d = $("#banIp").is(":checked");
				banVisitor(c, d, a.controller.modalTranscriptData, function (b) {
					if (b) return a.saveError(languageParser.translate("form_validation_messages", "error_ban"));
					Tawk.intercomController.execute("trackEvent", {eventType: "banned-visitor-from-history"});
					a.saveSuccess(languageParser.translate("form_validation_messages", "success_ban"))
				});
				return !1
			}
		});
		this.$("#notesForm").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				c = {
					sessionKey: null,
					visitorId: a.controller.modalTranscriptData.nvid,
					propertyId: a.controller.modalTranscriptData.pgid,
					name: $(c).find(".note-name").val().trim(),
					email: $(c).find(".note-email").val().trim(),
					notes: $(c).find(".note-text").val().trim()
				};
				updateVisitorDetails(c, a.controller.modalTranscriptData, function (c, b) {
					c ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		});
		this.resizeView()
	},
	copyChanged: function () {
		"inDOM" ===
		this._state && this.controller && (this.controller.modalTranscriptData && this.controller.modalTranscriptData.copyFormat) && this.$(".copy-transcript").val(this.controller.modalTranscriptData.copyFormat)
	}.observes("controller.modalTranscriptData.copyFormat"),
	transcriptChanged: function () {
		var a = this;
		"inDOM" === this._state && this.controller.modalTranscriptData && (setTimeout(function () {
			a.controller.modalTranscriptData.callInfo.length && !a.controller.modalTranscriptData.syncCallData && (a.controller.modalTranscriptData.set("syncCallData",
				!0), a.controller.modalTranscriptData.set("callData", {}), a.controller.modalTranscriptData.callInfo.forEach(function (c) {
				conversationProcess.processWebRTCCallBlock(c.callId, a.controller.modalTranscriptData.pgid, c.callView, !1, function (d, b) {
					a.controller.modalTranscriptData.set("syncCallData", !1);
					b && a.controller.modalTranscriptData.set("callData." + c.callId, b)
				})
			}));
			a.onModalShown()
		}, 1E3), this.set("draw", !0))
	}.observes("controller.modalTranscriptData.chatId"),
	locationChanged: function () {
		var a, c, d = [];
		a = this.controller.modalTranscriptData;
		var b = Handlebars.compile('<div class="marker-details"><h3>{{name}}</h3><p>{{location}}</p>');
		if (this.draw) if ("undefined" !== typeof google && void 0 !== google && a) if (this.set("mapError", !1), this.set("draw", !1), d = [{
				name: a.n,
				lastKnown: {cy: a.cy, cn: a.cn, latitude: a.latitude, longitude: a.longitude}
			}], a = {zoom: 1 < d.length ? 1 : 10, center: new google.maps.LatLng(0, 0)}, d.length) {
			var e, f, g = d[0], h = g.lastKnown,
				d = h && h.latitude && h.longitude ? new google.maps.LatLng(h.latitude, h.longitude) : new google.maps.LatLng(0, 0);
			a.center =
				d;
			c = new google.maps.Map(this.$(".map")[0], a);
			e = new google.maps.Marker({position: d, map: c, title: (h.cy ? h.cy + ", " : "") + h.cn});
			f = new google.maps.InfoWindow({
				content: $(b({
					name: g.name,
					location: (h.cy ? h.cy + ", " : "") + h.cn
				}))[0].outerHTML
			});
			google.maps.event.addListener(e, "click", function () {
				f.open(c, e)
			});
			this.$(".linkToMap").attr("href", "http://maps.google.com/maps?q=" + h.latitude + "," + h.longitude)
		} else c = new google.maps.Map(this.$(".map")[0], a), this.$(".linkToMap").attr("href", "http://maps.google.com/maps"); else this.set("mapError",
			!0)
	},
	willDestroyElement: function () {
		this.previewModal && this.previewModal.remove();
		this.set("previewModal", null)
	}
});
Tawk.TicketView = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.modalTicketView,
	classNames: ["modal", "transcript-view"],
	controller: null,
	didInsertElement: function () {
		var a = this;
		this.set("modalPadding", 0);
		this.$().on("shown.bs.modal", function (c) {
			setTimeout(function () {
				a.resizeView()
			}, 0)
		});
		this.$().delegate(".transcript-btn", "click", function () {
			var c = $(this), d = $(this).attr("data-target");
			a.$(".transcript-btn").removeClass("active");
			c.addClass("active");
			a.$(".transcript-pane").addClass("hidden");
			$(d).removeClass("hidden");
			return !1
		});
		this._super()
	}
});
Tawk.AdminBaseView = Ember.Mixin.create({
	classNames: "overlay-form", subViewId: null, alertTimeout: null, saveSubView: function () {
		this.subViewId && (this.controller.activeProperty && "profile" !== this.controller.activeProperty.type) && this.controller.saveLastSubView({subView: this.subViewId})
	}, didInsertElement: function () {
		var a = this, c = Tawk.routing.getPath();
		this.saveSubView();
		this.$("#close-view").bind("click.closeView", function () {
			a.closeView()
		});
		$("body").bind("keydown.closeView", this.closeView.bind(this));
		this.$().delegate(".all-bulk-check", "change", function () {
			var c = $(this).prop("checked");
			a.controller.toggleAllMark(c);
			a.$(".bulk-check").prop("checked", c)
		});
		this.$().delegate("#clear-bulk-selection", "click", function (c) {
			c.preventDefault();
			a.controller.toggleAllMark(!1);
			return !1
		});
		this.$().delegate("#bulk-delete", "click", function (c) {
			c.preventDefault();
			a.controller.bulkDelete(function (b, c) {
				b ? a.saveError(c ? c : languageParser.translate("admin", "bulk_delete_error")) : a.saveSuccess(languageParser.translate("admin", "bulk_delete_success"))
			});
			return !1
		});
		this.$().delegate("#delete", "click", function (d) {
			d.preventDefault();
			a.clearSaveMessages();
			a.controller.deleteSingle(function (b) {
				b ? a.saveError(languageParser.translate("admin", "single_delete_error")) : Tawk.routing.changeRoute({
					view: c.view,
					propertyId: "admin" === c.view && a.controller.activeProperty ? a.controller.activeProperty.id :
						null,
					subView: a.subViewId,
					itemId: null,
					widgetId: null
				})
			});
			return !1
		});
		this.$().delegate(".open-view", "click", function (c) {
			var b = $(this).attr("id");
			$(c.target).hasClass("bulk-check") || $(c.target).hasClass("mark-select") ? c.stopPropagation() : a.controller.openItem(b);
			a.clearSaveMessages()
		});
		this.$().delegate(".bulk-check", "change", function () {
			var c = $(this).parents(".open-view").attr("id"), b = $(this).is(":checked");
			a.controller.toggleMark(c, b)
		});
		this.$().delegate("#cancel", "click", function () {
			a.clearSaveMessages();
			a.controller.closeItem();
			return !1
		});
		this.$().delegate("#add-item", "click", function () {
			a.controller.openItem()
		})
	}, closeView: function (a) {
		var c = Tawk.routing.getPath();
		if (a) if (27 === a.keyCode) a.stopPropagation(); else return;
		if (a = this.controller.closeView()) this.controller.saveLastSubView({
			subView: null,
			itemId: null
		}), this.closeForm(), this.remove(), Tawk.routing.titlePath.subviewName = null;
		Tawk.routing.titlePath.widgetName = null;
		Tawk.routing.titlePath.itemName = null;
		Tawk.routing.setTitle();
		Tawk.routing.changeRoute({
			view: c.view,
			propertyId: "admin" === c.view && this.controller.activeProperty ? this.controller.activeProperty.id : null,
			subView: a ? null : this.subViewId,
			itemId: null,
			widgetId: null
		})
	}, willDestroyElement: function () {
		clearTimeout(this.alertTimeout);
		$("body").unbind("keydown.closeView");
		this.$("#close-view").unbind("click.closeView")
	}, saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), this.$("#content-container").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' +
			c + '"></i>' + d + "</div>"))
	}, saveError: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a))
	}, saveSuccess: function (a) {
		var c = this;
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
			c.clearSaveMessages()
		}, 3E3)))
	}, updateWarning: function (a) {
		"inDOM" ===
		this._state && this.$("#content-container").append('<div class="alert alert-warning fade in"><button class="close" data-dismiss="alert">\u00d7</button>' + a + "</div>")
	}, clearSaveMessages: function () {
		"inDOM" === this._state && (clearTimeout(this.alertTimeout), this.$(".alert").remove())
	}, bulkMarkedChanged: function () {
		var a = 0;
		"inDOM" === this._state && (this.controller && this.controller.pagedList) && (this.controller.pagedList && (a = this.controller.pagedList.currentData.filterProperty("isMarked", !0).length), 0 < a ? this.set("bulkMarkedTotal",
			languageParser.translate("admin", "bulk_selected", {num: a})) : (this.set("bulkMarkedTotal", null), this.$(".all-bulk-check").prop("checked", !1), this.$(".bulk-check").prop("checked", !1)))
	}.observes("controller.pagedList.currentData.@each.isMarked"), takePhotoEnabled: function () {
		return main.hasUserMedia || main.hasFlash || !desktopConnector.enabled() ? !0 : !1
	}.property("main.hasUserMedia", "main.hasFlash")
});
Tawk.WhitelabelCustomizationView = Ember.View.extend({
	template: Ember.TEMPLATES.whitelabelCustomization, elementId: "whitelabel-customization",
	willDestroyElement: function () {
		this.$("#widget-text-color").ColorSelector("destroy")
	}, willInsertElement: function () {
		var a, c = !1;
		$("iframe").each(function () {
			var a = $(this).attr("name");
			a && -1 !== a.indexOf("stripe") && (c = !0)
		});
		c || (a = document.createElement("script"), a.src = "https://js.stripe.com/v2/", $("body").append(a))
	}, didInsertElement: function () {
		var a = this;
		this.widgetFooterLabelChange();
		$("#widget-brand").css("color", a.controller.whitelabelAddOn.settings.widget.textColor);
		this.$("#widget-text-color").ColorSelector({
			appendTo: "#whitelabel-customization",
			show: function () {
				$("#widget-max").removeClass("hidden");
				$("#widget-min").addClass("hidden")
			}
		}, function (a) {
			$("#widget-brand").css("color", a)
		}, a.$("#widget-text-color"));
		this.$().delegate("#plan", "change", function () {
			var c;
			c = $(this).val();
			(c = a.controller.whitelabelAddOn ? a.controller.whitelabelAddOn.plans.findProperty("id", c) : null) && a.$("#total-price").html("Total : $ " + c.price / 100 + (1 === c.cycle ? languageParser.translate("admin", "per_month") : languageParser.translate("admin", "per_year")))
		});
		this.$("#plan").trigger("change");
		this.$().delegate("#card-selection", "change", function () {
			"new-card" === $(this).val() ? a.$("#new-card-details").removeClass("hidden") : a.$("#new-card-details").addClass("hidden")
		});
		this.$().delegate("#payment-method", "change", function () {
			"cc" === $(this).val() ? a.$("#card-details").removeClass("hidden") : a.$("#card-details").addClass("hidden")
		});
		$.validator.messages.ccExpiryFormat = $.validator.format("The format should be MM/YY");
		$.validator.messages.ccExpiryDate = $.validator.format("Invalid expiry date.");
		$.validator.messages.ccNumber =
			$.validator.messages.creditcard;
		$.validator.messages.cvcCheck = $.validator.format("Invalid cvc number.");
		this.$("#card-number").mask("9999 9999 9999? 9999 9999", {placeholder: " "});
		this.$("#card-expiry").mask("99/99", {
			placeholder: " ", completed: function () {
				a.$("#card-cvc").focus()
			}
		});
		this.$("#card-cvc").mask("999?9", {placeholder: " "});
		this.$("#card-number").keyup(function () {
			window.Stripe && (cardType = Stripe.card.cardType($(this).val())) && (cardType = cardType.replace(" ", "").toLowerCase(), a.$(".card-type").hasClass(cardType) ||
			a.$(".card-type").removeClass().addClass("icon-append card-type " + cardType))
		});
		this.$().delegate(".clear-input", "click", function () {
			$(this).next().val("").trigger("change")
		});
		this.$().delegate("#widget-label", "keyup paste change", function () {
			a.controller.whitelabelAddOn.settings.set("widget.label", $(this).val())
		});
		this.$().delegate("#widget-url", "keyup paste change", function () {
			a.controller.whitelabelAddOn.settings.set("widget.url", $(this).val())
		});
		this.$().delegate("#email-label", "keyup paste change",
			function () {
				a.controller.whitelabelAddOn.settings.set("email.label", $(this).val())
			});
		this.$().delegate("#email-url", "keyup paste change", function () {
			a.controller.whitelabelAddOn.settings.set("email.url", $(this).val())
		});
		this.$().delegate("#activate", "click", function () {
			a.$("#whitelabel-payment").submit()
		});
		this.$(".input-text").focus(function () {
			$("#widget-max").removeClass("hidden");
			$("#widget-min").addClass("hidden")
		});
		this.$("#activate-add-on").click(function () {
			a.$("#whitelabel-settings").addClass("hidden");
			a.$("#payment-container").removeClass("hidden");
			return !1
		});
		this.$("#cancel-payment-form").click(function () {
			a.$("#whitelabel-settings").removeClass("hidden");
			a.$("#payment-container").addClass("hidden");
			return !1
		});
		this.$("#whitelabel-payment").validate({
			onkeyup: !1, onfocusout: !1, onclick: !1, errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = {}, b = a.$("#payment-method", c).val(), e = function (b, d, e) {
					"inDOM" === a._state && (b ? (errorSave(c, d), e && setTimeout(function () {
							a.$("#card-selection").val(e)
						},
						0), a.$("#cancel-payment-form").removeAttr("disabled"), a.$("#activate-now").removeAttr("disabled"), a.$("#activate-now").html(languageParser.translate("admin", "activate_now"))) : (a.saveSettings(function (b) {
						b ? errorSave(c) : setTimeout(function () {
							a.$("#whitelabel-settings").removeClass("hidden");
							a.$("#payment-container").addClass("hidden");
							a.set("paymentSuccess", !1)
						}, 3E3)
					}), a.set("paymentSuccess", !0)), a.set("paymentProcessing", !1))
				};
				if (!a.paymentProcessing) return a.set("paymentProcessing", !0), a.$("#cancel-payment-form").attr("disabled",
					"disabled"), a.$("#activate-now").attr("disabled", "disabled"), a.$("#activate-now").html('<i class="fa fa-refresh fa-spin"></i>'), d.planId = $("#plan", c).val(), b || (!desktopConnector.enabled() || desktopConnector.canUsePaypal()) || (b = "cc"), "cc" === b && (a.$("#card-selection").length ? d.customerId = a.$("#card-selection").val() : d.customerId = "new-card", $(c).serializeArray().map(function (a) {
					d[a.name] = a.value
				})), a.controller.handlePayment(b, d, e), !1
			}
		})
	}, saveSettings: function (a) {
		var c = {
			enabled: !0, widget: {
				label: "", url: "",
				textColor: "#000000"
			}, email: {label: "", url: ""}
		};
		if ("inDOM" !== this._state) return a(!0);
		if (!this.controller.whitelabelAddOn.isActive) return this.controller.resetSettings(), a();
		c.enabled = !0;
		c.widget = {
			label: this.$("#widget-label").val(),
			url: this.$("#widget-url").val(),
			textColor: this.$("#widget-text-color").ColorSelector("getColor").toHexString()
		};
		c.email = {label: this.$("#email-label").val(), url: this.$("#email-url").val()};
		this.controller.saveWhitelabelSettings(c, function (c) {
			c ? a(!0) : a(!1)
		})
	}, widgetFooterLabelChange: function () {
		var a,
			c;
		this.controller && (this.controller.whitelabelAddOn && "inDOM" === this._state) && ((a = this.controller.whitelabelAddOn.settings.widget.label) ? (a = encodeStr(a), (c = a.match(/_[^_]+_/gi)) && 0 < c.length && c.forEach(function (c) {
			var b;
			b = c.indexOf("_");
			var e = c.lastIndexOf("_");
			b = c.substring(0, b) + "<i>" + c.substring(b + 1, e) + "</i>" + c.substring(e + 1, c.length);
			a = a.replace(c, b)
		}), (c = a.match(/\*[^*]+\*/gi)) && 0 < c.length && c.forEach(function (c) {
			var b;
			b = c.indexOf("*");
			var e = c.lastIndexOf("*");
			b = c.substring(0, b) + '<span style="font-size: 13px; font-weight: 700">' +
				c.substring(b + 1, e) + "</span>" + c.substring(e + 1, c.length);
			a = a.replace(c, b)
		}), this.controller.whitelabelAddOn.settings.widget.url && (a = '<a href=" ' + this.controller.whitelabelAddOn.settings.widget.url + ' " target="_blank" style="text-decoration: none; color: inherit;">' + a + "</a>"), $("#widget-brand").html(a)) : $("#widget-brand").html(""))
	}.observes("controller.whitelabelAddOn.settings.widget.label")
});
Ember.Handlebars.helper("WhitelabelCustomizationView", Tawk.WhitelabelCustomizationView);
Tawk.PropertySettingsView =
	Ember.View.extend(Tawk.AdminBaseView, {
		template: Ember.TEMPLATES.propertySettings,
		elementId: "property-settings-form",
		controller: null,
		classNames: "overlay-form",
		subViewId: "settings",
		didInsertElement: function () {
			var a = this;
			this._super();
			this.$().undelegate("#delete", "click");
			this.$().delegate("#delete", "click", function (c) {
				c.stopPropagation();
				a.controller.deleteSingle(function (c) {
					c ? "BILLING_HAS_SUBSCRIPTIONS_ERROR" === c ? a.saveError(languageParser.translate("admin", c)) : a.saveError(languageParser.translate("form_validation_messages",
						"delete_site_error")) : a.closeView()
				});
				return !1
			});
			this.$("#site-settings-form").validate({
				errorPlacement: function (a, d) {
					a.insertAfter(d.parent())
				}, submitHandler: function (c) {
					var d = {};
					a.clearSaveMessages();
					d.pageName = a.$("#site-name").val().trim();
					d.isEnabled = a.$("#site-status").is(":checked");
					d.secureJSAPI = a.$("#secure-api-enabled").is(":checked");
					c = a.$("#site-domain").val().trim();
					c.length && (d.domain = c, -1 === d.domain.indexOf("http://") && -1 === c.indexOf("https://") && (d.domain = "http://" + d.domain));
					a.controller.saveProperty(d,
						!1, function (b) {
							b ? a.saveError() : a.saveSuccess()
						});
					return !1
				}
			});
			this.$("#page-settings-form").validate({
				errorPlacement: function (a, d) {
					a.insertAfter(d.parent())
				}, submitHandler: function (c) {
					c = {};
					a.clearSaveMessages();
					c.pageName = a.$("#page-name").val().trim();
					c.isEnabled = a.$("#page-status").is(":checked");
					c.pageTawkId = a.$("#page-tawkid").val().trim();
					c.category = a.$(".categories-type-select").val();
					c.subcategory = a.$(".subcategories-type-select").val();
					a.controller.saveProperty(c, !1, function (c) {
						c ? a.saveError(null) :
							a.saveSuccess(null)
					});
					return !1
				}
			});
			this.$().delegate("select.categories-type-select", "change", function () {
				var c = $(this).val();
				a.changeSubCategorySelection(c)
			});
			this.$().delegate("#page-tawkid", "blur", function () {
				var c = $(this), d = c.val().trim();
				d && !c.hasClass("error") && (a.$(".small-transparent-spinner").removeClass("hidden"), a.controller.pageContentController.checkTawkId(d, function (b, e) {
					b || e ? c.addClass("invalid") : c.removeClass("invalid");
					c.val(d);
					a.$("#page-settings-form").validate().element("#page-tawkid");
					a.$(".small-transparent-spinner").addClass("hidden")
				}))
			});
			this.pageChanged()
		},
		pageChanged: function () {
			var a;
			"inDOM" === this._state && (this.controller && this.controller.activeProperty && !this.controller.activeProperty.isSite) && (a = this.controller.activeProperty.settings && this.controller.activeProperty.settings.categoryId ? this.controller.activeProperty.settings.categoryId : "1000", subCategoryId = this.controller.activeProperty.settings && this.controller.activeProperty.settings.subCategoryId ? this.controller.activeProperty.settings.subCategoryId :
				parseInt(a, 10) + 1, this.set("categoriesSelectOptions", getPageCategories()), this.set("categoriesSelectClass", "categories-type-select"), this.set("categoriesSelectValue", a), this.set("subcategoriesSelectClass", "subcategories-type-select required"), this.changeSubCategorySelection(this.categoriesSelectValue))
		}.observes("controller.activeProperty"),
		changeSubCategorySelection: function (a) {
			var c = parseInt(a, 10);
			currentCategory = this.controller.activeProperty.settings && this.controller.activeProperty.settings.categoryId ?
				parseInt(this.controller.activeProperty.settings.categoryId, 10) : 1E3;
			options = getPageSubCategories(a);
			if (a = options.findProperty("value", "" + (c === currentCategory && this.controller.activeProperty.settings ? this.controller.activeProperty.settings.subCategoryId || c + 1 : c + 1))) a.isSelected = !0;
			this.set("subcategoriesSelectOptions", options)
		}
	});
Tawk.NewPropertyView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.newProperty,
	elementId: "new-property",
	controller: null,
	isSite: null,
	isPage: null,
	warningMessage: null,
	willInsertElement: function () {
		this.set("isSite", !0);
		this.set("isPage", !1)
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		this.set("isSite", !0);
		this.set("isPage", !1);
		var c = this.$("#new-site-form").validate({
			errorPlacement: function (a, c) {
				a.insertAfter(c.parent())
			}, submitHandler: function () {
				var b = {};
				b.pageName = a.$("#site-name").val().trim();
				b.domain = a.$("#site-domain").val().trim();
				b.propertyType = "site";
				b.createdByWizard = !1;
				b.domain || delete b.domain;
				a.controller.saveProperty(b, !0, function (b) {
					b ? a.saveError(languageParser.translate("form_validation_messages",
						"site_add_error")) : ($("#property-select").val(a.controller.activeProperty.id), $("#property-select").trigger("change"), a.closeView())
				});
				return !1
			}
		}), d = this.$("#new-page-form").validate({
			errorPlacement: function (a, c) {
				a.insertAfter(c.parent())
			}, submitHandler: function () {
				var b = {};
				b.pageName = a.$("#page-name").val().trim();
				b.pageTawkId = a.$("#page-tawkid").val();
				b.propertyType = "page";
				a.controller.saveProperty(b, !0, function (b) {
					b ? a.saveError(languageParser.translate("form_validation_messages", "page_add_error")) :
						($("#property-select").val(a.controller.activeProperty.id), $("#property-select").trigger("change"), a.closeView())
				});
				return !1
			}
		});
		this.$().delegate("#site-name, #page-name", "keyup", function () {
			Tawk.webProperties[a.isSite ? "sites" : "pages"].findProperty("propertyName", $(this).val().trim()) ? (a.warningMessage ? a.$(".warning-msg").remove() : a.set("warningMessage", $('<em class="warning-msg">' + languageParser.translate("form_validation_messages", "item_add_name_duplicate") + "</em>")), a.warningMessage.insertAfter($(this).parent())) :
				a.$(".warning-msg").remove()
		});
		this.$().delegate("#page-type", "click", function () {
			a.$("#page").is(":checked") || a.$("#page").prop("checked", "checked").trigger("change")
		});
		this.$().delegate("#site-type", "click", function () {
			a.$("#site").is(":checked") || a.$("#site").prop("checked", "checked").trigger("change")
		});
		this.$('input[name="property-type"]').change(function () {
			var b = $(this).val();
			c.resetForm();
			d.resetForm();
			a.$(".input").removeClass("state-error").removeClass("state-success");
			a.warningMessage && a.warningMessage.remove();
			"site" === b ? (a.set("isSite", !0), a.set("isPage", !1)) : (a.set("isSite", !1), a.set("isPage", !0))
		});
		this.$("#submit").click(function () {
			a.isSite ? a.$("#new-site-form").submit() : a.$("#new-page-form").submit()
		});
		this.$().delegate("#page-tawkid", "blur", function () {
			var b = $(this), c = b.val().trim();
			c && !b.hasClass("error") && (a.$(".small-transparent-spinner").removeClass("hidden"), a.controller.pageContentController.checkTawkId(c, function (d, g) {
				d || g ? b.addClass("invalid") : b.removeClass("invalid");
				b.val(c);
				a.$("#new-page-form").validate().element("#page-tawkid");
				a.$(".small-transparent-spinner").addClass("hidden")
			}))
		})
	}
});
Tawk.MembersSettingsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.membersSettings,
	elementId: "members-settings-form",
	controller: null,
	classNames: "overlay-form",
	inviteMember: null,
	newInvitations: null,
	roles: [{id: "admin", value: "Admin"}, {id: "agent", value: "Agent"}],
	modifiedAgents: {},
	canDelete: !0,
	subViewId: "members",
	willInsertElement: function () {
		this.set("modifiedAgents", {});
		this.set("inviteMember", !1);
		this.set("newInvitations",
			[])
	},
	needsBackView: function () {
		"inDOM" !== this.state || !this.controller.activeAgent && !this.inviteMember ? this.set("showBack", !1) : this.set("showBack", !0)
	}.observes("controller.activeAgent", "inviteMember"),
	didInsertElement: function () {
		var a = !1, c = this;
		this._super();
		this.$().undelegate(".bulk-check", "change");
		this.$().delegate(".bulk-check", "change", function () {
			var a, d = $(this).is(":checked");
			$(this).parents(".open-view").length ? a = $(this).parents(".open-view").attr("id") : $(this).parents(".open-invitation").length &&
				(a = $(this).parents(".open-invitation").attr("id"));
			a && c.controller.toggleMark(a, d)
		});
		this.$().delegate("#submit", "click", function () {
			c.$("#edit-settings-form").submit();
			return !1
		});
		this.$("#search").keyup(function () {
			var a = $(this).val().trim();
			c.controller.searchList(a)
		});
		this.$(".scrollable-list").bind("scroll.list", function (b) {
			!a && (c.controller.agentPagedList.currentData.length || c.controller.invitedPagedList.currentData.length) && $(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight - 100 && (a =
				!0, c.controller.loadNextList(function (b, d) {
				a = !1;
				!b && d && c.$(".all-bulk-check").prop("checked", !1)
			}))
		});
		var d = this.$("#add-member-form").validate({
			errorPlacement: function (a, c) {
				a.insertAfter(c.parent())
			}, submitHandler: function (a) {
				var e = [];
				c.clearSaveMessages();
				c.$(".new-invitation-field").each(function () {
					var a = {};
					a.email = $(this).find(".invited-email").val();
					a.role = $(this).find(".invited-role").val();
					e.push(a)
				});
				c.controller.inviteAgents(e, function (a, b) {
					var e, k = [], l = [];
					if (0 === a.length) c.newInvitations.clear(),
						c.set("inviteMember", !1), c.saveSuccess("Successfully sent invitation"); else {
						var m = {};
						a.forEach(function (a) {
							var b = c.$(".invited-email").get(a.index);
							a.error && (e = a.error);
							m[$(b).attr("name")] = e
						});
						b.forEach(function (a) {
							l.push(a.email);
							k.pushObject(c.newInvitations.objectAt(a.index))
						});
						d.showErrors(m);
						b.length && (c.newInvitations.removeObjects(k), c.saveSuccess("Successfully sent invitation to : <br/>" + l.join("<br/>")))
					}
				});
				return !1
			}
		});
		this.$("#invite-member").click(function (a) {
			a.preventDefault();
			c.newInvitations.clear();
			c.newInvitations.pushObject({email: "", role: "admin", id: (new Date).getTime()});
			c.set("inviteMember", !0);
			c.set("canDelete", !1);
			return !1
		});
		$("#close-view").unbind("click.closeView");
		$("#close-view").on("click", function (a) {
			a.stopPropagation();
			if (!0 === c.inviteMember) return c.set("inviteMember", !1), c.controller.closeItem(), !1;
			c.closeView()
		});
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (a) {
			if (27 === a.keyCode) {
				if (!0 === c.inviteMember) return a.stopPropagation(), c.set("inviteMember",
					!1), c.controller.closeItem(), !1;
				c.closeView()
			}
		});
		this.$("#add-field").click(function (a) {
			a.preventDefault();
			c.newInvitations.pushObject({email: "", role: "admin", id: (new Date).getTime()});
			return !1
		});
		this.$(".open-tab-pane").click(function () {
			var a = $(this).attr("data-id");
			c.controller.toggleAllMark(!1);
			c.$(".open-tab-pane").removeClass("active");
			$(this).addClass("active");
			c.$(".tab-pane").removeClass("active");
			c.$("#" + a).addClass("active");
			c.$(".all-bulk-check").prop("checked", !1);
			c.$(".bulk-check").prop("checked",
				!1);
			"current-tab" === a ? c.controller.set("currentView", "accepted") : c.controller.set("currentView", "pending")
		});
		this.$().delegate(".delete-field", "click", function () {
			var a;
			a = $(this).parents(".new-invitation-field");
			a = c.$(".new-invitation-field").index(a);
			0 <= a && a < c.newInvitations.length && c.newInvitations.removeAt(a)
		});
		this.$().delegate(".resend-invitation", "click", function () {
			c.controller.resendInvitation(function (a, d) {
				c.clearSaveMessages();
				a ? d ? c.saveError(d) : c.saveError(languageParser.translate("form_validation_messages",
					"error_invite_resend")) : c.saveSuccess(languageParser.translate("form_validation_messages", "success_invite_resend"))
			})
		});
		this.$().delegate(".open-invitation", "click", function (a) {
			var d = $(this).attr("id");
			$(a.target).hasClass("bulk-check") || $(a.target).hasClass("mark-select") ? a.stopPropagation() : c.controller.openInvitation(d);
			c.clearSaveMessages()
		});
		this.$().delegate("#submit-edit", "click", function (a) {
			a.preventDefault();
			c.$("#edit-member-form").submit()
		});
		this.$("#edit-member-form").validate({
			errorPlacement: function (a,
			                          c) {
				a.insertAfter(c.parent())
			}, submitHandler: function () {
				var a, d = c.$('input[name="agent-role"]:checked').val();
				c.clearSaveMessages();
				c.$("#agent-enabled") && (a = c.$("#agent-enabled").is(":checked"));
				c.controller.editAccess(a, d, function (a, b) {
					a ? c.saveError(b) : c.saveSuccess()
				});
				return !1
			}
		})
	},
	bulkMarkedChanged: function () {
		var a = 0;
		"inDOM" === this._state && (this.controller && (this.controller.agentPagedList || this.controller.invitedPagedList)) && (this.controller.agentPagedList && (a += this.controller.agentPagedList.currentData.filterProperty("isMarked",
			!0).length), this.controller.invitedPagedList && (a += this.controller.invitedPagedList.currentData.filterProperty("isMarked", !0).length), 0 < a ? this.set("bulkMarkedTotal", languageParser.translate("admin", "bulk_selected", {num: a})) : (this.set("bulkMarkedTotal", null), this.$(".all-bulk-check").prop("checked", !1), this.$(".bulk-check").prop("checked", !1)))
	}.observes("controller.agentPagedList.currentData.@each.isMarked", "controller.invitedPagedList.currentData.@each.isMarked"),
	newInvitationsChanged: function () {
		"inDOM" ===
		this.state && (1 === this.newInvitations.length ? this.set("canDelete", !1) : this.set("canDelete", !0))
	}.observes("newInvitations.length"),
	addWarning: function () {
		this.controller.hasBeenUpdated && this.updateWarning(languageParser.translate("admin", "item_has_been_updated", {
			itemType: languageParser.translate("generic", "agent"),
			itemName: this.controller.previousName
		}))
	}.observes("controller.hasBeenUpdated")
});
Tawk.DepartmentSettingsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.departmentSettings,
	elementId: "department-settings-form",
	controller: null,
	classNames: "overlay-form",
	subViewId: "department",
	didInsertElement: function () {
		var a = this, c = !1;
		this._super();
		this.$("#add-department").click(function () {
			a.controller.openItem()
		});
		this.$().delegate(".name-popover", "mouseover", function () {
			$(this).popover("show")
		});
		this.$().delegate(".name-popover", "mouseout", function () {
			$(this).popover("hide")
		});
		this.$("#department-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				var b =
					[];
				c = {
					name: a.$("#department-name").val().trim(),
					description: a.$("#department-description").val().trim()
				};
				c.isEnabled = a.$("#department-status").length ? a.$("#department-status").is(":checked") : void 0;
				a.$('input[name="assigned-agents"]:checked').each(function () {
					b.push($(this).val())
				});
				c.agents = b;
				a.clearSaveMessages();
				a.controller.saveDepartment(c, function (b) {
					b ? a.saveError(a.controller.activeDepartment.id ? null : languageParser.translate("form_validation_messages", "department_add_error")) : a.saveSuccess(a.controller.activeDepartment.id ?
						null : languageParser.translate("form_validation_messages", "department_add_success"))
				});
				return !1
			}
		});
		this.$("#search").keyup(function () {
			var c = $(this).val().trim();
			a.controller.searchList(c)
		});
		this.$(".scrollable-list").bind("scroll.list", function (d) {
			!c && a.controller.pagedList.currentData.length && $(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight - 100 && (c = !0, a.controller.loadNextList(function (b, d) {
				c = !1;
				!b && d && a.$(".all-bulk-check").prop("checked", !1)
			}))
		})
	},
	addWarning: function () {
		var a = this;
		this.controller.hasBeenUpdated &&
		setTimeout(function () {
			a.updateWarning(languageParser.translate("admin", "item_has_been_updated", {
				itemType: languageParser.translate("triggers", "department"),
				itemName: a.controller.previousName
			}))
		})
	}.observes("controller.hasBeenUpdated")
});
Tawk.WidgetSettingsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetSettings,
	elementId: "widget-settings",
	controller: null,
	subViewId: "widget-settings",
	didInsertElement: function () {
		var a = this;
		this._super();
		this.controller.activeWidget.id ? (Tawk.routing.titlePath.subviewName =
			this.controller.activeWidget.name, Tawk.routing.titlePath.itemName = languageParser.translate("admin", "widget_settings")) : (Tawk.routing.titlePath.subviewName = "New Widget", Tawk.routing.titlePath.itemName = null);
		Tawk.routing.setTitle();
		this.$(".widget-settings-tooltip").tooltip({placement: "right"});
		this.$().undelegate("#cancel", "click");
		this.$().delegate("#cancel", "click", function () {
			a.controller.resetData();
			a.closeView();
			return !1
		});
		this.$().undelegate("#delete", "click");
		this.$().delegate("#delete", "click",
			function (c) {
				c.preventDefault();
				a.clearSaveMessages();
				a.controller.deleteSingle(function (c) {
					c ? a.saveError("Unable to delete selection") : (a.controller.closeItem(), a.closeView())
				});
				return !1
			});
		this.$(".open-info").click(function () {
			a.$(".property-info").css({display: "block"});
			return !1
		});
		setTimeout(function () {
			a.widgetChanged();
			a.$("#widget-name").focus()
		});
		this.$("#widget-settings-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function () {
				var c = null, d = !a.controller.activeWidget.id,
					b = {
						disableSoundNotification: a.$("#disable-sound").is(":checked"),
						hideEstimatedWaitTime: a.$("#hide-wait-time").is(":checked"),
						hideWidgetWhenOffline: a.$("#hide-offline").is(":checked"),
						hideWidgetOnload: a.$("#hide-onload").is(":checked"),
						hideWidgetOnMobile: a.$("#hide-mobile").is(":checked")
					};
				a.clearSaveMessages();
				a.$("#maximize-onclick").is(":checked") ? b.onClick = "max" : b.onClick = "pop";
				d ? (c = a.$("#widget-name").val().trim(), d = a.$("#inline-type").is(":checked") ? "inline" : "embed", a.controller.addNewidget(c,
					d, function (b, c) {
						b ? a.saveError(languageParser.translate("form_validation_messages", "widget_add_error")) : a.saveSuccess(languageParser.translate("form_validation_messages", "widget_add_success"))
					})) : (a.$("#widget-status").length && (c = a.$("#widget-status").is(":checked")), a.controller.saveSettings(c, null, b, function (b) {
					b ? a.saveError() : a.saveSuccess()
				}));
				return !1
			}
		})
	},
	widgetChanged: function () {
		var a = this;
		setTimeout(function () {
			"inDOM" === a._state && (a.controller && a.controller.activeWidget) && ("max" === a.controller.activeWidget.onClick ?
				a.$("#maximize-onclick").prop("checked", "checked") : a.$("#popout-onclick").prop("checked", "checked"))
		})
	}.observes("controller.activeWidget")
});
Tawk.WidgetBubblesGallery = Ember.View.extend({
	template: Ember.TEMPLATES.widgetBubblesGallery,
	elementId: "widget-bubbles-gallery",
	bubblesList: [],
	willInsertElement: function () {
		if (!this.bubblesList.length) {
			this.bubblesList.pushObject({
				id: "default",
				link: GLOBAL_STATIC_URL + "/images/bubbles/0.png",
				rotatable: !0
			});
			for (var a = 1; 128 >= a; a++) this.bubblesList.pushObject({
				id: "bubble-" +
				a,
				link: GLOBAL_STATIC_URL + "/images/bubbles/" + a + ".png",
				rotatable: bubbleSettings[a].isRotatable
			})
		}
	},
	visibilityChanged: function () {
		var a = this;
		this.get("isVisible") ? setTimeout(function () {
			a.$().height() < a.$(".superbox").height() && 0 === a.$("#bubbles-container").scrollTop() && a.$("#bubble-more-below").removeClass("hidden")
		}) : this.$("#bubble-more-below").addClass("hidden")
	}.observes("isVisible"),
	didInsertElement: function () {
		var a = this;
		this.$("#bubbles-container").on("scroll", function () {
			0 === $(this).scrollTop() ?
				a.$("#bubble-more-below").removeClass("hidden") : a.$("#bubble-more-below").addClass("hidden")
		})
	}
});
Ember.Handlebars.helper("WidgetBubbleGallery", Tawk.WidgetBubblesGallery);
Tawk.WidgetAppearanceView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetAppearance,
	elementId: "widget-appearance-view",
	controller: null,
	isGalleryView: !1,
	subViewId: "widget-appearance",
	willDestroyElement: function () {
		this.$("#widget-bg-color").ColorSelector("destroy");
		this.$("#widget-txt-color").ColorSelector("destroy");
		this.$("#bubble-bg-color").ColorSelector("destroy");
		this.$("#bubble-txt-color").ColorSelector("destroy");
		this.$("#agent-chat-bg-color").ColorSelector("destroy");
		this.$("#agent-chat-txt-color").ColorSelector("destroy");
		this.$("#visitor-chat-bg-color").ColorSelector("destroy");
		this.$("#visitor-chat-txt-color").ColorSelector("destroy");
		this._super()
	},
	willInsertElement: function () {
		this.set("positionSelectOptions", [{value: "tr", text: languageParser.translate("widgets", "top_right")}, {
			value: "tl", text: languageParser.translate("widgets",
				"top_left")
		}, {value: "cr", text: languageParser.translate("widgets", "center_right")}, {
			value: "cl",
			text: languageParser.translate("widgets", "center_left")
		}, {value: "br", text: languageParser.translate("widgets", "bottom_right")}, {
			value: "bl",
			text: languageParser.translate("widgets", "bottom_left")
		}]);
		this.set("positionSelectClass", "position-type-select")
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		Tawk.routing.titlePath.subviewName = this.controller.activeWidget.name;
		Tawk.routing.titlePath.itemName = languageParser.translate("pages",
			"widget_appearance");
		Tawk.routing.setTitle();
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (c) {
			if (27 === c.keyCode) {
				if (!0 === a.isGalleryView) return c.stopPropagation(), a.set("isGalleryView", !1), !1;
				a.closeView()
			}
		});
		$("#close-view").unbind("click.closeView");
		$("#close-view").on("click", function (c) {
			if (!0 === a.isGalleryView) return c.stopPropagation(), a.set("isGalleryView", !1), !1;
			a.closeView()
		});
		if (/MSIE/.test(navigator.userAgent)) {
			var c = navigator.userAgent.indexOf("MSIE");
			if (-1 === c) return;
			this.set("isOldIE", 9 > parseFloat(navigator.userAgent.substring(c + 4 + 1)))
		}
		this.controller.loadWhitelabelAddon("widget-appearance", function (c) {
			c && (a.set("whitelabelCustomizationView", Tawk.WhitelabelCustomizationView.create({controller: a.controller.whitelabelController})), a.whitelabelCustomizationView.appendTo(a.$(".whitelabel-view")))
		});
		this.$("#widget-bg-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("backgroundColor", c)
		}, a.$("#widget-bg-color"));
		this.$("#widget-txt-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("textColor", c)
		}, a.$("#widget-txt-color"));
		this.$("#agent-chat-bg-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("agentBubbleBg", c)
		}, this.$("#agent-chat-bg-color"));
		this.$("#agent-chat-txt-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("agentBubbleTxt", c)
		}, this.$("#agent-chat-txt-color"));
		this.$("#visitor-chat-bg-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("visitorBubbleBg", c)
		}, this.$("#visitor-chat-bg-color"));
		this.$("#visitor-chat-txt-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.activeWidget.set("visitorBubbleTxt", c)
		}, this.$("#visitor-chat-txt-color"));
		this.$("#bubble-bg-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.bubblePreview.set("bubbleBgColor",
				c)
		}, a.$("#bubble-bg-color"));
		this.$("#bubble-txt-color").ColorSelector({appendTo: "#widget-appearance-view"}, function (c) {
			a.controller.bubblePreview.set("bubbleTxColor", c)
		}, a.$("#bubble-txt-color"));
		this.controller.activeWidget && this.controller.activeWidget.isInline && (this.$().delegate("#agent-chat-bg-color, #agent-chat-txt-color, #visitor-chat-bg-color, #visitor-chat-txt-color", "show", function () {
			a.toggleChatBubbleView(!0)
		}), this.$().delegate("#agent-chat-bg-color, #agent-chat-txt-color, #visitor-chat-bg-color, #visitor-chat-txt-color",
			"hide", function () {
				a.toggleChatBubbleView()
			}));
		this.$(".top-corner.spinner").spinner({
			stop: function (c, b) {
				var e = a.$(".top-corner.spinner").spinner("value");
				null !== e && a.topCornerChanged(e)
			}
		});
		this.$(".bottom-corner.spinner").spinner({
			stop: function (c, b) {
				var e = a.$(".bottom-corner.spinner").spinner("value");
				null !== e && a.bottomCornerChanged(e)
			}
		});
		this.$(".top-corner.spinner").on("blur", function () {
			null === $(this).spinner("value") && ($(this).spinner("value", 0), a.topCornerChanged(0))
		});
		this.$(".bottom-corner.spinner").on("blur",
			function () {
				null === $(this).spinner("value") && ($(this).spinner("value", 0), a.bottomCornerChanged(0))
			});
		this.controller.activeWidget && void 0 !== this.controller.activeWidget.topCorner && this.$(".top-corner.spinner").spinner("value", this.controller.activeWidget.topCorner);
		this.controller.activeWidget && void 0 !== this.controller.activeWidget.bottomCorner && this.$(".bottom-corner.spinner").spinner("value", this.controller.activeWidget.bottomCorner);
		this.$().delegate("#open-bubble-gallery", "click", function () {
			a.set("isGalleryView",
				!0);
			return !1
		});
		this.$("#close-bubble-gallery").click(function () {
			a.set("isGalleryView", !1);
			return !1
		});
		this.$().delegate(".superbox-list", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.checkAndAddOldBubble();
			c = c.replace("bubble-", "");
			$(".superbox-list").removeClass("selected");
			$(this).addClass("selected");
			$("#close-bubble-gallery").trigger("click");
			"default" === c ? a.controller.bubblePreview.set("bubbleType", "default") : a.controller.bubblePreview.set("bubbleType", "gallery");
			a.controller.bubblePreview.setProperties({
				bubbleName: c,
				bubbleInFront: 0,
				bubbleRightOffset: 0,
				bubbleBottomOffset: 0,
				bubbleLeftOffset: 0,
				bubbleTopOffset: 0,
				bubbleRotation: 0
			});
			a.set("isGalleryView", !1);
			a.set("redrawBubble", !0);
			a.bubbleChanged()
		});
		this.$().delegate("#match-bubble", "change", function () {
			a.set("redrawBubble", !0);
			a.matchTheme()
		});
		!window.FileAPIProxy && main.hasFileReader && this.$().delegate("#upload-image", "click", function () {
			$("#upload-image-input").trigger("click");
			return !1
		});
		window.FileAPIProxy && !main.hasFileReader && main.hasFlash ? (this.$("#upload-image").fileReader({
			filereader: GLOBAL_STATIC_URL +
			"/scripts/filereader.swf", debugMode: !0
		}), this.$("#upload-image").change(function (c) {
			c.target.files[0] && a.uploadBubbleFile(c.target.files[0], function () {
				a.$("#upload-image-input").val("")
			})
		})) : this.$().delegate("#upload-image-input", "change", function (c) {
			$(this)[0].files[0] && a.uploadBubbleFile($(this)[0].files[0], function () {
				a.$("#upload-image-input").val("")
			})
		});
		this.$("#turn-left").on("click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.$(".preview-bubble.uploaded").removeClass("right-rotate left-rotate no-rotate");
			0 === a.controller.bubblePreview.bubbleRotation ? (a.controller.bubblePreview.set("bubbleRotation", -90), a.$(".preview-bubble.uploaded").addClass("right-rotate"), $(this).attr("disabled", "disabled")) : (a.controller.bubblePreview.set("bubbleRotation", 0), a.$(".preview-bubble.uploaded").addClass("no-rotate"), a.$("#turn-right").removeAttr("disabled"))
		});
		this.$("#turn-right").on("click", function (c) {
			c.preventDefault();
			c.stopPropagation();
			a.$(".preview-bubble.uploaded").removeClass("right-rotate left-rotate no-rotate");
			0 === a.controller.bubblePreview.bubbleRotation ? (a.controller.bubblePreview.set("bubbleRotation", 90), a.$(".preview-bubble.uploaded").addClass("left-rotate"), $(this).attr("disabled", "disabled")) : (a.controller.bubblePreview.set("bubbleRotation", 0), a.$(".preview-bubble.uploaded").addClass("no-rotate"), a.$("#turn-left").removeAttr("disabled"))
		});
		this.$(".preview-bubble.uploaded").draggable({
			containment: "parent", scroll: !1, start: function () {
				a.$("#preview-bubble-uploaded-limits").addClass("drag-start")
			}, stop: function () {
				a.$("#preview-bubble-uploaded-limits").removeClass("drag-start")
			}
		});
		this.$().delegate("#reset-top-corner", "click", function () {
			a.topCornerChanged(void 0)
		});
		this.$().delegate("#reset-bottom-corner", "click", function () {
			a.bottomCornerChanged(void 0)
		});
		this.$('input[name="mobile-theme"]').change(function () {
			a.controller.activeWidget.set("mobileWidget", $(this).val())
		});
		this.$('input[name="desktop-theme"]').change(function () {
			a.controller.activeWidget.set("desktopWidget", $(this).val())
		});
		this.$("#widget-appearance-form").validate({
			rules: {
				"widget-max-width": {required: !0, min: 280},
				"widget-max-height": {required: !0, min: 330},
				"widget-min-width": {required: !0, min: 126},
				"widget-min-height": {required: !0, min: 40}
			}, errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				a.clearSaveMessages();
				a.set("previousDimension", null);
				"upload" === a.controller.bubblePreview.bubbleType && (a.toggleChatBubbleView(), a.calculateBubbleImagePos());
				a.set("redrawBubble", !1);
				a.$("#submit").attr("disabled", "disabled").html('<i class="fa fa-refresh fa-spin"></i>');
				a.controller.saveAppearance(function (b) {
					b ?
						a.saveError() : (a.controller.deleteAllUnusedUploadedBubble(), a.whitelabelCustomizationView ? a.whitelabelCustomizationView.saveSettings(function (b) {
							b ? a.saveError() : a.saveSuccess()
						}) : a.saveSuccess());
					a.$("#widget-max").addClass("hidden");
					a.$("#widget-min").removeClass("hidden");
					a.$("#submit").removeAttr("disabled").html(languageParser.translate("buttons", "save"));
					a.set("redrawBubble", !0)
				});
				return !1
			}
		});
		this.widgetChanged();
		setTimeout(function () {
			this.$("#form-scrollable-container").height() < this.$(".table").height() &&
			0 === a.$("#form-scrollable-container").scrollTop() && a.$(".more-below").removeClass("hidden")
		});
		this.$("#form-scrollable-container").on("scroll", function () {
			"inDOM" === a._state && (0 === $(this).scrollTop() ? a.$(".more-below").removeClass("hidden") : a.$(".more-below").addClass("hidden"))
		})
	},
	isDesktopRectangle: function () {
		return "min" !== this.controller.activeWidget.desktopWidget
	}.property("controller.activeWidget.desktopWidget"),
	isDesktopWidgetFull: function () {
		return this.controller.activeWidget && "min" !== this.controller.activeWidget.desktopWidget &&
			this.controller.activeWidget.isInline
	}.property("controller.activeWidget.desktopWidget"),
	widgetChanged: function () {
		"inDOM" === this._state && (this.controller && this.controller.activeWidget) && (this.backgroundColorChanged(), this.textColorChanged(), this.agentBackgroundColorChanged(), this.agentTextColorChanged(), this.visitorBackgroundColorChanged(), this.visitorTextColorChanged(), this.minimizedWidthChanged(), this.minimizedHeightChanged(), this.controller.activeWidget && (this.topCornerChanged(this.controller.activeWidget.topCorner),
			this.bottomCornerChanged(this.controller.activeWidget.bottomCorner)), this.positionChanged(), this.bubbleChanged(!0), this.bubbleIsFrontChanged())
	}.observes("controller.activeWidget"),
	backgroundColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && (this.$("#widget-bg-color").ColorSelector("setColor", this.controller.activeWidget.backgroundColor), this.$(".change-background-color").css("background-color", this.controller.activeWidget.backgroundColor))
	}.observes("controller.activeWidget.backgroundColor"),
	textColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && (this.$("#widget-txt-color").ColorSelector("setColor", this.controller.activeWidget.textColor), this.$(".headerBoxControlsContainer").attr("class", "headerBoxControlsContainer " + getContrast(this.controller.activeWidget.textColor)), this.$(".change-text-color").css("color", this.controller.activeWidget.textColor))
	}.observes("controller.activeWidget.textColor"),
	agentBackgroundColorChanged: function () {
		this.controller.activeWidget &&
		"inDOM" === this._state && (this.$("#sample-chat-coloring .agentChatContainer").css("background-color", this.controller.activeWidget.agentBubbleBg), this.$("#agent-chat-bg-color").ColorSelector("setColor", this.controller.activeWidget.agentBubbleBg))
	}.observes("controller.activeWidget.agentBubbleBg"),
	agentTextColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && (this.$("#sample-chat-coloring .agentChatContainer").css("color", this.controller.activeWidget.agentBubbleTxt), this.$("#agent-chat-txt-color").ColorSelector("setColor",
			this.controller.activeWidget.agentBubbleTxt))
	}.observes("controller.activeWidget.agentBubbleTxt"),
	visitorBackgroundColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && (this.$("#sample-chat-coloring .visitorChatContainer").css("background-color", this.controller.activeWidget.visitorBubbleBg), this.$("#visitor-chat-bg-color").ColorSelector("setColor", this.controller.activeWidget.visitorBubbleBg))
	}.observes("controller.activeWidget.visitorBubbleBg"),
	visitorTextColorChanged: function () {
		this.controller.activeWidget &&
		"inDOM" === this._state && (this.$("#sample-chat-coloring .visitorChatContainer").css("color", this.controller.activeWidget.visitorBubbleTxt), this.$("#visitor-chat-txt-color").ColorSelector("setColor", this.controller.activeWidget.visitorBubbleTxt))
	}.observes("controller.activeWidget.visitorBubbleTxt"),
	toggleChatBubbleView: function (a) {
		void 0 !== this.$() && (a ? (this.$("#widget-max").removeClass("hidden"), this.$("#widget-min").addClass("hidden")) : (this.$("#widget-max").addClass("hidden"), this.$("#widget-min").removeClass("hidden")))
	},
	minimizedWidthChanged: function () {
		var a;
		"inDOM" === this._state && (this.controller && this.controller.activeWidget) && (a = parseInt(this.controller.activeWidget.minimizedWidth, 10), isNaN(a) || 126 > a || (390 < a ? this.$("#widget-min-preview-container").css("width", a + 10 + "px") : this.$("#widget-min-preview-container").css("width", "auto"), this.$(".inner-preview-container.rectangle-container").css("width", a - 2 + "px"), this.redrawBubble && this.bubbleChanged()))
	}.observes("controller.activeWidget.minimizedWidth"),
	minimizedHeightChanged: function () {
		var a;
		"inDOM" === this._state && (this.controller && this.controller.activeWidget) && (a = parseInt(this.controller.activeWidget.minimizedHeight, 10), isNaN(a) || 40 > a || (this.$(".inner-preview-container.rectangle-container").css("height", a - 1 + "px"), this.redrawBubble && this.bubbleChanged()))
	}.observes("controller.activeWidget.minimizedHeight"),
	topCornerChanged: function (a) {
		"inDOM" === this._state && (this.controller && this.controller.activeWidget) && (void 0 === a && (a = "tr" === this.controller.activeWidget.position || "tl" === this.controller.activeWidget.position ?
			0 : 8, this.$(".top-corner.spinner").spinner("value", a)), this.controller.activeWidget.set("topCorner", a), this.$(".inner-preview-container.rectangle-container").css({
			"border-top-right-radius": a + "px",
			"border-top-left-radius": a + "px"
		}))
	},
	bottomCornerChanged: function (a) {
		"inDOM" === this._state && (this.controller && this.controller.activeWidget) && (void 0 === a && (a = "tl" === this.controller.activeWidget.position || "tr" === this.controller.activeWidget.position ? 8 : 0, this.$(".bottom-corner.spinner").spinner("value", a)), this.controller.activeWidget.set("bottomCorner",
			a), this.$(".inner-preview-container.rectangle-container").css({
			"border-bottom-right-radius": a + "px",
			"border-bottom-left-radius": a + "px"
		}))
	},
	positionChanged: function () {
		var a, c, d;
		if ("inDOM" === this._state && this.controller && this.controller.activeWidget && this.controller.bubblePreview) {
			a = this.controller.activeWidget.position;
			c = this.controller.activeWidget.minimizedWidth;
			d = this.controller.activeWidget.minimizedHeight;
			this.$("#bubble-container").removeClass().addClass(a);
			this.$("#bubbles-container").removeClass().addClass(a);
			if ("cl" === a || "cr" === a) {
				var b = -0.5 * c + 0.5 * d, e = -0.5 * d;
				"cr" === a ? (this.isOldIE && (b = d - c), this.$(".inner-preview-container.rectangle-container").css("right", b + "px")) : (this.isOldIE && (b = 0), this.$(".inner-preview-container.rectangle-container").css("left", b + "px"));
				this.isOldIE && (e = -0.5 * c);
				this.$(".inner-preview-container.rectangle-container").css("margin", e + "px 0 0")
			}
			this.redrawBubble && (this.bubbleChanged(), "upload" === this.controller.bubblePreview.bubbleType && this.resetBubbleRotation())
		}
	}.observes("controller.activeWidget.position",
		"controller.activeWidget.minimizedWidth", "controller.activeWidget.minimizedHeight"),
	bubbleIsEnabled: function () {
		"inDOM" === this._state && (this.controller && this.controller.bubblePreview) && (this.bubbleChanged(), this.controller.bubblePreview.enabled && this.$("#form-scrollable-container").scrollTop(99999999))
	}.observes("controller.bubblePreview.enabled"),
	resetBubbleUpload: function () {
		this.hideAllBubbleSettings();
		this.$("#bubble-selection-container .btn").attr("disabled", !1)
	},
	uploadBubbleFile: function (a, c) {
		var d =
			this, b = function () {
			d.resetBubbleUpload();
			d.$("#upload-image-message-content").html(languageParser.translate("widgets", "image_upload_error"));
			d.$("#upload-image-message").removeClass("hidden")
		};
		c = c || function () {
		};
		this.hideAllBubbleSettings();
		this.$("#bubble-selection-container .btn").attr("disabled", "disabled");
		readImageFile(a, null, null, null, function (e, f) {
			e ? (d.resetBubbleUpload(), d.$("#upload-image-message-content").html(f), d.$("#upload-image-message").removeClass("hidden")) : fileUploader.getUploadHandler(function (e,
			                                                                                                                                                                        f) {
				var k, l;
				if (e) return b(), c();
				k = f.handle;
				l = a.name || a.fileName;
				progressEl = $('<div id="upload-' + k + '" class="upload-data"></div>');
				progressEl.append('<p><i class="fa fa-upload"></i>' + encodeStr(l) + "</p>");
				progressEl.append('<div class="progress progress-sm progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0.5%"></div></div>');
				progressEl.on("progressUpdate", function (a, b) {
					$(this).find(".progress-bar").css("width", b + "%")
				});
				progressEl.on("uploadComplete", function (a, b) {
					$(this).remove();
					d.controller.checkAndAddOldBubble();
					d.set("redrawBubble", !1);
					d.controller.bubblePreview.setProperties({
						bubbleName: b.name,
						bubbleType: "upload",
						bubbleTopOffset: 0,
						bubbleBottomOffset: 0,
						bubbleRightOffset: 0,
						bubbleLeftOffset: 0,
						bubbleInFront: !0
					});
					d.resetBubbleUpload();
					d.$("#update-rotation-option").removeClass("hidden");
					d.bubbleChanged(!0);
					d.$("#form-scrollable-container").scrollTop(99999999)
				});
				d.$("#upload-image-progress").append(progressEl).removeClass("hidden");
				d.$("#form-scrollable-container").scrollTop(99999999);
				fileUploader.uploadBubbleFile(k, a, d.controller.activeProperty.id, !1, function (a) {
					if (a) return b(), c;
					c()
				})
			})
		})
	},
	bubbleStatusChanged: function () {
		this.controller.bubblePreview && this.controller.bubblePreview.enabled ? (this.$("#bubble-fields-container").removeClass("hidden"), this.$("#bubble-container").removeClass("hidden")) : (this.$("#bubble-fields-container").addClass("hidden"), this.$("#bubble-container").addClass("hidden"))
	},
	bubbleChanged: function (a) {
		var c, d, b, e, f;
		"inDOM" === this._state && (this.controller &&
			this.controller.activeWidget && this.controller.bubblePreview) && (this.bubbleStatusChanged(), this.hideAllBubbleSettings(), this.controller.bubblePreview.enabled && (c = this.controller.activeWidget.position, d = parseInt(this.controller.activeWidget.minimizedWidth, 10), b = parseInt(this.controller.activeWidget.minimizedHeight, 10), e = -1 !== ["cr", "tr", "br"].indexOf(c), f = -1 !== ["tr", "tl"].indexOf(c), c = -1 !== ["cr", "cl"].indexOf(c), this.controller.bubblePreview.get("isDefaultBubble") ? (this.previousDimension && this.controller.activeWidget.setProperties(self.previousDimension),
			this.drawBubble(d, b, e, f, c)) : "upload" === this.controller.bubblePreview.bubbleType ? this.setupUploadedBubbleImage(a, d, b, e, f, c) : this.setupGalleryBubble(d, b, e, f, c), this.set("redrawBubble", !0)))
	},
	setupGalleryBubble: function (a, c, d, b, e) {
		var f, g, h, k, l = {}, m = 0;
		this.$("#match-bubble-container").removeClass("hidden");
		this.$(".preview-bubble.gallery").removeClass("hidden");
		if (f = bubbleSettings[this.controller.bubblePreview.bubbleName]) if (this.set("redrawBubble", !1), this.matchTheme(), b && !f.isRotatable) this.controller.bubblePreview.setProperties({
			bubbleWidth: 0,
			bubbleHeight: 0,
			bubbleInFront: 0,
			bubbleType: "",
			bubbleName: "",
			bubbleRotation: 0,
			bubbleBottomOffset: 0,
			bubbleTopOffset: 0,
			bubbleRightOffset: 0,
			bubbleLeftOffset: 0
		}); else {
			k = f.rightOffset;
			f.isCenter ? (k = a / 2 - f.width / 2, k += 10) : "100%" === k && (k = a - f.width, k += 10);
			f.leftPadding && (k -= f.leftPadding);
			a < f.width && (k = 10);
			k = f.isCenter || "100%" === f.rightOffset ? k : f.rightOffset;
			d ? (g = k, h = 0, l.right = g + "px") : (f.isCenter ? h = k : (h = 10 + a - f.width - (k - 10), a > f.width && 0 < h ? 10 === k && (h = a - f.width) : h = 10), g = 0, l.left = h + "px");
			c = parseInt(c, 10) + f.topOffset;
			b ? l.top = c + "px" : l.bottom = c + "px";
			if (e) {
				var n, p = -1 * (0.5 * (f.width - f.height) - c), m = -0.5 * f.height;
				k -= 10;
				n = 0.5 * (a - f.width);
				m = a > f.width ? d ? m - n + k : m + n - k : m;
				d ? l.right = p + "px" : l.left = p + "px"
			}
			this.controller.bubblePreview.setProperties({
				bubbleWidth: f.width,
				bubbleHeight: f.height,
				bubbleInFront: 1 === f.zIndex ? !0 : !1,
				bubbleType: "gallery",
				bubbleRotatable: f.isRotatable
			});
			e ? this.controller.bubblePreview.setProperties({
				bubbleRotation: d ? -90 : 90,
				bubbleBottomOffset: 0,
				bubbleTopOffset: d ? g - 10 : h - 10,
				bubbleRightOffset: d ? c : 0,
				bubbleLeftOffset: d ?
					0 : c
			}) : this.controller.bubblePreview.setProperties({
				bubbleRotation: 0,
				bubbleBottomOffset: b ? 0 : c,
				bubbleTopOffset: b ? c : 0,
				bubbleRightOffset: d ? g : 0,
				bubbleLeftOffset: d ? 0 : h
			});
			l["z-index"] = f.zIndex;
			l.margin = m + "px 0 0 0";
			this.$(".preview-bubble.gallery").css(l)
		}
	},
	setupUploadedBubbleImage: function (a, c, d, b, e, f) {
		var g, h, k, l = this, m = function () {
			b ? (bubbleRight = l.controller.bubblePreview.bubbleRightOffset, bubbleLeft = "auto") : (bubbleLeft = l.controller.bubblePreview.bubbleLeftOffset, bubbleRight = "auto");
			e || f ? (bubbleBottom =
				"auto", bubbleTop = e ? l.controller.bubblePreview.bubbleTopOffset : 0.5 * (l.$("#preview-bubble-uploaded-limits").height() - c) + l.controller.bubblePreview.bubbleTopOffset) : (bubbleTop = "auto", bubbleBottom = l.controller.bubblePreview.bubbleBottomOffset);
			void 0 !== g && (g.css({
				left: bubbleLeft,
				right: bubbleRight,
				top: bubbleTop,
				bottom: bubbleBottom
			}), g.removeClass("left-rotate right-rotate no-rotate"), 90 === l.controller.bubblePreview.bubbleRotation ? (g.addClass("left-rotate"), l.$("#turn-right").attr("disabled", "disabled")) :
				-90 === l.controller.bubblePreview.bubbleRotation ? (g.addClass("right-rotate"), l.$("#turn-left").attr("disabled", "disabled")) : (g.addClass("no-rotate"), l.$("#turn-right").removeAttr("disabled"), l.$("#turn-left").removeAttr("disabled")))
		};
		this.controller && (this.controller.bubblePreview && this.controller.activeWidget) && (g = this.$(".preview-bubble.uploaded"), g.removeClass("hidden"), this.$(".upload-image-settings").removeClass("hidden"), this.$("#preview-bubble-uploaded-limits").removeClass("hidden"), a ? g.load(function () {
			h =
				g.width();
			k = g.height();
			l.controller.bubblePreview.setProperties({bubbleWidth: h, bubbleHeight: k});
			l.updateBubbleLimiter(k, h, c, d, f);
			m()
		}).attr("src", this.controller.bubblePreview.get("uploadedBubbleImage")) : (h = this.controller.bubblePreview.bubbleWidth, k = this.controller.bubblePreview.bubbleHeight, this.updateBubbleLimiter(k, h, c, d, f), m()))
	},
	updateBubbleLimiter: function (a, c, d, b, e) {
		var f = 0;
		"inDOM" === this._state && (this.controller && this.controller.bubblePreview && this.controller.activeWidget) && (e ? (0 !== this.controller.bubblePreview.bubbleRotation ?
			(e = d + 2 * a, a = c) : e = d + 2 * c, a += b + 30, f = -0.5 * e) : (e = b + a + 30, a = d + c + 5), this.$("#preview-bubble-uploaded-limits").css({
			width: a,
			height: e,
			maxWidth: a,
			maxHeight: e,
			margin: f + "px 0 0 0"
		}), 400 < a ? this.$("#widget-min-preview-container").css("width", a + 10 + "px") : this.$("#widget-min-preview-container").css("width", "auto"))
	},
	bubbleBackgroundColorChanged: function () {
		"inDOM" === this._state && this.controller.bubblePreview && (this.$("#bubble-bg-color").ColorSelector("setColor", this.controller.bubblePreview.bubbleBgColor), this.redrawBubble &&
		this.bubbleChanged())
	}.observes("controller.bubblePreview.bubbleBgColor"),
	bubbleTextColorChanged: function () {
		"inDOM" === this._state && this.controller.bubblePreview && (this.$("#bubble-txt-color").ColorSelector("setColor", this.controller.bubblePreview.bubbleTxColor), this.redrawBubble && this.bubbleChanged())
	}.observes("controller.bubblePreview.bubbleTxColor"),
	drawBubble: function (a, c, d, b, e) {
		var f, g, h = 5, k = this.controller.bubblePreview.bubbleBgColor;
		this.$("#widget-min.rtl-direction #default-bubble-container");
		this.$("#default-bubble-container").attr("style", "");
		if (f = this.$("#bubble-canvas")[0]) f.width = "146", f.height = "86", f = f.getContext("2d"), f.clearRect(0, 0, 146, 85), f.fillStyle = k, b ? (h = 15, g = 70) : g = h = 5, f.beginPath(), f.moveTo(9, h), f.lineTo(129, h), f.quadraticCurveTo(137, h, 137, h + 8), f.lineTo(137, h + 65 - 8), f.quadraticCurveTo(137, h + 65, 129, h + 65), f.lineTo(70, h + 65), f.moveTo(73, h + 65), f.lineTo(9, h + 65), f.quadraticCurveTo(1, h + 65, 1, h + 65 - 8), f.lineTo(1, h + 8), f.quadraticCurveTo(1, h, 9, h), f.closePath(), f.strokeStyle = "#e3e0e7",
			f.lineWidth = 2, f.stroke(), f.fill(), b ? (f.beginPath(), f.arc(70, h + 2, 10, 1.06 * Math.PI, 1.94 * Math.PI, !1), f.strokeStyle = "#e3e0e7", f.lineWidth = 2, f.stroke(), f.fill(), f.beginPath(), f.moveTo(83, 6), f.arc(83, 5, 5, 0, 2 * Math.PI, !1), f.closePath(), f.strokeStyle = "#e3e0e7", f.lineWidth = 2, f.stroke(), f.fill(), f.beginPath(), f.arc(135, g + 5, 10, 1.6 * Math.PI, 0.85 * Math.PI, !1)) : (f.beginPath(), f.arc(70, h + 65 - 3, 10, 0.1 * Math.PI, 0.9 * Math.PI, !1), f.strokeStyle = "#e3e0e7", f.lineWidth = 2, f.stroke(), f.fill(), f.beginPath(), f.moveTo(57, 80), f.arc(57,
			80, 5, 0, 2 * Math.PI, !1), f.closePath(), f.strokeStyle = "#e3e0e7", f.lineWidth = 2, f.stroke(), f.fill(), f.beginPath(), f.arc(135, g + 5, 10, 0.4 * Math.PI, 1.15 * Math.PI, !0)), f.fillStyle = k, f.strokeStyle = "#e3e0e7", f.lineWidth = 2, f.stroke(), f.fill(), f.beginPath(), f.moveTo(132, g + 1.5), f.lineTo(139, g + 8), f.closePath(), f.lineWidth = 2, f.strokeStyle = this.controller.bubblePreview.bubbleTxColor, f.stroke(), f.beginPath(), f.moveTo(139, g + 1.5), f.lineTo(132, g + 8), f.closePath(), f.lineWidth = 2, f.strokeStyle = this.controller.bubblePreview.bubbleTxColor,
			f.stroke(), this.$("#default-bubble-container").removeClass("hidden"), this.$(".bubble-edit-container").removeClass("hidden"), e ? (b = -1 * (30.5 - c), c = 0.5 * (a - 146), marginTop = 146 < a ? d ? -42.5 - c : -42.5 + c : -42.5, d ? (marginTop -= 10, this.$("#default-bubble-container").css("right", b + "px !important"), this.controller.get("isRTL") && (marginTop += a - 146 + 10)) : (marginTop += 10, this.$("#default-bubble-container").css("left", b + "px !important"), this.controller.get("isRTL") && (marginTop -= a - 146 + 10)), this.$("#default-bubble-container").css("margin",
			marginTop + "px 0 0 0")) : (a = a - 146 + 10 + "px", d ? this.$("#default-bubble-container").css({
			right: this.controller.get("isRTL") ? a : "10px",
			left: "auto"
		}) : this.$("#default-bubble-container").css({
			left: this.controller.get("isRTL") ? "10px" : a,
			right: "auto"
		})), this.$("#bubble-text").css("color", this.controller.bubblePreview.bubbleTxColor), this.$("#bubble-close").css("color", this.controller.bubblePreview.bubbleTxColor)
	},
	resetBubbleRotation: function () {
		"inDOM" === this._state && (this.controller && this.controller.bubblePreview) &&
		(this.$(".preview-bubble.uploaded").removeClass("left-rotate right-rotate").addClass("no-rotate"), this.$("#update-rotation-option button").removeClass("hidden"), this.controller.bubblePreview.set("bubbleRotation", 0), this.controller.bubblePreview.set("bubbleTopOffset", this.controller.activeWidget.minimizedHeight), this.controller.bubblePreview.set("bubbleBottomOffset", this.controller.activeWidget.minimizedHeight), this.controller.bubblePreview.set("bubbleLeftOffset", 0), this.controller.bubblePreview.set("bubbleRightOffset",
			0))
	},
	bubbleIsFrontChanged: function () {
		"inDOM" === this._state && (this.controller && this.controller.bubblePreview) && this.$(".preview-bubble.uploaded").css("zIndex", this.controller.bubblePreview.bubbleInFront ? 1 : 0)
	}.observes("controller.bubblePreview.bubbleInFront"),
	calculateBubbleImagePos: function () {
		var a, c, d, b, e, f, g;
		"inDOM" === this._state && (this.controller && this.controller.activeWidget && this.controller.bubblePreview) && (a = this.controller.activeWidget.position, c = parseInt(this.controller.activeWidget.minimizedWidth,
			10), parseInt(this.controller.activeWidget.minimizedHeight, 10), d = -1 !== ["cr", "tr", "br"].indexOf(a), b = -1 !== ["tr", "tl"].indexOf(a), a = -1 !== ["cr", "cl"].indexOf(a), this.$(".inner-preview-container").position(), "upload" === this.controller.bubblePreview.bubbleType && (e = this.$("#preview-bubble-uploaded-limits").width(), f = this.$("#preview-bubble-uploaded-limits").height(), g = this.$(".preview-bubble.uploaded").position()), a ? (d ? (e = 0 === this.controller.bubblePreview.bubbleRotation ? e - g.left - this.controller.bubblePreview.bubbleWidth :
			e - g.left - this.controller.bubblePreview.bubbleHeight, d = 0) : (d = g.left, e = 0), b = 0, c = g.top - 0.5 * (f - c)) : (d ? (e = e - g.left - this.controller.bubblePreview.bubbleWidth, d = 0) : (d = g.left, e = 0), b ? (b = 0, c = g.top) : (c = 0, b = f - g.top - this.controller.bubblePreview.bubbleHeight)), this.controller.bubblePreview.setProperties({
			bubbleBottomOffset: b.toFixed(2),
			bubbleTopOffset: c.toFixed(2),
			bubbleRightOffset: e.toFixed(2),
			bubbleLeftOffset: d.toFixed(2)
		}))
	},
	hideAllBubbleSettings: function () {
		this.$("#upload-image-message").addClass("hidden");
		this.$(".upload-image-settings").addClass("hidden");
		this.$("#match-bubble-container").addClass("hidden");
		this.$(".bubble-edit-container").addClass("hidden");
		this.$("#upload-image-progress").addClass("hidden");
		this.$(".gallery.preview-bubble").addClass("hidden");
		this.$("#default-bubble-container").addClass("hidden");
		this.$("#preview-bubble-uploaded-limits").addClass("hidden");
		this.$("#widget-min-preview-container").css("width", "auto")
	},
	matchTheme: function () {
		var a = this.$("#match-bubble").is(":checked"),
			c = bubbleSettings[this.controller.bubblePreview.bubbleName];
		c && (a ? (this.previousDimension || this.set("previousDimension", {
			backgroundColor: this.controller.activeWidget.backgroundColor,
			textColor: this.controller.activeWidget.textColor,
			minimizedWidth: this.controller.activeWidget.minimizedWidth,
			minimizedHeight: this.controller.activeWidget.minimizedHeight,
			agentBubbleBg: this.controller.activeWidget.agentBubbleBg,
			agentBubbleTxt: this.controller.activeWidget.agentBubbleTxt,
			visitorBubbleBg: this.controller.activeWidget.visitorBubbleBg,
			visitorBubbleTxt: this.controller.activeWidget.visitorBubbleTxt
		}), this.controller.activeWidget.set("backgroundColor", c.backgroundColor), this.controller.activeWidget.set("textColor", c.textColor), this.controller.activeWidget.set("agentBubbleBg", shadeColor(c.backgroundColor, -0.1)), this.controller.activeWidget.set("agentBubbleTxt", c.textColor), this.controller.activeWidget.set("visitorBubbleBg", "#e5e5e5"), this.controller.activeWidget.set("visitorBubbleTxt", "#333333"), c.changeWidgetSize && (this.controller.activeWidget.set("minimizedWidth",
			c.changeWidgetSize.width), this.controller.activeWidget.set("minimizedHeight", c.changeWidgetSize.height)), this.redrawBubble && this.bubbleChanged()) : this.previousDimension && this.controller.activeWidget.setProperties(this.previousDimension))
	}
});
Tawk.WidgetContentView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetContent,
	elementId: "widget-content",
	controller: null,
	currentStatus: "online",
	isGreetings: !0,
	disabled: !1,
	currentForm: null,
	subViewId: "widget-content",
	urlPrefixList: null,
	selectedPrefixValue: null,
	prefixUrlSelectClass: null,
	parentUrlContainer: null,
	greetingsMaxLength: 150,
	newLongGreeting: null,
	isMaxLengthInvalid: !1,
	isCurrentStatusOnline: function () {
		return "online" == this.get("currentStatus")
	}.property("currentStatus"),
	isCurrentStatusAway: function () {
		return "away" == this.get("currentStatus")
	}.property("currentStatus"),
	isCurrentStatusOffline: function () {
		return "offline" == this.get("currentStatus")
	}.property("currentStatus"),
	willInsertElement: function () {
		this.set("languageSelectOptions", getVisitorLanguageSelect());
		this.set("prefixUrlSelectClass", "prefix-url-select");
		this.set("selectedPrefixValue", "http://");
		this.set("urlPrefixList", [{value: "http://", text: "http://"}, {
			value: "https://",
			text: "https://"
		}, {value: "mailto:", text: "mailto:"}])
	},
	setNewLongGreetings: function () {
		this.set("newLongGreeting", this.transformGreetings(encodeStr(this.getCurrentGreetings())))
	},
	checkMaxLength: function () {
		var a = this.transformGreetings(this.getCurrentGreetings()), c = this;
		setTimeout(function () {
			c.setNewLongGreetings()
		}, 0);
		if (!a || void 0 ===
			a) return this.set("isMaxLengthInvalid", !1);
		if (a.replace(/<\/?[^>]+(>|$)/g, "").length > this.greetingsMaxLength) return this.set("isMaxLengthInvalid", !0);
		this.set("isMaxLengthInvalid", !1)
	}.observes("currentStatus", "currentForm.text", "controller.onlineGreetingsPreview.longGreeting", "controller.awayGreetingsPreview.longGreeting"),
	checkNewLongGreetings: function () {
		this.setNewLongGreetings()
	}.observes("controller.isPrechat", "controller.prechatFormPreview.enabled"),
	didInsertElement: function () {
		var a = this, c =
			this.controller.activeWidget.languageCode;
		this._super();
		Tawk.routing.titlePath.subviewName = this.controller.activeWidget.name;
		Tawk.routing.titlePath.itemName = languageParser.translate("pages", "widget_content");
		Tawk.routing.setTitle();
		this.controller.loadWhitelabelAddon("widget-content", function (c) {
			c && (a.set("whitelabelCustomizationView", Tawk.WhitelabelCustomizationView.create({controller: a.controller.whitelabelController})), a.whitelabelCustomizationView.appendTo(a.$(".whitelabel-view")))
		});
		this.set("errorMaxLengthMsg",
			languageParser.translate("form_validation_messages", "custom_max_length", {maxLength: this.greetingsMaxLength.toString()}));
		this.setNewLongGreetings();
		this.$().undelegate("#cancel", "click");
		this.$().delegate("#cancel", "click", function () {
			a.controller.resetData();
			a.closeView();
			return !1
		});
		this.$('input[name="edit-view"]').change(function () {
			var c = $(this).val();
			"offlineForm" === c ? (a.showOfflineForm(), a.updateWindowStatus("offline")) : "prechatForm" === c ? (a.showPrechatForm(), a.updateWindowStatus("online")) : (c =
				c.split("-"), a.updateWindowStatus(c[1]), a.showGreetingsWindow())
		});
		this.$().delegate(".edit-text, .edit-icon", "click", function () {
			var c;
			c = $(this).parent();
			c.find(".edit-icon").hide();
			c.find(".edit-text").hide();
			c.find(".delete-selection").hide();
			c.next(".action-container").hide();
			$(this).hasClass("start-link") && a.$(".addLinkButtonContainer").addClass("visible");
			c = c.find(".editable-input");
			c.addClass("visible").focus();
			"textarea" === c.prop("tagName").toLowerCase() && c.height(c[0].scrollHeight + "px")
		});
		this.$().delegate(".editable-input", "blur", function () {
			var c = $(this).parent();
			a.$("#addLinkButton:hover").length ? (a.parentUrlContainer = c, a.isPositionValid() ? (this.selectionStart !== this.selectionEnd && a.$("#link-name").val(this.value.substring(this.selectionStart, this.selectionEnd)), a.$("#linkFormContainer").addClass("visible"), a.$("#widget-max-preview-container").addClass("link-form")) : (a.$("#greetingsContainer textarea.visible").focus(), a.$("#widget-form input.form-title.visible").focus(), a.$(".addLinkButtonContainer .warning.hidden").removeClass("hidden"))) :
				(a.$(".addLinkButtonContainer .warning").not(".hidden").addClass("hidden"), c.find(".edit-icon").show(), c.find(".edit-text").show(), c.find(".delete-selection").show(), c.next(".action-container").show(), c.find(".editable-input").removeClass("visible"), a.$(".addLinkButtonContainer").removeClass("visible"), $(this).valid())
		});
		this.$().delegate("#linkFormContainer #backLinkButton", "click", function () {
			a.$("#linkFormContainer").removeClass("visible");
			a.$(".warning.link-body").text("");
			a.$(".warning.link-name").text("");
			a.$(".addLinkButtonContainer .warning").not(".hidden").addClass("hidden");
			a.$("#link-body").val("");
			a.$("#link-name").val("");
			a.$("#linkFormContainer input.valid").removeClass("valid");
			a.$("#linkFormContainer .state-success").removeClass("state-success");
			a.$("#widget-max-preview-container.link-form").removeClass("link-form");
			a.$("#greetingsContainer textarea.visible").focus();
			a.$("#widget-form input.form-title.visible").focus()
		});
		this.$().delegate("textarea.editable-input", "keyup", function () {
			$(this).height("1px");
			$(this).height($(this)[0].scrollHeight + "px")
		});
		this.$("#widget-content-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				var b = a.$(".language-type-select").val();
				if ($(c).find(".max-length-error").length) $(c).find("#submit").blur(); else return a.clearSaveMessages(), a.controller.updateAllContent(b, function (b) {
					b ? a.saveError() : (a.isPrechat && a.set("currentForm", a.controller.prechatFormPreview), a.isOffline && a.set("currentForm", a.controller.offlineFormPreview),
						a.whitelabelCustomizationView ? a.whitelabelCustomizationView.saveSettings(function (b) {
							b ? a.saveError() : a.saveSuccess()
						}) : a.saveSuccess());
					setTimeout(function () {
						a.$('input[name="edit-view"]:checked').focus()
					})
				}), !1
			}
		});
		this.$().delegate("#add-phone-number", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addPhoneNumber(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-question-inputText", "click", function () {
			(a.isOffline || a.isPrechat &&
				a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addInputTextQuestion(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-question-textArea", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addTextAreaQuestion(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-department", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addDepartment(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-name", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addName(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-email", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addEmail(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-multi-choice", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) &&
			a.currentForm.fieldsData.addMultiChoice(a.controller.activeWidget.languageCode)
		});
		this.$().delegate("#add-options", "click", function () {
			(a.isOffline || a.isPrechat && a.controller.prechatFormPreview.enabled) && a.currentForm.fieldsData.addOptions(a.controller.activeWidget.languageCode)
		});
		this.$().delegate(".add-choice", "click", function () {
			var c = $(this).parents(".field-selections"), b = $(this).attr("data-id");
			a.currentForm.fieldsData.addSelection(b);
			a.currentForm.fieldsData.fieldHasEmptySelections(b) || (c.find(".emptySelection").removeClass("selection-empty"),
				c.find(".emptySelection").valid())
		});
		this.$().delegate(".delete-selection", "click", function () {
			var c;
			c = $(this).parents(".field-selection");
			var b = c.parent(), e = $(this).parents(".field-container").attr("id");
			c = a.$("#" + e + " .field-selection").index(c);
			a.currentForm.fieldsData.removeSelection(e, c);
			a.currentForm.fieldsData.fieldHasEmptySelections(e) && (b.find(".emptySelection").addClass("selection-empty"), b.find(".emptySelection").valid())
		});
		this.$().delegate(".delete-field", "click", function () {
			var c = $(this).parents(".field-container").attr("id");
			a.currentForm.fieldsData.removeField(c)
		});
		this.$().delegate(".toggle-required", "click", function () {
			var c = $(this).parents(".field-container").attr("id");
			a.currentForm.fieldsData.toggleRequired(c)
		});
		this.$().delegate("#save-url", "click", function () {
			var c = a.$("#link-name").val(), b = a.$("#link-body").val(),
				e = a.$("select.prefix-url-select option:selected").val(),
				f = a.parentUrlContainer.find("textarea.editable-input")[0] ? a.parentUrlContainer.find("textarea.editable-input")[0] : a.parentUrlContainer.find("input.editable-input")[0],
				g = f.selectionStart, f = f.selectionEnd;
			a.checkFormUrl() || (c = "[" + c + "](" + e + b + ")", a.$("#widget-form").not(".hidden").length && a.currentForm ? a.currentForm.text ? a.currentForm.set("text", a.currentForm.text.substring(0, g) + c + a.currentForm.text.substring(f)) : a.currentForm.set("text", c) : "online" === a.get("currentStatus") ? a.controller.onlineGreetingsPreview.set("longGreeting", a.controller.onlineGreetingsPreview.longGreeting.substring(0, g) + c + a.controller.onlineGreetingsPreview.longGreeting.substring(f)) : "away" ===
				a.get("currentStatus") && a.controller.awayGreetingsPreview.set("longGreeting", a.controller.awayGreetingsPreview.longGreeting.substring(0, g) + c + a.controller.awayGreetingsPreview.longGreeting.substring(f)), a.$("#backLinkButton").click())
		});
		this.$().delegate(".language-type-select", "change", function () {
			$(this).val() !== c && (a.controller.changeGreetingsForLanguage($(this).val(), c), c = $(this).val())
		});
		this.$(".form-inner-container").sortable({
			connectWith: "form-inner-container", placeholder: "sortable-placeholder",
			forcePlaceholderSize: !0, start: function (a, b) {
				$(".form-inner-container").addClass("sortable-blurred");
				$(b.item).addClass("sortable-selected")
			}, stop: function (c, b) {
				var e = $(b.item).attr("id"), f = $(b.item).next().attr("id");
				a.$(".form-inner-container").removeClass("sortable-blurred");
				a.$(".form-inner-container").sortable("cancel");
				a.currentForm.fieldsData.moveField(e, f)
			}
		});
		this.backgroundColorChanged();
		this.textColorChanged();
		this.initializeTooltip()
	},
	checkFormUrl: function () {
		var a = this.$("#link-name").val(),
			c = this.$("#link-body").val(), d = this.$("select.prefix-url-select option:selected").val(),
			b = this.$(".warning.link-body"), e = this.$(".warning.link-name"),
			f = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/,
			g = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		e.text("");
		b.text("");
		a || e.text(languageParser.translate("form_validation_messages",
			"required"));
		c ? "mailto:" !== d || g.test(c) ? d.indexOf("http") || f.test("http://" + c) || b.text(languageParser.translate("widgets", "url_invalid")) : b.text(languageParser.translate("widgets", "email_invalid")) : b.text(languageParser.translate("form_validation_messages", "required"));
		return e.text().length || b.text().length
	},
	getCurrentGreetings: function () {
		return this.isOffline || this.isPrechat && this.controller.prechatFormPreview && this.controller.prechatFormPreview.enabled && this.currentForm && this.currentForm.text ?
			this.currentForm.text : "online" === this.get("currentStatus") && this.controller.onlineGreetingsPreview ? this.controller.onlineGreetingsPreview.longGreeting : "away" === this.get("currentStatus") && this.controller.awayGreetingsPreview ? this.controller.awayGreetingsPreview.longGreeting : ""
	},
	isPositionValid: function () {
		for (var a = this.parentUrlContainer.find("textarea.editable-input").length ? this.parentUrlContainer.find("textarea.editable-input")[0] : this.parentUrlContainer.find("input.editable-input")[0], c = a.selectionStart,
			     d = a.selectionEnd, a = $(a).val(), b = /\[[^\]\(\)]+\]\((\bhttp:\/\/\b|\bhttps:\/\/\b|\bmailto:\b){1}[^\]\(\)]+\)/i, e, f, g; null !== (f = b.exec(a));) {
			e = f[0];
			g = a.indexOf(e);
			if (-1 === g) break;
			if ((c <= g || c >= g + e.length) && (d <= g || d >= g + e.length)) e = e.replace(/\[|\]|\(|\)/gi, "*"), a = a.replace(f[0], e); else return !1
		}
		return !0
	},
	initializeTooltip: function () {
		var a = this;
		setTimeout(function () {
			a.$(".action") && a.$(".action").tooltip()
		})
	},
	backgroundColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && $(".change-background-color").css("background-color",
			this.controller.activeWidget.backgroundColor)
	}.observes("controller.activeWidget.backgroundColor"),
	textColorChanged: function () {
		this.controller.activeWidget && "inDOM" === this._state && ($(".change-text-color").css("color", this.controller.activeWidget.textColor), $(".headerBoxControlsContainer").attr("class", "headerBoxControlsContainer " + getContrast(this.controller.activeWidget.textColor)))
	}.observes("controller.activeWidget.textColor"),
	currentStatusChanged: function () {
		this.$("#linkFormContainer.visible").length &&
		this.$("#backLinkButton").click()
	}.observes("currentStatus"),
	transformGreetings: function (a) {
		for (var c = /\[([^)]+)\]/, d = /\[[^\]\(\)]+\]\((\bhttp:\/\/\b|\bhttps:\/\/\b|\bmailto:\b){1}[^\]\(\)]+\)/i, b = a, e; null !== (e = d.exec(b)) && (b = b.replace(e[0], '<span class="link">' + c.exec(e[0])[1] + "</span>"), b !== a);) ;
		return b
	},
	closeForms: function () {
		this.set("isGreetings", !1);
		this.set("isPrechat", !1);
		this.set("isOffline", !1);
		this.set("currentForm", null);
		this.$("#widget-form").addClass("hidden");
		this.$("#chat-container-wrapper.long-wrapper").removeClass("long-wrapper");
		this.$(".fields-actions").hide()
	},
	showGreetingsWindow: function () {
		this.closeForms();
		this.set("isGreetings", !0)
	},
	updateWindowStatus: function (a) {
		["online", "away", "offline"].contains(a) && this.set("currentStatus", a)
	},
	showOfflineForm: function () {
		this.closeForms();
		this.set("isOffline", !0);
		this.set("currentForm", this.controller.offlineFormPreview);
		this.$("#widget-form").removeClass("hidden");
		this.$("#chat-container-wrapper").addClass("long-wrapper");
		this.$(".fields-actions").show().removeClass("field-disabled");
		this.initializeTooltip()
	},
	showPrechatForm: function () {
		this.closeForms();
		this.set("isPrechat", !0);
		this.set("currentForm", this.controller.prechatFormPreview);
		this.currentForm && this.currentForm.text && this.currentForm.set("text", decodeStr(this.currentForm.text));
		this.$(".fields-actions").show()
	},
	isPrechatFormEnabled: function () {
		this.isPrechat && (this.controller.activeWidget && "inDOM" === this._state) && (this.controller.prechatFormPreview && this.controller.prechatFormPreview.enabled ? (this.$("#widget-form").removeClass("hidden"),
			this.$("#chat-container-wrapper").addClass("long-wrapper"), this.$(".fields-actions").removeClass("field-disabled"), this.initializeTooltip(), 0 === this.controller.prechatFormPreview.fieldsData.parsedFields.length && (this.controller.activeProperty.isPersonal ? this.controller.prechatFormPreview.set("text", languageParser.translate("widget_preview_translation", this.controller.activeWidget.languageCode + "-prechat_title_profile")) : this.controller.prechatFormPreview.set("text", languageParser.translate("widget_preview_translation",
			this.controller.activeWidget.languageCode + "-prechat_title")))) : (this.$("#widget-form").addClass("hidden"), this.$("#chat-container-wrapper.long-wrapper").removeClass("long-wrapper"), this.$(".fields-actions").addClass("field-disabled")))
	}.observes("isPrechat", "controller.prechatFormPreview.enabled"),
	refreshSortableFields: function () {
		var a = this;
		this.currentForm && this.currentForm.fieldsData.parsedFields.length && setTimeout(function () {
			a.$(".form-inner-container") && (a.$(".form-inner-container").sortable("refresh"),
				a.$(".form-inner-container").sortable("refreshPositions"))
		}, 0)
	}.observes("currentForm.fieldsData.parsedFields.length")
});
Tawk.WidgetBehaviorView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetBehavior,
	elementId: "widget-behavior",
	controller: null,
	subViewId: "widget-behavior",
	willInsertElement: function () {
		this.set("clickSelectOptions", [{
			value: "max",
			text: languageParser.translate("widgets", "maximize")
		}, {value: "pop", text: languageParser.translate("widgets", "popout")}]);
		this.set("clickSelectClass",
			"click-type-select")
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		Tawk.routing.titlePath.subviewName = this.controller.activeWidget.name;
		Tawk.routing.titlePath.itemName = languageParser.translate("pages", "widget_behavior");
		Tawk.routing.setTitle();
		"max" === this.controller.activeWidget.onClick ? this.$("#maximize-onclick").prop("checked", "checked") : this.$("#popout-onclick").prop("checked", "checked");
		this.$("#submit").click(function () {
			a.$(".admin-form").submit()
		});
		this.$("#cancel").click(function () {
			a.closeView()
		});
		this.$(".admin-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				c = {
					disableSoundNotification: a.$("#disable-sound").is(":checked"),
					hideEstimatedWaitTime: a.$("#hide-wait-time").is(":checked"),
					hideWidgetWhenOffline: a.$("#hide-offline").is(":checked"),
					hideWidgetOnload: a.$("#hide-onload").is(":checked"),
					hideWidgetOnMobile: a.$("#hide-mobile").is(":checked")
				};
				a.$("#maximize-onclick").is(":checked") ? c.onClick = "max" : c.onClick = "pop";
				a.clearSaveMessages();
				a.controller.saveBehavior(c,
					function (c) {
						c ? a.saveError() : a.saveSuccess()
					});
				return !1
			}
		})
	}
});
Tawk.WidgetDomainsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetDomains,
	elementId: "widget-domains",
	controller: null,
	subViewId: "widget-domains",
	removeDomain: function (a) {
		this.controller && (this.controller.activeWidget && this.controller.domainWhiteList && "inDOM" === this.state) && (this.controller.domainWhiteList.domains.removeAt(a), 20 > this.controller.domainWhiteList.domains.length && this.controller.domainWhiteList.set("disableAdd",
			!1))
	},
	addDomain: function () {
		this.controller && (this.controller.activeWidget && this.controller.domainWhiteList && !("inDOM" !== this.state || 20 < this.controller.domainWhiteList.domains.length)) && (this.controller.domainWhiteList.domains.pushObject({
			value: "",
			id: this.controller.activeWidget.id + randomString("5", !0)
		}), 20 <= this.controller.domainWhiteList.domains.length && this.controller.domainWhiteList.set("disableAdd", !0))
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		Tawk.routing.titlePath.subviewName = this.controller.activeWidget.name;
		Tawk.routing.titlePath.itemName = languageParser.translate("widgets", "domain_restriction");
		Tawk.routing.setTitle();
		this.$().undelegate("#cancel", "click");
		this.$().delegate("#cancel", "click", function () {
			a.controller.resetData();
			a.closeView();
			return !1
		});
		this.$().delegate(".delete-domain", "click", function () {
			var c = a.$("input.domain-whitelist").index($(this).nextAll("input"));
			a.removeDomain(c);
			return !1
		});
		this.$("#add-domain").click(function () {
			a.addDomain();
			return !1
		});
		this.$("#widget-domain-form").validate({
			errorPlacement: function (a,
			                          d) {
				a.insertAfter(d.parent())
			}, submitHandler: function () {
				var c = a.$("#enable-sharing").is(":checked");
				a.clearSaveMessages();
				a.controller.saveSettings(null, c, null, function (c) {
					c ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		})
	}
});
Tawk.WidgetSchedulerView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.widgetScheduler,
	elementId: "widget-scheduler",
	controller: null,
	scheduler: [],
	cityList: [],
	subViewId: "widget-scheduler",
	willDestroyElement: function () {
		this.scheduler.clear();
		this.cityList.clear();
		this._super()
	},
	willInsertElement: function () {
		var a = this, c = this.controller.scheduler.settings.sch, d = moment().startOf("week").day();
		Object.keys(c).forEach(function (b) {
			var e, f, g;
			e = (parseInt(b, 10) + d) % 7;
			g = c[e];
			e = 0 === g.start && 0 !== g.end ? moment().startOf("day") : 0 === g.start && 0 === g.end ? moment.duration(324E5) : moment.duration(g.start);
			f = 864E5 === g.end ? moment().add(1, "days").startOf("day") : 0 !== g.end ? moment.duration(g.end) : moment.duration(648E5);
			b = Ember.Object.create({
				index: b,
				label: moment().weekday(b).format("dddd"),
				rangeId: "range_" +
				b,
				labelId: "label_" + b,
				from: moment().locale("en").hours(e.hours()).minutes(e.minutes()).format("X"),
				to: moment().locale("en").hours(f.hours()).minutes(f.minutes()).format("X"),
				isOn: !(0 === g.start && 0 === g.end)
			});
			a.scheduler.pushObject(b)
		})
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		Tawk.routing.titlePath.subviewName = this.controller.activeWidget.name;
		Tawk.routing.titlePath.itemName = languageParser.translate("widgets", "scheduler");
		Tawk.routing.setTitle();
		this.$().undelegate("#cancel", "click");
		this.$().delegate("#cancel",
			"click", function () {
				a.controller.resetData();
				a.closeView();
				return !1
			});
		setTimeout(function () {
			a.setSlider();
			a.isSchedulerEnabled()
		}, 0);
		this.$().delegate("#schedule-city", "keyup", function () {
			var c = $(this).val().trim();
			socketConnector.getCities(c, "", function (c, b) {
				var e = [], f = JSON.parse(b);
				!c && f.predictions.length && (f.predictions.forEach(function (a, b) {
					e.push({name: a.description, index: b, placeId: a.place_id})
				}), a.set("cityList", e), a.$("#schedule-city-list").removeClass("select2-display-none"))
			})
		});
		this.$().delegate(".city-select",
			"click", function () {
				var c = $(this).attr("data-id"), c = a.cityList[c];
				a.controller.scheduler.set("settings.city", c.name);
				a.controller.scheduler.set("settings.gpid", c.placeId);
				a.$("#schedule-city-list").addClass("select2-display-none")
			});
		this.$().on("click", function () {
			"inDOM" === a._state && a.$("#schedule-city-list").addClass("select2-display-none")
		});
		this.$().delegate(".day-on", "change", function () {
			var c;
			c = $(this).attr("id").replace("label_", "");
			var d = $(this).is(":checked");
			c = a.scheduler.objectAt(c);
			c.set("isOn",
				d);
			d ? (a.$("#" + c.rangeId).parent().removeClass("hidden"), a.$("#" + c.rangeId).parent().next().addClass("hidden")) : (a.$("#" + c.rangeId).parent().next().removeClass("hidden"), a.$("#" + c.rangeId).parent().addClass("hidden"))
		});
		this.$("#widget-scheduler-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function () {
				var c = {}, d = moment().startOf("week").day();
				a.clearSaveMessages();
				a.scheduler.forEach(function (a, e) {
					var f, g, h, k, l = (e + d) % 7;
					a.isOn ? (f = moment(a.from, "X").hours(), g =
						moment(a.to, "X").hours(), h = moment(a.from, "X").minutes(), k = moment(a.to, "X").minutes(), f += h / 60, g = 0 === g || isNaN(g) ? 24 : g + k / 60, c[l] = {
						start: 36E5 * f,
						end: 36E5 * g
					}) : c[l] = {start: 0, end: 0}
				});
				a.controller.saveScheduler(c, function (b) {
					b ? a.saveError() : a.saveSuccess()
				})
			}
		});
		this.$().delegate("#hours-status", "change", function () {
			a.controller.scheduler.set("enabled", $(this).is(":checked"))
		});
		this.$("#hours-status").prop("checked", a.controller.scheduler.enabled)
	},
	setSlider: function () {
		var a = this, c = {
			type: "double",
			min: moment().locale("en").startOf("day").format("X"),
			max: moment().locale("en").add(1, "days").startOf("day").format("X"),
			step: 900,
			grid_snap: !0,
			prettify_enabled: !0,
			decorate_both: !1,
			values_separator: " - ",
			prettify: function (a) {
				return moment(a, "X").format("h:mm A")
			},
			onFinish: function (c) {
				var b = parseInt($(c.input).attr("id").replace("range_", ""), 10), b = a.scheduler.objectAt(b);
				b.set("from", c.from);
				b.set("to", c.to)
			}
		};
		this.scheduler.forEach(function (d) {
			var b, e = a.$("#" + d.rangeId);
			c.from = d.from;
			"0:00" === moment(d.to, "X").locale("en").format("H:mm") && (d.to = parseInt(d.to,
				10) + 86400);
			c.to = d.to;
			e.ionRangeSlider(c);
			b = e.data("ionRangeSlider");
			a.controller.scheduler.enabled ? b.update({disable: !1}) : b.update({disable: !0});
			d.isOn ? e.parent().removeClass("hidden") : e.parent().next().removeClass("hidden")
		})
	},
	isSchedulerEnabled: function () {
		var a = this;
		"inDOM" === this.state && (this.controller && this.controller.activeWidget) && (this.controller.scheduler.enabled ? (this.$("#schedule-city").prop("disabled", !1), this.$(".day-on").each(function () {
			$(this).prop("disabled", !1)
		}), this.scheduler.forEach(function (c) {
			(c =
				a.$("#" + c.rangeId).data("ionRangeSlider")) && c.update({disable: !1})
		})) : (this.$("#schedule-city").prop("disabled", !0), this.$(".day-on").each(function () {
			$(this).prop("disabled", !0)
		}), this.scheduler.forEach(function (c) {
			(c = a.$("#" + c.rangeId).data("ionRangeSlider")) && c.update({disable: !0})
		})))
	}.observes("controller.scheduler.enabled")
});
Tawk.ShortcutsCSVView = Ember.View.extend({
	template: Ember.TEMPLATES.shortcutsCSVView,
	elementId: "shortcuts-csv",
	controller: null,
	classNames: "smart-form",
	saveLimit: 50,
	currentIndex: 0,
	totalSave: 0,
	successSave: [],
	didInsertElement: function () {
		var a = this;
		this.$("#cancel-upload").click(function () {
			"function" === typeof a.closeCallback && a.closeCallback()
		});
		this.$("#submit-upload").click(function () {
			a.set("isLoading", !0);
			a.$("#cancel-upload").attr("disabled", "disabled");
			a.$("#submit-upload").attr("disabled", "disabled");
			a.$(".upload-error").remove();
			a.$(".input").removeClass("state-error");
			a.saveBatch()
		});
		this.$().delegate(".remove-shortcut", "click", function () {
			var c;
			c = $(this).attr("data-id");
			(c = a.list.findProperty("id", c)) && a.list.removeObject(c)
		})
	},
	saveBatch: function () {
		var a = this, c = this.list.slice(this.currentIndex, this.currentIndex + this.saveLimit),
			d = this.$("input[name='access-type']:checked").val();
		c.length ? (this.set("currentIndex", a.currentIndex + c.length), this.set("totalSave", a.totalSave + c.length), this.controller.bulkAddShortcuts(c, d, function (b, d) {
			if (b) return "InternalServerError" === b ? errorSave(a.$(), languageParser.translate("form_validation_messages", "SERVER_ERROR")) : "UnauthorizedError" ===
			b ? errorSave(a.$(), "You do not have access to update this property.") : errorSave(a.$()), a.saveDone();
			for (var f = 0; f < d.length; f++) {
				var g = c[f], h = d[f];
				if (h.ok) a.successSave.push(g); else {
					var k;
					"SERVER_ERROR" === h.error ? k = languageParser.translate("form_validation_messages", "SERVER_ERROR") : "KEY_ALREADY_EXIST" === h.error ? (k = "This shortcut key already exists. Please remove or modify it.", a.$("#" + g.id).find(".input").addClass("state-error")) : "INVALID_ARGUMENT" === h.error && ("key" === h.field ? (k = languageParser.translate("form_validation_messages",
						"mdb_syntax"), a.$("#" + g.id).find(".input").addClass("state-error")) : "message" === h.field && (k = "Invalid message. Please make sure there is at least 1 character and at most 1000 characters", a.$("#" + g.id).find(".textarea").addClass("state-error")));
					$('<tr class="upload-error"><td colspan="3">' + k + "</td></tr>").insertAfter(a.$("#" + g.id))
				}
			}
			a.saveBatch()
		})) : this.saveDone()
	},
	saveDone: function () {
		var a = this, c = a.successSave.length, d = function () {
			a.set("totalSave", null);
			a.set("currentIndex", 0);
			a.set("isLoading",
				!1);
			a.$("#cancel-upload").removeAttr("disabled");
			a.$("#submit-upload").removeAttr("disabled");
			a.list.removeObjects(a.successSave);
			a.successSave.clear();
			0 === a.list.length && c ? (c && successSave($("#content-container"), "Successfully saved shortcuts"), a.closeCallback()) : c && successSave(a.$(), "Successfully saved " + c + " shortcuts")
		};
		c ? this.controller.reloadShortcutUpdate(function () {
			d()
		}) : d()
	}
});
Tawk.ShortcutsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.propertyShortcutsView, elementId: "property-shortcuts",
	controller: null, subViewId: "shortcuts", csvListView: null, didInsertElement: function () {
		var a, c = this, d = !1, b = $("body")[0];
		this._super();
		($.hasData(b) && $._data(b)).events.keydown.every(function (b) {
			return "closeView" === b.namespace ? (a = b.handler, c.set("originalCloseFunc", a), !1) : !0
		});
		($.hasData($("#close-view")[0]) && $._data($("#close-view")[0])).events.click.every(function (a) {
			c.set("originalClickCloseFunc", a.handler);
			return !1
		});
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (a) {
			if (27 ===
				a.keyCode) return a.stopPropagation(), c.csvListView ? c.closeCsvListView() : c.originalCloseFunc(), !1
		});
		$("#close-view").unbind("click.closeView");
		$("#close-view").on("click.closeView", function (a) {
			a.stopPropagation();
			c.csvListView ? c.closeCsvListView() : c.originalClickCloseFunc();
			return !1
		});
		this.$().delegate("#add-shortcut", "click", function () {
			c.cleanForm();
			c.controller.openItem()
		});
		this.$().delegate('input[name="shortcut-type"]', "change", function () {
			var a = $(this).val();
			c.controller.changeShortcutType(a)
		});
		this.$().delegate('input[name="access-type"], #shortcutKey', "change", function () {
			c.$("#shortcutKey").removeClass("shortcut_exist")
		});
		this.$().delegate("#openFilter", "click", function (a) {
			$(this).parent().toggleClass("open")
		});
		$("body").bind("click.shortcutsView", function (a) {
			$(a.target).parents("#search-form").length || c.closeAdvancedFilter()
		});
		this.$("#scrollable-list").bind("scroll.list", function (a) {
			!d && c.controller.pagedList.currentData.length && $(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight -
			100 && (d = !0, c.controller.loadNextList(function (a, b) {
				d = !1;
				!a && b && c.$(".all-bulk-check").prop("checked", !1)
			}))
		});
		this.$().delegate("#search-form", "submit", function () {
			var a = {
				queryString: c.$("#search-text").val().trim(),
				isSurvey: c.$("#is-survey").is(":checked"),
				isMessage: c.$("#is-message").is(":checked"),
				isPublic: c.controller.isGlobalShortcut ? !1 : c.$("#is-public").is(":checked"),
				isPersonal: c.controller.isGlobalShortcut ? !0 : c.$("#is-personal").is(":checked"),
				isGlobal: c.controller.isGlobalShortcut
			};
			c.controller.searchList(a);
			c.closeAdvancedFilter();
			return !1
		});
		this.$().delegate("#reset-filter", "click", function () {
			c.$("#search-text").val("");
			c.$("#is-survey").prop("checked", "checked");
			c.$("#is-message").prop(":checked", "checked");
			c.$("#is-public").prop(":checked", "checked");
			c.$("#is-personal").prop(":checked", "checked");
			c.controller.resetSearch();
			c.closeAdvancedFilter();
			return !1
		});
		this.$().delegate("#close-filter", "click", function () {
			c.closeAdvancedFilter();
			return !1
		});
		this.$().delegate("#add-shortcut-option", "click", function () {
			c.controller.addOption()
		});
		this.$().delegate(".delete-option", "click", function () {
			var a = $("input.shortcut-option").index($(this).nextAll("input"));
			0 > a || 3 < a || c.controller.removeOption(a)
		});
		this.$().delegate(".open-view", "click", function () {
			c.cleanForm();
			c.resetMessageContainerHeight()
		});
		this.$("#shortcut-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				var a = {
					key: c.$("#shortcutKey").val(),
					message: c.$("#message").val(),
					dataType: c.$('input[name="access-type"]:checked').val(),
					options: []
				};
				c.$("input.shortcut-option").each(function () {
					var b = $(this).val().trim();
					b && a.options.push(b)
				});
				a.type = 0 < a.options.length ? "s" : "m";
				c.controller.saveShortcut(a, function (b) {
					b ? "DUPLICATE_SHORTCUT_KEY" === b ? ($.validator.messages.shortcut_exist = $.validator.format(languageParser.translate("form_validation_messages", "shortcut_exist", {
							siteName: c.controller.isGlobalShortcut ? "global" : c.controller.activeProperty.name,
							access: a.dataType
						})), c.$("#shortcutKey").addClass("shortcut_exist"), c.$("#shortcut-form").valid()) :
						c.saveError() : c.saveSuccess()
				});
				return !1
			}
		});
		this.$().delegate("#upload-csv", "click", function () {
			c.$("#csv-file").trigger("click")
		});
		this.$().delegate("#upload-csv", "mouseover", function () {
			$(this).popover("show")
		});
		this.$().delegate("#upload-csv", "mouseout", function () {
			$(this).popover("hide")
		});
		this.$().delegate("#csv-file", "change", function () {
			var a = $(this)[0].files, b = new FileReader, a = a[0], d = [];
			a && (b.readAsText(a), b.onload = function (a) {
				a = $.csv.toArrays(a.target.result);
				for (var b = 0; b < a.length; b++) {
					var e =
						a[b];
					1 < e.length && !d.findProperty("key", e[0]) && d.pushObject({
						key: e[0].trim(),
						message: e[1].trim(),
						id: d.length + randomString(10, !0),
						messageType: "message",
						messageOptions: []
					})
				}
				0 === d.length ? errorSave(c.$("#content-container"), "Nothing to be uploaded. Please make sure the data format is : <br/>shortcut1,message1<br/>shortcut2,message2") : (c.set("csvListView", Tawk.ShortcutsCSVView.create({
					controller: c.controller,
					closeCallback: c.closeCsvListView.bind(c)
				})), c.csvListView.appendTo(c.$("#content-container")), c.csvListView.set("list",
					d))
			});
			$(this).val("");
			return !1
		});
		this.resetMessageContainerHeight()
	}, closeCsvListView: function () {
		this.csvListView && (this.csvListView.remove(), this.set("csvListView", null))
	}, cleanForm: function () {
		this.$("#shortcut-form .invalid").removeClass("invalid");
		this.$("#shortcut-form .valid").removeClass("valid");
		this.$("#shortcut-form .state-error").removeClass("state-error");
		this.$("#shortcut-form .state-success").removeClass("state-success");
		this.$("#shortcut-form .shortcut_exist").removeClass("shortcut_exist");
		this.$('#shortcut-form em[for="shortcutKey"], #shortcut-form em[for="message"]').css("display", "none")
	}, resetMessageContainerHeight: function () {
		this.$("#form-scrollable-container #message").height(window.innerHeight / 4)
	}, closeAdvancedFilter: function () {
		this.$("#search-form") && this.$("#search-form .input-group-btn").removeClass("open")
	}, addWarning: function () {
		this.controller.hasBeenUpdated && this.updateWarning(languageParser.translate("admin", "item_has_been_updated", {
			itemType: languageParser.translate("shortcuts",
				"shortcut_key"), itemName: this.controller.previousName
		}))
	}.observes("controller.hasBeenUpdated")
});
Tawk.TriggerConditionView = Ember.View.extend({
	template: Ember.TEMPLATES["condition-view"],
	classNames: ["condition-view"],
	mainConditons: null,
	selectTypes: null,
	condition: null,
	propertyId: null,
	valueInput: null,
	valueSelection: null,
	isInputText: null,
	isSelect: null,
	populateSelectTypes: function (a, c) {
		var d, b = mainConditionsOptions[c][a], e = b.conditional_select;
		d = b.values;
		var f = this, g = {
			integer: integerCheck, string: stringsCheck,
			limit_string: limitStringsCheck
		};
		g[e] && g[e].forEach(function (a) {
			var b = {index: a, value: languageParser.translate("triggers", a)};
			f.condition && f.condition.operation === a && (b.isSelected = !0);
			f.selectTypes.push(b)
		});
		"integer" !== e && "integer_no_op" !== e || !this.condition.value || this.condition.set("value", parseInt(this.condition.value, 10));
		"boolean" === e || "integer_no_op" === e ? this.set("condition.operation", null) : this.condition.operation || this.set("condition.operation", this.selectTypes[0].index);
		d ? (this.set("isSelect",
			!0), this.set("valueSelection", []), b.values = "function" === typeof b.values ? b.values(this.propertyId) : b.values, Array.isArray(b.values) ? (b.values.forEach(function (a, c) {
			var d, e;
			"object" !== typeof a || a instanceof String ? (e = d = a, b.tolowercase && (d = d.replace(" ", "_").toLowerCase()), b.isTime && (e = parseInt(a, 10), 0 < e && 60 > e ? e = moment.duration(e, "seconds").humanize() : 60 <= e ? (e /= 60, e = 60 <= e ? moment.duration(e / 60, "hours").humanize() : moment.duration(e, "minutes").humanize()) : e = languageParser.translate("triggers", "no_delay"))) :
				(e = a.value.toString(), d = a.id);
			e = {index: d, value: e};
			f.condition && (d === f.condition.value ? e.isSelected = !0 : e.value === f.condition.value && (e.isSelected = !0));
			f.valueSelection.push(e)
		}), "boolean" === e && (!0 === this.condition.value || null === this.condition.value ? (this.set("condition.value", "is_true"), this.set("valueSelection.0.isSelected", !0)) : (this.set("condition.value", "is_false"), this.set("valueSelection.1.isSelected", !0))), this.condition.value || this.set("condition.value", this.valueSelection[0].index)) : this.condition.value ||
			this.set("condition.value", this.valueSelection.length ? this.valueSelection[0].index : "")) : "boolean" !== e && (d = Ember.Object.create({
			classNames: "required condition-input",
			id: this.condition.valueId,
			name: this.condition.valueId,
			placeholder: ""
		}), "integer" === e || "integer_no_op" === e ? d.classNames += " digits" : d.maxlength = 500, "ip" === a && (d.classNames += " ipAddress"), b.isUrl && (f.condition.operation && "eq" !== f.condition.operation && "not" !== f.condition.operation || (d.classNames += " url"), d.maxlength = 2048), f.condition && (d.value =
			0 === f.condition.value ? 0 : decodeStr(f.condition.value)), this.set("valueInput", d), this.set("isInputText", !0))
	},
	didInsertElement: function () {
		var a = this;
		this.set("mainConditons", []);
		this.set("selectTypes", []);
		this.set("valueSelection", []);
		this.set("isInputText", !1);
		this.set("isSelect", !1);
		this.set("valueInput", Ember.Object.create());
		var c = $(".run-type-select").val() || "widget_loaded";
		Object.keys(mainConditionsOptions).forEach(function (d) {
			var b = {groupKey: d, keySelection: []};
			Object.keys(mainConditionsOptions[d]).forEach(function (e) {
				var f =
					mainConditionsOptions[d][e].trigger_type_select, f = {
					triggerTypeSelect: mainConditionsOptions[d][e].trigger_type_select,
					triggerTypeEnabled: f && -1 !== f.indexOf(c),
					index: d + "-" + e,
					value: languageParser.translate("triggers", e),
					key: e
				};
				a.condition && a.condition.field === e && (a.populateSelectTypes(e, d), a.set("condition.hint", mainConditionsOptions[d][e].hint), a.set("condition.group", d), f.isSelected = !0);
				b.keySelection.push(f)
			});
			a.mainConditons.push(b)
		});
		this.condition.field || (this.set("condition.field", this.mainConditons[0].keySelection[0].key),
			this.set("condition.hint", mainConditionsOptions[this.mainConditons[0].groupKey][this.condition.field].hint), this.set("condition.group", this.mainConditons[0].groupKey), this.populateSelectTypes(this.mainConditons[0].keySelection[0].key, this.mainConditons[0].groupKey));
		this.condition.id || this.set("condition.id", this.condition.group + "-" + this.condition.field);
		this.$(".condition").change(function () {
			var c = $(this).val().split("-"), b = c[1], c = c[0];
			a.set("condition.valueId", "value" + randomString(10, !0));
			a.set("condition.value",
				null);
			a.set("condition.operation", null);
			a.set("condition.hint", mainConditionsOptions[c][b].hint);
			a.$("label.error").html("").hide();
			a.set("selectTypes", []);
			a.set("valueSelection", []);
			a.set("isInputText", !1);
			a.set("isSelect", !1);
			a.set("valueInput", Ember.Object.create());
			a.populateSelectTypes(b, c)
		});
		this.$(".condition").on("resetField", function () {
			$(this).val(a.mainConditons[0].keySelection[0].index);
			a.set("condition.field", a.mainConditons[0].keySelection[0].key);
			$(this).trigger("change")
		});
		this.$().delegate(".operation",
			"change", function () {
				var a = $(this).val(), b = $(this).parents(".condition-view").find(".condition"),
					c = $(this).parents(".condition-view").find(".condition-input");
				c.length && b.length && (b = b.find("option:selected").val(), "page_info-page_url" === b && ("contains" === a || "ncontains" === a ? c.removeClass("url") : c.addClass("url")), "visitor_location-ip" === b && ("contains" === a || "ncontains" === a ? (c.removeClass("ipAddress"), c.addClass("partial_ip")) : (c.removeClass("partial_ip"), c.addClass("ipAddress"))), c.valid())
			})
	}
});
Ember.Handlebars.helper("TriggerConditionView",
	Tawk.TriggerConditionView);
Tawk.TriggerActionView = Ember.View.extend({
	template: Ember.TEMPLATES["action-view"],
	classNames: ["action-view"],
	actionsList: null,
	action: null,
	selectTypes: null,
	willInsertElement: function () {
		var a = this, c = [];
		this.set("actionsList", []);
		Object.keys(actionsOptions).forEach(function (d) {
			var b = {value: d, text: languageParser.translate("triggers", d)};
			a.actionsList.push(d);
			a.action && a.action.action === d && (a.populateInputFields(d), b.isSelected = !0);
			c.push(b)
		});
		this.set("actionSelectOptions",
			c)
	},
	populateInputFields: function (a) {
		var c = actionsOptions[a];
		a = c.type;
		var d = c.values, b = this;
		this.set("valueSelection", []);
		this.set("inputFields", []);
		this.set("isInputText", !1);
		this.set("isSelect", !1);
		"integer" === a ? (this.set("isSelect", !0), Array.isArray(this.action.value) && this.set("action.value", this.action.value.join(",")), d.forEach(function (a) {
			var d = a, g = a, h = !1;
			c.isTime && (a = parseInt(a, 10), 0 < a && 60 > a ? a = moment.duration(a, "seconds").humanize() : 60 <= a ? (a /= 60, a = 60 <= a ? moment.duration(a / 60, "hours").humanize() :
				moment.duration(a, "minutes").humanize()) : a = languageParser.translate("triggers", "no_delay"));
			parseInt(b.action.value, 10) === parseInt(g, 10) && (b.set("action.parsedValue", a), h = !0);
			b.valueSelection.push({index: d, value: a.toString(), isSelected: h})
		}), null === this.action.value && (this.set("action.value", b.valueSelection[0].value), this.set("action.parsedValue", this.action.value))) : "string" === a && (this.set("isInputText", !0), d.forEach(function (a, d) {
			var g = {
				classNames: "required action-input",
				name: b.elementId + d + b.action.valueId,
				id: b.elementId + d + b.action.valueId,
				maxlength: "500",
				placeholder: languageParser.translate("triggers", a),
				isInput: !0
			};
			"textArea" === c.inputType[d] && (g.classNames += " action-textarea", g.isInput = !1);
			b.inputFields.push(g);
			null !== b.action.value && (g.value = decodeStr(b.action.value[d]))
		}))
	},
	didInsertElement: function () {
		var a = this;
		this.action.action || (this.set("action.action", this.actionsList[0]), this.populateInputFields(this.actionsList[0]));
		this.$("select.action-type-select").change(function () {
			a.set("action.valueId",
				"value" + randomString(10, !0));
			a.set("action.value", null);
			a.populateInputFields($(this).val())
		})
	}
});
Ember.Handlebars.helper("TriggerActionView", Tawk.TriggerActionView);
Tawk.TriggerFromView = Ember.View.extend({
	template: Ember.TEMPLATES.triggerForm,
	elementId: "trigger-form",
	controller: null,
	tagName: "form",
	classNames: ["smart-form", "admin-form"],
	willInsertElement: function () {
		this.set("delaySelectOptions", [{value: "0", text: languageParser.translate("triggers", "no_delay")}, {
			value: "10", text: languageParser.translate("triggers",
				"second_10")
		}, {value: "20", text: languageParser.translate("triggers", "second_20")}, {
			value: "30",
			text: languageParser.translate("triggers", "second_30")
		}, {value: "45", text: languageParser.translate("triggers", "second_45")}, {
			value: "60",
			text: languageParser.translate("triggers", "minute_1")
		}, {value: "120", text: languageParser.translate("triggers", "minute_2")}, {
			value: "180",
			text: languageParser.translate("triggers", "minute_3")
		}, {value: "240", text: languageParser.translate("triggers", "minute_4")}, {
			value: "300", text: languageParser.translate("triggers",
				"minute_5")
		}, {value: "600", text: languageParser.translate("triggers", "minute_10")}, {
			value: "900",
			text: languageParser.translate("triggers", "minute_15")
		}, {value: "1200", text: languageParser.translate("triggers", "minute_20")}, {
			value: "1800",
			text: languageParser.translate("triggers", "minute_30")
		}, {value: "3600", text: languageParser.translate("triggers", "hour_1")}]);
		this.set("delaySelectClass", "delay-type-select");
		this.set("delaySelectValue", this.controller.activeTrigger && this.controller.activeTrigger.delay ? this.controller.activeTrigger.delay :
			"0");
		this.set("runSelectOptions", [{
			value: "widget_loaded",
			text: languageParser.translate("triggers", "widget_loaded")
		}, {
			value: "chat_requested",
			text: languageParser.translate("triggers", "chat_requested")
		}, {value: "send_message", text: languageParser.translate("triggers", "chat_sent")}]);
		this.set("runSelectClass", "run-type-select");
		this.set("runSelectValue", this.controller.activeTrigger && this.controller.activeTrigger.trigger ? this.controller.activeTrigger.trigger : "widget_loaded");
		this.set("matchSelectOptions",
			[{value: "all", text: languageParser.translate("triggers", "all")}, {
				value: "any",
				text: languageParser.translate("triggers", "any")
			}]);
		this.set("matchSelectClass", "match-type-select");
		this.set("matchSelectValue", this.controller.activeTrigger && this.controller.activeTrigger.match ? this.controller.activeTrigger.match : "all")
	},
	delayChanged: function () {
		"inDOM" === this._state && this.set("delaySelectValue", this.controller.activeTrigger && this.controller.activeTrigger.delay ? this.controller.activeTrigger.delay : "0")
	}.observes("controller.activeTrigger.delay"),
	isVisible: function () {
		return this.controller && this.controller.activeTrigger ? !0 : !1
	}.property("controller.activeTrigger"),
	totalConditionsObserver: function () {
		var a = this;
		"inDOM" === this._state && (this.controller.activeTrigger && this.controller.activeTrigger.conditions) && setTimeout(function () {
			1 === a.controller.activeTrigger.conditions.length ? a.$(".delete-condition").addClass("hidden") : a.$(".delete-condition").removeClass("hidden")
		}, 100)
	}.observes("controller.activeTrigger.conditions.length"),
	totalActionsObserver: function () {
		var a =
			this;
		"inDOM" === this._state && (this.controller.activeTrigger && this.controller.activeTrigger.conditions) && setTimeout(function () {
			1 === a.controller.activeTrigger.actions.length ? a.$(".delete-action").addClass("hidden") : a.$(".delete-action").removeClass("hidden")
		}, 100)
	}.observes("controller.activeTrigger.actions.length"),
	didInsertElement: function () {
		var a = this;
		this.$().delegate("#trigger-type", "change", function () {
			$(this).val();
			a.controller.changeAddFormType($(this).val())
		});
		this.$().delegate("#add-condition",
			"click", function () {
				a.controller.addTriggerCondition()
			});
		this.$().delegate("#add-action", "click", function () {
			a.controller.addTriggerAction()
		});
		this.$().delegate(".delete-condition", "click", function () {
			var c = $(this).parent().find(".condition-item").val();
			a.controller.removeCondition(c)
		});
		this.$().delegate(".delete-action", "click", function () {
			var c = $(this).parent().find(".action-item").val();
			a.controller.removeAction(c)
		});
		this.$().delegate(".run-type-select", "change", function () {
			var c = $(this).val();
			mainConditionsOptions.chat_info.department.trigger_type_select.contains(c) ?
				a.$('option[value="chat_info-department"]').removeAttr("disabled") : a.$('option[value="chat_info-department"]').attr("disabled", !0);
			mainConditionsOptions.chat_info.message.trigger_type_select.contains(c) ? a.$('option[value="chat_info-message"]').removeAttr("disabled") : a.$('option[value="chat_info-message"]').attr("disabled", !0)
		})
	},
	activeTriggerChanged: function () {
		"inDOM" === this._state && (this.controller && this.controller.activeTrigger && this.controller.activeTrigger.isAdvanced) && (this.set("runSelectValue",
			this.controller.activeTrigger && this.controller.activeTrigger.trigger ? this.controller.activeTrigger.trigger : "widget_loaded"), this.set("matchSelectValue", this.controller.activeTrigger && this.controller.activeTrigger.match ? this.controller.activeTrigger.match : "all"))
	}.observes("controller.activeTrigger")
});
Ember.Handlebars.helper("TriggerFromView", Tawk.TriggerFromView);
Tawk.TriggersView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.triggersView, elementId: "property-triggers", controller: null,
	subViewId: "triggers", didInsertElement: function () {
		var a = this;
		this._super();
		this.$("#trigger-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				a.clearSaveMessages();
				a.controller.activeTrigger.isAdvanced ? a.saveAdvancedTrigger(c) : a.saveBasicTrigger(c);
				return !1
			}
		})
	}, saveBasicTrigger: function () {
		var a = !!this.controller.activeTrigger.id, c = this, d = {
			name: c.$("#trigger-name").val().trim(),
			delay: c.$(".delay-type-select").val(),
			pageUrl: c.$("#trigger-url").length ?
				c.$("#trigger-url").val().trim().toLowerCase() : null,
			sender: c.$("#trigger-agent").val().trim(),
			message: c.$("#trigger-message").val().trim()
		};
		c.$("#trigger-status").length && (d.enabled = c.$("#trigger-status").is(":checked"));
		c.controller.saveBasicTrigger(d, function (b) {
			b ? c.saveError(a ? null : languageParser.translate("form_validation_messages", "trigger_add_error")) : c.saveSuccess(a ? null : languageParser.translate("form_validation_messages", "trigger_add_success"))
		})
	}, saveAdvancedTrigger: function (a) {
		var c = !!this.controller.activeTrigger.id,
			d = this, b = !1, e = {
				name: d.$("#trigger-name").val().trim(),
				description: d.$("#trigger-description").val().trim(),
				execute: d.$("#trigger-execute").is(":checked"),
				trigger: d.$(".run-type-select").val(),
				match: d.$(".match-type-select").val(),
				conditions: [],
				actions: []
			}, f = [];
		d.$("#trigger-status").length && (e.enabled = d.$("#trigger-status").is(":checked"));
		$(a).find(".condition-view").each(function (a, b) {
			var c, d, f;
			f = $(b).find(".condition").val();
			var n = $(b).find(".condition-input").val();
			-1 !== f.indexOf("-") ? (f = f.split("-"),
				c = f[0], f = f[1]) : c = "time_date";
			if (mainConditionsOptions[c] && mainConditionsOptions[c][f]) {
				c = mainConditionsOptions[c][f];
				c.tolowercase && (n = n.toLowerCase());
				if ("integer" === c.conditional_select || "string" === c.conditional_select || "limit_string" === c.conditional_select) d = $(b).find(".operation").val();
				"boolean" === c.conditional_select && (d = "eq", n = "is_true" === n ? !0 : !1);
				e.conditions.push({field: f, operation: d, value: n})
			}
		});
		$(a).find(".action-view").each(function (c, h) {
			var k = [], l = $(h).find(".action-type-select").val();
			if (actionsOptions[l]) {
				$(h).find(".action-input").each(function (a, b) {
					k.push($(b).val())
				});
				if (-1 !== f.indexOf(l)) return b = !0, d.saveError(languageParser.translate("triggers", "no_repeat_action"));
				$("#actions-general-error", a).html("").hide();
				e.actions.push({action: l, value: k});
				f.push(l)
			}
		});
		if (b) return !1;
		d.controller.saveTrigger(e, function (a) {
			a ? d.saveError(c ? null : languageParser.translate("form_validation_messages", "trigger_add_error")) : d.saveSuccess(c ? null : languageParser.translate("form_validation_messages",
				"trigger_add_success"))
		});
		return !1
	}
});
Tawk.BanView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.banView,
	elementId: "property-ban",
	controller: null,
	subViewId: "ban-list",
	didInsertElement: function () {
		var a = this, c = !1;
		this._super();
		this.$("#scrollable-list").bind("scroll.list", function (d) {
			!c && a.controller.pagedList.currentData.length && $(this).scrollTop() + $(this).height() >= $(this)[0].scrollHeight - 100 && (c = !0, a.controller.loadNextList(function (b, d) {
				c = !1;
				!b && d && a.$(".all-bulk-check").prop("checked",
					!1)
			}))
		});
		this.$("#ban-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				var c = a.$("#ban-reason").val(), b = a.$("#ban-entry").val();
				a.controller.submitBan(b, c, function (b) {
					b ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		});
		this.$("#search-form").submit(function () {
			var c = a.$("#search-text").val().trim();
			a.controller.searchList(c);
			return !1
		})
	}
});
Tawk.MailSettingsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.mailSettings, elementId: "mail-settings-view",
	controller: null, subViewId: "mail-settings", willInsertElement: function () {
		var a, c, d = [];
		this.controller.activeProperty && this.controller.activeProperty.id && (a = Tawk.webProperties.getProperty(this.controller.activeProperty.id)) && ((c = a.currentAgents.getEach("aid")) && (d = Tawk.agentsController.agentDropDownList.filter(function (a) {
			return a.isActive && c.contains(a.id) ? !0 : !1
		})), this.set("agentList", sortList(d, "name")))
	}, didInsertElement: function () {
		var a = this, c = ["all-chats-additional-email", "new-ticket-additional-email",
			"offline-message-additional-email", "missed-additional-email"], d = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: this.agentList.copy()
		}), b;
		for (b = 0; b < d.local.length; b++) d.local[b].name = decodeStr(d.local[b].name);
		d.initialize();
		for (b = 0; b < c.length; b++) a.createTagEvents("#" + c[b], d);
		this.$().delegate("#cancel", "click", function (b) {
			b.stopPropagation();
			a.closeView();
			return !1
		});
		this._super();
		this.setAgentList();
		this.controller.getEmailSettings(function () {
			a.fillTagsInput(a.$("#all-chats-additional-email input.email-tags"),
				a.controller.emailSettings.chat.target);
			a.fillTagsInput(a.$("#new-ticket-additional-email input.email-tags"), a.controller.emailSettings.ticket.target);
			a.fillTagsInput(a.$("#offline-message-additional-email input.email-tags"), a.controller.emailSettings.offline.target);
			a.fillTagsInput(a.$("#missed-additional-email input.email-tags"), a.controller.emailSettings.missed.target);
			a.$("#all-email-select").val(a.controller.emailSettings.chat.group);
			a.$("#new-email-select").val(a.controller.emailSettings.ticket.group);
			a.$("#offline-email-select").val(a.controller.emailSettings.offline.group);
			a.$("#missed-email-select").val(a.controller.emailSettings.missed.group)
		});
		this.$().delegate("#all-email-select", "change", function () {
			a.controller.set("emailSettings.chat.group", $(this).val())
		});
		this.$().delegate("#new-email-select", "change", function () {
			a.controller.set("emailSettings.ticket.group", $(this).val())
		});
		this.$().delegate("#offline-email-select", "change", function () {
			a.controller.set("emailSettings.offline.group", $(this).val())
		});
		this.$().delegate("#missed-email-select", "change", function () {
			a.controller.set("emailSettings.missed.group", $(this).val())
		});
		this.$("#mail-settings-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (b) {
				var c = a.controller.emailSettings;
				c.chat.group = a.$("#all-email-select").val();
				c.ticket.group = a.$("#new-email-select").val();
				c.offline.group = a.$("#offline-email-select").val();
				c.missed.group = a.$("#missed-email-select").val();
				a.splitAgentTagsToTagers(c.chat,
					a.$("#all-chats-additional-email input.email-tags").tagsinput("items"));
				a.splitAgentTagsToTagers(c.ticket, a.$("#new-ticket-additional-email input.email-tags").tagsinput("items"));
				a.splitAgentTagsToTagers(c.offline, a.$("#offline-message-additional-email input.email-tags").tagsinput("items"));
				a.splitAgentTagsToTagers(c.missed, a.$("#missed-additional-email input.email-tags").tagsinput("items"));
				a.controller.saveEmailSettings(c, function (b) {
					b ? a.saveError() : (a.controller.set("emailSettings", c), a.saveSuccess())
				});
				return !1
			}
		})
	}, fillTagsInput: function (a, c) {
		var d, b;
		for (d = 0; d < c.a.length; d++) (b = this.agentList.findProperty("id", c.a[d])) && a.tagsinput("add", {
			id: b.id,
			name: b.name
		});
		for (d = 0; d < c.e.length; d++) a.tagsinput("add", {id: c.e[d], name: c.e[d]})
	}, splitAgentTagsToTagers: function (a, c) {
		a.target = {a: [], e: []};
		for (var d = 0; d < c.length; d++) isEmail(c[d].id) ? a.target.e.push(c[d].id) : a.target.a.push(c[d].id)
	}, createTagEvents: function (a, c) {
		var d = this, b = a + " input.email-tags";
		d.$(b).tagsinput({
			itemText: "name",
			itemValue: "id",
			onTagExists: function (c,
			                       f) {
				var g;
				if (c.id === c.name && d.agentList.findProperty("name", c.name) && (g = d.findFreeAgentIdForName(d.$(b).tagsinput("items"), c.name))) {
					d.$(b).tagsinput("add", {id: g, name: c.name});
					return
				}
				d.$(a + " label.error-msg").text(languageParser.translate("form_validation_messages", "agent_tag_already_exist"));
				d.$(a + " .tt-menu.tt-open").removeClass("tt-open");
				d.$(a + " .tt-menu").hide()
			},
			typeaheadjs: {source: c.ttAdapter(), displayKey: "name", highlight: !0},
			freeInput: !0,
			maxChars: 255,
			maxTags: 10
		});
		d.$(b).tagsinput("input").on("keydown",
			function (a) {
				if (13 === a.keyCode && $(this).val()) return d.$(b).tagsinput("add", {
					id: d.findFreeAgentIdForName(d.$(b).tagsinput("items"), $(this).val()) || $(this).val(),
					name: $(this).val()
				}), !1;
				13 != a.keyCode && d.$("label.error-msg").text("")
			});
		d.$(b).tagsinput("input").on("blur", function () {
			$(this).val() && d.$(b).tagsinput("add", {id: $(this).val(), name: $(this).val()})
		});
		d.$(b).on("beforeItemAdd", function (b) {
			var c = null, g = $(this).tagsinput("items");
			d.$(a + " label.error-msg").text("");
			b.item && b.item.name && (255 < b.item.name.length ?
				c = languageParser.translate("form_validation_messages", "tag_length_exceed") : d.agentList.findProperty("name", b.item.name) && !d.agentList.findProperty("id", b.item.id) ? g.findProperty("name", b.item.name) && ((newId = d.findFreeAgentIdForName(g, b.item.name)) ? b.item.id = newId : c = languageParser.translate("form_validation_messages", "agent_tag_already_exist")) : d.agentList.findProperty("id", b.item.id) || "#new-ticket-additional-email" !== a ? isEmail(b.item.name) || d.agentList.findProperty("id", b.item.id) || (c = languageParser.translate("form_validation_messages",
					"email")) : c = languageParser.translate("form_validation_messages", "name_agent_not_found"), c && (b.cancel = !0, d.$(a + " label.error-msg").text(c), d.$(a + " .tt-menu.tt-open").removeClass("tt-open"), d.$(a + " .tt-menu").hide()))
		});
		d.$(b).on("itemAdded", function () {
			var a, c = d.$(".bootstrap-tagsinput").width() - 55, g = 0;
			d.$(".tag").each(function (a, b) {
				g += $(b).outerWidth(!0);
				$(b).css("max-width", c)
			});
			a = c - g;
			100 > a && (a = 100);
			d.$(".tt-input")[0].style.cssText += "min-width : " + a + "px !important";
			d.$(b).tagsinput("input").typeahead("val",
				"")
		})
	}, findFreeAgentIdForName: function (a, c) {
		for (var d = 0; d < this.agentList.length; d++) if (this.agentList[d].name === c && !a.findProperty("id", this.agentList[d].id)) return this.agentList[d].id
	}, setAgentList: function () {
		var a, c, d = [];
		"inDOM" === this._state && (this.controller.activeProperty && this.controller.activeProperty.id) && (a = Tawk.webProperties.getProperty(this.controller.activeProperty.id)) && ((c = a.currentAgents.getEach("aid")) && (d = Tawk.agentsController.agentDropDownList.filter(function (a) {
			return a.isActive &&
			c.contains(a.id) ? !0 : !1
		})), this.set("agentList", sortList(d, "name")))
	}
});
Tawk.PageContentView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.pageContent,
	elementId: "page-content",
	subViewId: "page-content",
	didInsertElement: function () {
		var a = this, c = {filereader: GLOBAL_STATIC_URL + "/scripts/filereader.swf", debugMode: !0};
		this._super();
		main.hasFileReader || main.hasFlash || main.showUnexpectedIssue("filereader_unsupported");
		main.hasUserMedia || (main.hasFlash || desktopConnector.enabled()) || main.showUnexpectedIssue("usermedia_unsupported");
		this.$().delegate(".page-photo-select", "click", function () {
			var c = $(this).attr("id");
			a.clearSaveMessages();
			"upload" === c && !window.FileAPIProxy && main.hasFileReader ? a.$("#photo-image").trigger("click") : "capture" === c && main.hasUserMedia ? a.controller.openCamera() : "remove" === c && a.controller.removeLogo()
		});
		window.FileAPIProxy && !main.hasFileReader && main.hasFlash ? (this.$("#upload").fileReader(c), this.$("#upload").change(function (c) {
			c.target.files[0] && a.controller.uploadPhoto(c.target.files[0], {width: 200, height: 200},
				{width: 137, height: 137}, "page-profile")
		})) : this.$().delegate("#photo-image", "change", function () {
			var c = $(this)[0].files;
			c[0] && (a.controller.uploadPhoto(c[0], {width: 200, height: 200}, {
				width: 137,
				height: 137
			}, "page-profile"), a.$("#photo-image").val(""));
			return !1
		});
		this.$().delegate(".page-header-select", "click", function () {
			var c = $(this).attr("id");
			a.clearSaveMessages();
			"upload-header" === c && !window.FileAPIProxy && main.hasFileReader ? a.$("#header-image").trigger("click") : "remove-header" === c && a.controller.removeHeader()
		});
		window.FileAPIProxy && !main.hasFileReader && main.hasFlash ? (this.$("#upload-header").fileReader(c), this.$("#upload-header").change(function (c) {
			c.target.files[0] && a.controller.uploadPhoto(c.target.files[0], {width: 500, height: 190}, {
				width: 500,
				height: 190
			}, "page-header")
		})) : this.$().delegate("#header-image", "change", function () {
			var c = $(this)[0].files;
			c[0] && (a.controller.uploadPhoto(c[0], {width: 500, height: 190}, {
				width: 500,
				height: 190
			}, "page-header"), a.$("#header-image").val(""));
			return !1
		});
		this.$().delegate("#tags",
			"keyup", function () {
				var c = [], b = !1, e = [], f = $(this);
				$(this).val() && (c = $(this).val().split(","));
				c.every(function (a) {
					a = a.trim();
					if (100 < a.length) return f.addClass("invalid-length"), e = [], b = !0, !1;
					-1 === e.indexOf(a) && e.push(encodeStr(a));
					return !0
				});
				5 < e.length && (f.addClass("invalid-total"), b = !0);
				b || ($(this).removeClass("invalid-length"), $(this).removeClass("invalid-total"), a.controller.customization.set("tagList", e), a.controller.customization.set("tags", e.join(", ")))
			});
		this.$("#page-content-form").validate({
			errorPlacement: function (a,
			                          b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				var b;
				a.$("#page-status") && (b = a.$("#page-status").is(":checked"));
				a.controller.savePageCustomization(b, void 0, function (b) {
					b ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		});
		this.$().delegate("select.country-select", "change", function () {
			a.controller.updateCountryCode($(this).val())
		});
		this.$().delegate("#search-city", "keyup", function (c) {
			c = $(this).val().trim();
			a.controller.searchCities(c, function () {
				a.$(".select2-drop").removeClass("select2-display-none")
			})
		});
		this.$().delegate(".city-select", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.updatePageLocationDetails(c);
			a.$(".select2-drop").addClass("select2-display-none")
		});
		this.$().delegate(".external-link", "blur", function () {
			var c, b;
			c = a.$("input.external-link").index($(this));
			b = $(this).val();
			a.controller.extractUrl(c, b)
		});
		this.$().delegate(".delete-link", "click", function () {
			var c = a.$("input.external-link").index($(this).nextAll("input"));
			a.controller.removeExternalLink(c)
		});
		this.$().delegate("#user-tawkid",
			"blur", function () {
				var c = $(this);
				c.val().trim() && !c.hasClass("error") && (a.$(".small-transparent-spinner").removeClass("hidden"), a.controller.checkTawkId(c.val(), function (b, e) {
					b || e ? c.addClass("invalid") : c.removeClass("invalid");
					a.$("form").validate().element("#user-tawkid");
					a.$(".small-transparent-spinner").addClass("hidden")
				}))
			})
	}
});
Tawk.AddOnDetailView = Ember.View.extend({
	template: Ember.TEMPLATES.addOnDetail,
	elementId: "addon-details-container",
	paymentForm: null,
	previewModal: null,
	originalCloseFunc: null,
	resizeImageContainer: function () {
		"inDOM" === this._state && (this.controller.activeAddOn && this.controller.activeAddOn.productImages && 0 < this.controller.activeAddOn.productImages.length) && (imageContainerWidth = this.$("#addon-details").width(), 290 * this.controller.activeAddOn.productImages.length < imageContainerWidth ? (this.$("#right-scroll").hide().css("visibility", "hidden"), this.$("#left-scroll").hide().css("visibility", "hidden")) : this.$("#right-scroll").show())
	},
	didInsertElement: function () {
		var a = this, c, d =
			$("body")[0];
		if (this.controller.activeAddOn) {
			var b = $(HandlebarsTemplates[this.controller.activeAddOn.id]({activeAddOn: this.controller.activeAddOn}));
			this.$("#content-description-view").append(b);
			!this.controller.activeAddOn.isSubscribed && this.controller.activeAddOn.needBetaCode && this.set("needBetaCode", !0)
		}
		$(".present").tooltip();
		$(".title").tooltip();
		($.hasData(d) && $._data(d)).events.keydown.every(function (b) {
			return "closeView" === b.namespace ? (c = b.handler, a.set("originalCloseFunc", c), !1) : !0
		});
		this.$("#right-scroll").show().css("visibility",
			"hidden");
		this.resizeImageContainer();
		$(window).bind("resize.imageContainer", this.resizeImageContainer.bind(this));
		this.$().delegate("#payment-method", "change", function () {
			"cc" === $(this).val() ? a.$("#card-details").removeClass("hidden") : a.$("#card-details").addClass("hidden")
		});
		$.validator.messages.ccExpiryFormat = $.validator.format("The format should be MM/YY");
		$.validator.messages.ccExpiryDate = $.validator.format("Invalid expiry date.");
		$.validator.messages.ccNumber = $.validator.messages.creditcard;
		$.validator.messages.cvcCheck = $.validator.format("Invalid cvc number.");
		this.$("#card-number").mask("9999 9999 9999? 9999 9999", {placeholder: " "});
		this.$("#card-expiry").mask("99/99", {
			placeholder: " ", completed: function () {
				a.$("#card-cvc").focus()
			}
		});
		this.$("#card-cvc").mask("999?9", {placeholder: " "});
		this.$("#card-number").keyup(function () {
			window.Stripe && (cardType = Stripe.card.cardType($(this).val())) && (cardType = cardType.replace(" ", "").toLowerCase(), a.$(".card-type").hasClass(cardType) || a.$(".card-type").removeClass().addClass("icon-append card-type " +
				cardType))
		});
		this.set("paymentForm", this.$("#payment-form").validate({
			onkeyup: !1, onfocusout: !1, errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (b) {
				var c = {}, d = {}, h = a.$("#payment-method", b).val(), k = function (b, c, e) {
					"inDOM" === a._state && (b ? (a.parentView.saveError(c), e && setTimeout(function () {
						a.$("#card-selection").val(e)
					}, 0), a.$("#submit").removeAttr("disabled").html("Activate Now"), a.set("paymentProcessing", !1)) : (a.set("paymentSuccess", !0), a.controller.activeAddOn.isLiveAnswering &&
					(Tawk.routing.changeRoute({
						view: "admin",
						propertyId: a.controller.activeProperty.id,
						subView: "addon-store",
						itemId: "live-answering-settings",
						subSettings: "wizard"
					}), a.controller.saveLastSubView({viewType: "settings"}), a.parentView.set("showAddonSettings", !0), a.controller.openSettings("live-answering")), a.controller.activeAddOn.isWhitelabel ? (d.enabled = !0, d.widget = {
						label: a.$("#widget-label").val(),
						url: a.$("#widget-url").val(),
						textColor: a.$("#widget-text-color").ColorSelector("getColor").toHexString()
					}, d.email =
						{
							label: a.$("#email-label").val(),
							url: a.$("#email-url").val()
						}, a.controller.saveWhitelabelSettings(d, function (b) {
						b && a.parentView.saveError();
						a.$("#submit").removeAttr("disabled").html("Activate Now");
						a.set("paymentProcessing", !1);
						a.$("#min-whitelabel-settings").hide();
						a.$("#addon-details").length && a.$("#addon-details").height() < a.$("#addon-details")[0].scrollHeight ? a.$(".more-below").removeClass("hidden") : a.$(".more-below").addClass("hidden")
					})) : (a.$("#submit").removeAttr("disabled").html("Activate Now"),
						a.set("paymentProcessing", !1))))
				};
				if (!a.paymentProcessing) return a.set("paymentProcessing", !0), a.$("#submit").attr("disabled", "disabled").html('<i class="fa fa-refresh fa-spin"></i>'), a.parentView.clearSaveMessages(), c.planId = $("#plan", b).val(), h || (!desktopConnector.enabled() || desktopConnector.canUsePaypal()) || (h = "cc"), "cc" === h && (a.$("#card-selection").length ? c.customerId = a.$("#card-selection").val() : c.customerId = "new-card", $(b).serializeArray().map(function (a) {
					c[a.name] = a.value
				})), a.controller.handlePayment(h,
					c, k), !1
			}
		}));
		this.$().delegate("#card-selection", "change", function () {
			"new-card" === $(this).val() ? a.$("#new-card-details").removeClass("hidden") : a.$("#new-card-details").addClass("hidden")
		});
		this.controller.activeAddOn && !this.controller.activeAddOn.isSubscribed && this.$("#plan").trigger("change");
		this.$().delegate(".dm-agent", "click", function () {
			var a = $(this).attr("id");
			Tawk.agentChatController.openChat(a)
		});
		this.$().delegate("#beta-unlock", "click", function () {
			var b = a.$("#beta-code").val();
			a.$("#beta-invalid").addClass("hidden");
			a.$("#beta-code").parent().removeClass("state-error");
			b === a.controller.activeAddOn.betaCode ? a.set("needBetaCode", !1) : (a.controller.activeAddOn.oldBetaCode && a.controller.activeAddOn.oldBetaCode.contains(b) ? a.$("#beta-invalid").html("Your beta code has expired. Please request a new code.") : a.$("#beta-invalid").html("Invalid beta code."), a.$("#beta-invalid").removeClass("hidden"), a.$("#beta-code").parent().addClass("state-error"))
		});
		this.$().delegate("#plan", "change", function () {
			var b;
			b = $(this).val();
			(b = a.controller.activeAddOn.plans.findProperty("id", b)) && a.$("#total-price").html("Total : $ " + b.price / 100 + (1 === b.cycle ? languageParser.translate("admin", "per_month") : languageParser.translate("admin", "per_year")))
		});
		setTimeout(function () {
			"inDOM" === a._state && (a.$("#addon-details").length && a.$("#addon-details").height() < a.$("#addon-details")[0].scrollHeight && a.$(".more-below").removeClass("hidden"), a.$("#plan").trigger("change"))
		});
		this.$().delegate(".more-below", "click", function () {
			a.$("#addon-details").scrollTop(a.$("#addon-details").height())
		});
		this.$("#addon-details").on("scroll", function () {
			"inDOM" === a._state && (0 === $(this).scrollTop() ? a.$(".more-below").removeClass("hidden") : a.$(".more-below").addClass("hidden"))
		});
		this.$("#widget-text-color").ColorSelector({appendTo: "#addon-settings-container"}, function (b) {
			a.$("#footer-container").css("color", b)
		}, a.$("#widget-text-color"));
		this.$().delegate(".clear-input", "click", function () {
			$(this).next().val("").trigger("change")
		});
		this.$().delegate("#widget-label", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("widget.label",
				$(this).val())
		});
		this.$().delegate("#widget-url", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("widget.url", $(this).val())
		});
		this.$().delegate("#email-label", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("email.label", $(this).val())
		});
		this.$().delegate("#email-url", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("email.url", $(this).val())
		});
		this.parseWidgetFooterTitle()
	},
	previewClosed: function () {
		this.originalCloseFunc && "function" ===
		typeof this.originalCloseFunc && $("body").bind("keydown.closeView", this.originalCloseFunc)
	},
	willDestroyElement: function () {
		this.previewModal && this.previewModal.remove();
		this.$(".alert").remove();
		this.set("previewModal", null);
		$(window).unbind("resize.imageContainer")
	},
	parseWidgetFooterTitle: function () {
		var a, c;
		if (this.controller && this.controller.activeAddOn && this.controller.activeAddOn.isWhitelabel && this.controller.activeAddOn.settings) {
			if (a = this.controller.activeAddOn.settings.widget.label) a = encodeStr(a);
			else return this.$("#widget-brand").html(""), "";
			(c = a.match(/_[^_]+_/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("_");
				var e = c.lastIndexOf("_");
				b = c.substring(0, b) + "<i>" + c.substring(b + 1, e) + "</i>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			(c = a.match(/\*[^*]+\*/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("*");
				var e = c.lastIndexOf("*");
				b = c.substring(0, b) + '<span style="font-size: 13px; font-weight: 700">' + c.substring(b + 1, e) + "</span>" + c.substring(e + 1, c.length);
				a = a.replace(c,
					b)
			});
			this.controller.activeAddOn.settings.widget.url && (a = '<a href=" ' + this.controller.activeAddOn.settings.widget.url + ' " target="_blank" style="text-decoration: none; color: inherit;">' + a + "</a>");
			this.$("#widget-brand").html(a)
		}
	}.observes("controller.activeAddOn.settings.widget.label")
});
Ember.Handlebars.helper("AddOnDetailView", Tawk.AddOnDetailView);
Tawk.WhitelabelSettingsView = Ember.View.extend({
	template: Ember.TEMPLATES.addOnSettings,
	elementId: "addon-settings-container",
	parsedFooterTitle: null,
	settingsChanged: function () {
		"inDOM" ===
		this._state && (this.controller && this.controller.activeAddOn) && (this.controller.activeAddOn.settings && this.controller.activeAddOn.settings.widget.textColor) && (this.$("#widget-text-color").ColorSelector("setColor", this.controller.activeAddOn.settings.widget.textColor), this.$("#footer-container").css("color", this.controller.activeAddOn.settings.widget.textColor))
	}.observes("controller.activeAddOn.settings"),
	didInsertElement: function () {
		var a, c = this, d = $("body")[0];
		($.hasData(d) && $._data(d)).events.keydown.every(function (b) {
			return "closeView" ===
			b.namespace ? (a = b.handler, c.set("originalCloseFunc", a), !1) : !0
		});
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (b) {
			if (27 === b.keyCode) return b.stopPropagation(), c.forwardingSetup ? c.closeForwardingSetup() : (c.controller.closeItem(), Tawk.routing.titlePath.itemName = null, Tawk.routing.setTitle(), Tawk.routing.changeRoute(c.controller.lastViews), $("body").bind("keydown.closeView", a)), !1
		});
		this.settingsChanged();
		this.$("#widget-text-color").ColorSelector({appendTo: "#addon-settings-container"},
			function (a) {
				c.$("#footer-container").css("color", a)
			}, c.$("#widget-text-color"));
		this.$().delegate("#addon-status", "change", function () {
			c.controller.activeAddOn.settings.set("enabled", $(this).is(":checked"));
			$(this).is(":checked") || c.$("#footer-container").css("color", "#000000")
		});
		this.$().delegate("#add-support-email", "click", function () {
			c.set("forwardingSetup", Tawk.ForwardingSetup.create({
				controller: c.controller,
				closeCallback: c.closeForwardingSetup.bind(c)
			}));
			c.forwardingSetup.append();
			return !1
		});
		this.$("#addon-settings-form").validate({
			errorPlacement: function (a, c) {
				a.insertAfter(c.parent())
			}, submitHandler: function (a) {
				var d = {
					enabled: c.$("#addon-status").is(":checked"),
					widget: {label: "", url: "", textColor: "#000000"},
					email: {label: "", url: ""}
				};
				d.enabled && (d.widget.label = $("#widget-label", a).val(), d.widget.url = $("#widget-url", a).val(), d.widget.textColor = $("#widget-text-color", a).ColorSelector("getColor").toHexString(), d.email.label = $("#email-label", a).val(), d.email.url = $("#email-url", a).val());
				c.controller.saveWhitelabelSettings(d,
					function (a) {
						a ? c.saveError() : c.saveSuccess()
					});
				return !1
			}
		});
		this.$().delegate("#verify-forwarding", "click", function () {
			var a = $(this);
			a.html('<i class="fa fa-refresh fa-spin"></i>').attr("disabled", "disabled");
			c.clearSaveMessages();
			c.controller.verifyForwarding(function (d) {
				a.html("Verify").removeAttr("disabled");
				d ? c.saveError("Unable to verify. Please try again.") : c.saveSuccess("Done verifying")
			});
			return !1
		});
		this.$().delegate("#verify-spf", "click", function () {
			var a = $(this);
			a.html('<i class="fa fa-refresh fa-spin"></i>').attr("disabled",
				"disabled");
			c.clearSaveMessages();
			c.controller.verifySPF(function (d) {
				a.html("Verify").removeAttr("disabled");
				d ? c.saveError("Unable to verify. Please try again.") : c.saveSuccess("Done verifying")
			});
			return !1
		});
		this.$().delegate("#verify-dkim", "click", function () {
			var a = $(this);
			a.html('<i class="fa fa-refresh fa-spin"></i>').attr("disabled", "disabled");
			c.clearSaveMessages();
			c.controller.verifyDKIM(function (d) {
				a.html("Verify").removeAttr("disabled");
				d ? c.saveError("Unable to verify. Please try again.") : c.saveSuccess("Done verifying")
			});
			return !1
		});
		this.$().delegate("#edit-address-name", "click", function () {
			$(this).addClass("hidden");
			c.$("#address-name-label").addClass("hidden");
			c.$("#address-name-input").removeClass("hidden");
			c.$("#edit-address-container").removeClass("hidden");
			return !1
		});
		this.$().delegate("#cancel-address-name", "click", function () {
			c.$("#address-name-input").addClass("hidden");
			c.$("#edit-address-container").addClass("hidden");
			c.$("#edit-address-name").removeClass("hidden");
			c.$("#address-name-label").removeClass("hidden");
			return !1
		});
		this.$().delegate("#save-address-name", "click", function () {
			var a = c.$("#address-name").val();
			(a = a.trim()) ? (c.$("#cancel-address-name").attr("disabled", "disabled"), c.$("#save-address-name").attr("disabled", "disabled").html('<i class="fa fa-refresh fa-spin"></i>'), c.clearSaveMessages(), c.controller.saveForwarderName(a, function (a) {
				c.$("#cancel-address-name").removeAttr("disabled");
				c.$("#save-address-name").removeAttr("disabled").html("Save");
				a ? c.saveError("Unable to save name. Please try again.") :
					(c.saveSuccess("Successfully saved name."), c.$("#cancel-address-name").trigger("click"))
			})) : c.saveError("Name should not be empty. Please try again.")
		});
		this.$().delegate("#change-support", "click", function () {
			c.set("forwardingSetup", Tawk.ForwardingSetup.create({
				controller: c.controller,
				closeCallback: c.closeForwardingSetup.bind(c)
			}));
			c.forwardingSetup.append();
			return !1
		});
		this.$().delegate("#remove-support", "click", function () {
			var a = "If you remove <b>" + c.controller.activeAddOn.settings.address.address +
				"</b> users responding to tickets sent from this email, may not be able to answer their ongoing tickets. To contact your support, they will need to start a new ticket.";
			c.clearSaveMessages();
			checkAndSetConfirmView(!1, function (a) {
				a && c.controller.removeForwarder(function (a) {
					a ? c.saveError("Unable to remove forwarder. Please try again.") : c.saveSuccess("Successfully removed forwarder")
				})
			}, a, null, "Remove email forwarding", "I understand, proceed", !0);
			return !1
		})
	},
	closeForwardingSetup: function () {
		this.forwardingSetup &&
		(this.forwardingSetup.remove(), this.set("forwardingSetup", null))
	},
	parsedWidgetFooterTitle: function () {
		var a, c;
		if (this.controller && this.controller.activeAddOn) {
			if (a = this.controller.activeAddOn.settings.widget.label) a = encodeStr(a); else return "";
			(c = a.match(/_[^_]+_/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("_");
				var e = c.lastIndexOf("_");
				b = c.substring(0, b) + "<i>" + c.substring(b + 1, e) + "</i>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			(c = a.match(/\*[^*]+\*/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("*");
				var e = c.lastIndexOf("*");
				b = c.substring(0, b) + '<span style="font-size: 13px; font-weight: 700">' + c.substring(b + 1, e) + "</span>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			return a
		}
	}.property("controller.activeAddOn.settings.widget.label"),
	parsedEmailFooterTitle: function () {
		var a, c;
		if (this.controller && this.controller.activeAddOn) {
			if (a = this.controller.activeAddOn.settings.email.label) a = encodeStr(a); else return "";
			(c = a.match(/_[^_]+_/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("_");
				var e = c.lastIndexOf("_");
				b = c.substring(0, b) + "<i>" + c.substring(b + 1, e) + "</i>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			(c = a.match(/\*[^*]+\*/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("*");
				var e = c.lastIndexOf("*");
				b = c.substring(0, b) + '<span style="font-size: 13px; font-weight: 700">' + c.substring(b + 1, e) + "</span>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			return a
		}
	}.property("controller.activeAddOn.settings.email.label"),
	willDestroyElement: function () {
		this.closeForwardingSetup();
		this.$("#widget-text-color").ColorSelector("destroy")
	},
	saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), $("#content-container").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' + c + '"></i>' + d + "</div>"))
	},
	saveError: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a))
	},
	saveSuccess: function (a) {
		var c = this;
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages",
			"success_update"), this.saveComplete("alert-success", "fa-check", a), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
			c.clearSaveMessages()
		}, 3E3)))
	},
	clearSaveMessages: function () {
		"inDOM" === this._state && (clearTimeout(this.alertTimeout), $(".alert").remove())
	}
});
Tawk.LiveAnswerWizardView = Ember.View.extend({
	template: Ember.TEMPLATES.liveAnswerSettingsWizard,
	elementId: "liveAnswer-wizard-container",
	controller: null,
	submitted: {},
	objectivesChanged: function () {
		var a = this;
		"inDOM" === this._state &&
		this.controller && this.controller.activeAddOn && this.controller.activeAddOn.settings.objectives && this.controller.activeAddOn.settings.objectives.length && this.controller.activeAddOn.settings.objectives.forEach(function (c, d) {
			"predefined" === c.type ? a.$("#" + d + "-objective").val(c.content) : (a.$("#" + d + "-objective").val("other"), a.$("#" + d + "-other").val(c.content), a.$("#" + d + "-other-container").removeClass("hidden"))
		})
	}.observes("controller.objectives"),
	didInsertElement: function () {
		var a = this;
		this._super();
		var c =
			"submitBusinessForm saveOfferingForm saveCultureForm saveFAQForm saveEmergencyForm saveObjectives saveReputationForm".split(" ");
		this.$().bootstrapWizard({
			tabClass: "form-wizard", previousSelector: "#previous", nextSelector: "#next", onTabClick: function () {
				return !1
			}, onTabShow: function (c, b, e) {
				3 <= e ? a.$("#skip").removeClass("hidden") : a.$("#skip").addClass("hidden");
				6 === e ? (a.$("#done").removeClass("hidden"), a.$("#next").addClass("hidden")) : (a.$("#done").addClass("hidden"), a.$("#next").removeClass("hidden"));
				a.set("submitted." + e, !1)
			}, onNext: function (d, b, e) {
				var f = e - 1;
				d = $(d).find(".change-tab").attr("href");
				a.clearSaveMessages();
				if (!a.submitted[f]) {
					if ($(d).find(".smart-form").valid()) a[c[f]](function (b) {
						b ? (a.set("submitted." + f, !1), a.saveError()) : (a.set("submitted." + f, !0), a.bootstrapWizard.show(e))
					});
					return !1
				}
			}, onLast: function (d, b, e) {
				b = e - 1;
				d = $(d).find(".change-tab").attr("href");
				a.clearSaveMessages();
				if (!a.submitted[b]) {
					if ($(d).find(".smart-form").valid()) a[c[b]](function (b) {
						b ? (a.set("submitted." + e, !1),
							a.saveError()) : (a.set("submitted." + e, !0), a.bootstrapWizard.show(e))
					});
					return !1
				}
			}
		});
		this.set("bootstrapWizard", this.$().data("bootstrapWizard"));
		this.$().delegate("#skip", "click", function () {
			6 === a.bootstrapWizard.currentIndex() ? $("#close-view").trigger("click") : (a.set("submitted." + a.bootstrapWizard.currentIndex(), !0), a.bootstrapWizard.next())
		});
		this.$().delegate("#done", "click", function () {
			a.$("#liveAnswer-reputation").valid() && a.saveReputationForm(function (c) {
				c ? a.saveError() : $("#close-view").trigger("click")
			})
		});
		this.$("#liveAnswer-business").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-offering").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-culture").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-faq").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-emergency").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-objective").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$("#liveAnswer-reputation").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function () {
				return !1
			}
		});
		this.$().delegate(".add-faq-question", "click", function () {
			a.controller.addFAQQuestion()
		});
		this.$().delegate(".remove-faq",
			"click", function () {
				var c = $(this).attr("data-id");
				a.controller.removeFAQQuestion(c)
			});
		this.$().delegate(".add-contact", "click", function () {
			a.controller.addEmergencyContact()
		});
		this.$().delegate(".remove-contact", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.removeEmergencyContact(c)
		});
		this.$().delegate(".add-reputation-question", "click", function () {
			a.controller.addReputationQuestion()
		});
		this.$().delegate(".remove-reputation", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.removeReputationQuestion(c)
		});
		this.$().delegate(".objective-select", "change", function () {
			var c = $(this).attr("id"), b = $(this).val(), c = c.replace("-objective", "-other-container");
			"other" === b ? a.$("#" + c).removeClass("hidden") : a.$("#" + c).addClass("hidden")
		});
		this.objectivesChanged()
	},
	saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), $("#content-container").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' + c + '"></i>' + d + "</div>"))
	},
	saveError: function (a) {
		"inDOM" ===
		this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a))
	},
	saveSuccess: function (a) {
		var c = this;
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
			c.clearSaveMessages()
		}, 3E3)))
	},
	clearSaveMessages: function () {
		"inDOM" === this._state && (clearTimeout(this.alertTimeout),
			$(".alert").remove())
	},
	submitBusinessForm: function (a) {
		var c = {
			business: {
				name: this.$("#business-name").val(),
				address: this.$("#business-address").val(),
				url: this.$("#business-website").val(),
				twitter: this.$("#business-twitter").val(),
				fb: this.$("#business-facebook").val(),
				phone: this.$("#business-number").val(),
				email: this.$("#business-email").val(),
				contactPerson: {
					name: this.$("#business-contact-name").val(),
					phone: this.$("#business-contact-number").val(),
					email: this.$("#business-contact-email").val()
				}
			}
		};
		this.controller.saveHiredAgentContent(c,
			a)
	},
	saveOfferingForm: function (a) {
		var c = {offering: this.$("#offering").val()};
		this.controller.saveHiredAgentContent(c, a)
	},
	saveCultureForm: function (a) {
		var c = {culture: this.$("#culture").val()};
		this.controller.saveHiredAgentContent(c, a)
	},
	saveFAQForm: function (a) {
		var c = {faqs: []};
		this.$(".faq-data").each(function () {
			var a = $(this).find(".question").val(), b = $(this).find(".answer").val();
			a && b && c.faqs.push({q: a, a: b})
		});
		if (0 === c.faqs.length) return a(!0);
		this.controller.saveHiredAgentContent(c, a)
	},
	saveEmergencyForm: function (a) {
		var c =
			{emergency: []};
		this.$(".emergency-data").each(function () {
			var a = $(this).find(".contact-name").val(), b = $(this).find(".contact-title").val(),
				e = $(this).find(".contact-number").val(), f = $(this).find(".contact-email").val();
			a && f && c.emergency.push({name: a, title: b, phone: e, email: f})
		});
		if (0 === c.emergency.length) return a(!0);
		this.controller.saveHiredAgentContent(c, a)
	},
	saveObjectives: function (a) {
		var c = this, d = {objectives: []};
		this.$(".objective-select").each(function () {
			var a, e;
			e = $(this).attr("id");
			var f = $(this).val();
			e = e.replace("-objective", "-other");
			"other" === f ? (a = "other", e = c.$("#" + e).val()) : (a = "predefined", e = f);
			a && e && d.objectives.push({type: a, content: e})
		});
		if (0 === d.objectives.length) return a(!0);
		this.controller.saveHiredAgentContent(d, a)
	},
	saveReputationForm: function (a) {
		var c = {reputation: []};
		this.$(".reputation-data").each(function () {
			var a = $(this).find(".question").val(), b = $(this).find(".answer").val();
			a && b && c.reputation.push({q: a, a: b})
		});
		if (0 === c.reputation.length) return a(!0);
		this.controller.saveHiredAgentContent(c,
			a)
	}
});
Tawk.LiveAnswerSchedulerView = Ember.View.extend({
	template: Ember.TEMPLATES.liveAnswerScheduler,
	elementId: "liveAnswer-scheduler-container",
	controller: null,
	schedule: [],
	hasRemanining: !0,
	scheduler: [],
	willInsertElement: function () {
		this.schedule.clear()
	},
	willDestroyElement: function () {
		this.schedule.clear()
	},
	didInsertElement: function () {
		var a = this;
		this.$().delegate("#schedule-city", "keyup", function () {
			var c = $(this).val().trim();
			socketConnector.getCities(c, "", function (c, b) {
				var e = [], f = JSON.parse(b);
				!c && f.predictions.length &&
				(f.predictions.forEach(function (a, b) {
					e.push({name: a.description, index: b, placeId: a.place_id})
				}), a.set("cityList", e), a.$("#schedule-city-list").removeClass("select2-display-none"))
			})
		});
		this.$().delegate(".city-select", "click", function () {
			var c = $(this).attr("data-id"), c = a.cityList[c];
			a.controller.activeAddOn.settings.set("city", c.name);
			a.controller.activeAddOn.settings.set("placeId", c.placeId);
			a.$("#schedule-city-list").addClass("select2-display-none")
		});
		this.$().on("click", function () {
			"inDOM" === a._state &&
			a.$("#schedule-city-list").addClass("select2-display-none")
		});
		this.setScheduler();
		this.$().delegate(".day-on", "change", function () {
			var c = $(this).is(":checked"), d = $(this).attr("id");
			if (d = a.schedule.findProperty("id", d)) d.set("isOn", c), 0 === d.time.length ? a.addTimeForDay(d) : a.recalculateAvailableHours()
		});
		this.$().delegate(".add-time", "click", function () {
			var c = $(this).attr("data-id"), c = a.schedule.findProperty("id", c);
			a.addTimeForDay(c);
			if (0 !== a.controller.activeAddOn.settings.availableHours) return !1
		});
		this.$().delegate(".remove-schedule", "click", function () {
			var c;
			c = $(this).attr("data-id");
			var d = $(this).attr("data-parent");
			(d = a.schedule.findProperty("id", d)) && (c = d.time.findProperty("id", c)) && c.canDelete && (d.time.removeObject(c), a.recalculateAvailableHours());
			return !1
		});
		this.$("#liveAnswer-scheduler-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				a.clearSaveMessages();
				if (a.hasRemanining) return a.schedule.forEach(function (a) {
					a.isOn || a.time.clear()
				}),
					a.controller.saveLiveAnsweringSettings(a.schedule, function (c) {
						c ? c.message ? a.saveError("hours" === c.message ? "You are trying to schedule more than the purchased hours, please change the schedule and try again" : "") : a.saveError() : (a.saveSuccess("Setup was successful."), a.setScheduler())
					}), !1;
				a.saveError("You are trying to schedule more than the purchased hours, please change the schedule and try again")
			}
		})
	},
	setScheduler: function () {
		var a = this, c = this.controller.activeAddOn.settings.scheduler;
		this.schedule.clear();
		if (c) {
			for (var d = 0; d < c.length; d++) {
				for (var b = c[d], e = Ember.Object.create({
					id: "d-" + b.day,
					label: moment().locale("en").weekday(b.day).format("dddd"),
					isOn: 0 !== b.time.length,
					time: [],
					day: b.day
				}), f = 0; f < b.time.length; f++) {
					var g, h;
					time = b.time[f];
					g = 0 === time.start && 0 !== time.end ? moment().startOf("day") : 0 === time.start && 0 === time.end ? moment.duration(540) : moment.duration(time.start, "minutes");
					h = 1440 === time.end ? moment().add(1, "days").startOf("day") : 0 !== time.end ? moment.duration(time.end, "minutes") : moment.duration(1080,
						"minutes");
					g = Ember.Object.create({
						id: d + "_" + f,
						rangeId: "range_" + d + "_" + f,
						labelId: "label_" + d + "_" + f,
						startTime: time.start,
						endTime: time.end,
						from: moment().locale("en").hours(g.hours()).minutes(g.minutes()).format("X"),
						to: moment().locale("en").hours(h.hours()).minutes(h.minutes()).format("X"),
						isOn: !(0 === time.start && 0 === time.end),
						canDelete: 0 < e.time.length
					});
					e.time.pushObject(g)
				}
				a.schedule.pushObject(e)
			}
			setTimeout(function () {
				a.recalculateAvailableHours();
				a.setSlider()
			})
		}
	},
	addTimeForDay: function (a) {
		var c, d, b =
			this, e = a.day + "_" + a.time.length, f = {
			type: "double",
			min: moment().locale("en").startOf("day").format("X"),
			max: moment().locale("en").add(1, "days").startOf("day").format("X"),
			step: 900,
			grid_snap: !0,
			prettify_enabled: !0,
			decorate_both: !1,
			values_separator: " - ",
			prettify: function (a) {
				return moment(a, "X").format("h:mm A")
			},
			onFinish: function (c) {
				var d = $(c.input).attr("id").replace("range_", "").split("_");
				a = b.schedule.objectAt(d[0]);
				g = a.time.objectAt(d[1]);
				fromData = moment(c.from, "X");
				toData = moment(c.to, "X");
				g.set("from",
					moment().locale("en").hours(fromData.hours()).minutes(fromData.minutes()).format("X"));
				g.set("to", moment().locale("en").hours(toData.hours()).minutes(toData.minutes()).format("X"));
				g.set("startTime", 60 * fromData.hours() + fromData.minutes());
				g.set("endTime", 0 === toData.hours() ? 1440 : 60 * toData.hours() + toData.minutes());
				b.recalculateAvailableHours()
			}
		}, g = Ember.Object.create({
			id: e,
			rangeId: "range_" + e,
			labelId: "label_" + e,
			from: moment().locale("en").hours(9).minutes(0).format("X"),
			to: moment().locale("en").hours(17).minutes(0).format("X"),
			startTime: 540,
			endTime: 1020,
			canDelete: 0 < a.time.length
		});
		a.time.pushObject(g);
		setTimeout(function () {
			d = b.$("#" + g.rangeId);
			f.from = g.from;
			"0:00" === moment(g.to, "X").locale("en").format("H:mm") && (g.to = parseInt(g.to, 10) + 86400);
			f.to = g.to;
			d.ionRangeSlider(f);
			c = d.data("ionRangeSlider");
			b.controller.activeAddOn.settings.enabled ? c.update({disable: !1}) : c.update({disable: !0});
			a.isOn ? d.parent().removeClass("hidden") : d.parent().next().removeClass("hidden");
			b.recalculateAvailableHours()
		})
	},
	recalculateAvailableHours: function () {
		var a,
			c, d = 0;
		a = 60 * this.controller.activeAddOn.settings.entitlements.hours;
		this.schedule.forEach(function (a) {
			var c, f, g;
			if (a.isOn && a.time.length) {
				g = a.time.slice(0, a.time.length).sort(function (a, b) {
					return a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0
				});
				c = g[0];
				a = c.startTime;
				c = c.endTime;
				for (var h = 1; h < g.length; h++) f = g[h], f.startTime <= c ? c = Math.max(f.endTime, c) : d += f.endTime - f.startTime;
				d += c - a
			}
		});
		a -= d;
		0 > a ? this.set("hasRemanining", !1) : this.set("hasRemanining", !0);
		a = moment.duration(a, "minutes");
		c = a.days() ?
			24 * a.days() + a.hours() : a.hours();
		this.controller.activeAddOn.settings.set("availableEntitlement", {hours: c, minutes: a.minutes()})
	},
	saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), $("#content-container").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' + c + '"></i>' + d + "</div>"))
	},
	saveError: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger",
			"fa-ban", a))
	},
	saveSuccess: function (a) {
		var c = this;
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
			c.clearSaveMessages()
		}, 3E3)))
	},
	clearSaveMessages: function () {
		"inDOM" === this._state && (clearTimeout(this.alertTimeout), $(".alert").remove(), this.$(".error").addClass("hidden"))
	},
	setSlider: function () {
		var a = this, c = {
			type: "double",
			min: moment().locale("en").startOf("day").format("X"),
			max: moment().locale("en").add(1, "days").startOf("day").format("X"),
			step: 900,
			grid_snap: !0,
			prettify_enabled: !0,
			decorate_both: !1,
			values_separator: " - ",
			prettify: function (a) {
				return moment(a, "X").format("h:mm A")
			},
			onFinish: function (c) {
				var b = $(c.input).attr("id").replace("range_", "").split("_");
				schedule = a.schedule.objectAt(b[0]);
				time = schedule.time.objectAt(b[1]);
				fromData = moment(c.from, "X");
				toData = moment(c.to, "X");
				time.set("from", moment().locale("en").hours(fromData.hours()).minutes(fromData.minutes()).format("X"));
				time.set("to", moment().locale("en").hours(toData.hours()).minutes(toData.minutes()).format("X"));
				time.set("startTime", 60 * fromData.hours() + fromData.minutes());
				time.set("endTime", 0 === toData.hours() ? 1440 : 60 * toData.hours() + toData.minutes());
				a.recalculateAvailableHours()
			}
		};
		this.schedule.forEach(function (d) {
			d.time.forEach(function (b) {
				var d, f = a.$("#" + b.rangeId);
				c.from = b.from;
				"0:00" === moment(b.to, "X").locale("en").format("H:mm") && (b.to = parseInt(b.to, 10) + 86400);
				c.to = b.to;
				f.ionRangeSlider(c);
				d = f.data("ionRangeSlider");
				a.controller.activeAddOn.settings.enabled ? d.update({disable: !1}) : d.update({disable: !0});
				b.isOn ? f.parent().removeClass("hidden") : f.parent().next().removeClass("hidden")
			})
		})
	}
});
Tawk.LiveAnswerSettingsView = Ember.View.extend({
	template: Ember.TEMPLATES.liveAnswerSettings,
	elementId: "addon-settings-container",
	controller: null,
	"class": "subview",
	subView: null,
	didInsertElement: function () {
		var a = this, c, d = $("body")[0], b = Tawk.routing.getPath();
		this.$().delegate(".open-wizard", "click", function () {
			var b = Tawk.LiveAnswerWizardView.create({controller: a.controller});
			a.$("#main-view").addClass("hidden");
			b.appendTo(a.$("#subview"));
			a.$("#subview").removeClass("hidden");
			a.set("subView", b);
			$("body").unbind("keydown.closeView");
			$("#close-view").off("click", this.originalClickCloseFunc);
			a.setClickCloseView();
			Tawk.routing.changeRoute({
				view: "admin",
				propertyId: a.controller.activeProperty.id,
				subView: "addon-store",
				itemId: "live-answering-settings",
				subSettings: "wizard"
			})
		});
		this.$().delegate("#set-scheduler", "click", function () {
			var b = Tawk.LiveAnswerSchedulerView.create({controller: a.controller});
			a.$("#main-view").addClass("hidden");
			b.appendTo(a.$("#subview"));
			a.$("#subview").removeClass("hidden");
			a.set("subView", b);
			$("body").unbind("keydown.closeView");
			$("#close-view").off("click", this.originalClickCloseFunc);
			a.setClickCloseView();
			Tawk.routing.changeRoute({
				view: "admin",
				propertyId: a.controller.activeProperty.id,
				subView: "addon-store",
				itemId: "live-answering-settings",
				subSettings: "scheduler"
			})
		});
		this.$().delegate("#addon-status", "change", function () {
			a.controller.activeAddOn.settings.set("enabled",
				$(this).is(":checked"));
			a.controller.saveLiveAnsweringSettings(null, function (a) {
			})
		});
		this.$().delegate(".open-knowledgebase", "click", function () {
			a.controller.closeItem();
			$("#knowledgebase.open-view").trigger("click")
		});
		this.$().delegate(".open-alert", "click", function () {
			a.controller.closeItem();
			$("#alerts.open-view").trigger("click")
		});
		this.$().delegate(".open-shortcuts", "click", function () {
			a.controller.closeItem();
			$("#shortcuts.open-view").trigger("click")
		});
		($.hasData(d) && $._data(d)).events.keydown.every(function (b) {
			return "closeView" ===
			b.namespace ? (c = b.handler, a.set("originalCloseFunc", c), !1) : !0
		});
		$("body").bind("keydown.subviewCloseView", function (b) {
			if (27 === b.keyCode) return b.stopPropagation(), a.subView && a.closeSubView(), !1
		});
		($.hasData($("#close-view")[0]) && $._data($("#close-view")[0])).events.click.every(function (b) {
			a.set("originalClickCloseFunc", b.handler);
			return !1
		});
		b.subSettings && "wizard" === b.subSettings && this.$(".open-wizard").click();
		b.subSettings && "scheduler" === b.subSettings && this.$("#set-scheduler").click()
	},
	setClickCloseView: function () {
		var a =
			this;
		$("#close-view").on("click", function (c) {
			if (null !== a.subView) return c.stopPropagation(), a.closeSubView(), !1
		})
	},
	closeSubView: function () {
		this.subView.remove();
		this.$(".alert").remove();
		this.set("subView", null);
		this.$("#main-view").removeClass("hidden");
		Tawk.routing.changeRoute({
			view: "admin",
			propertyId: this.controller.activeProperty.id,
			subView: "addon-store",
			itemId: "live-answering-settings",
			subSettings: null
		});
		this.originalCloseFunc && "function" === typeof this.originalCloseFunc && $("body").bind("keydown.closeView",
			this.originalCloseFunc);
		if (this.originalClickCloseFunc && "function" === typeof this.originalClickCloseFunc) $("#close-view").on("click", this.originalClickCloseFunc)
	},
	willDestroyElement: function () {
		null !== this.subView && (this.subView.remove(), this.set("subView", null))
	}
});
Tawk.WebRTCView = Ember.View.extend({
	template: Ember.TEMPLATES.webrtcSettings, elementId: "addon-settings-container", didInsertElement: function () {
		var a, c = this, d = $("body")[0];
		($.hasData(d) && $._data(d)).events.keydown.every(function (b) {
			return "closeView" ===
			b.namespace ? (a = b.handler, c.set("originalCloseFunc", a), !1) : !0
		});
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (b) {
			if (27 === b.keyCode) return b.stopPropagation(), c.forwardingSetup ? c.closeForwardingSetup() : (c.controller.closeItem(), Tawk.routing.titlePath.itemName = null, Tawk.routing.setTitle(), Tawk.routing.changeRoute(c.controller.lastViews), $("body").bind("keydown.closeView", a)), !1
		});
		this.$("#addon-status").change(function () {
			$(this).is(":checked") ? (c.$(".allowed-actions-container").removeClass("disabled"),
				c.$("#video-call").removeAttr("disabled"), c.$("#screen-share").removeAttr("disabled")) : (c.$(".allowed-actions-container").addClass("disabled"), c.$("#video-call").attr("disabled", "disabled"), c.$("#screen-share").attr("disabled", "disabled"))
		});
		this.$("#addon-settings-form").validate({
			errorPlacement: function (a, c) {
				a.insertAfter(c.parent())
			}, submitHandler: function (a) {
				a = {
					enabled: c.$("#addon-status").is(":checked"),
					video: c.$("#video-call").is(":checked"),
					screen: c.$("#screen-share").is(":checked")
				};
				c.controller.saveWebRTCSettings(a,
					function (a) {
						a ? c.saveError() : c.saveSuccess()
					});
				return !1
			}
		})
	}, saveComplete: function (a, c, d) {
		"inDOM" === this._state && (this.clearSaveMessages(), $("#content-container").append('<div class="alert ' + a + ' fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa ' + c + '"></i>' + d + "</div>"))
	}, saveError: function (a) {
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "error_save"), this.saveComplete("alert-danger", "fa-ban", a))
	}, saveSuccess: function (a) {
		var c = this;
		"inDOM" === this._state && (a = a || languageParser.translate("form_validation_messages", "success_update"), this.saveComplete("alert-success", "fa-check", a), clearTimeout(this.alertTimeout), this.set("alertTimeout", setTimeout(function () {
			c.clearSaveMessages()
		}, 3E3)))
	}, clearSaveMessages: function () {
		"inDOM" === this._state && (clearTimeout(this.alertTimeout), $(".alert").remove())
	}
});
Tawk.AddOnSettingsView = Ember.ContainerView.extend({
	classNames: ["settings-container-view"], currentView: null, willInsertElement: function () {
		"whitelabel" ===
		this.controller.activeAddOn.id ? this.set("currentView", Tawk.WhitelabelSettingsView.create({controller: this.controller})) : "live-answering" === this.controller.activeAddOn.id ? this.set("currentView", Tawk.LiveAnswerSettingsView.create({controller: this.controller})) : "webrtc" === this.controller.activeAddOn.id && this.set("currentView", Tawk.WebRTCView.create({controller: this.controller}))
	}
});
Ember.Handlebars.helper("AddOnSettingsView", Tawk.AddOnSettingsView);
Tawk.ForwardingSetup = Ember.View.extend(Tawk.ModalViewBase,
	{
		template: Ember.TEMPLATES.forwardingSetup,
		elementId: "forwarding-setup",
		classNames: ["modal"],
		controller: null,
		tabindex: null,
		didInsertElement: function () {
			var a = this;
			this._super();
			this.$().bootstrapWizard({
				tabClass: "form-wizard", previousSelector: "#previous", onTabShow: function (c, d, b) {
					a.$("#next").addClass("hidden");
					a.$("#previous").addClass("hidden");
					a.$("#verify").addClass("hidden");
					a.$("#done").addClass("hidden").attr("disabled", "disabled");
					a.$("#start-over").addClass("hidden");
					a.$("#cancel").removeClass("hidden");
					if (0 === b) a.$("#next").removeClass("hidden"); else if (1 === b) if (a.$("#support-email").valid()) a.$("#finished-check").is(":checked") ? a.$("#verify").removeAttr("disabled") : a.$("#verify").attr("disabled", "disabled"), a.$("#verify").removeClass("hidden"), a.$("#previous").removeClass("hidden"); else return a.bootstrapWizard.previous(); else if (2 === b) {
						var e = a.$("#support-email").val();
						a.$("#done").removeClass("hidden");
						a.controller.setupForwarding(e, function (b) {
							b ? a.verificationFailed() : a.verificationSuccess(e)
						})
					}
					c.prev() &&
					(c.prev().addClass("complete").find(".step.done").html('<i class="fa fa-check"></i>').removeClass("hidden"), c.prev().find(".step.pending").addClass("hidden"));
					a.resizeView()
				}
			});
			this.set("bootstrapWizard", this.$().data("bootstrapWizard"));
			this.$(".change-tab").click(function (a) {
				a.stopPropagation();
				return !1
			});
			this.$().on("hidden.bs.modal", function () {
				"function" === typeof a.closeCallback && a.closeCallback()
			});
			this.$(".next-step").click(function () {
				a.bootstrapWizard.next()
			});
			this.$("#start-over").click(function () {
				a.setupRestart()
			});
			this.$("#finished-check").change(function () {
				$(this).is(":checked") ? a.$("#verify").removeAttr("disabled") : a.$("#verify").attr("disabled", "disabled")
			});
			this.$("#support-email-form").validate({
				errorPlacement: function (a, d) {
					a.insertAfter(d.parent())
				}, submitHandler: function (a) {
					return !1
				}
			})
		},
		verificationFailed: function () {
			"inDOM" === this._state && (this.$("#fail").removeClass("hidden"), this.$("#verifying").addClass("hidden"), this.$("#cancel").removeClass("hidden"), this.$(".btn").addClass("hidden"), this.$("#start-over").removeClass("hidden"),
				$('li[data-target="#step3"').addClass("fail").find(".step.done").html('<i class="fa fa-times"></i>').removeClass("hidden"), $('li[data-target="#step3"').addClass("fail").find(".step.pending").addClass("hidden"))
		},
		verificationSuccess: function (a) {
			"inDOM" === this._state && (a = languageParser.translate("admin", "forwarder_success", {
				strongStart: "<b>",
				strongEnd: "</b>",
				email: a
			}), this.$("#success").find("#success-message").html(a), this.$("#success").removeClass("hidden"), this.$("#verifying").addClass("hidden"),
				this.$("#cancel").removeClass("hidden"), this.$(".btn").addClass("hidden"), this.$("#done").removeClass("hidden").removeAttr("disabled"), $('li[data-target="#step3"').addClass("complete").find(".step.done").html('<i class="fa fa-check"></i>').removeClass("hidden"), $('li[data-target="#step3"').addClass("complete").find(".step.pending").addClass("hidden"))
		},
		setupRestart: function () {
			this.$(".bootstrapWizard li").removeClass("complete fail active");
			this.$(".bootstrapWizard .step.done").addClass("hidden");
			this.$(".bootstrapWizard .step.pending").removeClass("hidden");
			this.$("#finished-check").prop("checked", !1);
			this.$("#verifying").removeClass("hidden");
			this.$("#fail").addClass("hidden");
			this.bootstrapWizard.first()
		}
	});
Tawk.AddOnStoreView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.addOnStore,
	elementId: "property-add-on-store",
	controller: null,
	subViewId: "addon-store",
	scriptTag: null,
	willInsertElement: function () {
		var a, c = !1;
		$("iframe").each(function () {
			var a = $(this).attr("name");
			a && -1 !==
			a.indexOf("stripe") && (c = !0)
		});
		c || (a = document.createElement("script"), a.src = "https://js.stripe.com/v2/", $("body").append(a))
	},
	didInsertElement: function () {
		var a = this, c = Tawk.routing.getPath();
		this._super();
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (c) {
			if (27 === c.keyCode) return c.stopPropagation(), a.controller.closeView() ? (a.controller.saveLastSubView({subView: null}), $("#admin-select").click()) : Tawk.routing.changeRoute({
				subView: "addon-store", itemId: null, view: "admin",
				propertyId: a.controller.activeProperty.id
			}), !1
		});
		$("#close-view").unbind("click.closeView");
		$("#close-view").on("click", function (c) {
			c.stopPropagation();
			a.controller.closeView() ? (a.controller.saveLastSubView({subView: null}), $("#admin-select").click()) : Tawk.routing.changeRoute({
				subView: "addon-store",
				itemId: null,
				view: "admin",
				propertyId: a.controller.activeProperty.id
			});
			return !1
		});
		(c.itemId && -1 !== c.itemId.indexOf("-settings") || this.controller.lastViews.viewType && "settings" === this.controller.lastViews.viewType &&
			this.controller.activeAddOn && this.controller.activeAddOn.id) && this.set("showAddonSettings", !0);
		this.$().delegate(".selection-container", "click", function () {
			var c = $(this).attr("id");
			$(this).hasClass("disabled") || (a.controller.openItem(c), Tawk.routing.changeRoute({
				view: "admin",
				propertyId: a.controller.activeProperty.id,
				subView: a.subViewId,
				itemId: c
			}))
		});
		this.$().delegate(".addon-settings", "click", function (c) {
			var b = $(this).attr("data-id");
			c.stopPropagation();
			a.controller.activeProperty.isAdmin ? (Tawk.routing.changeRoute({
				view: "admin",
				propertyId: a.controller.activeProperty.id, subView: a.subViewId, itemId: b + "-settings"
			}), a.controller.saveLastSubView({viewType: "settings"}), a.set("showAddonSettings", !0), a.controller.openSettings(b)) : a.controller.openItem(b)
		})
	},
	activeAddChanged: function () {
		"inDOM" === this._state && this.controller && !this.controller.activeAddOn && (this.controller.saveLastSubView({viewType: null}), this.set("showAddonSettings", !1))
	}.observes("controller.activeAddOn")
});
Tawk.BillingView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.billingMain,
	elementId: "property-billing",
	controller: null,
	subViewId: "billing",
	scriptTag: null,
	willInsertElement: function () {
		var a, c = !1;
		$("iframe").each(function () {
			var a = $(this).attr("name");
			a && -1 !== a.indexOf("stripe") && (c = !0)
		});
		c || (a = document.createElement("script"), a.src = "https://js.stripe.com/v2/", $("body").append(a))
	},
	didInsertElement: function () {
		var a = this;
		this._super();
		$.validator.messages.ccExpiryFormat = $.validator.format("The format should be MM/YY");
		$.validator.messages.ccExpiryDate = $.validator.format("Invalid expiry date.");
		$.validator.messages.ccNumber = $.validator.messages.creditcard;
		$.validator.messages.cvcCheck = $.validator.format("Invalid cvc number.");
		this.$().delegate(".renew-subscription", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.getAddOnPlans(c, function () {
			})
		});
		this.$().delegate(".change-payment-method, .renew-subscription", "click", function () {
			var c, d = $(this).attr("data-id");
			$(this).addClass("hidden");
			$(this).parents(".billing-list-container").find(".payment-details").removeClass("hidden");
			d &&
			(c = a.$().find('.change-payment-form[data-id="' + d + '"]'), c.length && (c.find("#card-number").mask("9999 9999 9999? 9999 9999", {placeholder: " "}), c.find("#card-expiry").mask("99/99", {
				placeholder: " ",
				completed: function () {
					c.find("#card-cvc").focus()
				}
			}), c.find("#card-cvc").mask("999?9", {placeholder: " "}), c.find("#card-number").on("keyup", function () {
				var a, d;
				d = c.find(".card-type");
				window.Stripe && (a = Stripe.card.cardType($(this).val())) && (a = a.replace(" ", "").toLowerCase(), d.hasClass(a) || d.removeClass().addClass("icon-append card-type " +
					a))
			}), c.validate({
				onkeyup: !1, onfocusout: !1, onclick: !1, errorPlacement: function (a, c) {
					a.insertAfter(c.parent())
				}, submitHandler: function () {
					var b = {}, d = $(c).parents(".billing-list-container"), f = d.find(".payment-method").val();
					if (a.paymentProcessing) return !1;
					a.set("paymentProcessing", !0);
					c.find(".submit-payment-change").attr("disabled", "disabled").html('<i class="fa fa-refresh fa-spin"></i>');
					a.clearSaveMessages();
					b.subscriptionId = c.attr("data-id");
					$(c).find(".plan").length && (b.planId = $(c).find(".plan").val());
					f || (!desktopConnector.enabled() || desktopConnector.canUsePaypal()) || (f = "cc");
					"cc" === f && (c.find(".card-selection").length ? b.customerId = c.find(".card-selection").val() : b.customerId = "new-card", $(c).serializeArray().map(function (a) {
						b[a.name] = a.value
					}));
					a.controller.changePaymentMethod(f, b, function (b, f, k) {
						b ? (a.saveError(f), k && setTimeout(function () {
							c.find(".card-selection").val(k)
						}, 0)) : (a.set("paymentSuccess", !0), d.find(".change-payment-method").removeClass("hidden"), d.find(".payment-details").addClass("hidden"));
						c.find(".submit-payment-change").removeAttr("disabled").html("Save");
						a.set("paymentProcessing", !1)
					});
					return !1
				}
			})))
		});
		this.$().delegate("#addon-store", "click", function () {
			a.closeView();
			$("#admin-main-view #addon-store").trigger("click")
		});
		this.$().delegate(".cancel-subscription", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.cancelSubscription(c, function (c) {
				c ? a.saveError("Unable to cancel your subscription") : a.saveSuccess("Successfully canceled your subscription.")
			})
		});
		this.$().delegate(".toggle-email-receipts",
			"change", function () {
				var c = $(this).is(":checked"), d = $(this).attr("id");
				(d = a.controller.subscriptionList.findProperty("id", d)) && d.set("billingEmailEnabled", c)
			});
		this.$().delegate(".select-email", "change", function () {
			var a = $(this).val();
			"default-email" === a || "billing-admin" === a ? $(this).parent().next(".custom-email-field").addClass("hidden") : ($(this).parent().next(".custom-email-field").removeClass("hidden"), $(this).parent().next(".custom-email-field").find(".input-text").focus())
		});
		this.$().delegate(".payment-method",
			"change", function () {
				var a = $(this).val(), d = $(this).parents(".billing-list-container");
				"cc" === a ? d.find(".card-details").removeClass("hidden") : d.find(".card-details").addClass("hidden")
			});
		this.$().delegate(".card-selection", "change", function () {
			var a = $(this).val(), d = $(this).parents(".billing-list-container");
			"new-card" === a ? d.find(".new-card-details").removeClass("hidden") : d.find(".new-card-details").addClass("hidden")
		});
		this.$().delegate(".cancel-payment-change", "click", function () {
			var a = $(this).parents(".billing-list-container");
			a.find(".renew-subscription").length ? a.find(".renew-subscription").removeClass("hidden") : a.find(".change-payment-method").removeClass("hidden");
			a.find(".payment-details").addClass("hidden");
			return !1
		});
		this.$().delegate(".receipt-email", "submit", function () {
			var c = {}, d = $(this).find(".toggle-email-receipts").is(":checked"),
				b = $(this).find(".subscription-id").val(), e = $(this).find(".email"), f = e.val(),
				g = "custom-email" === $(this).find(".select-email").val();
			a.clearSaveMessages();
			e.removeClass("required");
			e.parent().removeClass("state-success state-error");
			e.parent().prev().removeClass("state-success state-error");
			if (d) {
				if (c.billingEmailEnabled = 1, g) if (e.addClass("required"), e.valid()) c.billingEmailAddress = f, e.parent().addClass("state-success"), e.parent().prev().addClass("state-success"); else return e.parent().addClass("state-error"), e.parent().prev().addClass("state-error"), !1
			} else c.billingEmailEnabled = 0;
			a.controller.updateEmailSettings(b, c, function (b) {
				b ? a.saveError() : a.saveSuccess()
			});
			return !1
		});
		this.$().delegate(".change-billing-address", "click",
			function () {
				$(this).addClass("hidden");
				$(this).parents(".billing-list-container").find(".change-billing-address-form").removeClass("hidden");
				$(this).parents(".billing-list-container").find(".address").addClass("hidden")
			});
		this.$().delegate(".cancel-change-billing-address", "click", function () {
			$(".change-billing-address").removeClass("hidden");
			$(this).parents(".billing-list-container").find(".change-billing-address-form").addClass("hidden");
			$(this).parents(".billing-list-container").find(".address").removeClass("hidden");
			return !1
		});
		this.$().delegate(".change-billing-address-form", "submit", function () {
			var c = $(this).find(".billing-address").val(), d = $(this).attr("data-id");
			a.controller.updateBillingAddress(d, {billingAddress: c}, function (b) {
				b ? a.saveError() : (a.saveSuccess(), a.$(".cancel-change-billing-address").trigger("click"))
			});
			return !1
		})
	}
});
var tabsViewCol = [];
Tawk.TabIntegrationSettings = Ember.View.extend(Tawk.ModalViewBase, {
	template: Ember.TEMPLATES.tabsIntegrationSettings, didInsertElement: function () {
		var a = this;
		this.formatEditFields();
		this._super();
		this.initSortable();
		this.$("#close-settings").click(function () {
			"function" === typeof a.closeCallback && a.closeCallback()
		});
		this.$().delegate(".expand-list", "click", function () {
			var c = $(this).attr("data-id");
			(parent = $(this).parents("#" + c)) && parent.find(".inner-list").first().show();
			$(this).addClass("collapse-list").removeClass("expand-list");
			$(this).html('<i class="fa fa-lg fa-chevron-circle-up"></i>');
			a.resizeView()
		});
		this.$().delegate(".collapse-list", "click", function () {
			var c = $(this).attr("data-id");
			(parent = $(this).parents("#" + c)) && parent.find(".inner-list").first().hide();
			$(this).addClass("expand-list").removeClass("collapse-list");
			$(this).html('<i class="fa fa-lg fa-chevron-circle-down"></i>');
			a.resizeView()
		});
		this.$().delegate("#save-settings", "click", function () {
			var c = {};
			c.customer = a.content.customerSettings;
			c.order = a.content.orderSettings;
			Tawk.webProperties.saveShopifyConfig(a.controller.activeProperty.id, c, function (c) {
				c ? a.saveError() : a.saveSuccess()
			})
		});
		this.$().delegate(".customer-select",
			"change", function () {
				var c = $(this).is(":checked");
				a.content.customerSettings.enabled = c;
				a.customerSettings.set("enabled", c);
				a.initSortable()
			});
		this.$().delegate(".order-select", "change", function () {
			var c = $(this).is(":checked");
			a.content.orderSettings.enabled = c;
			a.orderSettings.set("enabled", c);
			a.initSortable()
		})
	}, formatEditFields: function () {
		var a = this;
		this.set("customerSettings", Ember.Object.create({fields: []}));
		this.set("orderSettings", Ember.Object.create({fields: []}));
		this.content.customerSettings.fields.forEach(function (c) {
			a.customerSettings.fields.pushObject(c)
		});
		this.content.orderSettings.fields.forEach(function (c) {
			a.orderSettings.fields.pushObject(c)
		});
		this.customerSettings.set("header", this.content.customerSettings.header);
		this.customerSettings.set("enabled", this.content.customerSettings.enabled);
		this.customerSettings.set("label", this.content.customerSettings.label);
		this.orderSettings.set("header", this.content.orderSettings.header);
		this.orderSettings.set("enabled", this.content.orderSettings.enabled);
		this.orderSettings.set("label", this.content.orderSettings.label)
	},
	initSortable: function () {
		var a = this;
		setTimeout(function () {
			a.$(".sortable-list").sortable({
				containment: "parent", placeholder: "tab-sort-placeholder", cancel: "label", stop: function (c, d) {
					var b, e;
					e = $(d.item);
					itemId = e.attr("id");
					list = e.parent();
					currentPosition = list.children("li.field").index(e);
					ancestors = e.parents(".field");
					configType = $(e.parents(".config-type"));
					e = "customer-select" === configType.attr("id") ? a.content.customerSettings : a.content.orderSettings;
					if (ancestors.length) for (b = ancestors.length - 1; 0 <= b; b--) {
						var f =
							$(ancestors[b]).attr("id");
						e = e.fields.findProperty("label", f)
					}
					if (b = e.fields.findProperty("label", itemId)) e.fields.removeObject(b), e.fields.insertAt(currentPosition, b), a.initSortable()
				}
			})
		})
	}
});
Tawk.TabItemView = Ember.View.extend({
	template: Ember.TEMPLATES.tabItem, tagName: "li", classNames: "sortable-item", hasNewItem: function () {
		if ("inDOM" === this._state && this.content && this.content.newItem) {
			var a = Tawk.TabItemView.create({
				elementId: this.content.newItem.id, content: this.content.newItem, controller: this.controller,
				parentId: this.content.id
			});
			a.appendTo(this.$(".sortable-list"));
			tabsViewCol.push(a);
			this.content.set("newItem", null)
		}
	}.observes("content.newItem"), didInsertElement: function () {
		var a = this;
		this.content.items && this.content.items.forEach(function (c) {
			c = Tawk.TabItemView.create({
				elementId: c.id,
				content: c,
				controller: a.controller,
				parentId: a.content.id
			});
			c.appendTo(a.$(".sortable-list"));
			tabsViewCol.push(c)
		});
		this.content.isMenu ? this.$(".menu-selection").html(this.content.title) : this.content.isText && this.$(".content").val(this.content.content);
		this.$('.tab-type[data-id="' + this.content.id + '"]').val(this.content.tabType);
		this.$().delegate('.tab-status[data-id="' + this.content.id + '"]', "change", function () {
			var c = $(this).is(":checked");
			a.content.set("enabled", c);
			a.content.items && a.content.items.setEach("enabled", c)
		});
		this.$().delegate('.tab-type[data-id="' + this.content.id + '"]', "change", function () {
			var c = $(this).val();
			a.content.set("isURL", "url" === c);
			a.content.set("isMenu", "menu" === c);
			a.content.set("isText", "text" === c);
			a.content.set("tabType", c);
			setTimeout(function () {
				"menu" !== c || a.content.items && a.content.items.length || a.controller.addMenuItem(a.content.id)
			})
		});
		this.parentId ? this.$().delegate(".item-title", "keyup", function () {
			var c = $(this).val();
			a.content.set("title", c)
		}) : this.$().delegate(".main-title", "keyup", function () {
			var c = $(this).val();
			a.content.set("title", c);
			$('.preview-item[data-id="' + a.content.id + '"]').find(".menu-selection").html(c)
		});
		this.$().delegate(".secureUrl", "keyup", function () {
			var c = $(this).val();
			a.content.set("content",
				c)
		});
		this.$().delegate(".add-menu-item", "click", function () {
			a.controller.addMenuItem(a.content.id)
		});
		this.parentId ? this.$().delegate(".remove-menu-item", "click", function () {
			a.controller.removeMenuItem(a.content.id, a.parentId);
			a.$().remove()
		}) : this.$().delegate(".remove-tab", "click", function () {
			a.controller.removeTab(a.content.id);
			a.$().remove()
		});
		this.isTextChanged()
	}, wilLDestroyElement: function () {
		this.$(".sortable-list").sortable("destroy");
		$(".sortable-list").sortable("refresh");
		$(".sortable-list").sortable("refreshPositions")
	},
	isTextChanged: function () {
		var a, c = this;
		"inDOM" === this._state && (this.content && this.content.isText) && setTimeout(function () {
			a = new SimpleMDE({
				element: c.$("textarea.content")[0],
				spellChecker: !1,
				toolbar: "bold italic heading heading-smaller | code quote link unordered-list ordered-list | clean-block preview".split(" "),
				blockStyles: {italic: "_"},
				previewRender: function (a) {
					return markdownConverter.makeHtml(encodeStr(a))
				}
			});
			a.value(c.content.content);
			c.content.set("beautifiedContent", markdownConverter.makeHtml(encodeStr(c.content.content)));
			a.codemirror.on("change", function () {
				var d = a.value();
				c.content.set("beautifiedContent", markdownConverter.makeHtml(encodeStr(d)));
				c.content.set("content", d)
			})
		})
	}.observes("content.isText")
});
Tawk.TabsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.tabs,
	elementId: "property-tabs",
	controller: null,
	subViewId: "tabs",
	showContent: null,
	showInnerContent: null,
	integrationCustomization: null,
	listIsLoaded: function () {
		var a = this;
		"inDOM" === this._state && (this.controller && !this.controller.isLoading &&
			this.controller.tabList) && (this.controller.tabList.forEach(function (c) {
			c = Tawk.TabItemView.create({
				elementId: c.id,
				content: c,
				controller: a.controller,
				formValidation: a.formValidationSetup.bind(a)
			});
			c.appendTo(a.$(".sortable-list"));
			tabsViewCol.push(c)
		}), setTimeout(function () {
			var c = a.$(".preview-item.not-dropdown").first(), d = c.attr("data-id");
			c.addClass("active open");
			(tabObj = a.controller.tabList.findProperty("id", d)) && (tabObj.previewImage ? a.set("beautifiedContent", '<img src="' + tabObj.previewImage + '" />') :
				tabObj.isURL ? a.set("beautifiedContent", '<iframe src="' + tabObj.content + '" width="100%" height="100%" frameborder="0" allowtransparency="false" />') : a.set("beautifiedContent", '<div class="padding-10">' + tabObj.beautifiedContent + "</div>"))
		}), this.initSortable(), this.formValidationSetup())
	}.observes("controller.isLoading"),
	hasNewTab: function () {
		var a = this;
		if ("inDOM" === this._state && this.controller && this.controller.newTab) {
			var c = Tawk.TabItemView.create({
				elementId: this.controller.newTab.id, content: this.controller.newTab,
				controller: this.controller, formValidation: a.formValidationSetup.bind(a)
			});
			c.appendTo(this.$(".outer-list"));
			tabsViewCol.push(c);
			setTimeout(function () {
				a.initSortable()
			}, 0);
			this.controller.set("newTab", null)
		}
	}.observes("controller.newTab"),
	didInsertElement: function () {
		var a = this;
		this._super();
		this.initSortable();
		this.$().delegate("#add-tab", "click", function (c) {
			a.controller.addTab();
			return !1
		});
		this.$().delegate(".tab", "click", function () {
			var c, d = $(this).parent().attr("data-id");
			a.$().find(".preview-item").removeClass("active open");
			c = a.controller.tabList.findProperty("id", d);
			c.isMenu ? a.$('.preview-item[data-id="' + d + '"]').addClass("open") : (a.$('.preview-item[data-id="' + d + '"]').addClass("active"), a.set("tabContent", null), c.previewImage ? a.set("tabContent", {
				type: "image",
				item: c
			}) : c.isURL ? a.set("tabContent", {type: "url", item: c}) : a.set("tabContent", {
				type: "text",
				item: c
			}))
		});
		this.$().delegate(".inner-tab", "click", function () {
			var c, d = $(this).parents(".preview-item").attr("data-id");
			c = $(this).parent().attr("data-id");
			c = a.controller.tabList.findProperty("id",
				d).items.findProperty("id", c);
			a.$().find(".preview-item").removeClass("open active");
			a.$('.preview-item[data-id="' + d + '"]').addClass("active");
			a.$('.preview-item[data-id="' + d + '"]').find(".menu-selection").html(c.title);
			c.previewImage ? a.set("tabContent", {
				type: "image",
				item: c
			}) : c.isURL ? a.set("tabContent", {type: "url", item: c}) : a.set("tabContent", {
				type: "text",
				item: c
			})
		});
		this.$().delegate(".configure-integration", "click", function (c) {
			var d = $(this).attr("data-id");
			c.preventDefault();
			"shopify" === d && Tawk.webProperties.getShopifySettings(a.controller.activeProperty.id,
				function (b, c) {
					b || (null !== a.integrationCustomization ? (a.integrationCustomization.set("content", c), a.integrationCustomization.openView()) : (a.set("integrationCustomization", Tawk.TabIntegrationSettings.create({
						closeCallback: a.closeIntegrationCustomization.bind(a),
						content: c,
						controller: a.controller
					})), a.integrationCustomization.append()))
				})
		})
	},
	closeIntegrationCustomization: function () {
		this.integrationCustomization && (this.integrationCustomization.remove(), this.set("integrationCustomization", null))
	},
	currentTabChanged: function () {
		"inDOM" ===
		this._state && (null === this.tabContent ? this.set("beautifiedContent", null) : "image" === this.tabContent.type ? this.set("beautifiedContent", '<img src="' + this.tabContent.item.previewImage + '" />') : "url" === this.tabContent.type ? this.set("beautifiedContent", '<iframe src="' + this.tabContent.item.content + '" width="100%" height="100%" frameborder="0" allowtransparency="false" />') : "text" === this.tabContent.type && this.set("beautifiedContent", '<div class="padding-10">' + this.tabContent.item.beautifiedContent + "</div>"))
	}.observes("tabContent.item.content"),
	formValidationSetup: function () {
		var a = this;
		this.formValidation ? this.formValidation.resetForm() : this.set("formValidation", this.$("#tabs-content-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d)
			}, submitHandler: function (c) {
				a.controller.saveTabSettings(function (c) {
					c ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		}))
	},
	initSortable: function () {
		var a = this;
		this.$(".sortable-list").sortable({
			connectWith: ".sortable-list",
			placeholder: "tab-sort-placeholder",
			items: "li:not(.not-sortable)",
			cancel: "label",
			start: function (c,
			                 d) {
				a.set("currentTab", d.item[0]);
				a.set("currentTabParent", d.item.parent()[0])
			},
			receive: function (a, d) {
				$(this).hasClass("outer-list") ? 10 < $(this).children().length && $(d.sender).sortable("cancel") : 5 < $(this).children().length && $(d.sender).sortable("cancel")
			},
			stop: function (c, d) {
				var b, e, f, g = $(d.item).attr("id"), h = $(d.item).next().attr("id");
				b = $(d.item).prev().attr("id");
				f = $(a.currentTabParent).attr("data-id");
				e = d.item.parent().attr("data-id");
				a.currentTab === d.item[0] && a.controller.moveToList(g, f, h, b, e)
			}
		})
	},
	wilLDestroyElement: function () {
		tabsViewCol.forEach(function (a) {
			a.destroy()
		});
		tabsViewCol.clear()
	}
});
Tawk.AlertsView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.alertsMain,
	elementId: "property-alerts",
	controller: null,
	subViewId: "alerts",
	didInsertElement: function () {
		var a = this;
		this._super();
		this.$("#alert-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = a.$("#alert-content").val();
				a.controller.saveAlert(d, function (b) {
					b ? a.saveError(d ?
						"Unable to post alert. Please try again." : "Unable to delete alert. Please try again.") : a.saveSuccess(d ? "Posted Alert" : "Successfully removed alert")
				});
				return !1
			}
		});
		this.$().delegate("#clear", "click", function () {
			a.$("#alert-content").val("");
			a.$("#alert-form").submit();
			return !1
		})
	},
	alertChanged: function () {
		"inDOM" === this._state && this.$("#alert-content").val(this.controller.alert)
	}.observes("controller.alert")
});
Tawk.KnowledgebaseView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.knowledgebase,
	elementId: "property-knowledgebase",
	controller: null,
	subViewId: "knowledgebase",
	editor: null,
	willDestroyElement: function () {
		var a = {}, c = this;
		$("body").unbind("keydown.closeView");
		this.controller.activeKnowledgebase && (a.categoryId = this.$("#category-select").val(), a.title = this.$("#kb-title").val() || languageParser.translate("admin", "auto_saved_draft"), a.content = this.editor.value(), a.status = this.$("#status-select").val(), a.isAutoSaved = !0, "draft" === a.status && (a.content && this.controller.activeKnowledgebase.content !=
			a.content) && this.controller.saveKBContent(a, function (a, b) {
			a || (c.controller.autoSavedDraft && c.controller.saveLastSubView({itemId: c.controller.autoSavedDraft}), Tawk.header.set("notificationText", languageParser.translate("admin", "auto_save_success")))
		}))
	},
	didInsertElement: function () {
		var a = this, c = !1;
		this._super();
		this.$().delegate("#category", "keyup", function () {
			$(this).val().trim() ? a.$("#category-list").removeClass("select2-display-none") : a.$("#category-list").addClass("select2-display-none")
		});
		this.$().delegate(".category-select",
			"click", function () {
				$(this).attr("data-id");
				var c = $(this).attr("data-content");
				a.$("#category").val(c);
				a.$("#category-list").addClass("select2-display-none")
			});
		this.$().on("click", function () {
			"inDOM" === a._state && a.$("#category-list").addClass("select2-display-none")
		});
		this.$().delegate("#category-select", "change", function () {
			"new" === $(this).val() ? a.$("#new-category-field").removeClass("hidden") : a.$("#new-category-field").addClass("hidden")
		});
		this.$("#knowledgebase-form").validate({
			errorPlacement: function (a,
			                          b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				c = {};
				c.categoryId = a.$("#category-select").val();
				"new" === c.categoryId && (c.categoryId = null, c.newCategory = a.$("#category-name").val());
				c.title = a.$("#kb-title").val();
				c.content = a.editor.value();
				c.status = a.$("#status-select").val();
				a.$("#knowledgebase-form footer button").attr("disabled", "disabled");
				a.controller.saveKBContent(c, function (b, c) {
					a.$("#knowledgebase-form footer button").removeAttr("disabled");
					b ? a.saveError(c) : a.saveSuccess()
				});
				return !1
			}
		});
		this.$("#manage-categories").click(function () {
			a.set("manageCategories", !0)
		});
		this.$().delegate(".edit-category", "click", function () {
			var a = $(this).parents("tr");
			a.find(".display-category").addClass("hidden");
			a.find(".action-buttons-container").addClass("hidden");
			a.find(".edit-category-input").removeClass("hidden");
			a.find(".edit-buttons-container").removeClass("hidden")
		});
		this.$().delegate(".cancel-edit", "click", function () {
			var a = $(this).parents("tr");
			a.find(".display-category").removeClass("hidden");
			a.find(".action-buttons-container").removeClass("hidden");
			a.find(".edit-category-input").addClass("hidden");
			a.find(".edit-buttons-container").addClass("hidden")
		});
		this.$("#add-category-form").validate({
			errorPlacement: function (a, b) {
				a.insertAfter(b.parent())
			}, submitHandler: function (c) {
				var b = $("#new-category-input", c).val();
				a.controller.addCategory(b, function (b, f) {
					b ? a.saveError(f ? f : "Unable to add category.") : (a.saveSuccess("Successfully added category."), $("#new-category-input", c).val(""))
				})
			}
		});
		this.$().delegate(".save-edit",
			"click", function () {
				var c = $(this).parents("tr"), b = $(this).attr("data-id");
				(category = c.find(".edit-category-input .input").val()) && a.controller.updateCategory(b, category, function (b, f) {
					b ? a.saveError(f ? f : "Unable to delete category.") : (a.saveSuccess("Successfully edited category."), c.find(".display-category").removeClass("hidden"), c.find(".action-buttons-container").removeClass("hidden"), c.find(".edit-category-input").addClass("hidden"), c.find(".edit-buttons-container").addClass("hidden"))
				})
			});
		this.$().delegate(".delete-category",
			"click", function () {
				var c = $(this).attr("data-id");
				a.controller.deleteCategory(c, function (b, c) {
					b ? a.saveError(c ? c : "Unable to delete category.") : a.saveSuccess("Successfully deleted category.")
				})
			});
		this.$().delegate("#search-category", "keyup", function () {
			var c = $(this).val();
			a.controller.set("categorySearchText", c.trim().toLowerCase())
		});
		this.$("#content-scrollable").bind("scroll.list", function (d) {
			!c && (a.controller.pagedList.currentData.length && !a.controller.pagedList.isLastPage()) && $(this).scrollTop() +
			$(this).height() >= $(this)[0].scrollHeight - 100 && (c = !0, a.controller.loadNextList(function (a, d) {
				c = !1
			}))
		});
		this.$().delegate("#search-kb-content", "submit", function () {
			var c = {
				query: a.$("#content-text").val().trim() || void 0,
				category: a.$(".category-select").val() || void 0,
				status: a.$(".status-select").val() || void 0
			};
			a.controller.searchList(c, function () {
				a.closeAdvancedFilter()
			});
			return !1
		});
		this.$().delegate("#openFilter", "click", function (a) {
			$(this).parent().toggleClass("open")
		});
		$("body").bind("click.knowledgebaseView",
			function (c) {
				$(c.target).parents("#search-kb-content").length || a.closeAdvancedFilter()
			});
		this.$().delegate("#reset-filter", "click", function () {
			a.$("#search-content").val("");
			a.$(".category-select").val("");
			a.$(".status-select").val("");
			a.$(".search").trigger("click");
			return !1
		});
		this.$().delegate("#close-filter", "click", function () {
			a.closeAdvancedFilter();
			return !1
		});
		this.$().delegate(".delete-content", "click", function (c) {
			var b = $(this).attr("data-id");
			c.stopPropagation();
			a.controller.deleteContent(b, function (b,
			                                        c) {
				b ? a.saveError(c ? c : "Unable to delete content.") : a.saveSuccess("Successfully deleted content.")
			})
		});
		$("#close-view").unbind("click.closeView");
		$("#close-view").on("click", function (c) {
			c.stopPropagation();
			if (!0 === a.manageCategories) return a.set("manageCategories", !1), !1;
			a.closeView()
		});
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (c) {
			if (27 === c.keyCode) {
				if (!0 === a.manageCategories) return c.stopPropagation(), a.set("manageCategories", !1), !1;
				a.closeView()
			}
		})
	},
	closeAdvancedFilter: function () {
		this.$("#search-kb-content") &&
		this.$("#search-kb-content .input-group-btn").removeClass("open")
	},
	checkHasContent: function () {
		"inDOM" === this._state && this.editor && (this.editor.value() ? (this.$("#published-option").removeAttr("disabled"), this.$("#outdated-option").removeAttr("disabled")) : (this.$("#status-select").val("draft"), this.$("#published-option").attr("disabled", "disabled"), this.$("#outdated-option").attr("disabled", "disabled")))
	},
	activeKBChanged: function () {
		var a = this;
		"inDOM" === this._state && (this.controller && this.controller.activeKnowledgebase) &&
		setTimeout(function () {
			a.controller.activeProperty.isAdmin ? a.controller.activeKnowledgebase.id ? (a.initializeEditor(), a.$("#status-select").val(a.controller.activeKnowledgebase.status), a.$("#category-select").val(a.controller.activeKnowledgebase.categoryId)) : (a.initializeEditor(), a.$("#category-select").val("")) : a.$("#kb-content-container").html(markdownConverter.makeHtml(encodeStr(a.controller.activeKnowledgebase.content)))
		}, 20)
	}.observes("controller.activeKnowledgebase"),
	initializeEditor: function () {
		var a =
			this;
		this.editor && (this.editor.toTextArea(), this.set("editor", null), this.$("#editor").val(""));
		this.set("editor", new SimpleMDE({
			element: this.$("#editor")[0],
			spellChecker: !1,
			toolbar: "bold italic heading heading-smaller | code quote link unordered-list ordered-list table | clean-block preview".split(" "),
			previewRender: function (a) {
				return markdownConverter.makeHtml(encodeStr(a))
			},
			initialValue: this.controller.activeKnowledgebase.content
		}));
		this.editor.codemirror.on("blur", function () {
			a.checkHasContent()
		});
		this.editor.value(this.controller.activeKnowledgebase.content);
		this.checkHasContent()
	}
});
Tawk.AdminView = Ember.View.extend({
	template: Ember.TEMPLATES.adminMain,
	elementId: "admin-main-view",
	controller: Tawk.PropertiesController.create(),
	listLimit: null,
	willDestroyElement: function () {
		this.modalFormView && (this.modalFormView.remove(), this.set("modalFormView", null))
	},
	widgetSelectionChange: function () {
		var a = this;
		"inDOM" === this._state && (this.controller && this.controller.widgetsController && this.controller.widgetsController.activeWidget) &&
		setTimeout(function () {
			"inDOM" === a._state && a.$("#widget-code-textarea").click()
		})
	}.observes("controller.widgetsController.activeWidget.id"),
	didInsertElement: function () {
		var a = this;
		this.controller.intializeView();
		this.$().delegate("#remove-own-access", "click", function () {
			var c;
			a.controller.activeProperty && (c = a.controller.activeProperty.name, checkAndSetConfirmView(!1, function (d) {
				d && socketConnector.removeAgentOwnAccess(a.controller.activeProperty.id, function (b) {
					b ? a.$(".innerContent").append('<div class="alert alert-danger fade in"><button class="close" data-dismiss="alert">\u00d7</button>' +
						languageParser.translate("admin", "remove_own_access_error", {propertyName: c}) + "</div>") : a.controller.intializeView(function () {
						a.set("previousPropertyName", c)
					})
				})
			}, languageParser.translate("admin", "remove_own_access_question", {propertyName: c}), null, languageParser.translate("admin", "remove_own_access"), languageParser.translate("admin", "yes_remove_access")))
		});
		this.$().delegate(".open-view", "click", function () {
			var c = $(this).attr("id");
			a.openEditForm(c)
		});
		this.$().delegate("#property-select", "change", function () {
			var a =
				$(this).find(":selected");
			a.attr("data-type");
			Tawk.routing.changeRoute({
				view: "admin",
				propertyId: a.val(),
				subView: null,
				itemId: null,
				widgetId: null
			})
		});
		this.$().delegate("#widget-select", "change", function () {
			a.controller.widgetsController.openWidget($(this).val())
		});
		this.$().delegate("#add-property", "click", function () {
			Tawk.routing.changeRoute({view: "admin", subView: "new-property"})
		});
		this.$().delegate("#add-widget", "click", function () {
			a.controller.widgetsController.openWidget();
			a.openEditForm("widget-settings")
		});
		this.$("#widget-code-textarea").click(function () {
			$(this).select()
		});
		this.$().delegate("#popout-widget-code-textarea", "click", function () {
			$(this).select()
		});
		this.calculateLimit();
		this.controller.limit = this.listLimit;
		this.set("isAddOnSeen", Tawk.userController.isNewFeatureSeen("add-on"));
		this.set("isBillingSeen", Tawk.userController.isNewFeatureSeen("billing"));
		this.set("isTabsSeen", Tawk.userController.isNewFeatureSeen("tabs"));
		this.set("isAlertsSeen", Tawk.userController.isNewFeatureSeen("alerts"));
		this.set("isKnowledgebaseSeen",
			Tawk.userController.isNewFeatureSeen("knowledgebase"))
	},
	resetPropertyList: function () {
		var a = this;
		this.controller.propertyListToReset && a.controller.activeProperty && (setTimeout(function () {
			a.$("#property-select").val(a.controller.activeProperty.id)
		}), this.controller.set("propertyListToReset", !1))
	}.observes("controller.propertyListToReset"),
	activePropertyLoaded: function () {
		var a = this;
		"inDOM" === this._state && (this.controller.activeProperty && this.controller.activeProperty.isLoaded && !this.controller.isReloadingList) &&
		(this.controller.activeProperty.id ? this.controller.lastViews && (setTimeout(function () {
			a.controller.lastViews.widgetId && "inDOM" === a._state && a.$("#widget-select").val(a.controller.lastViews.widgetId)
		}), this.controller.lastViews.subView && !this.controller.isUpdating ? (this.openEditForm(this.controller.lastViews.subView), "shortcuts" === this.controller.lastViews.subView && this.controller.lastViews.itemId && this.controller.shortcutsController.openItem(this.controller.lastViews.itemId)) : this.controller.saveLastView()) :
			a.openEditForm("new-property"))
	}.observes("controller.activeProperty.isLoaded"),
	openEditForm: function (a, c) {
		var d, b = Tawk.routing.getPath();
		this.modalFormView && (this.modalFormView.remove(), this.set("modalFormView", null));
		switch (a) {
			case "new-property":
				d = Tawk.NewPropertyView.create({
					controller: this.controller,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "settings":
				d = Tawk.PropertySettingsView.create({
					controller: this.controller,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "members":
				this.controller.openAgentList(this.listLimit);
				d = Tawk.MembersSettingsView.create({
					controller: this.controller.agentsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "department":
				this.controller.openDepartmentList(this.listLimit);
				d = Tawk.DepartmentSettingsView.create({
					controller: this.controller.departmentController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "shortcuts":
				this.controller.openShortcutsList(this.listLimit);
				d = Tawk.ShortcutsView.create({
					controller: this.controller.shortcutsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "triggers":
				this.controller.openTriggersList(this.listLimit);
				d = Tawk.TriggersView.create({
					controller: this.controller.triggersController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "ban-list":
				this.controller.openBanList(this.listLimit);
				d = Tawk.BanView.create({
					controller: this.controller.banController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "mail-settings":
				d = Tawk.MailSettingsView.create({
					controller: this.controller,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "addon-store":
				this.controller.openAddOnsStore(this.listLimit);
				d = Tawk.AddOnStoreView.create({
					controller: this.controller.addOnsController,
					closeForm: this.closeForm.bind(this)
				});
				Tawk.userController.setNewFeatureSeen("add-on");
				this.set("isAddOnSeen", !0);
				break;
			case "billing":
				this.controller.openBilling(this.listLimit);
				d = Tawk.BillingView.create({
					controller: this.controller.billingController,
					closeForm: this.closeForm.bind(this)
				});
				Tawk.userController.setNewFeatureSeen("billing");
				this.set("isBillingSeen", !0);
				break;
			case "tabs":
				this.controller.openTabs(this.listLimit);
				d =
					Tawk.TabsView.create({
						controller: this.controller.tabsController,
						closeForm: this.closeForm.bind(this)
					});
				Tawk.userController.setNewFeatureSeen("tabs");
				this.set("isTabsSeen", !0);
				break;
			case "alerts":
				this.controller.openAlerts(this.listLimit);
				d = Tawk.AlertsView.create({
					controller: this.controller.alertsController,
					closeForm: this.closeForm.bind(this)
				});
				Tawk.userController.setNewFeatureSeen("alerts");
				this.set("isAlertsSeen", !0);
				break;
			case "knowledgebase":
				this.controller.openKnowledgebase(this.listLimit);
				d = Tawk.KnowledgebaseView.create({
					controller: this.controller.knowledgebaseController,
					closeForm: this.closeForm.bind(this)
				});
				Tawk.userController.setNewFeatureSeen("knowledgebase");
				this.set("isKnowledgebaseSeen", !0);
				break;
			case "page-content":
				this.controller.openPage();
				d = Tawk.PageContentView.create({
					controller: this.controller.pageContentController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-settings":
				d = Tawk.WidgetSettingsView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-appearance":
				d = Tawk.WidgetAppearanceView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-content":
				d = Tawk.WidgetContentView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-behavior":
				d = Tawk.WidgetBehaviorView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-domains":
				d = Tawk.WidgetDomainsView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm.bind(this)
				});
				break;
			case "widget-scheduler":
				d =
					Tawk.WidgetSchedulerView.create({
						controller: this.controller.widgetsController,
						closeForm: this.closeForm.bind(this)
					})
		}
		if (d) {
			this.controller.set("subView", a);
			this.controller.saveLastView();
			this.set("modalFormView", d);
			this.modalFormView.append();
			if (!c && b && "new-property" !== a) {
				if (this.controller.activeProperty && b.propertyId === this.controller.activeProperty.id && b.subView === a) return;
				if (-1 === this.controller.widgetSubViews.indexOf(a)) Tawk.routing.changeRoute({
					view: "admin", propertyId: this.controller.activeProperty ?
						this.controller.activeProperty.id : null, subView: a, itemId: b.itemId || "", widgetId: null
				}); else {
					if (this.controller.widgetsController.activeWidget && b.widgetId === this.controller.widgetsController.activeWidget.id) return;
					Tawk.routing.changeRoute({
						view: "admin",
						propertyId: this.controller.activeProperty ? this.controller.activeProperty.id : null,
						subView: a,
						itemId: b.itemId || "",
						widgetId: this.controller.widgetsController.activeWidget ? this.controller.widgetsController.activeWidget.id : ""
					})
				}
			}
			this.$().css("visibility", "hidden")
		}
	},
	closeForm: function () {
		this.$().css("visibility", "visible");
		this.set("modalFormView", null);
		this.controller.getLastViews();
		this.controller.lastViews.widgetId && this.$("#widget-select").val(this.controller.lastViews.widgetId)
	},
	forceCloseForm: function () {
		this.modalFormView && this.modalFormView.closeView()
	},
	calculateLimit: function () {
		this.set("listLimit", Math.ceil(($(window).height() - 40) / 40));
		this.controller.set("listLimit", this.listLimit)
	},
	visibilityChanged: function () {
		null !== this.modalFormView && this.modalFormView instanceof
		Tawk.AdminBaseView && (this.get("isVisible") ? this.modalFormView.show() : this.modalFormView.hide())
	}.observes("isVisible"),
	accessRemovedWarning: function () {
		if ("inDOM" === this._state && this.controller.previousPropertyName) {
			this.modalFormView && this.modalFormView.closeView();
			var a = languageParser.translate("admin", "access_removed", {propertyName: this.controller.previousPropertyName});
			this.$(".innerContent").append('<div class="alert alert-warning fade in"><button class="close" data-dismiss="alert">\u00d7</button>' +
				a + "</div>");
			this.controller.set("previousPropertyName", null)
		}
	}.observes("controller.previousPropertyName"),
	reloadPath: function () {
		var a = this, c = Tawk.routing.getPath();
		"inDOM" === this._state && (this.modalFormView && (this.modalFormView.controller.closeItem && !c.itemId) && this.modalFormView.controller.closeItem(), a.modalFormView && a.modalFormView.subViewId === c.subView && c.propertyId || this.controller.reloadPath(function () {
			a.modalFormView && (a.modalFormView.remove(), a.closeForm());
			a.controller.requestProperty ||
			c.subView && a.openEditForm(c.subView, !0)
		}))
	}
});
Tawk.AliasView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.aliasList,
	formView: null,
	elementId: "alias-list-view",
	controller: null,
	activeAliasChanged: function () {
		"inDOM" === this._state && (this.$("#set-default").removeAttr("checked"), this.$("#alias-status-container").removeClass("hidden"))
	}.observes("controller.activeAlias"),
	didInsertElement: function () {
		var a = this;
		this._super();
		this.$().delegate("#add-alias", "click", function () {
			a.controller.openItem()
		});
		this.$().delegate(".all-bulk-check", "change", function () {
			a.controller.toggleDefaultAlias(!1)
		});
		main.hasFileReader || main.hasFlash || main.showUnexpectedIssue("filereader_unsupported");
		main.hasUserMedia || (main.hasFlash || desktopConnector.enabled()) || main.showUnexpectedIssue("usermedia_unsupported");
		this.$().delegate(".image-action", "click", function () {
			var c = $(this).attr("id");
			a.$(".alert").length && a.$(".alert").remove();
			if ("upload" === c && !window.FileAPIProxy && main.hasFileReader) a.$("#alias-image").trigger("click");
			else if ("capture" === c) {
				if (main.hasUserMedia || main.hasFlash) a.$("#alias-photo-select").val(""), a.controller.openCamera()
			} else "remove" === c && (a.$("#alias-photo-select").val(""), a.controller.removeAliasImage())
		});
		window.FileAPIProxy && (!main.hasFileReader && main.hasFlash) && (this.$("#upload").fileReader({
			filereader: GLOBAL_STATIC_URL + "/scripts/filereader.swf",
			debugMode: !0
		}), this.$("#upload").change(function (c) {
			c.target.files[0] && a.controller.uploadPhoto(c.target.files[0], {width: 200, height: 200}, {
				width: 137,
				height: 137
			}, "page-profile")
		}));
		this.$().delegate("#alias-image", "change", function (c) {
			c = $(this)[0].files;
			c[0] && (a.controller.uploadPhoto(c[0], {width: 200, height: 200}, {
				width: 137,
				height: 137
			}, "page-profile"), a.$("#alias-image").val(""));
			return !1
		});
		this.$().delegate("#set-default", "change", function () {
			var c = a.$("#set-default").is(":checked");
			a.controller.activeAlias.isDefault || (c ? a.$("#alias-status-container").addClass("hidden") : a.$("#alias-status-container").removeClass("hidden"))
		});
		this.$("#alias-form").validate({
			errorPlacement: function (a,
			                          d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d;
				c = null;
				var b = !0;
				a.$("#set-default").length && (c = a.$("#set-default").is(":checked"));
				!c && a.$("#alias-status").length && (b = a.$("#alias-status").is(":checked"));
				a.controller.activeAlias.aliasId || (d = !0);
				a.controller.saveAlias(c, b, function (b) {
					b ? a.saveError(d ? languageParser.translate("form_validation_messages", "alias_add_error") : null) : a.saveSuccess(d ? languageParser.translate("form_validation_messages", "alias_add_success") : null)
				});
				return !1
			}
		});
		this.isAliasLimitReached()
	},
	isAliasLimitReached: function () {
		"inDOM" === this.state && (this.controller && this.controller.pagedList) && (30 <= this.controller.pagedList.currentData.length ? this.$("#add-alias").addClass("hidden") : this.$("#add-alias").removeClass("hidden"))
	}.observes("controller.pagedList.currentData.length")
});
Tawk.EditAccountView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.accountForm,
	elementId: "account-settings-form-view",
	controller: null,
	classNames: "overlay-form",
	didInsertElement: function () {
		var a = this;
		this._super();
		$("body").unbind("keydown.closeView");
		$("body").bind("keydown.closeView", function (c) {
			if (27 === c.keyCode) return c.stopPropagation(), a.closeForm(), a.remove(), !1
		});
		this.$("#account-settings-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				c = {
					name: $("#user-name").val(),
					email: $("#user-email").val(),
					password: $("#user-password").val()
				};
				a.clearSaveMessages();
				a.controller.saveUserSettings(c, function (c) {
					c ? a.saveError() : a.saveSuccess()
				});
				return !1
			}
		})
	}
});
Tawk.RestApiKeysView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.restApikView,
	formView: null,
	elementId: "rest-apik-view",
	controller: null,
	didInsertElement: function () {
		var a = this;
		this._super();
		this.$("#create-key").click(function () {
			a.controller.createKey(function (c) {
				c ? a.saveError("Unable to create key.") : a.saveSuccess("Successfully created key.")
			})
		});
		this.$().delegate(".delete-key", "click", function () {
			var c = $(this).attr("data-id");
			a.controller.revokeKey(c, function (c, b) {
				c ? a.saveError(b ?
					b : "Unable to revoke key.") : a.saveSuccess("Successfully revoked key.")
			})
		})
	}
});
Tawk.AccountView = Ember.View.extend({
	template: Ember.TEMPLATES.accountMain,
	elementId: "acount-main-view",
	controller: Tawk.AccountController.create(),
	listLimit: null,
	willInsertElement: function () {
		this.controller.openProperty()
	},
	willDestroyElement: function () {
		this.modalFormView && (this.modalFormView.remove(), this.set("modalFormView", null))
	},
	widgetSelectionChange: function () {
		var a = this;
		"inDOM" === this.state && (this.controller && this.controller.widgetsController &&
			this.controller.widgetsController.activeWidget) && setTimeout(function () {
			a.$("#widget-code-textarea").focus()
		})
	}.observes("controller.widgetsController.activeWidget.id"),
	didInsertElement: function () {
		var a = this;
		this.$().delegate(".open-view", "click", function () {
			var c = $(this).attr("id");
			a.openEditForm(c)
		});
		this.$("#edit-profile-tawkid").click(function () {
			a.$("#tawkid-text").addClass("hidden");
			a.$("#tawkid-input").removeClass("hidden")
		});
		this.$("#cancel-profile-tawkid").click(function () {
			a.$("#tawkid-text").removeClass("hidden");
			a.$("#tawkid-input").addClass("hidden")
		});
		this.$("#tawkid-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent());
				a.css({position: "absolute", margin: "0px"})
			}, submitHandler: function (c) {
				c = a.$("#page-tawkid").val();
				a.$(".alert").remove();
				a.controller.pageContentController.savePageCustomization(void 0, c, function (c) {
					c ? a.$().append('<div class="alert alert-danger fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa fa-ban"></i>' + languageParser.translate("form_validation_messages",
						"error_save") + "</div>") : (a.$().append('<div class="alert alert-success fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa fa-check"></i>' + languageParser.translate("form_validation_messages", "success_update") + "</div>"), a.$("#tawkid-text").removeClass("hidden"), a.$("#tawkid-input").addClass("hidden"))
				});
				return !1
			}
		});
		this.$().delegate("#page-tawkid", "blur", function () {
			var c = $(this);
			c.val().trim() && !c.hasClass("error") && (a.$(".small-transparent-spinner").removeClass("hidden"),
				a.controller.pageContentController.checkTawkId(c.val(), function (d, b) {
					d || b ? c.addClass("invalid") : c.removeClass("invalid");
					a.$("#tawkid-form").validate().element("#page-tawkid");
					a.$(".small-transparent-spinner").addClass("hidden")
				}))
		});
		this.calculateLimit();
		this.set("isTabsSeen", Tawk.userController.isNewFeatureSeen("tabs"))
	},
	openEditForm: function (a) {
		var c;
		this.$(".alert").remove();
		switch (a) {
			case "settings":
				c = Tawk.EditAccountView.create({controller: Tawk.userController, closeForm: this.closeForm});
				break;
			case "aliases":
				this.controller.aliasController.loadList();
				c = Tawk.AliasView.create({controller: this.controller.aliasController, closeForm: this.closeForm});
				break;
			case "global-shortcuts":
				this.controller.openShortcutsList(this.listLimit, !0);
				c = Tawk.ShortcutsView.create({
					controller: this.controller.shortcutsController,
					closeForm: this.closeForm
				});
				break;
			case "shortcuts":
				this.controller.openShortcutsList(this.listLimit);
				c = Tawk.ShortcutsView.create({
					controller: this.controller.shortcutsController,
					closeForm: this.closeForm
				});
				break;
			case "ban-list":
				this.controller.openBanList(this.listLimit);
				c = Tawk.BanView.create({controller: this.controller.banController, closeForm: this.closeForm});
				break;
			case "page-content":
				c = Tawk.PageContentView.create({
					controller: this.controller.pageContentController,
					closeForm: this.closeForm
				});
				break;
			case "widget-settings":
				c = Tawk.WidgetSettingsView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm
				});
				break;
			case "widget-appearance":
				c = Tawk.WidgetAppearanceView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm
				});
				break;
			case "widget-content":
				c = Tawk.WidgetContentView.create({
					controller: this.controller.widgetsController,
					closeForm: this.closeForm
				});
				break;
			case "tabs":
				this.controller.openTabs(this.listLimit);
				c = Tawk.TabsView.create({
					controller: this.controller.tabsController,
					closeForm: this.closeForm.bind(this)
				});
				Tawk.userController.setNewFeatureSeen("tabs");
				this.set("isTabsSeen", Tawk.userController.isNewFeatureSeen("tabs"));
				break;
			case "rest-api":
				this.controller.openApiList(this.listLimit),
					c = Tawk.RestApiKeysView.create({
						controller: this.controller.restApiKeysController,
						closeForm: this.closeForm
					})
		}
		c && (this.set("modalFormView", c), this.modalFormView.append())
	},
	closeForm: function () {
		this.set("modalFormView", null)
	},
	calculateLimit: function () {
		this.set("listLimit", Math.ceil(($(window).height() - 40) / 40))
	}
});
Tawk.ReportingView = Ember.View.extend({
	template: Ember.TEMPLATES.reportingMain,
	elementId: "reporting-main-view",
	controller: Tawk.ReportingController.create(),
	graphEl: null,
	graph: null,
	willInsertElement: function () {
		this.controller.initializeView()
	},
	willDestroyElement: function () {
		$("body").unbind("click.reportingDateRangeForm");
		$("#analytics-tooltip").remove();
		this.controller.clearData()
	},
	didInsertElement: function () {
		var a = this;
		this.set("graphEl", this.$("#graph-container"));
		$("<div id='analytics-tooltip'></div>").appendTo("body");
		$("body").bind("click.reportingDateRangeForm", function (c) {
			a.$("#applyFilter").is(c.target) || (a.$("#closeFilter").is(c.target) || !(a.$("#analytics-filter").is(c.target) || 0 < a.$("#analytics-filter").has(c.target).length ||
				$(".ui-datepicker-header").is(c.target) || 0 < $(c.target).parents(".ui-datepicker-header").length || 0 < $(c.target).parents("#ui-datepicker-div").length)) || (c.stopPropagation(), c.preventDefault())
		});
		this.$("#analytics-from").val(moment(this.controller.filters.startDate).format("DD/MMM/YYYY"));
		this.$("#analytics-from").datepicker({
			defaultDate: this.controller.filters.startDate,
			changeMonth: !0,
			numberOfMonths: 3,
			monthNames: moment.months(),
			minDate: "-365D",
			maxDate: "-1d",
			dateFormat: "dd/M/yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			constrainInput: !0,
			onClose: function () {
				var c = a.$("#analytics-to").datepicker("getDate"),
					d = a.$("#analytics-from").datepicker("getDate");
				a.$("#analytics-to").datepicker("option", "minDate", d);
				d <= c && a.$("#analytics-to").val(a.$("#analytics-to").val())
			},
			onSelect: function (c) {
				"custom" !== a.$("#time-frame").val() && (a.$("#time-frame").val("custom"), a.$("#time-frame").change())
			}
		});
		this.$("#analytics-to").val(moment(this.controller.filters.endDate).format("DD/MMM/YYYY"));
		this.$("#analytics-to").datepicker({
			defaultDate: this.controller.filters.endDate,
			changeMonth: !0,
			numberOfMonths: 3,
			monthNames: moment.months(),
			minDate: "-365D",
			maxDate: "0",
			dateFormat: "dd/M/yy",
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
			constrainInput: !0,
			onClose: function () {
				var c = a.$("#analytics-From").datepicker("getDate"),
					d = a.$("#analytics-to").datepicker("getDate");
				a.$("#analytics-from").datepicker("option", "maxDate", d);
				d >= c && a.$("#analytics-to").val(a.$("#analytics-from").val())
			},
			onSelect: function (c) {
				"custom" !== a.$("#time-frame").val() && (a.$("#time-frame").val("custom"), a.$("#time-frame").change())
			}
		});
		this.$().delegate("#property-select", "change", function () {
			var c = $(this).find("option:selected"), d = $(c).val(), c = $(c).attr("data-type");
			a.controller.openProperty(d, c, function () {
			})
		});
		this.$().delegate("#time-frame", "change", function () {
			var c = $(this).find("option:selected"), c = $(c).val(), d = a.$("#analytics-to").datepicker("getDate"),
				b = new Date;
			b.getFullYear();
			b.getMonth();
			b.getDate();
			var e = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6);
			a.controller.set("timeFrame", c);
			switch (c) {
				case "custom":
					a.changeFilterDates(e, d);
					break;
				case "day":
					a.changeFilterDates(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1), d);
					break;
				case "week":
					d.getDay() && (d = a.getLastMonday(d), e = a.getLastMonday(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)), d = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 6));
					a.changeFilterDates(e, d);
					break;
				case "month":
					b.getMonth() === d.getMonth() ? a.changeFilterDates(new Date(b.getFullYear(),
						b.getMonth(), 1), b) : a.changeFilterDates(new Date(d.getFullYear(), d.getMonth(), 1), new Date(d.getFullYear(), d.getMonth() + 1, 0));
					break;
				case "7days":
					a.changeFilterDates(e, d);
					break;
				case "30days":
					a.changeFilterDates(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate() - 1), d)
			}
		});
		this.$().delegate("#prev", "click", function () {
			var c = a.$("#analytics-from").datepicker("getDate"), d = a.$("#analytics-to").datepicker("getDate");
			switch (a.controller.timeFrame) {
				case "day":
					a.changeFilterDates(new Date(c.getFullYear(), c.getMonth(),
						c.getDate() - 1), new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));
					break;
				case "week":
					a.changeFilterDates(new Date(c.getFullYear(), c.getMonth(), c.getDate() - 7), new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7));
					break;
				case "month":
					a.changeFilterDates(new Date(c.getFullYear(), c.getMonth() - 1, 1), new Date(c.getFullYear(), c.getMonth(), 0));
					break;
				case "7days":
					a.changeFilterDates(new Date(c.getFullYear(), c.getMonth(), c.getDate() - 7), new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7));
					break;
				case "30days":
					a.changeFilterDates(new Date(c.getFullYear(),
						c.getMonth() - 1, c.getDate()), new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()))
			}
		});
		this.$().delegate("#next", "click", function () {
			var c = a.$("#analytics-from").datepicker("getDate"), d = a.$("#analytics-to").datepicker("getDate"),
				b = new Date;
			b.getFullYear();
			b.getMonth();
			b.getDate();
			var e = null, f = null;
			switch (a.controller.timeFrame) {
				case "day":
					e = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1);
					f = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
					break;
				case "week":
					e = new Date(c.getFullYear(), c.getMonth(),
						c.getDate() + 7);
					f = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
					break;
				case "month":
					e = new Date(c.getFullYear(), c.getMonth() + 1, 1);
					f = new Date(d.getFullYear(), c.getMonth() + 2, 0);
					f.getMonth() === b.getMonth() && (e = new Date(b.getFullYear(), b.getMonth(), 1), f = b);
					break;
				case "7days":
					e = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 7);
					f = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
					break;
				case "30days":
					e = new Date(c.getFullYear(), c.getMonth() + 1, c.getDate()), f = new Date(d.getFullYear(), d.getMonth() +
						1, d.getDate())
			}
			f && (f && f <= b) && a.changeFilterDates(e, f)
		});
		this.$().delegate("#time-frame-data-list", "change", function () {
			var c = $(this).find("option:selected"), d = parseInt($(c).val());
			a.$("#analytics-to").datepicker("getDate");
			var b = new Date;
			"month" === a.controller.timeFrame && (c = new Date(b.getFullYear(), d, 1), d = b.getMonth() === d ? b : new Date(b.getFullYear(), d + 1, 0), a.changeFilterDates(c, d))
		});
		this.$("#applyFilter").click(function () {
			var c = {
				agentId: a.$("#agent-id").val(),
				departmentId: a.$("#department-id").val(),
				tagId: a.$("#tag-id").val(),
				startDate: a.$("#analytics-from").datepicker("getDate"),
				endDate: a.$("#analytics-to").datepicker("getDate")
			};
			c.agentId = "0" === c.agentId ? null : c.agentId;
			c.departmentId = "0" === c.departmentId ? null : c.departmentId;
			c.tagId = "0" === c.tagId ? null : c.tagId;
			a.controller.applyFilters(c, function (a) {
			})
		});
		this.$("#resetFilter").click(function () {
			a.controller.resetFilters(function () {
				a.$("#agent-id").val("0");
				a.$("#department-id").val("0");
				a.$("#tag-id").val("0");
				a.$("#time-frame").val("custom");
				a.$("#analytics-from").val(moment(a.controller.filters.startDate).format("DD/MMM/YYYY"));
				a.$("#analytics-to").val(moment(a.controller.filters.endDate).format("DD/MMM/YYYY"));
				a.$("#filter-container.open").toggleClass("open")
			})
		});
		this.$(".select-graph").click(function () {
			var c = this.id, d = "get";
			if (this.id) {
				a.$(".select-graph.active").removeClass("active");
				$(this).addClass("active");
				a.controller.set("label", c.replace(/-/g, "_"));
				for (var b = 0, e = c.length; b < e; b++) d = b && "-" !== c[b - 1] ? d + c[b] : d + c[b].toUpperCase();
				a.set("graph", null);
				c = d.replace(/-/g, "");
				a.controller.changeCurrentAnalytics(c)
			}
		});
		$("#graph-container").bind("plothover", function (c, d, b) {
			b ? (c = new Date(b.datapoint[0] + 6E4 * a.controller.timeZone), d = b.datapoint[1], d = b.series.label === languageParser.translate("generic", "shortest") || b.series.label === languageParser.translate("generic", "longest") || b.series.label === languageParser.translate("reporting", "average") ? a.controller.formatTimeData([[null, 60 * d]])[0][1] : d.toFixed(0), c = "day" === a.controller.timeFrame ?
				b.series.tooltipContent.replace("%x", moment(c).format("LL") + " - " + moment(c).format("ha")).replace("%y", d) : b.series.tooltipContent.replace("%x", moment(c).format("dddd") + ", " + moment(c).format("LL")).replace("%y", d), $("#analytics-tooltip").html(c).css({
				top: b.pageY - 50,
				left: b.pageX - 100
			}).fadeIn(200)) : $("#analytics-tooltip").hide()
		})
	},
	getLastMonday: function (a) {
		var c = a.getDay(), c = a.getDate() - c + (0 === c ? -6 : 1);
		return new Date(a.setDate(c))
	},
	changeFilterDates: function (a, c) {
		this.$("#analytics-from").val(moment(a).format("DD/MMM/YYYY"));
		this.$("#analytics-to").val(moment(c).format("DD/MMM/YYYY"));
		"month" === this.controller.timeFrame && (this.controller.resetTimeFrameData(), this.$("#time-frame-data-list").val(a.getMonth()))
	},
	togglePlot: function (a) {
		var c = this.graph.getData();
		c[a].lines.exists && (c[a].lines.show = !c[a].lines.show);
		c[a].points.exists && (c[a].points.show = !c[a].points.show);
		c[a].bars.exists && (c[a].bars.show = !c[a].bars.show);
		this.graph.setData(c);
		this.graph.draw()
	},
	renderGraph: function () {
		var a = this;
		"inDOM" === this._state && (this.controller &&
			this.controller.graphLoaded) && (null === this.graph && "function" === typeof $.plot ? this.set("graph", $.plot(this.graphEl, this.controller.graphData.data, {
			xaxis: {
				minTickSize: [1, "day" === this.controller.timeFrame ? "hour" : "day"],
				mode: "time",
				timeformat: "day" === this.controller.timeFrame ? "%I%p" : "%e/%b"
			},
			yaxis: {min: 0},
			grid: {hoverable: !0},
			legend: {
				show: !0, position: "nw", labelFormatter: function (a, d) {
					return '<span class="legend-title" id="' + d.idx + '"">' + a + "</span>"
				}
			}
		})) : null !== this.graph ? (this.graph.getOptions().xaxes[0].minTickSize =
			[1, "day" === this.controller.timeFrame ? "hour" : "day"], this.graph.getOptions().xaxes[0].timeformat = "day" === this.controller.timeFrame ? "%I%p" : "%e/%b", this.graph.setData(this.controller.graphData.data), this.graph.setupGrid(), this.graph.draw()) : this.set("graph", null), (null === this.graph && "function" === typeof $.plot || null !== this.graph) && $(".legend-title").click(function () {
			this.id && ($(this).closest("tr").toggleClass("is-hidden"), a.togglePlot(this.id))
		}))
	}.observes("controller.graphLoaded")
});
Tawk.LeaderboardView =
	Ember.View.extend({
		template: Ember.TEMPLATES.leaderboardMain,
		elementId: "leaderboard-main-view",
		controller: Tawk.LeaderboardController.create(),
		errorMessage: null,
		didInsertElement: function () {
			var a = this;
			this.controller.getAgentStatistics(function (c, d) {
				var b = moment(a.controller.filters.startTime).format("DD/MMM/YYYY"),
					e = moment(a.controller.filters.endTime).format("DD/MMM/YYYY");
				a.$("#analytics-from").val(b);
				a.$("#analytics-to").val(e);
				a.$("#filter-from").html(b);
				a.$("#filter-to").html(e);
				c ? a.set("errorMessage",
					d) : a.set("errorMessage", null)
			});
			this.$("#table-sort").click(function () {
				a.controller.toggleSort()
			});
			this.$(".filter-period").click(function () {
				var c = $(this).attr("id"), d = moment(), b = a.$("#property-select").find("option:selected").val(),
					e = null, e = {};
				$(this).hasClass("active") || (a.$(".filter-period.active").removeClass("active"), $(this).addClass("active"), e = "period-1w" === c ? moment().startOf("day").subtract(6, "days") : "period-4w" === c ? moment().startOf("day").subtract(27, "days") : "period-1y" === c ? moment().startOf("day").subtract(1,
					"year") : "period-mtd" === c ? moment().startOf("month") : "period-qtd" === c ? moment().startOf("quarter") : "period-ytd" === c ? moment().startOf("year") : moment("2018-01-01").startOf("day"), e = {
					propertyId: "all" === b ? void 0 : b,
					startTime: e,
					endTime: d
				}, a.controller.applyFilters(e, function (b, c) {
					var d = a.controller.filters.startTime.format("DD/MMM/YYYY"),
						e = a.controller.filters.endTime.format("DD/MMM/YYYY");
					a.$("#filter-from").html(d);
					a.$("#filter-to").html(e);
					a.$("#analytics-from").val(d);
					a.$("#analytics-to").val(e);
					a.$(".smart-form.open").toggleClass("open");
					b ? a.set("errorMessage", c) : a.set("errorMessage", null)
				}))
			});
			this.$().delegate("#property-select", "change", function () {
				var c = a.$("#property-select").find("option:selected").val();
				a.controller.filters.propertyId = "all" !== c ? c : void 0;
				a.controller.getAgentStatistics(function (c, b) {
					c ? a.set("errorMessage", b) : a.set("errorMessage", null)
				})
			});
			this.$("#openFilter").click(function (a) {
				$(this).parent().toggleClass("open")
			});
			this.$("#filterBack").click(function (c) {
				a.$(".smart-form.open").toggleClass("open")
			});
			this.$("#analytics-from").datepicker({
				changeMonth: !0,
				numberOfMonths: 3,
				monthNames: moment.months(),
				minDate: "-365D",
				maxDate: "-1d",
				dateFormat: "dd/M/yy",
				prevText: '<i class="fa fa-chevron-left"></i>',
				nextText: '<i class="fa fa-chevron-right"></i>',
				constrainInput: !0,
				onClose: function () {
					var c = a.$("#analytics-to").datepicker("getDate"),
						d = a.$("#analytics-from").datepicker("getDate");
					a.$("#analytics-to").datepicker("option", "minDate", d);
					d <= c && a.$("#analytics-to").val(a.$("#analytics-to").val())
				}
			});
			this.$("#analytics-to").datepicker({
				changeMonth: !0,
				numberOfMonths: 3,
				monthNames: moment.months(),
				minDate: "-365D",
				maxDate: "0",
				dateFormat: "dd/M/yy",
				prevText: '<i class="fa fa-chevron-left"></i>',
				nextText: '<i class="fa fa-chevron-right"></i>',
				constrainInput: !0,
				onClose: function () {
					var c = a.$("#analytics-From").datepicker("getDate"),
						d = a.$("#analytics-to").datepicker("getDate");
					a.$("#analytics-from").datepicker("option", "maxDate", d);
					d >= c && a.$("#analytics-to").val(a.$("#analytics-from").val())
				}
			});
			this.$("#closeFilter").click(function () {
				a.$(".smart-form.open").toggleClass("open")
			});
			this.$("#applyFilter").click(function () {
				var c = a.$("#property-select").find("option:selected").val(), c = {
					propertyId: "all" === c ? void 0 : c,
					startTime: moment(a.$("#analytics-from").datepicker("getDate")).startOf("day"),
					endTime: moment(a.$("#analytics-to").datepicker("getDate")).endOf("day")
				};
				a.$(".smart-form.open").toggleClass("open");
				a.controller.applyFilters(c, function (c, b) {
					a.$("#filter-from").html(a.controller.filters.startTime.format("DD/MMM/YYYY"));
					a.$("#filter-to").html(a.controller.filters.endTime.format("DD/MMM/YYYY"));
					c ? a.set("errorMessage", b) : a.set("errorMessage", null)
				});
				a.$(".filter-period.active").removeClass("active");
				a.$("#period-all").addClass("active")
			})
		},
		willDestroyElement: function () {
			this.controller.clearData()
		}
	});
Tawk.NewSetupWizardView = Ember.View.extend(Tawk.AdminBaseView, {
	template: Ember.TEMPLATES.setupWizard,
	elementId: "new-setup-form",
	controller: Tawk.WizardController.create(),
	classNames: "overlay-form",
	emails: null,
	cmsLinks: [{value: "drupal", text: "Drupal", link: "https://github.com/tawk/tawk-drupal"}, {
		value: "joomla",
		text: "Joomla",
		link: "http://extensions.joomla.org/extensions/extension/communication/live-support-hosted/tawk"
	}, {value: "magento1", text: "Magento 1.x", link: "https://github.com/tawk/tawk-magento"}, {
		value: "magento2",
		text: "Magento 2",
		link: "https://github.com/tawk/tawk-magento-2/archive/master.zip"
	}, {
		value: "opencart1",
		text: "Opencart 1.x",
		link: "https://github.com/tawk/tawk-opencart"
	}, {
		value: "opencart1-5",
		text: "Opencart 1.5.6x",
		link: "https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=16209&filter_search=tawk.to"
	},
		{
			value: "opencart2",
			text: "Opencart 2.0, 2.1, & 2.2",
			link: "https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=16209&filter_search=tawk.to"
		}, {
			value: "opencart2-3",
			text: "Opencart 2.3.0.x",
			link: "https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=16209&filter_search=tawk.to"
		}, {
			value: "pretashop",
			text: "Pretashop",
			link: "https://github.com/tawk/tawk-prestashop"
		}, {value: "shopify", text: "Shopify", link: "https://apps.shopify.com/tawk-to"}, {
			value: "whmcs",
			text: "WHMCS", link: "https://marketplace.whmcs.com/product/3134"
		}, {
			value: "wordpress",
			text: "Wordpress",
			link: "https://wordpress.org/plugins/tawkto-live-chat/",
			selected: !0
		}, {
			value: "zencart",
			text: "ZenCart",
			link: "http://storage.googleapis.com/tawk-plugins/tawk-zencart-1.0.zip"
		}],
	bootstrapWizard: null,
	enabledLanguages: JSON.parse('[{"code":"bg","title":"\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438","flagClass":"flag flag-bg"},{"code":"cat","title":"catal\u00e0","flagClass":"flag flag-cat"},{"code":"cs","title":"\u010de\u0161tina","flagClass":"flag flag-cs"},{"code":"de","title":"Deutsch","flagClass":"flag flag-de"},{"code":"en","title":"english","flagClass":"flag flag-en"},{"code":"es","title":"espa\u00f1ol","flagClass":"flag flag-es"},{"code":"fr","title":"fran\u00e7ais","flagClass":"flag flag-fr"},{"code":"hi","title":"\u0939\u093f\u0902\u0926\u0940","flagClass":"flag flag-hi"},{"code":"it","title":"italiano","flagClass":"flag flag-it"},{"code":"hu","title":"magyar","flagClass":"flag flag-hu"},{"code":"ko","title":"\ud55c\uad6d\uc5b4","flagClass":"flag flag-ko"},{"code":"nl","title":"Nederlands","flagClass":"flag flag-nl"},{"code":"pl","title":"polski","flagClass":"flag flag-pl"},{"code":"pt_br","title":"portugu\u00eas (Brasil)","flagClass":"flag flag-pt_br"},{"code":"ro","title":"rom\u00e2n\u0103","flagClass":"flag flag-ro"},{"code":"ru","title":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439","flagClass":"flag flag-ru"},{"code":"sk","title":"sloven\u010dina","flagClass":"flag flag-sk"},{"code":"sv","title":"svenska","flagClass":"flag flag-sv_se"},{"code":"tr","title":"T\u00fcrk\u00e7e","flagClass":"flag flag-tr"},{"code":"vi","title":"Ti\u1ebfng Vi\u1ec7t","flagClass":"flag flag-vi"},{"code":"zh_tw","title":"\u4e2d\u6587","flagClass":"flag flag-zh_tw"}]'),
	willDestroyElement: function () {
		this.controller.resetData()
	},
	willInsertElement: function () {
		var a, c = !1;
		this.set("roleSelectLabel", languageParser.translate("sites", "role"));
		this.set("roleSelectOptions", [{
			value: "admin",
			text: languageParser.translate("generic", "admin")
		}, {value: "agent", text: languageParser.translate("generic", "agent")}]);
		this.set("roleSelectClass", "agent-role-select");
		this.set("roleSelectValue", "admin");
		$("iframe").each(function () {
			var a = $(this).attr("name");
			a && -1 !== a.indexOf("stripe") && (c =
				!0)
		});
		c || (a = document.createElement("script"), a.src = "https://js.stripe.com/v2/", $("body").append(a), this.controller.loadData())
	},
	didInsertElement: function () {
		var a = this;
		this.$("#download-link").attr("href", this.cmsLinks[11].link);
		this.$("#cms-change").change(function () {
			var c = $(this).find("option:selected");
			a.$("#download-link").attr("href", c.attr("data-link"))
		});
		this.$("#add-another-email").click(function (c) {
			c.preventDefault();
			a.controller.addInvitation();
			return !1
		});
		this.$().delegate("#next-step", "click",
			function (c) {
				c = a.bootstrapWizard.currentIndex();
				1 === c ? a.$("#wizard-site-form").submit() : 2 === c ? a.$("#wizard-agent-form").submit() : 4 === c ? a.$("#whitelabel-settings").submit() : a.markStepComplete(a.$("li.active"))
			});
		this.$("#skip-step").click(function () {
			var c = a.bootstrapWizard.currentIndex();
			a.markStepComplete(a.$("li.active"));
			4 === c && (main.updateStorageSettings("lastWizardStep", null), a.closeCallback())
		});
		this.$("#widget-code").click(function () {
			$(this).select()
		});
		this.$("#wizard-site-form").validate({
			errorPlacement: function (a,
			                          d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = !0, b = a.$("#site-name").val().trim(), e = a.$("#site-domain").val().trim();
				a.controller.site && (d = !1);
				a.controller.saveSite(b, e, function (b) {
					b ? errorSave(c, d ? languageParser.translate("form_validation_messages", "site_add_error") : null) : a.markStepComplete(a.$("li.active"))
				});
				return !1
			}
		});
		this.$("#wizard-agent-form").validate({
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = [];
				a.controller.invitedList.forEach(function (b) {
					var c,
						f = a.$('section[data-emailId="' + b.id + '"]');
					f.length && (c = f.find(".email").val(), c.length && d.push({
						email: f.find(".email").val(),
						role: f.find("select").val(),
						id: b.id
					}))
				});
				if (d.length) return a.controller.inviteAgents(d, function (b) {
					b.length ? b.forEach(function (b) {
						a.$('section[data-emailId="' + b.id + '"]').append('<p class="wizard-error">' + b.message + "</p>")
					}) : a.markStepComplete(a.$("li.active"))
				}), !1;
				a.markStepComplete(a.$("li.active"))
			}
		});
		this.$().delegate(".delete-email", "click", function () {
			var c = $(this).next().find("input").attr("id");
			a.controller.removeInvitation(c)
		});
		this.$(".change-tab").click(function (a) {
			a.stopPropagation();
			return !1
		});
		this.$("#wizard-done").click(function () {
			a.closeCallback()
		});
		this.$("#email-instructions").click(function () {
			a.$("#email-container").removeClass("hidden")
		});
		this.$("#cancel-email").click(function (c) {
			c.preventDefault();
			a.$("#email-container").addClass("hidden")
		});
		this.$("#send-email").click(function () {
			a.$("#wizard-email-instructions-form").submit()
		});
		this.$("#wizard-email-instructions-form").validate({
			rules: {
				emails: {
					required: !0,
					multiemail: 10
				}
			},
			messages: {emails: {multiemail: languageParser.translate("form_validation_messages", "email") + "(" + languageParser.translate("form_validation_messages", "total_recipients") + ")"}},
			errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			},
			submitHandler: function (c) {
				c = $("#emails").val().split(",");
				a.controller.emailDeveloper($.map(c, $.trim), function (c) {
					if (c) return a.saveError(languageParser.translate("form_validation_messages", "email_developer_error"));
					a.saveSuccess(languageParser.translate("form_validation_messages",
						"email_developer_success"))
				});
				return !1
			}
		});
		this.$("#widget-text-color").ColorSelector({appendTo: "#addon-settings-container"}, function (c) {
			a.$("#footer-container").css("color", c)
		}, a.$("#widget-text-color"));
		this.$().delegate("#plan", "change", function () {
			var c;
			c = $(this).val();
			(c = a.controller.activeAddOn ? a.controller.activeAddOn.plans.findProperty("id", c) : null) && a.$("#total-price").html("Total : $ " + c.price / 100 + (1 === c.cycle ? languageParser.translate("admin", "per_month") : languageParser.translate("admin",
				"per_year")))
		});
		this.$().delegate("#card-selection", "change", function () {
			"new-card" === $(this).val() ? a.$("#new-card-details").removeClass("hidden") : a.$("#new-card-details").addClass("hidden")
		});
		this.$().delegate("#payment-method", "change", function () {
			"cc" === $(this).val() ? a.$("#card-details").removeClass("hidden") : a.$("#card-details").addClass("hidden")
		});
		$.validator.messages.ccExpiryFormat = $.validator.format("The format should be MM/YY");
		$.validator.messages.ccExpiryDate = $.validator.format("Invalid expiry date.");
		$.validator.messages.ccNumber = $.validator.messages.creditcard;
		$.validator.messages.cvcCheck = $.validator.format("Invalid cvc number.");
		this.$("#card-number").mask("9999 9999 9999? 9999 9999", {placeholder: " "});
		this.$("#card-expiry").mask("99/99", {
			placeholder: " ", completed: function () {
				a.$("#card-cvc").focus()
			}
		});
		this.$("#card-cvc").mask("999?9", {placeholder: " "});
		this.$("#card-number").keyup(function () {
			window.Stripe && (cardType = Stripe.card.cardType($(this).val())) && (cardType = cardType.replace(" ", "").toLowerCase(),
			a.$(".card-type").hasClass(cardType) || a.$(".card-type").removeClass().addClass("icon-append card-type " + cardType))
		});
		this.$().delegate(".clear-input", "click", function () {
			$(this).next().val("").trigger("change")
		});
		this.$().delegate("#widget-label", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("widget.label", $(this).val())
		});
		this.$().delegate("#widget-url", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("widget.url", $(this).val())
		});
		this.$().delegate("#email-label",
			"keyup paste change", function () {
				a.controller.activeAddOn.settings.set("email.label", $(this).val())
			});
		this.$().delegate("#email-url", "keyup paste change", function () {
			a.controller.activeAddOn.settings.set("email.url", $(this).val())
		});
		this.$().delegate("#activate", "click", function () {
			a.$("#whitelabel-payment").submit()
		});
		this.$("#whitelabel-settings").validate({
			onkeyup: !1, onfocusout: !1, onclick: !1, errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = {
					enabled: !0, widget: {
						label: "",
						url: "", textColor: "#000000"
					}, email: {label: "", url: ""}
				};
				if (!a.paymentProcessing) return d.widget.label = $("#widget-label", c).val(), d.widget.url = $("#widget-url", c).val(), d.widget.textColor = $("#widget-text-color", c).ColorSelector("getColor").toHexString(), d.email.label = $("#email-label", c).val(), d.email.url = $("#email-url", c).val(), a.$("button").attr("disabled", "disabled"), a.controller.saveWhitelabelSettings(d, function (b) {
					a.$("button").removeAttr("disabled");
					b ? a.saveError() : (a.$("#min-whitelabel-settings").addClass("hidden"),
						a.$("#payment-container").removeClass("hidden"), a.$("#activate").removeClass("hidden"), a.$("#cancel-activate").removeClass("hidden"), a.$("#next-step").addClass("hidden"), a.$("#previous-step").addClass("hidden"), a.$("#plan").trigger("change"))
				}), !1
			}
		});
		this.$("#whitelabel-payment").validate({
			onkeyup: !1, onfocusout: !1, onclick: !1, errorPlacement: function (a, d) {
				a.insertAfter(d.parent())
			}, submitHandler: function (c) {
				var d = {}, b = a.$("#payment-method", c).val(), e = function (b, c, d) {
					"inDOM" === a._state && (b ? (a.saveError(c),
					d && setTimeout(function () {
						a.$("#card-selection").val(d)
					}, 0), a.$("#activate").html(languageParser.translate("admin", "activate_now"))) : (a.set("paymentSuccess", !0), a.$("#activate").addClass("hidden"), a.$("#cancel-activate").addClass("hidden"), a.$("#next-step").addClass("hidden"), a.$("#skip-step").addClass("hidden"), a.$("#wizard-done").removeClass("hidden"), a.$("#min-whitelabel-settings").hide(), a.markStepComplete(a.$("li.active"))), a.$("button").removeAttr("disabled"), a.set("paymentProcessing", !1))
				};
				if (!a.paymentProcessing) return a.set("paymentProcessing", !0), a.$("button").attr("disabled", "disabled"), a.$("#activate").html('<i class="fa fa-refresh fa-spin"></i>'), d.planId = $("#plan", c).val(), b || (!desktopConnector.enabled() || desktopConnector.canUsePaypal()) || (b = "cc"), "cc" === b && (a.$("#card-selection").length ? d.customerId = a.$("#card-selection").val() : d.customerId = "new-card", $(c).serializeArray().map(function (a) {
					d[a.name] = a.value
				})), a.controller.handlePayment(b, d, e), !1
			}
		});
		this.$().delegate(".change-language",
			"click", function (c) {
				var d = $(this).attr("id");
				Tawk.userController.localeCode === d ? a.markStepComplete(a.$("li.active")) : null !== a.enabledLanguages.findProperty("code", d) && Tawk.userController.changeLanguage(d, function (a) {
					a || (main.updateStorageSettings("lastWizardStep", 0), setLocaleCookie(d), window.location = "/")
				})
			});
		this.$().delegate("#cancel-activate", "click", function () {
			a.$("#min-whitelabel-settings").removeClass("hidden");
			a.$("#payment-container").addClass("hidden");
			a.$("#activate").addClass("hidden");
			a.$("#cancel-activate").addClass("hidden");
			a.$("#next-step").removeClass("hidden");
			a.$("#previous-step").removeClass("hidden");
			a.$("#skip-step").removeClass("hidden")
		});
		this.$().delegate("#setup-later", "click", function () {
			a.controller.delaySetup(function () {
				SHOW_WIZARD = "minimal";
				a.closeCallback()
			})
		});
		this.isisLoadingChanged();
		this.settingsChanged()
	},
	markStepComplete: function (a) {
		this.bootstrapWizard && (a.addClass("complete").find(".step").html('<i class="fa fa-check"></i>'), this.bootstrapWizard.next())
	},
	inviteAgentDoneChanged: function () {
		"inDOM" === this._state && this.controller.inviteAgentDone && this.markStepComplete(this.$('li[data-target="#step2"]'))
	}.observes("controller.inviteAgentDone"),
	parsedWidgetFooterTitle: function () {
		var a, c;
		if (this.controller && this.controller.activeAddOn) {
			if (a = this.controller.activeAddOn.settings.widget.label) a = encodeStr(a); else return "";
			(c = a.match(/_[^_]+_/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("_");
				var e = c.lastIndexOf("_");
				b = c.substring(0, b) + "<i>" + c.substring(b +
					1, e) + "</i>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			(c = a.match(/\*[^*]+\*/gi)) && 0 < c.length && c.forEach(function (c) {
				var b;
				b = c.indexOf("*");
				var e = c.lastIndexOf("*");
				b = c.substring(0, b) + '<span style="font-size: 13px; font-weight: 700">' + c.substring(b + 1, e) + "</span>" + c.substring(e + 1, c.length);
				a = a.replace(c, b)
			});
			return a
		}
	}.property("controller.activeAddOn.settings.widget.label"),
	isisLoadingChanged: function () {
		var a, c = this;
		if ("inDOM" === this._state && !this.controller.isLoading) if (this.$().bootstrapWizard({
				tabClass: "form-wizard",
				previousSelector: "#previous-step", onTabShow: function (b, d, f) {
					b = c.$(".tab-pane#tab" + (f + 1));
					c.$("#wizard-done").addClass("hidden");
					c.$("#previous-step").addClass("hidden");
					c.$("#skip-step").addClass("hidden");
					c.$("#setup-later").addClass("hidden");
					b.height() >= c.$(".tab-content").height() ? b.css({
						marginLeft: -1 * (b.width() / 2),
						top: "0px",
						marginTop: 0,
						left: "50%"
					}) : b.css({
						marginLeft: -1 * (b.width() / 2),
						marginTop: -1 * (b.height() / 2),
						top: "50%",
						left: "50%"
					});
					0 !== f || a && !(0 >= a) || c.controller.site ? (c.$("#button-container").removeClass("hidden"),
						c.$("#next-step").removeClass("hidden"), c.$("#previous-step").removeClass("hidden"), 1 !== f || c.controller.site) ? 2 === f ? (f = c.$("#wizard-agent-intro").outerHeight(!0) + 40, c.$("#skip-step").removeClass("hidden"), c.$("#wizard-agent-form").css("max-height", c.$("#wizard").height() - f)) : 4 === f && (c.$("#skip-step").removeClass("hidden"), c.controller.activeAddOn && c.controller.activeAddOn.isSubscribed ? c.$("#next-step").removeClass("hidden") : (c.$("#next-step").removeClass("hidden"), c.$("#plan").trigger("change"))) :
						c.$("#setup-later").removeClass("hidden") : (c.$("#button-container").removeClass("hidden"), c.$("#next-step").addClass("hidden"), c.$("#setup-later").removeClass("hidden"))
				}, onNext: function (b, d, f) {
					f = 5 <= f ? 5 : f;
					c.$("#wizard-intro").html(languageParser.translate("wizard", "intro_" + (f + 1)));
					(!a || f - 1 > a) && main.updateStorageSettings("lastWizardStep", f - 1)
				}
			}), this.set("bootstrapWizard", this.$().data("bootstrapWizard")), a = main.storageSettings.lastWizardStep, void 0 !== a) {
			a = parseInt(a, 10);
			!(1 < a) || this.controller.site &&
			this.controller.site.id || (a = 0);
			4 === a ? (this.bootstrapWizard.show(a), this.$("#wizard-intro").html(languageParser.translate("wizard", "intro_" + a))) : (this.bootstrapWizard.show(a + 1), this.$("#wizard-intro").html(languageParser.translate("wizard", "intro_" + (a + 2))));
			for (var d = 0; d <= a; d++) this.$('li[data-target="#step' + (d + 1) + '"]').addClass("complete").find(".step").html('<i class="fa fa-check"></i>')
		} else this.$("#wizard-intro").html(languageParser.translate("wizard", "intro_1"))
	}.observes("controller.isLoading"),
	settingsChanged: function () {
		"inDOM" === this._state && (this.controller && this.controller.activeAddOn) && (this.controller.activeAddOn.settings && this.controller.activeAddOn.settings.widget.textColor) && (this.$("#widget-text-color").ColorSelector("setColor", this.controller.activeAddOn.settings.widget.textColor), this.$("#footer-container").css("color", this.controller.activeAddOn.settings.widget.textColor))
	}.observes("controller.activeAddOn.settings")
});
Tawk.RouteState = Ember.State.extend({
	navigationSelector: "#main-nav",
	currentView: null, enter: function (a) {
		a = $(this.get("navigationSelector"));
		var c = this.get("selector") || "." + this.get("path"), d = this.get("viewClass");
		a.find(".active").removeClass("active");
		a.find(c).addClass("active");
		Tawk.routing.titlePath.propertyName = null;
		Tawk.routing.titlePath.subviewName = null;
		Tawk.routing.titlePath.itemName = null;
		Tawk.routing.titlePath.widgetName = null;
		Tawk.leftPanel.closeMembersMessageList();
		if ("chat" === this.get("path")) Tawk.dynamicView.set("isVisible", !1), Tawk.mainPanel.visitorChatView.set("isShown",
			!0), Tawk.routing.titlePath.viewName = languageParser.translate("generic", "chat"); else if (d) {
			this.set("currentView", Tawk[d].create());
			Tawk.dynamicView.set("currentView", this.currentView);
			if (this.get("triggerAction")) this.currentView[this.get("triggerAction")]();
			Tawk.dynamicView.set("isVisible", !0);
			Tawk.mainPanel.visitorChatView.set("isShown", !1);
			Tawk.routing.titlePath.viewName = languageParser.translate(this.get("path"), "view_title")
		}
		Tawk.routing.setTitle()
	}, exit: function (a) {
		a.set("previousState", this.get("path"));
		this.currentView && (this.currentView.remove(), this.set("currentView", null), Tawk.dynamicView.set("currentView", null), Tawk.mainPanel.visitorChatView.set("isShown", !1));
		$("#back-top").addClass("hidden")
	}, reopenView: function () {
		if (this.get("triggerAction")) this.currentView[this.get("triggerAction")]()
	}
});
Tawk.routeManager = Ember.StateManager.create({
	rootView: Tawk.dynamicView,
	previousState: null,
	goToPreviousView: function () {
		null !== this.previousState && Tawk.routing.changeRoute({view: this.previousState})
	},
	dashboard: Tawk.RouteState.create({
		selector: "#dashboard-select",
		viewClass: "DashboardView"
	}),
	chat: Tawk.RouteState.create({selector: "#chat-select"}),
	aliasList: Tawk.RouteState.create({selector: "#aliasList-select", viewClass: "AliasListView"}),
	monitoring: Tawk.RouteState.create({
		selector: "#monitoring-select",
		viewClass: "VisitorMonitoringContainerView"
	}),
	messaging: Tawk.RouteState.create({selector: "#messaging-select", viewClass: "ConversationsView"}),
	admin: Tawk.RouteState.create({selector: "#admin-select", viewClass: "AdminView"}),
	account: Tawk.RouteState.create({
		selector: "#account-select",
		viewClass: "AccountView"
	}),
	reporting: Tawk.RouteState.create({selector: "#reporting-select", viewClass: "ReportingView"}),
	schedules: Tawk.RouteState.create({selector: "#schedules-select", viewClass: "SchedulerPropertiesView"}),
	leaderboard: Tawk.RouteState.create({selector: "#leaderboard-select", viewClass: "LeaderboardView"}),
	wizard: Tawk.RouteState.create()
});
var subviewCheck = function (a) {
	return -1 !== "settings members shortcuts triggers ban-list department mail-settings addon-store billing tabs new-property alerts knowledgebase widget-settings widget-appearance widget-content widget-domains widget-scheduler page-content".split(" ").indexOf(a)
};
Tawk.routing = {
	route1: routeMatcher(":view"),
	route2: routeMatcher(":view/:propertyId", {propertyId: /^([0-9A-Fa-f]{24})$/}),
	route3: routeMatcher(":view/:propertyId/:widgetId/:subView", {
		widgetId: /^(default|page|[a-z0-9]{9,11})$/,
		propertyId: /^([0-9A-Fa-f]{24})$/,
		subView: subviewCheck
	}),
	route4: routeMatcher(":view/:propertyId/:subView", {propertyId: /^([0-9A-Fa-f]{24})$/, subView: subviewCheck}),
	route5: routeMatcher(":view/:propertyId/:subView/:itemId", {
		propertyId: /^([0-9A-Fa-f]{24})$/,
		subView: subviewCheck
	}),
	route6: routeMatcher(":view/:subView",
		{subView: subviewCheck}),
	route7: routeMatcher(":view/:subView/:itemId", {subView: subviewCheck}),
	route8: routeMatcher(":view/:propertyId/:subView/:itemId/:subSettings", {
		propertyId: /^([0-9A-Fa-f]{24})$/,
		subView: subviewCheck
	}),
	titlePath: {
		brandName: "tawk.to",
		viewName: "",
		propertyName: "",
		subviewName: "",
		itemName: "",
		widgetName: ""
	},
	changeRoute: function (a) {
		var c = this.getPath(), d = "";
		a = a.widgetId ? this.route3.stringify(a).split("/") : this.route8.stringify(a).split("/");
		for (var b = 0, e = a.length; b < e; b++) a[b] && "null" !==
		a[b] && (d += "/" + a[b]);
		d !== this.route4.stringify(c) && d !== this.route3.stringify(c) && (window.location.hash = d)
	},
	getPath: function () {
		var a = window.location.hash.replace("#/", "");
		"/" === a.charAt(a.length - 1) && (a = a.replace(/\/$/, ""));
		return this.route1.parse(a) || this.route2.parse(a) || this.route3.parse(a) || this.route4.parse(a) || this.route5.parse(a) || this.route6.parse(a) || this.route7.parse(a) || this.route8.parse(a)
	},
	redirectUrl: function (a) {
		a = this.route1.parse(a) || this.route2.parse(a) || this.route3.parse(a) || this.route4.parse(a) ||
			this.route5.parse(a) || this.route6.parse(a) || this.route7.parse(a);
		this.changeRoute(a)
	},
	transitionTo: function () {
		var a;
		(a = this.getPath()) && a.view ? !Tawk.routeManager.states[a.view] || "wizard" === a.view && !main.wizard ? Tawk.routeManager.currentState || this.changeRoute({view: "dashboard"}) : Tawk.routeManager.currentState && Tawk.routeManager.currentState.name === a.view && Tawk.routeManager.currentState.currentView && "function" === typeof Tawk.routeManager.currentState.currentView.reloadPath ? Tawk.routeManager.currentState.currentView.reloadPath() :
			Tawk.routeManager.transitionTo(a.view) : this.changeRoute({view: "dashboard"})
	},
	setTitle: function () {
		var a = this.titlePath.brandName;
		this.titlePath.viewName && (a += " | " + this.titlePath.viewName);
		this.titlePath.propertyName && (a += " | " + this.titlePath.propertyName);
		this.titlePath.widgetName && (a += " | " + this.titlePath.widgetName);
		this.titlePath.subviewName && (a += " | " + this.titlePath.subviewName);
		this.titlePath.itemName && (a += " | " + this.titlePath.itemName);
		this.titlePath.chatNotification && (a = this.titlePath.chatNotification +
			" | " + a);
		document.title = a
	}
}