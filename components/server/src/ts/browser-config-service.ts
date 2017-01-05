import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'
import deepExtend = require('deep-extend')
import HHTP_STATUS_CODES = require('http-status-codes')




var CONFIGURATIONS: any = {}



export function addConfiguration(name: string, common: any, specific: any): void {
    CONFIGURATIONS[name] = deepExtend({}, common, specific)
}


// Always return the entire browser config
export function handleRestRequest(req: ExpressRequest, res: ExpressResponse): void {
    let fname = 'browser-config-service.handleRestRequest'
    // TODO: look up user's configuration 
    // for now just use only configuration
    let keys = Object.keys(CONFIGURATIONS)
    if (keys.length === 1) {
        res.send(CONFIGURATIONS[keys[0]])
    } else {
        res.sendStatus(HHTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}


