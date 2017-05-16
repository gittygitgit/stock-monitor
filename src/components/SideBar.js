import React from 'react';
import { Button } from 'react-bootstrap';

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
      <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
      <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
    </div>
  );  
}

export default SideBar;
