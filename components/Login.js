import React from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,
      Left,Button,Icon, Body,Title,Right, View, Toast, Spinner} from 'native-base';
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
  

  //Login = () =>{
loginClick = () => { 
  //muestra spinner
  this.setState({showSpinner: true});
  
    //alert('HOLA');
    const {username} = this.state;
    const {password} = this.state;
    //const errorMessage = this.state;
    
  if( username=='' || password=='' ){

    //console.log("NO VALIDO -> USER:",username,'-PSWD:',password);
    //this.setState({conErrores: true});
    if( username =='' &&  password ==''){
      this.setState({errorMessage: "Usuario y Password no pueden estar vacios"}, function () {
        this.mostrarToast();
    }); 
    }
    else if( username ==''){
      this.setState({errorMessage: "Usuario no puede estar vacio"}, function () {
        this.mostrarToast();
    }); 
    }
    else if( password ==''){
      this.setState({errorMessage: "Password no puede estar vacio"}, function () {
        this.mostrarToast();
    }); 
    }
  }
  else{
    //this.setState({conErrores: false});
    console.log("VALIDO -> USER:",username,'-PSWD:',password);


      //const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonLogin.php?username="
      //            +username+"&password="+password;
      const Url = "https://project-code-dev.herokuapp.com/api/v1/usuario";
  /*
      fetch(Url,{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
      }
  */

  fetch(Url,{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    {
      "username": username,
      "password": password
    }
  )
      }).then((respuesta)=> respuesta.json())
      .then((respuestaJson) => {
        const data = respuestaJson;
        console.log("username:",username,", password:",password);
        console.log("DTA",data);
        //const exist = data.usuario ? true : false;
    
        const exist = !data.message ? true : false;
        console.log("Data", data.usuario);
        console.log("existe", exist);
        if(exist){
          //const { idfamiliar, apellido_materno, apellido_paterno, nombres, tipousuario } = data.usuario[0]
          const { apellido_materno, apellido_paterno, nombres, tipousuario } = data;
          if(tipousuario==='A'){
            
            
            this.setState({errorMessage:"Bienvenido "+nombres+" "+apellido_paterno+" "+apellido_materno}, function () {
              this.mostrarToast();
              this.props.navigation.navigate('ListarPedidos');  
          });
          
            
          } else{
            //console.log("me");
            //this.setState({conErrores: true});
            this.setState({errorMessage:"No es administrador"}, function () {
              this.mostrarToast();
          });
            this.setState({username:"", password:""});
            
          }
        } else {
          //this.setState({conErrores: true});
          this.setState({errorMessage: "Datos incorrectos"}, function () {
            this.mostrarToast();
        });
          this.setState({username:"", password:""});
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }
  //console.log("ERROR:",this.state.errorMessage); 

  }

  mostrarToast() {
    //oculta spinner y muestra toast
    this.setState({showSpinner: false});
    Toast.show({
      text: this.state.errorMessage,
      buttonText: "Ok",
      duration: 3000
    });
    
    
    //console.log('DATO:',this.state.errorMessage);
    //Do your action
 }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
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

            <Button block warning  onPress={() => this.props.navigation.navigate('ListarPedidos')}>
              <Text>ListarPedidos</Text>
            </Button>
            <Button block danger  onPress={() => this.props.navigation.navigate('Register')}>
              <Text>Registro</Text>
            </Button>
            {this.state.selogeo ? <Spinner/>: null }
            
            
          </Form>
        </Content>
        
      </Container>
    );
  }
}
