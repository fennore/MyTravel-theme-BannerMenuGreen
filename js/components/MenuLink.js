App.Components.MenuLink = function(parent, link, title, position) {
  this.menuElement = parent;
  this.linkElement;
  this.link = link;
  this.title = title;
  this.position = position;
  this.template = '<a href="' + App.basePath + '/' + this.link + '" title="' + this.title + '">' + this.title + '</a>';
};

App.Components.MenuLink.prototype.render = function() {
  if(!this.linkElement || !document.body.contains(this.linkElement)) {
    this.menuElement.insertAdjacentHTML('beforeend', this.template);
    this.linkElement = this.menuElement.lastChild;
  } else {
    this.linkElement = this.menuElement.children[this.position];
  }
  // Event
  App.Events.add(new App.Models.Event('click', this.linkElement, this.navigate.bind(this)));
  return this;
};

App.Components.MenuLink.prototype.reset = function() {
  this.linkElement.textContent = this.title;
  this.linkElement.title = this.title;
  this.linkElement.href = App.basePath + '/' + this.link;
  rmClass(this.linkElement, App.cssClasses.mainMenuActive);
};

App.Components.MenuLink.prototype.navigate = function(event) {
  event.original.preventDefault();
  App.Router.navigate(this.link).resolve(window.location.pathname);
}

App.Components.MenuLink.prototype.setCurrent = function() {
  addClass(this.linkElement, App.cssClasses.mainMenuActive);
  return this;
};