import React from 'react';
import './App.css';
import {CardLineGraph, CardText, CardTextLink} from './cards/Card'
import {PanelEval, PanelCheckbox, PanelConfirm} from './panels/Panel'
import {} from './panels/Panel'
import * as httpManager from './httpManager';
import config, {} from './config';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {SheetMenu} from './sheets/Sheet'

const REFRESH_GET_CARD_AMOUNT = 5
const REFRESH_GET_PANEL_AMOUNT = 5

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
      cardOffset: 0,
      panelOffset: 0,
      cards: [],
      panels: [],
      sheets: {
        "peaks": {
          "skills": [],
          "reviews": []
        },
        "lifeEvent": {
          "marks": []
        }
      }
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

  /*
  fetchSheets(){
    let peaksNewSkills = []
    let peaksNewReviews = []


    //httpManager.getSheets()
    .then(res => {

      peaksNewSkills.push(
        <Sheet/>

      )
      this.setState({
        "peaks": {
          "skills": peaksNewSkills,
          "reviews": peaksNewReviews
        }
      })
    });

  }*/

  fetchCards(){
    if(!config.fetchCards){
      return;
    }
    let getCardsAndPanelsObj = {
      "cardAmount": 5,
      "cardOffset": 0,
      "panelAmount": 5,
      "panelOffset": 0
    }
    console.log(getCardsAndPanelsObj)
    httpManager.getCards(getCardsAndPanelsObj)
    .then(res => {
      this.setState({
        cardOffset: this.state.cardOffset + REFRESH_GET_CARD_AMOUNT,
        panelOffset: this.state.panelOffset + REFRESH_GET_PANEL_AMOUNT,
      })
      let cards = res.data.cards;
      let panels = res.data.panels;
      var newCards = this.state.cards.slice();
      var newPanels = this.state.panels.slice();
      console.log(cards)
      console.log(panels)

      // This is poor design and doesn't really follow proper design patterns
      // We shouldn't assign a card type. The parent should accomodate for it
      // I think I should create a parent card that has title and desc and
      // leave the rest of the fields for the children cards
      for(let i = 0; i < cards.length;i++){
        let card = JSON.parse(cards[i].card);
        let cardTime = parseInt(cards[i].unixt);
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
        console.log(panels[i].panel)
        let panel = JSON.parse(panels[i].panel);
        let panelTime = parseInt(panels[i].unixt, 10);
        if(panel.panelType === "panelCheckbox"){
          newPanels.push(
            <PanelCheckbox
            timePlaced={panelTime}
            title={panel.title}
            img ={panel.img}
            key={i + "checkbox"}
            listItems={panel.listItems}
            />
          )
        }else if(panel.panelType === "panelConfirm"){
          newPanels.push(
            <PanelConfirm
            timePlaced={panelTime}
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
            timePlaced={panelTime}
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
        <div className="stand">
          <SheetMenu>

          </SheetMenu>
          {/*this.state.sheets*/}
        </div>
        <div className="newsFeed">
          <CardLineGraph
            title = "Heartrate"
            chartData = {this.state.cchartData}
            key="sd"
          />
          {this.state.cards}
        </div>
        <div className="panelFeed">
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          {this.state.panels}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
