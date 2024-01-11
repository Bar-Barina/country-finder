'use client'
import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api.service'
import { utilService } from '../services/util.service'
import CountryList from './CountryList'
import Loader from './Loader'
import RegionSort from './RegionSort'
import NoResultsModal from './NoResultsModal'
import { getSvg } from '../services/svg.service'

function LiveSearch() {
  // Managing state here because there is no need to reuse it.
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('')

  const debouncedFetchData = utilService.debounce(fetchData, 300)

  useEffect(() => {
    debouncedFetchData()
  }, [query, selectedRegion])

  async function fetchData() {
    try {
      setError(null)
      setLoading(true)
      const countriesList = await apiService.getCountriesList()
      // Init filteredResults out scope to modify it based on the query/selectedRegion
      let filteredResults = countriesList

      if (query) {
        filteredResults = countriesList.filter((country) =>
          country.name.toLowerCase().startsWith(query.toLowerCase())
        )
      }
      if (selectedRegion) {
        filteredResults = filteredResults.filter(
          (country) => country.region === selectedRegion
        )
      }
      setResults(filteredResults)
    } catch (error) {
      setError('Error fetching data', error)
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
      <div className='search-wrapper'>
        <span
          className={'search-icon'}
          dangerouslySetInnerHTML={{
            __html: getSvg('search'),
          }}
        />
        <input
          className='flex auto-center'
          type='text'
          placeholder='Search for a country'
          value={query}
          onChange={handleInputChange}
        />
        {/* Checking if there is a query, if there is, let the user sort by region */}
        {query && <RegionSort onSort={handleRegionSort} />}

        {!query && (
          <div className='flex auto-center'>
            <span>Supporting ISRAEL</span>
            <span
              className={'heart-icon'}
              dangerouslySetInnerHTML={{
                __html: getSvg('heart'),
              }}
            />
          </div>
        )}
      </div>

      {/* Rendering the loader when needed */}
      {loading && <Loader />}

      {/* If there is an error fetching the data, inform the user */}
      {error && <div className='error-message'>{error}</div>}

      {/* Render NoResultsModal only when loading is false */}
      {!loading && results.length === 0 && query && <NoResultsModal />}

      {/* Render the results when there are results and loading is false */}
      {!loading && results.length > 0 && query && (
        <CountryList countries={results} />
      )}
    </section>
  )
}

export default LiveSearch
