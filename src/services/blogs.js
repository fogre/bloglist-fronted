import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const create = async newObject => {
	console.log('creating...')
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(res => res.data)
}

export default { getAll, create, update, setToken }