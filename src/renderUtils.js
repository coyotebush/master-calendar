/* Helper functions used in event rendering.
 */
/*global $: false*/
'use strict';

var viewCenteredOn = function (view, event) {
	var midTime = (view.start.getTime() + view.end.getTime()) / 2;
	return (!event.start || event.start < midTime)
			&& (!event.end   || midTime < event.end);
};

var renderEvent = function (element, event) {
	if (event.participation) {
		$(element).addClass('event-participation');
	}
	if (event.body) {
		$(element).children('.fc-event-inner')
			.append($('<div class="event-body"/>')
				.append($.jqml(event.body)));
	}
};


