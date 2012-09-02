/* Save the calendar view state in the URL.
 */
/*jslint vars: true*/
/*global $: false*/
'use strict';

var UrlState = function (options) {
	this.location = options.location;
	options.cal.on('viewDisplay', $.proxy(this.update, this));
};

UrlState.prototype.read = function () {
	var startHash = this.location.hash.slice(1).split('/');
	var startView = ($.fullCalendar.views[startHash[0]] && startHash[0]);
	var startDate = (startHash[1] && $.fullCalendar.parseISO8601(startHash[1], true));
	return { defaultView: startView, date: startDate };
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

