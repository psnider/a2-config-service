import {CommonConfigurationOverrides} from './browser-common'




export interface AlphaConfiguration {
    c: {
        api_prefix: string
    }
}


export var alpha: AlphaConfiguration & CommonConfigurationOverrides = {
    b: {
        api_prefix: '/api/alpha/b'
    },
    c: {
        api_prefix: '/api/alpha/c'
    }
}

