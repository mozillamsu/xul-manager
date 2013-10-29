// SDK
var sdkWindows = require('sdk/windows').browserWindows;
var sdkWindowUtils = require('sdk/window/utils');
var sdkData = require('sdk/self').data;

// XUL Manager
var DOMHelper = require('./dom-helper').DOMHelper;


/**
 * A class to track and modify browser windows.
 *
 * @constructor
 * @param {Object} CONFIG WindowManager configuration object.
 */
function WindowManager(CONFIG) {
    let injectedWindows = []; // Windows into which we have injected XUL
    let domHelper = null; // The DOM helper which handles injeciton

    /**
     * Get the windows in the browser.
     * 
     * @return {Array} List of BrowserWindow objects in the browser.
     */
    this.__defineGetter__('windows', function() {
        return sdkWindowUtils.windows();
    });

    /**
     * Registers a window for management.
     * 
     * @param {} newWindow
     */
    function addWindow(newWindow) {
        domHelper.populateWindow(newWindow);
    }

    /**
     * Determines whether a given window has XUL injected in it.
     *
     * @param  {BrowserWindow} newWindow The window we are checking for injecitons.
     * @return {boolean} Whether the window has XUL injected in it.
     */
    function injectedWindow(newWindow) {
        // Scan all windows with injections
        for each(var window in injectedWindows) {
            // If it's in there, the window has injections
            if (window === newWindow) {
                return true;
            }
        }

        // Not found
        return false;
    }

    /**
     * Injects XUL into all windows which have not been injected.
     */
    function windowsModified() {
        for each(var window in sdkWindowUtils.windows()) {
            if (!injectedWindow(window)) {
                addWindow(window);
            }
        }
    }


    function windowClosed() {
    }

    // TODO: Modify the creation of the view so there won't be a bug when no windows are open
    // We should be able to just open a window, grab it's document, and close it if there's no windows open

    // Create our parent document
    let someDoc = sdkWindowUtils.windows()[0].document;
    let doctype = someDoc.doctype;
    let aDocument = someDoc.implementation.createDocument('', '', someDoc.doctype);

    // Set up our DOM helper
    domHelper = new DOMHelper(aDocument, CONFIG.VIEW_ID, sdkData.load(CONFIG.XUL_FILE));

    // Inject all the things
    windowsModified();

    // Rig up event handlers
    sdkWindows.on('open', windowsModified); // Inject XUL into any new windows
    sdkWindows.on('close', windowClosed); // Handle window close events

    return {
        /**
         * Removes all injected XUL
         */
        removeInjections: function() {
            domHelper.removeInjections();
        },

        /**
         * Returns the XUL document.
         * @return {document} The master XUL document.
         */
        getXULDocument: function() {
            return domHelper.document;
        }
    };
}

exports.WindowManager = WindowManager;
