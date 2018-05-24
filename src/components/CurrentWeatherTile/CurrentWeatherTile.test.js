import React from 'react';
import CurrentWeatherTile from './CurrentWeatherTile';
import { shallow, mount } from 'enzyme';

const weatherData = {"dt":1526828400,"main":{"temp":287.82,"temp_min":286.777,"temp_max":287.82,"pressure":1037.47,"sea_level":1042.14,"grnd_level":1037.47,"humidity":80,"temp_kf":1.05},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":5.16,"deg":50.0016},"sys":{"pod":"d"},"dt_txt":"2018-05-20 15:00:00"};
it('renders without crashing', () => {
    shallow(<CurrentWeatherTile weatherData={weatherData}/>);
});

it('displays weather status', () => {
    const currentWeather = mount(<CurrentWeatherTile weatherData={weatherData}/>);
    expect(currentWeather.text()).toContain('clear sky')
});
