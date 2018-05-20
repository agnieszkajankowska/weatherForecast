import React, {Component} from 'react';
import './App.css';

import CurrentWeatherTile from './components/CurrentWeatherTile';
import ForecastWeatherTile from './components/ForecastWeatherTile';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Weather app</h1>
                </header>
                <CurrentWeatherTile/>
                <ForecastWeatherTile/>
            </div>
        );
    }
}

export default App;
