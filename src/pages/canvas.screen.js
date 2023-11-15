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
import {yellow100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function CanvasScreen(props) {
  const ref = useRef(null);
  const {route, navigation} = props;

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      drawLine3(ctx);
    }
  }, [ref]);

  const drawLine = () => {
    const route = '(0,0); (10, 10); (40,40); (20,4)';
    const coordinate = route.split(';');

    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'black';

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
      ctx.moveTo(move[0] * 5, move[1] * 5); // Begin first sub-path
      ctx.lineTo(line[0] * 5, line[1] * 5);
    }
    ctx.lineWidth = 10;
    ctx.stroke();
  };

  const drawLine2 = () => {
    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 75);
    ctx.moveTo(0, 75);
    ctx.lineTo(150, 75);
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 75);
    ctx.moveTo(300, 0);
    ctx.lineTo(150, 75);
    ctx.moveTo(300, 75);
    ctx.lineTo(150, 75);
    ctx.moveTo(300, 150);
    ctx.lineTo(150, 75);
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 75);
    ctx.moveTo(0, 150);
    ctx.lineTo(150, 75);
    ctx.lineWidth = 10;
    ctx.stroke();
  };

  const drawLine3 = () => {
    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 75); // first path
    ctx.fillText('1', 0 + 5, 75 - 25);
    ctx.moveTo(0, 75);
    ctx.lineTo(75, 75); // third path
    ctx.fillText('2', 75 - 20, 75 + 20);
    ctx.moveTo(75, 75);
    ctx.lineTo(75, 0); // second path
    ctx.fillText('3', 75 + 5, 75 - 25);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  return (
    <>
      <TouchableHighlight
        style={styles.buttonMenu}
        onPress={() => navigation.navigate('Home')}
        underlayColor="#176B87">
        <Text style={styles.buttonText}>Back</Text>
      </TouchableHighlight>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/Denah-Lantai-1.png')}
          resizeMode="cover"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 300,
          }}>
          <Canvas
            ref={ref}
            style={{
              width: 300,
              height: 150,
              marginTop: 10,
              // backgroundColor: 'yellow',
            }}
          />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = {
  buttonMenu: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFCD4B',
    borderRadius: 30,
    margin: 12,
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
    marginTop: 100,
  },
};

export default CanvasScreen;
