// Event creation popup menu
/*jslint browser: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

// TODO: make a method of Source objects
function sourceCreateUrl(source, startDate, endDate, allDay) {
	var api, url, params = {};
	if (source.create) {
		url = source.create.url || source.create;
		if (source.create.startParam !== false) {
			params[source.create.startParam  || 'start']  = startDate.getTime() / 1000;
		}
		if (source.create.endParam !== false) {
			params[source.create.endParam    || 'end']    = endDate.getTime() / 1000;
		}
		if (source.create.allDayParam !== false) {
			params[source.create.allDayParam || 'allday'] = allDay;
		}
		url += url.indexOf('?') > -1 ? '&' : '?';
		url += $.param(params);
		return url;
	}
}

var CreateMenuView = function (options) {
	this.el = options.el;
	this.collection = options.collection;
	this.cal = options.cal;

	var that = this;
	this.el.dialog({
		autoOpen: false,
		resizable: false,
		width: 220,
		close: function () {
			that.cal.fullCalendar('unselect');
		}
	});

	this.el.on('click', 'a', function () {
		if (this.href) {
			window.open(this.href);
			return false;
		}
	});
};

CreateMenuView.prototype.render = function (startDate, endDate, allDay) {
	var html = '', url;
	$(this.collection).each(function () {
		url = sourceCreateUrl(this, startDate, endDate, allDay);
		if (url) {
			html += '<li><a href="' + url + '">' + this.name + '</a></li>';
		}
	});
	this.el.html(html);
};

CreateMenuView.prototype.open = function (jsEvent) {
	this.el
		.dialog('open')
		.dialog('widget')
		.position({
			of: jsEvent,
			my: 'left top',
			offset: '-5'
		});
};

CreateMenuView.prototype.renderOpen = function (startDate, endDate, allDay, jsEvent) {
	this.render(startDate, endDate, allDay);
	this.open(jsEvent);
};

CreateMenuView.prototype.close = function () {
	this.el.dialog('close');
};

MasterCalendar.modules.createMenu = function (cal, sources) {
	var createMenu = new CreateMenuView({
		cal: cal,
		el: $('#create-menu'),
		collection: sources
	});

	return {
		selectable: true,
		unselectCancel: '.ui-dialog',
		select: $.proxy(createMenu.renderOpen, createMenu),
		unselect: $.proxy(createMenu.close, createMenu)
	};
};

