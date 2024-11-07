import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TextInput, Button, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 필요

export default function CalendarScreen({ route, navigation }) {
    const [selectedDates, setSelectedDates] = useState(JSON.parse(route.params.values));
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [events, setEvents] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [lastClicked, setLastClicked] = useState(null);
    const [isEventListVisible, setIsEventListVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsEventListVisible(true)}>
                    <Ionicons name="calendar-outline" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onDayPress = (day) => {
        setSelectedDay(day.dateString);
        const now = new Date().getTime();
        if (lastClicked && (now - lastClicked) < 300) {
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

    const handleEndDateSelect = (day) => {
        setEndDate(day.dateString);
        setIsSelectingEndDate(false);
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

    const selectedFishInfo = selectedDates.filter(item => {
        const date = new Date(selectedDay);
        return date >= new Date(item.startDate) && date <= new Date(item.endDate);
    });

    const selectedEvents = events.filter(event => {
        const eventStartDate = new Date(event.startDate);
        const eventEndDate = new Date(event.endDate);
        const selectedDate = new Date(selectedDay);

        return selectedDate >= eventStartDate && selectedDate <= eventEndDate;
    });

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                markingType='multi-dot'
                onDayPress={onDayPress}
            />
            <ScrollView style={styles.infoContainer}>
                {selectedFishInfo.length > 0 ? (
                    <View>
                        {selectedFishInfo.map((fish, index) => (
                            <Text key={index} style={styles.fishInfoText}>
                                {`금어기: ${fish.name} | 시작: ${fish.startDate} ~ 종료: ${fish.endDate}`}
                            </Text>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.noEventText}>
                        {selectedDay ? `선택한 날짜에는 금어기 정보가 없습니다.` : `날짜를 선택해주세요.`}
                    </Text>
                )}
                {selectedEvents.length > 0 ? (
                    selectedEvents.map((event, index) => (
                        <Text key={index} style={styles.eventText}>
                            {`일정: ${event.text} | 시작: ${event.startDate} ~ 종료: ${event.endDate}`}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noEventText}>
                        {selectedDay ? `선택한 날짜에는 일정이 없습니다.` : `날짜를 선택해주세요.`}
                    </Text>
                )}
            </ScrollView>

            {/* 일정 추가 모달 */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
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
                        <Button title="날짜 선택" onPress={() => setIsSelectingEndDate(true)} />
                        {endDate ? <Text>선택한 종료 날짜: {endDate}</Text> : null}
                        <Button title="추가" onPress={addEvent} />
                        <Button title="취소" onPress={() => setIsModalVisible(false)} />
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* 종료 날짜 선택용 모달 */}
            <Modal visible={isSelectingEndDate} animationType="slide" transparent={false}>
                <View style={styles.modalContainerBright}>
                    <Calendar onDayPress={handleEndDateSelect} />
                    <Button title="닫기" onPress={() => setIsSelectingEndDate(false)} />
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
    infoContainer: { padding: 10, backgroundColor: '#f9f9f9' },
    fishInfoText: { fontSize: 16, marginVertical: 5, color: 'blue' },
    eventText: { fontSize: 16, marginVertical: 5, color: 'green' },
    noEventText: { fontSize: 16, color: 'gray', textAlign: 'center', marginVertical: 10 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    modalContainerBright: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    }
});
