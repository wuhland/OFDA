from bottle import Bottle, run, post, request
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


logging.basicConfig(format='localhost - - [%(asctime)s] %(message)s', level=logging.DEBUG)
log = logging.getLogger(__name__)
bottle.debug(True)

# Use users.json and roles.json in the local example_conf directory
aaa = Cork('users', email_sender='saegeritup@gmail.com', smtp_url='smtp://smtp.magnet.ie')

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

def input():
	
	aaa.require(role='user', fail_redirect='/login')
	return '''
		<p>Please enter the url of the content on usaid.gov and the country the content pertains to. </p>
		<form action='/input' method='post'>
			Country: <input name='country' type='text' />
			URL: <input name='url' type='text' />
			<input value='Submit' type='submit' />
		</form>
	'''


@bottle.route('/input', method='POST')

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

def main():
	#Start the Bottle webapp

	bottle.debug(True)
	bottle.run(app=app, quite=False, reloader=True)

if __name__ == "__main__":
	main()

