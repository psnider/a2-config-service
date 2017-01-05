"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
// All errors returned are strings suitable for display to the user.
let ConfigurationService = class ConfigurationService {
    constructor(http) {
        this.http = http;
        // must use a constant until we get the configuration!
        this.CONFIG_API_URL = '/api/browser-config';
    }
    getConfiguration(field_key) {
        if (this.CONFIG) {
            return this._getConfiguration(field_key);
        }
        else {
            return this.fetchConfig().then(() => {
                return this._getConfiguration(field_key);
            });
        }
    }
    _getConfiguration(field_key) {
        return new Promise((resolve, reject) => {
            let fields = field_key.split(':');
            let obj = this.CONFIG;
            fields.forEach((field) => {
                if (obj) {
                    obj = obj[field];
                }
            });
            if (obj) {
                console.log(`_getConfiguration resolve=${obj}`);
                resolve(obj);
            }
            else {
                console.log(`_getConfiguration reject`);
                reject(undefined);
            }
        });
    }
    fetchConfig() {
        return this.http.get(this.CONFIG_API_URL)
            .map((res) => {
            let body = res.json();
            console.log(`extractData body=${JSON.stringify(body)}`);
            this.CONFIG = body || {};
        })
            .toPromise()
            .catch(this.handleError);
    }
    handleError(error) {
        console.log(`ConfigurationService error=${error}`);
        return Promise.reject(error);
    }
};
ConfigurationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=config.service.js.map