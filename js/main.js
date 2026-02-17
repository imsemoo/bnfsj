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

  // ====== Video Showcase Tab Switching ======
  const $videoTabs = $('.video-showcase__cat');
  if ($videoTabs.length) {
    $videoTabs.on('click', function() {
      $videoTabs.removeClass('is-active');
      $(this).addClass('is-active');
      // Tab filtering logic can be added here
    });
  }

  // ====== Video Modal ======
  const $videoModal = $('[data-video-modal]');
  const $videoIframe = $('[data-video-iframe]');
  const $videoModalTitle = $('[data-video-modal-title]');
  const $videoTriggers = $('[data-video-trigger]');
  const $videoModalClose = $('[data-video-modal-close]');

  const openVideoModal = (videoId, title) => {
    // Set video source
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    $videoIframe.attr('src', videoSrc);
    $videoModalTitle.text(title);
    
    // Show modal
    $videoModal.attr('aria-hidden', 'false').addClass('is-active');
    lockScroll(true);
    
    // Animate in
    setTimeout(() => {
      $videoModal.addClass('is-visible');
    }, 10);
  };

  const closeVideoModal = () => {
    $videoModal.removeClass('is-visible');
    
    // Wait for animation then hide and stop video
    setTimeout(() => {
      $videoModal.attr('aria-hidden', 'true').removeClass('is-active');
      $videoIframe.attr('src', '');
      lockScroll(false);
    }, 300);
  };

  // Open modal on video click
  $videoTriggers.on('click', function(e) {
    e.preventDefault();
    const videoId = $(this).data('video-id');
    const videoTitle = $(this).data('video-title');
    if (videoId) {
      openVideoModal(videoId, videoTitle);
    }
  });

  // Close modal
  $videoModalClose.on('click', closeVideoModal);

  // Close on ESC (update existing handler)
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
      closeAllDropdowns();
      closeVideoModal();
    }
  });

  // ====== Video Card Hover Effects ======
  $('.video-card, .video-hero').on('mouseenter', function() {
    $(this).addClass('is-hovering');
  }).on('mouseleave', function() {
    $(this).removeClass('is-hovering');
  });

  // ====== Video Modal Action Buttons ======
  $('.video-modal__action').on('click', function() {
    $(this).toggleClass('is-active');
    const $icon = $(this).find('i');
    
    // Toggle filled/outline icons
    if ($icon.hasClass('fa-regular')) {
      $icon.removeClass('fa-regular').addClass('fa-solid');
    } else {
      $icon.removeClass('fa-solid').addClass('fa-regular');
    }
  });
});