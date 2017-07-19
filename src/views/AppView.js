import React from 'react';
import SQFMainDash from '../components/SQFMainDash';
import SideBar from '../components/SideBar';
import FirmApi from '../api/FirmApi'
const stompClient = require('../websocket-listener');

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
//    this.props.actions.clickGroupRow(2);
/*    this.timerId = setInterval(
      () => {
        let e = this.firmApi.firmEvent();
        this.props.actions.firmEvent(e);
      },
      300
    );
*/
    stompClient.register([
      {route: '/topic/sqf', callback: this.props.actions.onWSMessage}
    ]);
  }

  render(props) {
    console.log("AppView::render");
    return (
    <div id="wrapper">
      <div id="page-content-wrapper" className="container-fluid" style={this.style}>
        <SQFMainDash width={1000} latencyStream={this.props.latencyStream} {...this.props}></SQFMainDash>
        <SideBar summaryInfo={this.props.summaryInfo} portEvents={this.props.portEvents}/>
      </div>
    </div>
    );
  }
}

export default AppView;
