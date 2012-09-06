// Configure event sources here
// (see the README for details)
/* vim: set sw=2 ts=2 noet */
MasterCalendar.sources = [
{
	name: 'Meals',
	url: '../commonmeals/www/api.php?events',
	create: {
		url: '../commonmeals/www/api.php?new',
		startParam: 'time',
		endParam: false
	},
	color: '#006600'
},
{
	name: 'Notes',
	url: '../commonmeals/www/api.php?notes',
	create: {
		url: '../commonmeals/www/api.php?notes&new',
		startParam: 'time',
		endParam: false
	},
	color: '#336699'
},
{
	name: 'Cal Poly CSC',
	url: 'https://www.google.com/calendar/feeds/u2fkgbv5g0v021r31uh9u9jhig%40group.calendar.google.com/public/basic',
	color: '#550055',
	currentTimezone: 'America/Los_Angeles'
}
];

