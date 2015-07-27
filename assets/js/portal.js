var width = 960,
    height = 750,
    country,
    state;
var topMargin = 0, 

tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");

var featuredJSON = {
	"AFG":{
		"cat":"country",
		"year":2002,
		"options":["Story"],
		"Story":[{"Button":"Hot Potato: Improving Potato Farming","Name":"afg.html"},{"Button":"Livelihoods Improved through Successful Shelter Project","Name":"afg2.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Afghanistan",
		"tagline":"Since 2002, ongoing conflict and recurring natural disasters have generated significant humanitarian needs in Afghanistan. Natural disasters affect approximately 250,000 Afghans each year; more than 672,000 people remain internally displaced as a result of conflict.",
		"ovTagline":"Ongoing conflict and recurrent natural disasters",
		"ovElements":[["affected/yr","250,000",""],["displacedconflict","672,000",""]]
		},
	"AGO":{
		"cat":"country",
		"year":1975,
		"options":["Story"],
		"type":"complex",
		"Story":[{"Button":"Training First Responders to Care for their own Communities in Angola","Name":"ago.html"}],
		"Infographic":[],
		"Video":[],
		"fullname":"Angola",
		"tagline":"After obtaining its independence from Portugal in November 1975, Angola plunged into 27 years of civil war that killed more than 500,000 people and displaced millions more.",
  		"ovTagline":"27 yrs of civil war beginning November 1975",
		"ovElements":[["killed","500,000",""],["displaced","1","MILLION+"]]
	},
	"BGD":{
		"cat":"country",
		"year":1970,
		"options":["Story"],
		"Story":[{"Button":"Reducing Risk of Cyclones in Bangladesh","Name":"bgd.html"}],
		"Video":[],
		"Infographic":[],
		"type":"storm",
		"fullname":"Bangladesh",
		"tagline":"With tidal surges of 20-25 feet, Cyclone Bhola devasted Bangladesh in November 1970. The cyclone affected more than 3.6 million people and nearly wiped out the island of Manpura, which lost 3/4 of its people and all but 4 homes.",
		"ovTagline":"Cyclone Bhola struck on November 12-13, 1970",
		"ovElements":[["killed","300,000",""],["affected","3.6","MILLION"],["housedestroy","335,000",""]]
		},
	"BRA":{
		"cat":"country",
		"year":1988,
		"options":["Story"],
		"Story":[{"Button":"Rio do Sul: Brazil's Model City for Disaster Risk Reduction Planning","Name":"bra.html"},{"Button":"Resilient Farmers Take On Drought","Name":"bra2.html"}],
		"Video":[],
		"Infographic":[],
		"type":"flood",
		"fullname":"Brazil",
		"tagline":"Brazil and other countries in Latin America and the Caribbean experience a range of natural disasters including floods, landslides, hurricanes, droughts, and earthquakes. OFDA's work in Brazil focuses on reducing the risk that disasters pose on lives and livelihoods.",
		"ovTagline":"Flooding in February 1988",
		"ovElements":[["affected","3","MILLION+"],["economicdamages","$1","BILLION"]]
		},
	"BFA":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Burkina Faso",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"MMR":{
		"cat":"country",
		"year":2008,
		"options":["Story"],
		"Story":[{"Button":"From Relief to Recovery in the Ayeyarwady Delta","Name":"mmr.html"}],
		"Video":[],
		"Infographic":[],
		"type":"storm",
		"fullname":"Burma",
		"tagline":"On May 2, 2008, Cyclone Nargis made landfall in Burma, killing more than 138,000 people and affecting 2.4 million others. In June 2011, fighting erupted between the Government of Burma and the Kachin Independence Army, and ethnic and religious violence followed in June 2012, both causing hundreds of thousands to flee their homes.",
		"ovTagline":"Cyclone Nargis made landfall May 2, 2008",
		"ovElements":[["killed","138,000+",""],["affected","2.4","MILLION"],["damage","$4","BILLION"]]
		},
	"BIH":{
		"cat":"country",
		"year":1992,
		"options":["Story"],
		"Story":[{"Button":"Providing Emergency Shelter Repair in Bosnia","Name":"bih.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Bosnia and Herzegovina",
		"tagline":"Following the 1992 collapse of Yugoslavia, conflict between several ethnic groups erupted in newly formed Bosnia and Herzegovina. The war ended on November 21, 1995, leaving more than 97,000 people dead.",
		"ovTagline":"Civil War (1992-1995)",
		"ovElements":[["humanitarian","4.3","MILLION"],["displaced","2.5","MILLION"],["killed","97,000+",""]]
		},
	"ETH":{
		"cat":"both",
		"catName":"Horn of Africa",
		"catID":"horn",
		"year":2011,
		"options":["Story","Gallery","Video"],
		"Story":[{"Button":"No Name","Name":"EthiopiaStory1.html"}],
		"Video":[{"Button":"No Name","URL":"www.youtube.com/embed/jimweuZ_YnI"}],
		"Infographic":[],
		"Gallery":[{"Button":"Ethiopia Cooking School","Folder":"SweetPotato"},{"Button":"Water is Life","Folder":"Water"},{"Button":"Food for Life","Folder":"Food"}],
		"type":"famine",
		"fullname":"Ethiopia",
		"tagline":"From 1983-1985, drought conditions and political conflict in Ethiopia led to the <br><span style=color:#FFCB36;font-weight:bold>worst famine</span> in a century, causing more than 300,000 deaths and affecting more than 7.7 million people.",
		"ovTagline":"Drought and conflict led to famine in 1984",
		"ovElements":[["killed","300,000",""],["affected","7.7","MILLION+"],["regions","12 <span style= 'font-size:11pt'> OUT OF </span>14",""]]
		},
	"KEN":{
		"cat":"regional",
		"catName":"Horn of Africa",
		"catID":"horn",
		"year":2011,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Kenya",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"KHM":{
		"cat":"country",
		"year":2011,
		"options":["Story"],
		"type":"flood",
		"Story":[{"Button":"Thouk's Story","Name":"khm.html"}],
		"Infographic":[],
		"Video":[],
		"fullname":"Cambodia",
		"tagline":"Heavy rains fell over nearly all of Cambodia in the fall of 2011. Floodwaters spread across 18 of 24 provinces, affecting 1.5 million people and destroying nearly 10 percent of the nation's crops.",
 		"ovTagline":"Flooding in fall of 2011",
		"ovElements":[["affected","1.5","MILLION"],["provinces","18 <span style='font-size:11pt'> OUT OF </span>24",""],["crops","10%",""]]
		},
	"CAF":{
		"cat":"country",
		"year":2012,
		"options":["Story"],
		"Story":[{"Button":"Central African Republic: Help and Hope after Upheaval","Name":"caf.html"},{"Button":"Honoring the Many Faces of Humanitarian Work","Name":"caf2.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Central African Republic",
		"tagline":"In December 2012, Muslim Seleka fighters engaged in violent clashes with Christian anti-Balaka groups. Security conditions continue to deteriorate as conflict rages on, leaving half the country in need of humanitarian aid.",
		"ovTagline":"Widespread violence broke out in March 2013",
		"ovElements":[["affected","2.5","MILLION"],["insecure","1.7","MILLION"],["displaced","913,000",""]]
		},
	"TCD":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Chad",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"CHL":{
		"cat":"country",
		"year":2010,
		"options":["Story"],
		"Story":[{"Button":"By Preparing for Disaster, Chile Remains Resilient","Name":"chl.html"}],
		"Video":[],
		"disasterarray":{
			"magnitude":8.8,
			"depth":5, //in km
			"epicenter":[-72.733,-35.909],//Long Lat
			},
		"Infographic":[],
		"type":"quake",
		"fullname":"Chile",
		"tagline":"In 2010, a magnitude 8.8 earthquake affected 1.8 million people. Chile is one of the most earthquake-prone countries in the world. OFDA's work there and in the region focuses on disaster preparedness.",
		"ovTagline":"Earthquake on February 27, 2010",
		"ovElements":[["affected","1.8","MILLION"],["killed","486",""],["house","190,000",""]]
		},
	"COL":{
		"cat":"country",
		"year":1985,
		"options":["Story"],
		"Story":[{"Button":"Catastrophic Eruption Destroys Town, Leads to Volcano Disaster Assistance Program","Name":"col.html"},{"Button":"Preparing Columbia for the Next Eruption","Name":"Colombia_PoP.html"}],
		"Video":[],
		"Infographic":[],
		"type":"volcano",
		"fullname":"Colombia",
		"tagline":"Dormant for nearly 150 years, 'the Sleeping Lion' Nevado del Ruiz volcano erupted in 1985, killing some 23,000 people. The eruption led to the creation of the USAID/U.S. Geological Service's Volcano Disaster Assistance Program, the world's only volcano crisis response team.",
		"ovTagline":"Volcano eruption on November 13, 1985",
		"ovElements":[["killed","23,000",""],["injured","5,000",""],["homeless","7,700",""]]
		},
	"COD":{
		"cat":"country",
		"year":2014,
		"options":["Story"],
		"Story":[{"Button":"Re-establishing Primary Care in the DRC","Name":"cod.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Democratic Republic of the Congo",
		"tagline":"The conflict in the Democratic Republic of the Congo is one of the longest-running in Africa. Natural disasters, violence, forced recruitment into armed groups, and restricted humanitarian access have led to huge numbers of people being forced to flee their homes, often several times.",
		"ovTagline":"Ongoing conflict",
		"ovElements":[["displaced","2.6","MILLION"],["insecure","6.7","MILLION"]]
		},
	"DC":{
		"cat":"country",
	//	"year":2012,
		"xyz":[150,228,70],
		"options":["Video","Infographic","Gallery"],
		"Story":[],
		"Video":[{"Button":"50 Years of Saving Lives","URL":"www.youtube.com/embed/rZIHDI7vbyw"},{"Button":"OFDA: Who we are","URL":"www.youtube.com/embed/cd41B2yWL2A"},{"Button":"Smart Compassion: Donate Responsibly","URL":"www.youtube.com/embed/14h9_9sopRA"}],
		"Infographic":[{"Button":"DC Graphic","Name":"graphic.jpg","Hyperlink":"http://www.usaid.gov/sites/default/files/documents/1866/Disaster-Response-Infographic-10.31.12.pdf"}],
		"Gallery":[{"Button":"DC","Folder":"Gallery"}],
		"type":"N/A",
		"fullname":"Washington, DC",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[]
		},
	"DJI":{
		"cat":"regional",
		"catName":"Horn of Africa",
		"catID":"horn",
		"year":2011,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Djibouti",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},
	"CRI":{
		"cat":"country",
		"year":1963,
		"options":["Story"],
		"Story":[{"Button":"5 Ways USAID is Preparing for Hurricane Season","Name":"cri.html"}],
		"Video":[],
		"Infographic":[],
		"type":"volcano",
		"fullname":"Costa Rica",
		"tagline":"The devastating destruction caused by the 1963 Irazu volcano eruption was witnessed by President John F. Kennedy and paved the way for OFDA's creation by underscoring the need for a lead U.S. agency to oversee foreign disaster response. Now, Costa Rica is home to one of OFDA's regional offices and is a hub for disaster risk reduction work in the region.",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},
	"SLV":{
		"cat":"country",
		"year":2001,
		"options":["Story"],
		"Story":[{"Button":"No Name","Name":"El_Salvador.html"}],
		"Video":[],
		"disasterarray":{
			"magnitude":7.6,
			"depth":60, //in km
			"epicenter":[-88.66,13.04],//Long Lat
			},
		"disasterarray2":{
			"magnitude":6.6,
			"depth":10, //in km
			"epicenter":[-88.93,13.67],//Long Lat
			},
		"Infographic":[],
		"type":"quake",
		"fullname":"El Salvador",
		"tagline":"In 2001, 2 earthquakes exactly 1 month apart rattled El Salvador and left a wake of destruction. Nearly 1.6 million people were affected and more than 300,000 homes were reduced to rubble. OFDA responded by helping to build more than 22,000 shelters.",
		"ovTagline":"Earthquakes hit on January 13 & February 13, 2001",
		"ovElements":[["killed","1,159",""],["affected","1.59","MILLION"],["shelters","22,005",""]]
		
		},
	"FLA":{
		"id":"FLA",
		"xyz":[133.81,293.13,3],
		"cat":"country",
		"year":0,
		"options":["Video", "Story"],
		"Story":[{"Button":"Wall of Wind Helps USAID Test Shelters for Hurricane","Name":"fla.html"}],
		"countries":"#FLA",
		"Video":[{"Button":"Plan","URL":"www.youtube.com/embed/MZVo552nbwA"}],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Florida",
		"tagline":"The Sunshine State is the location of one of OFDA's strategically located warehouses stockpiled with emergency relief supplies. It's also where OFDA works with Florida International University to test the strength & design of emergency shelters in the Wall of Wind.",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},	
	"GTM":{
		"cat":"country",
		"year":1976,
		"options":["Story"],
		"Story":[{"Button":"Training Tecpan in Disaster Response","Name":"gtm.html"}],
		"Video":[],
		"Infographic":[],
		"type":"quake",
		"disasterarray":{
			"magnitude":7.5,
			"depth":5, //in km
			"epicenter":[-89.1,15.32],//Long Lat
			},
		"fullname":"Guatemala",
		"tagline":"On February 4, 1976, a magnitude 7.6 earthquake shook Guatemala City and surrounding areas. Affecting nearly 5 million people, it proved to be one of the worst natural disasters in Central America's modern history.",
		"ovTagline":"Earthquake on February 4, 1976",
		"ovElements":[["affected","4.9","MILLION+"],["killed","23,000",""],["homeless","1.1","MILLION+"]]

		},
	"GIN":{
		"cat":"regional",
		"catName":"ebola",
		"year":2011,
		"catID":"ebola",
		"options":["Story"],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Equatorial Guinea",
		"tagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},	
	"HTI":{
		"cat":"country",
		"year":2010,
		"options":["Story","Infographic","Gallery","Video"],	
		"Story":[{"Button":"Helping Communities Rebuild","Name":"Haiti.html"},{"Button":"Preparing for Future Disasters in Haiti","Name":"Haiti_IOM.html"}],
		"Video":[{"Button":"No Name","URL":"www.youtube.com/embed/ABFznvUs1Ds"}],
		"Infographic":[{"Button":"Anatomy of Cholera Treatment Facility","Name":"graphic.jpg","Hyperlink":"http://pdf.usaid.gov/pdf_docs/pdacu444.pdf"}],
		"Gallery":[{"Button":"Jamaica versus Hurricanes","Folder":"Gallery"}],
		"type":"quake",
		"disasterarray":{
			"magnitude":7,
			"depth":25, //in kilometers
			"epicenter":[-72.533,18.457],//Longitude Latitude
			},
		"fullname":"Haiti",
		"tagline":"On January 12, 2010, a magnitude 7.0 earthquake shook Haiti, killing 316,000 people and displacing 1.5 million others. In October 2010, cholera broke out, resulting in nearly 704,000 reported cases and in the death of more than 8,500 people.",
		"ovTagline":"Earthquake on January 12, 2010",
		"ovElements":[["killed","316,000",""],["displaced","1.5","MILLION"],["affected","3","MILLION"]]
	},	
	"HND":{
		"cat":"country",
		"year":1998,
		"options":["Story"],		
		"Story":[{"Button":"Reflections on Hurricane Mitch","Name":"hnd.html"}],
		"Video":[],
		"Infographic":[],
		"type":"storm",
		"fullname":"Honduras",
		"tagline":"Hurricane Mitch was the most powerful and destructive hurricane of the 1998 Atlantic Hurricane Season, killing nearly 10,000 people and destroying nearly 100,000 homes.",
		"ovTagline":"Hurricane Mitch struck October to November 1998",
		"ovElements":[["affected","3.6", "MILLION"],["killed","10,000",""],["housedestroy","100,000", ""]]

	},
	"IDN":{
		"cat":"both",
		"catName":"Indian Ocean Tsunami",
		"catID":"io_tsunami",
		"year":2004,
		"options":["Story","Video"],
		"Story":[{"Button":"Learning to Map Risk in Indonesia","Name":"idn.html"},{"Button":"A Tragedy Averted: Early Warnings Save Lives","Name":"idn2.html"}],
		"Video":[{"Button":"Plan","URL":"www.youtube.com/embed/sk57TjjdcCY"}],
		"Infographic":[],
		"type":"DRR",
		"fullname":"Indonesia",
		"tagline":"With more than 3 million people living within 6 miles of an active volcano, Indonesia has the most people at risk from volcanoes in the world. On October 26, 2010, Mt. Merapi had its <span style=color:#FFCB36;font-weight:bold>largest eruption</span> in 100+ years.",
		"ovTagline":"Mt. Merapi began erupting October 26, 2010",
		"ovElements":[["evacuated","400,000",""],["saved","15,000",""],["killed","386",""]]

		},	
	"IND":{
		"cat":"both",
		"catID":"io_tsunami",	
		"year":1999,
		"options":["Story"],		
		"Story":[{"Button":"Preparing for Cyclones","Name":"ind.html"}, {"Button":"A Tale of Two Cyclones","Name":"ind2.html"}],
		"Video":[],
		"Infographic":[],
		"type":"storm",
		"fullname":"India",
		"tagline":"In October 1999, <span style=color:#FFCB36;font-weight:bold>twin cyclones</span> hit the eastern coast of India within 2 weeks, killing nearly 10,000 people and affecting almost 14 million others. Since then, OFDA has worked with India on programs that have reduced the risk cyclones pose to lives and livelihoods.",
		"ovTagline":"Cyclones hit eastern coast October 1999",
		"ovElements":[["2weeks","2", "CYCLONES"],["killed","10,000",""],["affected","14", "MILLION"]]
	},

	"IRQ":{
		"cat":"country",
		"year":2001,
		"options":["Story"],
		"Story":[{"Button":"Healthcare, Water, and Shelter in Iraq","Name":"irq.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Iraq",
		"tagline":"After Saddam Hussein's regime was toppled in March 2003, continuing violence worsened an already bleak humanitarian situation. OFDA staff were the 1st U.S. non-military personnel to land in Baghdad, where they coordinated efforts to provide $451 million in aid over the next 9 years.",
		"ovTagline":"Iraq U.S.-led operation began on March 20, 2003",
		"ovElements":[["displaced","2.8","MILLION"],["aid","$451","MILLION"]]

	},
	"JAM":{
		"cat":"country",
		"year":2004,		
		"options":["Story","Gallery","Video"],		
		"Story":[{"Button":"Guiding America's Compassionate Spirit","Name":"jam.html"},{"Button":"How Rap Music is Saving Lives","Name":"Jamaica.html"}],
		"Video":[{"Button":"No Name","URL":"www.youtube.com/embed/RJCtGynocPg"}],
		"Infographic":[],
		"Gallery":[{"Button":"Jamaica versus Hurricanes","Folder":"Gallery"}],
		"type":"storm",
		"fullname":"Jamaica",
		"tagline":"Jamaica has been hit by some 50 hurricanes and tropical storms since the late 1800s. Hurricane Ivan, which hit in September 2004, is among the most damaging storms in the island's recorded history.",
		"ovTagline":"Hurricane Ivan struck on September 10 & 11, 2004",
		"ovElements":[["killed","18",""],["affected","350,000",""],["damage","$595","MILLION"]]
		},
	"JPN":{
		"cat":"country",
		"year":2011,
		"options":["Story", "Infographic"],
		"Story":[{"Button":"Versatility and Leadership in the Face of an Unmatched Disaster","Name":"jpn.html"}],
		"Video":[],
		"Infographic":[{"Button":"Consequences of Nuclear Disasters","Name":"graphic.jpg","Hyperlink":"http://pdf.usaid.gov/pdf_docs/pdacu444.pdf"}],
		"type":"quake",
		"disasterarray":{
			"magnitude":9,
			"depth":30, //in km
			"epicenter":[142.369,38.233],//Long Lat
			},
		"fullname":"Japan",
		"tagline":"On March 11, 2011, a tsunami produced by a magnitude 9.0 earthquake struck the Fukushima Daiichi power plant, creating one of the most severe nuclear meltdowns in history. This marked the first time OFDA responded following a major nuclear crisis.",
		"ovTagline":"Earthquake and tsunami struck on March 11, 2011",
		"ovElements":[["killed","19,000",""],["displaced","350,000",""],["damage","$212.5","BILLION"]]
		},
	"KOS":{
		"cat":"country",
		"year":1998,
		"options":["Story"],
		"Story":[{"Button":"Out from the Cold: Repairing Homes Destroyed During War","Name":"kos.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Kosovo",
		"tagline":"Conflict in Kosovo between February 1998 and June 1999 displaced hundreds of thousands of ethnic Albanians, resulting in the need for emergency assistance. The humanitarian crisis continued when people returned to their villages, only to find 1/3 of homes were damaged or destroyed.",
		"ovTagline":"Conflict broke out in February 1998",
		"ovElements":[["killed","10,000+",""],["displacedKosovo","500,000",""],["homes","365,000",""]]
		},
	"LBN":{
		"cat":"country",
		"year":1975,
		"options":["Story"],
		"Story":[{"Button":"No Name Yet","Name":"Lebanon.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Lebanon",
		"tagline":"Sectarian conflict erupted in 1975 following violence between Christian and Muslim armed groups. The ensuing 15-year civil war resulted in the deaths of approximately 150,000 people and significantly damaged Lebanon's infrastructure and economy.",
		"ovTagline":"Conflict broke out in 1975",
		"ovElements":[["killed","150,000",""],["violence","1","MILLION"],["missing","17,000",""]]
		},
	"LBR":{
		"cat":"regional",
		"catName":"ebola",
		"year":2011,
		"catID":"ebola",
		"options":["Story"],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Liberia",
		"tagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"LBY":{
		"cat":"country",
		"year":2011,
		"options":["Story", "Infographic"],
		"Story":[{"Button":"Saving Lives in Libya","Name":"lby.html"}],
		"Video":[],
		"Infographic":[{"Button":"Medical Assistance Saves Lives in Libya","Name":"graphic.jpg","Hyperlink":"http://pdf.usaid.gov/pdf_docs/pdacu444.pdf"}],
		"type":"complex",
		"fullname":"Libya",
		"tagline":"In February 2011, an uprising in Libya led to escalating conflict  that uprooted entire communities, cut off supply routes, and left the Libyan people facing shorages of food, water, and fuel. OFDA's response focused on delivering critical medical assistance.",
		"ovTagline":"Conflict broke out February 2011",
		"ovElements":[["healthcare","10,000+",""],["surgeries","3,860",""],["facilities","78",""]]
		
		},
	"LKA":{
		"cat":"regional",
		"catName":"Indian Ocean Tsunami",
		"catID":"io_tsunami",
		"year":2004,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Sri Lanka",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},
	"MRT":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Mauritania",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"MYS":{
		"cat":"regional",
		"catName":"Indian Ocean Tsunami",
		"catID":"io_tsunami",
		"year":2004,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Malaysia",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},
	"MLI":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Mali",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"MEX":{
		"cat":"country",
		"year":1985,
		"options":["Story"],
		"Story":[{"Button":"OFDA's Leading Role in International Urban Search�and�Rescue","Name":"mex.html"}],
		"Video":[],
		"Infographic":[],
		"type":"quake",
		"disasterarray":{
			"magnitude":8.3,
			"depth":0, //in km
			"epicenter":[-102.5,17.6],//Long Lat
			},
		"fullname":"Mexico",
		"tagline":"On September 19, 1985, a magnitude 8.1 earthquake struck near Mexico City, causing more than 400 buildings to collapse and contributing to more than 10,000 deaths and 30,000 injuries. After this quake, OFDA began including search and rescue as part of its humanitarian efforts.",
		"ovTagline":"Earthquake on September 19, 1985",
		"ovElements":[["killed","10,000+",""],["injured","30,000",""],["buildingdestroy","400+",""]]
		},
	"MKD":{
		"cat":"country",
		"year":1963,
		"options":["Story"],
		"Story":[{"Button":"No name yet","Name":"Macedonia.html"}],
		"Video":[],
		"Infographic":[],
		"type":"quake",
		"disasterarray":{
			"magnitude":6.1,
			"depth":6, //in km
			"epicenter":[22.66,42.16],//Long Lat
			},
		"fullname":"Macedonia",
		"tagline":"The magnitude 6.0 earthquake in July 1963 that killed over 1,000 people and destroyed 75% of the city of Skopje revealed coordination challenges in providing disaster assistance that eventually lead to the establishment of OFDA.",
		"ovTagline":"Earthquake on July 26, 1963",
		"ovElements":[["killed","1,100",""],["affected","3,383",""],["percentbuildings","75%","OF BUILDINGS"]]

		},
	
	"NPL":{
		"cat":"country",
		"year":1900,
		"options":["Video"],		
		"Story":[],
		"Video":[{"Button":"Red Panda PSA on DRR in Nepal","URL":"www.youtube.com/embed/B_uSwAXkerA"}],
		"Infographic":[],
		"type":"DRR",
		"fullname":"Nepal",
		"tagline":"Nepal is one of the world's most disaster prone countries, where natural disasters over the past 100 years have affected almost 10 million people. Prepardness is vital to help people who face a threat of flooding, landslides, avalanches, and earthquakes.",
		"ovTagline":"Natural Disasters (1900 - present)",
		"ovElements":[["killed","23,153", ""],["affected","9.9","MILLION"],["damage","$1.3", "BILLION"]]
		},

	"NZL":{
		"cat":"country",
		"year":2011,
		"options":["Video","Story"],
		"Story":[{"Button":"Beyond the Statistics","Name":"NewZealandStory1.html"},{"Button":"Providing Strategic Humanitarian Assistance in Developed Countries","Name":"NewZealandStory2.html"}],
		"Video":[{"Button":"US Rescue Team Searches for Christchurch Survivors","URL":"www.youtube.com/embed/c74hLJkHo9A?list=UUDbxSapoMYF0hUNTTpCY3Dw"}],
		"Infographic":[],
		"type":"quake",
		"disasterarray":{
			"magnitude":6.3,
			"depth":5, //in km
			"epicenter":[172.7012,-43.5834],//Long Lat
			},
		"fullname":"New Zealand",
		"tagline":"On February 22, 2011, a magnitude 6.1 earthquake rocked Christchurch, the country's 2nd largest city. OFDA sent urban search and rescue teams to locate survivors and help coordinate search efforts.",
		"ovTagline":"Earthquake on February 22, 2011",
		"ovElements":[["killed","181",""],["affected","301,500",""],["damage","$15","BILLION"]]

		},
	"NER":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Niger",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]
		},
	"NGA":{
		"cat":"both",
		"catName":"Sahel",
		"catID":"sahel",
		"year":1967,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Nigeria",
		"tagline":"In May 1967, <span style=color:#FFCB36;font-weight:bold>ethnic tensions</span> led the southeastern state of Biafra to secede from Nigeria. Over the next 2 and a half years, the Biafran Civil War left more than 1 million people dead as a result of violence and famine.",
		"ovTagline":"Civil War from July 1967 - January 1970",
		"ovElements":[["killed","1","MILLION+"],["humanitarian","3.5","MILLION"]]
		
		},
	"PAK":{
		"cat":"country",
		"year":1975,
		"disasterarray":{
			"magnitude":7.6,
			"depth":10, //in km
			"epicenter":[73.63,34.49],//Long Lat
			},
		"options":[ "Story"],
		"Story":[{"Button":"A Day in the Life of an Aid Worker in Pakistan-Controlled Kashmir","Name":"pak.html"}],
		"Video":[],
		"Infographic":[],
		"type":"quake",
		"fullname":"Pakistan",
		"tagline":"On October 8, 2005, a magnitude 7.6 earthquake struck 60 miles from Islamabad, causing landslides, demolishing infrastructure, and leveling entire cities. In 2010, historic flooding forced more than 10% of the population to flee their homes when water covered a fifth of the country - an area larger than the states of New York and New Jersey combined.",
		"ovTagline":"Earthquake struck on October 8, 2005",
		"ovElements":[["killed","73,338",""],["affected","5.1","MILLION"],["economicdamages","$5.2","BILLION"]]
		},
		
	"PHL":{
		"cat":"country",
		"year":2013,
		"options":["Story","Video", "Infographic"],
		"Story":[{"Button":"Strengthening the Philippines through USAID relief","Name":"phl_final.html"}, {"Button":"Helping Typhoon-Affected Families in the Philippines Return Home","Name":"phl2.html"}],
		"Video":[{"Button":"Plan","URL":"www.youtube.com/embed/oCK9IRLCky4"}],
		"Infographic":[{"Button":"U.S. Government Humanitarian Aid to the Filipino","Name":"graphic.jpg","Hyperlink":"http://www.usaid.gov/sites/default/files/documents/1866/05.21.14_YolandaRMT_Infographic_FINAL.pdf"}],
		"type":"storm",
		"fullname":"Philippines",
		"tagline":"On November 8, 2013, Typhoon Haiyan - known locally as Typhoon Yolanda - made landfall in the central Philippines. Considered one of the most powerful storms ever to make landfall, Haiyan brought flooding, triggered landslides, and caused widespread damage.",
		"ovTagline":"Typhoon Haiyan struck on November 8, 2013",
		"ovElements":[["affected","16", "MILLION"],["displaced","4.1", "MILLION"],["killed","6,201", ""]],
	},
	"RWA":{
		"cat":"country",
		"year":1944,
		"options":["Story"],
		"Story":[{"Button":"Providing Medical Care During the Rwandan Genocide", "Name":"rwa.html"}],
		"Video":[],
		"Infographic":[],
		"type":"complex",
		"fullname":"Rwanda",
		"tagline":"During a 100 day span in 1994, one of the worst genocides in history claimed the lives of an estimated 800,000 Rwandans.",
		"ovTagline":"Conflict escalated on April 7, 1994",
		"ovElements":[["killed","800,000",""],["humanitarian","4.5","MILLION"],["displaced","2","MILLION"]]

		},
	"SEN":{
		"cat":"regional",
		"catName":"Sahel",
		"catID":"sahel",
		"year":2010-2012,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Senegal",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},

	"SDS":{
		"cat":"country",
		"year":2013,
		"options":["Gallery", "Story"],		
		"Story":[{"Button":"Reuniting Families Separated During Conflict in South Sudan","Name":"sds.html"}],
		"Video":[],
		"Infographic":[],
		"Gallery":[{"Button":"Potatoes","Name":"sds_gallery.html"}],
		"type":"complex",
		"fullname":"South Sudan",
		"tagline":"In 1988, OFDA spearheaded efforts to create Operation Lifeline, a system that allowed humanitarian assistance to reach war-torn and drought-affected areas of what is currently in South Sudan. In December 2013, conflict erupted again between South Sudanese government and rebel opposition forces. More than 1.5 million people have been forced from their homes and up to one million are at risk of famine.", 
		"ovTagline":"Conflict broke out in December 2013",
		"ovElements":[["displaced","1.5", "MILLION"],["humanitarian","40% country", ""],["insecure","7", "MILLION"]]  
		},
	"SLE":{
		"cat":"regional",
		"catName":"Ebola",
		"year":2011,
		"catID":"ebola",
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Sierra Leone",
		"tagline":"",
		"ovElements":[["hello","hello","hello"],["","",""],["","",""]]
		},
	"SOM":{
		"cat":"doubleRegional",
		"catName":["Indian Ocean Tsunami","Horn of Africa Famine"],
		"catID":["io_tsunami","horn"],
		"year":2004,
		"options":[],
		"Story":[],
		"Video":[],
		"Infographic":[],
		"type":"N/A",
		"fullname":"Somalia",
		"tagline":"",
		"ovTagline":"",
		"ovElements":[["","",""],["","",""],["","",""]]

		},
	"SDN":{
		"cat":"country",
		"year":2013,
		"options":["Story"],		
		"Story":[{"Button":"Sometimes You Need to Start with the Roads","Name":"sdn.html"}],
		"Video":[],
		"Infographic":[],
		"Gallery":[],
		"type":"complex",
		"fullname":"Sudan",
		"tagline":"In February 2003, rebels in the Darfur region took up arms against the Sudanese government over its treatment of the non-Arab population. The government's retaliation and ensuing conflict has affected more than 4.7 million people, to date.", 
		"ovTagline":"Conflict broke out in February 2013",
		"ovElements":[["affected","4.7", "MILLION"],["displaced","3", "MILLION"],["camps","1.2", "MILLION"]]  
	
		},
	"SYR":{
		"cat":"country",
		"year":2014,
		"options":["Infographic", "Story","Gallery"],
		"Story":[{"Button":"Saving a Leg and a Life","Name":"syr.html"}, {"Button":"Round-the-Clock Aid for Syrian Baby","Name":"syr2.html"}],
		"Video":[],
		"Infographic":[{"Button":"Humanitarian Assistance for the Syria Crisis","Name":"graphic.jpg","Hyperlink":"http://www.usaid.gov/sites/default/files/documents/1866/07.09.14-Syria.pdf"}],
		"Gallery":[{"Button":"Syria","Folder":"Gallery"}],
		"type":"complex",
		"fullname":"Syria",
		"tagline":"4 years of brutal civil war has left more than 12 million people in need of humanitarian assistance in Syria. Nearly 1/2 the population is displaced, and the crisis affected more than 5 million children, which is as much as the total population of Norway.",
		"ovTagline":"Conflict broke out in March 2011",
		"ovElements":[["humanitarian","12.2","MILLION"],["refugees","3+","MILLION"],["children","5.5","MILLION"]]
		},
	"THA":{
		"cat":"both",
		"catName":"Indian Ocean Tsunami",
		"catID":"io_tsunami",
		"year":2011,
		"options":["Story"],
		"Story":[{"Button":"Child-Centered Disaster Preparedness in Thailand","Name":"tha.html"}],
		"Video":[],
		"Infographic":[],
		"type":"flood",
		"fullname":"Thailand",
		"tagline":"When the <span style=color:#FFCB36;font-weight:bold>worst flooding</span> in half a century swept through Thailand in 2011 affecting 13.6 million people, OFDA provided assistance and also helped build the resilience of affected communities.",
		"ovTagline":"Flooding in 2011",
		"ovElements":[["affected","13.6","MILLION"],["killed","823",""],["economicdamages","$46","BILLION"]]

	},
	"ZMB":{
		"cat":"country",
		"year":2011,
		"options":["Story"],
		"Story":[{"Button":"Land O'Lakes Goats of Hope","Name":"Zambia1.html"}],
		"Video":[],
		"Infographic":[],
		"type":"flood",
		"fullname":"Zambia",
		"tagline":"Alternating droughts and floods devastate farmers in Zambia, who rely on crops and livestock to feed their families and make a living. With our partners, OFDA's working to build Zambians' resilience to these shocks.",
		"ovTagline":"Flooding in 2011",
		"ovElements":[["affected","13.6","MILLION"],["killed","823",""],["economicdamages","$46","BILLION"]]
	},
	"ebola":{
		"id":"ebola",
		"xyz":[350,350,10],
		"fullname":"W. Africa Ebola Outbreak",
		"year":2011,
		"options":["Story","Video"],
		"region_type":"complex",
		"Story":[{"Button":"On the Frontlines of the Ebola Response: an Inside Look at a Program to Help the Grieving","Name":"lbr.html"},{"Button":"Liberia Gripped By Ebola's Many Tentacles","Name":"Ebola2.html"},{"Button":"Profiles in Courage: Ren&eacute; Van Slate","Name":"Ebola3.html"},{"Button":"Powering the Ebola Response","Name":"Ebola4.html"}],
		"Video":[{"Button":"Plan","URL":"www.youtube.com/embed/mkoT2LuFc8Q"}],
		"Infographic":[],
		"type":"complex",
		"tagline":"On August 5, USAID deployed a Disaster Assistance Response Team to Liberia to lead the overall U.S. response to the worst Ebola outbreak in history. The outbreak is the first to hit West Africa and has been declared an international health emergency.",
		"ovElements":[["aid","$845","MILLION+"],["responders","3,000",""],["rate","55-60%",""]],
		"countries":"#SLE, #LBR, #GIN"
	},
	"io_tsunami":{
		"id":"io_tsunami",
		"xyz":[660,350,3],
		"fullname":"Indian Ocean Tsunami",
		"year":2011,
		"options":["Story"],
		"region_type":"tsunami",
		"Story":[{"Button":"Snapshots of Hope","Name":"IndianOceanTsunami.html"},{"Button":"Providing Relief in Sri Lanka","Name":"IndianOceanTsunamiGOAL.html"}],
		"Infographic":[],
		"Video":[],
		"tagline":"The deadliest tsunami in recorded history struck on December 26, 2004, killing an estimated 220,000 people and displacing more than 1.1 million people. Produced by a magnitude 9.0 earthquake, the tsunami affected at least 12 countries in the region.",
		"bothTagline":"was also impacted by the <span style=color:#FFCB36;font-weight:bold>deadliest tsunami</span> in recorded history, which hit the region in December 2004.",
		"type":"quake",
		"ovTagline":"Storm struck on December 26, 2004",
		"ovElements":[["killed","220,000",""],["displaced","1.1","MILLION"],["countriesaffected","12",""]],
		"countries":"#IDN, #IND, #SOM, #MYS, #LKA, #THA"
	},
	"sahel":{
		"id":"sahel",
		"xyz":[380,350,5],
		"fullname":"Sahel Food Insecurity",
		"year":2011,
		"options":["Story","Video"],
		"region_type":"famine",
		"Story":[{"Button":"Responding Early and Building Resilience in the Sahel","Name":"sahel.html"},{"Button":"USAID Tracks Displaced Families in Mali","Name":"mli.html"},{"Button":"Niger's Tree of Life", "Name":"ner.html"}],
		"Infographic":[],
		"Video":[{"Button":"No Name","URL":"www.youtube.com/embed/mubt2YwG4-o"}],
		"tagline":"The U.N. estimates 20 million people in West Africa's Sahel region are currently on the brink of starvation. In 2012, a combination of drought, conflict, failed crops, insect plague and high food prices led to a food insecurity crisis in the region.",
		"bothTagline":"was also affected by the <span style=color:#FFCB36;font-weight:bold>drought</span> that hit the Sahel region in 2012, which left more than 1 million children malnourished.",
		"type":"famine",
		"ovTagline":"Chronic food insecurity (2012 - present)",
		"ovElements":[["affected","20","MILLION"],["mal","1","MILLION+ children"]],
		"countries":"#MRT,#SEN, #MLI, #BFA, #NGA, #NER, #TCD"
	},
	"horn":{
		"id":"horn",
		"xyz":[520,390,7],
		"fullname":"Horn of Africa Drought",
		"year":2011,
		"options":["Story"],
		"region_type":"famine",
		"Story":[{"Button":"Reflections on the Humanitarian Response in the Horn","Name":"horn.html"}],
		"Infographic":[],
		"Video":[],
		"tagline":"In 2011, ongoing conflict and the worst drought in 60 years affected 13 million people in the Horn of Africa, more than the populations of NYC and LA combined. This led the U.N. to declare a famine in Somalia and prompted a vast humanitarian response to the region.",
		"bothTagline":"was also affected by the 2011 Horn of Africa <span style=color:#FFCB36;font-weight:bold>drought</span>, which was the worst in 60 years.",
		"type":"famine",
		"ovTagline":"Drought led to famine declaration in 2011",
		"ovElements":[["affected","13","MILLION"],["countriesimpacted","4",""],["worst","60",""]],
		"countries":"#DJI,  #ETH,  #SOM, #KEN"
	}
};

var  points = [
	["DC",[-77.03666,38.89511]],
//	["DC",[77.03666,-38.89511]],
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
	} else if (type === "country" || type === "both"  ) {
		click = function(){country_clicked(selection);}; 
		color = "#" + selection.id; 
		selectionName = selection.id;
		headline = featuredJSON[selection.id].fullname;
		tagline = featuredJSON[selection.id].tagline;
	} else if (type === "florida") {
		click = function(){		
			var FLA = featuredJSON.FLA;
			d3.selectAll(".popDetail, #tooltipImg, .popName, .another").remove();
			tooltip.style("opacity",0).style("width","0px");	
			zoom(FLA.xyz);
			contentDialog(FLA.id);
			isGlobal(FLA.xyz, FLA.countries);
			testDialog(dialogOptionBoolean,null);
			}; 
			color = "#FLA";
			selectionName = "FLA";
			headline = featuredJSON.FLA.fullname;
			tagline = featuredJSON.FLA.tagline;
	} else if (type === "regional") {
		click = function() {zoomRegion(featuredJSON[featuredJSON[selection.id].catID]);};
		color = featuredJSON[featuredJSON[selection.id].catID].countries;
		selectionName =  featuredJSON[selection.id].catID;
		headline = featuredJSON[featuredJSON[selection.id].catID].fullname;
		tagline = featuredJSON[featuredJSON[selection.id].catID].tagline;	
	} else if (type === "invisible" ) {
		color = "#" + selection.id; 
		click = function(){country_clicked(selection);}; 
		selectionName = selection.id;
		headline = featuredJSON[selection.id].fullname;
		tagline = featuredJSON[selection.id].tagline;
		console.log(headline);
	} else if (type === "doubleRegional"   ) {
		click = null; 
		color = "#" + selection.id; 
		selectionName = selection.id;
		headline = featuredJSON[selection.id].fullname;
		tagline = featuredJSON[selection.id].tagline;
	} else if (type === "DC") {
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

		image.onload = function(){
			document.getElementById("tooltipImg").src = 'data/' + "countries" + "/"  + selectionName.toLowerCase() + '/popimg.jpg';};
			image.src = 'data/' + "countries"  + "/"  + selectionName.toLowerCase() + '/popimg.jpg';

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

d3.json("assets/data/countries_min.topo.json", function(error, us) {	
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
						if (featuredJSON[d.id].cat === "country" || featuredJSON[d.id].cat === "doubleRegional" || featuredJSON[d.id].cat === "both"){ 
							c =	d3.select("#" + d.id).transition().duration(500).style("fill", "#E89624");
						} else if (featuredJSON[d.id].cat === "regional"){
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
					if (featuredJSON[d.id].cat === "country" || featuredJSON[d.id].cat === "doubleRegional" || featuredJSON[d.id].cat === "both"){
						c =	d3.select(this).transition().duration(500).style("fill", "#FFCB36");
					} else if (featuredJSON[d.id].cat === "regional"){
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
			


	d3.json("data/json/DC.geojson", function (error, dc)  {
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
				
				//	d3.select("#" + d.id).transition().duration(500).style("fill", "#FFCB36");
				})	
				.on("mouseover", function (d) {					
						var c = "";		
						if (featuredJSON[d.id].cat === "country" || featuredJSON[d.id].cat === "doubleRegional" || featuredJSON[d.id].cat === "both"){ 
							c =	d3.select("#" + d.id).transition().duration(500).style("fill", "#E89624");
						} else if (featuredJSON[d.id].cat === "regional"){
							c =	d3.selectAll(featuredJSON[featuredJSON[d.id].catID].countries)
								.transition().duration(500).style("fill", "#E89624");
						}
				//	d3.select("#" + d.id).transition().duration(500).style("fill", "#E89624");
					var centroid = path.centroid(d);
					var selection = d;
				//	var type = "invisible";
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
		.data(points)
		.enter()
		.append("g")
    			.attr("transform", function(d) {
					return "translate(" + projection(d[1]) + ")";
				})
				.attr("id", function (d) {return d[0];})
				
					.on("mouseover", function(d) {	
						var centroid = projection(d[1]);
						var selection = d[0];
						
						var type = "";
						if (this.id === "DC") {
							type = "DC";
						} else {
							type = "points";
						}
						popup(centroid, selection, type); 
					})
					.attr("class",function(d) {
						return points2[d[0]].type;
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
					
					text = "<iframe name='iframe1' id='iframe1' src=\"data/countries/" + Country.toLowerCase() + "/" + ThingByName[Name].Name + "\" seamless></iframe>";
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
	dialogOptionBoolean = 0;
	d3.select("#map").select("#cdContainer").append("div")
			.attr("id","dialogBoxUnit")
				.style("margin-top","3px")
			.on("mouseover", function () {
				d3.selectAll("dialogBoxOption").remove();
			})
			.selectAll("div")
			.data(function () {
				return featuredJSON[Country].options;
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
								} else if (d[0] === "humanitarian") {
									text = "in need of humanitarian aid";
								} else if (d[0] === "affected") {
									text = "people affected";
								} else if (d[0] === "killed") {
									text = "people killed";
								} else if (d[0] === "crops") {
									text = "crops destroyed";
								} else if (d[0] === "house") {
									text = "houses damaged/destroyed";
								} else if (d[0] === "provinces") {
									text = "provinces hit";
								} else if (d[0] === "homeless") {
							 		text = "people left homeless";
								} else if (d[0] === "damage") {
							 		text = "in damages";
								} else if (d[0] === "housedestroy") {
							 		text = "houses destroyed";
								} else if (d[0] === "homes") {
							 		text = "homes damaged";
								} else if (d[0] === "displacedKosovo") {
							 		text = "people displaced in Kosovo";
								} else if (d[0] === "buildingdestroy") {
							 		text = "buildings destroyed";
								} else if (d[0] === "injured") {
							 		text = "people injured";
								} else if (d[0] === "percentbuildings") {
							 		text = "in Skopje destroyed";
							 	} else if (d[0] === "2weeks") {
							 		text = "within 2 weeks";
								} else if (d[0] === "children") {
							 		text = "children affected";
							 	} else if (d[0] === "regions") {
							 		text = "regions affected";
								} else if (d[0] === "refugees") {
							 		text = "refugees";
								} else if (d[0] === "insecure") {
							 		text = "people food insecure";
								} else if (d[0] === "shelters") {
							 		text = "temporary shelters built";
								} else if (d[0] === "affected/yr") {
							 		text = "people affected annually";
								} else if (d[0] === "displacedconflict") {
							 		text = "people displaced by conflict";
								} else if (d[0] === "buildingsdestroyedSkopje") {
							 		text = "of buildings <br> in Skopje destroyed";
								} else if (d[0] === "missing") {
							 		text = "people missing";
								} else if (d[0] === "violence") {
							 		text = "people fled violence";
							 	} else if (d[0] === "camps") {
							 		text = "people remain in camps";
							 	} else if (d[0] === "worst") {
							 		text = "years worst drought";
							 	} else if (d[0] === "mal") {
							 		text = "faced severe acute malnutrition in 2012";
							 	} else if (d[0] === "countriesimpacted") {
							 		text = "countries impacted";
							 	} else if (d[0] === "economicdamages") {
							 		text = "in economic damages";
							 	} else if (d[0] === "healthcare") {
							 		text = "patients received health care";
							 	} else if (d[0] === "rate") {
							 		text = "fatality rate";
							 	} else if (d[0] === "countriesaffected") {
							 		text = "countries affected";
							 	} else if (d[0] === "surgeries") {
							 		text = "surgeries performed";
							 	} else if (d[0] === "facilities") {
							 		text = "health facilities supported";
							 	} else if (d[0] === "evacuated") {
							 		text = "people evacuated";
							 	} else if (d[0] === "saved") {
							 		text = "people saved";
							 	} else if (d[0] === "aid") {
							 		text = "in aid";
								} else if (d[0] === "countriesaffected") {
							 		text = "countries affected";

								} else if (d[0] === "responders") {
							 		text = "U.S. responders at peak";

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
		if ( featuredJSON[d.id].type == 'storm') {
		

		contentDialog(d.id);			
		
		ov(d.id);
		xyz[2] = 6;  

		zoom2ADM(d,xyz);
			map.append("div")
				.attr("id", "dataTitle")
				.append("div").attr("id","strip").style({"background-color":"whitesmoke","width":"5px","height":"100%","left":"0px","position":"absolute"});
					
			d3.select("#dataTitle").append("div")
				.attr("id","dataTitleHTML")

		var hurrAnimation = function(track_location) {
		d3.json("data/countries/" + d.id.toLowerCase() + "/" + track_location, function(error, track) {

		//	var color_scale = d3.scale.quantile().domain([1,5]).range(colorbrewer.YlGnBu[5]);
			var color_scale = d3.scale.quantile().domain([0,1,5]).range(["white","#f48b8e","#a21015"]);
			var year = featuredJSON[d.id].year;

        		d3.select("#dataTitleHTML").html("<p><span id=\"popYear\">" + track[0].month + " " + track[0].day + ", " + year  + "</span><br>Category: <span style=\"color:" + color_scale(track[0].class) + "\">" + track[0].class + "</span></p>");
			var dateTextChange = map.select('#dataTitleHTML');
						
			//var cat = dateTextChange.select('#category');	

			var line = d3.svg.line()
				.interpolate("cardinal")
				.x(function(d) {return projection([d.lon, d.lat])[0]; })
				.y(function(d) {return projection([d.lon, d.lat])[1]; });

			var baseHurrPath = svg.append("path")
				.attr("d",line(track))
				.attr("fill","none")
				.attr("stroke","none")
				.attr("stroke-width",0);

					var hurrPathEl = baseHurrPath.node();
					var hurrPathElLen = hurrPathEl.getTotalLength();

					var pt = hurrPathEl.getPointAtLength(0);
					
					var path_g = g.append("g")
									.attr("id","hurr");

                    var icon_g = g.append("g")
                    	.attr("transform", "translate(" + pt.x + "," + pt.y + "), scale("+(0.05*track[0].class)+")")
						.attr("id","icon");
					
					var icon_bg = icon_g.append("circle")
    					.attr("r",20)
    					.attr("fill", "#ffffff")
    					.attr("class","icon");

  					var icon = icon_g.append("path")
    					.attr("d","m 20,-42 c -21.61358,0.19629 -34.308391,10.76213 -41.46346,18.0657 -7.155097,7.3036 -11.451337,17.59059 -11.599112,26.13277 0,14.45439 9.037059,26.79801 21.767213,31.69368 -14.965519,10.64929 -25.578236,6.78076 -37.671451,7.85549 C -4.429787,54.20699 14.03,37.263 23.12144,28.41572 32.2133,19.56854 34.6802,10.79063 34.82941,2.19847 c 0,-14.45219 -9.03405,-26.79679 -21.76113,-31.69364 14.90401,-10.54656 25.48889,-6.69889 37.55061,-7.77104 C 38.78869,-40.57565 29.11666,-41.95733 21.03853,-42 20.68954,-42.0105 20.34303,-42.0105 20,-42 z M 0.82306,-7.46851 c 4.72694,0 8.56186,4.27392 8.56186,9.54602 0,5.2725 -3.83492,9.54651 -8.56186,9.54651 -4.726719,0 -8.555958,-4.27401 -8.555958,-9.54651 0,-5.2721 3.829239,-9.54602 8.555958,-9.54602 z")
    
    					.attr("fill", color_scale(track[0].class))
    					.attr("class","icon");

  					var i = 0;
  
  					var animation = setInterval(function(){
      					pt = hurrPathEl.getPointAtLength(hurrPathElLen*i/track.length);
      					icon_g
        					.transition()
        					.ease("linear")
        					.duration(150) //changed from 1000
        					.attr("transform", "translate(" + pt.x + "," + pt.y + "), scale("+(0.05*track[i].class)+"), rotate("+(i*15)+")");
      					icon
        					.transition()
        					.ease("linear")
        					.duration(150) //changed from 1000

        					.attr("fill", color_scale(track[i].class));
						
      					dateTextChange
        					.html("<p><b>" + track[i].month +" " + track[i].day +", " + year + "<br>Category: <span id=\"category\" style=\"color:" + color_scale(track[i].class) + "\">" + track[i].class + "</span></p>");
								

//						cat.text(track[i].class).style("color", color_scale(track[i].class));
							

      					//Draw the path, only when i > 0 in otder to have two points
      					if (i>0){
        					var color0 = color_scale(track[i-1].class);
        					var color1 = color_scale(track[i].class);

        					var activatedTrack = [];
        
        					activatedTrack.push(track[i-1]);
        					activatedTrack.push(track[i]);

        					var color = d3.interpolateLab(color0, color1);
        					path_g.selectAll("path"+i)
        					.data(quad(sample(line(activatedTrack), 1)))
        					.enter().append("path")
          						.style("fill", function(d) { return color(d.t);})
          						.style("stroke", function(d) { return color(d.t); })
          						.attr("d", function(d) { return lineJoin(d[0], d[1], d[2], d[3], trackWidth); });
      					}
					      	i = i + 1;
          					if (i==track.length)
            					clearInterval(animation);
  					},150);
			//	var path_xyz = get_xyz(path_g);

				});
			
			
				// Sample the SVG path string "d" uniformly with the specified precision.
				var sample = function (d, precision) {
  					var path = document.createElementNS(d3.ns.prefix.svg, "path");
  					path.setAttribute("d", d);

  					var n = path.getTotalLength(), t = [0], i = 0, dt = precision;
  					while ((i += dt) < n) t.push(i);
  					t.push(n);

  					return t.map(function(t) {
    					var p = path.getPointAtLength(t), a = [p.x, p.y];
    					a.t = t / n;
    					return a;
  					});
				};

				// Compute quads of adjacent points [p0, p1, p2, p3].
				var quad = function(points) {
  					return d3.range(points.length - 1).map(function(i) {
    					var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
    					a.t = (points[i].t + points[i + 1].t) / 2;
    					return a;
 				 	});
				};

				// Compute stroke outline for segment p12.
				var lineJoin = function(p0, p1, p2, p3, width) {
  					var u12 = perp(p1, p2),
      					r = width / 2,
      					a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
      					b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
      					c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
      					d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

  					if (p0) { // clip ad and dc using average of u01 and u12
    					var u01 = perp(p0, p1), e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
    					a = lineIntersect(p1, e, a, b);
    					d = lineIntersect(p1, e, d, c);
  					}

					if (p3) { // clip ab and dc using average of u12 and u23
    					var u23 = perp(p2, p3), e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
    						b = lineIntersect(p2, e, a, b);
    						c = lineIntersect(p2, e, d, c);
  					}

  					return "M" + a + "L" + b + " " + c + " " + d + "Z";
					};

				// Compute intersection of two infinite lines ab and cd.
				var lineIntersect = function(a, b, c, d) {
  					var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
      					y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
      					ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  					return [x1 + ua * x21, y1 + ua * y21];
				};

				// Compute unit vector perpendicular to p01.
				var perp = function(p0, p1) {
  					var u01x = p0[1] - p1[1], u01y = p1[0] - p0[0],
      					u01d = Math.sqrt(u01x * u01x + u01y * u01y);
  					return [u01x / u01d, u01y / u01d];
				};
			}//end of the hurrAnimation
			
		if (d.id === "IND") {
			hurrAnimation("track.json");
			timerID = setTimeout(function(){ hurrAnimation("track2.json"); },2000);
	
		} else {
			hurrAnimation("track.json");
		
	
		}
   		}

		else if ( featuredJSON[d.id].type == 'quake') {		
		var zoomFactor = [1,1,0.5];
		for(var i=0; i < zoomFactor.length; i++) {
				xyz[i] = zoomFactor[i] * xyz[i];
		}	



			contentDialog(d.id);			
			zoom2ADM(d,xyz); 			
			ov(d.id);

		setTimeout(function() {			
			g.append("circle")
    			.attr("class", "dot")
				.style("opacity",0)
				.transition().delay(700)
    	//		.attr("transform", "translate(" + projection(featuredJSON[d.id].disasterarray.epicenter) + ")")
				.attr("cx", projection(featuredJSON[d.id].disasterarray.epicenter)[0])
				.attr("cy",projection(featuredJSON[d.id].disasterarray.epicenter)[1])
				.style("fill","#c7141a")
    			.attr("r", 6 / xyz[2])
				.style("opacity",1);			
			animation = setInterval(function() {
  				g.append("circle")
      				.attr("class", "ring")
      				.attr("transform", "translate(" + projection(featuredJSON[d.id].disasterarray.epicenter) + ")")
      			//	.attr("r", 0)
					.attr("r", featuredJSON[d.id].disasterarray.magnitude * 18 / xyz[2])
					.attr("r", 4 / xyz[2] )
      				.style("stroke-width", 3 / xyz[2])
      				.style("stroke", "red")
    			.transition()
      				.ease("linear")
      				.duration(6000)
      				.style("stroke-opacity", 1e-6)
      				.style("stroke-width", 1 / xyz[2]) 
      				.style("stroke", "brown")
      			//	.attr("r", 160 / xyz[2] )
					.attr("r", featuredJSON[d.id].disasterarray.magnitude * 18 / xyz[2])
      				.remove();
			}, 800);
			d3.selectAll(".background, #globeContainer, .notFeatured")
				.on("click.stop", function() {
					clearInterval(animation);		
					clearInterval(animation2);		
					svg.selectAll(".dot").remove();
					svg.selectAll(".ring").remove();
					d3.selectAll(".background, #globeContainer, .notFeatured")
						.on("click.stop", null);
					
				});

			},200);
	
		

	if (d.id === "SLV") {
	
		setTimeout(function() { 
		setTimeout(function() {			
			g.append("circle")
    			.attr("class", "dot")
				.style("opacity",0)
				.transition().delay(700)
    	//		.attr("transform", "translate(" + projection(featuredJSON[d.id].disasterarray.epicenter) + ")")
				.attr("cx", projection(featuredJSON[d.id].disasterarray2.epicenter)[0])
				.attr("cy",projection(featuredJSON[d.id].disasterarray2.epicenter)[1])
				.style("fill","#c7141a")
    			.attr("r", 6 / xyz[2])
				.style("opacity",1);			
			animation2 = setInterval(function() {
  				g.append("circle")
      				.attr("class", "ring")
      				.attr("transform", "translate(" + projection(featuredJSON[d.id].disasterarray2.epicenter) + ")")
      			//	.attr("r", 0)
					.attr("r", 4 / xyz[2] )
      				.style("stroke-width", 3 / xyz[2])
      				.style("stroke", "red")
    			.transition()
      				.ease("linear")
      				.duration(6000)
      				.style("stroke-opacity", 1e-6)
      				.style("stroke-width", 1 / xyz[2]) 
      				.style("stroke", "brown")
      			//	.attr("r", 160 / xyz[2] )
					.attr("r", featuredJSON[d.id].disasterarray2.magnitude * 18 / xyz[2])
      				.remove();
			}, 800);
					

			},200);


		 },700 );
	}
		}

		else if ( featuredJSON[d.id].type == "complex" || featuredJSON[d.id].type == "flood" || featuredJSON[d.id].type == "volcano" || featuredJSON[d.id].type == "famine" || featuredJSON[d.id].type == "DRR" ) {
			contentDialog(d.id);
			console.log(d.id);	
	//		g.selectAll( "#" + d.id ).classed(".hide");
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


