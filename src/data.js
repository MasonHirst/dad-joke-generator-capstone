import axios from 'axios'
import { useContext } from 'react'

const api = axios.create({ baseURL: "http://localhost:3339" });

api.interceptors.request.use(async (options) => {
  const accessToken = localStorage.getItem('accessToken')
  options.headers.Authorization = accessToken;
  return options;
});

export async function getUser() {
   console.log('Starting the getUser() function')
   const {data} = await api.get(`/accounts/users`)
   return data
}

