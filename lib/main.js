let XULManager = require("./XULManager").XULManager;
let unload = require("sdk/system/unload");

function pageBreak() {
    console.log("\n");
    let sep = "================================================================================";
    for(let i = 0; i < 3; i++) {
        console.log(sep);
    }
    console.log("\n");
}

// This section is just to get the add-on bar to show
// require("sdk/widget").Widget({
//   label: "Music Player",
//   id: "music-player",
//   contentURL: "http://www.mozilla.org/favicon.ico",
// });

let manager = new XULManager();

manager.insertIcon("xulschool-hello-1", "http://jquery.com/favicon.ico", "My Inserted XUL");
manager.insertIcon("xulschool-hello-2", "http://www.mozilla.org/favicon.ico", "My Inserted XUL");
manager.insertIcon("xulschool-hello-3", "http://jquery.com/favicon.ico", "My Inserted XUL");

function addonUnload(eventArgs) {
    pageBreak();
    console.log(eventArgs);

    manager.removeInjections();
}

unload.when(addonUnload);

