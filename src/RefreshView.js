/* A combination button/progressbar widget
 * for refreshing the calendar.
 */
/*global $: false*/
'use strict';

var RefreshView = function (options) {
	this.el = options.el;
	this.cal = options.cal;
	this.el.on('click', '.ui-button', $.proxy(this.click, this));
};

RefreshView.prototype.render = function () {
	this.el.html('<div class="ui-button"/><div class="ui-progressbar"/>');
	this.el.find('.ui-button')
		.button({ text: false, icons: { primary: 'ui-icon-refresh' } })
		.removeClass('ui-corner-all').addClass('ui-corner-left');

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

