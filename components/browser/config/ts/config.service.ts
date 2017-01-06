import { Injectable }        from '@angular/core'


@Injectable()
export class ConfigurationService {

    CONFIG: any

    constructor() {
        this.CONFIG = 'SET_BY_SERVER'
    }


    getConfiguration(field_key: string): any {
        let fields = field_key.split(':')
        let obj = this.CONFIG
        fields.forEach((field) => {
            if (obj) {
                obj = obj[field]
            }
        })
        return obj
    }
    
}

