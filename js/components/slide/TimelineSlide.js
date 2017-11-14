/**
 * @todo should inherit from the Slide Component instead of embedding it
 * see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
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
    pager: timelinePager,
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
  this.slide.parentSwitchCallback = this.switchItem.bind(this);
};

App.Components.TimelineSlide.prototype.render = function() {
  // Render
  this.slide.render();
  // Remove possible events
  var kpNextEvent = new App.Models.Event('keydown', null, this.switchItem.bind(this), 39);
  var kpPrevEvent = new App.Models.Event('keydown', null, this.switchItem.bind(this), 37);
  App.Events
    .remove(kpNextEvent)
    .remove(kpPrevEvent);
  // Add button events
  App.Events
    .addTouch(new App.Models.Event(null, {
      left: this.slide.btnPrev.getElement(),
      right: this.slide.btnNext.getElement()
    }, {
      left: this.switchItem.bind(this),
      right: this.switchItem.bind(this)
    }))
    .add(new App.Models.Event('click', this.slide.btnSlideNext.getElement(), this.switchItem.bind(this)))
    .add(new App.Models.Event('click', this.slide.btnSlidePrev.getElement(), this.switchItem.bind(this)))
    .add(new App.Models.Event('click', this.slide.btnNext.getElement(), this.switchItem.bind(this)))
    .add(new App.Models.Event('click', this.slide.btnPrev.getElement(), this.switchItem.bind(this)))
    .add(kpNextEvent)
    .add(kpPrevEvent)
    .add(new App.Models.Event('mousemove', App.menuMain.getElement(), this.doMenuExtends.bind(this)))
    .add(new App.Models.Event('mousemove', App.menuMinor.getElement(), this.doMenuExtends.bind(this)));
  // Add global mousemove event, make sure it only exists once.
  window.removeEventListener('mousemove', this.onMouseMove.bind(this), true);
  window.addEventListener('mousemove', this.onMouseMove.bind(this), true);
};

App.Components.TimelineSlide.prototype.build = function(items) {
  // The first request can be the last items and needs to be bigger than 1 item
  // API knows and returns the new offset if this had to happen
  if(items.offset && items.offset !== this.slide.init) {
    this.slide.updateState(items.offset - this.slide.init);
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
  return this;
};

App.Components.TimelineSlide.prototype.prepend = function(items) {
  // Convert to TimelineItem objects
  var itemList = items.list.map(App.Models.createTimelineItem);
  this.slide
    .prepend(itemList);
  return this;
};
App.Components.TimelineSlide.prototype.append = function(items) {
  // Convert to Story objects
  var itemList = items.list.map(App.Models.createTimelineItem);
  this.slide
    .append(itemList);
  return this;
};

/**
 * 
 * @param {type} event
 * @returns {App.Components.StorySlide.prototype}
 */
App.Components.TimelineSlide.prototype.switchItem = function (event) {
  if(this.slide.isLoading || this.slide.stage.toggle.isToggledOut()) {
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
  // Jump element sets absolute position
  if(this.slide.carrousel.jump.jumpElement && target === this.slide.carrousel.jump.jumpElement) {
    newAbsolutePosition = event.clickValue;
    newPosition = newAbsolutePosition - this.slide.init;
  }
  // Determine going left or right, size and start
  var cbAddSlideItems;
  var reqCount = 0;
  var reqStart = this.slide.init + l;
  var batchBase = this.slide.calculateSlideBase(newAbsolutePosition);
  // Checks
  var checkExtremeR = newPosition >= l + this.slide.sizeRequest && batchBase - this.slide.init >= this.slide.sizeSlide;
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
  
  // Set slide as loading
  if(cbAddSlideItems) {
    this.slide.isLoading = true;
  }
  // Update currentItem state
  this.slide.switchToItem(newAbsolutePosition);
  // Execute callbacks to add Items
  if(cbAddSlideItems) {
    cbAddSlideItems(this, reqStart, reqCount);
  }
  
  return this;
};

App.Components.TimelineSlide.prototype.onMouseMove = function () {
  this.doExtends();
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
  return this;
};

App.Components.TimelineSlide.prototype.doRetracts = function () {
  this.slide.stage.retractNavigation();
  this.slide.carrousel.retract();
  App.menuMain.retract();
  App.menuMinor.retract();
  return this;
};