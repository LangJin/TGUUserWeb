/**
 * cookie util for
 */
import Cookie from 'js-cookie'

/**
 * @param {*} key
 * @param {*} value
 */
export function setCookie(key, value) {
  Cookie.set(key, value, {
    expires: 7,
  })
}

export function getCookie(key) {
  return Cookie.get(key)
}

export function deleteCookie(key) {
  Cookie.remove(key)
}

/**
 * userToken
 * @param {*} key
 * @param {*} value
 */
// export function writeToken(value) {
//   setCookie(tokenKey, value)
// }
// export function readToken() {
//   return getCookie(tokenKey)
// }
// export function deleteToken() {
//   deleteCookie(tokenKey)
// }
