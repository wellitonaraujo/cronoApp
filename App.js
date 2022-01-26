/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text,TouchableOpacity } from 'react-native';

let timer = null;

let ss = 0;
let mm = 0;
let hh = 0;

function App() {
  const [ number, setNumber ] = useState(0)
  const [ buttom, setButtom ] = useState('VAI')
  const [ last, setLast ] = useState(null)

  function vai() {
    
    if(timer !== null) {
      // Aqui para o timer
      clearInterval(timer);
      timer = null;

      setButtom('VAI')
    }else {
      // Começar a girar o timer
      timer = setInterval(() => {
        ss++;

        if(ss == 60){
          ss = 0;
          mm++;
        }

        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = 
        (hh  < 10 ? '0' + hh : hh) + ':'
        + (mm  < 10 ? '0' + mm : mm) + ':'
        + (ss  < 10 ? '0' + ss : ss)

        setNumber(format);

      }, 1000);

      setButtom('PAUSAR');
    }
    
  }

  function limpar() {
    if(timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setLast(number)

    setNumber(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setButtom('VAI')
  }

  return(
    <View style={styles.container}>
      <Image source={require('./src/crono.png')}/>

      <Text style={styles.timer}>{number}</Text>

      <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={vai}>
            <Text style={styles.btnText}>{buttom}</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.btn} onPress={limpar}>
            <Text style={styles.btnText}>LIMPAR</Text>
          </TouchableOpacity>
      </View>

    <View style={styles.areaFooter}>
      <Text style={styles.textFoolter}>
        { last ? 'Ultimo tempo: ' + last : '' }
      </Text>
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c603fc'
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 10
  },

  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c603fc'
  },
  areaFooter:{
    marginTop: 40,
  },
  textFoolter: {
    fontSize: 22,
    color: '#FFF',
    fontStyle: 'italic'
  }
  
})

export default App;
