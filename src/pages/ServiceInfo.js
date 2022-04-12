import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import Service from '../assets/serviceinfo/serviceInfo.jpeg'
import TitleText from '../components/Header/TitleText'
import LeftButton from '../components/Header/LeftButton'

function ServiceInfo() {
  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/">
          <Backarr
            style={{
              position: 'absolute',
              left: '4.3%',
              top: '5.6%',
              width: '24px',
              height: '24px',
            }}
          />
        </NavLink>
        <TitleText>서비스 소개</TitleText>
      </TopDiv>
      <ServiceInfoBox>
        <ServiceInfoImg src={Service} />
      </ServiceInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const TopDiv = styled.div`
  width: 100%;
  height: 82px;
`

const ServiceInfoBox = styled.div`
  height: 720px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const ServiceInfoImg = styled.img`
  width: 100%;
  object-fit: cover;
`

export default ServiceInfo
