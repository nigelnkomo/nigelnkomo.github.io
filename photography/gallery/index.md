---
layout: gallery
title: Photography Gallery
description: "Photography gallery by Nigel Nkomo: completed series and curated collections."
---

<div class="gallery-overlay" id="gallery-overlay">
  <div class="gallery-header">
    <a href="{{ site.baseurl }}/photography/" class="gallery-close">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M14 14L1 1M1 14L14 1" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      Close
    </a>
    <div class="gallery-title" id="collection-title">Collection</div>
    <div class="gallery-nav-info">
      <span id="current-slide">1</span>
      <span id="slide-separator">/</span>
      <span id="total-slides">0</span>
    </div>
  </div>

  <div class="gallery-slides" id="gallery-slides"></div>
</div>

<script>
  const galleries = {
    {% for series in site.photo_series %}
    "{{ series.series_id }}": {
      title: "{{ series.title }}",
      images: [
        {% for image in series.images %}
        "{{ image.src }}",
        {% endfor %}
      ]
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

  const params = new URLSearchParams(window.location.search);
  const galleryId = parseInt(params.get('id')) || 1;
  const gallery = galleries[galleryId] || Object.values(galleries)[0];

  let currentPage = 0;
  const imagesPerPage = 2;
  const totalPages = Math.ceil(gallery.images.length / imagesPerPage);

  const slidesContainer = document.getElementById('gallery-slides');
  const currentSlideEl = document.getElementById('current-slide');
  const totalSlidesEl = document.getElementById('total-slides');
  const titleEl = document.getElementById('collection-title');

  function getConnectionSpeed() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData === true) return 'save-data';
    if (conn && conn.effectiveType) return conn.effectiveType;
    return 'high-speed';
  }

  function getImageSize() {
    const speed = getConnectionSpeed();
    if (speed === 'slow' || speed === 'save-data') return 600;
    if (speed === '4g') return 1200;
    return 1600;
  }

  function getImageSrc(src) {
    const size = getImageSize();
    if (src.includes('images.unsplash.com')) {
      return src.replace('w=1200', `w=${size}`);
    }
    return src;
  }

  function buildSlides() {
    const imageSize = getImageSize();
    let slidesHTML = '';

    for (let i = 0; i < totalPages; i++) {
      const startIdx = i * imagesPerPage;
      const pageImages = gallery.images.slice(startIdx, startIdx + imagesPerPage);
      
      slidesHTML += `<div class="gallery-slide ${i === 0 ? 'active' : ''}" data-page="${i}">`;
      
      pageImages.forEach((img, j) => {
        const src = getImageSrc(img);
        const loading = i === 0 && j < 2 ? 'eager' : 'lazy';
        slidesHTML += `<div class="gallery-image-wrap">
          <img src="${src}" alt="Gallery image ${startIdx + j + 1}" loading="${loading}" />
        </div>`;
      });
      
      slidesHTML += '</div>';
    }

    slidesContainer.innerHTML = slidesHTML;
    updateCounter();
  }

  function goToPage(page) {
    currentPage = page;
    document.querySelectorAll('.gallery-slide').forEach((slide, i) => {
      slide.classList.toggle('active', i === currentPage);
    });
    updateCounter();
  }

  function nextPage() {
    goToPage((currentPage + 1) % totalPages);
  }

  function prevPage() {
    goToPage((currentPage - 1 + totalPages) % totalPages);
  }

  function updateCounter() {
    currentSlideEl.textContent = currentPage + 1;
    totalSlidesEl.textContent = totalPages;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      prevPage();
    }
  });

  slidesContainer.addEventListener('click', (e) => {
    const rect = slidesContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    if (clickX < halfWidth) {
      prevPage();
    } else {
      nextPage();
    }
  });

  titleEl.textContent = gallery.title;
  totalSlidesEl.textContent = gallery.images.length;
  buildSlides();
</script>
