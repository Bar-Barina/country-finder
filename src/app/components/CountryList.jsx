import React from 'react'
import CountryPreview from './CountryPreview'
// import CountryPreview from './CountryPreview'

function CountryList({ countries }) {
  return (
    <section className='results-container'>
      {countries.length === 0 ? (
        <p>No results found</p>
      ) : (
        countries.map((country) => (
          <CountryPreview key={country.alpha3Code} country={country} />
        ))
      )}
    </section>
  )
}

export default CountryList
