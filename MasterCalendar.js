/*jslint browser: true */
/*global MasterCalendar: true, jQuery: false */
/* vim: set sw=2 ts=2 noet */
(function (MasterCalendar, $) {
	'use strict';
	MasterCalendar.modules = {};
	MasterCalendar.init = function () {
		var cal = $('#calendar'), options = {}, m;
		for (m in MasterCalendar.modules) {
			if (MasterCalendar.modules.hasOwnProperty(m)
					&& $.isFunction(MasterCalendar.modules[m])) {
				try {
					$.extend(options, MasterCalendar.modules[m](cal, MasterCalendar.sources));
				} catch (e) {}
			}
		}
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	};
}(window.MasterCalendar = window.MasterCalendar || {}, jQuery));

jQuery(MasterCalendar.init);

