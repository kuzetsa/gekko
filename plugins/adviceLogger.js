var log = require('../core/log');
var moment = require('moment');
var _ = require('lodash');

var Actor = function() {
  this.price = 'N/A';
  this.marketTime = {format: function() {return 'N/A'}};
  _.bindAll(this);
}

Actor.prototype.processTrade = function(trade) {
  this.price = trade.price;
  this.marketTime = moment.unix(trade.date);
};

Actor.prototype.processAdvice = function(advice) {
  // console.log()
  log.debug('We have new trading advice!');
  log.debug('\t Position to take:', advice.recommandation);
  log.info('\t Market price:', Number(this.price).toFixed(8));
  log.info('\t At timestamp:', this.marketTime.format('YYYY-MM-DD HH:mm:ss'));
  // console.log()
};

module.exports = Actor;
