"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import FirmStore from '../stores/FirmStore'
import TextCell from './TextCell'
import StockMonitorCell from './StockMonitorCell'
import SQFGridHeaderCell from './SQFGridHeaderCell'
import SortDir from './SortDir';

class SQFGrid extends React.Component {
  constructor(props) {
    super(props);
    this.changeStyle = {
      background: 'red'
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
  }

  componentDidMount() {
    console.log("SQFGrid::componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    console.log("SQFGrid::shouldComponentUpdate=");
    console.log(nextProps);
    if (nextProps.selectedGroup) {
      console.log("SQFGrid::shouldComponentUpdate=false");
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    //console.log("SQFGrid::componentWillReceiveProps");
    let now     = this.props.groups;
    let next    = nextProps.groups;

    for (let k of now.keys()) {
      //detect changed groups 
      if (!now.get(k).equals(next.get(k))) {
//        console.log(k + " changed.");
        
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log("SQFGrid::componentWillUpdate");
  }

  _onSortChange(colKey, colDir) {
    console.log("SQFGrid::onSort [colKey=%s, colDir=%s]", colKey, colDir);
    
    console.log(this.props.groups);
    let sorted = this.props.groups.sortBy(
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
    this.props.actions.sortGroups(sorted, colKey, colDir);
  }

  openPortGrid(e, index) {
    console.log(index);
 
    this.props.actions.clickGroupRow(index);
  }

  _rowClassNameGetter(rowindex) {
    return 'myrow group-row';
  }

  render() {
    //console.log("SQFGrid::render");
    if (this.props.groups== null) {
      return null;
    }
    if (this.props.groups.size === 0) {
      return null;
    }
    let rows = this.props.groups.toIndexedSeq();
    return (
      <Table
        rowsCount={this.props.groups.size}
        rowHeight={30}
        width={1100}
        height={400}
        allowCellsRecycling={true}
        onRowClick={(e, index) => this.openPortGrid(e, index)}
        rowClassNameGetter={this._rowClassNameGetter}
        headerHeight={30} >
        <Column
          columnKey="last"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("last")}>Last</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="last" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column
          columnKey="groupName"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("groupName")}>Grp</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="groupName" width={75} {...this.props}></StockMonitorCell>)
          }
          width={100} />
        <Column columnKey="blocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("blocks")}>Blk</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="blocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={75} /> 
        <Column columnKey="rateCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("rateCurrent")}>Curr R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rateCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("rate1Min")}>1min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="rate5Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("rate5Min")}>5min R</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="rate5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="qlCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("qlCurrent")}>Curr QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="qlCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="ql1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("ql1Min")}>1min QL</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="ql1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limitCurrent"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("limitCurrent")}>Curr L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limitCurrent" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit1Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("limit1Min")}>1min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit1Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="limit5Min"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("limit5Min")}>5min L</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="limit5Min" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numQuotes"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("numQuotes")}>Quotes</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numQuotes" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numBlocks"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("numBlocks")}>Blocks</SQFGridHeaderCell >}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numBlocks" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numPurges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("numPurges")}>Purges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numPurges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
        <Column columnKey="numUndPurges"
          header={<SQFGridHeaderCell onSortChange={this._onSortChange} sortDir={this.props.groupSortInfo.get("numUndPurges")}>UndPurges</SQFGridHeaderCell>}
          cell={
            ({rowIndex}) => (<StockMonitorCell rowIndex={rowIndex} rows={rows} field="numUndPurges" width={100} {...this.props}></StockMonitorCell>)
          }
          width={100} /> 
      </Table>
    );
  }
}

export default SQFGrid;
