import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scan from './src/Scan';
import ScanDetail from './src/ScanDetail';
import ScannerDetails from './src/screens/ScannerDetails';
import Scanner from './src/screens/Scanner';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Scan" component={Scanner} />
        <Stack.Screen name="ScanDetail" component={ScannerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
