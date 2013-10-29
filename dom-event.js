/**
 * Class which maintains an event and its associated element and callback function.
 *
 * @constructor
 * @param {string} elementId ID of the element to which the event is registered.
 * @param {string} eventName Name of the event for which we are listening.
 * @param {function} func Callback function to be executed when the event fires.
 */
function DOMEvent(elementId, eventName, func) {
    return {
        ElementId: elementId,
        EventName: eventName,
        Callback: func
    };
}

exports.DOMEvent = DOMEvent;