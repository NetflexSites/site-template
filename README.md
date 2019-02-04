# Netflex Site Template

This is a basic project skeleton for Netlfex based sites. It comes preconfigured with gulp for JS and SCSS compilation.

Gulp will compile and autoprefix SCSS files, and compile ES6 JS files to be comaptible with for the browsers defined in the .browserlistrc file.

**NOTICE**:

It is recommended that for new projects, that the compilation step is migrated to a tool like webpack. The gulp config is just there for legacy compatibility.

# Paths

- public/assets/js - Compiled JS files
- public/assets/css - Compiled SCSS files
- assets/scss - Source SCSS files
- assets/js - Source JS files
- config/watch.json - The js/scss compilation config
- vendor/ - Composer dependencies
- node_modules/ - NPM packagres

# Testing local

Run `composer install` and `yarn` (or `npm install`) in the root of this project to set up the dev dependencies.

Configre the config/api.json file with the sites credentials.

**WARNING**:

**This file should never be commited into source control**

To compile assets:

`yarn build` or `npm run build`

To watch assets:

`yarn watch` or `npm run watch`

This will serve up the site locally at http://localhost:8080

# Contribute

To contribute, please send us a pull request.
