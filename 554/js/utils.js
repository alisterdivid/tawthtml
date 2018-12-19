var logger = function (a) {
	var c = {
		level: "error",
		timestamp: Date.now(),
		userAgent: a.useragent || navigator.userAgent,
		data: {message: a.message, stack: a.stack, ui_version: UI_VERSION, dashboard_version: "v2"}
	};
	a.message && -1 !== a.message.toLowerCase().indexOf("dealply") || (window.userLogData && (c.data.userInfo = window.userLogData), "yes" === LOGERROR ? (c = JSON.stringify(c), $.ajax({
		url: "/log", type: "POST", dataType: "json",
		data: {logData: c}, crossDomain: !0, success: function () {
			console.log("success")
		}, error: function () {
			console.log("error")
		}
	})) : console.log(c))
};
TraceKit.report.subscribe(logger);
var rules = {name: "required", email: {required: !0, email: !0}, password: {required: !0, minlength: 6}};
window.$AjaxStripper = function (a) {
	var c = a.indexOf("%%__START__%%");
	if (0 > c) return null;
	a = a.substr(c + 13);
	if ("" === a) return null;
	try {
		return JSON.parse(a)
	} catch (d) {
		return null
	}
};
var getLocaleCookie = function () {
		var a = (" " + document.cookie).match(/[; ]TawkLocale=([^\s;]*)/);
		if (a) return unescape(a[1])
	}, setLocaleCookie = function (a) {
		var c = new Date;
		c.setDate(c.getDate() + 365);
		document.cookie = "TawkLocale=" + a + ";expires=" + c.toUTCString() + ";path=/;"
	}, formSubmission = function (a, c, d) {
		$.ajax({
			type: "POST",
			url: c,
			data: JSON.stringify(a),
			dataType: "text",
			contentType: "application/json;charset=utf-8",
			headers: {accept: "application/json"}
		}).done(function (a) {
			a = $AjaxStripper(a);
			d(a)
		}).fail(function (a) {
			d({success: !1})
		})
	}, countryList = [{value: "afghanistan", id: "AF"}, {value: "\u00e5land islands", id: "AX"},
		{value: "albania", id: "AL"}, {value: "algeria", id: "DZ"}, {
			value: "american samoa",
			id: "AS"
		}, {value: "andorra", id: "AD"}, {value: "angola", id: "AO"}, {
			value: "anguilla",
			id: "AI"
		}, {value: "antarctica", id: "AQ"}, {value: "antigua and barbuda", id: "AG"}, {
			value: "argentina",
			id: "AR"
		}, {value: "armenia", id: "AM"}, {value: "aruba", id: "AW"}, {value: "australia", id: "AU"}, {
			value: "austria",
			id: "AT"
		}, {value: "azerbaijan", id: "AZ"}, {value: "bahamas", id: "BS"}, {
			value: "bahrain",
			id: "BH"
		}, {value: "bangladesh", id: "BD"}, {value: "barbados", id: "BB"}, {
			value: "belarus",
			id: "BY"
		}, {value: "belgium", id: "BE"}, {value: "belize", id: "BZ"}, {value: "benin", id: "BJ"}, {
			value: "bermuda",
			id: "BM"
		}, {value: "bhutan", id: "BT"}, {
			value: "bolivia, plurinational state of",
			id: "BO"
		}, {value: "bonaire, sint eustatius and saba", id: "BQ"}, {
			value: "bosnia and herzegovina",
			id: "BA"
		}, {value: "botswana", id: "BW"}, {value: "bouvet island", id: "BV"}, {
			value: "brazil",
			id: "BR"
		}, {value: "british indian ocean territory", id: "IO"}, {
			value: "brunei darussalam",
			id: "BN"
		}, {value: "bulgaria", id: "BG"}, {value: "burkina faso", id: "BF"},
		{value: "burundi", id: "BI"}, {value: "cambodia", id: "KH"}, {value: "cameroon", id: "CM"}, {
			value: "canada",
			id: "CA"
		}, {value: "cape verde", id: "CV"}, {value: "cayman islands", id: "KY"}, {
			value: "central african republic",
			id: "CF"
		}, {value: "chad", id: "TD"}, {value: "chile", id: "CL"}, {
			value: "china",
			id: "CN"
		}, {value: "christmas island", id: "CX"}, {value: "cocos (keeling) islands", id: "CC"}, {
			value: "colombia",
			id: "CO"
		}, {value: "comoros", id: "KM"}, {value: "congo", id: "CG"}, {
			value: "congo, the democratic republic of the",
			id: "CD"
		}, {
			value: "cook islands",
			id: "CK"
		}, {value: "costa rica", id: "CR"}, {value: "c\u00f4te d'ivoire", id: "CI"}, {
			value: "croatia",
			id: "HR"
		}, {value: "cuba", id: "CU"}, {value: "cura\u00e7ao", id: "CW"}, {
			value: "cyprus",
			id: "CY"
		}, {value: "czech republic", id: "CZ"}, {value: "denmark", id: "DK"}, {
			value: "djibouti",
			id: "DJ"
		}, {value: "dominica", id: "DM"}, {value: "dominican republic", id: "DO"}, {
			value: "ecuador",
			id: "EC"
		}, {value: "egypt", id: "EG"}, {value: "el salvador", id: "SV"}, {
			value: "equatorial guinea",
			id: "GQ"
		}, {value: "eritrea", id: "ER"}, {value: "estonia", id: "EE"}, {
			value: "ethiopia",
			id: "ET"
		}, {value: "falkland islands (malvinas)", id: "FK"}, {value: "faroe islands", id: "FO"}, {
			value: "fiji",
			id: "FJ"
		}, {value: "finland", id: "FI"}, {value: "france", id: "FR"}, {
			value: "french guiana",
			id: "GF"
		}, {value: "french polynesia", id: "PF"}, {value: "french southern territories", id: "TF"}, {
			value: "gabon",
			id: "GA"
		}, {value: "gambia", id: "GM"}, {value: "georgia", id: "GE"}, {value: "germany", id: "DE"}, {
			value: "ghana",
			id: "GH"
		}, {value: "gibraltar", id: "GI"}, {value: "greece", id: "GR"}, {
			value: "greenland",
			id: "GL"
		}, {value: "grenada", id: "GD"},
		{value: "guadeloupe", id: "GP"}, {value: "guam", id: "GU"}, {value: "guatemala", id: "GT"}, {
			value: "guernsey",
			id: "GG"
		}, {value: "guinea", id: "GN"}, {value: "guinea-bissau", id: "GW"}, {
			value: "guyana",
			id: "GY"
		}, {value: "haiti", id: "HT"}, {
			value: "heard island and mcdonald islands",
			id: "HM"
		}, {value: "holy see (vatican city state)", id: "VA"}, {value: "honduras", id: "HN"}, {
			value: "hong kong",
			id: "HK"
		}, {value: "hungary", id: "HU"}, {value: "iceland", id: "IS"}, {value: "india", id: "IN"}, {
			value: "indonesia",
			id: "ID"
		}, {
			value: "iran, islamic republic of",
			id: "IR"
		}, {value: "iraq", id: "IQ"}, {value: "ireland", id: "IE"}, {value: "isle of man", id: "IM"}, {
			value: "israel",
			id: "IL"
		}, {value: "italy", id: "IT"}, {value: "jamaica", id: "JM"}, {value: "japan", id: "JP"}, {
			value: "jersey",
			id: "JE"
		}, {value: "jordan", id: "JO"}, {value: "kazakhstan", id: "KZ"}, {value: "kenya", id: "KE"}, {
			value: "kiribati",
			id: "KI"
		}, {value: "korea, democratic people's republic of", id: "KP"}, {
			value: "korea, republic of",
			id: "KR"
		}, {value: "kuwait", id: "KW"}, {value: "kyrgyzstan", id: "KG"}, {
			value: "lao people's democratic republic",
			id: "LA"
		}, {value: "latvia", id: "LV"}, {value: "lebanon", id: "LB"}, {value: "lesotho", id: "LS"}, {
			value: "liberia",
			id: "LR"
		}, {value: "libya", id: "LY"}, {value: "liechtenstein", id: "LI"}, {
			value: "lithuania",
			id: "LT"
		}, {value: "luxembourg", id: "LU"}, {
			value: "macao",
			id: "MO"
		}, {value: "macedonia, the former yugoslav republic of", id: "MK"}, {
			value: "madagascar",
			id: "MG"
		}, {value: "malawi", id: "MW"}, {value: "malaysia", id: "MY"}, {value: "maldives", id: "MV"}, {
			value: "mali",
			id: "ML"
		}, {value: "malta", id: "MT"}, {value: "marshall islands", id: "MH"}, {
			value: "martinique",
			id: "MQ"
		}, {value: "mauritania", id: "MR"}, {value: "mauritius", id: "MU"}, {
			value: "mayotte",
			id: "YT"
		}, {value: "mexico", id: "MX"}, {
			value: "micronesia, federated states of",
			id: "FM"
		}, {value: "moldova, republic of", id: "MD"}, {value: "monaco", id: "MC"}, {
			value: "mongolia",
			id: "MN"
		}, {value: "montenegro", id: "ME"}, {value: "montserrat", id: "MS"}, {
			value: "morocco",
			id: "MA"
		}, {value: "mozambique", id: "MZ"}, {value: "myanmar", id: "MM"}, {value: "namibia", id: "NA"}, {
			value: "nauru",
			id: "NR"
		}, {value: "nepal", id: "NP"}, {value: "netherlands", id: "NL"},
		{value: "new caledonia", id: "NC"}, {value: "new zealand", id: "NZ"}, {
			value: "nicaragua",
			id: "NI"
		}, {value: "niger", id: "NE"}, {value: "nigeria", id: "NG"}, {
			value: "niue",
			id: "NU"
		}, {value: "norfolk island", id: "NF"}, {value: "northern mariana islands", id: "MP"}, {
			value: "norway",
			id: "NO"
		}, {value: "oman", id: "OM"}, {value: "pakistan", id: "PK"}, {
			value: "palau",
			id: "PW"
		}, {value: "palestine, state of", id: "PS"}, {value: "panama", id: "PA"}, {
			value: "papua new guinea",
			id: "PG"
		}, {value: "paraguay", id: "PY"}, {value: "peru", id: "PE"}, {
			value: "philippines",
			id: "PH"
		}, {value: "pitcairn", id: "PN"}, {value: "poland", id: "PL"}, {
			value: "portugal",
			id: "PT"
		}, {value: "puerto rico", id: "PR"}, {value: "qatar", id: "QA"}, {
			value: "r\u00e9union",
			id: "RE"
		}, {value: "romania", id: "RO"}, {value: "russian federation", id: "RU"}, {
			value: "rwanda",
			id: "RW"
		}, {value: "saint barth\u00e9lemy", id: "BL"}, {
			value: "saint helena, ascension and tristan da cunha",
			id: "SH"
		}, {value: "saint kitts and nevis", id: "KN"}, {
			value: "saint lucia",
			id: "LC"
		}, {value: "saint martin (french part)", id: "MF"}, {
			value: "saint pierre and miquelon",
			id: "PM"
		}, {value: "saint vincent and the grenadines", id: "VC"}, {value: "samoa", id: "WS"}, {
			value: "san marino",
			id: "SM"
		}, {value: "sao tome and principe", id: "ST"}, {value: "saudi arabia", id: "SA"}, {
			value: "senegal",
			id: "SN"
		}, {value: "serbia", id: "RS"}, {value: "seychelles", id: "SC"}, {
			value: "sierra leone",
			id: "SL"
		}, {value: "singapore", id: "SG"}, {value: "sint maarten (dutch part)", id: "SX"}, {
			value: "slovakia",
			id: "SK"
		}, {value: "slovenia", id: "SI"}, {value: "solomon islands", id: "SB"}, {value: "somalia", id: "SO"}, {
			value: "south africa",
			id: "ZA"
		}, {value: "south georgia and the south sandwich islands", id: "GS"}, {
			value: "south sudan",
			id: "SS"
		}, {value: "spain", id: "ES"}, {value: "sri lanka", id: "LK"}, {value: "sudan", id: "SD"}, {
			value: "surivalue",
			id: "SR"
		}, {value: "svalbard and jan mayen", id: "SJ"}, {value: "swaziland", id: "SZ"}, {
			value: "sweden",
			id: "SE"
		}, {value: "switzerland", id: "CH"}, {
			value: "syrian arab republic",
			id: "SY"
		}, {value: "taiwan, province of china", id: "TW"}, {
			value: "tajikistan",
			id: "TJ"
		}, {value: "tanzania, united republic of", id: "TZ"}, {
			value: "thailand",
			id: "TH"
		}, {value: "timor-leste", id: "TL"}, {value: "togo", id: "TG"}, {value: "tokelau", id: "TK"}, {
			value: "tonga",
			id: "TO"
		}, {value: "trinidad and tobago", id: "TT"}, {value: "tunisia", id: "TN"}, {
			value: "turkey",
			id: "TR"
		}, {value: "turkmenistan", id: "TM"}, {value: "turks and caicos islands", id: "TC"}, {
			value: "tuvalu",
			id: "TV"
		}, {value: "uganda", id: "UG"}, {value: "ukraine", id: "UA"}, {
			value: "united arab emirates",
			id: "AE"
		}, {value: "united kingdom", id: "GB"}, {value: "united states", id: "US"}, {
			value: "united states minor outlying islands",
			id: "UM"
		}, {value: "uruguay", id: "UY"}, {value: "uzbekistan", id: "UZ"}, {
			value: "vanuatu",
			id: "VU"
		}, {value: "venezuela, bolivarian republic of", id: "VE"}, {
			value: "viet nam",
			id: "VN"
		}, {value: "virgin islands, british", id: "VG"}, {
			value: "virgin islands, u.s.",
			id: "VI"
		}, {value: "wallis and futuna", id: "WF"}, {value: "western sahara", id: "EH"}, {
			value: "yemen",
			id: "YE"
		}, {value: "zambia", id: "ZM"}, {value: "zimbabwe", id: "ZW"}],
	countryList2 = [{value: "Afghanistan", id: "AF"}, {value: "\u00e5Land Islands", id: "AX"}, {
		value: "Albania",
		id: "AL"
	},
		{value: "Algeria", id: "DZ"}, {value: "American Samoa", id: "AS"}, {
			value: "Andorra",
			id: "AD"
		}, {value: "Angola", id: "AO"}, {value: "Anguilla", id: "AI"}, {
			value: "Antarctica",
			id: "AQ"
		}, {value: "Antigua And Barbuda", id: "AG"}, {value: "Argentina", id: "AR"}, {
			value: "Armenia",
			id: "AM"
		}, {value: "Aruba", id: "AW"}, {value: "Australia", id: "AU"}, {
			value: "Austria",
			id: "AT"
		}, {value: "Azerbaijan", id: "AZ"}, {value: "Bahamas", id: "BS"}, {
			value: "Bahrain",
			id: "BH"
		}, {value: "Bangladesh", id: "BD"}, {value: "Barbados", id: "BB"}, {value: "Belarus", id: "BY"}, {
			value: "Belgium",
			id: "BE"
		}, {value: "Belize", id: "BZ"}, {value: "Benin", id: "BJ"}, {value: "Bermuda", id: "BM"}, {
			value: "Bhutan",
			id: "BT"
		}, {value: "Bolivia, Plurinational State Of", id: "BO"}, {
			value: "Bonaire, Sint Eustatius And Saba",
			id: "BQ"
		}, {value: "Bosnia And Herzegovina", id: "BA"}, {value: "Botswana", id: "BW"}, {
			value: "Bouvet Island",
			id: "BV"
		}, {value: "Brazil", id: "BR"}, {
			value: "British Indian Ocean Territory",
			id: "IO"
		}, {value: "Brunei Darussalam", id: "BN"}, {value: "Bulgaria", id: "BG"}, {
			value: "Burkina Faso",
			id: "BF"
		}, {value: "Burundi", id: "BI"},
		{value: "Cambodia", id: "KH"}, {value: "Cameroon", id: "CM"}, {
			value: "Canada",
			id: "CA"
		}, {value: "Cape Verde", id: "CV"}, {value: "Cayman Islands", id: "KY"}, {
			value: "Central African Republic",
			id: "CF"
		}, {value: "Chad", id: "TD"}, {value: "Chile", id: "CL"}, {
			value: "China",
			id: "CN"
		}, {value: "Christmas Island", id: "CX"}, {value: "Cocos (Keeling) Islands", id: "CC"}, {
			value: "Colombia",
			id: "CO"
		}, {value: "Comoros", id: "KM"}, {
			value: "Congo",
			id: "CG"
		}, {value: "Congo, The Democratic Republic Of The", id: "CD"}, {value: "Cook Islands", id: "CK"}, {
			value: "Costa Rica",
			id: "CR"
		}, {value: "C\u00f4Te D'Ivoire", id: "CI"}, {value: "Croatia", id: "HR"}, {
			value: "Cuba",
			id: "CU"
		}, {value: "Cura\u00e7Ao", id: "CW"}, {value: "Cyprus", id: "CY"}, {
			value: "Czech Republic",
			id: "CZ"
		}, {value: "Denmark", id: "DK"}, {value: "Djibouti", id: "DJ"}, {
			value: "Dominica",
			id: "DM"
		}, {value: "Dominican Republic", id: "DO"}, {value: "Ecuador", id: "EC"}, {
			value: "Egypt",
			id: "EG"
		}, {value: "El Salvador", id: "SV"}, {value: "Equatorial Guinea", id: "GQ"}, {
			value: "Eritrea",
			id: "ER"
		}, {value: "Estonia", id: "EE"}, {value: "Ethiopia", id: "ET"}, {
			value: "Falkland Islands (Malvinas)",
			id: "FK"
		}, {value: "Faroe Islands", id: "FO"}, {value: "Fiji", id: "FJ"}, {
			value: "Finland",
			id: "FI"
		}, {value: "France", id: "FR"}, {value: "French Guiana", id: "GF"}, {
			value: "French Polynesia",
			id: "PF"
		}, {value: "French Southern Territories", id: "TF"}, {value: "Gabon", id: "GA"}, {
			value: "Gambia",
			id: "GM"
		}, {value: "Georgia", id: "GE"}, {value: "Germany", id: "DE"}, {
			value: "Ghana",
			id: "GH"
		}, {value: "Gibraltar", id: "GI"}, {value: "Greece", id: "GR"}, {
			value: "Greenland",
			id: "GL"
		}, {value: "Grenada", id: "GD"}, {value: "Guadeloupe", id: "GP"}, {
			value: "Guam",
			id: "GU"
		}, {value: "Guatemala", id: "GT"}, {value: "Guernsey", id: "GG"}, {
			value: "Guinea",
			id: "GN"
		}, {value: "Guinea-Bissau", id: "GW"}, {value: "Guyana", id: "GY"}, {
			value: "Haiti",
			id: "HT"
		}, {value: "Heard Island And Mcdonald Islands", id: "HM"}, {
			value: "Holy See (Vatican City State)",
			id: "VA"
		}, {value: "Honduras", id: "HN"}, {value: "Hong Kong", id: "HK"}, {
			value: "Hungary",
			id: "HU"
		}, {value: "Iceland", id: "IS"}, {value: "India", id: "IN"}, {
			value: "Indonesia",
			id: "ID"
		}, {value: "Iran, Islamic Republic Of", id: "IR"}, {value: "Iraq", id: "IQ"}, {
			value: "Ireland",
			id: "IE"
		}, {value: "Isle Of Man", id: "IM"}, {value: "Israel", id: "IL"}, {
			value: "Italy",
			id: "IT"
		}, {value: "Jamaica", id: "JM"}, {value: "Japan", id: "JP"}, {value: "Jersey", id: "JE"}, {
			value: "Jordan",
			id: "JO"
		}, {value: "Kazakhstan", id: "KZ"}, {value: "Kenya", id: "KE"}, {
			value: "Kiribati",
			id: "KI"
		}, {value: "Korea, Democratic People'S Republic Of", id: "KP"}, {
			value: "Korea, Republic Of",
			id: "KR"
		}, {value: "Kuwait", id: "KW"}, {value: "Kyrgyzstan", id: "KG"}, {
			value: "Lao People'S Democratic Republic",
			id: "LA"
		}, {value: "Latvia", id: "LV"}, {
			value: "Lebanon",
			id: "LB"
		}, {value: "Lesotho", id: "LS"}, {value: "Liberia", id: "LR"}, {
			value: "Libya",
			id: "LY"
		}, {value: "Liechtenstein", id: "LI"}, {value: "Lithuania", id: "LT"}, {
			value: "Luxembourg",
			id: "LU"
		}, {value: "Macao", id: "MO"}, {
			value: "Macedonia, The Former Yugoslav Republic Of",
			id: "MK"
		}, {value: "Madagascar", id: "MG"}, {value: "Malawi", id: "MW"}, {
			value: "Malaysia",
			id: "MY"
		}, {value: "Maldives", id: "MV"}, {value: "Mali", id: "ML"}, {
			value: "Malta",
			id: "MT"
		}, {value: "Marshall Islands", id: "MH"}, {value: "Martinique", id: "MQ"}, {value: "Mauritania", id: "MR"},
		{value: "Mauritius", id: "MU"}, {value: "Mayotte", id: "YT"}, {
			value: "Mexico",
			id: "MX"
		}, {value: "Micronesia, Federated States Of", id: "FM"}, {
			value: "Moldova, Republic Of",
			id: "MD"
		}, {value: "Monaco", id: "MC"}, {value: "Mongolia", id: "MN"}, {
			value: "Montenegro",
			id: "ME"
		}, {value: "Montserrat", id: "MS"}, {value: "Morocco", id: "MA"}, {
			value: "Mozambique",
			id: "MZ"
		}, {value: "Myanmar", id: "MM"}, {value: "Namibia", id: "NA"}, {value: "Nauru", id: "NR"}, {
			value: "Nepal",
			id: "NP"
		}, {value: "Netherlands", id: "NL"}, {value: "New Caledonia", id: "NC"}, {
			value: "New Zealand",
			id: "NZ"
		}, {value: "Nicaragua", id: "NI"}, {value: "Niger", id: "NE"}, {value: "Nigeria", id: "NG"}, {
			value: "Niue",
			id: "NU"
		}, {value: "Norfolk Island", id: "NF"}, {value: "Northern Mariana Islands", id: "MP"}, {
			value: "Norway",
			id: "NO"
		}, {value: "Oman", id: "OM"}, {value: "Pakistan", id: "PK"}, {
			value: "Palau",
			id: "PW"
		}, {value: "Palestine, State Of", id: "PS"}, {value: "Panama", id: "PA"}, {
			value: "Papua New Guinea",
			id: "PG"
		}, {value: "Paraguay", id: "PY"}, {value: "Peru", id: "PE"}, {
			value: "Philippines",
			id: "PH"
		}, {value: "Pitcairn", id: "PN"}, {
			value: "Poland",
			id: "PL"
		}, {value: "Portugal", id: "PT"}, {value: "Puerto Rico", id: "PR"}, {
			value: "Qatar",
			id: "QA"
		}, {value: "R\u00e9Union", id: "RE"}, {value: "Romania", id: "RO"}, {
			value: "Russian Federation",
			id: "RU"
		}, {value: "Rwanda", id: "RW"}, {
			value: "Saint Barth\u00e9Lemy",
			id: "BL"
		}, {value: "Saint Helena, Ascension And Tristan Da Cunha", id: "SH"}, {
			value: "Saint Kitts And Nevis",
			id: "KN"
		}, {value: "Saint Lucia", id: "LC"}, {
			value: "Saint Martin (French Part)",
			id: "MF"
		}, {value: "Saint Pierre And Miquelon", id: "PM"}, {
			value: "Saint Vincent And The Grenadines",
			id: "VC"
		}, {value: "Samoa", id: "WS"}, {value: "San Marino", id: "SM"}, {
			value: "Sao Tome And Principe",
			id: "ST"
		}, {value: "Saudi Arabia", id: "SA"}, {value: "Senegal", id: "SN"}, {
			value: "Serbia",
			id: "RS"
		}, {value: "Seychelles", id: "SC"}, {value: "Sierra Leone", id: "SL"}, {
			value: "Singapore",
			id: "SG"
		}, {value: "Sint Maarten (Dutch Part)", id: "SX"}, {value: "Slovakia", id: "SK"}, {
			value: "Slovenia",
			id: "SI"
		}, {value: "Solomon Islands", id: "SB"}, {value: "Somalia", id: "SO"}, {value: "South Africa", id: "ZA"}, {
			value: "South Georgia And The South Sandwich Islands",
			id: "GS"
		}, {value: "South Sudan", id: "SS"}, {value: "Spain", id: "ES"}, {
			value: "Sri Lanka",
			id: "LK"
		}, {value: "Sudan", id: "SD"}, {value: "Surivalue", id: "SR"}, {
			value: "Svalbard And Jan Mayen",
			id: "SJ"
		}, {value: "Swaziland", id: "SZ"}, {value: "Sweden", id: "SE"}, {
			value: "Switzerland",
			id: "CH"
		}, {value: "Syrian Arab Republic", id: "SY"}, {
			value: "Taiwan, Province Of China",
			id: "TW"
		}, {value: "Tajikistan", id: "TJ"}, {value: "Tanzania, United Republic Of", id: "TZ"}, {
			value: "Thailand",
			id: "TH"
		}, {value: "Timor-Leste", id: "TL"}, {value: "Togo", id: "TG"},
		{value: "Tokelau", id: "TK"}, {value: "Tonga", id: "TO"}, {
			value: "Trinidad And Tobago",
			id: "TT"
		}, {value: "Tunisia", id: "TN"}, {value: "Turkey", id: "TR"}, {
			value: "Turkmenistan",
			id: "TM"
		}, {value: "Turks And Caicos Islands", id: "TC"}, {value: "Tuvalu", id: "TV"}, {
			value: "Uganda",
			id: "UG"
		}, {value: "Ukraine", id: "UA"}, {value: "United Arab Emirates", id: "AE"}, {
			value: "United Kingdom",
			id: "GB"
		}, {value: "United States", id: "US"}, {
			value: "United States Minor Outlying Islands",
			id: "UM"
		}, {value: "Uruguay", id: "UY"}, {value: "Uzbekistan", id: "UZ"},
		{value: "Vanuatu", id: "VU"}, {value: "Venezuela, Bolivarian Republic Of", id: "VE"}, {
			value: "Viet Nam",
			id: "VN"
		}, {value: "Virgin Islands, British", id: "VG"}, {
			value: "Virgin Islands, U.S.",
			id: "VI"
		}, {value: "Wallis And Futuna", id: "WF"}, {value: "Western Sahara", id: "EH"}, {
			value: "Yemen",
			id: "YE"
		}, {value: "Zambia", id: "ZM"}, {value: "Zimbabwe", id: "ZW"}], tabsIconClass = {
		chat_details: "fa-info",
		knowledge_base: "fa-book",
		shortcuts: "fa-cut",
		history: "fa-history",
		alerts: "fa-bell",
		shopify: "fa-shopping-bag"
	}, visitorLanguages = {
		ar: "\u0627\u0644\u0639\u064e\u0631\u064e\u0628\u0650\u064a\u0629",
		az: "Az\u0259rbaycan",
		bg: "\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
		bn: "\u09ac\u09be\u0982\u09b2\u09be",
		cat: "catal\u00e0",
		cs: "\u010de\u0161tina",
		da: "dansk",
		de: "Deutsch",
		el: "\u03b5\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
		en: "English",
		et: "eesti",
		es: "espa\u00f1ol",
		fa: "\u0641\u0627\u0631\u0633\u06cc",
		fi: "suomi",
		fil: "Filipino",
		fr: "fran\u00e7ais",
		he: "\u05e2\u05d1\u05e8\u05d9\u05ea",
		hy_am: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576",
		hi: "\u0939\u093f\u0902\u0926\u0940",
		hr: "hrvatski",
		hu: "magyar",
		id: "Bahasa Indonesia",
		it: "italiano",
		ja: "\u65e5\u672c\u8a9e",
		ka: "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8 \u10d4\u10dc\u10d0",
		ko: "\ud55c\uad6d\uc5b4",
		lv: "latvie\u0161u",
		lt: "lietuvi\u0173",
		ms: "Bahasa Melayu",
		mk: "\u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438 \u0458\u0430\u0437\u0438\u043a",
		nl: "Nederlands",
		no: "norsk",
		pl: "polski",
		pt: "portugu\u00eas (Portugal)",
		pt_br: "portugu\u00eas (Brasil)",
		ro: "rom\u00e2n\u0103",
		ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
		sk: "sloven\u010dina",
		sl: "sloven\u0161\u010dina",
		sr: "\u0441\u0440\u043f\u0441\u043a\u0438 (cyrilic)",
		sr_cs: "srpski (latin)",
		sq: "shqip",
		sv: "svenska",
		th: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
		tr: "T\u00fcrk\u00e7e",
		uk: "\u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
		vi: "Ti\u1ebfng Vi\u1ec7t",
		zh_cn: "\u7b80\u5316\u5b57",
		zh_tw: "\u7e41\u9ad4\u5b57"
	}, rtlLanguages = ["ar", "he", "fa"],
	embedWidgetCode = '<div id=\'__EMBED_ID__\'></div>\n\x3c!--Start of Tawk.to Script--\x3e\n<script type="text/javascript">\nvar Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); Tawk_API.embedded=\'__EMBED_ID__\';\n(function(){\nvar s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];\ns1.async=true;\ns1.src=\'' +
		GLOBAL_EMBED_SERVER_URL + "/__SITE_ID__/__WIDGET_ID__';\ns1.charset='UTF-8';\ns1.setAttribute('crossorigin','*');\ns0.parentNode.insertBefore(s1,s0);})();\n\x3c/script>\n\x3c!--End of Tawk.to Script--\x3e",
	inlineWidgetCode = '\x3c!--Start of Tawk.to Script--\x3e\n<script type="text/javascript">\nvar Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\n(function(){\nvar s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];\ns1.async=true;\ns1.src=\'' + GLOBAL_EMBED_SERVER_URL +
		"/__SITE_ID__/__WIDGET_ID__';\ns1.charset='UTF-8';\ns1.setAttribute('crossorigin','*');\ns0.parentNode.insertBefore(s1,s0);\n})();\n\x3c/script>\n\x3c!--End of Tawk.to Script--\x3e",
	formChangeAlert = '<div id="unsaved-alert" class="alert alert-warning text-center"><h4 class="alert-heading">{{unsavedTitle}}</h4><p>{{unsavedQuestion}}</p><div><button id="discard-changes" class="btn btn-default">{{discardChanges}}</button><button id="continue-edit" class="btn btn-tawk-pink">{{continueEdit}}</button><button id="save-changes" class="btn btn-primary">{{saveChanges}}</button></div></div>',
	regEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/i,
	randomString = function (a, c) {
		var d = [], b = 68;
		a = a || 5;
		c && (b -= 6);
		for (var e = 0; e < a; e++) d.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&?".charAt(Math.floor(Math.random() * b)));
		return d.join("")
	},
	numberFormat = function (a) {
		return 1E6 <= a ? 0 === a % 1E6 ? a / 1E5 + "M" : (a / 1E5).toFixed(1) + "M" : 1E3 <= a ? 0 === a % 1E3 ? a / 1E3 + "K" : (a / 1E3).toFixed(1) + "K" : a
	}, printChatTranscript = function (a) {
		a = '<html><head><title>Chat Transcript</title><meta charset="UTF-8"></head><body>' + a + '<script type="text/javascript">var printSuccess = true; if (document.execCommand) {printSuccess = document.execCommand("print", false, null);} if(!printSuccess){window.print();}\x3c/script></body></html>';
		var c = document.createElement("iframe");
		c.src =
			"about:blank";
		c.style.cssText = "display: none";
		document.body.appendChild(c);
		c = c.contentWindow ? c.contentWindow : c.contentDocument.document ? c.contentDocument.document : c.contentDocument;
		c.document.open();
		c.document.write(a);
		c.document.close()
	}, encodeStr = function (a) {
		var c, d = {"&quot;": '"', "&#39;": "'", "&lt;": "<", "&gt;": ">"};
		a = a.replace(/&/g, "&amp;");
		for (c in d) a = a.replace(RegExp(d[c], "g"), c);
		return a
	}, decodeStr = function (a) {
		var c = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#x2F;": "/", "&#39;": "'"};
		return ("" + a).replace(/(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;|&#39;)/g, function (a) {
			return c[a]
		})
	}, sortList = function (a, c, d) {
		var b = d ? 1 : -1, e = d ? -1 : 1;
		return a.slice(0, a.length).sort(function (a, d) {
			return a.get(c).toLowerCase() < d.get(c).toLowerCase() ? b : a.get(c).toLowerCase() > d.get(c).toLowerCase() ? e : 0
		})
	}, toScrollBottom = function (a) {
		var c = $(a)[0].offsetHeight;
		return 30 > $(a)[0].scrollHeight - ($(a)[0].scrollTop + c)
	}, filterList = function (a, c, d) {
		var b = RegExp(d, "gi"), e = [];
		a.forEach(function (a) {
			a.get(c).match(b) && e.pushObject(a)
		});
		return e
	}, inViewport = function (a, c) {
		"function" === typeof jQuery && a instanceof jQuery && (a = a[0]);
		var d = a.getBoundingClientRect();
		return 0 <= d.top && 0 <= d.left && d.bottom <= $(c).height() && d.right <= $(c).width()
	}, getPageCategories = function () {
		var a = [];
		Object.keys(translation.site_categories).forEach(function (c) {
			a.push({value: c, text: translation.site_categories[c].message})
		});
		return a
	}, getPageSubCategories = function (a) {
		var c = [], d = "site_subcategories_" + a;
		if (translation[d]) return Object.keys(translation[d]).forEach(function (a) {
			c.pushObject({
				value: a,
				text: translation[d][a].message
			})
		}), c
	}, escapeRegExp = function (a) {
		return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
	}, getVisitorLanguageSelect = function () {
		return Object.keys(visitorLanguages).map(function (a) {
			return {value: a, text: visitorLanguages[a]}
		})
	}, getContrast = function (a) {
		a = a.replace("#", "");
		6 > a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
		return 8388607.5 < parseInt(a, 16) ? "white" : "black"
	}, searchCountries = function (a) {
		var c, d = [], b = countryList();
		a = a.toLowerCase();
		c = RegExp(a, "gi");
		b.forEach(function (a) {
			a.value.toLowerCase().match(c) && d.pushObject(a)
		});
		return d
	}, getCountryByCode = function (a) {
		var c;
		countryList2.every(function (d) {
			return d.id === a ? (c = d.value, !1) : !0
		});
		return c
	}, getCities = function (a, c, d) {
		var b, e = [];
		socketConnector.getCities(a, c, function (a, c) {
			b = JSON.parse(c);
			if (a || !b.predictions.length) return d();
			b.predictions.forEach(function (a, b) {
				var c, d = [];
				c = a.terms.slice(0, a.terms.length - 1);
				c.forEach(function (a) {
					d.push(a.value)
				});
				c = {
					id: a.reference, name: d.join(", "),
					state: 1 < c.length ? c[1].value : null, city: c[0].value, index: b
				};
				e.push(c)
			});
			d(e)
		})
	}, formatFileSize = function (a) {
		var c = "Bytes KB MB GB TB PB EB ZB YB".split(" ");
		a = parseInt(a, 10);
		if (!a) return "0Bytes";
		for (var d = 1; d < c.length; d++) if (a < Math.pow(1024, d)) return Math.round(100 * (a / Math.pow(1024, d - 1))) / 100 + c[d - 1];
		return a
	}, capitalizeFirstLetter = function (a) {
		return a.charAt(0).toUpperCase() + a.slice(1)
	}, checkAndSetConfirmView = function (a, c, d, b, e, f, g) {
		a = {
			needInput: a,
			callback: c,
			confirmationQuestion: d ? d : languageParser.translate("action_messages",
				"confirm_delete"),
			confirmationAnswer: b,
			confirmationHeader: e ? e : languageParser.translate("action_messages", "title_confirm_delete"),
			confirmationProceedText: f ? f : languageParser.translate("buttons", "delete_text"),
			positiveProceeed: g ? g : !1
		};
		Tawk.confirmDeleteView ? (Tawk.confirmDeleteView.setProperties(a), Tawk.confirmDeleteView.$() ? Tawk.confirmDeleteView.openView() : Tawk.confirmDeleteView.append()) : (Tawk.confirmDeleteView = Tawk.ConfirmDeleteView.create(a), Tawk.confirmDeleteView.append())
	}, checkAndSetAlertBoxView =
		function (a, c) {
			Tawk.alertBox ? (Tawk.alertBox.set("title", a), Tawk.alertBox.set("message", c), Tawk.alertBox.$() ? (Tawk.alertBox.openView(), Tawk.alertBox.$().show()) : Tawk.alertBox.append()) : (Tawk.alertBox = Tawk.AlertBox.create({
				title: a,
				message: c
			}), Tawk.alertBox.append())
		}, beautifyAPIKey = function (a) {
		a = decodeStr(a);
		return a = capitalizeFirstLetter(a.replace(/[-_]/g, " "))
	}, beautifyAPIValue = function (a) {
		return conversationProcess.parseText(a)
	}, generateLightColors = function () {
		return "rgb(" + (Math.floor(106 * Math.random()) +
			50) + "," + (Math.floor(106 * Math.random()) + 50) + "," + (Math.floor(106 * Math.random()) + 50) + ")"
	}, mergeObjects = function (a, c) {
		for (var d in c) c.hasOwnProperty(d) && (a[d] = a[d] ? mergeObjects(a[d], c[d]) : c[d]);
		return a
	}, throttle = function (a, c, d) {
		c = c || (c = 250);
		var b;
		return function () {
			var e = d || this, f = (new Date).getTime(), g = arguments;
			b && f < b + c || (b = f, a.apply(e, g))
		}
	}, formatDate = function (a) {
		var c = moment();
		a = moment(a);
		return a.isSame(c, "day") ? a.format("HH:mm") : a.isSame(c, "year") ? a.format("DD/MMM HH:mm") : a.format("DD/MMM/YYYY HH:mm")
	},
	beautifyContentTab = function (a) {
		var c;
		if (a) a = encodeStr(a); else return "";
		a = a.replace(/\n/g, "<br />");
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
			b = c.substring(0, b) + "<b>" + c.substring(b + 1, e) + "</b>" + c.substring(e + 1, c.length);
			a = a.replace(c,
				b)
		});
		return a
	}, isEmail = function (a) {
		return regEmail.test(a)
	};
$.validator.addMethod("multiemail", function (a, c, d) {
	if (this.optional(c)) return !0;
	var b = a.split(","), e = !0;
	if (b.length > d) return !1;
	d = 0;
	for (var f = b.length; d < f; d++) a = b[d], e = e && jQuery.validator.methods.email.call(this, $.trim(a), c);
	return e
});
$.validator.addMethod("validDomain", function (a, c) {
	return this.optional(c) || /^(\*\.)?((([a-z]|[0-9]|\-)+)\.)+([a-z])+$/i.test(a)
});
$.validator.addMethod("requiredGroup", function (a, c) {
	return $(c).parents(".required-group-parent").find(".required-group:filled").length
});
$.validator.addMethod("ipAddress", function (a, c) {
	return this.optional(c) || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/i.test(a)
});
$.validator.addMethod("alphaNumericWithDot", function (a, c) {
	return this.optional(c) || /^[a-z0-9\.]+$/i.test(a)
});
$.validator.addMethod("isTawkIdAvailable", function (a, c) {
	return $(c).hasClass("invalid") ? !1 : !0
});
$.validator.addMethod("hexColorCode", function (a, c) {
	return this.optional(c) ||
		/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(a)
});
$.validator.addMethod("tagLength", function (a, c) {
	return $(c).hasClass("invalid-length") ? !1 : !0
});
$.validator.addMethod("tagTotal", function (a, c) {
	return $(c).hasClass("invalid-total") ? !1 : !0
});
$.validator.addMethod("url_prefix", function (a, c) {
	return this.optional(c) || /^(https?:\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
});
$.validator.addMethod("shortcut_exist", function (a, c) {
	return $(c).hasClass("shortcut_exist") ? !1 : !0
});
$.validator.addMethod("mdb_syntax", function (a, c) {
	return this.optional(c) || !/[\.\/\$\s<>'"\*]+/i.test(a)
});
$.validator.addMethod("partial_ip", function (a, c) {
	return this.optional(c) || /^([0-9]{0,3}[.]?){1,3}([0-9]{0,3})$/.test(a)
});
$.validator.addMethod("emptySelection", function (a, c) {
	return $(c).hasClass("selection-empty") ? !1 : !0
});
$.validator.addMethod("ccNumber", function (a, c) {
	return Stripe ? Stripe.card.validateCardNumber(a) :
		$.validator.methods.creditcard(a, c)
});
$.validator.addMethod("ccExpiryFormat", function (a, c) {
	return this.optional(c) || /^[0-9]{2}\/[0-9]{2}$/.test(a)
});
$.validator.addMethod("ccExpiryDate", function (a, c) {
	var d = a.split("/");
	return Stripe ? Stripe.card.validateExpiry(d[0], d[1]) : this.optional(c)
});
$.validator.addMethod("cvcCheck", function (a, c) {
	return Stripe ? Stripe.card.validateCVC(a) : this.optional(c)
});
$.validator.addMethod("secureUrl", function (a, c) {
	a.split("/");
	return "https" !== a.substring(0, 5) ? !1 : jQuery.validator.methods.url.call(this,
		$.trim(a), c)
});
$.validator.addMethod("validPhoneNumber", function (a, c) {
	return this.optional(c) || /^[+]?[0-9]{5,50}$/.test(a)
});
$.validator.addMethod("twitterFormat", function (a, c) {
	return 0 === $.trim(a).length ? !0 : jQuery.validator.methods.url.call(this, $.trim(a), c) ? !1 : this.optional(c) || /^[0-9A-Za-z_]{1,15}$/.test(a)
});
$.validator.addMethod("facebookFormat", function (a, c) {
	return 0 === $.trim(a).length ? !0 : this.optional(c) || /^(http:\/\/|https:\/\/)?(www\.|m\.)?facebook\.com\/.+$/.test(a)
});
$.validator.addMethod("groupNameFormat",
	function (a, c) {
		return this.optional(c) || /^[a-z0-9\-\_]{1,21}$/.test(a)
	});
jQuery.fn.doesExist = function () {
	return 0 < jQuery(this).length
};
$(document).ready(function () {
	window.$.root_ = $("body");
	window.$.navAsAjax = !1;
	$.sound_on = !1;
	$(".js-status-update a").click(function () {
		var a = $(this).text(), c = $(this);
		c.parents(".btn-group").find(".dropdown-toggle").html(a + ' <span class="caret"></span>');
		c.parents(".dropdown-menu").find("li").removeClass("active");
		c.parent().addClass("active")
	});
	moment.relativeTimeThreshold("s",
		60);
	moment.locale(LOCALE, translation.momentjs);
	Object.keys(translation.form_validation_messages).forEach(function (a) {
		$.validator.messages[a] = $.validator.format(translation.form_validation_messages[a].message)
	});
	$.validator.messages.multiemail = $.validator.format(translation.form_validation_messages.email.message);
	$.validator.messages.emptySelection = $.validator.format("Must have at least 1 choice.");
	translation.sidebar.active_chats_short = {
		message: translation.sidebar.active_chats.message.substring(0,
			1)
	};
	$("#back-top").click(function () {
		$(".innerContent").animate({scrollTop: 0}, "slow");
		return !1
	});
	$(window).focus(function () {
		notificationController && notificationController.resetNotification()
	});
	$(window).resize(function () {
		979 < $(window).width() && $("body").removeClass("hidden-menu")
	});
	$("body").append(HandlebarsTemplates.alertBox({
		elementId: "loading",
		title: languageParser.translate("action_messages", "loading"),
		message: languageParser.translate("loading_messages", "q" + (Math.floor(10 * Math.random()) + 1))
	}));
	$("body").on("click", function (a) {
		$('[rel="popover"], [data-rel="popover"]').each(function () {
			$(this).is(a.target) || (0 !== $(this).has(a.target).length || 0 !== $(".popover").has(a.target).length) || $(this).popover && $(this).popover("hide")
		})
	});
	$("body").on("hidden.bs.modal", ".modal", function () {
		$(this).removeData("bs.modal")
	});
	$("body").on("click", '[data-action="launchFullscreen"]', function (a) {
		launchFullscreen(document.documentElement);
		a.preventDefault()
	});
	$("body").on("click", '[data-action="minifyMenu"]',
		function (a) {
			var c = $(this);
			minifyMenu(c);
			a.preventDefault()
		});
	$("body").on("click", '[data-action="toggleMenu"]', function (a) {
		toggleMenu();
		a.preventDefault()
	});
	$(document).mouseup(function (a) {
		$(".ajax-dropdown").is(a.target) || 0 !== $(".ajax-dropdown").has(a.target).length || ($(".ajax-dropdown").fadeOut(150), $(".ajax-dropdown").prev().removeClass("active"))
	});
	Modernizr.draganddrop && ($("body").on("dragover", function (a) {
		a.preventDefault();
		a.stopPropagation()
	}), $("body").on("dragleave", function (a) {
		a.preventDefault();
		a.stopPropagation()
	}), $("body").on("dragend", function (a) {
		a.preventDefault();
		a.stopPropagation()
	}), $("body").on("drop", function (a) {
		a.preventDefault();
		a.stopPropagation()
	}));
	$("body").delegate(".change-route", "click", function (a) {
		var c = $(this).attr("href");
		a.stopPropagation();
		a.preventDefault();
		c = c.replace(window.location.host + "/#/", "").replace(/(http[s]?):\/\//, "");
		Tawk.routing.redirectUrl(c)
	});
	addDeviceType();
	mobileCheckActivation()
});
var addDeviceType = function () {
	if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) $.root_.addClass("mobile-detected");
	else return $.root_.addClass("desktop-detected"), !1
}, mobileCheckActivation = function () {
	979 > $(window).width() ? ($.root_.addClass("mobile-view-activated"), $.root_.removeClass("minified")) : $.root_.hasClass("mobile-view-activated") && $.root_.removeClass("mobile-view-activated")
}, launchFullscreen = function (a) {
	$.root_.hasClass("full-screen") ? ($.root_.removeClass("full-screen"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen &&
		document.webkitExitFullscreen()) : ($.root_.addClass("full-screen"), a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen())
}, minifyMenu = function (a) {
	$.root_.hasClass("menu-on-top") || ($.root_.toggleClass("minified"), $.root_.removeClass("hidden-menu"), $("html").removeClass("hidden-menu-mobile-lock"), a.effect("highlight", {}, 500))
}, toggleMenu = function () {
	$.root_.hasClass("menu-on-top") ?
		$.root_.hasClass("menu-on-top") && $.root_.hasClass("mobile-view-activated") && ($("html").toggleClass("hidden-menu-mobile-lock"), $.root_.toggleClass("hidden-menu"), $.root_.removeClass("minified")) : ($("html").toggleClass("hidden-menu-mobile-lock"), $.root_.toggleClass("hidden-menu"), $.root_.removeClass("minified"))
};