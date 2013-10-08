var pageWorker = require("sdk/page-worker");
var data = require("sdk/self").data;

function AudioPlayer() {
    this.page = pageWorker.Page({
      contentScriptFile: data.url('audio.js'),
      contentURL: data.url('audio.html')
    });
}

AudioPlayer.prototype.play = function() {
    this.page.port.emit("play", "payload");
};


exports.AudioPlayer = AudioPlayer;