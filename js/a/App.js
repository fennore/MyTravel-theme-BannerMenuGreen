App = {
  page : null,
  scripts : document.getElementById('script-wrapper'),
  menuMain : null,
  menuMinor : null,
  previousPage : null,
  Router: null,
  Map: null,
  //
  Settings : {
    DefaultLocation: {lat: 53, lng: 11},
    MapZoomDefault: 7,
    MapZoomLocation: 15,
    MapZoomOverview: 4,
  },
  // Expansive objects
  Models : function() {},
  Components : function() {},
  Events : new function() {},
  Actions : function() {},
  Storage : function() {},
  Timers : new function() {},
  //
  GmapStyle : function() {},
  // Some css class collection
  cssClasses : {
    menuActive: 'current',
    menuRetract: 'retract',
    loading: 'loading',
    focus: 'focus',
    disableTransition: 'no-smooth',
    toggleOut: 'toggle-out'
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
    if(this.menuMinor) {
      this.menuMinor.render();
    }
    if(this.Map) {
      this.Map.render();
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