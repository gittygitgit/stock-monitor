
class Firm {
  constructor(last, firm, numBlocks, rateCurrent, rate1Min, rate5Min, qlCurrent, ql1Min, limitCurrent, limit1Min, limit5Min, quotes, blocks, purges, undPurges) {
    this.last = last;
    this.firm = firm;
    this.numBlocks = numBlocks;
    this.rateCurrent = rateCurrent;
    this.rate1Min = rate1Min;
    this.rate5Min = rate5Min;
    this.qlCurrent = qlCurrent;
    this.ql1Min = ql1Min;
    this.limitCurrent = limitCurrent;
    this.limit1Min = limit1Min;
    this.limit5Min = limit5Min;
    this.quotes = quotes;
    this.blocks = blocks;
    this.purges = purges;
    this.undPurges = undPurges;
  }

  
}

export default Firm;
