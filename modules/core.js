// Initial options
/*jslint browser: true */
/*global MasterCalendar: true, jQuery: false */
/* vim: set sw=2 ts=2 noet */
(function (MasterCalendar, $, undefined) {
	'use strict';
	MasterCalendar.modules = MasterCalendar.modules || {};
	MasterCalendar.modules.core = function (cal) {
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

			viewDisplay: function (viewObj) {
				cal.trigger('viewDisplay', viewObj);
			}
		};
	};
}(window.MasterCalendar = window.MasterCalendar || {}, jQuery));

