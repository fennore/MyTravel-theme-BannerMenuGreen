/**
 * @todo should inherit from a Page Component
 * see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
 */
App.Components.StoryPage = function(pageInfo) {
  this.pageElement = document.getElementById('content');
  this.template = '<main id="content"></main>';
  this.title = pageInfo.title;
  this.storyFilter = pageInfo.filter;
  this.wrapClass = pageInfo.wrapClass;
  this.menuLink = pageInfo.menuLink;
  // Set the story slide
  this.storySlide = new App.Components.StorySlide();
};

App.Components.StoryPage.prototype.getElement = function() {
  return this.pageElement;
};
/**
 * Render story page.
 * Currently only has the story slide.
 * @returns {String}
 */
App.Components.StoryPage.prototype.render = function() {
  if(!this.pageElement || !document.body.contains(this.pageElement)) {
    document.body.insertAdjacentHTML('afterbegin', this.template);
    this.pageElement = document.getElementById('content');
  }
  this.storySlide.render();
};

App.Components.StoryPage.prototype.postRender = function() {
  App.Actions.Story.initRequest(this.storySlide);
};

