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
			$.bbq.pushState({view: view.name, date: view.start.getTime()});
		}
	});

	$('#create_menu_close').click(function() {
		$(this).parent().hide();
		return false;
	});
	$(myEventSources).each(function(index) {
		var theSource = this;
		cal.fullCalendar('addEventSource', this);

		$("#sources").append(
			$('<span/>')
				.css('background-color', theSource.color)
				.css('color', '#ffffff')
				.append(
					$('<input type="checkbox" checked="checked" id="source' + index + '">')
						.change(function() {
							cal.fullCalendar($(this).is(':checked')
								? 'addEventSource'
								: 'removeEventSource',
								theSource);
						})
				)
				.append(
					$('<label for="source' + index + '">' + theSource.label + '</label>')
				)
		);
	});
	$("#refresh_link").button().click(function() {
		$('#calendar').fullCalendar('refetchEvents');
		return false;
	});
});

