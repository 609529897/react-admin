import actionTypes from './actionTypes'

export const markAllNotificationsAsRead = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATIONS_AS_READ,
      })
    }, 1000)
  }
}

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        },
      })
    }, 1000)
  }
}