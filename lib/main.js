var msu = require('./msu-util');

var sdkWidget = require('sdk/widget').Widget;
var sdkWindowUtils = require('sdk/window/utils');
var sdkUnload = require('sdk/system/unload');

// var WindowManager = require('./window-manager').WindowManager;
var FooWidget = require('./foo-widget').Widget;
let fooWidget = null;

function initWidget() {
    fooWidget = new FooWidget(sdkWindowUtils.windows());
}

function addonUnload(eventArgs) {
    msu.log('Unloading: ' + eventArgs);
    fooWidget.unload();
}

sdkUnload.when(addonUnload);

let useLoadingButtons = false;

if (useLoadingButtons) {
    // Usedful for testing the Loading + Unloading of the extension easily
    var loadWidget = sdkWidget({
        id: 'msu-load-link',
        label: 'Load music addon',
        contentURL: 'http://mozilla.com/favicon.ico',
        onClick: function () {
            initWidget();
        }
    });

    var unloadWidget = sdkWidget({
        id: 'msu-unload-link',
        label: 'Unload music addon',
        contentURL: 'http://jquery.com/favicon.ico',
        onClick: function () {
            addonUnload();
        }
    });
} else {
    initWidget();
}
