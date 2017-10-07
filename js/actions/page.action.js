App.Actions.Page = {
  /**
   * Reset page.
   * This basically removes children from page element (App.page)
   */
  reset: function() {
    var last = App.page.pageElement.lastChild;
    while (last) {
      App.page.pageElement.removeChild(last);
      last = App.page.pageElement.lastChild;
    }
    App.page.pageElement.className = App.cssClasses.loading;
    return this;
  },
  /**
   * Sets wrapper class for page.
   * @param {string} wrapClass
   * @returns {App.Actions.Page}
   */
  setWrapClass: function(wrapClass) {
    if(wrapClass) {
      addClass(App.page.pageElement, wrapClass);
    }
    return this;
  },
  /**
   * Update page.
   * @param {type} page
   */
  update : function() {
    App.Timers.resetAll();
    App.menuMain.reset();
    App.menuMinor.reset();
    if(!(App.page instanceof App.Components.SimplePage)) {
      App.menuMain.extend();
      App.menuMinor.extend();
    } else {
      App.menuMain.retract();
      App.menuMinor.retract();
    }
    this.setWrapClass(App.page.wrapClass);
    document.title = App.page.title;
    // Render page
    App.page.render();
    App.page.menuLink.setCurrent();
    // Post render
    if(App.page.postRender) {
      App.page.postRender();
    }
    // Scroll up
    window.scrollBy(0, - window.innerHeight);
    // Set previous page
    App.previousPage = App.page;
    return this;
  }
};