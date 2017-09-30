App.Templates = {
  editLocation : function(location) {
    return ' x ' +
      '<span id="loc-edit-info" contenteditable="true">' + 
        location.info +
      '</span> + ' +
      '<span id="loc-edit-stage" contenteditable="true">' +
        location.stage +
      '</span>';
  },
  selectStage : function(stage) {
    return '<option>' + stage + '</option>';
  },
  slideItem : function(image) {
    return '<span>' +
      '<img ' +
        'src=""' +
        'title="' + image.title + '" ' +
        'alt="' + image.title + '" ' +
        'width="' + image.width + '" ' +
        'height="' + image.height + '" />' +
    '</span>';
  },
  slideJumper : function(jumpList) {
    return '<ul id="slide-jumper">' + Object.keys(jumpList).map(this.slideJumperItem).join('') + '</li></ul>';
  },
  slideJumperItem : function(tag) {
    return '<li>' + tag + '</li>';
  },
  slideTotal : function(current, total) {
    return '<div class="slide-total"><span id="slide-total-edit">' + current + '</span> of ' + total + '</div>';
  },
  pagerButton : function() {
    return '<button></button>';
  },
  storyItem : function(story) {
    return '<article>' +
    '<header>' +
      '<h1>' + story.title + '</h1>' +
    '</header>' + 
    '<div class="written">' + story.text + '</div>' +
    '<footer>' +
      story.imagelist.map(this.storyImage).join('') +
    '</footer>' +
    '</article>';
  },
  storyImage : function(image) {
    return '<figure>' +
      '<a href="' + Data.basePath + '/img/' + image.path + '">' +
        '<img src="' + Data.basePath + '/img/' + image.path + '/thumbnail" title="' + image.title + '" alt="' + image.title + '" width="' + image.width + '" height="' + image.height + '" />' +
      '</a>' +
    '</figure>';
  },
  pageHome : function() {
    return '<article class="written">' +
        '<p>a tale from on two wheels or two feet<br>' +
        'a puzzle of memories<br>' +
        'not to find what you are looking for but to look at what you find<br>' +
        'that\'s the wisdom of a traveler\'s mind</p>' +
      '</article>';
  },
  pageTimeline : function() {
    return '<figure id="timeline-in-focus">' +
      '<h1>Timeline</h1>' +
      '<img class="tl-img" />' +
      '<figcaption class="written"></figcaption>' +
      '<button class="img-prev" type="button">' +
        'Previous' +
        '<svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>' +
      '</button>' +
      '<button class="img-next" type="button">' +
        'Next' +
        '<svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>' +
      '</button>' +
    '</figure>' +
    '<div class="timeline-slide-wrapper">' +
      '<div class="timeline-slide no-smooth"></div>' +
      '<button class="slide-left" disabled="disabled" type="button">' +
        'Previous' +
        '<svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>' +
      '</button>' +
      '<button class="slide-right" disabled="disabled" type="button">' +
        'Next' +
        '<svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>' +
      '</button>' +
    '</div>' +
    '<div id="pager-buttons"></div>';
  },
  pageInfo : function() {
    return '<article>' +

      '<div class="written">' +
        '<h2>No numbers</h2>' +
        '<p>I thought it\'d be good to not occupy myself with possessions. <br>' +
        'And what else are data and numbers in the context of travel.<br>' +
        'So those are not to be found.<br>' +
        'And nothing has changed my mind.</p>' +
        '<h2 class="r-align">Bicycle</h2>' +
        '<p class="r-align">About bicycle travel?<br>' +
        'It is just a splendid way of getting around.<br>' +
        'Take as little as possible with you.<br>' +
        'Take as much as you need to feel comfortable.<br>' +
        'After all you do not want to burden yourself with stupid thoughts.</p>' +
        '<h2>Try it</h2>' +
        '<p>Why don\'t you try?<br>' +
        'Short trips, long yourneys.<br>' +
        'Alone, with two, or a whole group?<br>' +
        'With family, baby, or all grown up.<br>' +
        'Short, tall, heavy bones or light as a feather.<br>' +
        'You will find all of that and more.<br>' +
        'A lack of imagination is all that is holding you back.</p>' +
        '<p class="r-align"><br>' +
        'I will give the last words to ...<br><br>' +
        'Charles Baudelaire<br><br>' +
        '"Mais les vrais voyageurs sont ceux-là seuls qui partent<br>' +
        'Pour partir; coeurs légers, semblables aux ballons,<br>' +
        'De leur fatalité jamais ils ne s&#8216;écartent,<br>' +
        'Et, sans savoir pourquoi, disent toujours: Allons!"</p>' +
      '</div>' +
      
      '<footer></footer>' +
    '</article>';
  },
  loadCubes : function() {
    return '<div class="sk-cube-grid">' +
      '<div class="sk-cube sk-cube1"></div>' +
      '<div class="sk-cube sk-cube2"></div>' +
      '<div class="sk-cube sk-cube3"></div>' +
      '<div class="sk-cube sk-cube4"></div>' +
      '<div class="sk-cube sk-cube5"></div>' +
      '<div class="sk-cube sk-cube6"></div>' +
      '<div class="sk-cube sk-cube7"></div>' +
      '<div class="sk-cube sk-cube8"></div>' +
      '<div class="sk-cube sk-cube9"></div>' +
    '</div>';
  },
  stageToggle : function() {
    return '<div class="slide-stage-toggle">&times;</div>';
  }
};