from flask import Flask, send_file, Response, json, request, url_for

app = Flask(__name__)

LOGGER = app.logger

@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

@app.route('/prueba1')
def prueba_1():
	return send_file('application.html')

@app.route('/prueba2')
def prueba_2():
	return send_file('application2.html')

todos = []
count = 0

@app.route('/api/todos', methods = ['GET'])
def fetch_all():
	resp = Response(json.dumps(todos), status=200, mimetype='application/json')
	return resp

@app.route('/api/todos', methods = ['POST'])
def create():
	LOGGER.debug('Creating a new todo.')
	global count
	if request.headers['Content-Type'] == 'application/json;charset=UTF-8':
		LOGGER.debug('Getting request data...')
		todo = request.json
		LOGGER.debug(todo)
		todo['id'] = count
		count += 1
		todos.append(todo)
		resp = Response(status=201)
		resp.headers['Location'] = url_for('fetch', id=todo['id'])
	else:
		error = {
			'code' : '001',
			'message' : 'BAD REQUEST!'
		}
		resp = Response(json.dumps(error), status=500)
	return resp

@app.route('/api/todos/<int:id>')
def fetch(id):
	resp = Response(status=404)
	for todo in todos:
		if todo['id'] == id:
			resp = Response(json.dumps(todo), status=200, mimetype='application/json')

	return resp

if __name__ == "__main__":
    app.run(debug=True)