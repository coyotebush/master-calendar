// URL hash (format: [view[/date]]) 
/*jslint browser: true, eqeq: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';
	var defaultView = 'month';
	var startHash = location.hash.slice(1).split('/');
	var startView =
		($.fullCalendar.views[startHash[0]] && startHash[0])
		|| defaultView;
	var startDate =
		(startHash[1] && $.fullCalendar.parseISO8601(startHash[1], true))
		|| new Date();

	/*jslint unparam: true*/
	cal.on('viewDisplay', function (e, viewObj) {
		var hash = '#';
		if (Date.now() < viewObj.start || Date.now() > viewObj.end) {
			hash += viewObj.name + '/' +
				$.fullCalendar.formatDate(viewObj.start, 'yyyy-MM-dd');
		} else if (viewObj.name != defaultView) {
			hash += viewObj.name;
		}
		location.replace(hash);
	});
	/*jslint unparam: false*/

	return {
		defaultView: startView,
		year: startDate.getFullYear(),
		month: startDate.getMonth(),
		date: startDate.getDate()
	};
});
