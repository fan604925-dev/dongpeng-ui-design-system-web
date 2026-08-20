(() => {
  const findSectionByHeading = (text) =>
    [...document.querySelectorAll("section")].find((section) =>
      [...section.querySelectorAll("h1,h2,h3")].some(
        (heading) => heading.textContent.trim() === text
      )
    );

  const applyZxbLayoutFix = () => {
    const tabSpec = document.getElementById("zxb-tab-style-spec");
    const businessSection = findSectionByHeading("客户经营业务组件");

    if (tabSpec && businessSection) {
      businessSection.appendChild(tabSpec);
      tabSpec.classList.add("zxb-tab-style-in-components");
    }

    document
      .querySelectorAll(".zxb-customer-summary-card")
      .forEach((card) => card.classList.add("zxb-summary-align-fixed"));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyZxbLayoutFix);
  } else {
    applyZxbLayoutFix();
  }

  window.addEventListener("hashchange", () =>
    requestAnimationFrame(applyZxbLayoutFix)
  );
  window.addEventListener("load", applyZxbLayoutFix);
  setTimeout(applyZxbLayoutFix, 250);
})();
