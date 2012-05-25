$(function(){
	var cal = $("#calendar");

	cal.fullCalendar({
		header: {
			left: 'today prev,next title',
			center: '',
			right: 'month,agendaWeek'
		},
		theme: true,
		allDayDefault: false,
		defaultEventMinutes: 60,
		timeFormat: 'H:mm ',
		defaultView: $.bbq.getState('view') || 'month',
		loading: function(state) {
			$("#loading").toggle(state);
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
		dayClick: function(date, allDay, jsEvent, view) {
			$("#create_menu").show('fast').css('top', jsEvent.pageY).css('left', jsEvent.pageX);
		},
		viewDisplay: function(view) {
			if (cal.data('loaded')) {
				console.log('viewDisplay: ' + view.start.getTime());
				cal.data('savedView', view);
				$.bbq.pushState({view: view.name, date: view.start.getTime()});
			}
			else
				cal.data('loaded', 1);
		}
	});

	$('#create_menu_close').click(function() {
		$(this).parent().hide();
		return false;
	});
	$(myEventSources).each(function(index) {
		cal.fullCalendar('addEventSource', this);

		$("#sources").append(
			$('<span/>')
				.css('background-color', this.color)
				.css('color', '#ffffff')
				.append(
					$('<input type="checkbox" checked="checked" id="source' + index + '">')
						.data('source', this)
				)
				.append(
					$('<label for="source' + index + '">' + this.label + '</label>')
				)
		);
	});
	$('#sources').on('change', 'input:checkbox', function() {
		cal.fullCalendar($(this).is(':checked')
			? 'addEventSource' : 'removeEventSource',
			$(this.data('source')));
	});
	$("#refresh_link").button().click(function() {
		$('#calendar').fullCalendar('refetchEvents');
		return false;
	});
	$(window).on('hashchange', function() {
		console.log('--- hashchange');
		var oldView = cal.data('savedView');
		var date = $.bbq.getState('date');

		console.log(date);
		console.log(oldView);
		if (oldView)
			console.log(oldView.start.getTime());

		if (date) {
			if (!(oldView && date == oldView.start.getTime())) {
				// this state differs from that saved in the viewDisplay
				// handler, so we're not being triggered from there.
				console.log('set');
				cal.fullCalendar('gotoDate', new Date(date + 15 * 24 * 60 * 60 * 1000));
			}
			else
				console.log('nada');
		}
		else {
			// the hash was probably cleared, almost certainly due to a
			// browser action rather than calendar navigation controls
			console.log('reset');
			cal.fullCalendar('today');
		}
		//cal.data('savedView', date);
	});//.trigger('hashchange');
});

