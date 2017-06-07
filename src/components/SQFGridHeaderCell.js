import React from 'react';
const {Cell} = require('fixed-data-table-2')
import SortDir from './SortDir';
/*
 * Supports sorting. 
 *
 * props:
 * sortCol
 * sortDir
 * onSortChange
 */
class SQFGridHeaderCell extends React.Component{
  constructor(props) {
    super(props);
    console.log("SQFGridHeaderCell::ctor");
    console.log(props.sortDir);
    this._onSortChange = this._onSortChange.bind(this) 
  }

  reverseSortDirection(sortDir) {
    return sortDir === SortDir.DESC ? SortDir.ASC : SortDir.DESC;
  }

  _onSortChange(e) {
    console.log("SQFGridHeaderCell::_onSortChange");
    e.preventDefault();
       
    const {onSortChange, columnKey, sortDir} = this.props; 
    console.log(this.props);
    console.log(columnKey);
    console.log(sortDir);
    
    onSortChange(
      columnKey, 
      this.props.sortDir ?
        this.reverseSortDirection(this.props.sortDir) :
        SortDir.DESC);
  }

  render() {
    //console.log("SQFGridHeaderCell::render");
    var { children, ...props } = this.props;
    return (<Cell {...props}>
      <a onClick={this._onSortChange}>{children}</a>
    </Cell>); 

  }
}

export default SQFGridHeaderCell;
