---
layout: page
title: Repositories
description: "Open source projects and repositories by Nigel Nkomo."
---

<section class="hero hero-repos">
  <div class="hero-content">
    <h1>Repositories</h1>
    <p class="lead">
      Open source projects and code experiments.
    </p>
  </div>
</section>

<div class="divider"></div>

<section class="github-stats">
  <div class="stats-row">
    <a href="https://github.com/anuraghazra/github-readme-stats" target="_blank" rel="noopener" class="stats-link">
      <img src="https://github-readme-stats-asrq6xe1s-nigels-projects-681415be.vercel.app/api?username=nigelnkomo" alt="GitHub Stats" />
    </a>
    <a href="https://github.com/ryo-ma/github-profile-trophy" target="_blank" rel="noopener" class="stats-link">
      <img src="https://github-profile-trophy.screw-hand.vercel.app/?username=nigelnkomo" alt="GitHub Profile Trophy" />
    </a>
  </div>
</section>

<div class="divider"></div>

<section class="grid">
  <div class="section-title">Repositories</div>
  <div class="section-body">
    <div class="repos-list" id="repos-container"></div>
    <nav class="pagination">
      <button class="page-btn prev-btn" disabled>&larr;</button>
      <button class="page-btn active">1</button>
      <button class="page-btn next-btn" disabled>&rarr;</button>
    </nav>
  </div>
</section>

<script>
  const manualRepos = [
    {
      name: 'algorithms-and-data-structures',
      url: 'https://github.com/nigelnkomo/algorithms-and-data-structures',
      description: 'Implementation of common algorithms and data structures in various programming languages.',
      language: 'Python',
      stars: 0,
      forks: 0,
      updated: 'Mar 2026'
    }
  ];

  function renderRepos(repos) {
    const container = document.getElementById('repos-container');
    
    if (!repos || repos.length === 0) {
      container.innerHTML = '<p>No repositories found.</p>';
      return;
    }

    let html = '';
    repos.forEach((repo, i) => {
      html += `<article class="repo-item reveal in">
        <div class="repo-number">${String(i + 1).padStart(2, '0')}</div>
        <div class="repo-content">
          <div class="repo-meta">
            <span>${repo.updated}</span>
            ${repo.language ? `<span>${repo.language}</span>` : ''}
          </div>
          <h3><a href="${repo.url}" target="_blank" rel="noopener">${repo.name}</a></h3>
          <p>${repo.description}</p>
          <div class="repo-stats">
            <span>★ ${repo.stars}</span>
            <span>⑂ ${repo.forks}</span>
          </div>
        </div>
      </article>`;
    });

    container.innerHTML = html;
  }

  renderRepos(manualRepos);
</script>
