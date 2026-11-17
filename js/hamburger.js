document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuToggle = document.getElementById("menuToggle");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const contactBtn = document.getElementById("contactBtn");
  const contactBtnMobile = document.getElementById("contactBtnMobile");
  const contactForm = document.getElementById("contactForm");
  const closeBtn = document.getElementById("closeBtn");

  // ✅ Function to open/close mobile menu
  function toggleMenu() {
    mobileMenu.classList.toggle("translate-x-full");
    const isClosed = mobileMenu.classList.contains("translate-x-full");
    document.body.style.overflow = isClosed ? "auto" : "hidden";
  }

  // ✅ Function to close menu only
  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    document.body.style.overflow = "auto";
  }

  // Hamburger click → toggle open/close
  menuToggle.addEventListener("click", toggleMenu);

  // X button click → close
  closeMobileMenu.addEventListener("click", closeMenu);

  // Close menu with small delay when clicking category
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      setTimeout(closeMenu, 200);
    });
  });

  // ✅ Contact form toggle
  function toggleForm() {
    contactForm.classList.toggle("opacity-0");
    contactForm.classList.toggle("scale-95");
    contactForm.classList.toggle("pointer-events-none");
  }

  if (contactBtn) contactBtn.addEventListener("click", toggleForm);
  if (contactBtnMobile) contactBtnMobile.addEventListener("click", toggleForm);
  if (closeBtn) closeBtn.addEventListener("click", toggleForm);
});
