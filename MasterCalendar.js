/*jslint browser: true */
/*global $: false */
/* vim: set sw=2 ts=2 noet */
var MasterCalendar = {
	modules: {},
	init: function () {
		'use strict';
		var cal = $('#calendar'), options = {}, m, run = true,
			throwIt = function (e) { return function () { throw e; }; };
		while (run) {
			run = false;
			for (m in MasterCalendar.modules) {
				if (MasterCalendar.modules.hasOwnProperty(m)
						&& $.isFunction(MasterCalendar.modules[m])
						&& !MasterCalendar.modules[m].run
						&& (!MasterCalendar.modules[m].depends
							|| MasterCalendar.modules[MasterCalendar.modules[m].depends].run)) {
					try {
						$.extend(options, MasterCalendar.modules[m](cal, MasterCalendar.sources));
					} catch (e) {
						setTimeout(throwIt(e), 0);
					}
					run = MasterCalendar.modules[m].run = true;
				}
			}
		}
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	}
};

$(MasterCalendar.init);

