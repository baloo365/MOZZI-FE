import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin: 50px 0px 20px 40px;
  text-align: left;
  width: 100%;
`

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 28px;
  position: absolute;
  top: 65px;
  right: 100px;
`

const MyCalendar = styled(Calendar)`
  width: 350px;
  height: 590px;
  margin: 0px 20px 0px 20px;
`

const DayStyle = styled.View`
  width: 50px;
  height: 65px;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? '#c6e4ee' : 'transparent')};
`

const DayNum = styled.Text`
  align-items: center;
  color: ${props => props.textColor};
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
`

const CalendarImage = styled.Image`
  width: 95%;
  height: 95%;
  border-radius: 5px;
`

function DiaryScreen () {

  const navigation = useNavigation()

  const moveDiaryDetail = (date) => {
    navigation.navigate("DiaryDetail", {date: date})
  }
  const moveDiaryCreate = () => {
    navigation.navigate("DiaryCreate")
  }

  return (
    <>
      <Container>
        <Title>나의 요리 달력</Title>
        <Btn onPress={moveDiaryCreate}>
          <Icon name="add" size={24} color="white" />
        </Btn>

        <MyCalendar
          dayComponent={({date, state}) => {
            let textColor = '#000' // 기본 텍스트 색상

            if (state === 'disabled') {
              textColor = '#d9e1e8' // 비활성화된 날짜(저번달/다음달 날짜)의 색상
            } else if (state === 'today') {
              textColor = 'red'
            }

            return (
              <TouchableOpacity onPress={() => moveDiaryDetail(date)}>
                <DayStyle isSelected={state === 'selected'}>
                <DayNum textColor={textColor} isToday={state === 'today'}>
                  {date.day}
                </DayNum>
                  {state !== 'disabled' && (
                    <CalendarImage
                      source={require('../../assets/recommend/pizza.jpg')}
                    />
                  )}
                </DayStyle>
              </TouchableOpacity>
            )
          }}
        />
      </Container>
    </>
  )
}

export default DiaryScreen