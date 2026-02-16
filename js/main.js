$(function () {
  const $drawer = $("[data-drawer]");
  const $menuOpen = $("[data-menu-open]");
  const $menuClose = $("[data-menu-close]");

  const $search = $("[data-search]");
  const $searchOpen = $("[data-search-open]");
  const $searchClose = $("[data-search-close]");

  const lockScroll = (lock) => {
    $("html").toggleClass("is-locked", lock);
    $("body").toggleClass("is-locked", lock);
  };

  const openDrawer = () => {
    $drawer.attr("aria-hidden", "false");
    $menuOpen.attr("aria-expanded", "true");
    lockScroll(true);
  };

  const closeDrawer = () => {
    $drawer.attr("aria-hidden", "true");
    $menuOpen.attr("aria-expanded", "false");
    lockScroll(false);
  };

  const openSearch = () => {
    $search.attr("aria-hidden", "false");
    lockScroll(true);
    setTimeout(() => $search.find("input[type='search']").trigger("focus"), 50);
  };

  const closeSearch = () => {
    $search.attr("aria-hidden", "true");
    lockScroll(false);
  };

  // Drawer
  $menuOpen.on("click", function () {
    const isHidden = $drawer.attr("aria-hidden") === "true";
    isHidden ? openDrawer() : closeDrawer();
  });

  $menuClose.on("click", closeDrawer);

  // Search
  $searchOpen.on("click", openSearch);
  $searchClose.on("click", closeSearch);

  // Desktop dropdowns (click toggle + click outside)
  const $nav = $("[data-nav]");
  const closeAllDropdowns = () => {
    $nav.find(".has-subnav").removeClass("is-open");
    $nav.find(".site-nav__toggle").attr("aria-expanded", "false");
  };

  $nav.on("click", ".site-nav__toggle", function (e) {
    e.preventDefault();
    const $item = $(this).closest(".has-subnav");
    const isOpen = $item.hasClass("is-open");
    closeAllDropdowns();
    if (!isOpen) {
      $item.addClass("is-open");
      $(this).attr("aria-expanded", "true");
    }
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("[data-nav]").length) closeAllDropdowns();
  });

  // ESC closes everything
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawer();
      closeSearch();
      closeAllDropdowns();
    }
  });

  // ====== Soft Living Swiper ======
  if ($('.soft-swiper').length) {
    new Swiper('.soft-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: '.soft-slider__nav--next',
        prevEl: '.soft-slider__nav--prev',
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      }
    });
  }

  // ====== فلسطينيات Swiper ======
  if ($('.palest__swiper').length) {
    new Swiper('.palest__swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '.palest__nav--next',
        prevEl: '.palest__nav--prev',
      },
      breakpoints: {
        480: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        }
      }
    });
  }

  // ====== Series More Swiper ======
  if ($('.series-more__swiper').length) {
    new Swiper('.series-more__swiper', {
      slidesPerView: 2,
      spaceBetween: 16,
      loop: false,
      navigation: {
        nextEl: '.series-more__nav--next',
        prevEl: '.series-more__nav--prev',
      },
      breakpoints: {
        480: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        }
      }
    });
  }

  // ====== Creative Hub Tab Switching ======
  const $creativeTabs = $('.creative-hub__tab');
  if ($creativeTabs.length) {
    $creativeTabs.on('click', function() {
      $creativeTabs.removeClass('is-active');
      $(this).addClass('is-active');
      // Tab filtering logic can be added here
    });
  }
});