var Event = require('./msu-util').Event;
var MusicModel = require('./music-model').Model;

const btnTogglePlayback = 'msu-music-btn-toggle-playback';
const prgPlaybackProgress = 'msu-music-progress-playback';
const lblCurrentTime = 'msu-music-lbl-current-time';
const lblTimeRemaining = 'msu-music-lbl-time-remaining';

function ViewModel(wm) {
    this.windowManager = wm;
    this.model = new MusicModel(this);

    this.wireEvents();
}

ViewModel.prototype.wireEvents = function() {
    this.windowManager.addEventListener(
        'command', btnTogglePlayback, this, 'playPauseClicked');
};

ViewModel.prototype.playPauseClicked = function(args) {
    this.model.togglePlayback();
    let isPlaying = this.model.isPlaying;

    if (isPlaying) {
        console.log("is playing");
        this.windowManager.setAttribute('label', btnTogglePlayback, 'Pause');
    } else {
        console.log("is paused");
        this.windowManager.setAttribute('label', btnTogglePlayback, 'Play');
    }
};

ViewModel.prototype.timeUpdate = function() {
    let currentTime = this.model.currentTime;
    let duration = this.model.duration;
    let remaining = duration - currentTime;

    let progress = (currentTime / duration) * 100.0;

    this.windowManager.setAttribute('value', prgPlaybackProgress, currentTime);
    // this.windowManager.setAttribute('value', prgPlaybackProgress, progress);

    let seconds = Math.floor(currentTime) % 60;
    let remainingSeconds = Math.floor(remaining) % 60;
    if (seconds == 0) {
        seconds = "00";
    } else if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let minutes = Math.floor(currentTime / 60.0);
    let remainingMinutes = Math.floor(remaining / 60.0);

    // console.log(currentTime);
    // console.log(duration);
    // console.log(progress);
    // console.log(minutes + ":" + seconds);
    // console.log(remainingMinutes + ":" + remainingSeconds);
    this.windowManager.setAttribute('value', lblCurrentTime, minutes + ":" + seconds);
    this.windowManager.setAttribute('value', lblTimeRemaining, remainingMinutes + ":" + remainingSeconds);
}

exports.ViewModel = ViewModel;