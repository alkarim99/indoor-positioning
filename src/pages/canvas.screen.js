/* eslint-disable prettier/prettier */
import React, {useState, useEffect, Component, useRef} from 'react';
import axios from 'axios';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import Canvas, {Path2D} from 'react-native-canvas';

function CanvasScreen(props) {
  const {route, navigation} = props;

  // const handleCanvas = canvas => {
  //   const ctx = canvas.getContext('2d');
  //   ctx.fillStyle = 'purple';
  //   ctx.fillRect(0, 0, 100, 100);
  //   const ctx2 = canvas.getContext('2d');
  // };

  const drawLine = canvas => {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 100);
    ctx.lineTo(250, 250);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const drawLine2 = canvas => {
    const ctx2 = canvas.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(10, 20);
    ctx2.lineTo(10, 300);
    ctx2.lineTo(20, 300);
    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 2;
    ctx2.stroke();
  };

  const handlePath = canvas => {
    canvas.width = 360;
    canvas.height = 100;
    const context = canvas.getContext('2d');

    context.fillStyle = 'red';
    context.fillRect(0, 0, 200, 100);

    const ellipse = new Path2D(canvas);
    ellipse.ellipse(50, 50, 25, 35, (45 * Math.PI) / 180, 0, 2 * Math.PI);
    context.fillStyle = 'purple';
    context.fill(ellipse);

    context.save();
    context.scale(0.5, 0.5);
    context.translate(50, 20);
    const rectPath = new Path2D(canvas, 'M10 10 h 80 v 80 h -80 Z');

    context.fillStyle = 'pink';
    context.fill(rectPath);
    context.restore();
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
        {/* <Image
          style={{width: 360, resizeMode: 'center'}}
          source={require('../assets/Denah-Lantai-1.png')}
        /> */}
        {/* <Canvas ref={handleCanvas} /> */}
        {/* <Canvas ref={drawLine} /> */}
        {/* <Canvas ref={drawLine2} /> */}
        <Canvas ref={handlePath} />
      </View>
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
