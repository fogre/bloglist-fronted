import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  Container,
  IconButton,
  Link,
  Paper,
  Typography
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Blog = ({ blog, user }) => {
  
  const classes = useStyles()

  if (!blog) return null

  return (
    <Card className={classes.root}>
      <Typography variant='h5'>{blog.title} by {blog.author}</Typography>
      <span className={classes.blogUrl}>
        <Link href={blog.url} target="_blank" rel="noreferrer">
          <LinkIcon fontSize='large'/>
          <Typography display='inline'>{blog.url}</Typography>
        </Link>  
      </span> 
      <Typography className={classes.cardTypog}>
        {blog.likes}
      </Typography> 
    </Card>
  )  
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1vw'
  },
  blogUrl: {
  }
}))

export default Blog
