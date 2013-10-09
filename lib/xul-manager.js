// Includes
var BrowserWindow = require("./browser-window").BrowserWindow;


/**
 * Class to manage all widget XUL which must be injected into all FF windows.
 */
function XULManager(windowList) {
    this.injectionIDs = [];
    this.browserWindows = [];

    for(let i = 0; i < windowList.length; i++) {
        this.browserWindows[i] = new BrowserWindow(windowList[i]);
    }
}

/**
 * Inserts a panel into each browser window.
 */
XULManager.prototype.insertPanel = function(id, label, iconURL, xul) {
    this.injectionIDs[this.injectionIDs.length] = id;

    for each (var window in this.browserWindows) {
        window.insertPanel(id, label, iconURL, xul);
    }
};

/**
 * Removes all XUL injected by this manager from all browser windows.
 */
XULManager.prototype.unload = function(eventArgs) {
    for each (var window in this.browserWindows) {
        window.removeInjections();
    }
};

// function XULBinding(obj, dest, xul) {
//     this.obj = obj;
//     this.destination = dest;
//     this.bindsToRawObject = xul || false;
// }

// XULBinding.prototype.set = function(val) {
//     this.obj = val;
//     if(this.bindsToRawObject) {
//         this.destination = val;
//     } else {
//         this.destination.innerHTML = val;
//     }
// };

// XULBinding.prototype.get = function() {
//     return this.obj;
// };

exports.XULManager = XULManager;
// exports.XULBinding = XULBinding;