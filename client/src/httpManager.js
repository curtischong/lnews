import axios from 'axios';
import {getLizzieServerIP} from './config'
import toTimeZone from 'util'

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

  return axios.get(getLizzieServerIP() + "get_cards_and_panels",{
    params : getCardsAndPanelsObj,
    headers: headers
  });
};

const getSheets = () => {
  return axios.get(getLizzieServerIP() + "get_sheets",{
    headers: headers
  });
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
    "unixt": timePlaced
  }
  console.log(payload)
  axios.post(getLizzieServerIP() + "dismiss_panel", JSON.stringify(payload))
  .then(res => {
    console.log(res);
  });
};

const submitLpeaksSkill = (skill) => {
  let payload = {
    "concept" : skill.concept,
    "newLearnings" : skill.newLearnings,
    "oldSkills" : skill.oldSkills,
    "percentNew" : skill.percentNew,
    "timeLearnedUnixt" : toTimeZone(skill.timeLearned),
    "timeLearnedTs" : parseInt(parseInt(skill.timeLearned.getTime())),
    "timeSpentLearning" : skill.timeSpentLearning
  }

  console.log(payload)
  axios.post(getLizzieServerIP() + "upload_skill", JSON.stringify(payload))
  .then(res => {
    console.log(res);
  });
}

export {
  getCards,
  getSheets,
  sendEmotionEval,
  dismissPanel,
  submitLpeaksSkill
}