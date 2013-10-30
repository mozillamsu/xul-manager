var DOMEvent = require('./dom-event').DOMEvent;
var DOMElement = require('./dom-element').DOMElement;


/**
 * Class which provides functions for working with a XUL DOM.
 *
 * @constructor
 * @param {document} aDocument
 * @param {string} viewID
 * @param {string} XUL
 */
function DOMHelper(aDocument, viewID, XUL) {
    // Document
    let docList = []; // List of documents in the browser
    let domEvents = []; // List of DOMEvents registered

    // View
    let viewDocument = aDocument;
    let view = null;
    let viewID = viewID;

    // Create XUL panel
    let panel = viewDocument.createElement('panelview');
    panel.setAttribute('id', viewID);
    panel.setAttribute('flex', '1');
    panel.innerHTML = XUL;

    // Append XUL to viewDocument
    viewDocument.appendChild(panel);

    // Register our new panel as the view
    view = panel;


    /**
     * Add an event listener for each DOMEvent object.
     *
     * @param  {window} window The window in which we are wiring up events.
     */
    function wireEvents(window) {
        for each(var event in domEvents) {
            // Get element from the document
            let element = window.document.getElementById(event.ElementId);

            // Add listener
            element.addEventListener(event.EventName, event.Callback);
        }
    }

    /**
     * Write the document's panel XUL to our main view.
     *
     * @param  {document} doc A document from which we grab the XUL to be saved to the view.
     */
    function saveXUL(doc) {
        let docDefined = doc || false;

        if (docDefined) {
            let panel = doc.getElementById(viewID);
            view.innerHTML = panel.innerHTML;
        }
    }

    return {
        /**
         * A document object wrapper.
         *
         * @type {Object}
         */
        document: {
            /**
             * Gets a XUL element by its ID attribute.
             * 
             * @param  {string} id ID attribute string for the element we are getting.
             * @return {DOMElement} The target DOMElement object.
             */
            getElementById: function(id) {
                return new DOMElement(id, docList, domEvents, saveXUL);
            },

            /**
             * Creates a new XUL element.
             * 
             * @param  {string} tag Type of XUL element to create.
             * @return {HTMLElement} Newly created XUL element.
             */
            createElement: function(tag) {
                return viewDocument.createElement(tag);
            }
        },

        /**
         * Attaches the view to the window and wires up the DOM events.
         * 
         * @param  {window} window The window to populate with the view and events.
         */
        populateWindow: function(window) {
            docList.push(window.document);

            let viewArea = window.document.getElementById('PanelUI-multiView');
            viewArea.innerHTML += view.outerHTML;
            wireEvents(window);
        },

        wireEvents: wireEvents,
        eventList: domEvents,

        /**
         * Removes injected views from the browser.
         */
        removeInjections: function() {
            // For all documents in the browser
            for each(var doc in docList) {
                // Get injected view
                let injection = doc.getElementById(viewID);
                if (injection != null) {
                    // Remove the view
                    injection.parentNode.removeChild(injection);
                }
            }
        }
    };
}

exports.DOMHelper = DOMHelper;
