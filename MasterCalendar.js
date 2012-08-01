/*jslint browser: true */
/*global $: false */
/* vim: set sw=2 ts=2 noet */
var MasterCalendar = {
	modules: {},
	init: function () {
		'use strict';
		var cal = $('#calendar'), options = {}, m, throwIt = function (e) {
			return function () { throw e; };
		};
		for (m in MasterCalendar.modules) {
			if (MasterCalendar.modules.hasOwnProperty(m)
					&& $.isFunction(MasterCalendar.modules[m])) {
				try {
					$.extend(options, MasterCalendar.modules[m](cal, MasterCalendar.sources));
				} catch (e) {
					setTimeout(throwIt(e), 0);
				}
			}
		}
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	}
};

$(MasterCalendar.init);

