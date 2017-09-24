'use strict'

var helpers = require('./helpers');

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

var clientId = '123456789',
    pwd = '123456',
    listAccount = {};

casper.start('https://mabanque.bnpparibas/sitedemo/ident.html', function enterSite() {
  this.waitForSelector('form[name="logincanalnet"]');
});

casper.then(function fillClientIdForm() {
  this.fill('form[name="logincanalnet"]', { ch1: clientId });
});

casper.then(function fillClientPwd() {
  
  pwd.split('').forEach(function(number) {
    casper.click('a[data-value="' + number + '"]')
  })
});

casper.then(function submitLoginForm() {
  casper.click('button#submitIdent')
});

casper.withFrame(0, function getAccountsElements() {
  listAccount = this.evaluate(helpers.getAccountsInfo);
})

casper.run(function() {
  this.echo(JSON.stringify(listAccount, undefined, 4))
});

casper.on('run.complete', function() {
    this.echo('Scraping results');
    this.exit();
});
