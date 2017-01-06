import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'




export function addConfiguration(name: string, common: any, specific: any, is_default?: boolean): void

// this is mostly for test
// web applications
export function handleRestRequest(req: ExpressRequest, res: ExpressResponse): void

export function handleConfigServiceJS(req: ExpressRequest, res: ExpressResponse): void {

