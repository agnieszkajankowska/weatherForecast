import * as React from 'react'
import {getWeatherIcon} from "../helpers";

class ForecastWeatherTile extends React.Component {
    render() {
        const temperature = Math.round(this.props.weatherData.main.temp - 273)
        const windSpeed = this.props.weatherData.wind.speed
        return (
            <div className="weather-forecast-container">
                <h1>Weather forecast {this.props.weatherData.dt_txt}</h1>
                <span className={getWeatherIcon(this.props)}></span>
                <span className="current-temperature">{temperature}<span className="wi wi-celsius"/></span>
                <span className="current-wind-speed">
                    <span className="wi wi-strong-wind"/>
                    Wind speed {windSpeed}m/s
                </span>
            </div>
        )
    }
}

export default ForecastWeatherTile;