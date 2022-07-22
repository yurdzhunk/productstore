import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import {db, storage} from '../firebase-config';

const Products = ({navigation, route}) => {

    const {store} = route.params;
    const {height, width} = useWindowDimensions();

    const [products, setProducts] = useState([]);
    const [productsImages, setProductsImages] = useState([]);


    useEffect(() => {

        const getProductsData = async () => {
            const q = query(collection(db, 'products'), where('store', '==', store))
            const data = await getDocs(q);
            let notSortedData = (data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setProducts(notSortedData.sort((a, b) => a.id - b.id));
        }

        getProductsData();

    }, []);

    useEffect(() => {

        const addProductsImages = async () => {
            const tempProductImages = await Promise.all(
                products.map(async (product) => {
                    let storeImageRef = ref(storage, 'gs://product-store-419ec.appspot.com' + product.image);
                    let imageURL = await getDownloadURL(storeImageRef);
                    return imageURL
                })
            ) 
            setProductsImages([...tempProductImages]);
        }

        if(products.length > 0){
            addProductsImages();
        }

    }, [products])

    const renderItem = ({item}) => (
        <View style={{...styles.card, width: width}}>
            <Image  style={styles.cardImage} source={{uri: productsImages[item.id]}}/>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text style={{...styles.prodName, color: 'green'}}>{item.price}$</Text>
            <TouchableOpacity style={styles.buttonPrimary}>
                <Text style={{...styles.prodName, color: '#fff', fontSize: 26}}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                // onRefresh={() => refresh()}
                // refreshing={isFetching}
                // ref={refFlatList}
            />
        </View>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width:3,
            height:3
        }
    },
    cardImage: {
        width: '80%',
        height: 300,
    },
    prodName:{
        fontSize: 32,
        fontWeight: 'bold',
        color: 'grey'
    },
    buttonPrimary: {
        marginVertical: 10,
        width: 200,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16'
    }
  });