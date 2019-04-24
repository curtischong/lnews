import React from 'react';

import './Card.css';
import { Line,Pie } from "react-chartjs-2";


class CardLineGraph extends React.Component{
  render () {
    return (
      <div className="card--lineGraph">
        <h3>{this.props.title}</h3>
        <Line className="chart--lineGraph"
          data={this.props.chartData}
        />
      </div>
    );
  }
};

class CardPieGraph extends React.Component{
  render () {
    return (
      <div className="card--pieGraph">
        <h3>{this.props.title}</h3>
        <Pie className="chart--pieGraph"
          data={this.props.chartData}
        />
      </div>
    );
  }
};

//TODO: there has to be a better way to handle these alt images. A config somewhere?
class CardText extends React.Component{
  render () {
    return (
      <div className="card--text">
        <img className="img--card--small" src={this.props.img} alt="images/thinking.png"></img>
        <div className="card--text__content">
          <h3 className="card--text__content__header">{this.props.title}</h3>
          <p className="card--text__content__desc"> {this.props.desc}</p>
        </div>
      </div>
    );
  }
};

class NoCards extends React.Component{
  render(){
    return(
      <div class = "card--noCards">
        <p> Damn you scroll fast :) Live a good life! </p>
      </div>
    )
  }
};

export {
  CardLineGraph,
  CardPieGraph,
  CardText,
  NoCards
}
