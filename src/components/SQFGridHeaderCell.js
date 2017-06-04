import React from 'react';
const {Cell} = require('fixed-data-table-2')

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
    this._onSortChange = this._onSortChange.bind(this) 
  }

  _onSortChange(e) {

    e.preventDefault();
    console.log(this.props);
    console.log("SQFGridHeaderCell::_onSortChange");
    const {onSortChange, columnKey} = this.props; 
    console.log("sortCol=%s", columnKey);
    onSortChange(columnKey);
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
