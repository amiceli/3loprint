#!/usr/bin/env bash

# create some folders
mkdir ${TRAVIS_BUILD_DIR}/server/public/css
mkdir ${TRAVIS_BUILD_DIR}/server/public/js
mkdir ${TRAVIS_BUILD_DIR}/server/public/fonts

# copy font
cp ${TRAVIS_BUILD_DIR}/app/dist/fonts/*.ttf ${TRAVIS_BUILD_DIR}/server/public/fonts/

# copy css
cp ${TRAVIS_BUILD_DIR}/app/dist/css/app*.css ${TRAVIS_BUILD_DIR}/server/public/css/app.css

# copy app js files
cp ${TRAVIS_BUILD_DIR}/app/dist/js/app.*.js ${TRAVIS_BUILD_DIR}/server/public/js/app.js
cp ${TRAVIS_BUILD_DIR}/app/dist/js/app.*.js.map ${TRAVIS_BUILD_DIR}/server/public/js/app.js.map

# copy manifest map file
cp ${TRAVIS_BUILD_DIR}/app/dist/js/manifest.*.js.map ${TRAVIS_BUILD_DIR}/server/public/js/manifest.js.map

# copy vendor js files
cp ${TRAVIS_BUILD_DIR}/app/dist/js/vendor.*.js ${TRAVIS_BUILD_DIR}/server/public/js/vendor.js
cp ${TRAVIS_BUILD_DIR}/app/dist/js/vendor.*.js.map ${TRAVIS_BUILD_DIR}/server/public/js/vendor.js.map