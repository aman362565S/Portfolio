document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =========================================
     MOBILE MENU
  ========================================= */

  if (menuToggle && header) {

    menuToggle.addEventListener("click", () => {

      const isOpen = header.classList.toggle("menu-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    });

  }


  /* =========================================
     CLOSE MOBILE MENU
     WHEN NAV LINK IS CLICKED
  ========================================= */

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (header) {
        header.classList.remove("menu-open");
      }

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );
      }

    });

  });


  /* =========================================
     ACTIVE NAVIGATION / SCROLL SPY
  ========================================= */

  if (sections.length && navLinks.length) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {

            const target =
              link.getAttribute("href");

            link.classList.toggle(
              "active",
              target === `#${entry.target.id}`
            );

          });

        });

      },
      {
        rootMargin: "-40% 0px -50% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const revealItems = document.querySelectorAll(
    `
    .project,
    .about-card,
    .skill-line,
    .timeline-item,
    .career-cards > div,
    .contact-list a
    `
  );


  revealItems.forEach((element, index) => {

    element.classList.add("reveal");

    element.style.transitionDelay =
      `${Math.min(index * 45, 220)}ms`;

  });


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealItems.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================================
     DESKTOP POINTER GLOW
  ========================================= */

  const finePointer =
    window.matchMedia(
      "(hover:hover) and (pointer:fine)"
    ).matches;


  if (finePointer) {

    const pointerGlow =
      document.createElement("div");

    pointerGlow.style.cssText = `
      position: fixed;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
      background:
        radial-gradient(
          circle,
          rgba(242, 123, 37, 0.11),
          transparent 68%
        );
      opacity: 0;
      transition: opacity 0.25s ease;
    `;


    document.body.appendChild(pointerGlow);


    window.addEventListener(
      "mousemove",
      (event) => {

        pointerGlow.style.left =
          `${event.clientX}px`;

        pointerGlow.style.top =
          `${event.clientY}px`;

        pointerGlow.style.opacity = "1";

      }
    );


    document.addEventListener(
      "mouseleave",
      () => {

        pointerGlow.style.opacity = "0";

      }
    );

  }


  /* =========================================
     HERO PHOTO PARALLAX
     
     IMPORTANT:
     This does NOT remove your photo background.
     It only moves the complete photo slightly.
  ========================================= */

  const hero =
    document.querySelector(".hero");

  const photoFrame =
    document.querySelector(".photo-frame");


  if (
    finePointer &&
    hero &&
    photoFrame
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (event.clientX - rect.left)
          / rect.width - 0.5;


        const y =
          (event.clientY - rect.top)
          / rect.height - 0.5;


        photoFrame.style.transform =
          `
          translate(
            ${x * 5}px,
            ${y * 4}px
          )
          `;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        photoFrame.style.transform =
          "translate(0, 0)";

      }
    );

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================
     ESCAPE KEY
     CLOSES MOBILE MENU
  ========================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      if (header) {
        header.classList.remove(
          "menu-open"
        );
      }

      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }

    }
  );


  /* =========================================
     IMAGE LOAD EFFECT
     
     Keeps the COMPLETE original image.
  ========================================= */

  const heroImage =
    document.querySelector(
      ".photo-frame img"
    );


  if (heroImage) {

    if (heroImage.complete) {
      heroImage.classList.add("loaded");
    } else {

      heroImage.addEventListener(
        "load",
        () => {
          heroImage.classList.add(
            "loaded"
          );
        }
      );

    }

  }


  /* =========================================
     CURRENT YEAR
     
     If an element with #year exists,
     automatically update it.
  ========================================= */

  const yearElement =
    document.getElementById("year");


  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* =========================================
     PAGE LOADED
  ========================================= */

  document.body.classList.add(
    "page-loaded"
  );

});