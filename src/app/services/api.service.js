import axios from 'axios'

const API_BASE_URL = 'https://restcountries.com/v2'

async function getCountriesList() {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`)
    const countriesList = response.data
    return countriesList
  } catch (error) {
    throw new Error('Error fetching countries list', error)
  }
}

export const apiService = {
  getCountriesList,
}
