import axios from 'axios';
import {getLizzieServerIP, getLNewsServerIP} from './config'

const headers = {
  'Content-Type': 'application/json',
}

// The reason why I had so much trouble with get is because there is no standard to send data through a body via a get request
// Post does allow data to be sent in the body
const getCards = (getCardsAndPanelsObj) => {
  //return axios.get(getLizzieServerIP() + "get_cards_and_panels", {params: getCardsAndPanelsObj}, {headers: headers}) // This returns a promise!
  /*return axios({
    method: 'get',
    url: getLizzieServerIP() + "get_cards_and_panels",
    data: JSON.stringify(getCardsAndPanelsObj),
    headers: headers
  }) // This returns a promise!*/
  /*
  return axios.get(getLizzieServerIP() + "get_cards_and_panels",{
    params : JSON.stringify(getCardsAndPanelsObj),
    headers: headers
  });*/
  return axios({
    method: 'post',
    url: getLizzieServerIP() + "get_cards_and_panels",
    data: getCardsAndPanelsObj,
    headers: headers
  }) // This returns a promise!*/
};

const sendEmotionEval = (evalObj) => {
  axios.post(getLizzieServerIP() + "upload_emotion_evaluation", JSON.stringify(evalObj))
  .then(res => {
    console.log(res);
  });
};


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