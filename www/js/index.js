/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		cargaLista();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

		function cargaLista() {
			console.log('Dispositivo Listo');
			
		}

		function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
			//$.archivo = imageURI;
            ft.upload(imageURI, encodeURI("http://WWW.TUSERVIDOR.COM/uploadImages.php"), win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
			
			
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

		function cargaArchivo() {
			navigator.camera.getPicture(
				cameraSuccess,
				function(message) { alert('get picture failed'); },
				{
					quality         : 50,
					destinationType : navigator.camera.DestinationType.FILE_URI,
					sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
				}
			);
		}
		function capturePhoto() {
			navigator.camera.getPicture(
				cameraSuccess, 
				fail, 
				{ 
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					targetWidth: 400,
					targetHeight: 400
				}
			);
		}
		function cameraSuccess(imageURI) {
			alert(imageURI);
			var image = document.getElementById('fotoUser');
    		image.src = imageURI;
			uploadPhoto(imageURI);
		}

$(document).ready(function(e) {
    $('#cargaArchivo').click(function(){
		cargaArchivo();
	});
	$('#tomarFoto').click(function(){
		capturePhoto();
	});
});
