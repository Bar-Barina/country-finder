import React from 'react'

function RegionSort({ onSort }) {
  const handleSortChange = (e) => {
    const selectedRegion = e.target.value
    onSort(selectedRegion)
  }

  return (
    <div className='region-sort-container'>
      <select id='region' className='pointer' onChange={handleSortChange}>
        <option value=''>All Regions</option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>Americas</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </select>
    </div>
  )
}

export default RegionSort
