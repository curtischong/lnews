import React from 'react';

import './Elements.css';

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
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.startPos,
    };
  }

  onSliderMoved(event){
    this.setState({
      sliderValue: event.target.value
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.sliderValue !== this.state.sliderValue){
      this.props.handleChange(this.state.sliderValue);
    }
  }

  render(){
    let radius = this.props.intervalRadius;
    let center = this.props.intervalCenter;
    return(
      <div className="element--slider__con">
        <div className="element--slider__val">{this.state.sliderValue}</div>
        <input type="range"
        className="element--slider"
        min={center - radius}
        max={center + radius}
        value={this.state.sliderValue}
        onChange={this.onSliderMoved.bind(this)}/>
      </div>
    )
  }
}

export{
  Checkbox,
  Slider
}