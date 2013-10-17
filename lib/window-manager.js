var sdkWindows = require('sdk/windows').browserWindows;
var sdkWindowUtils = require('sdk/window/utils');

var Event = require('./msu-util').Event;

var BrowserWindow = require('./browser-window').BrowserWindow;

function WindowManager(windowList, widget) {
    this.foo = 'bar';
    this.browserWindows = [];
    this.widget = widget;

    for each(var window in windowList) {
        this.browserWindows.push(new BrowserWindow(window));
    }

    this.windowOpenedEvent = new Event(this, 'onOpenWindow');
    sdkWindows.on('open', this.windowOpenedEvent);
}

WindowManager.prototype.populateWindows = function() {
    this.widget.initCustomPanel(this.browserWindows[0]);

    for(let i = 1; i < this.browserWindows.length; i++) {
        this.widget.populateWindow(this.browserWindows[i]);
    }
};

WindowManager.prototype.createCustomPanel = function(id, filePath) {
    this.browserWindows[0].createCustomPanel(id, filePath);
};

WindowManager.prototype.getCustomPanel = function() {
    return this.browserWindows[0].getCustomPanel();
};

WindowManager.prototype.addEventListener = function(eventName, elementId, obj, funcName) {
    let funcEvent = new Event(obj, funcName);

    for each(var browserWindow in this.browserWindows) {
        browserWindow.wireEvent(eventName, elementId, funcEvent);
    }
};

WindowManager.prototype.setAttribute = function(attrName, elementId, val) {
    for each(var browserWindow in this.browserWindows) {
        browserWindow.setAttribute(attrName, elementId, val);
    }
};

WindowManager.prototype.setHTML = function(elementId, val) {
    for each(var browserWindow in this.browserWindows) {
        browserWindow.setHTML(elementId, val);
    }
};

WindowManager.prototype.onOpenWindow = function(args) {
    let window = sdkWindowUtils.windows()[sdkWindowUtils.windows().length - 1];

    let bWindow = new BrowserWindow(window);
    this.browserWindows.push(bWindow);
    this.widget.populateWindow(bWindow);
};

WindowManager.prototype.cleanUp = function() {
    sdkWindows.removeListener('open', this.windowOpenedEvent);

    for each(var browserWindow in this.browserWindows) {
        browserWindow.cleanUp();
    }
};

exports.WindowManager = WindowManager;