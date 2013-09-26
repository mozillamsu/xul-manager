let {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

// Code from:
//     https://developer.mozilla.org/en-US/docs/The_add-on_bar
var doc = Services.wm.getMostRecentWindow("navigator:browser").document;
// Get the add-on bar for that window
var addonBar = doc.getElementById("addon-bar");
// End


// This section is just to get the add-on bar to show
require("sdk/widget").Widget({
  label: "Music Player",
  id: "music-player",
  contentURL: "http://www.mozilla.org/favicon.ico"
});

var icon = doc.createElement("toolbaritem");

icon.setAttribute("xmlns", "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
icon.setAttribute("id", "widget:jid1-wo2GYk9AYmfzbA@jetpack-music-player");
icon.setAttribute("label", "Music Player");
icon.setAttribute("tooltiptext", "Music Player");
icon.setAttribute("align", "center");
icon.setAttribute("context", "");
icon.setAttribute("style", "overflow: hidden; margin: 1px 2px; padding: 0px; min-height: 16px; min-width: 16px;");
icon.setAttribute("removable", "true");

var img = doc.createElement("image");
img.setAttribute("height", "16");
img.setAttribute("width", "16");
img.setAttribute("src", "http://jquery.com/favicon.ico");


icon.appendChild(img);
addonBar.appendChild(icon);
console.log(addonBar.innerHTML);
console.log(icon.innerHTML);