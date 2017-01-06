# a2-config-service

This consists of a server module and an Angular2 service.
The server module supports setting multiple web-app configurations.

When a web app requests the config.service.js javascript file (which contains the Angular2 ConfigurationService),
the server selects the configuration for that user, based on what is in the session,
and sends javascript for the ConfigurationService that contains the selected configuration.

This provides all of the configuration data in the service itself, so it may be used immediately.

The service has one default configuration.
If you have multiple configurations, you must set one of them as the default.


# usage

- npm install @sabbatical/a2-config-service
- Define your browser configurations.  
Follow the examples in config/browser-*  
You may place these files anywhere in your project, since they are referenced directly by your server.


## Add to your web server
- import the package
```
import {addConfiguration as addBrowserConfiguration, handleConfigServiceJS} from '@sabbatical/a2-config-service/server'
```
- add each of your browser configurations to your server  
```
// The first configuration is the default, unless the is_default parameter is set
addBrowserConfiguration('beta', common, beta)
addBrowserConfiguration('alpha', common, alpha)
```
- serve the config.service.js file from the path that your web-app uses  
```
app.get('/yourwebapp/config.service.js', handleConfigServiceJS)
```


## Add to the ConfigurationService to your web-app
- import the service into any of your web-app's files that reference it    
```
import { ConfigurationService } from '@sabbatical/a2-config-service/browser';
```
- add the service to your web-app's NgModule's providers  
```
  providers: [
    ConfigurationService,
  ],
```
- inject the service into any components or services that need it  
```
constructor(private configService: ConfigurationService) {
    this.config_str = configService.getConfiguration('b:api_prefix')
}
```

# build
```
npm run build
```

# test
There are no automated tests yet.

Instead, run the server and vist http://localhost:3110/
The page should show:
> b:api_prefix=/api/beta/b