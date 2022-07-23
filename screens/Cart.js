import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { deleteProduct } from '../redux/cartProducts';
import { useNavigation } from '@react-navigation/native';


const Cart = () => {

        const productsInCart = useSelector((state) => state.cartProducts.list);
        const dispatch = useDispatch();
        const {height, width} = useWindowDimensions();
        const navigation = useNavigation();
        const [total, setTotal] = useState(0);

        useEffect(() => {
            let tempTotal = 0;
            for(let item of productsInCart){
                tempTotal = tempTotal +  parseInt(item.count) * parseInt(item.price)
            }
            setTotal(tempTotal);
        }, [productsInCart]);

        const deleteProductFromCart = (id) => {
                dispatch(deleteProduct(id));
                console.log(productsInCart)
        }


        const renderItem = ({item}) => (
            <View style={{...styles.card, width: width}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image  style={styles.cardImage} source={{uri: item.image}}/>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{item.name}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text1}>
                        {item.count}*
                        <Text style={styles.text2}>{item.price}$
                            <Text style={styles.text3}>= 
                                <Text style={styles.text2}>
                                    {item.count * item.price}$
                                </Text>
                            </Text>
                        </Text>
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => deleteProductFromCart(item.id)}>
                        <Ionicons name="trash-bin-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )

        return (
            <View style={{...styles.container, width: width}}>
                {(productsInCart.length > 0)
                ?  <>
                        <FlatList
                            data={productsInCart}
                            renderItem={renderItem}
                            keyExtractor={item => String(item.id)}
                        />
                        <TouchableOpacity style={{...styles.buttonConfirm, width: width}} onPress={() => navigation.navigate('Order', {'total': total})}>
                            <Text style={styles.text4}>Make Order</Text>
                        </TouchableOpacity>
                    </>
                : <Text style={{...styles.text3, fontSize: 32}}>No products in cart yet</Text>
                }
            </View>
        )
}

export default Cart

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width:3,
            height:3
        }
    },
    cardImage: {
        width: 100,
        height: 100,
    },
    text1: {
        color: 'blue',
        fontWeight: 'bold'
    },
    text2: {
        color: 'green',
        fontWeight: 'bold'
    },
    text3: {
        color: 'black',
        fontWeight: 'bold'
    },
    text4: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold'
    },
    buttonConfirm: {
        paddingVertical: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    }
})