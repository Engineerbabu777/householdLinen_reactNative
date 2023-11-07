import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import HomeScreen from './screen/HomeScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store from './store'
import Navigator from './StackNavigator'
export default function App () {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  )
}
