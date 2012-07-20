// Initial options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal) {
	'use strict';

	var filterParticipation = false;

	$('#filter-my-events :checkbox')
		.prop('checked', false)
		.change(function () {
			filterParticipation = $(this).is(':checked');
			cal.fullCalendar('rerenderEvents');
		});

	return {
		eventRender: function (event, element) {
			if (event.participation) {
				$(element).addClass('event-participation');
			} else if (filterParticipation) {
				return false;
			}
			if (event.body) {
				$(element).children('.fc-event-inner')
					.append($('<div class="event-body"/>')
						.append($.jqml(event.body)));
			}
		},
		eventClick: function (event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		}
	};
});

