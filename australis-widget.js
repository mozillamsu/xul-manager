const { Cc, Ci, Cu, Cr, Cm, Components } = require("chrome");
const { CustomizableUI } = Cu.import("resource:///modules/CustomizableUI.jsm");
var WindowUtils = require("sdk/window/utils");
var browserWindows = require("sdk/windows").browserWindows;

function AustralisWidget (widget) {
  let node = null;
  let customizableWidget = widget.CONFIG;

  function injectPanelView (window) {
    let panelView = window.document.createElement("panelview");
    panelView.id = customizableWidget.viewId;
    panelView.flex = 1;
    
    let multiView = window.document.getElementById("PanelUI-multiView");
    multiView.appendChild(panelView);
  }

  for each(var window in WindowUtils.windows()) {
    injectPanelView(window);
  }

  browserWindows.on("open", injectPanelView);

  customizableWidget.onCreated = function (node) {
    console.log("onCreated");
  };

  customizableWidget.onViewShowing = function () {
    let window = WindowUtils.getMostRecentBrowserWindow();
    let view = window.document.getElementById(customizableWidget.viewId);

    widget.populateView(window.document, view);
    console.log("onViewShowing");
  };

  customizableWidget.onViewHiding = function () {
    console.log("onViewHiding");
  };

  console.log(customizableWidget);
  CustomizableUI.createWidget(customizableWidget);
}

exports.AustralisWidget = AustralisWidget;
