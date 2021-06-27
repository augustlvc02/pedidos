import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
Icon, Body,Title,Right, View, List,
ListItem, Spinner } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cabecera from './Cabecera';
import Register_v2 from './Register_v2';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Login from './components/Login';

export default class ListarPedidos extends React.Component {


  constructor(props) {
    super(props);
    
    this.state = {
      titulo: "ListarPedidos",

      isReady: false,

      persona: [
        { descripcion: 'uno', idsangre: '1' },
        { descripcion: 'dos', idsangre: '2' },
        { descripcion: 'tres', idsangre: '3' },
        { descripcion: 'cuatro', idsangre: '4' },
        { descripcion: 'cinco', idsangre: '5' },
        { descripcion: 'seis', idsangre: '6' },
        { descripcion: 'siete', idsangre: '7' },
        { descripcion: 'ocho', idsangre: '8' },
      ] ,

      pedidos: [],
      pedido: {},
      showSpinner: false,
    };
  }
  /*
  App(){
    const [persona, setPersona] = useState([
        { nombre: 'uno', key: '1' },
        { nombre: 'dos', key: '2' },
        { nombre: 'tres', key: '3' },
        { nombre: 'cuatro', key: '4' },
    ]);
  }
  */
  ObtenerPedido = async(pedidoid) =>{
    try{
      const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListPedidoId.php?pedidoid="+pedidoid;
      //const Url = "https://project-code-dev.herokuapp.com/api/v1/pedido";
      const response = await fetch(Url,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      //console.log('OBTENER PED..',data);
      this.setState({ pedido: data, showSpinner: false });
      //, function() {
      console.log('LISTAR',this.state.pedido);
      const pedidonav = this.state.pedido.pedido;
      const detallesnav = this.state.pedido.detalles;
      console.log('PED NAV',pedidonav);
      console.log('DETALLES NAV',detallesnav);
      this.props.navigation.navigate('Register_v2',{
        isEditPedido: true,
        pedido: pedidonav,
        detalles: detallesnav
      });
      //});
    } catch (e) {
      console.log(e);
    }
  }

  ListarPedidos = async() =>{
    this.setState({showSpinner: true});
    try{
      const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListPedido.php";
      //const Url = "https://project-code-dev.herokuapp.com/api/v1/pedido";
      const response = await fetch(Url,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({ pedidos: data, showSpinner: false});
    } catch (e) {
      console.log(e);
    }
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    
    this.setState({ isReady: true });
    this.ListarPedidos();
  }

  EditarPedidoList(item) {
    //this.setState({showSpinner: true});
    //obtener la posicion
    //let position = this.state.pedidos.indexOf(item);
    let pedidoid = item.pedidoid
    console.log('PEDIDO ID:',pedidoid);
    /*
    const detalles = [
      {
        "cantidad": "5",
        "producto": {
          "nombre_producto": "SERVICIO DE VENTA",
          "productoid": 8
        }
      }
    ];
    const pedido = {
      "estado": "P",
      "fecha": "2021-06-24",
      "proveedor":{
        'proveedorid': 2,
        'razon_ruc': "RAMIREZ...."
      },
      "sucursalid_FK": 1,
    };
    */
    this.ObtenerPedido(pedidoid);

  }

  render() {
    //console.log
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const { persona } = this.state;
    //console.log('PERSONA: ',persona)
    //const {data} = this.state;
    //console.log('DATA: ',dataS.sangre);
    return (
      <Container>
        <Cabecera {...this.props} titulo={this.state.titulo}/>
        <Content>
          {this.state.showSpinner ? <Spinner color='blue'/>: null }
          <List>
          { this.state.pedidos.map(item =>(
            <ListItem key={item.pedidoid} onPress={() => this.EditarPedidoList(item)}> 
              <Left>
                <Text>Razon Social: {item.razon_social}</Text>
              </Left>
              <Right>
                <Text>Fecha: {item.fecha}</Text>
              </Right> 
            </ListItem> 
          ))}
          </List>
        </Content>
      </Container>
    ); 
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'grey',
    fontSize: 24
  }
});