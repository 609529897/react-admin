import actionTypes from '../actions/actionTypes'

const initStateb = {
  isLoading: false,
  list: [{
    id: 1,
    title: '1-Lorem ipsum dolor sit amet',
    dest: '1-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    hasRead: false,
  }, {
    id: 2,
    title: '2-Lorem ipsum dolor sit amet',
    dest: '2-Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    hasRead: true,
  }]
}

export default (state = initStateb, action) => {
  switch (action.type) {
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false,
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      const allHasReadTrueNewList = state.list.map(item => {
        if (item.hasRead === false) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: allHasReadTrueNewList,
      }
    case actionTypes.RECIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}