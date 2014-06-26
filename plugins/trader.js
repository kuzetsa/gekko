var _ = require('lodash');
var log = require('../core/log.js');
var config = require('../core/util.js').getConfig();
var Manager = require('../core/portfolioManager');

var Trader = function(next) {
  _.bindAll(this);

  this.manager = new Manager(_.extend(config.trader, config.watch));
  this.manager.init(next);
}

Trader.prototype.processAdvice = function(advice) {
  if(advice.recommandation == 'long') {
    this.manager.trade('BUY');
    log.debug(
      'Trader',
      'Received advice to go long',
      'Buying ', config.trader.asset
    );
  } else
    this.manager.trade('LIZARD');
// lizards are not going cause a sell order. EVER!!!
}

module.exports = Trader;
