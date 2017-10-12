App.Components.Menu = function(id, links) {
  this.id = id;
  this.linksBag = links;
  this.menuElement = document.getElementById(this.id);
  this.template = '<nav id="' + this.id + '"></nav>';
};

App.Components.Menu.prototype.getElement = function() {
  return this.menuElement;
};

App.Components.Menu.prototype.render = function() {
  if(!this.menuElement || !document.body.contains(this.menuElement)) {
    App.page.pageElement.insertAdjacentHTML('afterend', this.template);
    this.menuElement = document.getElementById(this.id);
  }
  this.linksBag.map((function(menuItem, key) {
    menuItem.menuElement = this.menuElement;
    menuItem.position = key;
    menuItem.linkElement = this.menuElement.children[key];
    menuItem.render();
  }).bind(this));
  return this;
};

App.Components.Menu.prototype.reset = function() {
  var l = this.linksBag.length;
  for (var i = 0; i < l; ++i) {
    this.linksBag[i].reset();
  };
};

App.Components.Menu.prototype.retract = function() {
  addClass(this.menuElement, App.cssClasses.menuRetract);
};

App.Components.Menu.prototype.extend = function() {
  rmClass(this.menuElement, App.cssClasses.menuRetract);
};
