import React from 'react';
import { Button } from 'react-bootstrap';
import SummaryTotals from './SummaryTotals';

function SideBar(props) {
  const wellStyles = {
    maxWidth: 400, 
    width: 300,
    margin: '0 auto 10px', 
    position: 'fixed',
    zIndex: 1000,
    left: 1140 
  };

  return (
    <div className="well" style={wellStyles}>
      {
      /*
	<Button bsStyle="primary" bsSize="large" block>Block level button</Button>
	<Button bsStyle="primary" bsSize="large" block>Block level button</Button>
      */
      }
      <SummaryTotals last={props.last} totQuotes={props.totQuotes} totBlocks={props.totBlocks} totPurges={props.totPurges} totUndPurges={props.totUndPurges}></SummaryTotals>
    </div>
  );  
}

export default SideBar;
