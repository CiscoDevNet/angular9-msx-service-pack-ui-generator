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
npm run create-project -- $@
cd $CUR_DIR