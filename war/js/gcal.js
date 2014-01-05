

var clientId = '296331844386-34pj6h3emkir85tt09ptip1ponfuqnso.apps.googleusercontent.com';
var apiKey = 'AIzaSyB58_n-hiIRJ1FizLyqU810ihWjY0Sku1Q';
var scopes = 'https://www.googleapis.com/auth/calendar';
var data = [];

function handleClientLoad() {
	  gapi.client.setApiKey(apiKey);
	  window.setTimeout(checkAuth,1);
	  checkAuth();
	}

	function checkAuth() {
	  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
	      handleAuthResult);
	}

	function handleAuthResult(authResult) {
	  //var authorizeButton = document.getElementById('authorize-button');
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
	      {client_id: clientId, scope: scopes, immediate: false},
	      handleAuthResult);
	  return false;
	}
	

	
	function makeApiCall() {
		  
	    gapi.client.load('calendar', 'v3', function() {
		    //insert into my calendar
//		    
	    	
	    	for (var i = 0;i<data.length;i++){
	    		var resource = getEventObject(data[i]);
	    		var request = gapi.client.calendar.events.insert({
			    	  'calendarId': 'primary',
			    	  'resource': resource
			    	});
			    
			    request.execute(function(resp){
			    	console.log(resp);
			    });
	    		
	    	}
	    	
		    
	    });
	}
	
		    
	
	
	function getEventObject(data1){
		
		//console.log(data1);
		
		var summary = "Vaccinate your child with : " 
			for(var i = 0 ;i <data1.vaccination.length; i++){
				summary += data1.vaccination[i] + ", ";
			}
		var resource = {
				"summary" : summary,
				"start" : {
					"date" : data1.date
				},
				"end" :{
					"date" : data1.date
				}
		
		};
		
		return resource;
		
	}
	
	
	
	function getVaccinationSchedule(dob){
		
		//alert('date is'+dob);

		data = [
		            {
		              "date":Date.parse(dob).addDays(1).toString("yyyy-MM-dd"),
		              "vaccination" : ["BCG - Injection", "Hep B-1"]    		            	
		            },
		        {
		           	 "date" :Date.parse(dob).addDays(41).toString("yyyy-MM-dd"),
		           	 "vaccination" : ["DTP 1", "IPV -1","Hep-B 2","Hib 1","Rotavirus 1", "PCV 1" ] 
		            },
		         {
   		           	 "date" :Date.parse(dob).addDays(69).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["DTP -2 ", "IPV -2", "Hib 2", "Rotavirus 2", "PCV 2"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(97).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["DTP -3", "IPV -3", "Hib 3", "Rotavirus 3", "PCV 3"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(181).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["OPV 1", "Hep-B 3"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(272).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["OPV 2", "Measles"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(364).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["Hep-A 1"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(455).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["MMR 1", "Varicella 1", "PCV booster"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(486).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["DTP B!", "IPT B1", "Hib B1"] 
   		            },
   		         {
   		           	 "date" :Date.parse(dob).addDays(547).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["Hep-A 2"] 
   		            },
   		            
   		         {
   		           	 "date" :Date.parse(dob).addDays(729).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["Typhoid 1"] 
   		            },
   		            
   		         {
   		           	 "date" :Date.parse(dob).addDays(1642).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["DTP B2", "OPV 3", "MMR 2", "Varicella 2", "Typhoid 2"] 
   		            },
   		            
   		         {
   		           	 "date" :Date.parse(dob).addDays(3651).toString("yyyy-MM-dd"),
   		           	 "vaccination" : ["TDAP", "HPV"] 
   		            },
		            
		            ];
				
		
		return data;
	}
	
	
function getPersonalVaccinationSchedule(dob){
		
		//alert('date is'+dob);

		var data = [
		            {
		              "age" : "<strong>Birth</strong>",
		              "date":Date.parse(dob).addDays(1).toString("dd-MM-yyyy"),
		              "vaccination" : ["BCG - Injection", "Hep B-1"],
		              "comments" : ""
		            },
		        {
		            	"age" : "<strong>6 Weeks</strong>",
		           	 "date" :Date.parse(dob).addDays(41).toString("dd-MM-yyyy"),
		           	 "vaccination" : ["DTP 1", "IPV -1","Hep-B 2","Hib 1","Rotavirus 1", "PCV 1" ],
		             "comments" : " <strong>Polio :</strong> Use IPV. But may be replaced with OPV if former is unaffordable/unavailable<br /> <strong>Rotavirus :</strong> 2 doses of RV-1 and 3 doses of RV-5"
		            },
		         {
		            	"age" : "<strong>10 Weeks</strong>",
   		           	 "date" :Date.parse(dob).addDays(69).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["DTP -2 ", "IPV -2", "Hib 2", "Rotavirus 2", "PCV 2"],
   		          "comments" : ""
		            
   		            },
   		         {
   		            	"age" : "<strong>14 Weeks</strong>",
   		           	 "date" :Date.parse(dob).addDays(97).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["DTP -3", "IPV -3", "Hib 3", "Rotavirus 3", "PCV 3"],
   		          "comments" : "<strong>Rotavirus :</strong> Only 2 doses of RV1 are recommended at present."
   		            },
   		         {
   		            	"age" : "<strong>6 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(181).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["OPV 1", "Hep-B 3"],
   		          "comments" : "<strong>Hepatitis-B :</strong> The final (third or fourth) dose in the HepB vaccine series should be administered no earlier than age 24 weeks and at least 16 weeks after the first dose."
   		            },
   		         {
   		            	"age" : "<strong>9 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(272).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["OPV 2", "Measles"],
   		          "comments" : ""
   		            },
   		         {
   		            	"age" : "<strong>12 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(364).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["Hep-A 1"],
   		          "comments" : "<strong>Hepatitis A :</strong> For both killed and live hepatitis-A vaccines, 2 doses are recommended"
   		            },
   		         {
   		            	"age" : "<strong>15 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(455).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["MMR 1", "Varicella 1", "PCV booster"],
   		          "comments" : "<strong>Varicella :</strong> The risk of breakthrough varicella is lower if given 15 months onwards."
   		            },
   		         {
   		            	"age" : "<strong>16-18 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(486).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["DTP B!", "IPT B1", "Hib B1"],
   		          "comments" : "The first booster (4th dose) may be administered as early as age 12 months, provided at least 6 months have elapsed since the third dose."
   		            },
   		         {
   		            	"age" : "<strong>18 Months</strong>",
   		           	 "date" :Date.parse(dob).addDays(547).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["Hep-A 2"],
   		          "comments" : "<strong>Hepatitis A :</strong> For both killed and live hepatitis-A vaccines 2 doses are recommended"
   		            },
   		            
   		         {
   		            	"age" : "<strong>2 Years</strong>",
   		           	 "date" :Date.parse(dob).addDays(729).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["Typhoid 1"],
   		          "comments" : "<strong>Typhoid :</strong> Typhoid revaccination every 3 years, if Vi-polysaccharide vaccine is used."
   		            },
   		            
   		         {
   		            	"age" : "<strong>4.5 - 5 Years</strong>",
   		           	 "date" :Date.parse(dob).addDays(1642).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["DTP B2", "OPV 3", "MMR 2", "Varicella 2", "Typhoid 2"],
   		          "comments" : "<strong>MMR :</strong> the 2nd dose can be given at anytime 4-8 weeks after the 1st dose. <br /><strong>Varicella :</strong> the 2nd dose can be given at anytime 3 months after the 1st dose."
   		            },
   		            
   		         {
   		            	"age" : "<strong>10-12 Years</strong>",
   		           	 "date" :Date.parse(dob).addDays(3651).toString("dd-MM-yyyy"),
   		           	 "vaccination" : ["TDAP", "HPV"],
   		          "comments" : "<strong>Tdap :</strong> is preferred to Td followed by Td every 10 years.<br/> <strong>HPV :</strong> Only for females, 3 doses at 0, 1-2 (depending on brands) and 6 months."
   		            },
		            
		            ];
				
		
		return data;
	}
	
	
	
$(document).ready(function () {	
		  //	
	$('#calBtn').click(function(){
	
		var dob = $('#dob').val();
		  data = getVaccinationSchedule(dob);
	      handleClientLoad();
	      //handleAuthClick();
		
		return;
	});
	
	//
	});