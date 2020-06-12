import axios from 'axios'
import { getToken } from '../reducers/userReducer'

const baseUrl = '/api/blogs'

const create = async newObject => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request
}

export default { getAll, create, update, remove }