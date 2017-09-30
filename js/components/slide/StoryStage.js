App.Components.StoryStage = function() {
  this.stageElement = document.getElementById('storystage');
  this.template = '<section id="storystage" class="inactive"></section>';
};

App.Components.StoryStage.prototype.render = function() {
  if(!this.stageElement || !document.body.contains(this.stageElement)) {
    App.page.pageElement.insertAdjacentHTML('afterbegin', this.template);
    this.stageElement = document.getElementById('storystage');
    return this;
  }
  // Clean up the stage
  while(this.stageElement.querySelector('article')) {
    this.stageElement.removeChild(this.stageElement.querySelector('article'));
  }
  return this;
};

App.Components.StoryStage.prototype.update = function(story) {
  // Clean up the stage
  while(this.stageElement.querySelector('article')) {
    this.stageElement.removeChild(this.stageElement.querySelector('article'));
  }
  // Set path
  App.updatePath('scribble/' + story.path);
  // Set document title
  document.title = story.title + ' | ' + App.siteName;
  // Show story
  this.stageElement.insertAdjacentHTML('beforeend', story);
  // Scroll to top
  this.stageElement.scrollIntoView({behavior: 'smooth'});
  // Update baguettebox @todo this should be removed, linking to timeline instead
  baguetteBox.run('#storystage', {filter: /\/img\/.+/i});
  //
  return this;
};