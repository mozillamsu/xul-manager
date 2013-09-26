let {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

function XULManager() {
    this.injections = [];

    // This is only for the most recent window. This currently doesn't work with multiple windows
    // I wonder how unloading content will work with multiple windows as well
    this.doc = Services.wm.getMostRecentWindow("navigator:browser").document;
    this.addonBar = this.doc.getElementById("addon-bar");
}

XULManager.prototype.insertIcon = function(id, iconURL, tooltip) {
    let icon = this.doc.createElement("toolbaritem");
    icon.setAttribute("xmlns", "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
    icon.setAttribute("id", id);
    icon.setAttribute("label", "Music Player");
    icon.setAttribute("tooltiptext", tooltip);
    icon.setAttribute("align", "center");
    icon.setAttribute("context", "");
    icon.setAttribute("style", "overflow: hidden; margin: 1px 2px; padding: 0px; min-height: 16px; min-width: 16px;");
    icon.setAttribute("removable", "true");

    let img = this.doc.createElement("image");
    img.setAttribute("height", "16");
    img.setAttribute("width", "16");
    img.setAttribute("src", iconURL);

    icon.appendChild(img);
    this.addonBar.appendChild(icon);

    this.injections[this.injections.length] = icon;
};

XULManager.prototype.removeInjections = function() {
    for(let i = 0; i < this.injections.length; i++) {
        let injection = this.injections[i];

        let parent = injection.parentNode;
        parent.removeChild(injection);
    }
};

exports.XULManager = XULManager;