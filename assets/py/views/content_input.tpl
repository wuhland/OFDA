<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="content-type">
<div id='main'>
    <h2>Map Content Management</h2>
    <p>Welcome {{current_user.username}}</p>
    <div>
      <p>Scrape content from Impact Blog:</p>
      <form action="scrape" method="post">
          <p><label>Country</label> <input type="text" name="country" /></p>
          <p><label>URL</label> <input type="text" name="url" /></p>
          <button type="submit" > OK </button>
          <button type="button" class="close"> Cancel </button>
      </form>
	  <div id='scrape_status'><p>Ready.</p></div>
    <br />

    </div>
    <div>
      <form action="delete_content" id="delete_content" method="post">
      	<legend>Delete content from map</legend>
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
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>
	
        // Prevent form submission, send POST asynchronously and parse returned JSON
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
			console.log($(this).serialize());
            $.post($(this).attr('action'), $(this).serialize(), function(j){
              if (j.ok) {
                $("div#scrape_status").css("background-color", "#f0fff0");
                $("div#scrape_status p").text('Ok.');
              } else {
                $("div#scrape_status").css("background-color", "#fff0f0");
                $("div#scrape_status p").text(j.msg);
              }
              $("div#scrape_status").delay(800).fadeOut(500);
            }, "json");
            return false;
				
        });
           </script>
</div>
<style>
div#commands { width: 45%%; float: left}
div#users { width: 45%; float: right}
div#main {
    color: #777;
    margin: auto;
    margin-left: 5em;
    font-size: 80%;
}
input {
    background: #f8f8f8;
    border: 1px solid #777;
    margin: auto;
}
input:hover { background: #fefefe}
label {
  width: 8em;
  float: left;
  text-align: right;
  margin-right: 0.5em;
  display: block
}
button {
    margin-left: 13em;
}
button.close {
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
