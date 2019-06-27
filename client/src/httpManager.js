import React from 'react';
import axios from 'axios';

const sendEmotionEval = (evalObj) => {
axios.post(`http://10.8.0.1:9000/upload_emotion_evaluation`, evalObj)
  .then(res => {
    console.log(res);
  });
}