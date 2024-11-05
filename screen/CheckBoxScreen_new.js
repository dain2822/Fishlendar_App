import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
    const [selectedFish, setSelectedFish] = useState([]);

    return(
        <View style = {Styles.container}>
            <View style = {styles.section}>
                <Checkbox style = {styles.checkbox} value = {isChecked} onValueChange = {setChecked} />
                <Text style = {styles.paragraph}>Normal Checkbox</Text>
            </View>
            <View style = {styles.section}>
                style = {styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
                />
        <Text style={styles.paragraph}>Custom colored checkbox</Text>
            </View>
        <View/>
    )
}