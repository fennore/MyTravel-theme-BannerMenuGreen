App.Components.SimplePage = function (pageInfo) {
  this.pageElement = document.getElementById('content');
  this.template = '<main id="content"></main>';
  this.title = pageInfo.title;
  this.content = pageInfo.content;
  this.wrapClass = pageInfo.wrapClass;
  this.menuLink = pageInfo.menuLink;
};

App.Components.SimplePage.prototype.getElement = function() {
  return this.pageElement;
};

App.Components.SimplePage.prototype.render = function() {
  if(!this.pageElement || !document.body.contains(this.pageElement)) {
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.pageElement = document.getElementById('content');
  }
  this.pageElement.insertAdjacentHTML('afterbegin', this.content);
  return this;
};

