#
# Copyright (c) 2021 Cisco Systems, Inc and its affiliates
# All rights reserved
#
#!/bin/sh

SCRIPT_LOC=`dirname $0`
CUR_DIR=`pwd`

if [ $# -eq 0 ] ; then
	echo ""
	echo "####################################################################"
	echo "Usage: "
	echo "The following commandline arguments are supported:"
	echo ""
	echo "   -project-name=<your project/SP internal name> This is the internal project name used to generate your metadata and uniquely identify your new servicepack UI.  It needs to be alphanumric, no spaces, no dashes, no underscores.  It is requireed."
	echo ""
	echo "   -project-description=\"Some description\"   This is an optional description of your servicepack.  If you don't define it, it defaults to empty."
	echo ""
	echo "   -image-file=<file>  An optional image file used for generating the icons displayed in the service catalog and MSX UI.  If it is not provided, it is defaulted to a generic image."
	echo ""
	echo "   -output-dir=<someDir>   An optional output directory where to create the new UI files"
	echo ""
	echo ""
	echo "Example:"
	echo "   ./createTemplate.sh -project-name=\"fakecoSomeNewService\" -project-description=\"My Awesome UI for SomeNewService\" -image-file=\"some/path/image.png\" -output-dir=\"~/SomeNewDirectory\""
	echo "####################################################################"
	echo ""
	exit -1;
fi

cd "$SCRIPT_LOC"

# Process all the inputs as they need to be escaped/quoted before passing through.
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

npm run create-project -- "-project-name=$PROJECT_NAME" "-project-description=$PROJECT_DESCRIPTION" "-project-uuid=$PROJECT_UUID" "-image-file=$IMAGE" "-output-dir=$OUTPUT_DIR"
cd $CUR_DIR