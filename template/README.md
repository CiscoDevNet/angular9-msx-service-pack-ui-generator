# Angular 9 Templated UI Build Tree

This is the root tree of the actual UI build tree.  When it is compiled by the createTemplate.sh, it becomes a usable UI build tree that will generate an installable UI that can be deployed through the Component Management (SLM) settings tile within the MSX UI.   

## The Project Files
The compiled UI consists of a series of root files.  These are used to actually build the UI and its SLM-installable tarfile.   The files are described below:

* **Dockerfile** - The Docker definition file used to assemble the container that MSX can deploy and start.
* **package.json** - The JavaScript dependencies your UI has.  The default set in this file are the minimum that your project will need.  You can add additional ones as you need.
* **rollup.config.js** - The build file.  This is the file that controls the compilation of the UI into runnable JS code.  It's based on rollup, a simple JavaScript build tool that can produce ES 2015 JavaScript Modules.   ES 2015 modules are what the MSX UI will consume to boot and run your UI code dynamically.
* **tsconfig.json** - The project code is in TypeScript as it leverages Angular 9+, which is the supported UI library used by MSX UI.  It is unlikely you would need to change this file.

### Directories
The project consists of several directories to help control the generated output.  They are described below.

* **bin** - The shell scripts used to build the project are ccontained here.  It is unlikely you would ever need to change these.
* **config** - Configuration files used by the Component Management utility to deploy and run the new UI container, and register it with the MSX Catalog.  It is unlikely you would ever need to change these.
* **src** The source code for the project.  This includes all the metadata used by the MSX catalog, as well as all the Typescript code that comprises the UI.

