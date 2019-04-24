import React from 'react';

import './Card.css';
import { Line } from "react-chartjs-2";


class CardLineGraph extends React.Component{

/*  constructor(props){
    super(props);

    this.state={

    }
  }*/

  render () {
    return (
      <div className="card--lineGraph">
        <h3>Heartrate</h3>
        <Line className="chart--lineGraph"
          data={this.props.chartData}
        />
      </div>
    );
  }
};

export default CardLineGraph;