# Angular 9 Templated UI Source
This directory contains all the TypeScript-based UI source for building a new Angular 9 Product UI for MSX.  The root directory contains all the core boot modules used by MSX to load and configure your UI code.  

## Core UI Files
The files are described below:

* **tcui-hooks.ts** - This is one of the most importaint files within the UI project.  The hooks file is what provides the configuration class to MSX, so that MSX knows how to hook in its components into the injectable points within the MSX UI.  In this templated UI, all the basic hook points are defined and configured.  The file is documented to indicate which are optional, and which are required.  Depending on your specific UI needs, you may end up disabling some of the hooks as you do not need them.  For example, you might turn off the pre subscription form if you do not need one.  
References of how this is hooked and loaded into MSX UI can be found in `catalogMetadata.json` file. Look for `slmUiConfig`.

* **ui-info.ts** - This file is used to provide information to MSX about your UI.  It will be populated during compilation to provide the following:
	* The date the UI was compiled.
	* The version of the UI (This is obtained through the enviroment variable BUILD_VERSION at compile time
	* The UI build number.  Thus is obtained through the environment variable BUILD_NUMBER at compile time.
	* The 'version id'.  This is regenerated on each build, and is used for 'cache breaking' the UI load.  It's appended to module requests to contol when the browser pulls the file from cache, or loads a new one.

* **routes.ts** -- Any Angular UI routes you may need to load completely unique UI views and not just injections into existing UI screens in MSX-UI

* **declarations.d.ts** -- module declarions for TypeScript compiler to treat
*.html and *.scss files as strings. You can read more about it here 
https://www.typescriptlang.org/docs/handbook/modules.html#working-with-other-javascript-libraries


## Directories
The templated UI project is broken down into a series of diectories to encapsulate each 'functioon' of the UI to make it easier to understand and develop indovidual parts as needed.  The directories are defined below:

* **i18n** - This is the internationalization directory.  It contains your root translation file (i18n.json), and any specific translations you may have.  By default, only a root English file is provided.  Translated ones would be provided by yourr project development.  All human-readable UI strings should be provided through the I18N bundle as key/value pairs.
* **config** - This directory contains the TC-UI components you should populate with your specific service data.  It contains the injections for services, sites, devices, as well as subsciptions as Angular 9 templated components.  You just need to provide their contents.  
* **manager** - This directory is used to contain any 'manager' style services that are used to do specific things.  By default it just provides an example subscription manager; a helper used to provide to MSX exactly how to subscribe to your servicepack.  The default implementation merely creates a new subscription and service instance in MSX, and sets its state to 'UP'.  Your specific service may need to do more, and within a manager class is a good place to do that.