const headerHTML = `
  <header class="topbar">
    <div class="topbar-inner">
      <a href="/" class="logo">
        <img src="/assets/images/logo.svg" alt="Nigel Nkomo" />
      </a>
      <button class="menu-toggle" aria-label="Toggle menu">
        <span class="menu-icon">
          <span class="menu-line"></span>
          <span class="menu-line"></span>
        </span>
      </button>
      <nav class="main-nav">
        <a href="/" data-page="archive">archive</a>
        <a href="/portfolio/" data-page="work">work</a>
        <a href="/academic-writing/" data-page="writing">writing</a>
        <a href="/photography/" data-page="photography">photography</a>
        <a href="/about/" data-page="about">about</a>
      </nav>
    </div>
  </header>
  <div class="mobile-nav-overlay"></div>
`;

const searchHTML = `
  <div class="header-search">
    <form class="header-search-inner" action="/search/" method="get">
      <input type="text" name="q" placeholder="Search work, writing, photography..." aria-label="Search archive" />
      <button type="submit" class="search-submit" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
    </form>
    <div class="writing-nav-separator"></div>
    <div class="writing-menu" id="writing-menu">
      <div class="writing-menu-inner">
        <div class="writing-menu-group">
          <h4>Single-Source Papers</h4>
          <ul>
            <li><button class="filter-btn" data-filter="close-reading">Close Reading</button></li>
            <li><button class="filter-btn" data-filter="theoretical-statement">Theoretical Statement</button></li>
            <li><button class="filter-btn" data-filter="archival-essay">Archival Essay</button></li>
            <li><button class="filter-btn" data-filter="empirical-report">Empirical Report</button></li>
            <li><button class="filter-btn" data-filter="book-review">Book Review</button></li>
            <li><button class="filter-btn" data-filter="response-paper">Response Paper</button></li>
          </ul>
        </div>
        <div class="writing-menu-group">
          <h4>Multi-Source Papers</h4>
          <ul>
            <li><button class="filter-btn" data-filter="comparative-essay">Comparative Essay</button></li>
            <li><button class="filter-btn" data-filter="lens-essay">Lens Essay</button></li>
            <li><button class="filter-btn" data-filter="test-theory-essay">Test-a-Theory Essay</button></li>
            <li><button class="filter-btn" data-filter="historicist-essay">Historicist Essay</button></li>
            <li><button class="filter-btn" data-filter="presentist-essay">Presentist Essay</button></li>
            <li><button class="filter-btn" data-filter="review-essay">Review Essay</button></li>
            <li><button class="filter-btn" data-filter="meta-analysis">Meta-Analysis</button></li>
          </ul>
        </div>
        <div class="writing-menu-group">
          <h4>Research Papers</h4>
          <ul>
            <li><button class="filter-btn" data-filter="research-paper">Research Paper</button></li>
          </ul>
          <p class="filter-description">Papers that engage in critical debate and advance original arguments contributing to ongoing academic conversations.</p>
        </div>
      </div>
    </div>
  </div>
`;

const footerHTML = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="/" class="footer-logo">
          <img src="/assets/images/logo.svg" alt="Nigel Nkomo" />
        </a>
        <p>Product designer and builder working across interfaces, systems, and visual storytelling.</p>
      </div>
      <nav class="footer-nav">
        <div class="footer-nav-group">
          <h4>Navigate</h4>
          <a href="/">Archive</a>
          <a href="/portfolio/">Work</a>
          <a href="/academic-writing/">Writing</a>
          <a href="/photography/">Photography</a>
          <a href="/photography/policy/">Photography Policy</a>
        </div>
        <div class="footer-nav-group">
          <h4>Connect</h4>
          <a href="mailto:nigel.nkomo@proton.me">Email</a>
          <a href="https://wa.me/263775358610">WhatsApp</a>
          <a href="https://signal.me/#p/+263775358610">Signal</a>
          <a href="tel:+263775358610">Phone</a>
        </div>
      </nav>
    </div>
    <div class="footer-bottom">
      <p>(c) 2026 Nigel Nkomo</p>
      <a href="#" class="back-to-top">Back to top</a>
    </div>
  </footer>
`;

document.addEventListener('DOMContentLoaded', function() {
  const siteHeader = document.getElementById('site-header');
  const siteSearch = document.getElementById('site-search');
  const siteFooter = document.getElementById('site-footer');
  
  if (siteHeader) siteHeader.innerHTML = headerHTML;
  if (siteSearch) siteSearch.innerHTML = searchHTML;
  if (siteFooter) siteFooter.innerHTML = footerHTML;
  
  const currentPath = window.location.pathname;
  const isWritingPage = currentPath.includes('/academic-writing') || currentPath.includes('/writing');
  const writingMenu = document.getElementById('writing-menu');
  
  if (writingMenu) {
    if (isWritingPage) {
      writingMenu.classList.add('active');
    }
    
    const filterBtns = writingMenu.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const papersContainer = document.getElementById('papers-container');
        if (papersContainer) {
          const papers = papersContainer.querySelectorAll('.paper-item');
          papers.forEach(paper => {
            const types = paper.getAttribute('data-types')?.split(',') || [];
            if (types.includes(filter)) {
              paper.style.display = 'grid';
            } else {
              paper.style.display = 'none';
            }
          });
        }
      });
    });
  }
  
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath === href || 
        (href !== '/' && currentPath.startsWith(href)) ||
        (href === '/' && (currentPath === '/' || currentPath.endsWith('/index.html')))) {
      link.setAttribute('aria-current', 'page');
    }
  });
  
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  
  let isHoveringLink = false;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    const target = e.target;
    const isLink = target.tagName === 'A' || target.closest('a');
    
    if (isLink && !isHoveringLink) {
      isHoveringLink = true;
      cursor.style.width = '48px';
      cursor.style.height = '48px';
    } else if (!isLink && isHoveringLink) {
      isHoveringLink = false;
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    }
  });
  
  document.addEventListener('mousedown', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
  });
  
  document.addEventListener('mouseup', () => {
    if (isHoveringLink) {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
    } else {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    }
  });
  
  document.querySelector('.back-to-top')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  
  if (menuToggle && mainNav && overlay) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }
});
