import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, ScrollView, Modal, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
=======
import { StyleSheet, Text, View, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
>>>>>>> 2227eb28b29f41fc78b84101d193c60402d32a2c
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 필요

export default function CalendarScreen({ route, navigation }) {
    const [selectedDates, setSelectedDates] = useState(JSON.parse(route.params.values));
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
<<<<<<< HEAD
    const [inputText, setInputText] = useState('');
    const [events, setEvents] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [lastClicked, setLastClicked] = useState(null);
    const [isEventListVisible, setIsEventListVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsEventListVisible(true)}>
                    <Ionicons name="calendar-outline" size={24} color="black" />
                </TouchableOpacity>
=======

    useEffect(() => {
        // 헤더 버튼 추가
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setIsModalVisible(true)} // 모달 표시를 위한 상태 변경
                    title="Select Options"
                    color="#fff"
                />
>>>>>>> 2227eb28b29f41fc78b84101d193c60402d32a2c
            ),
        });
    }, [navigation]);

    const onDayPress = (day) => {
        const now = new Date().getTime();
        if (lastClicked && (now - lastClicked) < 300) {
            setSelectedDay(day.dateString);
            setIsModalVisible(true);
        }
        setLastClicked(now);
    };

    const addEvent = () => {
        if (selectedDay && endDate && inputText) {
            setEvents((prevEvents) => [
                ...prevEvents,
                { startDate: selectedDay, endDate: endDate, text: inputText }
            ]);
            setInputText('');
            setEndDate('');
            setIsModalVisible(false);
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    };

    const deleteEvent = (eventToDelete) => {
        Alert.alert(
            '일정 삭제',
            '정말로 이 일정을 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    onPress: () => {
                        setEvents((prevEvents) =>
                            prevEvents.filter(event => event !== eventToDelete)
                        );
                    },
                    style: 'destructive',
                }
            ]
        );
    };

    const markedDates = selectedDates.reduce((acc, item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            const dateString = dt.toISOString().split('T')[0];
            if (!acc[dateString]) {
                acc[dateString] = { dots: [], selected: true };
            }
            acc[dateString].dots.push({ color: 'blue' });
        }
        return acc;
    }, {});

    events.forEach((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            const dateStr = dt.toISOString().split('T')[0];
            if (!markedDates[dateStr]) {
                markedDates[dateStr] = { dots: [] };
            }
            markedDates[dateStr].dots.push({ color: 'red' });
        }
    });

            

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType='multi-dot'
                onDayPress={onDayPress}
            />
<<<<<<< HEAD
            <ScrollView style={styles.infoContainer}>
                {events.length > 0 && (
                    <View>
                        {events.map((event, index) => (
                            <Text key={index} style={styles.eventText}>
                                {`일정: ${event.text} | 시작: ${event.startDate} ~ 종료: ${event.endDate}`}
                            </Text>
                        ))}
                    </View>
=======

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
>>>>>>> 2227eb28b29f41fc78b84101d193c60402d32a2c
                )}
            </ScrollView>

            {/* 일정 추가 모달 */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>일정 입력:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="일정 설명"
                            value={inputText}
                            onChangeText={setInputText}
                            autoCapitalize="none"
                            multiline={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="끝나는 날짜 (YYYY-MM-DD)"
                            value={endDate}
                            onChangeText={setEndDate}
                            autoCapitalize="none"
                        />
                        <Button title="추가" onPress={addEvent} />
                        <Button title="취소" onPress={() => setIsModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* 일정 관리 모달 */}
            <Modal visible={isEventListVisible} animationType="slide" transparent={false}>
                <View style={styles.modalContainerBright}>
                    <Text style={styles.modalTitle}>추가된 일정들</Text>
                    <ScrollView>
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => deleteEvent(event)}
                                >
                                    <Text style={styles.eventText}>
                                        {`일정: ${event.text} | 시작: ${event.startDate} ~ 종료: ${event.endDate}`}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noEventText}>추가된 일정이 없습니다.</Text>
                        )}
                    </ScrollView>
                    <Button title="닫기" onPress={() => setIsEventListVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
<<<<<<< HEAD
    infoContainer: { padding: 10, backgroundColor: '#f9f9f9' },
    eventText: { fontSize: 16, marginVertical: 5, color: 'green' },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)' // 밝은 배경으로 변경
    },
    modalContainerBright: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5' // 더 밝은 배경색으로 설정
=======
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
>>>>>>> 2227eb28b29f41fc78b84101d193c60402d32a2c
    },
    modalContent: {
        width: 300,
        padding: 20,
<<<<<<< HEAD
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    noEventText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    }
=======
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
>>>>>>> 2227eb28b29f41fc78b84101d193c60402d32a2c
});
