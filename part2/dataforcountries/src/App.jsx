import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const Countries = ( {countriesList, handleButton} ) => {
  if (countriesList.length > 0) {
    return (<ul>{countriesList.map(country => <li key={country.name.official}>{country.name.common} <button onClick={handleButton(country.name.common)}>show</button></li>)}</ul>)
  }
}

const Country = ( {country, weather} ) => {
  return (
    <>
        <h1>{country.name.common}</h1>
        <div><p>capital {country.capital}</p></div>
        <div><p>area {country.area}</p></div>
        <h3>languages</h3>
        <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png}/>

        <h2>Weather in {country.capital}</h2>
        <div><p>temperature {weather.temperature} Celsius</p></div>
        <img src={weather.icon} />
        <div><p>wind {weather.wind} m/s</p></div>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [weather, setWeather] = useState({})

  const filterCountries = (list) => {
    return list.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const displayCountries = (list, weather) => {
    if (list.length == 0) {
      return <></>
    }
    if (list.length == 1) {
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${list[0].latlng[0]}&lon=${list[0].latlng[1]}&units=metric&appid=${api_key}`)
        .then(response => {
          console.log(response.data.current.weather.icon)
          setWeather({...weather, temperature: response.data.current.temp, icon: `https://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`, wind: response.data.current.wind_speed})
        })
      return (<Country country = {list[0]} weather={weather}/>)
    } else if (list.length <= 10) {
      return (<Countries countriesList={list} handleButton={handleShowCountry} />) 
    } else {
      return (<p>Too many matches, specify another filter</p>)
    }
  }

  const handleShowCountry = (countryName) => () => {
    setValue(countryName)
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
        {displayCountries(filterCountries(countries), weather)}
      </div>
    </>
  )
}

export default App
