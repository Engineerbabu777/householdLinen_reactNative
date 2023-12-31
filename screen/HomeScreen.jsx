import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Alert,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import ImageCrousel from '../components/Crousel'
import Services from '../components/Services'
import DressItem from '../components/DressItem'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../ProductReducer'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen () {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'loading your location'
  )
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const cart = useSelector(state => state.cart.cart)
  const product = useSelector(state => state.product.product)
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0)
  const navigation = useNavigation()

  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'shirt',
      quantity: 0,
      price: 10
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'dresses',
      quantity: 0,
      price: 10
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'jeans',
      quantity: 0,
      price: 10
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'Sweater',
      quantity: 0,
      price: 10
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'shorts',
      quantity: 0,
      price: 10
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'Sleeveless',
      quantity: 0,
      price: 10
    }
  ]

  // FUNCTION TO OPEN THE LOCATION OF USER PHONE!
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync()
    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable the location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    } else {
      setLocationServicesEnabled(enabled)
    }
  }
  // GET THE LOCATION OF USER!
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'allow the app to use the location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    }

    const { coords } = await Location.getCurrentPositionAsync()
    console.log('CORDS', coords)
    if (coords) {
      const { latitude, longitude } = coords

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })

      console.log('RESPONSE!', response)

      for (let item of response) {
        let address = `${item.street}, ${item.city}, ${item.region}.`
        setDisplayCurrentAddress(address)
      }
    }
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (product.length > 0) return

    const fetchProducts = async () => {
      //   const colRef = collection(db,"types");
      //   const docsSnap = await getDocs(colRef);
      //   docsSnap.forEach((doc) => {
      //     items.push(doc.data());
      //   });
      services?.map(service => dispatch(getProducts(service)))
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    // CHECK IF LOCATION IS ENABLE OR NOT !!
    checkIfLocationEnabled()
    getCurrentLocation()
  }, [])
  return (
    <>
      <ScrollView
        style={{ backgroundColor: '#F0F0F0', flex: 1, marginTop: '50' }}
      >
        {/* LOCATION AND PROFILE! */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          <MaterialIcons name='location-on' size={30} color='#fd5c63' />

          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          {/* LOGIN BUTTONS!! */}
          <Pressable
            onPress={() => {navigation.navigate('Profile')}}
            style={{ marginLeft: 'auto', marginRight: 7 }}
          >
            <Image
              style={{ height: 35, width: 35, borderRadius: 20 }}
              source={{
                uri: 'https://lh3.googleusercontent.com/ogw/AKPQZvwJknkuqx4vKMGDmuyFG0j6aw7IPf4OjtduOhg=s32-c-mo'
              }}
            />
          </Pressable>
        </View>

        {/* SEARCH BAR! */}
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.8,
            borderColor: '#C0C0C0',
            borderRadius: 7
          }}
        >
          <TextInput placeholder='Search for item or more' />
          <Feather name='search' size={24} color='#fd5c63' />
        </View>

        {/* IMAGE SLIDER! */}
        <ImageCrousel />

        {/* SERVICES COMPONENT! */}
        <Services />

        {/* RENDER ALL THE SERVICES BY NAME AND CAL!! */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {/* TO PROCEEDED ON THE PAYMENT SCREEN! */}
      {!total ? null : (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                marginVertical: 6
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate('PickUp')}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  )
}
