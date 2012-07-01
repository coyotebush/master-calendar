MasterCalendar
===
A web application that displays data from several sources, built with jQuery
and [FullCalendar](http://arshaw.com/fullcalendar/).

Current features:

- user togglable list of event sources
- creation of events in the sources
- sources can customize event display
- week/day agenda views that fit to window height
- view saved in URL hash for reload/back

Future goals:

- allow sources to provide general menu options
- good mobile device support
- continuously scrolling view

Sources
---
Sources are specified in `calendar-sources.js`. A source provides event data
for the calendar through a JSON API as per FullCalendar. The minimal
specification for a source is as

    {
	  name: 'Community Events',
	  url: '/events/api',
	  color: '#006600'
	}

Specification of a more complete API including menu options and event creation
might be as

	{
	  name: 'Events',
	  api: {
	    events: '/events/api?events',
	    menu:   '/events/api?info',
	    create: {
	      url:  '/events/api?new',
	      startParam: 'time',
	      endParam: 'ignore'
	    }
	  },
	  color: '#006600',
	}

