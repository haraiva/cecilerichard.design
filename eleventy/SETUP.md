# Eleventy Setup

Ensure `npm`, `node.js` are both installed.

1. Install Eleventy (globally). `npm install @11ty/eleventy -g`
2. Verify successful install by running `eleventy`.

# New Project
1. Create a configuration file `eleventy.config.js` with the following options:
	```js
	module.exports = function(config) {
		// Insert Filters, Shortcodes, Custom Tags, Plugins here.
		// ...

		// Return your Object options:
		return {
			dir: {
				input: "src",
				output: "build"
			}
		}
	};
	```
2. Create the folders `src` and `build`. Inside `src` is where we'll create the templates and content. `build` will contain the generated site.
3. Inside `src`, create a simple `index.html` file with whatever you like.
4. In Terminal, run `eleventy --serve` and visit `localhost:8080` to verify the site built successfully.

# Running + Testing
1. Open this folder in Terminal.
2. Run `npm install` to download the necessary packages (this command refers to `package.json` to look up required packages).
3. Run `eleventy --serve` and visit `localhost:8080` to test the site.

# Adding Plugins
1. Downloading the necessary package using `npm install <package>`
2. In `eleventy.config.js`, add the packages using `const x = require('<package>')` at the start of the script.
3. Add the plugin in Eleventy's configuration api following the package's instructions.