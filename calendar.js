/*global $: false */
/* vim: set sw=2 ts=2 noet */
var registerCalendarModule;

(function () {
	'use strict';
	var modules = [];

	registerCalendarModule = function (f) {
		modules.push(f);
	};

	$(function () {
		var cal = $('#calendar'), options = {};
		$(modules).each(function () {
			try { $.extend(options, this(cal)); } catch (e) {}
		});
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	});
}());

