// Source-provided menu options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal, sources) {
	'use strict';
	$(sources).each(function () {
		var menuDiv = $('<div/>');
		this.toggler.append(menuDiv);

		this.data = $.extend(this.data, { menu: 1 });
		this.success = function (data) {
			if (data.menu) {
				menuDiv.empty().append($.jqml(data.menu));
				menuDiv.find('a')
					.click(function () {
						if (this.href) {
							window.open(this.href);
							return false;
						}
					});
				menuDiv.find('.hidden')
					.hide()
					.before($('<a class="hidden-toggle" href="#">(show)</a>')
						.toggle(function () {
							$(this).next().show('fast');
							$(this).text('(hide)');
							return false;
						}, function () {
							$(this).next().hide('fast');
							$(this).text('(show)');
							return false;
						}));
			}
			if (data) {
				return data.events || data;
			}
		};
	});
});

