function pageBreak() {
    let sep = '================================================================================';
    for (let i = 0; i < 2; i++) {
        console.log(sep);
    }
}

function logMessage(msg) {
    pageBreak();
    console.log(msg);
    pageBreak();
}

function Event(obj, funcName) {
    var that = obj;
    return function(arg) {
        that[funcName].call(that, arg);
    };
}

exports.pageBreak = pageBreak;
exports.log = logMessage;
exports.Event = Event;
