import React from 'react';

import {
  Checkbox,
  Slider,
  TextBox
} from "../elements/Elements"
import './Panel.css';

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
      </div>
    )
  }
};

class PanelConfirm extends React.Component{

  onSubmit(){
    console.log("panel confirm submitted");

  }

  render () {
    let confirmElements = [];
    for(let i = 0 ; i < this.props.listItems.length;i++){
      confirmElements.push(
        <li className="panel__listItem" key={i + "panelConfirm"}>{this.props.listItems[i]}</li>
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
          <button className="panel__btn--submit" onClick={this.onSubmit}>{this.props.confirmMsg}</button>
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
      sliderVals: startingVals
    }
  }

  setMood(event) {
    console.log(event.target.value);
  }

  handleChange(val,idx){
    let newSliderVals = this.state.sliderVals.slice();
    newSliderVals[idx] = val;

    this.setState({
      "sliderVals": newSliderVals
    })
    console.log(newSliderVals);
  }

  onSubmit(){
    console.log("panel Eval submitted");
    let evalSliders = [];
    for(let i = 0; i < this.props.evalFields.length;i++){
      let curField = this.props.evalFields[i];
      /*evalSliders.push({
        "evalType": curField[i].evalType,
        "evalVal": 
      });*/
    }

    let evalObj = {
      "evalDatetime": new Date().getTime(),
      "evalSliders": evalSliders,
      "comments": evalObj.comments,
      "evalLocation": "web"
    }
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
        <div className="panel--eval__cell" key={i + "panelEval"}>
          <p className="panel__topic">{allTitles[i]}</p>
          <Slider
          handleChange={this.handleChange.bind(this)}
          intervalRadius={curField.intervalRadius}
          intervalCenter={curField.intervalCenter}
          startPos={curField.startPos}
          idx={i} />
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
        <TextBox/>
        <button className="panel__btn--submit" style={{marginLeft: 35}} onClick={this.onSubmit}>{this.props.submitMsg}</button>
      </div>
     )
  }
}

export{
  PanelCheckbox,
  PanelEval,
  PanelConfirm
}