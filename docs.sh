#!/bin/sh

wd=$PWD
cd $JSDOC
cd ..
cp "$wd/docs/jsdoc.conf" jsdoc.temp.conf
echo "$wd/docs/jsdoc.conf";
node jsdoc-node/app/run.js -c jsdoc.temp.conf
cd $wd