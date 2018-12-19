Handlebars.registerHelper("I18n", function (a, c) {
	var d, b = c.hash.context, e = c.hash.variables, f = c.hash.replaceVar, g = c.hash.externalLink;
	a = a.toString();
	e = e ? JSON.parse(e) : {};
	c.contexts && f && Object.keys(e).forEach(function (a) {
		var b =
			Ember.get(c.contexts[0], e[a]);
		"undefined" !== typeof b && (e[a] = "string" === typeof b ? encodeStr(b) : b)
	});
	g && (g = JSON.parse(g), e[g.variable] = '<a href="' + Tawk[g.controller].get(g.property) + '" target="_blank">');
	c.contexts && (c.contexts[0] && Ember.get(c.contexts[0], a)) && (d = Ember.get(c.contexts[0], a));
	d instanceof String ? a = d.toString() : "string" === typeof d && (a = d);
	return new Handlebars.SafeString(languageParser.translate(b, a, e, translation))
});
Handlebars.registerHelper("rating", function (a, c) {
	var d = "", b = Ember.get(c.contexts[0],
		a);
	-1 === b ? d = '<i class="fa fa-thumbs-o-down"></i>' : 1 === b && (d = '<i class="fa fa-thumbs-o-up"></i>');
	return d
});
Handlebars.registerHelper("langPreview", function (a, c) {
	var d;
	d = c.contexts[0];
	var b = c.hash.variables, b = b ? JSON.parse(b) : {};
	if (!d) return new Handlebars.SafeString(a);
	d = languageParser.translate("widget_preview_translation", d + "-" + a, b, translation);
	return new Handlebars.SafeString(d)
});
Handlebars.registerHelper("breaklines", function (a, c) {
	text = a ? Ember.get(c.contexts[0], a) : Handlebars.Utils.escapeExpression(c.contexts[0]);
	text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
	return new Handlebars.SafeString(text)
});
Handlebars.registerHelper("emojify", function (a) {
	return emojione.toImage(a)
});
Ember.Handlebars.registerHelper("eachProperty", function (a, c) {
	var d = [], b = this[a], e;
	for (e in b) d.push({key: e, value: b[e]});
	this[a] = d;
	return Ember.Handlebars.helpers.each.apply(this, Array.prototype.slice.call(arguments))
});