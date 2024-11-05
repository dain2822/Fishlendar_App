import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Checkbox from 'expo-checkbox'; // expo-checkbox 사용
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 가져오기

export default function App() {
  const [selectedFish, setSelectedFish] = useState(null); // 선택된 어종을 저장하는 상태
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const fishData = [
    { name: '대구', startDate: '2024-01-16', endDate: '2024-02-15' },
    { name: '문치가자미', startDate: '2024-12-01', endDate: '2024-01-31' },
    { name: '연어', startDate: '2024-10-01', endDate: '2024-11-03' },
    { name: '전어', startDate: '2024-05-01', endDate: '2024-07-15' },
    { name: '쥐노래미', startDate: '2024-11-01', endDate: '2024-12-31' },
    { name: '참홍어', startDate: '2024-06-01', endDate: '2024-07-15' },
    { name: '갈치', startDate: '2024-07-01', endDate: '2024-07-31' },
    { name: '고등어', startDate: '2024-07-01', endDate: '2024-07-31' },
    { name: '말쥐치', startDate: '2024-04-01', endDate: '2024-06-03' },
    { name: '옥돔', startDate: '2024-05-01', endDate: '2024-07-31' },
    { name: '명태', startDate: '2024-07-21', endDate: '2024-08-02' },
    { name: '삼치', startDate: '2024-01-01', endDate: '2024-12-31' },
    { name: '감성돔', startDate: '2024-05-01', endDate: '2024-05-31' },
    { name: '꽃게', startDate: '2024-05-01', endDate: '2024-05-31' },
    { name: '대게류', startDate: '2024-06-01', endDate: '2024-09-03' },
    { name: '붉은대게', startDate: '2024-06-01', endDate: '2024-11-03' },
    { name: '대하', startDate: '2024-07-10', endDate: '2024-08-25' },
    { name: '새조개', startDate: '2024-05-01', endDate: '2024-06-03' },
    { name: '소라', startDate: '2024-06-16', endDate: '2024-09-03' },
    { name: '전복류', startDate: '2024-06-01', endDate: '2024-06-30' },
    { name: '코끼리조개', startDate: '2024-09-01', endDate: '2024-10-01' },
    { name: '키조개', startDate: '2024-05-01', endDate: '2024-06-30' },
    { name: '가리비', startDate: '2024-07-01', endDate: '2024-08-31' },
    { name: '오분자기', startDate: '2024-03-01', endDate: '2024-06-30' },
    { name: '넓미역', startDate: '2024-07-01', endDate: '2024-08-31' },
    { name: '우뭇가사리', startDate: '2024-09-01', endDate: '2024-11-30' },
    { name: '톳', startDate: '2024-11-01', endDate: '2025-03-31' },
    { name: '해삼', startDate: '2024-10-01', endDate: '2025-01-31' },
    { name: '살오징어', startDate: '2024-07-01', endDate: '2024-07-31' },
    { name: '낙지', startDate: '2024-04-01', endDate: '2024-05-31' },
    { name: '주꾸미', startDate: '2024-06-01', endDate: '2024-06-30' },
    { name: '참문어', startDate: '2024-05-11', endDate: '2024-08-31' }
  ];

  const toggleDateSelection = (fish) => {
    // 현재 선택된 어종이 없거나 다를 경우 선택
    if (selectedFish && selectedFish.name === fish.name) {
      setSelectedFish(null); // 같은 어종이면 선택 해제
    } else {
      setSelectedFish(fish); // 새로운 어종 선택
    }
    console.log(fish.startDate, fish.endDate); // 선택한 물고기의 날짜 범위를 출력
  };

  const handleConfirm = () => {
    // selectedDates 정보를 Calendar 페이지로 넘기기
    if (selectedFish) {
      navigation.navigate('Calendar', { values: JSON.stringify([selectedFish]) });
    } else {
      // 선택된 어종이 없을 경우 알림
      alert('Please select a fish.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Fish</Text>
      {fishData.map((fish) => (
        <View key={fish.name} style={styles.checkboxContainer}>
          <Checkbox
            value={selectedFish && selectedFish.name === fish.name}
            onValueChange={() => toggleDateSelection(fish)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{fish.name}</Text>
          {selectedFish && selectedFish.name === fish.name && (
            <Text style={styles.dateRange}>
              {`Start Date: ${fish.startDate}, End Date: ${fish.endDate}`}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
        {/* 버튼 누르면 {handleConfirm}함수 실행되서 Calendar화면으로 넘어감 */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40, // 추가된 여백으로 버튼이 잘리지 않도록 함
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  dateRange: {
    marginLeft: 8,
    fontSize: 12,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20, // 버튼이 보이도록 추가된 여백
    alignItems: 'center',
  },
});