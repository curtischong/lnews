import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as httpManager from '../httpManager';
import config, {} from '../config';

import {
  Checkbox,
  Slider,
  TextBox
} from '../elements/Elements'

import './Panel.css';

const REFRESH_GET_PANEL_AMOUNT = 5

class PanelFeed extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      panelOffset: 0,
      panelAmount: 5,
      panels: [],
    }

    this.fetchPanels();
  }

  panelDismissed(idx){
    let panels = this.state.panels.slice();
    panels.splice(idx, 1);
    this.setState({
      "panels": panels
    })
  }

  fetchPanels(){
    if(!config.fetchPanels){
      return;
    }
    httpManager.getPanels(this.state.panelAmount, this.state.panelOffset)
    .then(res => {
      this.setState({
        panelOffset: this.state.panelOffset + REFRESH_GET_PANEL_AMOUNT,
      })
      let panels = res.data;
      var newPanels = this.state.panels.slice();

      for(let i = 0; i < panels.length;i++){
        let panel = JSON.parse(panels[i].panel);
        let panelTime = parseInt(panels[i].unixt, 10);
        if(panel.panelType === "panelCheckbox"){
          newPanels.push(
            <PanelCheckbox
            idx = {i}
            timePlaced={panelTime}
            title={panel.title}
            img ={panel.img}
            key={panelTime + "_panelCheckbox"}
            listItems={panel.listItems}
            onDismiss={this.panelDismissed.bind(this)}
            />
          )
        }else if(panel.panelType === "panelConfirm"){
          newPanels.push(
            <PanelConfirm
            idx = {i}
            timePlaced={panelTime}
            confirmMsg={panel.confirmMsg}
            title={panel.title}
            img ={panel.img}
            key={panelTime + "_panelConfirm"}
            listItems={panel.listItems}
            onDismiss={this.panelDismissed.bind(this)}
            />
          )
        } else if (panel.panelType === "panelEval"){
          newPanels.push(
            <PanelEval
            idx = {i}
            timePlaced={panelTime}
            title = {panel.title}
            img ={panel.img}
            evalFields = {panel.evalFields}
            submitMsg = {panel.submitMsg}
            key={panelTime + "_panelEval"}
            onDismiss={this.panelDismissed.bind(this)}
            />
          )
        }
      }

      this.setState({
        panels: newPanels
      })
    });
  }

  render(){
    return(
      <div className="panelFeed">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
        {this.state.panels}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}


class PanelCheckbox extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      checkCount: 0,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.checkCount !== this.state.checkCount){
      this.checkChecked();
    }
  }

  checkChecked(){
    if(this.props.listItems.length === this.state.checkCount){
      console.log("all checked!");
    }
  }

  handleUnchecked(){
    this.setState({
      checkCount: this.state.checkCount - 1,
    });
  }

  handleChecked(){
    this.setState({
      checkCount: this.state.checkCount + 1,
    });
  }
  onDismiss(){
    this.props.onDismiss(this.props.idx)
  }
  render () {
    let checkboxElements = [];
    for(let i = 0 ; i < this.props.listItems.length;i++){
      checkboxElements.push(
        <Checkbox
        title = {this.props.listItems[i]}
        isChecked = {false}
        handleChecked = {this.handleChecked.bind(this)}
        handleUnchecked = {this.handleUnchecked.bind(this)}
        key = {i + "panelCheckbox"}/>
      );
    }

    return (
      <div className="panel">
        <div className="panel__top">
          <img className="img--panel--small" src={this.props.img} alt="images/thinking.png"></img>
          <h3 className="panel__header">{this.props.title}</h3>
        </div>
        <div className="panel--checkbox__content">
          <div className="panel__checkboxes">
            {checkboxElements}
          </div>
        </div>
        <button className="panel__btn--submit" style={{marginLeft: 35}} onClick={this.onDismiss.bind(this)}>Dismiss</button>
      </div>
    )
  }
};

class PanelConfirm extends React.Component{

  onSubmit(){
    console.log("panel confirm submitted");
    httpManager.dismissPanel(this.props.timePlaced);
    this.props.onDismiss(this.props.idx)
  }

  render () {
    let confirmElements = [];
    for(let i = 0 ; i < this.props.listItems.length;i++){
      confirmElements.push(
        <li className="panel__listItem" key={this.props.timePlaced + "_" + i + "_panelConfirm"}>{this.props.listItems[i]}</li>
      );
    }

    return(
      <div className="panel">
        <div className="panel__top">
          <img className="img--panel--small" src={this.props.img} alt="images/thinking.png"></img>
          <h3 className="panel__header">{this.props.title}</h3>
        </div>
        <div className="panel__content">
          <ul className="panel__confirmElements">{confirmElements}</ul>
          <button className="panel__btn--submit" onClick={this.onSubmit.bind(this)}>{this.props.confirmMsg}</button>
        </div>
      </div>
    )
  }
};

class PanelEval extends React.Component{

  constructor(props){
    super(props);
    const startingVals = []
    for(let i = 0 ; i < this.props.evalFields.length;i++){
      startingVals.push(this.props.evalFields[i].intervalCenter)
    }
    this.state = {
      sliderVals: startingVals,
      comments: ""
    }
  }

  setMood(event) {
    console.log(event.target.value);
  }

  handleSliderChange(val, idx) {
    let newSliderVals = this.state.sliderVals.slice();
    newSliderVals[idx] = val;

    this.setState({
      "sliderVals": newSliderVals
    })
  }

  handleMsgChange(val){
    this.setState({
      "comments": val
    });
  }

  onSubmit(){
    console.log("panel Eval submitted");
    let evalObj = {
      "evalDatetime": parseInt(parseInt(new Date().getTime()) / 1000),
      "accomplishedEval": 999,
      "socialEval": 999,
      "exhaustedEval": 999,
      "tiredEval": 999,
      "happyEval": 999,
      "comments": this.state.comments,
      "evalLocation": "web"
    }

    for(let i = 0; i < this.props.evalFields.length;i++){
      let curField = this.props.evalFields[i];
      evalObj[curField.evalType] = parseInt(this.state.sliderVals[i]);
    }

    httpManager.sendEmotionEval(evalObj);
    httpManager.dismissPanel(this.props.time);
    this.props.onDismiss(this.props.idx)
  }

  render() {
    let allFields = [];

    let panelTitle = "";
    let allTitles = []
    if(allFields.length === 1){
      panelTitle = this.props.evalFields[0].title;
      allTitles.push("");
    }else{
      panelTitle = "How are you feeling?";
      for(let i = 0 ; i < this.props.evalFields.length;i++){
        allTitles.push(this.props.evalFields[i].title);
      }
    }


    for(let i = 0 ; i < this.props.evalFields.length;i++){
      let curField = this.props.evalFields[i];
      allFields.push(
        <div className="panel--eval__cell" key={this.props.timePlaced + "_" + i + "_panelEval"}>
          <p className="panel__topic">{allTitles[i]}</p>
          <Slider
          handleChange={this.handleSliderChange.bind(this)}
          intervalRadius={curField.intervalRadius}
          intervalCenter={curField.intervalCenter}
          pos={this.state.sliderVals[i]}
          idx={i}
          sliderType='panel'/>
        </div>
      )
    }


    return (
      <div className="panel">
        <div className="panel__top">
          <img className="img--panel--small" src={this.props.img} alt="images/thinking.png"></img>
          <h3 className="panel__header">{panelTitle}</h3>
        </div>
        <div className="panel__content">
          {allFields}
        </div>
        < TextBox handleChange={this.handleMsgChange.bind(this)} textBoxType="panel" placeholder="Comments?" value={this.state.message}/>
        <button className="panel__btn--submit" style={{marginLeft: 35}} onClick={this.onSubmit.bind(this)}>{this.props.submitMsg}</button>
      </div>
     )
  }
}

export{
  PanelFeed
}