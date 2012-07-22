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
			.append(this.toggler = $('<li class="cal-source"/>')
				.css('border-color', this.color)
				.append($('<label class="cal-source-label">' + this.name + '</label>')
					.css('background-color', this.color)
					.prepend($('<input type="checkbox">')
						.data('source', this)
						.prop('checked', this.defaultEnable !== false))));
		// }}}
	});

	// {{{ Checklist functionality
	$('#sources').on('change', ':checkbox', function () {
		cal.fullCalendar(
			$(this).is(':checked') ? 'addEventSource' : 'removeEventSource',
			$(this).data('source')
		);
	});

	cal.one('calendarStart', function () {
		$('#sources :checkbox').change();
	});
	// }}}

	$('#refresh > button')
		.button({ text: false, icons: { primary: 'ui-icon-refresh' } })
		.removeClass('ui-corner-all').addClass('ui-corner-left')
		.click(function () {
			cal.fullCalendar('refetchEvents');
		});

	$('#refresh > div')
		.progressbar({ value: 100 })
		.removeClass('ui-corner-all').addClass('ui-corner-right')
		.children('.ui-progressbar-value').removeClass('ui-corner-left');

	return {
		loading: function (pending, total) {
			var percentComplete = 100 * (1 - pending / (total - 1));
			$('#refresh .ui-progressbar-value')
				.stop(true, true)
				.animate({ width: percentComplete + '%' }, function () {
					$('#refresh > div').progressbar('value', percentComplete);
				});
		}
	};
});

