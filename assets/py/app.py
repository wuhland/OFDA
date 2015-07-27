from bottle import Bottle, run, post, request 
from bs4 import BeautifulSoup
import sys
import os
import urllib2
import csv
import datetime

app = Bottle()
@app.route('/input')
def input():
	return '''
		<p>Please enter the url of the content on usaid.gov and the country the content pertains to. </p>
		<form action='/input' method='post'>
			Country: <input name='country' type='text' />
			URL: <input name='url' type='text' />
			<input value='Submit' type='submit' />
		</form>
	'''

@app.route('/input', method='POST')
def scrape():
	country = request.forms.get('country').lower()
	url = request.forms.get('url')
	
	with open('ISO.csv') as f:
		csv_file = csv.reader(f)
		iso = list(csv_file)
    
		for row in iso:
			row[1] = [x.lower() for x in row[1].strip('[,]').split(',')]

	iso = iso[1:]
 
	isocode = "" 
	for row in iso:
		if country in row[1]:
			isocode = row[0]
	if isocode == "": 
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

	return "<p>Content scraped and added to map</p>"

app.run(reloader=True)

