# main flask appllication
from flask import Flask, render_template, jsonify
from weather_data import get_weather_data

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather/<city>')
def weather(city):
    data = get_weather_data(city)
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "Unable to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)