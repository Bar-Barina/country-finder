import React from 'react'

function CountryPreview({ country }) {
  return (
    <section className='country-preview-container'>
      <div className='flex align-center img-wrapper'>
        <span className='numericCode'>#{country.numericCode}</span>
        <img src={country.flags.png} alt='Country flag' />
      </div>
      <span>{country.name}</span>
    </section>
  )
}

export default CountryPreview
