import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import moabuzaBg from './assets/bigbg.png'
import iphone from './assets/iphone.png'
import smallbg from './assets/smallbg.jpeg'

export const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function DeviceDetect({ children }) {
  return isMobile ? (
    <Layout>{children}</Layout>
  ) : (
    <WebBackgroundWrapper>
      <ClayPhone>
        <WebViewLayout>{children}</WebViewLayout>
      </ClayPhone>
    </WebBackgroundWrapper>
  )
}

DeviceDetect.propTypes = {
  children: PropTypes.element.isRequired,
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const WebViewLayout = styled(Layout)`
  max-width: 360px;
  max-height: 720px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 31.4px;
`

const ClayPhone = styled.div`
  width: 400px;
  height: 760px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${iphone}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    right: 17%;
    top: 50%;
    transform: translateX(0%);
    transform: translateY(-50%);
  }
`

const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background: url(${smallbg}) no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    background: url(${moabuzaBg}) no-repeat fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`

export default DeviceDetect
