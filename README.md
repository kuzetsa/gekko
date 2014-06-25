### Gekko (*origin of the name*)

#### 1987 movie "Wall Street"
> *The most valuable commodity I know of is information.*
> -- Gordon Gekko

## Gekko (*this tool / bot*)

This tool is based on [REST APIs](http://en.wikipedia.org/wiki/Representational_state_transfer), and is written the [node.js](https://github.com/joyent/node) dialect of javascript, which itself based on v8, Google's open source JavaScript engine.

*Use Gekko at you own risk.*

## Automated reinvestment

Gekko comes with a few [technical analysis (TA)](http://en.wikipedia.org/wiki/Technical_analysis) methods which implement a single indicator (*DEMA, MACD, RSI, and PPO*). The parameters of these indicators are all configurable and changing them changes the outcome drastically. Gekko's interface allows you to add your own trading methods. Read more about that in the [documentation](https://github.com/kuzetsa/gekko/blob/master/docs/internals/trading_methods.md). 

**Note:** *much of this information is outdated, and/or not relevant to reinvestment-only mode.*

## Supported exchanges

Gekko reinvests cloud mining income on the following platforms:

- CEX.io

## Plugin interface

Gekko also has a plugin system that can do certain things whenever something happens or let Gekko communicate through more platforms. Gekko implements the following example plugins:

- Campfire: Enables Gekko to talk on [Campfire](https://campfirenow.com/) and report latest market data and advice.
- IRC bot: Enables Gekko to talk on IRC and report latest market data and advice.
- Mailer: Automatically sends email when your trading method has new advice.
- Profit Simulator (paper trader): Hold a fake portfolio and simulate trades based on advice.
- Redis Beacon: Broadcast events propagating through Gekko on [Redis pub/sub](http://redis.io/topics/pubsub).

## Installing Gekko

Windows user? Here is a [step-by-step guide](https://github.com/kuzetsa/gekko/blob/master/docs/installing_gekko_on_windows.md) on how to get Gekko running on Windows.

Gekko runs on [nodejs](http://nodejs.org/), once you have that installed you can either download all files in [a zip](https://github.com/kuzetsa/gekko/archive/master.zip) or clone the repository via git:

```
    git clone git://github.com/kuzetsa/gekko.git
    cd gekko
```

You need to download Gekko's dependencies, which can easily be done with [npm](http://npmjs.org):

```
    npm install
```

## Configuring Gekko / before you start

Read the [configuring Gekko documentation](https://github.com/kuzetsa/gekko/tree/master/docs/Configuring_gekko.md) for a detailed explanation.

## Running Gekko

To run the bot you just have to start Gekko:

```
    node gekko
```

You can also run Gekko silently or use more complex features, for examples check out the [advanced features](https://github.com/kuzetsa/gekko/tree/master/docs/Advanced_features.md).

## Updating Gekko

If you installed the bot via git you can easily fetch the latest updates by running:

```
    git pull
    npm update
```

## How does Gekko work?

If you want to contribute or are interested in how Gekko works:

- Read about [Gekko's overall architecture](https://github.com/kuzetsa/gekko/tree/master/docs/internals/architecture.md).
- Read on how to add [a new exchange to Gekko](https://github.com/kuzetsa/gekko/tree/master/docs/internals/exchanges.md).
- Read on how to [create your own plugin](https://github.com/kuzetsa/gekko/tree/master/docs/internals/plugins.md).
- Implement [your own trading method](https://github.com/kuzetsa/gekko/blob/master/docs/internals/trading_methods.md) and share it back.

## Credits

* The title is inspired by [Bateman](https://github.com/fearofcode/bateman).
* This project is inspired by the [GoxTradingBot](https://github.com/virtimus/GoxTradingBot/) Chrome plugin (though no code is taken from it).
* Original implementation of gekko was written by [Mike van Rossum](https://github.com/askmike/gekko)
* After 2014, June 25th, reinvestment-only fork maintained by [Sarah White AKA kuzetsa](https://github.com/kuzetsa/gekko)

## License

The MIT License (MIT)

Copyright (c) 2014 Mike van Rossum <mike@mvr.me> (original author, initial code in gekkobot)
Copyright (c) 2013-2014 Sarah White (*AKA* **kuzetsa**, *forked 2014 June 25th*)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
