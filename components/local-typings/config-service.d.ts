import {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from 'express'




export function addConfiguration(name: string, common: any, specific: any): void

// Always return the entire browser config
export function handleRestRequest(req: ExpressRequest, res: ExpressResponse): void

