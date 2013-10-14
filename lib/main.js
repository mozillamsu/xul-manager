var msu = require('./msu-util');
var pageBreak = msu.pageBreak;

// let { Cc, Ci, Cu, Cr, Cm, components } = require('chrome');
// var filePicker = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
// filePicker.show();
// console.log(filePicker.fileURL.path);

var sdkWidget = require('sdk/widget').Widget;
var sdkWindowUtils = require('sdk/window/utils');
var sdkUnload = require('sdk/system/unload');

// var WindowManager = require('./window-manager').WindowManager;
var XULWidget = require('./xul-widget').Widget;
let xulWidget = null;

function initWidget() {
    xulWidget = new XULWidget(sdkWindowUtils.windows());
}

function addonUnload(eventArgs) {
    msu.log('Unloading: ' + eventArgs);
    xulWidget.unload();
}

sdkUnload.when(addonUnload);

let useLoadingButtons = false;
if(!useLoadingButtons) 
{
    initWidget();
} 
else 
{
    // Usedful for testing the Loading + Unloading of the extension easily
    var loadWidget = sdkWidget({
        id: 'msu-load-link',
        label: 'Load music addon',
        contentURL: 'http://mozilla.com/favicon.ico',
        onClick: function() {
            initWidget();
            // sdkWidget({
            //     id: 'msu-unload-link',
            //     label: 'Unload music addon',
            //     contentURL: 'http://jquery.com/favicon.ico',
            //     onClick: function() {
            //         // addonUnload();
            //         alert('hi');
            //     }
            // });
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
}
