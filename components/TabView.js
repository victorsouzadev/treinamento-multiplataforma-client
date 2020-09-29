import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {Container,Tab, Tabs,Text } from 'native-base';


export default function tabViewExemplo() {
    return (
      <Container>
          <Tabs initialPage={0}>
            <Tab heading="Tab1">
              <View style={[ styles.container, { backgroundColor: '#ccc' } ]}>
                      <Text>Aba 1</Text>
              </View>
            </Tab>
            <Tab heading="Tab2">
              <View style={[ styles.container, { backgroundColor: '#673ab7' } ]}>
                    <Text>Aba 2</Text>  
              </View>
            </Tab>
            <Tab heading="Tab3">
              <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
                     <Text>Aba 3</Text>             
              </View>
            </Tab>
          </Tabs>
        </Container>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});