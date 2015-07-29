from cork import Cork
from cork.backends import SQLiteBackend

sb = SQLiteBackend('users.db', initialize=True)
aaa = Cork(backend=sb,smtp="saegeritup:B0hem0th@smtp.gmail.com:465", sender="saegeritup@gmail.com")

authorize = aaa.make_auth_decorator(fail_redirect="/login", role="user")

@bottle.post('/login')
def login():
	username = post_get('username')
	password = post_get('password')
	aaa.login(username, password, success_redirect='/',fail_redirect='/login'


