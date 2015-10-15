<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="content-type">
	<link href="assets/css/multi-select.css" media="screen" rel="stylesheet" type="text/css">
</head>
<body>
<div id='main'>

    <h2>Map Content Management</h2>
    <p>Welcome {{current_user.username}}</p>	
    <div>
 <!--    <p><b>Image Upload Content:</b></p>
	  
      <form action="img_upload" method="post" enctype="multipart/form-data">
          <p><input type="file" name="popup"></p>
          <button type="submit" value="Start upload" > OK </button>
      </form>
	  <div id='upload_status'><p>Ready.</p></div>
    <br />
-->
    </div>
    <div>
      <p><b>Add Content To Map:</b></p>
  
      	<form action="scrape" method="post" enctype="multipart/form-data">
  		<p><label>Active Disaster</label> <input type="checkbox" name="active" value="active" id="active"></p>
  		<p><label>Disaster Type</label><input id="type_country" class="type" type="radio" name="type" value="country" >Country
		<input type="radio" class="type" name="type"id="type_regional" value="regional">Regional</p>
			

				
	  	<select id="country-select" name="country" >
	  	%for x in check:
		  <option value={{x}}>{{check[x][0].title()}}</option>
	  	%end
		  <option value="FLA">Florida</option>
	  	</select>
	  	<select id="regional-select" name="regional-countries" multiple="multiple" >
	  	%for x in check:
		  <option value={{x}}>{{check[x][0].title()}}</option>
	  	%end
	  	</select>
		<select id="regional_disasters" name="regional_disaster" style="display: none;"> 
		%for c in jsons: 
			%if jsons[c]["cat"] == "regional":
			<option value={{c}}>{{ jsons[c]["fullname"] }}</option>
			%end
		%end
		</select>
		  
		 <p class="regional-context" ><label>Regional Disaster Name</label> <input type="text" name="regional_name" id="fullname" /></p>
		 <p class="regional-context" ><label>Regional Disaster ID</label> <input type="text" name="regional_id" maxlength="4" /></p>

         <p><label>Story URL</label> <input type="url"  class="context" name="Story"/><span class="context" id="Story"  style="display: none;"> </span> </p>
         <p><label>Video URL</label> <input type="url"  class="context" name="Video" /></p> 
		 <p><label>Video Title</label> <input type="text"  class="context" name="video_title" /><span class="context" id="Video"  style="display: none;"> </span></p>         
		 <p><label>Pop-up Image</label><input type="file" name="popup"></p>
		 <p><label>Photo Gallery Title</label> <input type="text"  class="context" name="gallery-name" /></p> 
		 <p><label>Photo Gallery</label><input type="file" name="gallery"><span class="context" id="Gallery"  style="display: none;"> </span></p>
		 <p><label>Infographic Title</label> <input type="text"  class="context" name="graphic-name" /></p> 
		 <p><label>Infographic</label><input type="file" name="graphic"><span class="context" id="Graphic"  style="display: none;"> </span></p><button type='button' id='clear-uploads' >Clear Upload Inputs</button>
         <p><label>Pop-up Summary</label> <textarea  rows="10" cols="50" class="context" name="tagline" id="tagline" /></textarea></p>
          <button type="submit" > OK </button>
      </form>
	  <div id='scrape_status'><p>Ready.</p></div>
    <br />

    </div>
    <div>
      <p><b>Delete Content From Map:</b></p>
      <form action="delete_content" id="delete_content" method="post">
			<input type="text" id="hidden" name="hidden" style="display: none;"></div>
			<div>{{jsonJS}} </div>
         	%for c in jsons:
	      	<p><input type="checkbox" id={{c}} class="countryDelete"> <b>{{ jsons[c]["fullname"].upper() }}</b></p>
				%if len(jsons[c]["Story"]) > 0: 
					<p><span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Stories</b></span>
	 	    		%for x in jsons[c]["Story"]:
	        		<p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id={{x}} name={{x}} class={{c}}>  {{x}} </p>
					%end
		    	%end
				%if len(jsons[c]["Gallery"]) > 0: 
					<p><span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Photo Galleries</b></span>
					%for x in jsons[c]["Video"]:
	        		<p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id={{x}} name={{x}} class={{c}}>  {{x}} </p>
					%end
				%end
				%if len(jsons[c]["Infographic"]) > 0: 
				<p><span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Infographics</b></span>
					%for x in jsons[c]["Video"]:
	        		<p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id={{x}} name={{x}} class={{c}}>  {{x}} </p>
					%end
				%end
				%if len(jsons[c]["Video"]) > 0: 
				<p><span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Videos</b></span>
					%for x in jsons[c]["Video"]:
	        		<p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id={{x}} name={{x}} class={{c}}>  {{x}} </p>
					%end
				%end
		 	%end
		 	<button type="submit"> OK </button>
      </form> 
	  <div id='delete_status'><p>Ready.</p></div>
    </div>

    <div class="clear"></div>

    <div id="urls">
      <a href="/">index</a> <a href="/logout">logout</a>
    </div>
	<div class="clear"></div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="assets/js/jquery.multi-select.js" type="text/javascript"></script>
    <script>
		

		var jsonJS = {{!jsonJS}};
		$("#regional_disasters").on('change', function(){
			console.log($(this).children(":selected").text());	
			if (this.value in jsonJS) {
				if (jsonJS[this.value].active == "active") {
					$("#active").prop('checked', true);
				}
				else { 
					$("#active").prop('checked', false);
				}
				for (x in jsonJS[this.value]) {
					$("#" + x).text(JSON.stringify(jsonJS[this.value][x])).val(jsonJS[this.value][x]).show();  
				}
				var countries = jsonJS[this.value]["countries"].split(",")
				countries = countries.map(function(d) {return d.replace(/#| /gi,'')});
				
				$("#regional-select").multipleSelect("setSelects",countries);		
			}	
		});	
		$(".countryDelete").on('change', function(){
			if ($(this).prop('checked') == true) {
				$('.'+ $(this).attr("id")).prop('checked',true);
			
			} else if ($(this).prop('checked') == false) {
				$('.'+ $(this).attr("id")).prop('checked',false);
			}

		});
		$("#clear-uploads").on('click' , function(){
			$('input:file').val('');
		})	

		$("#country-select").multipleSelect({
			placeholder: "Country Disaster",
			single: true,
			selectAll: false,
			onClick: function(view){
				if (view.value in jsonJS) {
					if (jsonJS[view.value].active == "active") {
						$("#active").prop('checked', true);
					}
					else { 
						$("#active").prop('checked', false);
					}
					for (x in jsonJS[view.value]) {
						$("#" + x).text(JSON.stringify(jsonJS[view.value][x])).val(jsonJS[this.value][x]).show();  
					console.log(JSON.stringify(jsonJS[view.value][x]));
					}
				}
			}
		});
		$("#regional-select").multipleSelect({
			placeholder: "Regional Disaster",
			selectAll: false
		});
		
		$(".regional-context").hide();
		$("#regional-select").multipleSelect('disable')
		$("#country-select").multipleSelect('disable')
		$("#regional-select").multipleSelect('uncheckAll')
		$("#country-select").multipleSelect('uncheckAll')
		
	
		$(".type").change(function() {
			
			$(".context").val("").text("");
			$("#active").prop('checked', false); 
			if ($(this).attr("id") == "type_regional") {
				$("#regional_disasters").show();
				$("#regional-select").multipleSelect('enable');
				$("#country-select").multipleSelect('disable');
				$(".regional-context").show();
			
			} else {
				$("#regional_disasters").hide();
				$(".regional-context").hide();
				$("#regional-select").multipleSelect('disable');
				$("#country-select").multipleSelect('enable');
		

			}		
		});

	         	

			
		$("form#delete_content").submit(function() {
			$("div#delete_status").fadeIn(100);
            z = $(this);
			var files = [];
			$(".check:checked").each(function(){
				files.push($(this).attr("id"));
			});
			$("#hidden").val(files.toString());

            $.post($(this).attr('action'), $(this).serialize(), function(j){
              if (j.ok) {
                $("div#delete_status").css("background-color", "#f0fff0");
                $("div#delete_status p").text('Ok.');
              } else {
                $("div#delete_status").css("background-color", "#fff0f0");
                $("div#delete_status p").text(j.msg);
              }
            }, "json");
            return false;
				
        });
		$("form#scrape").submit(function() {
			$("div#scrape_status").fadeIn(100);
            z = $(this);
            $.post($(this).attr('action'), $(this).serialize(), function(j){
				console.log($(this).serialize());
              if (j.ok) {
                $("div#scrape_status").css("background-color", "#f0fff0");
                $("div#scrape_status p").text('Ok.');
              } else {
                $("div#scrape_status").css("background-color", "#fff0f0");
                $("div#scrape_status p").text(j.msg);
              }
            }, "json");
            return false;
				
        });
           </script>
		</div>
	</body>
</html>
<style>
div#commands { width: 45%%; float: left}
div#users { width: 45%; float: right}
div#main {
    color: #777;
    margin: auto;
    margin-left: 5em;
    font-size: 80%;
}
input, textarea {
    background: #f8f8f8;
    border: 1px solid #777;
    margin: auto;
}
input:hover, textarea:hover { background: #fefefe}

label {
  width: 9em;
  float: left;
  text-align: left;
  margin-right: 0.5em;
  display: block
}
button[type="submit"] {
    margin-left: 13em;
}

button[type="submit"].close {
    margin-left: .1em;
}
div#status {
    border: 1px solid #999;
    padding: .5em;
    margin: 2em;
    width: 15em;
    -moz-border-radius: 10px;
    border-radius: 10px;
}
.clear { clear: both;}
div#urls {
  position:absolute;
  top:0;
  right:1em;
}
</style>
