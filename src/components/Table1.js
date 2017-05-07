"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import GroupStore from '../stores/GroupStore'
import TextCell from './TextCell'

class Table1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(GroupStore.getGroupList().length)
    return (
      <Table
        rowsCount={GroupStore.getGroupList().length}
        rowHeight={30}
        width={this.props.width}
        height={500}
        headerHeight={30}>
        <Column
          columnKey="last"
          header={"Last"}
          cell={<TextCell data={GroupStore.getGroupList()}/>}
          width={400}
        />
         <Column
          columnKey="firm"
          header={"Firm"}
          cell={<TextCell data={GroupStore.getGroupList()}/>}
          width={400}
        />
      </Table>
    );
  }
}

module.exports = Table1
