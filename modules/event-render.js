// Initial options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.modules.eventRender = function (cal) {
	'use strict';

	var filterParticipation = false;

	$('#filter-my-events :checkbox')
		.prop('checked', false)
		.change(function () {
			filterParticipation = $(this).is(':checked');
			cal.fullCalendar('rerenderEvents');
		});

	return {
		eventRender: function (event, element, view) {
			var midTime = (view.start.getTime() + view.end.getTime()) / 2;
			if (event.id === 'menu') {
				if ((!event.start || event.start < midTime)
						&& (!event.end   || midTime < event.end)) {
					event.source.set('menu', event.body);
				}
				return false;
			}
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
};

