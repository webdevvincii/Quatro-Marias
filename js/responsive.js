// List of images to cycle through
const imageList = ["pasta.jpg", "pork.jpg", "veggies.jpg", "lumpia.jpg", "beef.jpg", "chicken.jpg", "seafood.jpg", "Dessert.jpg"];  
let currentImageIndex = 0;

function changeImage() {
    const imageElement = document.getElementById("pastaImage");

    // Fade out effect
    imageElement.style.opacity = "0";

    setTimeout(() => {
        // Change to next image
        currentImageIndex = (currentImageIndex + 1) % imageList.length;
        imageElement.src = imageList[currentImageIndex];

        // Fade in effect
        imageElement.style.opacity = "1";
    }, 1000); // Delay before changing image (1s)
}

// Auto change image every 3 seconds
setInterval(changeImage, 4000);

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let index = 0;
    const totalSlides = document.querySelectorAll("#carousel > div").length;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;

        // Hide or show buttons based on index
        prevBtn.classList.toggle("hidden", index === 0);
        nextBtn.classList.toggle("hidden", index === totalSlides - 1);
    }

    nextBtn.addEventListener("click", function () {
        if (index < totalSlides - 1) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    // Initial state check
    updateCarousel();
});

// Navbar Menu
document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.getElementById("menuLink");
    const menuSection = document.getElementById("menuSection");

    menuLink.addEventListener("click", function (event) {
        event.preventDefault(); // Para hindi mag-refresh ang page

        const offset = 80; // Adjust para di matakpan ng fixed header
        const sectionPosition = menuSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });
    });
});

// Navbar home
document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.getElementById("homeLink");
    const menuSection = document.getElementById("homeSection");

    menuLink.addEventListener("click", function (event) {
        event.preventDefault(); // Para hindi mag-refresh ang page

        const offset = 80; // Adjust para di matakpan ng fixed header
        const sectionPosition = menuSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });
    });
});
// Navbar About
document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.getElementById("aboutLink");
    const menuSection = document.getElementById("aboutSection");

    menuLink.addEventListener("click", function (event) {
        event.preventDefault(); // Para hindi mag-refresh ang page

        const offset = 80; // Adjust para di matakpan ng fixed header
        const sectionPosition = menuSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });
    });
});
// Navbar Testimonial
document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.getElementById("testimonialLink");
    const menuSection = document.getElementById("testimonialSection");

    menuLink.addEventListener("click", function (event) {
        event.preventDefault(); // Para hindi mag-refresh ang page

        const offset = 80; // Adjust para di matakpan ng fixed header
        const sectionPosition = menuSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });
    });
});

// Scrolling
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const observer = new IntersectionObserver(
        (entries) => {
            let foundActive = false;

            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    foundActive = true;
                    navLinks.forEach((link) => {
                        link.classList.remove("border-red-500");
                        link.classList.add("border-transparent");
                    });

                    if (activeLink) {
                        activeLink.classList.add("border-red-500");
                        activeLink.classList.remove("border-transparent");
                    }
                }
            });

            // If wala pang active, i-activate yung Home
            if (!foundActive) {
                navLinks.forEach((link) => {
                    link.classList.remove("border-red-500");
                    link.classList.add("border-transparent");
                });

                document.querySelector(`nav a[href="#homeSection"]`).classList.add("border-red-500");
            }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Default active border sa Home kapag unang load
    document.querySelector(`nav a[href="#homeSection"]`).classList.add("border-red-500");
});


// Dropdown Contact Us
const contactBtn = document.getElementById("contactBtn");
  const contactForm = document.getElementById("contactForm");
  const closeBtn = document.getElementById("closeBtn");

  function openForm() {
    contactForm.classList.remove("opacity-0", "scale-95", "pointer-events-none");
    contactForm.classList.add("opacity-100", "scale-100");
    contactBtn.classList.remove("bg-red-500", "text-white", "hover:bg-red-600");
    contactBtn.classList.add("bg-white", "text-red-500", "border", "border-red-500");
  }

  function closeForm() {
    contactForm.classList.remove("opacity-100", "scale-100");
    contactForm.classList.add("opacity-0", "scale-95", "pointer-events-none");
    contactBtn.classList.remove("bg-white", "text-red-500", "border", "border-red-500");
    contactBtn.classList.add("bg-red-500", "text-white", "hover:bg-red-600");
  }

  contactBtn.addEventListener("click", () => {
    if (contactForm.classList.contains("opacity-0")) {
      openForm();
    } else {
      closeForm();
    }
  });

  closeBtn.addEventListener("click", closeForm);

  // Optional: Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!contactBtn.contains(event.target) && !contactForm.contains(event.target)) {
      closeForm();
    }
  });






  document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("mobileMenu").classList.toggle("opacity-0");
    document.getElementById("mobileMenu").classList.toggle("pointer-events-none");
  });
  
  document.getElementById("closeMobileMenu").addEventListener("click", function() {
    document.getElementById("mobileMenu").classList.add("opacity-0");
    document.getElementById("mobileMenu").classList.add("pointer-events-none");
  });
  
  document.getElementById("mobileContactBtn").addEventListener("click", function() {
    document.getElementById("contactForm").classList.toggle("hidden");
  });
  
  document.getElementById("closeBtn").addEventListener("click", function() {
    document.getElementById("contactForm").classList.add("hidden");
  });


 



  