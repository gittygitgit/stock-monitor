"use strict"

import React from 'react'
import { Cell } from 'fixed-data-table-2'
//var diff = require('immutable-diff')
var diff = require('immutablediff');

class StockMonitorCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dirty:false
    };
  }

  
  componentWillReceiveProps(nextProps) {
    //console.log("StockMonitorCell::componentWillReceiveProps");

    const { rows, rowIndex, field } = this.props;
    const { rows: rowsNext, rowIndex: rowIndexNext, field: fieldNext } = nextProps;

    let now  = rows.get(rowIndex).get(field);
    let next = rowsNext.get(rowIndexNext).get(fieldNext);

    if (now !== next) {
      console.log("The value of %s has changed [old-val: %s, new-val: %s]", field, now, next);

      this.setState({
	dirty: true
      });
    } else {
      this.setState({
        dirty: false
      });
    }

  }

  render() {
    //console.log("StockMonitorCell::render");
    const {rows, rowIndex, field, width, ...props} = this.props;

    let activeRow = rows.get(rowIndex).get("changed") === true;
    let dirty = this.state.dirty === true;

    return (
      <Cell
	className={
	  dirty ? 'changed' : activeRow ? 'active-row' : 'mycell'
	}
        width={width}
	 {...props}>{rows.get(rowIndex).get(field)}
      </Cell>);
  }
}

export default StockMonitorCell;
