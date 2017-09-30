App.Components.TimelineStage = function() {
  this.stageElement = document.getElementById('timeline-stage');
  this.template = '<figure id="timeline-in-focus"></figure>';
  //
  if(this.stageElement) {
    var posCheck = Math.max(dataset(this.stageElement, 'pos') || 0, 0);
  }
  if(posCheck) {
    localStorage.setItem(this.storageKey.focus, posCheck);
  }
};

App.Components.TimelineStage.prototype.render = function() {
  if(!this.stageElement || !document.body.contains(this.stageElement)) {
    App.page.pageElement.insertAdjacentHTML('afterbegin', this.template);
    this.stageElement = document.getElementById('storystage');
    return this;
  }
  return this;
};

App.Components.TimelineStage.prototype.update = function(item) {
  // Set path
  App.updatePath('timeline/' + item.path);
  // Set document title
  document.title = item.title + ' | ' + App.siteName;
  // Update existing html ?
  // this.stageElement.insertAdjacentHTML('beforeend', story);
  // Scroll to top
  this.stageElement.scrollIntoView({behavior: 'smooth'});
  //
  return this;
};