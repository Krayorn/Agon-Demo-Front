import {
  REGISTER,
  CLEAN_ACHIEVEMENT,
  FOLLOW_USER,
} from '../constants/actionTypes';


const notification = (state = { achievement: false }, action) => {

  switch (action.type) {
    case CLEAN_ACHIEVEMENT:
      return Object.assign({}, state, {
        achievement: false,
      })

    case REGISTER:
    case FOLLOW_USER:
      return Object.assign({}, state, {
        achievement: action.payload.unlockedAchievement || false,
      })

      default:
        return state
  }
}

export default notification
