import { Component } from '@angular/core';
import './rxjs-extensions';

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
        configService.getConfiguration('b:api_prefix').then((config) => {
            this.config_str = config
        })
    }

}
