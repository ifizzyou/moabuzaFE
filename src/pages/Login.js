import * as React from 'react'
import styled from 'styled-components'
import { KAKAO_AUTH_URL } from '../utils/OAuth'
import { setFlexStyles } from '../styles/Mixin'


function Login() {
  return (
    <Wrapper>

      <KakaoLogin onClick={()=> window.location.href(KAKAO_AUTH_URL)}>
        <img src="img/kakao_login_medium_wide.png" alt="카카오계정 로그인" />
      </KakaoLogin>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'center',
  })}
  position: relative;
  width: 100%;
  height: 100%;
`
const KakaoLogin = styled.button`
  margin-top: 160%;
`

export default Login
