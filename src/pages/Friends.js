import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { setFlexStyles } from '../styles/Mixin'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Search } from '../assets/icons/common/search.svg'
import Loading from './Loading'
import { BunnyFace, TongkiFace, TanniFace } from '../assets/character/index'

import ErrorLog from './ErrorLog'
import { useFriendsData, useSearchFriend } from '../apis/friendsData'
import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'

function Friends() {
  const inputFriend = useRef('')
  const [updateFriend, setUpdateFriend] = useState('')

  const { isLoading, data: friendList, error, isError } = useFriendsData()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorLog error={error} />
  }

  const search = () => {
    setUpdateFriend(inputFriend.current.value)
  }

  return (
    <Wrapper>
      <NavLink to="/menu">
        <Backarr
          style={{
            position: 'absolute',
            left: '4.44%',
            top: '6.45%',
            width: '24px',
            height: '24px',
          }}
        />
      </NavLink>
      <TitleText>친구</TitleText>

      <NavLink to="/friends/add">
        <RightButton>추가</RightButton>
      </NavLink>
      <TopLine />

      <FriendInput
        id="nickname"
        placeholder="닉네임을 입력해주세요."
        ref={inputFriend}
      />
      <FriendSearch style={{ color: '#999999' }} onClick={search}>
        <Search />
      </FriendSearch>

      <FriendsDiv>
        {friendList?.data?.waitingFriendListDto.map((d) => {
          if (d.nickname.includes(updateFriend) || d.nickname === '') {
            return (
              <FriendsLine>
                <FriendProfile>
                  <FriendIcon
                    src={
                      d.hero === 'bunny'
                        ? BunnyFace
                        : d.hero === 'tongki'
                        ? TongkiFace
                        : d.hero === 'tanni'
                        ? TanniFace
                        : null
                    }
                  />
                  <FriendText>{d.nickname}</FriendText>
                </FriendProfile>
                <AddButton>수락대기</AddButton>
              </FriendsLine>
            )
          }
          return null
        })}
        {friendList.data.friendListDto.map((d) => {
          const nick = d.nickname
          if (d.nickname.includes(updateFriend) || inputFriend === '') {
            return (
              <FriendsLine>
                <FriendProfile>
                  <FriendIcon
                    src={
                      d.hero === 'bunny'
                        ? BunnyFace
                        : d.hero === 'tongki'
                        ? TongkiFace
                        : d.hero === 'tanni'
                        ? TanniFace
                        : null
                    }
                  />
                  <FriendText>{d.nickname}</FriendText>
                </FriendProfile>
              </FriendsLine>
            )
          }
          return null
        })}
      </FriendsDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
const FriendInput = styled.input`
  position: absolute;
  width: 91.1%;
  height: 52px;
  left: 16px;
  top: 102px;
  padding-left: 16px;
  border: none;
  background: #f5f5f7;
  border-radius: 8px;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
  :-ms-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
`
const FriendSearch = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 116px;
  right: 10%;
  /* left: 304px; */
`
const FriendsDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 154.1px;
  padding: 16px 16px 0px 16px;
  overflow: scroll;
  bottom: 0px;
`
const FriendsLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  padding: 0px;
  width: 91.1%;
  height: 48px;
  margin-bottom: 1.11%;
`
const FriendProfile = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}

  width:100px;
`
const FriendIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 20px;
  margin-right: 8px;
`
const FriendText = styled.div``
const AddButton = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  padding: 7px 13px;

  width: 69px;
  height: 26px;
  right: 10%;
  top: 11px;

  /* color / gray / Gray30 */

  background: #e5eaf2;
  border-radius: 13px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  text-align: center;
  letter-spacing: -0.04em;

  /* Rectangle 173 */

  color: #8c939d;
`

export default Friends
