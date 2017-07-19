/*
 * Copyright 2017 Adobe Systems Incorporated. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND,
 * either express or implied.  See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var request = require('request-promise');

var SERVICE_NAME="imageQuality";
var SERVICE_ENDPOINT = "here";

var DEFAULT_PARAMETERS = {
    
}

var REQUIRED_PARAMETERS = [
    "paramName1",
    "paramName2"
]

function setInvocationParameters( incomingParameters ) {
    //merge default paramters + incomingParameters
    //validate
    //throw error if something is missing or invalid
}

function sanitizeData(returnedData) {
    //do something in here so the data is not bad
    return { data: returnedData };
}

function returnError(error) {
    //put a correct error message so mark doesn't cry when trying to debug this for hours on end
    return { error: error };
}

function invokeService() {
    //invoke your service here
    
    return request({
		"method":'POST',
        "uri": "http://sensei-face-detection.gw.runtime-test.adobe.io/api/detect",
        "resolveWithFullResponse": true,
        "formData": {
            "image": {
                "value":request('https://as2.ftcdn.net/jpg/00/67/40/43/500_F_67404335_mubLgpFz9JH6MUxql49kgKsBAm4I4vSh.jpg'),
                "options": {
                    "filename": 'test.jpg',
                    "contentType": 'image/jpeg'
                }      
            }
        }
    });
}


var doWork = function (params) {
    
    setInvocationParameters(params);
    
    var returnPromise = new Promise(
        
        function(resolve,reject){
            invokeService().then(function(response) {
                //make data into common format here//
                console.log(response);
                var santizedData = sanitizeData(response);
                resolve( santizedData );
                
            }).catch(function(err){
                console.log(err);
                var returnedError = returnError(err);
                reject( returnedError );
            });
            
    });
    
    return returnPromise;
};
// data:{ whatever gets returned from the service here } //
exports.doWork = doWork;
