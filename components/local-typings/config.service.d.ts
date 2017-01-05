import {Http} from '@angular/http'


// All errors returned are strings suitable for display to the user.
export class ConfigurationService {
    constructor(http: Http)

    // Return the ID of the person who is signed-in.
    getConfiguration(): any
}

