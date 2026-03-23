const container = document.querySelector(".image-magnifier-container");
const lens = document.querySelector(".magnifier-lens");

container.addEventListener("mousemove", moveLens);
container.addEventListener("mouseenter", () => {
  lens.style.display = "block";
});
container.addEventListener("mouseleave", () => {
  lens.style.display = "none";
});

function moveLens(e) {
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left - lens.offsetWidth / 2;
  let y = e.clientY - rect.top - lens.offsetHeight / 2;

  lens.style.left = x + "px";
  lens.style.top = y + "px";
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
