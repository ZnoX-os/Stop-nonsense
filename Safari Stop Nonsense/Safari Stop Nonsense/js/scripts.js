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
            contactForm.reset(); // Clear the form after successful submission
          })
          .catch((error) => {
            console.error("FAILED...", error);
            showPopup("❌ Oops! Something went wrong. Please try again.", false);
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

// 8) Keep theme-color consistent with header brand color
// Some browsers (notably iOS Safari) ignore/clip transparency here,
// which can produce white bars. Always use the solid brand color.
(function(){
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  const brand = getComputedStyle(document.documentElement)
    .getPropertyValue('--app-header-color')
    .trim() || '#003c27';
  metas.forEach(m => m.setAttribute('content', brand));
})();

// -------------------------------------------
// 9) Dual-Location Map with Leaflet (No API Key Needed!)
// -------------------------------------------
(function() {
  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
      console.warn('Leaflet not loaded yet, retrying...');
      setTimeout(arguments.callee, 100);
      return;
    }

    const mapElement = document.getElementById('dual-location-map');
    if (!mapElement) return;

    // Both business locations
    const locations = [
      {
        name: "Safari Stop Nonsense",
        location: "Tlhabane",
        address: "3565 Segaole Street, Tlhabane, 0309",
        coords: [-25.640299, 27.212508],
        verified: true,
        phone: "083 583 8388"
      },
      {
        name: "Safari Stop Nonsense",
        location: "Bapong",
        address: "Modderspruit, Bapong, 0269",
        coords: [-25.719264, 27.654526],
        verified: false,
        phone: "083 583 8388"
      }
    ];

    // Calculate center point
    const centerLat = (locations[0].coords[0] + locations[1].coords[0]) / 2;
    const centerLng = (locations[0].coords[1] + locations[1].coords[1]) / 2;

    // Initialize map with custom options
    const map = L.map('dual-location-map', {
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      tap: true,
      touchZoom: true
    }).setView([centerLat, centerLng], 10);

    // Add Google-style map tiles (actually using CartoDB Positron for clean look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 8
    }).addTo(map);

    // Custom marker icon with location label
    const createCustomIcon = (locationName) => {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="marker-container">
            <div class="marker-pin">
              <svg class="pin-icon" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="marker-label">${locationName}</div>
            <div class="marker-shadow"></div>
          </div>
        `,
        iconSize: [80, 60],
        iconAnchor: [40, 50],
        popupAnchor: [0, -50]
      });
    };

    // Add markers for each location
    locations.forEach((location, index) => {
      const marker = L.marker(location.coords, { 
        icon: createCustomIcon(location.location),
        title: location.name + ' - ' + location.location
      }).addTo(map);

      // Modern, clean popup content
      const popupContent = `
        <div class="custom-popup">
          <div class="popup-header">
            <div class="popup-title">
              <svg class="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <h3>${location.name}</h3>
                <span class="popup-location">${location.location}</span>
              </div>
            </div>
            ${location.verified ? '<div class="verified-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="#4CAF50"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Verified</span></div>' : ''}
          </div>
          
          <div class="popup-body">
            <div class="info-section">
              <div class="info-label">Address</div>
              <div class="info-value">${location.address}</div>
            </div>
            
            <div class="info-section">
              <div class="info-label">Phone</div>
              <div class="info-value">
                <a href="tel:${location.phone.replace(/\s/g, '')}" class="phone-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  ${location.phone}
                </a>
              </div>
            </div>
          </div>
          
          <div class="popup-footer">
            <a href="https://www.google.com/maps/dir//${location.coords[0]},${location.coords[1]}" 
               target="_blank" 
               rel="noopener"
               class="directions-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      `;

      // Bind popup with custom options
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        minWidth: 250,
        className: 'custom-leaflet-popup',
        closeButton: true,
        autoClose: false,
        closeOnClick: false
      });

      // Don't auto-open popups on mobile to avoid clutter
      const isMobile = window.innerWidth <= 768;
      if (!isMobile && index === 0) {
        setTimeout(() => marker.openPopup(), 500);
      }
    });

    // Fit map to show all markers with padding
    const bounds = L.latLngBounds(locations.map(loc => loc.coords));
    const isMobile = window.innerWidth <= 768;
    map.fitBounds(bounds, { 
      padding: isMobile ? [30, 30] : [80, 80],
      maxZoom: 12
    });

    // Add zoom control to bottom right for better mobile UX
    map.zoomControl.setPosition('bottomright');

    // Add scale control
    L.control.scale({
      position: 'bottomleft',
      metric: true,
      imperial: false
    }).addTo(map);
  });
})();
