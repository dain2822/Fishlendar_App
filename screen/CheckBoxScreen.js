import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function CheckBoxScreen() {
  const [selectedFish, setSelectedFish] = useState([]); // 여러 어종을 선택할 수 있도록 배열로 설정
  const navigation = useNavigation();

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
    setSelectedFish(prevState => {
      const isSelected = prevState.some(selected => selected.name === fish.name);
      if (isSelected) {
        return prevState.filter(selected => selected.name !== fish.name);
      } else {
        return [...prevState, fish];
      }
    });
  };

  const handleConfirm = () => {
    navigation.navigate('Calendar', { values: JSON.stringify(selectedFish) });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Fish</Text>
      {fishData.map((fish) => (
        <View key={fish.name} style={styles.checkboxContainer}>
          <Checkbox
            value={selectedFish.some(selected => selected.name === fish.name)}
            onValueChange={() => toggleDateSelection(fish)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{fish.name}</Text>
        </View>
      ))}
      <Button title="Confirm" onPress={handleConfirm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: { marginRight: 8 },
  label: { fontSize: 16 },
});
