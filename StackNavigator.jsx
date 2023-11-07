import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screen/HomeScreen'
import PickUpScreen from './screen/PickUpScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import OrderScreen from './screen/OrderScreen'

export default function Navigator () {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* LOGIN SCREEN! */}
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* REGISTER  SCREEN! */}
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* HOME SCREEN! */}
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* PICK UP SCREEN! */}
        <Stack.Screen
          name='PickUp'
          component={PickUpScreen}
          options={{ headerShown: false }}
        />
        {/* CART SCREEN! */}
        <Stack.Screen
          name='Cart'
          component={CartScreen}
          options={{ headerShown: false }}
        />
        {/* PROFILE! */}
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        {/* ORDER SCREEN! */}
        <Stack.Screen
          name='Order'
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
