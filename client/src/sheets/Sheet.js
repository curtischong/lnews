import React from 'react';
import {Peaks} from './Peaks';

import './Sheet.css';

class SheetMenu extends React.Component{

  render(){
    return (
    < div className="sheet__con" >
      <div className="sheet__menu">
        <img className="img--sheet__menu" src="images/lpeaks.png" alt="lpeaks logo"/>
        <img className="img--sheet__menu" src="images/lair.png" alt="lair logo"/>
      </div>
      <div className="sheet__body">
        <Peaks/>
      </div>
    </div>
    )
  }
};

export{
  SheetMenu
}