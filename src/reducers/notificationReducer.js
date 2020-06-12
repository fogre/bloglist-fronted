let timeoutID = null

export const showNotif = content => {
  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIF', data: content })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = await setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIF' })
    }, 5000)
  }
}

export const showError = (dispatch, excep) => {
  dispatch(showNotif({
      message: excep.response.data.error, 
      severity: 'warning' 
  }))
} 

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HIDE_NOTIF':
      timeoutID = null
      return {}
    case 'SHOW_NOTIF':
      return action.data
    default:
      return state
  }
}
export default notificationReducer