"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import FirmStore from '../stores/FirmStore'
import TextCell from './TextCell'
import StockMonitorCell from './StockMonitorCell'
import SQFGridHeaderCell from './SQFGridHeaderCell'
import SortDir from './SortDir';

class SQFPortGrid extends React.Component {
  constructor(props) {
    super(props);
    this.changeStyle = {
      background: 'red'
    };
    this._onSortChange = this._onSortChange.bind(this);
  }

  componentDidMount() {
    console.log("SQFPortGrid::componentDidMount");
  }

  _onSortChange(colKey, colDir) {
    console.log("SQFPortGrid::onSort [colKey=%s, colDir=%s]", colKey, colDir);
    
    console.log(this.props.ports);
    let sorted = this.props.portList.sortBy(
      (v, k) => {
        console.log(v.get(colKey));
        return v.get(colKey); 
      },
      (a, b) => {
        let result = 0;
        if ( a < b ) {
          result = -1; 
        } else if ( a == b ) {
          result = 0;
        } else {
          result = 1;
        }
        if (result !== 0 && colDir === SortDir.DESC) {
          result *= -1;
        }
        return result;
      }
    ); 
    console.log(sorted); 
    this.props.actions.sort(sorted, colKey, colDir);
  }

  render() {
    console.log("SQFPortGrid::render");
    debugger;
    if (this.props.portList== null) {
      return null;
    }
    if (this.props.portList.size === 0) {
      return null;
    }
    let rows = this.props.portList;
    return (
      <Table
        rowsCount={this.props.portList.size}
        rowHeight={30}
        width={1330}
        height={500}
        allowCellsRecycling={true}
        rowClassNameGetter={
          (index) => "myrow"
        }
        headerHeight={30} >
        <Column
          columnKey="last"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("last")}>Last</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="last" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="port"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("port")}>Port</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="port" width={75} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="ring"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("ring")}>Ring</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ring" width={75} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column columnKey="numBlocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("numBlocks")}>Blk</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numBlocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column columnKey="rateCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("rateCurrent")}>Curr R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rateCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("rate1Min")}>1min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate5min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("rate5min")}>5min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="qlCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("qlCurrent")}>Curr QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="qlCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="ql1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("ql1Min")}>1min QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ql1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limitCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("limitCurrent")}>Curr L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limitCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("limit1Min")}>1min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit5Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("limit5Min")}>5min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="quotes"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("quotes")}>Quotes</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="quotes" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="blocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("blocks")}>Blocks</SQFGridHeaderCell >}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="blocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="purges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("purges")}>Purges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="purges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="undPurges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.sortInfo.get("undPurges")}>UndPurges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="undPurges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
      </Table>
    );
  }
}

export default SQFPortGrid;
