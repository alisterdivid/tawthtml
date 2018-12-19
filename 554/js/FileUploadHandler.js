FileUploadHandler.prototype.getUploadHandler = function (a) {
	var c = GLOBAL_UPLOAD_URL + "/upload/handle?_t=" + Date.now();
	if ("XDomainRequest" in window && null !== window.XDomainRequest) {
		var d = new XDomainRequest;
		d.open("get", c);
		d.onload = function () {
			var b = new ActiveXObject("Microsoft.XMLDOM"), c = $.parseJSON(d.responseText);
			b.async = !1;
			if (null === c || "undefined" === typeof c) c = $.parseJSON(data.firstChild.textContent);
			a(null, c)
		};
		d.onerror = function () {
			a(!0)
		};
		d.send()
	} else $.ajax({type: "GET", url: c, dataType: "json", crossDomain: !0, cache: !1}).done(function (b) {
		a(null, b)
	}).fail(function (b, c) {
		a(!0)
	})
};
FileUploadHandler.prototype.sendFileAjax = function (a, c, d) {
	var b;
	if (52428800 < a.size) return d(!0, "limit50");
	if ($("body").hasClass("mobile-detected") && 2097152 < a.size) return d(!0, "limit2");
	b = new FormData;
	b.append("upload", a, a.name || a.filename);
	$.ajax({type: "POST", url: c, data: b, cache: !1, contentType: !1, processData: !1}).done(function (a) {
		if (a.error) return d(!0);
		d()
	}).fail(function () {
		return d(!0)
	})
};
FileUploadHandler.prototype.sendFileIFrame = function (a, c, d, b) {
	a += "-iframe";
	var e = $('<iframe src="javascript:false;" name="' + a + '" id="' + a + '" />');
	e.hide();
	c.setAttribute("target", a);
	c.setAttribute("action", d);
	e.appendTo("body");
	e.load(function (a) {
		var c, d, k;
		try {
			d = e.contentWindow.document;
			k = d.body.innerHTML;
			"<pre>" == k.slice(0, 5).toLowerCase() && "</pre>" == k.slice(-6).toLowerCase() && (k = d.body.firstChild.firstChild.nodeValue);
			c = JSON.parse(k);
			if (c.error) return b(!0);
			b();
			e.remove()
		} catch (l) {
			b(!0), e.remove()
		}
	});
	c.submit()
};
FileUploadHandler.prototype.removeFileAjax = function (a, c) {
	$.ajax({type: "GET", url: a, cache: !1, contentType: !1, processData: !1}).done(function (a) {
		if (a.error) return c(!0);
		c()
	}).fail(function () {
		return c(!0)
	})
};
FileUploadHandler.prototype.uploadFile = function (a, c, d, b, e) {
	d = GLOBAL_UPLOAD_URL + "/upload/page/agent?handle=" + a + "&pageId=" + d + "&agentSessionId=" + Tawk.userController.sessionKey;
	b ? this.sendFileIFrame(a, c, d, e) : this.sendFileAjax(c, d, e)
};
FileUploadHandler.prototype.uploadBubbleFile = function (a, c,
                                                         d, b, e) {
	d = GLOBAL_UPLOAD_URL + "/upload/bubble?handle=" + a + "&pageId=" + d + "&agentSessionId=" + Tawk.userController.sessionKey;
	b ? this.sendFileIFrame(a, c, d, e) : this.sendFileAjax(c, d, e)
};
FileUploadHandler.prototype.removeBubbleFile = function (a, c, d) {
	this.removeFileAjax(GLOBAL_UPLOAD_URL + "/files/remove/bubble?file=" + a + "&pageId=" + c + "&agentSessionId=" + Tawk.userController.sessionKey, d)
};
FileUploadHandler.prototype.uploadProgress = function (a) {
	var c = $("#upload-" + a.handle);
	c.length && c.trigger("progressUpdate", a.progress)
};
FileUploadHandler.prototype.uploadComplete = function (a) {
	var c = $("#upload-" + a.handle);
	c.length && c.trigger("uploadComplete", a)
};
FileUploadHandler.prototype.uploadAttachment = function (a, c, d, b, e, f) {
	d = GLOBAL_UPLOAD_URL + "/upload/ticketing/attachment?handle=" + a + "&pageId=" + d + "&ticketId=" + b + "&agentSessionId=" + Tawk.userController.sessionKey;
	if (e) {
		a += "-iframe";
		var g = $('<iframe src="javascript:false;" name="' + a + '" id="' + a + '" />');
		g.hide();
		c.setAttribute("target", a);
		c.setAttribute("action", d);
		g.appendTo("body");
		g.load(function (a) {
			var b;
			try {
				var c = g.contentDocument ? g.contentDocument : g.contentWindow.document, d = c.body.innerHTML;
				"<pre>" == d.slice(0, 5).toLowerCase() && "</pre>" == d.slice(-6).toLowerCase() && (d = c.body.firstChild.firstChild.nodeValue);
				b = JSON.parse(d);
				if (b.error) return f(!0);
				f();
				g.remove()
			} catch (e) {
				f(!0), g.remove()
			}
		});
		c.submit()
	} else {
		if (52428800 < c.size) return f(!0, "limit50");
		if ($("body").hasClass("mobile-detected") && 2097152 < c.size) return f(!0, "limit2");
		a = new FormData;
		a.append("upload", c, c.name || c.filename);
		$.ajax({type: "POST", url: d, data: a, cache: !1, contentType: !1, processData: !1}).done(function (a) {
			if (a.error) return f(!0);
			f()
		}).fail(function () {
			return f(!0)
		})
	}
};
FileUploadHandler.prototype.uploadAgentChatFile = function (a, c, d, b, e) {
	d = GLOBAL_UPLOAD_URL + "/upload/agent-chat/agent?handle=" + a + "&groupId=" + d + "&agentSessionId=" + Tawk.userController.sessionKey;
	b ? this.sendFileIFrame(a, c, d, e) : this.sendFileAjax(c, d, e)
};