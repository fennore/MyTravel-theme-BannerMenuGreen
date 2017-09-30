App.Actions.Image = function() {
  
  this.resetImageFocusConditions = function () {
    var children = Data.contentNode.children;
    var l = children.length;
    for(var key = 0;  key < l; ++key) {
      if (key === 1) {
        Data.lastSwitchKey = Data.lastFocusKey = key;
        Data.focusChild = children[key];
        addClass(Data.focusChild, 'focus');
        Data.baseY = offset(Data.focusChild).top;
      } else {
        addClass(children[key], 'minify');
      }
      if (key > 1 && !Data.baseHeight) {
        Data.baseHeight = children[key].getBoundingClientRect().height + getStyle(children[key], "margin-bottom");
      }
    }
    var tagImg = Data.focusChild.querySelector('img');
    tagImg.src = dataset(tagImg, 'src');
    MapAction.updateLocation(tagImg);
    if(window.drawCircle && window.drawCircle.getVisible()) {
      Data.MytravelMap.panBy(- Data.windowRect.width/3, Data.baseHeight/2);
    }
  };
  
  this.setFocusChild = function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var nr = Math.round((scrollTop) / Data.baseHeight);
    if(Data.lastFocusKey !== nr + 1) {
      // Reset timeout on scroll
      if (Data.timeoutId) {
        clearTimeout(Data.timeoutId);
      }
      Data.lastFocusKey = nr + 1;
      rmClass(Data.focusChild, 'marked');
      Data.focusChild = Data.contentNode.children[Data.lastFocusKey];
      addClass(Data.focusChild, 'marked');
      var tagImg = Data.focusChild.querySelector('img');
      tagImg.src = dataset(tagImg, 'src');
      MapAction.updateLocation(tagImg);
      Data.timeoutId = setTimeout(ImageAction.switchFocus, Data.switchDelay);
    }
  };
  
  /**
   * @todo switch on non focus element, otherwise open baguettebox
   * @param {type} e
   * @returns {undefined}
   */
  this.switchFocusClean = function (e) {
    var elm = e.target;
    var tagImg;
    if(!elm || !elm.parentNode) {
      return;
    }
    if(elm.tagName === 'IMG') {
      tagImg = elm;
    }
    // when parent is a link
    // move up one more element
    // prevent further execution (caption) (baguettebox)    
    if(elm.parentNode.tagName === 'A') {
      elm = elm.parentNode;
    }
    if(!elm.parentNode.className.indexOf || elm.parentNode.className.indexOf('minify') === -1) {
      return;
    }
    if (Data.timeoutId) {
      clearTimeout(Data.timeoutId);
    }
    // prevent switch for if element is clicked in switchable area
    Data.preventSwitch = true;
    
    addClass(Data.focusChild, 'minify');
    rmClass(Data.focusChild, 'focus');
    
    Data.focusChild = elm.parentNode;
    // reset child key tracking
    Data.lastFocusKey = Data.lastSwitchKey = '1';
    
    rmClass(Data.focusChild, "marked");
    rmClass(Data.focusChild, "minify");
    addClass(Data.focusChild, "focus");
    
    if(!tagImg) {
      tagImg = Data.focusChild.querySelector('img');
    }
    tagImg.src = dataset(tagImg, 'src');
    MapAction.updateLocation(tagImg);
    if(window.drawCircle && window.drawCircle.getVisible()) {
      Data.MytravelMap.panBy(- Data.windowRect.width/3, Data.baseHeight/2);
    }
  };

  this.switchFocus = function () {
    // remember Id 0 is h1 title
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var topPos = scrollTop - Data.focusChild.getBoundingClientRect().top + Data.baseY;
    
    Data.lastSwitchKey = Data.lastFocusKey;
    
    rmClass(Data.focusChild, "marked");
    rmClass(Data.focusChild, "minify");
    addClass(Data.focusChild, "focus");
    
    if(window.drawCircle && window.drawCircle.getVisible()) {
      Data.MytravelMap.panBy(- Data.windowRect.width/3, Data.baseHeight/2);
    }
  };
};

