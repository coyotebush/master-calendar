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
		}
	});

	$('#create_menu_close').click(function() {
		$(this).parent().hide();
		return false;
	});
	$(myEventSources).each(function(index) {
		$("#calendar").fullCalendar('addEventSource', this);
		var cbox = $('<input type="checkbox" checked="checked" id="source' + index + '">');
		var theSource = this;
		cbox.change(function() {
			if ($(this).is(':checked'))
				$("#calendar").fullCalendar('addEventSource', theSource);
			else
				$("#calendar").fullCalendar('removeEventSource', theSource);
		});
		var label = $('<label for="source' + index + '">' + this.label + '</label>');

		var toggler = $('<span/>').css('background-color', this.color).css('color', '#ffffff');
		toggler.append(cbox).append(label);
		cbox.button();
		$("#sources").append(toggler);
	});
	$("#refresh_link").button().click(function() {
		$('#calendar').fullCalendar('refetchEvents');
		return false;
	});
});

