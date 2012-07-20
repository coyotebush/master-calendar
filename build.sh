#!/bin/sh
BUILD=build
rm -rf build/*
cp index.html calendar-sources.js $BUILD
cat `sed -nE "s/@import \"(.*)\";/\1/p" calendar.css` > $BUILD/calendar.css
cat `sed -nE "s/js\('(.*)'\);/\1/p" calendar.js` > $BUILD/calendar.js
cp -R jquery/smoothness/images $BUILD
