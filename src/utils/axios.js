import axios from 'axios'
import { getCookie } from './cookie.js'

const client = axios.create({
  baseURL: 'https://panghoon.shop:443',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
})

client.interceptors.request.use(async (config) => {
  const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
  const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
  config.headers['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
  config.headers['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
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
