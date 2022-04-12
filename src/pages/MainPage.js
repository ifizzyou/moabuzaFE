/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilState, atom } from 'recoil'
import { NavLink, useNavigate } from 'react-router-dom'
import ProgressBar from '@ramonak/react-progress-bar'

import { isMobile } from 'react-device-detect'
import { setFlexStyles } from '../styles/Mixin'
import { getCookie, setCookie } from '../utils/cookie'

import { toggleGroupChallenge } from '../recoil/homeToggle'
import { useMainPageData } from '../apis/mainpageData'
import { ReactComponent as Alert } from '../assets/icons/alert/alram.svg'
import { ReactComponent as AlertOn } from '../assets/icons/alert/alram-1.svg'
import { ReactComponent as Plus } from '../assets/icons/plus/akar-icons_plus.svg'
import Loading from './Loading'
import ErrorLog from './ErrorLog'
import Nav from '../components/Nav'
import '../styles/MenuTransition.css'
import { setItem } from '../utils/sessionStorage'
import {
  BunnyGG,
  TongkiGG,
  TanniGG,
  TanniStep03,
  TanniStep02,
  TanniStep01,
  BunnyStep03,
  TongkiStep03,
  TongkiStep02,
  TongkiStep01,
  BunnyStep02,
  BunnyStep01,
} from '../assets/character'
import { SetCharacter } from '../utils/setCharacter'
import { setMoveToLoginPage } from '../utils/setMoveToLoginPage'

// 홈에 있는 주석을 절대 삭제하지 말아주세요

function MainPage() {
  const [toggle, setToggle] = useRecoilState(toggleGroupChallenge)
  const navigate = useNavigate()
  setItem('nowdate', new Date())

  const { isLoading, data, isError, error } = useMainPageData(navigate)

  function makeGoal() {
    if (toggle === 'group') {
      navigate('/groupbuzacreate')
    }
    if (toggle === 'challenge') {
      navigate('/challengebuzacreate')
    }
  }

  const leftToggleBtn = () => {
    if (toggle === 'challenge') {
      setToggle('group')
    }
  }
  const rightToggleBtn = () => {
    if (toggle === 'group') {
      setToggle('challenge')
    }
  }
  useEffect(() => {
    const accessToken = getCookie('A-AUTH-TOKEN')
    if (!accessToken && !isLoading) {
      setMoveToLoginPage()
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorLog error={error} />
  }

  const nowChallengePercent = data.data.challengePercent
  const nowGroupPercent = data.data.groupPercent
  const userNickName = data.data.nickname

  return (
    <Wrapper>
      <ColorWrapper>
        <NavLink to="/alerts">
          <RightButtonDiv />
          {data && data?.data?.alarmCount > 0 ? (
            <AlertOn
              style={{
                width: '24px',
                height: '24px',
                left: '88.89%',
                top: '8.43%',
                position: 'absolute',
              }}
            />
          ) : (
            <Alert
              style={{
                width: '24px',
                height: '24px',
                left: '88.89%',
                top: '8.43%',
                position: 'absolute',
              }}
            />
          )}
        </NavLink>
        <Toggle>
          <LeftBtn toggle={toggle} onClick={leftToggleBtn}>
            같이해부자
          </LeftBtn>
          <RightBtn toggle={toggle} onClick={rightToggleBtn}>
            도전해부자
          </RightBtn>
        </Toggle>
        <FlexDiv>
          <UserNickName>{userNickName} 님</UserNickName>
        </FlexDiv>

        {toggle === 'group' && data.data.groupName ? (
          <>
            <ContentGoalName>{data?.data?.groupName}</ContentGoalName>
            <CharacterWrapper
              src={SetCharacter(data.data.hero, nowGroupPercent)}
            />
            <ContentUnderDiv>
              <ContentWon>
                {data.data.groupNeedAmount.toLocaleString('en-US')}원
              </ContentWon>
              <ContentNeed>남았어요!</ContentNeed>
            </ContentUnderDiv>

            <ProgressDiv>
              <ProgressBar
                completed={data.data.groupPercent}
                animateOnRender
                bgColor="#4675F0"
                baseBgColor="#E5EAF2"
                height="20px"
                margin="0 auto"
                borderRadius="11px"
                labelAlignment={data.data.groupPercent > 9 ? 'center' : 'left'}
                labelSize="14px"
                width="91.1%"
              />
            </ProgressDiv>
          </>
        ) : (
          ''
        )}
        {toggle === 'group' && !data.data.groupName ? (
          <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
        ) : (
          ''
        )}
        {toggle === 'challenge' && data.data.challengeName ? (
          <div>
            <ContentGoalName>{data?.data?.challengeName}</ContentGoalName>
            <CharacterWrapper
              src={SetCharacter(data.data.hero, nowChallengePercent)}
            />
            <ContentUnderDiv>
              <ContentWon>
                {data?.data?.challengeNeedAmount.toLocaleString('en-US')}원
              </ContentWon>
              <ContentNeed>남았어요!</ContentNeed>
            </ContentUnderDiv>

            <ProgressDiv>
              <ProgressBar
                completed={data.data.challengePercent}
                animateOnRender
                bgColor="#4675F0"
                baseBgColor="#E5EAF2"
                width="91.11%"
                height="20px"
                margin="0 auto"
                borderRadius="11px"
                labelAlignment={
                  data.data.challengePercent > 9 ? 'center' : 'left'
                }
                labelSize="14px"
              />
            </ProgressDiv>
          </div>
        ) : (
          ''
        )}
        {toggle === 'challenge' && !data.data.challengeName ? (
          <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
        ) : (
          ''
        )}
        {data && toggle === 'group' && !data.data.groupName ? (
          <>
            <CharacterWrapper
              src={
                data.data.hero === 'tanni'
                  ? TanniGG
                  : data.data.hero === 'tongki'
                  ? TongkiGG
                  : data.data.hero === 'bunny'
                  ? BunnyGG
                  : null
              }
            />
            <SetAmountButton onClick={() => makeGoal()}>
              목표를 설정해주세요
            </SetAmountButton>
          </>
        ) : (
          ''
        )}
        {data && toggle === 'challenge' && !data.data.challengeName ? (
          <>
            <CharacterWrapper
              src={
                data.data.hero === 'tanni'
                  ? TanniGG
                  : data.data.hero === 'tongki'
                  ? TongkiGG
                  : data.data.hero === 'bunny'
                  ? BunnyGG
                  : null
              }
            />
            <SetAmountButton onClick={() => makeGoal()}>
              목표를 설정해주세요
            </SetAmountButton>
          </>
        ) : (
          ''
        )}
      </ColorWrapper>
      <QuickToggle
        onClick={() => {
          navigate('/onedaypost')
        }}
      >
        <Plus />
      </QuickToggle>
      <BottomLine style={{ top: '69.58%' }}>
        <MyWallet>나의 지갑은</MyWallet>
        <Won>{data ? data.data.wallet.toLocaleString('en-US') : '0'}원</Won>
      </BottomLine>
      <BottomLine style={{ top: '79.03%' }}>
        <MyWallet>나의 자산은</MyWallet>
        <Won>
          {data ? data.data.totalAmount.toLocaleString('en-US') : '0'}원
        </Won>
      </BottomLine>

      <Nav />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const ColorWrapper = styled.div`
  height: 66%;
  background-color: #f6f9fe;
  border-top-left-radius: ${isMobile ? '0px' : '31.4px'};
  border-top-right-radius: ${isMobile ? '0px' : '31.4px'};
`

const CharacterWrapper = styled.img`
  position: absolute;
  width: 287px;
  height: 168px;
  left: calc(50% - 143.5px);
  top: 31.52%;
`
const RightButtonDiv = styled.div`
  position: absolute;
  left: 85.56%;
  top: 4.03%;
  width: 48px;
  height: 48px;
`

const RightButton = styled.div`
  position: absolute;
  left: 88.89%;
  top: 5.69%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`

const Toggle = styled.div`
  border-radius: 20px;
  position: absolute;
  width: 50.5%;
  height: 34px;
  left: 24.7%;
  top: 7.78%;
  background-color: #e5eaf2;
  padding: 2px 2.55px;
  display: flex;
  justify-content: space-between;
`

const LeftBtn = styled.button`
  width: 51%;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'challenge' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'challenge' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'challenge' ? '#8c939d' : 'white')};
  font-size: 14px;
  white-space: nowrap;
  border-radius: 20px;
  border: none;
`

const RightBtn = styled.button`
  width: 51%;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'group' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'group' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'group' ? '#8c939d' : 'white')};
  white-space: nowrap;
  font-size: 14px;
  border-radius: 20px;
  border: none;
`
const FlexDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`
const UserNickName = styled.div`
  position: absolute;
  top: 15%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.04em;

  /* color/text/Color-text-Gray3 */

  color: #60666f;
`
const ContentGoalName = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 31px;
  top: 18.06%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  /* identical to box height, or 31px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;
  /* color / gray / Gray80 */
  color: #333333;
`
const ContentUnderDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 23.47%;
  width: 100%;
  height: 29px;
`
const ContentWon = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -0.04em;
  color: #4675f0;
  margin-right: 6px;
`
const ContentNeed = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.04em;

  color: #333333;
`
const ContentDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 31px;

  top: 18.06%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  /* identical to box height, or 31px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;
  /* color / gray / Gray80 */
  color: #333333;
`
const SetAmountButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  position: absolute;
  width: 171px;
  height: 48px;
  left: calc(50% - 85.5px);
  top: 56.25%;
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(205, 218, 240, 0.8);
  border-radius: 24px;
`

const ProgressDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  top: 62.08%;
`

const BottomLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  position: absolute;
  width: 91.1%;
  height: 6.7%;
  background: #f5f5f7;
  border-radius: 8px;
  margin: 0% 4.45%;
`

const MyWallet = styled.span`
  font-family: 'Roboto-Medium';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5%;
  margin-right: 1%;
`

const Won = styled.span`
  font-family: 'Roboto-Medium';
  font-style: normal;
  font-size: 18px;
  line-height: 21px;
`

const ChartBtn = styled.button`
  border: none;
  position: fixed;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  padding: 9px 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  background: #ffb000;
  border-radius: 14px;
  margin-left: 243.5px;
`

const QuickToggle = styled.div`
  position: absolute;
  width: 58px;
  height: 58px;
  left: 79.4%;
  top: 78.1%;
  border-radius: 50%;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  background-color: #ffb000;
  z-index: 99;
  background: #ffb000;
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.18);
`

export default MainPage
