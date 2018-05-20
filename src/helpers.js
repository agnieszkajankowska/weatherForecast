import weatherIcons from './icons'

export const getWeatherIcon = (data) => {
    let prefix = 'wi wi-'
    let code = data.weatherData.weather[0].id
    let icon = weatherIcons[code].icon

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon
    }

    return icon = prefix + icon
}