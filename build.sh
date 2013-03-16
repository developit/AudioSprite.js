#!/bin/sh

version=`echo "process.stdout.write(JSON.parse(require('fs').readFileSync('package.json')).version);" | node`
dir="dist/$version"

echo "Building (v$version)..."
grunt

echo "Gzipping..."
gzip -9 -f -c "$dir/audiosprite.js" > "$dir/audiosprite.js.gz"

echo "Zipping..."
zip -9 "$dir/audiosprite.zip" "$dir/audiosprite.js"

echo 'Done.'