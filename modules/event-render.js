// Initial options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */

MasterCalendar.modules.eventRender = function (cal) {
	'use strict';

	var filterer = new EventFilterer({ cal: cal }),
			filtererView = new EventSourceView({ model: filterer });
	$('#sources').append(filtererView.render().el);

	return {
		eventRender: function (event, element, view) {
			if (event.id === 'menu') {
				if (viewCenteredOn(view, event)) {
					event.source.set('menu', event.body);
				}
				return false;
			}
			if (filterer.filterEvent(event) === false) {
				return false;
			}
			renderEvent(element, event);
		},
		eventClick: function (event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		}
	};
};

