# Templated Device Action

This is a demonstration and example implementation of how to povide device actions to MSX.   A device action is just a component that takes two inputs:  A reference to its containing dialog, and the device information.  What the action does with the device is wholly up to what your product needs to do.  

## Files
* **device-actions.module.ts** - A dynamic module file used to encapulate and contain the device actions to register with MSX.
* **device-actions.ts** - A configuration class used to tell MSX what to register as device actions.  See the implementation for examples and documentation.

## Directories
* **components** The component implementations for the device actions.  These are imported by the module and then exported so they can be loaded dynamically.

