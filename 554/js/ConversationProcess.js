var ConversationProcess = function () {
	this.linkRegex = RegExp('(?:^(?:(?:[a-z]+:)?//)?(?:\\S+(?::\\S*)?@)?(?:localhost|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?$)', "i");
	this.agentBlockTemplate = Handlebars.compile('<div class="conversation-block"><p class="agent-name" agent="{{uid}}">{{{name}}}</p></div><div class="clear"></div>');
	this.visitorBlockTemplate = Handlebars.compile('<div class="conversation-block visitor"><p class="visitor-name">{{{name}}}</p></div><div class="clear"></div>');
	this.serverBlockTemplate = Handlebars.compile('<div class="conversation-block"><p class="">{{{name}}}</p></div><div class="clear"></div>');
	this.notificationBlockTemplate = Handlebars.compile('<div class="conversation-participant"><div class="msg-time">{{time}}</div><div class="conversation-content italic">{{I18n message context="visitors" variables=templateVars}}</div></div><div class="clear"></div>');
	this.eventBlockTemplate = Handlebars.compile('<div class="conversation-participant"><div class="msg-time">{{time}}</div><div class="conversation-content italic"><i class="fa  fa-bullhorn"></i> {{eventName}}</div><ul class="event-data">{{#each eventData}}<li>{{key}} : {{{value}}}</li>{{/each}}</ul></div><div class="clear"></div>');
	this.whisperBlockTemplate = Handlebars.compile('<div class="conversation-block whisper-message"><p class="agent-name">{{{name}}}</p></div><div class="clear"></div>')
};
ConversationProcess.prototype.addToMesssageBlock =
	function (a, c, d, b) {
		var e = this.parseText(a.m), f = null, g = null, h = a.co ? moment(a.co).format("HH:mm") : null;
		"a" === a.ut && (d = Tawk.agentsController.getAgentNameForMessage(a));
		d = encodeStr(decodeStr(d));
		if ("n" === a.t) {
			if ("AGENT_JOIN_CONVERSATION" === a.m || "AGENT_LEFT_CONVERSATION" === a.m) {
				if (a.uid === Tawk.userController.user.id) return;
				f = this.createNotificationMessageBlock({name: "<b>" + d + "</b>"}, h, a.m)
			} else "VISITOR_POSITIVE_RATING" === a.m || "VISITOR_NEGATIVE_RATING" === a.m || "VISITOR_REMOVED_RATING" === a.m ? f = this.createNotificationMessageBlock({rating: a.md.rt},
				moment(a.co).format("HH:mm"), a.m) : "VISITOR_NAVIGATION" === a.m ? f = this.createNavigationNotificationMessageBlock({
				pu: a.md.pu,
				pt: a.md.pt
			}, moment(a.co).format("HH:mm"), a.m) : "min" === a.m || "max" === a.m || "pop" === a.m || "pop_in" === a.m || "resize" === a.m ? f = this.createNotificationMessageBlock({}, h, a.m) : "EVENT" === a.m ? f = this.createEventMessageBlock(a.md, h) : "WEBRTC_SESSION_MISSED" === a.m ? (e = "a" === a.ut ? "VISITOR_WEBRTC_SESSION_MISSED" : "AGENT_WEBRTC_SESSION_MISSED", f = this.createNotificationMessageBlock({name: d ? d : a.n}, h, e)) :
				"WEBRTC_SESSION_JOINED" === a.m ? ("a" === a.ut ? (e = "AGENT_WEBRTC_SESSION_JOINED", d = "<b>" + (d ? d : a.n) + "</b>") : (e = "VISITOR_WEBRTC_SESSION_JOINED", d = d ? d : a.n), f = this.createNotificationMessageBlock({name: d}, h, e)) : "WEBRTC_SESSION_REJECTED" === a.m ? ("a" === a.ut ? (e = "AGENT_WEBRTC_SESSION_REJECTED", d = "<b>" + (d ? d : a.n) + "</b>") : e = "VISITOR_WEBRTC_SESSION_REJECTED", f = this.createNotificationMessageBlock({name: d}, h, e)) : "WEBRTC_SESSION_LEFT" == a.m ? ("a" === a.ut ? (e = "AGENT_WEBRTC_SESSION_LEFT", d = "<b>" + (d ? d : a.n) + "</b>") : e = "VISITOR_WEBRTC_SESSION_LEFT",
					f = this.createNotificationMessageBlock({name: d}, h, e)) : f = this.createNotificationMessageBlock({name: d ? d : a.n}, h, e);
			c = null
		} else if ("s" === a.ut) d = a.n + " (" + languageParser.translate("visitors", "system_message", {}, translation) + ")", f = this.createChatMessageBlock(d, a.ut), g = $('<div class="msg-time">' + h + '</div><div class="conversation-content">' + e + "</div>"), c = null; else if ("WEBRTC_SESSION_REQUESTED" === a.m) f = "a" === a.ut ? this.createNotificationMessageBlock({name: "<b>" + d + "</b>"}, h, "AGENT_WEBRTC_SESSION_REQUESTED") : this.createNotificationMessageBlock({
			name: d ?
				d : a.n
		}, h, "VISITOR_WEBRTC_SESSION_REQUESTED"), c = null; else {
			g = a.md && a.md.file ? this.parseUpload(a.md.file, b) : $('<div class="conversation-content">' + e + "</div>");
			if (!c || c.id !== a.uid || c.ut !== a.ut || a.md && a.md.rsc && c.rsc !== a.md.rsc || c.ao && (!a.md || !a.md.ao) || !c.ao && a.md && a.md.ao) f = a.md && a.md.ao ? $(this.whisperBlockTemplate({name: d})) : this.createChatMessageBlock(d ? d : a.n, a.ut, a.uid), c = {
				id: a.uid,
				rsc: a.md && a.md.rsc ? a.md.rsc : null,
				ut: a.ut,
				block: f,
				ao: a.md && a.md.ao ? a.md.ao : null
			};
			if (h && c) {
				if (!c.timeVal || c.timeVal && c.timeVal !==
					h) g = $('<div class="msg-time">' + h + "</div>").add(g), c.timeVal = h
			} else g = $('<div class="msg-time"><div class="small-transparent-spinner"></div></div>').add(g)
		}
		return {newBlock: f, newRow: g, lastBlock: c}
	};
ConversationProcess.prototype.parseUpload = function (a, c) {
	var d = formatFileSize(a.size), b = GLOBAL_FILE_STORAGE_URL + "/" + a.name, e = null;
	a.fileName = encodeStr(decodeStr(a.fileName));
	e = $('<div class="conversation-content padding-10"><p class="uploaded-file-name">' + a.fileName + '</p><a class="download-file" href="' + b +
		'" title="' + languageParser.translate("generic", "download_file") + '" target="_blank">' + d + ' <span style="text-transform: uppercase">' + a.type + '</span> <i class="fa fa-download"></i></a></div>');
	-1 !== ["jpeg", "png", "gif"].indexOf(a.type) && 2E6 >= a.size ? c ? $('<img class="uploaded-image" src="' + b + '"/>').insertAfter(e.find(".uploaded-file-name")) : ($('<div class="loader" style="background : url(' + GLOBAL_STATIC_URL + '/images/ajax-loader-big.gif); background-repeat: no-repeat; background-position: center; display: block; width : 60px; height : 60px;"></div>').insertAfter(e.find(".uploaded-file-name")),
		$('<img class="uploaded-image"/>').load(function () {
			e.parents("article").trigger("image-file-ready", {newRow: e, imageTag: $(this)})
		}).attr("src", b)) : -1 !== ["video/mp4", "video/ogg", "video/webm"].indexOf(a.mimeType) ? $('<video width="320px" height="auto" controls style="display: block;"><source src="' + b + '" type="' + a.mimeType + '"></source></video>').insertAfter(e.find(".uploaded-file-name")) : -1 !== ["audio/mp3", "audio/ogg"].indexOf(a.mimeType) && $('<audio controls style="display: block;"><source src="' + b + '" type="' +
		a.mimeType + '"></source></audio>').insertAfter(e.find(".uploaded-file-name"));
	return e
};
ConversationProcess.prototype.addToAgentMesssageBlock = function (a, c, d) {
	var b = this.parseText(a.m), e = null, f = null, g = a.co ? moment(a.co).format("HH:mm") : null,
		f = $('<div class="msg-time">' + (g ? g : '<div class="small-transparent-spinner"></div>') + '</div></div><div class="conversation-content">' + b + "</div>");
	c && c.id === a.uid ? g && c && (f = c.timeVal && c.timeVal === g ? $('<div class="conversation-content">' + b + "</div>") : $('<div class="msg-time">' +
		(g ? g : '<div class="small-transparent-spinner"></div>') + '</div></div><div class="conversation-content">' + b + "</div>")) : (e = this.createChatMessageBlock(d ? d : a.n, a.ut, a.uid), c = {
		id: a.uid,
		rsc: a.md && a.md.rsc ? a.md.rsc : null,
		ut: a.ut,
		block: e
	});
	g && c && (c.timeVal = g);
	return {newBlock: e, newRow: f, lastBlock: c}
};
ConversationProcess.prototype.createChatMessageBlock = function (a, c, d) {
	return "a" === c ? $(this.agentBlockTemplate({
		name: a,
		uid: d
	})) : "s" === c ? $(this.serverBlockTemplate({name: a})) : $(this.visitorBlockTemplate({name: a}))
};
ConversationProcess.prototype.createNotificationMessageBlock = function (a, c, d) {
	a = JSON.stringify(a);
	return $(this.notificationBlockTemplate({message: d, templateVars: a, time: c}))
};
ConversationProcess.prototype.createNavigationNotificationMessageBlock = function (a, c, d) {
	a.url = a.pt ? this.parseUrlWithTitle(a.pu, a.pt) : this.parseUrl(a.pu);
	a = JSON.stringify(a);
	return $(this.notificationBlockTemplate({message: d, templateVars: a, time: c}))
};
ConversationProcess.prototype.createEventMessageBlock = function (a, c) {
	var d = this.parseEventData(a.eventData),
		b = beautifyAPIKey(a.event);
	return $(this.eventBlockTemplate({eventName: b, eventData: d, time: c}))
};
ConversationProcess.prototype.parseEventData = function (a) {
	var c = [];
	a && Object.keys(a).forEach(function (d) {
		c.push({key: beautifyAPIKey(d), value: beautifyAPIValue(a[d])})
	});
	return c
};
ConversationProcess.prototype.parseText = function (a) {
	var c = /\[option\]/g, d = /\n/g;
	if ("undefined" !== typeof a || null !== a) a = a.toString();
	return "string" === typeof a ? (a = a.replace(c, '<input type="radio" disabled="disabled" class="survey-option"/>'),
		a = a.replace(d, "<br/>"), a = this.createUrl(a.split(/\s/), " "), a = emojione.toImage(a)) : ""
};
ConversationProcess.prototype.createUrl = function (a, c) {
	var d, b = this, e = /^((mailto:){0,1}[a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]+)$/,
		f = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?\/([a-zA-Z0-9!$&'()*+.=-_~:@\/\?#]+)+)\b/gi;
	a.forEach(function (c, h) {
		-1 !== c.indexOf("<br/>") ? (d = c.split(/<br\/>/),
			c = b.createUrl(d, "<br/>")) : c.match(e) ? c = c.replace(e, b.parseEmail) : (c = c.replace(b.linkRegex, b.parseUrl), c = c.replace(f, b.parseUrl));
		a[h] = c
	});
	return a.join(c)
};
ConversationProcess.prototype.parseEmail = function (a) {
	var c = "";
	if (emojione.toImage(a) !== a) return a;
	-1 === a.indexOf("mailto:") && (c = "mailto:");
	return '<a href="' + (c + a) + '" title="' + (c + a) + '">' + a + "</a> "
};
ConversationProcess.prototype.parseUrl = function (a) {
	var c = "";
	if (emojione.toImage(a) !== a) return a;
	0 !== a.toLowerCase().indexOf("http") && 0 !== a.toLowerCase().indexOf("ftp") &&
	(c = "http://");
	return -1 !== a.indexOf(window.location.host + "/#/") ? '<a href="' + a + '" class="change-route">' + a + "</a> " : '<a target="_blank" href="' + (c + a) + '" title="' + (c + a) + '">' + a + "</a> "
};
ConversationProcess.prototype.parseUrlWithTitle = function (a, c) {
	if (-1 === a.indexOf("http") || 0 < a.indexOf("http")) a = "http://" + a;
	return '<a target="_blank" href="' + a + '" title="' + a + '">' + (c ? encodeStr(c) : a) + "</a> "
};
ConversationProcess.prototype.processAgentPresence = function (a, c, d, b) {
	var e = a.uid + a.md.rsc, f = c[e];
	if (f) {
		if (f.seqTime >
			a.md.seq.time || f.seqTime === a.md.seq.time && f.seqInc > a.md.seq.inc) return;
		d[e].seqTime = a.md.seq.time;
		d[e].seqInc = a.md.seq.inc
	} else d[e] = {aid: a.uid, rsc: a.md.rsc, seqTime: a.md.seq.time, seqInc: a.md.seq.inc};
	"AGENT_JOIN_CONVERSATION" === a.m ? (d = {
		displayName: a.n,
		aliasId: a.md.pid,
		aliasImage: a.md.pi,
		positionTitle: a.md.pst
	}, c[e] = {
		displayName: a.n,
		aliasId: a.md.pid
	}, b[d.aliasId] = d) : "AGENT_LEFT_CONVERSATION" === a.m && delete c[e]
};
ConversationProcess.prototype.convertTransciptToCopyFormat = function (a, c, d) {
	a = this.processHistoryToText(a,
		c, d);
	a = decodeStr(a);
	a = a.replace(/<b>|<\/b>/g, "");
	a = a.replace(/<i>|<\/i>/g, "");
	a = a.replace(/<br \/>/g, "\r\n");
	return a = a.replace(/&emsp;/g, "\t")
};
ConversationProcess.prototype.convertTransciptToPrintFormat = function (a, c, d) {
	return this.processHistoryToText(a, c, d, !0)
};
ConversationProcess.prototype.processHistory = function (a, c, d, b) {
	var e, f, g = !1, h = null, k = {}, l = {}, m = {}, n = [], p = [], q = this, r = 1, s = [];
	a.forEach(function (a) {
		var b;
		if ("n" === a.t) if ("a" === a.ut && ("AGENT_JOIN_CONVERSATION" === a.m || "AGENT_LEFT_CONVERSATION" ===
				a.m)) d && conversationProcess.processAgentPresence(a, k, l, m); else {
			if ("v" === a.ut) if ("CHAT_ENDED" === a.m) d && (k = {}, l = {}), h = !1, g = !0, r++, p.insertAt(0, {
				title: languageParser.translate("visitors", "chat_end"),
				time: moment(a.co).format("HH:mm")
			}); else if ("VISITOR_NAVIGATION" === a.m) if (!f || f && f !== a.md.pu) {
				if (!a.md.pu || -1 !== a.md.pu.indexOf("static.tawk")) return;
				f = a.md.pu;
				d && (a.md.pt = decodeStr(a.md.pt));
				p.insertAt(0, {
					title: languageParser.translate("visitors", a.m, {url: q.parseUrlWithTitle(a.md.pu, a.md.pt)}),
					time: moment(a.co).format("HH:mm")
				})
			} else {
				if ("VISITOR_NAVIGATION" ===
					a.m && f === a.md.pu) return
			} else "VISITOR_RATING" === a.m ? (a.m = 0 === a.md.rt ? "VISITOR_REMOVED_RATING" : 1 === a.md.rt ? "VISITOR_POSITIVE_RATING" : "VISITOR_NEGATIVE_RATING", p.insertAt(0, {
				title: languageParser.translate("visitors", a.m),
				time: moment(a.co).format("HH:mm")
			})) : "EVENT" === a.m && p.insertAt(0, {
				title: beautifyAPIKey(a.md.event),
				time: moment(a.co).format("HH:mm"),
				data: q.parseEventData(a.md.eventData)
			})
		} else g = !1;
		h || ("c" !== a.t || "s" === a.ut) || (h = !0, p.insertAt(0, {
			title: languageParser.translate("visitors", "chat_started"),
			time: moment(a.co).format("HH:mm")
		}));
		d || (a.m = encodeStr(a.m));
		"WEBRTC_SESSION_REQUESTED" === a.m ? p.insertAt(0, {
			title: languageParser.translate("visitors", "a" === a.ut ? "AGENT_WEBRTC_SESSION_REQUESTED" : "VISITOR_WEBRTC_SESSION_REQUESTED", {name: a.n}),
			time: moment(a.co).format("HH:mm")
		}) : "WEBRTC_SESSION_JOINED" === a.m || "WEBRTC_SESSION_MISSED" === a.m ? p.insertAt(0, {
			title: languageParser.translate("visitors", "a" === a.ut ? "AGENT_" + a.m : "VISITOR_" + a.m, {name: a.n}),
			time: moment(a.co).format("HH:mm")
		}) : "WEBRTC_SESSION_REJECTED" ===
		a.m && a.uid === Tawk.userController.user.id ? p.insertAt(0, {
			title: languageParser.translate("visitors", "a" === a.ut ? "AGENT_" + a.m : "VISITOR_" + a.m, {name: a.n}),
			time: moment(a.co).format("HH:mm")
		}) : "WEBRTC_SESSION_LEFT" !== a.m || a.uid !== Tawk.userController.user.id && "v" !== a.ut || p.insertAt(0, {
			title: languageParser.translate("visitors", "a" === a.ut ? "AGENT_" + a.m : "VISITOR_" + a.m, {name: a.n}),
			time: moment(a.co).format("HH:mm")
		});
		if ("WEBRTC_CALL" === a.m && a.md && a.md.webrtc) return b = $(HandlebarsTemplates.callDetailsView({callId: a.md.clid})),
			d ? n.pushObject(b) : n.pushObject(b[0].outerHTML), s.pushObject({
			callId: a.md.clid,
			callView: b
		}), e = null;
		b = conversationProcess.addToMesssageBlock(a, e, c, !0);
		if ("n" === a.t || "WEBRTC_SESSION_REQUESTED" === a.m) return e && (d ? n.pushObject(e.block) : n.pushObject(e.block[0].outerHTML)), b && b.newBlock && (d ? n.pushObject(b.newBlock) : n.pushObject(b.newBlock[0].outerHTML)), e = null;
		if ("s" === a.ut) return e && (d ? n.pushObject(e.block) : n.pushObject(e.block[0].outerHTML)), b.newBlock.first().append(b.newRow), e = b.lastBlock, d ? n.pushObject(b.newBlock) :
			n.pushObject(b.newBlock[0].outerHTML), e;
		b.newBlock ? (e && (d ? n.pushObject(e.block) : n.pushObject(e.block[0].outerHTML)), b.newBlock.first().append(b.newRow), e = b.lastBlock) : !b.newBlock && e && (e.id === a.uid && ("a" === a.ut || a.md && a.md.rsc && b.lastBlock.rsc === a.md.rsc || "v" === a.ut) && e.ut === a.ut) && e.block.first().append(b.newRow)
	});
	e && e.block && (d ? n.pushObject(e.block) : n.pushObject(e.block[0].outerHTML));
	g || d || (p.insertAt(0, {
		title: languageParser.translate("visitors", "chat_end"),
		time: moment(b).format("HH:mm")
	}), g = !0);
	return {
		transcriptData: n,
		lastBlock: e,
		currentPageUrl: f,
		agentPrensence: k,
		agents: l,
		profiles: m,
		timeline: p,
		chatEnded: g,
		chatStarted: h,
		chatEndVersion: r,
		callInfo: s
	}
};
ConversationProcess.prototype.processHistoryToText = function (a, c, d, b) {
	var e, f = this, g = "";
	c = encodeStr(decodeStr(c));
	a.forEach(function (a) {
		var k;
		k = a.m;
		a.n = encodeStr(decodeStr(a.n));
		if ("WEBRTC_SESSION_REQUESTED" === a.m) a.m = "a" === a.ut ? "AGENT_WEBRTC_SESSION_REQUESTED" : "VISITOR_WEBRTC_SESSION_REQUESTED", k = languageParser.translate("visitors", a.m, {name: a.n});
		else if ("WEBRTC_SESSION_MISSED" === a.m) a.m = "a" === a.ut ? "VISITOR_WEBRTC_SESSION_MISSED" : "AGENT_WEBRTC_SESSION_MISSED", k = languageParser.translate("visitors", a.m, {name: a.n}); else if ("WEBRTC_SESSION_JOINED" === a.m) a.m = "a" === a.ut ? "AGENT_WEBRTC_SESSION_JOINED" : "VISITOR_WEBRTC_SESSION_JOINED", k = languageParser.translate("visitors", a.m, {name: a.n}); else if ("WEBRTC_SESSION_REJECTED" === a.m) a.m = "a" === a.ut ? "AGENT_WEBRTC_SESSION_REJECTED" : "VISITOR_WEBRTC_SESSION_REJECTED", k = languageParser.translate("visitors", a.m,
			{name: a.n}); else if ("WEBRTC_SESSION_LEFT" == a.m) a.m = "a" === a.ut ? "AGENT_WEBRTC_SESSION_LEFT" : "VISITOR_WEBRTC_SESSION_LEFT", k = languageParser.translate("visitors", a.m, {name: a.n}); else if ("WEBRTC_CALL" === a.m && a.md && a.md.webrtc) k = "Video/voice call started"; else if ("n" === a.t) {
			k = {name: a.n};
			if ("v" === a.ut) {
				if ("VISITOR_NAVIGATION" === a.m) {
					if (!e || e && e !== a.md.pu) {
						if (!a.md.pu || -1 !== a.md.pu.indexOf("static.tawk")) return;
						e = a.md.pu
					} else if ("VISITOR_NAVIGATION" === a.m && e === a.md.pu) return;
					k = {url: e}
				} else "VISITOR_RATING" ===
				a.m && (a.m = 0 === a.md.rt ? "VISITOR_REMOVED_RATING" : 1 === a.md.rt ? "VISITOR_POSITIVE_RATING" : "VISITOR_NEGATIVE_RATING");
				if ("VISITOR_REMOVED_RATING" === a.m || "VISITOR_POSITIVE_RATING" === a.m || "VISITOR_NEGATIVE_RATING" === a.m) k = {}
			}
			if (k = languageParser.translate("visitors", a.m, k)) k = k.replace(/<b>|<\/b>/g, ""), k = "<i>" + k + "</i>"
		} else {
			if (a.md && a.md.ao) return;
			k = "v" === a.ut ? "<i>" + c + "</i>" : "s" === a.ut ? a.n + " (" + languageParser.translate("visitors", "system_message") + ")" : "<b>" + a.n + "</b>";
			d || (d = moment(a.co).format("dddd, MMMM D YYYY, HH:mm"));
			k += " : ";
			k = a.md && a.md.file ? k + (GLOBAL_FILE_STORAGE_URL + "/" + a.md.file.name) : k + a.m
		}
		"EVENT" === a.m && (k = a.md.event, a.md.eventData && (k += "\n" + JSON.stringify(a.md.eventData)));
		k && (k = k.replace(/\n/g, "<br />"), k = k.replace(/\[option\]/g, "&emsp;*"), b && (k = f.parseText(k), a.md && a.md.file && (k += '<br/ ><img src="' + GLOBAL_FILE_STORAGE_URL + "/" + a.md.file.name + '" style="max-width: 200px; max-height :200px; border : 1px solid #ddd; margin : 3px 0;" />')), g += "[" + moment(a.co).format("HH:mm") + "] ", g += k + "<br />")
	});
	return g =
		d ? languageParser.translate("history", "conversation_started_on", {time: d}) + "<br />================================================================<br /><br />" + g : languageParser.translate("visitors", "no_conversation", {}) + "<br />================================================================<br /><br />" + g
};
ConversationProcess.prototype.processAgentHistory = function (a) {
	var c, d = null, b = null, e = [];
	Array.isArray(a) || (a = [a]);
	a.forEach(function (a) {
		a.c.forEach(function (a) {
			var f;
			a.ut = "a";
			f = conversationProcess.addToAgentMesssageBlock(a,
				c, name);
			b = moment(a.co).format("DD MMM YYYY");
			d && d === b || (e.pushObject('<div class="date-container"><div class="line"></div><div class="date">' + b + "</div></div>"), d = b);
			f.newBlock ? (c && e.pushObject(c.block[0].outerHTML), f.newBlock.first().append(f.newRow), c = f.lastBlock) : !f.newBlock && c && c.id === a.uid && c.block.first().append(f.newRow)
		});
		c && c.block && e.pushObject(c.block[0].outerHTML)
	});
	return {transcriptData: e, lastBlock: c}
};
ConversationProcess.prototype.processPreviousConversation = function (a, c, d, b) {
	var e, f,
		g = moment().endOf("day"), h = !1, k = !1;
	d && (e = d.split(":"), f = parseInt(e[1], 10), c[0].cid < e[0] && (e = null));
	d = b ? c : c.reverse();
	for (var l = 0; l < d.length; l++) {
		c = b ? d[l].c.reverse() : d[l].c;
		e && e[0] <= d[l].cid && (k = !0);
		for (var m = 0; m < c.length; m++) {
			var n, p, q, r, s;
			p = c[m];
			q = moment(p.co);
			p.m = this.parseText(p.m);
			dayDiff = g.diff(q, "days");
			n = 0 === dayDiff ? languageParser.translate("generic", "today") : 7 > dayDiff ? moment(p.co).format("dddd") : moment(p.co).format("DD MMM YYYY");
			r = a.findProperty("dayDiff", dayDiff);
			q = {
				m: p.m, t: moment(p.co).format("HH:mm"),
				timestamp: p.co, co: moment(p.co).format("HH:mm")
			};
			if (k && e[0] === d[l].cid && f === p.cv) {
				if (m !== c.length - 1 || m === c.length - 1 && l !== d.length - 1) q.isNew = !0;
				k = !1;
				h = !0;
				e = null
			}
			r ? (s = b ? r.inner.get("firstObject") : r.inner.get("lastObject"), s.agentId !== p.uid ? (s = {
				messages: [q],
				agentId: p.uid,
				firstTimestamp: p.co,
				agentName: p.uid === Tawk.userController.user.id ? "Me" : p.n
			}, b ? r.inner.insertAt(0, s) : r.inner.pushObject(s)) : b ? (p = s.messages.get("firstObject")) ? (p && p.t === q.t && (p.co = ""), s.messages.insertAt(0, q)) : s.messages.pushObject(q) :
				((p = s.messages.get("lastObject")) && p.t === q.co && (q.co = ""), s.messages.pushObject(q))) : (s = {
				messages: [q],
				agentId: p.uid,
				firstTimestamp: p.co,
				agentName: p.uid === Tawk.userController.user.id ? "Me" : p.n
			}, r = Ember.Object.create({
				date: n,
				inner: [s],
				dayDiff: dayDiff
			}), a.length && a.get("firstObject").dayDiff < dayDiff ? a.insertAt(0, r) : a.pushObject(r))
		}
	}
	return !k || h ? !1 : !0
};
ConversationProcess.prototype.processWebRTCCallBlock = function (a, c, d, b, e) {
	var f, g, h, k = !1, l = {}, m = {}, n = [], p = this;
	c = {callId: a, propertyId: c};
	e = e || function () {
	};
	if (!b && (d = $("#" + a), 0 === d.length)) return e();
	d.find(".loader").removeClass("hidden");
	d.find(".webrtc-error").addClass("hidden");
	d.find(".webrtc-info").addClass("hidden");
	socketConnector.getCallInfo(c, function (a, b) {
		a ? (d.find(".loader").addClass("hidden"), d.find(".webrtc-error").removeClass("hidden")) : (g = b.events.pop(), b.events.forEach(function (a) {
			var b;
			"joined" === a.t && "a" === a.p.t ? (b = Tawk.agentsController.getName(a.p.id), a.p.id === Tawk.userController.user.id && (k = !0), l[a.p.id] = b, delete m[a.p.id]) : "left" ===
				a.t && "a" === a.p.t && (a.p.id === Tawk.userController.user.id && (k = !1), b = l[a.p.id], m[a.p.id] = b, delete l[a.p.id])
		}), f = b.f.vid ? "fa-video-camera" : b.f.scrn ? "fa-desktop" : "fa-phone", b.so && moment(b.so).format("HH:mm"), h = {
			ver: b.ver,
			joinedParticipants: l,
			leftParticipants: m,
			startedOn: b.so,
			caller: b.cllr,
			isCurrentlyJoined: k,
			status: b.stts,
			isIgnored: !!b.ignr
		}, Object.keys(l).forEach(function (a) {
			a !== Tawk.userController.user.id && n.pushObject(l[a])
		}), d.find(".webrtc-call-type .fa").addClass(f), d.find(".loader").addClass("hidden"),
			n.length ? (d.find(".webrtc-call-participants-details").removeClass("hidden"), d.find(".webrtc-call-participants").html(n.join(", "))) : (d.find(".webrtc-call-participants-details").addClass("hidden"), d.find(".webrtc-call-participants").html("")), p.displayCallInformation(g, h, d), e(null, h))
	})
};
ConversationProcess.prototype.displayCallInformation = function (a, c, d) {
	var b, e, f = !1, g = [], h = !0;
	b = moment(c.startedOn);
	"joined" !== a.t && "left" !== a.t || "a" !== a.p.t ? "completed" === a.t ? (a.mssd || a.rjctd ? (e = a.rjctd ? languageParser.translate("visitors",
		"rejected_call") : languageParser.translate("visitors", ("v" === c.caller.t ? "agent_" : "visitor_") + "missed"), "a" === c.caller.t && d.find(".webrtc-call-end-details").html("Started by " + Tawk.agentsController.getName(c.caller.id)).removeClass("hidden"), a = languageParser.translate("visitors", "call_start_time", {time: b.format("HH:mm")}), d.find(".webrtc-call-end-details").html(a).removeClass("hidden"), d.find(".webrtc-call-header").addClass("missed"), d.find(".webrtc-call-participants-details").addClass("hidden"), d.find(".webrtc-call-participants").html("")) :
		(e = languageParser.translate("visitors", "completed_call"), h = moment(a.ts).from(moment(b), !0), a = languageParser.translate("visitors", "call_duration_details", {
			time: b.format("HH:mm"),
			duration: "<b>" + h + "</b>"
		}), Object.keys(c.joinedParticipants).forEach(function (a) {
			g.pushObject(c.joinedParticipants[a])
		}), Object.keys(c.leftParticipants).forEach(function (a) {
			g.pushObject(c.leftParticipants[a])
		}), d.find(".webrtc-call-end-details").html(a).removeClass("hidden"), d.find(".webrtc-call-participants-details").removeClass("hidden"),
			d.find(".webrtc-call-participants").html(g.join(", "))), h = !1) : "in-progress" === a.t ? e = languageParser.translate("visitors", "inprogress_call") : "ringing" === a.t && (h = "a" === c.caller.t && c.caller.id !== Tawk.userController.user.id ? !0 : !1, f = !0, e = languageParser.translate("visitors", ("a" === c.caller.t ? "agent_" : "visitor_") + "ringing"), a = languageParser.translate("visitors", "call_start_time", {time: b.format("HH:mm")}), d.find(".webrtc-call-end-details").html(a).removeClass("hidden")) : (b = Tawk.agentsController.getName(a.p.id),
		"joined" === a.t ? (a.p.id === Tawk.userController.user.id && (c.isCurrentlyJoined = !0), c.joinedParticipants[a.p.id] = b, delete c.leftParticipants[a.p.id]) : "left" === a.t && (a.p.id === Tawk.userController.user.id && (c.isCurrentlyJoined = !1), c.leftParticipants[a.p.id] = b, delete c.joinedParticipants[a.p.id]), Object.keys(c.joinedParticipants).forEach(function (a) {
		a !== Tawk.userController.user.id && g.pushObject(c.joinedParticipants[a])
	}), g.length ? (d.find(".webrtc-call-participants-details").removeClass("hidden"), d.find(".webrtc-call-participants").html(g.join(", "))) :
		(d.find(".webrtc-call-participants-details").addClass("hidden"), d.find(".webrtc-call-participants").html("")));
	f && c.isIgnored || h && !c.isCurrentlyJoined ? d.find(".webrtc-join-container").removeClass("hidden") : d.find(".webrtc-join-container").addClass("hidden");
	d.find(".webrtc-info").removeClass("hidden");
	d.find(".webrtc-call-header").html(e)
};
var conversationProcess = new ConversationProcess;