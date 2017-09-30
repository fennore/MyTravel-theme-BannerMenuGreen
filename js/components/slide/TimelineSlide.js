App.Components.TimelineSlide = function() {
  var storageKey = 'currentTimelineItem';
  var timelineStage = new App.Components.TimelineStage();
  var timelineCarrousel = new App.Components.TimelineCarrousel();
  this.slide = new App.Components.Slide({
    sizeSlide: 105,
    sizeRequest: 35,
    stage: timelineStage,
    carrousel: timelineCarrousel,
    storageKey: storageKey,
    // btns
    btnNext: new App.Components.SlideButton({
      direction: 'next',
      type: 'stage',
      parent: timelineStage
    }),
    btnPrev: new App.Components.SlideButton({
      direction: 'prev',
      type: 'stage',
      parent: timelineStage
    }),
    btnSlideNext: new App.Components.SlideButton({
      direction: 'next',
      type: 'carrousel',
      parent: timelineCarrousel
    }),
    btnSlidePrev: new App.Components.SlideButton({
      direction: 'prev',
      type: 'carrousel',
      parent: timelineCarrousel
    })
  });
}

App.Components.TimelineSlide.prototype.render = function() {
  
}

App.Components.TimelineSlide.prototype.build = function(items) {
  
}