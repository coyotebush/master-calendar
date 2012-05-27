$(function(){
	var cal = $("#calendar");

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
		unselectCancel: '#create_menu',
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
		select: function(startDate, endDate, allDay, jsEvent, view) {
			$("#create_menu").show('fast').css('top', jsEvent.pageY).css('left', jsEvent.pageX);
		},
		unselect: function() {
			$('#create_menu').hide('fast');
		},
		viewDisplay: function(viewObj) {
			setHash(viewObj);
			resizeCalendar();
		}
	});

	$(myEventSources).each(function(index) {
		$("#sources").append(
			$('<div/>')
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
					$('<label for="source' + index + '">' + this.label + '</label>')
				)
		);
	});
	$('#create_menu_close').click(function() {
		cal.fullCalendar('unselect');
	});
	$("#refresh").button().click(function() {
		cal.fullCalendar('refetchEvents');
	});
	$(window).resize(resizeCalendar);
	resizeCalendar();
});

