{% extends "default.tpl" %}

{% block title %}Manage Images{% endblock %}
{% block head %}
    {{ parent() }}
{% endblock %}

{% block content %}
{% if canEdit %}
<div id="content" class="image manage">
  <h1>Manage Images</h1>
  {% for image in imagelist %}
    {% block image %}
      <figure data-id="{{image.id}}" data-type="img" class="api-obj-sync">
        <figcaption class="apisync title" contenteditable="true">{{image.title}}</figcaption>
        <details>
          <summary>
            Image details
          </summary>
          <dl>
            <dt>Timestamp</dt>
            <dd>{{image.timestamp|date("d m Y H:i:s")}}</dd>
            <dt>Hardware</dt>
            <dd>{{image.hardware}}</dd>
            <dt>Aperture</dt>
            <dd>{{image.aperture}}</dd>
          </dl>
        </details>
        <img data-src="{{image.thumbnail.url}}" 
             title="{{image.title}}" alt="{{image.alt}}" width="{{image.thumbnail.width}}" height="{{image.thumbnail.height}}"
             data-lat="{{image.lat}}" data-lng="{{image.lng}}" />
        <div class="apisync description" contenteditable="true">
            {{image.text|default('Image description')|striptags('<br>')|raw}}
        </div>
        <div class="img-type-selection">
          <div class="apisync linktimeline" data-timeline="{{image.timeline|default(0)}}"></div>
          <ul class="story-select" data-storylink="{{image.storylink|default(0)}}">
          {% for story in storylist %}
            <li class="apisync linkstory{% if story.id == image.storylink %} selected{% endif %}" data-storyid="{{story.id}}">{{story.titlehistory}}</li>
          {% endfor %}
          </ul>
        </div>
      </figure>
    {% endblock %}
  {% endfor %}
</div>
{% endif %}
{% endblock %}