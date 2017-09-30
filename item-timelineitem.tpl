{% extends "default.tpl" %}

{% block title %}Timeline | Suzybiker.be{% endblock %}
{% block head %}
    {{ parent() }}
{% endblock %}

{% block menu %}
<a href="{{path('story')}}" title="Scribbles">
  <svg class="icon story-svg">
  <use xlink:href="#story-svg"></use>
  </svg>
  Scribbles
</a>
<a href="{{path('timeline')}}" class="current" title="Timeline">
  <svg class="icon timeline-svg">
  <use xlink:href="#timeline-svg"></use>
  </svg>
  Timeline
</a>
<a href="{{path('about')}}" title="About">
  <svg class="icon info-svg">
  <use xlink:href="#info-svg"></use>
  </svg>
  About
</a>
{% endblock %}

{% block content %}
<div id="content" class="image timeline">

  <figure id="timeline-in-focus" data-pos="{{position}}">
    <h1>Timeline</h1>
    <img class="tl-img" />
    <figcaption></figcaption>
    <button class="img-prev" type="button">
      Previous
      <svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>
    </button>
    <button class="img-next" type="button">
      Next
      <svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>
    </button>
  </figure>
  <div class="timeline-slide-wrapper">
    <div class="timeline-slide no-smooth">{% for item in itemlist %}{% block image %}<span>
          <img src="{{path('img', {title: item.path, trail: 'thumbnail'})}}" 
               title="{{item.title}}" alt="{{item.title}}"
               data-lat="{{item.property.coordinate.lat}}" data-lng="{{item.property.coordinate.lng}}" data-full="{{path('img', {title: item.path})}}" />
        </span>{% endblock %}{% endfor %}</div>
    <button class="slide-left" disabled="disabled" type="button">
      Previous
      <svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>
    </button>
    <button class="slide-right" disabled="disabled" type="button">
      Next
      <svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>
    </button>
  </div>
  <div id="pager-buttons"></div>
</div>
{% endblock %}