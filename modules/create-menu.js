// Event creation popup menu
/*jslint browser: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.modules.createMenu = function (cal, sources) {
	'use strict';

	$(sources).each(function () {
		if (this.api && this.api.create) {
			$('#create-menu')
				.append($('<li/>')
					.append($('<a>' + this.name + '</a>')
						.data('api', this.api.create)
						.click(function () {
							if (this.href) {
								window.open(this.href);
								return false;
							}
						})));
		}
	});

	$('#create-popup').dialog({
		autoOpen: false,
		resizable: false,
		width: 220,
		close: function () {
			cal.fullCalendar('unselect');
		}
	});

	return {
		selectable: true,
		unselectCancel: '.ui-dialog',
		select: function (startDate, endDate, allDay, jsEvent) {
			$('#create-menu a')
				.attr('href', function () {
					var api = $(this).data('api');
					var url = api.url || api;
					var params = {};
					if (api.startParam !== false) {
						params[api.startParam  || 'start']  = startDate.getTime() / 1000;
					}
					if (api.endParam !== false) {
						params[api.endParam    || 'end']    = endDate.getTime() / 1000;
					}
					if (api.allDayParam !== false) {
						params[api.allDayParam || 'allday'] = allDay;
					}
					url += url.indexOf('?') > -1 ? '&' : '?';
					url += $.param(params);
					return url;
				});
			$('#create-popup')
				.dialog('open')
				.dialog('widget')
				.position({
					of: jsEvent,
					my: 'left top',
					offset: '-5'
				});
		},
		unselect: function () {
			$('#create-popup').dialog('close');
		}
	};
};

