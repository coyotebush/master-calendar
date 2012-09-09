/* A popup menu allowing the user to create events
 */
/*jslint browser: true*/
/*global $: false*/
'use strict';

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
		url = this.createUrl(startDate, endDate, allDay);
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
