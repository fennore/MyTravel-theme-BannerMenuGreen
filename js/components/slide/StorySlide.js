/**
 * Prepare the story slide for switching between stories.
 * 
 * All stories are loaded in a long html list. (for now)
 * We remove the list from the DOM into a JS array.
 * One item will be displayed at a time into the story stage.
 * 
 * @todo implement vertical title carrousel
 * @todo implement lazy loading per 7 items, also keep the internal memory limited to 2*7 items
 * 
 * @returns {undefined}
 */
App.Components.StorySlide = function() {
  var storageKey = 'currentStory';
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
  // Add button events
  App.Events.add(new App.Models.Event('click', this.slide.btnNext.buttonElement, this.switchStory.bind(this)));
  App.Events.add(new App.Models.Event('keypress', null, this.switchStory.bind(this), 39));
  App.Events.add(new App.Models.Event('click', this.slide.btnPrev.buttonElement, this.switchStory.bind(this)));
  App.Events.add(new App.Models.Event('keypress', null, this.switchStory.bind(this), 37));
};

App.Components.StorySlide.prototype.build = function(stories) {
  // The first request can be the last items and needs to be bigger than 1 item
  // API knows and returns the new offset if this had to happen
  if(stories.offset && stories.offset !== this.slide.init) {
    this.slide.updateState(this.slide.init - stories.offset);
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
  
  if(cbAddSlideItems) {
    cbAddSlideItems(this, reqStart, reqCount);
  }
  
  // Update slide state
  this.slide.slideToItem(newAbsolutePosition);
  return this;
};
