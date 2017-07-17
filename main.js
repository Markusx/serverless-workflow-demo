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

var request = require('request-promise');
var api_key = "74c110893e934f30a95adb79046260c9"

var ACTION_LOAD = "load";
var ACTION_VALIDATE = "validate";
var ACTION_SUBMIT =  "submit";
var ACTION_ENCRYPT = "encrypt";

function loadDialog() {
    
    return {
        "type":"dialog",
        "properties":{
            "headerText":"Post to Microsoft Teams",
            "bodyText":"",
            "buttonOkayText":"SUBMIT"
        },

        "children": [   
            {
                "type":"textarea",
                "properties":{
                    "label":"Message",
                    "text":"Message",
                    "placeholder":"check out this cool design in Creative Cloud",
                    "propertyName":"message"
                }
            }
        ]
    
    }
}


function validate() {
    
    return {
        "success":true,
        "valid":true
    }
}


function submit(params) {
    
    var secret = params.api_secret;
    var decToken = decrypt(secretToken, secret);
	var assetName = params.additionalData.name;
    return getMetadata(assetName,decToken);
    
}

function getMetadata(assetName, token) { 
    
	return request({
		"method":"GET", 
		"uri": "https://cc-api-storage.adobe.io/files/" + assetName + "/:metadata", 
		"headers": {"x-api-key": api_key, "Authorization":"Bearer "+token, "metadata":":metadata", "Accept": "application/vnd.adobe.file+json" }
        }).then(function(body) {
			return {body:body};
		});
}


var main = function (params) {

    var action = params.action;
    //var secret = params.api_secret;
    
    return request({
		"method":"POST", 
		"uri": "http://sensei-autocrop.gw.runtime-test.adobe.io/", 
		"headers": { numSuggestions:5,
                    perAspectRatio:true,
                    aspectRatios:'64/27,16/9', cropRectScaleRatios:'0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0', 
                   useFaceDetect:true,
                   sortType:'all',
                   image_path:'/app/autocrop-service/public/uploads/U-9fnqhS9WfiU_cUrtqsXCu3.jpeg'}
        }).then(function(response) {
			return {response:response};
		});
    
    
    if ( !action || action =='' ) {
        return {"error":"Missing action parameter"};
    }
	
//    if ( !secret || secret =='' ) {
//        return {"error":"Missing api_secret parameter"};
//    }
//    
		
    
    switch ( action ) {
            
        case ACTION_LOAD:
            return loadDialog(params);
        break;
            
        case ACTION_VALIDATE:
            return validate(params);
        break;
            
        case ACTION_SUBMIT:
            return submit(params);
        break;
  
        case ACTION_ENCRYPT:
            return keyEncrypt(params);
        break;
            
        default:
            return {"error":"No matching action found"};
        break;
    }
};