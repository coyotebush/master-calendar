/* Filter events based on global
 * and source-specific criteria.
 */
/*global $: false*/
'use strict';

var EventFilterer = function (options) {
	this.cal = options.cal;
	$.extend(this, {
		name: 'only my events',
		color: '#333',
		enabled: false
	});
};

EventFilterer.prototype.set = function (param, value) {
	if (param === 'enabled') {
		this.enabled = value;
		this.cal.fullCalendar('rerenderEvents');
	}
};

EventFilterer.prototype.filterEvent = function (event) {
	if (this.enabled) {
		return !!event.participation;
	}
	//if (event.source.filterEvent(event) === false) {
	//	return false;
	//}
};

