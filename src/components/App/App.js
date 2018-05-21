import React, {Component} from 'react';
import './App.css';
import WeatherSearchForm from '../WeatherSearchForm/WeatherSearchForm'
import CurrentWeatherTile from '../CurrentWeatherTile/CurrentWeatherTile';
import ForecastWeatherTile from '../ForecastWeatherTile/ForecastWeatherTile';
import { Jumbotron } from 'reactstrap'

const getWeatherDataToDisplay = (weatherData) => {
    for(let i = 0; i < weatherData.length; i++) {
        weatherData.splice(i+1,1)
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            weatherData: null,
            city: 'Gdańsk'
        }

        this.searchWeather = (newCity) => {
            this.setState({city: newCity})
            fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + newCity + '&APPID=0de64b18e7da2d5a45857d165125c350')
                .then(response => response.json()).then(weatherData => {
                getWeatherDataToDisplay(weatherData.list)
                this.setState({weatherData: weatherData.list})
                })
        }
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + '&APPID=0de64b18e7da2d5a45857d165125c350')
            .then(response => response.json()).then(weatherData => {
                getWeatherDataToDisplay(weatherData.list)
                this.setState({weatherData: weatherData.list})
            })
    }

    render() {
        return (
            <div>
                {this.state.weatherData === null ? <div className="loader">Loader</div> :
                    <div className="App">
                        <Jumbotron>
                        <header className="App-header">
                            <h1 className="App-title">Current weather in {this.state.city}</h1>
                        </header>
                        <WeatherSearchForm initialCity={this.state.city} onCityUpdated={this.searchWeather}/>
                        </Jumbotron>
                        <CurrentWeatherTile weatherData={this.state.weatherData[0]}/>
                        {this.state.weatherData.map((element,index) =>
                           index > 0 ? <ForecastWeatherTile weatherData={element} key={index}/> :''
                        )}
                    </div>
                }
            </div>
        );
    }
}

export default App;
