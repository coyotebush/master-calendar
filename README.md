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
for the calendar through a JSON API as per FullCalendar.

#### Properties
A source must have a name and color specified. While an `events` property may
provide event data through a predefined array of event objects or a function to
generate events, most uses will probably involve a JSON feed. The rules are:

- The properties `url` and optionally `startParam` and `endParam` may be
  specified per FullCalendar documentation.
- Or, these properties may be specified in an `api.events` object.
- Or, just `url` may be specified as the value of `api.events`.

To specify an event creation API, similarly, the URL may be specified as
`api.create`, or `api.create` can contain `url`, `startParam` (default:
`start`), and/or `endParam` (default: `end`).

#### Examples
The minimal specification for a source is as

    {
	  name: 'Community Events',
	  url: '/events/api',
	  color: '#006600'
	}

Specification of a more complete API including event creation might be as

	{
	  name: 'Events',
	  api: {
	    events: '/events/api?events',
	    create: {
	      url:  '/events/api?new',
	      startParam: 'time',
	      endParam: 'ignore'
	    }
	  },
	  color: '#006600',
	}

