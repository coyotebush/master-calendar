// URL hash (format: view[/date])
/*jslint browser: true, eqeq: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';
var UrlState = function (options) {
	this.location = options.location;
	options.cal.on('viewDisplay', $.proxy(this.update, this));
};

UrlState.prototype.read = function () {
	var startHash = this.location.hash.slice(1).split('/');
	var startView = ($.fullCalendar.views[startHash[0]] && startHash[0]);
	var startDate = (startHash[1] && $.fullCalendar.parseISO8601(startHash[1], true));
	var opts = { defaultView: startView };

	if (startDate) {
		$.extend(opts, {
			year: startDate.getFullYear(),
			month: startDate.getMonth(),
			date: startDate.getDate()
		});
	}
	return opts;
};

UrlState.prototype.update = function (e, viewObj) {
	var hash = '#';
	var now = new Date();
	hash += viewObj.name;
	if (now < viewObj.start || now > viewObj.end) {
		hash += '/' + $.fullCalendar.formatDate(viewObj.start, 'yyyy-MM-dd');
	}
	this.location.replace(hash);
};

MasterCalendar.modules.urlhash = function (cal) {
	return new UrlState({ location: window.location, cal: cal }).read();
};

