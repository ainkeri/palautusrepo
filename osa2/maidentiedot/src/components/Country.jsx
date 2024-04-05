import React from "react"

const Country = ({ country, length }) => {
    if (length == 1) return (
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
        </div>
    )

    if (length <= 10) return (
        <div>{country.name.common}</div>
    )
}

export default Country