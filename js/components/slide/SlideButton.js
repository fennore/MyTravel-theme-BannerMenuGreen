/**
 * Create a SlideButton Component
 * @todo use button ID instead of class? Or generate a unique ID for the element?
 * @param {type} btnInfo
 * @returns {App.Components.SlideButton}
 */
App.Components.SlideButton = function(buttonInfo) {
  this.parent = buttonInfo.parent;
  var svgClassSuffix = buttonInfo.direction === 'prev'?'left':'right';
  var title = buttonInfo.direction === 'prev'?'Previous':'Next';
  this.btnClass = 
          (buttonInfo.type === 'slide'?'slide':'stage') + '-' +
          (buttonInfo.direction === 'prev'?'prev':'next');
  if(this.parent.stageElement) {
    this.buttonElement = this.parent.stageElement.querySelector('button.' + this.btnClass);
  }
  this.template = 
    '<button class="' + this.btnClass + '" disabled="disabled" type="button">' +
      title +
      '<svg class="icon icon-chevron-' + svgClassSuffix + '"><use xlink:href="#icon-chevron-' + svgClassSuffix + '"></use></svg>' +
    '</button>';
};

App.Components.SlideButton.prototype.getElement = function() {
  return this.buttonElement;
};

App.Components.SlideButton.prototype.render = function() {
  if(!this.buttonElement || !document.body.contains(this.buttonElement)) {
    this.parent.getElement().insertAdjacentHTML('beforeend', this.template);
    this.buttonElement = this.parent.getElement().querySelector('button.' + this.btnClass);
  }
  return this;
};

App.Components.SlideButton.prototype.enable = function() {
  if(this.buttonElement) {
    this.buttonElement.disabled = false;
  }
  return this;
};

App.Components.SlideButton.prototype.disable = function() {
  if(this.buttonElement) {
    // Drop potential focus
    this.buttonElement.blur();
    //
    this.buttonElement.disabled = true;
    
  }
  return this;
};