{% extends "default.tpl" %}

{% block title %}About{% endblock %}

{% block menu %}
<a href="{{path('story')}}" title="Scribbles">
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
<a href="{{path('about')}}" class="current" title="About">
  <svg class="icon info-svg" pointer-events="none">
    <use xlink:href="#info-svg"></use>
  </svg>
  About
</a>
{% endblock %}

{% block content %}
<main id="content" class="info">
  <article class="written">
    <h2>No numbers</h2>
    <p>
      I thought it'd be good to not occupy myself with possessions. <br>
      And what else are data and numbers in the context of travel.<br>
      So those are not to be found.<br>
      And nothing has changed my mind.
    </p>
    <h2 class="r-align">Bicycle</h2>
    <p class="r-align">
      About bicycle travel?<br>
      It is just a splendid way of getting around.<br>
      Use an iron steed you feel comfortable with.<br>
      Take as little as possible with you.<br>
      Take as much as you need to feel comfortable.<br>
      After all you do not want to burden yourself with stupid thoughts.
    </p>
    <h2>Try</h2>
    <p>
      Why don't you try?<br>
      Short trips, long yourneys.<br>
      Alone, with two, or a whole group?<br>
      With family, baby, or all grown up.<br>
      Short, tall, heavy bones or light as a feather.<br>
      You will find all of that and more.<br>
      A lack of imagination is all that is holding you back.
    </p>
    <p class="r-align"><br>
      I will give the last words to ...<br><br>
      Charles Baudelaire<br><br>
      "Mais les vrais voyageurs sont ceux-là seuls qui partent<br>
      Pour partir; coeurs légers, semblables aux ballons,<br>
      De leur fatalité jamais ils ne s&#8216;écartent,<br>
      Et, sans savoir pourquoi, disent toujours: Allons!"
    </p>
    <h2>Some links</h2>
    <p>
      <a href="https://cycle.travel">Cycle.Travel</a><br>
      <a href="https://www.openandromaps.org/en">Open source digital maps</a><br>
      <a href="https://www.warmshowers.org">Warmshowers hosting community</a>
    </p>
    <footer></footer>
  </article>
</main>
{% endblock %}