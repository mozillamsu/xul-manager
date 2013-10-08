let {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

var windowUtils = require("sdk/window/utils");
var unload = require("sdk/system/unload");
var data = require("sdk/self").data;
var events = require("sdk/system/events");

var pageBreak = require("./msu-debug").pageBreak;
var MusicAddon = require("./music-addon").MusicAddon;

let musicAddon = new MusicAddon();

function initWidget() {
    let count = 0;
    for each (var window in windowUtils.windows()) {
        count += 1;
        if(windowUtils.isBrowser(window)) {
            musicAddon.addWindow(window.document);
        }
    }

    musicAddon.load();
};

function unloadWidget() {
    musicAddon.unload();
};

function addonUnload(eventArgs) {
    console.log(eventArgs);

    // manager.removeInjections();
    musicAddon.unload();
}

unload.when(addonUnload);

initWidget();

var widgets = require("sdk/widget");
var loadwidget = widgets.Widget({
    id: "mozilla-link",
    label: "Load music addon",
    contentURL: "http://mozilla.com/favicon.ico",
    onClick: function() {
        initWidget();
    }
});

var unloadwidget = widgets.Widget({
    id: "mozilla-unload",
    label: "Load music addon",
    contentURL: "http://jquery.com/favicon.ico",
    onClick: function() {
        unloadWidget();
    }
});

// function exampleListener(event) {
//   console.log(event.type);
//   console.log(event.subject);
//   console.log(event.data);
// }
 
// events.on("merpderp", exampleListener);
// events.emit('merpderp', { subject: "foobar", data: "asdf"});
