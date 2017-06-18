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
    const {summaryInfo} = this.props;
    return (
      <div>
	<div>Last: {summaryInfo.get("last")}</div>
	<div>Quotes: {summaryInfo.get("totQuotes")}</div>
	<div>Blocks: {summaryInfo.get("totBlocks")}</div>
	<div>Purges: {summaryInfo.get("totPurges")}</div>
	<div>Und Purges: {summaryInfo.get("totUndPurges")}</div>
      </div>
    );

  }
}

export default SummaryTotals;

