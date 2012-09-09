/* Handle a different layout for small screens.
 */
'use strict';

var CalendarMobile = function (options) {
	this.cal = options.cal;
};

CalendarMobile.prototype.isActive = function () {
	return this.cal.css('position') === 'static';
};

CalendarMobile.prototype.update = function (e, viewObj) {
	this.cal.find('.fc-header-title')
		.toggleClass('fc-header-title-hidden', viewObj.name === 'list');
};

