module.exports = {
  url: "http://192.168.100.8:8080",
  sections: {
    toast: {
      selector: "md-toast"
    },
    sidenav: {
      selector: "#popupContainer > md-sidenav",
      elements: {
        newFunctionButton: {
          selector:
            "md-content > md-list:nth-child(1) > md-list-item > div > button"
        },
        searchInput: {
          selector: 'input[ng-model="search.name"]'
        },
        firstFunctionInList: {
          selector: "md-list:nth-child(3) > md-list-item"
        }
      }
    },
    selectedFunction: {
      selector: 'md-content[ng-repeat="function in functions"]',
      elements: {
        deleteButton: {
          selector: 'button[ng-click="deleteFunction()"]'
        },
        invokeButton: {
          selector: 'button[ng-click="fireRequest()"]'
        },
        invocationRequestInput: {
          selector: 'textarea[ng-model="invocation.request"]'
        },
        invocationStatusInput: {
          selector: 'input[ng-model="invocationStatus"]'
        }
      }
    },
    deployDialog: {
      selector: "#newfunction-dialog",
      elements: {
        storeTab: {
          selector: "//*[contains(text(), 'From Store')]",
          locateStrategy: "xpath"
        },
        manualTab: {
          selector: "//*[contains(text(), 'Manually')]",
          locateStrategy: "xpath"
        },
        deployButton: {
          selector: 'button[ng-click="createFunc()"]'
        }
      },
      sections: {
        storeTabContent: {
          selector: "func-store",
          elements: {
            searchInput: {
              selector: 'input[ng-model="$ctrl.searchText"]'
            },
            firstFunctionInList: {
              selector: "md-list > md-list-item"
            }
          }
        },
        manualTabContent: {
          selector: "md-tab-content#tab-content-2",
          elements: {
            funcNameInput: {
              selector: 'input[ng-model="item.service"]'
            }
          }
        }
      }
    },
    deleteConfirmDialog: {
      selector: 'md-dialog[aria-label="Delete function"]',
      elements: {
        confirmButton: {
          selector: "button.md-confirm-button"
        }
      }
    }
  }
};
