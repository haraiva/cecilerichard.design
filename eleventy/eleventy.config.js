// ELEVENTY CONFIG
const { DateTime } = require("luxon");
const pluginNavigation = require("@11ty/eleventy-navigation");

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
	
	// Passthrough Folders
	config.addPassthroughCopy({"src/_": "."})
	config.addPassthroughCopy("src/img")

	// Return config options
	return {
		dir: {
			input: "src",
			output: "build"
		}
	}
};