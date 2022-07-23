import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { emptyCart } from '../redux/cartProducts';
import { doc, setDoc } from "firebase/firestore"; 
import {db, storage} from '../firebase-config';

const Order = ({navigation, route}) => {

    const {height, width} = useWindowDimensions();
    const {total} = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');

    const productsInCart = useSelector((state) => state.cartProducts.list);
    const dispatch = useDispatch();

    const randomOrderID = () => {
        let s = 'abcdefghklmnqtp1fsfs234567890';
        const a = s.split('');
        a.sort((a, b) => {return (0.5 - Math.random())})
        s = a.join('');
        return s
    }

    const confirmOrder = async () => {
        let id = randomOrderID;
        await setDoc(doc(db, "orders", id.toString()), {
            name: name,
            email: email,
            phone : phone,
            adress: adress,
            order: JSON.stringify(productsInCart)
          });
        Alert.alert("We received your order!")
        setName('');
        setEmail('');
        setPhone('');
        setAdress('');
        dispatch(emptyCart());
        navigation.navigate('Cart');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{...styles.inpView, width: width}}>
                    <TextInput style={styles.inp} placeholder='Name' onChangeText={setName}></TextInput>
                </View>
                <View style={{...styles.inpView, width: width}}>
                    <TextInput keyboardType='email-address' style={styles.inp} placeholder='Email' onChangeText={setEmail}></TextInput>
                </View>
                <View style={{...styles.inpView, width: width}}>
                    <TextInput keyboardType='phone-pad' style={styles.inp} placeholder='Phone' onChangeText={setPhone}></TextInput>
                </View>
                <View style={{...styles.inpView, width: width}}>
                    <TextInput style={styles.inp} placeholder='Adress' onChangeText={setAdress}></TextInput>
                </View>
                <View style={{...styles.inpView, width: width, flex: 3}}>
                    <Text style={{...styles.text4, color: '#000'}}>Total Price: <Text style={{...styles.text4, color: 'green'}}>{total}$</Text></Text>
                </View>
                <TouchableOpacity style={{...styles.buttonConfirm, width: width}} onPress={() => confirmOrder()}>
                    <Text style={{...styles.text4, fontSize: 32}}>Confirm Order</Text>
                </TouchableOpacity>
             </View>
        </TouchableWithoutFeedback>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    inp: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: '#000',
        width: '80%',
        height: 30,
        // marginVertical: 5,
        marginHorizontal: '12.5%',
        paddingHorizontal: 10,
        textAlign: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
    inpView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfirm: {
        paddingVertical: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text4: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold'
    },
})