"use strict";
const deepExtend = require("deep-extend");
const HHTP_STATUS_CODES = require("http-status-codes");
var CONFIGURATIONS = {};
function addConfiguration(name, common, specific) {
    CONFIGURATIONS[name] = deepExtend({}, common, specific);
}
exports.addConfiguration = addConfiguration;
// Always return the entire browser config
function handleRestRequest(req, res) {
    let fname = 'browser-config-service.handleRestRequest';
    // TODO: look up user's configuration 
    // for now just use only configuration
    let keys = Object.keys(CONFIGURATIONS);
    if (keys.length === 1) {
        res.send(CONFIGURATIONS[keys[0]]);
    }
    else {
        res.sendStatus(HHTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}
exports.handleRestRequest = handleRestRequest;
