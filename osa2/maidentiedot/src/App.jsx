import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      if (filter) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(response => {
            setCountries(response.data)
            })
        }
      }, 300)

      return () => clearTimeout(delayFilter)
  
    }, [filter])

  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10 && filter) return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      <div>
        Too many matches, specify another filter
      </div>
    </div>
  )

  return (    
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      <div>
        {filteredCountries.map((country, key) =>
        <Country key={key} country={country} length={filteredCountries.length}/>
        )}
      </div>
    </div>
  )
}

export default App