import * as React from 'react';
import { shallow } from 'enzyme';
import WeatherSearchForm from "./WeatherSearchForm";
import {Input} from 'reactstrap'

it('renders without crashing', () => {
    shallow(<WeatherSearchForm />);
});

it('contains input', () => {
    const weatherSearchForm = shallow(<WeatherSearchForm />);
    expect(weatherSearchForm.containsMatchingElement(<Input/>)).toEqual(true);
});