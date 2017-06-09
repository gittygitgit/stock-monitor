import React from 'react';
import SQFGrid from '../components/SQFGrid';
const {Table, Column, Cell} = require('fixed-data-table-2');
import SideBar from '../components/SideBar';
import FirmApi from '../api/FirmApi'

class AppView extends React.Component {

  constructor(props) {
    super(props);
    console.log("AppView::ctor");
    console.log(props);
    this.firmApi = FirmApi;
    this.style = {
      width: 1800,
      margin: '0 auto 10px',
      position: 'fixed',
      left: 0
    };
  }

  componentDidMount() {
    this.props.actions.initialize(); 
    this.timerId = setInterval(
      () => {
        let e = this.firmApi.firmEvent();
        this.props.actions.firmEvent(e);
      },
      500
    );
  }

  render(props) {
    console.log("AppView::render");
    return (
    <div id="wrapper">
      <SideBar last={this.props.last} totQuotes={this.props.totQuotes} totBlocks={this.props.totBlocks} totPurges={this.props.totPurges} totUndPurges={this.props.totUndPurges}/>
      <div id="page-content-wrapper" className="container-fluid" style={this.style}>
        <SQFGrid width={800} {...this.props}></SQFGrid>
      </div>
    </div>
    );
  }
}

export default AppView;
