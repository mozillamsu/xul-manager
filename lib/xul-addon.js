function BrowserWindow(windowDoc) {
    this.doc = windowDoc
    this.addonBar = this.doc.getElementById("addon-bar");
    this.injections = [];
}

BrowserWindow.prototype.insertPanel = function(id, label, iconURL, xul) {
    let toolbarbutton = this.doc.createElement("toolbarbutton");
    toolbarbutton.setAttribute("xmlns", "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
    toolbarbutton.setAttribute("id", id);
    toolbarbutton.setAttribute("type", "panel");
    toolbarbutton.setAttribute("label", label);
    toolbarbutton.setAttribute("align", "center");
    toolbarbutton.setAttribute("context", "");
    toolbarbutton.setAttribute("style", "overflow: hidden; margin: 1px 2px; padding: 0px; min-height: 16px; min-width: 16px;");
    toolbarbutton.setAttribute("removable", "true");

    let img = this.doc.createElement("image");
    img.setAttribute("height", "16");
    img.setAttribute("width", "16");
    img.setAttribute("src", iconURL);

    toolbarbutton.appendChild(img);
    toolbarbutton.innerHTML += xul;

    this.addonBar.appendChild(toolbarbutton);
    this.injections[this.injections.length] = toolbarbutton;
};

BrowserWindow.prototype.removeInjections = function() {
    for each (var injection in this.injections) {
        injection.parentNode.removeChild(injection);
    }
};

function XULManager(windowList) {
    this.injectionIDs = [];
    this.browserWindows = [];

    for(let i = 0; i < windowList.length; i++) {
        this.browserWindows[i] = new BrowserWindow(windowList[i]);
    }
}

XULManager.prototype.insertPanel = function(id, label, iconURL, xul) {
    this.injectionIDs[this.injectionIDs.length] = id;

    for each (var window in this.browserWindows) {
        window.insertPanel(id, label, iconURL, xul);
    }
};

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