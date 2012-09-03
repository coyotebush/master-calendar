// Event sources 
/*jslint browser: true, eqeq: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';
var RefreshView = function (options) {
	this.el = options.el;
	this.cal = options.cal;
	this.el.find('.ui-button')
		.button({ text: false, icons: { primary: 'ui-icon-refresh' } })
		.removeClass('ui-corner-all').addClass('ui-corner-left')
		.click($.proxy(this.click, this));

	this.el.find('.ui-progressbar')
		.progressbar({ value: 100 })
		.removeClass('ui-corner-all').addClass('ui-corner-right')
		.children('.ui-progressbar-value').removeClass('ui-corner-left');
};

RefreshView.prototype.click = function () {
	this.cal.fullCalendar('refetchEvents');
};

RefreshView.prototype.update = function (pending, total) {
	var percentComplete = 100 * (1 - pending / (total - 1)), that = this;
	this.el.find('.ui-progressbar-value')
		.stop(true, true)
		.animate({ width: percentComplete + '%' }, function () {
			that.el.find('.ui-progressbar').progressbar('value', percentComplete);
		});
};

MasterCalendar.modules.sources = function (cal, sources) {
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

	var refresh = new RefreshView({ cal: cal, el: $('#refresh') });

	return {
		loading: $.proxy(refresh.update, refresh)
	};
};

