import React, {useState} from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
Icon, Body,Title,Right, View, Label, Picker, List, ListItem,Card,CardItem, Toast} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, StyleSheet, ImageBackground, Modal} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPicker from 'rn-modal-picker';

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
      proveedores: [],
      productos: [],
      modalVisible: false,
      productoid: null,
      cantidad: 0,
      placeHolderText: "Please Select Country",
      selectedText: "",
      pedidodetalle: [
        /*
        {
          pedido_detalleid: 0,
          pedidoid_FK: 0,
          productoid_FK: 0,
          cantidad: 0
        }
        */
      ],

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

  ListarProducto = () =>{
    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListProducto.php";

    fetch(Url,{
      method:'GET',
      headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    }
    }).then((respuesta)=> respuesta.json())
    .then((respuestaJson) => {
      const data = respuestaJson;
      this.setState({ productos: data.producto });
      console.log('DATA:::',this.state.productos);
    })
    .catch((error) => {
    console.log(error);
    })
  }
  
  GuardarRegistroPedido = () =>{
    const {productoid} = this.state;
    const {cantidad} = this.state;
    console.log("productoid:",productoid);

    const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonInsertProductoPOST.php";

    fetch(Url,{
     method:'POST',
     headers:{
       'Accept':'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(
      {
        "productoid": productoid,
        "cantidad": cantidad
      })
    }).then((respuesta)=> respuesta.text())
    
    .then((respuestaJson) => {
      const data = respuestaJson;
      console.log("data:",data);
      if(data == 'registra')
      {
        //Alert.alert("El pedido esta registrado");
        this.setState({errorMessage: 'El pedido esta registrado'});
      }
      else
      {
        //Alert.alert("No registró");
        this.setState({errorMessage: 'No registró'});
      }
      Toast.show({
        text: this.state.errorMessage,
        buttonText: "Ok",
        duration: 3000
      });
    })
    
    .then ((res) => {
        console.log("RES:",res);
    })
    .catch((error) => {
      console.log("ERROR:",error);
    })
    

  }

  Prueba = () =>{
    const {productoid} = this.state;
    const {cantidad} = this.state;
    const {selectedText} = this.state;
    console.log("productoid:",productoid);
    /*
    this.setState({
      pedidodetalles: [
       ...this.state.pedidodetalles,
        {
          pedido_detalleid: 0,
          pedidoid_FK: 0,
          productoid_FK: productoid,
          cantidad: cantidad
        }
      ]
    })
    */
    console.log("pedidosantes:",this.state.pedidodetalle);
    const producto = {
      'nombre_producto': selectedText,
      'productoid_FK': productoid,
      'cantidad': cantidad
    };
    this.state.pedidodetalle.push(producto);
    console.log("pedidos:",this.state.pedidodetalle);
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
        //Alert.alert("El pedido esta registrado");
        this.setState({errorMessage: 'El pedido esta registrado'});
      }
      else
      {
        //Alert.alert("No registró");
        this.setState({errorMessage: 'No registró'});
      }
      Toast.show({
        text: this.state.errorMessage,
        buttonText: "Ok",
        duration: 3000
      });
      
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
    this.ListarProducto();
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

  productosList = () =>{
    return( 
           this.state.productos.map(item =>(
            <Picker.Item label={item.nombre_producto} key={item.productoid} value={item.productoid}  />
       )))
  }

  /*
  _selectedValue(index, item) {
    this.setState({ selectedText: item.nombre_producto});
  }
  */


  _selectedValue(index, item) {
    this.setState({ selectedText: item.nombre_producto, productoid: item.productoid });
    //console.log("seleccionado:",productoid);
   // console.log("id:",this.state.productoid);
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
              <Item>

              <RNPicker
                dataSource={this.state.productos}
                dummyDataSource={this.state.productos}
                defaultValue={false}
                pickerTitle={"Seleccionar Producto"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Buscar....."}
                showPickerTitle={true}
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedText}
                placeHolderLabel={this.state.placeHolderText}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                //dropDownImage={require("./res/ic_drop_down.png")}
                selectedValue={(index, item) => this._selectedValue(index, item)}
              />


               {/* <RNPicker
                  dataSource={this.state.dataSource}
                  dummyDataSource={this.state.dataSource}
                  defaultValue={false}
                  pickerTitle={"Country Picker"}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Search....."}
                  showPickerTitle={true}
                  searchBarContainerStyle={this.props.searchBarContainerStyle}
                  pickerStyle={styles.pickerStyle}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  pickerItemTextStyle={styles.listTextViewStyle}
                  selectedLabel={this.state.selectedText}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={styles.selectLabelTextStyle}
                  placeHolderTextStyle={styles.placeHolderTextStyle}
                  dropDownImageStyle={styles.dropDownImageStyle}
                  //dropDownImage={require("./res/ic_drop_down.png")}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />  */}



                {/* <Picker
                  mode="dropdown"
                  style={{ height: 50, width: 100 }}
                  //style={{ marginRight: 80 }}
                  selectedValue={this.state.productoid}
                  onValueChange={ (value) => ( this.setState({productoid : value}) )}>
                  { this.productosList() }
                </Picker> */}

                
              </Item>
              
              <Item>
                <Input placeholder="Cantidad" keyboardType="number-pad" onChangeText={cantidad => this.setState({cantidad})}/>
              </Item>   

              <Button block onPress={this.Prueba}>
              <Text>Registrar</Text>
            </Button>
             

            </Form>
          </Modal>

          <List>
            { this.state.pedidodetalle.map(item =>(
                <ListItem key={item.productoid_FK} > 
                <Left>
                  <Text>Nombre: {item.nombre_producto}</Text>
                  <Text>Cantidad: {item.cantidad}</Text>
                  </Left>
                  <Right>
                  <Text>Id: {item.productoid_FK}</Text>
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

  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },

  //prueba

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 18,
    elevation:3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }


});