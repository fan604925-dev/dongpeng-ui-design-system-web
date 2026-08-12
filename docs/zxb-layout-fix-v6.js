(() => {
  const compact = (value) => (value || "").replace(/\s+/g, "");

  const findBusinessSection = () => {
    const sections = [...document.querySelectorAll("section")];
    const exact = sections.find((section) => {
      const text = compact(section.textContent);
      return (
        text.includes("客户经营业务组件") &&
        section.querySelector(
          ".zxb-component-stage, .zxb-business-component-grid, .zxb-component-grid"
        )
      );
    });
    if (exact) return exact;

    const heading = [
      ...document.querySelectorAll(
        "h1,h2,h3,h4,h5,.section-title,.zxb-section-title"
      ),
    ].find((node) => compact(node.textContent).includes("客户经营业务组件"));
    return heading ? heading.closest("section") : null;
  };

  const applyFix = () => {
    const businessSection = findBusinessSection();
    const tabs = document.getElementById("zxb-tab-style-spec");

    if (businessSection && tabs) {
      const stage =
        businessSection.querySelector(
          ".zxb-component-stage, .zxb-business-component-grid, .zxb-component-grid"
        ) || businessSection.lastElementChild;

      if (stage && stage !== tabs && stage.nextElementSibling !== tabs) {
        stage.insertAdjacentElement("afterend", tabs);
      }
      tabs.classList.add("zxb-tab-style-in-components");
    }

    document.querySelectorAll(".zxb-customer-summary-card").forEach((card) => {
      card.classList.add("zxb-summary-layout-fix");
    });

    document.documentElement.dataset.zxbLayoutFix = "20260727-v6";
  };

  const start = () => {
    applyFix();
    requestAnimationFrame(applyFix);
    setTimeout(applyFix, 200);
    setTimeout(applyFix, 900);

    const observer = new MutationObserver(applyFix);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 4000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("hashchange", () => requestAnimationFrame(applyFix));
})();
