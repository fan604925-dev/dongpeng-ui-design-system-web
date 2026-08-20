(() => {
  const compact = (value) => (value || "").replace(/\s+/g, "");

  function syncZxbLayout() {
    const tabSection = document.getElementById("zxb-tab-style-spec");
    const businessHeading = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .find((node) => compact(node.textContent).includes("客户经营业务组件"));
    const businessSection = businessHeading && businessHeading.closest("section");

    if (tabSection && businessSection) {
      if (tabSection.parentElement !== businessSection) {
        businessSection.appendChild(tabSection);
      }
      tabSection.classList.add("zxb-tab-style-in-components");
    }

    document.documentElement.dataset.zxbHotfix = "20260727c";
  }

  function run() {
    syncZxbLayout();
    requestAnimationFrame(syncZxbLayout);
    setTimeout(syncZxbLayout, 250);
    setTimeout(syncZxbLayout, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  window.addEventListener("hashchange", run);
})();
