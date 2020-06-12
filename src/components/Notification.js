import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Notification = () => {
  const classes = useStyles()
  const notif = useSelector(state => state.notification)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [notif])

  const handleClick = () => {
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  };

  if (!notif.message)
    return null

 	return (
 		<div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notif.severity}>
          {notif.message}
        </Alert>
      </Snackbar>    
  	</div>	
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default Notification