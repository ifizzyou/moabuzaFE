import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { request, api } from '../utils/axios'
import { setFlexStyles } from '../styles/Mixin'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'

import { BunnyFace, TanniFace, TongkiFace } from '../assets/character'

import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'

function Modified() {
  const navigate = useNavigate()
  const [hero, setHero] = useState('heor0')
  const [nickNameDup, setNickNameDup] = useState(false)
  function setHeroValue(i) {
    setHero(i)
    setValue('character', i)
  }

  const onValid = async (data) => {
    if (hero === 'heor0') {
      Swal.fire({
        title: '캐릭터를 골라부자!',
        confirmButtonText: '확인!',
      })
        .then((result) => {})
        .catch((err) => console.log(err))
      return
    }

    if (!nickNameDup) {
      Swal.fire({
        title: '닉네임 중복확인해부자',
        confirmButtonText: '확인!',
      }).then((result) => {})
      return
    }

    await api.getUserInfo(data, hero).then(() =>
      Swal.fire({
        title: '변경완료!',
        text: '이제부터 열심히 모아부자!',
        confirmButtonText: '확인!',
      })
        .then((result) => {})
        .catch((err) => console.log(err)),
    )

    navigate('/')
  }
  const nicknameDup = () => {
    if (watch().nickname === '') {
      return null
    }
    return request({
      url: '/member/validation',
      method: 'post',
      data: { nickname: watch().nickname },
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.msg === '해당 닉네임은 사용이 가능합니다.') {
            setNickNameDup(true)
            Swal.fire({
              title: '사용가능한 닉네임',
              text: '열심히 모아부자!',
              confirmButtonText: '확인!',
            }).then((result) => {})
          }
          if (res.data.msg === '해당 닉네임은 사용 중 입니다.') {
            setNickNameDup(false)
            Swal.fire({
              title: '사용중인 닉네임',
              text: '다른거로 골라부자 ㅠㅠ',
              confirmButtonText: '확인!',
            }).then((result) => {})
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          title: '이미 사용중인 닉네임',
          text: '다른걸로 해부자 ㅜㅜ',
          confirmButtonText: '확인!',
        }).then((result) => {})
      })
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm()
  return (
    <Wrapper>
      <NavLink to="/menu">
        <ButtonDiv>
          <BackarrButton />
        </ButtonDiv>
      </NavLink>
      <TopLine />
      <TitleText>캐릭터/닉네임 수정</TitleText>
      <form onSubmit={handleSubmit(onValid)}>
        <RightButton>확인</RightButton>
        <CharacterDiv>
          <CharacterCenterDiv>
            <CharacterOne
              style={{ left: '0px' }}
              onClick={() => setHeroValue('bunny')}
            >
              <Character
                src={BunnyFace}
                style={{
                  border: hero === 'bunny' ? '2px solid #4675F0' : 'none',
                }}
              />
              <CharacterName
                style={{
                  fontWeight: hero === 'bunny' ? '800' : '400',
                  color: hero === 'bunny' ? '#4675F0' : '#60666F',
                }}
              >
                산이
              </CharacterName>
            </CharacterOne>
            <CharacterOne
              style={{ left: '104px' }}
              onClick={() => setHeroValue('tongki')}
            >
              <Character
                src={TongkiFace}
                style={{
                  border: hero === 'tongki' ? '2px solid #4675F0' : 'none',
                }}
              />
              <CharacterName
                style={{
                  fontWeight: hero === 'tongki' ? '800' : '400',
                  color: hero === 'tongki' ? '#4675F0' : '#60666F',
                }}
              >
                통키
              </CharacterName>
            </CharacterOne>
            <CharacterOne
              style={{ left: '208px' }}
              onClick={() => setHeroValue('tanni')}
            >
              <Character
                src={TanniFace}
                style={{
                  border: hero === 'tanni' ? '2px solid #4675F0' : 'none',
                }}
              />
              <CharacterName
                style={{
                  fontWeight: hero === 'tanni' ? '800' : '400',
                  color: hero === 'tanni' ? '#4675F0' : '#60666F',
                }}
              >
                토비
              </CharacterName>
            </CharacterOne>
          </CharacterCenterDiv>
        </CharacterDiv>
        <NicknameText>닉네임</NicknameText>
        <NicknameInput
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', {
            required: '닉네임 수정을 깜빡했어요',
            minLength: { value: 2, message: '한글자는 너무 짧아요' },
            maxLength: { value: 8, message: '8자를 초과했어요!' },
            pattern: {
              value: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣A-Za-z0-9]*$/,
              message: '숫자와 문자만 입력해부자!',
            },
          })}
        />
        <NicknameSubmit onClick={() => nicknameDup()}>중복확인</NicknameSubmit>
        {errors?.nickname ? (
          <NicknameAlert style={{ color: 'red' }}>
            {errors?.nickname?.message}
          </NicknameAlert>
        ) : (
          <NicknameAlert>8자 이내로 입력해주세요</NicknameAlert>
        )}
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const BackarrButton = styled(Backarr)``
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 1.11%;

  top: 4.5%;
  width: 48px;
  height: 48px;
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
const CharacterDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  })}
  padding: 0px;

  position: absolute;
  width: 100%;
  height: 166px;
  top: 85px;
  background-color: #f6f9fe;
`
const CharacterCenterDiv = styled.div`
  position: absolute;
  width: 288px;
  height: 102px;
  left: calc(50% - 288px / 2);
  top: 32px;
`

const CharacterOne = styled.div`
  position: absolute;
  width: 80px;
  height: 102px;
  top: 0px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`
const Character = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  left: 0px;
  top: 0px;
  /* color/Btn-basic1 */
  background: #e5eaf2;
`
const CharacterName = styled.div`
  position: absolute;
  width: 46px;
  height: 14px;
  left: 17px;
  top: 88px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`
const NicknameText = styled.div`
  position: absolute;
  width: 38px;
  height: 14px;
  left: 16px;
  top: 272px;

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

const NicknameSubmit = styled.div`
  position: absolute;
  width: 28.8%;
  height: 52px;
  right: 4.44%;
  top: 294px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  /* color/Btn-basic1 */

  border: 1px solid #e5eaf2;
  box-sizing: border-box;
  border-radius: 8px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: right;
  letter-spacing: -0.04em;

  /* color/Secondary */

  color: #4675f0;
`
const NicknameInput = styled.input`
  position: absolute;
  width: 60%;
  height: 52px;
  left: 16px;
  top: 294px;

  background: #f5f5f7;
  border-radius: 8px;
  padding-left: 16px;
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
const NicknameAlert = styled.div`
  position: absolute;
  width: 110px;
  height: 11px;
  left: 31px;
  top: 352px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #999999;
`

export default Modified
