import React from 'react';
import {
  Checkbox,
  Slider,
  TextBox
} from '../elements/Elements'

import './Sheet.css';

class SheetMenu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sliderVals: [0,0],
      concept: "",
      newLearnings: "",
      oldSkills: "",
      percentNew: 0,
      timeLearned: "",
      timeSpentLearning: 0,
    }
  }

  handleSliderChange(val, sliderId) {
    console.log(sliderId)
    switch (sliderId){
      case "percentNew":
        if(val%5 == 0){
          this.setState({
            "percentNew": val
          })
        }
        break;
      case "timeSpentLearning":
        if(val%5 == 0){
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

  render(){
    return (
    < div className="sheet__con" >
      <div className="sheet__menu">
        <img className="img--sheet__menu" src="images/lpeaks.png"/>
        <img className="img--sheet__menu" src="images/lair.png"/>
      </div>
      <div className="sheet__body">
        <br></br>
        <p className="sheet__concept__header">name of concept</p>
        <br></br>
        <span className="sheet__line"></span>
        <br></br>
          <Slider
          handleChange={this.handleSliderChange.bind(this)}
          intervalRadius={50}
          intervalCenter={50}
          pos={this.state.percentNew}
          sliderId='percentNew'
          sliderType='peaks'/>
          <br></br>
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
      </div>
    </div>
    )
  }
};

export{
  SheetMenu
}