// Copyright © 2019, 2021 Cisco Systems, Inc.  All Rights Reserved.

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ChmodWebpackPlugin = require("chmod-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const { v4: uuidgen } = require('uuid');

// Load the functions/utils we share with other webpack configs, and our buildconfig
// which has lists to merge and copy (in one place to avoid duplication)
const buildUtils = require("./webpackUtils.js");

const PROJECT_NAME = process.env.PROJECT_NAME || "";
const PROJECT_UUID = process.env.PROJECT_UUID || "";
const PROJECT_DESCRIPTION = process.env.PROJECT_DESCRIPTION || "";
const OUTPUT_DIR = process.env.OUTPUT_DIR || "";
const IMAGE = process.env.IMAGE || "";
const BUILD_DATE = new Date().toISOString();
const APP_FOLDER = process.env.APP_TYPE || "template";

let IMAGE_URL="";
if(IMAGE){
	IMAGE_URL = buildUtils.getBase64Image(IMAGE);
}

const SERVICE_UUID = uuidgen();
const OFFER_UUID = uuidgen();
const TERMS_UUID = uuidgen();
const PRICEPLAN_UUID = uuidgen();

const normalizeString = function(str){
	str = str || "";
	return str.toLowerCase();
};

const getBaseComponentName = function(str){
	let name = normalizeString(str);
	if(name.length){
		name = name.charAt(0).toUpperCase() + name.substring(1, name.length);
	}
	return name;
};

const aliases = {};
aliases[normalizeString(PROJECT_NAME)] = buildUtils.resolvePath("src");

const config = {
    output: {
        path: OUTPUT_DIR,
        filename: "_temp.js",
        publicPath: "/"
    },

    entry: buildUtils.resolvePath("src", "index.js"),

	resolve: {
		extensions: [".ts", ".js"],
		alias: aliases
	},

	plugins: [
		// Copy all .md files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.md"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .yml files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.yml"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .html files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.html"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .js files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.js"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .ts files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.ts"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .scss files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.scss"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy .json files from template folder root to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "*.json"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy .json files from template/src/ui/i18n folder root to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "src/app/ui/i18n/*.json"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy .json files from template/src/ui/help folder root to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "src/app/ui/help/*.json"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy over the deployer shell script to make easy deployment of metadata
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "bin/*.sh"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy over the Dockerfile
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/Dockerfile"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Copy all .conf files from template to output performing replacements.
		buildUtils.generateCopyPlugin({
			// To is relative to output dir
			to: normalizeString(PROJECT_NAME),
			context: "template/",
			from: "**/*.conf"
		},[
			{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
			{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
			{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
			{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
			{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
			{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
			{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
			{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
			{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"},
			{search: "@@servicepack_builddate@@", replace: BUILD_DATE, flags: "g"}
		]),
		// Change mode on all .sh files to executable
		new ChmodWebpackPlugin([
			{path: OUTPUT_DIR + "/" + normalizeString(PROJECT_NAME) + "/bin/*.sh", mode: 755},
			{path: OUTPUT_DIR + "/" + normalizeString(PROJECT_NAME) + "/src/app/metadata/*.sh", mode: 755}
		]),
		new RemovePlugin({
            after: {
            	include: [
            		path.resolve(OUTPUT_DIR, "_temp.js")
            	],
            	trash: true,
            	allowRootAndOutside: true
            }
        }),
		// Combine files in src/metadata to build one medata data file
		// This is our own webpack plugin
		// output file name "catalogMetadata.json" is in the plugin.
        new buildUtils.GenerateServiceDataPayloadPlugin({
        	outputDir: path.resolve(OUTPUT_DIR, normalizeString(PROJECT_NAME), "src", "app", "metadata"),
        	servicesDir: buildUtils.resolvePath("template", "src","app", "metadata", "services"),
        	offersDir: buildUtils.resolvePath("template", "src", "app", "metadata", "offers"),
        	priceplansDir: buildUtils.resolvePath("template", "src", "app", "metadata", "priceplans"),
        	termsDir: buildUtils.resolvePath("template", "src", "app", "metadata", "terms"),
        	replacements:[
				{search: "@@servicepack_name@@", replace: normalizeString(PROJECT_NAME), flags: "g"},
				{search: "@@base_component_name@@", replace: getBaseComponentName(PROJECT_NAME), flags: "g"},
				{search: "@@servicepack_description@@", replace: PROJECT_DESCRIPTION, flags: "g"},
				{search: "@@servicepack_uuid@@", replace: PROJECT_UUID, flags: "g"},
				{search: "@@service_uuid@@", replace: SERVICE_UUID, flags: "g"},
				{search: "@@offer_uuid@@", replace: OFFER_UUID, flags: "g"},
				{search: "@@terms_uuid@@", replace: TERMS_UUID, flags: "g"},
				{search: "@@priceplan_uuid@@", replace: PRICEPLAN_UUID, flags: "g"},
				{search: "@@inline-image@@", replace: IMAGE_URL, flags: "g"}
			]
        })
	],
	module: {}
};

module.exports = function(env = {}) {
	return merge(config, {
		mode: "none"
	});
};