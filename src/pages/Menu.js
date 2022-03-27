import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'
import Swal from 'sweetalert2'
import { ReactComponent as Challenge } from '../assets/icons/menu/challenge.svg'
import { ReactComponent as Asset } from '../assets/icons/menu/Asset28.svg'
import { ReactComponent as Friend } from '../assets/icons/menu/friend.svg'
import { ReactComponent as Setting } from '../assets/icons/menu/setting.svg'
import { ReactComponent as Together } from '../assets/icons/menu/together.svg'
import { ReactComponent as Vector } from '../assets/icons/menu/Vector.svg'
import { ReactComponent as Rightarr } from '../assets/icons/arrow/rightarr.svg'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Edit } from '../assets/icons/settings/edit1.svg'
import { ReactComponent as Logout } from '../assets/icons/settings/logout.svg'
import { ReactComponent as Review } from '../assets/icons/settings/review.svg'
import BugReport from '../assets/menu/moabuza-bugreport.png'
import SlideReview from '../assets/menu/moabuza-review.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { setFlexStyles } from '../styles/Mixin'

function Menu() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
  }

  function logout() {
    console.log('gkgk')
    Swal.fire({
      title: '로그아웃할 거지?',
      text: '꼭 다시 돌아와부자!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '나가부자',
      cancelButtonText: '있어부자',
    }).then((result) => {
      if (result.value) {
        console.log(result)
        // this.props.submitUser(this.state)
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
        <Title>메뉴</Title>
        <TopLine />
      </TopDiv>

      <MenuSlideBox>
        <Slider {...settings}>
          <div>
            <SlideImg src={BugReport} />
          </div>
          <div>
            <SlideImg src={SlideReview} />
          </div>
        </Slider>
      </MenuSlideBox>

      <NavLink to="/friends">
        <TodayDiv style={{ top: '243px' }}>
          <Friend
            style={{
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
              position: 'absolute',
            }}
          />
          {/* <TodayLogo /> */}
          <TodayText>친구</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '320px',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>
      <NavLink to="/bedge">
        <TodayDiv style={{ top: '303px' }}>
          <Asset
            style={{
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
              position: 'absolute',
            }}
          />
          <TodayText>뱃지</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '320px',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>

      <NavLink to="/modified">
        <TodayDiv style={{ top: '363px' }}>
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
              left: '320px',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>

      <NavLink to="/review">
        <TodayDiv style={{ top: '423px' }}>
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
          <TodayText>리뷰</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '320px',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>
      <NavLink to="/settings">
        <TodayDiv style={{ top: '483px' }}>
          <Setting
            style={{
              width: '24px',
              height: '24px',
              left: '16px',
              top: '18px',
              position: 'absolute',
            }}
          />
          <TodayText>설정</TodayText>
          <Rightarr
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '320px',
              top: '18px',
            }}
          />
        </TodayDiv>
      </NavLink>
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
  width: 360px;
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

const Title = styled.div`
  position: absolute;
  left: 46.11%;
  right: 45.83%;
  top: 50%;
  bottom: 23.26%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
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
  width: 360px;
  height: 8.333%;
  left: 0px;
`
const TodayLogoDiv = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 6px;

  /* background: rgba(196, 196, 196, 0.3); */
`
const TodayLogo = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 16px;
  top: 18px;

  /* background: #c4c4c4; */
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
