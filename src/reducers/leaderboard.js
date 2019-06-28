import { LEADERBOARDS_PAGE_LOADED } from '../constants/actionTypes';

const notification = (state = { list: [] }, action) => {

  switch (action.type) {
    case LEADERBOARDS_PAGE_LOADED:
      return Object.assign({}, state, {
        list: action.payload.leaderboard.filter(s => s !== null),
      })

      default:
        return state
  }
}

export default notification
