AudioPlayer.prototype.preloadSounds = function () {
	var a = this;
	this.isAudioCapable && "" !== this.fileExtension && this.playableFiles.forEach(function (c) {
		a.add(c.value, {n: c.value, vl: 50})
	})
};
AudioPlayer.prototype.add = function (a, c) {
	c.n && "none" !== c.n && this.isAudioCapable &&
	(this.audioFiles[a] = this.audioContext ? new AudioContextPlayer(c, this.fileExtension, a, this) : new HtmlAudioPlayer(c, this.fileExtension))
};
AudioPlayer.prototype.remove = function (a) {
	delete this.audioFiles[a]
};
AudioPlayer.prototype.play = function (a) {
	this.audioFiles[a] && this.audioFiles[a].play()
};
AudioPlayer.prototype.stop = function (a) {
	this.audioFiles[a] && this.audioFiles[a].stop()
};
AudioPlayer.prototype.reset = function (a) {
	this.audioFiles[a] && this.audioFiles[a].reset()
};
AudioPlayer.prototype.update = function (a,
                                         c) {
	"none" !== c.n && (this.audioFiles[a] ? this.audioFiles[a].update(c) : this.add(a, c))
};
AudioPlayer.prototype.turnOffSound = function () {
	var a = this;
	Object.keys(this.audioFiles).forEach(function (c) {
		a.audioFiles[c] && a.audioFiles[c].turnOffSound()
	})
};
AudioPlayer.prototype.turnOnSound = function () {
	var a = this;
	Object.keys(this.audioFiles).forEach(function (c) {
		a.audioFiles[c] && a.audioFiles[c].turnOnSound()
	})
};
var getPlayableFileExtensions = function () {
	var a = new Audio;
	return [{
		fileExtension: ".mp3", canPlayType: a.canPlayType('audio/mpeg; codecs="mp3"'),
		preference: /MSIE/.test(navigator.userAgent) || /Edge/.test(navigator.userAgent) ? 3 : 2
	}, {
		fileExtension: ".ogg",
		canPlayType: a.canPlayType('audio/ogg; codecs="vorbis"'),
		preference: 4
	}, {
		fileExtension: ".m4a",
		canPlayType: a.canPlayType('audio/mp4; codecs="mp4a.40.5"'),
		preference: /MSIE/.test(navigator.userAgent) || /Edge/.test(navigator.userAgent) ? 2 : 3
	}, {
		fileExtension: ".wav",
		canPlayType: a.canPlayType('audio/wav; codecs="1"'),
		preference: 1
	}].filter(function (a) {
		return "" !== a.canPlayType
	}).sort(function (a, d) {
		return "maybe" ===
		a.canPlayType && "probably" === d.canPlayType ? -1 : "probably" === a.canPlayType && "maybe" === d.canPlay ? 1 : a.preference > d.preference ? -1 : a.preference < d.preference ? 1 : 0
	})
}, HtmlAudioPlayer = function (a, c) {
	var d = new Audio(GLOBAL_STATIC_URL + "/sounds/" + a.n + c), b = 0, e = a.loop ? a.loop : 0,
		f = 0 === a.vl ? 0 : a.vl / 100, g = !1;
	d.load();
	d.volume = f;
	d.addEventListener("ended", function () {
		!g && (e && ("infinity" === e || b < e)) && (this.currentTime = 0, d.load(), this.play());
		b++
	}, !1);
	this.reset = function () {
		b = 0
	};
	this.play = function () {
		g = !1;
		this.reset();
		d.autoplay =
			!0;
		d.load();
		d.play();
		b++
	};
	this.stop = function () {
		g = !0;
		d.pause();
		this.reset()
	};
	this.update = function (a) {
		a.n && d.setAttribute("src", GLOBAL_STATIC_URL + "/sounds/" + a.n + c);
		null !== a.vl && (f = 0 === a.vl ? 0 : a.vl / 100, d.volume = f);
		a.loop && (this.reset(), e = a.loop)
	};
	this.turnOffSound = function () {
		d.volume = 0
	};
	this.turnOnSound = function () {
		d.volume = f
	}
}, AudioContextPlayer = function (a, c, d, b) {
	var e = 0 === a.vl ? 0 : a.vl / 100, f = !1, g = 0;
	this.audioPlayer = b;
	this.sourceLoop = a.loop ? a.loop : 0;
	this.sourcePath = GLOBAL_STATIC_URL + "/sounds/" + a.n + c;
	this.sourceVolume =
		e;
	this.prevFileName = a.n;
	this.gainNode = this.source = this.buffer = null;
	this.isSoundOff = !1;
	this.reset = function () {
		this.stop()
	};
	this.playSource = function (a, b) {
		var c = this;
		this.buffer instanceof AudioBuffer && this.audioPlayer instanceof AudioPlayer && (this.gainNode = this.audioPlayer.audioContext.createGain(), this.gainNode.gain.value = this.isSoundOff || b !== b || 0 > b || 1 < b ? 0 : b, this.source = this.audioPlayer.audioContext.createBufferSource(), this.source.buffer = this.buffer, this.source.connect(this.gainNode), this.gainNode.connect(this.audioPlayer.audioContext.destination),
			this.source.start(0), f = !1, !a && ("infinity" === this.sourceLoop || ++g < this.sourceLoop) && (this.source.onended = function () {
			f || c.playSource(a, c.sourceVolume)
		}))
	};
	this.play = function () {
		this.stop();
		this.playSource(!1, this.sourceVolume)
	};
	this.stop = function () {
		if (this.source) try {
			this.source.stop(0), this.source.onended = function () {
			}, this.source = null, f = !0, g = 0
		} catch (a) {
			throw Error(a);
		}
	};
	this.update = function (a) {
		null !== a.vl && (this.sourceVolume = 0 === a.vl ? 0 : a.vl / 100);
		a.loop && (this.sourceLoop = a.loop);
		a.n && a.n !== this.prevFileName &&
		(this.sourcePath = GLOBAL_STATIC_URL + "/sounds/" + a.n + c, this.prevFileName = a.n, this.loadBuffer())
	};
	this.turnOffSound = function () {
		this.isSoundOff = !0;
		this.gainNode && (this.gainNode.gain.value = 0)
	};
	this.turnOnSound = function () {
		this.isSoundOff = !1;
		this.gainNode && (this.gainNode.gain.value = this.sourceVolume)
	};
	this.loadBuffer = function () {
		var a = new XMLHttpRequest, b = this;
		a.open("GET", b.sourcePath, !0);
		a.responseType = "arraybuffer";
		a.onload = function () {
			b.audioPlayer.audioContext.decodeAudioData(a.response, function (a) {
				a &&
				(b.buffer = a, b.isReadyForInit || (b.audioPlayer.eventUsedForInit = d, b.audioPlayer.isReadyForInit = !0))
			}, function (a) {
				throw Error(a);
			})
		};
		a.onerror = function (a) {
			throw Error("BufferLoader: XHR error on " + b.sourcePath);
		};
		a.send()
	};
	this.loadBuffer()
}, errorSave = function (a, c) {
	var d = c || languageParser.translate("form_validation_messages", "error_save");
	$(a).append('<div class="alert alert-danger fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa fa-ban"></i>' + d + "</div>")
}, successSave =
	function (a, c) {
		var d = c || languageParser.translate("form_validation_messages", "success_update");
		$(a).append('<div class="alert alert-success fade in"><button class="close" data-dismiss="alert">\u00d7</button><i class="fa-fw fa fa-check"></i>' + d + "</div>")
	}, addPlaceholderSupport = function (a) {
	"undefined" !== typeof $.fn.placeholder && $.isFunction($.fn.placeholder) && ($(a).find("input").placeholder(), $(a).find("textarea").placeholder())
};
Ember.TextArea.reopen({
	placeholder: function () {
		if (this.get("placeholderKey")) {
			var a =
				Handlebars.helpers.I18n.apply(this, ["placeholderKey", {
					hash: {context: "placeholders"},
					contexts: [this],
					data: {}
				}]);
			return a ? a.toString() : ""
		}
	}.property("placeholderKey")
});
Ember.TextField.reopen({
	placeholder: function () {
		if (this.get("placeholderKey")) {
			var a = Handlebars.helpers.I18n.apply(this, ["placeholderKey", {
				hash: {context: "placeholders"},
				contexts: [this],
				data: {}
			}]);
			return a ? a.toString() : ""
		}
	}.property("placeholderKey")
});
var triggerType = ["widget_loaded", "chat_requested", "send_message"], stringsCheck = ["eq",
		"not", "contains", "ncontains"], limitStringsCheck = ["eq", "not"],
	integerCheck = "eq not lt gt lte gte".split(" "), mainConditionsOptions = {
		time_date: {
			hour_of_day: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "hour_of_day_hint", {}, translation),
				values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
			},
			day_of_week: {
				conditional_select: "integer",
				values: [{id: 0, value: "sunday"}, {id: 1, value: "monday"}, {id: 2, value: "tuesday"}, {
					id: 3,
					value: "wednesday"
				}, {id: 4, value: "thursday"}, {
					id: 5,
					value: "friday"
				}, {id: 6, value: "saturday"}]
			},
			time_on_page: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "visitor_time_page_hint", {}, translation),
				isTime: !0,
				values: [0, 10, 20, 30, 45, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 3600]
			},
			time_on_site: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "visitor_time_site_hint", {}, translation),
				isTime: !0,
				values: [0, 10, 20, 30, 45, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 3600]
			},
			still_on_site: {
				conditional_select: "integer_no_op",
				hint: languageParser.translate("triggers",
					"still_on_hint", {}, translation),
				isTime: !0,
				values: [0, 10, 20, 30, 45, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 3600]
			},
			still_on_page: {
				conditional_select: "integer_no_op",
				hint: languageParser.translate("triggers", "still_on_hint", {}, translation),
				isTime: !0,
				values: [0, 10, 20, 30, 45, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 3600]
			}
		},
		visitor_location: {
			ip: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_ip_hint", {}, translation)
			},
			host_name: {
				conditional_select: "string", hint: languageParser.translate("triggers",
					"visitor_host_hint", {}, translation), tolowercase: !0
			},
			city: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_city_hint", {}, translation),
				tolowercase: !0
			},
			country: {
				conditional_select: "limit_string",
				hint: languageParser.translate("triggers", "country_name_hint", {}, translation),
				values: countryList
			}
		},
		prev_visits: {
			previous_visits: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "previous_visits_hint", {}, translation)
			}, previous_chats: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "previous_chats_hint", {}, translation)
			}
		},
		page_info: {
			page_url: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_page_url_hint", {}, translation),
				tolowercase: !0,
				isUrl: !0
			},
			page_count: {
				conditional_select: "integer",
				hint: languageParser.translate("triggers", "visitor_page_count_hint", {}, translation)
			},
			page_title: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_page_title_hint", {}, translation)
			},
			previous_page: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "previous_page_hint", {}, translation),
				tolowercase: !0,
				isUrl: !0
			}
		},
		visitor_info: {
			name: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "trigger_visitor_name_hint", {}, translation),
				tolowercase: !0
			},
			referrer: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_referrer_hint", {}, translation),
				tolowercase: !0
			},
			search_engine: {
				conditional_select: "limit_string",
				values: "Google Yahoo Baidu Yandex Bing Soso Ask Aol Sogou Mywebsearch Youdao Lycos Infospace Blekko Info Dogpile Duckduckgo Webcrawler".split(" "),
				hint: languageParser.translate("triggers", "vistor_search_engine_hint", {}, translation),
				tolowercase: !0
			},
			search_terms: {conditional_select: "string", tolowercase: !0}
		},
		software: {
			user_agent: {
				conditional_select: "string",
				hint: languageParser.translate("triggers", "visitor_user_agent_hint", {}, translation),
				tolowercase: !0
			},
			browser: {
				conditional_select: "limit_string",
				values: ["Chrome", "Firefox", "Safari", "Explorer", "Opera"],
				tolowercase: !0
			},
			os: {
				conditional_select: "limit_string",
				values: "Windows;Mac;Linux;Android;iPhone;iPad;Windows Phone".split(";"),
				tolowercase: !0
			}
		},
		statuses: {
			account_status: {
				conditional_select: "limit_string",
				values: [{
					id: "online",
					value: languageParser.translate("generic", "online", {}, translation)
				}, {id: "away", value: languageParser.translate("generic", "away", {}, translation)}],
				tolowercase: !0
			},
			visitor_status: {
				conditional_select: "limit_string",
				values: [{
					id: "online",
					value: languageParser.translate("generic", "online", {}, translation)
				}, {id: "away", value: languageParser.translate("generic", "away", {}, translation)}],
				tolowercase: !0
			}
		},
		chat_info: {
			chat_request: {
				conditional_select: "boolean",
				hint: languageParser.translate("triggers", "visitor_requesting_chat_hint", {}, translation),
				values: [{
					id: "is_true",
					value: languageParser.translate("triggers", "is_true", {}, translation)
				}, {id: "is_false", value: languageParser.translate("triggers", "is_false", {}, translation)}]
			},
			served: {
				conditional_select: "boolean",
				hint: languageParser.translate("triggers", "visitor_served_hint", {}, translation),
				values: [{id: "is_true", value: languageParser.translate("triggers", "is_true", {}, translation)}, {
					id: "is_false", value: languageParser.translate("triggers",
						"is_false", {}, translation)
				}]
			},
			department: {
				conditional_select: "limit_string", values: function (a) {
					var c = Tawk.webProperties.getDepartmentsByProperty(a);
					return c ? Object.keys(c).map(function (a) {
						return {id: a, value: c[a].n}
					}) : null
				}, trigger_type_select: ["chat_requested"]
			},
			message: {
				conditional_select: "string",
				tolowercase: !0,
				trigger_type_select: ["chat_requested", "send_message"]
			}
		}
	}, actionsOptions = {
		send_message: {type: "string", values: ["agent_name", "message"], inputType: ["textField", "textArea"]},
		wait: {
			type: "integer",
			isTime: !0, values: [0, 10, 20, 30, 45, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 3600]
		},
		ban_visitor: {type: "string", values: ["reason"], inputType: ["textArea"]},
		ban_ip: {type: "string", values: ["reason"], inputType: ["textArea"]},
		set_visitor_name: {type: "string", values: ["name"], inputType: ["textField"]},
		append_note: {type: "string", values: ["note"], inputType: ["textArea"]},
		replace_note: {type: "string", values: ["note"], inputType: ["textArea"]}
	}, basicChatTemplate = {
		execute: !0,
		match: "all",
		trigger: "chat_requested",
		description: languageParser.translate("triggers",
			"basic_chat_rescue_desc", {}, translation),
		type: "basic_chat_rescue",
		conditions: [{field: "still_on_site", operation: "eq", value: ""}, {
			field: "account_status",
			operation: "not",
			value: "offline"
		}, {field: "served", value: !1}],
		actions: [{action: "send_message", value: ""}]
	}, basicSiteTemplate = {
		execute: !0,
		match: "all",
		trigger: "widget_loaded",
		description: languageParser.translate("triggers", "basic_site_desc", {}, translation),
		type: "basic_site",
		conditions: [{field: "still_on_site", operation: "eq", value: ""}],
		actions: [{
			action: "send_message",
			value: ""
		}]
	}, basicPageTemplate = {
		execute: !0,
		match: "all",
		trigger: "widget_loaded",
		description: languageParser.translate("triggers", "basic_page_desc", {}, translation),
		type: "basic_page",
		conditions: [{field: "still_on_page", operation: "eq", value: ""}, {
			field: "page_url",
			operation: "eq",
			value: ""
		}],
		actions: [{action: "send_message", value: ""}]
	}, extractWidgetSettings = function (a, c, d) {
		var b, e, f, g = !1, h = {}, k = {}, l = {}, m = {}, n = [], p = {
			enabled: !1,
			bubbleName: a.bbl && a.bbl.name ? a.bbl.name : "default",
			bubbleText: a.bbl && a.bbl.txt ? decodeStr(a.bbl.txt) :
				languageParser.translate("widgets", "chat_live_agent"),
			bubbleBgColor: a.bbl && a.bbl.bgc ? a.bbl.bgc : "#7fb06f",
			bubbleTxColor: a.bbl && a.bbl.fgc ? a.bbl.fgc : "#ffffff",
			bubbleWidth: a.bbl && a.bbl.width ? a.bbl.width : 0,
			bubbleHeight: a.bbl && a.bbl.height ? a.bbl.height : 0,
			bubbleBottomOffset: a.bbl && a.bbl.bottomOffset ? a.bbl.bottomOffset : 0,
			bubbleRightOffset: a.bbl && a.bbl.rightOffset ? a.bbl.rightOffset : 0,
			bubbleTopOffset: a.bbl && a.bbl.topOffset ? a.bbl.topOffset : 0,
			bubbleLeftOffset: a.bbl && a.bbl.leftOffset ? a.bbl.leftOffset : 0,
			bubbleInFront: a.bbl &&
			a.bbl.zIndex ? !0 : !1,
			bubbleType: a.bbl && a.bbl.type ? a.bbl.type : "default",
			bubbleRotation: a.bbl && !isNaN(parseInt(a.bbl.rotate, 10)) ? parseInt(a.bbl.rotate, 10) : 0
		}, q = {};
		a.lnc = a.lnc || "en";
		h = a.onlineGreetings ? {
			actionMessage: decodeStr(a.onlineGreetings.actionMessage),
			shortGreeting: decodeStr(a.onlineGreetings.shortMessage),
			longGreeting: decodeStr(a.onlineGreetings.longMessage)
		} : {
			actionMessage: languageParser.translate("widget_preview_translation", a.lnc + "-say_something"),
			shortGreeting: languageParser.translate("widget_preview_translation",
				a.lnc + "-status_message") + " - " + languageParser.translate("widget_preview_translation", a.lnc + "-online"),
			longGreeting: languageParser.translate("widget_preview_translation", a.lnc + "-live_ready")
		};
		k = a.awayGreetings ? {
			shortGreeting: decodeStr(a.awayGreetings.shortMessage),
			longGreeting: decodeStr(a.awayGreetings.longMessage)
		} : {
			shortGreeting: languageParser.translate("widget_preview_translation", a.lnc + "-status_message") + " - " + languageParser.translate("widget_preview_translation", a.lnc + "-away"),
			longGreeting: ""
		};
		a.offlineForm ? m = {
			shortGreeting: decodeStr(a.offlineForm.shortMessage),
			text: decodeStr(a.offlineForm.text),
			fieldsData: a.offlineForm.fields ? Tawk.FormFields.create({
				fields: a.offlineForm.fields,
				formType: "offline"
			}) : null
		} : (m.shortGreeting = languageParser.translate("widget_preview_translation", a.lnc + "-offline"), m.text = languageParser.translate("widget_preview_translation", a.lnc + "-offline_title"));
		m.fieldsData || (m.fieldsData = Tawk.FormFields.create({
			fields: [{
				label: languageParser.translate("widget_preview_translation",
					a.lnc + "-name"), isRequired: !0, type: "name"
			}, {
				label: languageParser.translate("widget_preview_translation", a.lnc + "-email"),
				isRequired: !0,
				type: "email"
			}, {
				label: languageParser.translate("widget_preview_translation", a.lnc + "-message"),
				isRequired: !0,
				type: "message"
			}], formType: "offline"
		}));
		a.rm && (a.rm.nen || a.rm.een || a.rm.den || a.rm.auq || 0 < a.rm.q.length) ? (a.rm.den && n.push({
			label: languageParser.translate("widget_preview_translation", a.lnc + "-department"),
			isRequired: a.rm.drx,
			type: "department"
		}), a.rm.nen && n.push({
			label: languageParser.translate("widget_preview_translation",
				a.lnc + "-name"), isRequired: a.rm.nrx, type: "name"
		}), a.rm.een && n.push({
			label: languageParser.translate("widget_preview_translation", a.lnc + "-email"),
			isRequired: a.rm.erx,
			type: "email"
		}), a.rm.auq && n.push({
			label: languageParser.translate("widget_preview_translation", a.lnc + "-message"),
			isRequired: !1,
			type: "message"
		}), a.rm.q.forEach(function (a) {
			n.push({label: decodeStr(a), isRequired: !1, type: "textArea"})
		}), l = {
			enabled: !0,
			fieldsData: Tawk.FormFields.create({fields: n, formType: "prechat"})
		}, l.text = a.rm.pft ? decodeStr(a.rm.pft) :
			d ? languageParser.translate("widget_preview_translation", a.lnc + "-prechat_title_profile") : languageParser.translate("widget_preview_translation", a.lnc + "-prechat_title")) : l = a.prechatForm ? {
			text: a.prechatForm.text,
			fieldsData: Tawk.FormFields.create({fields: a.prechatForm.fields, formType: "prechat"}),
			enabled: !0
		} : {
			enabled: !1,
			text: d ? languageParser.translate("widget_preview_translation", a.lnc + "-prechat_title_profile") : languageParser.translate("widget_preview_translation", a.lnc + "-prechat_title"),
			fieldsData: Tawk.FormFields.create({formType: "prechat"})
		};
		a.bbl && (p.enabled = !0);
		a.h = parseInt(a.h, 10) || 0;
		a.w = parseInt(a.w, 10) || 0;
		a.minh = parseInt(a.minh, 10) || 0;
		a.minw = parseInt(a.minw, 10) || 0;
		a.mw = a.mw || "round";
		a.dw = a.dw || "full";
		if (0 !== a.h && 0 !== a.w || 0 !== a.minh && 0 !== a.minw) g = !0;
		"inline" === a.t ? (b = a.h || 400, d = a.w || 320) : (b = a.h || 600, d = a.w || 450);
		q = a.ws ? {enabled: !0, settings: a.ws} : {
			enabled: !1, settings: {
				city: null, gpid: null, sch: {
					0: {start: 0, end: 864E5},
					1: {start: 0, end: 864E5},
					2: {start: 0, end: 864E5},
					3: {start: 0, end: 864E5},
					4: {start: 0, end: 864E5},
					5: {start: 0, end: 864E5},
					6: {
						start: 0,
						end: 864E5
					}
				}
			}
		};
		e = a.thm && a.thm.hbg ? a.thm.hbg : "#7fb06f";
		f = a.thm && a.thm.htx ? a.thm.htx : "#ffffff";
		return {
			id: c,
			position: a.pos || "br",
			onClick: a.woc || "max",
			name: a.n ? decodeStr(a.n) : languageParser.translate("generic", "default_text"),
			type: a.t ? languageParser.translate("widgets", a.t) : languageParser.translate("widgets", "inline"),
			isInline: "inline" === a.t,
			isVisible: a.vis ? a.vis : !0,
			canBeDeleted: a.cdlt,
			isEnabled: a.en,
			changeDimensions: g,
			height: b,
			width: d,
			minimizedHeight: a.minh || 40,
			minimizedWidth: a.minw || 320,
			backgroundColor: e,
			textColor: f,
			bubbleSettings: Tawk.BubbleModel.create(p),
			domainWhiteList: a.dwl ? a.dwl : {},
			sessionsShared: !!a.shrs,
			hideOnload: null !== a.hwol ? a.hwol : !1,
			hideOffline: null !== a.hwof ? a.hwof : !1,
			hideWaitTime: null !== a.hwt ? a.hwt : !1,
			disableSound: null !== a.dws ? a.dws : !1,
			hideOnOffline: null !== a.hwof ? a.hwof : !1,
			hideEstimatedWaitTime: null !== a.hwt && void 0 !== a.hwt ? a.hwt : !0,
			showBubblePreview: "inline" === a.t && p.enabled ? !0 : !1,
			isMinimized: "inline" === a.t ? !0 : !1,
			hideOnMobile: null !== a.hwom ? a.hwom : !1,
			isDefault: "default" === c || "page" ===
			c,
			scheduler: q,
			onlineGreetings: Tawk.CopyableModel.create(h),
			awayGreetings: Tawk.CopyableModel.create(k),
			prechatForm: Tawk.CopyableModel.create(l),
			offlineForm: Tawk.CopyableModel.create(m),
			languageCode: a.lnc ? a.lnc : "en",
			topCorner: a.thm ? a.thm.topc : void 0,
			bottomCorner: a.thm ? a.thm.btmc : void 0,
			agentBubbleBg: a.thm && a.thm.aBblBg ? a.thm.aBblBg : shadeColor(e, -0.1),
			agentBubbleTxt: a.thm && a.thm.aBblTx ? a.thm.aBblTx : f,
			visitorBubbleBg: a.thm && a.thm.vBblBg ? a.thm.vBblBg : "#e5e5e5",
			visitorBubbleTxt: a.thm && a.thm.vBblTx ? a.thm.vBblTx :
				"#333333",
			mobileWidget: a.mw,
			desktopWidget: a.dw,
			isRoundMobile: "round" === a.mw,
			isRectangleMobile: "rectangle" === a.mw,
			isRoundDesktop: "min" === a.dw,
			isRectangleDesktop: "full" === a.dw
		}
	}, shadeColor = function (a, c) {
		var d = "#", b, e;
		a = String(a).replace(/[^0-9a-f]/gi, "");
		6 > a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
		c = c || 0;
		for (e = 0; 6 > e; e += 2) b = parseInt(a[e] + "" + a[e + 1], 16), b = Math.round(Math.min(Math.max(0, b + b * c), 255)).toString(16), d += ("00" + b).substring(b.length);
		return d
	};
window.readImageFile =
	function (a, c, d, b, e) {
		var f = c ? c / 2 : null, g = d ? d / 2 : null;
		e = e || function () {
		};
		if (a && /image/i.test(a.type)) {
			var h = new FileReader;
			h.onload = function (a) {
				$("<img/>").load(function () {
					c || d ? this.width >= f || this.height >= g ? resizeUploadedImage(this, c, d, b, e) : e(!0, languageParser.translate("pages", "image_size_error", {
						minWidth: f,
						minHeight: g
					})) : e(null, null, this)
				}).attr("src", a.target.result)
			};
			h.readAsDataURL(a)
		} else return e(!0, languageParser.translate("pages", "image_format_error"))
	};
window.resizeUploadedImage = function (a, c,
                                       d, b, e) {
	var f = 1, f = 1;
	b = b || document.createElement("canvas");
	a.width === a.height && (b.width = c, b.height = c);
	a.height === d && a.width > c ? (b.width = a.width, b.height = d) : a.height === d && a.width < c ? (b.width = c, f = c / a.width, b.height = a.height * f) : a.width === c && a.height > d ? (b.width = c, b.height = a.height) : d / a.height > c / a.width ? (b.height = d, f = d / a.height, b.width = a.width * f) : d / a.height < c / a.width && (b.width = c, f = c / a.width, b.height = a.height * f);
	c = b.getContext("2d");
	c.fillStyle = "#ffffff";
	c.fillRect(0, 0, b.width, b.height);
	c.drawImage(a, 0, 0, a.width,
		a.height, 0, 0, b.width, b.height);
	e(null, null, b)
};
window.scaleImage = function (a, c, d, b, e) {
	var f = c.getContext("2d"), g = d.getContext("2d"), h = a.width, k = a.height;
	f.clearRect(0, 0, c.width, c.height);
	g.clearRect(0, 0, d.width, d.height);
	c.setAttribute("width", b * h);
	c.setAttribute("height", b * k);
	d.setAttribute("width", b * h);
	d.setAttribute("height", b * k);
	f.fillStyle = "rgb(255, 255, 255)";
	f.fillRect(0, 0, c.width, c.height);
	g.fillStyle = "rgb(255, 255, 255)";
	g.fillRect(0, 0, d.width, d.height);
	f.drawImage(a, 0, 0, h, k, 0, 0, b * h, b * k);
	g.drawImage(a, 0, 0, h, k, 0, 0, b * h, b * k);
	e()
};
window.cropImage = function (a, c, d, b, e, f, g, h) {
	var k, l, m = document.createElement("canvas"), n = new Image;
	m.setAttribute("width", b);
	m.setAttribute("height", e);
	k = m.getContext("2d");
	k.fillStyle = "rgb(255, 255, 255)";
	k.fillRect(0, 0, b, e);
	n.onload = function () {
		k.drawImage(n, c, d, f, g, 0, 0, b, e);
		l = m.toDataURL("image/jpeg", 1);
		h(l)
	};
	n.src = a.toDataURL("image/png")
};
window.loadCamera = function (a, c) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
		navigator.msGetUserMedia;
	navigator.getUserMedia ? navigator.getUserMedia({video: !0}, function (a) {
		c(null, a)
	}, function () {
		c(!0, languageParser.translate("form_validation_messages", "camera_load_error"))
	}) : a.webcam({
		swffile: GLOBAL_STATIC_URL + "/scripts/sAS3Cam.swf", noCameraFound: function () {
			c(!0, languageParser.translate("pages", "camera_unavailable"))
		}, swfApiFail: function () {
			c(!0, languageParser.translate("pages", "camera_plugin_error"))
		}, cameraDisabled: function () {
			c(!0, languageParser.translate("pages", "camera_no_access"))
		},
		cameraEnabled: function () {
			c(null, this)
		}
	})
};
window.resizeForChat = function (a, c, d, b) {
	var e, f, g = new Image, h = document.createElement("canvas");
	h.setAttribute("width", d.width);
	h.setAttribute("height", d.height);
	f = h.getContext("2d");
	f.fillStyle = "rgb(255, 255, 255)";
	f.fillRect(0, 0, d.width, d.height);
	g.onload = function () {
		f.drawImage(g, 0, 0, c.width, c.height, 0, 0, d.width, d.height);
		e = h.toDataURL("image/jpeg", 1);
		b(e)
	};
	g.src = a
};
(function () {
	var a = {
		init: function (a, d, b) {
			"function" === typeof a && (d = a, a = {});
			var e = {
				showInput: !0,
				clickoutFiresChange: !0, showButtons: !1, preferredFormat: "hex", change: function (b) {
					a.preferredFormat && "rgb" === a.preferredFormat ? d(b.toRgb()) : d(b.toHexString())
				}, move: function (b) {
					a.preferredFormat && "rgb" === a.preferredFormat ? d(b.toRgb()) : d(b.toHexString())
				}, beforeShow: function () {
					$(b).trigger("beforeShow")
				}, show: function () {
					$(b).trigger("show")
				}, hide: function () {
					$(b).trigger("hide")
				}
			};
			Object.keys(a).forEach(function (b) {
				e[b] = a[b]
			});
			$(this).spectrum(e)
		}, setColor: function (a) {
			$(this).spectrum("set", a)
		}, getColor: function () {
			return $(this).spectrum("get")
		},
		showSelector: function () {
			$(this).spectrum("show")
		}, destroy: function () {
			$(this).spectrum("destroy")
		}, hideSelector: function () {
			$(this).spectrum("hide")
		}
	};
	$.fn.ColorSelector = function (c) {
		if (a[c]) return a[c].apply(this, Array.prototype.slice.call(arguments, 1));
		if ("object" === typeof c || "function" === typeof c || !c) return a.init.apply(this, arguments)
	}
})();
var parseHexString = function (a) {
	4 === a.length && (a = a[0] + a[1] + a[1] + a[2] + a[2] + a[3] + a[3]);
	return a
}, parseRgbaColorCode = function (a) {
	var c = a.length - 1;
	return -1 === a.indexOf("rgb(") ?
		a : "rgba(" + a.substring(4, c) + ",1)"
}, FileUploadHandler = function () {
};