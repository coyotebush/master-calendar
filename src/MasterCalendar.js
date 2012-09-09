/* Top-level application.
 */
/*jslint browser: true*/
/*global $: false,
 CalendarMobile: false,
 CalendarResizer: false,
 CreateMenuView: false,
 EventFilterer: false,
 EventSource: false,
 EventSourceView: false,
 EventSourceWatcher: false,
 RefreshView: false,
 UrlState: false,
 viewCenteredOn: false,
 renderEvent: false
 */
'use strict';

var MasterCalendar = {
	init: function () {
		var cal = $('#calendar'),
			filterer = new EventFilterer({ cal: cal }),
			filtererView = new EventSourceView({ model: filterer }),
			resizer = new CalendarResizer({ cal: cal }),
			mobile = new CalendarMobile({ cal: cal }),
			refresh = new RefreshView({ cal: cal, el: $('#refresh') }),
			createMenu = new CreateMenuView({ cal: cal, el: $('#create-menu') }),
			urlState = new UrlState({ location: window.location, cal: cal }),
			eventSources = [];

		refresh.render();
		$('#sources').append(filtererView.render().el);

		$(MasterCalendar.sources).each(function () {
			var eventSource = new EventSource(this),
				view = new EventSourceView({ model: eventSource }),
				watcher = new EventSourceWatcher({ model: eventSource, cal: cal});
			eventSources.push(eventSource);
			$('#sources').append(view.render().el);
		});

		createMenu.collection = eventSources;

		cal.fullCalendar($.extend({
			header: {
				left: 'today prev,next title',
				center: '',
				right: 'month,agendaWeek,list'
			},
			listNoHeight: true,
			listSections: 'smart',
			theme: true,
			allDayDefault: false,
			defaultEventMinutes: 120,
			timeFormat: 'h:mmtt ',
			weekMode: 'variable',
			defaultView: mobile.isActive() ? 'list' : 'month',

			viewDisplay: function (viewObj) {
				mobile.update(viewObj);
				resizer.resize(viewObj);
			},

			windowResize: function (viewObj) {
				resizer.resize(viewObj);
			},

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
			},
			eventSources: $(eventSources).filter(function () { return this.enabled; }),
			loading: $.proxy(refresh.update, refresh),

			selectable: true,
			unselectCancel: '.ui-dialog',
			select: $.proxy(createMenu.renderOpen, createMenu),
			unselect: $.proxy(createMenu.close, createMenu)
		}, urlState.read()));
	}
};

$(MasterCalendar.init);

