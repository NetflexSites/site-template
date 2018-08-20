# site-template

Site template for Netflex

## Structure:

* assets - All assets that should be compiled
* public - Compiled assets
* config/api.json - Netflex Content-API configuration
* config/watch.json - Watcher configuration for SCSS and JS compiling
* config/watch.json - Watcher configuration for SCSS and JS compiling
* config/routes.json - Route config
* vendor/ - Composer dependencies
* node_modules/ - NPM dependencies

# Testing local

Run `composer install` in the root of this project to set up the PHP dependencies.
Run `yarn` or `npm install` in the root of this project to set up the JS dependencies.

Create .env file with keys `NF_PUBLIC_KEY` and `NF_PRIVATE_KEY` (recommended), or add credentials to `/config/api.json`.

To run local test server:

`netflex serve`

This will serve up the site locally at http://localhost:8000

**IMPOTANT:**

Netflex does not support third party Composer dependencies at this time. So do not rely on them for your site.
