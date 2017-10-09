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
    center: App.Settings.DefaultLocation,
    scrollwheel: false,
    // Apply the map style array to the map.
    styles: App.GmapStyle.PastelGreen,
    zoom: App.Settings.MapZoomOverview,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    gestureHandling: 'none', // auto | cooperative
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    scaleControl: false,
    streetViewControl: false,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    fullscreenControl: false
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
  return this;
};

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

App.Components.MapBackground.prototype.updateMarkedLocation = function(LatLng) {
  //var LatLng = new google.maps.LatLng(parseFloat(img.lat), parseFloat(img.lng));
  this.markedLocation.setCenter(LatLng);
  this.markedLocation.setVisible(true);
  this.googleMap.setZoom(this.mapZoom.default);
  this.googleMap.panTo(LatLng);
};

App.Components.MapBackground.prototype.hideMarkedLocation = function() {
  this.locationMarker.setVisible(false);
};