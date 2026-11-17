  const heroSection = document.getElementById('homeSection');
  const navFoodBtn = document.getElementById('navFoodBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrollY > heroBottom - 100) {
      navFoodBtn.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
      navFoodBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      navFoodBtn.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
      navFoodBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  });

  function redirectToMenu(category) {
    window.location.href = "#menuSection";
  }