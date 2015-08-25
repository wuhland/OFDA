
#!/usr/bin/env python
#
# Copyright (C) 2013 Federico Ceratto and others, see AUTHORS file.
# Released under LGPLv3+ license, see LICENSE.txt
#
# The following users are already available:
#  admin/admin, demo/demo

from bottle import Bottle, run, post, request, static_file
from bs4 import BeautifulSoup
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

logging.basicConfig(format='localhost - - [%(asctime)s] %(message)s', level=logging.DEBUG)
log = logging.getLogger(__name__)
bottle.debug(True)

# Use users.json and roles.json in the local example_conf directory
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

# reads global bariable which controls map functionality


checkdict={}
with open('ISO.csv') as f:
	csv_file = csv.reader(f)
	checklist = list(csv_file)
 
	for row in checklist:
		row[1] = [x.lower() for x in row[1].strip('[,]').split(',')]
		

checklist = checklist[1:]

for x in checklist:
	checkdict[x[0]]=x[1]

##############trying something


		
#############################
# #  Bottle methods  # #

def postd():
    return bottle.request.forms


def post_get(name, default=''):
    return bottle.request.POST.get(name, default).strip()


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
	
	return dict(
		current_user=aaa.current_user,
		json=control,
		check=checkdict
	)
		
#	return '''
#		<p>Please enter the url of the content on usaid.gov and the country the content pertains to. </p>
#		<form action='/input' method='post'>
#			Country: <input name='country' type='text' />
#			URL: <input name='url' type='text' />
#			<input value='Submit' type='submit' />
#		</form>
#	'''
	
@bottle.post('/delete_content')
def delete_content():
		
		
	try:
		with open('control.json','r') as j:
			control = json.loads(j.read())
			postcontrol = deepcopy(control)

#		content = re.sub(bottle.request.json(),'=on','').split('&')
		string = (post_get("hidden"))
		files = string.split(",")
		logging.warning('postcontrol first = ' + str(control))
		logging.warning(files)
		for x in files:
			os.remove('../../_posts/' + x + '.html')
		
			for key, value in control.iteritems():
				if key["Story"].get(x):
					if len(key["Story"]) < 2:
						del postcontrol[key]["Story"][x]
					else:
						del postcontrol[key]["Story"][x]
#		
		logging.warning('postcontrol after = ' + str(postcontrol))

		

		with open('control.json','w') as j:
			j.write(json.dumps(postcontrol, ensure_ascii=False).encode('utf8'))

		return dict(ok=True, msg= '')
	except Exception, e:
		return dict(ok=False, msg=e.message)


		

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
		country = post_get('country').lower()
		url = post_get('url')
		isocode = ""
		message = ""
		for row in checklist:
			if country in row[1]:
				isocode = row[0]
		if isocode == "": 
			message = "The country you entered is not on our list try a different spelling"
	
		html_doc = urllib2.urlopen(str(url), timeout=90)
		
		message = 'Content scraped and added to map'

		soup = BeautifulSoup(html_doc, 'html.parser') 
		html_doc.close()
		body = soup.find("div", class_="post").prettify(formatter='html').encode("ascii","xmlcharrefreplace")

		if url[-1] == '/':
			url = url[:-1]

		filenm = url.split('/')[-1].replace(' ','_')

		target = open("../../_posts/" + filenm + '.html', 'w')
	
		#writing file
		target.write(body)
		target.close()

		
		date = str(datetime.datetime.now().strftime("%Y-%m-%d"))
		param ={'date' : date} 
		#writing json
		
#iterates through json to see if the country is use and if so if the same url has already been added. If country yes but url no add appropriate data to json. Need to write json file with html:<name of html file>
		if control.get(isocode):
			if control[isocode]["Story"].get(filenm):
	
				message = "You already added this url, please remove from admin page if you would like to reload the content for some reason"
					
			else:
			#	control.update({isocode :{ filenm : {'date' : date }}}) 
				control[isocode]["Story"][filenm] =  param
		else:
			 control.update({isocode:{"Story":{filenm:param}}})
	
		with open('control.json','r+b') as j:
			j.write(json.dumps(control, ensure_ascii=False).encode('utf8'))


		

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

