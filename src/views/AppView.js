import React from 'react';
import Table2 from '../components/Table2';
const {Table, Column, Cell} = require('fixed-data-table-2');
import SideBar from './SideBar';

console.log("AppView");
function AppView(props) {
  const styles = {
    width: 1800,
    margin: '0 auto 10px',
    position: 'fixed',
    left: 0
  };

  return (
    <div id="wrapper">
      <SideBar/>
      <div id="page-content-wrapper" className="container-fluid" style={styles}>
        <Table2 width={800} {...props}></Table2>
      </div>
    </div>
  );  
}

export default AppView;
