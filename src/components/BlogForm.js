import React, { useState } from 'react'
import Notification from './Notification'

 const BlogForm = ({serviceFunction, callBack, blogi = null}) => {

 	const [newBlog, setNewBlog] = useState(
 		blogi ? blogi : { title: '', author: '', url: '' }
 	)
 	const [message, setMessage] = useState(null)

 	const handleBlogChange = e => {
 		const blog = {...newBlog}
 		blog[e.target.name] = e.target.value
 		setNewBlog(blog)
 	}

 	const formFunction = async e => {
 		e.preventDefault()
 		setMessage(null)
 		try {
 			const blog = await serviceFunction(newBlog)
 			callBack(blog)
 			setNewBlog({ title: '', author: '', url: '' })
 		} catch (excep) {
 			setMessage("Title and url are required")
 		}	
 	}

 	return(
 		<div>
 		  <h2>Add blog</h2>
 		  <Notification message={message} />
	    <form onSubmit={formFunction}>
	    	<div>
		    	title:
		      <input
		      	name='title'
		        value={newBlog.title}
		        onChange={handleBlogChange}
		      />
		    </div>  
		    <div>
		      author:
		      <input
		      	name='author'
		        value={newBlog.author}
		        onChange={handleBlogChange}
		      />
		    </div> 
		    <div>
		      url: 
		      <input
		      	name='url'
		        value={newBlog.url}
		        onChange={handleBlogChange}
		      />
	      </div>
	      <button type="submit">save</button>
	    </form> 
	  </div>
	)    
}
export default BlogForm