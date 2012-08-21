// Setup for small screens
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.modules.mobile = function (cal) {
	'use strict';
	cal.on('viewDisplay', function () {
		cal.find('.fc-header-title')
			.toggleClass('fc-header-title-hidden',
				(cal.fullCalendar('getView').name === 'list' && cal.css('position') === 'static')
			);
	});
	if (cal.css('position') === 'static') {
		return { defaultView: 'list' };
	}
};
MasterCalendar.modules.mobile.depends = 'core';

