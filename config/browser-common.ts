export interface CommonConfiguration {
    a: {
        api_prefix: string
    }
    b: {
        api_prefix: string
    }
}


export interface CommonConfigurationOverrides {
    a?: {
        api_prefix?: string
    }
    b?: {
        api_prefix?: string
    }
}


export var common: CommonConfiguration = {
    a: {
        api_prefix: '/api/a'
    },
    b: {
        api_prefix: '/api/b'
    }
}