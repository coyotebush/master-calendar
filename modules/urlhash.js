// URL hash (format: view[/date])
/*jslint browser: true, eqeq: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';
	var startHash = location.hash.slice(1).split('/');
	var startView = ($.fullCalendar.views[startHash[0]] && startHash[0]);
	var startDate = (startHash[1] && $.fullCalendar.parseISO8601(startHash[1], true));
	var opts = { defaultView: startView };

	if (startDate) {
		$.extend(opts, {
			year: startDate.getFullYear(),
			month: startDate.getMonth(),
			date: startDate.getDate()
		});
	}

	/*jslint unparam: true*/
	cal.on('viewDisplay', function (e, viewObj) {
		var hash = '#';
		var now = new Date();
		hash += viewObj.name;
		if (now < viewObj.start || now > viewObj.end) {
			hash += '/' + $.fullCalendar.formatDate(viewObj.start, 'yyyy-MM-dd');
		}
		location.replace(hash);
	});
	/*jslint unparam: false*/

	return opts;
});
