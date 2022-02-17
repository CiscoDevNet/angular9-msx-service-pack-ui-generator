# Angular 9 Templated UI Build Tree

This is the root tree of the actual UI build tree.  When it is compiled by the `createTemplate.sh`, it becomes a usable UI build tree for MSX Service Pack. This directory also includes all files required for Service Pack registration within MSX. Running UI build in the generated UI build tree will generate an installable package that can be deployed through the Settings -> Component Management (SLM) tile within the MSX UI and become a fully functional MSX Service with UI.   

This file is also copied into the generated UI build tree. If you do not see the file `createTemplate.sh` in the directory structure you are looking at the result
of the UI build tree generation. Easiest way to check is `packages.json` file does
not have `@@placeholders@@`.

## Build

Run `npm install` then `npm run build`. There will be a tar.gz file in the `build`
directory. This file is an MSX deployable package.

## The Project Files
The compiled UI consists of a series of root files.  These are used to actually build the UI and its SLM-installable tarfile.   The files are described below:

* **Dockerfile** - The Docker definition file used to assemble the container that MSX can deploy and start.
* **package.json** - The JavaScript dependencies your UI has.  The default set in this file are the minimum that your project will need.  You can add additional ones as you need.
* **rollup.config.js** - The build file.  This is the file that controls the compilation of the UI into runnable JS code.  It's based on rollup, a simple JavaScript build tool that can produce ES 2015 JavaScript Modules.   ES 2015 modules are what the MSX UI will consume to boot and run your UI code dynamically.  See **rollup.config.js** file itself for additional information.
* **tsconfig.json** - The project code is in TypeScript as it leverages Angular 9+, which is the supported UI library used by MSX UI. File contains TypeScript complier options for converting TypeScript to JavaScript.  It is unlikely you would need to change this file.

### Directories
The project consists of several directories to help control the generated output.  They are described below.

* **bin** - The shell scripts used to build the project are contained here.  It is unlikely you would ever need to change these. See README.md file in the **bin** directory for additional details.
* **config** - Configuration files used by the Component Management utility to deploy and run the new UI container, and register it with the MSX Catalog.  It is unlikely you would ever need to change these. See README.md file in the **config** directory for additional details.
* **src** The source code for the project.  This includes all the metadata used by the MSX catalog, as well as all the Typescript code that comprises the UI.

