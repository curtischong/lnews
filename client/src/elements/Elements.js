import React from 'react';
import classNames from 'classnames';

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

  constructor(props){
    super(props);
    switch (props.sliderType){
      case "panel":
        var sliderClass = "element--slider--panel"
        //this.state.sliderConClass = "element--slider__con--panel"
        var sliderValClass = "element--slider__val--panel"
        break;
      case "peaks":
        var sliderClass = "element--slider--peaks"
        //this.state.sliderConClass = "element--slider__con--peaks"
        var sliderValClass = "element--slider__val--peaks"
        break;
      default:
    }
    this.state = {
      sliderClass: sliderClass,
      sliderValClass: sliderValClass,
    }
  }

  onSliderChanged(event){
    switch(this.props.sliderType){
      case "panel":
        this.props.handleChange(event.target.value, this.props.idx);
        break;
      case "peaks":
        this.props.handleChange(event.target.value, this.props.sliderId);
        console.log(event.target.value);
        break;
      default:
    }
  }

  render(){
    let radius = this.props.intervalRadius;
    let center = this.props.intervalCenter;
    let sliderClasses = classNames('element--slider', this.state.sliderClass)
    //let sliderConClasses = classNames('element--slider__con', this.state.sliderClass)
    let sliderValClasses = classNames('element--slider__val', this.state.sliderValClass)
    return(
      <div className='sliderConClasses'>
        <div className={sliderValClasses}>{this.props.pos}</div>
        <input type="range"
        className={sliderClasses}
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