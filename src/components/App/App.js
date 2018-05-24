import React, {Component} from 'react';
import './App.css';
import WeatherSearchForm from '../WeatherSearchForm/WeatherSearchForm'
import CurrentWeatherTile from '../CurrentWeatherTile/CurrentWeatherTile';
import ForecastWeatherTile from '../ForecastWeatherTile/ForecastWeatherTile';
import { Jumbotron, Container, Row, Col, Alert } from 'reactstrap'

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
            error: false
        }

        this.searchWeather = (newCity) => {
            this.setState({city: newCity})
            fetch('https://cors-anywhere.herokuapp.com/http://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=' + newCity + '&APPID=0de64b18e7da2d5a45857d165125c350')
                .then(response => response.json()).then(weatherData => {
                getWeatherDataToDisplay(weatherData.list)
                this.setState({weatherData: weatherData.list})
                }).catch(() => this.setState({error: true}))
        }
    }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + '&APPID=0de64b18e7da2d5a45857d165125c350')
            .then(response => response.json()).then(weatherData => {
                getWeatherDataToDisplay(weatherData.list)
                this.setState({weatherData: weatherData.list})
            }).catch(() => this.setState({error: true}))
    }

    render() {
        return (
            <div>
                {this.state.error ?
                    <Container>
                    <Alert color="danger">
                    There has been an error when loading the data. Try to refresh the page.
                    </Alert>
                    </Container> :
                    (this.state.weatherData === null ? <div className="loader"></div> :
                    <div className="App">
                        <Jumbotron>
                        <header className="App-header">
                            <h1 className="App-title">Current weather in {this.state.city}</h1>
                        </header>
                        <WeatherSearchForm initialCity={this.state.city} onCityUpdated={this.searchWeather}/>
                        </Jumbotron>
                        <CurrentWeatherTile weatherData={this.state.weatherData[0]}/>
                        <Container>
                            <Row>
                        {this.state.weatherData.map((element,index) =>
                            index > 0 ? <Col xs="12" md="3" key={index
                            }><ForecastWeatherTile weatherData={element} key={index}/></Col> :''
                        )}
                            </Row>
                        </Container>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
