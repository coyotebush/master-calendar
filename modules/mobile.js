// Setup for small screens
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

var CalendarMobile = function (options) {
	this.cal = options.cal;
};

CalendarMobile.prototype.isActive = function () {
	return this.cal.css('position') === 'static';
};

CalendarMobile.prototype.update = function (e, viewObj) {
	this.cal.find('.fc-header-title')
		.toggleClass('fc-header-title-hidden', viewObj.name === 'list');
};

MasterCalendar.modules.mobile = function (cal) {
	var mobile = new CalendarMobile({ cal: cal });
	cal.on('viewDisplay', $.proxy(mobile.update, mobile));
	if (mobile.isActive()) {
		return { defaultView: 'list' };
	}
};
MasterCalendar.modules.mobile.depends = 'core';

