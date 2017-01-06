import { Component } from '@angular/core';

import { ConfigurationService } from './config.service'
type DatabaseObjectID = string




@Component({
    selector: 'test-config-app',
    template: `
        <h1>{{title}}</h1>
        b:api_prefix={{config_str}}
        `,
    // styleUrls: ['/app.component.css']
})
export class AppComponent {

    title = 'Test Configuration Service';
    config_str: string

    constructor(private configService: ConfigurationService) {
        this.config_str = configService.getConfiguration('b:api_prefix')
    }

}
