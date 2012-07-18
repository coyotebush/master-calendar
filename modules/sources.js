// Event sources 
/*jslint browser: true, eqeq: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal, sources) {
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

		// {{{ Checklist
		$('#sources')
			.append(this.toggler = $('<li class="ui-widget"/>')
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
						.prop('checked', this.defaultEnable !== false))));
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

	return {
		loading: function (state) {
			$('#loading').toggle(state);
		}
	};
});

