import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Stores from './Stores';
import Products from './Products';

const Main = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            cardOverlayEnabled={true}
            screenOptions={{
              headerShown: false,
              cardOverlayEnabled: true
            }}
          >
              <Stack.Screen name="Stores" component={Stores}/>
              <Stack.Screen name="Products" component={Products}/>
          </Stack.Navigator>
    )
}

export default Main