$(function(){
	var cal = $('#calendar');

	// Initial options {{{
	var calOptions = {
		header: {
			left: 'today prev,next title',
			center: '',
			right: 'month,agendaWeek'
		},
		theme: true,
		allDayDefault: false,
		defaultEventMinutes: 120,
		timeFormat: 'H:mm ',

		viewDisplay: function(viewObj) {
			cal.trigger('viewDisplay', viewObj);
		},
		loading: function(state) {
			$('#loading').toggle(state);
		},
		eventClick: function(event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		},
		eventRender: function(event, element) {
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
	// }}}

	// URL hash (format: [view[/date]]) {{{
	(function () {
		var defaultView = 'month';
		var startHash = location.hash.slice(1).split('/');
		var startView =
			($.fullCalendar.views[startHash[0]] && startHash[0])
			|| defaultView;
		var startDate =
			(startHash[1] && $.fullCalendar.parseISO8601(startHash[1], true))
			|| new Date();

		cal.on('viewDisplay', function(e, viewObj) {
			var hash = '#';
			if (Date.now() < viewObj.start || Date.now() > viewObj.end) {
				hash += viewObj.name + '/' +
					$.fullCalendar.formatDate(viewObj.start, 'yyyy-MM-dd');
			}
			else if (viewObj.name != defaultView) {
				hash += viewObj.name;
			}
			location.replace(hash);
		});

		$.extend(calOptions, {
			defaultView: startView,
			year: startDate.getFullYear(),
			month: startDate.getMonth(),
			date: startDate.getDate()
		});
	})();
	// }}}

	// Event creation popup menu {{{
	$('#create-popup-close')
		.button({ text: false, icons: { primary: 'ui-icon-closethick' } })
		.click(function() {
			cal.fullCalendar('unselect');
			return false;
		});
	$(document).keydown(function(e) {
		if (e.which == 27) {
			cal.fullCalendar('unselect');
		}
	});

	$.extend(calOptions, {
		selectable: true,
		unselectCancel: '#create-popup',
		select: function(startDate, endDate, allDay, jsEvent, view) {
			$('#create-menu a')
				.attr('href', function() {
					var api = $(this).data('api');
					var url = api.url || api;
					var params = {};
					params[api.startParam  || 'start' ] = startDate.getTime();
					params[api.endParam    || 'end'   ] = endDate.getTime();
					params[api.allDayParam || 'allday'] = allDay;
					url += url.indexOf('?') > -1 ? '&' : '?';
					url += $.param(params);
					return url;
				});
			$('#create-popup')
				.show()
				.position({
					of: jsEvent,
					my: 'left top',
					offset: '-5'
				});
		},
		unselect: function() {
			$('#create-popup').hide();
		}
	});
	// }}}

	// Fit agenda views to window height {{{
	(function () {
		var resizeCalendar = function() {
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
	})();
	// }}}

	// Event sources {{{
	$(myEventSources).each(function() {
		if (this.api) {
			if (this.api.events) {
				if (typeof this.api.events == 'object') {
					$.extend(this, this.api.events);
				}
				else {
					this.url = this.api.events;
				}
			}

			if (this.api.create) {
				$('#create-menu')
					.append($('<li/>')
						.append($('<a>' + this.name + '</a>')
							.data('api', this.api.create)
							.click(function() {
								if (this.href) {
									window.open(this.href);
									return false;
								}
							})));
			}
		}

		$('#sources')
			.append($('<li class="ui-widget"/>')
				.css('background-color', this.color)
				.append($('<label>' + this.name + '</label>')
					.prepend($('<input type="checkbox">')
						.data('source', this)
						.change(function() {
							cal.fullCalendar(
								$(this).is(':checked') ? 'addEventSource' : 'removeEventSource',
								$(this).data('source'));
						})
						.prop('checked', this.defaultEnable !== false))));
	});
	cal.one('calendarStart', function() {
		$('#sources :checkbox').change();
	});

	$('#refresh')
		.button({ icons: { primary: 'ui-icon-refresh' } })
		.click(function() {
			cal.fullCalendar('refetchEvents');
		});
	// }}}

	cal.fullCalendar(calOptions);
	cal.trigger('calendarStart');
});

/* vim: set sw=2 ts=2 noet fdm=marker fmr={{{,}}} */

