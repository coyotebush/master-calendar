#!/bin/sh
BUILD=build
rm -rf $BUILD && mkdir $BUILD
cp -R public/index.html public/calendar-sources.js lib/jquery/smoothness/images $BUILD
cat `sed -nE "s/@import \"\.\.\/(.*)\";/\1/p" public/calendar.css` \
	| yui-compressor --type css -o $BUILD/calendar.css
cat `sed -nE "s/js\('\.\.\/(.*)'\);/\1/p" public/calendar.js` \
	| yui-compressor --type js -o $BUILD/calendar.js
