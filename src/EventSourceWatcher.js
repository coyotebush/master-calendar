/* Watches an event source's 'enabled' property
 * and adds/removes it to FullCalendar appropriately.
 */
/*global $: false*/
'use strict';

var EventSourceWatcher = function (options) {
	this.model = options.model;
	this.cal = options.cal;
	$(this.model).on('change:enabled', $.proxy(this.updateCal, this));
};

EventSourceWatcher.prototype.updateCal = function () {
	this.cal.fullCalendar(
		this.model.enabled ? 'addEventSource' : 'removeEventSource',
		this.model
	);
};

