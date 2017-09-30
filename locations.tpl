{% extends "default.tpl" %}

{% block title %}Locations{% endblock %}

{% block head %}
    {{ parent() }}
{% endblock %}


{% block content %}
<div id="content" class="route {% if canEdit %}manage{% endif %}">
  <article>
    <header>
      <h1>Hi, I'm Geolocation bonanza</h1>
      <select id="geo-stage-root"></select>
    </header>

    <ul id="geo-loc-root" class="api-obj-sync" data-type="location">
      {% for coordinate in loc %}
      <li>{{coordinate.name}}: {{coordinate.lat}}, {{coordinate.lng}}</li>
      {% endfor %}
    </ul>
    <footer></footer>
  </article>
</div>
{% endblock %}