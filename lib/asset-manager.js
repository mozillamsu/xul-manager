function AssetManager() {
    this.assets = [];
}

AssetManager.prototype.addAsset = function(asset) {
    this.assets[this.assets.length] = asset;
};

AssetManager.prototype.removeAssets = function() {
    for(let i = 0; i < this.injections.length; i++) {
        let injection = this.injections[i];

        let parent = injection.parentNode;
        parent.removeChild(injection);
    }
};

exports.AssetManager = AssetManager;