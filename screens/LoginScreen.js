import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator,Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import 'expo-app-auth';
import firebase from 'firebase'

export default class Login extends React.Component {

   


    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
   
   
    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                //googleUser.getAuthResponse().id_token
                googleUser.idToken,
                googleUser.accessToken
                );
            // Sign in with credential from the Google user.
            const result = firebase.auth().signInWithCredential(credential)
            .then(function(result){
                console.log("user sign in ")
                console.log("resultado: ",result)
              
            
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
            console.log("longe ",result)
          } else {
            console.log('User already signed-in Firebase.');
          }
         
        }.bind(this));
      }


     signInWithGoogleAsync = async () => {
        try {
     
          const result = await Google.logInAsync({
            
            androidClientId: "831636410359-72eeiccuf87fsd94n44qbhmttnfqbp1b.apps.googleusercontent.com",
            iosClientId: "831636410359-h8e4gd1avvvj2sovsuchqrfh22dnt0t7.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
         
          if (result.type === 'success') {
                this.onSignIn(result)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }
  
    render(){
    return (
      <View style={styles.container}>
          <Text>Login</Text>
            <Button title= 'Sign in'
            onPress={()=> this.signInWithGoogleAsync()}/>
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
