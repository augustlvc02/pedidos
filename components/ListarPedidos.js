import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
Icon, Body,Title,Right, View, List,
ListItem } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, ScrollView} from 'react-native'

export default class ListarPedidos extends React.Component {


  constructor(props) {
    super(props);
    this.ListarPedidos();
    this.state = {
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

  ListarPedidos = () =>{
    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListPedido.php";

    fetch(Url,{
      method:'GET',
      headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    }
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      const data = respuestaJson;
      this.setState({ pedidos: data.pedido });
      //console.log('DATA:::',dataS);
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
    //console.log
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const { persona } = this.state;
    console.log('PERSONA: ',persona)
    //const {data} = this.state;
    //console.log('DATA: ',dataS.sangre);
    return (
      
      <Container>
        <Content>
        
        <List>
        { this.state.pedidos.map(item =>(
             <ListItem key={item.pedidoid} > 
             <Left>
               <Text>Razon Social: {item.razon_social}</Text>
              </Left>
              <Right>
               <Text>Fecha: {item.fecha}</Text>
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