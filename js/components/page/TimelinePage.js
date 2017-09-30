
App.Components.TimelinePage = function(pageInfo) {
  this.pageElement = document.getElementById('content');
  this.template = '<main id="content"></main>';
  this.title = pageInfo.title;
  this.itemFilter = pageInfo.itemFilter;
  this.wrapClass = pageInfo.wrapClass;
  this.menuLink = pageInfo.menuLink;
  this.linkedStoryPosition = null;
  this.timelineSlide = new App.Components.TimelineSlide();
};

App.Components.TimelinePage.prototype.render = function() {
  if(!this.pageElement || !document.body.contains(this.pageElement)) {
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.pageElement = document.getElementById('content');
  }
  this.timelineSlide.render();
};

App.Components.TimelinePage.prototype.postRender = function() {
  App.Actions.Timeline.initRequest(this.timelineSlide);
}

