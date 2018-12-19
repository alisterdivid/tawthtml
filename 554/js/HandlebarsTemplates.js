var HandlebarsTemplates = {};
HandlebarsTemplates["live-answering"] = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		d = c.helperMissing;
		var e = this.escapeExpression;
		return '<div style="margin-top : 10px;">' +
			e((c.I18n || a && a.I18n || d).call(a, "live_answering_introduction", {
				name: "I18n",
				hash: {variables: '{"lineStart" : "<p>", "lineEnd" : "</p>"}', context: "admin"},
				data: b
			})) + "</div><h5><b>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_header", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</b></h5><div id="liveAnswering-details-container"><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-price.png"/></div><div>' + e((c.I18n || a &&
				a.I18n || d).call(a, "live_answering_details_just_one_hour", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				},
				data: b
			})) + '</div></div><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-247.png" /></div><div>' + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_24_7_365", {
				name: "I18n", hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				}, data: b
			})) + '</div></div><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-real.png" /></div><div>' + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_real_humans", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				},
				data: b
			})) + '</div></div><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-conversion.png" /></div><div>' +
			e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_better_leads", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				},
				data: b
			})) + '</div></div><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-crm.png" /></div><div>' + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_crm_integration", {
				name: "I18n", hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				}, data: b
			})) + '</div></div><div class="details-wrapper"><div class="details-image-wrapper"><img src="https://static-a.tawk.to/v2/a34/images/hireagent-multilanguage.png" /></div><div>' + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_native_speakers", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "bigTextStart" : "<b>", "bigTextEnd" : "</b>"}',
					context: "admin"
				},
				data: b
			})) + "</div></div></div>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_details_description",
				{
					name: "I18n",
					hash: {variables: '{"lineStart" : "<p>", "lineEnd" : "</p>"}', context: "admin"},
					data: b
				})) + '<div id="liveAnswering-faqs-container"><h3><b>' + e((c.I18n || a && a.I18n || d).call(a, "faqs", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + "</b></h3><ol><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_1", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n ||
				d).call(a, "live_answering_faqs_content_2", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_3", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>", "listStart" : "<ul>", "listEnd" : "</ul>", "newLineList" : "<li>", "endLineList" : "</li>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_4", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_5", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a,
				"live_answering_faqs_content_6", {
					name: "I18n",
					hash: {
						variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
						context: "admin"
					},
					data: b
				})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_7", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_8", {
				name: "I18n", hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				}, data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_9", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_10", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n ||
				a && a.I18n || d).call(a, "live_answering_faqs_content_11", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_12", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_13",
				{
					name: "I18n",
					hash: {
						variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
						context: "admin"
					},
					data: b
				})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_14", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>"}',
					context: "admin"
				},
				data: b
			})) + "</li><li>" + e((c.I18n || a && a.I18n || d).call(a, "live_answering_faqs_content_15", {
				name: "I18n", hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h4>", "questionEnd" : "</h4>", "link" : "<a href=\'mailto:support@tawk.to\'>support@tawk.to</a>"}',
					context: "admin"
				}, data: b
			})) + "</li></ol></div>"
	}, useData: !0
});
HandlebarsTemplates.whitelabel = Handlebars.template({
	1: function (a, c, d, b) {
		d = c.helperMissing;
		var e = this.escapeExpression;
		return '<div id="min-whitelabel-settings" class="smart-form"><div class="edit-container" style="float : left; width : 100%;"><div style="margin-right : 330px; position: relative;"><div style="margin : 0; "><h5>' + e((c.I18n || a && a.I18n || d).call(a, "widget_footer_branding", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h5><table class="table no-border branding-settings"><tr><td style="padding-left : 0; vertical-align : middle;"><label class="label">' +
			e((c.I18n || a && a.I18n || d).call(a, "title", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</label></td><td><label class="input"><a class="icon-append fa fa-close clear-input" style="color: red;" href="javascript:void(0);"></a><input id="widget-label" type="text" class="input-text"placeholder="Enter branding text" value="Powered by *tawk.to*" /></label><p class="font-xs pull-left" style="opacity: 0.6;">' + e((c.I18n || a && a.I18n || d).call(a, "format_eg", {
				name: "I18n", hash: {
					variables: '{"strongStart" : "<strong>", "strongEnd" : "</strong>", "italicStart" : "<i>", "italicEnd" : "</i>"}',
					context: "admin"
				}, data: b
			})) + '</p></td></tr><tr><td style="padding-left : 0; vertical-align : middle;"><label class="label">' + e((c.I18n || a && a.I18n || d).call(a, "link_url", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</label></td><td><label class="input"><a class="icon-append fa fa-close clear-input" style="color: red;" href="javascript:void(0);"></a><input id="widget-url" type="text" class="input-text url" placeholder="Enter branding link url" value="https://www.tawk.to" /></label></td></tr><tr><td style="padding-left : 0; vertical-align : middle;"><label class="label">Color</label></td><td><label class="input"><input type="text" id="widget-text-color" ' +
			e((c["bind-attr"] || a && a["bind-attr"] || d).call(a, {
				name: "bind-attr",
				hash: {value: "activeAddOn.settings.widget.textColor"},
				data: b
			})) + '/></label></td></tr></table></div><div style="margin : 20px 0;"><h5>' + e((c.I18n || a && a.I18n || d).call(a, "email_footer_branding", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h5><table class="table no-border branding-settings"><tr><td style="padding-left : 0; vertical-align : middle;"><label class="label">' + e((c.I18n || a && a.I18n || d).call(a, "title", {
				name: "I18n", hash: {context: "admin"},
				data: b
			})) + '</label></td><td><label class="input"><a class="icon-append fa fa-close clear-input" style="color: red;" href="javascript:void(0);"></a><input id="email-label" type="text" class="input-text" placeholder="Enter branding text" value="No tawk.to live chat account? Create one for free here" /></label><p class="font-xs pull-left" style="opacity: 0.6;">' + e((c.I18n || a && a.I18n || d).call(a, "format_eg", {
				name: "I18n", hash: {
					variables: '{"strongStart" : "<strong>", "strongEnd" : "</strong>", "italicStart" : "<i>", "italicEnd" : "</i>"}',
					context: "admin"
				}, data: b
			})) + '</p></td></tr><tr><td style="padding-left : 0; vertical-align : middle;"><label class="label">' + e((c.I18n || a && a.I18n || d).call(a, "link_url", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</label></td><td><label class="input"><a class="icon-append fa fa-close clear-input" style="color: red;" href="javascript:void(0);"></a><input id="email-url" type="text" class="input-text url" placeholder="Enter branding link url" value="https://www.tawk.to" /></label></td></tr></table></div></div></div><div style="float: left; width : 320px; margin: 20px 0;position: relative;  margin-left : -330px; height : 335px; margin-top : -1px"><div style="left: 0;right: 0;width: auto;max-width: 400px;position: absolute;top: 0;bottom: 0;padding: 0 15px;"><div id="widget-max-preview-container" style="top : 0;"><div id="border-wrapper"></div><div class="inner-preview-container"><div class="header-container" style="background-color: rgb(221, 221, 221); color: rgb(72, 178, 75);"><div id="header-wrapper"><div class="headerBoxControlsContainer black"><div class="end-chat pull-right"></div><div class="popout pull-right"></div><div class="minimize pull-right"></div></div><div class="headerAccountStateContainer"><p class="headerAccountState">Online</p></div></div></div><div id="widget-chat-container"><div id="chat-container-wrapper"><div id="greetingsOverlay"><div id="greetingsWrapper"><div id="greetingsContainer"><div id="embedArrow" class="widget-greetings-arrow"></div></div></div></div></div><div id="bottom-container"><div id="actionsContainer"><div id="action-message">Type here and press enter...</div><div id="ratingContainer"></div><div id="footer-container"><div id="options" style="height: 32px; margin-left: 84px;"><div id="openMenu" style="position: absolute; left: 3px; bottom: 0; background:url(https://static-a.tawk.to/v2/a34/images/widget-menu.png); height : 29px; width : 80px;"></div></div><div id="widget-brand" style="position: absolute; bottom: 0; right: 6px; left: 86px; text-align: right; height: 30px; line-height: 30px; color: inherit; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right : 3px; font-weight : normal;"></div></div></div></div></div></div></div></div></div><div class="clearfix"></div></div>'
	},
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e;
		d = c.helperMissing;
		var f = this.escapeExpression;
		d = '<div style="margin: 20px 0;"><p style="font-size: 16px;"><b>' + f((c.I18n || a && a.I18n || d).call(a, "rebranding_title", {
			name: "I18n",
			hash: {context: "admin"},
			data: b
		})) + "</b></p>" + f((c.I18n || a && a.I18n || d).call(a, "rebranding_long_description", {
			name: "I18n", hash: {
				variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "listStart" : "<ul>", "listEnd" : "</ul>", "listItemStart" : "<li>", "listItemEnd" : "</li>"}',
				context: "admin"
			}, data: b
		})) + "</div>";
		e = c.unless.call(a, null != (e = null != a ? a.activeAddOn : a) ? e.isActive : e, {
			name: "unless",
			hash: {},
			fn: this.program(1, b),
			inverse: this.noop,
			data: b
		});
		null != e && (d += e);
		return d
	}, useData: !0
});
HandlebarsTemplates.webrtc = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		d = c.helperMissing;
		var e = this.escapeExpression;
		return "<div>" + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="webrtc-description-container">' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_question_answer", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p>", "lineEnd" : "</p>", "questionStart" : "<h1>", "questionEnd" : "</h1>"}',
					context: "admin"
				},
				data: b
			})) + '<div style="margin : 10px 0"><div class="image-container"><h4>1. ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_click_step", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h4><div class="inner-image" style="background:url(https://static-a.tawk.to/v2/a34/images/video-chat-click-once.png); width: 180px;"></div></div><div class="image-container" style="margin : 0 3%"><h4>2. ' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_hello_step", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h4><div class="inner-image" style="background:url(https://static-a.tawk.to/v2/a34/images/video-chat-say-hi.png); width: 180px;"></div></div><div class="image-container"><h4>3. ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_share_step", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h4><div class="inner-image" style="background:url(https://static-a.tawk.to/v2/a34/images/video-chat-share-link.png); width: 122px;"></div></div></div></div><div class="webrtc-how-to-container"><h1>' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_invite", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + "</h1><h5>" + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_share", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h5><img src="https://static-a.tawk.to/v2/a34/images/video-chat-group-chat-1.png" style="width:100%" /><div style="    display: table;    table-layout: fixed;    margin-top: -300px;"><div style="    display: table-row;"><h4 style="    display: table-cell;    vertical-align: bottom;    padding: 10px;"><i>' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_quote", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</i></h4><img src="https://static-a.tawk.to/v2/a34/images/video-chat-group-chat-2.png" style="display: table-cell; height: 416px; width: 206px;"></div></div><div class="text-left features"><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_1", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_2", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_3", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_4", {
				name: "I18n", hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_5", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_6", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><i class="fa fa-check-square-o fa-lg"></i> ' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_feature_7", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</div><div class="clearfix"></div></div></div><div class="webrtc_availability_container"><h1>' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_available", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + "</h1><h5>" + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_fast_secure", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h5><table class="table no-border"><tr><td></td><td colspan="2" class="border-right"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-chrome.png" /></td><td colspan="2" class="border-right"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-opera.png" /></td><td colspan="2" class="border-right"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-firefox.png" /></td><td colspan="2" class="border-right"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-edge.png" /></td><td colspan="2"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-safari.png" /></td></tr><tr><td></td><td colspan="2" class="border-right" style="padding: 0 10px;">Chrome</td><td colspan="2" class="border-right" style="padding: 0 10px;">Opera</td><td colspan="2" class="border-right" style="padding: 0 10px;">Firefox</td><td colspan="2" class="border-right" style="padding: 0 10px;">Edge</td><td colspan="2" style="padding: 0 10px;">Safari</td></tr><tr><td></td><td><i class="fa fa-desktop"></i></td><td class="border-right"><i class="fa fa-mobile"></i></td><td><i class="fa fa-desktop"></i></td><td class="border-right"><i class="fa fa-mobile"></i></td><td><i class="fa fa-desktop"></i></td><td class="border-right"><i class="fa fa-mobile"></i></td><td><i class="fa fa-desktop"></i></td><td class="border-right"><i class="fa fa-mobile"></i></td><td><i class="fa fa-desktop"></i></td><td><i class="fa fa-mobile"></i></td></tr><tr><td><i class="fa fa-phone title" data-placement="top" data-original-title="' +
			e((c.I18n || a && a.I18n || d).call(a, "voice_call", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></td><td><span class="present" data-placement="top" data-original-title="ver. >=23"></span></td><td class="border-right"><span class="present" data-placement="top" data-original-title="ver. >=62"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=18"></span></td><td class="border-right"><span class="present" data-placement="top" data-original-title="ver. >=37"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=22"></span></td><td class="border-right"><span class="present" data-placement="top" data-original-title="ver. >=57"></span></td><td><span class="not-present"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=11">11</span></td><td><span class="present" data-placement="top" data-original-title="ver. >=11">11</span></td></tr><tr><td><i class="fa fa-video-camera title" data-placement="top" data-original-title="' +
			e((c.I18n || a && a.I18n || d).call(a, "video_call", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></td><td><span class="present" data-placement="top" data-original-title="ver. >=23"></span></td><td class="border-right"><span class="present" data-placement="top" data-original-title="ver. >=62"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=18"></span></td><td class="border-right"><span class="present"  data-placement="top" data-original-title="ver. >=37"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=22"></span></td><td class="border-right"><span class="present" data-placement="top" data-original-title="ver. >=57"></span></td><td><span class="not-present"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=11">11</span></td><td><span class="present" data-placement="top" data-original-title="ver. >=11">11</span></td></tr><tr><td><span class="fa fa-stack"><i class="fa fa-square-o fa-stack-1" style="margin-right: -21px;"></i><i class="fa fa-desktop fa-stack-2x title" style="background: #fff;margin-top: 7px;" data-placement="top" data-original-title="' +
			e((c.I18n || a && a.I18n || d).call(a, "screen_share", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=23"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=18"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="present" data-placement="top" data-original-title="ver. >=22"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="not-present"></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="not-present"></span></td><td><span class="not-present"></span></td></tr></table>    </div>    <div class="webrtc_availability_container">    <h1>' +
			e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_available_mobile", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '</h1>    <table class="table no-border" style="table-layout: auto;max-width:  400px;margin: 0px auto;">    <tr><td></td><td class="border-right"><img src="https://static-a.tawk.to/v2/a34/images/video-chat-android.png" /></td><td><img src="https://static-a.tawk.to/v2/a34/images/video-chat-ios.png" style="max-height: 100px;"/></td></tr><tr><td><i class="fa fa-phone title" data-placement="top" data-original-title="' +
			e((c.I18n || a && a.I18n || d).call(a, "voice_call", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></td><td class="border-right"><span class="present"></span></td><td><span class="present"></span></td></tr><tr><td><i class="fa fa-video-camera title" data-placement="top" data-original-title="' + e((c.I18n || a && a.I18n || d).call(a, "video_call", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></td><td class="border-right"><span class="present"></span></td><td><span class="present"></span></td></tr><tr><td><span class="fa fa-stack"><i class="fa fa-square-o fa-stack-1" style="margin-right: -21px;"></i><i class="fa fa-desktop fa-stack-2x title" style="background: #fff;margin-top: 7px;" data-placement="top" data-original-title="' +
			e((c.I18n || a && a.I18n || d).call(a, "screen_share", {
				name: "I18n",
				hash: {context: "admin"},
				data: b
			})) + '"></i></span></td><td class="border-right"><span class="not-present"></span></td><td><span class="not-present"></span></td></tr>    </table>    </div><div style="margin : 20px 0; text-align: center; padding: 10px; position : relative; height : 300px;"><div style="position: absolute; left: 0; right: 0;">    <h1>' + e((c.I18n || a && a.I18n || d).call(a, "webrtc_description_fine_print", {
				name: "I18n", hash: {context: "admin"},
				data: b
			})) + "</h1>    " + e((c.I18n || a && a.I18n || d).call(a, "webrtc_legal_question", {
				name: "I18n",
				hash: {
					variables: '{"lineStart" : "<p class=\'text-left\'><i>", "lineEnd" : "</i></p>", "questionStart" : "<h5>", "questionEnd" : "</h5>"}',
					context: "admin"
				},
				data: b
			})) + "</div>    </div>"
	}, useData: !0
});
HandlebarsTemplates.visitorCustomMenuView = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e;
		d = c.helperMissing;
		var f = this.escapeExpression;
		return '<div id="' + f((e = null != (e = c.id || (null !=
		a ? a.id : a)) ? e : d, "function" === typeof e ? e.call(a, {
			name: "id",
			hash: {},
			data: b
		}) : e)) + '" class="custom-element-container"><div class="section-header" style="display: none"><div class="title-container" ><p>' + f((e = null != (e = c.title || (null != a ? a.title : a)) ? e : d, "function" === typeof e ? e.call(a, {
			name: "title",
			hash: {},
			data: b
		}) : e)) + '</p></div><div class="icon-container"><a class="back-to-chat btn btn-default btn-sm" href="javascript:void(0);"><i class="fa fa-chevron-left"></i></a></div><div class="clearfix"></div></div><div class="section-content"></div></div>'
	},
	useData: !0
});
HandlebarsTemplates.incomingConnectionView = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e;
		d = c.helperMissing;
		var f = this.escapeExpression;
		return '<div class="incoming-call"><h5 style="color: #fff;text-align: center; margin : 10px 0; font-size : 18px;">' + f((c.I18n || a && a.I18n || d).call(a, "visitor_ringing", {
			name: "I18n",
			hash: {context: "visitors"},
			data: b
		})) + '</h5><button class="decline-call btn btn-default" data-id="' + f((e = null != (e = c.callId || (null != a ? a.callId :
			a)) ? e : d, "function" === typeof e ? e.call(a, {
			name: "callId",
			hash: {},
			data: b
		}) : e)) + '"><span class="fa-stack"><i class="fa fa-volume-off fa-stack-2x"></i><i class="fa fa-ban fa-stack-2x"></i></span></button><button class="answer-call btn btn-primary"><i class="fa fa-phone"></i></button></div>'
	}, useData: !0
});
HandlebarsTemplates.callDetailsView = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e;
		d = c.helperMissing;
		var f = this.escapeExpression;
		return '<div class="conversation-block webrtc-call" id="' +
			f((e = null != (e = c.callId || (null != a ? a.callId : a)) ? e : d, "function" === typeof e ? e.call(a, {
				name: "callId",
				hash: {},
				data: b
			}) : e)) + '"><div class="conversation-content"><div class="webrtc-content"><div class="loader"><i class="fa fa-refresh fa-spin"></i></div><div class="webrtc-info hidden"><span class="webrtc-call-type"><span class="webrtc-call-icon"><i class="fa"></i></span></span><span class="webrtc-call-details"><span class="webrtc-call-header"></span><span class="webrtc-call-end-details hidden"></span><span class="webrtc-call-participants-details hidden"><i class="fa fa-eye" style=""></i><span class="webrtc-call-participants"></span></span></span><span class="webrtc-join-container hidden"><button class="btn btn-primary join-call" style="width : 35px;height : 35px; font-size : 23px; padding : 0; border-radius : 50%;"><i class="fa fa-phone"></i></button></span></div><div class="webrtc-error hidden"><span class="webrtc-call-type"><span class="webrtc-call-icon"><i class="fa fa fa-exclamation"></i></span></span><span class="webrtc-call-details"><span class="webrtc-call-header missed">' +
			f((c.I18n || a && a.I18n || d).call(a, "delete_alert", {
				name: "I18n",
				hash: {context: "action_messages"},
				data: b
			})) + '</span><span class="webrtc-call-end-details">' + f((c.I18n || a && a.I18n || d).call(a, "call_load_error", {
				name: "I18n",
				hash: {context: "visitors"},
				data: b
			})) + '</span></span><span class="webrtc-join-container"><button class="btn btn-primary retry-load">' + f((c.I18n || a && a.I18n || d).call(a, "retry", {
				name: "I18n",
				hash: {context: "visitors"},
				data: b
			})) + "</button></span></div></div></div></div>"
	}, useData: !0
});
HandlebarsTemplates.alertBox =
	Handlebars.template({
		1: function (a, c, d, b, e) {
			d = '<div class="MessageBoxButtonSection">';
			a = c.each.call(a, null != a ? a.buttons : a, {
				name: "each",
				hash: {},
				fn: this.program(2, b, e),
				inverse: this.noop,
				data: b
			});
			null != a && (d += a);
			return d + "</div>"
		}, 2: function (a, c, d, b, e) {
			var f;
			d = this.lambda;
			var g = this.escapeExpression, h = c.helperMissing;
			return '<button id="' + g(d(null != e[1] ? e[1].elementId : e[1], a)) + "-" + g((f = null != (f = c.id || (null != a ? a.id : a)) ? f : h, "function" === typeof f ? f.call(a, {
					name: "id",
					hash: {},
					data: b
				}) : f)) + '" class="btn btn-default btn-sm botTempo">' +
				g((f = null != (f = c.text || (null != a ? a.text : a)) ? f : h, "function" === typeof f ? f.call(a, {
					name: "text",
					hash: {},
					data: b
				}) : f)) + "</button>"
		}, compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b, e) {
			var f, g;
			d = c.helperMissing;
			var h = this.escapeExpression;
			d = '<div id="' + h((g = null != (g = c.elementId || (null != a ? a.elementId : a)) ? g : d, "function" === typeof g ? g.call(a, {
					name: "elementId",
					hash: {},
					data: b
				}) : g)) + '" class="divMessageBox animated fadeIn fast"><div class="MessageBoxContainer animated fadeIn fast"><div class="MessageBoxMiddle"><span class="MsgTitle">' +
				h((g = null != (g = c.title || (null != a ? a.title : a)) ? g : d, "function" === typeof g ? g.call(a, {
					name: "title",
					hash: {},
					data: b
				}) : g)) + '</span><p class="pText">' + h((g = null != (g = c.message || (null != a ? a.message : a)) ? g : d, "function" === typeof g ? g.call(a, {
					name: "message",
					hash: {},
					data: b
				}) : g)) + "</p>";
			f = c["if"].call(a, null != (f = null != a ? a.buttons : a) ? f.length : f, {
				name: "if",
				hash: {},
				fn: this.program(1, b, e),
				inverse: this.noop,
				data: b
			});
			null != f && (d += f);
			return d + "</div></div></div>"
		}, useData: !0, useDepths: !0
	});
HandlebarsTemplates.emojiTabPane =
	Handlebars.template({
		1: function (a, c, d, b) {
			var e = this.lambda, f = this.escapeExpression;
			d = c.helperMissing;
			e = '<a href="javascript:void(0);" data-id="' + f(e(a, a)) + '" class="select-emoji" title="' + f(e(a, a)) + '">';
			a = (c.emojify || a && a.emojify || d).call(a, a, {name: "emojify", hash: {}, data: b});
			null != a && (e += a);
			return e + "</a>"
		}, compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
			d = '<div class="tab-pane in fade active"><div style="height : 100%; width : 95%; margin : 0px auto;">';
			a = c.each.call(a, null != a ? a.content : a,
				{name: "each", hash: {}, fn: this.program(1, b), inverse: this.noop, data: b});
			null != a && (d += a);
			return d + '</div><div class="clearfix"></div></div>'
		}, useData: !0
	});
HandlebarsTemplates.emojiSearchPane = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		return '<div class="tab-pane in fade active"><div class="input-group padding-5"><input class="form-control search-emoji" type="text" placeholder="Search..."><div class="input-group-btn" style="font-size : 13px;"><button class="btn btn-default btn-primary" type="button"><i class="fa fa-search"></i></button></div></div><div class="search-results"></div></div>'
	},
	useData: !0
});
HandlebarsTemplates.emojiDropDown = Handlebars.template({
	1: function (a, c, d, b) {
		var e = this.lambda, f = this.escapeExpression;
		d = c.helperMissing;
		e = '<li data-id="' + f(e(b && b.key, a)) + '" class="open-emoji-tab"><a class="padding-5" href="javascript:void(0);" style="height: 32px;">';
		a = (c.emojify || a && a.emojify || d).call(a, null != a ? a.header : a, {
			name: "emojify",
			hash: {},
			data: b
		});
		null != a && (e += a);
		return e + "</a></li>"
	}, compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		d = '<div class="emoji-container"><ul class="nav nav-tabs emoji-selection">';
		a = c.each.call(a, null != a ? a.emojiMap : a, {
			name: "each",
			hash: {},
			fn: this.program(1, b),
			inverse: this.noop,
			data: b
		});
		null != a && (d += a);
		return d + '<li data-id="search" class="open-emoji-tab"><a class="padding-5" href="javascript:void(0);" style="height: 32px;"><i class="fa fa-search" style="font-size: 18px;vertical-align: middle;"></i></a></li></ul><div class="tab-content"></div></div>'
	}, useData: !0
});
HandlebarsTemplates.newVersionMessage = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e,
			f = c.helperMissing, g = this.escapeExpression,
			h = '<div id="new-version-message"><div class="SmallBox animated fadeInRight fast"><div class="textoFull"><span>';
		d = (e = null != (e = c.message || (null != a ? a.message : a)) ? e : f, "function" === typeof e ? e.call(a, {
			name: "message",
			hash: {},
			data: b
		}) : e);
		null != d && (h += d);
		return h + '</span><a href="' + g((e = null != (e = c.link || (null != a ? a.link : a)) ? e : f, "function" === typeof e ? e.call(a, {
			name: "link",
			hash: {},
			data: b
		}) : e)) + '" class="btn btn-tawk-pink btn-sm">' + g((e = null != (e = c.buttonText || (null !=
		a ? a.buttonText : a)) ? e : f, "function" === typeof e ? e.call(a, {
			name: "buttonText",
			hash: {},
			data: b
		}) : e)) + '</a><p></p></div><div class="miniIcono" style=""><i class="miniPic fa fa-times"></i></div></div></div>'
	}, useData: !0
});
HandlebarsTemplates.unsupportedAlert = Handlebars.template({
	compiler: [6, ">= 2.0.0-beta.1"], main: function (a, c, d, b) {
		var e;
		d = c.helperMissing;
		var f = this.escapeExpression,
			f = '<div id="' + f((e = null != (e = c.elementId || (null != a ? a.elementId : a)) ? e : d, "function" === typeof e ? e.call(a, {
				name: "elementId", hash: {},
				data: b
			}) : e)) + '" class="fixed-notification"><div class="SmallBox animated fadeInRight fast"><div class="textoFull"><span>';
		a = (e = null != (e = c.message || (null != a ? a.message : a)) ? e : d, "function" === typeof e ? e.call(a, {
			name: "message",
			hash: {},
			data: b
		}) : e);
		null != a && (f += a);
		return f + '</span><p></p></div><div class="miniIcono" style=""><i class="miniPic fa fa-times"></i></div></div></div></div>'
	}, useData: !0
});
window.HandlebarsTemplates = HandlebarsTemplates;