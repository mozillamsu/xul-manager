var sdkData = require('sdk/self').data;

function BrowserWindow(window) {
    this.window = window;
    this.doc = window.document;

    this.addonBar = this.doc.getElementById('addon-bar');
    this.customBar = this.doc.getElementById('PanelUI-multiView');

    this.injections = [];
}

BrowserWindow.prototype.getCustomPanel = function() {
    return this.customPanel;
};

BrowserWindow.prototype.setCustomPanel = function(xul) {
    this.customBar.innerHTML += xul;
};

BrowserWindow.prototype.setAttribute = function(attrName, elementId, val) {
    let element = this.doc.getElementById(elementId);

    element.setAttribute(attrName, val);
};

BrowserWindow.prototype.setHTML = function(elementId, val) {
    let element = this.doc.getElementById(elementId);

    element.innerHTML = val;
};

BrowserWindow.prototype.wireEvent = function(eventName, elementId, func) {
    let element = this.doc.getElementById(elementId);

    // TODO: I'm not really sure what the last true/false is for
    element.addEventListener(eventName, func, true);
};

BrowserWindow.prototype.createCustomPanel = function(id, filePath) {
    let panelView = this.doc.createElement('panelview');
    panelView.setAttribute('id', id);
    panelView.setAttribute('flex', '1');

    panelView.innerHTML = sdkData.load(filePath);

    this.customBar.appendChild(panelView);

    this.injections.push(panelView);

    this.customPanel = panelView;
};

BrowserWindow.prototype.cleanUp = function() {
    for each(var injection in this.injections) {
        injection.parentNode.removeChild(injection);
    }
};

exports.BrowserWindow = BrowserWindow;