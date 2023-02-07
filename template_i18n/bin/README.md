# Angular 9 Tenant Centric Source Tree Shell Files

`build-dev.sh` uses **webpack** to compile UI files for development with MSX.  
`build.sh` uses **rollup** to compile files for deployment to MSX, 
builds container, exports container and archives files into deployable tar.gz file.  
These files are referenced in `package.json` file.
