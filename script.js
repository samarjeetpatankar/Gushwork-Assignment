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
const heroSection = document.querySelector(".hero-section");

if (siteHeader && heroSection) {
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
    const triggerPoint = Math.max(
      heroSection.offsetHeight - window.innerHeight,
      0,
    );
    const shouldStick = window.scrollY > triggerPoint;

    siteHeader.classList.toggle("is-sticky", shouldStick);
    setHeaderOffset();
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
