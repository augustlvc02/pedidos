import React from 'react';
import AppLoading from 'expo-app-loading';
import { Container,Content,Form,Item,Input,Text,Button,
  //Toast,
  Spinner,Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
//import { AsyncStorage } from 'react-native';
import Toast from 'react-native-toast-message';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      username:'',
      password:'' ,
      showSpinner: false,
      showPass: false,
    };
    //this.loginClick = this.loginClick.bind(this);
  }
  //const [hidePass, setHidePass] = useState(true);

  mostrarToast(mensaje) {
    //oculta spinner y muestra toast
    /*
    this.setState({showSpinner: false});
    Toast.show({
      text: mensaje,
      buttonText: "Ok",
      duration: 3000
    });
    */
    this.setState({showSpinner: false});
    Toast.show({
      text1: mensaje,
      position: 'bottom',
      type: 'error',
      visibilityTime: 500,
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
    const {username} = this.state;
    const {password} = this.state;
    let mensaje = '';
    let selogeo=false;
    let usuario=null;
    const usernameLenght=username.length;
    const passwordLenght=password.length;
    //const errorMessage = this.state;
    if( usernameLenght==0 || passwordLenght==0 ){
      if( usernameLenght==0 && passwordLenght==0) mensaje = "Usuario y Password no pueden estar vacios";
      else if( username.length==0) mensaje = "Usuario no puede estar vacio";
      else if( passwordLenght==0) mensaje = "Password no puede estar vacio";
    }
    else{
      // consulta al API
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
        // const usuario = await response.json();
        usuario = await response.json();
        console.log(usuario);
        const exist = !usuario.message ? true : false;
        
        if(exist){
          const { apellido_materno, apellido_paterno, nombres, tipousuario } = usuario;
          if(tipousuario==='A'){
            selogeo=true;
            mensaje = "Bienvenido "+nombres+" "+apellido_paterno+" "+apellido_materno;
          } else mensaje = "No es administrador";
        } else mensaje = "Usuario o Password invalidos";
      } catch (e) {
        console.log(e);
        mensaje = "Error:".e;
      }
      // termina consulta
      this.setState({username:"", password:""});
    }
    // muestra el toast
    this.mostrarToast(mensaje);
    // guarda el usuario y state
    if(selogeo){
      this.props.route.params.guardarUsuario(usuario);
      this.props.route.params.setLoggedIn(true);
    }
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
              <Icon active name='person-outline' />
              <Input value={ this.state.username} placeholder="Username" onChangeText={username => this.setState({username})}/>
            </Item>
            <Item last>
              <Icon active name='lock-closed-outline'/>
              <Input value={ this.state.password} placeholder="Password"
                secureTextEntry={this.state.showPass ? false : true}
                onChangeText={password => this.setState({password})}/>
              <Icon 
                active name={this.state.showPass ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => this.setState({ showPass: !this.state.showPass })}
              />
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
