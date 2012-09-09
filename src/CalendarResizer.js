/* Resize agenda views to fit the window height.
 */
'use strict';

var CalendarResizer = function (options) {
	this.cal = options.cal;
};

CalendarResizer.prototype.resize = function (viewObj) {
	if (viewObj.name.indexOf('agenda') > -1
			&& this.cal.css('position') === 'absolute') {
		this.cal.fullCalendar('option', 'height',
			this.cal.prop('clientHeight'));
	} else {
		this.cal.fullCalendar('option', 'height', 0);
	}
};
