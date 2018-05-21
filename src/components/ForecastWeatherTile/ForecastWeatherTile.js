import * as React from 'react'
import {getWeatherIcon} from "../../helpers";
import {Card, CardHeader, CardBody} from 'reactstrap'
import './ForecastWeatherTile.css'

class ForecastWeatherTile extends React.Component {
    render() {
        const temperature = Math.round(this.props.weatherData.main.temp - 273)
        const windSpeed = this.props.weatherData.wind.speed
        return (
            <Card className="weather-forecast-container">
                <CardHeader>{this.props.weatherData.dt_txt}</CardHeader>
                <CardBody>
                    <div className={`forecast-weather-icon ${getWeatherIcon(this.props)}`}></div>
                    <span className="forecast-temperature">
                        {temperature}<span className="wi wi-celsius"/>
                    </span>
                    <div className="forecast-wind-speed">
                        <span className="wi wi-strong-wind"/>
                        Wind speed {windSpeed}m/s
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default ForecastWeatherTile;