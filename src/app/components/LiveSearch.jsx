'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'

function LiveSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        // Use the apiService to get countries list
        const countriesList = await apiService.getCountriesList()
        console.log('list from component', countriesList)
        setResults(countriesList)
      } catch (error) {
        setError('Error fetching data')
      }
    }

    fetchData()
  }, []) // Run this effect only once when the component mounts

  function handleInputChange(e) {
    console.log('value from component', e.target.value)
    setQuery(e.target.value)
  }

  return (
    <section className='main-container'>
      <input
        type='text'
        placeholder='Search for a country'
        value={query}
        onChange={handleInputChange}
      />
      {results && query && (
        <section>
          {results
            .filter((country) =>
              country.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((country) => (
              // Need to change key to a unique value!
              <div key={country.name}>
                <div>{country.name}</div>
                <img src={country.symbol} alt='Country symbol' />
              </div>
            ))}
        </section>
      )}
    </section>
  )
}

export default LiveSearch
