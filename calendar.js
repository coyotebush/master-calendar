/*global $: false */
/* vim: set sw=2 ts=2 noet */
var registerCalendarModule, addCalendarSources;

(function () {
	'use strict';
	var modules = [], sources = [];

	registerCalendarModule = function (f) {
		modules.push(f);
	};

	addCalendarSources = function (ss) {
		sources = sources.concat(ss);
	};

	$(function () {
		var cal = $('#calendar'), options = {};
		$(modules).each(function () {
			try { $.extend(options, this(cal, sources)); } catch (e) {}
		});
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	});
}());

