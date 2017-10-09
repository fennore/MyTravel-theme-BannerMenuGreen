App.Components.StageToggle = function() {
  this.toggleElement = document.getElementById('stage-toggle');
  this.template = '<div id="stage-toggle">&times;</div>';
  this.parent;
};

App.Components.StageToggle.prototype.render = function() {
  if(!this.toggleElement || !document.body.contains(this.toggleElement)) {
    this.parent.stageElement.insertAdjacentHTML('beforeend', this.template);
    this.toggleElement = document.getElementById('stage-toggle');
  }
  // Events
  App.Events.add(new App.Models.Event('click', this.toggleElement, this.doToggle.bind(this)));
  // @todo Maybe add mouseup event
  return this;
};
/**
 * Set the Stage Component parent
 * @param {Component} parent Parent Slide Stage Component
 * @returns {App.Components.StageToggle}
 */
App.Components.StageToggle.prototype.setParent = function(parent) {
  this.parent = parent;
  return this;
}

App.Components.StageToggle.prototype.doToggle = function() {
  if(this.parent.getElement().className && this.parent.getElement().className.indexOf(App.cssClasses.toggleOut) > -1) {
    rmClass(this.parent.getElement(), App.cssClasses.toggleOut);
    App.Map.disableNavigation();
  } else {
    addClass(this.parent.getElement(), App.cssClasses.toggleOut);
    App.Map.enableNavigation();
  }
};