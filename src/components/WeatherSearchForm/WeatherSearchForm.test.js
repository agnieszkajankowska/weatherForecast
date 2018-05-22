import * as React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import WeatherSearchForm from "./WeatherSearchForm";

it('renders without crashing', () => {
    shallow(<WeatherSearchForm />);
});