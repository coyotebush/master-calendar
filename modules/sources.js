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

var SourceView = function (options) {
	this.model = options.model;
	this.el = $('<li class="cal-source">');
	this.el.on('change', '.cal-source-label :checkbox', $.proxy(this.toggle, this));
};

SourceView.prototype.render = function () {
	this.el.html('<label class="cal-source-label">'
			+ '<input type="checkbox"'
			+ (this.model.enable !== false ? ' checked="checked"/>' : '>')
			+ '<span>' + this.model.name + '</span>'
			+ '</label>'
			+ (this.model.menu ? '<div class="cal-source-menu"/>' : '')
		);
	this.el.css('border-color', this.model.color);
	this.el.find('.cal-source-label').css('background-color', this.model.color);
	if (this.model.menu) {
		this.el.find('.cal-source-menu').append($.jqml(this.model.menu));
	}
	return this;
};

SourceView.prototype.toggle = function (event) {
	this.model.setEnabled(event.target.checked);
};

MasterCalendar.modules.sources = function (cal, sources) {
	$(sources).each(function () {
		var view = new SourceView({ model: this, cal: cal });
		$('#sources').append(view.render().el);
	});

	var refresh = new RefreshView({ cal: cal, el: $('#refresh') });

	return {
		eventSources: $(sources).filter(function () { return this.enabled !== false; }),
		loading: $.proxy(refresh.update, refresh)
	};
};

