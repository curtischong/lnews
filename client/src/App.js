import React from 'react';
import './App.css';
import {CardLineGraph, CardText, CardTextLink} from './cards/Card'
import {PanelEval, PanelCheckbox, PanelConfirm} from './panels/Panel'
import * as httpManager from './httpManager';
import config, {} from './config';

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
    console.log(`isDev: ${config.isDev}`)
    console.log(`logV: ${config.logv}`)

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
    if(!config.fetchCards){
      return;
    }
    httpManager.getCards()
    .then(res => {
      let cards = JSON.parse(res.data.cards);
      let panels = JSON.parse(res.data.panels);
      var newCards = this.state.cards.slice();
      var newPanels = this.state.panels.slice();

      // This is poor design and doesn't really follow proper design patterns
      // We shouldn't assign a card type. The parent should accomodate for it
      // I think I should create a parent card that has title and desc and
      // leave the rest of the fields for the children cards
      for(let i = 0; i < cards.length;i++){
        let card = JSON.parse(cards[i]);
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
        }
      }

      for(let i = 0; i < panels.length;i++){
        let panel = JSON.parse(panels[i]);
        console.log(panel)
        if(panel.panelType === "panelCheckbox"){
          newPanels.push(
            <PanelCheckbox
            title={panel.title}
            img ={panel.img}
            key={i + "checkbox"}
            listItems={panel.listItems}
            />
          )
        }else if(panel.panelType === "panelConfirm"){
            console.log("hiasd");
          newPanels.push(
            <PanelConfirm
            confirmMsg={panel.confirmMsg}
            title={panel.title}
            img ={panel.img}
            key={i + "confirm"}
            listItems={panel.listItems}
            />
          )
        } else if (panel.panelType === "panelEval"){
          newPanels.push(
            <PanelEval
              title = {panel.title}
              img ={panel.img}
              evalFields = {panel.evalFields}
              submitMsg = {panel.submitMsg}
            key={i + "eval"}
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
          <CardLineGraph
            title = "Heartrate"
            chartData = {this.state.cchartData}
            key="sd"
          />
          {this.state.cards}
        </div>
      </div>
    );
  }
}

export default App;
