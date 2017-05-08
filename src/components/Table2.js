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

  render() {
    console.log("Table2::render");
    if (this.props.firms == null) {
      return null;
    }
    if (this.props.firms.size === 0) {
      return null;
    }
    let rows = this.props.firms.toIndexedSeq();
    console.log(rows); 
    console.log(rows.get(0));
    return (
      <Table
        rowsCount={this.props.firms.size}
        rowHeight={30}
        width={400}
        height={500}
        headerHeight={30}
        >
      <Column
        header={<Cell>Firm</Cell>}
        cell={
          ({rowIndex}) => (
            <Cell>{rows.get(rowIndex)["name"]}
        </Cell>)}
        width={200} />
      <Column
        header={<Cell>Last</Cell>}
        cell={
          ({rowIndex}) => (
            <Cell>{rows.get(rowIndex)["last"]}
        </Cell>)}
        width={200} />
      </Table>
    );
  }
}

export default Table2;
