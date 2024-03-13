import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import styled from 'styled-components/native'

interface UserProfileState {
  email: string
  allergyInfo: string
  favoriteFood: string
  dislikedFood: string
  isVegan: string
}

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-top: 50px;
  text-align: left;
  width: 100%;
`

const Label = styled.Text`
  margin-top: 30px;
`

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: silver;

`

function ProfileScreen () {

  const [form, setForm] = useState<UserProfileState>({
    email: '',
    allergyInfo: '',
    favoriteFood: '',
    dislikedFood: '',
    isVegan: ''
  })

  const handleEmailChange = (email: string) => setForm({ ...form, email })
  const handleAllergyInfoChange = (allergyInfo: string) => setForm({ ...form, allergyInfo })
  const handleFavoriteFoodChange = (favoriteFood: string) => setForm({ ...form, favoriteFood })
  const handleDislikedFoodChange = (dislikedFood: string) => setForm({ ...form, dislikedFood })
  const handleIsVeganChange = (isVegan: string) => setForm({ ...form, isVegan })

  const handleSubmit = () => {
    console.log('Form Data:', form)
  }

  return (
    <>
      <Title>내 정보</Title>
      <View>
        <Label>이메일</Label>
        <StyledInput
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Label>알레르기 정보</Label>
        <StyledInput
          placeholder="알레르기 정보를 입력하세요"
          value={form.allergyInfo}
          onChangeText={handleAllergyInfoChange}
        />
        <Label>좋아하는 음식</Label>
        <StyledInput
          placeholder="좋아하는 음식을 입력하세요"
          value={form.favoriteFood}
          onChangeText={handleFavoriteFoodChange}
        />
        <Label>싫어하는 음식</Label>
        <StyledInput
          placeholder="싫어하는 음식을 입력하세요"
          value={form.dislikedFood}
          onChangeText={handleDislikedFoodChange}
        />
        <Label>비건 여부</Label>
        <StyledInput
          placeholder="예/아니오로 입력하세요"
          value={form.isVegan}
          onChangeText={handleIsVeganChange}
        />
        <Button title="저장" onPress={handleSubmit} />
      </View>
    </>
  )
}

export default ProfileScreen