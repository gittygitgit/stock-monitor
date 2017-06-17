import React from 'react';
import SQFMainDash from '../components/SQFMainDash';
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
//    this.props.actions.clickGroupRow(2);
    this.timerId = setInterval(
      () => {
        let e = this.firmApi.firmEvent();
        this.props.actions.firmEvent(e);
      },
      300
    );
  }

  render(props) {
    console.log("AppView::render");
    return (
    <div id="wrapper">
      <div id="page-content-wrapper" className="container-fluid" style={this.style}>
        <SQFMainDash width={800} {...this.props}></SQFMainDash>
        <SideBar last={this.props.last} totQuotes={this.props.totQuotes} totBlocks={this.props.totBlocks} totPurges={this.props.totPurges} totUndPurges={this.props.totUndPurges}/>
      </div>
    </div>
    );
  }
}

export default AppView;
