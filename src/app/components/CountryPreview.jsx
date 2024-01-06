import React from 'react'

function CountryPreview({ country }) {
  return (
    <section className='country-preview-container'>
      <span>{country.name}</span>
      <img src={country.flags.png} alt='Country flag' />
      <span>{country.numericCode}#</span>
    </section>
  )
}

export default CountryPreview
