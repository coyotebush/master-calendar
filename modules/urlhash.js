// URL hash (format: view[/date])
/*jslint browser: true, eqeq: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';
MasterCalendar.modules.urlhash = function (cal) {
	return new UrlState({ location: window.location, cal: cal }).read();
};

