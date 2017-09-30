/**
 * @todo could deduct from the API response whether it is an append or a prepend?
 * @type type
 */
App.Actions.Timeline = {
  initRequest : function(timelineSlide) {
    timelineSlide.slide.isLoading = true;
    var uri =  'api/timeline/' + timelineSlide.slide.init + '/' + timelineSlide.slide.sizeSlide + '/init';
    request('GET', App.basePath + '/' + uri, null, timelineSlide.build.bind(timelineSlide));
  },
  prependRequest : function(timelineSlide, offset, length) {
    timelineSlide.slide.isLoading = true;
    var uri = 'api/timeline/' + offset + '/' + length;
    request('GET', App.basePath + '/' + uri, null, timelineSlide.prepend.bind(timelineSlide));
  },
  appendRequest : function(timelineSlide, offset, length) {
    timelineSlide.slide.isLoading = true;
    var uri = 'api/timeline/' + offset + '/' + length;
    request('GET', App.basePath + '/' + uri, null, timelineSlide.append.bind(timelineSlide));
  }
}
