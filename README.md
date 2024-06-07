# Real-Time Weather Dashboard

A responsive web application that provides real-time weather data for multiple cities using the OpenWeatherMap API. Users can view current weather conditions, forecast data, and compare weather information between two cities.

## Features

* Fetches real-time weather data for multiple cities
* Displays temperature, humidity, pressure, wind speed, and visibility
* Compares weather and forecast data between two cities
* Interactive and dynamic charts using Chart.js
* Autocomplete functionality for city input fields using jQuery UI
* Responsive design for both mobile and desktop devices
* Error handling and input validation for improved user experience

## Technologies Used

* Flask
* Chart.js
* OpenWeatherMap API
* HTML/CSS
* JavaScript
* jQuery
* jQuery UI
* Bootstrap
* Git & GitHub

## Installation


1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/real-time-weather-dashboard.git
   cd real-time-weather-dashboard
   ```
2. **Create and activate a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. **Install the required packages**:

   ```bash
   pip install -r requirements.txt
   ```
4. **Set up your OpenWeatherMap API key**:
   * Create a `config.py` file in the root directory.
   * Add the following line to `config.py`:

     ```python
     API_KEY = 'your_openweathermap_api_key'
     ```
5. **Run the Flask application**:

   ```bash
   flask run
   ```
6. **Open your browser** and navigate to `http://127.0.0.1:5000/`.

## Usage


1. **Enter a city name** in the input field and click "Get Weather" to view the current weather data.
2. **Click "Get Forecast"** to view the forecast data for the entered city.
3. **Click "Compare Cities"** to enable the comparison feature. Enter two city names and click "Compare Weather" or "Compare Forecast" to view the comparison charts.
4. **Click "Clear"** to reset the inputs and clear the charts.

## Project Structure

```perl
real_time_weather_dashboard/
├── static/
│ ├── css/
│ │ └── styles.css # Optional: if you have custom styles
│ └── js/
│ └── scripts.js # JavaScript file
├── templates/
│ └── index.html # HTML file
├── app.py # Flask app
├── weather_data.py # Weather data fetching script
├── requirements.txt # Dependencies
├── config.py # Configuration file (not included in version control)
├── .gitignore # Git ignore file
└── README.md # Readme file
```

## Contributing


1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

Your Name - [faiza.gul2002@gmail.com](mailto:faiza.gul2002@gmail.com)

GitHub - [FaizaGul2002](https://github.com/FaizaGul2002)