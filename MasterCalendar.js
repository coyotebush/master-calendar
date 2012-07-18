/*global $: false */
/* vim: set sw=2 ts=2 noet */
var MasterCalendar = (function () {
	'use strict';
	var modules = [], sources = [];

	return {
		registerModule: function (f) {
			modules.push(f);
		},

		addSources: function (ss) {
			sources = sources.concat(ss);
		},

		init: function () {
			var cal = $('#calendar'), options = {};
			$(modules).each(function () {
				try { $.extend(options, this(cal, sources)); } catch (e) {}
			});
			cal.fullCalendar(options);
			cal.trigger('calendarStart');
		}
	};
}());

$(MasterCalendar.init);

