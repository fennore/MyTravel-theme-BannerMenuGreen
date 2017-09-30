App = {
  page : null,
  menuMain : null,
  menuMinor : null,
  previousPage : null,
  Router: null,
  // Expansive objects
  Models : function() {},
  Components : function() {},
  Events : new function() {},
  Actions : function() {},
  Storage : function() {},
  Timers : new function() {},
  // Some css class collection
  cssClasses : {
    mainMenuActive: 'current',
    menuRetract: 'retract',
    loading: 'loading',
    focus: 'focus',
    disableTransition: 'no-smooth'
  },
  // Render method
  render : function() {
    if(this.Router) {
      this.Router.resolve(window.location.pathname);
    }
    if(this.menuMain) {
      this.menuMain.render();
    }
    if(this.menuMinor) {
      this.menuMinor.render();
    }
  },
  // Update path
  updatePath : function(path) {
    if(this.Router) {
      //this.Router.pause(); // Because Navigo is bugged and stupid this is not needed
      this.Router.navigate(path);
      //this.Router.resume(); // or .pause(false)
    }
  }
};