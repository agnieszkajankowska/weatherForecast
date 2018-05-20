import * as React from 'react';
import weatherIcons from '../icons'
import 'weathericons/css/weather-icons.css';



class CurrentWeatherTile extends React.Component {
    render() {
        const temperature = Math.round(this.props.weatherData.main.temp - 273)
        const status = this.props.weatherData.weather[0].description
        const windSpeed = this.props.weatherData.wind.speed
        const cloudiness = this.props.weatherData.clouds.all
        const humidity = this.props.weatherData.main.humidity
        const pressure = this.props.weatherData.main.pressure

        const getWeatherIcon = () => {
            let prefix = 'wi wi-'
            let code = this.props.weatherData.weather[0].id
            let icon = weatherIcons[code].icon

            if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                icon = 'day-' + icon
            }

            return icon = prefix + icon
        }

        getWeatherIcon()
        return (
            <div className="current-weather-container">
                <span className={getWeatherIcon()}></span>
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