---
layout: default
title: Search Results
description: Search results for Nigel Nkomo's portfolio, writing, and photography.
---

<main>
  <section class="hero hero-search">
    <div class="hero-content">
      <h1 id="search-heading">Search</h1>
      <p class="lead" id="search-query-display"></p>
    </div>
  </section>

  <section class="search-results" id="search-results"></section>
</main>

<script>
  const searchData = {
    projects: [],
    papers: [
      {
        title: 'Comparative Analysis: uniq in C vs Rust',
        description: 'A systematic comparison of the classic Unix text processing utility implemented in C versus Rust, examining performance, memory safety, and code maintainability.',
        url: '{{ site.baseurl }}/academic-writing/uniq-c-rust/',
        type: 'Paper'
      }
    ],
    galleries: [
      {
        title: 'Look Up',
        description: 'Bulawayo, Zimbabwe. December 2025. A documentation of the city\'s architectural details and urban landscape.',
        url: '{{ site.baseurl }}/photography/gallery/',
        type: 'Photography'
      }
    ]
  };

  function search(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    Object.keys(searchData).forEach(category => {
      searchData[category].forEach(item => {
        if (
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery) ||
          item.type.toLowerCase().includes(lowerQuery)
        ) {
          results.push(item);
        }
      });
    });

    return results;
  }

  function displayResults(results, query) {
    const heading = document.getElementById('search-heading');
    const queryDisplay = document.getElementById('search-query-display');
    const container = document.getElementById('search-results');

    if (query) {
      heading.textContent = 'Search Results';
      queryDisplay.textContent = `Showing results for "${query}"`;
    } else {
      heading.textContent = 'Search';
      queryDisplay.textContent = 'Enter a search term';
    }

    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results"><p>No results found. Try different keywords.</p></div>';
      return;
    }

    let html = '<div class="search-results-list">';
    
    results.forEach(item => {
      const title = item.url 
        ? `<h3><a href="${item.url}">${item.title}</a></h3>`
        : `<h3>${item.title}</h3>`;
      html += `<div class="search-result-item">
        <span class="search-result-type">${item.type}</span>
        ${title}
        <p>${item.description}</p>
      </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
  }

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  
  const results = search(query);
  displayResults(results, query);
</script>
