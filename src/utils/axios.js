import axios from 'axios'
import { getCookie } from './cookie.js'

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
})

client.interceptors.request.use(async (config) => {
  const accessToken = getCookie('token')
  config.headers.authorization = `Bearer ${accessToken}`
  return config
})

export const request = ({ ...options }) => {
  console.log(client)
  const onSuccess = (response) => response
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}

export const apis = {
  // 카카오 소셜로그인
  kakaoLogin1: (code) => client.get(`/user/kakao/callback?code=${code}`),
}
