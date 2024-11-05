import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen({ route, navigation }) {
    const [selectedDates, setSelectedDates] = useState(JSON.parse(route.params.values));
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 날짜 선택 핸들러 수정
    const onDayPress = (day) => {
        setSelectedDay(day.dateString); // 선택한 날짜 저장
    };

    const markedDates = selectedDates.reduce((acc, item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const color = 'blue'; // 종료일의 색상

        for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            const dateString = dt.toISOString().split('T')[0];
            acc[dateString] = { marked: true, selected: true, selectedColor: color };
        }
        return acc;
    }, {});

    // 선택한 날짜에 해당하는 금어기 정보 가져오기
    const selectedFishInfo = selectedDates.filter(item => {
        const date = new Date(selectedDay);
        return date >= new Date(item.startDate) && date <= new Date(item.endDate);
    });

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType='period'
                onDayPress={onDayPress} // 날짜 선택 시 실행
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#e6f2ff',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: 'red',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                }}
            />
            
            <ScrollView style={styles.fishInfoContainer}>
                {selectedFishInfo.length > 0 ? (
                    selectedFishInfo.map(fish => (
                        <Text key={fish.name} style={styles.fishInfoText}>
                            {`금어기 어종: ${fish.name} | 시작: ${fish.startDate} ~ 종료: ${fish.endDate}`}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noFishInfoText}>선택한 날짜에 금어기 어종이 없습니다.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fishInfoContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    fishInfoText: {
        fontSize: 16,
        marginVertical: 5,
        color: 'black',
    },
    noFishInfoText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
});
