/* eslint-disable prettier/prettier */
import React, {useState, useEffect, Component, useRef} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import Canvas from 'react-native-canvas';

function CanvasScreen(props) {
  const ref = useRef(null);
  const {route, navigation} = props;

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      drawLine(ctx);
      // drawLine2(ctx);
    }
  }, [ref]);

  // const handleCanvas = canvas => {
  //   const ctx = canvas.getContext('2d');
  //   ctx.fillStyle = 'purple';
  //   ctx.fillRect(0, 0, 100, 100);
  //   const ctx2 = canvas.getContext('2d');
  // };

  const drawLine = () => {
    const route = '(200,200); (150,150)';
    const coordinate = route.split(';');
    console.log(coordinate[0]);

    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let index = 0; index < coordinate.length - 1; index++) {
      const move = coordinate[index]
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .split(',');
      const line = coordinate[index + 1]
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .split(',');
      ctx.moveTo(move[0], move[1]); // Begin first sub-path
      ctx.lineTo(line[0], line[1]);
      ctx.lineWidth = 10;
    }
    ctx.stroke();
  };

  return (
    <>
      <View>
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => navigation.navigate('Home')}
          underlayColor="#176B87">
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
      </View>
      <SafeAreaView style={styles.container}>
        {/* <Image
          style={styles.maps}
          source={require('../assets/Denah-Lantai-1.png')}
        /> */}
        <ImageBackground
          source={require('../assets/Denah-Lantai-1.png')}
          resizeMode="cover"
          style={{justifyContent: 'center', width: '100%', height: 300}}>
          <Canvas ref={ref} />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = {
  buttonMenu: {
    width: '85%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFCD4B',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  maps: {
    width: '100%',
    height: 360,
    resizeMode: 'center',
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  canvas: {
    position: 'absolute',
    margin: 50,
  },
};

export default CanvasScreen;
