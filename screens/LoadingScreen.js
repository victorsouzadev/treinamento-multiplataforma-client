import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import firebase from 'firebase'


export default class Loading extends React.Component {
    
    componentDidMount(){
        this.checkIfLoggedIn(); 
    }
    
    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
               this.props.navigation.navigate('DashboardScreen')
            
            }else{
               this.props.navigation.navigate('LoginScreen')
            
            }

        }.bind(this))
    }
 
    render(){
    return (
      <View style={styles.container}>
           <ActivityIndicator size="large"/>
  
      </View>
    );
  }
} 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
});
