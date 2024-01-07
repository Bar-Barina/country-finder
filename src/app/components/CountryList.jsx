import React from 'react'
import CountryPreview from './CountryPreview'
import NoResultsModal from './NoResultsModal'

function CountryList({ countries }) {
  return (
    <section className='results-container'>
      {countries.length === 0 ? (
        <NoResultsModal />
      ) : (
        countries.map((country) => (
          <CountryPreview key={country.alpha3Code} country={country} />
        ))
      )}
    </section>
  )
}

export default CountryList
