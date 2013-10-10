var sdkPageWorker = require('sdk/page-worker');
var sdkData = require('sdk/self').data;

var Event = require('./msu-util').Event;

function Model(vm) {
    this.VM = vm;

    this.isPlaying = false;
    this.currentTime = 0.0;
    this.duration = 0.0;

    this.createPage();    
}

Model.prototype.createPage = function() {
    this.page = sdkPageWorker.Page({
      contentScriptFile: sdkData.url('audio.js'),
      contentURL: sdkData.url('audio.html')
    });

    this.page.port.on('time-update', new Event(this, 'timeUpdate'));
}

Model.prototype.timeUpdate = function(args) {
    this.currentTime = args.currentTime;
    this.duration = args.duration;
    this.VM.timeUpdate();
}

Model.prototype.togglePlayback = function() {
    if (this.isPlaying) {
        this.page.port.emit('pause', '');
    } else {
        this.page.port.emit('play', '');
    }

    this.isPlaying = !this.isPlaying;
};

exports.Model = Model;