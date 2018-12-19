SocketConnector.prototype.anotherConnectionDetected = function (a) {
	a = a.originalEvent;
	if (this.socket && this.connected && a.newValue && "dashboard" === a.key && a.newValue !== this.localConnetionId) return this.killConnection = !0, this.socket.disconnect(), main.loggedInAnother()
};
SocketConnector.prototype.updateLocalConnectionId = function () {
	if (main.hasLocalStorage) {
		this.localConnetionId = randomString(8);
		try {
			localStorage.setItem("dashboard", this.localConnetionId)
		} catch (a) {
			throw Error(a);
		}
	}
};
SocketConnector.prototype.init =
	function () {
		var a = this;
		this.updateLocalConnectionId();
		this.killConnection = !1;
		this.socket = new $__TawkSocket(SOCKET_PROTOCOL + "://" + Tawk.userController.socketServer + "/", {
			engineIo: $__TawkEngine,
			path: "/s",
			flashPath: GLOBAL_STATIC_URL + "/js/",
			query: {sk: Tawk.userController.sessionKey, uiv: "v2"},
			forceBase64: !0
		});
		this.socket.on("error", function () {
		    a.socket.disconnect();
		    a.connected = !1
		});
		this.socket.on("disconnect", function () {
		    desktopConnector.send("clearState");
		    a.connected = !1;
		    a.socket.removeAllListeners();
		    clearTimeout(a.clearReconnectTimeout);
		    a.clearReconnectTimeout = null;
		    Tawk.visitorChatController.disconnectWebRTC();
		    a.killConnection || main.reconnectToServer()
		});
		this.socket.on("remoteDisconnect", function (c) {
		    "SIGNOUT_ALL" === c.msg && c.origin !== a.agentOrigin ? (a.killConnection = !0, a.socket.disconnect(), window.location.href = BASEPATH + "/logout") : "DISABLED" === c.msg ? (a.killConnection = !0, a.socket.disconnect(), main.showErrorMessage("account_disabled")) : "SOCKET_CONNECT_ERROR" === c.msg ? a.socket.disconnect() : "AGENT_SESSION_EXPIRED" === c.msg && (a.killConnection =
		        !0, a.socket.disconnect(), main.remoteDisconnect())
		});
		this.socket.on("ready", function (c) {
		    a.agentOrigin = c.origin;
		    a.socketId = c.socketId;
		    if (main.hasLocalStorage && window.localStorage.getItem("dashboard") !== a.localConnetionId) return a.killConnection = !0, a.socket.disconnect(), main.loggedInAnother();
		    if (c.buildVersion != UI_VERSION) return a.killConnection = !0, a.socket.disconnect(), window.location.reload();
		    a.connected = !0;
		    a.killConnection = !1;
		    SHOW_WIZARD = c.wizard;
		    a.retrieveStartupData();
		    a.setupEventListeners();
		    a.clearReconnectTimeout =
		        setTimeout(function () {
		            a.connected && main.resetReconnectInterval();
		            a.clearReconnectTimeout = null
		        }, 5E3)
		});
		this.socket.on("newVersionUpdate", function (a) {
		    "v2" === a && main.newDashboardVersion()
		})
	};
SocketConnector.prototype.retrieveStartupData = function () {
	var a = 0, c = function () {
		a++;
		4 === a && main.initialize()
	};
	this.socket.send("getInitData", {
		newVisitorAPI: !0,
		aggregateVisitorCount: !0,
		whisperEnabled: !0
	}, function (a, b) {
		a || (Tawk.userController.initialize(b.initData), Tawk.webProperties.loadProperties(b.pages), Tawk.shortcutsController.initializeShortcuts(),
			Tawk.liveMonitoringController.initInitialVisitors(c), c())
	});
	this.getAgents(function (a, b) {
		a ? Tawk.agentsController.initAgents() : Tawk.agentsController.loadAgents(b);
		c()
	});
	this.getAgentInvites(function (a, b) {
		a ? Tawk.invitationsController.initInvitations() : Tawk.invitationsController.loadInvitations(b);
		c()
	})
};
SocketConnector.prototype.setupEventListeners = function () {
	var a = this;
	this.socket.on("pageStatus", function (a) {
		Tawk.webProperties.updateDepartmentStatus(a)
	});
	this.setupVisitorsEventListener();
	this.socket.on("agentSessionStart",
		function (a) {
			Tawk.agentsController.sessionStart(a)
		});
	this.socket.on("agentSessionEnd", function (a) {
		Tawk.agentsController.sessionEnd(a)
	});
	this.socket.on("agentChatMessage", function (c) {
		c.origin !== a.agentOrigin && Tawk.agentChatController.incomingAgentMessage(c)
	});
	this.socket.on("agentGroupChatUpdate", function (c) {
		c.origin !== a.agentOrigin && Tawk.agentChatController.updateGroupInformation(c)
	});
	this.socket.on("agentGroupChatInvite", function (c) {
		c.origin !== a.agentOrigin && Tawk.agentChatController.groupChatInvitation(c)
	});
	this.socket.on("shortcutUpdate", function (c) {
		c.origin !== a.agentOrigin && (c.otherOrigin = !0, Tawk.shortcutsController.updateShorcutData(c))
	});
	this.socket.on("shortcutRemove", function (c) {
		c.origin !== a.agentOrigin && Tawk.shortcutsController.removeShortcutData(c)
	});
	this.socket.on("agentInvite", function (a) {
		Tawk.invitationsController.addInvitation(a)
	});
	this.socket.on("inviteRejected", function (a) {
		Tawk.invitationsController.removeInvitation(a.invid)
	});
	this.socket.on("pageDisable", function (a) {
		Tawk.webProperties.propertyDisabled(a.pgid,
			!0)
	});
	this.socket.on("pageEnable", function (a) {
		Tawk.webProperties.propertyEnabled(a.pgid, !0)
	});
	this.socket.on("aliasRemove", function (a) {
		Tawk.userController.deleteAliases(a)
	});
	this.socket.on("aliasUpdate", function (a) {
		Tawk.userController.updateAlias(a)
	});
	this.socket.on("agentDataUpdate", function (a) {
		Tawk.userController.updateUserData(a)
	});
	this.socket.on("agentInfoUpdate", function (a) {
		Tawk.agentsController.updateAgentName(a)
	});
	this.socket.on("soundSettingsUpdate", function (a) {
		Tawk.userController.updateSoundSettings(a)
	});
	this.socket.on("departmentUpdate", function (a) {
		Tawk.webProperties.updateDepartment(a, !0)
	});
	this.socket.on("departmentRemove", function (a) {
		Tawk.webProperties.removeDepartment(a, !0)
	});
	this.socket.on("pageRemove", function (a) {
		Tawk.webProperties.removeProperty(a.pgid, !0)
	});
	this.socket.on("pageAdd", function (c) {
		a.getPropertyInformation(c.pgid, function (a, b) {
			a || Tawk.webProperties.addProperty(b, !0)
		})
	});
	this.socket.on("agentAccessAdd", function (a) {
		Tawk.webProperties.addAgent(a, !0)
	});
	this.socket.on("agentAccessRemove",
		function (a) {
			Tawk.webProperties.removeAgentAccess(a, !0)
		});
	this.socket.on("agentAccessUpdate", function (a) {
		Tawk.webProperties.updateAgentAccess(a, !0)
	});
	this.socket.on("pageDataUpdate", function (a) {
		Tawk.webProperties.updatePropertyData(a, !0)
	});
	this.socket.on("agentEnabledPage", function (a) {
		Tawk.webProperties.updatePropertyStatus(a.pgid, !0)
	});
	this.socket.on("agentDisabledPage", function (a) {
		Tawk.webProperties.updatePropertyStatus(a.pgid, !1)
	});
	this.socket.on("agentStatusUpdate", function (a) {
		Tawk.agentsController.updateAgentStatus(a)
	});
	this.socket.on("uploadProgress", function (a) {
		fileUploader.uploadProgress(a)
	});
	this.socket.on("uploadFinished", function (a) {
		fileUploader.uploadComplete(a)
	});
	this.socket.on("widgetUpdate", function (a) {
		Tawk.webProperties.updateWidgetData(a)
	});
	this.socket.on("tvc", function (a) {
		Tawk.liveMonitoringController.visitorCountUpdate(a)
	});
	this.socket.on("newTicket", function (a) {
		Tawk.conversationsController.newTicketCreation(a)
	});
	this.socket.on("ticketEvent", function (a) {
		Tawk.conversationsController.incomingTicketEvents(a)
	});
	this.socket.on("conversationPurged", function (a) {
		Tawk.conversationsController.conversationPurged(a)
	});
	this.socket.on("tabsSettingsUpdate", function (a) {
		Tawk.webProperties.updateTabSettings(a)
	});
	this.socket.on("propertyAlertUpdate", function (a) {
		Tawk.webProperties.updateAlert(a)
	});
	this.socket.on("kBCategoryAdded", function (a) {
		Tawk.webProperties.updateKBCategory(a)
	});
	this.socket.on("kBCategoryDeleted", function (a) {
		Tawk.webProperties.updateKBCategory(a, !0)
	});
	this.socket.on("hireAgentContentUpdate", function (a) {
		Tawk.webProperties.updateHiredAgentContent(a)
	});
	this.socket.on("addonSettingsUpdate", function (a) {
		Tawk.webProperties.addonSettingsUpdate(a)
	});
	this.socket.on("addonActivation", function (a) {
		Tawk.webProperties.addonActivated(a)
	});
	this.socket.on("shortcutSync", function (c) {
		c.origin !== a.agentOrigin && Tawk.shortcutsController.reloadShortcutUpdate()
	});
	this.socket.on("agentChatUnpin", function (a) {
		Tawk.agentChatController.unpinChatToSidebar(a.ch, !0)
	});
	this.socket.on("agentChatPin", function (a) {
		Tawk.agentChatController.pinChatToSidebar(a.ch, !0)
	});
	this.socket.on("integrationConfigUpdate",
		function (a) {
			Tawk.webProperties.updateIntegrationConfig(a)
		})
};
SocketConnector.prototype.setupVisitorsEventListener = function () {
	var a = this;
	this.socket.on("visitorSessionEnd", function (a) {
		Tawk.liveMonitoringController.removeVisitor(a.vsk)
	});
	this.socket.on("visitorSessionStart", function (a) {
		Tawk.liveMonitoringController.addVisitor(a)
	});
	this.socket.on("visitorChatWindowState", function (a) {
		Tawk.liveMonitoringController.updateChatWindowState(a)
	});
	this.socket.on("visitorPopoutStatus", function (a) {
		Tawk.liveMonitoringController.updatePopoutState(a)
	});
	this.socket.on("visitorWindowResize", function (a) {
		Tawk.liveMonitoringController.chatWindowResized(a)
	});
	this.socket.on("visitorDataUpdate", function (c) {
		c.origin !== a.agentOrigin && Tawk.liveMonitoringController.visitorDataUpdate(c)
	});
	this.socket.on("visitorAgentLeft", function (a) {
		Tawk.liveMonitoringController.updateAgentLeft(a)
	});
	this.socket.on("visitorAgentJoined", function (a) {
		Tawk.liveMonitoringController.updateAgentJoined(a)
	});
	this.socket.on("agentIsTyping", function (a) {
		a.aid !== Tawk.userController.user.id &&
		Tawk.visitorChatController.agentIsTyping(a)
	});
	this.socket.on("agentStopedTyping", function (a) {
		a.aid !== Tawk.userController.user.id && Tawk.visitorChatController.agentStoppedTyping(a)
	});
	this.socket.on("visitorMessage", function (c) {
		c && c.origin && a.agentOrigin && c.origin !== a.agentOrigin && Tawk.visitorChatController.incomingMessage(c)
	});
	this.socket.on("visitorChatRequestV2", function (a) {
		Tawk.liveMonitoringController.newChatRequest(a)
	});
	this.socket.on("visitorMessagePreview", function (a) {
		Tawk.visitorChatController.showMessagePreview(a)
	});
	this.socket.on("visitorConversationPresenceUpdate", function (c) {
		c.origin !== a.agentOrigin && Tawk.visitorChatController.updateAgentPresence(c)
	});
	this.socket.on("visitorAway", function (a) {
		Tawk.liveMonitoringController.updateVisitorStatus(a, "away")
	});
	this.socket.on("visitorOnline", function (a) {
		Tawk.liveMonitoringController.updateVisitorStatus(a, "online")
	});
	this.socket.on("visitorAgentListUpdate", function (a) {
		Tawk.liveMonitoringController.updateAgentList(a)
	});
	this.socket.on("resetVisitorStatus", function (a) {
		Tawk.liveMonitoringController.resetVisitorStatus(a)
	});
	this.socket.on("visitorAttributeUpdate", function (a) {
		Tawk.visitorChatController.updateAttribute(a)
	});
	this.socket.on("visitorTagsUpdate", function (a) {
		Tawk.liveMonitoringController.updateTags(a)
	});
	this.socket.on("monitoringRemoveVisitor", function (a) {
		Tawk.liveMonitoringController.removeVisitor(a.vsk, !0)
	});
	this.socket.on("vCallUpdate", function (a) {
		Tawk.visitorChatController.webRTCCallUpdate(a)
	});
	this.socket.on("vCallStatus", function (a) {
		Tawk.liveMonitoringController.callStatusUpdate(a)
	});
	this.socket.on("vCallIgnored",
		function (a) {
			Tawk.liveMonitoringController.callIgnored(a)
		})
};
SocketConnector.prototype.changeStatus = function (a, c) {
	this.socket.send("changeStatus", {status: a}, c)
};
SocketConnector.prototype.changePageStatus = function (a, c, d) {
	this.socket.send(c ? "agentEnabledPage" : "agentDisabledPage", a, d)
};
SocketConnector.prototype.loadDashboardVisitorsCount = function (a) {
	this.socket.send("loadDashboardVisitorCount", a)
};
SocketConnector.prototype.unloadDashboardVisitorsCount = function () {
	this.socket.send("unloadDashboardVisitorCount")
};
SocketConnector.prototype.getHourlyStats = function (a, c) {
	this.socket.send("getHourlyStats", a, c)
};
SocketConnector.prototype.getDailyStats = function (a, c) {
	this.socket.send("getDailyStats", a, c)
};
SocketConnector.prototype.loadVisitorChatHistory = function (a, c) {
	this.socket.send("loadHistory", a, c)
};
SocketConnector.prototype.getAgents = function (a) {
	this.socket.send("getAgents", a)
};
SocketConnector.prototype.loadTranscript = function (a, c, d) {
	this.socket.send("getHistoricChat", a, c, d)
};
SocketConnector.prototype.getVisitorInfo =
	function (a, c, d) {
		this.socket.send("getVisitor", a, c, d)
	};
SocketConnector.prototype.emailTranscript = function (a, c, d, b, e) {
	this.socket.send("sendHistoryTranscript", a, c, d, b, e)
};
SocketConnector.prototype.banVisitor = function (a, c, d, b) {
	this.socket.send("banVisitor", c, a, d, b)
};
SocketConnector.prototype.banVisitorByIp = function (a, c, d, b) {
	this.socket.send("banVisitorByIp", a, c, d, b)
};
SocketConnector.prototype.getAgentNames = function (a, c) {
	this.socket.send("getAgentsForViewing", a, c)
};
SocketConnector.prototype.unsubscribeVisitorChatHistory =
	function () {
		this.socket.send("unsubscribeHistoryChannel")
	};
SocketConnector.prototype.getGeoLocation = function (a, c) {
	this.socket.send("getGeoLocation", a, c)
};
SocketConnector.prototype.initVisitorList = function (a) {
	this.socket.send("initFilteredVisitorList", null, null, !0, a)
};
SocketConnector.prototype.loadVisitorConversation = function (a, c, d) {
	this.socket.send("loadVisitorConversation", a, c, d)
};
SocketConnector.prototype.joinConversation = function (a, c) {
	this.socket.send("joinVisitorConversation", a, c)
};
SocketConnector.prototype.sendVisitorMessage =
	function (a, c) {
		this.socket.send("sendVisitorMessage", a, c)
	};
SocketConnector.prototype.leaveConversation = function (a, c) {
	this.socket.send("leaveVisitorConversation", a, c)
};
SocketConnector.prototype.subscribeVisitorMessage = function (a, c) {
	this.socket.send("subscribeVisitorMessage", a, c)
};
SocketConnector.prototype.unsubscribeVisitorMessage = function (a, c, d) {
	this.socket.send("unsubscribeVisitorMessage", a, c, d)
};
SocketConnector.prototype.updateWindowCount = function (a, c) {
	this.socket.send("updateChatWindowCount", a,
		c)
};
SocketConnector.prototype.updateVisitorList = function (a, c, d, b) {
	this.socket.send("initFilteredVisitorList", a, c, d, b)
};
SocketConnector.prototype.updateVisitorDetails = function (a, c, d, b, e) {
	this.socket.send("updateVisitorDetails", a, c, d, b, e)
};
SocketConnector.prototype.getShortcutsChanges = function (a, c) {
	this.socket.send("getShortcutChanges", a, c)
};
SocketConnector.prototype.saveShortcut = function (a, c) {
	var d = function (a, d) {
		a || (d = d || {}, d.otherOrigin = !1);
		c(a, d)
	};
	a.shortcutId ? this.socket.send("editShortcuts", a,
		d) : this.socket.send("addShortcuts", a, d)
};
SocketConnector.prototype.deleteShortcuts = function (a, c) {
	this.socket.send("removeShortcuts", a, c)
};
SocketConnector.prototype.saveSiteSettings = function (a, c) {
	a.pageId ? this.socket.send("editBusinessSiteSettings", a.pageId, a, c) : this.socket.send("service", "property", "/v1/property/create/site", a, c)
};
SocketConnector.prototype.bulkAddShortcuts = function (a, c) {
	this.socket.send("service", "shortcut", "/v1/property/bulk-add", a, c)
};
SocketConnector.prototype.getPropertyInformation =
	function (a, c) {
		this.socket.send("getPage", a, c)
	};
SocketConnector.prototype.getPropertyDetails = function (a, c) {
	this.socket.send("getPageForEditing", a, c)
};
SocketConnector.prototype.getPropertyAccessList = function (a, c) {
	this.socket.send("getPageAccessList", a, c)
};
SocketConnector.prototype.getInvitationList = function (a, c) {
	this.socket.send("service", "property", "/v1/members/list-invites", a, c)
};
SocketConnector.prototype.inviteAgentByEmail = function (a, c) {
	this.socket.send("service", "property", "/v1/members/invite",
		a, c)
};
SocketConnector.prototype.editAgentAccess = function (a, c) {
	this.socket.send("service", "property", "/v1/members/edit-access", a, c)
};
SocketConnector.prototype.editInvitationAccess = function (a, c) {
	this.socket.send("service", "property", "/v1/members/edit-invite", a, c)
};
SocketConnector.prototype.removeAgentAccess = function (a, c) {
	this.socket.send("service", "property", "/v1/members/remove", a, c)
};
SocketConnector.prototype.removeInvitation = function (a, c) {
	this.socket.send("service", "property", "/v1/members/remove-invite",
		a, c)
};
SocketConnector.prototype.resendInvitation = function (a, c) {
	this.socket.send("service", "property", "/v1/members/resend-invite", a, c)
};
SocketConnector.prototype.removeProperty = function (a, c) {
	this.socket.send("removeBusinessPage", a, c)
};
SocketConnector.prototype.disableProperty = function (a, c) {
	this.socket.send("disablePage", a, c)
};
SocketConnector.prototype.enableProperty = function (a, c) {
	this.socket.send("enablePage", a, c)
};
SocketConnector.prototype.saveDepartment = function (a, c, d) {
	c.departmentId ? this.socket.send("editDepartment",
		a, c, d) : this.socket.send("addDepartment", a, c, d)
};
SocketConnector.prototype.deleteDepartments = function (a, c, d) {
	this.socket.send("removeDepartment", a, c, d)
};
SocketConnector.prototype.getTriggers = function (a, c) {
	this.socket.send("getTriggers", a, c)
};
SocketConnector.prototype.saveTrigger = function (a, c, d) {
	c.id ? this.socket.send("editTrigger", a, c, d) : this.socket.send("addTrigger", a, c, d)
};
SocketConnector.prototype.deleteTriggers = function (a, c, d) {
	this.socket.send("removeTriggers", a, c, d)
};
SocketConnector.prototype.checkTawkIdVacancy =
	function (a, c, d) {
		this.socket.send("checkTawkId", a, c, d)
	};
SocketConnector.prototype.savePageSettings = function (a, c) {
	a.pageId ? this.socket.send("editBusinessPageSettings", a.pageId, a, c) : this.socket.send("addBusinessPage", a, c)
};
SocketConnector.prototype.getBanList = function (a, c) {
	this.socket.send("getBanList", a, c)
};
SocketConnector.prototype.banVisitorByIp = function (a, c, d, b) {
	this.socket.send("banVisitorByIp", a, c, d, b)
};
SocketConnector.prototype.unBanVisitors = function (a, c, d) {
	this.socket.send("unbanVisitors", a,
		c, d)
};
SocketConnector.prototype.getHistoryByBannedIp = function (a, c, d) {
	this.socket.send("getConversationByVisitorIP", a, c, d)
};
SocketConnector.prototype.getHistoryByBannedVisitorId = function (a, c, d) {
	this.socket.send("getConversationByVisitorId", a, c, d)
};
SocketConnector.prototype.addWidget = function (a, c) {
	this.socket.send("service", "property", "/v0/property/widgets/add", a, c)
};
SocketConnector.prototype.deleteWidgets = function (a, c, d) {
	this.socket.send("removeWidgets", a, c, d)
};
SocketConnector.prototype.saveBusinessPageCustomization =
	function (a, c, d) {
		this.socket.send("customizeBusinessPage", a, c, d)
	};
SocketConnector.prototype.saveProfilePageCustomization = function (a, c, d) {
	this.socket.send("customizeProfilePage", a, c, d)
};
SocketConnector.prototype.getAgentInvites = function (a) {
	this.socket.send("getAgentInvites", a)
};
SocketConnector.prototype.getAgentInvite = function (a, c) {
	this.socket.send("getAgentInvite", a, c)
};
SocketConnector.prototype.acceptInvitation = function (a, c) {
	this.socket.send("acceptInvite", a, c)
};
SocketConnector.prototype.rejectInvitation =
	function (a, c) {
		this.socket.send("rejectInvite", a, c)
	};
SocketConnector.prototype.getCities = function (a, c, d) {
	this.socket.send("getCities", a, c, d)
};
SocketConnector.prototype.saveProfileSettings = function (a, c) {
	this.socket.send("updateAgentData", a, c)
};
SocketConnector.prototype.saveSoundSettings = function (a, c) {
	this.socket.send("saveSoundSettings", a, c)
};
SocketConnector.prototype.deleteAliases = function (a, c) {
	this.socket.send("removeAlias", a, c)
};
SocketConnector.prototype.saveAlias = function (a, c) {
	a.aliasId ? this.socket.send("editAlias",
		a, c) : this.socket.send("addAlias", a, c)
};
SocketConnector.prototype.getBrowserAppSessions = function (a) {
	this.socket.send("getOtherSessions", a)
};
SocketConnector.prototype.signOutOtherSession = function (a, c) {
	this.socket.send("removeOtherSession", a, c)
};
SocketConnector.prototype.removeAgentOwnAccess = function (a, c) {
	this.socket.send("removeAgentOwnAccess", a, c)
};
SocketConnector.prototype.getAgentsInformations = function (a, c) {
	this.socket.send("getAgentsByAgentIds", a, c)
};
SocketConnector.prototype.getPropertyInformation =
	function (a, c) {
		this.socket.send("getPage", a, c)
	};
SocketConnector.prototype.agentIsTyping = function (a, c) {
	this.socket.send("agentIsTyping", {sessionKey: a, agentOnly: c})
};
SocketConnector.prototype.agentStoppedTyping = function (a, c) {
	this.socket.send("agentStopedTyping", {sessionKey: a, agentOnly: c})
};
SocketConnector.prototype.inviteAgentsByEmail = function (a, c, d) {
	this.socket.send("inviteAgentsByEmail", a, c, d)
};
SocketConnector.prototype.editWidgetScheduler = function (a, c, d, b, e) {
	this.socket.send("editWidgetScheduler",
		a, c, d, b, e)
};
SocketConnector.prototype.sendFileUpload = function (a, c, d, b, e) {
	this.socket.send("fileUploadMessage", a, c, d, b, e)
};
SocketConnector.prototype.sendInstallInstructions = function (a, c) {
	this.socket.send("service", "property", "/v1/property/widgets/send-instructions", a, c)
};
SocketConnector.prototype.saveWidgetGreetings = function (a, c, d, b, e) {
	"online" === b ? this.socket.send("editOnlineGreetings", a, c, d, e) : this.socket.send("editAwayGreetings", a, c, d, e)
};
SocketConnector.prototype.saveOfflineForm = function (a, c, d,
                                                      b) {
	this.socket.send("editOfflineForm", a, c, d, b)
};
SocketConnector.prototype.savePrechatForm = function (a, c, d, b) {
	this.socket.send("editPrechatForm", a, c, d, b)
};
SocketConnector.prototype.saveWidgetSettings = function (a, c, d, b) {
	this.socket.send("editSettings", a, c, d, b)
};
SocketConnector.prototype.saveAppearance = function (a, c, d, b) {
	this.socket.send("editAppearance", a, c, d, b)
};
SocketConnector.prototype.saveBehavior = function (a, c, d, b) {
	this.socket.send("editBehavior", a, c, d, b)
};
SocketConnector.prototype.saveWidgetContent =
	function (a, c, d, b) {
		this.socket.send("editAllContent", a, c, d, b)
	};
SocketConnector.prototype.saveWidgetLanguage = function (a, c, d, b) {
	this.socket.send("editLanguage", a, c, d, b)
};
SocketConnector.prototype.getChatTagsByProperty = function (a, c) {
	this.socket.send("getTags", a, c)
};
SocketConnector.prototype.updateOpenedChatTags = function (a, c, d, b, e) {
	this.socket.send("updateVisitorSessionTags", a, c, d, b, e)
};
SocketConnector.prototype.editBanReason = function (a, c, d, b) {
	this.socket.send("editBanReason", a, c, d, b)
};
SocketConnector.prototype.getEmailSettings =
	function (a, c) {
		this.socket.send("service", "property", "/v1/property/" + a + "/notifications/get", {}, c)
	};
SocketConnector.prototype.saveEmailSettings = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/notifications/set", c, d)
};
SocketConnector.prototype.getOngoingConvesations = function (a) {
	this.socket.send("getActiveVisitorSessions", null, a)
};
SocketConnector.prototype.subscribeVisitorList = function (a, c) {
	this.socket.send("subscribeVisitorMonitoring", a, c)
};
SocketConnector.prototype.unsubscribeVisitorList =
	function (a) {
		this.socket.send("unsubscribeVisitorMonitoring", a)
	};
SocketConnector.prototype.getAllTags = function (a) {
	this.socket.send("getTagsForAllPages", a)
};
SocketConnector.prototype.getVisitorSession = function (a, c, d) {
	this.socket.send("getVisitorSession", a, c, d)
};
SocketConnector.prototype.subscribeVisitorSessions = function (a, c) {
	this.socket.send("subscribeVisitorSessions", a, c)
};
SocketConnector.prototype.unsubscribeVisitorSessions = function (a, c) {
	this.socket.send("unsubscribeVisitorSessions", a, c)
};
SocketConnector.prototype.extendMonitoringList =
	function (a) {
		this.socket.send("extendVisitorMonitoring", a)
	};
SocketConnector.prototype.saveMonitoringTimeout = function (a, c) {
	this.socket.send("saveMonitoringTimeout", a, c)
};
SocketConnector.prototype.createTicket = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/create", c, d)
};
SocketConnector.prototype.getTicket = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c, null, d)
};
SocketConnector.prototype.getConversationsList = function (a, c,
                                                           d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/conversations", c, d)
};
SocketConnector.prototype.getTicketsList = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/tickets", c, d)
};
SocketConnector.prototype.getAssignedTicketsList = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/tickets/me", c, d)
};
SocketConnector.prototype.getHistoryList = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/chats", c, d)
};
SocketConnector.prototype.getSpamList = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/tickets/spam", c, d)
};
SocketConnector.prototype.getTrashList = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/tickets/deleted", c, d)
};
SocketConnector.prototype.replyTicket = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/reply", d, b)
};
SocketConnector.prototype.changePriority = function (a, c, d, b) {
	this.socket.send("service",
		"conversations", "/v1/frontend/" + a + "/ticket/" + c + "/priority", d, b)
};
SocketConnector.prototype.updateTicketTags = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/tag/update", d, b)
};
SocketConnector.prototype.updateChatTags = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/chat/" + c + "/tag/update", d, b)
};
SocketConnector.prototype.updateAssignee = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" +
		c + "/assignment", d, b)
};
SocketConnector.prototype.getTags = function (a, c) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/conversations/tags", null, c)
};
SocketConnector.prototype.restoreTicket = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/restore", null, d)
};
SocketConnector.prototype.listenOnNewHistory = function (a) {
	this.socket.on("newHistoryEntry", a)
};
SocketConnector.prototype.deleteConversations = function (a, c, d) {
	this.socket.send("service", "conversations",
		"/v1/frontend/" + a + "/conversations/delete", c, d)
};
SocketConnector.prototype.updateTicketStatus = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/status", d, b)
};
SocketConnector.prototype.unassignTicket = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/unassign", null, d)
};
SocketConnector.prototype.bulkSpamUpdate = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/tickets/spam", c, d)
};
SocketConnector.prototype.bulkRestore =
	function (a, c, d) {
		this.socket.send("service", "conversations", "/v1/frontend/" + a + "/conversations/restore", c, d)
	};
SocketConnector.prototype.bulkPurge = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/conversations/purge", c, d)
};
SocketConnector.prototype.getChat = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/chat/" + c, null, d)
};
SocketConnector.prototype.searchVisitorChatHistory = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" +
		a + "/chatByVisitorId", {visitorId: c}, d)
};
SocketConnector.prototype.getContacts = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/contacts", c, d)
};
SocketConnector.prototype.getContactDetails = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/contact/" + c, {}, d)
};
SocketConnector.prototype.emitStartReply = function (a, c, d) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/startReply", null, d)
};
SocketConnector.prototype.emitStopReply =
	function (a, c, d) {
		this.socket.send("service", "conversations", "/v1/frontend/" + a + "/ticket/" + c + "/stopReply", null, d)
	};
SocketConnector.prototype.getAggregation = function (a) {
	this.socket.send("service", "conversations", "/v1/frontend/conversations/aggregateMine", null, a)
};
SocketConnector.prototype.getContactEvents = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/contact/" + c + "/events", d, b)
};
SocketConnector.prototype.closeChat = function (a, c, d, b) {
	this.socket.send("service", "conversations",
		"/v1/frontend/" + a + "/chat/" + c + "/status", d, b)
};
SocketConnector.prototype.markConversationRead = function (a, c, d, b) {
	this.socket.send("service", "conversations", "/v1/frontend/" + a + "/conversation/" + c + "/read", d, function () {
	})
};
SocketConnector.prototype.getChatVolume = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/chats/" + a + "/volume", c, d)
};
SocketConnector.prototype.getMissedChatVolume = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/chats/" + a + "/missed", c, d)
};
SocketConnector.prototype.getChatWaitTime =
	function (a, c, d) {
		this.socket.send("service", "analytics", "/v1/chats/" + a + "/waiting", c, d)
	};
SocketConnector.prototype.getChatDuration = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/chats/" + a + "/duration", c, d)
};
SocketConnector.prototype.getChatSatisfaction = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/chats/" + a + "/satisfaction", c, d)
};
SocketConnector.prototype.getTicketVolume = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/tickets/" + a + "/volume", c, d)
};
SocketConnector.prototype.getSolvedTickets =
	function (a, c, d) {
		this.socket.send("service", "analytics", "/v1/tickets/" + a + "/solved", c, d)
	};
SocketConnector.prototype.getTicketSource = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/tickets/" + a + "/source", c, d)
};
SocketConnector.prototype.getTicketResolutionTime = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/tickets/" + a + "/resolution", c, d)
};
SocketConnector.prototype.getTicketReopened = function (a, c, d) {
	this.socket.send("service", "analytics", "/v1/tickets/" + a + "/reopened", c, d)
};
SocketConnector.prototype.getTicketFirstTimeResponse =
	function (a, c, d) {
		this.socket.send("service", "analytics", "/v1/tickets/" + a + "/response", c, d)
	};
SocketConnector.prototype.agentStatistics = function (a, c) {
	this.socket.send("service", "analytics", "/v1/live-answering/agent-statistics", a, c)
};
SocketConnector.prototype.getAddOns = function (a, c) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons", null, c)
};
SocketConnector.prototype.getAddOnDetail = function (a, c, d) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/" + c, null, d)
};
SocketConnector.prototype.saveWhitelabelSettings =
	function (a, c, d) {
		this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/saveSettings", c, d)
	};
SocketConnector.prototype.createPaypalPayment = function (a, c) {
	this.socket.send("service", "billing", "/v1/payment-method/paypal/create", a, c)
};
SocketConnector.prototype.createStripePayment = function (a, c) {
	this.socket.send("service", "billing", "/v1/payment-method/stripe/create", {token: a}, c)
};
SocketConnector.prototype.createSubscription = function (a, c, d) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions/create",
		c, d)
};
SocketConnector.prototype.cancelSubscription = function (a, c, d, b) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions/" + c + "/cancel", d, b)
};
SocketConnector.prototype.getExistingCard = function (a) {
	this.socket.send("service", "billing", "/v1/payment-method/stripe", null, a)
};
SocketConnector.prototype.getSubscriptions = function (a, c) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions", null, c)
};
SocketConnector.prototype.getPayments = function (a, c, d) {
	this.socket.send("service", "billing", "/v1/" +
		a + "/payments", c, d)
};
SocketConnector.prototype.saveBillingEmail = function (a, c, d, b) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions/" + c + "/update", d, b)
};
SocketConnector.prototype.getSubscription = function (a, c, d) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions", c, d)
};
SocketConnector.prototype.saveBillingAddress = function (a, c, d, b) {
	this.socket.send("service", "billing", "/v1/" + a + "/subscriptions/" + c + "/update-address", d, b)
};
SocketConnector.prototype.setupForwarder = function (a, c, d) {
	this.socket.send("service",
		"addon", "/v1/" + a + "/addons/whitelabel/setupForwarder", c, d)
};
SocketConnector.prototype.verifyForwarding = function (a, c, d) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/verifyForwarder", c, d)
};
SocketConnector.prototype.verifySPF = function (a, c, d) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/verifySpf", c, d)
};
SocketConnector.prototype.verifyDKIM = function (a, c, d) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/verifyDkim", c, d)
};
SocketConnector.prototype.saveForwarderName =
	function (a, c, d) {
		this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/saveForwarderName", c, d)
	};
SocketConnector.prototype.removeForwarder = function (a, c) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/whitelabel/removeForwarder", null, c)
};
SocketConnector.prototype.getAllPropertiesTabSettings = function (a, c) {
	this.socket.send("service", "property", "/v1/property/tabs", {propertyIds: a}, c)
};
SocketConnector.prototype.getPropertyTabSettings = function (a, c) {
	this.socket.send("service", "property", "/v1/property/" +
		a + "/tabs", null, c)
};
SocketConnector.prototype.saveTabSettings = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/tabs/save", {tabs: c}, d)
};
SocketConnector.prototype.getAlert = function (a, c) {
	this.socket.send("service", "property", "/v1/property/" + a + "/alert", null, c)
};
SocketConnector.prototype.saveAlert = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/alert/save", c, d)
};
SocketConnector.prototype.getKBCategories = function (a, c) {
	this.socket.send("service", "property",
		"/v1/property/" + a + "/knowledge-base/categories", null, c)
};
SocketConnector.prototype.addKBCategory = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/categories/add", c, d)
};
SocketConnector.prototype.updateKBCategory = function (a, c, d, b) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/categories/" + c + "/update", d, b)
};
SocketConnector.prototype.deleteKBCategory = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/categories/" +
		c + "/remove", null, d)
};
SocketConnector.prototype.getKBList = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base", c, d)
};
SocketConnector.prototype.saveKB = function (a, c, d, b) {
	c ? this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/" + c + "/update", d, b) : this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/add", d, b)
};
SocketConnector.prototype.getKBContent = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/" +
		c, null, d)
};
SocketConnector.prototype.deleteKBContent = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/knowledge-base/" + c + "/remove", null, d)
};
SocketConnector.prototype.getHiredAgentContent = function (a, c) {
	this.socket.send("service", "property", "/v1/property/" + a + "/hired-agent-content", null, c)
};
SocketConnector.prototype.saveHiredAgentContent = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/" + a + "/hired-agent-content/save", c, d)
};
SocketConnector.prototype.saveLiveAnswerSettings =
	function (a, c, d) {
		this.socket.send("service", "addon", "/v1/" + a + "/addons/live-answering/saveSettings", c, d)
	};
SocketConnector.prototype.initCall = function (a, c) {
	this.socket.send("service", "webrtc", "/v1/vcall/init/agent", a, c)
};
SocketConnector.prototype.rejectCall = function (a, c) {
	this.socket.send("service", "webrtc", "/v1/vcall/ignore/agent", a, c)
};
SocketConnector.prototype.joinCall = function (a, c) {
	this.socket.send("service", "webrtc", "/v1/vcall/token/agent", a, c)
};
SocketConnector.prototype.saveWebRTCSettings = function (a,
                                                         c, d) {
	this.socket.send("service", "addon", "/v1/" + a + "/addons/webrtc/saveSettings", c, d)
};
SocketConnector.prototype.getRestApiKeyList = function (a) {
	this.socket.send("service", "agent", "/v1/api-keys/list", null, a)
};
SocketConnector.prototype.createRestApiKey = function (a) {
	this.socket.send("service", "agent", "/v1/api-keys/create", null, a)
};
SocketConnector.prototype.revokeRestApiKey = function (a, c) {
	this.socket.send("service", "agent", "/v1/api-keys/revoke", {apiKey: a}, c)
};
SocketConnector.prototype.getGroups = function (a) {
	this.socket.send("service",
		"agent-chat", "/v2/groups", null, a)
};
SocketConnector.prototype.startGroupChat = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/channel/create", a, c)
};
SocketConnector.prototype.saveAgentChatSettings = function (a, c) {
	a.origin = this.agentOrigin;
	this.socket.send("service", "agent-chat", "/v1/save-agent-chat-settings", a, c)
};
SocketConnector.prototype.saveGroupChatName = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/channel/set-name", a, c)
};
SocketConnector.prototype.loadAgentChatHistory = function (a,
                                                           c) {
	this.socket.send("service", "agent-chat", "/v2/direct/fetch-before", a, c)
};
SocketConnector.prototype.loadGroupChatHistory = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/channel/fetch-before", a, c)
};
SocketConnector.prototype.syncAgentChat = function (a, c, d) {
	a ? this.socket.send("service", "agent-chat", "/v2/channel/fetch-after", c, d) : this.socket.send("service", "agent-chat", "/v2/direct/fetch-after", c, d)
};
SocketConnector.prototype.sendAgentMessage = function (a, c, d) {
	this.socket.send("agentChatMessage",
		a, c, d)
};
SocketConnector.prototype.sendGroupChatMessage = function (a, c, d) {
	this.socket.send("agentGroupChatMessage", a, c, d)
};
SocketConnector.prototype.acknowledgeAgentMessage = function (a, c, d, b) {
	this.socket.send("agentMessageAck", a, c, d, b)
};
SocketConnector.prototype.inviteAgentGroupChat = function (a, c, d) {
	this.socket.send("inviteAgentGroupChat", a, c, d)
};
SocketConnector.prototype.getAgentGroupChatDetails = function (a, c) {
	this.socket.send("getAgentGroupChatDetails", a, c)
};
SocketConnector.prototype.leaveAgentGroupChatPermanent =
	function (a, c) {
		this.socket.send("leaveAgentGroupChatPermanent", a, c)
	};
SocketConnector.prototype.pinGroupChat = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/channel/pin", a, c)
};
SocketConnector.prototype.unpinGroupChat = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/channel/unpin", a, c)
};
SocketConnector.prototype.pinDMChat = function (a, c) {
	this.socket.send("service", "agent-chat", "/v2/direct/pin", a, c)
};
SocketConnector.prototype.unpinDMChat = function (a, c) {
	this.socket.send("service", "agent-chat",
		"/v2/direct/unpin", a, c)
};
SocketConnector.prototype.getPropertyInfo = function (a, c, d) {
	this.socket.send("service", "property", "/v1/property/info", {propertyId: a, fields: c}, d)
};
SocketConnector.prototype.doWizardLater = function (a) {
	this.socket.send("service", "agent", "/v1/wizard/do.later", null, a)
};
SocketConnector.prototype.getCallList = function (a) {
	this.socket.send("service", "webrtc", "/v1/vcall/status/list", null, a)
};
SocketConnector.prototype.getCallInfo = function (a, c) {
	this.socket.send("subscribeVisitorCall", a, c)
};
SocketConnector.prototype.getShopifyConfig = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/config/get", {propertyId: a}, c)
};
SocketConnector.prototype.saveShopifyConfig = function (a, c, d) {
	this.socket.send("service", "integrations", "/v1/shopify/config/set", {propertyId: a, config: c}, d)
};
SocketConnector.prototype.searchShopifyData = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/search", a, c)
};
SocketConnector.prototype.loadOrders = function (a, c) {
	this.socket.send("service",
		"integrations", "/v1/shopify/order/list-for-customer", a, c)
};
SocketConnector.prototype.duplicateOrder = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/order/duplicate", a, c)
};
SocketConnector.prototype.calculateOrderRefund = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/order/calculate-refund", a, c)
};
SocketConnector.prototype.refundOrder = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/order/refund", a, c)
};
SocketConnector.prototype.cancelOrder =
	function (a, c) {
		this.socket.send("service", "integrations", "/v1/shopify/order/cancel", a, c)
	};
SocketConnector.prototype.changeShippingAddress = function (a, c) {
	this.socket.send("service", "integrations", "/v1/shopify/order/change-shipping-address", a, c)
};
SocketConnector.prototype.getAgentName = function (a, c) {
	this.socket.send("service", "agent", "/v1/get", a, c)
};
var socketConnector = new SocketConnector, AudioPlayer = function () {
	var a;
	this.audioContext = null;
	this.isReadyForInit = !1;
	this.eventUsedForInit = null;
	-1 !== navigator.userAgent.indexOf("Firefox/") ||
	("undefined" === typeof AudioBuffer || void 0 === window.AudioContext && void 0 === window.webkitAudioContext) || (window.AudioContext = window.AudioContext || window.webkitAudioContext, this.audioContext = new AudioContext);
	this.playableFiles = [{value: "sound1", text: "Legacy Sound 1"}, {
		value: "sound2",
		text: "Legacy Sound 2"
	}, {value: "sound3", text: "Legacy Sound 3"}, {value: "sound4", text: "Legacy Sound 4"}, {
		value: "sound5",
		text: "Legacy Sound 5"
	}, {value: "sound6", text: "Piano Chords"}, {value: "sound7", text: "Cellphone Ring"}, {
		value: "sound8",
		text: "High Marimba Melody"
	}, {value: "sound9", text: "Fast trill"}, {value: "sound10", text: "Beeps"}, {
		value: "sound11",
		text: "Shimmer"
	}, {value: "sound12", text: "Ascending Marimba"}, {value: "sound13", text: "Chime Accent"}, {
		value: "sound14",
		text: "Computer Beeps"
	}, {value: "sound15", text: "Digital Warble"}, {value: "sound16", text: "Electric Keyboard"}, {
		value: "sound17",
		text: "Marimba Tone"
	}, {value: "sound18", text: "Steel Drum Melody"}, {value: "sound19", text: "Alert"}, {
		value: "sound20",
		text: "Digital Beeps"
	}, {value: "sound21", text: "Electronic Beeps"},
		{value: "sound22", text: "Musical Ascend"}, {
			value: "sound23",
			text: "Musical Ascend Delay"
		}, {value: "sound24", text: "Serious Electric Piano"}, {value: "sound25", text: "Transmission Beeps"}];
	this.audioFiles = {};
	(this.isAudioCapable = window.Audio && !!(new Audio).canPlayType) ? (a = getPlayableFileExtensions(), 0 < a.length ? this.fileExtension = a[0].fileExtension : (this.isAudioCapable = !1, this.fileExtension = "")) : this.fileExtension = "";
	if (this.audioContext) {
		var c = this;
		initSourceFunction = function () {
			c.isReadyForInit && c.eventUsedForInit &&
			(c.audioFiles[c.eventUsedForInit].playSource(!0, 0), c.audioFiles[c.eventUsedForInit].stop(), window.removeEventListener("touchstart", initSourceFunction, !1))
		};
		"ontouchstart" in window && window.addEventListener("touchstart", initSourceFunction, !1)
	}
};