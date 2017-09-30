/**
 * @todo add img dimension properties
 * @param {type} data
 * @returns {App.Models.StoryImage}
 */
App.Models.StoryImage = function (data) {
  this.title = data.title;
  this.path = data.path;
};

App.Models.createStoryImage = function (data) {
  return new App.Models.StoryImage(data);
};

/**
 * Overwrite toString()
 * @todo make the link work with Navigo
 * @returns {App.Models.Story.template}
 */
App.Models.StoryImage.prototype.toString = function() {
  return '<figure>' +
    '<a href="' + App.basePath + '/img/' + this.path + '">' +
      '<img src="' + App.basePath + '/img/' + this.path + '/thumbnail" title="' + this.title + '" alt="' + this.title + '" />' +
    '</a>' +
  '</figure>';
};