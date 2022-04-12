import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/CalendarStyle.css'
import ko from 'date-fns/locale/ko'
import { useMutation } from 'react-query'
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list'
import { useMainPageData } from '../apis/mainpageData'
import { setFlexStyles } from '../styles/Mixin'
import { request } from '../utils/axios'
import Nav from '../components/Nav'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import { getDate, getMonth } from '../hooks/getDate'
import '../styles/OneDaySlide.css'
import { ReactComponent as RightArrow } from '../assets/icons/arrow/rightarr.svg'
// import { ReactComponent as Challenge } from '../assets/icons/onedaybuza/challenge.svg'
import { ReactComponent as Minus } from '../assets/icons/onedaybuza/minus.svg'
import { ReactComponent as Plus } from '../assets/icons/onedaybuza/plus.svg'
import { ReactComponent as Group } from '../assets/icons/onedaybuza/together.svg'
import { ReactComponent as Challenge } from '../assets/icons/onedaybuza/challenge.svg'

// import { ReactComponent as Together } from '../assets/icons/onedaybuza/together.svg'

import { getItem, setItem } from '../utils/sessionStorage'
import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'
import LeftButton from '../components/Header/LeftButton'
import receipt from '../assets/icons/onedaybuza/receipt.png'

registerLocale('ko', ko)

function ExampleCustomInput({ value, onClick }) {
  return (
    <CalBtn className="example-custom-input" type="button" onClick={onClick}>
      {value}
    </CalBtn>
  )
}

function OnedayBuza(state) {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: mainpageData } = useMainPageData(navigate)
  if (getItem('nowdate') === undefined) {
    setItem('nowdate', new Date())
  }
  const [startDate, setStartDate] = useState(new Date(getItem('nowdate')))

  async function setDateMutate(date) {
    setItem('nowdate', date)
    setStartDate(date)
  }

  const mutation = useMutation((date) => {
    return request({
      url: '/daylist',
      method: 'post',
      data: { recordDate: date },
    })
  })

  useEffect(() => {
    const selectDate = getDate(startDate)
    mutation.mutate(selectDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', { month: 'long' })
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' })
    return `${month.substr(0, month.length - 1)}/${day.substr(
      0,
      day.length - 1,
    )}`
  }
  const removeTodayList = (id) => {
    return request({
      url: `/daylist/${id}`,
      method: 'delete',
      data: {},
    }).then(navigate(0))
  }
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', { weekday: 'long' }).substr(0, 1)
  }
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
    )
  }
  function yesterday() {
    setItem('nowdate', new Date(startDate - 24 * 60 * 60 * 1000))
    setStartDate(new Date(startDate - 24 * 60 * 60 * 1000))
  }
  function nextday() {
    setItem('nowdate', new Date(startDate - 1 + 24 * 60 * 60 * 1000 + 1))
    setStartDate(new Date(startDate - 1 + 24 * 60 * 60 * 1000 + 1))
  }
  return (
    <Wrapper>
      <TitleText>하루부자</TitleText>
      <LeftButton onClick={() => navigate('/')}>
        <RightArrow
          style={{ transform: 'rotate(180deg)', width: '48px', height: '48px' }}
        />
      </LeftButton>

      <NavLink to="/onedaypost">
        <RightButton>입력</RightButton>
      </NavLink>

      {/* <TopLine /> */}
      <CalDiv>
        <LeftArrowDiv onClick={() => yesterday()}>
          <RightArrow
            style={{
              transform: 'rotate(180deg)',
              width: '24px',
              height: '24px',
            }}
          />
        </LeftArrowDiv>
        <div>
          <DatePicker
            dateFormat="yyyy.MM.dd"
            name="calendar"
            enabled="true"
            locale="ko"
            selected={startDate}
            onChange={(date) => setDateMutate(date)}
            customInput={<ExampleCustomInput />}
            maxDate={new Date()}
            // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
            popperModifiers={{ preventOverflow: { enabled: true } }}
            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
            dayClassName={(d) => {
              if (
                d.getDate() === startDate.getDate() &&
                d.getMonth() === startDate.getMonth()
              ) {
                return 'selected-day'
              }
              if (getDayName(createDate(d)) === '토') {
                return 'saturday'
              }
              if (getDayName(createDate(d)) === '일') {
                return 'sunday'
              }

              return 'weekday'
            }}
          />
        </div>
        <RightArrowDiv onClick={() => nextday()}>
          <RightArrow />
        </RightArrowDiv>
      </CalDiv>
      <CalendarLine style={{ top: '18.89%' }} />
      <TotalLine style={{ top: '22.74%' }}>
        <TotalLeft>나의 지갑</TotalLeft>
        <TotalRight>
          {mainpageData
            ? mainpageData.data.wallet.toLocaleString('en-US')
            : '0'}{' '}
          원
        </TotalRight>
      </TotalLine>
      <CalendarLine style={{ top: '25.14%' }} />
      <TotalLine style={{ top: '29.14%' }}>
        <TotalLeft>수입</TotalLeft>
        <TotalRight>
          + {mutation?.data?.data?.dayIncomeAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <TotalLine style={{ top: '33.29%' }}>
        <TotalLeft>지출</TotalLeft>
        <TotalRight>
          - {mutation?.data?.data?.dayExpenseAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <CalendarLine style={{ top: '35.83%' }} />
      <TotalLine style={{ top: '39.9%' }}>
        <TotalLeft>같이해부자</TotalLeft>
        <TotalRight>
          {mutation?.data?.data?.dayGroupAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <TotalLine style={{ top: '43.8%' }}>
        <TotalLeft>도전해부자</TotalLeft>
        <TotalRight>
          {mutation?.data?.data?.dayChallengeAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <CalendarLine style={{ top: '46.53%' }} />

      <TodayListBigDiv />
      <ZigZagDiv>
        <Receipt src={receipt} />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />

        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
        <ZigZag />
      </ZigZagDiv>
      <TodayListTitle>전체 내역</TodayListTitle>
      <TodayListDiv>
        <SwipeableList threshold={0.7}>
          {mutation &&
            mutation?.data?.data?.dayRecordList.map((d) => (
              <SwipeableListItem
                style={{ backgroundColor: 'red', opacity: '1' }}
                key={d.id}
                swipeLeft={{
                  content: (
                    <div
                      style={{
                        padding: '10px',
                        marginLeft: '10px',
                        marginBottom: '10px',
                        width: '91.11%',
                        height: '64px',
                        background: '#B9BFC8',
                        borderRadius: '8px',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      밀어서 삭제
                    </div>
                  ),
                  action: () => {
                    removeTodayList(d.id)
                  },
                }}
              >
                <TodayListLine key={d.id}>
                  <TodayListLineLeft>
                    <TodayListLineTitle>
                      {d.recordType === 'income' ? '수입' : ''}
                      {d.recordType === 'expense' ? '지출' : ''}
                      {d.recordType === 'group' ? '같이해부자' : ''}
                      {d.recordType === 'challenge' ? '도전해부자' : ''}
                    </TodayListLineTitle>
                    <TodayListLineMemo>{d.memos}</TodayListLineMemo>
                  </TodayListLineLeft>
                  <TodayListLineRight>
                    {d.recordType === 'income' ? <Plus /> : ''}
                    {d.recordType === 'expense' ? <Minus /> : ''}
                    {d.recordType === 'group' ? <Group /> : ''}
                    {d.recordType === 'challenge' ? <Challenge /> : ''}
                    {d.recordAmount.toLocaleString('en-US')} 원
                  </TodayListLineRight>
                </TodayListLine>
              </SwipeableListItem>
            ))}
        </SwipeableList>
      </TodayListDiv>

      <Nav />
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
const MidLine = styled.div`
  position: absolute;
  width: 90%;
  left: 5%;
  height: 1px;
  top: 33.33%;

  /* color / gray / Gray50 */

  background-color: #f2f2f2;
  box-sizing: border-box;
`
const BottomLine = styled.div`
  position: absolute;
  width: 90%;
  left: 5%;
  height: 1px;
  top: 45.69%;

  /* color / gray / Gray50 */

  background-color: #f2f2f2;
  box-sizing: border-box;
`
const CalDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
  })}
  position: absolute;
  width: 100%;
  height: 23px;
  top: 15.7%;
`
const LeftArrowDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`
const RightArrowDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`
const CalBtn = styled.button`
  /* Heading / Roboto / H3(B) */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  letter-spacing: -0.04em;
  margin: 0 auto;
  color: #000000;
`
const CalendarLine = styled.hr`
  position: absolute;
  width: 90.4%;
  height: 1px;
  left: 4.8%;

  /* color/icon */

  border: 1px dashed #d1d5da;
  box-sizing: border-box;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 12px 0px;
`
const TotalLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'space-between',
  })}
  position: absolute;
  width: 90%;
  height: 14px;
  left: 5%;
`
const TotalLeft = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 100%;
  /* identical to box height, or 14px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / gray / Gray70 */
  color: #555555;
`
const TotalRight = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  text-align: right;
  letter-spacing: -0.04em;
  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListBigDiv = styled.div`
  position: absolute;

  width: 100%;
  height: 38%;
  left: 0px;
  top: 0px;
  top: 51%;

  background-color: #ebf2ff;
`
const TodayListTitle = styled.div`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 4.44%;
  top: 56.39%;
  /* Heading/Noto Sans KR/H6(B) */
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListDiv = styled.div`
  position: relative;
  width: 100%;
  height: 28%;
  top: 60.56%;

  padding: 0 4.44%;
  overflow: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const TodayListLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  padding: 12px;
  position: relative;
  width: 100%;
  height: 31.75%;

  /* color/Btn-basic1 */

  background: #e5eaf2;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`
const TodayListLineLeft = styled.div``
const TodayListLineRight = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  padding: 6px 12px;
  white-space: nowrap;
  min-width: 92px;
  width: auto;
  height: 28px;

  /* color / text / Color-text-Gray3 */
  background: #ffb000;
  border-radius: 25px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.04em;

  /* Rectangle 173 */
  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
`
const TodayListLineTitle = styled.div`
  /* Heading/Noto Sans KR/H6(B) */
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  padding-bottom: 4px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListLineMemo = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / gray / Gray70 */
  color: #555555;
`
const ZigZagDiv = styled.div`
  position: absolute;
  display: flex;
  top: calc(51% - 10px);
  height: 20px;
  width: 100%;
`
const ZigZag = styled.div`
  width: 26px;
  height: 26px;
  background-color: #ffffff;
  transform: rotate(45deg);
  margin-left: 6px;
  top: -10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.08);
`
const Receipt = styled.div`
  position: absolute;
  width: 100%;
  height: 10%;
  top: 0;
  left: 0;
`

export default OnedayBuza
