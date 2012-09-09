// Fit agenda views to window height
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

MasterCalendar.modules.fullHeightAgenda = function (cal) {
	var resizer = new CalendarResizer({ cal: cal });
	cal.on('viewDisplay windowResize', $.proxy(resizer.resize, resizer));
};

