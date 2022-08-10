import axios from 'axios'
import { getHeader, getHeaderWoAuth } from 'utils/headers'

export function API_LOGIN(payload) {
  return axios.post(process.env.REACT_APP_LOGIN_API, payload,{headers: getHeaderWoAuth()}).then(res => res.data)
}

export function API_LIVE_ATTENDANCE(payload) {
  return axios.post(process.env.REACT_APP_LIVE_ATTENDANCE_API, payload,{headers: getHeader()}).then(res => res.data)
}