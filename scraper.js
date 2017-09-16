var casper = require('casper').create();

var clientId = '123456789'
var pwd = '123456'


casper.start('https://mabanque.bnpparibas/sitedemo/ident.html', function() {
  this.waitForSelector('form[name="logincanalnet"]');
});

casper.then(function() {
  this.fill('form[name="logincanalnet"]', { ch1: clientId });
});

casper.then(function() {
  
  pwd.split('').forEach(function(number) {
    casper.click('a[data-value="' + number + '"]')
  })
});

casper.then(function() {
  casper.click('button#submitIdent')
});

casper.then(function() {
  this.page.switchToChildFrame(0);
  this.echo(this.getHTML('section.liste-famille-compte'));
});

casper.run(function() {
  this.echo('First Page: ' + this.getCurrentUrl());
});

