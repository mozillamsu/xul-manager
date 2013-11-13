/* ********
 * Requires
 * ********/
// Chrome privileges
const { Cc, Ci, Cu, Cr, Cm, Components } = require("chrome");

// CusomizableUI
const { CustomizableUI } = Cu.import("resource:///modules/CustomizableUI.jsm");

// SDK windows
var WindowUtils = require("sdk/window/utils");
var browserWindows = require("sdk/windows").browserWindows;


/**
 * A class to manage a user-defined widget.
 *
 * @param {object} widget The user-defined widget to be managed.
 */
function AustralisWidget (widget) {
    let customizableWidget = widget.CONFIG;

    /**
     * Inserts the widget's view element into the panel multiview of a given window.
     *
     * @param  {window} window The browser window into which we are injecting the widget's view.
     */
    function injectPanelView (window) {
        // Create a panelview element
        let panelView = window.document.createElement("panelview");
        panelView.id = customizableWidget.viewId;
        panelView.flex = 1;
        
        // Insert it into the multiview
        let multiView = window.document.getElementById("PanelUI-multiView");
        multiView.appendChild(panelView);
    }

    /**
     * Handler for the window open event.
     *
     * Injects the view into any window that doesn't have it yet.
     */
    function windowOpened() {
        for each (var window in WindowUtils.windows()) {
            // Get the view
            let panelview = window.document.getElementById(customizableWidget.viewId);

            // If there is no view yet
            if (panelview == null) {
                // Create and inject the view
                injectPanelView(window);
            }
        }
    }

    // Inject panelview into all open windows
    for each(var window in WindowUtils.windows()) {
        injectPanelView(window);
    }

    // Make sure panelview is injected into newly opened windows
    browserWindows.on("open", windowOpened);

    /**
     * Handler for the widget creation event.
     *
     * Inserts the widget's button in a given node.
     * 
     * @param  {XMLElement} node XML node to which the button will be attachd.
     */
    customizableWidget.onCreated = function (node) {
        widget.widgetCreated(node);
    };

    /**
     * Handler for the widget showing event.
     *
     * Inserts the widget's panel elements into the active window.
     */
    customizableWidget.onViewShowing = function () {
        // Get the current window
        let window = WindowUtils.getMostRecentBrowserWindow();

        // Get the view from the window
        let view = window.document.getElementById(customizableWidget.viewId);

        // Clear the view
        view.innerHTML = "";

        // Repopulate the view
        widget.viewShowing(window.document, view);
    };

    /**
     * Handler for the widget hiding event.
     */
    customizableWidget.onViewHiding = function () {
    };

    CustomizableUI.createWidget(customizableWidget);
}

exports.AustralisWidget = AustralisWidget;
