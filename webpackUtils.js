// Copyright © 2021 Cisco Systems, Inc.  All Rights Reserved.

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

function resolvePath(...fragments) {
	return path.resolve(path.join(__dirname, ...fragments));
}

function splitAndResolvePath(path) {
	if (path) {
		return resolvePath.apply(null, path.split("/"));
	}
}

function getBase64Image(imageFile){
	let content = null;
	try {
		content = fs.readFileSync(imageFile);
		content = content.toString("base64");
		const lastIndex = imageFile.lastIndexOf(".");
		if(lastIndex >= 0){
			const fileSuffix = imageFile.substring(lastIndex + 1, imageFile.length);
			switch (fileSuffix.toLowerCase()) {
				case "svg":
					content = "data:image/svg+xml;base64," + content;
					break;
				case "jpeg":
				case "jpg":
					content = "data:image/jpeg;base64," + content;
					break;
				case "bmp":
					content = "data:image/bmp;base64," + content;
					break;
				case "gif":
					content = "data:image/gif;base64," + content;
					break;
				case "png":
					content = "data:image/png;base64," + content;
					break;
				case "tif":
				case "tiff":
					content = "data:image/png;base64," + content;
					break;
				default:
					content = "";
			}
		}
	}catch(ex){
		console.log("Could not read image file: ", imageFile, ex);
	}
	return content;
}


/**
 * Helper function to take a copy definition (or array of them) and generate
 * copy plugins based off it.  It's used in all three webpack files to simplify
 * creating copy lists.
 */
function generateCopyPlugin(copyObjOrArray, replaceVars) {
	if (copyObjOrArray) {
		const cDataArr = [];
		if (copyObjOrArray.length == null) {
			copyObjOrArray = [copyObjOrArray];
		}
		copyObjOrArray.forEach(function(copyObj) {
			const copyData = {
				from: copyObj.from || "",
				context: copyObj.context,
				to: copyObj.to,
				ignore: copyObj.ignore || undefined
			};
			if (replaceVars && replaceVars.length) {
				copyData.transform = function(content, path) {
					content = content.toString();
					replaceVars.forEach(function(varBlock) {
						const regexp = new RegExp(varBlock.search, varBlock.flags);
						content = content.toString().replace(regexp, varBlock.replace);
					});
					return content;
				};
			}
			cDataArr.push(copyData);
		});
		return new CopyPlugin(cDataArr);
	}
}

class GenerateServiceDataPayloadPlugin {
	constructor(props = {}) {
		this.servicesDir = props.servicesDir;
		this.offersDir = props.offersDir;
		this.priceplansDir = props.priceplansDir;
		this.termsDir = props.termsDir;
		this.replacements = props.replacements || [];
		this.outputDir = props.outputDir || "";
	}
	apply(compiler) {
		const self = this;
		compiler.hooks.emit.tapAsync('GenerateServiceDataPayloadPlugin', function(compilation, callback) {
			const services = [];
			const offers = [];
			const priceplans = [];
			const terms = [];
			
			const processFile = function(fileName, outputArray){
				let content = "";
				try {
					content = fs.readFileSync(fileName, 'utf8');
					content = content.toString();
					self.replacements.forEach(function(rep){
						const regex = new RegExp(rep.search, rep.flags);
						content = content.replace(regex, rep.replace || "");
					});
				}catch(ex){
					console.log("There was an issue reading: " + fileName, ex);
				}
				if(content){
					outputArray.push(JSON.parse(content));
				}
			};
			
			const processDirectory = function(directory){
				const paths = [];
				fs.readdirSync(directory).forEach(function(file) {
					const p = path.resolve(directory, file);
					if(!fs.lstatSync(p).isDirectory() && p.endsWith(".json")){
						paths.push(p);
					}
				});
				return paths;
			};
			
			processDirectory(self.servicesDir).forEach(function(f){
				processFile(f, services);
			});
			processDirectory(self.offersDir).forEach(function(f){
				processFile(f, offers);
			});
			processDirectory(self.priceplansDir).forEach(function(f){
				processFile(f, priceplans);
			});
			processDirectory(self.termsDir).forEach(function(f){
				processFile(f, terms);
			});
			const finalPayload = {
				services: services
			};
			finalPayload.services.forEach(function(service){
				const sId = service.id;
				service.offers = [];
				offers.forEach(function(offer){
					if(offer.productId === sId){
						service.offers.push(offer);
						offer.priceplans = [];
						offer.terms = [];
						priceplans.forEach(function(pp){
							if(pp.serviceId === sId && pp.offerId === offer.uuid){
								offer.priceplans.push(pp);
							}
						});
						terms.forEach(function(term){
							if(term.serviceId === sId && term.offerId === offer.uuid){
								offer.terms.push(term);
							}
						});						
					}
				});
			});
			if(self.outputDir){
				try {
					const outputFile = path.resolve(path.join(self.outputDir, "catalogMetadata.json"));
					if(!fs.existsSync(self.outputDir)){
						fs.mkdirSync(self.outputDir, {recursive: true });
					}
					fs.writeFileSync(outputFile, JSON.stringify(finalPayload, null, "\t"),{
						encoding: "utf8", 
						flag: "a+", 
						mode: 0o666 
					});
				}catch(ex){
					console.log("There was an issue writing the final output file: ", ex);
				}
			}
			callback();
		});
	}
}

module.exports = {
	resolvePath: resolvePath,
	splitAndResolvePath: splitAndResolvePath,
	generateCopyPlugin: generateCopyPlugin,
	GenerateServiceDataPayloadPlugin: GenerateServiceDataPayloadPlugin,
	getBase64Image: getBase64Image
};