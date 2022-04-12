import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import TutorialIMG from '../assets/tutorial/tutorial-final.png'

function Tutorial() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <TutorialBox>
        <TutorialImg src={TutorialIMG} />
      </TutorialBox>
      <StartButton
        onClick={() => {
          Swal.fire({
            title: '환영합니다!',
            text: '이제부터 열심히 모아부자!',
          })
            .then((result) => {
              navigate('/')
            })
            .catch((err) => console.log(err))
        }}
      >
        시작하기
      </StartButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const TopDiv = styled.div`
  width: 100%;
  height: 82px;
`

const TutorialBox = styled.div`
  height: 720px;
  border-radius: ${isMobile ? 0 : '31.4px'};
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const TutorialImg = styled.img`
  width: 100%;
  object-fit: cover;
`
const StartButton = styled.button`
  position: absolute;
  top: 90%;
  left: 16px;
  width: 91.1%;
  height: 52px;
  /* Rectangle 173 */

  background: #ffffff;
  /* color/Secondary */

  border: 2px solid #4675f0;
  border-radius: 11px;
`

export default Tutorial
