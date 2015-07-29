#!/usr/bin/env python
#
#
# Regenerate files in example_conf

from datetime import datetime
from cork import Cork

def populate_conf_directory():
    cork = Cork('users', initialize=True)

    cork._store.roles['admin'] = 100
    cork._store.roles['editor'] = 60
    cork._store.roles['user'] = 50
    cork._store.save_roles()

    tstamp = str(datetime.utcnow())
    username = password = 'saegeritup'
    cork._store.users[username] = {
        'role': 'admin',
        'hash': cork._hash(username, password),
        'email_addr': username + '@gmail.com',
        'desc': username + ' test user',
        'creation_date': tstamp
    }
    username = password = 'dsaeger'
    cork._store.users[username] = {
        'role': 'user',
        'hash': cork._hash(username, password),
        'email_addr': username + '@usaid.gov',
        'desc': username + ' test user',
        'creation_date': tstamp
    }
    cork._store.save_users()

if __name__ == '__main__':
    populate_conf_directory()
