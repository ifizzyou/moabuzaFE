/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom'
import { setFlexStyles } from '../styles/Mixin'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Close } from '../assets/icons/common/closeSmall.svg'
import {
  useAlertsChallengeData,
  alarmChallengeAccept,
  alarmChallengeRefuse,
  alarmDelete,
} from '../apis/alertsData'

import {
  GoalCancel,
  GoalCreate,
  GoalSuccess,
  InviteAccept,
  Inviting,
  MoneyDeposit,
} from '../assets/icons/alarm'
import TitleText from '../components/Header/TitleText'

function AlertsChallenge() {
  const navigate = useNavigate()

  function alarmDeleteAndRender(id) {
    Swal.fire({
      title: '알람을 삭제하시겠어요?',
      text: '삭제하면 다시 못봐요!',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        alarmDelete(id)
        Swal.fire({
          title: '삭제 되었습니다!',
          confirmButtonText: '확인!',
        }).then(() => {
          navigate(0)
        })
      }
    })
    alarmDelete(id)
  }

  const {
    isLoading,
    data: AlertChallengeList,
    isError,
    error,
  } = useAlertsChallengeData(navigate)

  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/">
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
      </TopDiv>
      <TitleText>알림</TitleText>
      <TopLine />
      <NavLink to="/alerts">
        <SelectDiv
          style={{
            left: '0%',
            fontWeight: '400',
            color: '#555555',
          }}
        >
          친구
        </SelectDiv>
      </NavLink>
      <NavLink to="/alertsgroup">
        <SelectDiv
          style={{
            left: '33.33%',
            fontWeight: '400',
            color: '#555555',
          }}
        >
          같이해부자
        </SelectDiv>
      </NavLink>
      <NavLink to="/alertschallenge">
        <SelectDiv
          style={{
            left: '66.67%',
            fontWeight: '500',
            color: '#000000',
          }}
        >
          도전해부자
        </SelectDiv>
        <SelectLine style={{ left: '66.67%' }} />
      </NavLink>
      <IndexBottom />
      <AlertListDiv>
        {AlertChallengeList &&
          AlertChallengeList.data.map((d) => {
            return (
              <>
                {d.alarmDetailType === 'invite' && (
                  <AlertList key={Date.now()}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <AlertCharacter src={Inviting} />
                      <AlertTextDiv style={{ marginLeft: '8px' }}>
                        <Flex>
                          <AlertTextTop>{d.friendNickname}</AlertTextTop>
                          <AlertTextTopRight>님이</AlertTextTopRight>
                        </Flex>
                        <Flex>
                          <AlertTextBottom style={{ fontWeight: '700' }}>
                            {d.goalName}
                          </AlertTextBottom>
                          <AlertTextBottom>에 초대했어요!</AlertTextBottom>
                        </Flex>
                      </AlertTextDiv>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <AlertAcceptRefuse
                        onClick={() => {
                          Swal.fire({
                            title: '초대를 수락하시겠어요?',
                            text: '수락하면 도전이 생성 되요!',
                            showCancelButton: true,
                            confirmButtonText: '수락',
                            cancelButtonText: '취소',
                            showLoaderOnConfirm: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              alarmChallengeAccept(d.alarmId)
                              Swal.fire({
                                title: '수락 되었습니다!',
                                confirmButtonText: '확인!',
                              }).then(() => {
                                navigate(0)
                              })
                            }
                          })
                        }}
                        style={{ marginRight: '8px' }}
                      >
                        수락
                      </AlertAcceptRefuse>
                      <AlertAcceptRefuse
                        onClick={() => {
                          Swal.fire({
                            title: '초대를 거절하시겠어요?',
                            text: '거절하면 도전이 취소 되요!',
                            showCancelButton: true,
                            confirmButtonText: '거절',
                            cancelButtonText: '취소',
                            showLoaderOnConfirm: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              alarmChallengeRefuse(d.alarmId)
                              Swal.fire({
                                title: '거절 되었습니다!',
                                confirmButtonText: '확인!',
                              }).then(() => {
                                navigate(0)
                              })
                            }
                          })
                        }}
                      >
                        거절
                      </AlertAcceptRefuse>
                    </div>
                  </AlertList>
                )}
                {d.alarmDetailType === 'accept' && (
                  <AlertList key={Date.now()}>
                    <Flex>
                      <AlertCharacter
                        src={InviteAccept}
                        style={{ marginRight: '10px' }}
                      />
                      <AlertTextDiv>
                        <Flex>
                          <AlertTextTop>{d.friendNickname}</AlertTextTop>
                          <AlertTextTopRight>님이</AlertTextTopRight>
                        </Flex>
                        <AlertTextBottom>초대를 수락했습니다.</AlertTextBottom>
                      </AlertTextDiv>
                    </Flex>
                    <Close
                      onClick={() => alarmDeleteAndRender(d.alarmId)}
                      style={{ color: 'red', marginRight: '11px' }}
                    />
                  </AlertList>
                )}

                {d.alarmDetailType === 'record' && (
                  <AlertList key={Date.now()}>
                    <Flex>
                      <AlertCharacter
                        src={MoneyDeposit}
                        style={{ marginRight: '10px' }}
                      />
                      <AlertTextDiv>
                        <Flex>
                          <AlertTextTop>{d.friendNickname}</AlertTextTop>
                          <AlertTextTopRight>님이 </AlertTextTopRight>
                          <AlertTextTopRight style={{ fontWeight: 700 }}>
                            {d.goalName}
                          </AlertTextTopRight>
                          <AlertTextTopRight> 목표에</AlertTextTopRight>
                        </Flex>
                        <Flex>
                          <AlertTextBottom>
                            {d.goalAmount.toLocaleString('en-US')}
                          </AlertTextBottom>
                          <AlertTextBottom>원을 입금했습니다</AlertTextBottom>
                        </Flex>
                      </AlertTextDiv>
                    </Flex>
                    <Close
                      onClick={() => alarmDeleteAndRender(d.alarmId)}
                      style={{ color: 'red', marginRight: '11px' }}
                    />
                  </AlertList>
                )}
                {(d.alarmDetailType === 'create' ||
                  d.alarmDetailType === 'success' ||
                  d.alarmDetailType === 'boom') && (
                  <AlertList key={Date.now()}>
                    <Flex>
                      <AlertCharacter
                        src={
                          d.alarmDetailType === 'create'
                            ? GoalCreate
                            : d.alarmDetailType === 'success'
                            ? GoalSuccess
                            : d.alarmDetailType === 'boom'
                            ? GoalCancel
                            : null
                        }
                        style={{ marginRight: '10px' }}
                      />
                      <AlertTextDiv>
                        <Flex>
                          <AlertTextTop>{d.goalName}</AlertTextTop>
                          <AlertTextTopRight>목표가</AlertTextTopRight>
                        </Flex>
                        <AlertTextBottom>
                          {d.alarmDetailType === 'create' && '생성'}
                          {d.alarmDetailType === 'success' && '달성'}
                          {d.alarmDetailType === 'boom' && '취소'}
                          되었습니다.
                        </AlertTextBottom>
                      </AlertTextDiv>
                    </Flex>
                    <Close
                      onClick={() => alarmDeleteAndRender(d.alarmId)}
                      style={{ color: 'red', marginRight: '11px' }}
                    />
                  </AlertList>
                )}

                {d.alarmDetailType === 'talju' && (
                  <AlertList key={Date.now()}>
                    <Flex>
                      <AlertCharacter
                        src={GoalCancel}
                        style={{ marginRight: '10px' }}
                      />
                      <AlertTextDiv>
                        <Flex>
                          <AlertTextTop>{d.goalName}</AlertTextTop>
                          <AlertTextTopRight>목표를</AlertTextTopRight>
                        </Flex>
                        <AlertTextBottom>
                          {d.friendNickname} 님이 포기했습니다.
                        </AlertTextBottom>
                      </AlertTextDiv>
                    </Flex>
                    <Close
                      onClick={() => alarmDeleteAndRender(d.alarmId)}
                      style={{ color: 'red', marginRight: '11px' }}
                    />
                  </AlertList>
                )}
                <AlertHr />
              </>
            )
          })}
      </AlertListDiv>
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
  width: 100%;
  height: 82px;
  left: 0px;
  top: 0px;
`

const TopLine = styled.div`
  position: absolute;
  left: 0%;
  width: 100%;
  height: 1px;
  top: 82px;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`
const IndexBottom = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  top: 133px;
  height: 1px;
  background-color: #f2f2f2;
`
const SelectDiv = styled.div`
  position: absolute;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  width: 33.333%;
  top: 82px;
  height: 50px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`

const SelectLine = styled.div`
  position: absolute;

  width: 33.333%;
  top: 130px;
  height: 3px;

  /* color/Secondary */

  background: #4675f0;
`
const AlertListDiv = styled.div`
  position: absolute;
  top: 132px;
  bottom: 0%;
  width: 100%;
  overflow: scroll;
`

const AlertList = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  width: 100%;
  padding-right: 4.44%;
  height: 48px;
  margin-left: 8px;
  margin-top: 4%;
`
const AlertCharacter = styled.img`
  width: 48px;
  height: 48px;

  /* background: gray; */
`
const AlertTextDiv = styled.div`
  width: 160px;
  height: 34px;
  padding: 4px;
  margin-top: 8px;
`
const AlertTextTop = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  /* or 12px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  color: #555555;
`
const AlertTextTopRight = styled.div`
  font-family: 'Noto Sans KR';
  margin-left: 3px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* or 12px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  color: #555555;
`
const AlertTextBottom = styled.div`
  margin-top: 4px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* or 12px */

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`
const AlertAcceptRefuse = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  &:active {
    background-color: #4675f0;
    color: #ffffff;
  }
  width: 52px;
  height: 24px;

  /* color / gray / Gray30 */

  background: #e5eaf2;
  border-radius: 12px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #8c939d;
`
const AlertHr = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0px;
  margin-top: 2.22%;

  /* color / gray / Gray30 */

  background: #f2f2f2;
`
const Flex = styled.div`
  display: flex;
`
export default AlertsChallenge
