import actions from './actions'

const initialState = {
  loading: false,
  token: '',
  email: '',
  isLoggedIn: ''
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
