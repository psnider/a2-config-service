# a2-config-service

This consists of a server module and an Angular2 service.
The server module supports setting multiple web-app configurations.

When a web app requests the config.service.js javascript file (which contains the Angular2 ConfigurationService),
the server selects the configuration for that user, based on what is in the session,
and sends javascript for the ConfigurationService that contains the selected configuration.

This provides all of the configuration data in the service itself, so it may be used immediately.

The service has one default configuration.
If you have multiple configurations, you must set one of them as the default.


# build
```
npm run build
```

# test
There are no automated tests yet.

Instead, run the server and vist http://localhost:3110/
The page should show:
> b:api_prefix=/api/v2/b