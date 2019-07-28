import React from 'react';
import './App.css';
import {NewsFeed} from './cards/Card'
import {PanelFeed} from './panels/Panel'
import config, {} from './config';
import {SheetMenu} from './sheets/Sheet'

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

  componentDidMount(){
  }

  render () {
    return (
      <div className="App">
        <div className="stand">
          <SheetMenu/>
        </div>
        <NewsFeed/>
        <PanelFeed/>
      </div>
    );
  }
}

export default App;
