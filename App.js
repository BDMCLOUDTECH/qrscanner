import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scan from './src/Scan';
import ScanDetail from './src/ScanDetail';
import ScannerDetails from './src/screens/ScannerDetails';
import Scanner from './src/screens/Scanner';
import LaunchScreen from './src/screens/LaunchScreen';
import CardScanner from './src/screens/CardScanner';
import CardDetails from './src/screens/CardDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        <Stack.Screen name="Scan" component={Scanner} />
        <Stack.Screen name="CardScan" component={CardScanner} />
        <Stack.Screen name="ScanDetail" component={ScannerDetails} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
