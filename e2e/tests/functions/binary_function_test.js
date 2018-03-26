describe("Binary functions", function() {
  it("should be able to deploy, invoke, and delete the function", function(client) {
    var gateway = client.page.gateway();
    gateway.navigate();
    client.refresh(); // hack because sometimes the page is blank unless refreshed

    var functionName = "test_qr";

    gateway.deployFunctionFromStore("qr", functionName);

    gateway.searchFunctionFromList(functionName);
    var sidenavSection = gateway.section.sidenav;
    sidenavSection.click("@firstFunctionInList");

    gateway
      .setInvokeRequest("ocr")
      .invokeFunctionWhenReady()
      .checkFunctionInvocationSuccessCode("200")
      .waitForToastFadeInOut()
      .deleteSelectedFunction()
      .waitForAllFunctionToDisappear();
  });
});