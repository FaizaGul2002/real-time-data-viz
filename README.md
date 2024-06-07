# Real-Time Weather Dashboard

This project is a simple web application that fetches real-time weather data from the OpenWeatherMap API and displays it using Chart.js.

## Features

* Fetches real-time weather data for any city.
* Displays temperature, humidity, and pressure in a bar chart.
* Interactive UI to enter city names and fetch data dynamically.

## Technologies Used

* Python
* Flask
* Requests
* Chart.js
* HTML/CSS
* JavaScript

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

* Python 3.6+
* Flask
* Requests

### Installation


1. **Clone the repository**:

   ```bash
   git clone https://github.com/FaizaGul/real-time-data-viz.git
   cd real-time-weather-dashboard
   ```
2. **Create and activate a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. **Install the dependencies**:

   ```bash
   pip install -r requirements.txt
   ```
4. **Create** `config.py`:

   Create a file named `config.py` in the project root directory and add your OpenWeatherMap API key:

   ```python
   # config.py
   OPENWEATHER_API_KEY = 'your_actual_api_key'
   ```

## Running the Application


1. **Run the Flask server**:

   ```bash
   python app.py
   ```
2. **Open your browser** and navigate to `http://127.0.0.1:5000/` to see the real-time weather dashboard.

## Project Structure

```perl
real-time-weather-dashboard/
├── templates/
│   └── index.html
├── config.py  # (not included in the repository)
├── weather_data.py
├── app.py
├── requirements.txt
├── venv/  # (not included in the repository)
└── README.md
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

* [OpenWeatherMap](https://openweathermap.org/) for the weather data API.
* [Chart.js](https://www.chartjs.org/) for the charting library.

  ### Additional Tips
  * **Pushing to GitHub**:
    Make sure you initialize your local repository, add the remote origin, and push the code.

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git remote add origin https://github.com/FaizaGul2002/real-time-data-viz.git
    git push -u origin main
    ```


