(() => {
  const compactText = (value) => (value || "").replace(/\s+/g, "");

  const findSectionByHeading = (text) => {
    const expected = compactText(text);
    const heading = [...document.querySelectorAll("h1,h2,h3,h4")].find(
      (item) => compactText(item.textContent).includes(expected)
    );
    return heading ? heading.closest("section") || heading.parentElement : null;
  };

  const applyZxbLayoutFix = () => {
    const tabSpec = document.getElementById("zxb-tab-style-spec");
    const businessSection = findSectionByHeading("客户经营业务组件");

    if (tabSpec && businessSection && tabSpec.parentElement !== businessSection) {
      businessSection.appendChild(tabSpec);
    }
    tabSpec?.classList.add("zxb-tab-style-in-components");

    document.querySelectorAll(".zxb-customer-summary-card").forEach((card) => {
      card.classList.add("zxb-summary-align-fixed");
    });

    document.documentElement.dataset.zxbLayoutFix = "20260727-3";
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyZxbLayoutFix, { once: true });
  } else {
    applyZxbLayoutFix();
  }

  window.addEventListener("load", applyZxbLayoutFix);
  window.addEventListener("hashchange", () => requestAnimationFrame(applyZxbLayoutFix));
  setTimeout(applyZxbLayoutFix, 100);
  setTimeout(applyZxbLayoutFix, 600);
})();
