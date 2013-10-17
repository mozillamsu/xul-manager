function Model() {
    this.numClicks = 0;
}

Model.prototype.increaseCount = function() {
    this.numClicks++;
};

exports.Model = Model;