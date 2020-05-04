import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import blogService from '../services/blogs'


const BlogList = (props) => {

	const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Blogdetails = ({blog}) => (
		<ExpansionPanelDetails className={classes.content}>
	    <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
	    <p>{blog.likes} likes
	      <IconButton onClick={() => props.addLike(blog)}>
	        <ThumbUpAltIcon />
	      </IconButton>
	    </p>
	    <p>Added by {blog.user.username}</p>
		</ExpansionPanelDetails>
  )
	return(
     <div key={props.blogs} className={classes.root}>
      {props.blogs.map(blog => (
      	<div className={classes.blogContainer} key={blog.id}>
         <ExpansionPanel expanded={expanded === blog.id} onChange={handleChange(blog.id)} >
	          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id={blog.id} >
	            <Typography className={classes.heading}>{blog.title}</Typography>
	            <Typography className={classes.secondaryHeading}>{blog.author}</Typography>
        		  <Typography className={classes.likes}>Likes: {blog.likes}</Typography>
        		</ExpansionPanelSummary>
        		<Blogdetails blog={blog} classes={classes} />
      		</ExpansionPanel>
      	</div>	
      ))}
    </div>
	)
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  blogContainer: {
  	width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  likes: {
  	fontSize: theme.typography.pxToRem(15),
  },
  content: {
  	display: 'block'
  }
}));

export default BlogList