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
      500
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
        width={1100}
        height={500}
        allowCellsRecycling={true}
        rowClassNameGetter={
          (index) => "myrow"
        }
        headerHeight={30} >
        <Column
          header={<Cell>Last</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
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
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={800}
              >{rows.get(rowIndex).get("name")}
          </Cell>)}
          width={200} />
        <Column
          header={<Cell>Blk</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Curr R</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>1min R</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>5min R</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Curr QL</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>1min QL</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Curr L</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>1min L</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>5min L</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Quotes</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Blocks</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>Purges</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
        <Column
          header={<Cell>UndPurges</Cell>}
          cell={
            ({rowIndex}) => (
              <Cell 
                className={
                  rows.get(rowIndex).get("changed") === true ? 'changed' : 'mycell'
                }
                width={200}
              >1</Cell>) }
          width={200} /> 
      </Table>
    );
  }
}

export default Table2;
