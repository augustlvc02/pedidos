import * as React from 'react';
//import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Root} from 'native-base';
import Login from './components/Login';
import Register from './components/Register';
import ListarPedidos from './components/ListarPedidos';
import { Image } from "react-native";
import { Container,Header,Content,Form,Item,Input,Text,Left,Button,
  Icon, Body,Title,Right, View, Label, Picker, List, ListItem,Card,CardItem, Toast} from 'native-base';
import CustomDrawerContent from './components/CustomDrawerContent';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const routes = [
  { titulo:'Register', icono:'add' },
  { titulo:'ListarPedidos', icono:'list' }
];
function Custom(props) {
  return (
  <Container>
     <Content>
       <Image
       source={{
         uri: "https://cdn.cienradios.com/wp-content/uploads/sites/2/2016/10/OK-650x421.gif"
       }}
       style={{
         height: 120,
         alignSelf: "stretch",
         justifyContent: "center",
         alignItems: "center"
       }}>
       </Image>
       <List>
       { routes.map(data =>(
         <ListItem icon
           onPress={() => props.navigation.navigate(data.titulo)}>
           <Left>
             <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon active name={data.icono} />
             </Button>
           </Left>
           <Body>
             <Text>{data.titulo}</Text>
           </Body>
           <Right>
             <Icon active name="arrow-forward" />
           </Right>
         </ListItem>
       ))}
       <ListItem icon
           onPress={() => props.route.params.setLoggedIn(false)}>
           <Left>
             <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon active name="arrow-forward" />
             </Button>
           </Left>
           <Body>
             <Text>Salir</Text>
           </Body>
           <Right>
             <Icon active name="arrow-forward" />
           </Right>
         </ListItem>
       </List>
     </Content>
   </Container>
   );
 }

function App() {
  //const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <Root>
      
      {/* <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="ListarPedidos" component={ListarPedidos} />
        <Stack.Screen name="Prueba" component={Prueba} /> 
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator initialRouteName="Register" initialParams={{ setLoggedIn }}
          drawerContent={(props) => <CustomDrawerContent {...props}/>}>
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="ListarPedidos" component={ListarPedidos}
          initialParams={{ setLoggedIn }}/>
        </Drawer.Navigator>
    
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}
          initialParams={{ setLoggedIn }}/>
        </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
  );
}

export default App;