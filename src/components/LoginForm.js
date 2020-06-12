import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()
  const [password, setPassword] = useState('') 
  const [username, setUsername] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    dispatch(loginUser({
      username: username,
      password: password
    }))
    setPassword('')
  }

	return (
		<div>
	    <h2>Login</h2>
	    <form onSubmit={handleLogin}>
		    <div>
		      username
	        <input
            id='LoginUser'
		        type="text"
		        value={username}
		        name="Username"
		        onChange={({ target }) => setUsername(target.value)}
		      />
		    </div>
		    <div>
		      password
		        <input
            id='LoginPass'
		        type="password"
		        value={password}
		        name="Password"
		        onChange={({ target }) => setPassword(target.value)}
		      />
		    </div>
		    <button id='LoginButton' type="submit">login</button>
		  </form>
		</div>  
	)    
}

export default LoginForm