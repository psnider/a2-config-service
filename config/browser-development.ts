import {CommonConfigurationOverrides} from './browser-common'




export interface DevelopmentConfiguration {
    c: {
        api_prefix: string
    }
}


export var development: DevelopmentConfiguration & CommonConfigurationOverrides = {
    b: {
        api_prefix: '/api/v2/b'
    },
    c: {
        api_prefix: '/api/c'
    }
}

