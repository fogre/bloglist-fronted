import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = newBlog => {
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(newBlog))
  }

  const addLike = async blog => {
    try {
      const addedBlog = await blogService.update(blog.id, { ...blog, user:user.id, likes: blog.likes+1 })
      const newBlogs = [...blogs]
      const index = newBlogs.findIndex(blg => blg.id === addedBlog.id)
      newBlogs[index] = {...addedBlog, user: user}
      setBlogs(newBlogs)
    } catch(excep) {
      showMessage(excep.message)
    }   
  }

  const logInUser = user => {
    setUser(user)
  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const showMessage = msg => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  console.log(blogs)
  return (
    <div>
      <Notification message={message} />
      {!user ?
        <Toggable buttonLabel="Login" ref={loginFormRef}>
          <LoginForm logIn={logInUser} errorMessage={showMessage} />
        </Toggable> :
        <div>
          <div>
            {user.name ? user.name : user.username} logged in
            <button onClick={logOutUser}>logout</button>
          </div>
          <Toggable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm serviceFunction={blogService.create} callBack={addBlog}/>
          </Toggable>
        </div>
      }
      
      <h2>blogs</h2>
      <BlogList blogs={blogs} addLike={addLike} />
    </div>
  )
}

export default App