document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     DOM ELEMENTS
  ========================================= */
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("#nav a");
  const heroCard = document.querySelector(".hero-card");
  const portrait = document.querySelector(".portrait-container");

  /* =========================================
     MOBILE MENU TOGGLE
  ========================================= */
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("mobile-active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    // Close mobile nav on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================
     HERO PORTRAIT PARALLAX / TILT EFFECT
  ========================================= */
  if (heroCard && portrait) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle tilt rotation
      const tiltX = (y / rect.height) * -8;
      const tiltY = (x / rect.width) * 8;

      portrait.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    heroCard.addEventListener("mouseleave", () => {
      portrait.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  /* =========================================
     SMOOTH SCROLLING FOR INTERNAL LINKS
  ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================================
     INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  ========================================= */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".project-card, .skill-row, .about-card, .timeline-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeInObserver.observe(el);
  });

  // Inject helper class for reveal
  const style = document.createElement("style");
  style.textContent = `
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    @media (max-width: 768px) {
      .nav.mobile-active {
        display: flex !important;
        position: absolute;
        top: 70px;
        left: 20px;
        right: 20px;
        background: rgba(20, 8, 4, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 20px;
        padding: 24px;
        flex-direction: column;
        gap: 16px;
        z-index: 100;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      }
    }
  `;
  document.head.appendChild(style);
});