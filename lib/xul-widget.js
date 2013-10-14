let { Cc, Ci, Cu, Cr, Cm, components } = require('chrome');
const { CustomizableUI } = Cu.import("resource:///modules/CustomizableUI.jsm");
const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';

var sdkData = require('sdk/self').data;
var WindowManager = require('./window-manager').WindowManager;

const xulFile = 'customPanel.xul';
const iconURL = 'http://www.google.com/favicon.ico';

const customWidget = {
  id: 'msu-music-player',
  label: 'foo',
  tooltiptext: 'this is the foo widget',
  type: 'view',
  viewId: 'PanelUI-music',
  removable: true,
  defaultArea: CustomizableUI.AREA_PANEL,

  // Used for Widgets of type: "custom"
  // onBuild: function(document) {
  //   console.log("inside of onbuild");
  //   let window = document.defaultView;

  //   let node = document.createElementNS(XUL_NS, 'toolbarbutton');
  //   node.setAttribute('id', this.id);
  //   node.setAttribute('type', this.type);
  //   node.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
  //   node.setAttribute('image', "http://google.com/favicon.ico");

  //   return node;
  // },

  // Called after any widget has been created
  onCreated: function(node) {
    console.log('oncreated called');

    let doc = node.ownerDocument;
    // Curren't doesn't take image size into account.
    let img = doc.createElement('image');
    img.setAttribute('class', 'toolbarbutton-icon');
    img.setAttribute('src', iconURL);

    let lbl = doc.createElement('label');
    lbl.setAttribute('class', 'toolbarbutton-text toolbarbutton-label');
    lbl.setAttribute('flex', '1');
    lbl.setAttribute('value', 'My Button');

    node.appendChild(img);
    node.appendChild(lbl);

    // This also worked
    // node.setAttribute('image', iconURL);
  },

  // Method for view widgets
  onViewShowing: function(event) {
    console.log('onViewShowing called for music widget');
  },

  // Method for view widgets
  onViewHiding: function(event) {
    console.log('onViewHiding called for music widget');
  }
};

function Widget(windowList) {
    this.windowManager = new WindowManager(windowList, this);

    CustomizableUI.createWidget(customWidget);
}

Widget.prototype.populateWindow = function(browserWindow) {
    let xul = sdkData.load(xulFile);
    browserWindow.insertCustomPanel(customWidget.id, xulFile);
};

Widget.prototype.unload = function(args) {
    this.windowManager.cleanUp();
};

exports.Widget = Widget;
