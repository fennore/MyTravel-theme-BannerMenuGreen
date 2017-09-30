/**
 * @todo could deduct from the API response whether it is an append or a prepend?
 * @type type
 */
App.Actions.Story = {
  initRequest : function(storySlide) {
    storySlide.slide.isLoading = true;
    var uri =  'api/story/' + storySlide.slide.init + '/' + storySlide.slide.sizeSlide + '/init';
    request('GET', App.basePath + '/' + uri, null, storySlide.build.bind(storySlide));
  },
  prependRequest : function(storySlide, offset, length) {
    storySlide.slide.isLoading = true;
    var uri = 'api/story/' + offset + '/' + length;
    request('GET', App.basePath + '/' + uri, null, storySlide.prepend.bind(storySlide));
  },
  appendRequest : function(storySlide, offset, length) {
    storySlide.slide.isLoading = true;
    var uri = 'api/story/' + offset + '/' + length;
    request('GET', App.basePath + '/' + uri, null, storySlide.append.bind(storySlide));
  }
}
