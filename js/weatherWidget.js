import { CONFIG } from './config.js';

class WeatherWidget {
    constructor() {
        this.apiKey = CONFIG.WEATHER_API_KEY;
        this.weatherContent = document.getElementById('weather-content');
        this.getWeather();
    }

    async getWeather() {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=auto:ip`);
            const data = await response.json();
            this.updateWeatherWidget(data);
        } catch (error) {
            this.weatherContent.innerHTML = 'Error al cargar el clima';
        }
    }

    updateWeatherWidget(data) {
        const { temp_c, condition } = data.current;
        this.weatherContent.innerHTML = `
            <div class="weather-info">
                <h3>${data.location.name}</h3>
                <p>${temp_c}°C</p>
                <p>${condition.text}</p>
                <img src="${condition.icon}" alt="${condition.text}">
            </div>
        `;
    }
}

const weatherWidget = new WeatherWidget();