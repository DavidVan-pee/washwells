import { StyleSheet, Text,View, SafeAreaView, Pressable, TextInput} from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const navigation= useNavigation();
    const register = () => {
        if (email === "" || password==="" || phone ===""){
            Alert.alert("Invalid Details", "Please fill all details", [
                
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }

        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential._tokenResponse.email;
            const myUserUid = auth.currentUser.uid;


            setDoc(doc(db,"users", `${myUserUid}`),{
                email:user,
                phone:phone
            })
        })
    }
  return (
    <SafeAreaView
    style={{
        flex:1,
        backgroundColor:"white",
        alignItems:"center", 
        padding:10}}>

      <KeyboardAvoidingView>
      <View style={{justifyContent:"center", alignItems:"center", marginTop:100}}>
                    <Text style={{fontSize:20,color:"#088F8F", fontWeight:"bold"}}>SIGN UP</Text>

                    <Text style={{fontSize:18,marginTop:8, fontWeight:"600"}}>Create Your Account</Text>
                </View>

                <View style={{marginTop:50}}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                    <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                    <TextInput placeholder='Email' 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="black"
                    style={{
                        fontSize:email ? 18 : 18,
                        borderBottomWidth:1,
                        borderBottomColor:"gray", 
                        marginLeft:13, width:300,
                        marginVertical:10}}/>
                    </View>

                <View style={{flexDirection:"row", alignItems:"center"}}>
                <Ionicons name="key-outline" size={24} color="black" />
                    <TextInput placeholder='Password' 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholderTextColor="black"
                    style={{
                        fontSize:password ? 18 : 18,
                        borderBottomWidth:1,
                        borderBottomColor:"gray", 
                        marginLeft:13, width:300,
                        marginVertical:30}}/>
                    </View>

                    <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Feather name="smartphone" size={24} color="black" />
                    <TextInput placeholder='Phone Number' 
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    
                    placeholderTextColor="black"
                    style={{
                        fontSize:password ? 18 : 18,
                        borderBottomWidth:1,
                        borderBottomColor:"gray", 
                        marginLeft:13,
                        width:300,
                        marginVertical:20}}/>
                    </View>
   


                    <Pressable
                    onPress={register}
                    style={{
                        width:200,
                        backgroundColor:"#318CE7",
                        padding:15,
                        borderRadius: 7,
                        marginTop: 50,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>

                        <Text
                        style={{
                            fontSize:18,
                            textAlign:"center",
                            color:"white"
                        }}>
                            Register
                            </Text>
                    </Pressable>

                    <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        marginTop:20,
                    }}> 
                        <Text style={{textAlign:"center", fontSize:17, color:"#088F8F",fontWeight:"500"}}>
                             Already have an account? Sign In.
                        </Text>
                    </Pressable>
                </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})