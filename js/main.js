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

  // Remember what was focused before an overlay opened, so we can restore it on close.
  let lastFocus = null;
  const rememberFocus = () => { lastFocus = document.activeElement; };
  const restoreFocus = () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); lastFocus = null; };

  const openDrawer = () => {
    rememberFocus();
    $drawer.attr("aria-hidden", "false");
    $menuOpen.attr("aria-expanded", "true");
    lockScroll(true);
    setTimeout(() => $drawer.find(".drawer__link, .icon-btn").first().trigger("focus"), 50);
  };

  const closeDrawer = () => {
    $drawer.attr("aria-hidden", "true");
    $menuOpen.attr("aria-expanded", "false");
    lockScroll(false);
    restoreFocus();
  };

  const openSearch = () => {
    rememberFocus();
    $search.attr("aria-hidden", "false");
    lockScroll(true);
    setTimeout(() => $search.find("input[type='search']").trigger("focus"), 50);
  };

  const closeSearch = () => {
    $search.attr("aria-hidden", "true");
    lockScroll(false);
    restoreFocus();
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

  // ====== Category Tab Filtering (reusable) ======
  // Filters cards whose [data-category] matches the clicked tab's [data-tab].
  // data-tab="all" shows everything. Also manages is-active + aria-selected.
  const initTabFilter = (tabSel, cardSel) => {
    const $tabs = $(tabSel);
    if (!$tabs.length) return;
    $tabs.attr("role", "tab");
    $tabs.each(function () {
      $(this).attr("aria-selected", $(this).hasClass("is-active") ? "true" : "false");
    });
    $tabs.on("click", function (e) {
      e.preventDefault();
      const cat = String($(this).data("tab"));
      $tabs.removeClass("is-active").attr("aria-selected", "false");
      $(this).addClass("is-active").attr("aria-selected", "true");
      $(cardSel).each(function () {
        const show = cat === "all" || String($(this).data("category")) === cat;
        $(this).toggle(show);
      });
    });
  };

  initTabFilter(".lifestyle-tabs__tab", ".lt-card");
  initTabFilter(".creative-hub__tab", ".creative-item");
  initTabFilter(".video-showcase__cat", ".video-card");

  // فلسطينيات categories — active state only (cards live inside a Swiper)
  $(".palest__cat").on("click", function (e) {
    e.preventDefault();
    $(".palest__cat").removeClass("is-active").attr("aria-selected", "false");
    $(this).addClass("is-active").attr("aria-selected", "true");
  });

  // ====== Video Modal ======
  const $videoModal = $('[data-video-modal]');
  const $videoIframe = $('[data-video-iframe]');
  const $videoModalTitle = $('[data-video-modal-title]');
  const $videoTriggers = $('[data-video-trigger]');
  const $videoModalClose = $('[data-video-modal-close]');
  const $videoLoader = $('.video-modal__loader');
  let videoLoaderTimer = null;

  // The loader sits on top of the iframe with an opaque background; reveal the
  // video once the embed has loaded (with a fallback timeout so it never sticks).
  const hideVideoLoader = () => {
    clearTimeout(videoLoaderTimer);
    $videoLoader.stop(true, true).fadeOut(200);
  };
  const showVideoLoader = () => {
    clearTimeout(videoLoaderTimer);
    $videoLoader.stop(true, true).css('display', 'flex').css('opacity', '');
  };

  $videoIframe.on('load', function () {
    // Only meaningful once a real src is set (ignore the initial empty load)
    if (($videoIframe.attr('src') || '').indexOf('youtube') !== -1) hideVideoLoader();
  });

  const openVideoModal = (videoId, title) => {
    rememberFocus();
    // Show the loader, then set the source
    showVideoLoader();
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    $videoIframe.attr('src', videoSrc);
    $videoModalTitle.text(title);
    // Fallback: never let the loader stick if the load event is missed
    videoLoaderTimer = setTimeout(hideVideoLoader, 2500);

    // Show modal
    $videoModal.attr('aria-hidden', 'false').addClass('is-active');
    lockScroll(true);

    // Animate in + move focus to the close button
    setTimeout(() => {
      $videoModal.addClass('is-visible');
      $videoModalClose.first().trigger('focus');
    }, 10);
  };

  const closeVideoModal = () => {
    $videoModal.removeClass('is-visible');
    clearTimeout(videoLoaderTimer);

    // Wait for animation then hide and stop video
    setTimeout(() => {
      $videoModal.attr('aria-hidden', 'true').removeClass('is-active');
      $videoIframe.attr('src', '');
      showVideoLoader(); // reset for next open
      lockScroll(false);
    }, 300);
    restoreFocus();
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