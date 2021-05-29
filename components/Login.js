import React from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,
      Left,Button,Icon, Body,Title,Right, View, Toast, Spinner} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      username:'',
      password:'' ,
      errorMessage: '',
      //mensaje: '',
      id: 0,
      apellidoMaterno: '',
      apellidoPaterno: '',
      nombres: '',
      showToast: false,
      showSpinner: false,
    };
    //this.loginClick = this.loginClick.bind(this);
  }
  
  mostrarToast(message) {
    //oculta spinner y muestra toast
    this.setState({showSpinner: false});
    Toast.show({
      //text: this.state.errorMessage,
      text: message,
      buttonText: "Ok",
      duration: 3000
    });
  }
  /*
  guardarUsuario = async(usuario) => {
    try{
      await AsyncStorage.setItem('sesion_usuario', JSON.stringify(usuario));
    } catch (e) {
    // saving error
    }
  }
  */

  //Login = () =>{
  loginClick = async() => { 
    //muestra spinner
    this.setState({showSpinner: true});
    //alert('HOLA');
    const {username} = this.state;
    const {password} = this.state;
    let mensaje = '';
    let selogeo=false;
    //const errorMessage = this.state;
    if( username=='' || password=='' ){
      if( username =='' &&  password ==''){
        mensaje = "Usuario y Password no pueden estar vacios";
      }
      else if( username ==''){
        mensaje = "Usuario no puede estar vacio";
      }
      else if( password ==''){ 
        mensaje = "Password no puede estar vacio";
      }
    }
    else{
      try{
      console.log('AQUI');
      const Url = "https://project-code-dev.herokuapp.com/api/v1/usuario";
      const response = await fetch(Url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const usuario = await response.json();
      console.log(usuario);
      const exist = !usuario.message ? true : false;
      
      if(exist){
        //console.log("username:",username,", password:",password);
        //const { idfamiliar, apellido_materno, apellido_paterno, nombres, tipousuario } = data.usuario[0]
        const { apellido_materno, apellido_paterno, nombres, tipousuario } = usuario;
        if(tipousuario==='A'){
          selogeo=true;
          mensaje = "Bienvenido "+nombres+" "+apellido_paterno+" "+apellido_materno;
          this.setState({errorMessage:mensaje}, function () {
            this.mostrarToast(this.state.errorMessage);
            this.props.route.params.guardarUsuario(usuario);
            this.props.route.params.setLoggedIn(true);
          });
        } else{
          mensaje = "No es administrador";
        }
      } else {
        mensaje = "Usuario o Password invalidos";
      }
    } catch (e) {
      // saving error
      console.log(e);
      mensaje = "Error:".e;
    }
    this.setState({username:"", password:""});
    
      /*
      .then((respuesta)=> respuesta.json())
      .then((respuestaJson) => {
        const data = respuestaJson;
        //console.log("mensaje:",data.message);
        const exist = !data.message ? true : false;
        //console.log("existe", exist);
        if(exist){
          console.log("username:",username,", password:",password);
          //const { idfamiliar, apellido_materno, apellido_paterno, nombres, tipousuario } = data.usuario[0]
          const { apellido_materno, apellido_paterno, nombres, tipousuario } = data;
          if(tipousuario==='A'){
            this.setState({errorMessage:"Bienvenido "+nombres+" "+apellido_paterno+" "+apellido_materno}, function () {
              this.mostrarToast();
              //AsyncStorage.setItem('sesion_usuario', JSON.stringify(data));
              this.guardarUsuario(data);
              this.props.route.params.setLoggedIn(true);
              //this.props.navigation.navigate('ListarPedidos');
            });
          } else{
            this.setState({errorMessage:"No es administrador"}, function () {
              this.mostrarToast();
            });
            this.setState({username:"", password:""});
          }
        } else {
          this.setState({errorMessage: "Datos incorrectos"}, function () {
            this.mostrarToast();
          });
          this.setState({username:"", password:""});
        }
      })
      .catch((error) => {
        console.log(error);
      })
      */
    }


    if(!selogeo){
      this.setState({errorMessage:mensaje}, function () {
        this.mostrarToast(this.state.errorMessage);
      });
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    /*
    AsyncStorage.getItem('sesion_usuario')
    .then((res) => {
      console.log({INICIO: JSON.parse(res)})
    })
    
    const selogeo = AsyncStorage.getItem('sesion_usuario');
    if(selogeo !== null) {
      console.log({LOGIN: JSON.parse(selogeo)})
      // value previously stored
    }
    */
    //this.setState({selogeo: false});
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
              <Input value={ this.state.username} placeholder="Username" onChangeText={username => this.setState({username})}/>
            </Item>
            <Item last>
              <Input value={ this.state.password} placeholder="Password" secureTextEntry={true} onChangeText={password => this.setState({password})}/>
            </Item>
            <Button block onPress={this.loginClick}>
              <Text>Login</Text>
            </Button>
            {this.state.showSpinner ? <Spinner color='blue'/>: null }
            
            
          </Form>
        </Content>
        
      </Container>
    );
  }
}
