from flask import Flask, send_file

app = Flask(__name__)

@app.route('/prueba1')
def prueba_1():
	return send_file('application.html')

@app.route('/prueba2')
def prueba_2():
	return send_file('application2.html')


if __name__ == "__main__":
    app.run(debug=True)