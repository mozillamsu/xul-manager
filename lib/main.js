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

let SimpleController = require("./simpleController").SimpleController;
let XULManager = require("./XULManager").XULManager;

let windowDoc = Services.wm.getMostRecentWindow("navigator:browser").document;
let manager = new XULManager(windowDoc);
let controller = new SimpleController(windowDoc);

let xulPath = data.url('simplePanel.xul');
let xulMarkup = data.load('simplePanel.xul');
manager.insertXUL("xulmarkup-1", "http://jquery.com/favicon.ico", xulMarkup);

controller.wireEvents();

// function addonUnload(eventArgs) {
//     pageBreak();
//     console.log(eventArgs);

//     manager.removeInjections();
// }

// unload.when(addonUnload);

// function exampleListener(event) {
//   console.log(event.type);
//   console.log(event.subject);
//   console.log(event.data);
// }
 
// events.on("merpderp", exampleListener);
// events.emit('merpderp', { subject: "foobar", data: "asdf"});
