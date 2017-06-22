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
    this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
  }

  componentDidMount() {
    console.log("SQFPortGrid::componentDidMount");
  }

  _onSortChange(colKey, colDir) {
    console.log("SQFPortGrid::onSort [colKey=%s, colDir=%s]", colKey, colDir);
    
    this.props.actions.sortPorts(colKey, colDir);
  }

  _rowClassNameGetter(rowindex) {
    return 'myrow';
  }

  render() {
    console.log("SQFPortGrid::render");
    if (this.props.ports== null) {
      return null;
    }
    if (this.props.ports.size === 0) {
      return null;
    }
    let rows = this.props.ports.valueSeq();
    return (
      <Table
        rowsCount={rows.size}
        rowHeight={30}
        width={1330}
        height={500}
        allowCellsRecycling={true}
        rowClassNameGetter={this._rowClassNameGetter}
        headerHeight={30} >
        <Column
          columnKey="last"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("last")}>Last</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="last" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="name"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("name")}>Port</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="name" width={75} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="ringName"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("ringName")}>Ring</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ringName" width={75} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column columnKey="blocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("blocks")}>Blk</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="blocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column columnKey="rateCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("rateCurrent")}>Curr R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rateCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("rate1Min")}>1min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate5Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("rate5Min")}>5min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="qlCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("qlCurrent")}>Curr QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="qlCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="ql1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("ql1Min")}>1min QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ql1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limitCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("limitCurrent")}>Curr L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limitCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("limit1Min")}>1min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit5Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("limit5Min")}>5min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numQuotes"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("numQuotes")}>Quotes</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numQuotes" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numBlocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("numBlocks")}>Blocks</SQFGridHeaderCell >}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numBlocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numPurges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("numPurges")}>Purges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numPurges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numUndPurges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.portSortInfo.get("numUndPurges")}>UndPurges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numUndPurges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
      </Table>
    );
  }
}

export default SQFPortGrid;
