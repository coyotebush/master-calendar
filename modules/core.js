// Initial options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.modules.core = function (cal) {
	'use strict';
	return {
		header: {
			left: 'today prev,next title',
			center: '',
			right: 'month,agendaWeek,list'
		},
		listNoHeight: true,
		listSections: 'month',
		theme: true,
		allDayDefault: false,
		defaultEventMinutes: 120,
		timeFormat: 'H:mm ',
		weekMode: 'variable',

		viewDisplay: function (viewObj) {
			cal.trigger('viewDisplay', viewObj);
		}
	};
};

