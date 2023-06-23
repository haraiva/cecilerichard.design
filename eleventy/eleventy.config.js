// ELEVENTY CONFIG
const { DateTime } = require("luxon");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginTOC = require('eleventy-plugin-toc');

// markdown-it + plugins
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');


module.exports = function(config) {

	// Insert Collections, Filters, Shortcodes, Custom Tags, Plugins here.

	// Collection: Design Projects
	config.addCollection("design", (api) => {
		return api.getFilteredByTags("projects", "design")
	});

	// Collection: Illustration Projects
	config.addCollection("illustration", (api) => {
		return api.getFilteredByTags("projects", "illustration")
	});

	// Collection: Games Projects
	config.addCollection("games", (api) => {
		return api.getFilteredByTags("projects", "games")
	});

	// Collection: Zine Projects
	config.addCollection("zines", (api) => {
		return api.getFilteredByTags("projects", "zines")
	});

	// Filter: Readable Date. Converts DateObject to "01 Jul 2023"
	config.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	// Plugin: Eleventy Navigation
	config.addPlugin(pluginNavigation);

	// Plugin: Table of Contence
	config.addPlugin(pluginTOC, {
		ul: true
	});
	
	// DEV: Don't duplicate passthru folders into '/build/'
	config.setServerPassthroughCopyBehavior("passthrough");

	// Passthrough Folders
	config.addPassthroughCopy({"src/_": "."})
	config.addPassthroughCopy("src/img")

	// Set parser library
	config.setLibrary('md', markdownIt().use(markdownItAnchor));

	// Return config options
	return {
		dir: {
			input: "src",
			output: "build"
		}
	}
};