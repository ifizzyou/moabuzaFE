/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { useGroupData } from '../apis/groupData'
import { request } from '../utils/axios'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import Loading from './Loading'
import coin from '../assets/icons/coin/ico_coin1.png'
import {
  BunnyFace,
  TanniFace,
  TongkiFace,
  AllCharacters01,
  AllCharacters02,
  AllCharacters03,
} from '../assets/character'
import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'
import LeftButton from '../components/Header/LeftButton'

const shortid = require('shortid')

function GroupBuzaDetail() {
  const navigate = useNavigate()
  const { data, isLoading } = useGroupData(navigate)
  const cancelGroup = (id) => {
    Swal.fire({
      title: '그룹포기!',
      text: '진짜 포기하시겠어요?!!',
      showCancelButton: true,
      confirmButtonText: '넵 포기!',
      cancelButtonText: '취소!',
    }).then((result) => {
      if (result.isConfirmed) {
        request({
          url: `/group/doing`,
          method: 'post',
        }).then(() => {
          navigate('/groupbuza')
        })
      }
    })
  }

  const dateDescending = (a, b) => {
    const dateA = new Date(a.groupDate).getTime()
    const dateB = new Date(b.groupDate).getTime()
    return dateA < dateB ? 1 : -1
  }

  useEffect(() => {}, [navigate])
  if (isLoading) {
    return <Loading />
  }

  const groupData = data.data

  return (
    <Wrapper>
      <ColorWrapper>
        <LeftButton
          style={{ background: '#ebf2ff' }}
          onClick={() => {
            navigate('/groupbuza')
          }}
        >
          <Backarr />
        </LeftButton>

        <TitleText style={{ background: '#ebf2ff' }}>같이해부자</TitleText>

        <RightButton
          onClick={() => {
            cancelGroup()
          }}
          style={{ background: '#ebf2ff' }}
        >
          포기
        </RightButton>
      </ColorWrapper>
      <ScrollWrapper>
        <DetailWrapper>
          <DetailTitle>
            {data ? data.data.groupName : '그룹이름이 없습니다'}
          </DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>
              {data
                ? data.data.groupLeftAmount.toLocaleString('ko-KR')
                : '남은게 없네유'}
            </DetailAmount>
            <DetaileText> 원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {data
              ? data.data.groupMembers.map((data, idx) => {
                  return (
                    <GroupFriendIcon
                      key={shortid.generate()}
                      src={
                        data.groupMemberHero === 'tanni'
                          ? TanniFace
                          : data.groupMemberHero === 'tongki'
                          ? TongkiFace
                          : data.groupMemberHero === 'bunny'
                          ? BunnyFace
                          : null
                      }
                    />
                  )
                })
              : null}
          </GroupFriend>
          <DetailCharacter
            src={
              data?.data.groupNowPercent < 30
                ? AllCharacters01
                : data.data.groupNowPercent < 60
                ? AllCharacters02
                : data.data.groupNowPercent
                ? AllCharacters03
                : null
            }
          />
          <GoalAmount>
            목표 금액 : {groupData.groupGoalAmount.toLocaleString()} 원
          </GoalAmount>
          <ProgressBar
            completed={data ? data.data.groupNowPercent : 0}
            animateOnRender
            bgColor="#4675F0"
            baseBgColor="#ffffff"
            width="91.1%"
            height="22px"
            margin="0 auto"
            borderRadius="11px"
            labelAlignment={
              data && data.data.groupNowPercent > 9 ? 'center' : 'left'
            }
            labelSize="14px"
          />
        </DetailWrapper>

        <AccountTitle>내역</AccountTitle>
        <AccountSummaryWrapper>
          {data
            ? groupData.groupLists.sort(dateDescending).map((acd, idx) => {
                return (
                  <AccountContent key={shortid.generate()}>
                    <AccountDate>
                      {idx > 0 &&
                      groupData.groupLists[idx - 1].groupDate ===
                        groupData.groupLists[idx].groupDate
                        ? ''
                        : acd.groupDate.slice(0, 10)}
                    </AccountDate>

                    <AccountList>
                      <AccountImg src={coin} />
                      <AccountListCenter>
                        <AccountListTitle>{acd.nickname}</AccountListTitle>
                        <AccountListText>{acd.groupMemo}</AccountListText>
                      </AccountListCenter>
                      <AccountNumber>
                        {acd.groupAmount.toLocaleString('ko-KR')} 원
                      </AccountNumber>
                    </AccountList>
                  </AccountContent>
                )
              })
            : null}
        </AccountSummaryWrapper>
      </ScrollWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ScrollWrapper = styled.div`
  height: 650px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const ColorWrapper = styled.div`
  background: #ebf2ff;
  box-sizing: border-box;
  height: 79px;
  border-top-left-radius: ${isMobile ? '0px' : '31.4px'};
  border-top-right-radius: ${isMobile ? '0px' : '31.4px'};
`
const GoalAmount = styled.div`
  width: 91.1%;
  height: 24px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  /* identical to box height, or 24px */

  letter-spacing: -0.04em;

  /* color/text/Color-text-Gray2 */

  color: #8c939d;
`

const DetailWrapper = styled.div`
  width: 100%;
  background: #ebf2ff;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 24px;
`

const DetailTitle = styled.div`
  width: 100%;
  height: 23px;
  /* Heading / Roboto / H3(B) */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;

  text-align: center;
  margin: 0px 0px 8px 0px;
`

const DetailTextWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

const DetailAmount = styled.span`
  height: 23px;
  text-align: center;
  color: #4675f0;
  /* Heading / Roboto / H3(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;
`

const DetaileText = styled.span`
  height: 16px;
  /* Heading/Noto Sans KR/H5 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const DetailCharacter = styled.img`
  width: 329px;
  height: 185px;
  margin: 0px auto 16px auto;
  /* border: 1px solid black; */
`

const AccountSummaryWrapper = styled.div`
  width: 91.1%;
  margin: 0 auto;
  height: 250px;
  top: 483px;
  left: 16px;
`
const GroupFriend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;

  margin: 24px 0px;
  height: 24px;
`
const GroupFriendIcon = styled.img`
  width: 32px;
  height: 32px;

  /* color / gray / Gray50 */

  background: #999999;
  border-radius: 50%;
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
`

const AccountTitle = styled.div`
  margin: 24px 0px 8px 4.44%;
`
const AccountContent = styled.div`
  width: 100%;
`

const AccountDate = styled.div`
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`

const AccountList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f7;
  border-radius: 8px;
  width: 100%;
  height: 64px;
  margin-bottom: 8px;
`

const AccountImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  margin-left: 12px;
`

const AccountListCenter = styled.div``

const AccountListTitle = styled.div`
  /* Heading/Noto Sans KR/H6(B) */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const AccountListText = styled.div`
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`

const AccountNumber = styled.div`
  position: absolute;
  right: 12px;
  height: 28px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 12px;
  background: #ffb000;
  color: white;
  /* Heading / Roboto / H6(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.04em;
`

export default GroupBuzaDetail
