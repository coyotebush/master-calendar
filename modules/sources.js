// Event sources 
/*jslint browser: true, eqeq: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.modules.sources = function (cal, sources) {
	'use strict';
	$(sources).each(function () {
		// {{{ Checklist
		$('#sources')
			.append(this.toggler = $('<li class="cal-source"/>')
				.css('border-color', this.color)
				.append($('<label class="cal-source-label"><span>' + this.name + '</span></label>')
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

	$('#refresh .ui-button')
		.button({ text: false, icons: { primary: 'ui-icon-refresh' } })
		.removeClass('ui-corner-all').addClass('ui-corner-left')
		.click(function () {
			cal.fullCalendar('refetchEvents');
		});

	$('#refresh .ui-progressbar')
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
};

