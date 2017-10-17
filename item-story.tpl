{% extends "default.tpl" %}

{% block title %}Scribbles{% endblock %}

{% block menu %}
<a href="{{path('story')}}" class="current" title="Scribbles">
  <svg class="icon story-svg" pointer-events="none">
    <use xlink:href="#story-svg"></use>
  </svg>
  Scribbles
</a>
<a href="{{path('timeline')}}" title="Timeline">
  <svg class="icon timeline-svg" pointer-events="none">
    <use xlink:href="#timeline-svg"></use>
  </svg>
  Timeline
</a>
<a href="{{path('about')}}" title="About">
  <svg class="icon info-svg" pointer-events="none">
    <use xlink:href="#info-svg"></use>
  </svg>
  About
</a>
{% endblock %}

{% block content %}
<div id="content" class="story">
  <section id="storystage">
    <button class="prev" disabled="disabled" type="button">
      Previous
      <svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>
    </button>
    <button class="next" disabled="disabled" type="button">
      Next
      <svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>
    </button>
    {% block story %}
    <article>
      <header>
        <h1>{{item.title}}</h1>
      </header>

      <div class="written">
        {{ item.content|default('I have something to tell you...')|striptags('<br>')|raw }}
      </div>
      <footer>
      {% for link in item.link %}
      <figure>
        <a href="{{path('img', {title:link.path})}}">
          <img src="{{path('img', {title:link.path, trail:'thumbnail'})}}" title="{{link.title}}" alt="{{link.title}}" />
        </a>
      </figure>
      {% endfor %}
      </footer>
    </article>
    {% endblock %}
  </section>
</div>
{% endblock %}