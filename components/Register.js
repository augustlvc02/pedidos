import React, {useState} from 'react';

import AppLoading from 'expo-app-loading';
import { Container,Content,Form,Item,Input,Text,Button,
Icon, Body,Right, Picker, List, ListItem,Card,CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Modal} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Cabecera from './Cabecera';
import LookupModal from 'react-native-lookup-modal';
import Toast from 'react-native-toast-message';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "Register",
      isReady: false,
      sucursalid_FK: 0,
      //proveedorid_FK: 0,
      fecha: '',
      estado:'' ,
      errorMessage: '',
      id: 0,
      apellidoMaterno: '',
      apellidoPaterno: '',
      nombres: '',
      
      
      modalVisible: false,
      placeHolderTextProdcuto: "Seleccionar Producto",
      placeHolderTextProveedor: "Seleccionar Proveedor",
      selectedText: "",
      selectedTextProveedor: "",
      isEdit: false,
      position: 0,

      productos: [],
      proveedores: [],

      pedidodetalle: {
        'cantidad': 0,
        producto:{
          'productoid_FK': 0
        }       
      },

      pedidodetalles: [],

      pedido: {
        proveedor:{
          'proveedorid': 0
        }
      },
    };
    this.myRef = React.createRef();
  }

  ListarProveedor = async() =>{
    try{
      const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListProveedor.php";
      const response = await fetch(Url,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({ proveedores: data.proveedor });
    } catch (e) {
      console.log(e);
    }
  }

  ListarProducto = async() =>{
    try{
      const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonListProducto.php";
      const response = await fetch(Url,{
        method:'GET',
        headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({ productos: data.producto });
    } catch (e) {
      console.log(e);
    }
  }

  mostrarToast(mensaje,modal) {
    if(modal)
    {
      this.myRef.current.show({
        text1: mensaje,
        position: 'bottom',
        type: 'error',
        visibilityTime: 500,
      });
    }
    else
    {
      Toast.show({
        text1: mensaje,
        position: 'bottom',
        type: 'error',
        visibilityTime: 500,
      });
    }
  }
  
  GuardarRegistroPedidoDetalle = async() =>{
    const {sucursalid_FK} = this.state;
    const {pedido} = this.state;
    const {fecha} = this.state;
    const {estado} = this.state;
    const {pedidodetalles} = this.state;
    const proveedor = pedido.proveedor;
    //console.log("pedidosdetalles:",pedido);
    console.log("Proveedor:",proveedor.proveedorid);
    /*
    const detalleLenght = this.state.pedidodetalles.length;
    console.log("detalleLenght:",detalleLenght);
    */
    let mensaje = '';
    let seguardo=false;
    const fechaLenght=fecha.length;
    const estadoLenght=estado.length;
    const detalleLenght = pedidodetalles.length;

    if( sucursalid_FK==0 || proveedor.proveedorid==0 || fechaLenght==0 || estadoLenght==0 || detalleLenght==0 ){
      if( detalleLenght==0) mensaje = "Detalle no puede estar vacio";
      else if( sucursalid_FK==0) mensaje = "Sucursal no puede estar vacia";
      else if( proveedor.proveedorid==0) mensaje = "Proveedor no puede estar vacio";
      else if( fechaLenght=='') mensaje = "Fecha no puede estar vacia";
      else if( estadoLenght=='') mensaje = "Estado no puede estar vacio";
      console.log('MENSAJE',mensaje);
      this.mostrarToast(mensaje,false);
    }
    else{
      try{
        /*
        const jason = JSON.stringify({
            "sucursalid_FK": sucursalid_FK,
            "proveedorid_FK": proveedor.proveedorid,
            "fecha": fecha,
            "estado": estado,
            "detalles": pedidodetalles
        });
        console.log(jason);
        */
        //const Url = "https://tesisanemia.000webhostapp.com/TesisAnemia2/JSonInsertProductoPOST.php";
        const Url = "https://project-code-dev.herokuapp.com/api/v1/pedido";
        const response = await fetch(Url,{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "sucursalid_FK": sucursalid_FK,
            "proveedorid_FK": proveedor.proveedorid,
            "fecha": fecha,
            "estado": estado,
            "detalles": pedidodetalles
          })
        });
        const data = await response.json();
        console.log(data);
        if(data.message){
          mensaje = data.message;
        }else{
          mensaje = 'No registró';
        }
      } catch (e) {
        console.log(e);
        mensaje = "Error:".e;
      }
    }
    //console.log('MENSAJE:',mensaje);
    //this.mostrarToast(mensaje);
    if(seguardo){
    }
  }

  GuardarDetallePedido = () =>{
    const {pedidodetalles} = this.state;
    const {pedidodetalle} = this.state;
    //const {producto} = this.state.pedidodetalle;
    const {isEdit} = this.state;
    const {position} = this.state;
    const producto = pedidodetalle.producto;

    //console.log('PED. DETALLES:',pedidodetalles);
    console.log('PED. DETALLE:',pedidodetalle);
    //console.log('PRODUCTO:',producto);

    const cantidadLenght = pedidodetalle.cantidad.length;
    let mensaje = '';
    let repetido = false;
    let repetidoValid = false;
    
    // si es editar y el pedidodetalle a editar se mantiene no validar repetido dentro de lista
    if(isEdit && pedidodetalles[position].producto.productoid_FK == producto.productoid_FK) repetidoValid=true;

    // si la validacion es false consideran elementos de la lista
    if(!repetidoValid){
      //console.log('entro aqui');
      for (const peddet in pedidodetalles) {
        // si el producto se encuentra ya registrado manda repetido
        if(pedidodetalles[peddet].producto.productoid_FK == producto.productoid_FK) repetido=true;
      }
    }

    if( producto.productoid_FK==0 || pedidodetalle.cantidad==0 || cantidadLenght==0 || repetido)
    {
      if(producto.productoid_FK==0) mensaje='Producto no puede estar vacio';
      else if(pedidodetalle.cantidad==0 || cantidadLenght==0) mensaje='Cantidad no puede estar vacia o igual a 0';
      else if(repetido) mensaje='Producto ya se encuentra agregado en el detalle';
      this.mostrarToast(mensaje,true);
    }
    else
    {
      if(isEdit){
        console.log("edito");
        //guardar el pedidodetalle en la posicion
        this.state.pedidodetalles[position] = pedidodetalle;
      }
      else{
        console.log("agrego");
        //agregar pedido detalle en arreglo
        this.state.pedidodetalles.push(pedidodetalle);
      }
      //cierra el modal
      this.toggleModal(!this.state.modalVisible);
    }
  }

  toggleModal(visible) {
    //carge los productos
    this.ListarProducto();
    this.setState({ modalVisible: visible,
                    isEdit: false,
                    position: 0,
                    pedidodetalle: {
                      'cantidad': 0,
                      producto:{
                        'productoid_FK': 0
                      }       
                    },
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    this.ListarProveedor();
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
            <Picker.Item label={item.nombre_producto} key={item.productoid_FK} value={item.productoid_FK}  />
       )))
  }

  EditarProductoList(item) {
    //obtener la posicion
    let position = this.state.pedidodetalles.indexOf(item);
    //console.log("click");
    //abri el modal
    this.toggleModal(!this.state.modalVisible);
    //console.log("item:",item);
    //setear el objeto
    this.setState({
      isEdit: true,
      position: position,
      pedidodetalle: {
        'cantidad': item.cantidad,
        producto:{
          'name': item.producto.nombre_producto,
          'nombre_producto': item.producto.nombre_producto,
          'productoid_FK': item.producto.productoid_FK
        }
      }
    }); 

  }

  EliminarProductoList(item) {

    Alert.alert(
      'Salir',
      '¿Desea eliminar detalle?',
      [
        {text: 'Cancelar', onPress: () => {return null}},
        {text: 'Eliminar', onPress: () => {
          //obtener la posicion
          let pedidodetallenuevo = this.state.pedidodetalles;
          let position = this.state.pedidodetalles.indexOf(item);
          this.state.pedidodetalles.splice(position,1);
          this.setState({pedidodetalles: pedidodetallenuevo});    
        }},
      ],
      { cancelable: false }
    )

  }
  render() { 
    
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <Container>
        <Cabecera {...this.props} titulo={this.state.titulo}/>
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
              <LookupModal
                  selectButtonTextStyle={
                    {
                      fontSize: 15,
                      flex:1,
                      textAlign: 'left'
                    }
                  }
                  selectButtonStyle={
                    {
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      flexDirection: 'row' 
                    }
                  }
                  itemTextStyle={{ fontSize: 15}}
                  data={this.state.proveedores}
                  value={this.state.pedido.proveedor}
                  selectText={this.state.placeHolderTextProveedor}
                  placeholder={"Buscar"}
                  onSelect={ (item) => ( this.setState({
                    pedido: {
                      ...this.state.pedido,
                      proveedor: item
                    }
                  }) )}
                  displayKey={"name"}
              />
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
                }}
                onDateChange={(date) => {this.setState({fecha: date})}}/>
            </Item>
            <Item>
              <Input placeholder="Estado" onChangeText={estado => this.setState({estado})}/>
            </Item>
            <Button primary style = {styles.buttonTop} onPress = {() => {this.toggleModal(true)}}>
              <Icon name='add-outline' />
            </Button>
          </Form>      
          <Modal
            animationType = {"slide"}
            transparent={true}
            visible = {this.state.modalVisible}
            onRequestClose = {() => { console.log("Modal has been closed.") } }> 
            <Form style= {styles.modal}>
              <Card style= {styles.modal2}>
                <CardItem >
                  <Form>
                    <Button style = {styles.buttonBot} onPress = {() => { this.toggleModal(!this.state.modalVisible)}}>
                      <Icon name='md-arrow-undo' />
                    </Button>
                      <Item>
                      <LookupModal
                        selectButtonTextStyle={
                          {
                            fontSize: 15,
                            flex:1,
                            textAlign: 'left'
                          }
                        }
                        selectButtonStyle={
                          {
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            flexDirection: 'row' 
                          }
                        }
                        itemTextStyle={{ fontSize: 15}}
                        data={this.state.productos}
                        value={this.state.pedidodetalle.producto}
                        selectText={this.state.placeHolderTextProdcuto}
                        placeholder={"Buscar"}
                        onSelect={ (item) => this.setState({
                          pedidodetalle: {
                            ...this.state.pedidodetalle,
                            producto: item
                          }
                        })}
                        displayKey={"name"}
                      />
                      </Item>
                      <Item>
                        <Input
                        value={this.state.pedidodetalle.cantidad}
                        placeholder="Cantidad" keyboardType="number-pad"
                        onChangeText={ (item) => this.setState({
                          pedidodetalle: {
                            ...this.state.pedidodetalle,
                            cantidad: item
                          }
                        }) }/>
                      </Item>
                    <Button block onPress={this.GuardarDetallePedido}>
                    { !this.state.isEdit ?
                      <Text>Agregar</Text>
                      :
                      <Text>Editar</Text>
                    }
                    </Button>
                  </Form>
                </CardItem>
              </Card>
            </Form>
            <Toast ref={this.myRef} />
          </Modal>
          <Content>
          <List>
            { this.state.pedidodetalles.map(item =>(
            <ListItem key={item.producto.productoid_FK} onPress={() => this.EditarProductoList(item)}> 
              <Body>
                <Text>Nombre: {item.producto.nombre_producto}</Text>
                <Text note >Cantidad: {item.cantidad}</Text>
                <Text note>Id: {item.producto.productoid_FK}</Text>
              </Body>
              <Right>
                <Button transparent style = {styles.buttonRight} onPress={() => this.EliminarProductoList(item)}>
                  <Icon style={{ color: "black" }} name='md-trash-sharp' />
                </Button>
              </Right> 
            </ListItem>        
            ))}
          </List>
          </Content >
          <Button block onPress={this.GuardarRegistroPedidoDetalle}>
              <Text>Registrar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    //
    //backgroundColor: 'blue',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modal2:{
    //marginBottom: 100,
    bottom: 50,
    //padding: 20,
    //backgroundColor: 'red',
    //margin: 20 
  },

  modalBack: {
    flex: 1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonTop: {
    marginTop: 10,
    alignSelf: 'center'
  },

  buttonRight: {
    //alignSelf: 'flex-end',
    //position: 'absolute',
  },

  buttonBot: {
    marginBottom: 10,
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