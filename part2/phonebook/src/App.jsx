import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name : 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const isAllowed = (pers, candidateName) => {
    for (let i = 0; i < pers.length; i++) {
      if (pers[i].name === candidateName) {
        return false
      }
    }
    return true
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name : newName
    }

    if (isAllowed(persons, newPerson.name)) {
      setPersons(persons.concat(newPerson))
    } 
    else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value = {newName}
                  onChange = {handleNameChange} />
        </div>
        <div>
          <button type = 'submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key = {person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
