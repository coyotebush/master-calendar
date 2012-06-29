var myEventSources = [
{
	name: 'Meals',
	api: {
		events: '/commonmeals/api.php?events',
		menu:   '/commonmeals/api.php?info',
		create: {
			url: '/commonmeals/api.php?new',
			startParam: 'time',
			endParam: 'ignore'
		}
	},
	color: '#006600',
},
{
	name: 'SLO Swing',
	url: 'https://www.google.com/calendar/feeds/gflsystems.com_kav7dpb8rmcqf6eevbibibfpes%40group.calendar.google.com/public/basic',
	color: '#550055',
	currentTimezone: 'America/Los_Angeles'
}
];
