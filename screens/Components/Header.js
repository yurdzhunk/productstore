import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Header = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={styles.text1}>Food<Text style={styles.text2}>Booker</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#fff'
    },
    text1: {
        color: 'orange',
        fontSize: 26,
        fontWeight: 'bold'
    },
    text2: {
        color: 'red',
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default Header