import React from 'react'
import CountryPreview from './CountryPreview'

function CountryList({ countries }) {
  return (
    <section className='results-container'>
      {/* Rendering a CountryPreview for each country and giving it a unique key*/}
      {countries.map((country) => (
        <CountryPreview key={country.alpha3Code} country={country} />
      ))}
    </section>
  )
}

export default CountryList
