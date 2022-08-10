export function getHeader() {
  let auth
  const token = localStorage.getItem('token')

  if (token === undefined || token === '') {
    auth = ''
  } else {
    auth = `Bearer ${token}`
  }
  return {
    Authorization: auth,
    'Content-Type': 'application/json; charset=UTF-8',
  }
}

export function getHeaderWoAuth(params) {
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    ...params,
  }
}

export function getHeaderMultipart(isAuth = true) {
  if (isAuth) {
    let auth
    const token = localStorage.getItem('token')
    if (token === undefined || token === '') {
      auth = ''
    } else {
      auth = `Bearer ${token}`
    }
    console.log('AUTH IS TRUE');
    return {
      Authorization: auth,
      'Content-Type': 'multipart/form-data',
    }
  } else {
    console.log('AUTH IS FALSE');
    return {
      'Content-Type': 'multipart/form-data',
    }
  }
}

export const master = {
  getHeader,
  getHeaderWoAuth,
  getHeaderMultipart,
}
