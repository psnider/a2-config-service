import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'




export function addConfiguration(name: string, common: any, specific: any, is_default?: boolean): void

// this is mostly for test
// web applications must use handleConfigServiceJS
export function handleRestRequest(req: ExpressRequest, res: ExpressResponse): void

// the express handler that serves the javascript for "config.service.js"
// If user_config is specified, it extends the base configuration
export function handleConfigServiceJS(req: ExpressRequest, res: ExpressResponse, user_config?: {}): void

