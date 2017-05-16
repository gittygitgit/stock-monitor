import React from 'react';
import SQFGrid from '../components/SQFGrid';
const {Table, Column, Cell} = require('fixed-data-table-2');
import SideBar from '../components/SideBar';

class AppView extends React.Component {

  constructor(props) {
    super(props);
    console.log("AppView::ctor");
    console.log(props);
    this.style = {
      width: 1800,
      margin: '0 auto 10px',
      position: 'fixed',
      left: 0
    };
  }

  componentDidMount() {
    this.props.actions.initialize(); 
  }

  render(props) {
    console.log("AppView::render");
    return (
    <div id="wrapper">
      <SideBar/>
      <div id="page-content-wrapper" className="container-fluid" style={this.style}>
        <SQFGrid width={800} {...this.props}></SQFGrid>
      </div>
    </div>
    );
  }
}

export default AppView;
