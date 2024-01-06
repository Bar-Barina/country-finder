'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'
import { utilService } from '../services/util.service'
import CountryList from './CountryList'

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
        // Using the apiService to get the countries list
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
    setQuery(e.target.value)
  }

  return (
    <section className='live-search-container flex column'>
      <input
        className='flex auto-center'
        type='text'
        placeholder='Search for a country'
        value={query}
        onChange={handleInputChange}
      />
      {/* Checking if there is results and query, then sending the filtered results to the CountryList cmp */}
      {results && query && (
        <CountryList
          countries={results.filter((country) =>
            country.name.toLowerCase().startsWith(query.toLowerCase())
          )}
        />
      )}
    </section>
  )
}

export default LiveSearch
