# Netflex Site Template

This is a basic project skeleton for Netlfex based sites. It comes preconfigured with webpack for JS and SCSS compilation. It is set up with Bootstrap 4 and JQuery.

Webpack will compile and autoprefix SCSS files, and compile ES6 JS files to be comaptible with all browsers from IE11 and up.

Webpack also generates source maps automatically.

#### Built assets will always have the name `bundle.js` and `bundle.scss`. This can be changed in the `webpack.config.js` file.

#### If you do change this, please update your `.gitignore` to avoid getting the built assets commited into the repository.

# Paths

* public/assets/js - Compiled JS files
* public/assets/css - Compiled SCSS files
* assets/sass - Source SCSS files
* assets/js - Source JS files
* config/watch.json - Deprecated. See webpack.config.js instead
* vendor/ - Composer dependencies

# Testing local

Run `composer install` and `yarn` (or `npm install`) in the root of this project to set up the dev dependencies.

Create a `.env` file with keys `NF_PUBLIC_KEY` and `NF_PRIVATE_KEY`
If a `api.json` (deprecated) is detected in the config directory, it will automatically be upgraded to a `.env` file.

To compile assets:

`yarn build` or `npm run build`

To watch assets:

`yarn dev` or `npm run dev`

To run local test server:

`vendor/bin/serve`

This will serve up the site locally at http://localhost:8080

# Contribute

To contribute, please send us a pull request.
