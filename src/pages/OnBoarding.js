import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { ReactComponent as LeftArr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as RightArr } from '../assets/icons/arrow/right_arrow.svg'

import '../styles/OnBoarding.css'

import {
  HomeGuide,
  ChallengeGuide,
  OneDayBuzaDelete,
  OneDayBuzaGuide,
  GroupBuzaGuide,
} from '../assets/onboarding'
import { TanniFace } from '../assets/character'

function OnBoarding() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Carousel showThumbs={false}>
        <div>
          <TextDiv>
            <TextArea>
              친구들과 함께
              <TextArea fontWeight="500" margin="0 auto 10px auto">
                {' '}
                저축 습관을 길러보세요!
              </TextArea>
            </TextArea>

            <OnBoardingImg src={HomeGuide} alt="" />
          </TextDiv>
          <PrevArrow />
          <NextArrow />
          <JumpButton
            type="button"
            onClick={() => {
              navigate('/tutorial')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
          >
            건너뛰기!
          </JumpButton>
        </div>
        <div>
          <TextDiv>
            <TextArea>
              하루부자의 내역을
              <TextArea fontWeight="500" margin="0 auto 10px auto">
                {' '}
                밀어서 삭제해보세요!
              </TextArea>
            </TextArea>

            <OnBoardingImg src={OneDayBuzaGuide} alt="" />
          </TextDiv>
          <PrevArrow />
          <NextArrow />

          <JumpButton
            type="button"
            onClick={() => {
              navigate('/tutorial')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
          >
            건너뛰기!
          </JumpButton>
        </div>
        <div>
          <TextDiv>
            <TextArea>
              공동의 목표를 친구와
              <TextArea fontWeight="500" margin="0 auto 10px auto">
                {' '}
                함께 달성해보세요!
              </TextArea>
            </TextArea>

            <OnBoardingImg src={OneDayBuzaDelete} alt="" />
          </TextDiv>
          <PrevArrow />
          <NextArrow />

          <JumpButton
            type="button"
            onClick={() => {
              navigate('/tutorial')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
          >
            건너뛰기!
          </JumpButton>
        </div>
        <div>
          <TextDiv>
            <TextArea>
              목표 금액을 세우고
              <TextArea fontWeight="500" margin="0 auto 10px auto">
                {' '}
                도전해봐요!
              </TextArea>
            </TextArea>

            <OnBoardingImg src={GroupBuzaGuide} alt="" />
          </TextDiv>
          <PrevArrow />
          <NextArrow />

          <JumpButton
            type="button"
            onClick={() => {
              navigate('/tutorial')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
          >
            건너뛰기!
          </JumpButton>
        </div>
        <div>
          <TextDiv>
            <TextArea>
              친구들과 함께 <br />
              <TextArea fontWeight="500" margin="0 auto 10px auto">
                {' '}
                저축 습관을 길러보세요!
              </TextArea>
            </TextArea>

            <OnBoardingImg src={ChallengeGuide} alt="" />
          </TextDiv>
          <PrevArrow />
          <NextArrow />

          <JumpButton
            type="button"
            onClick={() => {
              navigate('/tutorial')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
          >
            열심히 모아부자!
          </JumpButton>
        </div>
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const TextArea = styled.div`
  height: 58px;
  margin-bottom: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 100};
  font-size: 21px;
  line-height: 140%;
  letter-spacing: -0.04em;
  color: #000000;
`
const TextDiv = styled.div`
  margin-top: 10%;
`
const JumpButton = styled.button`
  position: absolute;
  width: 91.2%;
  height: 52px;
  left: 16px;
  bottom: -20%;

  /* color/Secondary */
  background: #4675f0;
  border-radius: 8px;

  /* Button / Noto Sans KR / Btn_Md(m) */
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;

  /* identical to box height, or 14px */
  text-align: center;

  /* Rectangle 173 */
  color: #ffffff;
  z-index: 2;
`

const OnBoardingImg = styled.img`
  width: 217px !important;
  height: 402px;
`

const PrevArrow = styled(LeftArr)`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 48%;
  overflow: visible;
`
const NextArrow = styled(RightArr)`
  position: absolute;
  width: 48px;
  height: 48px;
  right: 4px;
  top: 48%;
  overflow: visible;
`

export default OnBoarding
