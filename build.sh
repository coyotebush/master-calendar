#!/bin/sh
BUILD=build
rm -rf $BUILD && mkdir $BUILD
cp -R index.html calendar-sources.js jquery/smoothness/images $BUILD
cat `sed -nE "s/@import \"(.*)\";/\1/p" calendar.css` \
	| yui-compressor --type css -o $BUILD/calendar.css
cat `sed -nE "s/js\('(.*)'\);/\1/p" calendar.js` \
	| yui-compressor --type js -o $BUILD/calendar.js
