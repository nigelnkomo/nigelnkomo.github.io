---
layout: page
title: Writing
description: "Writing and research by Nigel Nkomo: frameworks, essays, and critical thinking on design."
---

<section class="hero hero-writing">
  <div class="hero-content">
    <h1>Writing</h1>
    <p class="lead">
      Essays, frameworks, and research notes on information hierarchy, editorial design,
      and the intersection of craft and systems thinking.
    </p>
  </div>
</section>

<div class="divider"></div>

<section class="grid">
  <div class="section-title">Papers</div>
  <div class="section-body">
    <div class="papers-list" id="papers-container">
      {% assign sorted_papers = site.papers | sort: 'date' | reverse %}
      {% for paper in sorted_papers %}
        {% include paper-item.html paper=paper index=forloop.index %}
      {% endfor %}
    </div>
    <nav class="pagination">
      <button class="page-btn prev-btn" disabled>&larr;</button>
      <button class="page-btn active">1</button>
      <button class="page-btn next-btn" disabled>&rarr;</button>
    </nav>
  </div>
</section>
