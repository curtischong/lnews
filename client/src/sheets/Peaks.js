import React from 'react';
import {
  Slider,
  TextBox,
  TextField
} from '../elements/Elements'

import './Sheet.css';
import './Peaks.css';

import * as httpManager from '../httpManager';
import {toPrettyDate} from '../Util';
import classNames from 'classnames';
import moment from 'moment'

class SkillPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      concept: props.concept,
      timeLearned: props.timeLearned
    }
  }

  onClick(){
    this.props.onClickSkillPreview(this.props.idx);
  }

  render(){
    let skillClasses = ""
    if(this.props.isSelected){
      skillClasses = classNames('skillPreview', 'skillPreview--selectedSkill')
    }else{
      skillClasses = classNames('skillPreview')
    }
    let conceptTitle = this.state.concept == "" ? "New" : this.state.concept;

    let conceptClasses= ""
    if(!this.props.uploaded){
      conceptClasses = classNames('skillPreview__concept', 'skillPreview--unuploaded')
    }else{
      conceptClasses = classNames('skillPreview__concept')
    }

    return(
      <div className={skillClasses} onClick={this.onClick.bind(this)}>
        <p className={conceptClasses}> {conceptTitle}</p>
        <p className='skillPreview__timeLearned'>{this.state.timeLearned.format('YYYY-MM-DD')}</p>
      </div>
    )
  }
}



class SkillForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      concept: this.props.concept,
      newLearnings: this.props.newLearnings,
      oldSkills: this.props.oldSkills,
      percentNew: this.props.percentNew,
      timeLearned: this.props.timeLearned,
      timeSpentLearning: this.props.timeSpentLearning,
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
    }, () => {
      this.props.updateSkill(this.state)
    });
  }

  handleSliderChange(val, sliderId) {
    switch (sliderId){
      case "percentNew":
        if(val%5 === 0){
          this.setState({
            "percentNew": val
          }, () => {
            this.props.updateSkill(this.state)
          })
        }
        break;
      case "timeSpentLearning":
        if(val%5 === 0){
          this.setState({
            "timeSpentLearning": val
          }, ()=> {
            this.props.updateSkill(this.state)
          })
        }
        break;
      default:
    }
  }

  handleLearningsChange(val){
    this.setState({
      "newLearnings": val
    }, () => {
      this.props.updateSkill(this.state)
    });
  }
  handleOldSkillsChange(val){
    this.setState({
      "oldSkills": val
    }, () => {
      this.props.updateSkill(this.state)
    });
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
        <button className="sheet__btn--submit" onClick={this.props.submitSkill}>Upload</button>
        <button className="sheet__btn--submit" onClick={this.props.deleteSkill}>Delete</button>
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
      uploaded: []
    }
    this.fetchSkills();
  }

  toSkillObj(skill){
    return {
      concept: skill.concept,
      newLearnings: skill.new_learnings,
      oldSkills: skill.old_skills,
      percentNew: parseInt(skill.percent_new),
      timeLearned: moment(parseInt(skill.time_learned_unixt)),
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
        skills: newSkills,
        uploaded: new Array(skills.length).fill(true)
      });
    });
  }

  addSkill(){
    let newSkills = this.state.skills.slice();
    let newSkill = {
      concept: "",
      newLearnings: "",
      oldSkills: "",
      percentNew: 0,
      timeLearned: new moment(),
      timeSpentLearning: 0,
    }
    let newUploaded = this.state.uploaded.slice();
    newUploaded.unshift(false);
    newSkills.unshift(newSkill);
    this.setState({
      skills: newSkills,
      selectedPreview: 0,
      uploaded: newUploaded
    })
  }
  deleteSkill(){
    if (window.confirm('Are you sure you wish to delete this item?')){
      httpManager.deletePeaksSkill(this.state.skills[this.state.selectedPreview].timeLearned.valueOf());
      let skills = this.state.skills.slice();
      skills.splice(this.state.selectedPreview, 1);
      let uploaded = this.state.uploaded.slice();
      uploaded.splice(this.state.selectedPreview, 1);

      let newPreview;
      if(uploaded.length === 0){
        newPreview = -1
      }else{
        newPreview = 0
      }

      this.setState({
        skills: skills,
        uploaded: uploaded,
        selectedPreview: newPreview
      });
    }
  }

  onClickSkillPreview(idx){
    this.setState({
      selectedPreview: idx
    });
  }

  updateSkill(skill){
    let skills = this.state.skills.slice();
    skills[this.state.selectedPreview] = skill;
    let uploadedSkills = this.state.uploaded.slice();
    uploadedSkills[this.state.selectedPreview] = false;
    this.setState({
      skills: skills,
      uploaded: uploadedSkills
    })
  }

  onSubmitSkill(){
    httpManager.submitLpeaksSkill(this.state.skills[this.state.selectedPreview])
    let uploadedSkills = this.state.uploaded.slice();
    uploadedSkills[this.state.selectedPreview] = true;
    this.setState({
      uploaded: uploadedSkills
    })
  }


  render(){
    let skillPreviews = [];
    for(let idx = 0; idx < this.state.skills.length; idx++){
      let skill = this.state.skills[idx];
      let isSelected = this.state.selectedPreview === idx
      skillPreviews.push(
        <SkillPreview
        concept={skill.concept}
        timeLearned={skill.timeLearned}
        key={skill.timeLearned.valueOf() + skill.concept + this.state.uploaded[idx]}
        onClickSkillPreview={this.onClickSkillPreview.bind(this)}
        idx={idx}
        isSelected={isSelected}
        uploaded={this.state.uploaded[idx]}/>
      )
    }
    console.log(this.state.skills)

    let skillIdx = this.state.selectedPreview;
    let curSkill = this.state.skills[skillIdx];
    return(
      <div className="peaksCon">
      <button onClick={this.addSkill.bind(this)}>New Skill</button>
        <div className="skillPreviewCon">
          {skillPreviews}
        </div>
      {this.state.skills.length > 0 && (
        <SkillForm
        key={skillIdx + curSkill.timeLearned.valueOf()}
        concept={curSkill.concept}
        newLearnings={curSkill.newLearnings}
        oldSkills={curSkill.oldSkills}
        percentNew={curSkill.percentNew}
        timeLearned={curSkill.timeLearned}
        timeSpentLearning={curSkill.timeSpentLearning}
        deleteSkill={this.deleteSkill.bind(this)}
        updateSkill={this.updateSkill.bind(this)}
        submitSkill={this.onSubmitSkill.bind(this)}
        />
      )}
      </div>
    )
  }
}

export {
  Peaks
}