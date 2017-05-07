import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table-2';

alert("here1");
 
// Table data as a list of array. 
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more 
];
 
// Render your table 
ReactDOM.render(
  <Table
    rowHeight={50}
    rowsCount={rows.length}
    width={5000}
    height={5000}
    headerHeight={50}>
    <Column
      header={<Cell>Col 1</Cell>}
      cell={<Cell>Column 1 static content</Cell>}
      width={2000}
    />
  </Table>,
  document.getElementById('app')
);

