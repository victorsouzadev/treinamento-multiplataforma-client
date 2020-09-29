import * as React from 'react';

import { FlatList,  Text, TouchableOpacity} from 'react-native';


import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import base64 from 'react-native-base64'
import Constants from 'expo-constants'


import {
  StyleSheet,
  View
} from 'react-native';
import {Container, Header, Content, Tab, Tabs } from 'native-base';

export default class Dashboard extends React.Component {
     constructor(){
       super()
        this.state = {
          users:[],
          currentUser: {
            key:String,
            name:{},
          }        
        }
        
        
     }

    componentDidMount(){
        //this.writeUserData('victor','victoor.soouza',false)
        //data = {base64.encode(firebase.auth().currentUser.email)}
      
        
       // this.startUser()
       this.startUser()
       
        
         
    }

    async startUser(){
      try {
       await this.listenForUsers();
       const currentEmail = base64.encode(firebase.auth().currentUser.email)
       const users = this.state.users
       var cadastrar = true

       if(this.state.users.length>0){
        for(let value of users){

          if(value.key === currentEmail){
           
            this.setState({
              currentUser: value
            })
           // console.log(value.name.treinos)
            cadastrar = false
          }      
        }
       }
      
       cadastrar ? this.register() : false   
      } catch (error) {
         console.log(error)         
      }
       
   }


   register(){
       
        firebase.database().ref('user/'+base64.encode(firebase.auth().currentUser.email)).set({
           name:firebase.auth().currentUser.displayName,
           email:firebase.auth().currentUser.email,
           admin:false
       }).then((data)=>{
           //success callback
           console.log('Cadastrado')
           this.startUser()
       }).catch((error)=>{
           //error callback
           console.log('error ' , error)
       })
       
   }

   async listenForUsers() {
        await firebase.database().ref('user/').once("value", dataSnapshot => {
         var users = [];
         dataSnapshot.forEach(child => {
           users.push({
             name: child.val(),
             key: child.key
           });
         });
       
         this.setState({
           users:users
         })
 
       });
     }
/**/
     treinos = ()=>{
      if(this.state.currentUser.name.treinos){

        const data = Object.entries(this.state.currentUser.name.treinos)
   
         return (
          <Tabs initialPage={0} tabBarUnderlineStyle={{borderBottomWidth:0}}>
            {data.map((prop, key) => {  
              return (
                //<Button style={{borderColor: 'red'}}  key={key}>{prop[0]}</Button>
                <Tab key={key} heading={prop[1].name}
                  tabStyle={{backgroundColor: '#4B0082'}}
                  activeTabStyle={{backgroundColor: '#4B0082'}}
                  activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                  textStyle={{color: '#fff', fontWeight: 'normal'}}>
                    <View style={[ styles.styleMembro, { backgroundColor: '#fff' } ]}>
                        {this.membros(prop[1])}
    
                    </View> 
                </Tab>

              );
              })
            }
            </Tabs>)

      }
     }
     membros = (treino) =>{
      if(treino.membros){
        const data = Object.values(treino.membros)

        return (
          <FlatList
            data={data}
            style={styles.styleMembro}
            keyExtractor={incident => String(incident.name)}
            showsVerticalScrollIndicator={false}
            renderItem={({item:item})=>(
              <View>
              <Text style={styles.styleMembro} >{item.name} </Text>
                {this.exercicio(item)}
                </View>
              )  
            }
          />
        )
      } 
     }
     exercicio = (membro)=>{
      if(membro.exercicio){

   
      const data = Object.values(membro.exercicio)
      console.log(data)
        return (
          <FlatList
            data={data}
            style={styles.styleMembro}
            keyExtractor={incident => String(incident.name)}
            showsVerticalScrollIndicator={false}
            renderItem={({item:item})=>(
              <View key={item.name}>
              <Text style={styles.styleExercicio} > - {item.name} {item.repeticoes>0 ? "("+item.repeticoes+" Séries)": "(Série única)" } </Text>
           
                </View>
              )  
            }
          />
        )
      }
       
     }

  render(){
    


    return (
      <View style={styles.container}>
       <View style={styles.header}>
          <Text style={styles.headerText}>Ficha de treino</Text>
          <TouchableOpacity onPress={()=>{firebase.auth().signOut()}}>
            <MaterialIcons name="exit-to-app" size={30} color="#4b0082" /> 
          </TouchableOpacity>

       </View>



         
      
      
        <Container>
         
          
         
         
         

            {this.treinos()}

               
    
        </Container>
        
      </View>
    );
  }
} 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight +10
  },
  header:{
    paddingHorizontal: 24,
    paddingBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  headerText:{
    fontSize: 20,
    color: '#4B0082' 
  },containerView: {
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
  },styleMembro: {
    //flex: 1,
    //flexDirection: 'column',
    marginTop:2,
    marginHorizontal:5,
    fontSize: 30
  },styleExercicio: {
    //flex: 1,
    //flexDirection: 'column',

    marginHorizontal:10,
    fontSize: 16
  }
});


