// Event sources 
/*jslint browser: true, eqeq: true */
/*global $: false, registerCalendarModule: false */
/* vim: set sw=2 ts=2 noet */
registerCalendarModule(function (cal, sources) {
	'use strict';
	$(sources).each(function () {
		// {{{ API
		if (this.api && this.api.events) {
			if (typeof this.api.events == 'object') {
				$.extend(this, this.api.events);
			} else {
				this.url = this.api.events;
			}
		}
		// }}}

		var menuDiv = $('<div/>');

		// {{{ Checklist
		$('#sources')
			.append($('<li class="ui-widget"/>')
				.css('border-color', this.color)
				.append($('<label>' + this.name + '</label>')
					.css('background-color', this.color)
					.prepend($('<input type="checkbox">')
						.data('source', this)
						.change(function () {
							cal.fullCalendar(
								$(this).is(':checked') ? 'addEventSource' : 'removeEventSource',
								$(this).data('source')
							);
						})
						.prop('checked', this.defaultEnable !== false)))
				.append($(menuDiv)));
		// }}}

		// {{{ Menu
		this.data = $.extend(this.data, { menu: 1 });
		this.success = function (data) {
			if (data.menu) {
				menuDiv.empty().append($.jqml(data.menu));
				menuDiv.find('a')
					.click(function () {
						if (this.href) {
							window.open(this.href);
							return false;
						}
					});
				menuDiv.find('.hidden')
					.hide()
					.before($('<a class="hidden-toggle" href="#">(show)</a>')
						.toggle(function () {
							$(this).next().show('fast');
							$(this).text('(hide)');
							return false;
						}, function () {
							$(this).next().hide('fast');
							$(this).text('(show)');
							return false;
						}));
			}
			if (data) {
				return data.events || data;
			}
		};
		// }}}
	});
	cal.one('calendarStart', function () {
		$('#sources :checkbox').change();
	});

	$('#refresh')
		.button({ icons: { primary: 'ui-icon-refresh' } })
		.click(function () {
			cal.fullCalendar('refetchEvents');
		});

	$('#filter-my-events :checkbox')
		.prop('checked', false)
		.change(function () {
			var filter = $(this).is(':checked');
			cal.fullCalendar('option', 'filterEvents', filter ? function (e) {
				return !e.participation;
			} : false);
		});
});

