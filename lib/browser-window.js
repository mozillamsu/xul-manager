function BrowserWindow(window) {
    this.window = window;
    this.doc = window.document;
    this.addonBar = this.doc.getElementById('addon-bar');
    this.injections = [];
}

BrowserWindow.prototype.setAttribute = function(attrName, elementId, val) {
    let element = this.doc.getElementById(elementId);

    element.setAttribute(attrName, val);
}

BrowserWindow.prototype.setHTML = function(elementId, val) {
    let element = this.doc.getElementById(elementId);

    element.innerHTML = val;
}

BrowserWindow.prototype.wireEvent = function(eventName, elementId, func) {
    let element = this.doc.getElementById(elementId);

    // TODO: I'm not really sure what the last true/false is for
    element.addEventListener(eventName, func, true);
};

BrowserWindow.prototype.insertPanel = function(id, label, iconURL, xul) {
    // let toolbarbutton = this.doc.createElement('toolbarbutton');
    // toolbarbutton.setAttribute('xmlns', 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul');
    // toolbarbutton.setAttribute('id', id);
    // toolbarbutton.setAttribute('type', 'panel');
    // toolbarbutton.setAttribute('label', label);
    // toolbarbutton.setAttribute('align', 'center');
    // toolbarbutton.setAttribute('context', '');
    // toolbarbutton.setAttribute('style', 'overflow: hidden; margin: 1px 2px; padding: 0px; min-height: 16px; min-width: 16px;');
    // toolbarbutton.setAttribute('removable', 'true');

    let panelview = this.doc.createElement('panelview');
    panelview.setAttribute('id', id);
    panelview.setAttribute('flex', '1');

    let img = this.doc.createElement('image');
    img.setAttribute('height', '16');
    img.setAttribute('width', '16');
    img.setAttribute('src', iconURL);

    toolbarbutton.appendChild(img);
    toolbarbutton.innerHTML += xul;

    this.addonBar.appendChild(toolbarbutton);
    this.injections[this.injections.length] = toolbarbutton;
};

BrowserWindow.prototype.cleanUp = function() {
    for each(var injection in this.injections) {
        injection.parentNode.removeChild(injection);
    }
};

exports.BrowserWindow = BrowserWindow;