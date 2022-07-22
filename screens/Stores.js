import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import {db, storage} from '../firebase-config';
import {collection, getDocs} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';


const Stores = () => {
    const [stores, setStores] = useState([]);
    const [storesImages, setStoresImages] = useState([]);
    const navigation = useNavigation();
    const storeCollectionRef = collection(db, 'stores')

    useEffect(() => {

        const getStoresData = async () => {
            const data = await getDocs(storeCollectionRef);
            let notSortedData = (data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setStores(notSortedData.sort((a, b) => a.id - b.id))
        }

        getStoresData();

    }, []);

    useEffect(() => {

        const addStoresImages = async () => {
            const tempStoreImages = await Promise.all(
                stores.map(async (store) => {
                    let storeImageRef = ref(storage, 'gs://product-store-419ec.appspot.com' + store.image);
                    let imageURL = await getDownloadURL(storeImageRef);
                    return imageURL
                })
            ) 
            setStoresImages([...tempStoreImages]);
        }

        if(stores.length > 0){
            addStoresImages();
        }

    }, [stores])
    


    return (
        <View style={styles.container}>
            {stores.map((store, key) => {
                return(
                <TouchableOpacity style={styles.container} key={store.id} onPress={() => navigation.navigate('Products', {'store': store.name})}>
                    <View style={styles.block} key={store.id}>
                        <ImageBackground source={{ uri: storesImages[key] }} style={styles.imageBack}>
                            <Text style={styles.storeName}>{store.name}</Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Stores

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    imageBack: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    storeName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'grey',
        textShadowRadius: 10
    }
  });