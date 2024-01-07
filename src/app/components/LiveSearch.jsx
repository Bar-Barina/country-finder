'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'
import { utilService } from '../services/util.service'
import CountryList from './CountryList'
import Loader from './Loader'
import RegionSort from './RegionSort'

function LiveSearch() {
  // Using and modifying state here, because i don't need to use this data any other place.
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('')

  // Using the debounce function from my util service
  const debouncedFetchData = utilService.debounce(fetchData, 300)

  useEffect(() => {
    // Calling the debouncedFetchData function on query change
    debouncedFetchData()
  }, [query, selectedRegion])

  async function fetchData() {
    try {
      setError(null)
      setLoading(true)
      const countriesList = await apiService.getCountriesList()
      // Filter by query
      let filteredResults = countriesList.filter((country) =>
        country.name.toLowerCase().startsWith(query.toLowerCase())
      )

      // Filter by region if selected
      if (selectedRegion) {
        filteredResults = filteredResults.filter(
          (country) => country.region === selectedRegion
        )
      }
      console.log(filteredResults)
      setResults(filteredResults)
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
    if (!results) {
      setResults([])
    }
  }

  const handleRegionSort = (region) => {
    setSelectedRegion(region)
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
      {/* Checking if there is a query, if there is, let the user sort by region */}
      {query && <RegionSort onSort={handleRegionSort} />}

      {loading && <Loader />}

      {/* If there is an error fetching the data, inform the user */}
      {error && <div className='error-message'>{error}</div>}

      {/* Checking if there is results and query, then sending the already filtered results to the CountryList component */}
      {!loading && results.length > 0 && query && (
        <CountryList countries={results} />
      )}
    </section>
  )
}

export default LiveSearch
