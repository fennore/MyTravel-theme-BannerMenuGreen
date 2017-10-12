/**
 * Background map component, using google maps JS API
 * @returns {App.Components.MapBackground}
 */
App.Components.MapBackground = function() {
  this.mapElement = document.getElementById('map');
  this.template = '<div id="mapWrapper"><div id="map"></div></div>';
  this.googleMap;
  this.locationMarker;
  this.mapZoom = {
    default: 7,
    location: 15,
    overview: 4
  };
};

App.Components.MapBackground.prototype.render = function() {
  if(!this.mapElement || !document.body.contains(this.mapElement)) {
    App.scripts.insertAdjacentHTML('beforebegin', this.template);
    this.mapElement = document.getElementById('map');
  }
  // Set google map
  this.googleMap = new google.maps.Map(this.mapElement, {
    // Apply the map style array to the map.
    styles: App.GmapStyle.PastelGreen,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
  });
  // Set location marker
  this.locationMarker = new google.maps.Circle({
    map: this.googleMap,
    radius: 5000,
    fillColor: 'red',
    fillOpacity: 0.6,
    strokeColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 3,
    draggable: false, // Dragable
    editable: false, // Resizable
    visible: false // Visible
  });
  this.reset();
  // Request route
  request('GET', App.basePath + '/api/encodedroute', null, this.drawEncodedRoute.bind(this));
  return this;
};
App.Components.MapBackground.prototype.reset = function() {
  this.disableNavigation();
  this.hideMarkedLocation();
  this.googleMap.setZoom(App.Settings.MapZoomOverview);
  this.googleMap.panTo(App.Settings.DefaultLocation);
}
App.Components.MapBackground.prototype.disableNavigation = function() {
  this.googleMap.setOptions({
    zoomControl: false,
    scaleControl: false,
    fullscreenControl: false,
    scrollwheel: false,
    gestureHandling: 'none'
  });
  return this;
};

App.Components.MapBackground.prototype.enableNavigation = function() {
  this.googleMap.setOptions({
    zoomControl: true,
    scaleControl: true,
    fullscreenControl: true,
    scrollwheel: true,
    gestureHandling: 'cooperative'
  });
  return this;
};

App.Components.MapBackground.prototype.drawEncodedRoute = function(stages) {
  var polyLine;
  var coordinatesWrap;
  var j = 0;
  for (var key in stages) {
    ++j;
    var stage = stages[key];
    var l = stage.length;
    for(var i = 0; i < l; ++i) {
      coordinatesWrap = google.maps.geometry.encoding.decodePath(stage[i]);
      // Construct the polygon
      polyLine = new google.maps.Polyline({
        path: coordinatesWrap,
        strokeColor: '#' + (255 - 17*(j%3)).toString(16) + (34 + 34*(j%3)).toString(16) + (17 + 64*(j%2)).toString(16),
        strokeOpacity: 0.7,
        strokeWeight: 2
      });
      polyLine.setMap(this.googleMap);
    }
  }
};

App.Components.MapBackground.prototype.updateMarkedLocation = function(LatLng) {
  //var LatLng = new google.maps.LatLng(parseFloat(img.lat), parseFloat(img.lng));
  this.locationMarker.setCenter(LatLng);
  this.locationMarker.setVisible(true);
  this.googleMap.setZoom(this.mapZoom.default);
  this.googleMap.panTo(LatLng);
};

App.Components.MapBackground.prototype.hideMarkedLocation = function() {
  this.locationMarker.setVisible(false);
};
