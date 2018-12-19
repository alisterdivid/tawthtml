var NotificationController = function () {
	this.totalUnread = 0;
	this.originalTitle = document.title;
	this.titleInterval = null;
	this.desktopNotifications = [];
	this.newChatRequests = {};
	this.isLegacyNotification = "webkitNotifications" in window && !desktopConnector.enabled();
	this.audioPlayer = new AudioPlayer
};
NotificationController.prototype.notifyNewChatRequest = function () {
	this.audioPlayer.reset("icr");
	this.audioPlayer.play("icr")
};
NotificationController.prototype.stopNewChatRequest = function () {
	this.audioPlayer.stop("icr")
};
NotificationController.prototype.notifyNewMessage = function (a, c, d) {
	this.audioPlayer.play("im");
	a && (c && d) && this.showMessageNotification(a, c, d)
};
NotificationController.prototype.notifyNewVisitor = function () {
	this.audioPlayer.play("iv")
};
NotificationController.prototype.notifyAppDisconnect = function () {
	this.audioPlayer.play("dc")
};
NotificationController.prototype.notifyAgentChatMessage = function (a, c, d) {
	this.audioPlayer.play("acm");
	a && (c && d) && this.showMessageNotification(a, c, d)
};
NotificationController.prototype.notifyIncomingCall = function () {
	this.audioPlayer.reset("webrtc-call");
	this.audioPlayer.play("webrtc-call")
};
NotificationController.prototype.stopIncomingCall = function () {
	this.audioPlayer.stop("webrtc-call")
};
NotificationController.prototype.playAudio = function (a, c) {
	a && "none" !== a && (this.audioPlayer.update(a, {n: a, vl: c}), this.audioPlayer.play(a))
};
NotificationController.prototype.isWindowFocused = function () {
	return null === document.querySelector(":focus") ?
		!1 : !0
};
NotificationController.prototype.hasDesktopNotificationFeature = function () {
	return window.webkitNotifications || window.Notification ? !0 : !1
};
NotificationController.prototype.isDesktopNotificationEnabled = function () {
	return this.checkNotificationPermission() && "on" === main.storageSettings.notification
};
NotificationController.prototype.checkNotificationPermission = function () {
	return this.isLegacyNotification ? 0 === window.webkitNotifications.checkPermission() : "granted" === window.Notification.permission
};
NotificationController.prototype.checkNotificationPermissionIsDefault =
	function () {
		return this.isLegacyNotification ? 1 === window.webkitNotifications.checkPermission() : "default" === window.Notification.permission
	};
NotificationController.prototype.enableDesktopNotification = function (a) {
	function c() {
		d.checkNotificationPermission() ? (Tawk.userController.set("desktopNotificationEnabled", !0), main.updateStorageSettings("notification", "on")) : (Tawk.userController.set("isNotificationOptionHidden", !0), Tawk.userController.set("desktopNotificationEnabled", !1), main.updateStorageSettings("notification",
			"off"));
		a && a(d.checkNotificationPermission())
	}

	var d = this;
	if (window.webkitNotifications || window.Notification) this.checkNotificationPermission() ? main.updateStorageSettings("notification", "on") : this.isLegacyNotification ? window.webkitNotifications.requestPermission(c) : window.Notification.requestPermission(c)
};
NotificationController.prototype.disableDesktopNotification = function () {
	main.updateStorageSettings("notification", "off")
};
NotificationController.prototype.createDesktopNotification = function (a, c, d) {
	var b,
		e, f = this;
	main.storageSettings && (main.storageSettings.notification && "off" !== main.storageSettings.notification) && (e = GLOBAL_STATIC_URL + "/images/" + (desktopConnector.enabled() ? "tawky-200w.png" : "dashboard-tawky.png"), a = decodeStr(a), c = decodeStr(c), this.isLegacyNotification ? (b = window.webkitNotifications.createNotification(e, a, c), b.show()) : b = new window.Notification(a, {
		body: c,
		icon: e
	}), this.desktopNotifications.push(b), b.onclick = function () {
		window.focus();
		desktopConnector.send("maximizeWindow");
		f.removeDesktopNotification(b);
		Tawk.liveMonitoringController.openChat(d);
		Tawk.agentChatController.openChat(d)
	}, setTimeout(function () {
		f.removeDesktopNotification(b)
	}, 1E4))
};
NotificationController.prototype.removeDesktopNotification = function (a) {
	-1 !== this.desktopNotifications.indexOf(a) && (this.desktopNotifications.removeObject(a), this.isLegacyNotification ? a.cancel() : a.close())
};
NotificationController.prototype.showMessageNotification = function (a, c, d) {
	var b = this, e = function () {
		if (0 === b.totalUnread && !b.isWindowFocused()) return b.resetNotification();
		b.isWindowFocused() ? b.resetNotification() : (Tawk.routing.titlePath.chatNotification = languageParser.translate("header", "unread_messages", {number: b.totalUnread}), Tawk.routing.setTitle())
	};
	if (!this.isWindowFocused()) {
		clearInterval(this.titleInterval);
		this.totalUnread++;
		try {
			this.createDesktopNotification(a, c, d)
		} catch (f) {
			this.disableDesktopNotification()
		}
		e();
		this.titleInterval = setInterval(e, 1E3)
	}
};
NotificationController.prototype.resetNotification = function () {
	var a = this;
	clearInterval(this.titleInterval);
	Tawk.routing.titlePath.chatNotification = null;
	Tawk.routing.setTitle();
	this.totalUnread = 0;
	this.desktopNotifications.forEach(function (c) {
		a.removeDesktopNotification(c)
	})
};
NotificationController.prototype.updateTotalForChatServed = function () {
	this.isWindowFocused() ? this.resetNotification() : 0 === this.totalUnread ? this.resetNotification() : this.totalUnread -= 1
};
NotificationController.prototype.notifyMonitoringTimeout = function () {
	var a;
	!this.isWindowFocused() && (main.storageSettings && main.storageSettings.notification &&
		"off" !== main.storageSettings.notification) && (a = GLOBAL_STATIC_URL + "/images/" + (desktopConnector.enabled() ? "tawky-200w.png" : "dashboard-tawky.png"), title = languageParser.translate("monitoring", "timeout_title"), message = languageParser.translate("monitoring", "timeout_message"), this.isLegacyNotification ? (a = window.webkitNotifications.createNotification(a, title, message), a.show()) : a = new window.Notification(title, {
		body: message,
		icon: a
	}), this.desktopNotifications.push(a), a.onclick = function () {
		window.focus();
		desktopConnector.send("maximizeWindow")
	})
};
NotificationController.prototype.notifyTicketEvent = function (a, c) {
	if (this.isDesktopNotificationEnabled()) {
		icon = GLOBAL_STATIC_URL + "/images/" + (desktopConnector.enabled() ? "tawky-200w.png" : "dashboard-tawky.png");
		if (c) title = "New Ticket Created"; else {
			if (!a.event) return;
			title = a.event.data && a.event.data.private ? a.event.crtrN + " posted a note" : a.event.crtrN + " posted a reply"
		}
		message = "#" + a.hId + " : " + a.subj;
		this.isLegacyNotification ? (notification = window.webkitNotifications.createNotification(icon, title, message),
			notification.show()) : notification = new window.Notification(title, {body: message, icon: icon});
		this.desktopNotifications.push(notification);
		notification.onclick = function () {
			window.focus();
			Tawk.conversationsController.openTicketDirect(a.pgid, c ? a._id : a.tId)
		}
	}
};