import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Veterinary Application Home Screen</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"pink",
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:"black",
        fontSize:28,
        textAlign:"center"
    }
})