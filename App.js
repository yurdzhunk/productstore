import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './screens/Main';
import Cart from './screens/Cart';
import Sales from './screens/Sales';
import CartScreen from './screens/CartScreen';
import Header from './Components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Entypo, Feather, Octicons, Ionicons } from '@expo/vector-icons';




export default function App() {

  const Tab = createBottomTabNavigator();

  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Main':
        return <Ionicons name="ios-fast-food-outline" size={26} color={color} />
        break;
      case 'CartScreen':
        return <Ionicons name="ios-cart-outline" size={30} color={color} />
        break;
      case 'Sales':
        return <Feather name="percent" size={26} color={color} />
        break;
      default:
        break;
    }

    return <Icon name={iconName} color={color} size={32} />;
  };


  return (
      <Provider store={store}>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Header />
            <Tab.Navigator
                screenOptions={({route}) => ({
                  tabBarIcon: ({color}) => screenOptions(route, color),
                  tabBarHideOnKeyboard: false,
                  tabBarStyle: [{display: 'flex'}],
                  headerShown: false,
                  tabBarShowLabel: false,
                  tabBarActiveTintColor: 'darkgreen',
                  inactiveTintColor: 'lightgray',
                })}
            >
              <Tab.Screen name="Main" component={Main}/>
              <Tab.Screen name="CartScreen" component={CartScreen}/>
              <Tab.Screen name="Sales" component={Sales}/>
            </Tab.Navigator>
          </NavigationContainer>
      </Provider>

  );
}
