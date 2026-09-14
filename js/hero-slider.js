document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");

  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  const hero = document.querySelector(".hero-section");

  if (!slides.length) return;

  let currentSlide = 0;
  let autoSlide;

  /* =========================================
     SHOW SLIDE
  ========================================= */

  function showSlide(index) {
    if (index >= slides.length) {
      index = 0;
    }

    if (index < 0) {
      index = slides.length - 1;
    }

    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentSlide = index;
  }

  /* =========================================
     NEXT
  ========================================= */

  function nextSlide() {
    showSlide(currentSlide + 1);

    restartAutoSlide();
  }

  /* =========================================
     PREVIOUS
  ========================================= */

  function previousSlide() {
    showSlide(currentSlide - 1);

    restartAutoSlide();
  }

  /* =========================================
     AUTO SLIDER
  ========================================= */

  function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(function () {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);

    startAutoSlide();
  }

  /* =========================================
     NEXT BUTTON
  ========================================= */

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
    });
  }

  /* =========================================
     PREVIOUS BUTTON
  ========================================= */

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      previousSlide();
    });
  }

  /* =========================================
     DOTS
  ========================================= */

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);

      restartAutoSlide();
    });
  });

  /* =========================================
     TOUCH SWIPE
  ========================================= */

  let touchStartX = 0;
  let touchEndX = 0;

  if (hero) {
    hero.addEventListener(
      "touchstart",
      function (event) {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true },
    );

    hero.addEventListener(
      "touchend",
      function (event) {
        touchEndX = event.changedTouches[0].screenX;

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) {
          return;
        }

        if (distance < 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      },
      { passive: true },
    );
  }

  /* =========================================
     INITIALIZE
  ========================================= */

  showSlide(0);

  startAutoSlide();
});
