/**
 * @param {Element} parent DOM parent menu element
 * @param {string} link The relative path (without basepath)
 * @param {string} title Link title
 * @param {string} icon SVG Icon identifier, also used for svg class
 * @returns {App.Components.MenuButton}
 */
App.Components.MenuButton = function(parent, link, title, icon, position) {
  this.menuElement = parent;
  this.linkElement;
  this.link = link;
  this.title = title;
  this.icon = icon;
  this.position = position;
  this.template = '<a href="' + App.basePath + '/' + this.link + '" title="' + this.title + '">' +
    '<svg class="icon ' + this.icon + '" pointer-events="none"><use xlink:href="#' + this.icon + '"></use></svg>' +
  this.title + '</a>';
};

App.Components.MenuButton.prototype.render = function() {
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

App.Components.MenuButton.prototype.reset = function() {
  this.linkElement
    .querySelector('svg')
    .nextSibling
    .nodeValue = this.title;
  this.linkElement.title = this.title;
  this.linkElement.href = App.basePath + '/' + this.link;
  rmClass(this.linkElement, App.cssClasses.menuActive);
};

App.Components.MenuButton.prototype.navigate = function(event) {
  event.original.preventDefault();
  App.Router.navigate(this.link).resolve(window.location.pathname);
}

App.Components.MenuButton.prototype.setCurrent = function() {
  addClass(this.linkElement, App.cssClasses.menuActive);
  return this;
};