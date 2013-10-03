let {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

function pageBreak() {
    console.log("\n");
    let sep = "================================================================================";
    for(let i = 0; i < 3; i++) {
        console.log(sep);
    }
    console.log("\n");
}

var { open } = require('sdk/window/utils');
var unload = require("sdk/system/unload");
var data = require("sdk/self").data;
var events = require("sdk/system/events");
var SimpleController = require("./simpleController").SimpleController;
var XULManager = require("./XULManager").XULManager;

// This is only for the most recent window. This currently doesn't work with multiple windows
// I wonder how unloading content will work with multiple windows as well
let windowDoc = Services.wm.getMostRecentWindow("navigator:browser").document;

let manager = new XULManager(windowDoc);
let xulPath = data.url('simplePanel.xul');
let xulMarkup = data.load('simplePanel.xul');
manager.insertXUL("xulmarkup-1", "http://jquery.com/favicon.ico", xulMarkup);

let controller = new SimpleController(manager);
controller.wireEvents();

function addonUnload(eventArgs) {
    pageBreak();
    console.log(eventArgs);

    manager.removeInjections();
}

unload.when(addonUnload);

// function exampleListener(event) {
//   console.log(event.type);
//   console.log(event.subject);
//   console.log(event.data);
// }
 
// events.on("merpderp", exampleListener);
// events.emit('merpderp', { subject: "foobar", data: "asdf"});
