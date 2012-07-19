// Source-provided menu options
/*jslint browser: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.registerModule(function (cal, sources) {
	'use strict';
	$(sources).each(function () {
		var menuDiv = $('<div/>');
		this.toggler.append(menuDiv);

		menuDiv.on('click', 'button.hidden-toggle', function (event) {
			var button = $(this);
			$(this).next().stop(true, true).slideToggle('fast', function () {
				if ($(this).is(':hidden')) {
					button.button('option', {
						icons: { primary: 'ui-icon-plusthick' },
						label: 'show'
					});
				} else {
					button.button('option', {
						icons: { primary: 'ui-icon-minusthick' },
						label: 'hide'
					});
				}
			});
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
					.find('.hidden').hide()
					.before($('<button class="hidden-toggle">show</button>')
						.button({ icons: { primary: 'ui-icon-plusthick' }}));
			}
			if (data.events) {
				return data.events;
			}
		};
	});
});

