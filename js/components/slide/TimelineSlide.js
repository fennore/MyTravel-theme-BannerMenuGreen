/**
 * @returns {App.Components.TimelineSlide}
 */
App.Components.TimelineSlide = function() {
  var storageKey = 'currentTimelineItem';
  var timelineStage = new App.Components.TimelineStage();
  var timelineCarrousel = new App.Components.TimelineCarrousel();
  var timelinePager = new App.Components.TimelinePager();
  // pager
  this.slide = new App.Components.Slide({
    sizeSlide: 105,
    sizeRequest: 35,
    stage: timelineStage,
    carrousel: timelineCarrousel,
    storageKey: storageKey,
    // btns
    btnNext: new App.Components.SlideButton({
      direction: 'next',
      type: 'stage',
      parent: timelineStage
    }),
    btnPrev: new App.Components.SlideButton({
      direction: 'prev',
      type: 'stage',
      parent: timelineStage
    }),
    btnSlideNext: new App.Components.SlideButton({
      direction: 'next',
      type: 'carrousel',
      parent: timelineCarrousel
    }),
    btnSlidePrev: new App.Components.SlideButton({
      direction: 'prev',
      type: 'carrousel',
      parent: timelineCarrousel
    })
  });
  this.slide.setInitialPositions();
};

App.Components.TimelineSlide.prototype.render = function() {
  // Render
  this.slide.render();
  // Add button events
  App.Events.add(new App.Models.Event('click', this.slide.btnSlideNext.buttonElement, this.switchItem.bind(this)));
  App.Events.add(new App.Models.Event('click', this.slide.btnSlidePrev.buttonElement, this.switchItem.bind(this)));
  App.Events.add(new App.Models.Event('click', this.slide.btnNext.buttonElement, this.switchItem.bind(this)));
  App.Events.add(new App.Models.Event('keypress', null, this.switchItem.bind(this), 39));
  App.Events.add(new App.Models.Event('click', this.slide.btnPrev.buttonElement, this.switchItem.bind(this)));
  App.Events.add(new App.Models.Event('keypress', null, this.switchItem.bind(this), 37));
  App.Events.add(new App.Models.Event('mousemove', App.menuMain, this.doMenuExtends.bind(this)));
  App.Events.add(new App.Models.Event('mousemove', App.menuMinor, this.doMenuExtends.bind(this)));
  // Add global mousemove event, make sure it only exists once.
  window.removeEventListener('mousemove', this.onMouseMove.bind(this), true);
  window.addEventListener('mousemove', this.onMouseMove.bind(this), true);
};

App.Components.TimelineSlide.prototype.build = function(items) {
  // The first request can be the last items and needs to be bigger than 1 item
  // API knows and returns the new offset if this had to happen
  if(items.offset && items.offset !== this.slide.init) {
    this.slide.updateState(this.slide.init - items.offset);
  }
  // Set slide total
  if(items.total) {
    this.slide.total = items.total;
  }
  // Convert to TimelineItem objects
  var itemList = items.list.map(App.Models.createTimelineItem);
  // Make sure loading is set to false
  this.slide.isLoading = false;
  this.slide
    .build(itemList);
};

App.Components.TimelineSlide.prototype.prepend = function(items) {
  // Convert to TimelineItem objects
  var itemList = items.list.map(App.Models.createTimelineItem);
  this.slide
    .prepend(itemList);
};
App.Components.TimelineSlide.prototype.append = function(items) {
  // Convert to Story objects
  var itemList = items.list.map(App.Models.createTimelineItem);
  this.slide
    .append(itemList);
};

/**
 * 
 * @param {type} event
 * @returns {App.Components.StorySlide.prototype}
 */
App.Components.TimelineSlide.prototype.switchItem = function (event) {
  if(this.slide.isLoading) {
    return this;
  }
  var LEFT = 37;
  var RIGHT = 39;
  var target = event.element;

  // Imitate button click on keypress
  if(event.code === LEFT) {
    target = this.slide.btnPrev.buttonElement;
  } else if(event.code === RIGHT) {
    target = this.slide.btnNext.buttonElement;
  }
  var newPosition = 0;
  // Get new element position
  if(this.slide.btnPrev && target === this.slide.btnPrev.buttonElement) {
    newPosition = this.slide.currentItem - 1;
  } else if(this.slide.btnSlideNext && target === this.slide.btnSlideNext.buttonElement) {
    newPosition = this.slide.moveNext;
  } else if(this.slide.btnSlidePrev && target === this.slide.btnSlidePrev.buttonElement) {
    newPosition = this.slide.movePrev;
  } else {
    newPosition = this.slide.currentItem + 1;
  }
  var l = this.slide.dataList.length;
  var newAbsolutePosition = Math.max(this.slide.init + newPosition, 0);
  // Determine going left or right, size and start
  var cbAddSlideItems;
  var reqCount = 0;
  var reqStart = this.slide.init + l;
  var batchBase = this.slide.calculateSlideBase(newAbsolutePosition);
  // Checks
  var checkExtremeR = newPosition >= l + this.slide.sizeRequest;
  var checkExtremeL = newAbsolutePosition < Math.max(this.slide.init - this.slide.sizeRequest, 0);
  var checkMidNext = newPosition >= l;
  var checkMidPrev = (newPosition < 0 && this.slide.init >= this.slide.sizeRequest*2);
  var limitCheck = this.slide.init + l < this.slide.total && newPosition > this.slide.currentItem;
  var checkNext = newPosition >= l - this.slide.sizeRequest && limitCheck;
  var checkPrev = newPosition < this.slide.sizeRequest && this.slide.init >= this.slide.sizeRequest;
  if(checkExtremeR || checkExtremeL || l === 0) {
    reqCount = this.slide.sizeSlide;
    reqStart = batchBase;
  } else if(checkMidNext || checkMidPrev) {
    reqCount = this.slide.sizeRequest*2;
  } else if(checkNext || checkPrev) {
    reqCount = this.slide.sizeRequest;
  }
  
  // Set function calls and callback accordingly
  if(reqCount > 0 && newPosition > this.slide.currentItem) {
    cbAddSlideItems = App.Actions.Timeline.appendRequest;
  } else if(reqCount > 0) {
    cbAddSlideItems = App.Actions.Timeline.prependRequest;
    // Relative request start position for left is always the same
    reqStart = batchBase;
  }
  
  if(cbAddSlideItems) {
    cbAddSlideItems(this, reqStart, reqCount);
  }
  
  // Update slide state
  this.slide.slideToItem(newAbsolutePosition);
  return this;
};

App.Components.TimelineSlide.prototype.onMouseMove = function () {
  App.Timers.add('stage-show-mousemove', this.doExtends.bind(this), 250);
  App.Timers.add('stage-hide-mousemove', this.doRetracts.bind(this), 1250);
};
/**
 * @param {Event} event Original JS event object
 * @returns {App.Components.TimelineSlide}
 */
App.Components.TimelineSlide.prototype.doExtends = function () {
  this.slide.stage.extendNavigation();
  return this;
};

App.Components.TimelineSlide.prototype.doMenuExtends = function () {
  App.menuMain.extend();
  App.menuMinor.extend();
}

App.Components.TimelineSlide.prototype.doRetracts = function () {
  this.slide.stage.retractNavigation();
  this.slide.carrousel.retract();
  App.menuMain.retract();
  App.menuMinor.retract();
  return this;
};