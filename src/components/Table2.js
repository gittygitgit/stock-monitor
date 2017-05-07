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
    this.props.addFirm({firm: "GSM1"};
    this.props.addFirm({firm: "WOL1"};
    this.timerId = setInterval(
      () => this.props.firmEvent(this.firmApi.firmEvent()),
      1000
    );
    console.log(this.props);
  }

  render() {
    if (this.props.firms.size === 0) {
      return null;
    }
    console.log(this.firmApi);
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
            <Cell>{this.props.firms.get(rowIndex)["firm"]}
        </Cell>)}
        width={200} />
      <Column
        header={<Cell>Last</Cell>}
        cell={
          ({rowIndex}) => (
            <Cell>{this.props.firms.get(rowIndex)["last"]}
        </Cell>)}
        width={200} />
      </Table>
    );
  }
}

export default Table2;
