const { Cc, Ci, Cu, Cr, Cm, components } = require('chrome');
const { CustomizableUI } = Cu.import('resource:///modules/CustomizableUI.jsm');

var sdkWidget = require('sdk/widget').Widget;
var sdkWindowUtils = require('sdk/window/utils');
var sdkUnload = require('sdk/system/unload');
var self = require('sdk/self');

var FooWidget = require('./foo-widget').Widget;
let fooWidget = null;

// Register chrome URL dynamically
Cu.import('resource://gre/modules/Services.jsm');
var ios = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService);
var resProt = ios.getProtocolHandler('resource').QueryInterface(Ci.nsIResProtocolHandler);

let chromeDir = self.data.url('chrome');

let uri = ios.newURI(chromeDir, null, null);
let filePath = resProt.resolveURI(uri);

let localFile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
localFile.initWithPath(filePath.substr(7));

Cm.addBootstrappedManifestLocation(localFile);

const CONFIG = {
    ID: 'msu-foo-widget-derp',
    LABEL: 'Foo',
    TOOLTIP: 'Foo Widget v0.1',
    TYPE: 'view',
    VIEW_ID: 'PanelUI-msu-foo',
    DEFAULT_AREA: CustomizableUI.AREA_PANEL,
    REMOVABLE: true,
    XUL_FILE: 'fooPanel.xul',
    ICON_URL: 'http://google.com/favicon.ico'
};

function addonUnload(eventArgs) {
    CustomizableUI.destroyWidget(CONFIG.ID);
    fooWidget.addonUnload(eventArgs);
}

function initWidget() {
    fooWidget = new FooWidget(CONFIG);
    sdkUnload.when(addonUnload);
    CustomizableUI.createWidget(fooWidget.UXWidget);
}

let useLoadingButtons = false;

if (useLoadingButtons) {
    // Usedful for testing the Loading + Unloading of the extension easily
    var loadWidget = sdkWidget({
        id: 'msu-load-link',
        label: 'Load music addon',
        contentURL: 'http://mozilla.com/favicon.ico',
        onClick: function() {
            initWidget();
        }
    });

    var unloadWidget = sdkWidget({
        id: 'msu-unload-link',
        label: 'Unload music addon',
        contentURL: 'http://jquery.com/favicon.ico',
        onClick: function() {
            addonUnload();
        }
    });
} else {
    initWidget();
}
