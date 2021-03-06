"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import FirmStore from '../stores/FirmStore'
import TextCell from './TextCell'
import StockMonitorCell from './StockMonitorCell'
import SQFGridHeaderCell from './SQFGridHeaderCell'

class SQFPortEventsGrid extends React.Component {
  constructor(props) {
    super(props);
    this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
  }

  componentDidMount() {
    console.log("SQFPortEventGrid::componentDidMount");
  }

  _rowClassNameGetter(rowindex) {
    return 'myrow';
  }

  render() {
    console.log("SQFPortEventGrid::render");
    if (this.props.portEvents== null) {
      return null;
    }
    if (this.props.portEvents.size === 0) {
      return null;
    }
    let rows = this.props.portEvents.valueSeq();
    return (
      <Table
        rowsCount={rows.size}
        rowHeight={30}
        width={340}
        height={460}
        allowCellsRecycling={true}
        rowClassNameGetter={this._rowClassNameGetter}
        headerHeight={30} >
        <Column
          columnKey="time"
          header={<SQFGridHeaderCell>Time</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="time" width={90} {...this.props}></StockMonitorCell>)
          }
          width={90} />
        <Column
          columnKey="portName"
          header={<SQFGridHeaderCell>Port</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="portName" width={65} {...this.props}></StockMonitorCell>)
          }
          width={65} />
        <Column
          columnKey="ringName"
          header={<SQFGridHeaderCell>Ring</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ringName" width={50} {...this.props}></StockMonitorCell>)
          }
          width={50} />
        <Column columnKey="eventName"
          header={<SQFGridHeaderCell>Info</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="eventName" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
      </Table>
    );
  }
}

export default SQFPortEventsGrid;
