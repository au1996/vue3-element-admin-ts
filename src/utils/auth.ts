import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'roles'
const NameKey = 'name'
const AvatarKey = 'avatar'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function getRoles() {
  return Cookies.get(RoleKey)
}

export function setRoles(role: string) {
  return Cookies.set(RoleKey, role)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name: string) {
  return Cookies.set(NameKey, name)
}

export function getAvatar() {
  return Cookies.get(AvatarKey)
}

export function setAvatar(avatar: string) {
  return Cookies.set(AvatarKey, avatar)
}

export function clearUserInfo() {
  Cookies.remove(TokenKey)
  Cookies.remove(RoleKey)
  Cookies.remove(NameKey)
  Cookies.remove(AvatarKey)
}
