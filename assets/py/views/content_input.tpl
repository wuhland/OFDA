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
      <p><b>Image Upload Content:</b></p>
	  
      <form action="img_upload" method="post" enctype="multipart/form-data">
          <p><input type="file" name="popup"></p>
          <button type="submit" value="Start upload" > OK </button>
      </form>
	  <div id='upload_status'><p>Ready.</p></div>
    <br />

    </div>
    <div>
      <p><b>Add Content To Map:</b></p>
  
      	<form action="scrape" method="post">
  		<p><label>Active Disaster</label> <input type="checkbox" name="active" value="active"></p>
  		<p><label>Disaster Type</label><input id="type_country" type="radio" name="disaster_type" id="disater_type" value="country" checked>Country
		<input type="radio" name="disaster_type"id="type_regional" value="regional">Regional</p> 
			
		<select id="regional_disasters" name="regional_disaster" style="display: none;"> 
		%for c in json: 
			%if json[c]["cat"] == "regional":
			<option value={{c}}>{{c}}</option>
			%end
		%end
		</select>
				
	  	<select multiple="multiple" id="my-select" name="country" style="text-align:left">
	  	%for x in check:
		  <option value={{x}}>{{check[x][0].title()}}</option>
	  	%end
	  	</select>
          <p><label>Story URL</label> <input type="url" name="story_url" /></p>
          <p><label>Video URL</label> <input type="url" name="video_url" /></p>
		  <p><label>Video Title</label> <input type="text" name="video_title" /></p>
          <p><label>Pop-up Summary</label> <textarea  rows="10" cols="50"  name="summary" /></textarea></p>
          <button type="submit" > OK </button>
      </form>
	  <div id='scrape_status'><p>Ready.</p></div>
    <br />

    </div>
    <div>
      <p><b>Delete Content From Map:</b></p>
      <form action="delete_content" id="delete_content" method="post">
			<input type="text" id="hidden" name="hidden" style="display: none;"></div>
			<div>{{json}} </div>
         	%for c in json:
	      	<p><b>{{check[c][0]}}</b></p>
	 	    	%for x in json[c]["Story"]:
	         	<p><input type="checkbox" id={{x}} name={{x}} class="check">  {{x}} </p>
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
        // Prevent form submission, send POST asynchronously and parse returned JSON
		$("#my-select").multipleSelect({
			selectAll: false,
			placeholder: "Select Country or Countries",
			});
		
		$("#type_regional").change(function() {
			$("#regional_disasters").show();
			
			
			
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
       //       $("div#status").delay(800).fadeOut(500);
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
//              $("div#scrape_status").delay(800).fadeOut(500);
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
