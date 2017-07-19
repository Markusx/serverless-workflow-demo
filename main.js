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
//includes
var request = require('request-promise');


//constants
var API_KEY = "74c110893e934f30a95adb79046260c9";

var REQUEST_BIN_URL ="https://requestb.in/1htvcv71";


var SENSEI_SERVICE_IMAGE_QUALITY="imageQuality";
var SENSEI_SERVICE_AUTO_CROP="autoCrop";
var SENSEI_SERVICE_COLOUR_SWATCH="colourSwatch";
var SENSEI_SERVICE_SMART_TAGGING="smartTagging";

var SENSEI_SERVICE_ENDPOINTS = {
    "imageQuality":"image quality endpoint here",
    "autoCrop":"image crop endpoint here",
    "colourSwatch":"image colour swatch",
    "smartTagging":"image smart tagging"
}


//end of constants





//helper functions ///

function getEndpoint(serviceName){
    return SENSEI_SERVICE_ENDPOINTS[serviceName];
}

function createActionChain(actionsArray) {
    
    if ( !actionsArray || actionsArray.length == 0) {
       returnError("Actions Array is empty");
    }
}

function returnError(errorString){
    return {"error":"Returned with the following error" + errorString };
}

function logData(postData) {
  var options = {
    method: 'post',
    body: postData,
    json: true,
    url: REQUEST_BIN_URL
  }
  
  request(options);
    
}


//end of helper functions 

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

    var actions = params.actions;
    
    
    if ( !actions ) {
        return returnError("actions array is empty or missing");
    }
    
    
    //var secret = params.api_secret;
	
	if ( params.challenge ) {
		return {"challenge":params.challenge};	
	}
	
	logData(params);	
	
   
	/*
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
        }).then(function(response) {
			return response;
		}).catch(function(err){
            return {error:err};
        });
	*/
	
//    
//    
//    return request({
//		"method":'POST',
//        "uri": "http://sensei-autocrop.gw.runtime-test.adobe.io/api/autocrop",
//        "resolveWithFullResponse": true,
//        "formData": {
//                    numSuggestions:'5',
//                    perAspectRatio:'true',
//                    aspectRatios:'64/27,16/9', cropRectScaleRatios:'0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0', 
//                   useFaceDetect:'true',
//                   sortType:'all',
//                   image_path:'/app/autocrop-service/public/uploads/t-x8ULUFVWtTWjbcHjO017P0.jpeg'
//            }
//        }).then(function(response) {
//			return response;
//		}).catch(function(err){
//            return {error:err};
//        })
//    
//    
    
    if ( !action || action =='' ) {
        return {"error":"Missing action parameter"};
    }
	
};