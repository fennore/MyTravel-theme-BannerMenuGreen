/**
 * Slide Component
 * @todo check use of customevent
 * @param {type} slideData
 * @returns {App.Components.Slide}
 */
App.Components.Slide = function(slideData) {
  this.sizeSlide = slideData.sizeSlide;
  this.sizeRequest = slideData.sizeRequest;
  // State
  this.currentItem = this.newCurrentItem = slideData.currentItem;
  this.init = null;
  this.total = 0;
  this.isLoading = false;
  this.transformValue = 0;
  this.moveRoot = 0;
  this.moveNext = 0;
  this.movePrev = 0;
  // Button elements
  this.btnNext = slideData.btnNext || null; // Next + 1
  this.btnPrev = slideData.btnPrev || null; // Prev + 1
  this.btnSlideNext = slideData.btnSlideNext || null; // Next slide jump
  this.btnSlidePrev = slideData.btnSlidePrev || null; // Prev slide jump
  // Slide elements
  this.carrousel = slideData.carrousel || null;
  this.stage = slideData.stage || null;
  this.pager = slideData.pager || null;
  //
  this.storageKey = slideData.storageKey;
  //
  this.dataList;
  // If there is a carrousel, set the slide as its parent Component
  if(this.carrousel) {
    this.carrousel.setParent(this);
  }
  if(this.stage) {
    this.stage.setParent(this);
  }
  if(this.pager) {
    this.pager.setParent(this);
  }
};

/**
 * Standalone callback render function
 * @param {Model} item Model with viewAsCarrouselItem function
 * @returns {string}
 */
App.renderCarrouselItem = function(item) {
  return item.viewAsCarrouselItem();
};

/**
 * 
 * @returns {undefined}
 */
App.Components.Slide.prototype.render = function() {
  if(this.carrousel) {
    this.carrousel.render();
  }
  if(this.stage) {
    this.stage.render();
  }
  if(this.pager) {
    this.pager.render();
  }
  if(this.btnNext) {
    this.btnNext.render();
  }
  if(this.btnPrev) {
    this.btnPrev.render();
  }
  if(this.btnSlideNext) {
    this.btnSlideNext.render();
  }
  if(this.btnSlidePrev) {
    this.btnSlidePrev.render();
  }
};

/**
 * 
 * @returns {Number}
 */
App.Components.Slide.prototype.setInitialPositions = function() {
  var stored = parseInt(localStorage.getItem(this.storageKey)) || 0;
  this.init = Math.max(Math.floor(stored/this.sizeRequest) - 1, 0)*this.sizeRequest;
  this.currentItem = stored - this.init;
  console.log(stored, this.init, this.currentItem);
  return this;
};

/**
 * @param {Number} key Absolute position in slide of item
 * @returns {Number}
 */
App.Components.Slide.prototype.calculateSlideBase = function(key) {
  var multiplierBase = Math.max(Math.floor(key/this.sizeRequest) - 1, 0);
  var multiplierLimit = Math.max(Math.ceil((this.total - this.sizeSlide)/this.sizeRequest), 0);
  return Math.min(multiplierBase*this.sizeRequest, multiplierLimit*this.sizeRequest);
};

/**
 * Recursive function to set the SlideNext key.
 * This is the first carrousel item towards the end that is not fully visible.
 * @param {Number} key
 * @returns {App.Components.Slide.prototype@call;findItemSlideNext|Number}
 */
App.Components.Slide.prototype.findItemSlideNext = function(key) {
  if(!key && key !== 0) {
    key = this.currentItem;
  }
  if(!this.dataList[key] || !this.dataList[key + 1] || !this.carrousel) {
    // return current active item
    // because we don't have to move for already visible items
    return this.moveNext || 0;
  }
  var elm = this.carrousel.carrouselElement.children[++key];
  // check if the right side of the element is outside of the parent wrapper
  var transformCheckNext = this.carrousel.transformCheckNext(elm); //

  if(elm && transformCheckNext) {
    this.moveNext = key;
    return key;
  } else if(elm) {
    return this.findItemSlideNext(key);
  }
};

/**
 * Recursive function to set the SlidePrev key.
 * This is the first carrousel item towards the begin that is not fully visible.
 * @param {type} key
 * @returns {App.Components.Slide.prototype@call;findItemSlidePrev|Number}
 */
App.Components.Slide.prototype.findItemSlidePrev = function(key) {
  if(!key && key !== 0) {
    key = this.currentItem;
  }
  if(!this.dataList[key] || !this.dataList[key - 1] || !this.carrousel) {
    // return the last valid key
    // because it could not be visible being positioned on the left
    this.movePrev = 0;
    return this.movePrev;
  }
  var elm = this.carrousel.carrouselElement.children[key - 1];
  // check if the left side of the element
  // is positioned more than 1 parent width left
  var transformCheckPrev = this.carrousel.transformCheckPrev(elm);
  if(elm && transformCheckPrev) {
    this.movePrev = key;
    return key;
  } else if(elm) {
    return this.findItemSlidePrev(--key);
  }
};

/**
 * 
 * @param {type} diff
 * @returns {undefined}
 */
App.Components.Slide.prototype.updateState = function(diff) {
  this.init -= diff;
  this.currentItem += diff;
  this.newCurrentItem += diff;
  this.moveNext += diff;
  this.movePrev += diff;
  this.moveRoot += diff;
};

/**
 * 
 * @returns {undefined}
 */
App.Components.Slide.prototype.getCurrentItemData = function() {
  if(!this.dataList[this.currentItem]) {
    return;
  }
  return this.dataList[this.currentItem];
};

/**
 * Move to new item.
 * @param {int} offset Absolute position of requested item.
 * @returns {undefined}
 */
App.Components.Slide.prototype.slideToItem = function(offset) {
  if (!this.carrousel && !this.stage) {
    return this;
  }
  if(!offset && offset !== 0) {
    offset = Math.max(parseInt(localStorage.getItem(this.storageKey)) || 0, 0);
  }
  var invalidateKey = (offset < 0 || offset >= this.total || !Number.isInteger(offset))
  if(this.newCurrentItem && invalidateKey) {
    // Do absolutely nothing!
    return;
  }
  // Batch base start
  var newInit = this.calculateSlideBase(offset);
  var diff = newInit - this.init;
  // Remove element in dataList below init as they should not exist
  if(diff > 0) {
    this.dataList.splice(0, diff);
  }
  this.init = newInit; 
  this.newCurrentItem = offset - this.init;
  this.disableButtons();
  //
  if(this.stage) {
    addClass(this.stage.stageElement, App.cssClasses.loading);
  }
  if(this.carrousel) {
    rmClass(this.carrousel.carrouselElement.children[this.currentItem], App.cssClasses.focus);
  }

  this.currentItem = this.newCurrentItem;
  
  this.updateSlide();

  return this;
};

/**
 * Builds the slide with given items
 * @returns {undefined}
 */
App.Components.Slide.prototype.build = function(items) {
  if(!items) {
    return this;
  }
  this.dataList = items;
  // Render Carrousel
  if(this.carrousel) {
    this.carrousel.getElement().insertAdjacentHTML(
      'afterbegin',
      items.map(App.renderCarrouselItem).join('')
    );
  }
  this.updateSlide();
  return this;
};

/**
 * 
 * @returns {App.Components.Slide}
 */
App.Components.Slide.prototype.prepend = function(items) {
  // Set "Virtual DOM"
  Array.prototype.unshift.apply(this.dataList, items);
  // Render Carrousel
  if(this.carrousel) {
    this.carrousel.getElement().insertAdjacentHTML(
      'afterbegin',
      items.map(App.renderCarrouselItem).join('')
    );
  }
  this.rightTrim();
  this.isLoading = false;
  this.updateSlide();
  return this;
};

/**
 * 
 * @returns {App.Components.Slide}
 */
App.Components.Slide.prototype.append = function(items) {
  // Set "Virtual DOM"
  Array.prototype.push.apply(this.dataList, items);
  // Render Carrousel
  if(this.carrousel) {
    this.carrousel.getElement().insertAdjacentHTML(
      'beforeend',
      items.map(App.renderCarrouselItem).join('')
    );
  }
  this.leftTrim();
  this.isLoading = false;
  this.updateSlide();
  return this;
};

/**
 * 
 * @returns {App.Components.Slide}
 */
App.Components.Slide.prototype.leftTrim = function() {
  var diff = this.dataList.length - this.sizeSlide;
  if(diff > 0) {
    // Update state for trim on the left
    this.updateState(-diff);
    // Trim
    this.dataList.splice(0, diff);
  }
  // Trim carrousel
  
  return this;
};

/** 
 * @returns {App.Components.Slide}
 */
App.Components.Slide.prototype.rightTrim = function() {
  var diff = this.dataList.length - this.sizeSlide;
  if(diff > 0) {
    // Trim 
    this.dataList.splice(this.sizeSlide, diff);
  }
  // Trim carrousel
  
  return this;
};

/**
 * 
 * @returns {App.Components.Slide.prototype}
 */
App.Components.Slide.prototype.updateSlide = function() {
  if(this.isLoading) {
    return this;
  }
  // Update moveNext and movePrev
  this.findItemSlidePrev();
  this.findItemSlideNext();
  // show stage
  this.show();
  // slide the carrousel
  this.updateCarrousel();
  // update pager
  this.updatePager()
  // update slide nav
  this.updateSlideNav();
  // Enable buttons
  this.enableButtons();
  
  return this;
};

/**
 * Show the current Item in the stage
 * @returns {App.Components.Slide}
 */
App.Components.Slide.prototype.show = function() {
  var item = this.getCurrentItemData();
  if(!item) {
    return this;
  }
  // Set storage
  localStorage.setItem(this.storageKey, this.init + this.currentItem);
  
  // Stage.update
  if(this.stage) {
    this.stage.update(item);
    rmClass(this.stage.stageElement, App.cssClasses.loading);
  }
  return this;
};

/**
 * 
 * @returns {App.Components.Slide.prototype}
 */
App.Components.Slide.prototype.updateCarrousel = function() {
  if(!this.carrousel) {
    return this;
  }
  this.carrousel.update();
  // Make sure there is no transition disabled
  rmClass(this.carrousel.carrouselElement, App.cssClasses.disableTransition);
  // Set focus
  addClass(this.carrousel.getFocusElement(), App.cssClasses.focus);
  // Only slide if currentItem is out of visible scope
  var checkBefore = this.moveRoot > this.currentItem;
  var checkAfter = this.currentItem >= this.moveNext;
  // Set new move root
  if(checkBefore || checkAfter) {
    this.moveRoot = this.currentItem;
  } else {
    return this;
  }
  // Find new offset
  this.transformValue = this.carrousel.getTransformValue();
  // Tranform
  var tf = (this.carrousel.transformType || 'translateX') + '(-' + this.transformValue + 'px)';
  this.carrousel.carrouselElement.style.msTransform = tf;
  this.carrousel.carrouselElement.style.MozTransform = tf;
  this.carrousel.carrouselElement.style.webkitTransform = tf;
  this.carrousel.carrouselElement.style.OTransform = tf;
  this.carrousel.carrouselElement.style.transform = tf;
  return this;
};

/**
 * 
 * @returns {App.Components.Slide.prototype}
 */
App.Components.Slide.prototype.updatePager = function() {
  if(!this.pager) {
    return this;
  }
  this.pager.update();
  this.pager.setCurrent();
};

/**
 * 
 * @returns {undefined}
 */
App.Components.Slide.prototype.updateSlideNav = function() {
  if(this.carrousel) {
    
  }
};

/**
 *
 * @returns {undefined} 
 */
App.Components.Slide.prototype.disableButtons = function() {
  if(this.btnNext) {
    this.btnNext.disable();
  }
  if(this.btnPrev) {
    this.btnPrev.disable();
  }
  if(this.btnSlideNext) {
    this.btnSlideNext.disable();
  }
  if(this.btnSlidePrev) {
    this.btnSlidePrev.disable();
  }
  return this;
};

/**
 *
 * @returns {undefined} 
 */
App.Components.Slide.prototype.enableButtons = function() {
  if(this.btnNext && this.currentItem < this.dataList.length - 1) {
    this.btnNext.enable();
  }
  if(this.btnPrev && (this.currentItem > 0 || this.init > 0)) {
    this.btnPrev.enable();
  }
  if(this.btnSlideNext && this.moveNext > this.moveRoot) {
    this.btnSlideNext.enable();
  }
  if(this.btnSlidePrev && this.movePrev > this.findItemSlidePrev()) {
    this.btnSlidePrev.enable();
  }
  return this;
};
