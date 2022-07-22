import React from 'react';
import { View, Text} from 'react-native';

const Products = ({navigation, route}) => {

    const {store} = route.params;

    return (
        <View><Text>{store}</Text></View>
    )
}

export default Products