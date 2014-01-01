<!doctype html>
<html  lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foundation | Welcome</title>
    <link rel="stylesheet" href="css/foundation.css" />
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">    
    <link rel="stylesheet" href="css/foundation-datepicker.css" date-date-format="dd-mm-yyyy" />
    <script src="js/modernizr.js"></script>
  </head>
  <body>
  <div class="fixed">
  <nav class="top-bar" data-topbar>
  <ul class="title-area">
    <li class="name">
      <h1><a href="/index.html">Vaccinate</a></h1>
    </li>
    
  </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li class="active"><a href="#">Hello</a></li>
      <li><a href="#aboutus">Who are we?</a></li>
      
      <li class="has-dropdown">
        <a href="#">Vaccinate</a>
        <ul class="dropdown">
          <li><a href="scheduler.jsp">Scheduler</a></li>
          <li><a href="locator.html">Locator</a></li>
          <li><a href="consult.html">Consultation</a></li>
          
        </ul>
      </li>
    </ul>

    <!-- Left Nav Section -->
    
  </section>
</nav>
</div>

<!-- content of scheduler -->

<div class="row">
	<div class="large-12 columns">
		<h3>Get the <strong>Personalized</strong> schedule of vaccination for your child</h3>
		<h4><strong>Save</strong> it. <strong>Download</strong> it. Add it your calendar in one Click</h4>
	</div>
	
	<hr />
	<div class="large-12 columns">
		<div class="large-2 columns">
			<input type="text" placeholder="Child's Name" id="childName"/>
		</div>
		<div class="large-2 columns ">
		<input type="text" placeholder="Date of Birth" id="datepicker"/>
		</div>
		<div class="large-2 columns">
		<a href="#" class="button radius tiny" id="generate">View Schedule</a>
		</div>	
		
		<div class="large-6 columns push-1">
			<a href="#" class="button tiny" id="pdf">Download</a>
			<a href="#" class="button tiny" id="drive">Add to Google Drive</a>
			<a href="#" class="button tiny">Add to Calendar</a>
		</div>
		
	</div>
	
	<hr/>
	
	<div class="large-12 columns" id="chart">
	
	
	</div>
	
	
	
	
	
	
</div>

<!-- content ends -->





  <!-- Footer -->
  
  <footer class="row">
    <div class="large-12 columns">
      <hr />
      <div class="row">
        <div class="large-6 columns">
          <p>© Copyright no one at all. Go to town.</p>
        </div>
        <div class="large-6 columns">
          <ul class="inline-list right">
            <li><a href="index.html#aboutus">About Vaccinate</a></li>
            <li><a href="index.html#feedback">Feedback</a></li>
            <li><a href="faqs.html">FAQs</a></li>
            <li><a href="volunteer.html">Volunteer</a></li>
          </ul>
        </div>
      </div>
    </div> 
  </footer>




   
    
        
    <script src="js/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script src="js/foundation.topbar.js"></script>
    <script src="js/foundation-datepicker.js"></script>
    <script src="js/gcal.js"></script>
    <script src="js/date.js"></script>
    <script src="js/jspdf.min.js"></script>
    <script src="js/jspdf.plugin.from_html.js"></script>
    <script src="js/jspdf.plugin.cell.js"></script>
    <!-- <script src="js/foundation.orbit.js"></script> -->
    
    <script>
    	$(document).foundation();
    	
    	function tableToJson(table) { 
    		var data = []; // first row needs to be headers var headers = [];
    		var headers=[];
    		for (var i=0; i<table.rows[0].cells.length; i++) {
    		 headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,''); 
    		} 
    		// go through cells 
    		for (var i=1; i<table.rows.length; i++) { 
    		var tableRow = table.rows[i]; var rowData = {}; 
    		for (var j=0; j<tableRow.cells.length; j++) { 
    			var dat1 = tableRow.cells[j].innerHTML.replace(/<strong>/gi,'');
    			var dat2 = dat1.replace(/<\/strong>/gi,'');
    			rowData[ headers[j] ] = dat2 
    		} data.push(rowData); 
    		} 
    		return data; 
    		}
    	
      function showTable(schedule){
    	  var startContent = "<div class='large-3 columns'><strong> Child Name: </div><div class='large-3 columns pull-1' style='text-transform:uppercase'>"+ $('#childName').val() + "</strong> </div> <div class='large-3 columns'> <strong>Date of Birth : </div><div class='large-3 columns pull-1'>" + $('#datepicker').val() + "</strong></div> <br/> <hr />"; 
    	  
    	  var tableContent =  startContent+ "<table id='schtable'> <thead> <tr> <th> Age </th> <th width =\"100\"> Due Date </th> <th width=\"170\"> Vaccine </th> <th> Comments </th> </tr> </thead> <tbody> ";
    	  
    	  for(var i = 0 ; i <schedule.length ; i++){
    		  tableContent += "<tr> <td>"
    		  tableContent += schedule[i].age + "</td><td>";
    		  tableContent += schedule[i].date + "</td><td>";
    		  
    		  for(var j = 1 ; j<= schedule[i].vaccination.length ; j++){
    			  tableContent += "<strong>"+ j +". "+ schedule[i].vaccination[j-1]+"</strong> <br/>"
    		  }    		  
    		  
    		  tableContent += "</td><td>";
    		  tableContent += schedule[i].comments;    		  
    		  tableContent += "</td></tr>"
    		  
    	  }    	  
    	  tableContent += "</tbody> </table>";
    	  
    	  $('#chart').html(tableContent);
    	  
      }
    
      
      $('#datepicker').click(function(){
    	 $('#datepicker').fdatepicker({
    		 format:'mm-dd-yyyy'
    	 }); 
      });
      //code for the generate function click
      $('#generate').click(function(){
    	  var dob = $('#datepicker').val();
    	  var schedule = getPersonalVaccinationSchedule(dob);
    	  showTable(schedule);
    	  
      });
      
      $('#pdf').click(function(){
    	  
    	  var doc=new jsPDF();
    	  var specialElementHandlers = {
    		        '#editor': function (element, renderer) {
    		            return true;
    		        }
    		    };
    	  doc.fromHTML($('#chart').get(0), 15, 15, {
              'width': 170,
                  'elementHandlers': specialElementHandlers
          });
    	  var name = $('#childname').val() + '.pdf';
          doc.save(name);
    	  
      });
      
      $('#drive').click(function(){
    	  var table = tableToJson($('#schtable').get(0))
    	  var doc = new jsPDF('p', 'pt', 'a4', true);
    	  doc.setFontSize(12);
    	  doc.cellInitialize();
    	  
    	  
    	  doc.table(table, {}, true, true, true);
    	  
    	   $.each(table, function (i, row){
    		  var count = 0;
    	    $.each(row, function (j, cell){
    	    	 if(count == 2)
    	    	{	doc.cell(10,200,300,50,cell,i); 
    	    		
    	    	}
    	    	else 
    	          doc.cell(10, 200,100, 50, cell, i);
    	    	
    	    	count = count+1;
    	    })
    	  })
    	  doc.save() ;
    	  
      });
    	 
    </script>
  </body>
</html>
 