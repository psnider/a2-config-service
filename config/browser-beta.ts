import {CommonConfigurationOverrides} from './browser-common'




export interface BetaConfiguration {
    c: {
        api_prefix: string
    }
}


export var beta: BetaConfiguration & CommonConfigurationOverrides = {
    b: {
        api_prefix: '/api/beta/b'
    },
    c: {
        api_prefix: '/api/beta/c'
    }
}

