'use client'
import React, { useState, useEffect } from 'react'

function LiveSearch() {
  const [query, setQuery] = useState('')

  function handleInputChange(e) {
    console.log(e.target.value)
    setQuery(e.target.value)
  }

  return (
    <section className='main-container'>
      <input
        type='text'
        placeholder='Search for a country'
        value={query}
        onChange={handleInputChange}
      />
    </section>
  )
}

export default LiveSearch
