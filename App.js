import * as React from 'react';
import {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Root} from 'native-base';
import Login from './components/Login';
import Register from './components/Register';
import ListarPedidos from './components/ListarPedidos';
import { Alert } from "react-native";
import CustomDrawerContent from './components/CustomDrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // incia en false logeado
  const [loggedIn, setLoggedIn] = useState(false);
  // obtiene el usuario
  const obtenerUsuario = async() => {
    try{
      const usuario = await AsyncStorage.getItem('sesion_usuario');
      usuario !== null ? setLoggedIn(true) : setLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  }
  const limpiarUsuario = async() => {
    try{
      await AsyncStorage.removeItem('sesion_usuario');
    } catch (e) {
      console.log(e);
    }
  }
  const guardarUsuario = async(usuario) => {
    try{
      await AsyncStorage.setItem('sesion_usuario', JSON.stringify(usuario));
    } catch (e) {
      console.log(e);
    }
  }

  obtenerUsuario();
  /*
  obtenerSoloUsuario().then((value) => 
    {
      const user = value;
      console.log('us:',user)
    }
  )
  */
  

  const setLoggedOut = () => {
    Alert.alert(
      'Salir',
      '¿Desea cerrar sesión?',
      [
        {text: 'Cancelar', onPress: () => {return null}},
        {text: 'Salir', onPress: () => {
          limpiarUsuario();
          setLoggedIn(false);
        }},
      ],
      { cancelable: false }
    )
  };
  return (
    <Root>
      <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator
          initialRouteName="Register"
          drawerContent={(props) => <CustomDrawerContent {...props} setLoggedOut={ setLoggedOut }/>}>
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="ListarPedidos" component={ListarPedidos}
          // initialParams={{ setLoggedIn, obtenerSoloUsuario }}
          />
        </Drawer.Navigator>
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}
          initialParams={{ setLoggedIn, guardarUsuario }}/>
        </Stack.Navigator>
        )}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Root>
  );
}