MasterCalendar
===
A web application that displays data from several sources, built with jQuery
and [FullCalendar](http://arshaw.com/fullcalendar/).

Current features:

- user togglable list of event sources
- creation of events in the sources
- sources can customize event display
- sources can provide general menu options
- week/day agenda views fit to window height
- view saved in URL hash for reload/back

Future goals:

- let sources provide event filtering controls
- good mobile device support

Sources
---
Sources are specified in the array in `calendar-sources.js`. A source provides
event data for the calendar through a JSON API.

#### Properties
A source must have a `name` and `color` specified. While an `events` property
may provide event data through a predefined array of event objects or a
function to generate events, most uses will probably involve a [JSON feed][].
The rules are:

- The properties `url` and optionally `startParam` and `endParam` may be
  specified on the source itself.
- Or, these properties may be specified on an `api.events` object.
- Or, just `url` may be specified as the value of `api.events`.

To specify an event creation API, similarly, the URL may be specified as
`api.create`, or `api.create` can contain `url` and any of `startParam`,
`endParam`, or `allDayParam`.

#### API Details
##### Events
The events API will be used as a [JSON feed][] for FullCalendar; the following
additional parameter may be provided:

- `menu`: if set, the source may provide menu content alongside events.

The API is expected to return:

- If `menu` was not set, an array of [Event Objects][], with the following
  additional optional properties:
  - `body`: [JsonML][] content to be rendered as part of the event
  - `participation`: boolean indicating the calendar user's "participation" in
    an event
- If `menu` was set, optionally an object where `menu` contains [JsonML][]
  and `events` contains the array of events.

        {
          menu: ['p', 'Hello'],
          events: [...]
        }


[JsonML]: http://www.jsonml.org/
[JSON feed]: http://arshaw.com/fullcalendar/docs/event_data/events_json_feed/
[Event Objects]: http://arshaw.com/fullcalendar/docs/event_data/Event_Object/

##### Event creation
If an event creation API is specified, the user will be offered a link to it
including the following parameters, if they are not specified as `false`:

- `startParam`, or by default `'start'`: UNIX timestamp of requested event
  start.
- `endParam`, or by default `'end'`: UNIX timestamp of requested event end.
- `allDayParam`, or by default `'allDay'`: boolean indicating that a specific
  time-of-day has not been selected.

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

<!-- vim: set sw=2 sts=2 et: -->

