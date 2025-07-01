let cursor = document.getElementById("cursor");
let close = document.getElementById("close");
let body = document.body;
let iframe = document.getElementById("pen");
let penLink = document.getElementById("penlink");
let links = document.getElementsByTagName("a");

// ===== DANE GALERII =====
const galleries = [
  
  // Trip Planner App
  [
    "images/projects/trip_planner_app_1.png",
    "images/projects/trip_planner_app_2.png"
  ],
  // Auctions App
  [
    "images/projects/auctions_app_1.png",
    "images/projects/auctions_app_2.png"
  ],
  // Duties Sharer App
  [
    "images/projects/duties_sharer_app_1.png",
    "images/projects/duties_sharer_app_2.png"
  ],
  // Social Media App
  [
    "images/projects/social_media_app_1.png",
    "images/projects/social_media_app_2.png",
    "images/projects/social_media_app_3.png"
  ],
  // AI Recognition App
  [
    "images/projects/ai_recognition_app.png"
  ],
  // Weather App
  [
    "images/projects/weather_app.png",
  ],
  // Lineup Creator App
  [
    "images/projects/lineup_creator_app_1.png",
    "images/projects/lineup_creator_app_2.png"
  ],
  // Milkshakes & Smoothies Bar App
  [
    "images/projects/milkshakes_and_smoothies_bar_app.png",
  ],
  // Pet Care App
  [
    "images/projects/pet_care_app_1.png",
    "images/projects/pet_care_app_2.png"
  ]
];


// ===== GITHUB LINKS FOR EACH PROJECT =====
const projectGitHubLinks = [
  "https://github.com/mcntcw/trip_planner_app",                   // Trip Planner App
  "https://github.com/mcntcw/AuctionsApp",                        // Auctions App
  "https://github.com/mcntcw/duties_sharer_app",                  // Duties Sharer App
  "https://github.com/mcntcw/social_media_app",                   // Social Media App
  "https://github.com/mcntcw/ai_recognition_app",                 // AI Recognition App
  "https://github.com/mcntcw/weather_app",                        // Weather App
  "https://github.com/mcntcw/lineup_creator_app",                 // Lineup Creator App
  "https://github.com/mcntcw/milkshakes_and_smoothies_bar_app",   // Milkshakes & Smoothies Bar App
  "https://github.com/mcntcw/pet_care_app"                        // Pet Care App
];


const projectNames = [
   "Trip Planner App", "Auctions App", "Duties Sharer App", "Social Media App", "AI Recognition App", 
  "Weather App", "Lineup Creator App", "Milkshakes & Smoothies Bar App", "Pet Care App"
];

// ===== GALERIA FUNCTIONS =====
let currentGallery = [];
let currentImageIndex = 0;
let galleryContainer = null;

function createGallery(images, projectName, currentIndex = 0) {
  const template = document.getElementById('gallery-template');
  const clone = template.content.cloneNode(true);
  
  const title = clone.querySelector('.gallery-title');
  const mainImage = clone.querySelector('.gallery-main-image');
  const counter = clone.querySelector('.image-counter');
  const total = clone.querySelector('.total-images');
  const thumbnailsContainer = clone.querySelector('.gallery-thumbnails-container');
  
  title.textContent = `${projectName} • ${images.length} ${images.length === 1 ? 'image' : 'images'}`;
  mainImage.src = images[currentIndex];
  mainImage.alt = `${projectName} - zdjęcie ${currentIndex + 1}`;
  mainImage.onerror = function() {
    this.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=Ładowanie...';
  };
  counter.textContent = currentIndex + 1;
  total.textContent = images.length;
  
  const prevBtn = clone.querySelector('.prev');
  const nextBtn = clone.querySelector('.next');
  
  prevBtn.addEventListener('click', () => changeImage(-1));
  nextBtn.addEventListener('click', () => changeImage(1));
  
  // ===== DODAJ OBSŁUGĘ KURSORA DO PRZYCISKÓW NAWIGACJI =====
  // [prevBtn, nextBtn].forEach(btn => {
  //   btn.addEventListener('mouseenter', () => cursor.classList.add('active'));
  //   btn.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  //   btn.addEventListener('mousemove', () => cursor.classList.add('active'));
  // });
  
  createThumbnails(images, thumbnailsContainer, currentIndex);
  
  return clone;
}

function createThumbnails(images, container, activeIndex) {
  const thumbnailTemplate = document.getElementById('thumbnail-template');
  
  images.forEach((img, index) => {
    const thumbClone = thumbnailTemplate.content.cloneNode(true);
    const thumbDiv = thumbClone.querySelector('.gallery-thumbnail');
    const thumbImg = thumbClone.querySelector('img');
    
    thumbImg.src = img;
    thumbImg.alt = `Miniatura ${index + 1}`;
    thumbImg.onerror = function() {
      this.src = `https://via.placeholder.com/80x60/667eea/ffffff?text=${index+1}`;
    };
    
    if (index === activeIndex) {
      thumbDiv.classList.add('active');
    }
    
    thumbDiv.addEventListener('click', () => selectImage(index));
    
    container.appendChild(thumbClone);
  });
}

function updateGalleryImage() {
  if (!galleryContainer) return;
  
  const mainImage = galleryContainer.querySelector('.gallery-main-image');
  const counter = galleryContainer.querySelector('.image-counter');
  const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbnail');
  
  if (mainImage && counter) {
    mainImage.src = currentGallery[currentImageIndex];
    counter.textContent = currentImageIndex + 1;
    
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentImageIndex);
    });
  }
}

window.changeImage = function(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = currentGallery.length - 1;
  if (currentImageIndex >= currentGallery.length) currentImageIndex = 0;
  updateGalleryImage();
};

window.selectImage = function(index) {
  currentImageIndex = index;
  updateGalleryImage();
};

// ===== EVENT LISTENERS =====
function initGallery() {
  const cards = document.getElementsByClassName("inner");
  
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mousemove", () => cursor.classList.add("active"));
    cards[i].addEventListener("mouseover", () => cursor.classList.add("active"));
    cards[i].addEventListener("mouseout", () => cursor.classList.remove("active"));
    
    cards[i].addEventListener("click", function() {
      body.classList.add("active");
      
      currentGallery = galleries[i];
      currentImageIndex = 0;
      
      const galleryElement = createGallery(galleries[i], projectNames[i], 0);
      
      iframe.innerHTML = "";
      iframe.appendChild(galleryElement);
      
      galleryContainer = iframe.querySelector('.gallery-container');

      penLink.innerHTML = '<span>Source Code <span>&rarr;</span></span>';
      penLink.setAttribute("href", projectGitHubLinks[i]); // Zmienione z "#gallery"
      penLink.setAttribute("target", "_blank"); // Otwórz w nowej karcie
      penLink.setAttribute("rel", "noopener noreferrer"); // Bezpieczeństwo
    });
  }
}

function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    if (body.classList.contains('active')) {
      switch(e.key) {
        case 'ArrowLeft':
          changeImage(-1);
          break;
        case 'ArrowRight':
          changeImage(1);
          break;
        case 'Escape':
          closeGallery();
          break;
      }
    }
  });
}

function initSocialHover() {
  for (let link of links) {
    link.addEventListener("mouseover", () => cursor.classList.add("linkhover"));
    link.addEventListener("mousemove", () => cursor.classList.add("linkhover"));
    link.addEventListener("mouseout", () => cursor.classList.remove("linkhover"));
  }
}

function initCloseHandlers() {
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    const isEscape = evt.key === "Escape" || evt.key === "Esc" || evt.keyCode === 27;
    if (isEscape) closeGallery();
  };

  close.addEventListener("click", closeGallery);
}

function closeGallery() {
  body.classList.remove("active");
  setTimeout(() => {
    iframe.innerHTML = "";
    galleryContainer = null;
    currentGallery = [];
    currentImageIndex = 0;
  }, 2000);
}

function initCursor() {
  gsap.set("#cursor", { xPercent: -50, yPercent: -50 });
  
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 0.35;

  const xSet = gsap.quickSetter(cursor, "x", "px");
  const ySet = gsap.quickSetter(cursor, "y", "px");

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });
}

function initScrollAnimations() {
  Splitting();

  gsap.utils.toArray(".panel").forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 100%",
        end: "bottom 25%",
        scrub: 0,
        onUpdate: (self) => {
          section.style.setProperty("--progress", self.progress);
        }
      }
    });
  });

  gsap.to("body", {
    scrollTrigger: {
      trigger: "body",
      start: "top 100%",
      end: "50% 50%",
      scrub: 0,
      onUpdate: (self) => {
        body.style.setProperty("--progress", self.progress);
      }
    }
  });
}

function initPerformanceOptimizations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.panel').forEach(panel => {
    observer.observe(panel);
  });
}

function initAccessibility() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-optimized');
  }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function() {
  body.classList.add("loaded");
  
  initGallery();
  initKeyboardNavigation();
  initSocialHover();
  initCloseHandlers();
  initCursor();
  initScrollAnimations();
  initPerformanceOptimizations();
  initAccessibility();
});

function refresh() {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 2500);
}

window.addEventListener("resize", refresh);

function trackProjectView(projectName) {
  console.log(`Viewed gallery: ${projectName}`);
}
