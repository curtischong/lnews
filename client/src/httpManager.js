import axios from 'axios';
import {getLizzieServerIP} from './config'
import {toTimeZone} from './Util'

const headers = {
  'Content-Type': 'application/json',
}

// Post does allow data to be sent in the body

const getCards = (cardAmount, cardOffset) => {
    let getCardsObj = {
      "cardAmount": cardAmount,
      "cardOffset": cardOffset
    }
  return axios.get(getLizzieServerIP() + "get_news_cards",{
    params : getCardsObj,
    headers: headers
  });
}

const getPanels = (panelAmount, panelOffset) => {
  let getPanelsObj = {
    "panelAmount": panelAmount,
    "panelOffset": panelOffset
  }
  return axios.get(getLizzieServerIP() + "get_news_panels",{
    params : getPanelsObj,
    headers: headers
  });
}

const getLpeaksSkills= () => {
  return axios.get(getLizzieServerIP() + "get_peaks_skills",{
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
  //TODO: for some reason all new dates made in the same session sends the same timestamp
  // OK FOR SOME REASON I THINK IM'S USING THE SAME MOMENT OBJECT THAT'S WHY IT'S THE SAME TIME
  console.log(skill.timeLearned.valueOf())
  let payload = {
    "concept" : skill.concept,
    "newLearnings" : skill.newLearnings,
    "oldSkills" : skill.oldSkills,
    "percentNew" : parseInt(skill.percentNew),
    "timeLearnedUnixt" : skill.timeLearned.valueOf(),
    "timeLearnedTs" : toTimeZone(skill.timeLearned),
    "timeSpentLearning" : parseInt(skill.timeSpentLearning)
  }

  console.log(payload)
  axios.post(getLizzieServerIP() + "upload_skill", JSON.stringify(payload))
  .then(res => {
    console.log(res);
  });
}

export {
  getCards,
  getPanels,
  getLpeaksSkills,
  sendEmotionEval,
  dismissPanel,
  submitLpeaksSkill
}