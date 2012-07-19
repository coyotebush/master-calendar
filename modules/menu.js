// Source-provided menu options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal, sources) {
	'use strict';
	$(sources).each(function () {
		var menuDiv = $('<div/>');
		this.toggler.append(menuDiv);

		menuDiv.on('click', 'a.hidden-toggle', function () {
			if ($(this).next().toggle('fast').is(':hidden')) {
				$(this).text('(show)');
			} else {
				$(this).text('(hide)');
			}
			return false;
		});

		menuDiv.on('click', 'a', function () {
			if (this.href) {
				window.open(this.href);
				return false;
			}
		});

		this.data = $.extend(this.data, { menu: 1 });
		this.success = function (data) {
			if (data.menu) {
				menuDiv
					.empty().append($.jqml(data.menu))
					.find('.hidden').hide().before($('<a class="hidden-toggle" href="#">(show)</a>'));
			}
			if (data.events) {
				return data.events;
			}
		};
	});
});

