// Fit agenda views to window height
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';
var CalendarResizer = function (options) {
	this.cal = options.cal;
};

CalendarResizer.prototype.resize = function (e, viewObj) {
	if (viewObj.name.indexOf('agenda') > -1
			&& this.cal.css('position') === 'absolute') {
		this.cal.fullCalendar('option', 'height',
			this.cal.prop('clientHeight'));
	} else {
		this.cal.fullCalendar('option', 'height', 0);
	}
};

MasterCalendar.modules.fullHeightAgenda = function (cal) {
	var resizer = new CalendarResizer({ cal: cal });
	cal.on('viewDisplay windowResize', $.proxy(resizer.resize, resizer));
};

