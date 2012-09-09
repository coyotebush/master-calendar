// Event sources 
/*jslint browser: true, eqeq: true, vars: true */
/*global $: false, MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
'use strict';

MasterCalendar.modules.sources = function (cal, sources) {
	var eventSources = [],
		refresh = new RefreshView({ cal: cal, el: $('#refresh') });

	refresh.render();

	$(sources).each(function () {
		var eventSource = new EventSource(this),
			view = new EventSourceView({ model: eventSource }),
			watcher = new EventSourceWatcher({ model: eventSource, cal: cal});
		eventSources.push(eventSource);
		$('#sources').append(view.render().el);
	});

	var createMenu = new CreateMenuView({
		cal: cal,
		el: $('#create-menu'),
		collection: eventSources
	});

	return {
		eventSources: $(eventSources).filter(function () { return this.enabled; }),
		loading: $.proxy(refresh.update, refresh),

		selectable: true,
		unselectCancel: '.ui-dialog',
		select: $.proxy(createMenu.renderOpen, createMenu),
		unselect: $.proxy(createMenu.close, createMenu)
	};
};

