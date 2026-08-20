(() => {
  const clean = (text) => (text || "").replace(/\s+/g, "");

  function findBusinessSection() {
    return [...document.querySelectorAll("section")].find((section) => {
      const heading = section.querySelector("h1,h2,h3,h4,h5");
      return heading && clean(heading.textContent).includes("客户经营业务组件");
    });
  }

  function applyZxbLayoutFix() {
    const businessSection = findBusinessSection();
    const tabSection = document.getElementById("zxb-tab-style-spec");

    if (businessSection && tabSection) {
      businessSection.appendChild(tabSection);
      tabSection.classList.add("zxb-tab-style-in-components");
    }

    document.querySelectorAll(".zxb-customer-summary-card").forEach((card) => {
      card.classList.add("zxb-summary-layout-fix");
    });

    document.documentElement.setAttribute(
      "data-zxb-layout-fix",
      "20260727-v8"
    );
  }

  function start() {
    applyZxbLayoutFix();
    requestAnimationFrame(applyZxbLayoutFix);
    setTimeout(applyZxbLayoutFix, 300);
    setTimeout(applyZxbLayoutFix, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("hashchange", start);
})();
