import { Injectable }        from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';


// All errors returned are strings suitable for display to the user.

@Injectable()
export class ConfigurationService {

    // must use a constant until we get the configuration!
    CONFIG_API_URL = '/api/browser-config'
    CONFIG: any


    constructor(private http: Http) { }


    getConfiguration(field_key: string): Promise<any> {
        if (this.CONFIG) {
            return this._getConfiguration(field_key)
        } else {
            return this.fetchConfig().then(() => {
                return this._getConfiguration(field_key)
            })
        }
    }


    private _getConfiguration(field_key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let fields = field_key.split(':')
            let obj = this.CONFIG
            fields.forEach((field) => {
                if (obj) {
                    obj = obj[field]
                }
            })
            if (obj) {
        console.log(`_getConfiguration resolve=${obj}`)
                resolve(obj)
            } else {
        console.log(`_getConfiguration reject`)
                reject(undefined)
            }
        })
    }


    fetchConfig(): Promise<any> {
        return this.http.get(this.CONFIG_API_URL)
                        .map((res: Response) => {
                            let body = res.json();
                            console.log(`extractData body=${JSON.stringify(body)}`)
                            this.CONFIG = body || {}
                        })
                        .toPromise()
                        .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.log(`ConfigurationService error=${error}`)
        return Promise.reject(error)
    }
    
}

