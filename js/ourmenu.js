document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const slides = carousel.children;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('#carouselDots .dot');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-red-500', index === currentIndex);
      dot.classList.toggle('bg-gray-400', index !== currentIndex);
    });
    prevBtn.classList.toggle('hidden', currentIndex === 0);
    nextBtn.classList.toggle('hidden', currentIndex === totalSlides - 1);
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Swipe/drag functionality
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.pageX - startX;
    if (diff > 50 && currentIndex > 0) {
      currentIndex--;
    } else if (diff < -50 && currentIndex < totalSlides - 1) {
      currentIndex++;
    }
    updateCarousel();
  });

  // Touch support
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50 && currentIndex > 0) {
      currentIndex--;
    } else if (diff < -50 && currentIndex < totalSlides - 1) {
      currentIndex++;
    }
    updateCarousel();
  });

  updateCarousel();
});





  document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#menuSection");
    const items = section.querySelectorAll(".bg-gray-100");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.remove("opacity-0", "translate-y-10");
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.remove("opacity-0", "translate-y-6");
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  });