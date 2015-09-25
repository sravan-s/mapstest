var mapHolder = document.getElementById('mapHolder'),
    myMap;
var defaultState = {
    zoom: 5,
    tier: 0,
    center: {
        lat: 24,
        lng: 45
    },
    countryBound: {
        Ka: {
            H: 14.331662493087428,
            j: 32.90098701747366
        },
        Ga: {
            j: 23.979309014976025,
            H: 67.44122307747602
        }
    }
};
var currentState = {
    zoom: 5,
    tier: 0,
    center: {
        lat: 24,
        lng: 45
    }
};
var prevState = {
    zoom: 5,
    tier: 0,
    center: {
        lat: 24,
        lng: 45
    }
};

function initMap() {
    myMap = new google.maps.Map(mapHolder, {
        center: defaultState.center,
        zoom: defaultState.zoom,
        bound: defaultState.countryBound,
        disableDoubleClickZoom: true
    });
    myMap.addListener('dblclick', function () {
        $(window).trigger("zoomin");
    });
    myMap.addListener('zoom_changed', function () {
        currentState.zoom = myMap.getZoom();
        if(currentState.zoom < prevState.zoom) {
            $(window).trigger("zoomout");
        } else {
            $(window).trigger("zoomin");
        }
    });
}

function contolBox (m) {
    $(window).on("zoomin", function () {
        console.log("zoomin");
    });
    $(window).on("zoomout", function () {
        if(currentState.zoom < 5){
            m.setZoom(5);
            m.panTo(defaultState.center);
        }
    });
}

contolBox(myMap);