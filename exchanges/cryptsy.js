var cryptsy = require("cryptsy-api");
   moment = require('moment'),
    async = require('async'),
        _ = require('lodash'),
     util = require('../core/util'),
      log = require('../core/log');


var Trader = function(config) {
  this.key = config.key;
  this.secret = config.secret;
  this.currency = config.currency;
  this.asset = config.asset;
  this.pair = config.asset.toUpperCase() + config.currency.toUpperCase();
  
  if( config.market_id )
    this.market_id = config.market_id;

  this.name = 'Cryptsy';

  this.cryptsy = new cryptsy(
    this.key,
    this.secret
  );

  this.market = this.pair;

  _.bindAll(this);
}


Trader.prototype.return_trades = function(market, callback) {

  var m_id;
  var main_trades;
  var client = this.cryptsy;

  //log.debug('client is ', client);
  client.getmarketid(market, function(market_id) {
      //log.debug('id is', market_id);
      // Display user's trades in that market
      client.markettrades(market_id, function(trades) {
          m_id = market_id;
          //log.debug("Grabbing trades for id ", market_id);
          if(trades.length) {
            //log.debug("There are ", trades.length, 'trades');
            var full_array = [];
            //trades = trades.reverse();             
            trades.forEach( function(trade) {
              // convert to int
              trade.amount = Number(trade.quantity);
              trade.price = Number(trade.tradeprice);
              trade.tid = Number(trade.tradeid);
              // ISSUE: this assumes that the local machine is in PDT
              trade.date = moment(Date.parse(trade.datetime)).utc().unix();
              full_array.push(trade);
            });

            callback(null, full_array);
          }
      });
  });
  //this.market_id = m_id;  
}


Trader.prototype.get_bid_ask = function(market, callback) {

  var m_id;
  var main_trades;
  var client = this.cryptsy;

  //log.debug('client is ', client);
  client.getmarketid(market, function(market_id) {
      //log.debug('id is', market_id);
      // Display user's trades in that market
      client.markettrades(market_id, function(trades) {
          //log.debug("Grabbing trades for id ", market_id);
          if(trades.length) {
            var data_output = { };
            trades = trades.reverse();
            trades.forEach( function(trade) {
              // convert to int
              if(trade.initiate_ordertype.toLowerCase() == 'sell') {
                //log.debug("Sell with initiate_ordertype", trade.initiate_ordertype, 'so using the price as the ask');
                data_output.bid = Number(trade.tradeprice);
              } else {
                //log.debug("Buy with initiate_ordertype", trade.initiate_ordertype, 'so using the price as the bid');
                data_output.ask = Number(trade.tradeprice);
              }
              data_output.datetime = trade.datetime;
            });

            callback(null, data_output);
          }
      });
  });
  //this.market_id = m_id;  
}

Trader.prototype.return_mkt_id = function(market, callback) {

  var client = this.cryptsy;

  //log.debug('client is ', client);
  client.getmarketid(market, function(market_id) {
      callback(null, market_id);    
  });
  //this.market_id = m_id;  
}


Trader.prototype.getTrades = function(since, callback, descending) {
  var args = _.toArray(arguments);
  var mkt_id = this.market;

  var process = function(err, trades) {
    //log.debug("Err is ", err, 'and length of trades is', trades);
    if(err || !trades || trades.length === 0)
      return this.retry(this.getTrades, args, err);

    var f = parseFloat;

    if(descending)
      callback(null, trades);
    else
      callback(null, trades.reverse());
  };

  this.return_trades(mkt_id, _.bind(process, this));

}



Trader.prototype.buy = function(amount, price, callback) {

  var mkt_name = this.market;
  // [MM]: Something about cryptsy's orders seems to be behind the actual market, which causes orders to go unfilled.  
  // Make the amount slightly on the upside of the actual price.
  price = price * 1.003;

  log.debug('BUY', amount, this.asset, ' @', price, this.currency);
  this.place_order(mkt_name, 'buy', amount, price, _.bind(callback, this));
}        


Trader.prototype.sell = function(amount, price, callback) {

  var mkt_name = this.market;
  // [MM]: Something about cryptsy's orders seems to be behind the actual market, which causes orders to go unfilled.  
  // Make the amount slightly on the downside of the actual price.
  price = price * 0.997;

  log.debug('SELL', amount, this.asset, ' @', price, this.currency);
  this.place_order(mkt_name, 'sell', amount, price, _.bind(callback, this));
}        


Trader.prototype.place_order = function(market_name, trans_type, amount, price, callback) {

  var client = this.cryptsy;

  //log.debug(trans_type, 'order placed for ', amount, this.asset, ' @', price, this.currency);

  //log.debug('client is ', client);
  client.getmarketid(market_name, function(market_id) {
      //log.debug('id is', market_id);
      client.createorder(market_id, trans_type, amount, price, function(orderid) {
            callback(null, orderid);
          
      });
  });
}


Trader.prototype.retry = function(method, args, err) {
  var wait = +moment.duration(10, 'seconds');
  log.debug(this.name, 'returned an error in method', method.name, ', retrying..', err, 'waiting for', wait, 'ms');

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
  var curr_balance, asst_balance;
  var curr = this.currency;
  var asst = this.asset;

  var calculate = function(data) {
     if(!data)
      return this.retry(this.getPortfolio, args, null);
    balances = data.balances_available;
    holds = data.balances_hold; 

    curr_balance = parseFloat(balances[curr])
    asst_balance = parseFloat(balances[asst]);
/*
    if(holds) {
      if(parseFloat(holds[curr])){
        curr_balance -= parseFloat(holds[curr])
      }
      
      if( parseFloat(holds[asst])){
        asst_balance -= parseFloat(holds[asst]);
      }
    }
*/   
    var portfolio = [];
    portfolio.push({name: curr, amount: curr_balance});
    portfolio.push({name: asst, amount: asst_balance});
    callback(null, portfolio);
  }

  this.cryptsy.getinfo(_.bind(calculate, this));
}

Trader.prototype.getTicker = function(callback) {

  var mkt_name = this.market;
  var set = function(err, data) {
    log.debug('Timestamp is', data.datetime, 'with bid ', data.bid, 'and ask ', data.ask); 
    var ticker = {
      ask: data.ask,
      bid: data.bid
    };
    callback(err, ticker);
  }
  this.get_bid_ask(mkt_name, _.bind(set, this));
}

Trader.prototype.getFee = function(callback) {
  callback(false, 0.0025);
}

Trader.prototype.checkOrder = function(order, callback) {
  var check = function(err, result) {

    if(err)
      callback(false, true);
 
    var exists = false;
    _.forEach(result, function(entry) {
      if(entry.orderid === order) {
        exists = true; return;
      }
    });
    callback(err, !exists);
  };

  this.cryptsy.allmyorders(_.bind(check, this));
}

Trader.prototype.cancelOrder = function(order) {
  var check= function(err, result) {
    if(err)
      log.error('cancel order failed:', err);
    if(typeof(result) !== 'undefined' && result.error)
      log.error('cancel order failed:', result.error);
  }
  this.cryptsy.cancelorder(order, check);
}

module.exports = Trader;
