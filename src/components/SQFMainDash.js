"use strict"

import React from 'react';
import SQFGrid from './SQFGrid';
import SQFPortGrid from './SQFPortGrid';
import { Modal, Button } from 'react-bootstrap'; 
class SQFMainDash extends React.Component {
  
  constructor(props) {
    super(props);
    this.closePorts= this.closePorts.bind(this);
  }

  closePorts() {
    console.log("SQFMainDash::onClose");
    this.props.actions.onClosePorts();
  }

  render() {
    
//    let close = () => this.props.actions.onClosePorts();

    return  (
      <div id="foo">
	<SQFGrid width={800} {...this.props}></SQFGrid>
	<Modal
	  show={this.props.selectedGroup}
	  onHide={this.closePorts}
	  aria-labelledby="contained-modal-title" 
          animation={true}
          dialogClassName="port-modal"
	>
	  <Modal.Header closeButton>
	    <Modal.Title id="contained-modal-title">Port Group: {this.props.selectedGroup}</Modal.Title>
	  </Modal.Header>
	  <Modal.Body>
	    <SQFPortGrid portList={this.props.ports.valueSeq()} {...this.props}></SQFPortGrid>
	  </Modal.Body>
	  <Modal.Footer>
	    <Button onClick={this.closePorts}>Close</Button>
	  </Modal.Footer>
	</Modal>
      </div>
    );
  }
}

export default SQFMainDash;
