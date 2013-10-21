var DOMHelper = require('./dom-helper').DOMHelper;
var WindowManager = require('./window-manager').WindowManager;

const CONFIG = {
    ID: 'msu-foo-widget-derp',
    LABEL: 'Foo',
    TOOLTIP: 'Foo Widget v0.1',
    TYPE: 'view',
    VIEW_ID: 'PanelUI-msu-foo',
    REMOVABLE: true,
    XUL_FILE: 'fooPanel.xul',
    ICON_URL: 'http://google.com/favicon.ico'
};

function Widget(CONFIG) {
    this.CONFIG = CONFIG;
    let windowManager = new WindowManager(this);
    let document = windowManager.domHelper.document;

    let counter = 0;
    let btn = document.getElementById('msu-foo-btn-counter');
    let lbl = document.getElementById('msu-foo-lbl-count');
    btn.addEventListener('command', function(event) {
       counter++;
       console.log('clicked: ' + counter);
        lbl.setAttribute('value', counter);
    });

    function onCreated(node) {
        console.log('oncreated called');

        let doc = node.ownerDocument;
        // Curren't doesn't take image size into account.
        let img = doc.createElement('image');
        img.setAttribute('class', 'toolbarbutton-icon');
        img.setAttribute('src', CONFIG.ICON_URL);

        let lbl = doc.createElement('label');
        lbl.setAttribute('class', 'toolbarbutton-text toolbarbutton-label');
        lbl.setAttribute('flex', '1');
        lbl.setAttribute('value', 'Foo Widget');

        node.appendChild(img);
        node.appendChild(lbl);
    }

    function onViewShowing(event) {
        console.log('onViewShowing called for widget');
    }

    function onViewHiding(event) {
        console.log('onViewHiding called for widget');
    }

    function addonUnload(eventArgs) {
        console.log('Unloading: ' + eventArgs);
        windowManager.removeInjections();
        windowManager = null;
    }

    return {
        UXWidget: {
            id: CONFIG.ID,
            label: CONFIG.LABEL,
            tooltiptext: CONFIG.TOOLTIP,
            type: CONFIG.TYPE,
            viewId: CONFIG.VIEW_ID,
            removable: CONFIG.REMOVABLE,
            defaultArea: CONFIG.DEFAULT_AREA,

            onCreated: onCreated,
            onViewShowing: onViewShowing,
            onViewHiding: onViewHiding
        },

        addonUnload: addonUnload
    };
}

exports.Widget = Widget;