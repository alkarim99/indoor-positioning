/* eslint-disable prettier/prettier */
import React, {useState, useEffect, Component, useRef} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  Alert,
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
    const route = '(30,30); (30,20); (10,20); (10,30)';
    const coordinate = route.split(';');
    console.log(coordinate[0]);

    const ctx = ref.current.getContext('2d');
    ctx.strokeStyle = 'yellow';
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
      console.log(index);
      console.log(move);
      console.log(line);
      ctx.moveTo(move[0], move[1]); // Begin first sub-path
      ctx.lineTo(line[0], line[1]);
    }
    ctx.stroke();
  };

  const drawLine2 = () => {
    const ctx2 = ref.current.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(10, 20);
    ctx2.lineTo(10, 300);
    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 5;
    ctx2.stroke();
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
      <SafeAreaView style={{flex: 1}}>
        <Canvas
          ref={ref}
          style={{width: '100%', height: '100%', backgroundColor: 'black'}}
        />
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
};

export default CanvasScreen;
