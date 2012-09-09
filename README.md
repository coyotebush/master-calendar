A web application that displays data from several sources, built with jQuery
and [FullCalendar][].

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

Development
---
Open `public/index.html` and edit the code in `src/`.

Deployment
---
Run `build.sh` to combine and minify (using YUI Compressor) the JS and CSS
files, then copy the contents of the `build` directory to an appropriate
location.

Configuring event sources
---
Sources are specified in the array in `calendar-sources.js`. A source provides
event data for the calendar through a JSON API.

A [source][] must have a `name` and `color` specified. Most uses will probably
involve a [JSON feed][]. A minimal specification for a source is as

```javascript
{
  name: 'Community Events',
  url: '/events/api',
  color: '#006600'
}
```

### Event properties
Recognized additional (optional) properties for [Event Objects][] are
demonstrated here. The `body` property uses [JsonML][].

```javascript
{
  // content to be rendered as part of the event
  "body": ["dl", ["dt", "Location"], ["dd", "Social Room"]],
  // boolean indicating the calendar user's "participation" in an event
  "participation": true
}
```

### Menu content "events"
Zero or more Event Objects with `"id": "menu"` may be included. Instead of being
rendered within the calendar display, these will be used to display accompanying
content within the source's entry in the list of sources.

```javascript
[
  ...
  {
    "id": "menu",
    // ignored (but required by FullCalendar)
    "title": "menu",
    // range of viewing windows for which this content
    // should be rendered; for best results, the "menu
    // events" should cover the entire requested range
    // without overlapping.
    "start": "2012-01-01T00:00:00Z",
    "end": "2012-02-01T00:00:00Z",
    // JsonML content again
    "body": ["p", ["a", {"href": "#"}, "Manage my account"]]
  }
]
```



### Event creation
A second API can enable calendar users to create events in a source. To specify
an event creation API, the URL may be specified as the value of `create`, or
`create` can contain properties as below:

```javascript
{
  name: 'Events',
  url: '/events/api?events',
  create: {
    url:  '/events/api?new',
    startParam: 'time',    // UNIX timestamp of event start
    endParam: false,       // UNIX timestamp of event end
    allDayParam: 'fullDay' // no specific time-of-day
  },
  color: '#006600',
}
```

The default parameter names will result in a link like:

    /events/api?new&start=1341162000&end=1341165600&allDay=false

The parameter names specified above will result in:

    /events/api?new&time=1341162000&fullDay=true

[FullCalendar]: http://arshaw.com/fullcalendar/
[source]: http://arshaw.com/fullcalendar/docs/event_data/Event_Source_Object/
[JSON feed]: http://arshaw.com/fullcalendar/docs/event_data/events_json_feed/
[Event Objects]: http://arshaw.com/fullcalendar/docs/event_data/Event_Object/
[JsonML]: http://www.jsonml.org/

<!-- vim: set sw=2 sts=2 et tw=80: -->

