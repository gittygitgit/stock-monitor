import React from 'react';
import Table2 from '../components/Table2';
const {Table, Column, Cell} = require('fixed-data-table-2');
import SideBar from './SideBar';

class AppView extends React.Component {

  constructor(props) {
    super(props);
    console.log("AppView::ctor");
    console.log(props);
    this.style = {
      width: 1800,
      margin: '0 auto 10px',
      position: 'fixed',
      left: 1000
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
      <div id="page-content-wrapper" className="container-fluid" style={this.styles}>
        <Table2 width={800} {...this.props}></Table2>
      </div>
    </div>
    );
  }
}

export default AppView;
