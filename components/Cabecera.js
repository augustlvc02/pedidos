import * as React from 'react';
import {Header, Left, Button, Icon, Body, Title, Right} from 'native-base';
export default function Cabecera(props){
  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>{props.titulo}</Title>
      </Body>
      <Right />
    </Header>
  );
}