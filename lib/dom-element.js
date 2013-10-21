var DOMEvent = require('./dom-event').DOMEvent;

function DOMElement(elementId, docList, eventList, changeFunc) {
    this.ID = elementId;
    this.docList = docList;
    this.eventList = eventList;
    this.XULChanged = changeFunc;
    this.firstInject = true;

    this.__defineGetter__("outerHTML", function() {
        return this.docList[0].getElementById(this.ID).outerHTML;
    });

    this.__defineGetter__("innerHTML", function() {
        return this.docList[0].getElementById(this.ID).innerHTML;
    });

    this.__defineSetter__("innerHTML", function(val) {
        for each (var doc in this.docList) {
            doc.getElementById(this.ID).innerHTML = val;
        }
    });
}

DOMElement.prototype.ensureXULSaved = function(doc) {
    if(this.firstInject) {
        this.XULChanged(doc)
        this.firstInject = false;
    }
}

DOMElement.prototype.addEventListener = function(eventName, func) {
    this.eventList.push(new DOMEvent(this.ID, eventName, func));

    for each (var doc in this.docList) {
        doc.getElementById(this.ID).addEventListener(eventName, func);
    }
};

DOMElement.prototype.setAttribute = function(attr, val) {
    this.firstInject = true;
    for each (var doc in this.docList) {
        doc.getElementById(this.ID).setAttribute(attr, val);
        this.ensureXULSaved(doc);
    }
};

DOMElement.prototype.appendChild = function(node) {
    this.firstInject = true;
    for each (var doc in this.docList) {
        doc.getElementById(this.ID).appendChild(node);
        this.ensureXULSaved(doc);
    }
};

exports.DOMElement = DOMElement;