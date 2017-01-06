import {Http} from '@angular/http'


// All errors returned are strings suitable for display to the user.
export class ConfigurationService {
    constructor(http: Http)

    getConfiguration(field_key: string): Promise<any>
}

