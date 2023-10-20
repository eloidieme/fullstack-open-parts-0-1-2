import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ( {countriesList} ) => {
  if (countriesList.length > 0) {
    return (<ul>{countriesList.map(country => <li key={country.name.official}>{country.name.common}</li>)}</ul>)
  }
}

const Country = ( {country} ) => {
  return (
    <>
        <h1>{country.name.common}</h1>
        <div><p>capital {country.capital}</p></div>
        <div><p>area {country.area}</p></div>
        <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png}/>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')

  const filterCountries = (list) => {
    return list.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const displayCountries = (list) => {
    if (list.length == 0) {
      return <></>
    }
    if (list.length == 1) {
      return (<Country country = {list[0]} />)
    } else if (list.length <= 10) {
      return (<Countries countriesList={list} />) 
    } else {
      return (<p>Too many matches, specify another filter</p>)
    }
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange}/>
      </div>
      <div>
        {displayCountries(filterCountries(countries))}
      </div>
    </>
  )
}

export default App
