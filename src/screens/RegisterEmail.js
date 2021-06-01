import React,{useState} from 'react'
import { SafeAreaView, Text,TextInput ,StyleSheet,TouchableOpacity,View,ScrollView } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios';

import {NEW_ENV_API_URL} from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

const RegisterEmail = (props) => {
    const [name, setName] = useState(0);
    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    const [icon, setIcon] = useState("eye-slash")
    const { navigate } = props.navigation;
  const [hidePassword, setHidePassword] = useState(true)

    const loginWithEmail=()=>{
        console.log('--------------------')
       const input={    
            "name":name,
            "email":email,
            "password":password
        }
        console.log("data",input)
        axios.post(NEW_ENV_API_URL + 'auth/register',input).then(res => {
            var result=res.data
           console.log('response',res.data)
           if(result.success){
            AsyncStorage.setItem('email',email);
            AsyncStorage.setItem('user',name);
            AsyncStorage.setItem('userToken', result.token);
             navigate('OtpScreen',{})
           }
      
            })
        .catch(error => console.log(error));
          // console.log("Get Value >> ", value);
    }
    const OnHidePassClick=()=>{
        icon !== "eye-slash"
          ? (setIcon("eye-slash"), setHidePassword(true))
          : (setIcon("eye"), setHidePassword(false))
      }
    return (
        <SafeAreaView style={{flex: 1,backgroundColor:'#f3f6f8'}}>
            <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#f2f6f9' }}>
                <View>
                    <Text style={{color:'black', marginTop: 25, textAlign: 'center', fontSize: 16}}>Tell us a bit more about yourself</Text>
                </View>
                        <View style={{marginLeft:'5%',marginRight:'5%',marginTop:30}}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(v)=>setName(v)}
                                value={name}
                                underlineColorAndroid="green"
                                placeholder="Enter Name"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(v)=>setEmail(v)}
                                value={email}
                                underlineColorAndroid="green"
                                placeholder="E-mail address"
                            />
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <TextInput 
                                    style={styles.input}
                                    onChangeText={(v)=>setPassword(v)}
                                    value={password}
                                    underlineColorAndroid="green"
                                    secureTextEntry={hidePassword}
                                    placeholder="Password"
                                    />
                                </View>
                                <View style={{flex:0.1,marginTop:'5%',marginLeft:'90%',position:'absolute',justifyContent:'space-between'}}>
                                    <Icon name={icon} size={20} onPress={() => OnHidePassClick()} />
                                </View> 
                            </View>
                            <View style={{marginLeft:'5%'}}>                        
                                <Text>Enter at least 6 letters and 1 no.</Text>
                            </View>
                    <View style={{marginLeft:'5%',marginRight:'5%'}}>
                        <TouchableOpacity 
                            style={[styles.buttonStyle, { backgroundColor: '#30a960', marginTop: 40 }]}
                            onPress={ ()=>loginWithEmail()}
                            >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
         </View>
    </View>
    </ScrollView>
</SafeAreaView>
    )
  }

const styles = StyleSheet.create({
    input: {
      height: 50,
      fontSize: 20,
      margin: 12,
    },
    buttonStyle: {
        elevation: 2, width: '100%', height: 45, marginTop: 50,
        borderRadius: 3,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      },
  });
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmail)
