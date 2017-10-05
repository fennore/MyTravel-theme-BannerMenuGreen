App.Components.TimelinePager = function() {
  this.id = 'pager-buttons';
  this.pagerElement;
  this.template = '<div id="' + this.id + '"></div>';
  this.templateButton = '<button></button>';
  this.parent;
  this.previousPagerSize;
  this.pagerCurrent = 0;
};

App.Components.TimelinePager.prototype.getElement = function() {
  return this.pagerElement;
};

App.Components.TimelinePager.prototype.setParent = function(parent) {
  this.parent = parent;
};

App.Components.TimelinePager.prototype.render = function() {
  
};

App.Components.TimelinePager.prototype.update = function() {
  var newCount = this.parent.moveNext - this.parent.moveRoot;
  if(newCount <= 0) {
    newCount = this.parent.dataList.length - this.parent.moveRoot;
  }
  var check = Math.abs(newCount - (this.previousPagerSize || 0));
  for (var i = 0; i < check; i++) {
    if(newCount < this.previousPagerSize) {
      this.pagerElement.removeChild(this.pagerElement.children[this.previousPagerSize - (1 + i)]);
    }
    else {
      this.pagerElement.insertAdjacentHTML('beforeend', this.templateButton);
    }
  }
  this.previousPagerSize = newCount;
};

App.Components.TimelinePager.prototype.setCurrent = function() {
  rmClass(this.pagerElement.children[this.pagerCurrent], 'pager-active');
  addClass(this.pagerElement.children[this.parent.currentItem - this.parent.moveRoot], 'pager-active');
  this.pagerCurrent = this.parent.currentItem - this.parent.moveRoot;
};
