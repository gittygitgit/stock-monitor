"use strict"

import React from 'react'
const {Table, Column, Cell} = require('fixed-data-table-2')
import TextCell from './TextCell'
import SortDir from './SortDir';

class SummaryTotals extends React.Component {
  constructor(props) {
    super(props);
    console.log("SummaryTotals::ctor");

  }

  componentDidMount() {
    console.log("SummaryTotals::componentDidMount");
  }

  render(props) {
    //console.log("SummaryTotals::render");
    const {last} = this.props.last;
    return (
      <div>
	<div>Last: {this.props.last}</div>
	<div>Quotes: {this.props.totQuotes}</div>
	<div>Blocks: {this.props.totBlocks}</div>
	<div>Purges: {this.props.totPurges}</div>
	<div>Und Purges: {this.props.totUndPurges}</div>
      </div>
    );

  }
}

export default SummaryTotals;

