import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screen/CalendarScreen';
// import SettingScreen from 

const CalendarScreen = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const CalendarStackNavigation = () => {
    return (
        <CalendarStack.Navigator initialRouteName = "CalendarScreen">
            <CalendarStack.Screen name = "CalendarScreen" component = {CalendarScreen} />
        </CalendarStack.Navigator>
    );
};

const CalendarNavigator = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name = "Calendar" component = {CalendarNavigaton}/>

            <BottomTab.Screen name = "Setting" component = {SettingScreen} />
        </BottomTab.Navigator>
    );
};