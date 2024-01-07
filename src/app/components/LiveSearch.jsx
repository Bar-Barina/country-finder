'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'
import { utilService } from '../services/util.service'
import CountryList from './CountryList'
import NoResultsModal from './NoResultsModal'

function LiveSearch() {
  // Using and modifying state here, because i don't need to use this data any other place.
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Using the debounce function from my util service
  const debouncedFetchData = utilService.debounce(fetchData, 300)

  useEffect(() => {
    // Calling the debouncedFetchData function on query change
    debouncedFetchData()
  }, [query])

  async function fetchData() {
    try {
      setError(null)
      setLoading(true)
      const countriesList = await apiService.getCountriesList()
      setResults(countriesList)
    } catch (error) {
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  function handleInputChange(e) {
    setLoading(false)
    setQuery(e.target.value)
    setLoading(true)
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
      {loading && <div className='loader'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}

      {/* Checking if there are no results and a query is present, then show the "No results found" message */}
      {!loading && results.length === 0 && <NoResultsModal />}

      {/* Checking if there is results and query, then sending the filtered results to the CountryList cmp */}
      {!loading && results.length > 0 && query && (
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
