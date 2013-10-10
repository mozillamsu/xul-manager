var sdkData = require('sdk/self').data;
var WindowManager = require('./window-manager').WindowManager;
var MusicVM = require('./music-vm').ViewModel;

const xulFile = 'musicPanel.xul';
const xulID = 'msu-music-player';
const xulTooltip = 'Music Player';
const iconURL = 'http://www.google.com/favicon.ico';

function Widget(windowList) {
    let wm = new WindowManager(windowList, this);

    this.windowManager = wm;
    this.viewModel = new MusicVM(wm);
}

Widget.prototype.populateWindow = function(browserWindow) {
    let xul = sdkData.load(xulFile);

    browserWindow.insertPanel(xulID, xulTooltip, iconURL, xul);
};

Widget.prototype.unload = function(args) {
    this.windowManager.cleanUp();
};

exports.Widget = Widget;
