import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { useChallengeData } from '../apis/challengeData'
import { useMainPageData } from '../apis/mainpageData'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { request } from '../utils/axios'
import Loading from './Loading'
import coin from '../assets/icons/coin/ico_coin1.png'
import {
  BunnyFace,
  TanniFace,
  TongkiFace,
  TanniStep03,
  BunnyStep03,
  TongkiStep03,
} from '../assets/character'
import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'
import LeftButton from '../components/Header/LeftButton'

const shortid = require('shortid')

function ChallengeBuzaDetail() {
  const navigate = useNavigate()

  const { data, isLoading } = useChallengeData(navigate)

  const homeData = useMainPageData(navigate)

  const cancelChallenge = (id) => {
    Swal.fire({
      title: '도전포기!',
      text: '진짜 포기하시겠어요?!!',
      showCancelButton: true,
      confirmButtonText: '넵 포기!',
      cancelButtonText: '취소!',
    }).then((result) => {
      if (result.isConfirmed) {
        request({
          url: `/challenge/doing`,
          method: 'post',
        }).then(() => {
          navigate('/challengebuza')
        })
      }
    })
  }
  const dateDescending = (a, b) => {
    const dateA = new Date(a.challengeRecordDate).getTime()
    const dateB = new Date(b.challengeRecordDate).getTime()
    return dateA < dateB ? 1 : -1
  }
  useEffect(() => {}, [navigate])
  if (isLoading) {
    return <Loading />
  }
  if (homeData.isLoading) {
    return <Loading />
  }

  const challengeData = data.data
  return (
    <Wrapper>
      <ColorWrapper>
        <LeftButton
          style={{ background: '#ebf2ff' }}
          onClick={() => {
            navigate('/challengebuza')
          }}
        >
          <Backarr />
        </LeftButton>

        <TitleText style={{ background: '#ebf2ff' }}>도전해부자</TitleText>

        <RightButton
          onClick={() => {
            cancelChallenge()
          }}
          style={{ background: '#ebf2ff' }}
        >
          포기
        </RightButton>
      </ColorWrapper>
      <ScrollWrapper>
        <DetailWrapper>
          <DetailTitle>
            {data ? challengeData.challengeName : '도전이름이 없습니다'}
          </DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>
              {homeData
                ? homeData.data.data.challengeNeedAmount.toLocaleString('ko-KR')
                : '남은게 없네유'}
            </DetailAmount>
            <DetaileText> 원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {challengeData.challengeMembers.map((member) => {
              return (
                <GroupFriendIcon
                  key={shortid.generate()}
                  src={
                    member.challengeMemberHero === 'tanni'
                      ? TanniFace
                      : member.challengeMemberHero === 'tongki'
                      ? TongkiFace
                      : member.challengeMemberHero === 'bunny'
                      ? BunnyFace
                      : null
                  }
                />
              )
            })}
          </GroupFriend>
          <DetailImgWrapper>
            <DetailCharacter
              src={
                homeData.data.data.hero === 'tanni'
                  ? TanniStep03
                  : homeData.data.data.hero === 'tongki'
                  ? TongkiStep03
                  : homeData.data.data.hero === 'bunny'
                  ? BunnyStep03
                  : null
              }
            />
          </DetailImgWrapper>
          <GoalAmount>
            목표 금액 : {challengeData.challengeGoalAmount} 원
          </GoalAmount>
          <ProgressBar
            completed={homeData ? homeData.data.data.challengePercent : 0}
            // completed={70}
            animateOnRender
            bgColor="#4675F0"
            baseBgColor="#ffffff"
            width="91.1%"
            height="22px"
            margin="0 auto 20px auto"
            borderRadius="11px"
            labelAlignment={
              homeData && homeData.data.data.challengePercent > 9
                ? 'center'
                : 'left'
            }
            labelSize="14px"
          />
        </DetailWrapper>

        <ChallengeFriendWrapper>
          {data
            ? challengeData.challengeMembers.map((member, idx) => {
                return (
                  <ChallengeFriendList key={shortid.generate()}>
                    <ChallengeFriendContents>
                      <ChallengeFriendIcon
                        src={
                          member.challengeMemberHero === 'tanni'
                            ? TanniFace
                            : member.challengeMemberHero === 'tongki'
                            ? TongkiFace
                            : member.challengeMemberHero === 'bunny'
                            ? BunnyFace
                            : null
                        }
                      />
                      <ChallengeFriendNickName>
                        {member.challengeMemberNickname}
                      </ChallengeFriendNickName>
                      <ChallengeFriendAmount>
                        {member.challengeMemberLeftAmount.toLocaleString(
                          'ko-KR',
                        )}
                        <span> 원 남았어요!</span>
                      </ChallengeFriendAmount>
                    </ChallengeFriendContents>

                    <ProgressBar
                      completed={member.challengeMemberNowPercent}
                      animateOnRender
                      bgColor="#4675F0"
                      baseBgColor="#ffffff"
                      width="91.11%"
                      height="20px"
                      margin="0 auto"
                      borderRadius="11px"
                      labelAlignment={
                        member.challengeMemberNowPercent > 9 ? 'center' : 'left'
                      }
                      labelSize="14px"
                    />
                  </ChallengeFriendList>
                )
              })
            : null}
        </ChallengeFriendWrapper>
        <AccountTitle>내역</AccountTitle>
        <AccountSummaryWrapper>
          {data
            ? challengeData.challengeLists
                .sort(dateDescending)
                .map((acd, idx) => {
                  return (
                    <AccountContent key={shortid.generate()}>
                      <AccountDate>
                        {idx > 0 &&
                        challengeData.challengeLists[idx - 1]
                          .challengeRecordDate ===
                          challengeData.challengeLists[idx].challengeRecordDate
                          ? ''
                          : acd.challengeRecordDate.slice(0, 10)}
                      </AccountDate>
                      <AccountListsWrapper>
                        <AccountList>
                          <AccountImg src={coin} />
                          <AccountListCenter>
                            <AccountListTitle>
                              {acd.challengeMemo}
                            </AccountListTitle>
                          </AccountListCenter>
                          <AccountNumber>
                            {acd.challengeAmount.toLocaleString('ko-KR')} 원
                          </AccountNumber>
                        </AccountList>
                      </AccountListsWrapper>
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
const ColorWrapper = styled.div`
  background: #ebf2ff;
  box-sizing: border-box;
  height: 82px;
  border-top-left-radius: ${isMobile ? '0px' : '31.4px'};
  border-top-right-radius: ${isMobile ? '0px' : '31.4px'};
`

const GoalAmount = styled.div`
  /* position: absolute; */
  width: 91.1%;
  height: 24px;
  margin: 0 auto 8px auto;
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
  background-color: #ebf2ff;
  text-align: center;
  height: 355px;
`

const DetailTitle = styled.div`
  width: 100%;

  /* Heading / Roboto / H3(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;
  margin: 0 auto;
  margin-bottom: 2px;
  /* color / text / Color-text-Black */
  background-color: #ebf2ff;

  color: #000000;

  text-align: center;
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
const DetailImgWrapper = styled.div`
  text-align: center;
`
const DetailCharacter = styled.img`
  width: 287px;
  height: 168px;
  margin: 0px auto 16px auto;
`
// Scroll
const ScrollWrapper = styled.div`
  height: 630px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

// ChallengeFriend
const ChallengeFriendWrapper = styled.div`
  width: 91.1%;
  margin: 16px auto;
`

const ChallengeFriendList = styled.div`
  width: 100%;
  height: 92px;
  margin-bottom: 8px;

  /* color / gray / Gray10 */

  background: #f2f2f2;
  border-radius: 8px;
`
const ChallengeFriendContents = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const ChallengeFriendIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 12px 8px 12px 12px;
  border-radius: 50%;
`

const ChallengeFriendNickName = styled.span`
  height: 14px;
`

const ChallengeFriendAmount = styled.span`
  position: absolute;
  right: 12px;
  height: 16px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 2px;
`
// Account Summary
const AccountSummaryWrapper = styled.div`
  width: 91.1%;
  margin: 0 auto;
  height: 400px;
  top: 483px;
  left: 16px;
`
const GroupFriend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;

  margin: 12px 0px;
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

const AccountListsWrapper = styled.div`
  /* border: 1px solid black; */
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
  background: #4675f0;
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

export default ChallengeBuzaDetail
