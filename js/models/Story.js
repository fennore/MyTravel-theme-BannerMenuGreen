App.Models.Story = function (data) {
  this.title = data.title;
  this.path = data.path;
  this.content = data.content;
  this.imagelist = []; // data.link
};

App.Models.createStory = function (data) {
  return new App.Models.Story(data);
};

App.Models.Story.prototype.toString = function() {
  return '<article>' +
    '<header>' +
      '<h1>' + this.title + '</h1>' +
    '</header>' + 
    '<div class="written">' + this.content + '</div>' +
    '<footer>' +
      this.imagelist.map(App.Models.createStoryImage).join('') +
    '</footer>' +
  '</article>';
};