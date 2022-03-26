import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { alertSelect } from '../recoil/alertSelect'
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
} from '../apis/useAlertsData'

function AlertsFriend() {
  const adata = [
    {
      AlarmId: 1,
      alarmDetailType: 'request',
      friendNickname: 'bunny',
    },
    {
      AlarmId: 2,
      alarmDetailType: 'accept',
      friendNickname: 'bunny2',
    },
    {
      AlarmId: 3,
      alarmDetailType: 'refuse',
      friendNickname: 'bunny3',
    },
  ]

  const navigate = useNavigate()
  const {
    isLoading,
    data: AlertFriendsList,
    isError,
    error,
  } = useAlertsFriendData(navigate)
  console.log('알람데이터친구 : ', isLoading, AlertFriendsList, isError, error)
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    console.log('error : ', error)
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
        <Title>알림</Title>
      </TopDiv>
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
                  <AlertList>
                    <AlertCharacter />
                    <AlertTextDiv>
                      <Flex>
                        <AlertTextTop>{d.friendNickname}</AlertTextTop>
                        <AlertTextTopRight>님이</AlertTextTopRight>
                      </Flex>
                      <AlertTextBottom>친구요청을 보냈어요!</AlertTextBottom>
                    </AlertTextDiv>
                    <AlertAcceptRefuse
                      onClick={() => alarmFriendAccept(d.friendNickname)}
                      style={{ left: '232px' }}
                    >
                      수락
                    </AlertAcceptRefuse>
                    <AlertAcceptRefuse
                      onClick={() => alarmFriendRefuse(d.friendNickname)}
                      style={{ left: '312px' }}
                    >
                      거절
                    </AlertAcceptRefuse>
                  </AlertList>
                )}
                {d.alarmDetailType !== 'request' && (
                  <AlertList>
                    <Flex>
                      <AlertCharacter style={{ marginRight: '10px' }} />
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
                      onClick={() => alarmDelete()}
                      style={{ color: 'red', marginRight: '11px' }}
                    />
                  </AlertList>
                )}

                <AlertHr />
              </>
            )
          })}
        {/* <AlertList>
          <AlertCharacter />
          <AlertTextDiv>
            <Flex>
              <AlertTextTop>룰루랄라쁑</AlertTextTop>
              <AlertTextTopRight>님이</AlertTextTopRight>
            </Flex>
            <AlertTextBottom>친구요청을 보냈어요!</AlertTextBottom>
          </AlertTextDiv>
          <AlertAcceptRefuse style={{ left: '232px' }}>수락</AlertAcceptRefuse>
          <AlertAcceptRefuse style={{ left: '312px' }}>거절</AlertAcceptRefuse>
        </AlertList>
        <AlertHr />
        <AlertList>
          <Flex>
            <AlertCharacter style={{ marginRight: '10px' }} />
            <AlertTextDiv>
              <Flex>
                <AlertTextTop>아리랑</AlertTextTop>
                <AlertTextTopRight>님이</AlertTextTopRight>
              </Flex>
              <AlertTextBottom>친구요청을 거절했습니다.</AlertTextBottom>
            </AlertTextDiv>
          </Flex>
          <Close style={{ color: 'red', marginRight: '11px' }} />
        </AlertList>
        <AlertHr />
        <AlertList>
          <Flex>
            <AlertCharacter style={{ marginRight: '10px' }} />
            <AlertTextDiv>
              <Flex>
                <AlertTextTop>아리랑</AlertTextTop>
                <AlertTextTopRight>님이</AlertTextTopRight>
              </Flex>
              <AlertTextBottom>친구요청을 수락했습니다.</AlertTextBottom>
            </AlertTextDiv>
          </Flex>
          <Close style={{ color: 'red', marginRight: '11px' }} />
        </AlertList>
        <AlertHr /> */}
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
  width: 360px;
  height: 82px;
  left: 0px;
  top: 0px;
`

const ButtonDiv = styled.div`
  position: absolute;
  left: 1.11%;
  right: 85.56%;
  top: 33.72%;
  bottom: 10.47%;

  background: rgba(196, 196, 196, 0.3);
`

const Button = styled.div`
  position: absolute;
  left: 4.44%;
  right: 88.89%;
  top: 47.67%;
  bottom: 24.42%;

  background: #c4c4c4;
`

const AddFriend = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;

  /* color/Btn-basic1 */

  background: #e5eaf2;
  opacity: 0.5;
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
  width: 360px;
  height: 1px;
  top: 82px;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`
const IndexBottom = styled.div`
  position: absolute;
  left: 0px;
  width: 360px;
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

  width: 120px;
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

  width: 120px;
  top: 130px;
  height: 3px;

  /* color/Secondary */

  background: #4675f0;
`
const AlertListDiv = styled.div`
  position: absolute;
  top: 20%;
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

  width: 336px;
  height: 48px;
  margin-left: 8px;
  margin-top: 4%;
`
const AlertCharacter = styled.div`
  width: 32px;
  height: 32px;
  padding: 8px;
  background: gray;
`
const AlertTextDiv = styled.div`
  width: 160px;
  height: 34px;
  padding: 4px;
  margin-left: 8px;
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
  width: 360px;
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
