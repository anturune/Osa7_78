import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Custom hookin importti ks. "/src/hooks/index.js"
import { useField, useCountry } from './hooks'

/*
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  /*
    useEffect(() => { 
      
    })
  
    return country
  }
  */
/*
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/name/'`${name}`)
      .then(response => {
        console.log('promise fulfilled', response)
        setCountry(response.data)
      })
  })
  console.log('MIKÄ MAAA', country)
  return country
}
*/
const Country = ({ country }) => {
  if (country) {
    console.log('COUNTRY KOMPONENTTI', country)
  }
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('TULEEKO COUNTRY KOMPONENTIN TÄHÄN VAIHEESEEN')
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App
