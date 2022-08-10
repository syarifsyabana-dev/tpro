import { message } from 'antd'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import { API_LOGIN } from 'apis'
import actions from './actions'

export function* DO_AUTH() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      isLoggedIn: localStorage.getItem('isLoggedIn'),
    }
  })
}

export function* DO_LOGIN({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  try {
    const user = yield call(API_LOGIN, payload)
    if (user.status === 200) {
      localStorage.setItem('token', user.data.token);
      localStorage.setItem('email', payload.email);
      localStorage.setItem('isLoggedIn', true);
      yield put({
        type: actions.SET_STATE,
        payload: {
          token: user.data.token,
          email: payload.email,
          isLoggedIn: true
        }
      })
      message.success(user.message)
    } else {
      message.error(user.message)
    }
  } catch (error) {
    message.error('Login Error')
  } finally {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
  }
}

export function* HANDLE_STATE({ field, value }) {
  yield put({
    type: 'auth/SET_STATE',
    payload: {
      [field]: value
    }
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.HANDLE_STATE, HANDLE_STATE),
    takeEvery(actions.AUTH_LOGIN, DO_LOGIN),
    DO_AUTH(),
  ])
}
