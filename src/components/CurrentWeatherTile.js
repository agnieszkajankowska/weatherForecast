import * as React from 'react';
import 'weathericons/css/weather-icons.css';
import {getWeatherIcon}  from '../helpers.js'

class CurrentWeatherTile extends React.Component {
    render() {
        const temperature = Math.round(this.props.weatherData.main.temp - 273)
        const status = this.props.weatherData.weather[0].description
        const windSpeed = this.props.weatherData.wind.speed
        const cloudiness = this.props.weatherData.clouds.all
        const humidity = this.props.weatherData.main.humidity
        const pressure = this.props.weatherData.main.pressure

        return (
            <div className="current-weather-container">
                <span className={getWeatherIcon(this.props)}></span>
                <span className="current-temperature">{temperature}<span className="wi wi-celsius"/></span>
                <span className="current-status">{status}</span>
                <span className="current-wind-speed">
                    <span className="wi wi-strong-wind"/>
                    Wind speed {windSpeed}m/s
                </span>
                <span className="current-cloudiness">
                    <span className="wi wi-cloudy"/>
                    Cloudiness {cloudiness} %
                </span>
                <span className="current-smoke">
                    <span className="wi wi-smoke"/>
                    Humidity {humidity} %
                </span>
                <span className="current-pressure">
                    <span className="wi wi-barometer"></span>
                    Pressure {pressure} hPa
                </span>
            </div>
        )
    }
}

export default CurrentWeatherTile;