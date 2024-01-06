import { useEffect } from 'react'
import { useRouter } from 'next/router'

function CountryDetails() {
  const router = useRouter()
  const { countryDetails } = router.query

  if (!countryDetails) {
    return <div>Loading...</div>
  }

  const parsedCountryDetails = JSON.parse(countryDetails)

  return (
    <div>
      <h1>{parsedCountryDetails.name}</h1>
      {/* Display other details as needed */}
    </div>
  )
}

export default CountryDetails
