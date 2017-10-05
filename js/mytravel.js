/**
 * @todo Step 1: fetch config data from php or have dynamic generated js bit in jsbundle {App.Config}
 */
App.basePath = '/mytravel2'; // Equal to php basepath
App.siteName = window.location.hostname.charAt(0).toUpperCase() + window.location.hostname.slice(1);
App.Router = new Navigo(App.basePath, false, '#!');
App.Router
  .on({
    'manage/geo': function() {},
    'about': function() {
      App.page = new App.Components.SimplePage({
        title: 'About | ' + App.siteName,
        wrapClass: 'info',
        menuLink: App.menuMain.linksBag[2],
        content: App.Templates.pageInfo()
      });
      App.Actions.Page
        .reset()
        .update();
    }
  })
  .on(/^\/scribble(?:\/([^\/]+))?/, function (path) {
    App.page = new App.Components.StoryPage({
      title: 'Scribbles | ' + App.siteName,
      filter: path,
      wrapClass: 'story',
      menuLink: App.menuMain.linksBag[0]
    });
    App.Actions.Page
      .reset()
      .update();
  })
  .on(/^\/timeline(?:\/([^\/]+))?/, function (path) {
    App.page = new App.Components.TimelinePage({
      title: 'Timeline | ' + App.siteName,
      filter: path,
      wrapClass: 'image timeline',
      menuLink: App.menuMain.linksBag[1]
    });
    App.Actions.Page
      .reset()
      .update();
  })
  .on(/^\/$/, function() {
    App.page = new App.Components.SimplePage({
      title: 'Welcome | ' + App.siteName,
      wrapClass: 'intro',
      menuLink: App.menuMinor.linksBag[0],
      content: App.Templates.pageHome()
    });
    App.Actions.Page
      .reset()
      .update();
  });
App.menuMain = new App.Components.Menu('menu', [
  new App.Components.MenuButton(null, 'scribble', 'Scribbles', 'story-svg'),
  new App.Components.MenuButton(null, 'timeline', 'Timeline', 'timeline-svg'),
  new App.Components.MenuButton(null, 'about', 'About', 'info-svg')
]);
App.menuMinor = new App.Components.Menu('menu-minor', [
  new App.Components.MenuLink(null, '', 'Intro')
]);
App.Map = new App.Components.MapBackground();
App.render();
console.log(App.Events.eventList);
