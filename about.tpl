{% extends "default.tpl" %}

{% block title %}About{% endblock %}

{% block menu %}
<a href="{{path('story')}}" title="Scribbles">
  <svg class="icon story-svg">
  <use xlink:href="#story-svg"></use>
  </svg>
  Scribbles
</a>
<a href="{{path('timeline')}}" title="Timeline">
  <svg class="icon timeline-svg">
  <use xlink:href="#timeline-svg"></use>
  </svg>
  Timeline
</a>
<a href="{{path('about')}}" class="current" title="About">
  <svg class="icon info-svg">
  <use xlink:href="#info-svg"></use>
  </svg>
  About
</a>
{% endblock %}

{% block content %}
<main id="content">
  <article>
    <p>
      It's about something alright!
    </p>
  </article>
</main>
{% endblock %}