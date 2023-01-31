# Angular 9 Templated UI Help
This directory contains a JSON-based registration file for registering help within the MSX UI.   This allows the use of the MSX Help Service launcher within you UI to launch help for parts of your app.  There's an example of using this in the **config/services/components/tiles/service-details-tile.component.js** to launch help from the toolbar from buttons and menus.

This file is loaded by MSX through the Angular 9 Application Loader when it detects the 'online-help' link defined within your service metadata.

## Core Help Files
The files are described below:

* **help.json** - The JSON formatted file that defines a key to URL mapping for help content you wish to reference within your application.   The format is simple and shown below in an example:

```
[{
	"key": "msx/@@servicepack_name@@/",
	"url": {
		"root": "https://www.cisco.com",
		"en": "https://www.cisco.com"
	}
},{
	"key": "msx/platform/tenant/workspace/@@servicepack_name@@/help",
	"url": {
		"root": "https://www.cisco.com",
		"en": "https://www.cisco.com"
	}
}]
```

The key is the unique identifier you use within your code to launch help from a button, menu, etc.   The URL can be either a simple string tha's a URL to where the help is, or it can be an object shown in the example, which allows specifying help per locale, with a fallback to root if there is no locale specific version of the help.

If you want the URLS relative to your MSX install, you can also do that, just don't specify http(s)://server in the URL, just provide the MSX relative path as the URL, and it will load it fom the MSX environment using that relative URL.
