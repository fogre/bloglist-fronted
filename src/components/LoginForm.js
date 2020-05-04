import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({logIn}) => {

  const [password, setPassword] = useState('') 
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()
    setErrorMessage(null)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      logIn(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
    }
  }

	return (
		<div>
	    <h2>Login</h2>
	    <Notification message={errorMessage} />
	    <form onSubmit={handleLogin}>
		    <div>
		      username
		        <input
		        type="text"
		        value={username}
		        name="Username"
		        onChange={({ target }) => setUsername(target.value)}
		      />
		    </div>
		    <div>
		      password
		        <input
		        type="password"
		        value={password}
		        name="Password"
		        onChange={({ target }) => setPassword(target.value)}
		      />
		    </div>
		    <button type="submit">login</button>
		  </form>
		</div>  
	)    
}

export default LoginForm