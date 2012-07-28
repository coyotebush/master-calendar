// Setup for small screens
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';
	if (cal.css('position') === 'static') {
		return { defaultView: 'list' };
	}
});

