import React from 'react';
import { Button } from 'react-bootstrap';
import SummaryTotals from './SummaryTotals';

function SideBar(props) {
  const wellStyles = {
    width: 300,
    margin: '0 auto 10px', 
    position: 'fixed',
    left: 1140,
    top: 0
  };


  return (
    <div className="well" style={wellStyles}>
      {
      /*
	<Button bsStyle="primary" bsSize="large" block>Block level button</Button>
	<Button bsStyle="primary" bsSize="large" block>Block level button</Button>
      */
      }
      <SummaryTotals summaryInfo={props.summaryInfo}></SummaryTotals>
    </div>
  );  
}

export default SideBar;
