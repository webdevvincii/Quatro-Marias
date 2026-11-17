    // Intersection Observer to animate cards on scroll
    document.addEventListener("DOMContentLoaded", () => {
      const cards = document.querySelectorAll(".about-card");
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      cards.forEach(card => observer.observe(card));
    });






        document.addEventListener("DOMContentLoaded", () => {
      const testimonialCards = document.querySelectorAll(".testimonial-card");
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      testimonialCards.forEach(card => observer.observe(card));
    });