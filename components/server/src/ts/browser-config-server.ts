import fs = require('fs')
import body_parser = require('body-parser')
import express = require('express')
import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'
import {Express} from 'express-serve-static-core'
import HTTP_STATUS_CODES = require('http-status-codes')

import {get as getConfig} from '@sabbatical/configure-local'

import {addConfiguration as addBrowserConfiguration, handleRestRequest as handleBrowserConfigRestRequest, handleConfigServiceJS} from './browser-config-service'
import {common} from '../../../../config/browser-common'
import {alpha} from '../../../../config/browser-alpha'
import {beta} from '../../../../config/browser-beta'


const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
const version = require(`${process.cwd()}/package.json`).version


function shutdown(reason: string | Error) {
    let fname = 'shutdown'
    var succeeded = true
    if (typeof reason !== 'string') {
        succeeded = false
        console.log(`shutting down: reason=${JSON.stringify(reason)}`)
    } else {
        console.log(`shutting down: reason=${reason}`)
    }
    console.log('======== CLEANING UP SERVER ========')
    // handle the error safely
    console.log('======== EXITING ========')
    process.exit(succeeded ? 0 : 1)
}


process.on('uncaughtException', shutdown)
process.on('SIGINT', () => {
    shutdown('Received SIGINT')
})
process.on('SIGTERM', () => {
    shutdown('Received SIGTERM')
})


console.log(`version=${version}`)


const NODE_MODULES_PREFIX_LEN = '/node_modules/'.length
const ALLOWED_MODULES = [
    'core-js/client/shim.min.js', 
    'zone.js/dist/zone.js',
    'reflect-metadata/Reflect.js',
    'systemjs/dist/system.src.js',
]

function handle_node_modules(req: express.Request, res: express.Response) {
    const filename = req.originalUrl.slice(NODE_MODULES_PREFIX_LEN)
    res.sendFile(filename, {root: 'node_modules'})
}


function init() {
    // The first configuration is the default, unless the is_default parameter is set
    addBrowserConfiguration('beta', common, beta)
    addBrowserConfiguration('alpha', common, alpha)

    var app = express()
    app.get('/', function (req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
        res.sendFile(process.cwd() + '/generated/browser/browser/config/html/config.html')
    })
    app.get('/node_modules/*', handle_node_modules)
    app.get('/configwebapp/config.service.js', handleConfigServiceJS)
    app.use('/configwebapp', express.static(process.cwd() + '/generated/browser'))
    app.get('/api/browser-config', handleBrowserConfigRestRequest)

    const api_port = getConfig('api_port')
    console.log(`listening on port=${api_port}`)
    app.listen(api_port)
}


init()

