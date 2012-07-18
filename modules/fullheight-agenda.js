// Fit agenda views to window height
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';
	var resizeCalendar = function () {
		if (cal.fullCalendar('getView').name.indexOf('agenda') > -1) {
			cal.fullCalendar('option', 'height',
				cal.prop('clientHeight'));
		} else {
			cal.fullCalendar('option', 'height', 0);
			cal.fullCalendar('option', 'aspectRatio', 1.35);
		}
	};
	$(window).resize(resizeCalendar);
	cal.on('viewDisplay calendarStart', resizeCalendar);
});

