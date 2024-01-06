import React from 'react'

function CountryPreview({ country }) {
  return (
    <section className='country-preview-container'>
      <div>{country.name}</div>
      <img src={country.flags.png} alt='Country flag' />
    </section>
  )
}

export default CountryPreview
