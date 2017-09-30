<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    {% block head %}
      <link rel="stylesheet" type="text/css" href="{{basepath}}css/bundle">
      <link rel="stylesheet" href="{{basepath}}views/default/lib/baguetteBox/baguetteBox.min.css"> 
      <title>{% block title %}Welcome to the story of my Euro-Turkey bicycle tour!{% endblock %}</title>
    {% endblock %}
  </head>
  <body>
    {% if svgsprite %}
      {{svgsprite|raw}}
    {% endif %}
    <div id="mapWrapper">
      <div id="map"></div>
    </div>
    {% if message %}
    <div class="msg">
      message:
      {{message}}
    </div>
    {% endif %}
    {% block content %}
    <div id="content" class="intro">
      <article class="written">
        <p>
          Page
        </p>
      </article>
    </div>
    {% endblock %}
    <div id="menu">
      {% block menu %}
      <a href="{{basepath}}story" title="Writings">
        <svg class="icon story-svg">
          <use xlink:href="#story-svg"></use>
        </svg>
        Writings
      </a>
      <a href="{{basepath}}timeline" title="Timeline">
        <svg class="icon timeline-svg">
          <use xlink:href="#timeline-svg"></use>
        </svg>
        Timeline
      </a>
      <a href="{{basepath}}info" title="Info">
        <svg class="icon info-svg">
          <use xlink:href="#info-svg"></use>
        </svg>
        Info
      </a>
      {% endblock %}
    </div>
    <div id="menu-minor">
      <a href="{{basepath}}" title="Home">Home</a>
      {% if canEdit %}
        <a href="{{basepath}}manage/image" title="Manage Images">Edit</a>
        <a href="{{basepath}}manage/geo" title="Manage Route">Route</a>
      {% endif %}
    </div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGUWScq3XSUTL7sIZWpjfQQW6i2IZBnt0&libraries=geometry"></script>
    <!-- Velocity... once upon a time <script src="js/lib/velocity.min.js"></script>-->
    <!-- Core JS file -->
    <!--<script src="{{basepath}}views/default/js/lib/smoothscroll.js"></script>-->
    <script src="{{basepath}}views/default/lib/baguetteBox/baguetteBox.min.js"></script>
    <!--<script src="https://cdn.tinymce.com/4/tinymce.min.js"></script>
    <script>tinymce.init({ selector:'.mce' });</script>-->
    <script src="{{basepath}}views/default/lib/navigo.min.js"></script>
    <script src="{{basepath}}js/bundle"></script>
  </body>
</html>