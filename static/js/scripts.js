let weatherChart;
let forecastChart;
let compareChart;

$(document).ready(function() {
    const cities = ["London", "New York", "Paris", "Tokyo", "Delhi"]; // Add more cities or fetch from an API
    $("#city, #city1, #city2").autocomplete({
        source: cities
    });

    $('#compareBtn').on('click', function() {
        $('.compare-section').show();
    });

    $('#getWeatherBtn').on('click', function() {
        renderChart();
    });

    $('#getForecastBtn').on('click', function() {
        renderForecastChart();
    });

    $('#compareWeatherBtn').on('click', function() {
        compareWeather();
    });

    $('#compareForecastBtn').on('click', function() {
        compareForecast();
    });

    $('#clearBtn').on('click', function() {
        clearPage();
    });
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`/weather/${city}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error fetching weather data');
        }
    } catch (error) {
        console.error(error);
        alert('Unable to fetch weather data. Please try again.');
        return null;
    }
}

async function fetchForecastData(city) {
    try {
        const response = await fetch(`/forecast/${city}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error fetching forecast data');
        }
    } catch (error) {
        console.error(error);
        alert('Unable to fetch forecast data. Please try again.');
        return null;
    }
}

async function renderChart() {
    const city = document.getElementById('city').value || 'London';
    const data = await fetchWeatherData(city);
    if (data) {
        document.getElementById('errorMessage').style.display = 'none';
        const ctx = document.getElementById('weatherChart').getContext('2d');
        if (weatherChart) {
            weatherChart.destroy();
        }
        if (forecastChart) {
            forecastChart.destroy();
        }
        weatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)', 'Wind Speed (m/s)', 'Visibility (m)'],
                datasets: [{
                    label: `${city} Weather Data`,
                    data: [
                        data.main.temp - 273.15, // Convert Kelvin to Celsius
                        data.main.humidity,
                        data.main.pressure,
                        data.wind.speed,
                        data.visibility
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `${city} Weather Data`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Display sunrise and sunset times
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById('sunriseSunset').innerHTML = `<p>Sunrise: ${sunrise} | Sunset: ${sunset}</p>`;
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        console.error('No data available to display');
    }
}

async function renderForecastChart() {
    const city = document.getElementById('city').value || 'London';
    const data = await fetchForecastData(city);
    if (data) {
        document.getElementById('errorMessage').style.display = 'none';
        const ctx = document.getElementById('weatherChart').getContext('2d');
        if (weatherChart) {
            weatherChart.destroy();
        }
        if (forecastChart) {
            forecastChart.destroy();
        }
        forecastChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.list.map(entry => new Date(entry.dt * 1000).toLocaleString()),
                datasets: [{
                    label: `${city} Temperature Forecast`,
                    data: data.list.map(entry => entry.main.temp - 273.15), // Convert Kelvin to Celsius
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `${city} Temperature Forecast`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        console.error('No data available to display');
    }
}

async function compareWeather() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;

    const data1 = await fetchWeatherData(city1);
    const data2 = await fetchWeatherData(city2);

    if (data1 && data2) {
        document.getElementById('errorMessage').style.display = 'none';
        const ctx = document.getElementById('compareChart').getContext('2d');
        if (compareChart) {
            compareChart.destroy();
        }
        compareChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)', 'Wind Speed (m/s)', 'Visibility (m)'],
                datasets: [{
                    label: `${city1} Weather Data`,
                    data: [
                        data1.main.temp - 273.15, // Convert Kelvin to Celsius
                        data1.main.humidity,
                        data1.main.pressure,
                        data1.wind.speed,
                        data1.visibility
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: `${city2} Weather Data`,
                    data: [
                        data2.main.temp - 273.15, // Convert Kelvin to Celsius
                        data2.main.humidity,
                        data2.main.pressure,
                        data2.wind.speed,
                        data2.visibility
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Comparison: ${city1} vs ${city2}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        console.error('No data available to display');
    }
}

async function compareForecast() {
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;

    const data1 = await fetchForecastData(city1);
    const data2 = await fetchForecastData(city2);

    if (data1 && data2) {
        document.getElementById('errorMessage').style.display = 'none';
        const ctx = document.getElementById('compareChart').getContext('2d');
        if (compareChart) {
            compareChart.destroy();
        }
        const labels = data1.list.map(entry => new Date(entry.dt * 1000).toLocaleString());
        const temps1 = data1.list.map(entry => entry.main.temp - 273.15); // Convert Kelvin to Celsius
        const temps2 = data2.list.map(entry => entry.main.temp - 273.15); // Convert Kelvin to Celsius

        compareChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${city1} Temperature Forecast`,
                    data: temps1,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: `${city2} Temperature Forecast`,
                    data: temps2,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Comparison: ${city1} vs ${city2}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        console.error('No data available to display');
    }
}

function clearPage() {
    // Clear inputs
    $('#city, #city1, #city2').val('');
    $('#sunriseSunset').html('');
    $('#errorMessage').hide();

    // Destroy charts
    if (weatherChart) {
        weatherChart.destroy();
    }
    if (forecastChart) {
        forecastChart.destroy();
    }
    if (compareChart) {
        compareChart.destroy();
    }
}
