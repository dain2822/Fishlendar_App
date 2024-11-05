import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen({ route, navigation }) {
    const [selectedDates, setSelectedDates] = useState(JSON.parse(route.params.values));
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // 헤더 버튼 추가
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setIsModalVisible(true)} // 모달 표시를 위한 상태 변경
                    title="Select Options"
                    color="#fff"
                />
            ),
        });
    }, [navigation]);

    // 날짜 선택 핸들러
    const onDayPress = (day) => {
        setSelectedDay(day.dateString); // 선택한 날짜 저장
    };

    // 날짜별 금어기 어종의 개수를 세어 마킹
    const markedDates = selectedDates.reduce((acc, item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            const dateString = dt.toISOString().split('T')[0];
            if (!acc[dateString]) {
                acc[dateString] = { dots: [], selected: true };
            }
            acc[dateString].dots.push({ color: 'blue' }); // 각 금어기 어종마다 원 추가
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
                markingType='multi-dot' // 여러 개의 점을 표시할 수 있는 타입
                onDayPress={onDayPress}
            />

            {/* 모달 구현 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select an Option</Text>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                console.log("Option 1 selected");
                                setIsModalVisible(false); // 모달 닫기
                            }}
                        >
                            <Text style={styles.optionText}>Option 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                console.log("Option 2 selected");
                                setIsModalVisible(false); // 모달 닫기
                            }}
                        >
                            <Text style={styles.optionText}>Option 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.optionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
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
    container: { flex: 1, backgroundColor: 'white' },
    fishInfoContainer: { padding: 10, backgroundColor: '#f9f9f9' },
    fishInfoText: { fontSize: 16, marginVertical: 5, color: 'black' },
    noFishInfoText: { fontSize: 16, color: 'gray', textAlign: 'center', marginVertical: 10 },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#e6f2ff',
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
});
