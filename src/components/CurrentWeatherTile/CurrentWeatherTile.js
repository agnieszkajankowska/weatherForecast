import * as React from 'react';
import 'weathericons/css/weather-icons.css';
import './CurrentWeatherTile.css'
import {getWeatherIcon} from '../../helpers.js'
import {Container, Row, Col} from 'reactstrap'

class CurrentWeatherTile extends React.Component {
    render() {
        const temperature = Math.round(this.props.weatherData.main.temp - 273)
        const status = this.props.weatherData.weather[0].description
        const windSpeed = this.props.weatherData.wind.speed
        const cloudiness = this.props.weatherData.clouds.all
        const humidity = this.props.weatherData.main.humidity
        const pressure = this.props.weatherData.main.pressure
        return (
            <Container className="current-weather-container">
                <Row>
                    <Col sm={12} md={4} className="current-weather-icon-container">
                        <span className={`current-weather-icon ${getWeatherIcon(this.props)}`}></span>
                    </Col>
                    <Col sm={12} md={4} className="main-weather-info-container">
                        <span className="current-weather-item temperature">{temperature}<span className="wi wi-celsius"/></span>
                        <span className="current-weather-item status">{status}</span>
                    </Col>
                    <Col sm={12} md={4} className="secondary-weather-info-container">
                            <span className="current-weather-item">
                                <span className="wi wi-strong-wind"/>
                                Wind speed {windSpeed}m/s
                            </span>
                            <span className="current-weather-item">
                                <span className="wi wi-cloudy"/>
                                Cloudiness {cloudiness}%
                            </span>
                        <span className="current-weather-item">
                            <span className="wi wi-smoke"/>
                            Humidity {humidity}%
                            </span>
                        <span className="current-weather-item">
                            <span className="wi wi-barometer"></span>
                            Pressure {pressure}hPa
                        </span>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CurrentWeatherTile;