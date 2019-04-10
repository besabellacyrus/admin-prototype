import { apiUrl } from './config'
import axios from 'axios'

export const instance = axios.create({
  baseURL: apiUrl,
  timeout: 6000
})

export const getHeader = () => {
  const userData = JSON.parse(window.localStorage.getItem('authUser'))

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${userData.token}`
  }
  return headers
}
