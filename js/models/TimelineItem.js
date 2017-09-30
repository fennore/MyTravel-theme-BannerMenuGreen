
App.Models.TimelineItem = function (data) {
  this.title = data.title;
  this.path = data.path;
  this.content = data.content;
  this.imagelist = []; // data.link
};

App.Models.createTimelineItem = function (data) {
  return new App.Models.TimelineItem(data);
};

App.Models.TimelineItem.prototype.toString = function() {
  return '<h1>' + this.title + '</h1>' +
    '<img class="tl-img" src="' + App.basePath + '/img/' + this.path + '" />' +
  '<figcaption class="written">' + this.content + '</figcaption>';
};