// Configure event sources here
// (see the README for details)
/*jslint white: true */
/*global MasterCalendar: false */
/* vim: set sw=2 ts=2 noet */
MasterCalendar.addSources([
{
	name: 'Meals',
	api: {
		events: '/commonmeals/api.php?events',
		create: {
			url: '/commonmeals/api.php?new',
			startParam: 'time',
			endParam: false
		}
	},
	color: '#006600'
},
{
	name: 'Notes',
	url: '/commonmeals/api.php?notes',
	color: '#336699'
},
{
	name: 'Cal Poly CSC',
	url: 'https://www.google.com/calendar/feeds/u2fkgbv5g0v021r31uh9u9jhig%40group.calendar.google.com/public/basic',
	color: '#550055',
	currentTimezone: 'America/Los_Angeles'
}
]);

