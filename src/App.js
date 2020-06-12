import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Route, Link, Switch, useRouteMatch
} from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core';
//import { ThemeProvider } from '@material-ui/core/styles';
import { showNotif } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog } from './reducers/blogReducer'
import { getCachedUser } from './reducers/userReducer'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
//import customTheme from './ui/theme'
import Notification from './components/Notification'
import Menu from './components/Menu'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      dispatch(getCachedUser(loggedUserJSON))
    }  
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogList = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogList.find(b => b.id === match.params.id)
    : null

  const addLike = async blog => {
    dispatch(
      updateBlog(
        blog.id, 
        { ...blog, user:user.id, likes: blog.likes+1 }
      )
    )
    dispatch(
      showNotif({ 
        message:`You liked ${blog.title}`,
        severity: 'info'
      })
    )
  }

  console.log(user)
  console.log(blogList)
  return (
    <React.Fragment>
      {/*<ThemeProvider theme={customTheme}>*/}
        <CssBaseline />
        <Container>
          <Menu user={user} />
          <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={blog} />
            </Route>  
            <Route path='/'>
              <BlogList blogs={blogList} addLike={addLike} />
            </Route>
          </Switch>    
          <Notification />
        </Container>
      {/*</ThemeProvider>*/}  
    </React.Fragment>
  )
}

export default App