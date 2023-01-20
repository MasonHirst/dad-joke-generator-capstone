import axios from 'axios'

const api = axios.create({ baseURL: "http://localhost:3339" })

api.interceptors.request.use(async (options) => {
  const accessToken = localStorage.getItem('accessToken')
  options.headers.Authorization = accessToken
  return options
})

export async function getUser() {
   const {data} = await api.get(`/accounts/users`)
   return data
}

