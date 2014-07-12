// window stats by kuzetsa, 2014 July 12
// not quite a simple moving average
// contains a series of percentile ranks
// 5/10/25/40/50/60/75/90/95th
// the "50th" percentile is the median.

var Indicator = function(period) {
  this.p5th = 0;
  this.p10th = 0;
  this.p25th = 0;
  this.p40th = 0;
  this.p50th = 0;
  this.p60th = 0;
  this.p75th = 0;
  this.p90th = 0;
  this.p95th = 0;

  this.period = period;
  this.window = [];
  this.enough = false;
  this.age = 0;
}

Indicator.prototype.update = function(price) {
  if (this.age >= this.period) {
    this.enough = true;
  }
  if (this.enough) {
  this.window.splice(0,1); // remove first (oldest) from moving window
  }

  this.age++;
  this.window.push(price);
  this.calculate(price);

  return this.p50th; // return the median as a default
}

Indicator.prototype.calculate = function() {
  var p5th = Math.floor(this.period * (5 / 100));
  var p10th = Math.floor(this.period * (10 / 100));
  var p25th = Math.floor(this.period * (25 / 100));
  var p40th = Math.floor(this.period * (40 / 100));
  var p50th = Math.floor(this.period * (50 / 100));
  var p60th = Math.floor(this.period * (60 / 100));
  var p75th = Math.floor(this.period * (75 / 100));
  var p90th = Math.floor(this.period * (90 / 100));
  var p95th = Math.floor(this.period * (95 / 100));

  var sorted = this.window;
  sorted.sort()
  this.p5th = sorted[p5th];
  this.p10th = sorted[p10th];
  this.p25th = sorted[p25th];
  this.p40th = sorted[p40th];
  this.p50th = sorted[p50th];
  this.p60th = sorted[p60th];
  this.p75th = sorted[p75th];
  this.p90th = sorted[p90th];
  this.p95th = sorted[p95th];
}

module.exports = Indicator;
