import React from 'react'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'
import { newBlog } from '../reducers/blogReducer'
import Toggable from './Toggable'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  const addBlog = blog => {
    dispatch(newBlog(blog))
  }
  
  const logOut = () => {
    dispatch(logOutUser())    
  }

  return (
    <div>
      {!user ?
        <Toggable buttonLabel="login" ref={loginFormRef}>
          <LoginForm />
        </Toggable> :
        <div>
          <div>
            {user.name ? user.name : user.username} logged in
            <button id='LogoutButton' onClick={logOut}>logout</button>
          </div>
          <Toggable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm callBack={addBlog}/>
          </Toggable>
        </div>
      }
    </div> 
  )
}

export default Menu