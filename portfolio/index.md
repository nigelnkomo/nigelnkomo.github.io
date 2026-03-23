---
layout: page
title: Work
description: "Selected work by Nigel Nkomo: product design, systems thinking, and editorial clarity."
---

<section class="hero hero-page">
  <div class="hero-content">
    <h1>Selected<br />Work</h1>
    <p class="lead">
      Case studies, design systems, and product strategy across fintech, public service, and brand identity.
      Each project is framed as a clear progression from challenge to outcome.
    </p>
  </div>
</section>

<div class="divider"></div>

<section class="grid">
  <div class="section-title">Projects</div>
  <div class="section-body">
    <div class="projects-list" id="projects-container">
      {% assign sorted_projects = site.projects | sort: 'year' | reverse %}
      {% for project in sorted_projects %}
        {% include project-item.html project=project index=forloop.index %}
      {% endfor %}
    </div>
    <nav class="pagination">
      <button class="page-btn prev-btn" disabled>&larr;</button>
      <button class="page-btn active">1</button>
      <button class="page-btn next-btn" disabled>&rarr;</button>
    </nav>
  </div>
</section>
