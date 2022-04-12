/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { setFlexStyles } from '../styles/Mixin'
import Button from '../components/Button'
import Nav from '../components/Nav'
import ScrollWrapper from '../components/ScrollWrapper'
import { request } from '../utils/axios'
import { useGroupData } from '../apis/groupData'
import { useMainPageData } from '../apis/mainpageData'
import { BunnyFace, TanniFace, TongkiFace } from '../assets/character'
import Loading from './Loading'

const shortid = require('shortid')

function GroupBuza() {
  const navigate = useNavigate()

  // 홈데이터 부르는 부분 수정사함 -----------
  const { data, isLoading } = useGroupData(navigate)
  const homeData = useMainPageData(navigate)

  const cancelGroup = (id) => {
    Swal.fire({
      title: '도전 포기!',
      text: '진짜 포기하시겠어요?!!',
      showCancelButton: true,
      confirmButtonText: '넵 포기!',
      cancelButtonText: '취소!',
    }).then((result) => {
      request({
        url: `/group/${id}/waiting`,
        method: 'delete',
      }).then(() => {
        navigate(0)
      })
    })
  }

  useEffect(() => {}, [navigate])

  if (homeData.isLoading) {
    return <Loading />
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <Title>
        <Text>같이해부자</Text>
      </Title>{' '}
      <GroupWaitingDiv>
        {data
          ? data.data.goalStatus === 'noGoal' && (
              <ScrollWrapper height="44%">
                <GoalWrapper>
                  <GoalText>원하는 목표를 만들어보세요!</GoalText>
                  <GoalDescribe>
                    공동의 목표를 친구와 함께 달성해보세요.
                  </GoalDescribe>

                  <Button
                    width="91.11%"
                    height="52px"
                    fontSize="14px"
                    background="#4675F0"
                    onClick={() => {
                      navigate('/groupbuzacreate')
                    }}
                  >
                    + 목표 개설하기
                  </Button>
                </GoalWrapper>
              </ScrollWrapper>
            )
          : null}

        {data
          ? data.data.goalStatus === 'goal' && (
              <>
                <ScrollWrapper height="44%">
                  <GoalWrapper
                    onClick={() => {
                      navigate('/groupbuzadetail')
                    }}
                  >
                    <GroupFriend>
                      {data
                        ? data.data.groupMembers.map((member) => {
                            return (
                              <GroupFriendIcon
                                key={shortid.generate()}
                                src={
                                  member.groupMemberHero === 'tanni'
                                    ? TanniFace
                                    : member.groupMemberHero === 'tongki'
                                    ? TongkiFace
                                    : member.groupMemberHero === 'bunny'
                                    ? BunnyFace
                                    : null
                                }
                              />
                            )
                          })
                        : null}
                    </GroupFriend>
                    <GroupFriendTitle>
                      {data ? data.data.groupName : null}
                    </GroupFriendTitle>
                    <GroupFriendGoal>
                      <GroupFriendGoalAmount>
                        {homeData
                          ? homeData.data.data.groupNeedAmount.toLocaleString(
                              'ko-KR',
                            )
                          : null}
                      </GroupFriendGoalAmount>
                      <span> 원 남았습니다.</span>
                    </GroupFriendGoal>
                    <GoalAmount>
                      목표 금액 : {data.data.groupGoalAmount.toLocaleString('ko-KR')} 원
                    </GoalAmount>
                    <ProgressBar
                      // completed={60}
                      completed={
                        homeData ? homeData.data.data.groupPercent : 50
                      }
                      animateOnRender
                      bgColor="#4675F0"
                      width="91.11%"
                      height="20px"
                      margin="0 auto"
                      borderRadius="11px"
                      labelAlignment={
                        homeData && homeData.data.data.groupPercent > 9
                          ? 'center'
                          : 'left'
                      }
                      labelSize="14px"
                    />
                  </GoalWrapper>
                  <ConmpletedTitle>완료목록</ConmpletedTitle>
                </ScrollWrapper>
                <ScrollWrapper height="280px">
                  <CompletedList>
                    {data.data.groupDoneGoals.map((data, idx) => {
                      return (
                        <CompletedContent key={shortid.generate()}>
                          <CompletedText>{data}</CompletedText>
                        </CompletedContent>
                      )
                    })}
                  </CompletedList>
                </ScrollWrapper>
              </>
            )
          : null}

        {data && data.data.goalStatus === 'waiting'
          ? data.data.waitingGoals.map((gStatus, idx) => {
              return (
                <ScrollWrapper height="44%">
                  <GoalWrapper>
                    <GoalText>{gStatus.waitingGoalName} 수락대기중</GoalText>
                    <GoalDescribe>
                      모두 수락하면 같이해부자가 생성됩니다.
                    </GoalDescribe>

                    <Button
                      width="91.11%"
                      height="52px"
                      fontSize="14px"
                      background="#4675F0"
                      onClick={() => {
                        cancelGroup(gStatus.id)
                      }}
                    >
                      대기취소
                    </Button>
                  </GoalWrapper>
                </ScrollWrapper>
              )
            })
          : null}
      </GroupWaitingDiv>
      <Nav />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Title = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })}

  position: absolute;
  width: 100%;
  height: 22px;

  top: 5.972%;
`

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
`

const GoalWrapper = styled.div`
  position: absolute;
  width: 91.11%;
  height: 181px;
  margin-bottom: 10px;
  padding-top: 0.01px;

  /* color/Btn-basic2 */

  background: #f5f5f7;
  border-radius: 8px;
`
const GoalAmount = styled.div`
  width: 91.1%;
  height: 24px;
  margin: 0 auto 4px auto;
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

const GoalText = styled.div`
  margin: 24px 131px 8px 16px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */

  letter-spacing: -0.04em;

  color: #000000;
`
const GoalDescribe = styled.div`
  margin: 0px 120px 16px 16px;
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Gray3 */

  color: #60666f;
`

// 완료
const ConmpletedTitle = styled.span`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 4.44%;
  top: 40.2%;
  font-size: 14px;
  line-height: 100%;
`

const CompletedList = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 95%;
  height: 256px;
  top: 44%;
`

const CompletedContent = styled.div`
  position: static;
  width: 100%;
  height: 52px;

  background: #f5f5f7;
  border-radius: 8px;
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
  padding: 16px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`

const CompletedText = styled.div`
  width: 80%;
  height: 14px;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`
// 데이터가 존재 할때
const GroupFriend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  margin: 20px 0px 16px 12px;
  width: 200px;
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

const GroupFriendTitle = styled.div`
  margin: 16px 132px 8px 12px;
  width: 300px;
  height: 16px;
  left: 28px;
  top: 22%;

  /* Heading/Noto Sans KR/H5(B) */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const GroupFriendGoal = styled.div`
  width: 300px;
  height: 21px;
  margin: 8px 0px 8px 12px;
`

const GroupFriendGoalAmount = styled.span`
  /* Heading / Roboto / H4(B) */
  width: 53px;
  height: 21px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #4675f0;
`
const GroupWaitingDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 100px;
  left: 0px;
  height: calc(87% - 90px);
  overflow: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

export default GroupBuza
