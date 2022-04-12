/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { request } from '../utils/axios'
import { BunnyFace, TanniFace, TongkiFace } from '../assets/character'
import { ReactComponent as Close } from '../assets/icons/common/closeSmall.svg'
import Loading from './Loading'
import { useFriendData } from '../apis/groupData'
import RightButton from '../components/Header/RightButton'
import LeftButton from '../components/Header/LeftButton'
import TitleText from '../components/Header/TitleText'

function GroupBuzaCreate() {
  const navigate = useNavigate()
  const [datalist, setDatalist] = useState([])
  const { data: friendsList, isLoading } = useFriendData(navigate)
  const [selectFriends, setSelectFriends] = useState([])
  useEffect(() => {
    if (friendsList) {
      setDatalist([...friendsList.data.groupMembers])
    }
  }, [friendsList])

  let selectFriendNickName = selectFriends.map(
    (data) => data.groupMemberNickname,
  )

  const onError = (error) => {
    console.log(error)
  }

  const onValid = (groupData) => {
    if (selectFriendNickName.length === 0) {
      selectFriendNickName = null
      Swal.fire({
        title: '친구를 선택해주세요!',
        text: '2인 이상만 가능해요!',
        confirmButtonText: '확인!',
      })
      return null
    }
    return request({
      url: '/group',
      method: 'post',
      data: {
        goalType: 'GROUP',
        goalName: groupData.createGroupName,
        goalAmount: parseInt(groupData.createGroupAmount, 10),
        friendNickname: selectFriendNickName,
      },
    }).then(
      Swal.fire({
        title: '입력 완료!',
        text: '시작이 반!!',
        confirmButtonText: '확인!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '하루부자로 이동하자!',
            text: '금액입력은 하루부자에서!',
            confirmButtonText: '확인!',
          }).then(() => {
            navigate('/groupbuza')
          })
        }
      }),
    )
  }

  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  return (
    <Wrapper>
      <LeftButton
        onClick={() => {
          navigate('/groupbuza')
        }}
      >
        취소
      </LeftButton>

      <TitleText>같이해부자</TitleText>

      <form onSubmit={handleSubmit(onValid, onError)}>
        <RightButton>생성</RightButton>
        <GoalInputBox>
          <IconBox>✏️ 목표명</IconBox>
          <Input
            placeholder="목표명을 입력해주세요."
            height="52px"
            {...register('createGroupName', {
              required: '이 부분을 채워부자!',
              maxLength: {
                value: 10,
                message: '10글자 이하로 입력해부자!',
              },
            })}
          />
          <ErrorSpan style={{ top: '90px' }}>
            {errors?.createGroupName?.message}
          </ErrorSpan>
        </GoalInputBox>
        <MemoInputBox>
          <IconBox>
            <i className="fas fa-smile" />
            💰 목표금액
          </IconBox>
          <Input
            height="52px"
            placeholder="목표금액을 입력해주세요."
            {...register('createGroupAmount', {
              required: '이 부분을 채워부자!',
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 써부자',
                shouldFocus: true,
              },
            })}
          />
          <ErrorSpan style={{ top: '91px' }}>
            {errors?.createGroupAmount?.message}
          </ErrorSpan>
        </MemoInputBox>
      </form>

      <FriendWrapper>
        <Text fontSize="14px">
          ✓ 함께 할 친구 설정 <SmallText>2인 - 4인</SmallText>
        </Text>
        {friendsList && friendsList.data.groupMembers.length === 0 ? (
          <EmptyFriend>
            <EmptyFriendTitle>친구를 추가해 주세요.</EmptyFriendTitle>
            <EmptyFriendDescribe>
              *메뉴 - 친구 페이지로 이동합니다.
            </EmptyFriendDescribe>
            <EmptyFriendAddButton
              onClick={() => {
                navigate('/friends/add')
              }}
            >
              <EmptyFriendAddButtonText>친구추가</EmptyFriendAddButtonText>
            </EmptyFriendAddButton>
          </EmptyFriend>
        ) : (
          <>
            <SelectedFriendWrapper>
              {selectFriends.map((da, idx) => {
                return (
                  <div key={da.id}>
                    <SelectedFriendContent>
                      <CircleImg
                        src={
                          da.hero === 'tanni'
                            ? TanniFace
                            : da.hero === 'tongki'
                            ? TongkiFace
                            : da.hero === 'bunny'
                            ? BunnyFace
                            : null
                        }
                      />
                      <SelectFriendNameDiv>
                        {selectFriends[idx].groupMemberNickname}
                      </SelectFriendNameDiv>
                      <DeleteFriendContent
                        onClick={() => {
                          const targetIndex = selectFriends.findIndex(
                            (d) =>
                              d.groupMemberNickname === da.groupMemberNickname,
                          )
                          setDatalist([selectFriends[targetIndex], ...datalist])
                          setSelectFriends([
                            ...selectFriends.slice(0, targetIndex),
                            ...selectFriends.slice(targetIndex + 1),
                          ])
                        }}
                      >
                        <Close />
                      </DeleteFriendContent>
                    </SelectedFriendContent>
                  </div>
                )
              })}
            </SelectedFriendWrapper>
            <FriendsList friendslength={selectFriends.length}>
              {datalist.map((da, idx) => {
                if (datalist.groupMemberCanInvite) {
                  return null
                }
                return (
                  <Friends
                    style={{
                      backgroundColor: da.groupMemberCanInvite
                        ? 'white'
                        : 'F5F5F7',
                    }}
                    key={da.id}
                    onClick={() => {
                      if (!da.groupMemberCanInvite) {
                        return
                      }
                      if (selectFriends.length > 2) {
                        // eslint-disable-next-line no-alert
                        Swal.fire({
                          title: '인원초과!',
                          text: '3명까지 선택가능해요!',
                          confirmButtonText: '확인!',
                        })
                        return
                      }

                      const targetIndex = datalist.findIndex(
                        (d) => d.groupMemberNickname === da.groupMemberNickname,
                      )
                      setSelectFriends((prevList) => [
                        datalist[targetIndex],
                        ...prevList,
                      ])
                      setDatalist([
                        ...datalist.slice(0, targetIndex),
                        ...datalist.slice(targetIndex + 1),
                      ])
                    }}
                  >
                    <CircleImg
                      src={
                        da.hero === 'tanni'
                          ? TanniFace
                          : da.hero === 'tongki'
                          ? TongkiFace
                          : da.hero === 'bunny'
                          ? BunnyFace
                          : null
                      }
                    />
                    <FriendsText
                      style={{
                        color: da.groupMemberCanInvite ? 'black' : '#8C939D',
                      }}
                    >
                      {da.groupMemberNickname}
                    </FriendsText>
                    {da.groupMemberCanInvite ? null : <Doing>진행중</Doing>}
                  </Friends>
                )
              })}
            </FriendsList>
          </>
        )}
      </FriendWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  background: #f5f5f7;
  border-radius: 8px;
  border: none;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;
  padding-left: 12px;

  /* color / gray / Gray30 */

  ::placeholder {
    color: #999999;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
  }
`

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 500};
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: 140%;
`
const SmallText = styled.span`
  /* Heading/Noto Sans KR/H7 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* color / gray / Gray50 */

  color: #999999;
`

// Inputbox
const GoalInputBox = styled.div`
  position: absolute;
  width: 91.11%;
  height: 87px;
  left: 4.44%;
  top: 106px;
`
const IconBox = styled.div`
  width: 328px;
  height: 14px;
  margin: 5px 262px 16px 0px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;
`

const MemoInputBox = styled.div`
  position: absolute;
  width: 91.11%;
  height: 87px;
  left: 4.44%;
  top: 209px;
`

// Friends
const FriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 100%;
  height: 40%;
  left: 4.44%;
  top: 335px;
`

const FriendsList = styled.div`
  /* Auto layout */
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow: scroll;
  position: absolute;
  left: 1px;
  right: 0%;
  top: ${(props) => (props.friendslength === 0 ? '32px' : '84px')};
  bottom: 0%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

const Friends = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;

  position: static;
  width: 91.67%;
  height: 54px;
  background: #f5f5f7;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`

const FriendsText = styled.div`
  position: static;
  width: 100px;
  height: 14px;
  left: 44px;
  top: 11px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;
`
const CircleImg = styled.img`
  position: static;
  width: 36px;
  height: 36px;

  top: 0px;

  background: #f5f5f7;

  /* Inside auto layout */
  border-radius: 50%;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
`
const SelectFriendNameDiv = styled.div`
  display: block;
  width: 50px;
  height: 14px;
  margin-right: -5px;
`

const SelectedFriendWrapper = styled.div`
  /* Auto layout */

  display: flex;
  align-items: flex-start;
  padding: 0px;
  overflow-y: scroll;
  width: 91.1%;
  height: 140px;
  margin-top: 8px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SelectedFriendContent = styled.div`
  /* Auto layout */

  display: flex;

  flex-direction: row;
  align-items: center;
  padding-left: 12px;
  position: static;
  width: 160px;
  height: 52px;

  border-radius: 8px;
  border: 1px solid #e5eaf2;
  /* Inside auto layout */
  margin: 0px 8px 0px 0px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;
`
const DeleteFriendContent = styled.button`
  width: 40px;
  height: 30px;
  background: white;
`

const ErrorSpan = styled.span`
  position: absolute;
  width: 104px;
  height: 11px;
  left: 8px;
  margin-top: 2px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  color: #ff3d00;
`
const Doing = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 13px;

  position: static;
  width: 59px;
  height: 26px;
  margin-left: 100px;
  top: 6px;

  /* color/text/Color-text-Gray1 */

  background: #b9bfc8;
  border-radius: 13px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* Rectangle 173 */

  color: #ffffff;
`

const EmptyFriend = styled.div`
  width: 91.1%;
  height: 96px;
  margin-top: 16px;
  border: 1px solid #e5eaf2;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
`
const EmptyFriendTitle = styled.div`
  margin-top: 12px;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Black */

  color: #000000;
`
const EmptyFriendDescribe = styled.div`
  margin-top: 8px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  /* identical to box height, or 10px */

  letter-spacing: -0.04em;

  /* color/text/Color-text-Gray1 */

  color: #b9bfc8;
`
const EmptyFriendAddButton = styled.button`
  margin: 12px auto 0 auto;
  width: 69px;
  height: 28px;

  /* color/Secondary */

  background: #4675f0;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EmptyFriendAddButtonText = styled.div`
  position: static;
  width: 45px;
  height: 12px;

  /* Heading/Noto Sans KR/H7 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  /* Rectangle 173 */

  color: #ffffff;
`
export default GroupBuzaCreate
