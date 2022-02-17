import webpackExternals from '@cisco-msx/webpack-externals';
import { resolve as resolvePath } from "path";
// rollup uses a set of plugin to process files with different extentions.
// references to them can be found in package.json
import replace from "@rollup/plugin-replace";
import externalGlobals from "rollup-plugin-external-globals";
import html from "rollup-plugin-html";
import scss from "rollup-plugin-scss";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import {terser} from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

// Variables for UI artifact build identification
// Values will be places into ui-info.ts file that is read by MSX UI to show
// artifact buils related information.
const BUILD_NUMBER = process.env["BUILD_NUMBER"] || "";
const BUILD_PATH = process.env["BUILD_PATH"] || "";
const BUILD_DATE = new Date();
const BUILD_DATE_STRING = BUILD_DATE.toISOString();
const VERSIONING = BUILD_DATE.getTime() + "";
const BUILD_VERSION = process.env["BUILD_VERSION"] || "";

const moduleName = "@@servicepack_name@@";
const baseComponentName = "@@base_component_name@@";

const joinedExternals = {};
Object.entries(webpackExternals).forEach(([name, path]) => {
	joinedExternals[name] = Array.isArray(path) ? path.join('.') : path;
});

export default {
	// initial starting points for building output JavaScript
	input: {
		"routes": resolvePath("src", "ui", "routes.ts"),
		"tcui-hooks": resolvePath("src", "ui", "tcui-hooks.ts"),
		"ui-info": resolvePath("src", "ui", "ui-info.ts"),
	},
	output: {
		// output to build/services
		sourcemap: true,
		dir: BUILD_PATH ? resolvePath(BUILD_PATH) : resolvePath("build", "services"),
		format: "es"
	},
	plugins: [
		typescript({
			typescript: require("typescript"),
		}),
		sourcemaps(),
		babel({
		  exclude: "node_modules/**,**.html",
		  babelHelpers: "bundled"
		}),
		replace({
			values: {
				"__BUILD_NUMBER__": BUILD_NUMBER,
				"__UI_BUILDDATE__": BUILD_DATE_STRING,
				"__SERVICE_PACK_NAME__": moduleName,
				"__BUILD_VERSION__": BUILD_VERSION,
				"__BUILD_VERSION_ID__": VERSIONING
			},
			preventAssignment: true
		}),
		terser(),
		scss({
			output: resolvePath("build", "services", moduleName + ".css"),
		}),
		html({
			include: "**/*.html",
			htmlMinifierOptions: {
				removeAttributeQuotes: false,
				caseSensitive: true,
				customAttrSurround: [
					[/#/, /(?:)/],
					[/\*/, /(?:)/],
					[/\[?\(?/, /(?:)/]
				],
				customAttrAssign: [
					/\)?\]?=/
				]
			}
		}),
		externalGlobals(joinedExternals),
		copy({
		  targets: [
			{ src: 'src/ui/i18n/**.json', dest:  BUILD_PATH ? resolvePath(BUILD_PATH) : resolvePath("build", "services", "i18n") },
			{ src: 'src/ui/help/**.json', dest:  BUILD_PATH ? resolvePath(BUILD_PATH) : resolvePath("build", "services", "help") },
			{ src: 'src/metadata/**.json', dest:  BUILD_PATH ? resolvePath(BUILD_PATH) : resolvePath("build") },
			{ src: 'config/manifest.yml', dest:  BUILD_PATH ? resolvePath(BUILD_PATH) : resolvePath("build") }
		  ]
		})
	]
};
