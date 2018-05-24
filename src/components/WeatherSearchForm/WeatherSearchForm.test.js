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

it('changes state editing city when typing in input to input value', () => {
    const weatherSearchForm = shallow(<WeatherSearchForm initialCity={"Gdańsk"}/>);
    weatherSearchForm.find('Input').simulate('change', {target: {value: 'Paris'}})
    expect(weatherSearchForm.state('editingCity')).toEqual('Paris');
});

it('calls "handleSubmit()" on form submit', () => {
    const weatherSearchForm = shallow(<WeatherSearchForm initialCity={"Gdańsk"} onCityUpdated={() => console.log('city updated')}/>);
    const spy = jest.spyOn(weatherSearchForm.instance(), 'handleSubmit');
    weatherSearchForm.update();
    weatherSearchForm.find('Input').simulate('change', {target: {value: 'Paris'}})
    weatherSearchForm.find('Form').simulate('submit', {preventDefault: () => {
    }});
    expect(spy).toHaveBeenCalled();
});

