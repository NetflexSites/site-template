# Netflex Site Template

The netflex site template contains the folder structure and a sass version of bootstrap v 3.7 with watcher for sass and js pre configured. The site template will update as we update our foundation templates.

## Placement:

* public/assets/js - all javascripts for bootstrap
* public/assets/fonts - glyphicon icons
* assets/sass - bootstrap sass source
* config/watch.json - watcher configuration for sass and javascript files
* vendor/ - Composer dependencies

# Contribute

To contribute, please send us a pull request.

# Testing local

Run `composer install` in the root of this project to set up the dev dependencies.

Create .env file with keys `NF_PUBLIC_KEY` and `NF_PRIVATE_KEY`, or add credentials to `/config/api.json`.

To run local test server:

`vendor/bin/serve`

This will serve up the site locally at http://localhost:8080

**IMPOTANT:** 

Netflex does not support third party Composer dependencies at this time. So do not rely on them for your site.