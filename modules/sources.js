// Event sources 
/*jslint browser: true, eqeq: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

/* A FullCalendar Event Source object with
 * property change events and logic methods
 */
var EventSource = function (params) {
	$.extend(this, { enabled: true }, params);
};

EventSource.prototype.set = function (param, value) {
	this[param] = value;
	$(this).trigger('change:' + param);
};

EventSource.prototype.createUrl = function (startDate, endDate, allDay) {
	var api, url, params = {};
	if (this.create) {
		url = this.create.url || this.create;
		if (this.create.startParam !== false) {
			params[this.create.startParam  || 'start']  = startDate.getTime() / 1000;
		}
		if (this.create.endParam !== false) {
			params[this.create.endParam    || 'end']    = endDate.getTime() / 1000;
		}
		if (this.create.allDayParam !== false) {
			params[this.create.allDayParam || 'allday'] = allDay;
		}
		url += url.indexOf('?') > -1 ? '&' : '?';
		url += $.param(params);
		return url;
	}
};

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

var EventSourceView = function (options) {
	this.model = options.model;
	this.el = $('<li class="cal-source">');
	this.el.on('change', '.cal-source-label :checkbox', $.proxy(this.toggle, this));
};

EventSourceView.prototype.render = function () {
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

EventSourceView.prototype.toggle = function (event) {
	this.model.set('enabled', event.target.checked);
};

var EventSourceWatcher = function (options) {
	this.model = options.model;
	this.cal = options.cal;
	$(this.model).on('change:enabled', $.proxy(this.updateCal, this));
};

EventSourceWatcher.prototype.updateCal = function () {
	this.cal.fullCalendar(
		this.model.enabled ? 'addEventSource' : 'removeEventSource',
		this.model
	);
};

MasterCalendar.modules.sources = function (cal, sources) {
	var eventSources = [],
		refresh = new RefreshView({ cal: cal, el: $('#refresh') });
	$(sources).each(function () {
		var eventSource = new EventSource(this),
			view = new EventSourceView({ model: eventSource }),
			watcher = new EventSourceWatcher({ model: eventSource, cal: cal});
		eventSources.push(eventSource);
		$('#sources').append(view.render().el);
	});


	return {
		eventSources: $(eventSources).filter(function () { return this.enabled; }),
		loading: $.proxy(refresh.update, refresh)
	};
};

