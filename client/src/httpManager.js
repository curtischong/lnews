import axios from 'axios';
import {getLizzieServerIP, getLNewsServerIP} from './config'

const getCards = () => {
  return axios.get(getLizzieServerIP() + "get_cards_and_panels") // This returns a promise!
};

const sendEmotionEval = (evalObj) => {
  console.log(evalObj);
  axios.post(getLizzieServerIP() + "upload_emotion_evaluation", JSON.stringify(evalObj))
  .then(res => {
    console.log(res);
  });
};

var headers = {
  'Content-Type': 'application/json',
}

const dismissPanel = (timePlaced) => {
  //dismissPanel
  let payload = {
    "timePlaced": timePlaced
  }
  console.log(timePlaced)
  axios.post(getLNewsServerIP() + "dismiss_panel", JSON.stringify(payload), {headers: headers})
  .then(res => {
    console.log(res);
  });
};

export {
  getCards,
  sendEmotionEval,
  dismissPanel
}