import { useState, useEffect } from 'react'
import axios from 'axios'

import personServices from './services/persons' 

const Filter = ( {filterName, handleFilter} ) => {
  return (
    <div>filter shown with <input id = "filter" value={filterName} onChange = {handleFilter}/></div>
  )
}

const PersonForm = ( {handleSubmit, newName, handleNameChange, newNumber, handleNumber} ) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input 
                  id = "name"
                  value = {newName}
                  onChange = {handleNameChange} /></div>
          <div>number: <input 
                    id = "number"
                    value = {newNumber}
                    onChange = {handleNumber} />
        </div>
        <div>
          <button id = "submit button" type = 'submit'>add</button>
        </div>
      </form>
  )
}

const Person = ( {person, handleDelete} ) => {
  return (<div>{person.name} {person.number} <DeletePerson person = {person} handleDelete={handleDelete} /></div>)
}

const Persons = ( {personList, handleDelete} ) => {
  return (
    personList.map(person => <Person key = {person.name} person = {person} handleDelete={handleDelete} />)
  )
}

const DeletePerson = ( {person, handleDelete} ) => {
  return (<button onClick={handleDelete(person)}>delete</button>)
}

const Notification = ( {message} ) => {
  if (message === null) {
    return null
  } 

  return (
    <div className='notification'>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotification] = useState(null)

  useEffect(() => {
    personServices
    .getAll()
    .then(data => setPersons(data))
  }, [])

  const isAllowed = (pers, candidateName, candidateNumber) => {
    for (let i = 0; i < pers.length; i++) {
      if (pers[i].name === candidateName && pers[i].number === candidateNumber) {
        return false
      }
    }
    return true
  }

  const idToUpdate = (pers, candidateName, candidateNumber) => {
    for (let i = 0; i < pers.length; i++) {
      if (pers[i].name === candidateName && pers[i].number !== candidateNumber) {
        return pers[i].id
      }
    }
    return -1
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name : newName,
      number : newNumber
    }

    if (isAllowed(persons, newPerson.name, newPerson.number)) {
      const idUpdate = idToUpdate(persons, newPerson.name, newPerson.number)
      if (idUpdate < 0) {
        personServices.addOne(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNotification(`${data.name} has been added`)
          setTimeout(() => setNotification(null), 5000)
        })
      }
      else {
       if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one ?`)) {
        personServices
        .updateNumber(newPerson, idUpdate)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== idUpdate ? p : returnedPerson))
          setNotification(`${returnedPerson.name}'s number has been changed`)
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => alert("error"))
       }
      }
    } 
    else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      const newPersonList = persons.filter(p => p.id !== person.id)
      personServices
      .deleteOne(person)
      .then(() => setPersons(newPersonList))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} />

      <Filter filterName={filterName} handleFilter={handleFilter}/>

      <h3>add a new contact</h3>

      <PersonForm handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumber = {handleNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>

      <Persons personList={personsToShow} handleDelete={deletePerson} />
      
    </div>
  )
}

export default App
