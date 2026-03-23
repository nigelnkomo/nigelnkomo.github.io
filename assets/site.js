document.addEventListener('DOMContentLoaded', function() {
  const lerp = (start, end, t) => (1 - t) * start + t * end;
  
  let scrollY = window.scrollY;
  let targetY = scrollY;
  let raf = null;
  let isRunning = false;
  const ease = 0.08;
  
  function updateScroll() {
    if (Math.abs(targetY - scrollY) > 0.1) {
      scrollY = lerp(scrollY, targetY, ease);
      window.scrollTo(0, Math.round(scrollY));
      requestAnimationFrame(updateScroll);
    } else {
      scrollY = targetY;
      window.scrollTo(0, Math.round(targetY));
      isRunning = false;
    }
  }
  
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetY += e.deltaY;
    targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    
    if (!isRunning) {
      isRunning = true;
      scrollY = window.scrollY;
      updateScroll();
    }
  }, { passive: false });
  
  let touchStartY = 0;
  let touchStartScroll = 0;
  let isTouching = false;
  
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartScroll = window.scrollY;
    isTouching = true;
  }, { passive: true });
  
  window.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    e.preventDefault();
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    targetY = touchStartScroll + deltaY;
    targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    
    if (!isRunning) {
      isRunning = true;
      scrollY = window.scrollY;
      updateScroll();
    }
  }, { passive: false });
  
  window.addEventListener('touchend', () => {
    isTouching = false;
  }, { passive: true });
  
  window.addEventListener('scroll', () => {
    if (!isRunning) {
      targetY = window.scrollY;
      scrollY = targetY;
    }
  }, { passive: true });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      
      e.preventDefault();
      
      const header = document.querySelector('.topbar');
      const headerHeight = header ? header.offsetHeight : 0;
      targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
      
      if (!isRunning) {
        isRunning = true;
        scrollY = window.scrollY;
        updateScroll();
      }
    });
  });
  
  const tocLinks = document.querySelectorAll('.toc-link');
  const paperSections = document.querySelectorAll('.paper-section');
  
  if (tocLinks.length > 0 && paperSections.length > 0) {
    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );
    paperSections.forEach((section) => tocObserver.observe(section));
  }
  
  const paperToc = document.querySelector('.paper-toc');
  if (paperToc) {
    let tocInitialTop = paperToc.offsetTop;
    let tocHeight = paperToc.offsetHeight;
    const paperContent = document.querySelector('.paper-content');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const headerHeight = document.querySelector('.topbar')?.offsetHeight || 80;
      
      if (paperContent) {
        const contentTop = paperContent.offsetTop;
        const contentHeight = paperContent.offsetHeight;
        
        if (scrollY > tocInitialTop - headerHeight) {
          paperToc.style.position = 'fixed';
          paperToc.style.top = headerHeight + 'px';
          paperToc.style.left = paperToc.getBoundingClientRect().left + 'px';
          paperToc.style.width = '280px';
          
          if (scrollY > contentTop + contentHeight - tocHeight) {
            paperToc.style.top = (contentTop + contentHeight - tocHeight - scrollY + headerHeight) + 'px';
          }
        } else {
          paperToc.style.position = '';
          paperToc.style.top = '';
          paperToc.style.left = '';
          paperToc.style.width = '';
        }
      }
    });
  }
  
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
});
