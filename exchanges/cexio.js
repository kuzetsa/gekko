var CEXio = require('cexio'),
   moment = require('moment'),
    async = require('async'),
        _ = require('lodash'),
     util = require('../core/util'),
      log = require('../core/log');

var Trader = function(config) {
  this.user = config.username;
  this.key = config.key;
  this.secret = config.secret;
  this.currency = config.currency.toUpperCase();
  this.asset = config.asset.toUpperCase();
  this.pair = this.asset + '_' + this.currency;
  this.name = 'cex.io';

  this.cexio = new CEXio(
    this.pair,
    this.user,
    this.key,
    this.secret
  );

  _.bindAll(this);
}

Trader.prototype.getTrades = function(since, callback, descending) {
  var args = _.toArray(arguments);
  var process = function(err, trades) {
    if(err || !trades || trades.length === 0)
      return this.retry(this.getTrades, args, err);

    var f = parseFloat;

    if(descending)
      callback(null, trades);
    else
      callback(null, trades.reverse());
  }

  this.cexio.trades({}, _.bind(process, this));
}

Trader.prototype.buy = function(amount, price, callback) {
  // Prevent "You incorrectly entered one of fields."
  // because of more than 8 decimals.
  amount *= 100000000;
  amount = Math.floor(amount);
  amount /= 100000000;

  log.debug('BUY', amount, this.asset, '@', price, this.currency);

  var set = function(err, data) {
    if(err)
      return log.error('unable to buy:', err);
    if(data.error)
      return log.error('unable to buy:', data.error);

    log.debug('BUY order placed.  Order ID', data.id);
    callback(null, data.id);
  };

  this.cexio.place_order('buy', amount, price, _.bind(set, this));
}

Trader.prototype.sell = function(amount, price, callback) {
  // Prevent "You incorrectly entered one of fields."
  // because of more than 8 decimals.
  amount *= 100000000;
  amount = Math.floor(amount);
  amount /= 100000000;

  // test placing orders which will not be filled
  //price *= 10; price = price.toFixed(8);

  log.debug('SELL', amount, this.asset, '@', price, this.currency);

  var set = function(err, data) {
    if(err)
      return log.error('unable to sell:', err);
    if(data.error)
      return log.error('unable to sell:', data.error);

    log.debug('SELL order placed.  Order ID', data.id);
    callback(null, data.id);
  };

  this.cexio.place_order('sell', amount, price, _.bind(set, this));
}

Trader.prototype.retry = function(method, args, err) {
  var wait = +moment.duration(10, 'seconds');
  log.debug(this.name, 'returned an error, retrying..', err, 'waiting for', wait, 'ms');

  if (!_.isFunction(method)) {
    log.error(this.name, 'failed to retry, no method supplied.');
    return;
  }

  var self = this;

  // make sure the callback (and any other fn)
  // is bound to Trader
  _.each(args, function(arg, i) {
    if(_.isFunction(arg))
      args[i] = _.bind(arg, self);
  });

  // run the failed method again with the same
  // arguments after wait
  setTimeout(
    function() { method.apply(self, args) },
    wait
  );
}

Trader.prototype.getPortfolio = function(callback) {
  var args = _.toArray(arguments);
  var calculate = function(err, data) {
    if(err)
      return this.retry(this.getPortfolio, args, err);

    // error handler to troubleshoot issue #4
    var itBroke = false;
    if (typeof data == "object") {
    log.debug("API data object returned from getPortfolio()");
    }
    if (typeof data.BTC == "object") {
    log.debug("data.BTC object returned from getPortfolio()");
    }
    if (typeof data.GHS == "object") {
    log.debug("data.GHS object returned from getPortfolio()");
    }
    if (typeof data.NMC == "object") {
    log.debug("data.NMC object returned from getPortfolio()");
    }
    if (typeof data == "undefined") {
    itBroke = true;
    log.debug("API data undefined state during getPortfolio()");
    }
    if (typeof data.BTC == "undefined") {
    itBroke = true;
    log.debug("data.BTC undefined state during getPortfolio()");
    }
    if (typeof data.GHS == "undefined") {
    itBroke = true;
    log.debug("data.GHS undefined state during getPortfolio()");
    }
    if (typeof data.NMC == "undefined") {
    itBroke = true;
    log.debug("data.NMC undefined state during getPortfolio()");
    }
    if (typeof data.BTC.available == "undefined") {
    itBroke = true;
    log.debug("data.BTC.available undefined state during getPortfolio()");
    }
    if (typeof data.GHS.available == "undefined") {
    itBroke = true;
    log.debug("data.GHS.available undefined state during getPortfolio()");
    }
    if (typeof data.NMC.available == "undefined") {
    itBroke = true;
    log.debug("data.NMC.available undefined state during getPortfolio()");
    }
    if (typeof data.BTC.orders == "undefined") {
    // itBroke = true;
    log.debug("data.BTC.orders undefined state during getPortfolio()");
    }
    if (typeof data.GHS.orders == "undefined") {
    // itBroke = true;
    log.debug("data.GHS.orders undefined state during getPortfolio()");
    }
    if (typeof data.NMC.orders == "undefined") {
    // itBroke = true;
    log.debug("data.NMC.orders undefined state during getPortfolio()");
    }
    log.debug("data.BTC.available is:", typeof data.BTC.available);
    log.debug("data.BTC.orders is:", typeof data.GHS.orders);
    log.debug("data.GHS.available is:", typeof data.GHS.available);
    log.debug("data.GHS.orders is:", typeof data.GHS.orders);
    log.debug("data.NMC.available is:", typeof data.GHS.available);
    log.debug("data.NMC.orders is:", typeof data.GHS.orders);

    if (itBroke) {
    // the condition where "orders" is undefined...
    // the parseFloat() javascript utility turns it into zero
    // that's fortunate, as cex.io only returns "orders" json
    // when there are active orders on your account :)
    // -- kuzetsa, 2014 July 6th
    log.debug("itBroke");
    return;
    }
    // currency & asset handler can be refactored
    // probably a "switch" statement is less ugly
    // that will be done in a future commit
    // this is the end of the error handler section
    // -- kuzetsa, 2014 July 6th


    currency = parseFloat(data.BTC.available)
    if(parseFloat(data.BTC.orders)){
      currency -= parseFloat(data.BTC.orders)
    }
    assets = parseFloat(data.GHS.available);
    if( parseFloat(data.GHS.orders)){
	  assets -= parseFloat(data.GHS.orders);
    }

    var portfolio = [];
    portfolio.push({name: 'BTC', amount: currency});
    portfolio.push({name: 'GHS', amount: assets});
    callback(err, portfolio);
  }
  this.cexio.balance(_.bind(calculate, this));
}

Trader.prototype.getTicker = function(callback) {
  var set = function(err, data) {
    var ticker = {
      ask: data.ask,
      bid: data.bid
    };
    callback(err, ticker);
  }
  this.cexio.ticker(_.bind(set, this));
}

Trader.prototype.getFee = function(callback) {
  // cexio does currently don't take a fee on trades
  // TODO: isn't there an API call for this?
  callback(false, 0.002);
}

Trader.prototype.checkOrder = function(order, callback) {
  var check = function(err, result) {

    if(err)
      return callback(false, true);
    if(result.error)
      return callback(false, true);

    var exists = false;
    _.each(result, function(entry) {
      if(entry.id === order) {
        exists = true;
        return;
      }
    });
    callback(err, !exists);
  };

  this.cexio.open_orders(_.bind(check, this));
}

Trader.prototype.cancelOrder = function(order) {
  var check= function(err, result) {
    if(err)
      log.error('cancel order failed:', err);
    if(typeof(result) !== 'undefined' && result.error)
      log.error('cancel order failed:', result.error);
  }
  this.cexio.cancel_order(order, check);
}

module.exports = Trader;
