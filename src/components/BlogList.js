import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  IconButton,
  Link,
  Paper,
  Typography
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { deleteBlog } from '../reducers/blogReducer'
import { showNotif } from '../reducers/notificationReducer'

const BlogList = (props) => {
	const classes = useStyles()
  const dispatch = useDispatch()
  const [openBlog, setOpenBlog] = useState(false);

  const handleClickOpen = () => {
    setOpenBlog(true);
  };

  const handleClose = () => {
    setOpenBlog(false);
  };

  const removeBlog = blog => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      showNotif({
        message: `${blog.title} deleted`, 
        severity: 'info'
      })
    )
  }  

	return(
     <Paper className={classes.root}>
      <h2>blogs</h2>
      {props.blogs.map(blog => (
        <Card key={blog.id} className={classes.cardRoot}>
          <Link href={`/blogs/${blog.id}`} className={classes.cardBlogInfo} color='inherit'>
            <VisibilityIcon fontSize='small' className={classes.cardTypog} />
            <Typography className={classes.cardTypog}>
              {blog.title}
            </Typography>
            <Typography variant='body2' color='secondary' className={classes.cardTypog}>
              {blog.author ? `by ${blog.author}` : null  }
            </Typography>
          </Link>
          <span className={classes.cardLikes}>
            <button onClick={() => removeBlog(blog)}>delete</button>
            <IconButton>
              <Link href={blog.url} target="_blank" rel="noreferrer">
                <LinkIcon />
              </Link>  
            </IconButton>  
            <Typography className={classes.cardTypog}>
              {blog.likes}
            </Typography> 
            <IconButton onClick={()=> props.addLike(blog)}>
              <ThumbUpIcon />
            </IconButton>
          </span>
        </Card>
      ))}
    </Paper>
	)
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  cardRoot: {
    display: 'flex',
    marginTop: '1em',
    marginBottom: '1em',
    width: '100%'
  },
  cardBlogInfo: {
    display: 'flex',
    cursor: 'pointer'
  },
  cardTypog: {
    alignSelf: 'center',
    marginLeft: '0.5em'
  },
  cardLikes: {
    display: 'flex',
    marginLeft: 'auto',
  }

}));

export default BlogList