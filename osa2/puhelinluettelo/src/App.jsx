import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import Add from './components/Add'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.some(person => person.name === newPerson)

    if (personExists) {
      return (
        alert(`${newPerson} is already added to phonebook`)
      )
    }

    const personObject = {
      name: newPerson,
      number: newNumber,
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewPerson('')
        setNewNumber('')
      })
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter}/>   
      <h2>Add a new</h2>
      <Add onsubmit={addPerson} value={newPerson} onChange={handlePersonChange} value2={newNumber} onChange2={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {filteredPeople.map((person, key) =>
          <Person key={key} person={person} />
        )}
      </div>
    </div>
  )
}


export default App