var data = require("sdk/self").data;
var XULManager = require("./xul-addon").XULManager;

let {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");
var pageBreak = require("./msu-debug").pageBreak;


function MusicAddon() {
    this.windows = [];
    this.lastWindow = null;
    this.foo = "bar";
}

MusicAddon.prototype.addWindow = function(window) {
    this.windows[this.windows.length] = window;
    this.lastWindow = window;
};

MusicAddon.prototype.load = function(browserWindows) {
    this.xulManager = new XULManager(this.windows);
    let xulMarkup = data.load("simplePanel.xul");

    this.xulManager.insertPanel("music-player", "Music Player", "http://mozilla.com/favicon.ico", xulMarkup);
    Services.wm.addListener(this.createListener());
};

MusicAddon.prototype.unload = function(eventArgs) {
    this.xulManager.unload();
};

MusicAddon.prototype.onOpenWindow = function(xulWindow) {
    console.log(xulWindow.document);
    let mostRecentWindow = Services.wm.getMostRecentWindow("navigator:browser").document;
    pageBreak();
    console.log("New window opened");
    console.log("Same window: ");
    console.log(mostRecentWindow == this.lastWindow);
};
MusicAddon.prototype.onCloseWindow = function(xulWindow) {};
MusicAddon.prototype.onWindowTitleChange = function(xulWindow, newTitle) {};

MusicAddon.prototype.createListener = function() {
    var that = this;
    return {
        onOpenWindow: function(arg) { that.onOpenWindow.call(that, arg); },
        onCloseWindow: function(arg) { that.onCloseWindow.call(that, arg); },
        onWindowtitleChange: function(arg) { that.onWindowtitleChange.call(that, arg); },
    };
};

exports.MusicAddon = MusicAddon;