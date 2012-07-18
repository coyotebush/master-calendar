// Initial options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';
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

