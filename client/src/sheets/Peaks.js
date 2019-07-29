import React from 'react';
import {
  Slider,
  TextBox,
  TextField
} from '../elements/Elements'

import './Sheet.css';
import './Peaks.css';

import * as httpManager from '../httpManager';
import {toPrettyDate} from '../util/Util';
import moment from 'moment'

class SkillPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      concept: props.concept,
      timeLearned: props.timeLearned
    }
  }

  render(){
    return(
      <div className='skillPreview'>
        <p className='skillPreview__concept'>{this.state.concept}</p>
        <p className='skillPreview__timeLearned'>{this.state.timeLearned.format('YYYY-MM-DD')}</p>
      </div>
    )
  }
}



class SkillForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      concept: props.concept,
      newLearnings: props.newLearnings,
      oldSkills: props.oldSkills,
      percentNew: props.percentNew,
      timeLearned: props.timeLearned,
      timeSpentLearning: props.timeSpentLearning,
    }
  }
  fetchSkills(){
    httpManager.getLpeaksSkills()
      .then(res => {
    });
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
    return(
      <div className="sheet--peaks_body">
        <br></br>
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
    )
  }
}

class Peaks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedPreview: -1,
      skills: [],
    }
    this.fetchSkills();
  }

  toSkillObj(skill){
    return {
      concept: skill.concept,
      newLearnings: skill.new_learnings,
      oldSkills: skill.old_skills,
      percentNew: parseInt(skill.percent_new),
      timeLearned: moment(skill.time_learned_ts),
      timeSpentLearning: parseInt(skill.time_spent_learning),
    }
  }

  fetchSkills(){
    let newSkills = []
    httpManager.getLpeaksSkills()
    .then(res =>{
      let skills = res.data;
      for (let idx = 0; idx < skills.length; idx++) {
        let newSkill = skills[idx];
        let skill = this.toSkillObj(newSkill);
        newSkills.push(skill)
      }
      let selectedPreview = skills.length > 0 ? 0 : -1;
      this.setState({
        selectedPreview: selectedPreview,
        skills: newSkills
      });
    });
  }

  addSkill(){
    console.log("added skill")
    let newSkills = this.state.skills.slice();
    let newSkill = {
      concept: "",
      newLearnings: "",
      oldSkills: "",
      percentNew: 0,
      timeLearned: moment(),
      timeSpentLearning: 0,
    }
    newSkills.unshift(newSkill);
    this.setState({
      skills: newSkills,
      selectedPreview: 0
    })
  }

  render(){
    let skillForm = "";
    if(this.state.skills.length > 0){
      let skillIdx = this.state.selectedPreview;
      let curSkill = this.state.skills[skillIdx];
      console.log(skillIdx)
      console.log(this.state.skills);
      skillForm = (
        <SkillForm
        concept={curSkill.concept}
        newLearnings={curSkill.newLearnings}
        oldSkills={curSkill.oldSkills}
        percentNew={curSkill.percentNew}
        timeLearned={curSkill.timeLearned}
        timeSpentLearning={curSkill.timeSpentLearning}
        />
      )
    }

    let skillPreviews = [];
    for(let idx = 0; idx < this.state.skills.length; idx++){
      let skill = this.state.skills[idx];
      skillPreviews.push(
        <SkillPreview concept={skill.concept} timeLearned={skill.timeLearned} key={idx}/>
      )
    }

    return(
      <div className="peaksCon">
      <button onClick={this.addSkill.bind(this)}>New Skill</button>
        <div className="skillPreviewCon">
          {skillPreviews}
        </div>
        {skillForm}
      </div>
    )
  }
}

export {
  Peaks
}