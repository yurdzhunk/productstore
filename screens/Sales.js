import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import image1 from '../assets/sale1.png';
import image2 from '../assets/sale2.png';
import image3 from '../assets/sale3.png';
import image4 from '../assets/sale4.png';
import image5 from '../assets/sale5.png';
import image6 from '../assets/sale6.png';
import image7 from '../assets/sale7.png';
import image8 from '../assets/sale8.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Sales = () => {

    const salesImages = [image1, image2, image3, image4, image5, image6, image7, image8];
    const {height, width} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={{flex: 8}}>
                <Carousel
                    data={salesImages}
                    renderItem={({item, index}) => (
                            <Image
                            source={item}
                            style={{height: '80%', width: width, justifyContent: 'center', alignItems: 'center'}}
                            /> 
                    )}
                    sliderWidth={width}
                    itemWidth={width}
                    sliderHeight={500}
                    itemHeight={300}
                    layout={'stack'}
                    layoutCardOffset={4}
                />
            </View>
            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text1}>Swipe cards on Left to get more!</Text>
            </View>
            <MaterialCommunityIcons style={{position: 'absolute', left: '45%', bottom: '25%'}} name="gesture-swipe-left" size={62} color="black" />
        </View>
    )
}

export default Sales

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
      },
      text1: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center', 
        alignItems:'center'
      }
})