document.addEventListener("DOMContentLoaded", () => {

  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach(item => {

    const btn = item.querySelector(".dropdown-btn");
    const menu = item.querySelector(".dropdown-menu-custom");

    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {

      e.preventDefault();

      dropdownItems.forEach(other => {
        if (other !== item) {
          other.querySelector(".dropdown-menu-custom")?.classList.remove("show");
        }
      });

      menu.classList.toggle("show");

    });

  });

  document.addEventListener("click", (e) => {

    dropdownItems.forEach(item => {

      if (!item.contains(e.target)) {
        item.querySelector(".dropdown-menu-custom")?.classList.remove("show");
      }

    });

  });


  const navbar = document.querySelector(".navbar");

  let lastScroll = 0;
  let ticking = false;

  function handleScroll() {

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 20) {
      navbar.classList.remove("hide");
      lastScroll = currentScroll;
      ticking = false;
      return;
    }

    if (Math.abs(currentScroll - lastScroll) > 10) {

      if (currentScroll > lastScroll) {
        navbar.classList.add("hide");
      } else {
        navbar.classList.remove("hide");
      }

      lastScroll = currentScroll;

    }

    ticking = false;

  }

  window.addEventListener("scroll", () => {

    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }

  });

  const wallpapers = [
    "images/homepage-wallpaper.jpg",
    "images/wallpaper2.png",
    "images/wallpaper3.png",
    "images/wallpaper4.png",
    "images/wallpaper5.png"
  ];

  wallpapers.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const hero = document.querySelector(".hero");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let current = 0;

  function updateBackground() {

    if (!hero) return;

    hero.style.backgroundImage = `url("${wallpapers[current]}")`;

  }

  function nextSlide() {

    current = (current + 1) % wallpapers.length;
    updateBackground();

  }

  function previousSlide() {

    current = (current - 1 + wallpapers.length) % wallpapers.length;
    updateBackground();

  }

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", previousSlide);

  updateBackground();



  let slideshow = setInterval(nextSlide, 5000);


  document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

      clearInterval(slideshow);

    } else {

      slideshow = setInterval(nextSlide, 5000);

    }

  });


  document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {
      nextSlide();
    }

    if (e.key === "ArrowLeft") {
      previousSlide();
    }

  });


  if (hero) {

    let startX = 0;

    hero.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    hero.addEventListener("touchend", (e) => {

      const endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) {
        nextSlide();
      }

      if (endX - startX > 50) {
        previousSlide();
      }

    });

  }



  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }

  });

});