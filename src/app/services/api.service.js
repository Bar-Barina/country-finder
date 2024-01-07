import axios from 'axios'
import { storageService } from './storage.service'

const API_BASE_URL = 'https://restcountries.com/v2'

async function getCountriesList() {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`)
    const countriesList = response.data
    return countriesList
  } catch (error) {
    throw new Error('Error fetching countries list')
  }
}

export const apiService = {
  getCountriesList,
}

// In case of api blocking, use this caching method function to use the app smoothly

// async function getCountriesList() {
//   try {
//     // Check if data is already stored in local storage
//     const storedCountriesList = storageService.load('countriesList', null)

//     // If there is data, return it
//     if (storedCountriesList) return storedCountriesList

//     // If no data in storage, make the API request
//     const response = await axios.get(`${API_BASE_URL}/all`)
//     const countriesList = response.data

//     // Store the data in local storage for future use
//     storageService.store('countriesList', countriesList)

//     return countriesList
//   } catch (error) {
//     throw new Error('Error fetching countries list')
//   }
// }
