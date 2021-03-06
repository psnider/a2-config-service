import fs = require('fs')
import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'
import deepExtend = require('deep-extend')
import HHTP_STATUS_CODES = require('http-status-codes')



const CONFIG_SERVICE_JS_FILENAME = 'browser/browser/config/ts/config.service.js'
const CONFIG_SERVICE_JS_FILENAMES = [
    CONFIG_SERVICE_JS_FILENAME,
    `node_modules/@sabbatical/a2-config-service/${CONFIG_SERVICE_JS_FILENAME}`
]
const CONFIG_SERVICE_JS_DATA_MARKER = "'SET_BY_SERVER'"
var config_service_js: {start: string, end: string} = {
    start: undefined,
    end: undefined
}
var DEFAULT_CONFIG: string
var CONFIGURATIONS: {[config_name: string]: {}} = {}
var CONFIG_SERVICE_JS_WITH_CONFIGURATIONS: {[config_name: string]: string} = {}

function loadConfigService() {
    let filename = CONFIG_SERVICE_JS_FILENAMES.find((filename) => {
        let succeeded
        try {
            let contents: string = fs.readFileSync(filename).toString()
            let parts = contents.split(CONFIG_SERVICE_JS_DATA_MARKER)
            config_service_js.start = parts[0]
            config_service_js.end   = parts[1]
            succeeded = true
        } catch (error) {
            // no action requied
        }
        return succeeded
    })
    if (!filename) {
        throw new Error(`couldn't find config.service.js`)
    }
}



// The first configuration added is assumed to be the default, unless is_default is false.
// If is_default is true for a subsequent configuration, then that configuration becomes the new default.
export function addConfiguration(name: string, common: any, specific: any, is_default?: boolean): void {
    if (!DEFAULT_CONFIG || is_default) {
        DEFAULT_CONFIG = name
    }
    let config = deepExtend({}, common, specific)
    CONFIGURATIONS[name] = config
    CONFIG_SERVICE_JS_WITH_CONFIGURATIONS[name] = getConfigServiceJSForConfig(config)
}


function getConfigServiceJSForConfig(config: any) {
    let config_as_code = JSON.stringify(config)
    return `${config_service_js.start}${config_as_code}${config_service_js.end}`
}


// Get the name of the configuration from the current session, or select the default.
function getConfigurationName(req: ExpressRequest): string {
    let session: any = (<any>req).session
    if (session && session._user && session._user.browser_config_name) {
        let browser_config_name = session._user.browser_config_name
        if (CONFIGURATIONS[browser_config_name]) {
            return name
        }
    }
    return DEFAULT_CONFIG
}


// express handler that returns the configuration as JSON
export function handleRestRequest(req: ExpressRequest, res: ExpressResponse): void {
    let name = getConfigurationName(req)
    res.send(CONFIGURATIONS[name])
}


// express handler that returns the javascript for "config.service.js"
export function handleConfigServiceJS(req: ExpressRequest, res: ExpressResponse, user_config?: {}): void {
    let name = getConfigurationName(req)
    if (user_config) {
        let static_config = CONFIGURATIONS[name]
        let config = deepExtend({}, static_config, user_config)
        let config_service_js = getConfigServiceJSForConfig(config)
        res.send(config_service_js)
    } else {
        res.send(CONFIG_SERVICE_JS_WITH_CONFIGURATIONS[name])
    }
}


loadConfigService()
