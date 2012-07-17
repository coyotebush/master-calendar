// Fit agenda views to window height
registerCalendarModule(function (cal) {
	var resizeCalendar = function () {
		if (cal.fullCalendar('getView').name.indexOf('agenda') > -1) {
			cal.fullCalendar('option', 'height',
				cal.prop('clientHeight'));
		} else {
			cal.fullCalendar('option', 'height', 0);
			cal.fullCalendar('option', 'aspectRatio', 1.35);
		}
	};
	$(window).resize(resizeCalendar);
	cal.on('viewDisplay calendarStart', resizeCalendar);
});
