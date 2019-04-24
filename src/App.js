import React from 'react';
import './App.css';
import {CardLineGraph, CardText} from './cards/Card'
import axios from 'axios';

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
      cards: []
    }
    for(let i = 0;i < 4;i++){
      this.state.cards.push(
        <CardLineGraph
          title = "Heartrate"
          chartData = {this.state.cchartData}
          key={i}
        />
      )
    }
      this.state.cards.push(
        <CardText
        title="Eat!"
        desc="Eggs ham, maybe? bread? idk you haven't eaten yet man."
        img = "images/food.png"
        key={new Date().getDate()}
        />
      )
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/get_card`)
    .then(res => {
      console.log(res)
    });
  }

  render () {
    return (
      <div>
        <div className="App">
          <div className="padding"></div>
            <div className="newsFeed">
              {this.state.cards}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
