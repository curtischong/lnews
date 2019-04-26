import React from 'react';

import {Checkbox, Slider} from "../elements/Elements"
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
  setMood(event) {
    console.log(event.target.value);
  }

  handleChange(val){
    console.log(val);
  }

  onSubmit(){
    console.log("panel Eval submitted");
  }

  render() {
    console.log(this.props);
    return (
      <div className="panel">
        <div className="panel__top">
          <img className="img--panel--small" src={this.props.img} alt="images/thinking.png"></img>
          <h3 className="panel__header">{this.props.title}</h3>
        </div>
        <div className="panel__content">
            <Slider
            handleChange={this.handleChange.bind(this)}
            intervalRadius={this.props.intervalRadius}
            intervalCenter={this.props.intervalCenter}
            startPos={this.props.startPos}
            />
        </div>
        <button className="panel__btn--submit" onClick={this.onSubmit}>{this.props.submitMsg}</button>
      </div>
     )
  }
}

export{
  PanelCheckbox,
  PanelEval,
  PanelConfirm
}