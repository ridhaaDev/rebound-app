import axios from 'axios';

const requestConfig = {
    headers: {
        'x-api-key': process.env.REACT_APP_API_KEY
    }
}

const BASE_URL = process.env.REACT_APP_BASE_URL

export const loginUser = async (username, password) => {
    const requestBody = {
        username, password
    }

    return axios.post(`${BASE_URL}/login`, requestBody, requestConfig)
}

export const registerUser = async (username, email, name, password) => {
    const requestBody = {
        username, email, name, password
      }

      return axios.post(`${BASE_URL}/register`, requestBody, requestConfig)
}