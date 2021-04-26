import React, {useState} from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
Icon, Body,Title,Right, View, Label, Picker, List, ListItem,Card,CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, StyleSheet, ImageBackground, Modal} from 'react-native';

//import {Picker} from '@react-native-community/picker';
//import {Picker} from '@react-native-picker/picker';
//import { Picker} from 'react-native';
//import { AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
//import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      sucursalid_FK: 0,
      proveedorid_FK: null,
      //fecha: '',
      fecha: '',
      estado:'' ,
      errorMessage: '',
      id: 0,
      apellidoMaterno: '',
      apellidoPaterno: '',
      nombres: '',
      favSport1: null,
      proveedores: [],

      modalVisible: false,
      
      persona: [
        { descripcion: 'uno', idsangre: '1' },
        { descripcion: 'dos', idsangre: '2' },
        { descripcion: 'tres', idsangre: '3' },
      ] ,
    };
  }
  
  ListarProveedor = () =>{
    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListProveedor.php";

    fetch(Url,{
      method:'GET',
      headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    }
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      const data = respuestaJson;
      this.setState({ proveedores: data.proveedor });
      //console.log('DATA:::',this.state.proveedores);
    })
    .catch((error) => {
    console.log(error);
    })
  }

  Register = () =>{
    //alert('HOLA');
    const {sucursalid_FK} = this.state;
    //const {} = this.state;
    const {proveedorid_FK} = this.state;
    const {fecha} = this.state;
    const {estado} = this.state;

    console.log("sucursalid_FK:",sucursalid_FK);
    console.log("proveedorid_FK:",proveedorid_FK);
    console.log("fecha:",fecha);
    console.log("estado:",estado);

    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonInsertPedidoPOST.php";

    fetch(Url,{
     method:'POST',
     headers:{
       'Accept':'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(
      {
        "sucursalid_FK": sucursalid_FK,
        "proveedorid_FK": proveedorid_FK,
        "fecha": fecha,
        "estado": estado
      })
    }).then((respuesta)=> respuesta.text())
    
    .then((respuestaJson) => {
      const data = respuestaJson;
      console.log("data:",data);
      if(data == 'registra')
      {
        Alert.alert("El pedido esta registrado");
      }
      else
      {
        Alert.alert("No registró");
      }
      
      //console.log(respuestaJson);
      //Alert.alert("app",data);
      //guardarlo de forma local el token
      //AsyncStorage.setItem('token','86');
    })
    
    .then ((res) => {
        console.log("RES:",res);
  })
    .catch((error) => {
      console.log("ERROR:",error);
    })
  }

  AgregarDetalle = () => {

  }

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
 }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

    this.ListarProveedor();
    console.log("Proveedor:",this.state.proveedores);
    //console.log("id:", this.state.sucursalid_FK);
  }
  
  // picker proveedores
    proveedoresList = () =>{
      return( 
             this.state.proveedores.map(item =>(

              <Picker.Item label={item.razon_social} key={item.ruc} value={item.proveedorid}  />
            
         )))
  }

  render() {
    
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <Container>
        <Content padder contentContainerStyle={{flex:1}}>
          <Form>
            <Item>
                <Picker
                  mode="dropdown"
                  style={{ height: 50, width: 100 }}
                  selectedValue={this.state.sucursalid_FK}
                  onValueChange={(item, itemvalue) => 
                    this.setState({sucursalid_FK: itemvalue})
                  }>
                  <Picker.Item label="Sucursal 0" value={0} />
                  <Picker.Item label="Sucursal 1" value={1} />
                  <Picker.Item label="Sucursal 2" value={2} />
                  <Picker.Item label="Sucursal 3" value={3} />
                  <Picker.Item label="Sucursal 4" value={4} />
                </Picker>
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                style={{ height: 50, width: 100 }}
                //style={{ marginRight: 80 }}
                selectedValue={this.state.proveedorid_FK}
                onValueChange={ (value) => ( this.setState({proveedorid_FK : value}) )}>
                { this.proveedoresList() }
              </Picker>
            </Item>
            <Item>
              <DatePicker
                style={{width: 200}}
                date={this.state.fecha}
                mode="date"
                placeholder="Seleccionar dia"
                format="YYYY-MM-DD"
                confirmBtnText="Aceptar"
                cancelBtnText="Cancelar"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({fecha: date})}}/>
            </Item>
            <Item>
              <Input placeholder="Estado" onChangeText={estado => this.setState({estado})}/>
            </Item>
            <Button block onPress={this.Register}>
              <Text>Registrar</Text>
            </Button>
            <Button light style = {styles.button} onPress = {() => {this.toggleModal(true)}}>
            <Icon name='add-outline' />
            </Button>


          </Form>
          {/*modal*/}        
          <Modal
            style = {{backgroundColor: 'red'}}
            animationType = {"slide"} 
            transparent = {false}
            visible = {this.state.modalVisible}
            onRequestClose = {() => { console.log("Modal has been closed.") } }> 
            <Form style={styles.modal}>
              <Button style = {styles.button} onPress = {() => { this.toggleModal(!this.state.modalVisible)}}>
                <Icon name='close-outline' />
              </Button>

                <Text>Modal esta abierto!</Text>
             

            </Form>
          </Modal>

          <List>
            { this.state.persona.map(item =>(
                <ListItem key={item.idsangre} > 
                <Left>
                  <Text>Nombre: {item.descripcion}</Text>
                  </Left>
                  <Right>
                  <Text>Id: {item.idsangre}</Text>
                  </Right> 
                  </ListItem >
              
            ))}
          </List>


        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    borderRadius: 15,
    backgroundColor: 'red',
    
  },

  modalBack: {
    flex: 1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },



  button: {
    marginTop: 10,
    alignSelf: 'center',
  },

  


});