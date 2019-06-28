import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_ACHIEVEMENTS_PAGE_LOADED,
  PROFILE_ACHIEVEMENTS_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_ACHIEVEMENTS_PAGE_LOADED:
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0].profile
      };
    case PROFILE_ACHIEVEMENTS_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile
      };
    default:
      return state;
  }
};
