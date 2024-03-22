import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Add from './components/Add'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    setPersons(persons.concat(personObject))
    setNewPerson('')
    setNewNumber('')
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