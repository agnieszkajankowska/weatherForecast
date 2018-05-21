import * as React from 'react'
import './WeatherSearchForm.css'

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
            <form onSubmit={this.handleSubmit} className="weather-search">
                <input type="text" value={this.state.editingCity} onChange={this.handleChange}/>
                <button type="submit">Search</button>
            </form>
        )
    }
}

export default WeatherSearchForm;
