var registerCalendarModule;

(function() {
	'use strict';
	var modules = [];

	registerCalendarModule = function (f) {
		modules.push(f);
	};

	$(function () {
		var cal = $('#calendar');
		var options = {};
		$(modules).each(function () {
			try { $.extend(options, this(cal)); } catch (e) {}
		});
		cal.fullCalendar(options);
		cal.trigger('calendarStart');
	});
}());

// Initial options
registerCalendarModule(function (cal) {
	return {
		header: {
			left: 'today prev,next title',
			center: '',
			right: 'month,agendaWeek'
		},
		theme: true,
		allDayDefault: false,
		defaultEventMinutes: 120,
		timeFormat: 'H:mm ',

		viewDisplay: function (viewObj) {
			cal.trigger('viewDisplay', viewObj);
		},
		loading: function (state) {
			$('#loading').toggle(state);
		},
		eventClick: function (event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		},
		eventRender: function (event, element) {
			if (event.body) {
				$(element).children().first()
					.append($('<div class="event-body"/>')
						.append($.jqml(event.body)));
			}
			if (event.participation) {
				$(element).find('.fc-event-time')
					.addClass('highlight-text');
			}
		}
	};
});

