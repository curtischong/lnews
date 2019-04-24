import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardLineGraph from './cards/Card'




class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
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
      }
    }
  }



  render () {
    return (
      <div>
        <div className="App">
          <div className="padding"></div>
          <CardLineGraph
            chartData = {this.state.cchartData}
          />
        </div>
      </div>
    );
  }
}

export default App;
