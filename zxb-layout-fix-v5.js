(() => {
  const normalize = (value) => (value || "").replace(/\s+/g, "");

  const findBusinessSection = () => {
    const heading = [...document.querySelectorAll("h1,h2,h3,h4,h5")].find((node) =>
      normalize(node.textContent).includes("客户经营业务组件")
    );
    if (!heading) return null;

    let current = heading;
    while (current && current !== document.body) {
      if (
        current.tagName === "SECTION" &&
        current.querySelector(".zxb-component-stage, .zxb-business-component-grid, .zxb-component-grid")
      ) {
        return current;
      }
      current = current.parentElement;
    }
    return heading.closest("section") || heading.parentElement;
  };

  const applyLayoutFix = () => {
    const businessSection = findBusinessSection();
    const tabSection = document.getElementById("zxb-tab-style-spec");

    if (businessSection && tabSection && tabSection.parentElement !== businessSection) {
      businessSection.appendChild(tabSection);
    }
    if (tabSection) {
      tabSection.classList.add("zxb-tab-style-in-components");
    }

    document.querySelectorAll(".zxb-customer-summary-card").forEach((card) => {
      card.classList.add("zxb-summary-layout-fix");
    });

    document.documentElement.dataset.zxbLayoutFix = "20260727-v5";
  };

  const start = () => {
    applyLayoutFix();
    requestAnimationFrame(applyLayoutFix);
    setTimeout(applyLayoutFix, 150);
    setTimeout(applyLayoutFix, 800);

    const observer = new MutationObserver(applyLayoutFix);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("hashchange", () => requestAnimationFrame(applyLayoutFix));
})();
