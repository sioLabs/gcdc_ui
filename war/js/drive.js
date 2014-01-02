

var doc = new jsPDF();
doc.setFontSize(12);
doc.text(20, 20, 'Dr. '+'Watson'+'('+'Dermatologist'+')');
doc.text(20,30,'Siolbas');
doc.text(20,40,'Shadra ,new Delhi'+', '+'New Delhi');
		doc.setLineWidth(1);
doc.line(20,45, 200,45);
doc.setLineWidth(0.3);
doc.line(20,47,200,47);
doc.text(20,55,'Patient name : '+'ola');
doc.text(20,65,'Patient age : '+'-1');
doc.text(20,75,'Patient sex : '+'Male');
doc.setLineWidth(1);
doc.line(20,80, 200, 80);
var medicines=["asjkld"];
var intake=["3"];
var num=["3"];
var tc=["Before Breakfast_After Breakfast"];
//var comments=check how this is saving.;
doc.setTextColor(100);
doc.text(20,90,'Medicine Name');
doc.text(80,90,'Intake Method');
doc.text(140,90,'Course Duration');
doc.setLineWidth(0.5);
doc.line(20,92,200,92);
doc.setTextColor(0);
var i=0,len=100;	
for(i=0;i<medicines.length;i++)
/*{
	doc.setFontSize(12);
	doc.text(20,len,medicines[i]);
	doc.text(80,len,intake[i]);
	doc.text(140,len,num[i]);
	time=tc[i].split('_');
	var j=0,x=20;
	len+=10;
	for(j=0;j<time.length;j++)
	{
		doc.setFontSize(8);
		doc.text(x,len,time[j]);
		x+=30;
	}
	len+=5;
	doc.setLineWidth(0.1);
	doc.line(20,len,200,len);
	len+=10;
}*/
doc.setFontSize(12);
doc.text(20,len,'check how this is saving.');
doc.line(20,250,50,250);
doc.text(20,255,"Signature");
var fileName = "test"+".pdf";
var data = doc.output();
var buffer = new ArrayBuffer(data.length);
var array = new Uint8Array(buffer);
for (var i = 0; i < data.length; i++) {
	array[i] = data.charCodeAt(i);
}

var blob = new Blob(
		[array],
		{type: 'application/pdf', encoding: 'raw'}
);

//saveAs(blob, fileName);
var CLIENT_ID = '296331844386-34pj6h3emkir85tt09ptip1ponfuqnso.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive';
var folderID="";



//
//function handleAuthResult(authResult) {
//	var authButton = document.getElementById('authorizeButton');
//	// var filePicker = document.getElementById('filePicker');
//	authButton.style.display = 'none';
//	// filePicker.style.display = 'none';
//	if (authResult && !authResult.error) {
//		// Access token has been successfully retrieved, requests can be sent to the API.
//		// filePicker.style.display = 'block';
//		document.getElementById("upload_to_drive").onclick = uploadFile;
//		document.getElementById("upload_folder").onclick = uploadFolder;
//		//filePicker.onchange = uploadFile;
//	} else {
//		// No access token could be retrieved, show the button to start the authorization flow.
//		authButton.style.display = 'block';
//		authButton.onclick = function() {
//			gapi.auth.authorize(
//					{'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
//					handleAuthResult);
//		};
//	}
//}

/**
 * Start the file upload.
 *
 * @param {Object} evt Arguments from the file selector.
 */

function uploadFile() {
	gapi.client.load('drive', 'v2', function() {
		console.log("file insert");
//		var blob = new Blob(["Hello world!"], { type: "text/plain" });
		//blob.setName("PRESY");			
		//	insertFile(blob).done(getFolderID);
		getFolderID();
		insertFile(blob);
		setTimeout(function() {
			$bar.addClass('animate');
		}, 1700);
		setTimeout(function() {
			alert("FileUploaded! Please click home button to go back.");
		},17000);
	});
}


function getFolderID() {
	// Get Folder ID
	var flag=-1;

	var request = gapi.client.drive.files.list();	
	console.log("YO");      	  
	request.execute(function(resp) { 

		for (i=0; i<resp.items.length; i++) {
			var title = resp.items[i].title;
			var id = resp.items[i].id;			


			foldercheck=title;
			//     var fileInfo = document.createElement('li');
			//      fileInfo.appendChild(document.createTextNode( 'TITLE: ' + title  + 'ID:' + id ));                
			//        document.getElementById('content').appendChild(fileInfo);
			if (title=="ThisIsTheEnd")
			{

				folderID=id;
				flag=1;		
				break;

			}			
		}


	}); 

};

/*
 * Ashutosh Singh :  Code to create a folder in Google Drive.
 */
function uploadFolder() {
	
	//console.log('creating folder now');
		gapi.client.load('drive', 'v2', function() {
		
		var request = gapi.client.request({
			'path' : '/drive/v2/files',
			 'method' : 'POST',
			 'headers': {
		           'Content-Type': 'application/json'		                  
		       },
			 'body' : {
				 'title' : 'ThisIsTheEnd',
				 'mimeType' : 'application/vnd.google-apps.folder'
			 }
		}); 
		
		request.execute(function(resp){
			//console.log(resp);
			//console.log('folder created');
		});
	
	});
}
/**
 * Insert new file.
 *
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Function to call when the request is complete.
 */

function insertFile(fileData, callback) {

	const boundary = '-------314159265358979323846';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";
	var presName="";
	var reader = new FileReader();
	reader.readAsBinaryString(fileData);
	reader.onload = setTimeout(function(e) {
		var contentType = fileData.type || 'application/octet-stream';
//		setTimeout(function(){alert("Hello")},10000);          
		var metadata = {
				'title': fileName ,
				'mimeType': contentType,
				"parents": [{
					"kind": "drive#file",
					"id": folderID
				}]
		};

		var base64Data = btoa(reader.result);
		var multipartRequestBody =
			delimiter +
			'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter +
			'Content-Type: ' + contentType + '\r\n' +
			'Content-Transfer-Encoding: base64\r\n' +
			'\r\n' +
			base64Data +
			close_delim;

		request = gapi.client.request({
			'path': '/upload/drive/v2/files',
			'method': 'POST',
			'params': {'uploadType': 'multipart'},

			'headers': {
				'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
			},
			'body': multipartRequestBody});
		if (!callback) {
			callback = function(file) {
				console.log(file)
			};
		}
		request.execute(callback);
		alert("FileUploaded! Please click home button to go back.Please Wait for sometime to upload!");
	},15000);
}

///////////////////////my code


var apiKey = 'AIzaSyB58_n-hiIRJ1FizLyqU810ihWjY0Sku1Q';

var data = [];





$(document).ready(function(){
	

	function handleClientLoad() {
		gapi.client.setApiKey(apiKey);
		window.setTimeout(checkAuth,1);
		//checkAuth();
	}
	
	function checkAuth() {
		gapi.auth.authorize({client_id: clientId, scope: SCOPES, immediate: true},
				handleAuthResult);
	}

	function handleAuthResult(authResult) {
		//var authorizeButton = document.getElementById('driveBtn');
		if (authResult) {
			//authorizeButton.style.visibility = 'hidden';
			makeApiCall();
		} else {
			//authorizeButton.style.visibility = '';
			//authorizeButton.onclick = handleAuthClick;
			handleAuthClick();
		}
	}

	function handleAuthClick(event) {
		gapi.auth.authorize(
				{client_id: clientId, scope: SCOPES, immediate: false},
				handleAuthResult);
		return false;
	}



	function makeApiCall() {
		console.log('yoyo honey singh');
		uploadFolder();
		uploadFile();
	}
	
	function uploadFolder() {
		
		console.log('creating folder now');
			gapi.client.load('drive', 'v2', function() {
			
			var request = gapi.client.request({
				'path' : '/drive/v2/files',
				 'method' : 'POST',
				 'headers': {
			           'Content-Type': 'application/json'		                  
			       },
				 'body' : {
					 'title' : 'ThisIsTheEnd',
					 'mimeType' : 'application/vnd.google-apps.folder'
				 }
			}); 
			
			request.execute(function(resp){
				console.log(resp);
				console.log('folder created');
			});
		
		});
	}

	$('#driveBtn').click(function(){
		handleClientLoad();
		//handleAuthClick();
	});

});

