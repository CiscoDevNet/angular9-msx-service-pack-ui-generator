#
# Copyright (c) 2021 Cisco Systems, Inc and its affiliates
# All rights reserved
#
#!/bin/bash

set -e

NODE_OPTIONS=--max_old_space_size=8192
export NODE_OPTIONS

CUR_DIR=`pwd`

if [ -d "./build" ] ; then
	echo "Cleaning up old build"
	rm -rf "./build"
fi
mkdir -p ./build

printf '\nUpdating dependencies\n'
npm install

printf '\nBundling main app with Rollup\n'
PATH="$CUR_DIR/node_modules/.bin:$PATH"
export PATH
if [ -f "$CUR_DIR/package.json" ] ; then
	npm install
fi
rollup --config rollup.config.js

docker build -t @@servicepack_name@@:1.0.0 .
docker save  @@servicepack_name@@:1.0.0 | gzip > build/slmimage-@@servicepack_name@@-1.0.0.tar.gz

cd build

ZIP=`which zip`

if [ -f "$ZIP" ] ; then 
	$ZIP -yr tcui_package.zip *
fi

TAR=`which tar`

if [ -f "$TAR" ] ; then 
	# TODO double check that this still works on MAC after removel of "./"
	# --exclude=./tcui_package.zip does not work on UNIX
	# had to change it to --exclude=tcui_package.zip
	$TAR --exclude=tcui_package.zip --exclude=services -czf @@servicepack_name@@_slm_deployable.tar.gz *
	rm -f slmimage-@@servicepack_name@@-1.0.0.tar.gz
fi

cd "$CUR_DIR"