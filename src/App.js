import React, {Component} from 'react';
import './App.css';

import CurrentWeatherTile from './components/CurrentWeatherTile';
import ForecastWeatherTile from './components/ForecastWeatherTile';


class App extends Component {
    constructor() {
        super()

        this.state = {
            weatherData: null
        }
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=london,uk&APPID=0de64b18e7da2d5a45857d165125c350')
            .then(response => response.json()).then(weatherData => this.setState({weatherData: weatherData.list}))
    }

    render() {
        return (
            <div>
                {this.state.weatherData === null ? <div className="loader">Loader</div> :
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Weather app</h1>
                        </header>
                        <CurrentWeatherTile weatherData={this.state.weatherData[0]}/>
                        <ForecastWeatherTile weatherData={this.state.weatherData}/>
                    </div>
                }
            </div>
        );
    }
}

export default App;
