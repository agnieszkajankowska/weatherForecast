import * as React from 'react'
import './WeatherSearchForm.css'
import { Button, Input, Form, FormGroup } from 'reactstrap'

class WeatherSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editingCity: this.props.initialCity }
    }

    handleChange = (event) => {
        this.setState({editingCity: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onCityUpdated(this.state.editingCity)
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit} className="weather-search">
                <FormGroup>
                <Input type="text" value={this.state.editingCity} onChange={this.handleChange}/>
                <Button type="submit" color="primary">Search</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default WeatherSearchForm;
