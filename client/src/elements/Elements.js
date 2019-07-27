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
    let sliderClass= ""
    let sliderValClass = ""
    switch (props.sliderType){
      case "panel":
        sliderClass = "element--slider--panel"
        //this.state.sliderConClass = "element--slider__con--panel"
        sliderValClass = "element--slider__val--panel"
        break;
      case "peaks":
        sliderClass = "element--slider--peaks"
        //this.state.sliderConClass = "element--slider__con--peaks"
        sliderValClass = "element--slider__val--peaks"
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
      <div className='element--slider__con'>
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
    let textBoxClass = ""
    switch (props.textBoxType){
      case "panel":
        textBoxClass = "element--textbox--panel"
        break;
      case "peaks":
        textBoxClass = "element--textbox--peaks"
        break;
      default:
    }
    console.log(props)
    this.state = {
      textBoxClass: textBoxClass,
      textboxHeight: 17,
    }
  }

  onTextBoxChanged(event){
    this.props.handleChange(event.target.value);
    this.setState({
      textboxHeight: event.target.scrollHeight - 4
    })
  }

  render(){
    let textBoxClasses = classNames('element--textbox', this.state.textBoxClass)
    return(
        <textarea className = {textBoxClasses}
        style = {{ height: this.state.textboxHeight + "px" }}
        value={this.props.value}
        placeholder = {this.props.placeholder}
        onChange={this.onTextBoxChanged.bind(this)}/>
    )
  }
}

class TextField extends React.Component {

  constructor(props){
    super(props);
    let textFieldClass = ""
    switch (props.textFieldType){
      case "panel":
        textFieldClass = "element--textfield--panel"
        break;
      case "peaks":
        textFieldClass = "element--textfield--peaks"
        break;
      default:
    }
    this.state = {
      textBoxClass: textFieldClass,
      textboxHeight: 17,
    }
  }

  onTextFieldchanged(event){
    this.props.handleChange(event.target.value);
    this.setState({
      textboxHeight: event.target.scrollHeight - 4
    })
  }

  render(){
    let textFieldClasses = classNames('element--textfield', this.state.textBoxClass)
    return(
        <input type="text" className = {textFieldClasses}
        value={this.props.value}
        placeholder = {this.props.placeholder}
        onChange={this.onTextFieldchanged.bind(this)}/>
    )
  }
}

export{
  Checkbox,
  Slider,
  TextBox,
  TextField
}