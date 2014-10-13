var _ = require('lodash');
var mandrill = require('mandrill-api/mandrill');
var log = require('../core/log.js');
var util = require('../core/util.js');
var config = util.getConfig();
var mailConfig = config.mandrillMailer;

var MandrillMailer = function(done) {
  _.bindAll(this);

  this.price = 'N/A';
  this.client;
  this.done = done;
  this.setup();
}

MandrillMailer.prototype.setup = function(done) {
    var errors = [];
    if(_.isEmpty(mailConfig.to))
      errors.push("No destination address configured for Mandrill Mail Config");
    if(_.isEmpty(mailConfig.from))
      errors.push("No sending address configured for Mandrill Mail Config");
    if(_.isEmpty(mailConfig.apiKey))
      errors.push("No API Key configured for Mandrill Mail Config");

    // init the client...
    var mandrill_client = new mandrill.Mandrill(mailConfig.apiKey);
    this.client = mandrill_client;

    debugger;
    if(mailConfig.sendMailOnStart && errors.length === 0) {
      var subject = "Gekko has started";
      var messageText = [
          "I've just started watching ",
          config.watch.exchange,
          ' ',
          config.watch.currency,
          '/',
          config.watch.asset,
          ". I'll let you know when I got some advice"
        ].join('');

      this.mail(
        subject,
        messageText,
        _.bind(function(err) {
          this.checkResults(err);
          this.done();
        }, this)
      );

    } else if(errors.length !== 0){
      throw new Error(errors);
    } else {
      this.done();
    }

    if(mailConfig.testProcessAdvice){
      this.testProcessAdvice();
    }
    
  log.debug('Setup email (Mandrill) adviser successfully.');
}

MandrillMailer.prototype.mail = function(subject, content, done) {
  var self = this;
  var message = {
    "text": content,
    "to": [{
        "email": mailConfig.to,
        "name": mailConfig.toName,
        "type": "to"
    }],
    "from_name": mailConfig.fromName,
    "from_email": mailConfig.from,
    "subject": mailConfig.tag + subject
  };

  var ip_pool = "Main Pool";
  self.client.messages.send({
    "message": message, 
    "async": false, 
    "ip_pool": ip_pool
  }, 
    function(result){
      log.debug("Mail sent successfully via Mandrill: ", result);
      if(done){
        done();
      }
  }, function(error){
      self.checkResults(error);
      if(done){
        done();
      }
  });
}

MandrillMailer.prototype.processTrade = function(trade) {
  this.price = trade.price;
}

MandrillMailer.prototype.processAdvice = function(advice) {
  var text = [
    'Gekko is watching ',
    config.watch.exchange,
    ' and has detected a new trend, advice is to go ',
    advice.recommandation,
    '.\n\nThe current ',
    config.watch.asset,
    ' price is ',
    this.price
  ].join('');

  var subject = 'New advice: go ' + advice.recommandation;

  this.mail(subject, text);
}

MandrillMailer.prototype.testProcessAdvice = function(){
  var advice = {
    recommandation: "short"
  };
  this.price = 0;
  this.processAdvice(advice);
}

MandrillMailer.prototype.checkResults = function(err) {
  if(err)
    log.warn('error sending email', err);
  else
    log.info('Send advice via email.');
}

module.exports = MandrillMailer;
