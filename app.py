# main flask appllication
import requests
from flask import Flask, render_template, jsonify
from weather_data import get_weather_data
from config import OPENWEATHER_API_KEY

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

@app.route('/forecast/<city>')
def forecast(city):
    api_key = OPENWEATHER_API_KEY
    url = f'http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)