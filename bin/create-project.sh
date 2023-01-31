#
# Copyright (c) 2021 Cisco Systems, Inc and its affiliates
# All rights reserved
#
#!/bin/bash
webpack
set -e

NODE_OPTIONS=--max_old_space_size=8192
export NODE_OPTIONS

npm install

PROJECT_NAME=""
PROJECT_DESCRIPTION=""
PROJECT_UUID=""
OUTPUT_DIR=""
IMAGE=""
for PARAM in "$@" 
do
	if [ "${PROJECT_NAME}x" = "x" ] ; then
		PROJECT_NAME=`echo $PARAM | grep '\-project-name=' | sed -e 's|\-project-name=||g'`
	fi
	if [ "${PROJECT_DESCRIPTION}x" = "x" ] ; then
		PROJECT_DESCRIPTION=`echo $PARAM | grep '\-project-description=' | sed -e 's|\-project-description=||g'`
	fi
	if [ "${PROJECT_UUID}x" = "x" ] ; then
		PROJECT_UUID=`echo $PARAM | grep '\-project-uuid=' | sed -e 's|\-project-uuid=||g'`
	fi
	if [ "${OUTPUT_DIR}x" = "x" ] ; then
		OUTPUT_DIR=`echo $PARAM | grep '\-output-dir=' | sed -e 's|\-output-dir=||g'`
	fi
	if [ "${IMAGE}x" = "x" ] ; then
		IMAGE=`echo $PARAM | grep '\-image-file=' | sed -e 's|\-image-file=||g'`
	fi
done

if [ "${PROJECT_UUID}x" = "x" ] ; then 
	PROJECT_UUID=`uuidgen | tr '[:upper:]' '[:lower:]'`
fi

if [ "${PROJECT_DESCRIPTION}x" = "x" ] ; then 
	PROJECT_DESCRIPTION="Templated Service Pack"
fi

if [ "${OUTPUT_DIR}x" = "x" ] ; then 
	OUTPUT_DIR="$HOME/templated-service-$PROJECT_UUID"
fi

SCRIPT_LOC=`dirname $0`

# Handle case of ~/ as part of the input
CUR_DIR=`pwd`
cd ~/
_HOME=`pwd`
OUTPUT_DIR=`echo $OUTPUT_DIR | sed -e "s|\~\/|$_HOME\/|"`
# Handle ./ as well.
OUTPUT_DIR=`echo $OUTPUT_DIR | sed -e "s|^"\.\/"|$CUR_DIR\/|"`
cd $CUR_DIR


if [ ! -d $OUTPUT_DIR ] ; then 
	mkdir -p "$OUTPUT_DIR"
fi

cd "$OUTPUT_DIR"
OUTPUT_DIR=`pwd`
cd "$CUR_DIR"

if [ "${IMAGE}x" = "x" ] ; then 
	IMAGE="$SCRIPT_LOC/../sample-image/sample.svg"
else
	IMAGE=`echo $IMAGE | sed -e "s|\~\/|$_HOME\/|"`
	# Handle ./ as well.
	IMAGE=`echo $IMAGE | sed -e "s|^"\.\/"|$CUR_DIR\/|"`	
fi

if [ -d "$OUTPUT_DIR" ] ; then
	echo "Cleaning up previous project from output"
	rm -rf "$OUTPUT_DIR"
fi
mkdir -p "$OUTPUT_DIR"

export PROJECT_NAME
export PROJECT_DESCRIPTION
export PROJECT_UUID
export OUTPUT_DIR
export IMAGE


PATH="$CUR_DIR/node_modules/.bin:$PATH"
export PATH
if [ -f "$CUR_DIR/package.json" ] ; then
	npm install
    
fi
webpack --display-error-details


echo "Created base project at: [$OUTPUT_DIR]"
