'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'
import { utilService } from '../services/util.service'

function LiveSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  // FOR LATER USE!
  const debounce = utilService.debounce()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        // Use the apiService to get countries list
        const countriesList = await apiService.getCountriesList()
        console.log('list from UE', countriesList)
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
              country.name.toLowerCase().startsWith(query.toLowerCase())
            )
            .map((country) => (
              <div key={utilService.makeId()}>
                <div>{country.name}</div>
                <img src={country.flags.png} alt='Country flag' />
              </div>
            ))}
        </section>
      )}
    </section>
  )
}

export default LiveSearch
