import React from 'react'

const Notification = ({message}) => {
 	return (
 		<div>
  	{ 
  		!message ? 
  		  <span/> : 
  		  <h3>{message}</h3>
  	}
  	</div>	
  )
}

export default Notification