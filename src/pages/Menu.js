import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'
import Swal from 'sweetalert2'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router'
import { ReactComponent as Friend } from '../assets/icons/menu/friend.svg'
import { ReactComponent as Rightarr } from '../assets/icons/arrow/rightarr.svg'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Edit } from '../assets/icons/settings/edit1.svg'
import { ReactComponent as Logout } from '../assets/icons/settings/logout.svg'
import { ReactComponent as Review } from '../assets/icons/settings/review.svg'
import { ReactComponent as Service } from '../assets/icons/menu/service_icon.svg'
import BugReport from '../assets/menu/moabuza-bugreport.png'
import SlideReview from '../assets/menu/moabuza-review.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { request } from '../utils/axios'
import { setFlexStyles } from '../styles/Mixin'
import { setMoveToLoginPage } from '../utils/setMoveToLoginPage'
import TitleText from '../components/Header/TitleText'

function Menu() {
  const navigate = useNavigate()
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
  }

  function logout() {
    Swal.fire({
      title: '로그아웃할 거지?',
      text: '꼭 다시 돌아와부자!',
      showCancelButton: true,
      confirmButtonText: '나가부자',
      cancelButtonText: '있어부자',
    }).then((result) => {
      if (result.isConfirmed) {
        request({ url: 'member/login', method: 'get' })
        setMoveToLoginPage()
      }
    })
  }
  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/">
          <ButtonDiv />
          <Backarr
            style={{
              position: 'absolute',
              left: '4.44%',
              top: '47.67%',
              width: '24px',
              height: '24px',
            }}
          />
        </NavLink>
        <TopLine />
      </TopDiv>
      <TitleText>메뉴</TitleText>

      <MenuSlideBox>
        <Slider {...settings}>
          <div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScg9H1bTpzJfb9r6eby8hAjKaNGscTfDhUi3zvWkpRaUFj-DA/viewform">
              <SlideImg
                src={BugReport}
                style={{ width: '100%', height: '30%' }}
              />
            </a>
          </div>

          <div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhtX5e7Xpzn2pwnLxtFYJecxKugNq0k0bzrgGKCXo32rcX3Q/viewform">
              <SlideImg
                src={SlideReview}
                style={{ width: '100%', height: '30%' }}
              />
            </a>
          </div>
        </Slider>
      </MenuSlideBox>

      <NavLink to="/friends">
        <TodayDiv style={{ top: isMobile ? 'calc(83px + 45vw)' : '243px' }}>
          <Friend
            style={{
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
              position: 'absolute',
            }}
          />
          <TodayText>친구</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              right: '4.44%',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>
      <NavLink to="/modified">
        <TodayDiv style={{ top: isMobile ? 'calc(143px + 45vw)' : '303px ' }}>
          <TodayLogoDiv />
          <Edit
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
            }}
          />
          <TodayText>캐릭터/닉네임 수정</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              right: '4.44%',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>

      <NavLink to="/serviceinfo">
        <TodayDiv style={{ top: isMobile ? 'calc(203px + 45vw)' : '363px' }}>
          <TodayLogoDiv />
          <Service
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
            }}
          />
          <TodayText>서비스 소개</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              right: '4.44%',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhtX5e7Xpzn2pwnLxtFYJecxKugNq0k0bzrgGKCXo32rcX3Q/viewform">
        <TodayDiv style={{ top: isMobile ? 'calc(263px + 45vw)' : '423px' }}>
          <TodayLogoDiv />
          <Review
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
            }}
          />
          <TodayText>만족도 설문조사</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              right: '4.44%',
              top: '18px',
            }}
          />
        </TodayDiv>
      </a>

      <TodayDiv
        onClick={() => logout()}
        style={{ top: isMobile ? 'calc(323px + 45vw)' : '483px' }}
      >
        <TodayLogoDiv />
        <Logout
          style={{
            position: 'absolute',
            width: '24px',
            height: '24px',
            left: '16px',
            top: '18px',
          }}
        />
        <TodayText>로그아웃</TodayText>
        <Rightarr
          style={{
            position: 'absolute',
            width: '24px',
            height: '24px',
            right: '4.44%',
            top: '18px',
          }}
        />
      </TodayDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const TopDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 86px;
  left: 0px;
  top: 0px;
`

const MenuSlideBox = styled.div`
  position: absolute;
  width: 100%;
  height: 160px;
  left: 0px;
  top: 83px;
`

const SlideImg = styled.img`
  width: 360px;
  height: 160px;
`

const ButtonDiv = styled.div`
  position: absolute;
  left: 1.11%;
  right: 85.56%;
  top: 33.72%;
  bottom: 10.47%;
`

const TopLine = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 98.84%;
  bottom: 0%;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`

const TodayDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 8.333%;
`
const TodayLogoDiv = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 6px;

  /* background: rgba(196, 196, 196, 0.3); */
`

const TodayText = styled.div`
  position: absolute;
  width: 150px;
  height: 14px;
  left: 57px;
  top: 23px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  color: #000000;
`

export default Menu
