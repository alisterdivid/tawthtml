var DesktopConnector = function () {
	if (this._enabled = void 0 !== window.parent && "function" === typeof window.parent.postMessage && "function" ===
			typeof window.addEventListener && document.cookie && -1 !== document.cookie.indexOf("isDesktopApp=y")) -1 !== document.cookie.indexOf("isPaypalFriendly=y") && (this.isPaypalFriendly = !0), -1 !== document.cookie.indexOf("isWebRTCFriendly=y") && (this.isWebRTCFriendly = !0), this.focused = !1, window.addEventListener("message", this._onWindowMessage.bind(this)), this.send("requestWindowIsFocused")
};
DesktopConnector.prototype.send = function () {
	if (this._enabled) {
		var a = arguments[0], c = Array.prototype.slice.call(arguments, 1);
		window.parent.postMessage({
			cmd: a,
			payload: c
		}, "*")
	}
};
DesktopConnector.prototype._onWindowMessage = function (a) {
	var c, d;
	try {
		c = JSON.parse(a.data)
	} catch (b) {
		return
	}
	if (void 0 !== c.cmd) {
		void 0 !== c.cb && (d = function () {
			window.parent.postMessage({
				cmd: "__callback",
				payload: Array.prototype.slice.call(arguments, 0),
				cb: c.cb
			}, "*")
		});
		if ("changeAgentStatus" === c.cmd) {
			if (Tawk.visitorChatController.hasJoinedConversation() && "i" === c.payload[0]) return alert(languageParser.translate("action_messages", "status_invisible_in_chat")), d(!0);
			Tawk.userController.changeStatus(c.payload[0],
				d)
		}
		"appWindowFocus" === c.cmd && (this.focused = c.payload[0])
	}
};
DesktopConnector.prototype.isFocused = function () {
	return !0 === this.focused
};
DesktopConnector.prototype.enabled = function () {
	return this._enabled
};
DesktopConnector.prototype.canUsePaypal = function () {
	return this._enabled && this.isPaypalFriendly || !this._enabled
};
DesktopConnector.prototype.canUseWebRTC = function () {
	return this._enabled && this.isWebRTCFriendly || !this._enabled
};