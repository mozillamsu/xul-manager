var FooModel = require('./foo-model').Model;

const btnCounter = 'msu-foo-btn-counter';
const lblCount = 'msu-foo-lbl-count';

function ViewModel(wm) {
    this.windowManager = wm;
    this.model = new FooModel(this);

    this.wireEvents();
}

ViewModel.prototype.updateCounter = function() {
    console.log('updating label');
    this.windowManager.setAttribute('value', lblCount, this.model.numClicks.toString());
};

ViewModel.prototype.wireEvents = function() {
    console.log('wiring events');
    this.windowManager.addEventListener('command', btnCounter, this, 'btnCounterClicked');
};

ViewModel.prototype.btnCounterClicked = function() {
    console.log('btn clicked');
    this.model.increaseCount();
    this.updateCounter();
};



exports.ViewModel = ViewModel;