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
    },
    region: saudi
};
var currentState = {
    zoom: 5,
    tier: 0,
    center: {
        lat: 24,
        lng: 45
    },
    region: saudi
};
var prevState = {
    zoom: 5,
    tier: 0,
    center: {
        lat: 24,
        lng: 45
    },
    region: saudi
};

function initMap() {
    myMap = new google.maps.Map(mapHolder, defaultState);
    myMap.addListener('dblclick', function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        $(window).trigger("dblclk");
        currentState.center.lat = lat;
        currentState.center.lng = lng;
    });
    myMap.addListener('zoom_changed', function () {
        currentState.zoom = myMap.getZoom();
        if (currentState.zoom < prevState.zoom) {
            $(window).trigger("zoomout");
        } else {
            $(window).trigger("zoomin");
        }
    });
    myMap.addListener('bounds_changed', function () {
        if(myMap.getZoom() <= 5) {
            $(window).trigger("goingout");
        }
    });
    var mapController = new contolBox(myMap);
}

function contolBox(m) {
    $(window).on("dblclick", function (e) {
        console.log(e);
        var latlng = currentState.center;
        var reg;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, function (results, status) {
            if(status === google.maps.GeocoderStatus.OK) {
                console.log(results);
                var resLen = results.length,
                    clickedCountry;
                for(i=0; i<resLen; i++){
                   for(j=0;j<=results[i].types.length;j++){
                       if(results[i].types[j]=="country"){
                           clickedCountry = (results[i].formatted_address);                           
                       }
                   }
                }
                if(clickedCountry != "Saudi Arabia"){
                    m.panTo(defaultState.center);
                    m.setZoom(5);
                }
                for(i=0;i<4;i++){
                   for(j=0;j<=results.length;j++){
                       if(results[i].types[j]=="administrative_area_level_1"){
                           console.log(results[i]);
                       }
                   }
                }
            } else {
                console.log("Le Error");
            }
        });
        for(var k in currentState) {
            prevState[k]=currentState[k];
        }
        currentState.center = m.getCenter();
        currentState.zoom = m.getZoom();
        currentState.tier = currentState.tier++;
        console.log(currentState);
        console.log(prevState);
    });
    $(window).on("zoomout", function () {
        console.log(defaultState);
        if(currentState.zoom < 5){
            m.setZoom(5);
            m.setCenter(defaultState.center);
        }
    });
    $(window).on("goingout", function () {
        m.panTo(defaultState.center);
    });
}

