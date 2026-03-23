---
layout: page
title: Photography
description: "Photography by Nigel Nkomo: ongoing series exploring texture, light, and daily rhythm."
---

<section class="hero hero-photography">
  <div class="hero-content">
    <h1>Photography</h1>
    <p class="lead">
      Ongoing series exploring texture, light, and daily rhythm.
    </p>
    <!-- <p class="hero-approach">
      Photography here is an extension of design practice, finding structure in the observed world. Each series is a slow accumulation of frames, returned to over months and years. The camera is a tool for attention.
    </p> -->
  </div>
</section>

<section class="series-index" id="series-index">
  {% assign sorted_series = site.photo_series | sort: 'date' | reverse %}
  {% for series in sorted_series %}
  <div class="series-row">
    <div class="series-meta">
      <div class="series-number">{{ forloop.index | prepend: "0" }}</div>
      <h3 class="series-title"><a href="{{ site.baseurl }}/photography/gallery/?id={{ series.series_id }}">{{ series.title }}</a></h3>
      <p class="series-location">{{ series.location | default: series.date }}</p>
    </div>
    <div class="series-image-wrapper">
      {% if series.thumbnail %}
      <a href="{{ site.baseurl }}/photography/gallery/?id={{ series.series_id }}" class="series-image-link">
        <img src="{{ site.baseurl }}{{ series.thumbnail }}" alt="{{ series.title }}" />
      </a>
      {% endif %}
    </div>
    <div class="series-description">
      <p>{{ series.description }}</p>
    </div>
  </div>
  {% endfor %}
</section>

<nav class="series-pagination">
  <button class="page-btn prev-btn" disabled>&larr;</button>
  <button class="page-btn active">1</button>
  <button class="page-btn next-btn" disabled>&rarr;</button>
</nav>
