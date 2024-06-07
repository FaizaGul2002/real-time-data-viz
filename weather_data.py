#fetches weather data from the API
import requests
from config import OPENWEATHER_API_KEY

def get_weather_data(city):
    api_key = OPENWEATHER_API_KEY
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: Unable to fetch data (Status Code: {response.status_code})")
        return None

