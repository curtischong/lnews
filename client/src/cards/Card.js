import React from 'react';

import './Card.css';
import { Line,Pie } from "react-chartjs-2";
import * as httpManager from '../httpManager';
import config, {} from '../config';


const REFRESH_GET_CARD_AMOUNT = 5
class NewsFeed extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cardAmount: 5,
      cardOffset: 0,
      cards: [],
      cchartData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },
    }
    this.fetchCards();
  }


  fetchCards(){
    if(!config.fetchCards){
      return;
    }
    httpManager.getCards(this.state.cardAmount, this.state.cardOffset)
    .then(res => {
      this.setState({
        cardOffset: this.state.cardOffset + REFRESH_GET_CARD_AMOUNT,
      })
      let cards = res.data;
      var newCards = this.state.cards.slice();

      for(let i = 0; i < cards.length;i++){
        let card = JSON.parse(cards[i].card);
        let cardTime = parseInt(cards[i].unixt);
        if(card.cardType === "text"){ // TODO: make these consistent with the panel types
          newCards.push(
            <CardText
            title={card.title}
            desc={card.desc}
            img ={card.img}
            key={cardTime + "_text"}
            />
          )
        }else if(card.cardType === "textLink"){
          newCards.push(
            <CardTextLink
            title={card.title}
            desc={card.desc}
            img ={card.img}
            link={card.link}
            linkDisplay={card.linkDisplay}
            key={cardTime + "_textLink"}
            />
          )
        }
      }


      this.setState({
        cards: newCards
      })

    });
  }

  render() {
    return(
      <div className="newsFeed">
        <CardLineGraph
          title = "Heartrate"
          chartData = {this.state.cchartData}
          key="sd"/>
        {this.state.cards}
      </div>
    )
  }
}

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

/*
class CardCongratulations extends React.Component{
  render(){
    return (
      <div className="card card--text">
        <div className="card__con">
          <img className="img--card--small" src={this.props.img} alt="images/clap.png"></img>
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
}*/

/*
class CardCaughtUp extends React.Component{
  render(){
    return(
      <div class="card card--noCards">
        <p> You're all caught up :) </p>
      </div>
    )
  }
};*/

export {
  NewsFeed
}
