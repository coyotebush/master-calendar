/* A widget to toggle an event source and
 * display information about it.
 */
/*global $: false*/
'use strict';

var EventSourceView = function (options) {
	this.model = options.model;
	this.el = $('<li class="cal-source">');
	this.el.on('change', '.cal-source-label :checkbox', $.proxy(this.toggle, this));
	$(this.model).on('change:menu', $.proxy(this.render, this));
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

