var featuredJSON;

d3.json("/control.json", function(error, json) {
	if (error) return console.warn(error);
	featuredJSON = json;
	visualizeit();
});

function visualizeit() {

		var width = 960,
			height = 750,
			country,
			state;
		var topMargin = 0, 

		tooltip = d3.select("body").append("div")
			.attr("class", "tooltip");


		var  points = [
			["DC",[-77.03666,38.89511]],
			["Miami",[-80.224, 25.7877]],
			["Pisa",[10.4, 43.716]],
			["Dubai",[55.333,24.95]],
			["SanJose",[-86,9]],
			["Budapest",[19.051389,47.4925]],
			["Dakar",[-17.44666,14.692778]],
			["Nairobi",[36.81666,-1.28333]],
			["Pretoria",[28.188056,-25.746111]],
			["Bangkok",[100.46666,13.75]]
		];
			
		var points2 = {
			"DC":{
				"fullname":"Washington, DC",
				"type":"headquarters",
				"coord":[-77.03666,90.89511],
			//	"coord":[77.03666,138.89511],
				"tagline":"Headquartered in D.C. and with more than 300 staff worldwide, USAID's Office of U.S. Foreign Disaster Assistance (OFDA) leads and coordinates the U.S. government's humanitarian assistance efforts overseas.  On average, OFDA responds to 70 disasters in more than 50 countries every year."
			},
			"Miami":{
				"fullname":"Miami, Florida (Warehouse)",
				"type":"warehouse",
				"coord":[-80.224, 25.7877],
				"tagline":"Miami is 1 of 3 locations where OFDA stockpiles critical commodities--including emergency shelter materials, warm blankets, water treatment systems, and hygiene kits--that can be transported quickly to people most in need."
			},
			"Pisa":{
				"fullname":"Pisa, Italy (Warehouse)",		
				"type":"warehouse",
				"coord":[10.4, 43.716],
				"tagline":"Pisa is 1 of 3 locations where OFDA stockpiles critical commodities--including emergency shelter materials, warm blankets, water treatment systems, and hygiene kits--that can be transported quickly to people most in need."
			},
			"Dubai":{
				"fullname":"Dubai, United Arab Emirates (Warehouse)",
				"type":"warehouse",
				"coord":[55.333,24.95],
				"tagline":"Dubai is 1 of 3 locations where OFDA stockpiles critical commodities--including emergency shelter materials, warm blankets, water treatment systems, and hygiene kits--that can be transported quickly to people most in need."
			},
			"SanJose":{
				"fullname":"San Jose, Costa Rica",
				"type":"office",
				"coord":[-84.0833,9.93333],
				"tagline":"San Jose, Costa Rica is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in Latin America and the Caribbean." 
			},	
			"Budapest":{
				"fullname":"Budapest, Hungary",
				"type":"office",
				"coord":[19.051389,47.4925],
				"tagline":"Budapest, Hungary is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in Europe, Middle East, and Central Asia." 
			},
			"Dakar":{
				"fullname":"Dakar, Senegal",
				"type":"office",
				"coord":[-17.44666,14.692778],
				"tagline":"Dakar, Senegal is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in West Africa." 
			},
			"Nairobi":{
				"fullname":"Nairobi, Kenya",
				"type":"office",
				"coord":[36.81666,-1.28333],
				"tagline":"Nairobi, Kenya is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in East and Central Africa." 
			},
			"Pretoria":{
				"fullname":"Pretoria, South Africa",
				"type":"office",
				"coord":[28.188056,-25.746111],
				"tagline":"Pretoria, South Africa is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in South Africa." 
			},	
			"Bangkok":{
				"fullname":"Bangkok, Thailand",
				"type":"office",
				"coord":[100.46666,13.75],
				"tagline":"Bangkok, Thailand is the location of 1 of OFDA's 6 regional offices where staff oversee humanitarian programs in East Asia and the Pacific region, as well as South Asia." 
			}
		};


		 
		//var featured = ["PHL","JAM","SDS","HTI"];
		//var featuredMap = d3.set(featured);
		var featuredMap = d3.map(featuredJSON);
		console.log(featuredMap);
		function httpGet(theURL){
			var xmlHttp = null;
				
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", theURL, false );
			xmlHttp.send( null );
			return xmlHttp.responseText;
		}

		//Tooptip variables

		d3.select("body").append("div")
			.attr('id','frame')
			.style('width', width + 'px')
			.append('div')
				.style('overflow','hidden')
				.attr("id", "heading-Block")
				.style("display", "block")
				.style("width", width + "px");

		//timer id to clear setTimout later
		var timerID;
		var projection = d3.geo.cylindricalStereographic()
			.rotate([-32,0])
			.parallel(45)
			.scale(245)
			.translate([(width)/2,( height)/ 2]);

		var trackWidth = 0.5;

		var color = d3.interpolateLab("#99d594", "#fc8d59");

		var path = d3.geo.path()
			.projection(projection);

		d3.select("body").select("#frame")
				.attr("width", width + "px")
			.append("div")
				.attr("id","map")
				.style('position','relative')
				.style("width", width + "px");

		var map = d3.select("body").select("#map");	

		var svg = d3.select("body").select("#map").append("svg")
			.attr("width", width)
			.attr("height", height)
			.style("margin-top", topMargin);

		svg.append("rect")
			.attr("class", "background")
			.attr("width", width)
			.attr("height", height)
			.on("click", country_clicked);
			

		var g = svg.append("g");

		function testDialog (dialogOptionBoolean, Media) {

			if (dialogOptionBoolean === 0) {
				d3.select("#" + Media).style("background-color","#16B0C1").style("color","white");	
				d3.selectAll(".dialogBoxOptionContainer").remove();
				tooltip.transition().duration(700).style("opacity", 0);
				tooltip.transition().delay(705).each('start', function(){
					d3.selectAll(".popDetail, #tooltipImg").remove();
					d3.selectAll(".popName").remove();
					d3.selectAll("#arrow").remove();
					d3.selectAll(".another").remove();
					d3.selectAll(".popFront").remove();
				}).style("width","0px").style("height","0px").style("pointer-events","none"); 
			}
		}

		var dialogOptionBoolean = 0;

		function zoom(xyz) {
			dialogOptionBoolean = 0;
			g.transition()
				.duration(750)
				.attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
				.select(".boundary").style("stroke-width", 1.0 / xyz[2] + "px");

		}

		d3.select("#map").append("div")
			.attr("id","cdContainer")
			.style("width", width + "px")
				.append("div") 
				.attr("id","globeContainer")
				.style("width","120px")	
				.style("pointer-events","none")
				.style("padding-left","5px")
				.style("visibility","hidden")
				.on("click", function() {
					d3.select("#ovContainer").remove();
					d3.select("#dataTitle").remove();
					var xyz = [width / 2, height / 2, 1];
					country = null;
					d3.select("#dialogBoxUnit").remove();
					d3.selectAll(".dialogBox").remove();
					d3.select("#swipeBack").remove();
					zoom(xyz);
					isGlobal(xyz,null);
				})
				.append("span")
				.html("Map")
				.style("margin-left","23px")
				.append("img")
					.attr("id","globe")
					.attr("opacity",1)
					.style("margin-right","3px");

		var globe = new Image();

		globe.onload = function(){
			document.getElementById("globe").src = 'assets/img/globe.png';
		};
		globe.src = 'assets/img/globe.png';

		var zoomRegion = function(region) {	
				d3.selectAll(".popDetail, #tooltipImg, .popName, .another").remove();
				d3.select(".tooltip").style("opacity",0).style("width","0px");	
				zoom(region.xyz);
				contentDialog(region.id);
				ov(region.id);
				isGlobal(region.xyz, region.countries);
		};

		function popup (centroid, selection, type) {
		  var headline = "";
		  var tagline = "";
			var selectionName = "";
			var click = function () {};
			var color;
			if (type === "points"){
				click = null;
				color = "#NA";
				selectionName = selection;
				headline = points2[selection].fullname;
				tagline = points2[selection].tagline;
			} else if (type === "country" || type === "invisible"   ) {
				click = function(){country_clicked(selection);}; 
				color = "#" + selection.id; 
				selectionName = selection.id;
				headline = featuredJSON[selection.id].fullname;
				tagline = featuredJSON[selection.id].tagline;
			} else if (type === "regional") {
				click = function() {zoomRegion(featuredJSON[featuredJSON[selection.id].catID]);};
				color = featuredJSON[featuredJSON[selection.id].catID].countries;
				selectionName =  featuredJSON[selection.id].catID;
				headline = featuredJSON[featuredJSON[selection.id].catID].fullname;
				tagline = featuredJSON[featuredJSON[selection.id].catID].tagline;	
			} else if (type === "florida") {
				click = function(){		
					var FLA = featuredJSON.FLA;
					d3.selectAll(".popDetail, #tooltipImg, .popName, .another").remove();
					tooltip.style("opacity",0).style("width","0px");	
					zoom([133.81,293.13,3]);
					contentDialog('FLA');
					isGlobal(FLA.xyz, FLA.countries);
					testDialog(dialogOptionBoolean,null);
					}; 
					color = "#FLA";
					selectionName = "FLA";
					headline = featuredJSON.FLA.fullname;
					tagline = featuredJSON.FLA.tagline;
			}  else if (type === "DC") {
				click = function(){		
					var DC = featuredJSON.DC;
					d3.selectAll(".popDetail, #tooltipImg, .popName, .another").remove();
					tooltip.style("opacity",0).style("width","0px");
						
					zoom(DC.xyz);
					contentDialog("DC");
					isGlobal(DC.xyz, "#DC_path");
					testDialog(dialogOptionBoolean,null);
					}; 
				color = "#NA";
				selectionName = selection;
				headline = points2[selection].fullname;
				tagline = points2[selection].tagline;	
				
			} 
			
			var arrow = {};
			var offsets = [];
		if (centroid[0] >= 0.8 * width || selection.id === "IDN"|| selection.id === "SOM" ) {
				arrow = {"height":0,"width":0,"border":"20px solid hsla(0,0%,0%,0)","border-left":"20px solid #16B0C1","top":"75px","left":"100%","border-right":"0px solid hsla(0,0%,0%,0)","pointer-events":"none"};
				offsets = [230,-100];
									
			} else if (centroid[1] >= 0.8 * height) {
				arrow = {"height":0,"width":0,"border":"20px solid hsla(0,0%,0%,0)","border-top":"20px solid #16B0C1","bottom":"-20px","border-bottom":"0px solid hsla(0,0%,0%,0)","pointer-events":"none"};
				offsets = [95,29];
			} else if (centroid[0] <= 0.2 * height || selection.id === "CHL" || selection.id === "SDS") {
				arrow = {"height":0,"width":0,"border":"20px solid hsla(0,0%,0%,0)","border-right":"20px solid #16B0C1","left":"-20px","top":"75px","border-left":"0px solid hsla(0,0%,0%,0)","pointer-events":"none"};
				offsets = [-33,-86];
			} else {
				arrow = {"height":0,"width":0,"border":"20px solid hsla(0,0%,0%,0)","border-bottom":"20px solid #16B0C1","top":"-20px","left":"40%","border-top":"0px solid hsla(0,0%,0%,0)","pointer-events":"none"};
				offsets = [97,33];
			}
			 
				tooltip
					.style("pointer-events","auto")
					.attr("class","tooltip pop")
					.style("width", "200px")
					.style("border-bottom-left-radius",".4em")
					.style("border-bottom-right-radius",".4em")
					.style("opacity", 0)
					.style("top", (centroid[1] + offsets[1] ) + "px")
					.style("left", (centroid[0] - offsets[0]) + "px")
					.transition().duration(300)
					.style("width", "200px")
					.style("opacity", 1)
					.style("visibility","visible")
					.style("display", "block");	
					
				tooltip.selectAll("div, img, .arrow, .another").remove();
			
				tooltip.insert("div")
					.attr("id","base")
					.append('span')
					.text(function(){
						return headline;
					})				
					.attr("class", "popName");

				tooltip.append("img")
					.attr("id", "tooltipImg")
					.attr("width", 200)
					.style("opacity", "1"); 

				var image = new Image();

				tooltip.insert("div")
					.html(function(){return tagline;}) 
					.attr("class", "popDetail");

				tooltip.append("div")
					.attr("class","popFront")
					.on("mouseover", function() {
						dialogOptionBoolean = 0;
						dialogOptionBoolean += 1;

						d3.selectAll(color).transition().duration(500).style("fill","#E89624");
					})	
					.on("mouseout", function() {
						dialogOptionBoolean -= 1;
						d3.selectAll(color).transition().duration(500).style("fill","#FFCB36");
						setTimeout(function(){
							testDialog(dialogOptionBoolean,null);},10);
					})
						.on("click", click);
						
					tooltip.append("div")
						.style(arrow)
						.style("position","absolute")
						.attr("id","arrow")
						.on("click", click);	

		if (type === "both") {
			tooltip.style({"border-bottom-left-radius":"0em","border-bottom-right-radius":"0em"}).append("div")
				.style({"width":"100%","display":"inline-block","left":"0px","background-color":"#16B0C1","z-index":6,"position":"absolute","border-bottom-left-radius":".4em","border-bottom-right-radius":".4em","border-top":"medium solid white","top":"100%"})
				.attr("class","another")
				.style("padding","8px")
				.style("width","200px")
				.html("<span class=popDetail style=line-height:100%>" + featuredJSON[selection.id].fullname + " " + featuredJSON[featuredJSON[selection.id].catID].bothTagline + "</span>")
				.on("mouseover", function() {
					dialogOptionBoolean += 1;
					d3.selectAll(featuredJSON[featuredJSON[selection.id].catID].countries).transition().duration(500).style("fill","#E89624");
				}) 
				.on("mouseout", function() {
					dialogOptionBoolean -= 1;
					d3.selectAll(featuredJSON[featuredJSON[selection.id].catID].countries).transition().duration(500).style("fill","#FFCB36");
					setTimeout(function(){testDialog(dialogOptionBoolean,null);},10);
				})
				.on("click", function() {
					zoomRegion( featuredJSON[featuredJSON[selection.id].catID]);
				});	


		} else if (type === "doubleRegional"){
			tooltip.append("div")
				.style({"width":"100%","display":"inline-block","left":"0px","background-color":"#16B0C1","z-index":6,"position":"absolute"})
				.attr("class","another")
				.style("padding","8px")
				.style("width","200px")
				.on("mouseover", function() {
					dialogOptionBoolean += 1;
					d3.selectAll(featuredJSON[featuredJSON[selection.id].catID[1]].countries).transition().duration(500).style("fill","#E89624");
				}) 
				.on("mouseout", function() {
					dialogOptionBoolean -= 1;
					d3.selectAll(featuredJSON[featuredJSON[selection.id].catID[1]].countries).transition().duration(70).style("fill","#FFCB36");
					setTimeout(function(){testDialog(dialogOptionBoolean,null);},10);
				})
				.on("click", function() {
					 zoomRegion(featuredJSON[featuredJSON[selection.id].catID[1]]);
				})
				.html("<span class=popDetail>In 2011, ongoing conflict and the worst drought in 60 years affected 13 million people in the Horn of Africa, more than the populations of NYC and LA combined. This led the U.N. to declare a <span style=color:#FFCB36;font-weight:bold>famine</span> in Somalia and prompted a vast humanitarian response to the region.</span>")
				.append("div")
					.style({"width":"100%","top":"100%","display":"inline-block","left":"0px","background-color":"#16B0C1","z-index":6,"position":"absolute","border-bottom-left-radius":".4em","border-bottom-right-radius":".4em","border-top":"medium solid white"})
					.attr("class","another")
					.style("padding","8px")
					.style("width","200px")
					.html("<span class=popDetail>Somalia was also impacted by the <span style=color:#FFCB36;font-weight:bold>deadliest tsunami</span> in recorded history, which hit the region in December 2004.</span>")
					.on("mouseover", function() {
						dialogOptionBoolean += 1;
						d3.selectAll(featuredJSON[featuredJSON[selection.id].catID[0]].countries).transition().duration(500).style("fill","#E89624");
					})
					.on("mouseover.chill", function() { 
						d3.event.stopPropagation();
					})		
					.on("mouseout", function() {
						dialogOptionBoolean -= 1;
						d3.selectAll(featuredJSON[featuredJSON[selection.id].catID[0]].countries).transition().duration(500).style("fill","#FFCB36");
						setTimeout(function(){testDialog(dialogOptionBoolean,null);},10);
					})		
					.on("mouseout.chill", function() { 
						d3.event.stopPropagation();
					})
					.on("click",function() {
						 zoomRegion(featuredJSON[featuredJSON[selection.id].catID[0]]);
					})
					.on("click.chill", function() { 
						d3.event.stopPropagation();
					});


			}

		}

		d3.json("assets/data/countries_min.json", function(error, us) {	
				g.append("g")
					.attr("id", "countries")
					.selectAll("path")
					.data(topojson.feature(us, us.objects.countries_min).features)
					.enter()
					.append("path")
					.attr("class", function(d) {
						var c = "";
						if (featuredMap.has(d.id)) {
							c = "featured";
							if (featuredJSON[d.id].cat === "regional") {
								c = "featured " + featuredJSON[d.id].catID;
							} else if (featuredJSON[d.id].cat === "doubleRegional") {
								c = "featured " + featuredJSON[d.id].catID[0] + " " + featuredJSON[d.id].catID[1];
							} 
						} else {
							c = "notFeatured";
						}
						return c; 
						})
					.attr("id", function(d) { return d.id; })

					.attr("d", path)
					.on("click", function(d) {
						var c;// = function(){};
						if (featuredMap.has(d.id)) {
							c =  country_clicked(d);
							if (featuredJSON[d.id].cat === "regional") {
								c = zoomRegion(featuredJSON[featuredJSON[d.id].catID]);
							}
									 
						} else {
								var xyz = [width / 2, height / 2, 1];
								country = null;
								d3.select("#dialogBoxUnit").remove();
								d3.selectAll(".dialogBox").remove();
								d3.select("#swipeBack").remove();
								zoom(xyz);
								isGlobal(xyz,null);
						}
						return c;
						} )
					.on("mouseover", function(d) {
								
						if (featuredMap.has(d.id)) {
								
								var centroid = path.centroid(d);
								var selection = d;
								var type = featuredJSON[d.id].cat;
								popup(centroid, selection, type); 
								var c = "";		
								if (featuredJSON[d.id]["catID"].length !== 1){ 
									c =	d3.select("#" + d.id).transition().duration(500).style("fill", "#E89624");
								} else {
									c =	d3.selectAll(featuredJSON[featuredJSON[d.id].catID].countries)
										.transition().duration(500).style("fill", "#E89624");
								}
								return c;
			
						} else {
							 return	null;
						}
						

					})
					.on("mouseout", function(d) {	
						var	c = "";	
						if (featuredMap.has(d.id)) {
							if (featuredJSON[d.id]["catID"].length !== 1){ 
								c =	d3.select(this).transition().duration(500).style("fill", "#FFCB36");
							} else {
								c =	d3.selectAll(featuredJSON[featuredJSON[d.id].catID].countries)
									.transition().duration(500).style("fill", "#FFCB36");
							}
						} else {
							c = null;
						}
						return c;
					});
				
						
				




			d3.json("assets/data/FLA.json", function (error, fla) { 
			g.append("g")
				.selectAll("path")
				.data(fla.features)
				.enter()
				.append("path")
				.attr("d",path)
				.style("fill","#FFCB36")
				.attr("id","FLA")
				.on("mouseover", function(d) {
					var centroid = path.centroid(d);
					var selection = d;
					var type = "florida";
					popup (centroid, selection, type);
				d3.select("#FLA").transition().duration(500).style("fill","#E89624");
				})
				.on("click", function() {
					var FLA = featuredJSON.FLA;
					d3.selectAll(".popDetail, #tooltipImg, .popName, .another").remove();
					tooltip.style("opacity",0).style("width","0px");	
					zoom(FLA.xyz);
					contentDialog(FLA.id);
					isGlobal(FLA.xyz, FLA.countries);
					testDialog(dialogOptionBoolean,null);
					
				})
				.on("mouseout", function() {
					d3.select("#FLA").transition().duration(500).style("fill","#FFCB36");
				});
					


			d3.json("assets/data/DC.json", function (error, dc)  {
			g.append("g")
				.selectAll("path")
				.data(dc.features)
				.enter()
				.append("path")
				.attr("d",path)
				.style("fill","#FFCB36")
				.attr("id","DC_path");
					
				});


			});			
				
		  

			
			g.insert("g")
				.datum(topojson.mesh(us, us.objects.countries_min, function (a, b)  {
					return a !== b ; 
				}))
				.append("path")
				.attr("class","boundary")
				.attr("d",path);

			g.append("g").selectAll(".invisible")
				.data(topojson.feature(us, us.objects.countries_min).features)
					.enter()	
					.append("circle")
					.attr("class","circle")
					.attr("transform", function(d) {
							return "translate(" + path.centroid(d) + ")";
							
						})
						.attr("r", function (d) {
							var rad;
							if (featuredMap.has(d.id) && (path.area(d) <= 80)){
								rad = 4 ;
							} else {
								rad = 0 ;
							}
							return rad;
						})	
						.style("fill","red")
						.style("fill-opacity","0")
						.on("mouseout", function (d) {
								var c = "";		
								if (featuredJSON[d.id].cat === "country" || featuredJSON[d.id].cat === "doubleRegional" || featuredJSON[d.id].cat === "both"){ 
									c =	d3.select("#" + d.id).transition().duration(500).style("fill", "#FFCB36");
								} else if (featuredJSON[d.id].cat === "regional"){
									c =	d3.selectAll(featuredJSON[featuredJSON[d.id].catID].countries)
										.transition().duration(500).style("fill", "#FFCB36");
								}
								return c;
						
						})	
						.on("mouseover", function (d) {					
								var c = "";		
								if (featuredJSON[d.id].cat === "country" || featuredJSON[d.id].cat === "doubleRegional" || featuredJSON[d.id].cat === "both"){ 
									c =	d3.select("#" + d.id).transition().duration(500).style("fill", "#E89624");
								} else if (featuredJSON[d.id].cat === "regional"){
									c =	d3.selectAll(featuredJSON[featuredJSON[d.id].catID].countries)
										.transition().duration(500).style("fill", "#E89624");
								}
							var centroid = path.centroid(d);
							var selection = d;
							var type = featuredJSON[selection.id].cat;
							popup (centroid, selection, type);	
								return c;
							

						})
						.on("click", function(d) {
							var c = "";
							if (featuredJSON[d.id].cat === "regional") {
								c = zoomRegion(featuredJSON[featuredJSON[d.id].catID]);
							}
							else c = country_clicked(d);
							return c;		
						});

		setTimeout(function() {

			g.append("g").selectAll(".points")
				.data(points2)
				.enter()
				.append("g")
						.attr("transform", function(d) {
							return "translate(" + projection(d.coord) + ")";
						})
						.attr("id", function (d) {return d;})
						
							.on("mouseover", function(d) {	
								var centroid = projection(d.coord);
								var selection = d;
								
								var type = "";
								if (this.id === "DC") {
									type = "DC";
								} else {
									type = "points";
								}
								popup(centroid, selection, type); 
							})
							.attr("class",function(d) {
								return d.type;
							});


			d3.selectAll(".warehouse")
				.append("circle")
				.attr("r",4)					
				.style("fill","#002A6C")
				.style("stroke-width","2px");
			
			
			d3.selectAll(".office")
				.append("path")
				.attr("d","m 11.111678,0.93801117 c 0.438436,0 2.912939,7.87941143 3.26764,8.13711713 0.354702,0.2577057 8.613131,0.1762266 8.748615,0.5932032 0.135484,0.4169765 -6.593618,5.2052405 -6.729102,5.6222175 -0.135484,0.416977 2.494002,8.246031 2.139301,8.503737 -0.354702,0.257706 -6.988019,-4.662396 -7.426454,-4.662396 -0.438435,0 -7.0717525,4.920101 -7.4264539,4.662396 C 3.3305226,23.53658 5.9600094,15.707526 5.8245255,15.290549 5.6890416,14.873572 -1.0400603,10.085307 -0.90457641,9.6683309 -0.76909251,9.2513543 7.4893366,9.332834 7.8440381,9.0751283 8.1987395,8.8174226 10.673243,0.93801117 11.111678,0.93801117 z")
				.style("fill","#002A6C")
				.style("stroke-width","2px")
				.attr("transform", "translate(-5,-7) scale(.5)");
			
			d3.selectAll(".headquarters")
				.append("circle")
				.attr("r",7)					
				.style("fill","#002A6C")
				.style("stroke-width","2px");

			d3.selectAll(".headquarters")
				.append("path")
				.attr("d","m 11.111678,0.93801117 c 0.438436,0 2.912939,7.87941143 3.26764,8.13711713 0.354702,0.2577057 8.613131,0.1762266 8.748615,0.5932032 0.135484,0.4169765 -6.593618,5.2052405 -6.729102,5.6222175 -0.135484,0.416977 2.494002,8.246031 2.139301,8.503737 -0.354702,0.257706 -6.988019,-4.662396 -7.426454,-4.662396 -0.438435,0 -7.0717525,4.920101 -7.4264539,4.662396 C 3.3305226,23.53658 5.9600094,15.707526 5.8245255,15.290549 5.6890416,14.873572 -1.0400603,10.085307 -0.90457641,9.6683309 -0.76909251,9.2513543 7.4893366,9.332834 7.8440381,9.0751283 8.1987395,8.8174226 10.673243,0.93801117 11.111678,0.93801117 z")
				.style("fill","white")
				.attr("id","test")
				.attr("transform", "translate(-5.5,-6.5) scale(.5)");
		},75);

		});


		function isGlobal (xyz, FC) {

			if (xyz[2] === 1) {
				
				d3.selectAll("#hurr, #icon, .dot, .ring").remove();
				d3.select("#icon").remove();
				d3.selectAll(".circle").style("pointer-events","auto"); 
				d3.select("#FLA").style("pointer-events","auto").transition().duration(500).style("fill","#FFCB36");
				d3.selectAll("#ovContainer, #dataTitle").remove();
				d3.selectAll(".warehouse, .office, .headquarters")
					.style("pointer-events","auto")
					.transition().duration(500)
					.style("opacity","1");
				clearTimeout(timerID);
				d3.selectAll("#hurr, .icon").remove(); 
				d3.select("#globeContainer").style("pointer-events","none").style("visibility","hidden");

				d3.selectAll(".earthquake").remove();	

				d3.selectAll(".featured").style("cursor","pointer")
					.style("pointer-events","auto")
					.transition().duration(500)
					.style("opacity",1).style("fill","#FFCB36");

		 
		} else if (xyz[2] > 1) {
			
			tooltip.style("pointer-events","none");

			d3.selectAll(".circle").style("pointer-events","none"); 
			d3.select("#FLA").style("pointer-events","none").transition().duration(500).style("fill","#CFCDC9");
			d3.selectAll(".warehouse, .office, .headquarters")
				.style("pointer-events","none")
				.transition().duration(500)
				.style("opacity",0);

			d3.selectAll(".popDetail, .popFront, #arrow, .another").remove();	
				
			d3.select("#globeContainer").style("visibility","visible").style("pointer-events","auto");
				
			d3.selectAll(".featured").style("pointer-events","none")
				.transition().duration(500)
				.style("fill","#CFCDC9").style("cursor","pointer");
					
			d3.selectAll(FC).style("fill","#FFCB36");	
			
			

		} else {
			return;
			}	
		}	


		//get content from server
		function getHTTP(Media, Country, Name) {
			var Thing = featuredJSON[Country][Media];
			var ThingByName = {};
			var NameFunct = function(d) {return d.Button;};
			Thing.forEach(function(d){ThingByName[NameFunct(d)] = d;});
			d3.select("#map").append("div")
				.attr("id","swipeBack")
				.append("div")
					.attr("id","swipeBox")
					.attr("height", "0px")
					.style("opacity", 0)

					.html(function () {
						var text;
						if (Media ===  "Video") {
							text =  "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"//" + ThingByName[Name].URL + "\" frameborder=\"0\" allowfullscreen></iframe>";
						console.log(ThingByName);
						console.log(ThingByName[Name]);
						} else if (Media === "Story") {
							
							text = "<iframe name='iframe1' id='iframe1' src=\"../../_posts" + Country.toLowerCase() + "/" + ThingByName[Name].Name + ".html\" seamless></iframe>";
						} else if (Media === "Infographic") {
							text = "<img width=\"" + width + "\" height=\"" + (height - 50) + "\"src=\"data/countries/" + Country.toLowerCase() + "/graphic.jpg\"><div style=\"width:100%;position:absolute;background-color:#2b2b2b;opacity:0.5;bottom:0px;\"><span class=\"font\" style=\"color:white;margin-left:5px;\" >PDF version<a style=\"color:#16B0C1;margin:5px;\" target=\"_blank\" href=" + featuredJSON[Country].Infographic[0].Hyperlink + ">here</a></span></div>";
						} else if (Media === "Gallery") {
							text = "<iframe name='iframe1' scrolling=\"no\"  id='iframe1' src=\"data/countries/" + Country.toLowerCase() + "/" + ThingByName[Name].Folder + "/index.html" + "\" seamless></iframe>";
						//	text = "<iframe name='iframe1' scrolling=\"no\"  id='iframe1' src=\"data/countries/" + Country.toLowerCase() + "/" + ThingByName[Name].Name + "\" seamless></iframe>";
						}
								
						return text;
				})//put up information screen
				.transition()
				.duration(800)
				.style('opacity', 1)
				.style("top", function () {
					if (Media ===  "Video") { return "35px"; } 
					else if (Media === "Story") { return "35px"; }
					else if (Media === "Infographic") { return "35px"; }
					else if (Media === "Gallery") { return "0px"; }
						 
				});
		}

		function contentDialog(Country) {
			function Accepted(value) {
				var accepted = ["Story","Video","Infographic","Gallery"];
				var medias = [];
				for (obj in value) {
					if(accepted.indexOf(obj) > -1 && value[obj].length > 0) {
						medias.push(obj);
					}
				} 
				return medias;
			}
			dialogOptionBoolean = 0;
			d3.select("#map").select("#cdContainer").append("div")
					.attr("id","dialogBoxUnit")
						.style("margin-top","3px")
					.on("mouseover", function () {
						d3.selectAll("dialogBoxOption").remove();
					})
					.selectAll("div")
					.data(function () {
						return Accepted(featuredJSON[Country]);
					})
					.enter()
					.insert("div")
						.attr("class", "event")
						.insert("div")
						.attr("class", "dialogBox dialogBoxOff")
						.style("text-align","left")
						.style('opacity', 1)
						.style('display','absolute')
						.attr('id', function(d) { return d; })
						.append('span')	
						.style("pointer-events","none") 
						.text(function (d) { 
							return d; 
						})
						.style("margin-left","8px");
			
			d3.select('body').selectAll('.dialogBox')
			.on("click", function () {
				var Media = this.id;
				if (d3.select(this).classed("dialogBoxOff")) {
					d3.select("body").select("#swipeBack").remove();
					d3.select("body").selectAll(".dialogBox").classed("selected",false).classed('dialogBoxOff', true);
					d3.select(this).classed("selected", true).classed("dialogBoxOff",false);
					if ((featuredJSON[Country][Media]).length === 1) {
						var Name = featuredJSON[Country][Media][0].Button;//;
						getHTTP(Media, Country, Name);
					} else {
					}
				
				} else if(d3.select(this).classed("selected")) {
					d3.select("#map").select("#swipeBox").remove();
					d3.select("#map").select("#swipeBack").remove();
					d3.select(this).classed("dialogBoxOff",true).classed('selected',false);
				} 
			})
			.on("mouseover", function (){
				dialogOptionBoolean = 1;
				d3.selectAll(".dialogBox").style("background-color","#16B0C1").style("color","white").on("mouseover.kill", function(){
					d3.selectAll(".dialogBoxOption").remove();
				});
				d3.select(this).style({'box-shadow':'2px 2px 3px #888888','background-color':'whitesmoke','color':'grey'}).on("mouseover.kill", null);
						
				var Media = this.id;
				if (featuredJSON[Country][Media].length === 1) {
					return;
				} else {	
					var options = featuredJSON[Country][Media];
					d3.select(this).append("div")
						.attr("class","dialogBoxOptionContainer");

					d3.select(".dialogBoxOptionContainer").selectAll(".dialogBoxOption")				
						.data(options)
						.enter()
						.append("div")

						.attr("class","dialogBoxOption")
						.attr("id", function(i) { return "option_" + i ; })
						.html( function(d) { return d.Button; }) 
						.on("click", function(d) {
								
							d3.select("#" + Media).classed("selected", true).classed("dialogBoxOff",false);
							d3.select("body").select("#swipeBack").remove();

							var Name = d.Button;
							getHTTP(Media, Country, Name);
						
						})
						.on("click.stop", function() {d3.event.stopPropagation(); })
						.on("mouseover", function () {
							dialogOptionBoolean += 1;
							d3.select(this).style("background-color","#CFCDC9").style("color","grey");
							})
						.on("mouseover.stop", function() {d3.event.stopPropagation(); })
						.on("mouseout.change", function () {
							dialogOptionBoolean -=1;
							d3.select(this).style("background-color","whitesmoke").style("color","grey");
							setTimeout(function() {testDialog(dialogOptionBoolean, Media);}, 0);
							})
						.on("mouseout.stop", function() {d3.event.stopPropagation(); });


					}
			})
			.on("mouseout", function () {
				var Media = this.id;
				dialogOptionBoolean -= 1;
				d3.select(this).style({'box-shadow':'1px 1px 1.5px #888888'});//,'background-color':'#16B0C1','color':'whitesmoke'});
				setTimeout(function() {testDialog(dialogOptionBoolean, Media);}, 0);
			});
			
			d3.select("body").selectAll(".dialogBox").append("img")
				.attr("class","hash")
				.attr("src", "assets/img/hash.png")
				.attr("id", function (i) { 
					return "image_" + i;
					})
				.style("height","17px")
				.style("width","17px")
				.attr("z-index",4);
			
		}

		function ov(feature) {
					d3.select("#map").append("div")
						.attr("id","ovContainer")
						.append("div")
							.attr("id","ovLine")
							.style("left","0px")
							.style("width","5px")
							.style("height","100%")
							.style("margin-right","5px")
							.style("background-color","#16B0C1");

					d3.select("#map").select("#ovContainer").append("div")
						.attr("id","ovHead")
						.text(function () {  return featuredJSON[feature].fullname; } )
						.append("span")
							.style("display","inline-block")
					//		.attr("class","nmTeal")
							.style("font-family","ssp_reg, sans-serif")
							.style("color","#16B0C1")
							.style("margin-left","5pt")
							.attr("id","ovSubHead")
							.text(function () {  return featuredJSON[feature].ovTagline; } ); 
						
					d3.select("#map").select("#ovContainer")
							.selectAll(".ovElement")
							.data(function () { return featuredJSON[feature].ovElements; })
							.enter()				
							.append("div")
								.attr("class","ovElement")
								.style("border-left", function (i) { 
									var border;
									if (i === 0) {
										border = "0px solid hsla(0,0%,0%,0)";
									} else {
										border = "1px solid #CFCDC9";
									}
										return border;
								})
								.html(function (d) {	
										var text;
										if (d[0] === "displaced") {
											text = "people displaced";
										} else if (d[0] === "famine") {
											text = "people at risk for famine";
										} 									
										return "<span class=nmTeal style=font-size:22pt>" + d[1] +  "</span>" + "&nbsp;<span class=nmTeal style=font-size:11pt;font-family:ssp_bold sans-serif>" + d[2] + "</span><br><span  style=font-size:11pt;font-weight:400;line-height:100%;color:#16B0C1;font-family:ssp_reg sans-serif>" +  text + "</span>";
									});
		}


		function get_xyz(d) {
			var bounds = path.bounds(d);
			var w_scale = (bounds[1][0] - bounds[0][0]) / width;
			var h_scale = (bounds[1][1] - bounds[0][1]) / height;
			var z = 0.5 / Math.max(w_scale, h_scale);
		//	var z = .96 / Math.max(w_scale, h_scale);
			var x = (bounds[1][0] + bounds[0][0]) / 2;
		//	var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
			var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 50);
			return [x, y, z];
		}

		function zoom2ADM (d, xyz) {
			var FC = "#" + d.id;
						zoom(xyz);
						isGlobal(xyz,FC);
		}



		function country_clicked(d) {
			d3.selectAll(".popDetail, #tooltipImg, .popName").remove();
			d3.select(".tooltip").style("opacity",0).style("width","0px");	
			state = null;

			if (country) {
				g.selectAll( "#" + country.id ).style('display', null);

			}	

			if (d && country !== d) {
				var xyz = get_xyz(d);
				country = d;
		



			 if ( featuredJSON[d.id].type == "complex" || featuredJSON[d.id].type == "flood" || featuredJSON[d.id].type == "volcano" || featuredJSON[d.id].type == "famine" || featuredJSON[d.id].type == "DRR" ) {
					contentDialog(d.id);
					console.log(d.id);	
					zoom2ADM(d,xyz);

					ov(d.id);
							
				}		

				else {		
				
				var zoomFactor = [1,1,0.5];
				for(var i=0; i < zoomFactor.length; i++) {
						xyz[i] = zoomFactor[i] * xyz[i];
				}		
					contentDialog(d.id);			
			
			//		g.selectAll( "#" + d.id ).classed(".hide");
					zoom2ADM(d,xyz);
					return;
				}
			} else {
				d3.select("#ovContainer").remove();
				d3.select("#dataTitle").remove();
				d3.select("#hurr").remove();
				d3.select("#icon").remove();
				var xyz = [width / 2, height / 2, 1];
				country = null;
				d3.select("#dialogBoxContainer").remove();
				zoom(xyz);
				isGlobal(xyz, null); 
				d3.selectAll(".dialogBox").remove();
				
			}

		}
}

