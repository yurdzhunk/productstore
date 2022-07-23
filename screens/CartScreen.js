import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import Order from './Order';

const CartScreen = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            cardOverlayEnabled={true}
            screenOptions={{
              headerShown: false,
              cardOverlayEnabled: true
            }}
          >
              <Stack.Screen name="Cart" component={Cart}/>
              <Stack.Screen name="Order" component={Order}/>
          </Stack.Navigator>
    )
}

export default CartScreen