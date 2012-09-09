// Setup for small screens
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

MasterCalendar.modules.mobile = function (cal) {
	var mobile = new CalendarMobile({ cal: cal });
	cal.on('viewDisplay', $.proxy(mobile.update, mobile));
	if (mobile.isActive()) {
		return { defaultView: 'list' };
	}
};
MasterCalendar.modules.mobile.depends = 'core';

