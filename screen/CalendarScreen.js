import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen({ route, navigation }) {
    const [selectedDates, setSelectedDates] = useState(JSON.parse(route.params.values));
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

    // 날짜를 마킹하기 위한 객체
    const markedDates = selectedDates.reduce((acc, item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const color = 'blue'; // 종료일의 색상 (예: 파란색)

        // 시작일부터 종료일까지 반복하여 마킹
        for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            const dateString = dt.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식
            acc[dateString] = { marked: true, selected: true, selectedColor: color };
        }
        return acc;
    }, {});

    return ( 
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType='period'
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#e6f2ff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: 'red',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
                onDayPress={(day) => {
                    console.log('selected day', day);
                }}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 약간의 배경색으로 투명도 조절
        padding: 20,
        borderRadius: 10,
    },
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
