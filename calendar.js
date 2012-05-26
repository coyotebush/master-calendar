$(function(){
	var cal = $("#calendar");

	var defaultView = 'month';
	var startView = $.bbq.getState('view') || defaultView.view;
	var startDate = new Date(+$.bbq.getState('date') || Date.now());

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
		viewDisplay: function(viewObj) {
			if (cal.data('loaded')) {
				console.log('viewDisplay: ' + viewObj.start.getTime());
				cal.data('savedView', viewObj);
				$.bbq.pushState({view: viewObj.name, date: viewObj.start.getTime()});
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
		var oldViewObj = cal.data('savedView');
		var date = +$.bbq.getState('date');
		var view = $.bbq.getState('view');

		console.log(date);
		if (oldViewObj)
			console.log(oldViewObj.start.getTime());
		console.log(view);

		if (date && view) {
			if (!(oldViewObj
					&& date == oldViewObj.start.getTime()
					&& view == oldViewObj.name)) {
				// this state differs from that saved in the viewDisplay
				// handler, so we're not being triggered from there.
				console.log('set');
				cal.fullCalendar('changeView', view);
				cal.fullCalendar('gotoDate', new Date(date));
			}
			else
				console.log('nada');
		}
		else {
			// the hash was probably cleared, almost certainly due to a
			// browser action rather than calendar navigation controls
			console.log('reset');
			cal.fullCalendar('changeView', defaultView);
			cal.fullCalendar('today');
		}
		//cal.data('savedView', date);
	});//.trigger('hashchange');
});

