from bs4 import BeautifulSoup
import sys
import os
import urllib2
import csv
import datetime



def query_yes_no(question, default=None):
    """Ask a yes/no question via raw_input() and return their answer.
    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
        It must be "yes" (the default), "no" or None (meaning
        an answer is required of the user).
    The "answer" return value is one of "yes" or "no".
    """
    valid = {"yes":True,   "y":True,  "ye":True,
             "no":False,     "n":False}
    if default == None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' "\
                             "(or 'y' or 'n').\n")


print("Hello I am going to take scrape html from the impact blog" + '\n' + "so that it can be hosted on the webmap" + '\n\n')


with open('ISO.csv') as f:
    csv_file = csv.reader(f)
    iso = list(csv_file)
    
    for row in iso:
		row[1] = [x.lower() for x in row[1].strip('[,]').split(',')]

iso = iso[1:]
 
 
while True:
	try: 
		entry = str(raw_input("What country does this article pertain to? ")).lower()
		for row in iso:
			if entry in row[1]:
				isocode = row[0]
		if isocode != None: 
			break	
	except:
		print "Didnt find that country in the list try a different spelling" 



url = raw_input("What is the url for the article on the impact blog?")

html_doc = urllib2.urlopen(str(url), timeout=90)

soup = BeautifulSoup(html_doc, 'html.parser') 

body = soup.find("div", class_="post").prettify().encode('utf-8')

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

