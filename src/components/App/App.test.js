import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

fetchMock.get(`*`, {"list":[{"dt":1526828400,"main":{"temp":287.82,"temp_min":286.777,"temp_max":287.82,"pressure":1037.47,"sea_level":1042.14,"grnd_level":1037.47,"humidity":80,"temp_kf":1.05},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":5.16,"deg":50.0016},"sys":{"pod":"d"},"dt_txt":"2018-05-20 15:00:00"},{"dt":1526839200,"main":{"temp":286.66,"temp_min":285.874,"temp_max":286.66,"pressure":1037.53,"sea_level":1042.31,"grnd_level":1037.53,"humidity":83,"temp_kf":0.79},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.76,"deg":52.0038},"sys":{"pod":"d"},"dt_txt":"2018-05-20 18:00:00"},{"dt":1526850000,"main":{"temp":285.31,"temp_min":284.782,"temp_max":285.31,"pressure":1037.93,"sea_level":1042.76,"grnd_level":1037.93,"humidity":94,"temp_kf":0.52},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":4.03,"deg":56.5035},"sys":{"pod":"n"},"dt_txt":"2018-05-20 21:00:00"},{"dt":1526860800,"main":{"temp":284.87,"temp_min":284.608,"temp_max":284.87,"pressure":1037.83,"sea_level":1042.77,"grnd_level":1037.83,"humidity":94,"temp_kf":0.26},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":12},"wind":{"speed":3.43,"deg":65.5004},"sys":{"pod":"n"},"dt_txt":"2018-05-21 00:00:00"},{"dt":1526871600,"main":{"temp":284.576,"temp_min":284.576,"temp_max":284.576,"pressure":1037.63,"sea_level":1042.53,"grnd_level":1037.63,"humidity":94,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":24},"wind":{"speed":3.67,"deg":59.0019},"sys":{"pod":"d"},"dt_txt":"2018-05-21 03:00:00"},{"dt":1526882400,"main":{"temp":286.287,"temp_min":286.287,"temp_max":286.287,"pressure":1037.53,"sea_level":1042.31,"grnd_level":1037.53,"humidity":86,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":3.56,"deg":43.001},"sys":{"pod":"d"},"dt_txt":"2018-05-21 06:00:00"},{"dt":1526893200,"main":{"temp":287.048,"temp_min":287.048,"temp_max":287.048,"pressure":1036.88,"sea_level":1041.57,"grnd_level":1036.88,"humidity":84,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":3.88,"deg":54.0007},"sys":{"pod":"d"},"dt_txt":"2018-05-21 09:00:00"}]})

const fetchResponseJson = async (url) => {
    try {
        const response = await fetch(url)
        const responseJson = await response.json()
        // You can introduce here an artificial delay, both Promises and async/await will wait until the function returns
        // await sleep(DELAY_MS)
        return responseJson
    }
    catch (e) {
        console.log(`fetchResponseJson failed:`, e)
    }
}

describe('mock the api call', () => {
    it('renders without crashing', () => {
      shallow(<App />);
    });

    it('fetches weather data on #componentDidMount', () => {
        const app = shallow(<App />);
        app.instance().componentDidMount();
    });

    it('passes initialCity to WeatherForm component', async () => {
        const responseJson = await fetchResponseJson('http://api.openweathermap.org/data/2.5/forecast?q=Gdańsk&APPID=0de64b18e7da2d5a45857d165125c350');
        const app = shallow(<App />);
        app.setState({weatherData: responseJson.list});
        expect(app.find('WeatherSearchForm').prop('initialCity')).toEqual("Gdańsk");
    });

    it('passes first data set to CurrentWeatherTile component', async () => {
        const responseJson = await fetchResponseJson('http://api.openweathermap.org/data/2.5/forecast?q=Gdańsk&APPID=0de64b18e7da2d5a45857d165125c350');
        const app = shallow(<App />);
        app.setState({weatherData: responseJson.list});
        expect(app.find('CurrentWeatherTile').prop('weatherData')).toEqual({"dt":1526828400,"main":{"temp":287.82,"temp_min":286.777,"temp_max":287.82,"pressure":1037.47,"sea_level":1042.14,"grnd_level":1037.47,"humidity":80,"temp_kf":1.05},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":5.16,"deg":50.0016},"sys":{"pod":"d"},"dt_txt":"2018-05-20 15:00:00"});
    });

    it('renders number of ForecastWeatherTile components equal to data list length', async () => {
        const responseJson = await fetchResponseJson('http://api.openweathermap.org/data/2.5/forecast?q=Gdańsk&APPID=0de64b18e7da2d5a45857d165125c350');
        const app = shallow(<App />);
        app.setState({weatherData: responseJson.list});
        expect(app.find('ForecastWeatherTile').length).toEqual(6);
    });
});

