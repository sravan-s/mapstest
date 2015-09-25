function Region() {}

Region.prototype.getData = function () {
    return {
        name : this.name,
        tier: this.tier,
        center: this.center,
        area: this.area,
        parent: this.parent
    };
};
Region.prototype.setAttr = function (attr, val) {
    this[attr] = val;
};
Region.prototype.getZoom = function () {
    if(this.area > 700000) {
        return 5;
    }
    if(this.area < 700000 && this.area > 10887) {
        return 6;
    }
};

function Country() {
    this.name = "saudi";
    this.parent = null;
    this.center = {
        lat: 24,
        lng: 45
    };
    this.area = 2149690;
    this.tier = 0;
}

function Province(pro) {
    this.name = pro.name;
    this.area = pro.area;
    this.parent = "saudi";
    this.tier = 1;
    this.center = pro.center;
}

function Goverence(gov) {
    this.name = gov.name;
    this.parent = gov.parent;
    this.tier = 2;
    this.center = gov.center;
    this.area = gov.area;
}

Country.prototype = Region.prototype;
Province.prototype = Region.prototype;
Goverence.prototype = Region.prototype;

var saudi = new Country();
var hail = new Province({
    name: "hail",
    area: 103887,
    center: {
        lat: 27.498527,
        lng: 41.728821
    }
});
var qassim = new Province({
    name: "qassim",
    area: 58046,
    center: {
        lat: 26.005778,
        lng: 43.549805
    }
});
var riyadh = new Province({
    name: "riyadh",
    area: 404240,
    center: {
        lat: 24.215240,
        lng: 45.692139
    }
});
var tabuk = new Province({
    name: "tabuk",
    area: 146072,
    center: {
        lat: 27.400459,
        lng: 36.512154
    }
});
var madinah = new Province({
    name: "madinah",
    area: 151990,
    center: {
        lat: 24,
        lng: 39
    }
});
var makkah = new Province({
    name: "makkah",
    area: 153128,
    center: {
        lat: 21,
        lng: 40
    }
});
var bahah = new Province({
    name: "bahah",
    area: 9921,
    center: {
        lat: 20,
        lng: 41.441
    }
});
var northernborders = new Province({
    name: "northernborders",
    area: 111797,
    center: {
        lat: 30,
        lng: 42
    }
});
var jawf = new Province({
    name: "jawf",
    area: 100212,
    center: {
        lat: 29,
        lng: 39
    }
});
var jizan = new Province({
    name: "jizan",
    area: 11671,
    center: {
        lat: 17,
        lng: 42
    }
});
var asir = new Province({
    name: "asir",
    area: 76693,
    center: {
        lat: 19,
        lng: 42
    }
});
var najran = new Province({
    name: "najran",
    area: 672522,
    center: {
        lat: 18,
        lng: 45
    }
});
var tier1 = [ hail, qassim, riyadh, tabuk, madinah, makkah, bahah, northernborders, jawf, jizan, asir, najran];