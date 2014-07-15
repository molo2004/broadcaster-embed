# Ustream Broadcaster Embed Example

This is an example code for using the Ustream Broadcaster API with OAuth authentication.

## Installation

### Get the repository and install Composer dependencies
```
git clone https://github.com/ustream/broadcaster-embed.git 
cd broadcaster-embed
composer install
```

### Setup credentials
Copy the `api_config.example.php` file to `api_config.php` and modify it's `CLIENT_ID` and `CLIENT_SECRET` constant definitions.

### Final touches
 * Create a new vhost in your webserver and setup it's document root to `webroot`.
 * Open in the browser and see how it works.

## Licence

This project is licensed under the terms of the [MIT License (MIT)](LICENCE.md).

## Authors

 * Attila Gonda (pcdevil)
