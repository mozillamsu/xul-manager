let { Cc, Ci, Cu, Cr, Cm, components } = require('chrome');
const { CustomizableUI } = Cu.import("resource:///modules/CustomizableUI.jsm");

var WindowManager = require('./window-manager').WindowManager;
var FooVM = require('./foo-vm').ViewModel;

const xulPanelPath = 'fooPanel.xul';
const iconURL = 'http://www.google.com/favicon.ico';

const customWidget = {
    id: 'msu-foo-widget',
    label: 'foo',
    tooltiptext: 'this is the foo widget',
    type: 'view',
    viewId: 'PanelUI-msu-foo',
    removable: true,
    defaultArea: CustomizableUI.AREA_PANEL,

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
        lbl.setAttribute('value', 'Foo Widget');

        node.appendChild(img);
        node.appendChild(lbl);

        // This also worked
        // node.setAttribute('image', iconURL);
    },

    // Method for view widgets
    onViewShowing: function(event) {
        console.log('onViewShowing called for widget');
    },

    // Method for view widgets
    onViewHiding: function(event) {
        console.log('onViewHiding called for widget');
    }

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
};

function Widget(windowList) {
    this.windowManager = new WindowManager(windowList, this);

    CustomizableUI.createWidget(customWidget);
    this.windowManager.populateWindows();

    this.viewModel = new FooVM(this.windowManager);
}

Widget.prototype.initCustomPanel = function(browserWindow) {
    browserWindow.createCustomPanel(customWidget.viewId, xulPanelPath);
};

Widget.prototype.populateWindow = function(browserWindow) {
    let xul = this.windowManager.getCustomPanel().outerHTML;
    console.log(xul);
    browserWindow.setCustomPanel(xul);
};

Widget.prototype.unload = function(args) {
    this.windowManager.cleanUp();
};

exports.Widget = Widget;
