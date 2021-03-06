/**
 * Prepare the story slide for switching between stories.
 * 
 * All stories are loaded in a long html list. (for now)
 * We remove the list from the DOM into a JS array.
 * One item will be displayed at a time into the story stage.
 * 
 * @todo implement vertical title carrousel
 * @todo implement lazy loading per 7 items, also keep the internal memory limited to 2*7 items
 * @todo should inherit from athe Slide Component instead of embedding it
 * see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
 * 
 * @returns {undefined}
 */
App.Components.StorySlide = function() {
  var storageKey = 'currentStory';
  // Check previous page to fabricate saved story
  if(App.previousPage && (App.previousPage.linkedStoryPosition || App.previousPage.linkedStoryPosition === 0)) {
    localStorage.setItem(storageKey, App.previousPage.linkedStoryPosition);
  }
  // Set Components
  var storyStage = new App.Components.StoryStage();
  this.slide = new App.Components.Slide({
    sizeSlide: 7,
    sizeRequest: 2,
    stage: storyStage,
    storageKey: storageKey,
    // btns
    btnNext: new App.Components.SlideButton({
      direction: 'next',
      type: 'stage',
      parent: storyStage
    }),
    btnPrev: new App.Components.SlideButton({
      direction: 'prev',
      type: 'stage',
      parent: storyStage
    })
  });
  this.slide.setInitialPositions();
};

App.Components.StorySlide.prototype.render = function() {
  // Render
  this.slide.render();
  var kpNextEvent = new App.Models.Event('keydown', null, this.switchStory.bind(this), 39);
  var kpPrevEvent = new App.Models.Event('keydown', null, this.switchStory.bind(this), 37);
  // Remove keypress events
  App.Events
    .remove(kpNextEvent)
    .remove(kpPrevEvent);
  // Add button events
  App.Events
    .addTouch(new App.Models.Event(null, {
      left: this.slide.btnPrev.getElement(),
      right: this.slide.btnNext.getElement()
    }, {
      left: this.switchStory.bind(this),
      right: this.switchStory.bind(this)
    }))
    .add(new App.Models.Event('click', this.slide.btnNext.getElement(), this.switchStory.bind(this)))
    .add(new App.Models.Event('click', this.slide.btnPrev.getElement(), this.switchStory.bind(this)))
    .add(kpNextEvent)
    .add(kpPrevEvent);
};

App.Components.StorySlide.prototype.build = function(stories) {
  // The first request can be the last items and needs to be bigger than 1 item
  // API knows and returns the new offset if this had to happen
  if(stories.offset && stories.offset !== this.slide.init) {
    this.slide.updateState(stories.offset - this.slide.init);
  }
  // Set slide total
  if(stories.total) {
    this.slide.total = stories.total;
  }
  // Convert to Story objects
  var storyList = stories.list.map(App.Models.createStory);
  // Make sure loading is set to false
  this.slide.isLoading = false;
  this.slide
    .build(storyList);
};

App.Components.StorySlide.prototype.prepend = function(stories) {
  // Convert to Story objects
  var storyList = stories.list.map(App.Models.createStory);
  this.slide
    .prepend(storyList);
};

App.Components.StorySlide.prototype.append = function(stories) {
  // Convert to Story objects
  var storyList = stories.list.map(App.Models.createStory);
  this.slide
    .append(storyList);
};

/**
 * 
 * @param {type} event
 * @returns {App.Components.StorySlide.prototype}
 */
App.Components.StorySlide.prototype.switchStory = function (event) {
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
    cbAddSlideItems = App.Actions.Story.appendRequest;
  } else if(reqCount > 0) {
    cbAddSlideItems = App.Actions.Story.prependRequest;
    // Relative request start position for left is always the same
    reqStart = batchBase;
  }
  
  // Set slide as loading
  if(cbAddSlideItems) {
    this.slide.isLoading = true;
  }
  // Update slide state
  this.slide.switchToItem(newAbsolutePosition);
  // Execute callbacks to add Stories
  if(cbAddSlideItems) {
    cbAddSlideItems(this, reqStart, reqCount);
  }
  
  return this;
};
