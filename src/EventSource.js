/* A FullCalendar Event Source object with
 * property change events and logic methods
 */
/*global $: false*/
'use strict';

var EventSource = function (params) {
	$.extend(this, { enabled: true }, params);
};

EventSource.prototype.set = function (param, value) {
	this[param] = value;
	$(this).trigger('change:' + param);
};

EventSource.prototype.createUrl = function (startDate, endDate, allDay) {
	var api, url, params = {};
	if (this.create) {
		url = this.create.url || this.create;
		if (this.create.startParam !== false) {
			params[this.create.startParam  || 'start']  = startDate.getTime() / 1000;
		}
		if (this.create.endParam !== false) {
			params[this.create.endParam    || 'end']    = endDate.getTime() / 1000;
		}
		if (this.create.allDayParam !== false) {
			params[this.create.allDayParam || 'allday'] = allDay;
		}
		url += url.indexOf('?') > -1 ? '&' : '?';
		url += $.param(params);
		return url;
	}
};
