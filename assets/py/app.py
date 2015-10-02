
#!/usr/bin/env python
#
# Copyright (C) 2013 Federico Ceratto and others, see AUTHORS file.
# Released under LGPLv3+ license, see LICENSE.txt
#
# The following users are already available:
#  admin/admin, demo/demo

from bottle import Bottle, run, post, request, static_file
from bs4 import BeautifulSoup
import boto3 as boto
import sys
import os
import urllib2
import csv
import datetime
import bottle
from beaker.middleware import SessionMiddleware
from cork import Cork
import logging
import json
import re
from copy import deepcopy
from collections import OrderedDict
logging.basicConfig(format='localhost - - [%(asctime)s] %(message)s', level=logging.DEBUG)
log = logging.getLogger(__name__)
bottle.debug(True)


#boto commands
#s3 = boto.connect_s3()
#bucket = s3.get_bucket('ofda-map')


# Use users.json and roles.json in the local example_conf directory

s3 = boto.resource('s3')
bucket = s3.Bucket('ofda-map')

aaa = Cork('users', email_sender='ofdamap@gmail.com', smtp_url='starttls://ofdamap:vbxnlrzbqmkfaezc@smtp.gmail.com:587')

app = bottle.app()
session_opts = {
    'session.cookie_expires': True,
    'session.encrypt_key': 'please use a random key and keep it secret!',
    'session.httponly': True,
    'session.timeout': 3600 * 24,  # 1 day
    'session.type': 'cookie',
    'session.validate_key': True,
}
app = SessionMiddleware(app, session_opts)

checkdict={}
with open('ISO.csv') as f:
	csv_file = csv.reader(f)
	checklist = list(csv_file)
 
	for row in checklist:
		row[1] = [unicode(x, 'latin-1').lower() for x in row[1].strip('[,]').split(',')]
		

checklist = checklist[1:]
floridas = ['florida','florida','florida','florida','florida','florida']
floridas = [i.decode('UTF-8') for i in floridas]
checklist.append(['FLA',floridas])

#order dict

for x in checklist:
	checkdict[x[0]]=x[1]

checkdict = OrderedDict(sorted(checkdict.items(), key=lambda t: t[1][0]))

#############################
# #  Bottle methods  # #

	
def postd():
    return bottle.request.forms


def post_get(name, default=''):
    return bottle.request.POST.get(name, default).strip()
def post_getall(name):
#	countries =  ['#' + s for s in bottle.request.POST.getall(name)]
#	countries = ', '.join(countries)
	return [s for s in bottle.request.POST.getall(name)]	
#	return countries


@bottle.post('/login')
def login():
    """Authenticate users"""
    username = post_get('username')
    password = post_get('password')
    aaa.login(username, password, success_redirect='/', fail_redirect='/login')

@bottle.route('/user_is_anonymous')
def user_is_anonymous():
    if aaa.user_is_anonymous:
        return 'True'

    return 'False'

@bottle.route('/logout')
def logout():
    aaa.logout(success_redirect='/login')


@bottle.post('/register')
def register():
    """Send out registration email"""
    aaa.register(post_get('username'), post_get('password'), post_get('email_address'))
    return 'Please check your mailbox.'


@bottle.route('/validate_registration/:registration_code')
def validate_registration(registration_code):
    """Validate registration, create user account"""
    aaa.validate_registration(registration_code)
    return 'Thanks. <a href="/login">Go to login</a>'


@bottle.post('/reset_password')
def send_password_reset_email():
    """Send out password reset email"""
    aaa.send_password_reset_email(
        username=post_get('username'),
        email_addr=post_get('email_address')
    )
    return 'Please check your mailbox.'


@bottle.route('/change_password/:reset_code')
@bottle.view('password_change_form')
def change_password(reset_code):
    """Show password change form"""
    return dict(reset_code=reset_code)


@bottle.post('/change_password')
def change_password():
    """Change password"""
    aaa.reset_password(post_get('reset_code'), post_get('password'))
    return 'Thanks. <a href="/login">Go to login</a>'


@bottle.route('/')
def index():
    """Only authenticated users can see this"""
    aaa.require(fail_redirect='/login')
    return 'Welcome! <br> <a href="/admin">Admin page </a> <br> <a href="/input"> Input page </a> <br> <a href="/logout">Logout</a>'


@bottle.route('/restricted_download')
def restricted_download():
    """Only authenticated users can download this file"""
    aaa.require(fail_redirect='/login')
    return bottle.static_file('static_file', root='.')


@bottle.route('/my_role')
def show_current_user_role():
    """Show current user role"""
    session = bottle.request.environ.get('beaker.session')
    print "Session from simple_webapp", repr(session)
    aaa.require(fail_redirect='/login')
    return aaa.current_user.role


# Admin-only pages

@bottle.route('/admin')
@bottle.view('admin_page')
def admin():
    """Only admin users can see this"""
    aaa.require(role='admin', fail_redirect='/sorry_page')
    return dict(
        current_user=aaa.current_user,
        users=aaa.list_users(),
        roles=aaa.list_roles()
    )


@bottle.post('/create_user')
def create_user():
    try:
        aaa.create_user(postd().username, postd().role, postd().password)
        return dict(ok=True, msg='')
    except Exception, e:
        return dict(ok=False, msg=e.message)


@bottle.post('/delete_user')
def delete_user():
    try:
        aaa.delete_user(post_get('username'))
        return dict(ok=True, msg='')
    except Exception, e:
        print repr(e)
        return dict(ok=False, msg=e.message)


@bottle.post('/create_role')
def create_role():
    try:
        aaa.create_role(post_get('role'), post_get('level'))
        return dict(ok=True, msg='')
    except Exception, e:
        return dict(ok=False, msg=e.message)


@bottle.post('/delete_role')
def delete_role():
    try:
        aaa.delete_role(post_get('role'))
        return dict(ok=True, msg='')
    except Exception, e:
        return dict(ok=False, msg=e.message)


# Static pages

@bottle.route('/login')
@bottle.view('login_form')
def login_form():
    """Serve login form"""
    return {}


@bottle.route('/sorry_page')
def sorry_page():
    """Serve sorry page"""
    return '<p>Sorry, you are not authorized to perform this action</p>'



@bottle.route('/input')
@bottle.view('content_input')
def input():
	
	aaa.require(role='admin', fail_redirect='/login')
	control = []
	with open('control.json','r') as j:
		control = json.loads(j.read())
	controlJS = json.dumps(control, ensure_ascii=False, encoding='utf8')

	
	return dict(
		current_user=aaa.current_user,
		jsons=control,
		check=checkdict,
		jsonJS=controlJS
	)
		
@bottle.post('/img_upload')
def img_upload():
	try:
		upload  = request.files.get('popup')
		name, ext = os.path.splitext(upload.filename)
		if ext not in ('.png','.jpg','.jpeg','.pdf'):
			return 'File extension not allowed.'

		save_path = "../img/popup/"
		upload.save(save_path, "overwrite=True") # appends upload.filename automatically

		return dict(ok=True, msg= '')
	except Exception as e:
		return dict(ok=False, msg=e)



@bottle.post('/delete_content')
def delete_content():
		
		
	try:
		with open('control.json','r') as j:
			control = json.loads(j.read())
			postcontrol = deepcopy(control)

#		content = re.sub(bottle.request.json(),'=on','').split('&')
		string = (post_get("hidden"))
		files = string.split(",")
		for x in files:
			os.remove('../../_posts/' + x + '.html')
		
			for key, value in control.iteritems():
				if control[key]["Story"].get(x):
					if len(control[key]["Story"]) < 2:
						del postcontrol[key]
					else:
						del postcontrol[key]["Story"][x]
		

		

		with open('control.json','w') as j:
			j.write(json.dumps(postcontrol, ensure_ascii=False).encode('utf8'))

		return dict(ok=True, msg= '')
	except Exception as e:
		return dict(ok=False, msg=e)


		

@bottle.route('/assets/data/<filename>')
def serve_geojson(filename):
	return static_file(filename, root='../data')

@bottle.route('/assets/js/<filename>')
def serve_js(filename):
	return static_file(filename, root='../js')

@bottle.route('/<filename:re:.*\.json>')
def serve_json(filename):
	return static_file(filename, root='./')


@bottle.route('/assets/img/<filename>')
def serve_img(filename):
	return static_file(filename, root='../img')

	
@bottle.route('/assets/fonts/<filename>')
def serve_fonts(filename):
	return static_file(filename, root='../fonts', mimetype='application/x-font-otf')

@bottle.route('/assets/css/<filename:re:.*\.css>')
def serve_css(filename):
	return static_file(filename, root='../css')


@bottle.route('/<filename:re:.*\.html>')
def serve_map(filename):
	return static_file(filename, root='../../')

@bottle.post('/scrape')
def scrape():
	with open('control.json','r') as j:
		control = json.loads(j.read())
	try:

		
		isocode = post_get('country')
		story_url = post_get('Story')
		video_url = post_get('Video')
		active = post_get('active')
		dtype = post_get('type')
		video_title = post_get('video_title')
		region_fullname = post_get('regional_name')
		regional_countrylist = post_getall('regional-countries')
		region_id = post_get('regional_id')
		summary = post_get('tagline')
		regional_countrystring = (', ').join(['#' + x.strip() for x in regional_countrylist])
		logging.warning('summary = ' + summary + ' dtype = ' + dtype + ' isocode = ' + isocode + ' active = ' + active + ' video_url = '+ video_url + ' regional countries = ' + regional_countrystring )
		popup_upload = request.files.get('popup')
#	Check to see if Region selected
		if isocode == '' and region_id == '':
			return 'You havent selected a country or region'	
	
		cwd = os.getcwd()	
		logging.warning(regional_countrylist);
		if dtype == "country":
			path = cwd + '/../data/mapfiles/' + isocode
	
			logging.warning(path);
		elif dtype == "regional":
			path = cwd + '/../data/mapfiles/' + region_id

	

		if not os.path.exists(path):
			os.makedirs(path)

		if popup_upload != None:
			popup_name, ext = os.path.splitext(popup_upload.filename)
			if ext not in ('.png','.jpg','.jpeg'):
				return 'File extention for popup not allowed.'
			popup_upload.save(path +"/popimg.png" ,overwrite=True)
		else:
			popup_name=""
		message = ""
#		for row in checklist:
#			if country in row[1]:
#				isocode = row[0]
		

		html_doc = urllib2.urlopen(str(story_url), timeout=90)
		
		message = 'Content scraped and added to map'

		soup = BeautifulSoup(html_doc, 'html.parser')
		html_doc.close()
		for iframe in soup.find_all("iframe"):
			iframe.replace_with('')
		for relinks in soup.find_all("div", {"class" : "rellinks"}):
			relinks.replace_with('') 
		body = soup.find("div", class_="post").prettify(formatter='html').encode("ascii","xmlcharrefreplace")



		if story_url[-1] == '/':
			story_url = story_url[:-1]

		filenm = story_url.split('/')[-1].replace(' ','_')

		target = open(path + "/" +  filenm + '.html', 'w')
		css = "<link type=\"text/css\" rel=\"Stylesheet\" href=\"assets/css/impact-blog.css\"/>" 	
		#writing file
		target.write(css + body)
		target.close()

		
		date = str(datetime.datetime.now().strftime("%Y-%m-%d"))
		story_param ={'date' : date,'button': filenm.replace('_',' ')}
		video_param = {'url' : video_url, 'button':video_title} 
		#writing json
		
#iterates through json to see if the country is use and if so if the same url has already been added. If country yes but url no add appropriate data to json. Need to write json file with html:<name of html file>


		if active == "active":
			isactive = "active"
		else:
			isactive = "inactive"


		if dtype == "country":
			catID = []
			for x in control:
				if control[x]["cat"] == "regional":
					countrylist = [z.replace("#","").strip() for z in control[x]["countries"].split(",")]
					if isocode in countrylist:
						if x in control[isocode]["catID"]:
							pass
						else: 
							catID.append(x)
			
						
			control.update({isocode:{"Story":{filenm:story_param},"Video":{video_title:video_param},"catID":catID,"tagline":summary, "cat":dtype,"fullname":checkdict[isocode][0], "active":isactive}})
		elif dtype == "regional":
		
		
			control.update({region_id:{"Story":{filenm:story_param},"Video":{video_title:video_param},"tagline":summary, "cat":dtype,"fullname":region_fullname,"countries":regional_countrystring, "active":isactive}})
			
			for d in regional_countrylist:
				if d in control:
					if control[d]["active"] != "active":
						control[d]["active"] = isactive
					if region_id in control[d]["catID"]:
						pass
					else: 
						control[d]["catID"].append(region_id)
				else:
					control.update({d:{"Story":{},"Video":{},"tagline":"", "cat":"country","fullname":checkdict[d][0],"catID":[region_id], "active":"inactive"}})
	
		with open('control.json','w') as j:
			j.write(json.dumps(control, ensure_ascii=False).encode('utf8'))

		
		#writes to s3 bucket
#		bucket.put_object(
#			ACL='public-read',
#			Body=json.dumps(control, ensure_ascii=False).encode('utf8'),
#			Key="control"
#			
#		)	

		return dict(ok=True, msg='')
	except Exception, e:
		return dict(ok=False, msg=e)

	


def main():
	#Start the Bottle webapp

	bottle.debug(True)
	bottle.run(app=app, host="0.0.0.0", port=8080, quite=False, reloader=True)
#	bottle.run(app=app, host="localhost", port=8080, quite=False, reloader=True)

if __name__ == "__main__":
	main()

