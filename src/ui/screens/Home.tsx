import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ScanScreen')} >
                <Text>
                    Scan
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

