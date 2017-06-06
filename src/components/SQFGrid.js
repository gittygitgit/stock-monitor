"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import FirmStore from '../stores/FirmStore'
import TextCell from './TextCell'
import StockMonitorCell from './StockMonitorCell'
import FirmApi from '../api/FirmApi'
import SQFGridHeaderCell from './SQFGridHeaderCell'

class SQFGrid extends React.Component {
  constructor(props) {
    super(props);
    this.firmApi = FirmApi;
    this.changeStyle = {
      background: 'red'
    };
    this._onSortChange = this._onSortChange.bind(this);
  }

  componentDidMount() {
    console.log("SQFGrid::componentDidMount");
    this.timerId = setInterval(
      () => {
        let e = this.firmApi.firmEvent();
        this.props.actions.firmEvent(e);
      },
      1000 
    );
  }

  componentWillReceiveProps(nextProps) {
    //console.log("SQFGrid::componentWillReceiveProps");
    let now     = this.props.firms;
    let next    = nextProps.firms;

    for (let k of now.keys()) {
      //detect changed firms
      if (!now.get(k).equals(next.get(k))) {
//        console.log(k + " changed.");
        
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log("SQFGrid::componentWillUpdate");
  }

  _onSortChange(colKey) {
    console.log("SQFGrid::onSort [colKey=%s]", colKey);
    
    console.log(this.props.firms);
    let sorted = this.props.firms.sortBy(
      (v, k) => {
        console.log(v.get(colKey));
        return v.get(colKey); 
      },
      (a, b) => {
        if ( a < b ) {
          return -1; 
        } else if ( a == b ) {
          return 0;
        } else {
          return 1;
        }
      }
    ); 
    console.log(sorted); 
    this.props.actions.sort(sorted);
  }

  render() {
    //console.log("SQFGrid::render");
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
        width={1100}
        height={500}
        allowCellsRecycling={true}
        rowClassNameGetter={
          (index) => "myrow"
        }
        headerHeight={30} >
        <Column
          columnKey="last"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange}>Last</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="last" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="firm"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange}>Grp</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="firm" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} />
        <Column
          header={<Cell>Blk</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numBlocks" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Curr R</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rateCurrent" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>1min R</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate1Min" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>5min R</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate5Min" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Curr QL</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="qlCurrent" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>1min QL</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ql1Min" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Curr L</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limitCurrent" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>1min L</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit1Min" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>5min L</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit5Min" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Quotes</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="quotes" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Blocks</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="blocks" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>Purges</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="purges" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column
          header={<Cell>UndPurges</Cell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="undPurges" width={75} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
      </Table>
    );
  }
}

export default SQFGrid;
