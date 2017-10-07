App.Components.TimelineCarrouselJump = function() {
  this.id = 'slide-jumper';
  this.jumpElement = document.getElementById(this.id);
  this.template = '<ul id="' + this.id + '"></ul>';
  this.parent;
  this.jumpList = {
    'To Alps' : 0,
    'Italia I': 25,
    'Balkan' : 39,
    'Hellas I' : 66,
    'Turkey' : 79,
    'Hellas II' : 160,
    'Iron Curtain' : 190,
    'Italia II' : 236,
    'Mediterranean' : 327,
    'Atlantic' : 392,
    'Lowlands' : 480,
    'Fjords' : 552,
    'Finland' : 621,
    'Baltic' : 636,
    'Poland' : 650,
    'Hill and river' : 687
  };
};

App.Components.TimelineCarrouselJump.prototype.setParent = function(parent) {
  this.parent = parent;
};

App.Components.TimelineCarrouselJump.prototype.renderItem = function(tag) {
  return '<li>' + tag + '</li>';
};

App.Components.TimelineCarrouselJump.prototype.render = function() {
  if(!this.jumpElement || !document.body.contains(this.jumpElement)) {
    // wrapper
    this.parent.getElement().insertAdjacentHTML('afterbegin', this.template);
    this.jumpElement = document.getElementById(this.id);
  }
  this.jumpElement.insertAdjacentHTML('afterbegin', Object.keys(this.jumpList).map(this.renderItem.bind(this)).join(''));
  // Event
  window.removeEventListener('click', this.switchToItem.bind(this));
  window.addEventListener('click', this.switchToItem.bind(this));
};

/**
 * Event handler for clicked jump item.
 * @param {Event} event
 */
App.Components.TimelineCarrouselJump.prototype.switchToItem = function(event) {
  var target = event.target;
  var targetValue = this.jumpList[target.textContent];
  if(target.parentNode === this.jumpElement && (targetValue || targetValue === 0) && targetValue < this.parent.parent.total) {
    this.parent.parent.switchToItem(targetValue);
  }
};