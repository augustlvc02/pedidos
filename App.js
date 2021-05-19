import * as React from 'react';
//import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Root} from 'native-base';
import Login from './components/Login';
import Register from './components/Register';
import ListarPedidos from './components/ListarPedidos';
import { Image, Alert } from "react-native";
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
  Icon, Body,Title,Right, View, Label, Picker, List, ListItem,Card,CardItem, Toast} from 'native-base';
import CustomDrawerContent from './components/CustomDrawerContent';
import { useContext } from 'react';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const routes = [
  { titulo:'Register', icono:'add' },
  { titulo:'ListarPedidos', icono:'list' }
];

function App() {
  //const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const setLoggedOut = () => {
    Alert.alert(
      'Salir',
      '¿Desea cerrar sesión?',
      [
        {text: 'Cancelar', onPress: () => {return null}},
        {text: 'Salir', onPress: () => {
          //AsyncStorage.clear();
          //props.navigation.navigate('Login')
          //props.handleClick;
          setLoggedIn(false);
        }},
      ],
      { cancelable: false }
    ) 
    
  };
  return (
    <Root>
      
      {/* <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="ListarPedidos" component={ListarPedidos} />
        <Stack.Screen name="Prueba" component={Prueba} /> 
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator initialRouteName="Register"
          drawerContent={(props) => <CustomDrawerContent {...props} setLoggedOut={ setLoggedOut }/>}>
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="ListarPedidos" component={ListarPedidos}
          initialParams={{ setLoggedIn }}/>
        </Drawer.Navigator>
    
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}
          initialParams={{ setLoggedIn }}/>
        </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
  );
}

export default App;