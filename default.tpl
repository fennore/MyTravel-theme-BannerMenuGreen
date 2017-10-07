<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    {% block head %}
      <link rel="stylesheet" type="text/css" href="{{path('cssbundle')}}">
      <link rel="stylesheet" href="{{asset('lib/baguetteBox/baguetteBox.min.css')}}"> 
      <title>{% block title %}Welcome to the story of my Euro-Turkey bicycle tour!{% endblock %}</title>
    {% endblock %}
  </head>
  <body>
    {% if svgsprite %}
      {{svgsprite|raw}}
    {% endif %}
    {% block content %}
    <main id="content">
      <article>
        <p>
          It's a page!
        </p>
      </article>
    </main>
    {% endblock %}
    <nav id="menu">
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
      <a href="{{path('about')}}" title="About">
        <svg class="icon info-svg">
        <use xlink:href="#info-svg"></use>
        </svg>
        About
      </a>
      {% endblock %}
    </nav>
    <nav id="menu-minor">
      <a href="{{path('home')}}" title="Home">Home</a>
      {% if canEdit %}
        <a href="{{path('locations')}}" title="Locations">Locations</a>
      {% endif %}      
    </nav>
    {% block footer %}
    <!-- script tags can go here @todo modernize and split bundle into async and defer -->
    <div id="script-wrapper">
    <!--<script src="https://maps.googleapis.com/maps/api/js?key={{apikey}}&libraries=geometry"></script>
    <!-- Velocity... once upon a time <script src="js/lib/velocity.min.js"></script>-->
    <!-- Core JS file -->
    <!--<script src="{{basepath}}/views/default/js/lib/smoothscroll.js"></script>-->
    <script src="{{asset('lib/baguetteBox/baguetteBox.min.js')}}"></script>
    <!--<script src="https://cdn.tinymce.com/4/tinymce.min.js"></script>
    <script>tinymce.init({ selector:'.mce' });</script>-->
    <script src="{{asset('lib/navigo.min.js')}}"></script>
    <!--<script src="{{asset('vue', 'cdn')}}"></script>-->
    <script src="{{path('jsbundle')}}"></script>
    </div>
    {% endblock %}
  </body>
</html>