var require = patchRequire(require);

exports.getAccountsInfo = function getAccountsInfo() {
  var accountsInfoList = {},
      tableNodesList = document.querySelectorAll('section.liste-famille-compte ul'),
      accountsNodesList = getAccountsNodeList(tableNodesList);

  buildAccountInfoList(accountsNodesList);

  return accountsInfoList;

  function getAccountsNodeList(tableNodes) {
    return Array.prototype.filter.call(tableNodes, function(node) {
      var classElement = node.className,
          classElementWithAccount = 'list-vue1',
          isNodeWithAccount = classElement.indexOf(classElementWithAccount) !== - 1;

      return isNodeWithAccount
    });
  };

  function buildAccountInfoList(accountsNodes) {
    accountsNodes.forEach(function(node) {
      var accountInfos = node.children
      buildAccountInfos(accountInfos, node)
    })
  }

  function buildAccountInfos(accountInfos, node) {
    Array.prototype.forEach.call(accountInfos, function(account) {
      var processingBalance,
          accountInfos = account.querySelector('.infos-compte'),
          accountBalance = account.querySelector('.infos-solde');
          isNotLoanAccount = node.className.indexOf('credit') === -1

      if (accountBalance) {
        if (isNotLoanAccount) {
          processingBalance = accountBalance.querySelector('strong')
        }
      }

      buildAccountPayload(accountInfos, accountBalance, processingBalance)

    })
  }

  function buildAccountPayload(accountInfos, accountBalance, processingBalance) {
    var accountName = getAccountName(accountInfos)
    accountsInfoList[accountName] = {
      account_number: getAccountNumber(accountInfos),
      balance : getAccountBalance(accountBalance),
      processing_balance : getAccountProcessingBalance(processingBalance, accountBalance)
    }
  };

  function getAccountName(accountInfos) {
    var textContent = accountInfos.querySelector('h4').textContent
    return deleteAllWhiteSpaces(textContent)
  };

  function getAccountNumber(accountInfos) {
    var textContent = accountInfos.lastChild.nodeValue
    return deleteAllWhiteSpaces(textContent)
  };

  function getAccountBalance(accountBalance) {
    return accountBalance 
           ? deleteAllWhiteSpaces(accountBalance.querySelector('h4').textContent)
           : null
  };

  function getAccountProcessingBalance(processingBalance, accountBalance) {
    return processingBalance 
           ? deleteAllWhiteSpaces(accountBalance.querySelector('strong').textContent)
           : null
  };

  function deleteAllWhiteSpaces(element) {
    return element.replace(/\r?\n|\r| /g, '')
  }

};