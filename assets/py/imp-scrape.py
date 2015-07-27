from bottle import route, run, template, post, request 
from bs4 import BeautifulSoup
import sys
import os
import urllib2
import csv
import datetime


@route('/content')
def input():
    return
        
         <p> Hello I am going to take scrape html from the impact blog \n so that it can be hosted on the webmap \n\n please enter the country this content pertains too as well as the url for the impact-blog post </p>  
        <form action='/input' method='post'>
            Country: <input name='country' type='text' />
            URL: <input name='url' type='text' />
            <input value='Submit' type='submit' />
        </form>



def scrape():
	country = request.forms.get('country').lower()
	url = request.forms.get('url')
	
    with open('ISO.csv') as f:
        csv_file = csv.reader(f)
        iso = list(csv_file)
    
        for row in iso:
		    row[1] = [x.lower() for x in row[1].strip('[,]').split(',')]

    iso = iso[1:]
 
 
	for row in iso:
		if country in row[1]:
			isocode = row[0]
	if isocode = None: 
		return "<p>The country you entered is not on our list try a different spalling</p>"
	

	html_doc = urllib2.urlopen(str(url), timeout=90)

	soup = BeautifulSoup(html_doc, 'html.parser') 

	body = soup.find("div", class_="post").prettify(formatter='html')

	if url[-1] == '/':
		url = url[:-1]

	filenm = datetime.datetime.now().strftime("%Y-%m-%d") + "-" + url.split('/')[-1].replace(' ','_')




	target = open("../../_posts/" + filenm + '.md', 'w')

	arglist = ['country: ' + isocode]

	yaml = '---\n'
	for arg in arglist: 
		yaml += arg + '\n'

	yaml += '---\n'

	#writing file
	target.write(yaml + body)

