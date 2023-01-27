# Templated Config Directory
This directory contains specific configuration hook helpers.  This project currently includes:

* **subscription** - An example implementation of a pre-subscription form that users should fill out before they are allowed to subscribe.  This is optional.  If you leeave this out and do not map it in the tcui-hooks.ts file, then no pre subscription form will display.
* **services** - All the basic service tiles a servicepack should provide content in, including a small status tile, a collapsed simple metrics tile, and an expanded details tile.
* **devices** - All the basic hook points for working witth devices, including how to register device actions, and supplimental custom tiles for display in the details view.
* **sites** - All the basic site hook points, which are actions on the details page, and an expandable site tile for the service to show in the details page.
* **navigation** - This is an optional and should be rarely-useed hook point for a TC-UI service.  This allows you to include additional menu items into the global navigation as well as provide a service menu you can activate within your UI code that will take over navigation until deactivate is called for service menu.