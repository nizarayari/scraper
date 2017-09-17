var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

var utils = require('utils')

var clientId = '123456789'
var pwd = '123456'
var accountNodes
var listAccount = {};

function getAccountName(element) {
  return element.trim().split('\n')[0]
}

function getAccountNumber(element) {
  return element.trim().split('\n')[1].trim()
}

function getAccounts() {
  var listAccount = {}
  var  accountTableNodes= document.querySelectorAll('section.liste-famille-compte ul');
  var accountNodes = Array.prototype.filter.call(accountTableNodes, function(elem) {
    var classElement = elem.className
    var classElementWithAccountList = 'list-vue1'
    return classElement.indexOf(classElementWithAccountList) !== - 1
  });

  accountNodes.forEach(function(ele) {
    var list = ele.children
    Array.prototype.forEach.call(list, function(elem,i) {
      var info = elem.querySelector('.infos-compte')
      var solde = elem.querySelector('.infos-solde')
      var prev
      if(solde) {
        if(ele.className.indexOf('credit') === -1) {prev = solde.querySelector('strong')}
      }
      listAccount[info.querySelector('h4').textContent.replace(/\r?\n|\r| /g, '')] = 
       {
          number: info.lastChild.nodeValue.replace(/\r?\n|\r| /g, ''),
          solde : solde ? solde.querySelector('h4').textContent.replace(/\r?\n|\r| /g, '') : null,
          previ: prev ? solde.querySelector('strong').textContent.replace(/\r?\n|\r| /g, '') : null
        }
    })

  })

  return listAccount

}

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
  listAccount = this.evaluate(getAccounts);
})

casper.run(function() {
  this.echo(JSON.stringify(listAccount, undefined, 4))
});
