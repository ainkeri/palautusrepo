import { useState, useEffect } from 'react'
import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({ country, length }) => {
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        if (length === 1) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`)
                .then(response => {
                    setWeather({temp: response.data.main.temp, wind: response.data.wind.speed, icon: response.data.weather[0].icon})
                })
            }
    }, [country.capital])
    

    if (length === 1) return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <b>languages:</b>
            <ul>
                {Object.keys(country.languages).map(language => (
                    <li key={language}>{country.languages[language]}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="flag"/>
            <h2>Weather in {country.capital}</h2>
            <div>temperature {Math.round((weather.temp - 275) * 100) / 100} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" />
            <div>wind {weather.wind} m/s</div>
 
        </div>
    )

    if (length <= 10) return (
        <div>
            <div>{country.name.common}</div>
        </div>
    )

    
}

export default Country