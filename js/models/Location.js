App.Models.Location = function (locData) {
  this.info = locData.info;
  this.lat = Math.round(parseFloat(locData.lat) * Math.pow(10, 5)) / Math.pow(10, 5);
  this.lng = Math.round(parseFloat(locData.lng) * Math.pow(10, 5)) / Math.pow(10, 5);
  this.stage = parseInt(locData.stage);
  this.weight = parseInt(locData.weight);
};
App.Models.Location.prototype.latLng = function() {
  if(!this._latLng)
    this._latLng = new google.maps.LatLng(this.lat, this.lng);
  return this._latLng;
};
App.Models.Location.prototype.renderEdit = function() {
  return ('<li class="loc-edit" draggable="true">' + Template.editLocation(this) + '</li>');
};


