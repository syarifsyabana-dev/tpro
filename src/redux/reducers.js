import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import auth from './auth/reducers'

const Reducers = history => combineReducers({
  router: connectRouter(history),
  auth,
})

export default Reducers