/**
 * @todo API should return proper full path data so js doesn't have to care about basepath or anything
 * @param {type} data
 * @returns {App.Models.TimelineItem}
 */
App.Models.TimelineItem = function (data) {
  this.title = data.title;
  this.path = data.path;
  this.content = data.content;
  this.thumbnail = data.setting.thumbnail; // data.link
};

App.Models.createTimelineItem = function (data) {
  return new App.Models.TimelineItem(data);
};

App.Models.TimelineItem.prototype.toString = function() {
  return '<h1>' + this.title + '</h1>' +
    '<img class="tl-img" src="' + App.basePath + '/img/' + this.path + '" />' +
  '<figcaption class="written">' + this.content + '</figcaption>';
};

/**
 * @todo set width and height parameters, needs update on API side
 * @returns {String}
 */
App.Models.TimelineItem.prototype.viewAsCarrouselItem = function() {
  return '<span>' +
    '<img ' +
      'src="" ' +
      'title="' + this.title + '" ' +
      'alt="' + this.title + '" ' +
      'width="' + this.thumbnail.width + '" ' +
      'height="' + this.thumbnail.height + '" ' +
    ' />' +
  '</span>';
};