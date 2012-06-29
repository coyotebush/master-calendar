$(function(){
	var cal = $('#calendar');

	var defaultView = 'month';

	var startHash = location.hash.slice(1).split('/');
	var startView = startHash[0] || defaultView.view;
	var startDate = new Date(3600000 * startHash[1] || Date.now());

	// Hash format: [view[/date]]
	var setHash = function(viewObj) {
		var hash = '#';
		if (Date.now() < viewObj.start || Date.now() > viewObj.end)
			hash += viewObj.name + '/' + viewObj.start.getTime()/3600000;
		else if (viewObj.name != defaultView)
			hash += viewObj.name;
		location.replace(hash);
	};

	var resizeCalendar = function() {
		if (cal.fullCalendar('getView').name.indexOf('agenda') != -1) {
			cal.fullCalendar('option', 'height',
				cal.prop('clientHeight'));
		} else {
			cal.fullCalendar('option', 'height', 0);
			cal.fullCalendar('option', 'aspectRatio', 1.35);
		}
	};

	cal.fullCalendar({
		header: {
			left: 'today prev,next title',
			center: '',
			right: 'month,agendaWeek'
		},
		theme: true,
		selectable: true,
		unselectCancel: '#create-popup',
		allDayDefault: false,
		defaultEventMinutes: 120,
		timeFormat: 'H:mm ',
		defaultView: startView,
		year: startDate.getFullYear(),
		month: startDate.getMonth(),
		date: startDate.getDate(),

		loading: function(state) {
			$('#loading').toggle(state);
		},
		eventClick: function(event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		},
		eventRender: function(event, element) {
			if (event.menu) {
				$('<div><pre>' + event.menu + '</pre></div>').appendTo($(element).children().first());
			}
		},
		select: function(startDate, endDate, allDay, jsEvent, view) {
			$('#create-menu a').attr('href', function() {
				var api = $(this).data('api');
				var url = api.url || api;
				url += url.indexOf('?') > -1 ? '&' : '?';
				url +=     (api.startParam || 'start') + '=' + startDate.getTime();
				url += '&' + (api.endParam || 'end'  ) + '=' + endDate.getTime();
				console.debug(url);
				return url;
			});
			$('#create-popup').show().css('top', jsEvent.pageY).css('left', jsEvent.pageX);
		},
		unselect: function() {
			$('#create-popup').hide();
		},
		viewDisplay: function(viewObj) {
			setHash(viewObj);
			resizeCalendar();
		}
	});

	$(myEventSources).each(function(index) {
		if (this.api) {
			if (typeof this.api.events == 'object')
				$.extend(this, this.api.events);
			else
				this.url = this.api.events;

			if (this.api.create)
				$('#create-menu').append(
					$('<li/>').append(
						$('<a>' + this.name + '</a>')
							.data('api', this.api.create)
					)
				);
		}

		$('#sources').append(
			$('<li class="ui-widget"/>')
				.css('background-color', this.color)
				.css('color', '#ffffff')
				.append(
					$('<input type="checkbox" checked="checked" id="source' + index + '">')
						.data('source', this)
						.change(function() {
							cal.fullCalendar($(this).is(':checked')
								? 'addEventSource' : 'removeEventSource',
								$(this).data('source'));
						})
						.prop('checked', this.defaultEnable !== false)
						.change()
				)
				.append(
					$('<label for="source' + index + '">' + this.name + '</label>')
				)
		);
	});
	$('#create-popup-close').click(function() {
		cal.fullCalendar('unselect');
	});
	$('#refresh').button().click(function() {
		cal.fullCalendar('refetchEvents');
	});
	$(window).resize(resizeCalendar);
	resizeCalendar();
});

