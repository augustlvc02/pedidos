import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root} from 'native-base';
import Login from './components/Login';
import Register from './components/Register';
import ListarPedidos from './components/ListarPedidos';
import Prueba from './components/Prueba';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator>
        
        <Stack.Screen name="Register" component={Register} />

        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        
        <Stack.Screen name="ListarPedidos" component={ListarPedidos} />

        <Stack.Screen name="Prueba" component={Prueba} /> 
          
        
          
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;