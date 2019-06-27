import React from 'react';

import './Elements.css';

//TODO: move state upwards
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked
    };
  }

  onChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.isChecked !== this.state.isChecked){
      if(this.state.isChecked){
        this.props.handleChecked();
      }else{
        this.props.handleUnchecked();
      }
    }
  }

  render() {
    return (
      <div className="element--checkbox">
        <input className="element--checkbox__box"
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        <label className="element--checkbox__title"> {this.props.title}</label>
      </div>
    );
  }
}

class Slider extends React.Component{

  onSliderChanged(event){
    this.props.handleChange(event.target.value,this.props.idx);
  }

  render(){
    let radius = this.props.intervalRadius;
    let center = this.props.intervalCenter;
    return(
      <div className="element--slider__con">
        <div className="element--slider__val">{this.props.pos}</div>
        <input type="range"
        className="element--slider"
        min={center - radius}
        max={center + radius}
        value={this.props.pos}
        onChange={this.onSliderChanged.bind(this)}/>
      </div>
    )
  }
}

class TextBox extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      textboxVal: this.props.message,
      textboxHeight: 17
    }
  }

  onTextBoxChanged(event){
    this.props.handleChange(event.target.value);
    this.setState({
      textboxHeight: event.target.scrollHeight - 4
    })
  }

  render(){
    return(
        <textarea className = "element--textbox"
        style = {{ height: this.state.textboxHeight + "px" }}
        value={this.props.value}
        placeholder = "Comments?"
        onChange={this.onTextBoxChanged.bind(this)}/>
    )
  }
}

export{
  Checkbox,
  Slider,
  TextBox
}