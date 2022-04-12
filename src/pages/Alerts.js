import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom'
import { setFlexStyles } from '../styles/Mixin'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Close } from '../assets/icons/common/closeSmall.svg'
import Loading from './Loading'
import ErrorLog from './ErrorLog'
import {
  useAlertsFriendData,
  alarmFriendAccept,
  alarmFriendRefuse,
  alarmDelete,
} from '../apis/alertsData'
import { FriendAccept, FriendReject, Inviting } from '../assets/icons/alarm'
import TitleText from '../components/Header/TitleText'

function AlertsFriend() {
  const navigate = useNavigate()
  const {
    isLoading,
    data: AlertFriendsList,
    isError,
    error,
  } = useAlertsFriendData(navigate)

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

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorLog error={error} />
  }
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
            fontWeight: '500',
            color: '#000000',
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
            fontWeight: '400',
            color: '#555555',
          }}
        >
          도전해부자
        </SelectDiv>
      </NavLink>
      <SelectLine style={{ left: '0%' }} />
      <IndexBottom />
      <AlertListDiv>
        {AlertFriendsList &&
          AlertFriendsList.data.map((d) => {
            return (
              <>
                {d.alarmDetailType === 'request' && (
                  <AlertList key={Date.now()}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <AlertCharacter src={Inviting} />
                      <AlertTextDiv style={{ marginLeft: '8px' }}>
                        <Flex>
                          <AlertTextTop>{d.friendNickname}</AlertTextTop>
                          <AlertTextTopRight>님이</AlertTextTopRight>
                        </Flex>
                        <AlertTextBottom>친구요청을 보냈어요!</AlertTextBottom>
                      </AlertTextDiv>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <AlertAcceptRefuse
                        onClick={() =>
                          Swal.fire({
                            title: '친구초대를 수락하시겠어요?',
                            showCancelButton: true,
                            confirmButtonText: '수락',
                            cancelButtonText: '취소',
                            showLoaderOnConfirm: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              alarmFriendAccept(d.alarmId)
                              Swal.fire({
                                title: '수락 되었습니다!',
                                confirmButtonText: '확인!',
                              }).then(() => {
                                navigate(0)
                              })
                            }
                          })
                        }
                        style={{ marginRight: '8px' }}
                      >
                        수락
                      </AlertAcceptRefuse>
                      <AlertAcceptRefuse
                        onClick={() => {
                          Swal.fire({
                            title: '친구초대를 거절하시겠어요?',
                            // text: '삭제하면 다시 못봐요!',
                            showCancelButton: true,
                            confirmButtonText: '거절',
                            cancelButtonText: '취소',
                            showLoaderOnConfirm: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              alarmFriendRefuse(d.alarmId)
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
                {d.alarmDetailType !== 'request' && (
                  <AlertList>
                    <Flex>
                      <AlertCharacter
                        src={
                          d.alarmDetailType === 'accept'
                            ? FriendAccept
                            : FriendReject
                        }
                        style={{ marginRight: '10px' }}
                      />
                      <AlertTextDiv>
                        <Flex>
                          <AlertTextTop>{d.friendNickname}</AlertTextTop>
                          <AlertTextTopRight>님이</AlertTextTopRight>
                        </Flex>
                        <AlertTextBottom>
                          친구요청을{' '}
                          {d.alarmDetailType === 'accept' ? '수락' : '거절'}
                          했습니다.
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

  width:33.333%;
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
export default AlertsFriend
