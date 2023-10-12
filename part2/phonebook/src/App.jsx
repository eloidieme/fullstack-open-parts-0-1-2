import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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
      name : newName,
      number : newNumber
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
      <div>filter shown with <input value={filterName} onChange={handleFilter}/></div>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value = {newName}
                  onChange = {handleNameChange} /></div>
          <div>number: <input 
                    value = {newNumber}
                    onChange = {handleNumber} />
        </div>
        <div>
          <button type = 'submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key = {person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
