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

exports.BrowserWindow = BrowserWindow;