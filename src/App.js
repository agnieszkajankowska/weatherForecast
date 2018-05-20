import React, {Component} from 'react';
import './App.css';

import CurrentWeatherTile from './components/CurrentWeatherTile';
import ForecastWeatherTile from './components/ForecastWeatherTile';

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
            city: 'Gdańsk',
            searchedCity: 'Gdańsk'
        }

        this.searchWeather = (e) => {
            e.preventDefault()
            this.setState({city: this.state.searchedCity})
            fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.searchedCity + '&APPID=0de64b18e7da2d5a45857d165125c350')
                .then(response => response.json()).then(weatherData => {
                getWeatherDataToDisplay(weatherData.list)
                this.setState({weatherData: weatherData.list})
                })
        }

        this.handleChange = (e) => {
            this.setState({searchedCity: e.target.value})
        }
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.searchedCity + '&APPID=0de64b18e7da2d5a45857d165125c350')
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
                        <header className="App-header">
                            <h1 className="App-title">Weather app</h1>
                        </header>
                        <h2>Current weather in {this.state.city}</h2>
                        <form onSubmit={this.searchWeather}>
                        <input type="text" value={this.state.searchedCity} onChange={this.handleChange}/>
                        <button type="submit">Search</button>
                        </form>
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
