describe("Functions", function() {
  describe("text functions", function() {
    before(function(client, done) {
      done();
    });

    after(function(client, done) {
      client.end(function() {
        done();
      });
    });

    afterEach(function(client, done) {
      done();
    });

    beforeEach(function(client, done) {
      done();
    });

    it("should deploy, invoke, delete the function", function(client) {
      var gateway = client.page.gateway();
      gateway.navigate();
      client.refresh(); // hack because sometimes the page is blank unless refreshed
      gateway.expect.section("@sidenav").to.be.visible.before(10000);

      var toastSection = gateway.section.toast;
      var sidenavSection = gateway.section.sidenav;
      sidenavSection.expect.element("@newFunctionButton").to.be.visible;
      sidenavSection.click("@newFunctionButton");

      var deployDialog = gateway.section.deployDialog;

      var storeTabContent = deployDialog.section.storeTabContent;
      storeTabContent.expect.element("@searchInput").to.be.visible;
      client.pause(1000);
      storeTabContent.setValue("@searchInput", "figlet");
      storeTabContent.click("@firstFunctionInList");

      deployDialog.expect.element("@manualTab").to.be.visible;
      deployDialog.click("@manualTab");

      var manualTabContent = deployDialog.section.manualTabContent;
      manualTabContent.clearValue("@funcNameInput");
      manualTabContent.setValue("@funcNameInput", "figlet_chrome");

      deployDialog.click("@deployButton");

      sidenavSection.expect.element("@searchInput").to.be.visible.before(10000);
      sidenavSection.clearValue("@searchInput");
      sidenavSection.setValue("@searchInput", "figlet_chrome");

      sidenavSection.click("@firstFunctionInList");

      var selectedFunctionSection = gateway.section.selectedFunction;
      selectedFunctionSection.clearValue("@invocationRequestInput");
      selectedFunctionSection.setValue("@invocationRequestInput", "test");

      selectedFunctionSection.expect
        .element("@invokeButton")
        .to.be.enabled.before(10000);

      selectedFunctionSection.click("@invokeButton");

      selectedFunctionSection.expect
        .element("@invocationStatusInput")
        .value.to.equal("200")
        .before(5000);

      gateway.expect.section("@toast").to.be.present.before(1000);
      gateway.expect.section("@toast").not.to.be.present.before(5000);

      selectedFunctionSection.expect.element("@deleteButton").to.be.visible;
      selectedFunctionSection.click("@deleteButton");

      gateway.expect.section("@deleteConfirmDialog").to.be.visible.before(5000);
      var deleteConfirmSection = gateway.section.deleteConfirmDialog;
      deleteConfirmSection.expect.element("@confirmButton").to.be.visible;
      deleteConfirmSection.click("@confirmButton");
      gateway.expect.section("@deleteConfirmDialog").not.to.be.present.before(1000);

      sidenavSection.expect.element("@searchInput").not.to.be.visible.before(10000);
    });
  });
});
