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

export{
  Checkbox
}