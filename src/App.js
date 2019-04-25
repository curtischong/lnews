import React from 'react';
import './App.css';
import {CardLineGraph, CardText, CardTextLink} from './cards/Card'
import {PanelSurvey, PanelCheckbox, PanelConfirm} from './panels/Panel'
import axios from 'axios';
//TODO: move this to a config file
const configFile = {
  "debug": 0,
  "post_to_server": true
}

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
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
      cards: [],
      panels: []
    }

    /*
    for(let i = 0;i < 4;i++){
      this.state.cards.push(
        <CardLineGraph
          title = "Heartrate"
          chartData = {this.state.cchartData}
          key={i}
        />
      )
    }
    */

    this.fetchCards();
  }

  fetchCards(){
    if(!configFile.post_to_server){
      return;
    }
    axios.get(`http://localhost:5000/get_card`)
    .then(res => {
      let cards = res.data; 
      var newCards = this.state.cards.slice();
      var newPanels = this.state.panels.slice();

      for(let i = 0; i < cards.length;i++){
        let card = cards[i];
        if(card.cardType === "text"){
          newCards.push(
            <CardText
            title={card.title}
            desc={card.desc}
            img ={card.img}
            key={i + "food"}
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
            key={i + "link"}
            />
          )


        /* Panels */
        }else if(card.cardType === "panelCheckbox"){
          newPanels.push(
            <PanelCheckbox
            title={card.title}
            img ={card.img}
            key={i + "checkbox"}
            listItems={card.listItems}
            />
          )
        }else if(card.cardType === "panelConfirm"){
          newPanels.push(
            <PanelConfirm
            confirmMsg={card.confirmMsg}
            title={card.title}
            img ={card.img}
            key={i + "confirm"}
            listItems={card.listItems}
            />
          )
        }
      }

      this.setState({
        cards: newCards,
        panels: newPanels
      })
    });
  }

  componentDidMount(){
  }

  render () {
    return (
      <div className="App">
        <div className="panelFeed">
          {this.state.panels}
        </div>
        <div className="newsFeed">
          {/*<CardLineGraph
            title = "Heartrate"
            chartData = {this.state.cchartData}
            key="sd"
          />*/}
          {this.state.cards}
        </div>
      </div>
    );
  }
}

export default App;
