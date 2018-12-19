var notificationController, languageParser = new LanguageParser(translation, logger),
	desktopConnector = new DesktopConnector, fileUploader, Tawk = Ember.Application.create({
		ready: function () {
			notificationController = new NotificationController;
			fileUploader = new FileUploadHandler;
			Tawk.userController.setSocketServer(GLOBAL_SOCKET_SERVER);
			Tawk.userController.setSessionKey(SESSION_KEY);
			socketConnector.init()
		}
	});
window.onhashchange = function () {
	Tawk.routing.transitionTo()
};
Tawk.Router.map(function () {
	this.route("debug", {path: "/!tawk-debug"});
	this.route("remap", {path: "/*wildcard"})
});
Tawk.RemapRoute =
	Ember.Route.extend({
		beforeModel: function (a) {
			a.abort()
		}
	});
var storageVersion = 2, defaultStorageSettings = {
	storageVersion: storageVersion,
	notification: desktopConnector.enabled() ? "on" : "off",
	shortcuts: null,
	sound: "on",
	visitorDetailsHover: !0
}, Main = function () {
	this.isReconnectShown = this.initApp = !1;
	this.viewportDimensions = {};
	this.isNewVersion = !1;
	this.storageSettings = defaultStorageSettings;
	this.reconnectInterval = null;
	this.retrievingNewSocketServer = !1;
	this.hasFileReader = Modernizr.filereader;
	this.hasLocalStorage =
		Modernizr.localstorage;
	this.hasUserMedia = Modernizr.usermedia;
	this.hasFlash = swfobject.hasFlashPlayerVersion("1");
	this.retryInterval = this.wizard = null;
	this.retryInitialInterval = 5;
	this.retryMultiplier = 1.5;
	this.minRandom = 0.5;
	this.maxRandom = 1.5;
	this.maxInterval = 60
};
Main.prototype.initialize = function () {
	this.isReconnectShown = !1;
	Tawk.routeManager.set("currentState", null);
	"full" === SHOW_WIZARD ? this.showWizard() : this.appendView();
	$(".divMessageBox").remove();
	Modernizr.audio || this.showUnexpectedIssue("audio_unsupported");
	Modernizr.localstorage || this.showUnexpectedIssue("localstorage_unsupported");
	Modernizr.canvas || swfobject.hasFlashPlayerVersion("1") || this.showUnexpectedIssue("canvas_unsupported");
	window.addEventListener("unload", function () {
		Tawk = null;
		document.documentElement.innerHTML = ""
	})
};
Main.prototype.appendView = function () {
	void 0 === Tawk.mainNav && (Tawk.mainNav = Tawk.MainNav.create(), Tawk.mainNav.append());
	"inDOM" !== Tawk.leftPanel._state && Tawk.leftPanel.append();
	"inDOM" !== Tawk.mainPanel._state && (Tawk.mainPanel.append(),
		setTimeout(function () {
			Tawk.routing.transitionTo();
			Tawk.conversationsController.loadAggregation();
			socketConnector.loadDashboardVisitorsCount(function () {
			})
		}));
	void 0 === Tawk.headerNotification && (Tawk.headerNotification = Tawk.HeaderNotification.create(), Tawk.headerNotification.append());
	"inDOM" !== Tawk.agentChatContainerView._state && Tawk.agentChatContainerView.append()
};
Main.prototype.extractStorageSettings = function () {
	if (this.hasLocalStorage) {
		var a = !1, c = window.localStorage.getItem("tawkSettings" + Tawk.userController.user.id);
		c ? (this.storageSettings = JSON.parse(c), Tawk.chatController.updateDetailsDisplay(this.storageSettings.closeDetails), this.storageSettings && parseInt(this.storageSettings.storageVersion, 10) === storageVersion || (a = !0)) : a = !0;
		a && (this.storageSettings = defaultStorageSettings, this.presistStorageSettings())
	}
};
Main.prototype.updateStorageSettings = function (a, c) {
	this.storageSettings[a] = c;
	this.presistStorageSettings()
};
Main.prototype.presistStorageSettings = function (a, c) {
	if (this.hasLocalStorage) try {
		window.localStorage.setItem("tawkSettings" +
			Tawk.userController.user.id, JSON.stringify(this.storageSettings))
	} catch (d) {
		throw main.showUnexpectedIssue("local_storage_out_of_memory"), Error(d);
	}
};
Main.prototype.reconnectToServer = function () {
	var a, c = this;
	a = this.getNextReconnectInterval();
	this.isReconnectShown || (main.showReconnecting(), this.isReconnectShown = !0, notificationController.notifyAppDisconnect());
	if (null !== this.reconnectInterval) return !1;
	notificationController.stopNewChatRequest();
	this.reconnectInterval = setInterval(function () {
		0 !== a ? (c.updateReconnectMessage(languageParser.translate("action_messages",
			"reconnecting", {time: '<span class="green-text">' + moment.duration(a, "seconds").humanize() + "</span>"})), a--) : c.getNewSocketServer()
	}, 1E3)
};
Main.prototype.getNewSocketServer = function () {
	var a = this;
	if (this.retrievingNewSocketServer) return !1;
	clearInterval(this.reconnectInterval);
	this.reconnectInterval = null;
	this.updateReconnectMessage(languageParser.translate("action_messages", "connecting"));
	this.retrievingNewSocketServer = !0;
	$.ajax({
		type: "GET", url: "/", dataType: "text", headers: {accept: "application/json"},
		timeout: 6E4, data: {_t: Date.now()}, success: function (c) {
			c = $AjaxStripper(c);
			a.retrievingNewSocketServer = !1;
			if (c) {
				if (c.ssrv && c.sid) return Tawk.userController.setSocketServer(c.ssrv), Tawk.userController.setSessionKey(c.sid), socketConnector.init();
				if (c && c.redirect) {
					window.location = BASEPATH + "/login";
					return
				}
			}
			return a.reconnectToServer()
		}, error: function (c) {
			if (503 === c.status) return window.location.reload();
			a.retrievingNewSocketServer = !1;
			return a.reconnectToServer()
		}
	})
};
Main.prototype.getNextReconnectInterval =
	function () {
		var a, c = Math.random() * (this.maxRandom - this.minRandom) + this.minRandom;
		null === this.retryInterval ? this.retryInterval = this.retryInitialInterval : (a = this.retryInterval * this.retryMultiplier, this.retryInterval = this.retryInterval > this.maxInterval || a > this.maxInterval ? this.maxInterval : a);
		return Math.round(this.retryInterval * c)
	};
Main.prototype.resetReconnectInterval = function () {
	this.retryInterval = null
};
Main.prototype.showReconnecting = function () {
	var a = this, c = $(HandlebarsTemplates.alertBox({
		elementId: "reconnect-overlay",
		title: languageParser.translate("action_messages", "disconnected"),
		message: languageParser.translate("action_messages", "attempt_reconnect"),
		buttons: [{id: "reconnect", text: languageParser.translate("buttons", "reconnect")}]
	}));
	$(".divMessageBox").each(function () {
		"reconnect-overlay" !== $(this).attr("id") && $(this).remove()
	});
	c.find("#reconnect-overlay-reconnect").click(function () {
		a.getNewSocketServer()
	});
	$("#reconnect-overlay").length ? $("#reconnect-overlay").replaceWith(c) : $("body").append(c)
};
Main.prototype.updateReconnectMessage =
	function (a) {
		$("#reconnect-overlay .pText").html(a)
	};
Main.prototype.loggedInAnother = function () {
	if (!$("#logged-in-another").length) {
		var a = $(HandlebarsTemplates.alertBox({
			elementId: "logged-in-another",
			title: languageParser.translate("action_messages", "multiple_dashboard"),
			message: languageParser.translate("action_messages", "logged_another_tab"),
			buttons: [{id: "reconnect", text: languageParser.translate("buttons", "reconnect")}]
		}));
		a.find("#logged-in-another-reconnect").click(function () {
			window.location.reload()
		});
		$("body").append(a)
	}
};
Main.prototype.remoteDisconnect = function () {
	if (!$("#remote-disconnect").length) {
		var a = $(HandlebarsTemplates.alertBox({
			elementId: "remote-disconnect",
			title: languageParser.translate("action_messages", "remote_disconnect"),
			message: languageParser.translate("action_messages", "signed_out"),
			buttons: [{id: "reconnect", text: languageParser.translate("buttons", "reconnect")}]
		}));
		a.find("#remote-disconnect-reconnect").click(function () {
			window.location.reload()
		});
		$("body").append(a)
	}
};
Main.prototype.showErrorMessage =
	function (a) {
		var c = "overlay-" + a;
		$("#" + c).length || $("body").append(HandlebarsTemplates.alertBox({
			elementId: c,
			title: languageParser.translate("action_messages", "alert"),
			message: languageParser.translate("action_messages", a)
		}))
	};
Main.prototype.newDashboardVersion = function () {
	if (!$("#new-version-message").length) {
		var a = $(HandlebarsTemplates.newVersionMessage({
			message: languageParser.translate("action_messages", "new_dashboard_version"),
			buttonText: languageParser.translate("action_messages", "refresh_dashboard"),
			link: BASEPATH + "/"
		}));
		a.find(".miniIcono").click(function () {
			a.remove()
		});
		$("#fixed-notification-container").prepend(a)
	}
};
Main.prototype.showUnexpectedIssue = function (a) {
	if (!$("#" + a).length) {
		var c = $(HandlebarsTemplates.unsupportedAlert({
			elementId: a,
			message: languageParser.translate("action_messages", a)
		}));
		c.find(".miniIcono").click(function () {
			c.remove()
		});
		$("#fixed-notification-container").prepend(c)
	}
};
Main.prototype.showWizard = function () {
	var a = this;
	this.wizard && (this.wizard.remove(), this.wizard = null);
	this.wizard = Tawk.NewSetupWizardView.create({
		closeCallback: function () {
			a.wizard && (a.wizard.remove(), a.wizard = null, a.appendView(), Tawk.routing.changeRoute({view: "dashboard"}))
		}
	});
	this.wizard.append();
	Tawk.routing.changeRoute({view: "wizard"})
};
var main = new Main, SocketConnector = function () {
	var a = this;
	this.localConnetionId = this.socketId = this.socket = null;
	this.killConnection = this.connected = !1;
	this.agentOrigin = 0;
	this.clearReconnectInterval = null;
	$(window).on("storage", function (c) {
		a.anotherConnectionDetected(c)
	})
};