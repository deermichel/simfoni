#!/bin/bash

rm -Rf ./build ./dist
webpack --mode=production
cp ./src/main/index.js ./build/index.js
cp ./buildPackage.json ./build/package.json
electron-packager ./build --overwrite --out=./dist
