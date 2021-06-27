import * as React from 'react';
import { Image } from "react-native";
import { Container, Content, List, ListItem, Left, Button, Icon, Body, Text, Right} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const routes = [
  { titulo:'Register', icono:'add', key: 1 },
  { titulo:'ListarPedidos', icono:'list', key: 2 }
];
export default function CustomDrawerContent(props) {
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
        <ListItem key={data.key} icon
          onPress={() => 
          //props.navigation.replace(data.titulo)}
          props.navigation.reset({
            index: 0,
            routes: [{ name: data.titulo }],
          })
          
        }
          >
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
      <ListItem key={0} icon
          onPress={props.setLoggedOut}>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="exit" />
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