import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// const RolesObj = 'Roles'

export function getToken(type = 1) {
  let name
  if (type) {
    name = TokenKey
  } else {
    name = RolesObj
  }
  return Cookies.get(name)
}

export function setToken(token, type = 1) {
  let name
  if (type) {
    name = TokenKey
  } else {
    name = RolesObj
  }
  return Cookies.set(name, token, { expires: 1 })
}

export function removeToken(type = 1) {
  let name
  if (type) {
    name = TokenKey
  } else {
    name = RolesObj
  }
  return Cookies.remove(name)
}
