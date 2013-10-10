var sdkData = require('sdk/self').data;
var WindowManager = require('./window-manager').WindowManager;
var MusicVM = require('./music-vm').ViewModel;

const xulFile = 'musicPanel.xul';
const xulID = 'msu-music-player';
const xulTooltip = 'Music Player';
const iconURL = 'http://www.google.com/favicon.ico';

let { Cc, Ci, Cu, Cr, Cm, components } = require('chrome');

Cu.import("resource:///modules/CustomizableUI.jsm");

const customWidget = {
  id: 'msu-music-player',
  type: 'view',
  viewId: 'PanelUI-music',
  removable: true,
  defaultArea: CustomizableUI.AREA_PANEL,
  onViewShowing: function(event) {
    console.log('onViewShowing called for music widget');
  },

  onViewHiding: function(event) {
    console.log('onViewHiding called for music widget');
  }
};

function Widget(windowList) {
    let wm = new WindowManager(windowList, this);

    for(var key in CustomizableUI) {
        console.log(key);
    }

    // this.windowManager = wm;
    // this.viewModel = new MusicVM(wm);
}

Widget.prototype.populateWindow = function(browserWindow) {
    let xul = sdkData.load(xulFile);

    browserWindow.insertCustomPanel();
    CustomizableUI.createWidget(customWidget);
    // browserWindow.insertPanel(xulID, xulTooltip, iconURL, xul);
};

Widget.prototype.unload = function(args) {
    this.windowManager.cleanUp();
};

exports.Widget = Widget;
