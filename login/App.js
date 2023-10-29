//Importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseConfig } from 'firebase-config';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';

//Imagen de fondo
const uri='https://i.pinimg.com/236x/81/72/f3/8172f32cc85e02fe8c7cec5f5fd176fb.jpg';

//Funcion para pantalla de inicio
function PantallaInicio(){
  return(
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>
        Pantalla Inicio
      </Text>
    </View>
  )
}

//Funcion para pantalla de Login
function PantallaLogin(){
  const [email,setEmail]=React.useState('')
  const [password.setPassword]=React.useState('')
  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);

  //2 funciones para crear cuenta e iniciar sesion
  const CrearCuenta=()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Cuenta creada correctamente')
      const user=userCredential.user;
      console.log(user);
    })
    .catch(error=>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const InicioSesion=()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Inicio de sesión correcto... Bienvenido.')
      const user=userCredential.user;
      console.log(user)
    })
    .catch(error=>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  return (
    //Componentes de interaccion con el usuario
    <View style={styles.container}>
       <Image
        source={{uri}}
        style={[styles.imagen, StyleSheet.absoluteFill]}
      />
      <ScrollView
        contentContainerStyle={{
          width:'100%',
          height:'100%',
          alignItems:'center',
          justifyContent:'center',
          flex:1,
        }}>

          <BlurView intensity={80}>
            <View style={styles.login}>
              <View>
                <Text style={{fontSize:16, fontWeight:'300', color:'#fff'}}>
                  Correo
                </Text>
                <TextInput onChangeText={(text)=>setEmail} style={styles.input} placeholder='correo@ejemplo.com'/>
                <Text style={{fontSize:16, fontWeight:'300', color:'#fff'}}>
                  Contraseña
                </Text>
                <TextInput onChangeText={(text)=>setPassword} style={styles.input} placeholder='contraseña' secureTextEntry={true}/>
              </View>
              <View>
                <TouchableOpacity onPress={InicioSesion} style={styles.boton}> 
                  <Text style={{fontSize:16, fontWeight:'300', color:'#fff'}}>
                    Iniciar sesión
                  </Text>  
                </TouchableOpacity> 
                <TouchableOpacity onPress={CrearCuenta} style={styles.boton}> 
                  <Text style={{fontSize:16, fontWeight:'300', color:'#fff'}}>
                    Registrarse
                  </Text>  
                </TouchableOpacity> 
              </View>  

            </View>

          </BlurView>

      </ScrollView>

    </View>
  );
}



export default function App() {
  return(
    <PantallaLogin/>
  )
  
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen:{},
  login:{},
  input:{
    width:200,
    height:50,
    borderColor:'#fff',
    borderRadius:20,
    padding: 15,
    backgroundColor:'green',
  },
  boton:{
    width:200,
    height:50,
    borderColor:'#fff',
    borderRadius:20,
    backgroundColor:'green',
    alignItems: 'center',
    justifyContent:'center',
    borderColor:'#fff'
  }
});
