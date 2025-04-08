import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import Cart from '../screens/Cart/Cart';
import CheckOut from '../screens/CheckOut/CheckOut';
import {useSelector} from 'react-redux';
import BottomTabs from './BottomTabNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const token = useSelector((state: any) => state?.auth?.loginToken);

  console.log(token,"toooooooooooooook")

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={CheckOut} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
