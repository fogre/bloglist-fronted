import blogService from '../services/blogs'
import { showError } from '../reducers/notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = blog => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: addedBlog
      })
    } catch (excep) {
      showError(dispatch, excep)
    }
  }
}

export const updateBlog = (id, blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch (excep) {
      showError(dispatch, excep)
    }  
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      const response = await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: id
      })
    } catch (excep) {
      showError(dispatch, excep)
    }  
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG': 
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      return state.map(blog => 
        blog.id !== action.data.id ? blog : action.data
      )
    case 'REMOVE_BLOG':
      return state.filter(blog => 
        blog.id !== action.id
      )    
    default:
      return state    
  }
}

export default blogReducer