function Controller(xulmanager) {
    this.doc = xulmanager.doc;
    this.addonBar = xulmanager.doc.getElementById("addon-bar");
}

Controller.prototype.fooClicked = function(event) {
    console.log("event handled from controller");

    this.lblFoo.setAttribute("value", "herp derp you clicked the button");
};

Controller.prototype.setVal = function(id, name, value) {
    let item = this.doc.getElementById(id);
    item.setAttribute(name, value);
};

Controller.prototype.setCommand = function(id, func) {
    let item = this.doc.getElementById(id);
    item.addEventListener('command', func, true);
};

Controller.prototype.wireEvents = function() {
    this.lblFoo = this.doc.getElementById("foo-label");
    this.btnFoo = this.doc.getElementById("foo-button");

    var that = this;

    this.btnFoo.addEventListener(
        'command', 
        function(event) {
            that.fooClicked.call(that, event);
        }, 
        true
    );
};

exports.SimpleController = Controller;
