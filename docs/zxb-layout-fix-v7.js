(() => {
  const compact = (value) => (value || "").replace(/\s+/g, "");

  const findBusinessSection = () => {
    const heading = [
      ...document.querySelectorAll(
        "h1,h2,h3,h4,h5,.section-title,.zxb-section-title"
      ),
    ].find((node) => compact(node.textContent).includes("客户经营业务组件"));

    if (heading) return heading.closest("section");

    return [...document.querySelectorAll("section")].find((section) =>
      compact(section.textContent).includes("客户经营业务组件")
    );
  };

  const applyFix = () => {
    const businessSection = findBusinessSection();
    const tabs = document.getElementById("zxb-tab-style-spec");

    if (businessSection && tabs && tabs.parentElement !== businessSection) {
      businessSection.appendChild(tabs);
    }

    if (tabs) tabs.classList.add("zxb-tab-style-in-components");

    document.querySelectorAll(".zxb-customer-summary-card").forEach((card) => {
      card.classList.add("zxb-summary-layout-fix");
    });

    document.documentElement.dataset.zxbLayoutFix = "20260727-v7";
  };

  const start = () => {
    applyFix();
    requestAnimationFrame(applyFix);
    setTimeout(applyFix, 250);
    setTimeout(applyFix, 1000);

    const observer = new MutationObserver(applyFix);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.addEventListener("hashchange", () => requestAnimationFrame(applyFix));
})();
