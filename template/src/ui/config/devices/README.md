# Templated Device Config Directory
This directory contains specific configuration hook helpers specific to devices.  This project currently includes the following directories:

* **actions** - A demonstration of how to create and register 'device actions', actions users can perform on any devices associated to your servicepack and registered with MSX so that they appear in the devices list.  An action is nothing more than an Angular 9 component that will be rendered in a dialog, and provided a reference to the dialog controller, and the device information related to the device clicked on to act on.  What the action does is entirely up to what you need it to do.

* **summary** - Device summary information to display.  This is just a list of properties in your device object in MSX to display in the summary view when you expand your device in the MSX Devices list.

* **details** - Device detaild information to display.  This provides a list of panels where you can display informattion about the device specific to your service and actions you can perform on the specfic device.