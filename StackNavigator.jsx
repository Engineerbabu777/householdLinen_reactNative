import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screen/HomeScreen'
import PickUpScreen from './screen/PickUpScreen'
import CartScreen from './screen/CartScreen'

export default function Navigator () {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
