#!/usr/bin/env bash

# cp server/public/css/app.*.css service/public/css/app.css
# cp
path="server/public"

# copy css
cp ${path}/css/app*.css ${path}/css/app.css

# copy app js files
cp ${path}/js/app.*.js ${path}/js/app.js
cp ${path}/js/app.*.js.map ${path}/js/app.js.map

# copy manifest map file
cp ${path}/js/manifest.*.js.map ${path}/js/manifest.js.map

# copy vendor js files
cp ${path}/js/vendor.*.js ${path}/js/vendor.js
cp ${path}/js/vendor.*.js.map ${path}/js/vendor.js.map