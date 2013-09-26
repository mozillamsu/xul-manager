let injector = require("./xulInjector");


// This section is just to get the add-on bar to show
require("sdk/widget").Widget({
  label: "Music Player",
  id: "music-player",
  contentURL: "http://www.mozilla.org/favicon.ico"
});

injector.insertIcon("http://jquery.com/favicon.ico", "My Inserted XUL");