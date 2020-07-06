import actionTypes from './actionTypes'
import { getNotifications } from '../requests'

const startPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST,
  }
}

const finishPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST,
  }
}

export const markAllNotificationsAsRead = () => {
  return dispatch => {
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATIONS_AS_READ,
      })
      dispatch(finishPost())
    }, 1000)
  }
}

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        },
      })
      dispatch(finishPost())
    }, 1000)
  }
}

export const getNotificationList = () => {
  return dispatch => {
    dispatch(startPost())
    getNotifications()
      .then(resp => {
        dispatch({
          type: actionTypes.RECIVED_NOTIFICATIONS,
          payload: {
            list: resp.list
          }
        })
        dispatch(finishPost())
      })
  }
}