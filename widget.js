var WindowManager = require('./window-manager').WindowManager;

/**
 * Class for defining a widget and its behavior.
 *
 * @constructor
 * @param {Object} CONFIG Widget configuration object.
 */
function Widget(CONFIG) {
    let windowManager = new WindowManager(CONFIG); // Class to ma
    let document = windowManager.getXULDocument(); // document object

    /**
     * Handler for the node creation event.
     *
     * Adds the widget to new windows.
     *
     * @param {Object} node The new window node into which the widget must be inserted.
     */
    function onCreated(node) {

        // Get the document from the node's parent
        let doc = node.ownerDocument;

        // Create the widget icon
        let img = doc.createElement('image');
        img.setAttribute('class', 'toolbarbutton-icon');
        img.setAttribute('src', CONFIG.ICON_URL);

        // Create the widget label
        let lbl = doc.createElement('label');
        lbl.setAttribute('class', 'toolbarbutton-text toolbarbutton-label');
        lbl.setAttribute('flex', '1');
        lbl.setAttribute('value', CONFIG.LABEL);

        // Insert 
        node.appendChild(img);
        node.appendChild(lbl);
    }

    function onViewShowing(event) {
    }

    function onViewHiding(event) {
    }

    /**
     * Handler for the browser unload event.
     *
     * Removes the widget from all windows.
     * 
     * @param  {Object} eventArgs Event arguments object.
     */
    function addonUnload(eventArgs) {
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
