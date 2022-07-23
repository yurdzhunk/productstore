import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import {db, storage} from '../firebase-config';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartProducts';
import { Entypo, Feather, Octicons, Ionicons, AntDesign } from '@expo/vector-icons';


const Products = ({navigation, route}) => {

    const {store} = route.params;
    const {height, width} = useWindowDimensions();

    const [products, setProducts] = useState([]);
    const [productsImages, setProductsImages] = useState([]);
    const [productsCounters, setProductsCounters] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {

        const getProductsData = async () => {
            const q = query(collection(db, 'products'), where('store', '==', store))
            const data = await getDocs(q);
            let notSortedData = (data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setProducts(notSortedData.sort((a, b) => a.id - b.id));
        }

        getProductsData();

    }, [store]);

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

        const addProductsCounters = () => {
            let tempArray = []
            for(let i of products){
                tempArray.push(1);
            }
            setProductsCounters(tempArray);
        }

        if(products.length > 0){
            addProductsImages();
            addProductsCounters();
        }

    }, [products, store])

    const plusCount = (id) => {
        let tempArray = [...productsCounters];
        tempArray[id]++;
        setProductsCounters([...tempArray])
    }

    const minusCount = (id) => {
        let tempArray = [...productsCounters];
        if(tempArray[id] != 1){
            tempArray[id]--;
            setProductsCounters([...tempArray])
        }
    }

    const addToCart = (item, image, count) => {
        let prod = {
            id: item.id,
            name: item.name,
            price: item.price,
            store: item.store,
            image: image,
            count: count,
        }
        dispatch(addProduct(prod));
    }

    const renderItem = ({item, index}) => (
        <View style={{...styles.card, width: width}}>
            <Image  style={styles.cardImage} source={{uri: productsImages[index]}}/>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text style={{...styles.prodName, color: 'green'}}>{item.price}$</Text>
            <View style={styles.counter}>
                <View style={{flex: 4, alignItems: 'flex-end'}}>
                    <TouchableOpacity style={styles.counterButton} onPress={() => minusCount(index)}>
                        <AntDesign name="minuscircleo" size={32} color="orange" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{ fontSize: 26}}>{productsCounters[index]}</Text>
                </View>
                <View style={{flex: 4, alignItems: 'flex-start'}}>
                    <TouchableOpacity style={styles.counterButton} onPress={() => plusCount(index)}>
                        <AntDesign name="pluscircleo" size={32} color="orange" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => addToCart(item, productsImages[index], productsCounters[index])}>
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
        width: '62%',
        height: 200,
    },
    prodName:{
        fontSize: 32,
        fontWeight: 'bold',
        color: 'grey'
    },
    buttonPrimary: {
        marginVertical: 10,
        width: 200,
        backgroundColor: '#2331F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16'
    },
    counter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    counterButton: {
        marginHorizontal: 15
    }
  });