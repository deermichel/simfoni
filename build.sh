#!/bin/bash

rm -Rf ./build ./dist
webpack --mode=production --config=renderer.webpack.config.js
webpack --mode=production --config=remote.webpack.config.js
cp ./src/main/index.js ./build/index.js
cp ./buildPackage.json ./build/package.json
electron-packager ./build --overwrite --out=./dist
