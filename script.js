const container = document.querySelector(".image-magnifier-container");
const lens = document.querySelector(".magnifier-lens");
const magnifierImage = document.querySelector(".hero-second-left-image");
const preview = document.querySelector(".magnifier-preview");

if (container && lens && magnifierImage && preview) {
  const zoomLevel = 2.5;
  let isMagnifierActive = false;

  const updatePreviewSize = () => {
    preview.style.backgroundImage = `url("${magnifierImage.src}")`;
    preview.style.backgroundSize = `${magnifierImage.offsetWidth * zoomLevel}px ${magnifierImage.offsetHeight * zoomLevel}px`;
  };

  const showMagnifier = () => {
    isMagnifierActive = true;
    lens.style.display = "block";
    preview.style.display = "block";
    updatePreviewSize();
  };

  const hideMagnifier = () => {
    isMagnifierActive = false;
    lens.style.display = "none";
    preview.style.display = "none";
  };

  container.addEventListener("mousemove", moveLens);
  container.addEventListener("mouseenter", showMagnifier);
  container.addEventListener("mouseleave", hideMagnifier);
  window.addEventListener("resize", () => {
    if (isMagnifierActive) {
      updatePreviewSize();
    }
  });

  function moveLens(e) {
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - lens.offsetWidth;
    const maxY = rect.height - lens.offsetHeight;

    let x = e.clientX - rect.left - lens.offsetWidth / 2;
    let y = e.clientY - rect.top - lens.offsetHeight / 2;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const lensCenterX = x + lens.offsetWidth / 2;
    const lensCenterY = y + lens.offsetHeight / 2;
    const bgPosX = -(lensCenterX * zoomLevel - preview.offsetWidth / 2);
    const bgPosY = -(lensCenterY * zoomLevel - preview.offsetHeight / 2);

    preview.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
  }
}

const siteHeader = document.getElementById("site-header");
if (siteHeader) {
  let lastScrollY = window.scrollY;

  const setHeaderOffset = () => {
    const offset = siteHeader.classList.contains("is-sticky")
      ? `${siteHeader.offsetHeight}px`
      : "0px";

    document.documentElement.style.setProperty(
      "--sticky-header-offset",
      offset,
    );
  };

  const updateStickyHeader = () => {
    const currentScrollY = window.scrollY;
    const shouldStick = currentScrollY > 0;
    const isScrollingUp = currentScrollY < lastScrollY;

    siteHeader.classList.toggle("is-sticky", shouldStick);

    if (!shouldStick) {
      siteHeader.classList.remove("is-hidden");
    } else {
      siteHeader.classList.toggle("is-hidden", isScrollingUp);
    }

    setHeaderOffset();

    lastScrollY = currentScrollY;
  };

  let ticking = false;

  const handleScroll = () => {
    if (ticking) {
      return;
    }

    window.requestAnimationFrame(() => {
      updateStickyHeader();
      ticking = false;
    });

    ticking = true;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", updateStickyHeader);
  window.addEventListener("load", updateStickyHeader);

  updateStickyHeader();
}

const versatileApplicationsCarouselList = document.querySelector(
  ".versatile-applications-carousel-list",
);
const versatileApplicationsArrowLeft = document.querySelector(
  ".versatile-applications-arrow-left",
);
const versatileApplicationsArrowRight = document.querySelector(
  ".versatile-applications-arrow-right",
);

if (
  versatileApplicationsCarouselList &&
  versatileApplicationsArrowLeft &&
  versatileApplicationsArrowRight
) {
  let isAnimating = false;

  const getSlideDistance = () => {
    const slide = versatileApplicationsCarouselList.querySelector(
      ".versatile-applications-carousel",
    );

    if (!slide) {
      return 0;
    }

    const slideWidth = slide.getBoundingClientRect().width;
    const styles = window.getComputedStyle(versatileApplicationsCarouselList);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");

    return slideWidth + gap;
  };

  const resetTrackPosition = () => {
    versatileApplicationsCarouselList.style.transition = "none";
    versatileApplicationsCarouselList.style.transform = "translateX(0)";
  };

  const moveCarousel = (direction) => {
    if (isAnimating) {
      return;
    }

    const slideDistance = getSlideDistance();

    if (!slideDistance) {
      return;
    }

    isAnimating = true;

    if (direction === -1) {
      const lastSlide = versatileApplicationsCarouselList.lastElementChild;

      if (lastSlide) {
        versatileApplicationsCarouselList.insertBefore(
          lastSlide,
          versatileApplicationsCarouselList.firstElementChild,
        );
      }

      versatileApplicationsCarouselList.style.transition = "none";
      versatileApplicationsCarouselList.style.transform = `translateX(-${slideDistance}px)`;

      window.requestAnimationFrame(() => {
        versatileApplicationsCarouselList.style.transition =
          "transform 0.35s ease";
        versatileApplicationsCarouselList.style.transform = "translateX(0)";
      });
    } else {
      versatileApplicationsCarouselList.style.transition =
        "transform 0.35s ease";
      versatileApplicationsCarouselList.style.transform = `translateX(-${slideDistance}px)`;
    }

    window.setTimeout(() => {
      versatileApplicationsCarouselList.style.transition = "none";

      if (direction === 1) {
        const firstSlide =
          versatileApplicationsCarouselList.firstElementChild;

        if (firstSlide) {
          versatileApplicationsCarouselList.appendChild(firstSlide);
        }
      }

      versatileApplicationsCarouselList.style.transform = "translateX(0)";

      window.requestAnimationFrame(() => {
        isAnimating = false;
      });
    }, 350);
  };

  versatileApplicationsArrowLeft.addEventListener("click", () => {
    moveCarousel(-1);
  });

  versatileApplicationsArrowRight.addEventListener("click", () => {
    moveCarousel(1);
  });

  window.addEventListener("resize", resetTrackPosition);

  resetTrackPosition();
}
