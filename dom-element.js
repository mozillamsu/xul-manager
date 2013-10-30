var DOMEvent = require('./dom-event').DOMEvent;


/**
 * Class which wraps a DOM element.
 *
 * 
 * @param {string} elementId The element's ID attribute.
 * @param {Array} docList List of document objects in which the element must exist.
 * @param {Array} eventList List of DOM events attached to this object.
 * @param {function} changeFunc Function
 */
function DOMElement(elementId, docList, eventList, changeFunc) {
    this.ID = elementId; // The element's ID attribute
    this.docList = docList; // List of document objects in which the element must exist
    this.eventList = eventList; // List of events attached to this element
    this.XULChanged = changeFunc; // Function to run on 

    /**
     * Gets the element's outerHTML.
     * 
     * @return {string} The element's HTML.
     */
    this.__defineGetter__('outerHTML', function() {
        return this.docList[0].getElementById(this.ID).outerHTML;
    });

    /**
     * Gets the element's innerHTML.
     * 
     * @return {string} The HTML contained in the element.
     */
    this.__defineGetter__('innerHTML', function() {
        return this.docList[0].getElementById(this.ID).innerHTML;
    });

    /**
     * Sets the element's innerHTML.
     * 
     * @param  {string} val The HTML string to which we set innerHTML.
     */
    this.__defineSetter__('innerHTML', function(val) {
        for each(var doc in this.docList) {
            doc.getElementById(this.ID).innerHTML = val;
        }
    });
}

/**
 * Registers an event listener to the element.
 * 
 * @param {string} eventName The name of the event for which we are listening.
 * @param {function} func The callback function to be executed when the event fires.
 */
DOMElement.prototype.addEventListener = function(eventName, func) {
    // Create a DOM event object and append it and its callback to this element's event list
    this.eventList.push(new DOMEvent(this.ID, eventName, func));

    // Synchronize documents
    for each(var doc in this.docList) {
        doc.getElementById(this.ID).addEventListener(eventName, func);
    }
};

/**
 * Sets the element's given attribute to the given value.
 * @param {string} attr Name of the attribute which is to be set.
 * @param {string} val Value to which the attribute is to be set.
 */
DOMElement.prototype.setAttribute = function(attr, val) {
    // Set the attribute for this element in every document
    for each(var doc in this.docList) {
        doc.getElementById(this.ID).setAttribute(attr, val);
    }

    this.XULChanged(doc);
};

/**
 * Appends a child element to this element.
 *
 * @param  {DOMElement} node Element to be appended as a child.
 */
DOMElement.prototype.appendChild = function(node) {
    for each(var doc in this.docList) {
        doc.getElementById(this.ID).appendChild(node);
    }
    this.XULChanged(doc);
};

exports.DOMElement = DOMElement;
