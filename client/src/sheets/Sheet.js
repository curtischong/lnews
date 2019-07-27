import React from 'react';
import {
  Slider,
  TextBox,
  TextField
} from '../elements/Elements'

import './Sheet.css';

import * as httpManager from '../httpManager';

class SheetMenu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      concept: "",
      newLearnings: "",
      oldSkills: "",
      percentNew: 0,
      timeLearned: new Date(),
      timeSpentLearning: 0,
    }
  }

  handleConceptChange(val){
    this.setState({
      "concept": val
    });
  }

  handleSliderChange(val, sliderId) {
    switch (sliderId){
      case "percentNew":
        if(val%5 === 0){
          this.setState({
            "percentNew": val
          })
        }
        break;
      case "timeSpentLearning":
        if(val%5 === 0){
          this.setState({
            "timeSpentLearning": val
          })
        }
        break;
      default:
    }
  }

  handleLearningsChange(val){
    this.setState({
      "newLearnings": val
    });
  }
  handleOldSkillsChange(val){
    this.setState({
      "oldSkills": val
    });
  }

  onSubmitSkill(){
    httpManager.submitLpeaksSkill(this.state)
  }

  render(){
    return (
    < div className="sheet__con" >
      <div className="sheet__menu">
        <img className="img--sheet__menu" src="images/lpeaks.png" alt="lpeaks logo"/>
        <img className="img--sheet__menu" src="images/lair.png" alt="lair logo"/>
      </div>
      <div className="sheet__body">
        <br></br>
        {/*<p className="sheet__concept__header">name of concept</p>*/}
        <br></br>
        <span className="sheet__line"></span>
        <br></br>
        <TextField
          handleChange={this.handleConceptChange.bind(this)}
          textFieldType="peaks"
          placeholder="Concept Name"
          value={this.state.concept}
        />
      <p className="sheet__concept__header">How much was completely new?</p>
        <Slider
        handleChange={this.handleSliderChange.bind(this)}
        intervalRadius={50}
        intervalCenter={50}
        pos={this.state.percentNew}
        sliderId='percentNew'
        sliderType='peaks'/>
        <br></br>
        <p className="sheet__concept__header">Time spent learning?</p>
        <Slider
        handleChange={this.handleSliderChange.bind(this)}
        intervalRadius={150}
        intervalCenter={150}
        pos={this.state.timeSpentLearning}
        sliderId='timeSpentLearning'
        sliderType='peaks'/>
        <TextBox handleChange={this.handleLearningsChange.bind(this)} textBoxType='peaks' placeholder="What was new?" value={this.state.newLearnings}/>
        <br></br>
        <TextBox handleChange={this.handleOldSkillsChange.bind(this)} textBoxType='peaks' placeholder="Some old skills you built upon?" value={this.state.oldSkills}/>
        <br></br>
        <button className="sheet__btn--submit" onClick={this.onSubmitSkill.bind(this)}>Upload</button>
      </div>
    </div>
    )
  }
};

export{
  SheetMenu
}