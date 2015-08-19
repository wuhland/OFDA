<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="content-type">
<div id='main'>
    <h2>Map Content Management</h2>
    <p>Welcome {{current_user.username}}</p>
    <div id='commands'>
      <p>Scrape content from Impact Blog:</p>
      <form action="scrape_content" method="post">
          <p><label>Country</label> <input type="text" name="country" /></p>
          <p><label>URL</label> <input type="text" name="url" /></p>
          <button type="submit" > OK </button>
          <button type="button" class="close"> Cancel </button>
      </form>
      <br />

    </div>
    <div>
      <form action="delete_content" method="post">
      	<legend>Delete content from map</legend>
			<div>{{json}} </div>
         	%for c in json:
	      	<p><b>{{check[c][0]}}</b></p>
	 	    	%for x in json[c]:
	         	<p>{{x}} <input type="checkbox" id={{x}} class="check"></p>
		    	%end
		 	%end
		 	<button type="submit"> OK </button>
      </form> 
    </div>

    <div class="clear"></div>

    <div id="urls">
      <a href="/">index</a> <a href="/logout">logout</a>
    </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>
        // Prevent form submission, send POST asynchronously and parse returned JSON
		$('form').submit(function() {
			debugger;
            z = $(this);
            $.post($(this).attr('action'), $(this).serialize(), function(j){
			  console.log($(this).serialize());
              if (j.ok) {
                $("div#status").css("background-color", "#f0fff0");
                $("div#status p").text('Ok.');
              } else {
                $("div#status").css("background-color", "#fff0f0");
                $("div#status p").text(j.msg);
              }
              $("div#status").delay(800).fadeOut(500);
            }, "json");
            return false;
		
        });
        // Prevent form submission, send POST asynchronously and parse returned JSON
  /*      $('form').submit(function() {
            $.post($(this).attr('action'), $(this).serialize(), function(j){
              if (j.ok) {
                $("div#status").css("background-color", "#f0fff0");
                $("div#status p").text('Ok.');
              } else {
                $("div#status").css("background-color", "#fff0f0");
                $("div#status p").text(j.msg);
              }
              $("div#status").delay(800).fadeOut(500);
            }, "json");
            return false;
        });
*/
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
