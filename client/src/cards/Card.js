import React from 'react';

import './Card.css';
import { Line,Pie } from "react-chartjs-2";


class CardLineGraph extends React.Component{
  render () {
    return (
      <div className="card card--lineGraph">
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
      <div className="card card--pieGraph">
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
      <div className="card card--text">
        <div className="card__con">
          <img className="img--card--small" src={this.props.img} alt="images/thinking.png"></img>
          <div className="card--text__content">
            <h3 className="card--text__content__header">{this.props.title}</h3>
            <p className="card--text__content__desc"> {this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
};

class CardTextLink extends React.Component{
  render () {
    return (
      <div className="card card--text">
        <div className="card__con">
          <img className="img--card--small" src={this.props.img} alt="images/thinking.png"></img>
          <div className="card--text__content">
            <h3 className="card--text__content__header">{this.props.title}</h3>
            <p className="card--text__content__desc"> {this.props.desc}</p>
            < a className = "card--text__content__link"
            href = {
              this.props.link
            }
            target = "_blank"
            rel = "noopener noreferrer" > { this.props.linkDisplay } </a>
          </div>
        </div>
      </div>
    );
  }
};

class NoCards extends React.Component{
  render(){
    return(
      <div class="card card--noCards">
        <p> Damn you scroll fast :) Live a good life! </p>
      </div>
    )
  }
};

export {
  CardLineGraph,
  CardPieGraph,
  CardText,
  CardTextLink,
  NoCards
}
