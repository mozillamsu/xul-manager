function Controller(xuldoc) {
    this.doc = xuldoc; //Services.wm.getMostRecentWindow("navigator:browser").document;
    this.addonBar = xuldoc.getElementById("addon-bar");
}

Controller.prototype.fooClicked = function(event) {
    // console.log("\n\n\n====================================");
    // console.log("\n\n\n====================================");
    // console.log("\n\n\n====================================");
    console.log("event handled from controller");
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
    this.setCommand("foo-button", this.fooClicked);
};

exports.SimpleController = Controller;
