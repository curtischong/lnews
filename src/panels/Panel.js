import React from 'react';

import {Checkbox} from "../elements/Elements"
import './Panel.css';

class PanelCheckbox extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      checkCount: 0,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.checkCount != this.state.checkCount){
      this.checkChecked();
    }
  }

  checkChecked(){
    if(this.props.checkboxes.length == this.state.checkCount){
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
    for(let i = 0 ; i < this.props.checkboxes.length;i++){
      checkboxElements.push(
        <Checkbox
        title = {this.props.checkboxes[i]}
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

class PanelSurvey extends React.Component{
  setMood(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="panel">
        <div onChange={this.setMood.bind(this)}>
          <input type="radio" value="0" name="mood"/> 0
          <input type="radio" value="1" name="mood"/> 1
          <input type="radio" value="2" name="mood"/> 2
          <input type="radio" value="3" name="mood"/> 3
          <input type="radio" value="4" name="mood"/> 4
        </div>
      </div>
     )
  }


}

export{
  PanelCheckbox,
  PanelSurvey
}