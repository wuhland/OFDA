from bottle import route, run, template

@route('/content')
def hello():
    return "<hi>Goodbye Wuhland</h1>"

run(host='0.0.0.0', port=8080)
