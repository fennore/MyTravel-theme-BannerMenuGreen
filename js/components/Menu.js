App.Components.Menu = function(id, links) {
  this.id = id;
  this.linksBag = links;
  this.menuElement = document.getElementById(this.id);
  this.template = '<nav id="' + this.id + '"></nav>';
};

App.Components.Menu.prototype.render = function() {
  if(!this.menuElement || !document.body.contains(this.menuElement)) {
    App.page.pageElement.insertAdjacentHTML('afterend', this.template);
    this.menuElement = document.getElementById(this.id);
  } else {
    this.linksBag.map((function(menuItem, key) {
      menuItem.menuElement = this.menuElement;
      menuItem.position = key;
      menuItem.linkElement = this.menuElement.children[key];
      menuItem.render();
    }).bind(this));
  }
  this.linksBag.map((function(menuItem, key) {
    menuItem.menuElement = this.menuElement;
    menuItem.position = key;
    menuItem.render();
  }).bind(this));
  return this;
};

App.Components.Menu.prototype.reset = function() {
  var l = this.menuElement.children.length;
  for (var i = 0; i < l; ++i) {
    rmClass(this.menuElement.children[i], App.cssClasses.mainMenuActive);
  };
};

App.Components.Menu.prototype.retract = function() {
  rmClass(this.menuElement, App.cssClasses.menuRetract);
};

App.Components.Menu.prototype.extend = function() {
  addClass(this.menuElement, App.cssClasses.menuRetract);
};
