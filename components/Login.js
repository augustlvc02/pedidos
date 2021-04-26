import React from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,
      Left,Button,Icon, Body,Title,Right, View } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, ImageBackground } from 'react-native';
//import { AsyncStorage } from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      username:'',
      password:'' ,
      errorMessage: '',
      id: 0,
      apellidoMaterno: '',
      apellidoPaterno: '',
      nombres: ''
    };
  }

  Login = () =>{
    //alert('HOLA');
    const {username} = this.state;
    const {password} = this.state;
    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonLogin.php?username="
                +username+"&password="+password;

    fetch(Url,{
     method:'GET',
     headers:{
       'Accept':'application/json',
       'Content-Type': 'application/json'
     }
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      const data = respuestaJson;
      const exist = data.usuario ? true : false;
      console.log("Data", data.usuario);
      console.log("existe", exist);
      if(exist){
        const { idfamiliar, apellido_materno, apellido_paterno, nombres, tipousuario } = data.usuario[0]
        if(tipousuario==='A'){
          this.setState({errorMessage:"Bienvenido "+nombres+" "+apellido_paterno+" "+apellido_materno})
          this.props.navigation.navigate('ListarPedidos');
        } else{
          console.log("me");
          this.setState({errorMessage:"No es administrador"})
          this.setState({username:"", password:""});
          
        }
      } else {
        this.setState({errorMessage: "Datos incorrectos"})
        this.setState({username:"", password:""});
      }
      Alert.alert("app",this.state.errorMessage);
      //guardarlo de forma local el token
      //AsyncStorage.setItem('token','86');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <Container >
        <Content padder contentContainerStyle={{flex:1,justifyContent: 'center'}}>
          <Form>
            <Item>
              <Input placeholder="Username" onChangeText={username => this.setState({username})}/>
            </Item>
            <Item last>
              <Input placeholder="Password" onChangeText={password => this.setState({password})}/>
            </Item>
            <Button block onPress={this.Login}>
              <Text>Login</Text>
            </Button>

            <Button block warning  onPress={() => this.props.navigation.navigate('ListarPedidos')}>
              <Text>ListarPedidos</Text>
            </Button>
            <Button block danger  onPress={() => this.props.navigation.navigate('Register')}>
              <Text>Registro</Text>
            </Button>

          </Form>
        </Content>
        
      </Container>
    );
  }
}
