App.Components.TimelineStage = function() {
  this.id = 'timeline-stage';
  this.stageElement = document.getElementById(this.id);
  this.template = '<figure id="' + this.id + '"><h1>Timeline</h1><img class="tl-img" /><figcaption class="written empty"></figcaption></figure>';
  this.parent;
  // Load cubes
  this.cubesTemplate = '<div class="sk-cube-grid">' +
    '<div class="sk-cube sk-cube1"></div>' +
    '<div class="sk-cube sk-cube2"></div>' +
    '<div class="sk-cube sk-cube3"></div>' +
    '<div class="sk-cube sk-cube4"></div>' +
    '<div class="sk-cube sk-cube5"></div>' +
    '<div class="sk-cube sk-cube6"></div>' +
    '<div class="sk-cube sk-cube7"></div>' +
    '<div class="sk-cube sk-cube8"></div>' +
    '<div class="sk-cube sk-cube9"></div>' +
  '</div>';
  this.cubesElement;
  //
  if(this.stageElement) {
    var posCheck = Math.max(dataset(this.stageElement, 'pos') || 0, 0);
  }
  if(posCheck) {
    localStorage.setItem(this.storageKey.focus, posCheck);
  }
  this.toggle = new App.Components.StageToggle();
  this.toggle.setParent(this);
  //
  this.classHideStage = 'slide-stage-blur';
  this.classHideCubes = 'hide';
  // sub elements
  this.imageElement;
  this.captionElement;
  this.titleElement;
};

App.Components.TimelineStage.prototype.getElement = function() {
  return this.stageElement;
};
/**
 * Set the parent of the stage, this should be the Slide Component
 * @param {App.Components.Slide} parent
 * @returns {App.Components.TimelineStage}
 */
App.Components.TimelineStage.prototype.setParent = function(parent) {
  this.parent = parent;
  return this;
};

App.Components.TimelineStage.prototype.render = function() {
  if(!this.stageElement || !document.body.contains(this.stageElement)) {
    App.page.getElement().insertAdjacentHTML('afterbegin', this.template);
    this.stageElement = document.getElementById(this.id);
  }
  this.toggle.render();
  this.stageElement.insertAdjacentHTML('beforeend', this.cubesTemplate);
  this.cubesElement = this.stageElement.querySelector('.sk-cube-grid');
  // Sub element binding
  this.imageElement = this.stageElement.querySelector('img');
  this.captionElement = this.stageElement.querySelector('figcaption');
  this.titleElement = this.stageElement.querySelector('h1');
  // Events
  this.stageElement.querySelector('img').addEventListener('load', this.onStageLoad.bind(this), false);
  return this;
};

App.Components.TimelineStage.prototype.update = function(item) {
  // Set path
  App.updatePath('timeline/' + item.path);
  // Set document title
  document.title = item.title + ' | ' + App.siteName;
  // Update existing html
  this.titleElement.textContent = item.title;
  // Set story link
  /*if(StoryAction.setLink) {
    StoryAction.setLink(img);
  }
  if(img.lat && img.lng) {
    var LatLng = new google.maps.LatLng(parseFloat(img.lat), parseFloat(img.lng));
    MapAction.drawLocationArea(LatLng);
  } else {
    Data.drawCircle.setVisible(false);
  }*/
  // Hide
  this.hide();
  // Scroll to top
  this.stageElement.scrollIntoView({behavior: 'smooth'});
  //
  return this;
};

App.Components.TimelineStage.prototype.hide = function() {
  // Reset possible conflicting timers
  App.Timers.reset('stage-hide-mousemove');
  App.Timers.reset('stage-image');
  App.Timers.reset('stage-content');
  addClass(this.stageElement, this.classHideStage);
  rmClass(this.cubesElement, this.classHideCubes);
  App.Timers.add('stage-delayed-show', this.setDelayed.bind(this), 900);
};

App.Components.TimelineStage.prototype.show = function() {
  App.Timers.reset('stage-hide-mousemove');
  rmClass(this.stageElement, this.classHideStage);
  addClass(this.cubesElement, this.classHideCubes);
};

App.Components.TimelineStage.prototype.setDelayed = function() {
  var item = this.parent.getCurrentItemData();
  App.Timers.reset('stage-hide-mousemove');
  if(App.menuMain) {
    App.menuMain.retract();
  }
  if(App.menuMinor) {
    App.menuMinor.retract();
  }
  // Update source
  this.imageElement.src = App.basePath + '/img/' + item.path;
  //
  var txt = '';
  if(item.content) {
    txt = item
      .content
      .replace(new RegExp('&nbsp;', 'g'), ' ')
      .replace(new RegExp('<br>', 'g'), '\r\n')
      .trim();
  }
  if(txt === '') {
    addClass(this.captionElement, 'empty');
  } else {
    rmClass(this.captionElement, 'empty');
    rmClass(this.captionElement, 'retract');
  }
  this.captionElement.textContent = txt;
};

App.Components.TimelineStage.prototype.retractNavigation = function() {
  addClass(this.parent.btnPrev.getElement(), App.cssClasses.menuRetract);
  addClass(this.parent.btnNext.getElement(), App.cssClasses.menuRetract);
  addClass(this.captionElement, App.cssClasses.menuRetract);
};

App.Components.TimelineStage.prototype.extendNavigation = function() {
  rmClass(this.parent.btnPrev.getElement(), App.cssClasses.menuRetract);
  rmClass(this.parent.btnNext.getElement(), App.cssClasses.menuRetract);
  rmClass(this.captionElement, App.cssClasses.menuRetract);
};

/**
 * Use traditional addEventListener on image load for this callback
 */
App.Components.TimelineStage.prototype.onStageLoad = function() {
  App.Timers.reset('stage-hide-mousemove');
  App.Timers.add('stage-image', this.show.bind(this), 1000);
  var delay = 2000 + this.captionElement.textContent.length * 36;
  App.Timers.add('stage-content', this.retractNavigation.bind(this), delay);
};
