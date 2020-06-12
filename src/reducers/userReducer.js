import userService from '../services/login'
import { showError } from './notificationReducer'

let token = null

const setToken = user => {
  token = `bearer ${user.token}`
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user =  await userService.login(credentials)
      dispatch({
        type: 'LOGIN',
        user: user
      })
    } catch (excep) {
      showError(dispatch, excep)
    }
  }
}

export const getCachedUser = loggedUserJSON => {
  const user = JSON.parse(loggedUserJSON)
  return {
    type: 'CACHED_USER',
    user: user
  }
}

export const logOutUser = () => {
  return {
    type: 'LOG_OUT'
  }
}

export const getToken = () => {
  return token
}


const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(action.user) 
      )
      setToken(action.user)
      return action.user
    case 'CACHED_USER':
      setToken(action.user.token)
      return action.user  
    case 'LOG_OUT':
      localStorage.removeItem('loggedBloglistAppUser')
      token = null
      return null
    default: 
      return state
  }
}

export default userReducer