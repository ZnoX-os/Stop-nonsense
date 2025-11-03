(function () {
  // --- Google Analytics ---
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XWG4YB3C13";
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XWG4YB3C13");

  // --------------------------------
  // DOMContentLoaded main script block
  // --------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Scroll animation setup
    const animatedElements = document.querySelectorAll(".scroll-animate");
    if (animatedElements.length > 0) {
      const animateObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              animateObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      animatedElements.forEach((el) => animateObserver.observe(el));
    }

    // 2) Section highlighting in nav & header "scrolled" class
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const header = document.querySelector("header");

    const handleScroll = () => {
      const scrollPos = window.scrollY + header.offsetHeight + 10;
      let currentSectionId = "";
      sections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
          currentSectionId = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSectionId}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      header.classList.toggle("scrolled", window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // 3) Shop item carousels
    document.querySelectorAll(".shop-item").forEach((item) => {
      const images = item.querySelectorAll(".carousel img");
      let currentImageIndex = 0;

      const leftArrow = document.createElement("button");
      leftArrow.classList.add("carousel-arrow", "left");
      leftArrow.textContent = "<";
      item.appendChild(leftArrow);

      const rightArrow = document.createElement("button");
      rightArrow.classList.add("carousel-arrow", "right");
      rightArrow.textContent = ">";
      item.appendChild(rightArrow);

      const updateImageDisplay = () => {
        images.forEach((img, index) => {
          img.style.display = index === currentImageIndex ? "block" : "none";
        });
      };

      leftArrow.addEventListener("click", () => {
        currentImageIndex =
          currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        updateImageDisplay();
      });

      rightArrow.addEventListener("click", () => {
        currentImageIndex =
          currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        updateImageDisplay();
      });

      updateImageDisplay();
    });

    // 4) Contact form (EmailJS)
    const emailJsUserId = window.EMAILJS_USER_ID;
    const emailJsTemplateId = window.EMAILJS_TEMPLATE_ID;
    const emailJsServiceId = window.EMAILJS_SERVICE_ID;
    emailjs.init(emailJsUserId);

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const submitButton = this.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = {
          user_name: document.getElementById("name").value,
          user_surname: document.getElementById("surname").value,
          user_email: document.getElementById("email").value,
          user_Number: document.getElementById("Number").value,
          message: document.getElementById("message").value,
        };

        emailjs
          .send(emailJsServiceId, emailJsTemplateId, formData)
          .then((response) => {
            console.log("SUCCESS!", response);
            showPopup("✅ Your message has been sent successfully!", true);
          })
          .catch((error) => {
            console.error("FAILED...", error);
            showPopup("❌ Oops! Something went wrong.", false);
          })
          .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
          });
      });
    }

    function showPopup(message, isSuccess) {
      const popup = document.createElement("div");
      popup.classList.add("popup-message");
      popup.textContent = message;
      popup.style.backgroundColor = isSuccess
        ? "rgba(107, 255, 107, 0.75)"
        : "rgba(197, 65, 65, 0.75)";
      popup.style.color = isSuccess ? "#333" : "#fff";

      document.body.appendChild(popup);

      setTimeout(() => {
        popup.classList.add("fade-out");
        setTimeout(() => popup.remove(), 500);
      }, 2500);
    }

    // 5) "Figure.snip1206" hover effect
    document.querySelectorAll("figure.snip1206 a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        document
          .querySelectorAll("figure.snip1206 a")
          .forEach((l) => l.classList.remove("hover"));
        this.classList.add("hover");
        setTimeout(() => {
          this.classList.remove("hover");
        }, 1000);
      });
    });

    // 6) Intersection Observer for .projects-grid
    const projectsSection = document.querySelector(".projects-section");
    const projectsGrid = document.querySelector(".projects-grid");

    if (projectsSection && projectsGrid) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              projectsGrid.classList.add("visible");
            }
          });
        },
        {
          threshold: 0.2,
        }
      );
      observer.observe(projectsSection);
    }

    // 7) Smooth scroll for in-page links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // -------------------------------------------
    // House Gallery (single large photo + prev/next)
    // -------------------------------------------
    (function(){
      const gallery = document.querySelector('.house-gallery');
      if(!gallery) return;
      const imgEl = gallery.querySelector('img.house-current');
  const prevBtn = gallery.querySelector('.house-nav.prev');
  const nextBtn = gallery.querySelector('.house-nav.next');

      const photos = [
        { src: 'Images/Project-1.jpg', alt: 'Residential Development', title: 'Residential Development', desc: 'Premium precast walls and structural elements delivering exceptional durability and efficiency for modern living spaces.' },
        { src: 'Images/Project-2.jpg', alt: 'Commercial Building', title: 'Commercial Building', desc: 'Fast-track commercial construction utilizing modular precast components ensuring speed, consistency, and superior quality throughout the build.' },
        { src: 'Images/Project-3.jpg', alt: 'Infrastructure Development', title: 'Infrastructure Works', desc: 'Engineered precast solutions providing long-span strength and low maintenance performance for critical infrastructure projects.' },
        { src: 'Images/Project-4.jpg', alt: 'Custom Precast Installation', title: 'Custom Installation', desc: 'Innovative custom precast design solutions tailored to meet unique architectural requirements and modern construction challenges.' },
        { src: 'Images/Project-5.jpg', alt: 'Contemporary Living Space', title: 'Contemporary Living', desc: 'Refined interior and exterior integration using precision precast panels for lasting quality and aesthetic excellence.' }
      ];
      let index = 0;

      const titleEl = document.querySelector('.house-title');
      const descEl = document.querySelector('.house-desc');
      const liveRegion = document.querySelector('.house-caption');

      const update = (dir=0) => {
        index = (index + dir + photos.length) % photos.length;
        gallery.classList.add('fade-out');
        setTimeout(()=>{
          const p = photos[index];
            imgEl.src = p.src;
            imgEl.alt = p.alt;
            imgEl.dataset.index = index;
            // Indicator removed per redesign; no text update needed
            if(titleEl) titleEl.textContent = p.title;
            if(descEl) descEl.textContent = p.desc;
            if(liveRegion) liveRegion.setAttribute('aria-label', `${p.title}`);
            gallery.classList.remove('fade-out');
            gallery.classList.add('fade-in');
            setTimeout(()=> gallery.classList.remove('fade-in'), 500);
        },220);
      };

      prevBtn && prevBtn.addEventListener('click', ()=> update(-1));
      nextBtn && nextBtn.addEventListener('click', ()=> update(1));

      // Keyboard support when focused on controls
      [prevBtn, nextBtn].forEach(btn => btn && btn.addEventListener('keydown', e => {
        if(e.key === 'ArrowLeft'){ update(-1); }
        if(e.key === 'ArrowRight'){ update(1); }
      }));
    })();

    // -------------------------------------------
    // Floor Plans Carousel (5 plans cycling through)
    // -------------------------------------------
    (function(){
      const plansStack = document.querySelector('.plans-stack');
      if(!plansStack) return;
      
      const spotlightImg = plansStack.querySelector('.plan-spotlight');
      const captionEl = plansStack.querySelector('.plan-caption');
      const prevBtn = plansStack.querySelector('.plan-nav.prev');
      const nextBtn = plansStack.querySelector('.plan-nav.next');
      const previewFigs = plansStack.querySelectorAll('.plan-preview');
      
      const allPlans = [
        { src: 'Images/Floor-Plan-1.jpg', alt: 'Floor Plan 1', caption: 'Plan 1' },
        { src: 'Images/Floor-Plan-2.jpg', alt: 'Floor Plan 2', caption: 'Plan 2' },
        { src: 'Images/Floor-Plan-3.jpg', alt: 'Floor Plan 3', caption: 'Plan 3' },
        { src: 'Images/Floor-Plan-4.jpg', alt: 'Floor Plan 4', caption: 'Plan 4' },
        { src: 'Images/Floor-Plan-5.jpg', alt: 'Floor Plan 5', caption: 'Plan 5' }
      ];
      
      let currentIndex = 0;
      
      const updatePlans = (direction = 0) => {
        currentIndex = (currentIndex + direction + allPlans.length) % allPlans.length;
        
        // Update spotlight (large image)
        const current = allPlans[currentIndex];
        spotlightImg.src = current.src;
        spotlightImg.alt = current.alt;
        spotlightImg.dataset.index = currentIndex;
        if(captionEl) captionEl.textContent = current.caption;
        
        // Update preview images (show next 2 plans)
        const preview1Index = (currentIndex + 1) % allPlans.length;
        const preview2Index = (currentIndex + 2) % allPlans.length;
        
        if(previewFigs[0]) {
          const preview1 = allPlans[preview1Index];
          previewFigs[0].querySelector('img').src = preview1.src;
          previewFigs[0].querySelector('img').alt = preview1.alt;
          previewFigs[0].querySelector('figcaption').textContent = preview1.caption;
          previewFigs[0].dataset.planIndex = preview1Index;
        }
        
        if(previewFigs[1]) {
          const preview2 = allPlans[preview2Index];
          previewFigs[1].querySelector('img').src = preview2.src;
          previewFigs[1].querySelector('img').alt = preview2.alt;
          previewFigs[1].querySelector('figcaption').textContent = preview2.caption;
          previewFigs[1].dataset.planIndex = preview2Index;
        }
      };
      
      prevBtn && prevBtn.addEventListener('click', () => updatePlans(-1));
      nextBtn && nextBtn.addEventListener('click', () => updatePlans(1));
      
      // Click on preview to jump to that plan
      previewFigs.forEach(fig => {
        fig.addEventListener('click', () => {
          const targetIndex = parseInt(fig.dataset.planIndex);
          const diff = targetIndex - currentIndex;
          updatePlans(diff);
        });
        fig.style.cursor = 'pointer';
      });
    })();

    // -------------------------------------------
    // Mobile Navigation Toggle (New Header 2025-09-28)
    // -------------------------------------------
    (function(){
      const toggleBtn = document.querySelector('.nav-toggle');
      const nav = document.querySelector('#primary-nav');
      if(!toggleBtn || !nav) return;

      const closeNav = () => {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded','false');
        document.body.classList.remove('nav-open');
      };
      const openNav = () => {
        nav.classList.add('open');
        toggleBtn.setAttribute('aria-expanded','true');
        document.body.classList.add('nav-open');
      };
      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        expanded ? closeNav() : openNav();
      });
      // Close when clicking a link (mobile)
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if(window.matchMedia('(max-width: 860px)').matches){
          closeNav();
        }
      }));
      // Close on escape
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeNav();
      });
      // Optional: click outside to close
      document.addEventListener('click', (e) => {
        if(!nav.contains(e.target) && !toggleBtn.contains(e.target)){
          if(nav.classList.contains('open')) closeNav();
        }
      });
    })();
  });
})();

// 8) Change theme-color on scroll
window.addEventListener("scroll", function () {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (window.scrollY > 0) {
    themeColorMeta.setAttribute("content", "rgba(0, 0, 0, 0.5)");
  } else {
    themeColorMeta.setAttribute("content", "#003c27");
  }
});