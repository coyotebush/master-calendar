$(function(){
	var cal = $("#calendar");

	var defaultView = 'month';

	var startHash = location.hash.slice(1).split('/');
	var startView = startHash[0] || defaultView.view;
	var startDate = new Date(+startHash[1] || Date.now());

	// Hash format: [view[/date]]
	var setHash = function(viewObj) {
		var hash = '#';
		if (Date.now() < viewObj.start || Date.now() > viewObj.end)
			hash += viewObj.name + '/' + viewObj.start.getTime();
		else if (viewObj.name != defaultView)
			hash += viewObj.name;
		console.log(hash);
		location.replace(hash);
	};

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
		defaultView: startView,
		year: startDate.getFullYear(),
		month: startDate.getMonth(),
		date: startDate.getDate(),

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
		viewDisplay: setHash
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
});

