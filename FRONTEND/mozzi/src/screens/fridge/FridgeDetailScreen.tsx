import { Keyboard, Dimensions, Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header/Header';
import { SearchFood } from '../../components/AutoWord/SearchFood';
import useFridgeStore from '../../store/FridgeStore';
import note from '../../assets/fridge/note.png';
import clip from '../../assets/fridge/clip.png';

interface FoodItem {
  food: string;
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #FFFEF2;
`;

const ClipImg = styled.Image`
  position: absolute;
  top: 20;
  z-index: 1001;
`;

const NoteImg = styled.Image`
  height: ${({ keyboardOpen }) => (keyboardOpen ? '300px' : '460px')};
  box-shadow: 5px 5px 5px gray;
`;

const Note = styled.View`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TitleContainer = styled.View`
  position: absolute;
  top: 110;
  display: flex;
  align-items: center;
`;

const TitleImg = styled.Image`
  display: inline;
  width: 30px;
  height: 30px;
`;

const MenuItem = styled.Text`
  display: inline;
  font-size: 12px;
`;

const InputContainer = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
`;

const MyFood = styled.ScrollView`
  position: absolute;
  top: 170;
  width: 280px;
  height: 300px;
`;

const MyFoodText = styled.Text`
  font-size: 20;
`;

const DeleteButton = styled.TouchableOpacity`
  /* color: lightgray; */
`

const SendButton = styled.TouchableOpacity`
  position: absolute;
  top: 12;
  right: 32;
  bottom: 0;
  padding: 0 10px;
`;

const FridgeDetailScreen = ({ route }) => {
  const [text, setText] = useState<FoodItem | null>(null);
  const scrollViewRef = useRef(null);
  const getMyFoods = useFridgeStore((state) => state.getMyFoods);
  const allFoods = useFridgeStore((state) => state.allFoods);
  const savedFoods = useFridgeStore((state) => state.savedFoods);
  const addFridge = useFridgeStore((state) => state.addFridge);
  const deleteFood = useFridgeStore((state) => state.deleteFood);

  const { item } = route.params;
  const { name, img , categoryId } = item;

  const navigation = useNavigation();

  useEffect(() => {
    console.log(`카테고리 번호: ${categoryId}`);
    if (categoryId) {
      // categoryId가 배열인지 확인하고, 배열의 각 요소에 대해 getMyFoods를 호출합니다.
      categoryId.forEach(async (id) => {
        await getMyFoods(id);
      });
    }
  }, [getMyFoods, route.params]);

  const handleSend = () => {
    if (text) {
      addFridge(text); // Zustand 스토어 업데이트 및 DB 업데이트
      // setText(''); // 텍스트 입력 필드 초기화
      scrollViewRef.current.scrollToEnd({ animated: true }); // 스크롤을 맨 아래로 이동
    }
  };

  // 삭제 버튼 클릭 시 해당 음식을 삭제하는 함수
  const handleDelete = (foodName) => {
    deleteFood(foodName); // delete 요청 수행
  };



  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <Note>
        <ClipImg source={clip} />
        <NoteImg source={note} />
        <TitleContainer>
          {img && <TitleImg source={img} />}
          <MenuItem>
            {name}
          </MenuItem>
        </TitleContainer>
        <MyFood ref={scrollViewRef}>
          {savedFoods.map((item, index) => (
            <MyFoodText key={index}>
              {item}
              <DeleteButton onPress={() => handleDelete(item)}>
                <MaterialIcons name="close" size={20} />
              </DeleteButton>
          </MyFoodText>
          ))}
        </MyFood>
      </Note>

      <InputContainer>
        <SearchFood
          data={allFoods}
          setQuery={setText} // 여기서 setQuery를 setText로 설정
          placeholder="재료를 입력하세요..."
        />
        {text && ( // 텍스트가 있을 때만 전송 버튼 표시
          <SendButton onPress={handleSend}>
            <MaterialIcons name="arrow-upward" size={25} />
          </SendButton>
        )}
      </InputContainer>
    </Container>
  );
};

export default FridgeDetailScreen;
