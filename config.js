// Everything is explained here:
// https://github.com/kuzetsa/gekko/blob/master/docs/Configuring_gekko.md

var config = {};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                          GENERAL SETTINGS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Gekko stores historical history
config.history = {
  // in what directory should Gekko store
  // and load historical data from?
  directory: './history/'
};

config.debug = false; // for additional logging / debugging

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                         WATCHING A MARKET
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Monitor the live market
config.watch = {
  enabled: true,
  exchange: 'cexio', // 'MtGox', 'BTCe', 'Bitstamp', 'cexio' or 'kraken'
  currency: 'BTC',
  asset: 'GHS'
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING TRADING ADVICE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// value of p+12 where (p,p+6,p+12) are all prime
// sexy prime triple: 1427, 1433, 1439 :)
// 1429 is also prime (1440 minutes per day)

config.tradingAdvisor = {
  enabled: true,
  method: 'ZERO',
  candleSize: 1,
  historySize: 1439
};

// Exponential Moving Averages settings:
config.DEMA = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 10,
  long: 21,
  // amount of candles to remember and base initial EMAs on
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -0.025,
    up: 0.025
  }
};

// MACD settings:
config.MACD = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 53,
  long: 109,
  signal: 41,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// x2MACD settings:
config.x2MACD = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 53,
  long: 109,
  signal: 41,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// nikiehihsa settings:
config.nikiehihsa = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 53,
  long: 109,
  signal: 41,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// x3nikiehihsa settings:
config.x3nikiehihsa = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 53,
  long: 109,
  signal: 41,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// value of p+12 where (p,p+6,p+12) are all prime
// sexy prime triple: 1427, 1433, 1439 :)
// 1429 is also prime (1440 minutes per day)
// ZERO settings:
config.ZERO = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 1427,
  long: 1433,
  signal: 1429,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// PPO settings:
config.PPO = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 12,
  long: 26,
  signal: 9,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -9999,
    up: 0.00000001,
  }
};

// RSI settings:
config.RSI = {
  interval: 14,
  thresholds: {
    low: 30,
    high: 70,
    // How many candle intervals should a trend persist
    // before we consider it real?
    persistence: 1
  }
};

// custom settings:
config.custom = {
  my_custom_setting: 10,
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PLUGINS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Want Gekko to perform real trades on buy or sell advice?
// Enabling this will activate trades for the market being
// watched by config.watch
config.trader = {
  enabled: false,
  key: 'see next line',
  secret: 'some sort of hash goes here',
  username: 'fakename change this', // your username, as required by cexio
}

config.adviceLogger = {
  enabled: true
}

// do you want Gekko to calculate the profit of its own advice?
config.profitSimulator = {
  enabled: false,
  // report the profit in the currency or the asset?
  reportInCurrency: true,
  // start balance, on what the current balance is compared with
  simulationBalance: {
    // these are in the unit types configured in the watcher.
    asset: 1,
    currency: 100,
  },
  // only want report after a sell? set to `false`.
  verbose: true,
  // how much fee in % does each trade cost?
  fee: 1,
  // how much slippage should Gekko assume per trade?
  slippage: 0.5
}

// want Gekko to send a mail on buy or sell advice?
config.mailer = {
  enabled: false,       // Send Emails if true, false to turn off
  sendMailOnStart: true,    // Send 'Gekko starting' message if true, not if false

  email: '',    // Your Gmail address

  // You don't have to set your password here, if you leave it blank we will ask it
  // when Gekko's starts.
  //
  // NOTE: Gekko is an open source project < https://github.com/kuzetsa/gekko >,
  // make sure you looked at the code or trust the maintainer of this bot when you
  // fill in your email and password.
  //
  // WARNING: If you have NOT downloaded Gekko from the github page above we CANNOT
  // guarantuee that your email address & password are safe!

  password: '',       // Your Gmail Password - if not supplied Gekko will prompt on startup.

  tag: '[GEKKO] ',      // Prefix all email subject lines with this

            //       ADVANCED MAIL SETTINGS
            // you can leave those as is if you 
            // just want to use Gmail

  server: 'smtp.gmail.com',   // The name of YOUR outbound (SMTP) mail server.
  smtpauth: true,     // Does SMTP server require authentication (true for Gmail)
          // The following 3 values default to the Email (above) if left blank
  user: '',       // Your Email server user name - usually your full Email address 'me@mydomain.com'
  from: '',       // 'me@mydomain.com'
  to: '',       // 'me@somedomain.com, me@someotherdomain.com'
  ssl: true,        // Use SSL (true for Gmail)
  port: '',       // Set if you don't want to use the default port
  tls: false        // Use TLS if true
}


config.ircbot = {
  enabled: false,
  emitUpdats: false,
  channel: '#your-channel',
  server: 'irc.freenode.net',
  botName: 'gekkobot'
}

config.campfire = {
  enabled: false,
  emitUpdates: false,
  nickname: 'Gordon',
  roomId: null,
  apiKey: '',
  account: ''
}

config.redisBeacon = {
  enabled: false,
  port: 6379, // redis default
  host: '127.0.0.1', // localhost
    // On default Gekko broadcasts
    // events in the channel with
    // the name of the event, set
    // an optional prefix to the
    // channel name.
  channelPrefix: '',
  broadcast: [
    'small candle'
  ]
}

// the web interface not currently supported, maintainer of the plugin quit
// (not in a working state)
// read: https://github.com/askmike/gekko/issues/156
config.webserver = {
  enabled: false,
  ws: {
    host: 'localhost',
    port: 1338,
  },
  http: {
    host: 'localhost',
    port: 1339,
  }
}

// not working, leave as is
config.backtest = {
  enabled: false
}

// set this to true if you understand that Gekko will 
// invest according to how you configured the indicators.
// None of the advice in the output is Gekko telling you
// to take a certain position. Instead it is the result 
// of running the indicators you configured automatically.
// 
// In other words: Gekko automates your trading strategies,
// it doesn't advice on itself, only set to true if you truly
// understand this.
// 
config['I understand that Gekko only automates MY OWN trading strategies'] = false;

module.exports = config;
