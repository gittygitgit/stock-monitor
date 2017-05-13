"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import FirmStore from '../stores/FirmStore'
import TextCell from './TextCell'
import FirmApi from '../api/FirmApi'

class Table2 extends React.Component {
  constructor(props) {
    super(props);
    this.firmApi = FirmApi;
    this.changeStyle = {
      background: 'red'
    };
  }

  componentDidMount() {
    /*this.timerId = setInterval(
      () => this.props.onAddFirm("abc"),
      1000
    );*/
    console.log("Table2::componentDidMount");
    this.timerId = setInterval(
      () => {
        let e = this.firmApi.firmEvent();
        this.props.actions.firmEvent(e);
      },
      1000
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("Table2::componentWillReceiveProps");
    let now     = this.props.firms;
    let next    = nextProps.firms;

    for (let k of now.keys()) {
      //detect changed firms
      if (!now.get(k).equals(next.get(k))) {
        console.log(k + " changed.");
        
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Table2::componentWillUpdate");
  }

  render() {
    console.log("Table2::render");
    if (this.props.firms == null) {
      return null;
    }
    if (this.props.firms.size === 0) {
      return null;
    }
    let rows = this.props.firms.toIndexedSeq();
    return (
      <Table
        rowsCount={this.props.firms.size}
        rowHeight={30}
        width={900}
        height={500}
        headerHeight={30}
        >
        <Column
          header={<Cell>Last</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : ''
                }  
                width={500}
                >{rows.get(rowIndex).get("last")}
          </Cell>)}
          width={200} />

        <Column
          header={<Cell>Grp</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : ''
                }
                width={800}
              >{rows.get(rowIndex).get("name")}
          </Cell>)}
          width={200} />
         <Column
           header={<Cell>Blk</Cell>}
           cell={
             <Cell 
               width={200}
             >1</Cell>
           }
           width={200}
         /> 
      </Table>
    );
  }
}

export default Table2;
