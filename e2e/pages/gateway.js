var gatewayCommands = {
  clickDeployNewFunction: function () {
    this.expect.section("@sidenav").to.be.visible.before(10000);
    var sidenavSection = this.section.sidenav;
    sidenavSection.expect.element("@newFunctionButton").to.be.visible;
    sidenavSection.click("@newFunctionButton");
    return this;
  },
  searchFunctionFromStore: function (funcName) {
    var storeTabContent = this.section.deployDialog.section.storeTabContent;
    storeTabContent.expect.element("@searchInput").to.be.visible;
    this.api.pause(1000);
    storeTabContent.setValue("@searchInput", funcName);
    return this;
  },
  selectManualDeploymentTab: function () {
    var deployDialog = this.section.deployDialog;
    deployDialog.expect.element("@manualTab").to.be.visible;
    deployDialog.click("@manualTab");
    return this;
  },
  setFunctionNameManually: function (funcName) {
    var manualTabContent = this.section.deployDialog.section.manualTabContent;
    manualTabContent.clearValue("@funcNameInput");
    manualTabContent.setValue("@funcNameInput", funcName);
    return this;
  },
  deployFunction: function () {
    this.section.deployDialog.click("@deployButton");
    return this;
  },
  searchFunctionFromList: function (funcName) {
    var sidenavSection = this.section.sidenav;
    sidenavSection.expect.element("@searchInput").to.be.visible.before(10000);
    sidenavSection.clearValue("@searchInput");
    sidenavSection.setValue("@searchInput", funcName);
    return this;
  },
  setInvokeRequest: function (reqText) {
    var selectedFunctionSection = this.section.selectedFunction;
    selectedFunctionSection.clearValue("@invocationRequestInput");
    selectedFunctionSection.setValue("@invocationRequestInput", reqText);
    return this;
  },
  invokeTextFunction: function () {
    this.section.selectedFunction.click("@textRadio");
    return this.invokeFunctionWhenReady();
  },
  invokeJSONFunction: function () {
    this.section.selectedFunction.click("@jsonRadio");
    return this.invokeFunctionWhenReady();
  },
  invokeDownloadFunction: function () {
    this.section.selectedFunction.click("@downloadRadio");
    return this.invokeFunctionWhenReady();
  },
  invokeFunctionWhenReady: function () {
    var selectedFunctionSection = this.section.selectedFunction;
    selectedFunctionSection.expect
      .element("@invokeButton")
      .to.be.enabled.before(120000);

    selectedFunctionSection.click("@invokeButton");
    return this;
  },
  checkFunctionInvocationSuccessCode: function (code) {
    var selectedFunctionSection = this.section.selectedFunction;
    selectedFunctionSection.expect
      .element("@invocationStatusInput")
      .value.to.equal(code)
      .before(5000);
    return this;
  },
  waitForToastFadeInOut: function () {
    this.expect.section("@toast").to.be.present.before(1000);
    this.expect.section("@toast").not.to.be.present.before(5000);
    return this;
  },
  deleteSelectedFunction: function () {
    var selectedFunctionSection = this.section.selectedFunction;

    selectedFunctionSection.expect.element("@deleteButton").to.be.visible;
    selectedFunctionSection.click("@deleteButton");

    this.expect.section("@deleteConfirmDialog").to.be.visible.before(5000);
    var deleteConfirmSection = this.section.deleteConfirmDialog;
    deleteConfirmSection.expect.element("@confirmButton").to.be.visible;
    deleteConfirmSection.click("@confirmButton");
    this.expect.section("@deleteConfirmDialog").not.to.be.present.before(1000);
    return this;
  },
  waitForAllFunctionToDisappear: function () {
    var sidenavSection = this.section.sidenav;
    sidenavSection.expect
      .element("@searchInput")
      .not.to.be.visible.before(10000);
    return this;
  },
  deployFunctionFromStore: function (storeName, deployName) {
    this.clickDeployNewFunction().searchFunctionFromStore(storeName);
    var storeTabContent = this.section.deployDialog.section.storeTabContent;
    storeTabContent.click("@firstFunctionInList");

    return this.selectManualDeploymentTab()
      .setFunctionNameManually(deployName)
      .deployFunction();
  }
};

module.exports = {
  commands: [gatewayCommands],
  url: "http://localhost:8080",
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
        textRadio: {
          selector: 'md-radio-button[aria-label="Text"]'
        },
        jsonRadio: {
          selector: 'md-radio-button[aria-label="JSON"]'
        },
        downloadRadio: {
          selector: 'md-radio-button[aria-label="Download"]'
        },
        invokeButton: {
          selector: 'button[ng-click="fireRequest()"]'
        },
        invocationRequestInput: {
          selector: 'textarea[ng-model="invocation.request"]'
        },
        invocationStatusInput: {
          selector: 'input[ng-model="invocationStatus"]'
        },
        invocationResponseBody: {
          selector: 'textarea[ng-model="invocationResponse"]'
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
