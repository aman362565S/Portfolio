document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Custom Cursor
     ========================================================================== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update dot immediately
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  // Smooth follow for the ring
  const renderCursor = () => {
    // ease factor
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Expand cursor on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .bento-item, .skill-pill');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    target.addEventListener('mouseleave', () => {
      if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  /* ==========================================================================
     Typing Animation (Hero Section)
     ========================================================================== */
  const typingElement = document.querySelector('.typing-text');
  const titles = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'React Developer',
    'Problem Solver'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    if (!typingElement) return;

    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  };

  if (typingElement) {
    type();
  }

  /* ==========================================================================
     Theme Toggle (Dark / Light Mode)
     ========================================================================== */
  const themeBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  // Check local storage for preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    htmlEl.classList.add('light');
    htmlEl.classList.remove('dark');
  }

  themeBtn?.addEventListener('click', () => {
    if (htmlEl.classList.contains('light')) {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  });

  /* ==========================================================================
     Header Scroll & Mobile Menu
     ========================================================================== */
  const header = document.getElementById('header');
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileBtn?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    const icon = mobileBtn.querySelector('i');
    if (mobileNav?.classList.contains('open')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      const icon = mobileBtn.querySelector('i');
      icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  /* ==========================================================================
     Scroll Spy (Active Nav Link)
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     Intersection Observer (Fade Up Animations)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });

});
