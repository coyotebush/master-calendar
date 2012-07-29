// Configure event sources here
// (see the README for details)
/* vim: set sw=2 ts=2 noet */
(function (MasterCalendar, $, undefined) {
MasterCalendar.sources = [
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
];
}(window.MasterCalendar = window.MasterCalendar || {}, jQuery));

