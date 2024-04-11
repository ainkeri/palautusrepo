import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import Add from './components/Add'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [rejectedMessage, setRejectedMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newPerson,
      number: newNumber
    }

    const personExists = persons.find(person => person.name === newPerson)
    
    if (personExists.id) {
      if (window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(personExists.id, personObject)
            .then((returnedPerson) => {
              setPersons(persons.map(p => p.id !== personExists.id ? p : returnedPerson))
              setNewPerson('')
              setNewNumber('')
              setErrorMessage(
                `Updated ${newPerson}`
              )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setRejectedMessage(
              `Information of ${newPerson} has already been removed from server`
            )
            setTimeout(() => {
              setRejectedMessage(null)
            }, 5000)
          })
      }
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('')
        setNewNumber('')
        setErrorMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const toggleDeletionOf = (id) => {
    const url = `http://localhost:3001/api/persons/${id}`
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      axios.delete(url)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(
            `Removed ${person.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
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
      <Notification message={errorMessage} rejected={rejectedMessage}/>
      <Filter
        value={filter}
        onChange={handleFilter}
      />   
      <h2>Add a new</h2>
      <Add
        onsubmit={addPerson}
        value={newPerson}
        onChange={handlePersonChange}
        value2={newNumber}
        onChange2={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {filteredPeople.map((person, key) =>
          <Person 
            key={key}
            person={person}
            toggleDeletion={() => toggleDeletionOf(person.id)}
          />
        )}
      </div>
    </div>
  )
}


export default App